# Outfit Formulas Email Worker

Behavioral email system powered by Amplitude webhooks → Supabase → Claude → SES.

## How it works

1. User does something in the app (e.g. starts trial, plans outfit, chats with ALI)
2. Amplitude fires event → webhook → Supabase `email_jobs` table
3. This worker picks up pending jobs every 5 minutes
4. Claude Sonnet 4.6 generates a personalised email using the user's profile data
5. SES sends it from `info@outfitformulas.com`
6. Opens/clicks tracked via SES → SNS → Supabase `email_events`

## Deploy to Lightsail

```bash
# Copy files to server
scp -r . ubuntu@YOUR_IP:/home/ubuntu/outfit-formulas/

# SSH in
ssh ubuntu@YOUR_IP

# Install deps
cd /home/ubuntu/outfit-formulas && npm install

# Update of.env with real AWS_SECRET_ACCESS_KEY

# Test run
node of-email-worker.cjs

# Add to crontab (every 5 minutes)
crontab -e
# Add: */5 * * * * cd /home/ubuntu/outfit-formulas && node of-email-worker.cjs >> /home/ubuntu/logs/of-emails.log 2>&1
```

## Adding new email triggers

1. Add the event to Amplitude webhook sync (Data Destinations → Custom Emails)
2. Add the event to `EMAIL_TRIGGERS` in the amplitude-webhook edge function
3. Add the prompt to `EMAIL_PROMPTS` in this worker
4. Deploy both

## Email types

| Type | Trigger | Delay |
|------|---------|-------|
| welcome_trial | free_trial_start | Instant |
| welcome_signup | signup_complete | Instant |
| onboarding_complete | onboardingV3_completed | 30 min |
| day1_completed | day_1_completed | 15 min |
| first_ali_chat | ali_chat_viewed | 30 min |
| first_outfit_recorded | daily_record_completed | 15 min |
| first_outfit_planned | planning_outfit_saved | 15 min |
| challenge_started | closettools_14dc | Instant |
| payment_abandoned | payment_cancel | 60 min |
| purchase_yearly | payment_finish_yearly | Instant |
| purchase_monthly | payment_finish_monthly | Instant |
