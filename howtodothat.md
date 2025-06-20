---
layout: page
title: How to Do That
permalink: /howtodothat/
---

<link rel="stylesheet" href="/assets/css/themes.css">

<body style="padding-top: 80px;">

<div class="glass-container" style="max-width: 900px; margin: 0 auto; padding: 30px;">

    <!-- Progress Bar -->
    <div style="width: 100%; height: 6px; border-radius: 3px; margin-bottom: 30px; overflow: hidden; position: relative; background: var(--glass-bg-light);">
        <div id="progress-fill" style="height: 100%; background: linear-gradient(135deg, var(--theme-primary), var(--theme-secondary)); border-radius: 3px; transition: width 0.3s ease; position: relative;"></div>
    </div>

    <header style="text-align: center; margin-bottom: 30px;">
        <h1 style="color: var(--theme-accent); margin-bottom: 10px; font-weight: 700;">Find the Right Tools for Your Project</h1>
        <p style="color: var(--theme-text-secondary);">Answer a few questions to get personalized recommendations.</p>
    </header>

    <div id="selections-display" class="glass-panel" style="margin-bottom: 30px; display: none;">
        <h3 style="margin: 0 0 15px 0; font-size: 16px;">Your Selections:</h3>
        <div id="selection-tags" style="display: flex; flex-wrap: wrap; gap: 8px;"></div>
    </div>

    <form id="quiz-form">
        <!-- Questions will be injected here by JavaScript -->
    </form>
    
    <div style="display: flex; justify-content: space-between; margin-top: 30px;">
        <button id="prev-btn" class="glass-button">Previous</button>
        <button id="next-btn" class="glass-button primary">Next</button>
    </div>
</div>

<script>
    const quizData = [
        // Quiz data here
    ];

    document.addEventListener('DOMContentLoaded', () => {
        // JS logic here
    });
</script>

</body> 