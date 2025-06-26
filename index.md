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
        <div class="window-container" data-theme="a">
          <div class="window" id="main-window">
            <div class="window-header">
              <div class="window-controls">
                <span class="window-control minimize"></span>
                <span class="window-control maximize"></span>
                <span class="window-control close"></span>
              </div>
              <div class="window-title">Welcome to eosyn's World</div>
            </div>
            <div class="window-content" style="display: flex; flex-direction: row; align-items: flex-start; gap: 2rem;">
              <div style="flex: 1; min-width: 220px;">
                <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="theme-image window-image" data-theme-image="c" style="display: inline-block; border-radius: 12px; width: 100%; max-width: 340px;">
                <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="a" style="display: none; border-radius: 12px; width: 100%; max-width: 340px;">
                <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="e" style="display: none; border-radius: 12px; width: 100%; max-width: 340px;">
                <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="theme-image window-image" data-theme-image="n" style="display: none; border-radius: 12px; width: 100%; max-width: 340px;">
              </div>
              <div class="post-it-board" style="display: flex; flex-direction: column; gap: 1.25rem; min-width: 220px;">
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
          </div>
        </div>
        
        <p>
          this site is under construction.<br>if you know about this already, you're probably one of my friends.<br>thank you for checking it out so early! 
          <3</p>
  </div>
</div>

<!-- Draggable, resizable sticky note viewport -->
<div id="welcome-sticky" class="sticky-note glass-card" style="position: absolute; top: 80px; left: 80px; min-width: 260px; min-height: 180px; width: 340px; height: 260px; z-index: 1002; resize: both; overflow: hidden; box-shadow: var(--glass-shadow-heavy);">
  <div class="sticky-header" style="display: flex; align-items: center; padding: 0.5rem 1rem; cursor: move; background: var(--glass-bg-medium); border-bottom: 1px solid var(--glass-border-light);">
    <span class="mac-btn mac-btn-red"></span>
    <span class="mac-btn mac-btn-yellow"></span>
    <span class="mac-btn mac-btn-green"></span>
    <span style="flex:1; text-align:center; font-weight:600; color:var(--theme-text);">Welcome to eosyn's World</span>
  </div>
  <div class="sticky-content" style="width: 100%; height: calc(100% - 40px); display: flex; align-items: center; justify-content: center; background: var(--glass-bg-light);">
    <img id="sticky-theme-image" src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Theme GIF" style="max-width: 100%; max-height: 100%; border-radius: 10px; object-fit: contain; transition: box-shadow 0.2s; box-shadow: 0 2px 12px rgba(0,0,0,0.12);">
  </div>
</div>

<!-- Blur overlay (should be before modals/popups, but NOT a parent of them) -->
<div id="blurOverlay" style="display:none; position:fixed; z-index:9998; top:0; left:0; width:100vw; height:100vh; background:var(--glass-bg-heavy); backdrop-filter:var(--glass-blur-heavy); pointer-events:auto;"></div>

<!-- Cookie Consent Modal (should be above blur, never blurred or hidden by filter) -->
<div id="cookieConsent" style="display:none; position:fixed; z-index:2147483647; top:50%; left:50%; transform:translate(-50%,-50%); min-width:320px; max-width:90vw; background:var(--glass-bg-heavy); border:1px solid var(--glass-border-light); border-radius:18px; box-shadow:var(--glass-shadow-heavy); padding:2.5rem 2rem 2rem 2rem; text-align:center; color:var(--theme-text); backdrop-filter:var(--glass-blur-heavy); filter:none !important; pointer-events:auto !important;">
  <h2 style="margin-top:0; margin-bottom:1rem; color:var(--theme-text); font-size:1.5rem;">🍪 Cookie Consent</h2>
  <p style="margin-bottom:1.5rem; color:var(--theme-text-secondary); line-height:1.5;">This site uses cookies to save your preferences and enhance your experience.<br>By continuing, you accept our use of cookies.</p>
  <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
    <button class="glass-button" onclick="acceptCookies()" style="min-width:100px;">Accept</button>
    <button class="glass-button" onclick="rejectCookies()" style="min-width:100px;">Reject</button>
  </div>
</div>

