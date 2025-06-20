---
layout: default
title: Nature
permalink: /nature/
---

<div class="main-content">
  <div class="glass-container container">
    <div class="glass-card">

// "back to home" and "nature" buttons below
<a href="/" class="glass-button" style="position: absolute; top: 20px; left: 20px; z-index: 10;">← Back to Home</a>
<div class="glass-panel" style="position: absolute; top: 20px; right: 20px;">
    <h3 style="margin: 0; font-size: 16px; font-weight: 600;">🌿 Nature</h3>
</div>

// shows loading this time and, commented this out for now - not sure if this is the ribbon I need to delete or not xd -eos div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 10;">
div id="loading">Loading nature...</div>
/div>


// this switches between the groups of cinemagraphs I've found online. 
<!-- Group Switcher -->
<div id="groupSwitcher" class="glass-panel" style="position: absolute; top: 80px; left: 50%; transform: translateX(-50%); z-index: 1002; display: flex; gap: 12px; padding: 12px 20px;">
  <button class="glass-button primary" data-group="random">Random</button>
  <button class="glass-button" data-group="forest">Forest</button>
  <button class="glass-button" data-group="flowingWater">Flowing Water</button>
  <button class="glass-button" data-group="ocean">Ocean</button>
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
