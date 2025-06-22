---
layout: game
title: Snake
icon: 🐍
permalink: /snake/
---

<div class="main-content" data-page-script="snake-game">
  <div class="glass-panel" style="padding: 2rem; height: 100%; display: flex; flex-direction: column; align-items: center;">
    
    <header class="page-header" style="text-align: center; margin-bottom: 1rem;">
      <h1>🐍 Snake</h1>
      <p>Eat the food to grow longer!</p>
    </header>

    <div class="game-window">
      <canvas id="snakeCanvas" class="game-canvas" width="400" height="400"></canvas>
      
      <div class="game-controls-panel">
        <div class="game-score">Score: <span id="snakeScore">0</span></div>
        <div class="game-instructions">Use arrow keys to move the snake</div>
        <div class="game-buttons">
          <button class="glass-button" onclick="snakeGame.restart()">Restart</button>
          <button class="glass-button" onclick="snakeGame.pause()">Pause</button>
        </div>
      </div>
    </div>

  </div>
</div> 