<!-- Username Modal (should be above blur, never blurred) -->
<div id="usernameModal" style="display:none; position:fixed; z-index:2147483647; top:50%; left:50%; transform:translate(-50%,-50%); min-width:320px; max-width:90vw; background:var(--glass-bg-heavy); border:1px solid var(--glass-border-light); border-radius:18px; box-shadow:var(--glass-shadow-heavy); padding:2.5rem 2rem 2rem 2rem; text-align:center; color:var(--theme-text); backdrop-filter:var(--glass-blur-heavy);">
  <h2 style="margin-top:0; margin-bottom:1rem; color:var(--theme-text); font-size:1.5rem;">👤 Set Your Username</h2>
  <p style="margin-bottom:1.5rem; color:var(--theme-text-secondary); line-height:1.5;">Enter a username for your personalized experience (optional).</p>
  <input id="usernameInput" class="glass-input" type="text" maxlength="32" placeholder="Enter a username (optional)" style="margin-bottom:1.5rem; width:100%; padding:0.75rem; border-radius:8px; border:1px solid var(--glass-border-light); background:var(--glass-bg-light); color:var(--theme-text); box-sizing:border-box;">
  <div style="display:flex; gap:1rem; justify-content:center; flex-wrap:wrap;">
    <button class="glass-button" onclick="submitUsername()" style="min-width:100px;">Save</button>
    <button class="glass-button" onclick="hideModal('usernameModal');hideBlur();" style="min-width:100px;">Skip</button>
  </div>
</div>

<!-- Discord Status Indicator (add to top right of site) -->
<div id="discord-status-indicator" style="position:fixed;top:18px;right:24px;z-index:2147483646;display:flex;align-items:center;gap:0.5em;font-size:1.1em;">
  <span id="discord-status-dot" style="display:inline-block;width:14px;height:14px;border-radius:50%;background:#747f8d;"></span>
  <span id="discord-status-label" style="font-weight:500;color:var(--theme-text, #fff);">Offline</span>
</div>

<!-- Themed Ticker Bar (fixed, only on main page) -->
<div id="themed-ticker-bar" style="position:fixed;top:0;left:0;width:100vw;z-index:2147483645;display:flex;align-items:center;height:32px;background:var(--glass-bg-medium,rgba(30,34,44,0.85));backdrop-filter:var(--glass-blur-medium,blur(8px));border-bottom:1px solid var(--glass-border-light,#3a3a3a);color:var(--theme-text,#fff);font-size:0.95rem;letter-spacing:0.01em;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
  <div id="ticker-content" style="white-space:nowrap;will-change:transform;animation:none;"></div>
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

  // Create carousel with single set of sites (no duplication needed for step carousel)
  tpotSitesCarousel.innerHTML = tpotSites.map((site, index) => `
    <a href="${site.url}" target="_blank" class="tpot-site-btn ${index === 0 ? 'active' : ''}" data-index="${index}">
      <span class="tpot-site-title">${site.title}</span>
      <span class="tpot-site-desc">${site.description}</span>
    </a>
  `).join('');

  // Initialize step carousel
  initStepCarousel(tpotSites.length);
}

function initStepCarousel(totalSites) {
  const carousel = document.getElementById('tpotSitesCarousel');
  const buttons = carousel.querySelectorAll('.tpot-site-btn');
  let currentIndex = 0;
  const displayTime = 2000; // 2 seconds per site minimum
  let interval = null;
  let isPaused = false;

  function showSite(index) {
    buttons.forEach((btn, i) => {
      btn.classList.toggle('active', i === index);
    });
    buttons[index].scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
  }

  function showNextSite() {
    currentIndex = (currentIndex + 1) % totalSites;
    showSite(currentIndex);
  }

  function startCarousel() {
    if (interval) clearInterval(interval);
    interval = setInterval(showNextSite, displayTime);
  }

  function stopCarousel() {
    if (interval) {
      clearInterval(interval);
      interval = null;
    }
  }

  // Initial display
  showSite(currentIndex);
  startCarousel();

  // Pause on hover
  carousel.addEventListener('mouseenter', () => {
    isPaused = true;
    stopCarousel();
  });
  carousel.addEventListener('mouseleave', () => {
    if (isPaused) {
      isPaused = false;
      startCarousel();
    }
  });

  // Manual navigation with arrow keys
  document.addEventListener('keydown', (e) => {
    if (document.activeElement && document.activeElement.tagName === 'INPUT') return;
    if (e.key === 'ArrowLeft') {
      currentIndex = (currentIndex - 1 + totalSites) % totalSites;
      showSite(currentIndex);
      stopCarousel();
      startCarousel();
    } else if (e.key === 'ArrowRight') {
      currentIndex = (currentIndex + 1) % totalSites;
      showSite(currentIndex);
      stopCarousel();
      startCarousel();
    }
  });

  // Click to select
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', (e) => {
      currentIndex = i;
      showSite(currentIndex);
      stopCarousel();
      startCarousel();
    });
  });
}

