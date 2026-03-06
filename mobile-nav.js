document.addEventListener("DOMContentLoaded", () => {
    // 1. Inject CSS
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = 'mobile-nav.css';
    document.head.appendChild(link);

    // 2. Add hamburger button to headers/navbars
    const navbars = document.querySelectorAll('.navbar, header');

    navbars.forEach(navbar => {
        // Find link container
        const navLinks = navbar.querySelector('.nav-links') || navbar.querySelector('ul') || navbar.querySelector('nav');
        if (!navLinks) return;

        // Create the hamburger
        const hamburger = document.createElement('button');
        hamburger.className = 'mobile-menu-btn';
        hamburger.innerHTML = '<span></span><span></span><span></span>';

        // Append it based on the DOM structure
        const navUser = navbar.querySelector('.nav-user');
        if (navUser) {
            navUser.appendChild(hamburger);
        } else {
            // For quizzes or ABOUT.html
            navbar.appendChild(hamburger);
            navbar.style.display = 'flex';
            navbar.style.justifyContent = 'space-between';
            navbar.style.alignItems = 'center';
            navbar.style.flexWrap = 'wrap';
        }

        // Toggle logic
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('open');
            navLinks.classList.toggle('open');
        });
    });
});
