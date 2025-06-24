document.addEventListener('DOMContentLoaded', function() {
    const themeButtons = document.querySelectorAll('.theme-btn');
    const body = document.body;
    const themeImages = document.querySelectorAll('.theme-image');
    let isInitialLoad = true;
    let themeInitialized = false; // Track if theme has been initialized
    let isTransitioning = false; // Prevent multiple transitions

    // Advanced theme transition system
    const ThemeTransition = {
        duration: 800,
        easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
        
        // Create transition overlay
        createOverlay: () => {
            const overlay = document.createElement('div');
            overlay.id = 'theme-transition-overlay';
            overlay.style.cssText = `
                position: fixed;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0.3) 100%);
                backdrop-filter: blur(10px);
                z-index: 9999;
                opacity: 0;
                pointer-events: none;
                transition: opacity 0.3s ease;
            `;
            document.body.appendChild(overlay);
            return overlay;
        },

        // Create morphing particles
        createMorphParticles: () => {
            const particles = [];
            const particleCount = 20;
            
            for (let i = 0; i < particleCount; i++) {
                const particle = document.createElement('div');
                particle.style.cssText = `
                    position: fixed;
                    width: 4px;
                    height: 4px;
                    background: var(--theme-accent);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 10000;
                    opacity: 0;
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
                `;
                
                // Random position
                particle.style.left = Math.random() * 100 + '%';
                particle.style.top = Math.random() * 100 + '%';
                
                document.body.appendChild(particle);
                particles.push(particle);
            }
            
            return particles;
        },

        // Animate particles
        animateParticles: (particles, oldTheme, newTheme) => {
            const oldColors = getThemeColors(oldTheme);
            const newColors = getThemeColors(newTheme);
            
            particles.forEach((particle, index) => {
                const color = newColors[index % newColors.length];
                const delay = (index * 50) + Math.random() * 200;
                
                setTimeout(() => {
                    particle.style.background = color;
                    particle.style.opacity = '1';
                    particle.style.transform = `scale(${2 + Math.random() * 3}) translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px)`;
                    
                    setTimeout(() => {
                        particle.style.opacity = '0';
                        particle.style.transform = 'scale(0)';
                    }, 400);
                }, delay);
            });
        },

        // Smooth color transition
        transitionColors: (oldTheme, newTheme) => {
            const oldColors = getThemeColors(oldTheme);
            const newColors = getThemeColors(newTheme);
            
            // Add CSS custom properties for smooth transitions
            const style = document.createElement('style');
            style.id = 'theme-transition-styles';
            style.textContent = `
                * {
                    transition: color 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                               background-color 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                               border-color 0.8s cubic-bezier(0.4, 0, 0.2, 1),
                               box-shadow 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
                
                .sticky-note, .window, .glass-card {
                    transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1) !important;
                }
            `;
            document.head.appendChild(style);
            
            // Remove transition styles after animation
            setTimeout(() => {
                if (document.getElementById('theme-transition-styles')) {
                    document.getElementById('theme-transition-styles').remove();
                }
            }, 1000);
        },

        // Execute full transition
        execute: async (oldTheme, newTheme) => {
            if (isTransitioning) return;
            isTransitioning = true;
            
            // Create particles
            const particles = ThemeTransition.createMorphParticles();
            
            // Transition colors
            ThemeTransition.transitionColors(oldTheme, newTheme);
            
            // Update background animation colors if available
            if (window.backgroundAnimation) {
                window.backgroundAnimation.updateParticleColors();
            }
            
            // Clean up after transition
            setTimeout(() => {
                isTransitioning = false;
            }, ThemeTransition.duration);
        }
    };

    // Get theme colors for transitions
    function getThemeColors(theme) {
        const colorMap = {
            'c': ['#6366f1', '#8b5cf6', '#06b6d4', '#0891b2'],
            'a': ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'],
            'r': ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
            'z': ['#1f2937', '#374151', '#6b7280', '#9ca3af'],
            'e': ['#7c3aed', '#5b21b6', '#4c1d95', '#2e1065'],
            'n': ['#0ea5e9', '#0284c7', '#0369a1', '#075985'],
            'custom': ['#6366f1', '#8b5cf6', '#06b6d4', '#0891b2']
        };
        return colorMap[theme] || colorMap['c'];
    }

    // Function to set the theme with advanced transitions
    const setTheme = async (theme, saveToCookie = false) => {
        const oldTheme = body.getAttribute('data-theme') || 'c';
        // Always allow theme switching
        if (oldTheme !== theme) {
            await ThemeTransition.execute(oldTheme, theme);
        }
        body.setAttribute('data-theme', theme);
        themeButtons.forEach(btn => {
            btn.classList.remove('active');
            if (btn.getAttribute('data-theme') === theme) {
                btn.classList.add('active');
            }
        });
        // Image switching logic with fade transition
        if (themeImages.length > 0) {
            let imageToShow = 'c'; // Default to starfield
            if (['a', 'e', 'n'].includes(theme)) {
                imageToShow = theme;
            } else if (['c', 'z', 'r'].includes(theme)) {
                imageToShow = 'c';
            }
            themeImages.forEach(img => {
                if (img.getAttribute('data-theme-image') === imageToShow) {
                    img.style.opacity = '0';
                    img.style.display = 'inline-block';
                    setTimeout(() => {
                        img.style.opacity = '1';
                    }, 50);
                } else {
                    img.style.opacity = '0';
                    setTimeout(() => {
                        img.style.display = 'none';
                    }, 300);
                }
            });
        }
        // Save theme to cookie only if explicitly requested
        if (saveToCookie && getCookie('cookie_consent') === 'accepted') {
            setCookie('theme', theme, 3650); // Store for 10 years
        }
        themeInitialized = true;
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
                if (document.body.contains(notification)) {
                    document.body.removeChild(notification);
                }
            }, 300);
        }, 3000);
    };

    // Event listeners for theme buttons
    themeButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const theme = button.getAttribute('data-theme');
            if (theme === 'custom') {
                await setTheme(theme, true);
                if (window.customThemeEditor) {
                    window.customThemeEditor.createThemeEditorWindow();
                }
            } else {
                await setTheme(theme, true);
            }
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
            
            // If custom theme is saved, load the custom theme settings
            if (savedTheme === 'custom' && window.customThemeEditor) {
                // Wait a bit for the custom theme editor to initialize
                setTimeout(() => {
                    window.customThemeEditor.loadSavedCustomThemeOnPageLoad();
                }, 500);
            }
        }
    }

    // Show cookie consent if not already accepted
    if (getCookie('cookie_consent') !== 'accepted' && cookieConsent) {
        cookieConsent.style.display = 'block';
    }
}); 