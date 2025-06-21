document.addEventListener('DOMContentLoaded', function() {
    // Check if we're on the nature page
    const imageContainer = document.getElementById('imageContainer');
    if (!imageContainer) return;

    // PASTE YOUR IMAGE LINKS IN THESE ARRAYS
    const forestImages = [
        // Example:
        // { url: "https://example.com/forest1.jpg", credit: "Photo by Alice on Unsplash" },
    ];

    const flowingWaterImages = [
        // Example:
        // { url: "https://example.com/water1.jpg", credit: "Photo by Bob on Pexels" },
    ];

    const oceanImages = [
        // Example:
        // { url: "https://example.com/ocean1.jpg", credit: "Photo by Carol on Pixabay" },
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
        const creditsContainer = document.getElementById('imageCredits');
        
        if (loadingMessage) {
            loadingMessage.style.display = 'none';
        }

        if (!images || images.length === 0) {
            imageContainer.style.backgroundImage = 'none';
            if (creditsContainer) creditsContainer.textContent = '';
            if (loadingMessage) {
                 loadingMessage.textContent = `Please add image links to the '${group}' category in nature.md!`;
                 loadingMessage.style.display = 'block';
            }
            return;
        }

        const randomIndex = Math.floor(Math.random() * images.length);
        const imageObj = images[randomIndex];
        let imageUrl = imageObj;
        let credit = '';
        let creditUrl = '';
        if (typeof imageObj === 'object' && imageObj !== null) {
            imageUrl = imageObj.url;
            credit = imageObj.credit || '';
            creditUrl = imageObj.creditUrl || '';
        }
        imageContainer.style.backgroundImage = `url('${imageUrl}')`;
        imageContainer.style.backgroundSize = 'cover';
        imageContainer.style.backgroundPosition = 'center';
        imageContainer.style.backgroundRepeat = 'no-repeat';
        imageContainer.style.transition = 'background-image 1s ease-in-out';
        if (creditsContainer) {
            if (credit && creditUrl) {
                creditsContainer.innerHTML = `<a href="${creditUrl}" target="_blank" rel="noopener" style="color:var(--theme-primary);text-decoration:underline;">${credit}</a>`;
            } else {
                creditsContainer.textContent = credit;
            }
        }
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