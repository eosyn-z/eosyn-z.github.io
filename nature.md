---
layout: null
title: Nature
permalink: /nature/
---

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

    /* Theme Switcher */
    .theme-switcher {
      position: fixed;
      top: 20px;
      right: 20px;
      background: var(--glass-bg);
      border-radius: 15px;
      padding: 15px;
      box-shadow: 0 10px 30px var(--shadow-medium);
      border: 2px solid var(--glass-border);
      z-index: 1000;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }

    .theme-switcher::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
      transition: left 0.8s;
    }

    .theme-switcher:hover::before {
      left: 100%;
    }

    .theme-switcher h3 {
      margin: 0 0 10px 0;
      color: var(--text-accent);
      font-size: 14px;
      text-align: center;
      font-weight: 600;
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
      overflow: hidden;
      backdrop-filter: blur(10px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .theme-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .theme-btn:hover::before {
      left: 100%;
    }

    .theme-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      border-color: var(--text-accent);
    }

    .theme-btn.active {
      border-color: var(--text-accent);
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
    }

    .theme-btn.active::before {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
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

    @media (max-width: 768px) {
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

    .group-switcher {
      position: absolute;
      top: 80px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1002;
      display: flex;
      gap: 12px;
      background: var(--glass-bg);
      border-radius: 15px;
      padding: 12px 20px;
      box-shadow: 0 8px 24px var(--shadow-medium);
      border: 2px solid var(--glass-border);
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
    }

    .group-switcher::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.05), transparent);
      transition: left 0.8s;
    }

    .group-switcher:hover::before {
      left: 100%;
    }

    .group-btn {
      background: var(--glass-bg);
      color: var(--text-accent);
      border: 2px solid var(--glass-border);
      border-radius: 20px;
      padding: 10px 18px;
      font-size: 15px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      outline: none;
      backdrop-filter: blur(10px);
      position: relative;
      overflow: hidden;
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .group-btn::before {
      content: '';
      position: absolute;
      top: 0;
      left: -100%;
      width: 100%;
      height: 100%;
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
      transition: left 0.5s;
    }

    .group-btn:hover::before {
      left: 100%;
    }

    .group-btn.active, .group-btn:focus {
      background: var(--glass-bg);
      color: var(--text-primary);
      border-color: var(--text-accent);
      box-shadow: 0 4px 16px var(--shadow-medium);
      font-weight: 600;
    }

    .group-btn.active::before {
      background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    }

    .group-btn:hover {
      background: var(--glass-bg);
      color: var(--text-primary);
      border-color: var(--text-accent);
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }

    @media (max-width: 768px) {
      .group-switcher {
        top: 65px;
        padding: 8px 6px;
        gap: 6px;
      }
      .group-btn {
        padding: 7px 10px;
        font-size: 13px;
      }
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
  document.querySelectorAll('.theme-btn').forEach(btn => btn.classList.remove('active'));
  document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
  if (getCookie('cookiesAccepted') === 'true') {
    setCookie('theme', theme, 365);
  }
}
function loadTheme() {
  const savedTheme = getCookie('theme');
  if (savedTheme) setTheme(savedTheme);
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
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'default';
  setCookie('theme', currentTheme, 365);
}
function rejectCookies() {
  setCookie('cookiesRejected', 'true', 365);
  document.getElementById('cookieConsent').classList.remove('show');
  deleteCookie('theme');
}
// Nature background logic
function getRandomGifFromGroup(group) {
  const arr = natureGroups[group] || natureGroups['random'];
  if (!arr.length) return '';
  const idx = Math.floor(Math.random() * arr.length);
  return arr[idx];
}
function setNatureBackground(group) {
  const gif = getRandomGifFromGroup(group);
  document.body.style.backgroundImage = gif ? `url('${gif}')` : '';
}
function setActiveGroupBtn(group) {
  document.querySelectorAll('.group-btn').forEach(btn => {
    if (btn.getAttribute('data-group') === group) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}
window.addEventListener('load', function() {
  setNatureBackground(currentGroup);
  setTimeout(() => {
    const loadingElement = document.querySelector('.loading');
    if (loadingElement) loadingElement.style.display = 'none';
  }, 1000);
});
document.addEventListener('DOMContentLoaded', function() {
  showCookieConsent();
  loadTheme();
  
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });
  document.querySelectorAll('.group-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const group = this.getAttribute('data-group');
      currentGroup = group;
      setActiveGroupBtn(group);
      setNatureBackground(group);
    });
  });
});
</script> 
</body>
</html> 