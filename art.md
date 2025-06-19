---
layout: page
title: Art Gallery
permalink: /art/
---

<style>
:root {
  /* Primary Color Palette */
  --primary-purple: #667eea;
  --primary-pink: #f093fb;
  --accent-blue: #4facfe;
  --accent-green: #43e97b;
  --accent-orange: #fa709a;
  
  /* Background Gradients */
  --gradient-primary: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
  --gradient-secondary: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-green) 100%);
  --gradient-warm: linear-gradient(135deg, var(--accent-orange) 0%, var(--primary-pink) 100%);
  
  /* Text Colors */
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
  
  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f7fafc;
  --bg-accent: #edf2f7;
  
  /* Border Colors */
  --border-primary: #e2e8f0;
  --border-accent: #cbd5e0;
  --border-pink: #ffb6c1;
  
  /* Shadow Colors */
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.2);
  --shadow-heavy: rgba(0, 0, 0, 0.3);
  
  /* Glass Effects */
  --glass-bg: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  --text-accent: #667eea;
}

/* Theme: Sunset */
[data-theme="sunset"] {
  --primary-purple: #ff6b6b;
  --primary-pink: #ffa726;
  --accent-blue: #ff7043;
  --accent-green: #ffb74d;
  --accent-orange: #ff8a65;
  --gradient-primary: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
  --gradient-secondary: linear-gradient(135deg, #ff7043 0%, #ffb74d 100%);
  --text-accent: #ff6b6b;
  --glass-bg: rgba(255, 107, 107, 0.25);
}

/* Theme: Ocean */
[data-theme="ocean"] {
  --primary-purple: #4fc3f7;
  --primary-pink: #29b6f6;
  --accent-blue: #26c6da;
  --accent-green: #4dd0e1;
  --accent-orange: #00bcd4;
  --gradient-primary: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
  --gradient-secondary: linear-gradient(135deg, #26c6da 0%, #4dd0e1 100%);
  --text-accent: #4fc3f7;
  --glass-bg: rgba(79, 195, 247, 0.25);
}

/* Theme: Forest */
[data-theme="forest"] {
  --primary-purple: #66bb6a;
  --primary-pink: #81c784;
  --accent-blue: #4caf50;
  --accent-green: #66bb6a;
  --accent-orange: #8bc34a;
  --gradient-primary: linear-gradient(135deg, #66bb6a 0%, #81c784 100%);
  --gradient-secondary: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  --text-accent: #66bb6a;
  --glass-bg: rgba(102, 187, 106, 0.25);
}

/* Theme: Dark */
[data-theme="dark"] {
  --primary-purple: #9c27b0;
  --primary-pink: #e91e63;
  --accent-blue: #3f51b5;
  --accent-green: #4caf50;
  --accent-orange: #ff9800;
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-light: #bdbdbd;
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-accent: #404040;
  --border-primary: #404040;
  --border-accent: #555555;
  --gradient-primary: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
  --gradient-secondary: linear-gradient(135deg, #3f51b5 0%, #4caf50 100%);
  --text-accent: #e91e63;
  --glass-bg: rgba(233, 30, 99, 0.25);
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  background: var(--gradient-primary);
  min-height: 100vh;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--glass-bg);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px var(--glass-shadow);
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
  transition: all 0.3s ease;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-accent);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0;
}

.back-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: var(--text-white);
  text-decoration: none;
  font-size: 18px;
  background: var(--glass-bg);
  padding: 12px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid var(--glass-border);
}

.back-link:hover {
  background: var(--gradient-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--glass-shadow);
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.art-piece {
  background: var(--glass-bg);
  border: 2px solid var(--glass-border);
  border-radius: 15px;
  overflow: hidden;
  transition: all 0.3s ease;
  position: relative;
}

.art-piece:hover {
  border-color: var(--text-accent);
  transform: translateY(-5px);
  box-shadow: 0 15px 30px var(--glass-shadow);
}

.art-image {
  width: 100%;
  height: 250px;
  background: var(--gradient-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 3rem;
  color: var(--text-white);
  position: relative;
  overflow: hidden;
}

.art-image::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(45deg, transparent 30%, rgba(255, 255, 255, 0.1) 50%, transparent 70%);
  transform: translateX(-100%);
  transition: transform 0.6s ease;
}

.art-piece:hover .art-image::before {
  transform: translateX(100%);
}

.art-info {
  padding: 20px;
}

.art-title {
  font-size: 1.3rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.art-description {
  color: var(--text-secondary);
  line-height: 1.5;
  margin-bottom: 15px;
}

.art-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  color: var(--text-light);
}

.art-date {
  font-style: italic;
}

.art-medium {
  background: var(--gradient-primary);
  color: var(--text-white);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Theme Switcher */
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--glass-bg);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 10px 30px var(--glass-shadow);
  border: 2px solid var(--glass-border);
  z-index: 1000;
  transition: all 0.3s ease;
}

.theme-switcher h3 {
  margin: 0 0 10px 0;
  color: var(--text-primary);
  font-size: 14px;
  text-align: center;
}

.theme-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.theme-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--glass-border);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.theme-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px var(--glass-shadow);
}

