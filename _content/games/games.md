---
layout: games-launcher
title: Game Center
permalink: /games/
icon: 🎮
---

<div class="main-content" data-page-script="games">
  <div class="glass-panel" style="padding: 2rem; height: 100%;">
    
    <header class="page-header" style="text-align: center; margin-bottom: 2rem;">
      <h1>🎮 Game Center</h1>
      <p>Click any game to launch it in a new window. You can have multiple instances of each game running!</p>
    </header>

    <div class="games-grid">
      <div class="game-card" data-game="snake">
        <div class="game-icon">🐍</div>
        <h3>Snake</h3>
        <p>Classic snake game - eat food and grow longer!</p>
        <div class="game-controls">
          <span class="control-hint">Arrow keys to move</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('snake', 'Snake')">Play Snake</button>
      </div>

      <div class="game-card" data-game="tetris">
        <div class="game-icon">🧩</div>
        <h3>Tetris</h3>
        <p>Arrange falling blocks to clear lines!</p>
        <div class="game-controls">
          <span class="control-hint">Arrow keys to move/rotate</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('tetris', 'Tetris')">Play Tetris</button>
      </div>

      <div class="game-card" data-game="pong">
        <div class="game-icon">🏓</div>
        <h3>Pong</h3>
        <p>Classic paddle game - don't let the ball pass!</p>
        <div class="game-controls">
          <span class="control-hint">W/S keys for left paddle, Up/Down for right</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('pong', 'Pong')">Play Pong</button>
      </div>

      <div class="game-card" data-game="breakout">
        <div class="game-icon">🧱</div>
        <h3>Breakout</h3>
        <p>Break all the blocks with your paddle!</p>
        <div class="game-controls">
          <span class="control-hint">Arrow keys to move paddle</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('breakout', 'Breakout')">Play Breakout</button>
      </div>

      <div class="game-card" data-game="2048">
        <div class="game-icon">🔢</div>
        <h3>2048</h3>
        <p>Slide tiles to reach 2048!</p>
        <div class="game-controls">
          <span class="control-hint">Arrow keys to slide tiles</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('2048', '2048')">Play 2048</button>
      </div>

      <div class="game-card" data-game="flappy">
        <div class="game-icon">🐦</div>
        <h3>Flappy Bird</h3>
        <p>Navigate through pipes!</p>
        <div class="game-controls">
          <span class="control-hint">Space to flap</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('flappy', 'Flappy Bird')">Play Flappy Bird</button>
      </div>

      <div class="game-card" data-game="minecraft">
        <div class="game-icon">🎮</div>
        <h3>Minecraft</h3>
        <p>Build and explore your own world!</p>
        <div class="game-controls">
          <span class="control-hint">WASD to move, Mouse to look, Click to place/break</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('minecraft', 'Minecraft')">Play Minecraft</button>
      </div>
    </div>

    <div class="game-info" style="margin-top: 2rem; text-align: center;">
      <p style="color: var(--theme-text-secondary);">
        All games are MIT-licensed and open source. You can have up to 50 windows open at once!
      </p>
    </div>

  </div>
</div>

<!-- Modal for Site Mode Game Launch -->
<div id="game-modal" class="game-modal-overlay" style="display: none;">
  <div class="game-modal-content glass-panel">
    <div class="game-modal-header">
      <h3 id="game-modal-title"></h3>
      <button id="game-modal-close" class="close-btn">&times;</button>
    </div>
    <iframe id="game-modal-iframe" src="about:blank" frameborder="0"></iframe>
  </div>
</div>

<script>
function launchGame(gameId, gameTitle) {
  // Check if we are in the desktop view
  if (window.desktopManager && document.body.classList.contains('desktop-view-active')) {
    // Desktop mode: Launch in a window
    const url = `${window.siteBaseUrl || ''}/games/${gameId}/`;
    window.desktopManager.createWindow(gameId, gameTitle, url, 'fas fa-gamepad');
  } else {
    // Site mode: Launch in a modal
    const modal = document.getElementById('game-modal');
    const iframe = document.getElementById('game-modal-iframe');
    const title = document.getElementById('game-modal-title');
    
    title.textContent = gameTitle;
    iframe.src = `${window.siteBaseUrl || ''}/games/${gameId}/`;
    modal.style.display = 'flex';
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('game-modal');
  const closeModalBtn = document.getElementById('game-modal-close');

  if (closeModalBtn) {
    closeModalBtn.addEventListener('click', () => {
      modal.style.display = 'none';
      document.getElementById('game-modal-iframe').src = 'about:blank'; // Stop game
    });
  }
  // Add hover effects to game cards
  const gameCards = document.querySelectorAll('.game-card');
  gameCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-8px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
    });
  });
  
  // Add click feedback to buttons
  const playButtons = document.querySelectorAll('.play-btn');
  playButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    });
  });
});
</script> 