// ============================================
// Auth Guard & Utility Functions
// Include this on all protected pages after supabase-config.js
// ============================================

// Get current logged-in user
async function getCurrentUser() {
    const { data: { user }, error } = await supabaseClient.auth.getUser();
    if (error || !user) return null;
    return user;
}

// Get current user's profile (with role, name)
async function getUserProfile() {
    const user = await getCurrentUser();
    if (!user) return null;

    const { data: profile, error } = await supabaseClient
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (error) return null;
    return profile;
}

// Check if current user is admin
async function isAdmin() {
    const profile = await getUserProfile();
    return profile && profile.role === 'admin';
}

// Logout
async function logout() {
    await supabaseClient.auth.signOut();
    window.location.href = 'index.html';
}

// Protect a page — redirect to login if not authenticated
async function requireAuth() {
    const user = await getCurrentUser();
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    return user;
}

// Protect admin pages — redirect if not admin
async function requireAdmin() {
    const profile = await getUserProfile();
    if (!profile || profile.role !== 'admin') {
        window.location.href = 'dashboard.html';
        return null;
    }
    return profile;
}

// Extract YouTube video ID from various URL formats
function extractYouTubeId(urlStr) {
    if (!urlStr) return null;

    // If it's already an 11-character ID, just return it
    if (/^[a-zA-Z0-9_-]{11}$/.test(urlStr)) {
        return urlStr;
    }

    try {
        const url = new URL(urlStr);

        // Handle youtu.be/ID
        if (url.hostname === 'youtu.be') {
            return url.pathname.slice(1);
        }

        // Handle youtube.com/watch?v=ID
        if (url.hostname.includes('youtube.com')) {
            if (url.pathname === '/watch') {
                return url.searchParams.get('v');
            }
            // Handle youtube.com/embed/ID
            if (url.pathname.startsWith('/embed/')) {
                return url.pathname.split('/')[2];
            }
            // Handle youtube.com/shorts/ID
            if (url.pathname.startsWith('/shorts/')) {
                return url.pathname.split('/')[2];
            }
        }
    } catch (e) {
        // Fallback for malformed URLs
        const match = urlStr.match(/(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/i);
        if (match) return match[1];
    }

    return null;
}

// Format date
function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('en-IN', {
        day: 'numeric', month: 'short', year: 'numeric'
    });
}

// Show toast notification
function showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}