.theme-btn.active {
  border-color: var(--text-accent);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.theme-btn[data-theme="sunset"] { background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); }
.theme-btn[data-theme="ocean"] { background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%); }
.theme-btn[data-theme="forest"] { background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%); }
.theme-btn[data-theme="dark"] { background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%); }

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 30px 20px;
  }
  
  .gallery-grid {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 20px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
  
  .art-image {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 25px 15px;
  }
  
  .gallery-grid {
    grid-template-columns: 1fr;
    gap: 15px;
  }
  
  .header h1 {
    font-size: 1.8rem;
  }
  
  .art-image {
    height: 180px;
  }
  
  .art-title {
    font-size: 1.1rem;
  }
}
</style>

<!-- Starfield Background -->
<div class="starfield-container">
  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="starfield-image" data-image="stars">
  <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="starfield-image" data-image="clouds1">
  <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="starfield-image" data-image="clouds2">
  <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="starfield-image" data-image="clouds4">
</div>

<!-- Sparkle Container -->
<div id="sparkleContainer"></div>

<a href="/" class="back-link">← Back to Home</a>

<div class="container">
  <div class="header">
    <h1>🎨 Art Gallery</h1>
    <p>A collection of creative works and visual experiments</p>
  </div>

  <div class="placeholder-text">
    <h3>🖼️ Gallery Coming Soon</h3>
    <p>This space will showcase digital art, creative coding experiments, and visual projects. Currently in the planning phase - stay tuned for updates!</p>
  </div>

  <div class="gallery-grid">
    <div class="art-piece">
      <div class="art-image">🎨</div>
      <div class="art-info">
        <div class="art-title">Digital Painting</div>
        <p class="art-description">A vibrant digital painting exploring color theory and composition.</p>
        <div class="art-meta">
          <span class="art-medium">Digital Art</span>
          <span class="art-date">Coming Soon</span>
        </div>
      </div>
    </div>

    <div class="art-piece">
      <div class="art-image">✨</div>
      <div class="art-info">
        <div class="art-title">Generative Art</div>
        <p class="art-description">Algorithmic art created with code and mathematical patterns.</p>
        <div class="art-meta">
          <span class="art-medium">Generative</span>
          <span class="art-date">Coming Soon</span>
        </div>
      </div>
    </div>

    <div class="art-piece">
      <div class="art-image">🎭</div>
      <div class="art-info">
        <div class="art-title">Character Design</div>
        <p class="art-description">Original character designs and concept art.</p>
        <div class="art-meta">
          <span class="art-medium">Character Art</span>
          <span class="art-date">Coming Soon</span>
        </div>
      </div>
    </div>

    <div class="art-piece">
      <div class="art-image">🌌</div>
      <div class="art-info">
        <div class="art-title">Space Art</div>
        <p class="art-description">Cosmic landscapes and space-themed illustrations.</p>
        <div class="art-meta">
          <span class="art-medium">Illustration</span>
          <span class="art-date">Coming Soon</span>
        </div>
      </div>
    </div>

    <div class="art-piece">
      <div class="art-image">🎪</div>
      <div class="art-info">
        <div class="art-title">Abstract Art</div>
        <p class="art-description">Abstract compositions exploring form, color, and emotion.</p>
        <div class="art-meta">
          <span class="art-medium">Abstract</span>
          <span class="art-date">Coming Soon</span>
        </div>
      </div>
    </div>

    <div class="art-piece">
      <div class="art-image">🏮</div>
      <div class="art-info">
        <div class="art-title">Pixel Art</div>
        <p class="art-description">Retro-style pixel art and sprite designs.</p>
        <div class="art-meta">
          <span class="art-medium">Pixel Art</span>
          <span class="art-date">Coming Soon</span>
        </div>
      </div>
    </div>
  </div>
</div>

<!-- Theme Switcher -->
<div class="theme-switcher">
  <h3>Theme</h3>
  <div class="theme-buttons">
    <div class="theme-btn active" data-theme="default" title="Default"></div>
    <div class="theme-btn" data-theme="sunset" title="Sunset"></div>
    <div class="theme-btn" data-theme="ocean" title="Ocean"></div>
    <div class="theme-btn" data-theme="forest" title="Forest"></div>
    <div class="theme-btn" data-theme="dark" title="Dark"></div>
  </div>
</div>

<!-- Cookie Consent -->
<div class="cookie-consent" id="cookieConsent">
  <h3>🍪 Cookie Notice</h3>
  <p>This website uses cookies to save your theme preference and improve your experience. We only store your theme choice and don't track any personal information.</p>
  <div class="cookie-buttons">
    <button class="cookie-btn reject" onclick="rejectCookies()">Reject</button>
    <button class="cookie-btn accept" onclick="acceptCookies()">Accept</button>
  </div>
