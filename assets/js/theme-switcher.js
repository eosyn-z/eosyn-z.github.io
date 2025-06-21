document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    const themeImages = document.querySelectorAll('.theme-image');
    let isInitialLoad = true;

    // Function to set the theme
    const setTheme = (theme, saveToCookie = false) => {
        body.setAttribute('data-theme', theme);
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });

        // Image switching logic
        if (themeImages.length > 0) {
            let imageToShow = 'c'; // Default to starfield
            if (['a', 'e', 'n'].includes(theme)) {
                imageToShow = theme;
            } else if (['c', 'z', 'r'].includes(theme)) {
                imageToShow = 'c';
            }

            themeImages.forEach(img => {
                if (img.getAttribute('data-theme-image') === imageToShow) {
                    img.style.display = 'inline-block';
                } else {
                    img.style.display = 'none';
                }
            });
        }

        // Save theme to cookie only if explicitly requested or on initial load
        if (saveToCookie && getCookie('cookie_consent') === 'accepted') {
            setCookie('theme', theme, 3650); // Store for 10 years
        }
    };

    // Function to get current theme from browser
    const getCurrentTheme = () => {
        return body.getAttribute('data-theme') || 'c';
    };

    // Function to save current theme to cookie
    const saveCurrentTheme = () => {
        const currentTheme = getCurrentTheme();
        if (getCookie('cookie_consent') === 'accepted') {
            setCookie('theme', currentTheme, 3650);
            showThemeSavedNotification();
        }
    };

    // Show notification when theme is saved
    const showThemeSavedNotification = () => {
        const notification = document.createElement('div');
        notification.textContent = 'Theme saved! 🎨';
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: var(--glass-bg-heavy);
            backdrop-filter: var(--glass-blur-heavy);
            border: 1px solid var(--glass-border-light);
            border-radius: 10px;
            padding: 1rem 1.5rem;
            color: var(--theme-text);
            font-weight: 500;
            z-index: 10000;
            transform: translateX(100%);
            transition: transform 0.3s ease;
            box-shadow: var(--glass-shadow-medium);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 3000);
    };

    // Event listeners for theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const theme = button.getAttribute('data-theme');
            // Only save to cookie on initial load, not on user clicks
            setTheme(theme, isInitialLoad);
            isInitialLoad = false;
        });
    });

    // Add save theme functionality to custom theme button
    const customThemeBtn = document.querySelector('.theme-btn.custom-theme');
    if (customThemeBtn) {
        customThemeBtn.addEventListener('dblclick', (e) => {
            e.preventDefault();
            saveCurrentTheme();
        });
        
        // Update tooltip to show double-click to save
        customThemeBtn.title = '🎨 Custom Theme Editor (Double-click or Ctrl+S to save current theme)';
    }

    // Add keyboard shortcut to save theme
    document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 's') {
            e.preventDefault();
            saveCurrentTheme();
        }
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
        // Apply saved theme after accepting (only on initial load)
        if (isInitialLoad) {
            const savedTheme = getCookie('theme');
            if (savedTheme) {
                setTheme(savedTheme, true);
            }
        }
    };

    window.rejectCookies = () => {
        cookieConsent.style.display = 'none';
    };

    // Global function to save current theme
    window.saveCurrentTheme = saveCurrentTheme;

    // Check cookie consent on load
    if (getCookie('cookie_consent') === 'accepted') {
        const savedTheme = getCookie('theme');
        if (savedTheme && isInitialLoad) {
            setTheme(savedTheme, true);
        }
    } else {
        // Show banner only on the home page
        if (cookieConsent) {
             cookieConsent.style.display = 'block';
        }
    }

    // Mark initial load as complete after a short delay
    setTimeout(() => {
        isInitialLoad = false;
    }, 100);
}); 