// ============================================
// Supabase Configuration
// REPLACE these with your actual Supabase project values
// Found at: supabase.com → Your Project → Settings → API
// ============================================

const SUPABASE_URL = 'https://smhhmxiilbdssrgwckyg.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNtaGhteGlpbGJkc3NyZ3dja3lnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI2NDQxNjQsImV4cCI6MjA4ODIyMDE2NH0.r3oHxJzcpTRJ2l_Tp7BiK_Hafo4zteUxKhad1vDokUA';

// Initialize Supabase client
// Using window.supabase (from CDN) to create the client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
