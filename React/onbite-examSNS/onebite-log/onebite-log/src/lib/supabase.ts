import { createClient } from "@supabase/supabase-js";
import { type Database } from "@/database.types";

// 1단계에서 바꾼 이름과 똑같이 맞춰줍니다!
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export default supabase;
