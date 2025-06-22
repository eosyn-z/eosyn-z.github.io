// View Manager - Handles switching between regular website and desktop simulator modes
class ViewManager {
    constructor() {
        this.body = document.body;
        this.isDesktopMode = false;
        this.viewToggle = null;
        
        // Wait a bit for DOM to be ready
        setTimeout(() => {
            this.init();
        }, 100);
    }

    init() {
        // Find the toggle button
        this.viewToggle = document.getElementById('view-toggle');
        
        // Force website mode on initial load
        this.disableDesktopMode();

        // Add event listener to toggle button
        if (this.viewToggle) {
            this.viewToggle.addEventListener('click', () => this.toggleView());
            console.log('View toggle button found and event listener added');
        } else {
            console.error('View toggle button not found! Looking for element with id="view-toggle"');
            // Try to find it again after a delay
            setTimeout(() => {
                this.viewToggle = document.getElementById('view-toggle');
                if (this.viewToggle) {
                    this.viewToggle.addEventListener('click', () => this.toggleView());
                    console.log('View toggle button found on retry');
                } else {
                    console.error('View toggle button still not found after retry');
                }
            }, 500);
        }
        
        this.updateToggleButton();
    }

    toggleView() {
        console.log('Toggle view called! Current mode:', this.isDesktopMode ? 'desktop' : 'website');
        this.isDesktopMode = !this.isDesktopMode;
        this.applyView();
        this.updateToggleButton();
        console.log('New mode:', this.isDesktopMode ? 'desktop' : 'website');
    }

    applyView() {
        console.log('applyView called, isDesktopMode:', this.isDesktopMode);
        if (this.isDesktopMode) {
            console.log('Enabling desktop mode...');
            this.enableDesktopMode();
        } else {
            console.log('Disabling desktop mode (enabling website mode)...');
            this.disableDesktopMode();
        }
    }

    enableDesktopMode() {
        console.log('enableDesktopMode: Adding desktop-mode class to body');
        // Add desktop mode class to body
        this.body.classList.add('desktop-mode');
        
        // Hide top nav bar
        const topNav = document.querySelector('.top-nav');
        if (topNav) {
            topNav.style.display = 'none';
        }
        
        // Show desktop elements
        const desktopElements = document.querySelectorAll('.desktop-only');
        console.log('enableDesktopMode: Found', desktopElements.length, 'desktop-only elements');
        desktopElements.forEach(el => el.style.display = 'block');
        
        // Hide regular navigation and show desktop navigation
        const navLinksHeader = document.querySelector('.nav-links-header');
        const navLinksDesktop = document.querySelector('.nav-links-desktop');
        if (navLinksHeader) {
            navLinksHeader.style.display = 'none';
            console.log('enableDesktopMode: Hidden nav-links-header');
        }
        if (navLinksDesktop) {
            navLinksDesktop.style.display = 'flex';
            console.log('enableDesktopMode: Shown nav-links-desktop');
        }
        
        // Hide website content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.display = 'none';
            console.log('enableDesktopMode: Hidden main-content');
        } else {
            console.log('enableDesktopMode: main-content not found');
        }
        
        // Show desktop background and icons
        this.showDesktopEnvironment();
        
        // Initialize desktop manager if it exists
        if (window.desktopManager) {
            // Desktop manager is already initialized in constructor
            console.log('Desktop manager found and ready');
            window.desktopManager.renderIcons();
        } else {
            console.log('Desktop manager not found, initializing...');
            // Try to initialize desktop manager
            if (typeof DesktopManager !== 'undefined') {
                window.desktopManager = new DesktopManager();
                console.log('Desktop manager initialized successfully');
            } else {
                console.error('DesktopManager class not found');
            }
        }
        
