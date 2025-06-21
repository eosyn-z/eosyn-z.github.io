class PongGame {
  constructor() {
    this.canvas = document.getElementById('pongCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.leftScoreElement = document.getElementById('leftScore');
    this.rightScoreElement = document.getElementById('rightScore');
    
    this.paddleHeight = 80;
    this.paddleWidth = 10;
    this.ballSize = 8;
    
    this.leftPaddle = {
      y: this.canvas.height / 2 - this.paddleHeight / 2,
      speed: 0
    };
    
    this.rightPaddle = {
      y: this.canvas.height / 2 - this.paddleHeight / 2,
      speed: 0
    };
    
    this.ball = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      dx: 4,
      dy: 2
    };
    
    this.leftScore = 0;
    this.rightScore = 0;
    this.gameRunning = false;
    this.paused = false;
    
    this.keys = {};
    
    this.bindControls();
    this.start();
  }
  
  bindControls() {
    document.addEventListener('keydown', (e) => {
      this.keys[e.key] = true;
    });
    
    document.addEventListener('keyup', (e) => {
      this.keys[e.key] = false;
    });
  }
  
  updatePaddles() {
    // Left paddle (W/S keys)
    if (this.keys['w'] || this.keys['W']) {
      this.leftPaddle.speed = -6;
    } else if (this.keys['s'] || this.keys['S']) {
      this.leftPaddle.speed = 6;
    } else {
      this.leftPaddle.speed = 0;
    }
    
    // Right paddle (Arrow keys)
    if (this.keys['ArrowUp']) {
      this.rightPaddle.speed = -6;
    } else if (this.keys['ArrowDown']) {
      this.rightPaddle.speed = 6;
    } else {
      this.rightPaddle.speed = 0;
    }
    
    // Update paddle positions
    this.leftPaddle.y += this.leftPaddle.speed;
    this.rightPaddle.y += this.rightPaddle.speed;
    
    // Keep paddles in bounds
    this.leftPaddle.y = Math.max(0, Math.min(this.canvas.height - this.paddleHeight, this.leftPaddle.y));
    this.rightPaddle.y = Math.max(0, Math.min(this.canvas.height - this.paddleHeight, this.rightPaddle.y));
  }
  
  updateBall() {
    this.ball.x += this.ball.dx;
    this.ball.y += this.ball.dy;
    
    // Ball collision with top and bottom
    if (this.ball.y <= 0 || this.ball.y >= this.canvas.height - this.ballSize) {
      this.ball.dy = -this.ball.dy;
    }
    
    // Ball collision with left paddle
    if (this.ball.x <= this.paddleWidth && 
        this.ball.y >= this.leftPaddle.y && 
        this.ball.y <= this.leftPaddle.y + this.paddleHeight) {
      this.ball.dx = -this.ball.dx;
      this.ball.x = this.paddleWidth;
      
      // Add some randomness to the bounce
      this.ball.dy += (Math.random() - 0.5) * 2;
    }
    
    // Ball collision with right paddle
    if (this.ball.x >= this.canvas.width - this.paddleWidth - this.ballSize && 
        this.ball.y >= this.rightPaddle.y && 
        this.ball.y <= this.rightPaddle.y + this.paddleHeight) {
      this.ball.dx = -this.ball.dx;
      this.ball.x = this.canvas.width - this.paddleWidth - this.ballSize;
      
      // Add some randomness to the bounce
      this.ball.dy += (Math.random() - 0.5) * 2;
    }
    
    // Ball out of bounds - scoring
    if (this.ball.x <= 0) {
      this.rightScore++;
      this.rightScoreElement.textContent = this.rightScore;
      this.resetBall();
    } else if (this.ball.x >= this.canvas.width) {
      this.leftScore++;
      this.leftScoreElement.textContent = this.leftScore;
      this.resetBall();
    }
  }
  
  resetBall() {
    this.ball.x = this.canvas.width / 2;
    this.ball.y = this.canvas.height / 2;
    this.ball.dx = (Math.random() > 0.5 ? 1 : -1) * 4;
    this.ball.dy = (Math.random() - 0.5) * 4;
  }
  
  update() {
    if (!this.gameRunning || this.paused) return;
    
    this.updatePaddles();
    this.updateBall();
  }
  
  draw() {
    // Clear canvas
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    
    // Draw center line
    this.ctx.strokeStyle = '#fff';
    this.ctx.setLineDash([5, 15]);
    this.ctx.beginPath();
    this.ctx.moveTo(this.canvas.width / 2, 0);
    this.ctx.lineTo(this.canvas.width / 2, this.canvas.height);
    this.ctx.stroke();
    this.ctx.setLineDash([]);
    
    // Draw left paddle
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(0, this.leftPaddle.y, this.paddleWidth, this.paddleHeight);
    
    // Draw right paddle
    this.ctx.fillRect(this.canvas.width - this.paddleWidth, this.rightPaddle.y, this.paddleWidth, this.paddleHeight);
    
    // Draw ball
    this.ctx.fillStyle = '#fff';
    this.ctx.fillRect(this.ball.x, this.ball.y, this.ballSize, this.ballSize);
  }
  
  gameLoop() {
    this.update();
    this.draw();
    
    if (this.gameRunning) {
      requestAnimationFrame(() => this.gameLoop());
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
    this.leftScore = 0;
    this.rightScore = 0;
    this.leftScoreElement.textContent = this.leftScore;
    this.rightScoreElement.textContent = this.rightScore;
    this.resetBall();
    this.leftPaddle.y = this.canvas.height / 2 - this.paddleHeight / 2;
    this.rightPaddle.y = this.canvas.height / 2 - this.paddleHeight / 2;
    this.gameRunning = true;
    this.paused = false;
    this.gameLoop();
  }
}

// Initialize game when page loads
let pongGame;
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('pongCanvas')) {
    pongGame = new PongGame();
  }
}); 