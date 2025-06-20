---
layout: default
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
        <button class="glass-button play-btn" onclick="launchGame('snake')">Play Snake</button>
      </div>

      <div class="game-card" data-game="tetris">
        <div class="game-icon">🧩</div>
        <h3>Tetris</h3>
        <p>Arrange falling blocks to clear lines!</p>
        <div class="game-controls">
          <span class="control-hint">Arrow keys to move/rotate</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('tetris')">Play Tetris</button>
      </div>

      <div class="game-card" data-game="pong">
        <div class="game-icon">🏓</div>
        <h3>Pong</h3>
        <p>Classic paddle game - don't let the ball pass!</p>
        <div class="game-controls">
          <span class="control-hint">W/S keys for left paddle, Up/Down for right</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('pong')">Play Pong</button>
      </div>

      <div class="game-card" data-game="breakout">
        <div class="game-icon">🧱</div>
        <h3>Breakout</h3>
        <p>Break all the blocks with your paddle!</p>
        <div class="game-controls">
          <span class="control-hint">Arrow keys to move paddle</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('breakout')">Play Breakout</button>
      </div>

      <div class="game-card" data-game="2048">
        <div class="game-icon">🔢</div>
        <h3>2048</h3>
        <p>Slide tiles to reach 2048!</p>
        <div class="game-controls">
          <span class="control-hint">Arrow keys to slide tiles</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('2048')">Play 2048</button>
      </div>

      <div class="game-card" data-game="flappy">
        <div class="game-icon">🐦</div>
        <h3>Flappy Bird</h3>
        <p>Navigate through pipes!</p>
        <div class="game-controls">
          <span class="control-hint">Space to flap</span>
        </div>
        <button class="glass-button play-btn" onclick="launchGame('flappy')">Play Flappy Bird</button>
      </div>
    </div>

    <div class="game-info" style="margin-top: 2rem; text-align: center;">
      <p style="color: var(--theme-text-secondary);">
        All games are MIT-licensed and open source. You can have up to 50 windows open at once!
      </p>
    </div>

  </div>
</div>

<script>
function launchGame(gameName) {
  // Launch the specific game in a new window using the enhanced window manager
  if (windowManager) {
    windowManager.createGameWindow(gameName);
  }
}

// Add some interactive features
document.addEventListener('DOMContentLoaded', () => {
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