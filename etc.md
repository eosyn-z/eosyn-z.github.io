---
layout: page
title: ETC
permalink: /etc/
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
}

body {
  background: var(--gradient-primary);
  color: var(--text-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s ease;
}

.etc-container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px var(--shadow-medium);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

.etc-header {
  text-align: center;
  margin-bottom: 3rem;
}

.etc-header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--primary-purple);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.etc-header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0;
}

.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
  margin-bottom: 3rem;
}

.music-btn {
  background: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  border-radius: 12px;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  color: var(--text-primary);
}

.music-btn:hover {
  border-color: var(--primary-purple);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-medium);
}

.music-btn.active {
  border-color: var(--primary-purple);
  background: var(--gradient-primary);
  color: var(--text-white);
}

.btn-label {
  font-size: 1.2rem;
  font-weight: 600;
  display: block;
}

.btn-desc {
  font-size: 0.9rem;
  opacity: 0.8;
  display: block;
}

.player-container {
  position: relative;
  min-height: 400px;
  border-radius: 12px;
  overflow: hidden;
  background: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  transition: all 0.3s ease;
}

.spotify-player {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
  visibility: hidden;
  transition: all 0.4s ease;
  padding: 1rem;
}

.spotify-player.active {
  opacity: 1;
  visibility: visible;
}

.spotify-player iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* Theme Switcher */
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--bg-primary);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 10px 30px var(--shadow-medium);
  border: 2px solid var(--border-primary);
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
  border: 2px solid var(--border-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.theme-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px var(--shadow-medium);
}

.theme-btn.active {
  border-color: var(--primary-purple);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.theme-btn[data-theme="default"] { background: linear-gradient(135deg, #667eea 0%, #f093fb 100%); }
.theme-btn[data-theme="sunset"] { background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); }
.theme-btn[data-theme="ocean"] { background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%); }
.theme-btn[data-theme="forest"] { background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%); }
.theme-btn[data-theme="dark"] { background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%); }

/* Cookie Consent */
.cookie-consent {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: var(--bg-primary);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px var(--shadow-medium);
  border: 2px solid var(--border-primary);
  z-index: 1001;
  max-width: 500px;
  margin: 0 auto;
  display: none;
}

.cookie-consent.show {
  display: block;
}

.cookie-consent h3 {
  margin: 0 0 10px 0;
  color: var(--text-primary);
  font-size: 16px;
}

.cookie-consent p {
  margin: 0 0 15px 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.cookie-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.cookie-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cookie-btn.accept {
  background: var(--gradient-primary);
  color: var(--text-white);
}

.cookie-btn.reject {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-primary);
}

.cookie-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-medium);
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .etc-container {
    padding: 20px;
    margin: 10px;
  }
  
  .button-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  
  .etc-header h1 {
    font-size: 2rem;
  }
  
  .player-container {
    min-height: 300px;
  }
  
  .theme-switcher {
    top: 10px;
    right: 10px;
    padding: 10px;
  }
  
  .theme-buttons {
    gap: 5px;
  }
  
  .theme-btn {
    width: 25px;
    height: 25px;
  }
  
  .cookie-consent {
    left: 10px;
    right: 10px;
    bottom: 10px;
  }
  
  .cookie-buttons {
    flex-direction: column;
  }
}

/* Sparkle Animations */
.sparkle {
  position: absolute;
  pointer-events: none;
  font-size: 20px;
  color: var(--primary-pink);
  animation: sparkleFade 4s ease-in-out forwards;
  z-index: 1000;
}

.sparkle::before {
  content: '✨';
  position: absolute;
  top: 0;
  left: 0;
  animation: sparkleTwinkle 2s ease-in-out infinite;
}

/* Distant Star Dots */
.distant-star {
  position: absolute;
  pointer-events: none;
  background: var(--primary-purple);
  border-radius: 50%;
  animation: distantStarFade 4s ease-in-out infinite;
  z-index: 999;
}

@keyframes sparkleFade {
  0% { opacity: 0; transform: scale(0) rotate(0deg); }
  50% { opacity: 1; transform: scale(1) rotate(180deg); }
  100% { opacity: 0; transform: scale(0) rotate(360deg); }
}

@keyframes sparkleTwinkle {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.5; transform: scale(1.2); }
}

@keyframes distantStarFade {
  0% { opacity: 0; transform: scale(0); }
  50% { opacity: 0.8; transform: scale(1); }
  100% { opacity: 0; transform: scale(0); }
}

/* Theme-specific distant star variations */
[data-theme="c"] .distant-star {
  background: var(--primary-purple);
  box-shadow: 0 0 10px var(--primary-purple);
}

