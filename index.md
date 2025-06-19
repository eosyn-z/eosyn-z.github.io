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
  --border-pink: #ffb6c1;
  
  /* Shadow Colors */
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.2);
  --shadow-heavy: rgba(0, 0, 0, 0.3);
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
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid var(--border-pink);
  object-fit: cover;
  display: inline-block;
  box-shadow: 0 8px 25px var(--shadow-medium);
  margin: 0 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.starfield-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px var(--shadow-heavy);
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
</style>

<div class="container">
  <h1>hi, i'm eosyn</h1>
  
  <div class="starfield-container">
    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="starfield-image">
    <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="starfield-image">
    <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="starfield-image">
    <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="starfield-image">
  </div>

  <p style="text-align: center; font-size: 1.2em; color: var(--text-secondary); line-height: 1.6;">
    this site is under construction.<br>
    if you know about this already, you're probably one of my friends.<br>
    thank you for checking it out so early! <3
  </p>

  <div class="nav-links">
    <a href="/etc/">🎵 music</a>
    <a href="/nature/">🌿 nature</a>
    <a href="/search/">🔍 discover</a>
    <a href="/howtodothat/">how to do that</a>
  </div>

  <div class="social-links">
    <a href="https://github.com/eosyn-z">GitHub</a>
    <a href="https://discord.com/users/eosyn">@eosyn</a>
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
});
</script>
