---
layout: default
title: Window Demo
permalink: /window-demo/
icon: 🪟
---

<div class="main-content">
  <div class="glass-card">
    <h1>Window Component Demo</h1>
    <p>This page demonstrates how the new window component can be used and positioned.</p>
    
    <!-- Example 1: Default window with theme images -->
    <h2>Default Window</h2>
    <div class="window-container">
      <div class="window" id="demo-window-1">
        <div class="window-header">
          <div class="window-controls">
            <span class="window-control minimize"></span>
            <span class="window-control maximize"></span>
            <span class="window-control close"></span>
          </div>
          <div class="window-title">Theme Window</div>
        </div>
        <div class="window-content">
          <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="theme-image window-image" data-theme-image="c" style="display: inline-block;">
          <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="a" style="display: none;">
          <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="e" style="display: none;">
          <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="n" style="display: none;">
        </div>
      </div>
      
      <div class="post-it-board">
        <div class="post-it">
          <h3>Window Features</h3>
          <p>• Draggable by header<br>• Resizable by corner<br>• Minimize/Maximize/Close<br>• Theme-aware styling</p>
        </div>
        <div class="post-it">
          <h3>Try It Out!</h3>
          <p>Drag the window around, resize it, and try the theme buttons above!</p>
        </div>
      </div>
    </div>
    
    <!-- Example 2: Custom positioned windows -->
    <h2>Custom Positioned Windows</h2>
    <div style="position: relative; height: 400px; border: 1px solid var(--glass-border-light); border-radius: 12px; margin: 2rem 0; overflow: hidden;">
      <div class="window" id="demo-window-2" style="position: absolute; top: 20px; left: 20px; width: 250px; height: 200px;">
        <div class="window-header">
          <div class="window-controls">
            <span class="window-control minimize"></span>
            <span class="window-control maximize"></span>
            <span class="window-control close"></span>
          </div>
          <div class="window-title">Window 1</div>
        </div>
        <div class="window-content">
          <p style="text-align: center; color: var(--theme-text);">Custom positioned window</p>
        </div>
      </div>
      
      <div class="window" id="demo-window-3" style="position: absolute; top: 100px; right: 20px; width: 200px; height: 150px;">
        <div class="window-header">
          <div class="window-controls">
            <span class="window-control minimize"></span>
            <span class="window-control maximize"></span>
            <span class="window-control close"></span>
          </div>
          <div class="window-title">Window 2</div>
        </div>
        <div class="window-content">
          <p style="text-align: center; color: var(--theme-text);">Another window</p>
        </div>
      </div>
    </div>
    
    <!-- Example 3: Window with custom content -->
    <h2>Window with Custom Content</h2>
    <div class="window-container">
      <div class="window" id="demo-window-4" style="width: 400px; height: 300px;">
        <div class="window-header">
          <div class="window-controls">
            <span class="window-control minimize"></span>
            <span class="window-control maximize"></span>
            <span class="window-control close"></span>
          </div>
          <div class="window-title">Custom Content Window</div>
        </div>
        <div class="window-content" style="flex-direction: column; align-items: flex-start; text-align: left;">
          <h3 style="color: var(--theme-text); margin-bottom: 1rem;">Welcome to the Window System!</h3>
          <p style="color: var(--theme-text-secondary); line-height: 1.6;">
            This window demonstrates how you can put any content inside a window component.
            The window maintains its draggable and resizable functionality while displaying
            your custom content.
          </p>
          <div style="margin-top: 1rem;">
            <button class="glass-button" onclick="alert('Button clicked!')">Test Button</button>
          </div>
        </div>
      </div>
      
      <div class="post-it-board">
        <div class="post-it">
          <h3>Usage Tips</h3>
          <p>• Add <code>class="window"</code> to any div<br>• Include header with controls<br>• Put content in <code>window-content</code> div</p>
        </div>
        <div class="post-it">
          <h3>Positioning</h3>
          <p>Use CSS positioning or the window manager API to position windows programmatically!</p>
        </div>
      </div>
    </div>
    
    <h2>JavaScript API Examples</h2>
    <div class="glass-card">
      <h3>Window Manager API</h3>
      <p>The window manager provides methods to control windows programmatically:</p>
      <pre style="background: var(--glass-bg-medium); padding: 1rem; border-radius: 8px; overflow-x: auto;">
// Get a window
const window = window.windowManager.getWindow('demo-window-1');

// Position a window
window.windowManager.setWindowPosition('demo-window-1', 100, 200);

// Resize a window
window.windowManager.setWindowSize('demo-window-1', 400, 300);

// Show a hidden window
window.windowManager.showWindow('demo-window-1');</pre>
    </div>
  </div>
</div>

<script>
// Demo script to show window positioning
document.addEventListener('DOMContentLoaded', function() {
  // Example: Position windows after a delay
  setTimeout(() => {
    if (window.windowManager) {
      // Move window 2 to a different position
      window.windowManager.setWindowPosition('demo-window-2', 50, 50);
      
      // Resize window 3
      window.windowManager.setWindowSize('demo-window-3', 250, 180);
    }
  }, 1000);
});
</script> 