---
layout: desktop
title: Desktop
desktop_mode: true
---

<div id="desktop-container">
  <!-- Desktop will be initialized here -->
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  console.log('Desktop page loaded, checking for managers...');
  
  // Small delay to ensure all scripts are loaded
  setTimeout(() => {
    // Initialize desktop manager with cookie support
    if (typeof DesktopManager !== 'undefined') {
      console.log('DesktopManager found, initializing...');
      window.desktopManager = new DesktopManager();
    } else {
      console.error('DesktopManager not loaded');
    }
    
    // Initialize window manager
    if (typeof WindowManager !== 'undefined') {
      console.log('WindowManager found, initializing...');
      window.windowManager = new WindowManager();
    } else {
      console.error('WindowManager not loaded');
    }
    
    // Initialize window switcher
    if (typeof WindowSwitcher !== 'undefined') {
      console.log('WindowSwitcher found, initializing...');
      window.windowSwitcher = new WindowSwitcher();
      console.log('WindowSwitcher initialized successfully');
    } else {
      console.error('WindowSwitcher not loaded - checking window object...');
      console.log('Available on window:', Object.keys(window).filter(key => key.includes('Window')));
    }
  }, 100);
});
</script> 