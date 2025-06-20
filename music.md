---
layout: page
title: Music
permalink: /music/
---

<link rel="stylesheet" href="/assets/css/themes.css">

<div class="glass-container" style="padding: 40px; max-width: 1200px; margin: 0 auto;">
  <header style="text-align: center; margin-bottom: 3rem;">
    <h1 style="font-size: 2.5rem; margin-bottom: 0.5rem; color: var(--theme-primary); font-weight: 700;">Music Playlists</h1>
    <p style="font-size: 1.1rem; color: var(--theme-text-secondary); margin: 0;">Curated playlists for different moods and genres.</p>
  </header>

  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem; margin-bottom: 3rem;" id="playlist-buttons">
    <button class="glass-button" data-playlist="spotify:playlist:37i9dQZF1DXcBWIGoYBM5M" style="flex-direction: column; gap: 0.5rem; text-align: left;">
      <span style="font-size: 1.2rem; font-weight: 600; display: block;">Today's Top Hits</span>
      <span style="font-size: 0.9rem; opacity: 0.8; display: block;">The most popular songs right now.</span>
    </button>
    <button class="glass-button" data-playlist="spotify:playlist:37i9dQZF1DX0XUfTFmNBRM" style="flex-direction: column; gap: 0.5rem; text-align: left;">
      <span style="font-size: 1.2rem; font-weight: 600; display: block;">RapCaviar</span>
      <span style="font-size: 0.9rem; opacity: 0.8; display: block;">The hottest rap tracks.</span>
    </button>
    <button class="glass-button" data-playlist="spotify:playlist:37i9dQZF1DWY4xNBQviFRD" style="flex-direction: column; gap: 0.5rem; text-align: left;">
      <span style="font-size: 1.2rem; font-weight: 600; display: block;">Rock Classics</span>
      <span style="font-size: 0.9rem; opacity: 0.8; display: block;">Iconic rock anthems.</span>
    </button>
    <button class="glass-button" data-playlist="spotify:playlist:37i9dQZF1DX4sWSpwq3LiO" style="flex-direction: column; gap: 0.5rem; text-align: left;">
      <span style="font-size: 1.2rem; font-weight: 600; display: block;">Chill Hits</span>
      <span style="font-size: 0.9rem; opacity: 0.8; display: block;">Relax and unwind with these chill tracks.</span>
    </button>
  </div>

  <div class="glass-panel" style="min-height: 400px; overflow: hidden;">
    <div class="spotify-player active" id="spotify-player-1">
      <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DXcBWIGoYBM5M" allow="encrypted-media" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
    <div class="spotify-player" id="spotify-player-2" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: all 0.4s ease;">
      <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUfTFmNBRM" allow="encrypted-media" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
    <div class="spotify-player" id="spotify-player-3" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: all 0.4s ease;">
      <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DWY4xNBQviFRD" allow="encrypted-media" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
    <div class="spotify-player" id="spotify-player-4" style="position: absolute; top: 0; left: 0; width: 100%; height: 100%; opacity: 0; visibility: hidden; transition: all 0.4s ease;">
      <iframe src="https://open.spotify.com/embed/playlist/37i9dQZF1DX4sWSpwq3LiO" allow="encrypted-media" style="width: 100%; height: 100%; border: none;"></iframe>
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.glass-button');
  const players = document.querySelectorAll('.spotify-player');

  buttons.forEach((button, index) => {
    button.addEventListener('click', () => {
      // Deactivate all buttons and players
      buttons.forEach(btn => btn.classList.remove('primary'));
      players.forEach(player => {
        player.style.opacity = 0;
        player.style.visibility = 'hidden';
      });

      // Activate clicked button and corresponding player
      button.classList.add('primary');
      players[index].style.opacity = 1;
      players[index].style.visibility = 'visible';
    });
  });

  // Set the first button as active by default
  buttons[0].classList.add('primary');
});
</script> 