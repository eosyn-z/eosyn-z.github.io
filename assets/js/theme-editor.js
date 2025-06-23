// Custom Theme Editor
class CustomThemeEditor {
    constructor() {
        this.editorWindow = null;
        this.init();
        this.loadSavedCustomThemeOnPageLoad();
    }

    init() {
        const themeEditorButton = document.querySelector('.theme-btn[data-theme="custom"]');
        if (themeEditorButton) {
            themeEditorButton.addEventListener('click', () => this.createThemeEditorWindow());
        }
    }

    // Load and apply saved custom theme when page loads
    loadSavedCustomThemeOnPageLoad() {
        // Try to load from cookie first, then localStorage
        let savedTheme = null;
        
        if (window.getCookie) {
            const cookieTheme = window.getCookie('customTheme');
            if (cookieTheme) {
                try {
                    savedTheme = JSON.parse(cookieTheme);
                } catch (e) {
                    console.error('Error parsing cookie theme:', e);
                }
            }
        }
        
        // Fallback to localStorage
        if (!savedTheme) {
            const localTheme = localStorage.getItem('customTheme');
            if (localTheme) {
                try {
                    savedTheme = JSON.parse(localTheme);
                } catch (e) {
                    console.error('Error parsing localStorage theme:', e);
                }
            }
        }
        
        // Apply saved theme to the page
        if (savedTheme) {
            Object.entries(savedTheme).forEach(([variable, value]) => {
                document.documentElement.style.setProperty(variable, value);
            });
            console.log('Custom theme loaded and applied from saved settings');
        }
    }

    createThemeEditorWindow() {
        // Only one tray open at a time: close sticky notes tray if open
        const stickyTray = document.querySelector('.sticky-notes-tray');
        if (stickyTray && stickyTray.classList.contains('visible')) {
            stickyTray.classList.remove('visible');
            setTimeout(() => {
                stickyTray.style.display = 'none';
            }, 300);
        }

        // Show the theme editor tray as a side panel
        let tray = document.getElementById('theme-editor-tray');
        if (!tray) {
            // If not present, create from template
            const trayHtml = `<div id="theme-editor-tray" class="theme-editor-tray">
                <div class="tray-header">
                    <h2 style="margin: 0; color: var(--theme-text);">🎨 Theme Editor</h2>
                    <button class="tray-close-btn" onclick="window.customThemeEditor.closeThemeEditorTray()">✕</button>
                </div>
                <div class="tray-content"></div>
            </div>`;
            const temp = document.createElement('div');
            temp.innerHTML = trayHtml;
            tray = temp.firstElementChild;
            document.body.appendChild(tray);
        }
        tray.querySelector('.tray-content').innerHTML = this.getEditorContent();
        tray.style.display = 'flex';
        setTimeout(() => tray.classList.add('active'), 10);
        this.addEditorEventListeners();
        this.loadAndApplyCustomTheme();
    }

    closeThemeEditorTray() {
        const tray = document.getElementById('theme-editor-tray');
        if (tray) {
            tray.classList.remove('active');
            setTimeout(() => {
                tray.style.display = 'none';
            }, 300);
        }
    }
    
    getEditorContent() {
        return `
            <div class="theme-editor-content" style="padding: 1rem; color: var(--theme-text);">
                <p style="margin-top: 0;">Customize the 'custom' theme. Changes are saved automatically to cookies.</p>
                
                <div class="theme-editor-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                    ${this.createColorInput('theme-primary', 'Primary')}
                    ${this.createColorInput('theme-secondary', 'Secondary')}
                    ${this.createColorInput('theme-accent', 'Accent')}
                    ${this.createColorInput('theme-accent-dark', 'Accent Dark')}
                    ${this.createColorInput('theme-text', 'Text')}
                    ${this.createColorInput('theme-text-secondary', 'Text Secondary')}
                    ${this.createColorInput('glass-bg-light', 'Glass BG Light')}
                    ${this.createColorInput('glass-bg-medium', 'Glass BG Medium')}
                    ${this.createColorInput('glass-border-light', 'Glass Border')}
                </div>

                <div class="theme-editor-buttons" style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 0.5rem;">
                    <button id="reset-theme-btn" class="glass-button">Reset to Default</button>
                    <button id="save-theme-btn" class="glass-button primary">Save Theme</button>
                </div>
            </div>
        `;
    }

