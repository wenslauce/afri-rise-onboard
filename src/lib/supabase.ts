
import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://hdazlaekesfwvajdmkvx.supabase.co';
export const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhkYXpsYWVrZXNmd3ZhamRta3Z4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDIzODk1OTEsImV4cCI6MjA1Nzk2NTU5MX0.ZKBPDIDr94ldEYnLTE7jgWBKxqxJvjQ-itrWPXQ-DIM';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
