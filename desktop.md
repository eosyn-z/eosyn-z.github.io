---
layout: desktop
title: Desktop
permalink: /desktop/
desktop_mode: true
---
<div class="desktop-icon" id="icon-paint" data-app-url="{{ site.baseurl | default: '' }}/paint.html" data-app-title="Paint">
    <div class="icon-image">🎨</div>
    <div class="icon-label">Paint</div>
</div>

<div class="desktop-icon" id="icon-nature" data-app-url="{{ site.baseurl | default: '' }}/nature/" data-app-title="Nature's Window">
    <div class="icon-image">🌳</div>
    <div class="icon-label">Nature</div>
</div>

<div class="desktop-icon" id="icon-games" data-app-url="{{ site.baseurl | default: '' }}/games/" data-app-title="Game Center">
    <div class="icon-image">🎮</div>
    <div class="icon-label">Games</div>
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