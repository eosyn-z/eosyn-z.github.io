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
            themeEditorButton.addEventListener('click', () => {
                const tray = document.getElementById('theme-editor-tray');
                if (tray && tray.classList.contains('active')) {
                    this.closeThemeEditorTray();
                } else {
                    this.createThemeEditorWindow();
                }
            });
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
            const trayHtml = `<div id="theme-editor-tray" class="theme-editor-tray slide-in-right">
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
                
                <div style="margin-top: 2rem;">
                    <h3 style="margin-bottom: 1rem; color: var(--theme-text);">🎨 Core Theme Colors</h3>
                    <div class="theme-editor-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        ${this.createColorInput('theme-primary', 'Primary')}
                        ${this.createColorInput('theme-secondary', 'Secondary')}
                        ${this.createColorInput('theme-accent', 'Accent')}
                        ${this.createColorInput('theme-accent-light', 'Accent Light')}
                        ${this.createColorInput('theme-accent-dark', 'Accent Dark')}
                        ${this.createColorInput('theme-primary-shadow', 'Primary Shadow')}
                        ${this.createColorInput('theme-secondary-shadow', 'Secondary Shadow')}
                        ${this.createColorInput('theme-text', 'Text')}
                        ${this.createColorInput('theme-text-secondary', 'Text Secondary')}
                        ${this.createColorInput('theme-text-light', 'Text Light')}
                        ${this.createColorInput('theme-text-muted', 'Text Muted')}
                        ${this.createColorInput('text-white', 'Text White')}
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <h3 style="margin-bottom: 1rem; color: var(--theme-text);">🪟 Glass Effects</h3>
                    <div class="theme-editor-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        ${this.createColorInput('glass-bg-light', 'Glass BG Light')}
                        ${this.createColorInput('glass-bg-medium', 'Glass BG Medium')}
                        ${this.createColorInput('glass-bg-heavy', 'Glass BG Heavy')}
                        ${this.createColorInput('glass-bg-dark', 'Glass BG Dark')}
                        ${this.createColorInput('glass-border-light', 'Glass Border Light')}
                        ${this.createColorInput('glass-border-medium', 'Glass Border Medium')}
                        ${this.createColorInput('glass-border-dark', 'Glass Border Dark')}
                        ${this.createColorInput('glass-tint-color', 'Glass Tint Color')}
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <h3 style="margin-bottom: 1rem; color: var(--theme-text);">🎨 Post-it Colors</h3>
                    <div class="theme-editor-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        ${this.createColorInput('postit-1-bg', 'Post-it 1 Background')}
                        ${this.createColorInput('postit-1-border', 'Post-it 1 Border')}
                        ${this.createColorInput('postit-2-bg', 'Post-it 2 Background')}
                        ${this.createColorInput('postit-2-border', 'Post-it 2 Border')}
                        ${this.createColorInput('postit-3-bg', 'Post-it 3 Background')}
                        ${this.createColorInput('postit-3-border', 'Post-it 3 Border')}
                        ${this.createColorInput('postit-4-bg', 'Post-it 4 Background')}
                        ${this.createColorInput('postit-4-border', 'Post-it 4 Border')}
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <h3 style="margin-bottom: 1rem; color: var(--theme-text);">🎯 Background Colors</h3>
                    <div class="theme-editor-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        ${this.createColorInput('bg-primary', 'Background Primary')}
                        ${this.createColorInput('bg-secondary', 'Background Secondary')}
                        ${this.createColorInput('bg-accent', 'Background Accent')}
                        ${this.createColorInput('border-primary', 'Border Primary')}
                        ${this.createColorInput('border-accent', 'Border Accent')}
                    </div>
                </div>

                <div style="margin-top: 2rem;">
                    <h3 style="margin-bottom: 1rem; color: var(--theme-text);">🎮 UI Elements</h3>
                    <div class="theme-editor-grid" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem;">
                        ${this.createColorInput('discord-online', 'Discord Online')}
                        ${this.createColorInput('discord-idle', 'Discord Idle')}
                        ${this.createColorInput('discord-dnd', 'Discord DND')}
                        ${this.createColorInput('window-fav-hover', 'Window Fav Hover')}
                        ${this.createColorInput('window-fav-text', 'Window Fav Text')}
                        ${this.createColorInput('window-min-hover', 'Window Min Hover')}
                        ${this.createColorInput('window-close-hover', 'Window Close Hover')}
                        ${this.createColorInput('postit-text-color', 'Post-it Text Color')}
                        ${this.createColorInput('postit-bg-color', 'Post-it Background')}
                        ${this.createColorInput('postit-border-color', 'Post-it Border')}
                        ${this.createColorInput('redbubble-link-color', 'Redbubble Link')}
                        ${this.createColorInput('warning-color', 'Warning Color')}
                        ${this.createColorInput('error-color', 'Error Color')}
                        ${this.createColorInput('custom-theme-gradient-1', 'Custom Theme Gradient 1')}
                        ${this.createColorInput('custom-theme-gradient-2', 'Custom Theme Gradient 2')}
                        ${this.createColorInput('custom-theme-text', 'Custom Theme Text')}
                        ${this.createColorInput('custom-theme-border', 'Custom Theme Border')}
                        ${this.createColorInput('delete-button-bg', 'Delete Button Background')}
                        ${this.createColorInput('delete-button-hover', 'Delete Button Hover')}
                    </div>
                </div>

                <div class="theme-editor-buttons" style="margin-top: 2rem; display: flex; justify-content: flex-end; gap: 0.5rem;">
                    <button id="reset-theme-btn" class="glass-button">Reset to Default</button>
                    <button id="save-theme-btn" class="glass-button primary">Save Theme</button>
                </div>

                <div style="margin-top: 2rem; padding-top: 2rem; border-top: 1px solid var(--glass-border-light);">
                    <h3 style="margin-bottom: 1rem; color: var(--theme-text);">✨ Background Effects</h3>
                    <div class="background-effects-controls" style="display: flex; flex-direction: column; gap: 1rem;">
                        <div class="effect-control" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: var(--glass-bg-light); border-radius: 8px;">
                            <div>
                                <div style="font-weight: 600; color: var(--theme-text);">Sparkles Background</div>
                                <div style="font-size: 0.9rem; color: var(--theme-text-secondary);">Floating sparkles behind content</div>
                            </div>
                            <button id="toggle-sparkles-btn" class="glass-button" style="min-width: 80px;">
                                ${window.sparklesBackground && window.sparklesBackground.isActive ? 'Disable' : 'Enable'}
                            </button>
                        </div>
                        <div class="effect-control" style="display: flex; justify-content: space-between; align-items: center; padding: 0.5rem; background: var(--glass-bg-light); border-radius: 8px;">
                            <div>
                                <div style="font-weight: 600; color: var(--theme-text);">Particle Background</div>
                                <div style="font-size: 0.9rem; color: var(--theme-text-secondary);">Interactive floating particles</div>
                            </div>
                            <button id="toggle-particles-btn" class="glass-button" style="min-width: 80px;">
                                ${window.backgroundAnimation && window.backgroundAnimation.isActive ? 'Disable' : 'Enable'}
                            </button>
                        </div>
                    </div>
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
        const tray = document.getElementById('theme-editor-tray');
        const inputs = tray.querySelectorAll('input[type="color"]');
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

        const resetButton = tray.querySelector('#reset-theme-btn');
        resetButton.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset your custom theme to its default values?')) {
                this.resetAndApplyDefault();
            }
        });

        const saveButton = tray.querySelector('#save-theme-btn');
        saveButton.addEventListener('click', () => {
            this.saveCustomThemeToCookie();
            this.showSaveNotification();
        });

        // Background effects toggles
        const sparklesButton = tray.querySelector('#toggle-sparkles-btn');
        if (sparklesButton) {
            sparklesButton.addEventListener('click', () => {
                if (window.sparklesBackground) {
                    window.sparklesBackground.toggle();
                    sparklesButton.textContent = window.sparklesBackground.isActive ? 'Disable' : 'Enable';
                }
            });
        }

        const particlesButton = tray.querySelector('#toggle-particles-btn');
        if (particlesButton) {
            particlesButton.addEventListener('click', () => {
                if (window.backgroundAnimation) {
                    window.backgroundAnimation.toggle();
                    particlesButton.textContent = window.backgroundAnimation.isActive ? 'Disable' : 'Enable';
                }
            });
        }
    }

    saveCustomTheme() {
        const tray = document.getElementById('theme-editor-tray');
        const theme = {};
        const inputs = tray.querySelectorAll('input[type="color"]');
        inputs.forEach(input => {
            theme[input.dataset.variable] = input.value;
        });
        localStorage.setItem('customTheme', JSON.stringify(theme));
    }

    saveCustomThemeToCookie() {
        const tray = document.getElementById('theme-editor-tray');
        const theme = {};
        const inputs = tray.querySelectorAll('input[type="color"]');
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
        
        const tray = document.getElementById('theme-editor-tray');
        const inputs = tray.querySelectorAll('input[type="color"]');
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
            // Core theme colors
            '--theme-primary': '#6366f1',
            '--theme-secondary': '#8b5cf6',
            '--theme-accent': '#06b6d4',
            '--theme-accent-light': '#22d3ee',
            '--theme-accent-dark': '#0891b2',
            '--theme-primary-shadow': '#4f46e5',
            '--theme-secondary-shadow': '#7c3aed',
            '--theme-text': '#1f2937',
            '--theme-text-secondary': '#6b7280',
            '--theme-text-light': '#9ca3af',
            '--theme-text-muted': '#6b7280',
            '--text-white': '#ffffff',
            
            // Glass effects
            '--glass-bg-light': 'rgba(255, 255, 255, 0.1)',
            '--glass-bg-medium': 'rgba(255, 255, 255, 0.15)',
            '--glass-bg-heavy': 'rgba(255, 255, 255, 0.2)',
            '--glass-bg-dark': 'rgba(0, 0, 0, 0.2)',
            '--glass-border-light': 'rgba(255, 255, 255, 0.2)',
            '--glass-border-medium': 'rgba(255, 255, 255, 0.3)',
            '--glass-border-dark': 'rgba(0, 0, 0, 0.2)',
            '--glass-tint-color': 'transparent',
            '--glass-shadow-light': '0 4px 12px rgba(0, 0, 0, 0.1)',
            '--glass-shadow-medium': '0 8px 24px rgba(0, 0, 0, 0.15)',
            '--glass-shadow-heavy': '0 12px 36px rgba(0, 0, 0, 0.2)',
            
            // Background colors
            '--bg-primary': '#ffffff',
            '--bg-secondary': '#f9fafb',
            '--bg-accent': '#f3f4f6',
            '--border-primary': '#e5e7eb',
            '--border-accent': '#d1d5db',
            
            // UI Elements
            '--discord-online': '#43b581',
            '--discord-idle': '#faa61a',
            '--discord-dnd': '#f04747',
            '--window-fav-hover': '#ffdd00',
            '--window-fav-text': '#333',
            '--window-min-hover': '#55aaff',
            '--window-close-hover': '#ff5555',
            '--postit-text-color': '#333',
            '--postit-bg-color': '#FFFACD',
            '--postit-border-color': '#f59e0b',
            '--redbubble-link-color': '#ff6b6b',
            '--warning-color': '#f59e0b',
            '--error-color': '#ef4444',
            '--custom-theme-gradient-1': '#ff6b9d',
            '--custom-theme-gradient-2': '#c44569',
            '--custom-theme-text': '#fff',
            '--custom-theme-border': '#ff6b9d',
            '--custom-theme-hover-1': '#ff8fab',
            '--custom-theme-hover-2': '#d63384',
            '--custom-theme-active-border': '#ff6b9d',
            '--custom-theme-active-shadow': '#ff6b9d',
            '--delete-button-bg': '#ff5555',
            '--delete-button-hover': '#ff3333',
            
            // Default post-it colors
            '--postit-1-bg': 'linear-gradient(135deg, #ffeb3b, #fdd835)',
            '--postit-1-border': '#fbc02d',
            '--postit-2-bg': 'linear-gradient(135deg, #4caf50, #45a049)',
            '--postit-2-border': '#388e3c',
            '--postit-3-bg': 'linear-gradient(135deg, #2196f3, #1e88e5)',
            '--postit-3-border': '#1976d2',
            '--postit-4-bg': 'linear-gradient(135deg, #ff9800, #f57c00)',
            '--postit-4-border': '#ef6c00'
        };
        
        // Apply default values
        Object.entries(defaultTheme).forEach(([variable, value]) => {
            document.documentElement.style.setProperty(variable, value);
        });
        
        // Update input values
        const tray = document.getElementById('theme-editor-tray');
        const inputs = tray.querySelectorAll('input[type="color"]');
        inputs.forEach(input => {
            const variable = input.dataset.variable;
            if (defaultTheme[variable]) {
                input.value = defaultTheme[variable];
            }
        });
        
        this.showSaveNotification();
    }
}

document.addEventListener('DOMContentLoaded', function() {
  // Palette button (theme editor)
  const themeEditorBtn = document.getElementById('theme-editor-button') || document.querySelector('.theme-btn[data-theme="custom"]');
  if (themeEditorBtn) {
    themeEditorBtn.onclick = (e) => {
      e.preventDefault();
      if (window.customThemeEditor) {
        window.customThemeEditor.createThemeEditorWindow();
      }
    };
  }
}); 