---
layout: default
title: Pong
permalink: /pong/
---

<div class="main-content" data-page-script="pong-game">
  <div class="glass-panel" style="padding: 2rem; height: 100%; display: flex; flex-direction: column; align-items: center;">
    
    <header class="page-header" style="text-align: center; margin-bottom: 1rem;">
      <h1>🏓 Pong</h1>
      <p>Classic paddle game. Don't let the ball pass!</p>
    </header>

    <div class="game-window">
      <canvas id="pongCanvas" class="game-canvas" width="600" height="400"></canvas>
      
      <div class="game-controls-panel">
        <div class="game-score">Left: <span id="leftScore">0</span> | Right: <span id="rightScore">0</span></div>
        <div class="game-instructions">W/S keys for left paddle, Arrow Up/Down for right paddle</div>
        <div class="game-buttons">
          <button class="glass-button" onclick="pongGame.restart()">Restart</button>
          <button class="glass-button" onclick="pongGame.pause()">Pause</button>
        </div>
      </div>
    </div>

  </div>
</div> 