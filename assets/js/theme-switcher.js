document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;

    // Function to set the theme
    const setTheme = (theme) => {
        body.setAttribute('data-theme', theme);
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
        // Save theme to cookie if consent is given
        if (getCookie('cookie_consent') === 'accepted') {
            setCookie('theme', theme, 3650); // Store for 10 years
        }
    };

    // Event listeners for theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            setTheme(theme);
        });
    });

    // Cookie consent logic
    const cookieConsent = document.getElementById('cookieConsent');
    
    // Functions to set, get, and reject cookies
    window.setCookie = (name, value, days) => {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    };

    window.getCookie = (name) => {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    };

    window.acceptCookies = () => {
        setCookie('cookie_consent', 'accepted', 3650); // Store for 10 years
        cookieConsent.style.display = 'none';
        // Apply saved theme after accepting
        const savedTheme = getCookie('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    };

    window.rejectCookies = () => {
        cookieConsent.style.display = 'none';
    };

    // Check cookie consent on load
    if (getCookie('cookie_consent') === 'accepted') {
        const savedTheme = getCookie('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        }
    } else {
        // Show banner only on the home page
        if (cookieConsent) {
             cookieConsent.style.display = 'block';
        }
    }
}); 