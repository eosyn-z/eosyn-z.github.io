// View Manager - Handles switching between regular website and desktop simulator modes
class ViewManager {
    constructor() {
        this.viewToggle = document.getElementById('view-toggle');
        this.body = document.body;
        this.isDesktopMode = false;
        
        this.init();
    }

    init() {
        // Load saved view preference
        this.loadViewPreference();
        
        // Add event listener to toggle button
        this.viewToggle.addEventListener('click', () => this.toggleView());
        
        // Apply initial view
        this.applyView();
    }

    loadViewPreference() {
        const savedView = getCookie('view_mode');
        this.isDesktopMode = savedView === 'desktop';
    }

    saveViewPreference() {
        const viewMode = this.isDesktopMode ? 'desktop' : 'website';
        setCookie('view_mode', viewMode, 3650); // Store for 10 years
    }

    toggleView() {
        this.isDesktopMode = !this.isDesktopMode;
        this.saveViewPreference();
        this.applyView();
        this.updateToggleButton();
    }

    applyView() {
        if (this.isDesktopMode) {
            this.enableDesktopMode();
        } else {
            this.disableDesktopMode();
        }
    }

    enableDesktopMode() {
        // Add desktop mode class to body
        this.body.classList.add('desktop-mode');
        
        // Show desktop elements
        const desktopElements = document.querySelectorAll('.desktop-only');
        desktopElements.forEach(el => el.style.display = 'block');
        
        // Hide regular navigation
        const navLinks = document.querySelector('.nav-links-header');
        if (navLinks) navLinks.style.display = 'none';
        
        // Show desktop background and icons
        this.showDesktopEnvironment();
        
        // Initialize desktop manager if it exists
        if (window.desktopManager) {
            window.desktopManager.init();
        }
        
        // Initialize window manager if it exists
        if (window.windowManager) {
            window.windowManager.init();
        }
    }

    disableDesktopMode() {
        // Remove desktop mode class from body
        this.body.classList.remove('desktop-mode');
        
        // Hide desktop elements
        const desktopElements = document.querySelectorAll('.desktop-only');
        desktopElements.forEach(el => el.style.display = 'none');
        
        // Show regular navigation
        const navLinks = document.querySelector('.nav-links-header');
        if (navLinks) navLinks.style.display = 'flex';
        
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
        
        // Show taskbar
        const taskbar = document.querySelector('.bottom-bar');
        if (taskbar) taskbar.style.display = 'block';
        
        // Show start menu (but keep it hidden initially)
        const startMenu = document.getElementById('start-menu');
        if (startMenu) startMenu.style.display = 'block';
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
        
        // Hide start menu
        const startMenu = document.getElementById('start-menu');
        if (startMenu) startMenu.style.display = 'none';
    }

    updateToggleButton() {
        const websiteIcon = this.viewToggle.querySelector('.view-icon.website');
        const desktopIcon = this.viewToggle.querySelector('.view-icon.desktop');
        
        if (this.isDesktopMode) {
            websiteIcon.style.display = 'none';
            desktopIcon.style.display = 'inline';
            this.viewToggle.title = 'Switch to Website Mode';
        } else {
            websiteIcon.style.display = 'inline';
            desktopIcon.style.display = 'none';
            this.viewToggle.title = 'Switch to Desktop Mode';
        }
    }
}

// Global functions for HTML onclick handlers
window.toggleViewMode = function() {
    if (window.viewManager) {
        window.viewManager.toggleView();
    }
};

// Initialize view manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.viewManager = new ViewManager();
}); 