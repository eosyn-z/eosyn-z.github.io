---
layout: desktop
title: Desktop
permalink: /desktop/
desktop_mode: true
---

<div id="desktop-grid">
    <!-- Desktop icons are now generated dynamically -->
    
    {% for page in site.pages %}
        {% if page.title and page.url != '/404.html' and page.url != '/desktop/' %}
            <div class="desktop-icon" 
                 id="icon-{{ page.title | slugify }}" 
                 data-app-url="{{ page.url | relative_url }}" 
                 data-app-title="{{ page.title }}">
                <div class="icon-image">{{ page.icon | default: '📄' }}</div>
                <div class="icon-label">{{ page.title }}</div>
            </div>
        {% endif %}
    {% endfor %}

    {% for game in site.games %}
        {% if game.title and game.id != 'games' %}
             <div class="desktop-icon" 
                 id="icon-{{ game.title | slugify }}" 
                 data-app-url="{{ game.permalink | relative_url }}" 
                 data-app-title="{{ game.title }}">
                <div class="icon-image">{{ game.icon | default: '🎮' }}</div>
                <div class="icon-label">{{ game.title }}</div>
            </div>
        {% endif %}
    {% endfor %}
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