        // Initialize window manager if it exists
        if (window.windowManager) {
            console.log('Window manager found and ready');
        } else {
            console.log('Window manager not found');
        }
    }

    disableDesktopMode() {
        console.log('disableDesktopMode: Removing desktop-mode class from body');
        // Remove desktop mode class from body
        this.body.classList.remove('desktop-mode');
        
        // Show top nav bar
        const topNav = document.querySelector('.top-nav');
        if (topNav) {
            topNav.style.display = 'flex';
        }
        
        // Hide desktop elements
        const desktopElements = document.querySelectorAll('.desktop-only');
        console.log('disableDesktopMode: Found', desktopElements.length, 'desktop-only elements');
        desktopElements.forEach(el => el.style.display = 'none');
        
        // Show regular navigation and hide desktop navigation
        const navLinksHeader = document.querySelector('.nav-links-header');
        const navLinksDesktop = document.querySelector('.nav-links-desktop');
        if (navLinksHeader) {
            navLinksHeader.style.display = 'flex';
            console.log('disableDesktopMode: Shown nav-links-header');
        }
        if (navLinksDesktop) {
            navLinksDesktop.style.display = 'none';
            console.log('disableDesktopMode: Hidden nav-links-desktop');
        }
        
        // Show website content
        const mainContent = document.querySelector('.main-content');
        if (mainContent) {
            mainContent.style.display = 'block';
            console.log('disableDesktopMode: Shown main-content');
        } else {
            console.log('disableDesktopMode: main-content not found');
        }
        
        // Hide desktop background and icons
        this.hideDesktopEnvironment();
        
        // Close all windows if window manager exists
        if (window.windowManager) {
            window.windowManager.closeAllWindows();
        }
    }

    showDesktopEnvironment() {
        // Create desktop background if it doesn't exist
        if (!document.getElementById('desktop-background')) {
            const desktopBg = document.createElement('div');
            desktopBg.id = 'desktop-background';
            desktopBg.className = 'desktop-background';
            document.body.appendChild(desktopBg);
        }
        
        // Create desktop icons container if it doesn't exist
        if (!document.getElementById('desktop-icons')) {
            const desktopIcons = document.createElement('div');
            desktopIcons.id = 'desktop-icons';
            desktopIcons.className = 'desktop-icons';
            document.body.appendChild(desktopIcons);
        }
        
        // Show desktop icons container
        const desktopIcons = document.getElementById('desktop-icons');
        if (desktopIcons) {
            desktopIcons.style.display = 'block';
        }
        
        // Trigger desktop manager to render icons if it exists
        if (window.desktopManager) {
            window.desktopManager.renderIcons();
        }
        
        // Show taskbar
        const taskbar = document.querySelector('.bottom-bar');
        if (taskbar) taskbar.style.display = 'block';
        
        // Only show start menu if we're on the desktop page or if desktop mode is properly intended
        const startMenu = document.getElementById('start-menu');
        if (startMenu) {
            // Check if we're on the desktop page or if desktop mode is properly activated
            const isOnDesktopPage = window.location.pathname === '/desktop/' || window.location.pathname === '/desktop';
            if (isOnDesktopPage || this.isDesktopMode) {
                startMenu.style.display = 'block';
            } else {
                startMenu.style.display = 'none';
            }
        }
    }

    hideDesktopEnvironment() {
        // Hide desktop background
        const desktopBg = document.getElementById('desktop-background');
        if (desktopBg) desktopBg.style.display = 'none';
        
        // Hide desktop icons
        const desktopIcons = document.getElementById('desktop-icons');
        if (desktopIcons) desktopIcons.style.display = 'none';
        
        // Hide taskbar
        const taskbar = document.querySelector('.bottom-bar');
        if (taskbar) taskbar.style.display = 'none';
        
        // Always hide start menu when desktop environment is hidden
        const startMenu = document.getElementById('start-menu');
        if (startMenu) startMenu.style.display = 'none';
    }

    updateToggleButton() {
        if (!this.viewToggle) {
            console.warn('Toggle button not found for update');
            return;
        }
        
        const websiteIcon = this.viewToggle.querySelector('.view-icon.website');
        const desktopIcon = this.viewToggle.querySelector('.view-icon.desktop');
        
        if (websiteIcon && desktopIcon) {
            if (this.isDesktopMode) {
                websiteIcon.style.display = 'none';
                desktopIcon.style.display = 'inline';
                this.viewToggle.title = 'Switch to Website Mode';
            } else {
                websiteIcon.style.display = 'inline';
                desktopIcon.style.display = 'none';
                this.viewToggle.title = 'Switch to Desktop Mode';
            }
        } else {
            console.warn('Toggle button icons not found');
        }
    }
}

// Global functions for HTML onclick handlers
window.toggleViewMode = function() {
    if (window.viewManager) {
        window.viewManager.toggleView();
    }
};

// Also expose the toggleView function directly
window.toggleView = function() {
    if (window.viewManager) {
        window.viewManager.toggleView();
    }
};

// Initialize view manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing view manager...');
    try {
        window.viewManager = new ViewManager();
        console.log('View manager initialized successfully');
    } catch (error) {
        console.error('Error initializing view manager:', error);
    }
}); 