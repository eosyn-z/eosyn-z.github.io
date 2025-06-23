---
layout: default
title: eosyn
---

<!-- 
DESKTOP ENVIRONMENT SETUP - ROLLBACK POINT
If this fails, rollback to:
- Remove the script tag at the bottom
- Change "display: none;" back to normal display
- Remove desktop-manager.js from head.html
- Remove desktop-manager.js file
-->

<div class="main-content">
  <!-- TPOT Sites Scrolling Carousel -->
  <div class="tpot-carousel-container">
    <div class="tpot-sites-carousel" id="tpotSitesCarousel">
      <!-- TPOT sites will be populated here -->
    </div>
  </div>

  <div class="glass-card">
        <h1>
          hi, i'm eosyn!


          this page is currently vibe coded, doesn't have any 
          hand-written content yet. please be advised!! i am
          not claiming to have made anything here yet! <33
        </h1>
        
        <!-- Window Component -->
        <div class="window-container">
          <div class="window" id="main-window">
            <div class="window-header">
              <div class="window-controls">
                <span class="window-control minimize"></span>
                <span class="window-control maximize"></span>
                <span class="window-control close"></span>
              </div>
              <div class="window-title">Welcome to eosyn's World</div>
            </div>
            <div class="window-content">
              <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="theme-image window-image" data-theme-image="c" style="display: inline-block;">
              <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="a" style="display: none;">
              <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="e" style="display: none;">
              <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="n" style="display: none;">
            </div>
          </div>
          
          <!-- Post-it Board -->
          <div class="post-it-board">
            <div class="post-it">
              <h3>About Me</h3>
              <p>Hi! I'm eosyn, a creative developer who loves building beautiful digital experiences.</p>
            </div>
            <div class="post-it">
              <h3>Current Status</h3>
              <p>🚧 Site under construction 🚧<br>More content coming soon!</p>
            </div>
            <div class="post-it">
              <h3>Theme Controls</h3>
              <p>Try the theme buttons above to change the window's appearance!</p>
            </div>
            <div class="post-it">
              <h3>Desktop Mode</h3>
              <p>Click the 🌐/🖥️ button to switch between website and desktop modes!</p>
            </div>
          </div>
        </div>
        
        <p>
          this site is under construction.<br>if you know about this already, you're probably one of my friends.<br>thank you for checking it out so early! 
          <3</p>
  </div>
</div>

<script>
// TPOT Sites Scrolling Carousel
document.addEventListener('DOMContentLoaded', function() {
  // Define sites data directly on this page
  const sites = [
    {
        title: "CSS-Tricks",
        description: "Tips, tricks, and techniques for CSS",
        url: "https://css-tricks.com",
        tags: ["personal", "tpot", "tools", "documentation", "css-learning", "tutorials", "examples", "reference", "frontend", "styling", "layout", "responsive-design"],
    },
    {
        title: "Codrops",
        description: "Creative front-end resources and inspiration",
        url: "https://tympanus.net/codrops",
        tags: ["personal", "tpot", "tools", "documentation", "inspiration", "experiments", "tutorials", "creative-coding", "animations", "interactions", "css-effects", "javascript-effects"],
    },
    {
        title: "Can I Use",
        description: "Browser compatibility tables",
        url: "https://caniuse.com",
        tags: ["tools", "personal", "tpot", "browser-support", "compatibility", "reference", "web-standards", "css", "javascript", "html", "apis"],
    },
    {
        title: "CodePen",
        description: "Frontend code playground",
        url: "https://codepen.io",
        tags: ["tools", "personal", "tpot", "code-editor", "frontend", "css", "javascript", "html", "inspiration", "showcase", "learning"],
    },
    {
        title: "Wisk",
        description: "Modern Notion alternative",
        url: "https://wisk.cc",
        tags: ["tools", "personal", "tpot", "note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"],
    },
    {
        title: "cameronsworld",
        description: "Web aesthetic archive and inspiration",
        url: "https://cameronsworld.net",
        tags: ["personal", "tpot", "tools", "inspiration", "web-aesthetics", "archive", "retro-web", "design-inspiration", "creative-coding"],
    },
    {
        title: "everything2",
        description: "Collaborative writing and knowledge base",
        url: "https://everything2.com",
        tags: ["personal", "tpot", "tools", "collaborative-writing", "knowledge-base", "community", "articles", "learning", "reference"],
    },
    {
        title: "strwb.com",
        description: "Personal website and portfolio",
        url: "https://strwb.com",
        tags: ["personal", "tpot", "tools", "portfolio", "personal-site", "inspiration", "web-design"],
    },
    {
        title: "cyb3r17.space",
        description: "Personal portfolio with ML focus",
        url: "https://cyb3r17.space",
        tags: ["personal", "tpot", "tools", "portfolio", "machine-learning", "personal-site", "ai", "research"],
    },
    {
        title: "Archive.today",
        description: "Web archiving service",
        url: "https://archive.today",
        tags: ["tools", "personal", "tpot", "archive", "web-snapshots", "research", "reference", "historical-data"],
    },
    {
        title: "Hacker News",
        description: "Social news website focusing on computer science and entrepreneurship",
        url: "https://news.ycombinator.com",
        tags: ["tools", "personal", "tpot", "news", "community", "programming", "technology", "discussion", "startups"],
    }
  ];

  // Make sites available globally
  window.globalSites = sites;
  
  // Populate TPOT sites immediately
  populateTpotSites();
  
  // Initialize sticky notes functionality
  if (window.windowManager) {
    window.windowManager.initializeStickyNotes();
  } else {
    // Wait for window manager to load
    setTimeout(() => {
      if (window.windowManager) {
        window.windowManager.initializeStickyNotes();
      }
    }, 1000);
  }
});

