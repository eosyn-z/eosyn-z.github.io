document.addEventListener('DOMContentLoaded', () => {
    const gearButton = document.getElementById('gearButton');
    const themeContent = document.getElementById('themeContent');
    const themeButtons = document.querySelectorAll('.theme-btn');
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptButton = cookieConsent?.querySelector('.accept');
    const rejectButton = cookieConsent?.querySelector('.reject');

    // Helper functions for cookies
    function setCookie(name, value, days) {
        let expires = '';
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = '; expires=' + date.toUTCString();
        }
        document.cookie = name + '=' + (value || '') + expires + '; path=/';
    }
    function getCookie(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }

    // Function to set the theme
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        // Only save to cookie if consent is given
        if (getCookie('cookie_consent') === 'given') {
            setCookie('theme', theme, 3650);
        }
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
        if (cookieConsent) {
            cookieConsent.style.display = 'block';
        }
    }
    function hideCookieConsent() {
        if (cookieConsent) {
            cookieConsent.style.display = 'none';
        }
    }

    // Global functions for onclick handlers
    window.acceptCookies = function() {
        setCookie('cookie_consent', 'given', 3650);
        const savedTheme = getCookie('theme') || 'a';
        setTheme(savedTheme);
        hideCookieConsent();
    };

    window.rejectCookies = function() {
        // Don't save ANY cookies if user rejects
        hideCookieConsent();
    };

    // Check for cookie consent on page load
    const consent = getCookie('cookie_consent');
    if (consent === 'given') {
        const savedTheme = getCookie('theme') || 'a';
        setTheme(savedTheme);
    } else if (cookieConsent) {
        // No consent cookie exists, show the banner
        showCookieConsent();
    }
}); 