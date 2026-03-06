// ============================================
// Supabase Configuration
// REPLACE these with your actual Supabase project values
// Found at: supabase.com → Your Project → Settings → API
// ============================================

const SUPABASE_URL = 'https://pziozgokvdbwiutskjwn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB6aW96Z29rdmRid2l1dHNranduIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI3MTIzODUsImV4cCI6MjA4ODI4ODM4NX0.GmxvpwEKpTlx_hBQwyJ54LjmQsVedhFrE7mx8soVmGQ';

// Initialize Supabase client
// Using window.supabase (from CDN) to create the client
const supabaseClient = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
