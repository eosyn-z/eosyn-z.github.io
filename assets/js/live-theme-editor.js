// Live Theme Editor System
class LiveThemeEditor {
    constructor() {
        this.currentTheme = 'celestial';
        this.themeVariables = {};
        this.isLiveMode = false;
        this.init();
    }

    init() {
        this.loadCurrentTheme();
        this.setupLiveMode();
        this.createLiveControls();
    }

    loadCurrentTheme() {
        this.currentTheme = document.body.getAttribute('data-theme') || 'celestial';
        this.themeVariables = this.getThemeVariables();
    }

    getThemeVariables() {
        const computedStyle = getComputedStyle(document.documentElement);
        const variables = {};
        
        // Get all CSS custom properties
        for (let i = 0; i < computedStyle.length; i++) {
            const property = computedStyle[i];
            if (property.startsWith('--')) {
                variables[property] = computedStyle.getPropertyValue(property);
            }
        }
        
        return variables;
    }

    setupLiveMode() {
        // Create live theme controls
        this.createLiveThemePanel();
        
        // Add live mode toggle to theme editor
        this.addLiveModeToggle();
    }

    createLiveThemePanel() {
        const panel = document.createElement('div');
        panel.id = 'live-theme-panel';
        panel.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            width: 300px;
            background: var(--glass-bg-heavy);
            backdrop-filter: var(--glass-blur-heavy);
            border: 1px solid var(--glass-border-light);
            border-radius: 15px;
            padding: 20px;
            z-index: 10000;
            display: none;
            box-shadow: var(--glass-shadow-heavy);
            color: var(--theme-text);
        `;

        panel.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 15px;">
                <h3 style="margin: 0; color: var(--theme-text);">🎨 Live Theme Editor</h3>
                <button id="close-live-panel" style="background: none; border: none; color: var(--theme-text); cursor: pointer; font-size: 18px;">×</button>
            </div>
            
            <div style="margin-bottom: 15px;">
                <label style="display: block; margin-bottom: 5px; font-weight: 500;">Theme:</label>
                <select id="live-theme-select" style="width: 100%; padding: 8px; border-radius: 8px; border: 1px solid var(--glass-border-light); background: var(--glass-bg-medium); color: var(--theme-text);">
                    <option value="celestial">Celestial</option>
                    <option value="alice">Alice</option>
                    <option value="rainbow">Rainbow</option>
                    <option value="zen">Zen</option>
                    <option value="elegant">Elegant</option>
                    <option value="neon">Neon</option>
                    <option value="custom">Custom</option>
                </select>
            </div>
            
            <div id="live-color-controls" style="max-height: 400px; overflow-y: auto;">
                <!-- Color controls will be generated here -->
            </div>
            
            <div style="margin-top: 15px; display: flex; gap: 10px;">
                <button id="reset-live-theme" class="glass-button" style="flex: 1;">Reset</button>
                <button id="save-live-theme" class="glass-button" style="flex: 1;">Save</button>
            </div>
        `;

        document.body.appendChild(panel);
        this.setupLivePanelEvents();
        this.generateLiveColorControls();
    }

    setupLivePanelEvents() {
        const panel = document.getElementById('live-theme-panel');
        const closeBtn = panel.querySelector('#close-live-panel');
        const themeSelect = panel.querySelector('#live-theme-select');
        const resetBtn = panel.querySelector('#reset-live-theme');
        const saveBtn = panel.querySelector('#save-live-theme');

        closeBtn.addEventListener('click', () => {
            this.hideLivePanel();
        });

        themeSelect.addEventListener('change', (e) => {
            this.changeLiveTheme(e.target.value);
        });

        resetBtn.addEventListener('click', () => {
            this.resetLiveTheme();
        });

        saveBtn.addEventListener('click', () => {
            this.saveLiveTheme();
        });
    }

    generateLiveColorControls() {
        const controlsContainer = document.getElementById('live-color-controls');
        if (!controlsContainer) return;

        const colorGroups = {
            'Primary Colors': [
                '--theme-primary',
                '--theme-secondary',
                '--theme-accent',
                '--theme-background'
            ],
            'Text Colors': [
                '--theme-text',
                '--theme-text-secondary',
                '--theme-text-muted'
            ],
            'Glass Effects': [
                '--glass-bg-light',
                '--glass-bg-medium',
                '--glass-bg-heavy',
                '--glass-border-light'
            ],
            'Special Effects': [
                '--sparkle-color-1',
                '--sparkle-color-2',
                '--sparkle-color-3'
            ]
        };

        controlsContainer.innerHTML = '';

        Object.entries(colorGroups).forEach(([groupName, variables]) => {
            const groupDiv = document.createElement('div');
            groupDiv.style.marginBottom = '20px';

            const groupTitle = document.createElement('h4');
            groupTitle.textContent = groupName;
            groupTitle.style.margin = '0 0 10px 0';
            groupTitle.style.color = 'var(--theme-text)';
            groupTitle.style.fontSize = '14px';
            groupTitle.style.fontWeight = '600';

            groupDiv.appendChild(groupTitle);

            variables.forEach(variable => {
                const controlDiv = document.createElement('div');
                controlDiv.style.display = 'flex';
                controlDiv.style.alignItems = 'center';
                controlDiv.style.marginBottom = '8px';
                controlDiv.style.gap = '10px';

                const label = document.createElement('label');
                label.textContent = variable.replace('--', '').replace(/-/g, ' ');
                label.style.fontSize = '12px';
                label.style.color = 'var(--theme-text-secondary)';
                label.style.minWidth = '120px';

                const colorPicker = document.createElement('input');
                colorPicker.type = 'color';
                colorPicker.dataset.variable = variable;
                colorPicker.style.width = '40px';
                colorPicker.style.height = '30px';
                colorPicker.style.border = 'none';
                colorPicker.style.borderRadius = '6px';
                colorPicker.style.cursor = 'pointer';

                // Set initial color
                const currentColor = getComputedStyle(document.documentElement).getPropertyValue(variable).trim();
                if (currentColor) {
                    colorPicker.value = this.hexToRgb(currentColor) || '#ffffff';
                }

                colorPicker.addEventListener('input', (e) => {
                    this.updateLiveVariable(variable, e.target.value);
                });

                controlDiv.appendChild(label);
                controlDiv.appendChild(colorPicker);
                groupDiv.appendChild(controlDiv);
            });

            controlsContainer.appendChild(groupDiv);
        });
    }

