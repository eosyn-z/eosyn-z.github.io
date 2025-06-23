---
layout: desktop
title: Desktop
permalink: /desktop/
desktop_mode: true
---

<div id="desktop-grid">
    <!-- Desktop icons are now generated dynamically -->
    {% assign desktop_pages = site.pages | where_exp: 'p', 'p.title and p.url != "/404.html" and p.url != "/desktop/" and p.url != "/games/"' %}
    {% for page in desktop_pages %}
        <div class="desktop-icon" 
             id="icon-{{ page.title | slugify }}" 
             data-app-url="{{ page.url | relative_url }}" 
             data-app-title="{{ page.title }}">
            <div class="icon-image">{{ page.icon | default: '📄' }}</div>
            <div class="icon-label">{{ page.title }}</div>
        </div>
    {% endfor %}
    {% assign game_pages = site.games | where_exp: 'g', 'g.title and g.title != "Game Center"' %}
    {% for game in game_pages %}
        <div class="desktop-icon" 
             id="icon-{{ game.title | slugify }}" 
             data-app-url="{{ game.permalink | relative_url }}" 
             data-app-title="{{ game.title }}">
            <div class="icon-image">{{ game.icon | default: '🎮' }}</div>
            <div class="icon-label">{{ game.title }}</div>
        </div>
    {% endfor %}
    <!-- Bookmarks will be rendered by JS -->
</div>

<script>
document.addEventListener('DOMContentLoaded', function() {
  if (window.DesktopManager) {
    window.desktopManager = new DesktopManager(document.getElementById('desktop-grid'));
  }
  if (window.WindowManager) {
    window.windowManager = new WindowManager();
  }
});
</script>