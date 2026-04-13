/**
 * Outfit Formulas — Behavioral Email Worker
 *
 * Picks up email_jobs from Supabase (created by Amplitude webhooks),
 * generates personalised emails via Claude Sonnet 4.6, sends via AWS SES.
 *
 * Run via cron every 5 minutes on Lightsail.
 * crontab: */5 * * * * cd /home/ubuntu/outfit-formulas && node of-email-worker.cjs >> /home/ubuntu/logs/of-emails.log 2>&1
 */

require('dotenv').config({ path: require('path').join(__dirname, 'of.env') });
const { createClient } = require('@supabase/supabase-js');
const { SESClient, SendEmailCommand } = require('@aws-sdk/client-ses');
const Anthropic = require('@anthropic-ai/sdk');

// ── Config ──────────────────────────────────────────────────────────────────
const SUPABASE_URL = process.env.OF_SUPABASE_URL || 'https://wqxrprbabzauermasruk.supabase.co';
const SUPABASE_KEY = process.env.OF_SUPABASE_KEY;
const CLAUDE_API_KEY = process.env.OF_CLAUDE_API_KEY;
const SES_FROM_EMAIL = 'info@outfitformulas.com';
const SES_FROM_NAME = 'Outfit Formulas';
const SES_REPLY_TO = 'info@outfitformulas.com';
const SES_CONFIG_SET = 'outfitformulas-behavioral';
const SES_REGION = process.env.SES_REGION || 'us-east-1';
const BATCH_SIZE = 20;

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);
const sesClient = new SESClient({
    region: SES_REGION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
});
const claude = new Anthropic({ apiKey: CLAUDE_API_KEY });

// ── Email Template ──────────────────────────────────────────────────────────
function wrapInEmailTemplate(innerHtml, previewText = '') {
    const previewSpan = previewText
        ? `<span style="display:none;font-size:1px;color:#f4f4f5;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;">${previewText}</span>`
        : '';

    return `<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0"></head>
<body style="background-color:#FFF8F5;font-family:'Georgia',serif;padding:40px 0;margin:0;color:#2D2926;">
${previewSpan}
<table align="center" width="100%" border="0" cellpadding="0" cellspacing="0" style="background-color:#FFFFFF;max-width:600px;margin:0 auto;border:1px solid #F0E6E0;border-radius:12px;overflow:hidden;">
<tr><td style="padding:40px 40px 0 40px;">
  <img src="https://outfitformulas.com/logo.png" alt="Outfit Formulas" style="height:28px;margin-bottom:24px;" />
</td></tr>
<tr><td style="padding:20px 40px 32px 40px;color:#2D2926;font-size:16px;line-height:26px;">
${innerHtml}
</td></tr>
<tr><td style="padding:0 40px 32px 40px;">
  <p style="font-size:12px;color:#9B8B80;border-top:1px solid #F0E6E0;padding-top:20px;margin-top:0;">
    &copy; 2026 Outfit Formulas. All rights reserved.<br>
    <a href="https://outfitformulas.com/unsubscribe?email={{EMAIL}}" style="color:#9B8B80;">Unsubscribe</a>
  </p>
</td></tr>
</table>
</body></html>`;
}

