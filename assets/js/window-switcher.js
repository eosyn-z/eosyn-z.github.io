// Window Switcher - Provides a button to switch between open windows
class WindowSwitcher {
    constructor() {
        this.isVisible = false;
        this.init();
    }

    init() {
        this.createSwitcherButton();
        this.createSwitcherPanel();
        this.setupEventListeners();
    }

    createSwitcherButton() {
        // Create the window switcher button
        const button = document.createElement('button');
        button.id = 'window-switcher-btn';
        button.className = 'window-switcher-btn glass-button';
        button.innerHTML = '🪟';
        button.title = 'Window Switcher';

        // Check for bar container and append button to it
        const barContainer = document.getElementById('window-switcher-bar-container');
        if (barContainer) {
            barContainer.appendChild(button);
        } else {
            console.error('Window Switcher container not found in the bar.');
            // Fallback to appending to body if bar is missing
            button.style.cssText = 'position: fixed; top: 20px; left: 20px; z-index: 20001;';
            document.body.appendChild(button);
        }

        // Click handler
        button.addEventListener('click', () => {
            this.toggleSwitcher();
        });

        // The button is part of the bar, which is only shown in desktop mode.
        // No need to hide it separately.
        this.switcherButton = button;
    }

    createSwitcherPanel() {
        // Create the window switcher panel
        const panel = document.createElement('div');
        panel.id = 'window-switcher-panel';
        panel.className = 'window-switcher-panel glass-card';
        
        panel.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            z-index: 20000;
            min-width: 300px;
            max-width: 400px;
            max-height: 400px;
            background: var(--glass-bg-heavy);
            backdrop-filter: var(--glass-blur-heavy);
            border: 1px solid var(--glass-border-light);
            border-radius: 15px;
            box-shadow: var(--glass-shadow-heavy);
            padding: 1rem;
            display: none;
            overflow-y: auto;
        `;

        // Header
        const header = document.createElement('div');
        header.style.cssText = `
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 1rem;
            padding-bottom: 0.5rem;
            border-bottom: 1px solid var(--glass-border-light);
        `;
        header.innerHTML = `
            <h3 style="margin: 0; color: var(--theme-text); font-size: 1.1rem;">Open Windows</h3>
            <button id="close-switcher" style="background: none; border: none; color: var(--theme-text); cursor: pointer; font-size: 1.2rem;">✕</button>
        `;

        // Windows list container
        const windowsList = document.createElement('div');
        windowsList.id = 'windows-list';
        windowsList.style.cssText = `
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
        `;

        panel.appendChild(header);
        panel.appendChild(windowsList);
        document.body.appendChild(panel);
        this.switcherPanel = panel;
        this.windowsList = windowsList;

        // Close button handler
        const closeBtn = panel.querySelector('#close-switcher');
        closeBtn.addEventListener('click', () => {
            this.hideSwitcher();
        });
    }

    setupEventListeners() {
        // Close panel when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isVisible && 
                !this.switcherPanel.contains(e.target) && 
                !this.switcherButton.contains(e.target)) {
                this.hideSwitcher();
            }
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            // Alt+Tab equivalent
            if (e.altKey && e.key === 'Tab') {
                e.preventDefault();
                this.toggleSwitcher();
            }
            
            // Escape to close
            if (e.key === 'Escape' && this.isVisible) {
                this.hideSwitcher();
            }
        });
    }

    toggleSwitcher() {
        if (this.isVisible) {
            this.hideSwitcher();
        } else {
            this.showSwitcher();
        }
    }

    showSwitcher() {
        this.updateWindowsList();
        this.switcherPanel.style.display = 'block';
        this.isVisible = true;
        
        // Animate in
        this.switcherPanel.style.opacity = '0';
        this.switcherPanel.style.transform = 'translateY(-10px)';
        setTimeout(() => {
            this.switcherPanel.style.transition = 'all 0.2s ease';
            this.switcherPanel.style.opacity = '1';
            this.switcherPanel.style.transform = 'translateY(0)';
        }, 10);
    }

    hideSwitcher() {
        this.switcherPanel.style.transition = 'all 0.2s ease';
        this.switcherPanel.style.opacity = '0';
        this.switcherPanel.style.transform = 'translateY(-10px)';
        
        setTimeout(() => {
            this.switcherPanel.style.display = 'none';
            this.isVisible = false;
        }, 200);
    }

    updateWindowsList() {
        if (!window.windowManager) return;

        const windows = window.windowManager.windows.filter(w => !w.isMinimized);
        this.windowsList.innerHTML = '';

        if (windows.length === 0) {
            this.windowsList.innerHTML = `
                <div style="text-align: center; color: var(--theme-text-muted); padding: 1rem;">
                    No open windows
                </div>
            `;
            return;
        }

        windows.forEach((windowData, index) => {
            const windowItem = document.createElement('div');
            windowItem.className = 'window-item';
            windowItem.style.cssText = `
                display: flex;
                align-items: center;
                gap: 0.75rem;
                padding: 0.75rem;
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.2s ease;
                border: 1px solid transparent;
            `;

            // Get window title
            const titleElement = windowData.element.querySelector('.window-title');
            const title = titleElement ? titleElement.textContent : `Window ${index + 1}`;

            // Get window icon (try to find an icon or use default)
            let icon = '🪟';
            const iconElement = windowData.element.querySelector('.window-icon');
            if (iconElement) {
                icon = iconElement.textContent || iconElement.innerHTML;
            }

            windowItem.innerHTML = `
                <span style="font-size: 1.2rem;">${icon}</span>
                <span style="flex: 1; color: var(--theme-text); font-weight: 500;">${title}</span>
                <button class="close-window-btn" style="background: none; border: none; color: var(--theme-text-muted); cursor: pointer; font-size: 0.9rem;">✕</button>
            `;

            // Hover effects
            windowItem.addEventListener('mouseenter', () => {
                windowItem.style.background = 'var(--glass-bg-medium)';
                windowItem.style.borderColor = 'var(--glass-border-light)';
            });

            windowItem.addEventListener('mouseleave', () => {
                windowItem.style.background = 'transparent';
                windowItem.style.borderColor = 'transparent';
            });

            // Click to focus window
            windowItem.addEventListener('click', (e) => {
                if (!e.target.classList.contains('close-window-btn')) {
                    window.windowManager.focusWindow(windowData.id);
                    this.hideSwitcher();
                }
            });

            // Close window button
            const closeBtn = windowItem.querySelector('.close-window-btn');
            closeBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                window.windowManager.closeWindow(windowData);
                this.updateWindowsList();
            });

            this.windowsList.appendChild(windowItem);
        });
    }

    // Method to be called when windows are opened/closed
    refresh() {
        if (this.isVisible) {
            this.updateWindowsList();
        }
    }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('WindowSwitcher script loaded');
    // Make sure the class is available globally
    window.WindowSwitcher = WindowSwitcher;
    
    // If we're in desktop mode and no window switcher exists, create one
    if (document.body.classList.contains('desktop-mode') && !window.windowSwitcher) {
        console.log('Auto-initializing WindowSwitcher for desktop mode');
        window.windowSwitcher = new WindowSwitcher();
    }
}); 