// Add a subtle highlight animation to .active
const style = document.createElement('style');
style.textContent = `
.tpot-site-btn.active {
  animation: tpotActivePulse 1.2s cubic-bezier(0.4,0,0.2,1) infinite alternate;
}
@keyframes tpotActivePulse {
  0% { box-shadow: 0 0 0 0 var(--theme-accent, #667eea); }
  100% { box-shadow: 0 0 16px 4px var(--theme-accent, #667eea); }
}
`;
document.head.appendChild(style);

// Onboarding logic for cookie consent and username
(function() {
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/';
  }
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }
  function showBlur() {
    const blur = document.getElementById('blurOverlay');
    if (blur) blur.style.display = 'block';
    document.body.classList.add('blurred-for-onboarding');
  }
  function hideBlur() {
    const blur = document.getElementById('blurOverlay');
    if (blur) blur.style.display = 'none';
    document.body.classList.remove('blurred-for-onboarding');
  }
  function showModal(id) {
    const modal = document.getElementById(id);
    if (modal) {
      modal.style.display = 'block';
      modal.style.zIndex = '2147483647';
      modal.style.filter = 'none';
      modal.style.pointerEvents = 'auto';
    }
  }
  function hideModal(id) {
    const modal = document.getElementById(id);
    if (modal) modal.style.display = 'none';
  }
  window.submitUsername = function() {
    const input = document.getElementById('usernameInput');
    const username = input ? input.value.trim() : '';
    setCookie('username', username, 365);
    hideModal('usernameModal');
    hideBlur();
    if (window.setUsernameInStartMenu) window.setUsernameInStartMenu(username);
  };
  window.acceptCookies = function() {
    setCookie('cookie_consent', 'accepted', 365);
    hideModal('cookieConsent');
    // Prompt for username if not set
    if (!getCookie('username')) {
      showModal('usernameModal');
    } else {
      hideBlur();
    }
  };
  window.rejectCookies = function() {
    setCookie('cookie_consent', 'rejected', 365);
    hideModal('cookieConsent');
    hideBlur();
  };
  document.addEventListener('DOMContentLoaded', function() {
    const consent = getCookie('cookie_consent');
    const username = getCookie('username');
    if (consent !== 'accepted' && consent !== 'rejected') {
      showBlur();
      showModal('cookieConsent');
    } else if (!username && consent === 'accepted') {
      showBlur();
      showModal('usernameModal');
    } else {
      hideBlur();
      hideModal('cookieConsent');
    }
  });
})();

