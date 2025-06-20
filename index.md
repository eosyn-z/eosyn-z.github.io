---
layout: default
title: eosyn
---

<div class="main-content">

  <div class="glass-container container">
    <h1 class="glass-card" style="text-align: center; font-size: 2.5em; font-weight: 700; background: none; color: var(--theme-primary);
    ">
    hi, i'm eosyn
    </h1>
    <div class="glass-card starfield-container" style="text-align: center; margin: 30px 0; padding: 20px;">
      <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="starfield-image" data-image="stars" style="width: 250px; height: 250px; border-radius: 50%; border: 4px solid var(--theme-accent); object-fit: cover; display: inline-block; box-shadow: var(--glass-shadow-medium);">
      <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="starfield-image" data-image="clouds1" style="width: 250px; height: 250px; border-radius: 50%; border: 4px solid var(--theme-accent); object-fit: cover; display: inline-block; box-shadow: var(--glass-shadow-medium);">
      <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="starfield-image" data-image="clouds2" style="width: 250px; height: 250px; border-radius: 50%; border: 4px solid var(--theme-accent); object-fit: cover; display: inline-block; box-shadow: var(--glass-shadow-medium);">
      <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="starfield-image" data-image="clouds4" style="width: 250px; height: 250px; border-radius: 50%; border: 4px solid var(--theme-accent); object-fit: cover; display: inline-block; box-shadow: var(--glass-shadow-medium);">
    </div>
    <p class="glass-card" style="text-align: center; font-size: 1.2em; color: var(--theme-text-secondary); line-height: 1.6; background: none;">
    this site is under construction.<br>if you know about this already, you're probably one of my friends.<br>thank you for checking it out so early! 
    <3</p>
  </div>
</div>

<footer class="site-footer glass-nav">
  <div class="social-links">
    <a href="https://github.com/{{ site.github_username }}" class="glass-button">GitHub</a>
    <a href="https://discord.com/users/{{ site.discord_username }}" class="glass-button">Discord</a>
    <a href="https://twitter.com/{{ site.twitter_username }}" class="glass-button">Twitter</a>
  </div>
</footer>

<!-- Cookie Consent -->
<div class="cookie-consent glass-card" id="cookieConsent">
  <h3 style="margin: 0 0 10px 0; color: var(--theme-text); font-size: 16px;">🍪 Cookie Notice</h3>
  <p style="margin: 0 0 15px 0; color: var(--theme-text-secondary); font-size: 14px; line-height: 1.5;">This website uses cookies to save your theme preference and improve your experience. We only store your theme choice and don't track any personal information.</p>
  <div class="cookie-buttons">
    <button class="glass-button cookie-btn reject" onclick="rejectCookies()">Reject</button>
    <button class="glass-button cookie-btn accept" onclick="acceptCookies()">Accept</button>
  </div>
      <a href="{{ "/feed.xml" | relative_url }}" class="glass-button">RSS</a>
</div>
