import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  throw new Error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY environment variables');
}

// Server-side client using service role key — bypasses RLS, never expose to client
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: { persistSession: false },
});

export interface Lead {
  id?: string;
  email: string;
  funnel_id: string;
  archetype?: string;
  first_name?: string;
  quiz_answers?: Record<string, unknown>;
  opted_in?: boolean;
  created_at?: string;
}
