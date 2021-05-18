import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://asihfcywbxbdwxcliklq.supabase.co";
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;
export const client = createClient(supabaseUrl, supabaseKey);
