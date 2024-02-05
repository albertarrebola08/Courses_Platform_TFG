import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
const storageBucket = import.meta.env.VITE_STORAGE_BUCKET;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey,
  storageBucket
);
