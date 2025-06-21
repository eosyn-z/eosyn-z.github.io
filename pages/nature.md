---
layout: nature
title: Nature
permalink: /nature/
---

<div class="main-content">

<a href="/" class="glass-button" style="position: absolute; top: 20px; left: 20px; z-index: 10;">← Back to Home</a>

<!-- Group Switcher -->
<div id="groupSwitcher" class="glass-panel" style="position: absolute; top: 20px; left: 50%; transform: translateX(-50%); z-index: 1002; display: flex; flex-direction: column; gap: 12px; padding: 12px 20px;">
  <div style="display: flex; gap: 12px;">
    <button class="glass-button primary" data-group="random">Random</button>
    <button class="glass-button" data-group="forest">Forest</button>
    <button class="glass-button" data-group="flowingWater">Flowing Water</button>
    <button class="glass-button" data-group="ocean">Ocean</button>
  </div>
  <!-- Theme Buttons -->
  <div class="theme-buttons" style="justify-content: center; padding-top: 10px; border-top: 1px solid var(--glass-border-light);">
    <div class="theme-btn active" data-theme="c" title="C - Cosmic"></div>
    <div class="theme-btn" data-theme="a" title="A - Aurora"></div>
    <div class="theme-btn" data-theme="r" title="R - Rainbow"></div>
    <div class="theme-btn" data-theme="z" title="Z - Zenith"></div>
    <div class="theme-btn" data-theme="e" title="E - Eclipse"></div>
    <div class="theme-btn" data-theme="n" title="N - Nebula"></div>
    <div class="theme-btn custom-theme" data-theme="custom" title="🎨 Custom Theme Editor">🎨</div>
  </div>
</div>

<div id="imageContainer" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;"></div>

<script>
document.addEventListener('DOMContentLoaded', function() {
    // PASTE YOUR IMAGE LINKS IN THESE ARRAYS! IF YOU WANT TO ADD IMAGES, THIS IS WHERE TO DO IT!
    // MAKE SURE TO LABEL THEM CORRECTLY, OTHERWISE BUTTON USE WON'T MAKE SENSE!


    const forestImages = [
        // Add forest image URLs here
    ];

    const flowingWaterImages = [
        // Add flowing water image URLs here
    ];

    const oceanImages = [
        // Add ocean image URLs here
    ];

    const imageGroups = {
        forest: forestImages,
        flowingWater: flowingWaterImages,
        ocean: oceanImages,
        random: [...forestImages, ...flowingWaterImages, ...oceanImages]
    };

    const groupSwitcher = document.getElementById('groupSwitcher');
    const imageContainer = document.getElementById('imageContainer');
    const loadingMessage = document.getElementById('loading');

    function setRandomImage(group = 'random') {
        const images = imageGroups[group];
        
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }
// If you don't find any images, error instead of breaking the page! 

        if (!images || images.length === 0) {
            imageContainer.style.backgroundImage = 'none';
            if (loadingMessage) {
                 loadingMessage.textContent = `Please add image links to the '${group}' category in nature.md!`;
                 loadingMessage.style.display = 'block';
            }
            return;
        }

// Pick a random image and actually display it!

        const randomIndex = Math.floor(Math.random() * images.length);
        const imageUrl = images[randomIndex];

        imageContainer.style.backgroundImage = `url('${imageUrl}')`;
        imageContainer.style.backgroundSize = 'cover';
        imageContainer.style.backgroundPosition = 'center';
        imageContainer.style.backgroundRepeat = 'no-repeat';
        imageContainer.style.transition = 'background-image 1s ease-in-out';
    }

    function setActiveButton(group) {
        const buttons = groupSwitcher.querySelectorAll('.glass-button');
        buttons.forEach(button => {
            button.classList.toggle('primary', button.dataset.group === group);
        });
    }

    groupSwitcher.addEventListener('click', function(event) {
        const target = event.target;
        if (target.matches('.glass-button[data-group]')) {
            const group = target.dataset.group;
            setRandomImage(group);
            setActiveButton(group);
        }
    });

    imageContainer.addEventListener('click', function() {
        const activeButton = groupSwitcher.querySelector('.primary');
        const currentGroup = activeButton ? activeButton.dataset.group : 'random';
        setRandomImage(currentGroup);
    });
// make the button do this random image thing!

    setRandomImage('random');
    setActiveButton('random');
});
</script> 
