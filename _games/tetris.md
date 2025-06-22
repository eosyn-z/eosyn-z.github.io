---
layout: game
title: Tetris
icon: 🧩
permalink: /tetris/
description: Arrange falling blocks to clear lines! Use arrow keys to move and rotate pieces.
---

<div class="main-content" data-page-script="tetris-game">
  <div class="glass-panel" style="padding: 2rem; height: 100%; display: flex; flex-direction: column; align-items: center;">
    
    <header class="page-header" style="text-align: center; margin-bottom: 1rem;">
      <h1>🧩 Tetris</h1>
      <p>Arrange falling blocks to clear lines!</p>
    </header>

    <div class="game-window">
      <canvas id="tetrisCanvas" class="game-canvas" width="300" height="600"></canvas>
      
      <div class="game-controls-panel">
        <div class="game-score">Score: <span id="tetrisScore">0</span></div>
        <div class="game-score">Lines: <span id="tetrisLines">0</span></div>
        <div class="game-instructions">Arrow keys to move, Space to rotate</div>
        <div class="game-buttons">
          <button class="glass-button" onclick="tetrisGame.restart()">Restart</button>
          <button class="glass-button" onclick="tetrisGame.pause()">Pause</button>
        </div>
      </div>
    </div>

  </div>
</div> 