---
layout: game
title: Minesweeper
icon: 4a3
permalink: /minesweeper/
description: "Find all the mines without detonating any!"
---

<div class="main-content" data-page-script="minesweeper-game">
  <div class="glass-panel" style="padding: 2rem; height: 100%; display: flex; flex-direction: column; align-items: center;">
    <header class="page-header" style="text-align: center; margin-bottom: 1rem;">
      <h1>4a3 Minesweeper</h1>
      <p>Click to reveal tiles, right-click to flag mines. Clear the board without hitting a mine!</p>
    </header>
    <div id="minesweeper-container"></div>
    <button class="glass-button" style="margin-top:1.5rem;" onclick="window.location.reload()">Reload Game</button>
  </div>
</div>
<script src="/assets/js/minesweeper-game.js"></script> 