[data-theme="a"] .distant-star {
  background: var(--primary-pink);
  box-shadow: 0 0 15px var(--primary-pink);
}

[data-theme="r"] .distant-star {
  background: var(--accent-blue);
  box-shadow: 0 0 8px var(--accent-blue);
}

[data-theme="z"] .distant-star {
  background: var(--accent-green);
  box-shadow: 0 0 12px var(--accent-green);
}

[data-theme="e"] .distant-star {
  background: var(--accent-orange);
  box-shadow: 0 0 20px var(--accent-orange);
}

[data-theme="n"] .distant-star {
  background: var(--primary-purple);
  box-shadow: 0 0 18px var(--primary-purple);
}

[data-theme="sunset"] .distant-star {
  background: var(--primary-pink);
  box-shadow: 0 0 15px var(--primary-pink);
}

[data-theme="ocean"] .distant-star {
  background: var(--accent-blue);
  box-shadow: 0 0 10px var(--accent-blue);
}

[data-theme="forest"] .distant-star {
  background: var(--accent-green);
  box-shadow: 0 0 12px var(--accent-green);
}

[data-theme="dark"] .distant-star {
  background: var(--primary-purple);
  box-shadow: 0 0 25px var(--primary-purple);
}

#sparkleContainer {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;
  overflow: hidden;
}

/* Starfield Background */
.starfield-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: -1;
  overflow: hidden;
}

.starfield-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 1s ease-in-out;
}

.starfield-image:hover {
  opacity: 0.1;
}

/* Theme-specific starfield images */
[data-theme="c"] .starfield-image[data-image="stars"],
[data-theme="a"] .starfield-image[data-image="clouds1"],
[data-theme="r"] .starfield-image[data-image="clouds2"],
[data-theme="e"] .starfield-image[data-image="clouds4"],
[data-theme="z"] .starfield-image[data-image="stars"],
[data-theme="n"] .starfield-image[data-image="stars"] {
  opacity: 0.05;
}

.starfield-image {
  opacity: 0;
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

<div class="etc-container">
  <div class="etc-header">
    <h1>ETC</h1>
    <p>Some music I've been listening to lately. Click any button to start playing.</p>
  </div>

  <div class="button-grid">
    <button class="music-btn" data-player="player1">
      <span class="btn-label">Chill Vibes</span>
      <span class="btn-desc">Lo-fi beats and ambient sounds</span>
    </button>
    
    <button class="music-btn" data-player="player2">
      <span class="btn-label">Workout Mix</span>
      <span class="btn-desc">High energy tracks to keep you moving</span>
    </button>
    
    <button class="music-btn" data-player="player3">
      <span class="btn-label">Late Night</span>
      <span class="btn-desc">Moody tunes for the evening hours</span>
    </button>
    
    <button class="music-btn" data-player="player4">
      <span class="btn-label">Study Session</span>
      <span class="btn-desc">Instrumental focus music</span>
    </button>
    
    <button class="music-btn" data-player="player5">
      <span class="btn-label">Road Trip</span>
      <span class="btn-desc">Perfect for long drives</span>
    </button>
    
    <button class="music-btn" data-player="player6">
      <span class="btn-label">Weekend Vibes</span>
      <span class="btn-desc">Feel-good weekend energy</span>
    </button>
  </div>

  <div class="player-container">
    <div id="player1" class="spotify-player active">
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5Vy6DFOcx00?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
    
    <div id="player2" class="spotify-player">
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
    
    <div id="player3" class="spotify-player">
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX3Ogo9pFvBkY?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
    
    <div id="player4" class="spotify-player">
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX9uKNf5jGX6m?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
    
    <div id="player5" class="spotify-player">
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX5Vy6DFOcx00?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
    </div>
    
    <div id="player6" class="spotify-player">
      <iframe style="border-radius:12px" src="https://open.spotify.com/embed/playlist/37i9dQZF1DX76Wlfdnj7AP?utm_source=generator" width="100%" height="352" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
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
  
  // Music player functionality
  const buttons = document.querySelectorAll('.music-btn');
  const players = document.querySelectorAll('.spotify-player');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const targetPlayer = this.getAttribute('data-player');
      
      // Remove active class from all buttons and players
      buttons.forEach(btn => btn.classList.remove('active'));
      players.forEach(player => player.classList.remove('active'));
      
      // Add active class to clicked button and corresponding player
      this.classList.add('active');
      document.getElementById(targetPlayer).classList.add('active');
    });
  });
  
  // Initialize sparkles
  initSparkles();
});

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
</script> 