// ── Email Generation Prompts ────────────────────────────────────────────────
const EMAIL_PROMPTS = {
    welcome_trial: (payload) => ({
        preview: 'Your style journey starts now',
        systemPrompt: `You are writing a warm, personal welcome email for Outfit Formulas — a women's style app that helps women get dressed confidently every morning using AI-powered outfit formulas.

The user just started a free trial. Write a short, warm email (3-4 paragraphs) that:
1. Welcomes them by name (or "lovely" if no name)
2. References their specific style goals from onboarding if available
3. Tells them the ONE thing to do today: open the app and plan their first outfit
4. Ends with excitement about their style transformation

Tone: warm, encouraging, like a stylish best friend. NOT corporate. NOT salesy.
Use short paragraphs. Include a CTA link.
Output ONLY the HTML body content (no <html>, <head>, <body> tags). Use <p> tags with inline styles.`,
        userPrompt: `User data: ${JSON.stringify(payload)}
CTA link: outfitformulas://home
CTA text: Plan My First Outfit`,
    }),

    welcome_signup: (payload) => ({
        preview: 'Welcome to Outfit Formulas',
        systemPrompt: `Write a brief welcome email for a new Outfit Formulas signup. Warm, personal, encouraging. Reference their onboarding answers if available. Tell them to plan their first outfit. 3 short paragraphs max. HTML body only with <p> tags.`,
        userPrompt: `User data: ${JSON.stringify(payload)}
CTA link: outfitformulas://home`,
    }),

    onboarding_complete: (payload) => ({
        preview: 'Your personalized style plan is ready',
        systemPrompt: `Write a congratulatory email for someone who just completed Outfit Formulas onboarding. Reference their specific answers:
- Their dressing struggles (decision fatigue, repeat cycle, etc.)
- Their goals (save time, build wardrobe, feel confident, etc.)
- Their body type and color season if provided
- Their wardrobe pace preference

Make them feel seen. Tell them ALI (the AI stylist) is ready. Push them to plan their first outfit.
3-4 paragraphs, warm best-friend tone. HTML body only.`,
        userPrompt: `User data: ${JSON.stringify(payload)}
CTA link: outfitformulas://plan-outfit
CTA text: Meet ALI & Plan Your First Outfit`,
    }),

    day1_completed: (payload) => ({
        preview: 'Your first outfit is planned!',
        systemPrompt: `Write a celebration email — the user just planned their first outfit in the app! This is a big moment.
Be genuinely excited. Reference that tomorrow morning will be different — no staring at the closet.
Encourage them to record what they wear tomorrow (builds the habit).
2-3 short paragraphs. Warm, excited tone. HTML body only.`,
        userPrompt: `User data: ${JSON.stringify(payload)}
CTA link: outfitformulas://calendar
CTA text: See Tomorrow's Outfit`,
    }),

    first_ali_chat: (payload) => ({
        preview: 'How was your first chat with ALI?',
        systemPrompt: `Write a follow-up email 30 minutes after the user's first chat with ALI (the AI stylist).
Ask how it went. Suggest 2-3 things they can ask ALI next (be specific to style advice).
Keep it short — 2 paragraphs. Conversational. HTML body only.`,
        userPrompt: `User data: ${JSON.stringify(payload)}
CTA link: outfitformulas://ali-chat
CTA text: Chat with ALI Again`,
    }),

    first_outfit_recorded: (payload) => ({
        preview: 'Love this! Your first outfit recorded',
        systemPrompt: `Write a celebration email — the user just recorded their first outfit photo!
Celebrate the moment. Tell them this is how they build their style history.
Encourage them to keep recording daily — it takes 10 seconds and ALI learns their preferences.
2 short paragraphs, excited tone. HTML body only.`,
        userPrompt: `User data: ${JSON.stringify(payload)}
CTA link: outfitformulas://record
CTA text: Keep the Streak Going`,
    }),

    first_outfit_planned: (payload) => ({
        preview: 'Your outfit is ready for tomorrow',
        systemPrompt: `Write an encouraging email — the user just saved their first planned outfit.
Tomorrow morning will be easy. No decision fatigue. Just get dressed and go.
Mention setting up morning reminders if they haven't.
2 short paragraphs. HTML body only.`,
        userPrompt: `User data: ${JSON.stringify(payload)}
CTA link: outfitformulas://calendar`,
    }),

    challenge_started: (payload) => ({
        preview: 'Day 1 of your 14-Day Style Challenge!',
        systemPrompt: `Write an exciting kickoff email for the 14-Day Style Challenge.
Day 1 is about understanding what's in their closet. Build anticipation for the journey.
Reference that by Day 14 they'll have a completely transformed wardrobe mindset.
3 paragraphs. Motivating coach tone. HTML body only.`,
        userPrompt: `User data: ${JSON.stringify(payload)}
CTA link: outfitformulas://challenge
CTA text: Start Day 1`,
    }),

    payment_abandoned: (payload) => ({
        preview: 'Still thinking about it?',
        systemPrompt: `Write a gentle follow-up for someone who started checkout but didn't complete.
Don't be pushy. Acknowledge that it's a decision. Reference their specific style struggles from onboarding.
Remind them of the 7-day free trial — zero risk.
End with a soft CTA. 2-3 paragraphs. HTML body only.`,
        userPrompt: `User data: ${JSON.stringify(payload)}
CTA link: outfitformulas://paywall
CTA text: Start My Free Trial`,
    }),

    purchase_yearly: (payload) => ({
        preview: 'Welcome to the Outfit Formulas family',
        systemPrompt: `Write a warm thank-you email for a yearly subscriber. They're committed. Make them feel valued.
Tell them what's unlocked. Suggest their first 3 actions in the app.
Mention the 14-Day Challenge as a great starting point.
3 paragraphs. Grateful, exciting tone. HTML body only.`,
        userPrompt: `User data: ${JSON.stringify(payload)}`,
    }),

    purchase_monthly: (payload) => ({
        preview: 'Welcome to Outfit Formulas',
        systemPrompt: `Write a welcome email for a new monthly subscriber. Same as yearly but slightly shorter.
2 paragraphs. HTML body only.`,
        userPrompt: `User data: ${JSON.stringify(payload)}`,
    }),
};

// Fallback for unmapped email types
const DEFAULT_PROMPT = (emailType, payload) => ({
    preview: 'Update from Outfit Formulas',
    systemPrompt: `Write a short, friendly email from Outfit Formulas about the event "${emailType}". Keep it warm and encouraging. 2 paragraphs max. HTML body only with <p> tags and inline styles.`,
    userPrompt: `Event type: ${emailType}\nUser data: ${JSON.stringify(payload)}`,
});

