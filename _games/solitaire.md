---
layout: game
title: Solitaire
icon: 🃏
permalink: /solitaire/
description: "Classic Klondike Solitaire. Stack cards in order!"
---

<div class="main-content" data-page-script="solitaire-game">
  <div class="glass-panel" style="padding: 2rem; height: 100%; display: flex; flex-direction: column; align-items: center;">
    <header class="page-header" style="text-align: center; margin-bottom: 1rem;">
      <h1>🃏 Solitaire</h1>
      <p>Stack cards in order by suit. Try to clear the board!</p>
    </header>
    <div id="solitaire-container"></div>
    <button class="glass-button" style="margin-top:1.5rem;" onclick="window.location.reload()">Reload Game</button>
  </div>
</div>
<script src="/assets/js/solitaire-game.js"></script> 