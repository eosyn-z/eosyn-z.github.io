// Custom Theme Editor
class CustomThemeEditor {
    constructor() {
        this.tray = document.getElementById('theme-editor-tray');
        if (!this.tray) {
            console.error('Theme editor tray element not found.');
            return;
        }
        this.editorHTML = this.tray.innerHTML;
        // The tray itself is no longer needed after we grab its HTML
        this.tray.remove();
        this.init();
    }

    async init() {
        await this.loadEditorHTML();
    }

    async loadEditorHTML() {
        try {
            const response = await fetch('/_includes/theme-editor.html');
            if (!response.ok) {
                throw new Error('Failed to load theme editor HTML');
            }
            this.editorHTML = await response.text();
        } catch (error) {
            console.error('Error loading theme editor:', error);
        }
    }

    createThemeEditorWindow() {
        if (!window.windowManager) {
            console.error('WindowManager is not available.');
            return;
        }

        const windowId = 'system-settings-theme-editor';
        const existingWindow = window.windowManager.getWindow(windowId);
        if (existingWindow) {
            window.windowManager.focusWindow(windowId);
            return;
        }

        const themeWindow = window.windowManager.createWindow(
            windowId,
            'System Settings - Theme Editor',
            this.editorHTML
        );

        this.setupEventListenersForWindow(themeWindow.element);
        this.populateColorPickers(themeWindow.element);
    }

    setupEventListenersForWindow(windowElement) {
        const colorPickers = windowElement.querySelectorAll('.color-picker');
        colorPickers.forEach(picker => {
            picker.addEventListener('input', (e) => this.updateColor(e));
        });

        const saveButton = windowElement.querySelector('.tray-btn.primary');
        if (saveButton) {
            saveButton.onclick = () => this.saveCustomTheme();
        }

        const resetButton = windowElement.querySelector('.tray-btn:not(.primary)');
        if (resetButton) {
            resetButton.onclick = () => this.resetCustomTheme();
        }
        
        const closeButton = windowElement.querySelector('.tray-close-btn');
        if (closeButton) {
            closeButton.onclick = () => window.windowManager.closeWindow('system-settings-theme-editor');
        }
    }

    populateColorPickers(windowElement) {
        const computedStyle = getComputedStyle(document.documentElement);
        const colorPickers = windowElement.querySelectorAll('.color-picker');

        colorPickers.forEach(picker => {
            const variable = picker.getAttribute('data-variable');
            const currentValue = computedStyle.getPropertyValue(variable).trim();
            picker.value = this.rgbaToHex(currentValue); // Simplified, assuming colors are hex/rgb
        });
    }

    rgbaToHex(rgba) {
        if (!rgba.startsWith('rgba') && !rgba.startsWith('rgb')) return rgba;
        let parts = rgba.substring(rgba.indexOf("(") + 1, rgba.lastIndexOf(")")).split(/,\s*/);
        let r = parseInt(parts[0]), g = parseInt(parts[1]), b = parseInt(parts[2]);
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1).substr(0, 6);
    }
    
    updateColor(event) {
        const picker = event.target;
        const variable = picker.getAttribute('data-variable');
        const color = picker.value;
        
        document.documentElement.style.setProperty(variable, color);
        
        if (!window.customThemeValues) {
            window.customThemeValues = {};
        }
        window.customThemeValues[variable] = color;
    }

    saveCustomTheme() {
        if (!window.customThemeValues) {
            alert('No changes to save!');
            return;
        }

        const themeData = JSON.stringify(window.customThemeValues);
        document.cookie = `custom_theme=${themeData};path=/;max-age=315360000`; 

        alert('Custom theme saved!');
        window.windowManager.closeWindow('system-settings-theme-editor');
    }

    resetCustomTheme() {
        // This function needs to know the variables to clear.
        const variablesToClear = Object.keys(window.customThemeValues || {});
        variablesToClear.forEach(variable => {
            document.documentElement.style.removeProperty(variable);
        });

        window.customThemeValues = {};
        document.cookie = 'custom_theme=;path=/;max-age=-1';
        document.body.setAttribute('data-theme', 'c');
        
        alert('Theme has been reset to default.');
        window.windowManager.closeWindow('system-settings-theme-editor');
    }

    loadCustomTheme() {
        const cookieValue = document.cookie.split('; ').find(row => row.startsWith('custom_theme='));
        if (cookieValue) {
            try {
                const themeData = JSON.parse(decodeURIComponent(cookieValue.split('=')[1]));
                window.customThemeValues = themeData;
                Object.entries(themeData).forEach(([variable, value]) => {
                    document.documentElement.style.setProperty(variable, value);
                });
                document.body.setAttribute('data-theme', 'custom');
            } catch (error) {
                console.error('Error loading custom theme:', error);
            }
        }
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
    if (window.customThemeEditor) {
        window.customThemeEditor.createThemeEditorWindow();
    }
};

window.closeThemeEditor = function() {
    if (window.customThemeEditor) {
        window.customThemeEditor.closeThemeEditor();
    }
};

window.saveCustomTheme = function() {
    if (window.customThemeEditor) {
        window.customThemeEditor.saveCustomTheme();
    }
};

window.resetCustomTheme = function() {
    if (window.customThemeEditor) {
        window.customThemeEditor.resetCustomTheme();
    }
};

// Initialize theme editor when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    window.customThemeEditor = new CustomThemeEditor();
    window.customThemeEditor.loadCustomTheme();
    
    // Close tray when clicking outside
    document.addEventListener('click', function(e) {
        if (window.customThemeEditor.tray.classList.contains('active') && 
            !window.customThemeEditor.tray.contains(e.target) && 
            !e.target.closest('.theme-btn.custom-theme')) {
            window.customThemeEditor.closeThemeEditor();
        }
    });
    
    // Close tray with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && window.customThemeEditor.tray.classList.contains('active')) {
            window.customThemeEditor.closeThemeEditor();
        }
    });
}); 