// ── Main Worker ─────────────────────────────────────────────────────────────
async function processEmailJobs() {
    const now = new Date().toISOString();

    // Fetch pending jobs where send_after has passed
    const { data: jobs, error } = await supabase
        .from('email_jobs')
        .select('*')
        .eq('status', 'pending')
        .lte('payload->>send_after', now)
        .order('created_at', { ascending: true })
        .limit(BATCH_SIZE);

    if (error) {
        console.error('DB fetch error:', error.message);
        return;
    }

    if (!jobs || jobs.length === 0) {
        console.log(`[${new Date().toISOString()}] No pending jobs`);
        return;
    }

    console.log(`[${new Date().toISOString()}] Processing ${jobs.length} jobs`);

    for (const job of jobs) {
        try {
            const payload = job.payload || {};
            const firstName = payload.name || 'lovely';
            const userEmail = job.email;

            if (!userEmail) {
                console.log(`[${job.id}] SKIP — no email`);
                await supabase.from('email_jobs').update({ status: 'failed', error_message: 'No email address' }).eq('id', job.id);
                continue;
            }

            // Get prompt config for this email type
            const promptConfig = EMAIL_PROMPTS[job.event_type]
                ? EMAIL_PROMPTS[job.event_type](payload)
                : DEFAULT_PROMPT(job.event_type, payload);

            // Generate email with Claude
            const response = await claude.messages.create({
                model: 'claude-sonnet-4-6-20250514',
                max_tokens: 1024,
                system: promptConfig.systemPrompt,
                messages: [{ role: 'user', content: promptConfig.userPrompt }],
            });

            const generatedHtml = response.content[0]?.text || `<p>Hi ${firstName}, thanks for using Outfit Formulas!</p>`;

            // Extract subject from first line if it looks like one, otherwise generate
            let subject = `${firstName}, your style update`;
            let bodyHtml = generatedHtml;

            // If Claude included a subject line, extract it
            const subjectMatch = generatedHtml.match(/^Subject:\s*(.+?)(?:\n|<br|<p)/i);
            if (subjectMatch) {
                subject = subjectMatch[1].trim();
                bodyHtml = generatedHtml.replace(/^Subject:\s*.+?(?:\n|<br|<p)/i, '');
            } else {
                // Generate a subject based on email type
                const subjects = {
                    welcome_trial: `${firstName}, welcome to Outfit Formulas`,
                    welcome_signup: `${firstName}, let's transform your mornings`,
                    onboarding_complete: `${firstName}, your style plan is ready`,
                    day1_completed: `${firstName}, you planned your first outfit!`,
                    first_ali_chat: `How was chatting with ALI?`,
                    first_outfit_recorded: `Love it! Your first outfit recorded`,
                    first_outfit_planned: `Tomorrow's outfit is sorted`,
                    challenge_started: `Day 1 of your 14-Day Style Challenge`,
                    payment_abandoned: `${firstName}, still thinking about it?`,
                    purchase_yearly: `Welcome to the family, ${firstName}`,
                    purchase_monthly: `Welcome, ${firstName}!`,
                };
                subject = subjects[job.event_type] || subject;
            }

            // Wrap in template
            const fullHtml = wrapInEmailTemplate(bodyHtml, promptConfig.preview)
                .replace('{{EMAIL}}', encodeURIComponent(userEmail));

            // Send via SES
            await sesClient.send(new SendEmailCommand({
                Destination: { ToAddresses: [userEmail] },
                Message: {
                    Body: { Html: { Data: fullHtml } },
                    Subject: { Data: subject },
                },
                Source: `"${SES_FROM_NAME}" <${SES_FROM_EMAIL}>`,
                ReplyToAddresses: [SES_REPLY_TO],
                ConfigurationSetName: SES_CONFIG_SET,
                Tags: [
                    { Name: 'event_type', Value: job.event_type },
                    { Name: 'job_id', Value: job.id },
                    { Name: 'user_id', Value: job.user_id || 'unknown' },
                    { Name: 'brand', Value: 'outfitformulas' },
                ],
            }));

            // Mark as sent
            await supabase.from('email_jobs')
                .update({ status: 'sent', processed_at: new Date().toISOString() })
                .eq('id', job.id);

            console.log(`[${job.id}] SENT | type=${job.event_type} | to=${userEmail}`);

        } catch (err) {
            console.error(`[${job.id}] ERR: ${err.message}`);
            await supabase.from('email_jobs')
                .update({ status: 'failed', error_message: err.message })
                .eq('id', job.id);
        }
    }

    console.log(`[${new Date().toISOString()}] Batch complete`);
}

processEmailJobs();
