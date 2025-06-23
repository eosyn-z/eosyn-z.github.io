---
layout: default
title: Art Gallery
permalink: /portfolio/art/
---

<div class="page-container">
    <h1 class="page-title">{{ page.title }}</h1>
    <p class="page-description">Welcome to the gallery. Please select a category to view the art.</p>

    <div class="gallery-category-links">
        {% assign categories = "Digital,Traditional,3D" | split: ',' %}
        {% for category in categories %}
            {% assign category_slug = category | slugify %}
            <a href="{{ site.baseurl | default: '' }}/{{ category_slug }}/" class="glass-button category-link">
                {{ category }} Art
            </a>
        {% endfor %}
    </div>
</div>

<style>
.gallery-category-links {
    display: flex;
    justify-content: center;
    gap: 20px;
    margin-top: 40px;
}
</style> 
