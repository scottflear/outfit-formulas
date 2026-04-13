import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SB_URL = Deno.env.get('SUPABASE_URL')!;
const SB_KEY = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

/**
 * Outfit Formulas — Amplitude Webhook Receiver
 *
 * Receives real-time events from Amplitude webhook sync.
 * Creates email_jobs based on behavioral triggers.
 * The email worker picks up these jobs and sends personalised emails.
 */

// Events that should trigger emails and their mapping
const EMAIL_TRIGGERS: Record<string, {
  emailType: string;
  delayMinutes: number;
  firstTimeOnly: boolean;
}> = {
  // Onboarding & signup
  'free_trial_start':        { emailType: 'welcome_trial', delayMinutes: 0, firstTimeOnly: true },
  'signup_complete':         { emailType: 'welcome_signup', delayMinutes: 0, firstTimeOnly: true },
  'onboardingV3_completed':  { emailType: 'quiz_abandonment', delayMinutes: 180, firstTimeOnly: true },
  'newOnboarding_completed': { emailType: 'quiz_abandonment', delayMinutes: 180, firstTimeOnly: true },
  'onboarding_completed':    { emailType: 'quiz_abandonment', delayMinutes: 180, firstTimeOnly: true },

  // Day One
  'day_1_started':           { emailType: 'day1_started', delayMinutes: 0, firstTimeOnly: true },
  'day_1_completed':         { emailType: 'day1_completed', delayMinutes: 15, firstTimeOnly: true },

  // Core features — first use celebrations
  'ali_chat_viewed':         { emailType: 'first_ali_chat', delayMinutes: 30, firstTimeOnly: true },
  'daily_record_completed':  { emailType: 'first_outfit_recorded', delayMinutes: 15, firstTimeOnly: true },
  'planning_outfit_saved':   { emailType: 'first_outfit_planned', delayMinutes: 15, firstTimeOnly: true },
  'ali_4_outfit_added':      { emailType: 'first_ali_outfit', delayMinutes: 15, firstTimeOnly: true },

  // Engagement
  'closettools_14dc':        { emailType: 'challenge_started', delayMinutes: 0, firstTimeOnly: true },
  'ac_user_favors_outfit_of_the_day': { emailType: 'first_favorite', delayMinutes: 30, firstTimeOnly: true },

  // Monetization
  'payment_finish_yearly':   { emailType: 'purchase_yearly', delayMinutes: 0, firstTimeOnly: true },
  'payment_finish_monthly':  { emailType: 'purchase_monthly', delayMinutes: 0, firstTimeOnly: true },
  'payment_cancel':          { emailType: 'payment_abandoned', delayMinutes: 60, firstTimeOnly: false },
};

serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': '*',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
    });
  }

  try {
    const body = await req.json();
    const sb = createClient(SB_URL, SB_KEY);

    // Amplitude sends events as an array
    const events = Array.isArray(body) ? body : [body];
    let processed = 0;
    let skipped = 0;

    for (const event of events) {
      const eventType = event.event_type || event.name || '';
      const userId = event.user_id || '';
      const email = event.user_properties?.email
        || event.event_properties?.email
        || event.user_properties?.Email
        || '';
      const userProps = event.user_properties || {};
      const eventProps = event.event_properties || {};

      // Check if this event should trigger an email
      const trigger = EMAIL_TRIGGERS[eventType];
      if (!trigger) {
        skipped++;
        continue;
      }

      if (!email) {
        console.log(`Skip ${eventType} — no email for user ${userId}`);
        skipped++;
        continue;
      }

      // Dedup check — if firstTimeOnly, check if we already sent this email type
      if (trigger.firstTimeOnly) {
        const { data: existing } = await sb
          .from('email_jobs')
          .select('id')
          .eq('email', email)
          .eq('event_type', trigger.emailType)
          .limit(1);

        if (existing && existing.length > 0) {
          console.log(`Skip ${trigger.emailType} for ${email} — already sent`);
          skipped++;
          continue;
        }
      }

      // Calculate send time with delay
      const sendAt = new Date(Date.now() + trigger.delayMinutes * 60 * 1000);

      // Create email job with full context
      const { error } = await sb.from('email_jobs').insert({
        user_id: userId,
        email,
        event_type: trigger.emailType,
        status: 'pending',
        metadata: {
          // User profile data from Amplitude
          name: userProps.name || userProps.first_name || userProps.firstName || '',
          body_type: userProps.body_type || userProps.bodyType || '',
          color_season: userProps.color_season || userProps.colorSeason || '',
          goals: userProps.goals || [],
          wardrobe_usage: userProps.wardrobe_usage || userProps.wardrobeUsage || '',
          monthly_spend: userProps.monthly_spend || userProps.monthlySpend || '',
          shopping_habit: userProps.shopping_habit || userProps.shoppingHabit || '',
          typical_week: userProps.typical_week || userProps.typicalWeek || [],
          wardrobe_pace: userProps.wardrobe_pace || userProps.wardrobePace || '',
          is_premium: userProps.is_premium || userProps.premium || 'no',
          // Event-specific data
          event_properties: eventProps,
          // Scheduling
          send_after: sendAt.toISOString(),
          source: 'amplitude_webhook',
          original_event: eventType,
        },
      });

      if (error) {
        console.error(`DB error for ${trigger.emailType}: ${error.message}`);
      } else {
        processed++;
        console.log(`✅ Job created: ${trigger.emailType} → ${email} (send after ${sendAt.toISOString()})`);
      }
    }

    console.log(`Processed: ${processed}, Skipped: ${skipped}, Total: ${events.length}`);
    return new Response(JSON.stringify({ processed, skipped }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (err) {
    console.error('amplitude-webhook error:', (err as Error).message);
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
});
