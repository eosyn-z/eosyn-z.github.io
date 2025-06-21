document.addEventListener('DOMContentLoaded', () => {
  // Only run this script on pages that have the 'portfolio' script attribute
  if (document.querySelector('[data-page-script="portfolio"]')) {
    const artGalleries = {
      digital: [
        'https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1920&auto=format&fit=crop'
      ],
      ink: [
        'https://images.unsplash.com/photo-1502472584811-046e2358142d?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1520467795206-62e33627e6ce?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1587825045434-2ba4ab69e618?q=80&w=1920&auto=format&fit=crop'
      ],
      watercolor: [
        'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1509339912108-f6fab4e86785?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1569084825217-4841316b2b29?q=80&w=1920&auto=format&fit=crop'
      ],
      sketching: [
        'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1619482181439-5979f15707ee?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1600869399896-7c08a9dd7814?q=80&w=1920&auto=format&fit=crop'
      ],
      '3d_modeling': [
        'https://images.unsplash.com/photo-1629087598692-a1b7d5528258?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1633355444131-290054457224?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1598550473235-947d4a796593?q=80&w=1920&auto=format&fit=crop'
      ],
      mixed_media: [
        'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1920&auto=format&fit=crop',
        'https://images.unsplash.com/photo-1519714034832-5a587429b4e5?q=80&w=1920&auto=format&fit=crop'
      ]
    };

    const artCards = document.querySelectorAll('.art-card');
    const imageIndexes = {};

    artCards.forEach(card => {
      const category = card.dataset.artCategory;
      if (artGalleries[category]) {
        // Initialize
        imageIndexes[category] = 0;
        card.style.backgroundImage = `url('${artGalleries[category][0]}')`;

        // Preload images for this category
        artGalleries[category].forEach(src => {
          new Image().src = src;
        });
      }
    });

    setInterval(() => {
      artCards.forEach(card => {
        const category = card.dataset.artCategory;
        if (artGalleries[category] && artGalleries[category].length > 1) {
          // Update index
          imageIndexes[category] = (imageIndexes[category] + 1) % artGalleries[category].length;
          const newImageUrl = artGalleries[category][imageIndexes[category]];

          // Fade out, change image, fade in
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.backgroundImage = `url('${newImageUrl}')`;
            card.style.opacity = '1';
          }, 300); // Should match the transition duration in CSS
        }
      });
    }, 4000); // Change image every 4 seconds
  }
}); 