function populateTpotSites() {
  const tpotSitesCarousel = document.getElementById('tpotSitesCarousel');
  if (!tpotSitesCarousel || !window.globalSites) return;

  // Filter sites with "tpot" tag
  const tpotSites = window.globalSites.filter(site => 
    site.tags && site.tags.includes('tpot')
  );

  if (tpotSites.length === 0) {
    tpotSitesCarousel.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No TPOT sites found.</p>';
    return;
  }

  // Create carousel of buttons - duplicate the list to create seamless loop
  const duplicatedSites = [...tpotSites, ...tpotSites];
  
  tpotSitesCarousel.innerHTML = duplicatedSites.map(site => `
    <a href="${site.url}" target="_blank" class="tpot-site-btn">
      <span class="tpot-site-title">${site.title}</span>
      <span class="tpot-site-desc">${site.description}</span>
    </a>
  `).join('');
}
</script>

<style>
/* TPOT Sites Carousel Styles */
.tpot-carousel-container {
  width: 100%;
  overflow: hidden;
  margin-bottom: 2rem;
  background: var(--glass-bg-light);
  border: 1px solid var(--glass-border-light);
  border-radius: var(--glass-border-radius);
  backdrop-filter: var(--glass-blur-light);
}

.tpot-sites-carousel {
  display: flex;
  gap: 1rem;
  padding: 1rem;
  animation: scrollCarousel 60s linear infinite;
  white-space: nowrap;
}

.tpot-sites-carousel:hover {
  animation-play-state: paused;
}

@keyframes scrollCarousel {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

.tpot-site-btn {
  display: flex;
  flex-direction: column;
  min-width: 200px;
  padding: 1rem;
  background: var(--glass-bg-medium);
  border: 1px solid var(--glass-border-light);
  border-radius: var(--glass-border-radius);
  text-decoration: none;
  color: var(--text-primary);
  transition: all 0.3s ease;
  backdrop-filter: var(--glass-blur-medium);
  box-shadow: var(--glass-shadow-light);
  white-space: nowrap;
  flex-shrink: 0;
}

.tpot-site-btn:hover {
  background: var(--glass-bg-heavy);
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-medium);
  border-color: var(--theme-accent);
}

.tpot-site-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--theme-accent);
}

.tpot-site-desc {
  font-size: 0.85rem;
  color: var(--text-secondary);
  line-height: 1.3;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .tpot-sites-carousel {
    animation-duration: 40s;
  }
  
  .tpot-site-btn {
    min-width: 160px;
    padding: 0.75rem;
  }
  
  .tpot-site-title {
    font-size: 0.9rem;
  }
  
  .tpot-site-desc {
    font-size: 0.8rem;
  }
}
</style>
