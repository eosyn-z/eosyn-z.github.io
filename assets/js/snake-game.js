class SnakeGame {
  constructor() {
    this.canvas = document.getElementById('snakeCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.scoreElement = document.getElementById('snakeScore');
    
    this.gridSize = 20;
    this.tileCount = this.canvas.width / this.gridSize;
    
    this.snake = [{x: 10, y: 10}];
    this.food = this.generateFood();
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.gameRunning = false;
    this.paused = false;
    
    this.bindControls();
    this.start();
  }
  
  bindControls() {
    document.addEventListener('keydown', (e) => {
      if (!this.gameRunning) return;
      
      switch(e.key) {
        case 'ArrowUp':
          if (this.dy !== 1) { // Prevent moving down when going up
            this.dx = 0;
            this.dy = -1;
          }
          break;
        case 'ArrowDown':
          if (this.dy !== -1) { // Prevent moving up when going down
            this.dx = 0;
            this.dy = 1;
          }
          break;
        case 'ArrowLeft':
          if (this.dx !== 1) { // Prevent moving right when going left
            this.dx = -1;
            this.dy = 0;
          }
          break;
        case 'ArrowRight':
          if (this.dx !== -1) { // Prevent moving left when going right
            this.dx = 1;
            this.dy = 0;
          }
          break;
        case ' ':
          e.preventDefault();
          this.pause();
          break;
      }
    });
  }
  
  generateFood() {
    let food;
    do {
      food = {
        x: Math.floor(Math.random() * this.tileCount),
        y: Math.floor(Math.random() * this.tileCount)
      };
    } while (this.snake.some(segment => segment.x === food.x && segment.y === food.y));
    
    return food;
  }
  
  update() {
    if (!this.gameRunning || this.paused) return;
    
    // Move snake
    const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};
    
    // Check wall collision
    if (head.x < 0 || head.x >= this.tileCount || head.y < 0 || head.y >= this.tileCount) {
      this.gameOver();
      return;
    }
    
    // Check self collision
    if (this.snake.some(segment => segment.x === head.x && segment.y === head.y)) {
      this.gameOver();
      return;
    }
    
    this.snake.unshift(head);
    
    // Check food collision
    if (head.x === this.food.x && head.y === this.food.y) {
      this.score += 10;
      this.scoreElement.textContent = this.score;
      this.food = this.generateFood();
    } else {
      this.snake.pop();
    }
  }
  
  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw snake
    this.ctx.fillStyle = '#00ff00';
    this.snake.forEach((segment, index) => {
      if (index === 0) {
        // Draw head with different color
        this.ctx.fillStyle = '#00cc00';
      } else {
        this.ctx.fillStyle = '#00ff00';
      }
      this.ctx.fillRect(segment.x * this.gridSize, segment.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    });
    
    // Draw food
    this.ctx.fillStyle = '#ff0000';
    this.ctx.fillRect(this.food.x * this.gridSize, this.food.y * this.gridSize, this.gridSize - 2, this.gridSize - 2);
    
    // Draw grid (optional)
    this.ctx.strokeStyle = '#333';
    this.ctx.lineWidth = 1;
    for (let i = 0; i <= this.tileCount; i++) {
      this.ctx.beginPath();
      this.ctx.moveTo(i * this.gridSize, 0);
      this.ctx.lineTo(i * this.gridSize, this.canvas.height);
      this.ctx.stroke();
      
      this.ctx.beginPath();
      this.ctx.moveTo(0, i * this.gridSize);
      this.ctx.lineTo(this.canvas.width, i * this.gridSize);
      this.ctx.stroke();
    }
  }
  
  gameLoop() {
    this.update();
    this.draw();
    
    if (this.gameRunning) {
      setTimeout(() => requestAnimationFrame(() => this.gameLoop()), 150);
    }
  }
  
  start() {
    this.gameRunning = true;
    this.paused = false;
    this.gameLoop();
  }
  
  pause() {
    this.paused = !this.paused;
    if (!this.paused) {
      this.gameLoop();
    }
  }
  
  restart() {
    this.snake = [{x: 10, y: 10}];
    this.food = this.generateFood();
    this.dx = 0;
    this.dy = 0;
    this.score = 0;
    this.scoreElement.textContent = this.score;
    this.gameRunning = true;
    this.paused = false;
    this.gameLoop();
  }
  
  gameOver() {
    this.gameRunning = false;
    
    // Draw game over screen
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.8)';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.ctx.fillStyle = '#fff';
    this.ctx.font = '30px Arial';
    this.ctx.textAlign = 'center';
    this.ctx.fillText('Game Over!', this.canvas.width / 2, this.canvas.height / 2 - 20);
    
    this.ctx.font = '20px Arial';
    this.ctx.fillText(`Final Score: ${this.score}`, this.canvas.width / 2, this.canvas.height / 2 + 20);
    this.ctx.fillText('Press Restart to play again', this.canvas.width / 2, this.canvas.height / 2 + 50);
  }
}

// Initialize game when page loads
let snakeGame;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('snakeCanvas')) {
    snakeGame = new SnakeGame();
  }
}); 