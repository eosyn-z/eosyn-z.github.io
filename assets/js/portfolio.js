document.addEventListener('DOMContentLoaded', () => {
  // Only run this script on pages that have the 'portfolio' script attribute
  if (document.querySelector('[data-page-script="portfolio"]')) {
    const artGalleries = {
      digital: [
        {
          url: 'https://images.unsplash.com/photo-1554147090-e1221a04a025?q=80&w=1920&auto=format&fit=crop',
          title: 'Digital Fantasy Landscape',
          description: 'A mystical forest scene with ethereal lighting and magical elements',
          dateCreated: '2024-04-15',
          medium: 'Digital Painting',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345678'
        },
        {
          url: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?q=80&w=1920&auto=format&fit=crop',
          title: 'Cyberpunk Cityscape',
          description: 'Futuristic urban environment with neon lights and flying vehicles',
          dateCreated: '2024-03-22',
          medium: 'Digital Illustration',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345679'
        },
        {
          url: 'https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?q=80&w=1920&auto=format&fit=crop',
          title: 'Character Portrait',
          description: 'Detailed character study with expressive features and mood lighting',
          dateCreated: '2024-02-10',
          medium: 'Digital Painting',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345680'
        }
      ],
      ink: [
        {
          url: 'https://images.unsplash.com/photo-1502472584811-046e2358142d?q=80&w=1920&auto=format&fit=crop',
          title: 'Ink Wash Landscape',
          description: 'Traditional ink painting with dramatic contrast and flowing lines',
          dateCreated: '2024-01-28',
          medium: 'Ink on Paper',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345681'
        },
        {
          url: 'https://images.unsplash.com/photo-1520467795206-62e33627e6ce?q=80&w=1920&auto=format&fit=crop',
          title: 'Abstract Ink Composition',
          description: 'Non-representational ink work exploring texture and form',
          dateCreated: '2024-01-15',
          medium: 'Ink on Paper',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345682'
        },
        {
          url: 'https://images.unsplash.com/photo-1587825045434-2ba4ab69e618?q=80&w=1920&auto=format&fit=crop',
          title: 'Calligraphic Design',
          description: 'Modern calligraphy with geometric elements and flowing script',
          dateCreated: '2024-01-05',
          medium: 'Ink on Paper',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345683'
        }
      ],
      watercolor: [
        {
          url: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=1920&auto=format&fit=crop',
          title: 'Watercolor Garden',
          description: 'Delicate floral composition with soft, flowing colors',
          dateCreated: '2024-03-18',
          medium: 'Watercolor on Paper',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345684'
        },
        {
          url: 'https://images.unsplash.com/photo-1509339912108-f6fab4e86785?q=80&w=1920&auto=format&fit=crop',
          title: 'Seascape in Watercolor',
          description: 'Atmospheric ocean scene with dynamic brushwork and color blending',
          dateCreated: '2024-02-25',
          medium: 'Watercolor on Paper',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345685'
        },
        {
          url: 'https://images.unsplash.com/photo-1569084825217-4841316b2b29?q=80&w=1920&auto=format&fit=crop',
          title: 'Urban Watercolor Sketch',
          description: 'Quick urban scene captured with loose, expressive brushstrokes',
          dateCreated: '2024-02-12',
          medium: 'Watercolor on Paper',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345686'
        }
      ],
      sketching: [
        {
          url: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1920&auto=format&fit=crop',
          title: 'Figure Study Sketch',
          description: 'Anatomical study focusing on form, proportion, and gesture',
          dateCreated: '2024-04-08',
          medium: 'Graphite on Paper',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345687'
        },
        {
          url: 'https://images.unsplash.com/photo-1619482181439-5979f15707ee?q=80&w=1920&auto=format&fit=crop',
          title: 'Architectural Sketch',
          description: 'Detailed building study with perspective and structural elements',
          dateCreated: '2024-03-30',
          medium: 'Graphite on Paper',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345688'
        },
        {
          url: 'https://images.unsplash.com/photo-1600869399896-7c08a9dd7814?q=80&w=1920&auto=format&fit=crop',
          title: 'Gesture Drawing',
          description: 'Quick gesture studies capturing movement and energy',
          dateCreated: '2024-03-15',
          medium: 'Charcoal on Paper',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345689'
        }
      ],
      '3d_modeling': [
        {
          url: 'https://images.unsplash.com/photo-1629087598692-a1b7d5528258?q=80&w=1920&auto=format&fit=crop',
          title: 'Sci-Fi Character Model',
          description: 'Detailed 3D character with custom textures and rigging',
          dateCreated: '2024-04-12',
          medium: '3D Modeling',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345690'
        },
        {
          url: 'https://images.unsplash.com/photo-1633355444131-290054457224?q=80&w=1920&auto=format&fit=crop',
          title: 'Environmental Design',
          description: 'Complex 3D environment with lighting and atmospheric effects',
          dateCreated: '2024-03-28',
          medium: '3D Modeling',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345691'
        },
        {
          url: 'https://images.unsplash.com/photo-1598550473235-947d4a796593?q=80&w=1920&auto=format&fit=crop',
          title: 'Product Visualization',
          description: 'Realistic product render with materials and lighting setup',
          dateCreated: '2024-03-10',
          medium: '3D Modeling',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345692'
        }
      ],
      mixed_media: [
        {
          url: 'https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1920&auto=format&fit=crop',
          title: 'Mixed Media Collage',
          description: 'Combination of digital and traditional media with texture elements',
          dateCreated: '2024-04-05',
          medium: 'Mixed Media',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345693'
        },
        {
          url: 'https://images.unsplash.com/photo-1547826039-bfc35e0f1ea8?q=80&w=1920&auto=format&fit=crop',
          title: 'Experimental Composition',
          description: 'Exploration of various materials and techniques in one piece',
          dateCreated: '2024-03-20',
          medium: 'Mixed Media',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345694'
        },
        {
          url: 'https://images.unsplash.com/photo-1519714034832-5a587429b4e5?q=80&w=1920&auto=format&fit=crop',
          title: 'Digital-Traditional Fusion',
          description: 'Seamless blend of digital painting and traditional drawing techniques',
          dateCreated: '2024-03-05',
          medium: 'Mixed Media',
          redbubbleLink: 'https://www.redbubble.com/people/eosyn/works/12345695'
        }
      ]
    };

    const artCards = document.querySelectorAll('.art-card');
    const imageIndexes = {};

    // Initialize art cards with metadata
    artCards.forEach(card => {
      const category = card.dataset.artCategory;
      if (artGalleries[category]) {
        // Initialize
        imageIndexes[category] = 0;
        const firstArtwork = artGalleries[category][0];
        card.style.backgroundImage = `url('${firstArtwork.url}')`;
        
        // Add metadata overlay
        addMetadataOverlay(card, firstArtwork);

        // Preload images for this category
        artGalleries[category].forEach(artwork => {
          new Image().src = artwork.url;
        });
      }
    });

    // Function to add metadata overlay to art cards
    function addMetadataOverlay(card, artwork) {
      // Remove existing overlay if any
      const existingOverlay = card.querySelector('.art-metadata-overlay');
      if (existingOverlay) {
        existingOverlay.remove();
      }

      // Create metadata overlay
      const overlay = document.createElement('div');
      overlay.className = 'art-metadata-overlay';
      overlay.style.cssText = `
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background: linear-gradient(transparent, rgba(0,0,0,0.8));
        color: white;
        padding: 1rem;
        transform: translateY(100%);
        transition: transform 0.3s ease;
        font-size: 0.8rem;
      `;

      overlay.innerHTML = `
        <h4 style="margin: 0 0 0.5rem 0; font-size: 1rem;">${artwork.title}</h4>
        <p style="margin: 0 0 0.5rem 0; opacity: 0.9; line-height: 1.3;">${artwork.description}</p>
        <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
          <span style="opacity: 0.8;">${artwork.medium}</span>
          <span style="opacity: 0.8;">${formatDate(artwork.dateCreated)}</span>
        </div>
        ${artwork.redbubbleLink ? `<a href="${artwork.redbubbleLink}" target="_blank" style="color: #ff6b6b; text-decoration: none; font-weight: 500;">🛍️ Available on Redbubble</a>` : ''}
      `;

      card.appendChild(overlay);

      // Show overlay on hover
      card.addEventListener('mouseenter', () => {
        overlay.style.transform = 'translateY(0)';
      });

      card.addEventListener('mouseleave', () => {
        overlay.style.transform = 'translateY(100%)';
      });
    }

    // Function to format date
    function formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      });
    }

    setInterval(() => {
      artCards.forEach(card => {
        const category = card.dataset.artCategory;
        if (artGalleries[category] && artGalleries[category].length > 1) {
          // Update index
          imageIndexes[category] = (imageIndexes[category] + 1) % artGalleries[category].length;
          const newArtwork = artGalleries[category][imageIndexes[category]];

          // Fade out, change image and metadata, fade in
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.backgroundImage = `url('${newArtwork.url}')`;
            addMetadataOverlay(card, newArtwork);
            card.style.opacity = '1';
          }, 300); // Should match the transition duration in CSS
        }
      });
    }, 4000); // Change image every 4 seconds
  }
}); 