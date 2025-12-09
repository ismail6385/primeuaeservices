import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// Fallback to avoid crash if env vars are missing
const url = supabaseUrl || 'https://placeholder.supabase.co';
const key = supabaseKey || 'placeholder';

if (!supabaseUrl || !supabaseKey) {
    console.warn('⚠️ Supabase credentials missing! Authentication features will not work.');
    console.warn('NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅ Set' : '❌ Missing');
    console.warn('NEXT_PUBLIC_SUPABASE_ANON_KEY:', supabaseKey ? '✅ Set' : '❌ Missing');
}

const isClient = typeof window !== 'undefined';

export const supabase = createClient(url, key, {
    auth: {
        persistSession: isClient,
        autoRefreshToken: isClient,
        detectSessionInUrl: isClient,
        flowType: 'pkce',
    },
});