    createColorInput(variable, label) {
        return `
            <div class="theme-editor-item" style="display: flex; flex-direction: column;">
                <label for="${variable}" style="margin-bottom: 0.5rem; font-size: 0.9rem;">${label}</label>
                <input type="color" id="${variable}" data-variable="--${variable}" style="width: 100%; height: 40px; border-radius: 4px; border: 1px solid var(--glass-border-light); background: var(--glass-bg-light); cursor: pointer;">
            </div>
        `;
    }

    addEditorEventListeners() {
        const inputs = this.editorWindow.querySelectorAll('input[type="color"]');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                const variable = e.target.dataset.variable;
                const value = e.target.value;
                document.documentElement.style.setProperty(variable, value);
                // Save to both localStorage and cookie immediately when user makes changes
                this.saveCustomTheme();
                this.saveCustomThemeToCookie();
            });
        });

        const resetButton = this.editorWindow.querySelector('#reset-theme-btn');
        resetButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset your custom theme to its default values?')) {
                this.resetAndApplyDefault();
            }
        });

        const saveButton = this.editorWindow.querySelector('#save-theme-btn');
        saveButton.addEventListener('click', () => {
            this.saveCustomThemeToCookie();
            this.showSaveNotification();
        });
    }

    saveCustomTheme() {
        const theme = {};
        const inputs = this.editorWindow.querySelectorAll('input[type="color"]');
        inputs.forEach(input => {
            theme[input.dataset.variable] = input.value;
        });
        localStorage.setItem('customTheme', JSON.stringify(theme));
    }

    saveCustomThemeToCookie() {
        const theme = {};
        const inputs = this.editorWindow.querySelectorAll('input[type="color"]');
        inputs.forEach(input => {
            theme[input.dataset.variable] = input.value;
        });
        
        // Save to cookie for persistence across sessions
        if (window.setCookie) {
            window.setCookie('customTheme', JSON.stringify(theme), 3650); // 10 years
        }
        
        // Also save to localStorage for immediate access
        localStorage.setItem('customTheme', JSON.stringify(theme));
    }

    showSaveNotification() {
        const notification = document.createElement('div');
        notification.textContent = 'Theme saved to cookies! 🎨';
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
    }

    loadAndApplyCustomTheme() {
        // Try to load from cookie first, then localStorage
        let savedTheme = null;
        
        if (window.getCookie) {
            const cookieTheme = window.getCookie('customTheme');
            if (cookieTheme) {
                try {
                    savedTheme = JSON.parse(cookieTheme);
                } catch (e) {
                    console.error('Error parsing cookie theme:', e);
                }
            }
        }
        
        // Fallback to localStorage
        if (!savedTheme) {
            const localTheme = localStorage.getItem('customTheme');
            if (localTheme) {
                try {
                    savedTheme = JSON.parse(localTheme);
                } catch (e) {
                    console.error('Error parsing localStorage theme:', e);
                }
            }
        }
        
        const inputs = this.editorWindow.querySelectorAll('input[type="color"]');
        inputs.forEach(input => {
            const variable = input.dataset.variable;
            if (savedTheme && savedTheme[variable]) {
                input.value = savedTheme[variable];
                document.documentElement.style.setProperty(variable, savedTheme[variable]);
            }
        });
    }

    resetAndApplyDefault() {
        localStorage.removeItem('customTheme');
        if (window.setCookie) {
            window.setCookie('customTheme', '', -1); // Delete cookie
        }
        
        // Reset to default theme values
        const defaultTheme = {
            '--theme-primary': '#6366f1',
            '--theme-secondary': '#8b5cf6',
            '--theme-accent': '#06b6d4',
            '--theme-accent-dark': '#0891b2',
            '--theme-text': '#1f2937',
            '--theme-text-secondary': '#6b7280',
            '--glass-bg-light': 'rgba(255, 255, 255, 0.1)',
            '--glass-bg-medium': 'rgba(255, 255, 255, 0.2)',
            '--glass-border-light': 'rgba(255, 255, 255, 0.3)'
        };
        
        // Apply default values
        Object.entries(defaultTheme).forEach(([variable, value]) => {
            document.documentElement.style.setProperty(variable, value);
        });
        
        // Update input values
        const inputs = this.editorWindow.querySelectorAll('input[type="color"]');
        inputs.forEach(input => {
            const variable = input.dataset.variable;
            if (defaultTheme[variable]) {
                input.value = defaultTheme[variable];
            }
        });
        
        this.showSaveNotification();
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.customThemeEditor = new CustomThemeEditor();
}); 