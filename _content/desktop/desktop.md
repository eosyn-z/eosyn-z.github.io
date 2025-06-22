---
layout: desktop
title: Desktop Test
desktop_mode: true
---

<div id="desktop-container">
  <!-- Desktop will be initialized here -->
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  // Initialize desktop manager
  if (typeof DesktopManager !== 'undefined') {
    window.desktopManager = new DesktopManager();
  } else {
    console.error('DesktopManager not loaded');
  }
  
  // Initialize window manager
  if (typeof WindowManager !== 'undefined') {
    window.windowManager = new WindowManager();
  } else {
    console.error('WindowManager not loaded');
  }
});
</script> 