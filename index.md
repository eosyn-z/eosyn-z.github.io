---
layout: home
title: eosyn
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
  --border-pink: #ff9800;
  
  /* Shadow Colors */
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.2);
  --shadow-heavy: rgba(0, 0, 0, 0.3);
}

body {
  display: flex;
  flex-direction: column;
  background: var(--gradient-primary);
  color: var(--text-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  min-height: 100vh;
  transition: all 0.3s ease;
  overflow-x: hidden;
}

.main-content {
  flex: 1 0 auto;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px var(--shadow-medium);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.3s ease;
}

h1 {
  color: var(--primary-purple);
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 30px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.starfield-container {
  text-align: center;
  margin: 30px 0;
  padding: 20px;
  background: var(--bg-secondary);
  border-radius: 15px;
  border: 2px solid var(--border-primary);
  transition: all 0.3s ease;
}

.starfield-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 4px solid var(--border-pink);
  object-fit: cover;
  display: inline-block;
  box-shadow: 0 8px 25px var(--shadow-medium);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.starfield-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px var(--shadow-heavy);
}

/* Theme-specific image display */
[data-theme="c"] .starfield-image[data-image="stars"],
[data-theme="z"] .starfield-image[data-image="stars"],
[data-theme="n"] .starfield-image[data-image="stars"] {
  display: inline-block;
}

[data-theme="a"] .starfield-image[data-image="clouds1"] {
  display: inline-block;
}

[data-theme="r"] .starfield-image[data-image="clouds2"] {
  display: inline-block;
}

[data-theme="e"] .starfield-image[data-image="clouds4"] {
  display: inline-block;
}

/* Hide all images by default */
.starfield-image {
  display: none;
}

.nav-links {
  background: var(--bg-secondary);
  border-radius: 15px;
  padding: 25px;
  margin-top: 30px;
  border: 2px solid var(--border-primary);
  transition: all 0.3s ease;
}

.nav-links a {
  display: inline-block;
  color: var(--text-primary);
  text-decoration: none;
  padding: 12px 20px;
  margin: 8px;
  background: var(--bg-primary);
  border-radius: 25px;
  border: 2px solid var(--border-primary);
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-links a:hover {
  background: var(--gradient-primary);
  color: var(--text-white);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-medium);
  border-color: var(--primary-purple);
}

.social-links {
  background: var(--bg-secondary);
  border-radius: 15px;
  padding: 25px;
  margin-top: 20px;
  border: 2px solid var(--border-primary);
  text-align: center;
  transition: all 0.3s ease;
}

.social-links a {
  display: inline-block;
  color: var(--text-primary);
  text-decoration: none;
  padding: 12px 20px;
  margin: 8px;
  background: var(--bg-primary);
  border-radius: 25px;
  border: 2px solid var(--border-primary);
  transition: all 0.3s ease;
  font-weight: 500;
}

.social-links a:hover {
  background: var(--gradient-secondary);
  color: var(--text-white);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-medium);
  border-color: var(--accent-blue);
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
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gear-button {
  width: 40px;
  height: 40px;
  background: var(--bg-primary);
  border-radius: 50%;
  border: 2px solid var(--border-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--text-primary);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-medium);
  margin-bottom: 10px;
}

.gear-button:hover {
  transform: rotate(90deg);
  background: var(--gradient-primary);
  color: var(--text-white);
  border-color: var(--primary-purple);
}

.theme-content {
  display: none;
  text-align: center;
}

