---
layout: default
title: Portfolio
permalink: /portfolio/
---

<div class="main-content">

  {%- include sponsorship.html -%}

  <!-- Main Flex Container for Side-by-Side Layout -->
  <div class="glass-container" style="display: flex; flex-wrap: wrap; gap: 1.5rem; padding: 2rem;">

    <!-- Left Container: Artwork -->
    <div class="glass-panel" style="flex: 3; min-width: 400px; padding: 2.5rem;">
      <header class="page-header" style="text-align: center; margin-bottom: 2.5rem;">
        <h1>Artwork</h1>
        <p>A gallery of my creative works across various mediums.</p>
      </header>

      <!-- 3x2 Grid for Art Types -->
      <div class="tile-grid" style="grid-template-columns: repeat(3, 1fr); gap: 1.5rem;">
        
        <a href="/art/digital/" style="text-decoration: none; color: inherit;">
          <div class="glass-card" style="text-align: center; padding: 1.5rem; height: 100%;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎨</div>
            <h3 style="margin: 0;">Digital</h3>
          </div>
        </a>
        
        <a href="/art/ink/" style="text-decoration: none; color: inherit;">
          <div class="glass-card" style="text-align: center; padding: 1.5rem; height: 100%;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">✒️</div>
            <h3 style="margin: 0;">Ink</h3>
          </div>
        </a>
        
        <a href="/art/watercolor/" style="text-decoration: none; color: inherit;">
          <div class="glass-card" style="text-align: center; padding: 1.5rem; height: 100%;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🖌️</div>
            <h3 style="margin: 0;">Watercolor</h3>
          </div>
        </a>
        
        <a href="/art/sketching/" style="text-decoration: none; color: inherit;">
          <div class="glass-card" style="text-align: center; padding: 1.5rem; height: 100%;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">✏️</div>
            <h3 style="margin: 0;">Sketching</h3>
          </div>
        </a>
        
        <a href="/art/3d-modeling/" style="text-decoration: none; color: inherit;">
          <div class="glass-card" style="text-align: center; padding: 1.5rem; height: 100%;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🎭</div>
            <h3 style="margin: 0;">3D Modeling</h3>
          </div>
        </a>
        
        <a href="/art/mixed-media/" style="text-decoration: none; color: inherit;">
          <div class="glass-card" style="text-align: center; padding: 1.5rem; height: 100%;">
            <div style="font-size: 2.5rem; margin-bottom: 1rem;">🖼️</div>
            <h3 style="margin: 0;">Mixed Media</h3>
          </div>
        </a>

      </div>
    </div>

    <!-- Right Container: Software Projects -->
    <div class="glass-panel" style="flex: 1; min-width: 250px; padding: 2.5rem; display: flex; flex-direction: column; justify-content: center; align-items: center; text-align: center;">
      <header class="page-header" style="margin-bottom: 2rem;">
        <h1>Projects</h1>
        <p>A collection of my software development work.</p>
      </header>
      <a href="/projects/" class="glass-button">View Projects</a>
    </div>

  </div> <!-- End Main Flex Container -->

</div> 