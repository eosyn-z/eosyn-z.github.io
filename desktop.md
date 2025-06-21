---
layout: desktop
title: Desktop
permalink: /desktop/
desktop_mode: true
---

<div id="desktop-container">
  <!-- Desktop icons and windows will be managed here -->
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Use a small delay to ensure all deferred scripts have loaded
  setTimeout(() => {
    console.log('Desktop page loaded, initializing managers...');

    // Initialize WindowManager
    if (typeof WindowManager !== 'undefined') {
      window.windowManager = new WindowManager();
      console.log('✅ WindowManager initialized.');

      // Make the test function available globally
      window.testWindowManager = () => window.windowManager.testWindowManager();
      console.log('✅ testWindowManager() is now available.');

    } else {
      console.error('❌ WindowManager class not found. The script might not be loaded.');
    }

    // Initialize DesktopManager
    if (typeof DesktopManager !== 'undefined') {
      window.desktopManager = new DesktopManager();
      console.log('✅ DesktopManager initialized.');
    } else {
      console.error('❌ DesktopManager class not found.');
    }

    // Initialize WindowSwitcher
    if (typeof WindowSwitcher !== 'undefined') {
      window.windowSwitcher = new WindowSwitcher();
      console.log('✅ WindowSwitcher initialized.');
    } else {
      console.error('❌ WindowSwitcher class not found.');
    }
  }, 150); // Increased delay slightly for safety
});
</script> 