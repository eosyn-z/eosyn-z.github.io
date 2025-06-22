---
layout: desktop
title: Desktop
permalink: /desktop/
desktop_mode: true
---

<!-- Desktop Icons for all available pages -->
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

<div class="desktop-icon" id="icon-music" data-app-url="{{ site.baseurl | default: '' }}/music/" data-app-title="Music">
    <div class="icon-image">🎵</div>
    <div class="icon-label">Music</div>
</div>

<div class="desktop-icon" id="icon-portfolio" data-app-url="{{ site.baseurl | default: '' }}/portfolio/" data-app-title="Portfolio">
    <div class="icon-image">📁</div>
    <div class="icon-label">Portfolio</div>
</div>

<div class="desktop-icon" id="icon-search" data-app-url="{{ site.baseurl | default: '' }}/search/" data-app-title="Search">
    <div class="icon-image">🔍</div>
    <div class="icon-label">Search</div>
</div>

<div class="desktop-icon" id="icon-chat" data-app-url="{{ site.baseurl | default: '' }}/chat/" data-app-title="Chat">
    <div class="icon-image">💬</div>
    <div class="icon-label">Chat</div>
</div>

<div class="desktop-icon" id="icon-projects" data-app-url="{{ site.baseurl | default: '' }}/projects/" data-app-title="Projects">
    <div class="icon-image">📋</div>
    <div class="icon-label">Projects</div>
</div>

<div class="desktop-icon" id="icon-howtodothat" data-app-url="{{ site.baseurl | default: '' }}/howtodothat/" data-app-title="How To Do That">
    <div class="icon-image">❓</div>
    <div class="icon-label">How To Do That</div>
</div>

<div class="desktop-icon" id="icon-art" data-app-url="{{ site.baseurl | default: '' }}/art/" data-app-title="Art Gallery">
    <div class="icon-image">🎭</div>
    <div class="icon-label">Art Gallery</div>
</div>

<div class="desktop-icon" id="icon-art-digital" data-app-url="{{ site.baseurl | default: '' }}/digital/" data-app-title="Digital Art">
    <div class="icon-image">💻</div>
    <div class="icon-label">Digital Art</div>
</div>

<div class="desktop-icon" id="icon-art-traditional" data-app-url="{{ site.baseurl | default: '' }}/traditional/" data-app-title="Traditional Art">
    <div class="icon-image">🖼️</div>
    <div class="icon-label">Traditional Art</div>
</div>

<div class="desktop-icon" id="icon-art-3d" data-app-url="{{ site.baseurl | default: '' }}/3d/" data-app-title="3D Art">
    <div class="icon-image">🎪</div>
    <div class="icon-label">3D Art</div>
</div>

<div class="desktop-icon" id="icon-snake" data-app-url="{{ site.baseurl | default: '' }}/snake/" data-app-title="Snake Game">
    <div class="icon-image">🐍</div>
    <div class="icon-label">Snake</div>
</div>

<div class="desktop-icon" id="icon-tetris" data-app-url="{{ site.baseurl | default: '' }}/tetris/" data-app-title="Tetris Game">
    <div class="icon-image">🧩</div>
    <div class="icon-label">Tetris</div>
</div>

<div class="desktop-icon" id="icon-pong" data-app-url="{{ site.baseurl | default: '' }}/pong/" data-app-title="Pong Game">
    <div class="icon-image">🏓</div>
    <div class="icon-label">Pong</div>
</div>

<div class="desktop-icon" id="icon-minecraft" data-app-url="{{ site.baseurl | default: '' }}/minecraft/" data-app-title="Minecraft">
    <div class="icon-image">⛏️</div>
    <div class="icon-label">Minecraft</div>
</div>

<div class="desktop-icon" id="icon-sticky-notes" data-app-url="{{ site.baseurl | default: '' }}/sticky-notes/" data-app-title="Sticky Notes">
    <div class="icon-image">📝</div>
    <div class="icon-label">Sticky Notes</div>
</div>

<div class="desktop-icon" id="icon-desktopsettings" data-app-url="{{ site.baseurl | default: '' }}/desktopsettings/" data-app-title="Desktop Settings">
    <div class="icon-image">⚙️</div>
    <div class="icon-label">Desktop Settings</div>
</div>

<div class="desktop-icon" id="icon-windowsettings" data-app-url="{{ site.baseurl | default: '' }}/windowsettings/" data-app-title="Window Settings">
    <div class="icon-image">🪟</div>
    <div class="icon-label">Window Settings</div>
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

    } else {
      console.error('❌ WindowManager class not found. The script might not be loaded.');
    }

    // Initialize DesktopManager
    if (typeof DesktopManager !== 'undefined') {
      window.desktopManager = new DesktopManager(window.jekyllPages || []);
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