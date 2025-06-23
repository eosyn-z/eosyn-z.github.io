class TetrisGame {
  constructor() {
    this.canvas = document.getElementById('tetrisCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.scoreElement = document.getElementById('tetrisScore');
    this.linesElement = document.getElementById('tetrisLines');
    
    this.blockSize = 30;
    this.cols = this.canvas.width / this.blockSize;
    this.rows = this.canvas.height / this.blockSize;
    
    this.board = this.createBoard();
    this.currentPiece = null;
    this.score = 0;
    this.lines = 0;
    this.gameRunning = false;
    this.paused = false;
    
    this.pieces = [
      // I piece
      [[1, 1, 1, 1]],
      // O piece
      [[1, 1], [1, 1]],
      // T piece
      [[0, 1, 0], [1, 1, 1]],
      // S piece
      [[0, 1, 1], [1, 1, 0]],
      // Z piece
      [[1, 1, 0], [0, 1, 1]],
      // J piece
      [[1, 0, 0], [1, 1, 1]],
      // L piece
      [[0, 0, 1], [1, 1, 1]]
    ];
    
    this.colors = [
      'var(--theme-accent)',
      'var(--theme-secondary)',
      'var(--theme-primary)',
      'var(--theme-accent-dark)',
      'var(--theme-primary-shadow)',
      'var(--theme-secondary-shadow)',
      'var(--theme-accent-light)'
    ];
    
    this.bindControls();
    this.start();
  }
  
  createBoard() {
    const board = [];
    for (let row = 0; row < this.rows; row++) {
      board[row] = [];
      for (let col = 0; col < this.cols; col++) {
        board[row][col] = 0;
      }
    }
    return board;
  }
  
  bindControls() {
    document.addEventListener('keydown', (e) => {
      if (!this.gameRunning || this.paused) return;
      
      switch(e.key) {
        case 'ArrowLeft':
          this.movePiece(-1, 0);
          break;
        case 'ArrowRight':
          this.movePiece(1, 0);
          break;
        case 'ArrowDown':
          this.movePiece(0, 1);
          break;
        case ' ':
          e.preventDefault();
          this.rotatePiece();
          break;
      }
    });
  }
  
  createPiece() {
    const pieceIndex = Math.floor(Math.random() * this.pieces.length);
    const piece = this.pieces[pieceIndex];
    return {
      shape: piece,
      color: this.colors[pieceIndex],
      x: Math.floor(this.cols / 2) - Math.floor(piece[0].length / 2),
      y: 0
    };
  }
  
  isValidMove(piece, dx = 0, dy = 0) {
    for (let row = 0; row < piece.shape.length; row++) {
      for (let col = 0; col < piece.shape[row].length; col++) {
        if (piece.shape[row][col]) {
          const newX = piece.x + col + dx;
          const newY = piece.y + row + dy;
          
          if (newX < 0 || newX >= this.cols || newY >= this.rows) {
            return false;
          }
          
          if (newY >= 0 && this.board[newY][newX]) {
            return false;
          }
        }
      }
    }
    return true;
  }
  
  movePiece(dx, dy) {
    if (this.isValidMove(this.currentPiece, dx, dy)) {
      this.currentPiece.x += dx;
      this.currentPiece.y += dy;
      return true;
    }
    return false;
  }
  
  rotatePiece() {
    const rotated = this.rotateMatrix(this.currentPiece.shape);
    const originalShape = this.currentPiece.shape;
    this.currentPiece.shape = rotated;
    
    if (!this.isValidMove(this.currentPiece)) {
      this.currentPiece.shape = originalShape;
    }
  }
  
  rotateMatrix(matrix) {
    const rows = matrix.length;
    const cols = matrix[0].length;
    const rotated = [];
    
    for (let col = 0; col < cols; col++) {
      rotated[col] = [];
      for (let row = rows - 1; row >= 0; row--) {
        rotated[col][rows - 1 - row] = matrix[row][col];
      }
    }
    
    return rotated;
  }
  
  placePiece() {
    for (let row = 0; row < this.currentPiece.shape.length; row++) {
      for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
        if (this.currentPiece.shape[row][col]) {
          const boardY = this.currentPiece.y + row;
          const boardX = this.currentPiece.x + col;
          if (boardY >= 0) {
            this.board[boardY][boardX] = this.currentPiece.color;
          }
        }
      }
    }
    
    this.clearLines();
    this.currentPiece = this.createPiece();
    
    if (!this.isValidMove(this.currentPiece)) {
      this.gameOver();
    }
  }
  
  clearLines() {
    let linesCleared = 0;
    
    for (let row = this.rows - 1; row >= 0; row--) {
      if (this.board[row].every(cell => cell !== 0)) {
        this.board.splice(row, 1);
        this.board.unshift(new Array(this.cols).fill(0));
        linesCleared++;
        row++; // Check the same row again
      }
    }
    
    if (linesCleared > 0) {
      this.lines += linesCleared;
      this.score += linesCleared * 100 * linesCleared; // Bonus for multiple lines
      this.scoreElement.textContent = this.score;
      this.linesElement.textContent = this.lines;
    }
  }
  
  update() {
    if (!this.gameRunning || this.paused) return;
    
    if (!this.movePiece(0, 1)) {
      this.placePiece();
    }
  }
  
  draw() {
    // Clear the canvas
    this.ctx.fillStyle = 'var(--bg-primary)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw board
    for (let row = 0; row < this.rows; row++) {
      for (let col = 0; col < this.cols; col++) {
        if (this.board[row][col]) {
          this.drawBlock(col, row, this.board[row][col]);
        }
      }
    }
    
    // Draw current piece
    if (this.currentPiece) {
      for (let row = 0; row < this.currentPiece.shape.length; row++) {
        for (let col = 0; col < this.currentPiece.shape[row].length; col++) {
          if (this.currentPiece.shape[row][col]) {
            this.drawBlock(
              this.currentPiece.x + col,
              this.currentPiece.y + row,
              this.currentPiece.color
            );
          }
        }
      }
    }
    
    // Draw grid
    this.ctx.strokeStyle = 'var(--theme-text-secondary)';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= this.cols; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.blockSize, 0);
      this.ctx.lineTo(i * this.blockSize, this.canvas.height);
      this.ctx.stroke();
    }
    for (let i = 0; i <= this.rows; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.blockSize);
      this.ctx.lineTo(this.canvas.width, i * this.blockSize);
      this.ctx.stroke();
    }
  }
  
  drawBlock(x, y, color) {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize - 1, this.blockSize - 1);
    
    // Add highlight
    this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
    this.ctx.fillRect(x * this.blockSize, y * this.blockSize, this.blockSize - 1, 2);
    this.ctx.fillRect(x * this.blockSize, y * this.blockSize, 2, this.blockSize - 1);
  }
  
  gameLoop() {
    this.update();
    this.draw();
    
    if (this.gameRunning) {
      setTimeout(() => requestAnimationFrame(() => this.gameLoop()), 500);
    }
  }
  
  start() {
    this.gameRunning = true;
    this.paused = false;
    this.currentPiece = this.createPiece();
    this.gameLoop();
  }
  
  pause() {
    this.paused = !this.paused;
    if (!this.paused) {
      this.gameLoop();
    }
  }
  
  restart() {
    this.board = this.createBoard();
    this.currentPiece = null;
    this.score = 0;
    this.lines = 0;
    this.scoreElement.textContent = this.score;
    this.linesElement.textContent = this.lines;
    this.gameRunning = true;
    this.paused = false;
    this.currentPiece = this.createPiece();
    this.gameLoop();
  }
  
  gameOver() {
    this.gameRunning = false;
    
    // Game over overlay
    this.ctx.fillStyle = 'var(--glass-bg-dark)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = 'var(--theme-text)';
    this.ctx.font = '24px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 20);
    this.ctx.font = '16px Arial';
    this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
    this.ctx.fillText(`Lines Cleared: ${this.lines}`, this.canvas.width / 2, this.canvas.height / 2 + 50);
    this.ctx.fillText('Press Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 80);
  }
}

// Global tetris game instance
let tetrisGame = null;

function initializeTetrisGame() {
    // Check if already initialized
    if (tetrisGame) {
        return;
    }
    
    const canvas = document.getElementById('tetrisCanvas');
    if (!canvas) {
        console.log('Tetris canvas not found, waiting for DOM...');
        return;
    }
    
    tetrisGame = new TetrisGame();
    console.log('Tetris game initialized successfully');
}

// Automatically instantiate the game when the script is loaded
document.addEventListener('DOMContentLoaded', initializeTetrisGame);

// Also initialize when window content is loaded
document.addEventListener('windowContentLoaded', initializeTetrisGame); 