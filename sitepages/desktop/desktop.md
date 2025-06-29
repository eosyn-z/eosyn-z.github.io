---
layout: desktop
title: Desktop
permalink: /desktop/
desktop_mode: true
---

<div id="desktop-grid">
    <!-- Desktop icons are now generated dynamically -->
    {% assign desktop_pages = site.pages %}
    {% for page in desktop_pages %}
        {% if page.title and page.url != "/404.html" and page.url != "/desktop/" and page.url != "/games/" %}
        <div class="desktop-icon" 
             id="icon-{{ page.title | slugify }}" 
             data-app-url="{{ page.url | relative_url }}" 
             data-app-title="{{ page.title }}">
            <div class="icon-image">{{ page.icon | default: '📄' }}</div>
            <div class="icon-label">{{ page.title }}</div>
        </div>
        {% endif %}
    {% endfor %}
    {% assign game_pages = site.games %}
    {% for game in game_pages %}
        {% if game.title != "Game Center" %}
        <div class="desktop-icon" 
             id="icon-{{ game.title | slugify }}" 
             data-app-url="{{ game.permalink | relative_url }}" 
             data-app-title="{{ game.title }}">
            <div class="icon-image">{{ game.icon | default: '🎮' }}</div>
            <div class="icon-label">{{ game.title }}</div>
        </div>
        {% endif %}
    {% endfor %}
    <!-- Bookmarks will be rendered by JS -->
</div>

<div id="window-container"></div>

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