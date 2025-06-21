// Custom Theme Editor
class CustomThemeEditor {
    constructor() {
        this.tray = document.getElementById('theme-editor-tray');
        this.colorPickers = document.querySelectorAll('.color-picker');
        this.customThemeButton = document.querySelector('.theme-btn.custom-theme');
        this.isCustomThemeActive = false;
        
        this.init();
    }

    init() {
        // Add event listeners
        this.customThemeButton.addEventListener('click', () => this.openThemeEditor());
        
        // Add event listeners to color pickers
        this.colorPickers.forEach(picker => {
            picker.addEventListener('change', (e) => this.updateColor(e));
            picker.addEventListener('input', (e) => this.updateColor(e));
        });

        // Add event listeners to window theme controls
        this.initWindowThemeControls();

        // Load saved custom theme on page load
        this.loadCustomTheme();
    }

    openThemeEditor() {
        this.tray.classList.add('active');
        this.populateColorPickers();
        this.setCustomThemeActive();
    }

    closeThemeEditor() {
        this.tray.classList.remove('active');
    }

    populateColorPickers() {
        // Get current theme values and populate color pickers
        const computedStyle = getComputedStyle(document.documentElement);
        
        this.colorPickers.forEach(picker => {
            const variable = picker.getAttribute('data-variable');
            const currentValue = computedStyle.getPropertyValue(variable).trim();
            
            // Convert rgba to hex if needed
            if (currentValue.startsWith('rgba')) {
                picker.value = this.rgbaToHex(currentValue);
            } else if (currentValue.startsWith('rgb')) {
                picker.value = this.rgbToHex(currentValue);
            } else {
                picker.value = currentValue || '#000000';
            }
        });

        // Populate window theme controls with saved values
        this.populateWindowThemeControls();
    }

    populateWindowThemeControls() {
        if (!window.customThemeValues) return;

        // Set active window image button
        if (window.customThemeValues.windowImage) {
            const imageBtn = document.querySelector(`.window-image-btn[data-window-image="${window.customThemeValues.windowImage}"]`);
            if (imageBtn) {
                document.querySelectorAll('.window-image-btn').forEach(b => b.classList.remove('active'));
                imageBtn.classList.add('active');
            }
        }

        // Set active window size button
        if (window.customThemeValues.windowSize) {
            const sizeBtn = document.querySelector(`.window-size-btn[data-window-size="${window.customThemeValues.windowSize}"]`);
            if (sizeBtn) {
                document.querySelectorAll('.window-size-btn').forEach(b => b.classList.remove('active'));
                sizeBtn.classList.add('active');
            }
        }

        // Set active window shape button
        if (window.customThemeValues.windowShape) {
            const shapeBtn = document.querySelector(`.window-shape-btn[data-window-shape="${window.customThemeValues.windowShape}"]`);
            if (shapeBtn) {
                document.querySelectorAll('.window-shape-btn').forEach(b => b.classList.remove('active'));
                shapeBtn.classList.add('active');
            }
        }
    }

    updateColor(event) {
        const picker = event.target;
        const variable = picker.getAttribute('data-variable');
        const color = picker.value;
        
        // Apply the color immediately for live preview
        document.documentElement.style.setProperty(variable, color);
        
        // Store in temporary custom theme object
        if (!window.customThemeValues) {
            window.customThemeValues = {};
        }
        window.customThemeValues[variable] = color;
    }

    setCustomThemeActive() {
        // Remove active class from other theme buttons
        document.querySelectorAll('.theme-btn').forEach(btn => {
            btn.classList.remove('active');
        });
        
        // Add active class to custom theme button
        this.customThemeButton.classList.add('active');
        this.isCustomThemeActive = true;
        
        // Set body theme to custom
        document.body.setAttribute('data-theme', 'custom');
    }

    saveCustomTheme() {
        if (!window.customThemeValues) {
            alert('No changes to save!');
            return;
        }

        // Save to cookie
        const themeData = JSON.stringify(window.customThemeValues);
        setCookie('custom_theme', themeData, 3650); // Store for 10 years
        
        // Also save the current theme setting
        if (window.saveCurrentTheme) {
            window.saveCurrentTheme();
        }
        
        // Show success message
        this.showNotification('Custom theme saved! 🎨', 'success');
        
        this.closeThemeEditor();
    }

    resetCustomTheme() {
        // Clear custom theme
        window.customThemeValues = {};
        
        // Remove custom theme from cookie
        setCookie('custom_theme', '', -1);
        
        // Reset to default theme (Cosmic)
        this.resetToDefaultTheme();
        
        // Show notification
        this.showNotification('Theme reset to default! 🔄', 'info');
        
        this.closeThemeEditor();
    }

