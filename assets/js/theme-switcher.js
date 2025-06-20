document.addEventListener('DOMContentLoaded', () => {
    const gearButton = document.getElementById('gearButton');
    const themeContent = document.getElementById('themeContent');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptButton = cookieConsent.querySelector('.accept');
    const rejectButton = cookieConsent.querySelector('.reject');

    // Function to set the theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.theme === theme);
        });
    }

    // Toggle theme content visibility
    gearButton.addEventListener('click', (e) => {
        e.stopPropagation();
        themeContent.classList.toggle('visible');
    });

    // Close theme content if clicking outside
    document.addEventListener('click', (e) => {
        if (!themeContent.contains(e.target) && !gearButton.contains(e.target)) {
            themeContent.classList.remove('visible');
        }
    });

    // Handle theme button clicks
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            setTheme(button.dataset.theme);
        });
    });

    // Cookie Consent Logic
    function showCookieConsent() {
        cookieConsent.style.display = 'block';
    }

    function hideCookieConsent() {
        cookieConsent.style.display = 'none';
    }

    acceptButton.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'given');
        const savedTheme = localStorage.getItem('theme') || 'a'; // Default to 'a' if nothing saved
        setTheme(savedTheme);
        hideCookieConsent();
    });

    rejectButton.addEventListener('click', () => {
        localStorage.setItem('cookie_consent', 'rejected');
        hideCookieConsent();
    });

    // Check for cookie consent on page load
    const consent = localStorage.getItem('cookie_consent');
    if (consent === 'given') {
        const savedTheme = localStorage.getItem('theme') || 'a';
        setTheme(savedTheme);
    } else if (consent !== 'rejected') {
        showCookieConsent();
    }
}); 