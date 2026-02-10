import { createClient, SupabaseClient } from "@supabase/supabase-js";
import { AppError } from "../utils/appErorr.js";

let supabase: SupabaseClient | null = null;

export const getSupabase = () => {
    if (supabase) return supabase;

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;

    if (!supabaseUrl || !supabaseKey) {
        throw new AppError("SUPABASE_URL or SUPABASE_KEY is not defined", 500, false);
    }

    supabase = createClient(supabaseUrl, supabaseKey);
    console.log("Supabase connected successfully");

    return supabase;
};