    resetToDefaultTheme() {
        // Remove custom theme from body
        document.body.setAttribute('data-theme', 'c');
        
        // Remove active class from custom theme button
        this.customThemeButton.classList.remove('active');
        this.isCustomThemeActive = false;
        
        // Clear any custom CSS variables
        Object.keys(window.customThemeValues || {}).forEach(variable => {
            document.documentElement.style.removeProperty(variable);
        });
        
        // Set default theme button as active
        const defaultThemeBtn = document.querySelector('.theme-btn[data-theme="c"]');
        if (defaultThemeBtn) {
            defaultThemeBtn.classList.add('active');
        }
    }

    loadCustomTheme() {
        const savedTheme = getCookie('custom_theme');
        if (savedTheme) {
            try {
                const themeValues = JSON.parse(savedTheme);
                window.customThemeValues = themeValues;
                
                // Apply the saved theme
                Object.entries(themeValues).forEach(([variable, color]) => {
                    document.documentElement.style.setProperty(variable, color);
                });
                
                // Set custom theme as active
                this.setCustomThemeActive();
                
            } catch (error) {
                console.error('Error loading custom theme:', error);
                // Clear invalid cookie
                setCookie('custom_theme', '', -1);
            }
        }
    }

    initWindowThemeControls() {
        // Window image buttons
        const windowImageBtns = document.querySelectorAll('.window-image-btn');
        windowImageBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.updateWindowImage(e));
        });

        // Window size buttons
        const windowSizeBtns = document.querySelectorAll('.window-size-btn');
        windowSizeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.updateWindowSize(e));
        });

        // Window shape buttons
        const windowShapeBtns = document.querySelectorAll('.window-shape-btn');
        windowShapeBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.updateWindowShape(e));
        });
    }

    updateWindowImage(event) {
        const btn = event.target;
        const imageType = btn.getAttribute('data-window-image');
        
        // Remove active class from all window image buttons
        document.querySelectorAll('.window-image-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Store in custom theme values
        if (!window.customThemeValues) {
            window.customThemeValues = {};
        }
        window.customThemeValues.windowImage = imageType;
        
        // Apply window image (this would need to be implemented in the window manager)
        this.applyWindowTheme();
    }

    updateWindowSize(event) {
        const btn = event.target;
        const size = btn.getAttribute('data-window-size');
        
        // Remove active class from all window size buttons
        document.querySelectorAll('.window-size-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Store in custom theme values
        if (!window.customThemeValues) {
            window.customThemeValues = {};
        }
        window.customThemeValues.windowSize = size;
        
        // Apply window theme
        this.applyWindowTheme();
    }

    updateWindowShape(event) {
        const btn = event.target;
        const shape = btn.getAttribute('data-window-shape');
        
        // Remove active class from all window shape buttons
        document.querySelectorAll('.window-shape-btn').forEach(b => b.classList.remove('active'));
        
        // Add active class to clicked button
        btn.classList.add('active');
        
        // Store in custom theme values
        if (!window.customThemeValues) {
            window.customThemeValues = {};
        }
        window.customThemeValues.windowShape = shape;
        
        // Apply window theme
        this.applyWindowTheme();
    }

    applyWindowTheme() {
        // Apply window theme settings to the desktop environment
        if (window.desktopManager) {
            window.desktopManager.applyWindowTheme(window.customThemeValues);
        }
        
        // Also apply to any existing windows
        if (window.windowManager) {
            window.windowManager.applyThemeToAllWindows(window.customThemeValues);
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `theme-notification ${type}`;
        notification.textContent = message;
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
    }

    // Utility functions for color conversion
    rgbaToHex(rgba) {
        const rgbaMatch = rgba.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
        if (rgbaMatch) {
            const r = parseInt(rgbaMatch[1]);
            const g = parseInt(rgbaMatch[2]);
            const b = parseInt(rgbaMatch[3]);
            return this.rgbToHex(`rgb(${r}, ${g}, ${b})`);
        }
        return '#000000';
    }

    rgbToHex(rgb) {
        const rgbMatch = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
        }
        return '#000000';
    }
}

// Global functions for HTML onclick handlers
window.openThemeEditor = function() {
    if (window.themeEditor) {
        window.themeEditor.openThemeEditor();
    }
};

window.closeThemeEditor = function() {
    if (window.themeEditor) {
        window.themeEditor.closeThemeEditor();
    }
};

window.saveCustomTheme = function() {
    if (window.themeEditor) {
        window.themeEditor.saveCustomTheme();
    }
};

window.resetCustomTheme = function() {
    if (window.themeEditor) {
        window.themeEditor.resetCustomTheme();
    }
};

// Initialize theme editor when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.themeEditor = new CustomThemeEditor();
    
    // Close tray when clicking outside
    document.addEventListener('click', function(e) {
        if (window.themeEditor.tray.classList.contains('active') && 
            !window.themeEditor.tray.contains(e.target) && 
            !e.target.closest('.theme-btn.custom-theme')) {
            window.themeEditor.closeThemeEditor();
        }
    });
    
    // Close tray with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.themeEditor.tray.classList.contains('active')) {
            window.themeEditor.closeThemeEditor();
        }
    });
}); 