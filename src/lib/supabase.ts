import { createClient } from "@supabase/supabase-js";

// Fungsi pembersih untuk mengatasi duplikasi/spasi yang tidak sengaja pada environment variables di Vercel
const sanitizeEnv = (val: string | undefined): string => {
  if (!val) return "";
  const clean = val.trim().split(/\s+/)[0];
  return clean || "";
};

const rawUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.SUPABASE_URL || 
  "";

const rawKey = 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || 
  process.env.SUPABASE_ANON_KEY || 
  "";

export const supabaseUrl = sanitizeEnv(rawUrl);
export const supabaseAnonKey = sanitizeEnv(rawKey);

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn("Peringatan: Supabase URL atau Anon Key tidak terdefinisi di environment variables.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