</div>

<script>
// Cookie management functions
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

// Theme management
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
  
  // Save theme preference if cookies are accepted
  if (getCookie('cookiesAccepted') === 'true') {
    setCookie('theme', theme, 365);
  }
}

function loadTheme() {
  const savedTheme = getCookie('theme');
  if (savedTheme) {
    setTheme(savedTheme);
  }
}

// Cookie consent management
function showCookieConsent() {
  if (!getCookie('cookiesAccepted') && !getCookie('cookiesRejected')) {
    document.getElementById('cookieConsent').classList.add('show');
  }
}

function acceptCookies() {
  setCookie('cookiesAccepted', 'true', 365);
  document.getElementById('cookieConsent').classList.remove('show');
  
  // Save current theme preference
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
  setCookie('theme', currentTheme, 365);
}

function rejectCookies() {
  setCookie('cookiesRejected', 'true', 365);
  document.getElementById('cookieConsent').classList.remove('show');
  
  // Clear any existing theme cookie
  deleteCookie('theme');
}

// Sparkle Animation Functions
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  
  // Random position
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const size = Math.random() * 20 + 10;
  
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  sparkle.style.fontSize = size + 'px';
  
  document.getElementById('sparkleContainer').appendChild(sparkle);
  
  // Remove sparkle after animation completes
  setTimeout(() => {
    if (sparkle.parentNode) {
      sparkle.parentNode.removeChild(sparkle);
    }
  }, 4000);
}

function createDistantStar() {
  const star = document.createElement('div');
  star.className = 'distant-star';
  
  // Random position
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  const size = Math.random() * 4 + 2;
  const duration = Math.random() * 3 + 2;
  const delay = Math.random() * 2;
  
  // Theme-specific star properties
  const theme = document.documentElement.getAttribute('data-theme') || 'default';
  switch (theme) {
    case 'sunset':
      star.style.background = 'var(--primary-pink)';
      break;
    case 'ocean':
      star.style.background = 'var(--accent-blue)';
      break;
    case 'forest':
      star.style.background = 'var(--accent-green)';
      break;
    case 'dark':
      star.style.background = 'var(--primary-purple)';
      break;
    default:
      star.style.background = 'var(--primary-purple)';
  }
  
  star.style.left = x + 'px';
  star.style.top = y + 'px';
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  star.style.animationDuration = duration + 's';
  star.style.animationDelay = delay + 's';
  
  document.getElementById('sparkleContainer').appendChild(star);
  
  // Remove star after animation completes
  setTimeout(() => {
    if (star.parentNode) {
      star.parentNode.removeChild(star);
    }
  }, (duration + delay) * 1000);
}

function initSparkles() {
  // Create initial sparkles
  for (let i = 0; i < 10; i++) {
    setTimeout(() => {
      createSparkle();
    }, i * 200);
  }
  
  // Create initial distant stars
  for (let i = 0; i < 20; i++) {
    setTimeout(() => {
      createDistantStar();
    }, i * 100);
  }
  
  // Continue creating sparkles
  setInterval(() => {
    if (document.getElementById('sparkleContainer').children.length < 40) {
      createSparkle();
    }
  }, 2000);
  
  // Continue creating distant stars (more frequent)
  setInterval(() => {
    let maxStars;
    const theme = document.documentElement.getAttribute('data-theme') || 'default';
    
    // Theme-specific star density
    switch (theme) {
      case 'sunset': // Sunset - more stars
        maxStars = 50;
        break;
      case 'dark': // Dark - many stars
        maxStars = 60;
        break;
      default:
        maxStars = 30;
    }
    
    if (document.getElementById('sparkleContainer').children.length < maxStars) {
      createDistantStar();
    }
  }, 800);
}

// Update starfield image
function updateStarfield() {
  const theme = document.documentElement.getAttribute('data-theme') || 'default';
  
  // Hide all starfield images
  document.querySelectorAll('.starfield-image').forEach(img => {
    img.style.opacity = '0';
  });
  
  // Show the appropriate image for the current theme
  const activeImage = document.querySelector(`.starfield-image[data-image="${getImageForTheme(theme)}"]`);
  if (activeImage) {
    activeImage.style.opacity = '0.05';
  }
}

function getImageForTheme(theme) {
  switch (theme) {
    case 'sunset':
      return 'clouds1';
    case 'ocean':
      return 'clouds2';
    case 'forest':
      return 'clouds4';
    case 'dark':
      return 'stars';
    default:
      return 'stars';
  }
}

// Update starfield when theme changes
const originalSetTheme = setTheme;
setTheme = function(theme) {
  originalSetTheme(theme);
  updateStarfield();
};

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Show cookie consent if needed
  showCookieConsent();
  
  // Load saved theme
  loadTheme();
  
  // Theme button click handlers
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });
  
  // Initialize sparkles
  initSparkles();
});
</script> 