-- Outfit Formulas - User Profiles + Activity Tables
-- Run in SQL Editor for project wqxrprbabzauermasruk

-- User profiles (one row per user, upserted on changes)
CREATE TABLE IF NOT EXISTS user_profiles (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT UNIQUE NOT NULL,
  email TEXT NOT NULL,
  name TEXT,
  body_type TEXT,
  color_season TEXT,
  goals TEXT[] DEFAULT '{}',
  dressing_feel TEXT[] DEFAULT '{}',
  wardrobe_usage TEXT,
  monthly_spend TEXT,
  shopping_habit TEXT,
  typical_week TEXT[] DEFAULT '{}',
  work_dress_codes TEXT[] DEFAULT '{}',
  wardrobe_pace TEXT,
  is_premium BOOLEAN DEFAULT false,
  trial_started_at TIMESTAMPTZ,
  onboarding_completed BOOLEAN DEFAULT false,
  last_active TIMESTAMPTZ DEFAULT now(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_profiles_email ON user_profiles(email);
CREATE INDEX IF NOT EXISTS idx_user_profiles_user_id ON user_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_user_profiles_last_active ON user_profiles(last_active);

-- User activity (append-only event log)
CREATE TABLE IF NOT EXISTS user_activity (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id TEXT NOT NULL,
  email TEXT NOT NULL,
  event_type TEXT NOT NULL,
  properties JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_user_activity_user_id ON user_activity(user_id);
CREATE INDEX IF NOT EXISTS idx_user_activity_email ON user_activity(email);
CREATE INDEX IF NOT EXISTS idx_user_activity_event_type ON user_activity(event_type);
CREATE INDEX IF NOT EXISTS idx_user_activity_created_at ON user_activity(created_at);

-- RLS + service role access
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_activity ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anon can insert profiles" ON user_profiles FOR INSERT WITH CHECK (true);
CREATE POLICY "Anon can update own profile" ON user_profiles FOR UPDATE USING (true);
CREATE POLICY "Anon can insert activity" ON user_activity FOR INSERT WITH CHECK (true);
CREATE POLICY "Service role full access profiles" ON user_profiles FOR ALL USING (true);
CREATE POLICY "Service role full access activity" ON user_activity FOR ALL USING (true);
