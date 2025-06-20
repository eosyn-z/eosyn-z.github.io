---
layout: null
title: Nature
permalink: /nature/
---

<<<<<<< HEAD
<link rel="stylesheet" href="/assets/css/themes.css">

<a href="/" class="glass-button" style="position: absolute; top: 20px; left: 20px; z-index: 10;">← Back to Home</a>
<div class="glass-panel" style="position: absolute; top: 20px; right: 20px;">
    <h3 style="margin: 0; font-size: 16px; font-weight: 600;">🌿 Nature</h3>
</div>

<div style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); text-align: center; z-index: 10;">
  <div class="glass-panel" id="loading">Loading nature...</div>
</div>

<!-- Group Switcher -->
<div id="groupSwitcher" class="glass-panel" style="position: absolute; top: 80px; left: 50%; transform: translateX(-50%); z-index: 1002; display: flex; gap: 12px; padding: 12px 20px;">
  <button class="glass-button primary" data-group="random">Random</button>
  <button class="glass-button" data-group="forest">Forest</button>
  <button class="glass-button" data-group="flowingWater">Flowing Water</button>
  <button class="glass-button" data-group="ocean">Ocean</button>
</div>

<!-- Theme Switcher -->
<div class="glass-panel" style="position: fixed; top: 20px; right: 20px; z-index: 1000;">
  <h3 style="margin: 0 0 10px 0; font-size: 14px; text-align: center;">Theme</h3>
  <div style="display: flex; gap: 8px; flex-wrap: wrap; justify-content: center;">
    <div class="glass-button primary" data-theme="default" title="Default" style="width: 30px; height: 30px; border-radius: 50%;"></div>
    <div class="glass-button" data-theme="sunset" title="Sunset" style="width: 30px; height: 30px; border-radius: 50%;"></div>
    <div class="glass-button" data-theme="ocean" title="Ocean" style="width: 30px; height: 30px; border-radius: 50%;"></div>
    <div class="glass-button" data-theme="forest" title="Forest" style="width: 30px; height: 30px; border-radius: 50%;"></div>
    <div class="glass-button" data-theme="dark" title="Dark" style="width: 30px; height: 30px; border-radius: 50%;"></div>
  </div>
</div>

<!-- Cookie Consent -->
<div id="cookieConsent" class="glass-modal" style="position: fixed; bottom: 20px; left: 20px; right: 20px; z-index: 1001; display: none;">
  <h3>🍪 Cookie Notice</h3>
