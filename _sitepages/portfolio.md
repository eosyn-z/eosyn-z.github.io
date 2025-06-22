---
layout: default
title: Portfolio
icon: 🎨
description: "A collection of my artwork and projects."
---
<div class="main-content glass-container">
<div class="page-header">
    <h1>Art & Projects Portfolio</h1>
    <p>A curated gallery of my digital art and creative projects.</p>
</div>

<div style="margin-bottom: 3rem;">
  <!-- Master Portfolio Container -->
  <div class="glass-panel" style="padding: 2.5rem; height: 100%;">

    <!-- Page Header -->
    <header class="page-header" style="text-align: center; margin-bottom: 2rem;">
      <h1>Portfolio</h1>
      <p>A showcase of my creative works and software projects.</p>
    </header>

    <!-- Sponsorship Buttons -->
    <div class="sponsorship-buttons" style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap; margin-bottom: 2.5rem;">
      <a href="https://buymeacoffee.com/eosyn" target="_blank" rel="noopener noreferrer" class="glass-button">☕ Buy Me a Coffee</a>
      <a href="https://patreon.com/eosyn" target="_blank" rel="noopener noreferrer" class="glass-button">❤️ Patreon</a>
      <a href="https://redbubble.com/people/eosyn" target="_blank" rel="noopener noreferrer" class="glass-button">🎨 Redbubble</a>
    </div>hey

    <!-- Main Content: Two-Column Layout -->
    <div style="display: flex; flex-wrap: wrap; gap: 1.5rem;">

      <!-- Left Container: Artwork -->
      <div class="glass-panel" style="flex: 3; min-width: 400px; padding: 1.5rem;">
        <header class="page-header" style="text-align: center; margin-bottom: 1.5rem;">
          <h2>Artwork</h2>
        </header>
        <div class="portfolio-art-grid">
          <a href="/artpages/digital/"><div class="art-card" data-art-category="digital"><h3>Digital</h3></div></a>
          <a href="#"><div class="art-card" data-art-category="ink"><h3>Ink</h3></div></a>
          <a href="#"><div class="art-card" data-art-category="watercolor"><h3>Watercolor</h3></div></a>
          <a href="#"><div class="art-card" data-art-category="sketching"><h3>Sketching</h3></div></a>
          <a href="/artpages/3d/"><div class="art-card" data-art-category="3d_modeling"><h3>3D Modeling</h3></div></a>
          <a href="#"><div class="art-card" data-art-category="mixed_media"><h3>Mixed Media</h3></div></a>
        </div>
      </div>

      <!-- Right Container: Software Projects -->
      <div class="glass-panel" style="flex: 2; min-width: 300px; padding: 1.5rem;">
        <header class="page-header" style="text-align: center; margin-bottom: 1.5rem;">
          <h2>Projects</h2>
        </header>
        <div class="projects-grid">
          {%- for project in site.projects -%}
          <a href="{{ project.url | relative_url }}" class="project-card-link">
            <div class="project-card glass-card">
              <div class="project-card-image" style="background-image: url('{{ project.thumbnail_image | relative_url }}');"></div>
              <div class="project-card-content">
                <h3>{{ project.title }}</h3>
                <p>{{ project.description }}</p>
              </div>
            </div>
          </a>
          {%- endfor -%}
        </div>
      </div>

    </div> <!-- End Two-Column Layout -->
  </div> <!-- End Master Portfolio Container -->
</div>
</div> 