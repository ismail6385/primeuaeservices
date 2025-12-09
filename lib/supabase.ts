import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

const isClient = typeof window !== 'undefined';

// Lazy initialization to prevent build-time errors when env vars are missing
let supabaseInstance: SupabaseClient | null = null;

function getSupabaseClient(): SupabaseClient {
    if (supabaseInstance) {
        return supabaseInstance;
    }

    // Validate that we have both URL and key (check for empty strings too)
    if (!supabaseUrl || !supabaseKey || (typeof supabaseUrl === 'string' && supabaseUrl.trim() === '') || (typeof supabaseKey === 'string' && supabaseKey.trim() === '')) {
        // During build time, we can't create a valid client
        // We'll create a proxy that throws helpful errors when accessed at runtime
        // This allows the module to be imported without errors during build
        const errorMsg = 'Supabase credentials are missing. Please set NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY environment variables.';
        
        // Create a proxy that throws helpful errors when accessed
        // This prevents build errors while making runtime errors clear
        supabaseInstance = new Proxy({} as SupabaseClient, {
            get(_target, prop) {
                if (isClient) {
                    console.error('⚠️', errorMsg);
                }
                throw new Error(`${errorMsg} Attempted to access: ${String(prop)}`);
            },
        });
        return supabaseInstance;
    }

    // Validate URL format before creating client
    // Supabase will validate this too, but we do it first to provide better error messages
    if (!supabaseUrl.startsWith('http://') && !supabaseUrl.startsWith('https://')) {
        const error = new Error('NEXT_PUBLIC_SUPABASE_URL must be a valid HTTP/HTTPS URL');
        // During build, we want to fail fast with a clear error
        throw error;
    }

    // Validate that it looks like a Supabase URL (warning only, not an error)
    if (!supabaseUrl.includes('.supabase.co') && !supabaseUrl.includes('supabase')) {
        console.warn('⚠️ NEXT_PUBLIC_SUPABASE_URL does not appear to be a valid Supabase URL');
    }

    try {
        supabaseInstance = createClient(supabaseUrl, supabaseKey, {
            auth: {
                persistSession: isClient,
                autoRefreshToken: isClient,
                detectSessionInUrl: isClient,
                flowType: 'pkce',
            },
        });
    } catch (error) {
        // If createClient fails (e.g., invalid URL format), throw a helpful error
        throw new Error(
            `Failed to create Supabase client: ${error instanceof Error ? error.message : 'Unknown error'}. ` +
            `Please check that NEXT_PUBLIC_SUPABASE_URL is a valid Supabase project URL.`
        );
    }

    return supabaseInstance;
}

// Export a getter that creates the client on first access
// This allows the module to be imported during build without errors
// The client will only be created when actually used (at runtime)
export const supabase = new Proxy({} as SupabaseClient, {
    get(_target, prop) {
        const client = getSupabaseClient();
        const value = (client as any)[prop];
        if (typeof value === 'function') {
            return value.bind(client);
        }
        return value;
    },
});