=======
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Nature - eosyn</title>
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
      
      /* Advanced Glass Effects */
      --glass-bevel: rgba(255, 255, 255, 0.4);
      --glass-inner-shadow: rgba(0, 0, 0, 0.1);
      --glass-highlight: rgba(255, 255, 255, 0.6);
      --glass-gradient-1: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%);
      --glass-gradient-2: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%);
      --glass-gradient-3: linear-gradient(225deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%);
    }

    /* Theme: C - Cosmic (Dark Theme) */
    [data-theme="c"] {
      --primary-purple: #667eea;
      --primary-pink: #f093fb;
      --accent-blue: #4facfe;
      --accent-green: #43e97b;
      --accent-orange: #fa709a;
      --text-primary: #ffffff;
      --text-secondary: #e0e0e0;
      --text-light: #bdbdbd;
      --bg-primary: #0a0a0a;
      --bg-secondary: #1a1a1a;
      --bg-accent: #2d2d2d;
      --border-primary: #404040;
      --border-accent: #555555;
      --gradient-primary: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
      --gradient-secondary: linear-gradient(135deg, #4facfe 0%, #43e97b 100%);
      --text-accent: #667eea;
      --glass-bg: rgba(102, 126, 234, 0.25);
      --glass-border: rgba(102, 126, 234, 0.3);
    }

    /* Theme: A - Aurora */
    [data-theme="a"] {
      --primary-purple: #ff6b6b;
      --primary-pink: #ffa726;
      --accent-blue: #ff7043;
      --accent-green: #ffb74d;
      --accent-orange: #ff8a65;
      --gradient-primary: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
      --gradient-secondary: linear-gradient(135deg, #ff7043 0%, #ffb74d 100%);
      --text-accent: #ff6b6b;
      --glass-bg: rgba(255, 107, 107, 0.25);
      --glass-border: rgba(255, 107, 107, 0.3);
    }

    /* Theme: R - Rainbow */
    [data-theme="r"] {
      --primary-purple: #4fc3f7;
      --primary-pink: #29b6f6;
      --accent-blue: #26c6da;
      --accent-green: #4dd0e1;
      --accent-orange: #00bcd4;
      --gradient-primary: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
      --gradient-secondary: linear-gradient(135deg, #26c6da 0%, #4dd0e1 100%);
      --text-accent: #4fc3f7;
      --glass-bg: rgba(79, 195, 247, 0.25);
      --glass-border: rgba(79, 195, 247, 0.3);
    }

    /* Theme: Z - Zenith (Dark Theme) */
    [data-theme="z"] {
      --primary-purple: #66bb6a;
      --primary-pink: #81c784;
      --accent-blue: #4caf50;
      --accent-green: #66bb6a;
      --accent-orange: #8bc34a;
      --text-primary: #ffffff;
      --text-secondary: #e0e0e0;
      --text-light: #bdbdbd;
      --bg-primary: #0a0a0a;
      --bg-secondary: #1a1a1a;
      --bg-accent: #2d2d2d;
      --border-primary: #404040;
      --border-accent: #555555;
      --gradient-primary: linear-gradient(135deg, #66bb6a 0%, #81c784 100%);
      --gradient-secondary: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
      --text-accent: #66bb6a;
      --glass-bg: rgba(102, 187, 106, 0.25);
      --glass-border: rgba(102, 187, 106, 0.3);
    }

    /* Theme: E - Eclipse */
    [data-theme="e"] {
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
      --glass-border: rgba(233, 30, 99, 0.3);
    }

    /* Theme: N - Nebula (Dark Theme) */
    [data-theme="n"] {
      --primary-purple: #ff5722;
      --primary-pink: #ff9800;
      --accent-blue: #ff5722;
      --accent-green: #ff9800;
      --accent-orange: #ff5722;
      --text-primary: #ffffff;
      --text-secondary: #e0e0e0;
      --text-light: #bdbdbd;
      --bg-primary: #0a0a0a;
      --bg-secondary: #1a1a1a;
      --bg-accent: #2d2d2d;
      --border-primary: #404040;
      --border-accent: #555555;
      --gradient-primary: linear-gradient(135deg, #ff5722 0%, #ff9800 100%);
      --gradient-secondary: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
      --text-accent: #ff5722;
      --glass-bg: rgba(255, 87, 34, 0.25);
      --glass-border: rgba(255, 87, 34, 0.3);
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
      --glass-border: rgba(255, 107, 107, 0.3);
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
      --glass-border: rgba(79, 195, 247, 0.3);
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
      --glass-border: rgba(102, 187, 106, 0.3);
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
      --glass-border: rgba(233, 30, 99, 0.3);
    }

    body {
      margin: 0;
      padding: 0;
      height: 100vh;
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      background-attachment: fixed;
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      color: var(--text-white);
      text-shadow: 2px 2px 4px var(--shadow-heavy);
      transition: all 0.3s ease;
    }

    .content {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      text-align: center;
      z-index: 10;
    }

    .back-link {
      position: absolute;
      top: 20px;
      left: 20px;
      color: var(--text-white);
      text-decoration: none;
      font-size: 18px;
      background: var(--shadow-heavy);
      padding: 12px 20px;
      border-radius: 25px;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .back-link:hover {
      background: var(--gradient-primary);
      transform: translateY(-2px);
      box-shadow: 0 8px 20px var(--shadow-medium);
    }

    .loading {
      font-size: 24px;
      opacity: 0.9;
      background: var(--shadow-heavy);
      padding: 20px 30px;
      border-radius: 15px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    .page-title {
      position: absolute;
      top: 20px;
      right: 20px;
      background: var(--shadow-heavy);
      padding: 12px 20px;
      border-radius: 25px;
      backdrop-filter: blur(10px);
      border: 1px solid rgba(255, 255, 255, 0.2);
      font-size: 16px;
      font-weight: 600;
    }

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

    @media (max-width: 768px) {
      .cookie-consent {
        left: 10px;
        right: 10px;
        bottom: 10px;
      }
      
      .cookie-buttons {
        flex-direction: column;
      }
    }

    .group-switcher {
      position: absolute;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1002;
      display: flex;
      justify-content: center;
      gap: 15px;
      margin: 20px 0;
      flex-wrap: wrap;
    }

    .group-btn {
      padding: 10px 18px;
      border-radius: 25px;
      cursor: pointer;
      font-size: 15px;
      font-weight: 500;
      transition: all 0.3s ease;
      border: 1px solid transparent;
      color: var(--text-white);
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
      position: relative;
      overflow: hidden;
      box-shadow: 0 5px 15px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(0,0,0,0.3);
      background: var(--gradient-button);
    }

    .group-btn::before {
      content: '';
      position: absolute;
      top: -20px;
      left: -50px;
      width: 30px;
      height: 150%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
      transform: rotate(25deg);
      transition: all 0.6s ease;
    }

    .group-btn:hover::before {
      left: calc(100% + 50px);
    }

    .group-btn:hover {
      transform: translateY(-3px) scale(1.05);
      box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15), inset 0 -1px 2px rgba(0,0,0,0.3);
    }

    .group-btn:active {
      transform: translateY(1px) scale(1);
      box-shadow: 0 2px 5px rgba(0,0,0,0.2), inset 0 2px 5px rgba(0,0,0,0.4);
    }

    .group-btn.active {
      box-shadow: 0 0 0 3px var(--accent), 0 5px 15px rgba(0,0,0,0.2), inset 0 -1px 2px rgba(0,0,0,0.3);
      transform: translateY(1px) scale(1);
    }

    /* Starfield Background - REMOVED FOR NATURE PAGE */

    #sparkleContainer {
      display: none; /* Disabled for nature page */
    }
    </style>
</head>
<body>
<a href="/" class="back-link">← Back to Home</a>

<!-- Starfield Background - REMOVED FOR NATURE PAGE -->

<!-- Sparkle Container - REMOVED FOR NATURE PAGE -->

<div class="page-title">Touch grass</div>

<!-- Group Switcher -->
<div class="group-switcher" id="groupSwitcher">
  <button class="group-btn active" data-group="random">Random</button>
  <button class="group-btn" data-group="forest">Forest</button>
  <button class="group-btn" data-group="flowingWater">Flowing Water</button>
  <button class="group-btn" data-group="ocean">Ocean</button>
</div>

<div class="content">
  <div class="loading">Loading some cool cinemagraphs I found online... </div>
</div>

<!-- Cookie Consent -->
<div class="cookie-consent" id="cookieConsent">
  <h3>Cookie Notice</h3>
>>>>>>> d9edde2bf9ec4a8cd666404e256a939608e51d95
  <p>This website uses cookies to save your theme preference and improve your experience. We only store your theme choice and don't track any personal information.</p>
  <div style="display: flex; gap: 10px; justify-content: flex-end;">
    <button class="glass-button" onclick="rejectCookies()">Reject</button>
    <button class="glass-button primary" onclick="acceptCookies()">Accept</button>
  </div>
</div>

<script>
// Curated lists of nature-themed gifs
const forestCinemagraphs = [
  "https://i.pinimg.com/originals/60/d8/44/60d844679e07db517c19fdc5dd7af089.gif",
  "https://i.pinimg.com/originals/92/cd/fc/92cdfc9bdebc53a747331999b6933734.gif",
  "https://i.pinimg.com/originals/fc/5f/2c/fc5f2cbfc8b3f89af197a02aaef345c3.gif",
];
const flowingWaterCinemagraphs = [
  "https://livingstills.nl/wp-content/uploads/2020/11/waterfall_mist.gif",
  "https://64.media.tumblr.com/c74ed91f169aea9552d8d1a38d245cbd/tumblr_ntr9fsF71S1upvbufo1_540.gif",
  "https://mir-s3-cdn-cf.behance.net/project_modules/source/1aacd211481791.560f867dabbbd.gif",
];
const oceanCinemagraphs = [
  "https://www.theodysseyonline.com/media-library/image.gif?id=10746909&width=800&quality=80",
];
const natureGroups = {
  random: [...forestCinemagraphs, ...flowingWaterCinemagraphs, ...oceanCinemagraphs],
  forest: forestCinemagraphs,
  flowingWater: flowingWaterCinemagraphs,
  ocean: oceanCinemagraphs
};
let currentGroup = 'random';

// --- Theme & Cookie Logic ---
function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
<<<<<<< HEAD
  document.querySelectorAll('.glass-button[data-theme]').forEach(btn => btn.classList.remove('primary'));
  document.querySelector(`.glass-button[data-theme="${theme}"]`).classList.add('primary');
=======
>>>>>>> d9edde2bf9ec4a8cd666404e256a939608e51d95
  if (getCookie('cookiesAccepted') === 'true') {
    setCookie('theme', theme, 365);
  }
}

function loadTheme() {
<<<<<<< HEAD
  const savedTheme = getCookie('theme');
  if (savedTheme) setTheme(savedTheme);
}
// Cookie consent management
function showCookieConsent() {
  if (!getCookie('cookiesAccepted') && !getCookie('cookiesRejected')) {
    document.getElementById('cookieConsent').style.display = 'block';
=======
  let theme = 'a'; // Default to Aurora
  if (getCookie('cookiesAccepted') === 'true') {
    theme = getCookie('theme') || 'a';
>>>>>>> d9edde2bf9ec4a8cd666404e256a939608e51d95
  }
  setTheme(theme);
}
<<<<<<< HEAD
function acceptCookies() {
  setCookie('cookiesAccepted', 'true', 365);
  document.getElementById('cookieConsent').style.display = 'none';
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
  setCookie('theme', currentTheme, 365);
}
function rejectCookies() {
  setCookie('cookiesRejected', 'true', 365);
  document.getElementById('cookieConsent').style.display = 'none';
  deleteCookie('theme');
}
// Nature background logic
function getRandomGifFromGroup(group) {
=======
// --- End Theme & Cookie Logic ---

function showRandomCinemagraph(group = 'random') {
>>>>>>> d9edde2bf9ec4a8cd666404e256a939608e51d95
  const arr = natureGroups[group] || natureGroups['random'];
  if (!arr.length) return '';
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}

function setNatureBackground(group) {
  const gif = showRandomCinemagraph(group);
  document.body.style.backgroundImage = gif ? `url('${gif}')` : '';
}

function setActiveGroupBtn(group) {
  document.querySelectorAll('.glass-button[data-group]').forEach(btn => {
    if (btn.getAttribute('data-group') === group) {
      btn.classList.add('primary');
    } else {
      btn.classList.remove('primary');
    }
  });
}

window.addEventListener('load', function() {
  setNatureBackground(currentGroup);
  setTimeout(() => {
    const loadingElement = document.getElementById('loading');
    if (loadingElement) loadingElement.style.display = 'none';
  }, 1000);
});

document.addEventListener('DOMContentLoaded', function() {
  showCookieConsent();
<<<<<<< HEAD
  loadTheme();
  document.querySelectorAll('.glass-button[data-theme]').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });
  document.querySelectorAll('.glass-button[data-group]').forEach(btn => {
=======
  
  document.querySelectorAll('.group-btn').forEach(btn => {
>>>>>>> d9edde2bf9ec4a8cd666404e256a939608e51d95
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const group = this.getAttribute('data-group');
      currentGroup = group;
      setActiveGroupBtn(group);
      setNatureBackground(group);
    });
  });
});
<<<<<<< HEAD
document.addEventListener('click', function(e) {
  if (
    e.target.classList.contains('glass-button') ||
    e.target.closest('.glass-panel') ||
    e.target.closest('.glass-modal') ||
    e.target.closest('#groupSwitcher')
  ) {
    return;
  }
  setNatureBackground('random');
  setActiveGroupBtn('random');
  currentGroup = 'random';
});
</script> 
=======
</script> 
</body>
</html> 
>>>>>>> d9edde2bf9ec4a8cd666404e256a939608e51d95
