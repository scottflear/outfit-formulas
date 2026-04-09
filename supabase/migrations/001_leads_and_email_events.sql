-- Outfit Formulas — Lifecycle Email Testing Schema
-- Run this in your Supabase SQL editor: https://supabase.com/dashboard/project/wqxrprbabzauermasruk/sql

-- ============================================================
-- leads
-- One row per (email, funnel_id) pair.
-- Same user entering two different funnels = two rows (useful
-- for comparing conversion rates across funnels).
-- ============================================================
CREATE TABLE IF NOT EXISTS leads (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email          TEXT NOT NULL,
  funnel_id      TEXT NOT NULL,          -- 'A' through 'N'
  archetype      TEXT,                   -- e.g. 'The Closet Paralytic'
  first_name     TEXT,
  quiz_answers   JSONB    DEFAULT '{}',  -- raw answer map for personalisation
  opted_in       BOOLEAN  DEFAULT TRUE,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE (email, funnel_id)
);

-- Fast lookups by email and funnel
CREATE INDEX IF NOT EXISTS leads_email_idx     ON leads (email);
CREATE INDEX IF NOT EXISTS leads_funnel_idx    ON leads (funnel_id);
CREATE INDEX IF NOT EXISTS leads_archetype_idx ON leads (archetype);
CREATE INDEX IF NOT EXISTS leads_created_idx   ON leads (created_at DESC);

-- ============================================================
-- email_events
-- One row per event (sent, opened, clicked, bounced, unsub).
-- Lightweight alternative to Braze for funnel-specific tests.
-- ============================================================
CREATE TABLE IF NOT EXISTS email_events (
  id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id         UUID REFERENCES leads(id) ON DELETE CASCADE,
  email           TEXT NOT NULL,          -- denormalised for easy querying
  funnel_id       TEXT NOT NULL,
  event_type      TEXT NOT NULL,          -- 'sent' | 'opened' | 'clicked' | 'bounced' | 'unsubscribed'
  sequence_name   TEXT,                   -- e.g. 'funnel_a_day1_welcome'
  step_number     INT,                    -- day 0 = immediate, 1 = day 1, 3 = day 3 …
  email_subject   TEXT,
  metadata        JSONB DEFAULT '{}',     -- link clicked, device, etc.
  created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS email_events_lead_idx      ON email_events (lead_id);
CREATE INDEX IF NOT EXISTS email_events_email_idx     ON email_events (email);
CREATE INDEX IF NOT EXISTS email_events_funnel_idx    ON email_events (funnel_id);
CREATE INDEX IF NOT EXISTS email_events_sequence_idx  ON email_events (sequence_name);
CREATE INDEX IF NOT EXISTS email_events_type_idx      ON email_events (event_type);
CREATE INDEX IF NOT EXISTS email_events_created_idx   ON email_events (created_at DESC);

-- ============================================================
-- Row Level Security
-- leads and email_events are server-only — no direct client access
-- ============================================================
ALTER TABLE leads        ENABLE ROW LEVEL SECURITY;
ALTER TABLE email_events ENABLE ROW LEVEL SECURITY;

-- Only service role (server) can read/write — public anon key gets nothing
CREATE POLICY "service_role_only_leads"
  ON leads FOR ALL
  USING (auth.role() = 'service_role');

CREATE POLICY "service_role_only_email_events"
  ON email_events FOR ALL
  USING (auth.role() = 'service_role');
