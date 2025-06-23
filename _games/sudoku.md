---
layout: game
title: Sudoku
icon: 522
permalink: /sudoku/
description: "Fill the grid so every row, column, and box contains 1-9."
---

<div class="main-content" data-page-script="sudoku-game">
  <div class="glass-panel" style="padding: 2rem; height: 100%; display: flex; flex-direction: column; align-items: center;">
    <header class="page-header" style="text-align: center; margin-bottom: 1rem;">
      <h1>522 Sudoku</h1>
      <p>Fill the grid so every row, column, and box contains 1-9.</p>
    </header>
    <div id="sudoku-container"></div>
    <button class="glass-button" style="margin-top:1.5rem;" onclick="window.location.reload()">Reload Game</button>
  </div>
</div>
<script src="/assets/js/sudoku-game.js"></script> 