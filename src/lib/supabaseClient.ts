import { createClient, type PostgrestError } from '@supabase/supabase-js'

// Get the Supabase URL and Anon Key from your environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Create and export the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Supabase queries occasionally hit a transient "TypeError: fetch failed"
// (a dropped connection to the REST endpoint, not a real query/permission
// error) - a couple of quick retries clear these without masking a genuine,
// repeatable failure, which comes back as the same error every time anyway.
export async function queryWithRetry<T>(
  query: () => PromiseLike<{ data: T | null; error: PostgrestError | null }>,
  attempts = 3
): Promise<{ data: T | null; error: PostgrestError | null }> {
  let result = await query()
  for (let i = 1; i < attempts && result.error; i++) {
    await new Promise(resolve => setTimeout(resolve, 300 * i))
    result = await query()
  }
  return result
}