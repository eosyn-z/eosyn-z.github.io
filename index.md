---
layout: default
title: eosyn
---

<!-- 
DESKTOP ENVIRONMENT SETUP - ROLLBACK POINT
If this fails, rollback to:
- Remove the script tag at the bottom
- Change "display: none;" back to normal display
- Remove desktop-manager.js from head.html
- Remove desktop-manager.js file
-->

<div class="main-content">
  <div class="glass-card">
        <h1>
          hi, i'm eosyn!


          this page is currently vibe coded, doesn't have any 
          hand-written content yet. please be advised!! i am
          not claiming to have made anything here yet! <33
        </h1>
        
        <!-- Window Component -->
        <div class="window-container">
          <div class="window" id="main-window">
            <div class="window-header">
              <div class="window-controls">
                <span class="window-control minimize"></span>
                <span class="window-control maximize"></span>
                <span class="window-control close"></span>
              </div>
              <div class="window-title">Welcome to eosyn's World</div>
            </div>
            <div class="window-content">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="theme-image window-image" data-theme-image="c" style="display: inline-block;">
              <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="a" style="display: none;">
              <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="e" style="display: none;">
              <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="n" style="display: none;">
            </div>
          </div>
          
          <!-- Post-it Board -->
          <div class="post-it-board">
            <div class="post-it">
              <h3>About Me</h3>
              <p>Hi! I'm eosyn, a creative developer who loves building beautiful digital experiences.</p>
            </div>
            <div class="post-it">
              <h3>Current Status</h3>
              <p>🚧 Site under construction 🚧<br>More content coming soon!</p>
            </div>
            <div class="post-it">
              <h3>Theme Controls</h3>
              <p>Try the theme buttons above to change the window's appearance!</p>
            </div>
            <div class="post-it">
              <h3>Desktop Mode</h3>
              <p>Click the 🌐/🖥️ button to switch between website and desktop modes!</p>
            </div>
          </div>
        </div>
        
        <p>
          this site is under construction.<br>if you know about this already, you're probably one of my friends.<br>thank you for checking it out so early! 
          <3</p>
  </div>
</div>

<script>
// DESKTOP ENVIRONMENT ENABLER
// This enables the desktop mode with icons and wallpaper
// If this fails, remove this entire script tag
document.body.classList.add('desktop-mode');
</script>