    updateLiveVariable(variable, color) {
        document.documentElement.style.setProperty(variable, color);
        
        // Update any elements that might need immediate refresh
        this.refreshThemeElements();
    }

    refreshThemeElements() {
        // Force refresh of elements that might not update automatically
        const elements = document.querySelectorAll('.glass-button, .glass-card, .glass-pane');
        elements.forEach(el => {
            el.style.animation = 'none';
            el.offsetHeight; // Trigger reflow
            el.style.animation = null;
        });
    }

    hexToRgb(hex) {
        // Convert hex to rgb if needed
        if (hex.startsWith('#')) {
            return hex;
        }
        if (hex.startsWith('rgb')) {
            // Convert rgb to hex
            const rgb = hex.match(/\d+/g);
            if (rgb && rgb.length >= 3) {
                const r = parseInt(rgb[0]).toString(16).padStart(2, '0');
                const g = parseInt(rgb[1]).toString(16).padStart(2, '0');
                const b = parseInt(rgb[2]).toString(16).padStart(2, '0');
                return `#${r}${g}${b}`;
            }
        }
        return '#ffffff';
    }

    changeLiveTheme(themeName) {
        document.body.setAttribute('data-theme', themeName);
        this.currentTheme = themeName;
        
        // Regenerate color controls with new theme values
        setTimeout(() => {
            this.generateLiveColorControls();
        }, 100);
    }

    resetLiveTheme() {
        this.changeLiveTheme('celestial');
        this.generateLiveColorControls();
    }

    saveLiveTheme() {
        // Save current live theme as custom theme
        const customTheme = {
            name: 'custom-live',
            variables: {}
        };

        const colorPickers = document.querySelectorAll('#live-color-controls input[type="color"]');
        colorPickers.forEach(picker => {
            const variable = picker.dataset.variable;
            const value = picker.value;
            customTheme.variables[variable] = value;
        });

        localStorage.setItem('customLiveTheme', JSON.stringify(customTheme));
        
        // Show success message
        this.showSaveMessage();
    }

    showSaveMessage() {
        const message = document.createElement('div');
        message.textContent = '✅ Theme saved!';
        message.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: var(--glass-bg-heavy);
            color: var(--theme-text);
            padding: 15px 25px;
            border-radius: 10px;
            z-index: 10001;
            box-shadow: var(--glass-shadow-heavy);
        `;

        document.body.appendChild(message);
        setTimeout(() => message.remove(), 2000);
    }

    addLiveModeToggle() {
        // Add live mode button to existing theme editor
        if (window.customThemeEditor) {
            const liveButton = document.createElement('button');
            liveButton.className = 'glass-button';
            liveButton.innerHTML = '🎨 Live Edit';
            liveButton.style.marginTop = '10px';
            liveButton.addEventListener('click', () => {
                this.toggleLivePanel();
            });

            // Find a good place to add this button
            const themeEditor = document.querySelector('.theme-editor-tray');
            if (themeEditor) {
                const content = themeEditor.querySelector('.tray-content');
                if (content) {
                    content.appendChild(liveButton);
                }
            }
        }
    }

    toggleLivePanel() {
        const panel = document.getElementById('live-theme-panel');
        if (panel.style.display === 'none' || !panel.style.display) {
            this.showLivePanel();
        } else {
            this.hideLivePanel();
        }
    }

    showLivePanel() {
        const panel = document.getElementById('live-theme-panel');
        panel.style.display = 'block';
        this.isLiveMode = true;
    }

    hideLivePanel() {
        const panel = document.getElementById('live-theme-panel');
        panel.style.display = 'none';
        this.isLiveMode = false;
    }
}

// Initialize live theme editor
document.addEventListener('DOMContentLoaded', () => {
    window.liveThemeEditor = new LiveThemeEditor();
    console.log('🎨 Live Theme Editor loaded! Use window.liveThemeEditor.toggleLivePanel() to open!');
}); 