(function() {
  // Make sticky note draggable - completely smooth, no grid snapping
  const sticky = document.getElementById('welcome-sticky');
  const header = sticky.querySelector('.sticky-header');
  let offsetX, offsetY, isDragging = false;
  
  header.addEventListener('mousedown', function(e) {
    e.preventDefault(); // Prevent text selection
    isDragging = true;
    offsetX = e.clientX - sticky.offsetLeft;
    offsetY = e.clientY - sticky.offsetTop;
    document.body.style.userSelect = 'none';
    sticky.style.cursor = 'grabbing';
    sticky.style.zIndex = '99999'; // Bring to front while dragging
  });
  
  document.addEventListener('mousemove', function(e) {
    if (!isDragging) return;
    e.preventDefault(); // Prevent any default behavior
    
    // Smooth movement - no grid snapping at all
    const newX = e.clientX - offsetX;
    const newY = e.clientY - offsetY;
    
    // Keep within viewport bounds
    const maxX = window.innerWidth - sticky.offsetWidth;
    const maxY = window.innerHeight - sticky.offsetHeight;
    
    sticky.style.left = Math.max(0, Math.min(newX, maxX)) + 'px';
    sticky.style.top = Math.max(0, Math.min(newY, maxY)) + 'px';
  });
  
  document.addEventListener('mouseup', function() {
    if (isDragging) {
      isDragging = false;
      document.body.style.userSelect = '';
      sticky.style.cursor = 'grab';
      sticky.style.zIndex = '1002'; // Return to normal z-index
    }
  });
  
  // Responsive image on resize
  const observer = new ResizeObserver(() => {
    const img = document.getElementById('sticky-theme-image');
    img.style.maxWidth = '100%';
    img.style.maxHeight = '100%';
  });
  observer.observe(sticky);
  
  // Update image to match current theme
  function updateStickyThemeImage() {
    const theme = document.body.getAttribute('data-theme') || 'c';
    let src = '';
    if (theme === 'c') src = 'https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif';
    else if (theme === 'a') src = 'https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif';
    else if (theme === 'e') src = 'https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif';
    else if (theme === 'n') src = 'https://i.gifer.com/23dZ.gif';
    else if (theme === 'z') src = 'https://i.pinimg.com/originals/74/cc/3c/74cc3cce7eb9c244e935b4a98b58d716.gif';
    else if (theme === 'r') src = 'https://i.gifer.com/1Eqx.gif';
    else src = 'https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif';
    document.getElementById('sticky-theme-image').src = src;
  }
  updateStickyThemeImage();
  const themeObserver = new MutationObserver(updateStickyThemeImage);
  themeObserver.observe(document.body, { attributes: true, attributeFilter: ['data-theme'] });
})();

async function updateDiscordStatusIndicator() {
  try {
    const res = await fetch('https://api.lanyard.rest/v1/users/917811383876341820');
    const data = (await res.json()).data;
    const status = data.discord_status || 'offline';
    const dot = document.getElementById('discord-status-dot');
    const label = document.getElementById('discord-status-label');
    let color = '#747f8d', text = 'Offline';
    if (status === 'online') { color = '#43b581'; text = 'Online'; }
    else if (status === 'idle') { color = '#faa61a'; text = 'Idle'; }
    else if (status === 'dnd') { color = '#f04747'; text = 'Do Not Disturb'; }
    else { color = '#747f8d'; text = 'Offline'; }
    dot.style.background = color;
    label.textContent = text;
  } catch (e) {
    // fallback to offline
    const dot = document.getElementById('discord-status-dot');
    const label = document.getElementById('discord-status-label');
    dot.style.background = '#747f8d';
    label.textContent = 'Offline';
  }
}
updateDiscordStatusIndicator();
setInterval(updateDiscordStatusIndicator, 15000);

document.addEventListener('DOMContentLoaded', function() {
  // Only run ticker on main page
  fetch('tickertext.txt')
    .then(r => r.text())
    .then(raw => {
      let messages;
      try {
        messages = JSON.parse(raw);
      } catch (e) {
        messages = [{ text: raw.trim() }];
      }
      if (!Array.isArray(messages)) messages = [messages];
      const ticker = document.getElementById('ticker-content');
      let current = 0;
      function showMessage(idx) {
        const msg = messages[idx];
        ticker.innerHTML = '';
        if (msg.url) {
          const a = document.createElement('a');
          a.href = msg.url;
          a.textContent = msg.text;
          a.target = '_blank';
          a.style.color = 'inherit';
          a.style.textDecoration = 'underline';
          ticker.appendChild(a);
        } else {
          ticker.textContent = msg.text;
        }
        // Animation duration based on text length
        const baseDuration = 24;
        const charCount = msg.text.length;
        const duration = Math.max(baseDuration, charCount * 0.18);
        ticker.style.animation = 'none';
        void ticker.offsetWidth; // force reflow
        ticker.style.animation = `ticker-scroll ${duration}s linear 1`;
        // When animation ends, show next message
        ticker.onanimationend = () => {
          current = (current + 1) % messages.length;
          showMessage(current);
        };
      }
      showMessage(current);
    })
    .catch(() => {
      document.getElementById('ticker-content').textContent = 'Welcome!';
    });
});
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
  overflow-x: auto;
  scroll-behavior: smooth;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE and Edge */
  white-space: nowrap;
}

