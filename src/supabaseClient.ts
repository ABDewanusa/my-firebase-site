import { createClient } from '@supabase/supabase-js'

if (!process.env.REACT_APP_SUPABASE_URL) {
  throw new Error('Missing environment variable: REACT_APP_SUPABASE_URL');
}

if (!process.env.REACT_APP_SUPABASE_ANON_KEY) {
  throw new Error('Missing environment variable: REACT_APP_SUPABASE_ANON_KEY');
}

const supabaseUrl = process.env.REACT_APP_SUPABASE_URL
const supabaseAnonKey = process.env.REACT_APP_SUPABASE_ANON_KEY

console.log('Supabase Configuration:', {
  url: supabaseUrl,
  hasKey: !!supabaseAnonKey
});

export const supabase = createClient(supabaseUrl, supabaseAnonKey) 