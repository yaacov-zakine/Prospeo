
import { createClient } from '@supabase/supabase-js'
import type { Database } from './types'

const supabaseUrl = 'https://ljzhymypmecueaomcxlj.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imxqemh5bXlwbWVjdWVhb21jeGxqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA3ODEzNTYsImV4cCI6MjA2NjM1NzM1Nn0.0z7iykCSvcO5wN7IyqRPfCr8I_FZVa2Blc_lBMEiClw'

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)
