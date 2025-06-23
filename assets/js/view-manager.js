// View Manager - Handles switching between regular website and desktop simulator modes
class ViewManager {
    constructor() {
        this.body = document.body;
        this.isDesktopMode = false;
        this.viewToggle = null;

        // Defer initialization until the DOM is fully loaded.
        document.addEventListener('DOMContentLoaded', () => this.init());
    }

    init() {
        this.viewToggle = document.getElementById('view-toggle');
        
        // This is the critical part: always start in website mode.
        this.isDesktopMode = false;
        this.disableDesktopMode();
        this.updateToggleButton();
        
        if (this.viewToggle) {
            this.viewToggle.addEventListener('click', () => this.toggleView());
        } else {
            console.error('View toggle button not found!');
        }
    }

    toggleView() {
        this.isDesktopMode = !this.isDesktopMode;
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
        this.body.classList.add('desktop-mode');
        const topNav = document.querySelector('.top-nav');
        if (topNav) topNav.style.display = 'none';
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.style.display = 'none';
        const desktopOnlyElements = document.querySelectorAll('.desktop-only, .bottom-bar, #desktop-background, #window-container, #start-menu');
        desktopOnlyElements.forEach(el => { if(el) el.style.display = 'block'; });
        if (window.desktopManager) {
            window.desktopManager.renderIcons && window.desktopManager.renderIcons();
        }
    }

    disableDesktopMode() {
        this.body.classList.remove('desktop-mode');
        const topNav = document.querySelector('.top-nav');
        if (topNav) topNav.style.display = 'flex';
        const mainContent = document.querySelector('.main-content');
        if (mainContent) mainContent.style.display = 'block';
        const desktopOnlyElements = document.querySelectorAll('.desktop-only, .bottom-bar, #desktop-background, #window-container, #start-menu');
        desktopOnlyElements.forEach(el => { if(el) el.style.display = 'none'; });
        if (window.windowManager) {
            window.windowManager.closeAllWindows && window.windowManager.closeAllWindows();
        }
    }

    updateToggleButton() {
        if (!this.viewToggle) return;
        const websiteIcon = this.viewToggle.querySelector('.view-icon.website');
        const desktopIcon = this.viewToggle.querySelector('.view-icon.desktop');
        if (websiteIcon && desktopIcon) {
            websiteIcon.style.display = this.isDesktopMode ? 'none' : 'inline';
            desktopIcon.style.display = this.isDesktopMode ? 'inline' : 'none';
            this.viewToggle.title = this.isDesktopMode ? 'Switch to Website Mode' : 'Switch to Desktop Mode';
        }
    }
}

// Instantiate the manager to get it started.
new ViewManager();

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