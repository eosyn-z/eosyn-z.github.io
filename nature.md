---
layout: page
title: Nature
permalink: /nature/
---

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
  document.querySelectorAll('.glass-button[data-theme]').forEach(btn => btn.classList.remove('primary'));
  document.querySelector(`.glass-button[data-theme="${theme}"]`).classList.add('primary');
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
    document.getElementById('cookieConsent').style.display = 'block';
  }
}
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
  loadTheme();
  document.querySelectorAll('.glass-button[data-theme]').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });
  document.querySelectorAll('.glass-button[data-group]').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      const group = this.getAttribute('data-group');
      currentGroup = group;
      setActiveGroupBtn(group);
      setNatureBackground(group);
    });
  });
});
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