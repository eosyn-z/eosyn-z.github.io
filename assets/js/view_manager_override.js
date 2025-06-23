// This script overrides the ViewManager from desktop.js
// It should be loaded AFTER desktop.js in the HTML.

document.addEventListener('DOMContentLoaded', () => {
    if (window.ViewManager) {
        class ViewManagerOverride {
            constructor() {
                this.body = document.body;
                this.initialize();
            }

            initialize() {
                // This assumes buttons that trigger view change will call window.viewManager.toggleView()
            }

            toggleView() {
                const isDesktop = this.body.classList.contains('desktop-view-active');

                if (isDesktop) {
                    // Exit desktop mode
                    this.body.classList.remove('desktop-view-active');
                    // Potentially redirect or hide desktop-specific elements
                    window.location.href = window.siteBaseUrl + '/'; // Or some other non-desktop page
                } else {
                    // Enter desktop mode
                    this.body.classList.add('desktop-view-active');
                    window.location.href = window.siteBaseUrl + '/desktop'; // Go to desktop page
                }
            }
        }

        // Replace the existing ViewManager instance with the new one
        window.viewManager = new ViewManagerOverride();
    }
}); 