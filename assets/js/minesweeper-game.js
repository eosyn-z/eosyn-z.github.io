// Minimal Minesweeper implementation
// Themed with CSS variables
(function() {
  const container = document.getElementById('minesweeper-container');
  if (!container) return;
  const rows = 9, cols = 9, mines = 10;
  let board = [], revealed = [], flagged = [], gameOver = false;

  function createBoard() {
    board = Array.from({length: rows}, () => Array(cols).fill(0));
    revealed = Array.from({length: rows}, () => Array(cols).fill(false));
    flagged = Array.from({length: rows}, () => Array(cols).fill(false));
    // Place mines
    let placed = 0;
    while (placed < mines) {
      let r = Math.floor(Math.random() * rows);
      let c = Math.floor(Math.random() * cols);
      if (board[r][c] === 'M') continue;
      board[r][c] = 'M';
      placed++;
    }
    // Fill numbers
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (board[r][c] === 'M') continue;
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            if (dr === 0 && dc === 0) continue;
            let nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < rows && nc >= 0 && nc < cols && board[nr][nc] === 'M') count++;
          }
        }
        board[r][c] = count;
      }
    }
  }

  function renderBoard() {
    container.innerHTML = '';
    const table = document.createElement('table');
    table.className = 'minesweeper-board';
    for (let r = 0; r < rows; r++) {
      const tr = document.createElement('tr');
      for (let c = 0; c < cols; c++) {
        const td = document.createElement('td');
        td.className = 'ms-cell';
        td.style.background = revealed[r][c] ? 'var(--glass-bg-light)' : 'var(--glass-bg-heavy)';
        td.style.color = 'var(--theme-text)';
        td.style.border = '1px solid var(--glass-border-light)';
        td.style.width = td.style.height = '32px';
        td.style.textAlign = 'center';
        td.style.fontWeight = 'bold';
        td.style.fontSize = '1.1rem';
        td.style.cursor = 'pointer';
        if (flagged[r][c]) {
          td.textContent = '🚩';
        } else if (revealed[r][c]) {
          if (board[r][c] === 'M') {
            td.textContent = '💣';
            td.style.background = 'var(--theme-error, #ef4444)';
          } else if (board[r][c] > 0) {
            td.textContent = board[r][c];
          }
        }
        td.oncontextmenu = (e) => { e.preventDefault(); if (!gameOver) toggleFlag(r, c); };
        td.onclick = () => { if (!gameOver) reveal(r, c); };
        tr.appendChild(td);
      }
      table.appendChild(tr);
    }
    container.appendChild(table);
  }

  function reveal(r, c) {
    if (revealed[r][c] || flagged[r][c]) return;
    revealed[r][c] = true;
    if (board[r][c] === 'M') {
      gameOver = true;
      revealAll();
      setTimeout(() => alert('Game Over!'), 100);
      return;
    }
    if (board[r][c] === 0) {
      for (let dr = -1; dr <= 1; dr++) {
        for (let dc = -1; dc <= 1; dc++) {
          let nr = r + dr, nc = c + dc;
          if (nr >= 0 && nr < rows && nc >= 0 && nc < cols) reveal(nr, nc);
        }
      }
    }
    renderBoard();
  }

  function toggleFlag(r, c) {
    if (revealed[r][c]) return;
    flagged[r][c] = !flagged[r][c];
    renderBoard();
  }

  function revealAll() {
    for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) revealed[r][c] = true;
    renderBoard();
  }

  function reset() {
    gameOver = false;
    createBoard();
    renderBoard();
  }

  // Add a reset button
  const resetBtn = document.createElement('button');
  resetBtn.textContent = 'Restart';
  resetBtn.className = 'glass-button';
  resetBtn.onclick = reset;
  container.appendChild(resetBtn);

  createBoard();
  renderBoard();
})(); 