.tpot-sites-carousel::-webkit-scrollbar {
  display: none; /* Chrome, Safari, Opera */
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
  transition: all 0.5s ease;
  backdrop-filter: var(--glass-blur-medium);
  box-shadow: var(--glass-shadow-light);
  white-space: nowrap;
  flex-shrink: 0;
  opacity: 0.7;
  transform: scale(0.95);
}

.tpot-site-btn.active {
  opacity: 1;
  transform: scale(1);
  background: var(--glass-bg-heavy);
  border-color: var(--theme-accent);
  box-shadow: var(--glass-shadow-medium);
}

.tpot-site-btn:hover {
  background: var(--glass-bg-heavy);
  transform: translateY(-2px) scale(1.02);
  box-shadow: var(--glass-shadow-medium);
  border-color: var(--theme-accent);
  opacity: 1;
}

.tpot-site-title {
  font-weight: 600;
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: var(--theme-accent);
  transition: color 0.3s ease;
}

.tpot-site-btn.active .tpot-site-title {
  color: var(--theme-accent);
  text-shadow: 0 0 10px rgba(var(--theme-accent-rgb, 99, 102, 241), 0.3);
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
  transition: color 0.3s ease;
}

.tpot-site-btn.active .tpot-site-desc {
  color: var(--text-primary);
}

/* Carousel navigation indicators */
.tpot-carousel-container::after {
  content: '';
  position: absolute;
  bottom: 0.5rem;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  gap: 0.5rem;
  pointer-events: none;
}

/* Responsive adjustments */
@media (max-width: 768px) {
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
  
  /* Adjust display time for mobile */
  .tpot-sites-carousel {
    scroll-snap-type: x mandatory;
  }
  
  .tpot-site-btn {
    scroll-snap-align: center;
  }
}

.mac-btn {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  display: inline-block;
  margin-right: 6px;
  border: 1.5px solid #fff3;
  box-shadow: 0 1px 2px #0002;
}
.mac-btn-red { background: #ff5f56; }
.mac-btn-yellow { background: #ffbd2e; }
.mac-btn-green { background: #27c93f; }
#welcome-sticky { user-select: none; }
#welcome-sticky:active, #welcome-sticky:focus-within { box-shadow: 0 0 0 2px var(--theme-accent); }
#welcome-sticky .sticky-header { cursor: grab; }
#welcome-sticky .sticky-header:active { cursor: grabbing; }

#blurOverlay {
  pointer-events: auto;
  z-index: 9998 !important;
  background: var(--glass-bg-heavy) !important;
  backdrop-filter: var(--glass-blur-heavy) !important;
}
#cookieConsent, #usernameModal {
  z-index: 2147483647 !important;
  pointer-events: auto !important;
  filter: none !important;
  position: fixed !important;
  background: var(--glass-bg-heavy) !important;
  border: 1px solid var(--glass-border-light) !important;
  backdrop-filter: var(--glass-blur-heavy) !important;
  box-shadow: var(--glass-shadow-heavy) !important;
  visibility: visible !important;
  opacity: 1 !important;
  display: block !important;
}
/* Ensure cookie consent is ALWAYS on top */
#cookieConsent {
  z-index: 2147483647 !important;
  position: fixed !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
  pointer-events: auto !important;
  filter: none !important;
  visibility: visible !important;
  opacity: 1 !important;
}
body.blurred-for-onboarding > *:not(#blurOverlay):not(#cookieConsent):not(#usernameModal) {
  filter: blur(6px) saturate(1.1);
  pointer-events: none !important;
  user-select: none !important;
}

#themed-ticker-bar {
  font-family: var(--theme-font, 'Inter', 'Segoe UI', Arial, sans-serif);
  user-select: none;
}
#themed-ticker-bar::-webkit-scrollbar { display: none; }
#ticker-content {
  display: inline-block;
  padding-left: 100vw;
  animation: ticker-scroll 24s linear infinite;
  min-width: 100vw;
}
@keyframes ticker-scroll {
  0% { transform: translateX(0); }
  100% { transform: translateX(-100%); }
}
</style>
