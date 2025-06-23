document.addEventListener('DOMContentLoaded', () => {
    // This script overrides the ViewManager from desktop.js
    // It should be loaded AFTER desktop.js in the HTML.

    if (window.ViewManager) {
        console.log('Overriding default ViewManager...');
        
        class ViewManagerOverride {
            constructor() {
                this.toggleButton = document.getElementById('desktop-back-button');
                if (this.toggleButton) {
                    this.toggleButton.addEventListener('click', () => this.toggleView());
                } else {
                    console.error('Desktop back button not found for override.');
                }
            }
    
            toggleView() {
                console.log('Exiting desktop view, redirecting to homepage.');
                // Redirect to the site's base URL, which is the homepage.
                window.location.href = window.siteBaseUrl || '/';
            }
        }

        // Replace the existing ViewManager instance with the new one
        window.viewManager = new ViewManagerOverride();
    }
}); 