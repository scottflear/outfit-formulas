import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const SB_URL  = Deno.env.get('SUPABASE_URL')!;
const SB_KEY  = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;

// Outfit Formulas email tracking
const EXPECTED_CONFIG_SET = 'outfitformulas-behavioral';
const BRAND               = 'outfitformulas';

serve(async (req) => {
  try {
    const body = await req.text();
    const sns  = JSON.parse(body);

    // SNS subscription confirmation
    if (sns.Type === 'SubscriptionConfirmation') {
      await fetch(sns.SubscribeURL);
      return new Response('confirmed', { status: 200 });
    }

    if (sns.Type !== 'Notification') {
      return new Response('skip', { status: 200 });
    }

    const message = JSON.parse(sns.Message);
    const mail    = message.mail || {};

    // Config set filter
    const configSet = mail.tags?.['ses:configuration-set']?.[0] || '';
    const headers    = mail.headers || [];
    const configHdr  = headers.find((h: any) => h.name === 'X-SES-CONFIGURATION-SET')?.value || '';

    if (configSet !== EXPECTED_CONFIG_SET && configHdr !== EXPECTED_CONFIG_SET) {
      console.log(`Skipping — configSet: "${configSet}" / header: "${configHdr}" — not ${EXPECTED_CONFIG_SET}`);
      return new Response('skip:wrong-brand', { status: 200 });
    }

    const eventType = (message.eventType || message.notificationType || '').toLowerCase();
    const recipient  = mail.destination?.[0] || mail.commonHeaders?.to?.[0] || '';
    const messageId  = mail.messageId || '';

    // Extract tags from SES
    const tags = mail.tags || {};
    const emailType = tags['event_type']?.[0] || null;
    const jobId     = tags['job_id']?.[0] || null;
    const userId    = tags['user_id']?.[0] || null;

    let payload: Record<string, any> = { configSet: EXPECTED_CONFIG_SET };

    if (eventType === 'open') {
      const open = message.open || {};
      payload.open = { ipAddress: open.ipAddress, timestamp: open.timestamp, userAgent: open.userAgent };
    } else if (eventType === 'click') {
      const click = message.click || {};
      payload.click = { link: click.link, ipAddress: click.ipAddress, timestamp: click.timestamp };
    } else if (eventType === 'bounce') {
      const bounce = message.bounce || {};
      payload.bounce = { bounceType: bounce.bounceType, bounceSubType: bounce.bounceSubType };
    } else if (eventType === 'complaint') {
      payload.complaint = message.complaint || {};
    } else if (eventType === 'delivery') {
      payload.delivery = { timestamp: mail.timestamp, processingTimeMillis: message.delivery?.processingTimeMillis };
    }

    const sb = createClient(SB_URL, SB_KEY);
    const { error } = await sb.from('email_events').insert({
      brand:      BRAND,
      event_type: eventType,
      email_type: emailType,
      recipient,
      user_id:    userId,
      message_id: messageId,
      payload:    { ...payload, job_id: jobId },
    });

    if (error) {
      console.error('DB insert error:', error.message);
      return new Response('db-error', { status: 500 });
    }

    console.log(`✅ ${BRAND} ${eventType} → ${recipient} | email_type=${emailType || 'none'}`);
    return new Response('ok', { status: 200 });

  } catch (err) {
    console.error('ses-events error:', err);
    return new Response('error', { status: 500 });
  }
});
