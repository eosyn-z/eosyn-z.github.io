document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the nature page
    const imageContainer = document.getElementById('imageContainer');
    if (!imageContainer) return;

    // PASTE YOUR IMAGE LINKS IN THESE ARRAYS
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
    const loadingMessage = document.getElementById('loading');

    function setRandomImage(group = 'random') {
        const images = imageGroups[group];
        
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        if (!images || images.length === 0) {
            imageContainer.style.backgroundImage = 'none';
            if (loadingMessage) {
                 loadingMessage.textContent = `Please add image links to the '${group}' category in nature.md!`;
                 loadingMessage.style.display = 'block';
            }
            return;
        }

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

    setRandomImage('random');
    setActiveButton('random');
}); 