.theme-switcher.show .theme-content {
  display: block;
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

.theme-btn[data-theme="c"] { background: linear-gradient(135deg, #667eea 0%, #f093fb 100%); }
.theme-btn[data-theme="a"] { background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); }
.theme-btn[data-theme="r"] { background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%); }
.theme-btn[data-theme="z"] { background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%); }
.theme-btn[data-theme="e"] { background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%); }
.theme-btn[data-theme="n"] { background: linear-gradient(135deg, #ff5722 0%, #ff9800 100%); }

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

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 20px;
    margin: 10px;
  }
  
  h1 {
    font-size: 2em;
  }
  
  .starfield-image {
    width: 150px;
    height: 150px;
    margin: 5px;
  }
  
  .nav-links a,
  .social-links a {
    display: block;
    margin: 5px 0;
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

/* New Top Navigation Bar */
.top-nav {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding: 15px 30px;
  position: sticky;
  top: 0;
  z-index: 1000;
  margin: -20px -20px 20px -20px;
}

.nav-container {
  display: flex;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
}

.brand {
  color: var(--text-white);
  font-weight: bold;
  font-size: 1.5em;
  text-decoration: none;
  text-shadow: 2px 2px 4px rgba(0,0,0,0.2);
}

.nav-links-header {
  margin: 0 auto;
}

.nav-links-header a {
  color: var(--text-white);
  text-decoration: none;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-weight: 500;
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.nav-links-header a:hover {
  background: rgba(255, 255, 255, 0.2);
}

/* New Theme Switcher Styles */
.theme-switcher-container {
  position: relative;
  display: flex;
  align-items: center;
}

.theme-switcher-container .gear-button {
  width: 40px;
  height: 40px;
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.2);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: var(--text-white);
  transition: all 0.3s ease;
  box-shadow: none;
  margin-bottom: 0;
  border-radius: 50%;
}

.theme-switcher-container .gear-button:hover {
  transform: rotate(90deg);
  background: rgba(255, 255, 255, 0.2);
}

.theme-switcher-container .theme-content {
  display: flex;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
  border-radius: 30px;
  padding: 5px;
  margin-left: -50px; /* Hide it behind the gear */
  max-width: 0;
  opacity: 0;
  overflow: hidden;
  transition: all 0.4s ease-in-out;
  z-index: -1;
}

.theme-switcher-container.open .theme-content {
  max-width: 300px; /* Adjust as needed */
  opacity: 1;
  margin-left: -235px; /* Pull it out to the left */
  padding: 5px 10px 5px 45px;
}

.theme-switcher-container .theme-buttons {
  gap: 10px;
  flex-wrap: nowrap;
}

/* Hide old theme switcher */
.theme-switcher {
  display: none;
}

.site-footer {
  flex-shrink: 0;
  padding: 20px;
  text-align: center;
}

.site-footer .social-links a {
  color: var(--text-white);
  text-decoration: none;
  padding: 10px 15px;
  margin: 0 5px;
  border-radius: 20px;
  transition: all 0.3s ease;
  font-weight: 500;
  background: rgba(0,0,0,0.2);
  text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
}

.site-footer .social-links a:hover {
  background: var(--gradient-primary);
}
</style>

<div class="main-content">
  <header class="top-nav">
    <div class="nav-container">
      <a href="/" class="brand">eosyn.net</a>
      <nav class="nav-links-header">
        <a href="/music/">Music</a>
        <a href="/howtodothat/">How To Do That</a>
        <a href="/nature/">Nature</a>
        <a href="/search/">Search</a>
      </nav>
      <div class="theme-switcher-container">
        <div class="gear-button" id="gearButton" title="Theme Settings">⚙️</div>
        <div class="theme-content" id="themeContent">
          <div class="theme-buttons">
            <div class="theme-btn active" data-theme="c" title="C - Cosmic"></div>
            <div class="theme-btn" data-theme="a" title="A - Aurora"></div>
            <div class="theme-btn" data-theme="r" title="R - Rainbow"></div>
            <div class="theme-btn" data-theme="z" title="Z - Zenith"></div>
            <div class="theme-btn" data-theme="e" title="E - Eclipse"></div>
            <div class="theme-btn" data-theme="n" title="N - Nebula"></div>
          </div>
        </div>
      </div>
    </div>
  </header>

  <div class="container">
    <h1>hi, i'm eosyn</h1>
    
    <div class="starfield-container">
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="starfield-image" data-image="stars">
      <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="starfield-image" data-image="clouds1">
      <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="starfield-image" data-image="clouds2">
      <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="starfield-image" data-image="clouds4">
    </div>

    <p style="text-align: center; font-size: 1.2em; color: var(--text-secondary); line-height: 1.6;">
      this site is under construction.<br>
      if you know about this already, you're probably one of my friends.<br>
      thank you for checking it out so early! <3
    </p>

    <div class="nav-links" style="display: none;">
      <a href="/music/">🎵 music</a>
      <a href="/nature/">🌿 touch grass</a>
      <a href="/search/">🔍 discover</a>
      <a href="/howtodothat/">how to do that: a WIP vibe coded answer to the people who are like "wow i could never figure out how to do that"</a>
    </div>

    <!-- Social links moved to footer -->
  </div>
</div>

<footer class="site-footer">
  <div class="social-links">
    <a href="https://github.com/{{ site.github_username }}">GitHub</a>
    <a href="https://discord.com/users/{{ site.discord_username }}">Discord</a>
    <a href="https://twitter.com/{{ site.twitter_username }}">Twitter</a>
    <a href="{{ "/feed.xml" | relative_url }}">RSS</a>
  </div>
</footer>

<!-- Cookie Consent -->
<div class="cookie-consent" id="cookieConsent">
  <h3>🍪 Cookie Notice</h3>
  <p>This website uses cookies to save your theme preference and improve your experience. We only store your theme choice and don't track any personal information.</p>
  <div class="cookie-buttons">
    <button class="cookie-btn reject" onclick="rejectCookies()">Reject</button>
    <button class="cookie-btn accept" onclick="acceptCookies()">Accept</button>
  </div>
</div>

<!-- Sparkle Container -->
<div id="sparkleContainer"></div>

<script>
// Cookie management
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
  // Only load theme from cookie if cookies are accepted
  if (getCookie('cookiesAccepted') === 'true') {
    const savedTheme = getCookie('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }
  } else {
    // Set default theme to "c" if no cookies
    setTheme('c');
  }
}

// Sparkle effect
const sparkleContainer = document.getElementById('sparkleContainer');
document.addEventListener('mousemove', (e) => {
  if (Math.random() > 0.98) {
    createSparkle(e.pageX, e.pageY);
  }
});

function createSparkle(x, y) {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  sparkle.style.left = `${x}px`;
  sparkle.style.top = `${y}px`;
  sparkleContainer.appendChild(sparkle);
  
  setTimeout(() => {
    sparkle.remove();
  }, 4000);
}

// Distant star effect
function createDistantStars() {
  const container = document.body;
  for (let i = 0; i < 50; i++) {
    const star = document.createElement('div');
    star.className = 'distant-star';
    star.style.left = `${Math.random() * 100}vw`;
    star.style.top = `${Math.random() * 100}vh`;
    const size = Math.random() * 2 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.animationDelay = `${Math.random() * 4}s`;
    container.appendChild(star);
  }
}

// Event Listeners
window.addEventListener('load', () => {
  loadTheme();
  showCookieConsent();
  createDistantStars();
});

document.querySelectorAll('.theme-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    setTheme(btn.getAttribute('data-theme'));
  });
});

document.getElementById('gearButton').addEventListener('click', (e) => {
  e.stopPropagation();
  document.querySelector('.theme-switcher-container').classList.toggle('open');
});

document.addEventListener('click', (e) => {
  const themeSwitcher = document.querySelector('.theme-switcher-container');
  if (themeSwitcher.classList.contains('open') && !themeSwitcher.contains(e.target)) {
    themeSwitcher.classList.remove('open');
  }
});

// Cookie consent management
function showCookieConsent() {
  if (!getCookie('cookiesAccepted') && !getCookie('cookiesRejected')) {
    document.getElementById('cookieConsent').classList.add('show');
  }
}
function acceptCookies() {
  setCookie('cookiesAccepted', 'true', 365);
  document.getElementById('cookieConsent').classList.remove('show');
  
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'c';
  setCookie('theme', currentTheme, 365);
}
function rejectCookies() {
  setCookie('cookiesRejected', 'true', 365);
  document.getElementById('cookieConsent').classList.remove('show');
  deleteCookie('theme');
}
</script>
