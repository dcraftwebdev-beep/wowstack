import { createClient } from "@supabase/supabase-js";

/**
 * Supabase client.
 * Add your keys to a `.env` file at the project root (see .env.example):
 *   VITE_SUPABASE_URL=https://xxxx.supabase.co
 *   VITE_SUPABASE_ANON_KEY=eyJ...
 * Until they're set, the site falls back to the seed projects so nothing breaks.
 */
const url = import.meta.env.VITE_SUPABASE_URL;
const key = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = url && key ? createClient(url, key) : null;
export const isSupabaseConfigured = Boolean(supabase);
