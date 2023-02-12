import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'

const supabaseUrl = "https://izufjinmhsdmimuembkt.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml6dWZqaW5taHNkbWltdWVtYmt0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzYxMTA4NjksImV4cCI6MTk5MTY4Njg2OX0.Spp6p7KurF2xrtNus72Hp5atZgQGb_ljESqk-T4hARQ"

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey)