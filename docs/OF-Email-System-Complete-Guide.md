# Outfit Formulas Email System
## The Complete Guide for the Email Marketing Team

---

## How You Work: Talk to Claude, Not Tables

You don't touch Supabase. You don't write code. You don't edit databases.

You open Claude Code, type what you want in plain English, and Claude builds it for you. Claude has full access to the email system, user data, and brand voice guide.

### Getting Started

1. Open your terminal
2. Type `claude`
3. Navigate to the outfit-formulas repo: `cd ~/outfit-formulas` (or wherever it's cloned)
4. Start talking

---

## What You Can Ask Claude to Do

### Create email sequences

```
"Create a 7-day welcome sequence for new trial users from Funnel A.

Day 1: Welcome them by name, reference their quiz answers, get them to plan
their first outfit. Deep link: outfitformulas://plan-outfit

Day 2: Ask how their first morning went. Encourage recording their outfit.
Deep link: outfitformulas://record

Day 3: Introduce ALI properly. Give them 3 specific things to ask ALI based
on their body type and goals. Deep link: outfitformulas://ali-chat

Day 4: Highlight the 14-Day Challenge. Position it as the fast track to
building style confidence. Deep link: outfitformulas://challenge

Day 5: Social proof. Share a stat about how many outfits members discover.
Subtle trial conversion nudge.

Day 6: Direct trial conversion. Reference what they've done so far in the
app. Show them what they'll lose when the trial ends.

Day 7: Final day. Urgency. 'Your trial ends today.' Clear CTA to subscribe.
Deep link: outfitformulas://paywall

Make sure every email follows the SKILL.md brand voice. No em dashes."
```

Claude will create all 7 email templates and save them to Supabase. Done.

### Set up A/B testing

```
"A/B test the welcome email subject line. Create 3 variants:

A: '{{name}}, your style plan is ready'
B: 'You have 47 hidden outfits in your closet'
C: 'The outfit formula that changes everything'

Split traffic 33/33/33. After 3 days, check open rates for each
variant and tell me the winner. Then make the winner the default
and test 2 new challengers against it."
```

### Create behavioral flows

```
"Create an email for users who planned their first outfit but haven't
recorded what they wore the next day. Send 24 hours after the outfit
was planned. Reference the specific formula they were given. Encourage
them to record, takes 10 seconds. Deep link: outfitformulas://record"
```

### Create inactivity re-engagement

```
"Create a 3-email reactivation sequence for users who haven't opened
the app in 5+ days.

Email 1 (Day 5): Gentle nudge. 'Your closet misses you.' Reference
their original goals.

Email 2 (Day 8): Show them what they're missing. New formulas,
seasonal updates. Create FOMO.

Email 3 (Day 14): Final attempt. Offer something specific. 'ALI
created 3 outfits for your week. Come see them.'

If they open the app after any email, cancel the remaining sequence."
```

### Send a campaign to specific users

```
"Send a one-time email to all users who:
- Signed up more than 7 days ago
- Have an active subscription
- Have body type 'hourglass' or 'rectangle'
- Haven't used ALI chat in the last 14 days

Email should introduce a new ALI feature for their body type.
Personalise based on their color season too if available."
```

### Get reports

```
"Give me the email performance report for the last 7 days.

Show me:
- Total emails sent per template
- Open rates per template
- Click rates per template
- Which subject line variants are winning
- Top 5 emails by open rate
- Any bounces or complaints

Format it as a clean table I can share with the team."
```

### Ongoing optimization

```
"Review the last 30 days of email data. Which emails have the lowest
open rates? Suggest new subject lines for the bottom 3 performers.
Create them as A/B test variants and deploy them."
```

---

## All Available Deep Links

Use these as CTAs in your emails:

| Deep Link | Where it goes |
|-----------|--------------|
| `outfitformulas://home` | Home screen |
| `outfitformulas://ali-chat` | Chat with ALI |
| `outfitformulas://calendar` | Outfit calendar |
| `outfitformulas://plan-outfit` | Plan an outfit with ALI |
| `outfitformulas://challenge` | 14-Day Style Challenge |
| `outfitformulas://shopping-list` | Shopping list |
| `outfitformulas://record` | Record today's outfit |
| `outfitformulas://profile` | Profile settings |
| `outfitformulas://paywall` | Subscription page |
| `https://apps.apple.com/app/apple-store/id6447664832` | App Store |

---

## User Data Available for Personalisation

When writing prompts, you can reference any of this data. Claude pulls it automatically.

| Data point | Example values |
|-----------|---------------|
| name | Sarah, Emma, Michelle |
| email | user@email.com |
| body_type | triangle, inverted_triangle, rectangle, hourglass |
| color_season | spring, summer, autumn, winter |
| goals | save_time, build_wardrobe, feel_confident, style_rut, shop_smarter, define_style |
| dressing_feel | decision_fatigue, repeat_cycle, fit_frustration, identity_crisis |
| wardrobe_usage | about_20, maybe_50, almost_everything |
| monthly_spend | under_50, 50_150, 150_300, 300_plus |
| shopping_habit | event_panic, sale_trap, fantasy_self, avoid_it |
| typical_week | work_at_office, work_from_home, social_events, casual_outings, gym_fitness, shopping_tasks |
| wardrobe_pace | monthly_refresh, seasonal_overhaul, slow_steady |
| is_premium | true / false |
| trial_started_at | date |
| last_active | date |
| days_since_last_active | number |
| total_outfits_planned | number |
| total_outfits_recorded | number |
| total_ali_chats | number |

---

## Why This System is Better Than Braze

### Cost

| | Braze | This System |
|-|-------|-------------|
| Monthly cost | $3,000-$15,000+ | ~$50-100/month |
| Per email | Included in plan (but plan is expensive) | $0.0001 per email (SES) |
| AI personalisation | Extra cost (Braze AI add-on) | Included (Claude API, ~$0.003 per email) |
| 10,000 emails/month | $3,000+ | ~$4 |
| 100,000 emails/month | $5,000+ | ~$13 |

### Personalisation

| | Braze | This System |
|-|-------|-------------|
| Template variables | Basic (name, simple properties) | Full AI. Claude reads entire user profile and writes unique copy per person |
| Conditional logic | Manual liquid/connected content blocks | Natural language. "If she's an hourglass, mention..." |
| A/B testing | Built-in but rigid (2-4 variants) | Unlimited variants. Claude generates as many as you want |
| Dynamic content | Requires developer setup per block | Ask Claude in plain English |

### What we can do that Braze cannot

1. **True AI personalisation**: Every email is uniquely written for each user. Not template variables filled in. Actual unique copy that references their specific quiz answers, app behavior, body type, and goals in a natural, conversational way.

2. **Natural language campaign creation**: You describe what you want in English. No drag-and-drop builders, no liquid syntax, no developer tickets. "Send an email to everyone who..." and it happens.

3. **Behavioral intelligence**: The worker can run complex queries. "Users who planned 3+ outfits but never recorded one" or "Users whose trial ends in 2 days and haven't used ALI." Braze can do some of this but requires technical setup for each segment.

4. **Continuous AI optimization**: Claude can review performance data, suggest improvements, rewrite underperforming emails, and deploy new variants. All from a conversation. No manual campaign rebuilds.

5. **Full data ownership**: All user data, email events, and templates live in your Supabase project. No vendor lock-in. Export anything, query anything, build anything.

6. **Cost at scale**: At 100K emails/month, Braze costs $5,000+. This system costs $13 for SES + $300 for Claude API + $25 for Supabase = $338/month. That is 93% cheaper.

### What Braze does better (honestly)

1. **Visual campaign builder**: Braze has a drag-and-drop canvas for building flows. Our system uses natural language instead, which is more powerful but less visual.

2. **Push notifications**: Braze handles push + email + in-app in one tool. Our system is email-only (push is handled separately via Firebase).

3. **Real-time triggers with zero latency**: Braze triggers instantly. Our system checks every 5 minutes (configurable to 1 minute if needed).

4. **Compliance tooling**: Braze has built-in GDPR/CAN-SPAM tools. We handle unsubscribes manually via SES suppression list.

5. **Pre-built integrations**: Braze connects to 100+ tools out of the box. Our system connects to what we build.

### The bottom line

Braze is a $5K+/month enterprise tool designed for teams of 10+ marketers managing millions of users across channels.

This system does 90% of what Braze does for email at 5% of the cost, with better personalisation, and you control it all through natural conversation with Claude.

---

## Automated Reporting

Claude can generate and send reports automatically. Ask it to set up:

### Daily report (sent to team Slack or email every morning)
```
"Set up a daily email report sent at 9am to team@outfitformulas.com.

Include:
- Emails sent yesterday (by type)
- Open rate vs previous day
- Click rate vs previous day
- Any bounces or complaints
- Top performing email by open rate
- Worst performing email (candidate for optimization)
"
```

### Weekly report (every Monday)
```
"Set up a weekly report every Monday.

Include:
- Total emails sent this week vs last week
- Open rate trend (this week vs last 4 weeks)
- Click rate trend
- A/B test results and winners
- Recommendations for next week
- User growth (new signups, trial starts, conversions)
- Churn (cancellations, inactivity)
"
```

### Monthly performance review
```
"Generate a monthly email marketing report.

Include:
- Month over month growth in all metrics
- Best and worst performing email flows
- Revenue attributed to email (trial conversions after email)
- Cost breakdown (SES + Claude API)
- ROI calculation
- Recommendations for next month
"
```

---

## Quick Reference: Your First 5 Minutes

1. Open terminal, type `claude`
2. Say: "Read the SKILL.md and email worker in the outfit-formulas repo. Tell me what emails are currently set up."
3. Claude shows you everything
4. Say: "Create a welcome email for new trial users that references their quiz answers and gets them to plan their first outfit"
5. Claude creates it, saves it to Supabase, confirms it's live

That's it. You're running email marketing through conversation.
