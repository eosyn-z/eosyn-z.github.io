// 2048 Game Implementation
class Game2048 {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gridSize = 4;
        this.grid = [];
        this.score = 0;
        this.bestScore = localStorage.getItem('2048-best') || 0;
        this.gameOver = false;
        this.won = false;
        this.tileSize = 0;
        this.padding = 0;
        this.animating = false;
        this.animations = [];

        // Colors for different tile values
        this.colors = {
            2: { bg: '#eee4da', text: '#776e65' },
            4: { bg: '#ede0c8', text: '#776e65' },
            8: { bg: '#f2b179', text: '#f9f6f2' },
            16: { bg: '#f59563', text: '#f9f6f2' },
            32: { bg: '#f67c5f', text: '#f9f6f2' },
            64: { bg: '#f65e3b', text: '#f9f6f2' },
            128: { bg: '#edcf72', text: '#f9f6f2' },
            256: { bg: '#edcc61', text: '#f9f6f2' },
            512: { bg: '#edc850', text: '#f9f6f2' },
            1024: { bg: '#edc53f', text: '#f9f6f2' },
            2048: { bg: '#edc22e', text: '#f9f6f2' },
            4096: { bg: '#3c3a32', text: '#f9f6f2' },
            8192: { bg: '#3c3a32', text: '#f9f6f2' }
        };

        this.setupGame();
        this.setupInput();
    }

    setupGame() {
        this.calculateSizes();
        this.initializeGrid();
        this.addRandomTile();
        this.addRandomTile();
    }

    calculateSizes() {
        const minDimension = Math.min(this.canvas.width, this.canvas.height);
        const boardSize = minDimension * 0.8;
        this.boardX = (this.canvas.width - boardSize) / 2;
        this.boardY = (this.canvas.height - boardSize) / 2 + 30;
        this.tileSize = boardSize / this.gridSize * 0.85;
        this.padding = boardSize / this.gridSize * 0.15;
    }

    initializeGrid() {
        this.grid = [];
        for (let i = 0; i < this.gridSize; i++) {
            this.grid[i] = [];
            for (let j = 0; j < this.gridSize; j++) {
                this.grid[i][j] = 0;
            }
        }
    }

    addRandomTile() {
        const emptyCells = [];
        for (let i = 0; i < this.gridSize; i++) {
            for (let j = 0; j < this.gridSize; j++) {
                if (this.grid[i][j] === 0) {
                    emptyCells.push({ x: i, y: j });
                }
            }
        }

        if (emptyCells.length > 0) {
            const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)];
            const value = Math.random() < 0.9 ? 2 : 4;
            this.grid[randomCell.x][randomCell.y] = value;

            // Add spawn animation
            this.animations.push({
                type: 'spawn',
                x: randomCell.x,
                y: randomCell.y,
                value: value,
                progress: 0
            });
        }
    }

    setupInput() {
        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (this.animating) return;

            let moved = false;
            switch(e.key) {
                case 'ArrowUp':
                case 'w':
                case 'W':
                    e.preventDefault();
                    moved = this.move(0, -1);
                    break;
                case 'ArrowDown':
                case 's':
                case 'S':
                    e.preventDefault();
                    moved = this.move(0, 1);
                    break;
                case 'ArrowLeft':
                case 'a':
                case 'A':
                    e.preventDefault();
                    moved = this.move(-1, 0);
                    break;
                case 'ArrowRight':
                case 'd':
                case 'D':
                    e.preventDefault();
                    moved = this.move(1, 0);
                    break;
            }

            if (moved) {
                this.addRandomTile();
                this.checkGameState();
            }
        });

        // Touch/swipe controls
        let touchStartX = 0;
        let touchStartY = 0;

        this.canvas.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            touchStartY = e.touches[0].clientY;
        });

        this.canvas.addEventListener('touchend', (e) => {
            if (this.animating) return;

            const touchEndX = e.changedTouches[0].clientX;
            const touchEndY = e.changedTouches[0].clientY;
            const dx = touchEndX - touchStartX;
            const dy = touchEndY - touchStartY;

            if (Math.abs(dx) < 30 && Math.abs(dy) < 30) return;

            let moved = false;
            if (Math.abs(dx) > Math.abs(dy)) {
                // Horizontal swipe
                moved = this.move(dx > 0 ? 1 : -1, 0);
            } else {
                // Vertical swipe
                moved = this.move(0, dy > 0 ? 1 : -1);
            }

            if (moved) {
                this.addRandomTile();
                this.checkGameState();
            }
        });
    }

    move(dx, dy) {
        const newGrid = JSON.parse(JSON.stringify(this.grid));
        let moved = false;

        // Determine iteration order based on direction
        const xStart = dx > 0 ? this.gridSize - 1 : 0;
        const xEnd = dx > 0 ? -1 : this.gridSize;
        const xStep = dx > 0 ? -1 : 1;

        const yStart = dy > 0 ? this.gridSize - 1 : 0;
        const yEnd = dy > 0 ? -1 : this.gridSize;
        const yStep = dy > 0 ? -1 : 1;

        // Move tiles
        for (let x = xStart; x !== xEnd; x += xStep) {
            for (let y = yStart; y !== yEnd; y += yStep) {
                if (newGrid[x][y] !== 0) {
                    let newX = x;
                    let newY = y;

                    // Move tile as far as possible
                    while (true) {
                        const nextX = newX + dx;
                        const nextY = newY + dy;

                        if (nextX < 0 || nextX >= this.gridSize ||
                            nextY < 0 || nextY >= this.gridSize) {
                            break;
                        }

                        if (newGrid[nextX][nextY] === 0) {
                            // Move to empty cell
                            newGrid[nextX][nextY] = newGrid[newX][newY];
                            newGrid[newX][newY] = 0;
                            newX = nextX;
                            newY = nextY;
                            moved = true;
                        } else if (newGrid[nextX][nextY] === newGrid[newX][newY] &&
                                  !this.hasMergedThisTurn(nextX, nextY)) {
                            // Merge with same value
                            newGrid[nextX][nextY] *= 2;
                            newGrid[newX][newY] = 0;
                            this.score += newGrid[nextX][nextY];
                            this.markAsMerged(nextX, nextY);
                            moved = true;

                            // Add merge animation
                            this.animations.push({
                                type: 'merge',
                                x: nextX,
                                y: nextY,
                                value: newGrid[nextX][nextY],
                                progress: 0
                            });

                            // Check for win
                            if (newGrid[nextX][nextY] === 2048 && !this.won) {
                                this.won = true;
                            }
                            break;
                        } else {
                            break;
                        }
                    }
                }
            }
        }

        this.grid = newGrid;
        this.clearMergedFlags();

        // Update best score
        if (this.score > this.bestScore) {
            this.bestScore = this.score;
            localStorage.setItem('2048-best', this.bestScore);
        }

        return moved;
    }

    mergedThisTurn = new Set();

    hasMergedThisTurn(x, y) {
        return this.mergedThisTurn.has(`${x},${y}`);
    }

    markAsMerged(x, y) {
        this.mergedThisTurn.add(`${x},${y}`);
    }

    clearMergedFlags() {
        this.mergedThisTurn.clear();
    }

    checkGameState() {
        // Check if any moves are possible
        let movesAvailable = false;

        // Check for empty cells
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                if (this.grid[x][y] === 0) {
                    movesAvailable = true;
                    break;
                }
            }
        }

        // Check for possible merges
        if (!movesAvailable) {
            for (let x = 0; x < this.gridSize; x++) {
                for (let y = 0; y < this.gridSize; y++) {
                    const value = this.grid[x][y];

                    // Check right
                    if (x < this.gridSize - 1 && this.grid[x + 1][y] === value) {
                        movesAvailable = true;
                        break;
                    }

                    // Check down
                    if (y < this.gridSize - 1 && this.grid[x][y + 1] === value) {
                        movesAvailable = true;
                        break;
                    }
                }
            }
        }

        if (!movesAvailable) {
            this.gameOver = true;
        }
    }

    update() {
        // Update animations
        this.animations = this.animations.filter(anim => {
            anim.progress += 0.15;
            return anim.progress < 1;
        });

        this.animating = this.animations.length > 0;
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#faf8ef');
        gradient.addColorStop(1, '#d6cdc4');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw title and score
        this.ctx.fillStyle = '#776e65';
        this.ctx.font = 'bold 48px Arial';
        this.ctx.fillText('2048', 50, 60);

        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillText(`Score: ${this.score}`, this.canvas.width - 250, 40);
        this.ctx.font = '18px Arial';
        this.ctx.fillText(`Best: ${this.bestScore}`, this.canvas.width - 250, 70);

        // Draw board background
        this.ctx.fillStyle = '#bbada0';
        this.ctx.fillRect(
            this.boardX - this.padding,
            this.boardY - this.padding,
            (this.tileSize + this.padding) * this.gridSize + this.padding,
            (this.tileSize + this.padding) * this.gridSize + this.padding
        );

        // Draw grid cells
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                const posX = this.boardX + x * (this.tileSize + this.padding);
                const posY = this.boardY + y * (this.tileSize + this.padding);

                // Draw empty cell background
                this.ctx.fillStyle = '#cdc1b4';
                this.ctx.fillRect(posX, posY, this.tileSize, this.tileSize);

                // Draw tile if present
                if (this.grid[x][y] !== 0) {
                    const value = this.grid[x][y];
                    const colors = this.colors[value] || this.colors[8192];

                    // Check for animations
                    let scale = 1;
                    const anim = this.animations.find(a =>
                        a.x === x && a.y === y
                    );
                    if (anim) {
                        if (anim.type === 'spawn') {
                            scale = anim.progress;
                        } else if (anim.type === 'merge') {
                            scale = 1 + Math.sin(anim.progress * Math.PI) * 0.2;
                        }
                    }

                    // Draw tile with animation
                    this.ctx.save();
                    this.ctx.translate(posX + this.tileSize / 2, posY + this.tileSize / 2);
                    this.ctx.scale(scale, scale);

                    // Tile background
                    this.ctx.fillStyle = colors.bg;
                    this.ctx.fillRect(
                        -this.tileSize / 2,
                        -this.tileSize / 2,
                        this.tileSize,
                        this.tileSize
                    );

                    // Tile text
                    this.ctx.fillStyle = colors.text;
                    const fontSize = value > 999 ? 32 : value > 99 ? 42 : 52;
                    this.ctx.font = `bold ${fontSize}px Arial`;
                    this.ctx.textAlign = 'center';
                    this.ctx.textBaseline = 'middle';
                    this.ctx.fillText(value, 0, 0);

                    this.ctx.restore();
                }
            }
        }

        // Draw instructions
        this.ctx.fillStyle = '#776e65';
        this.ctx.font = '16px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Use arrow keys or WASD to move tiles', this.canvas.width / 2, this.canvas.height - 20);

        // Draw game over or win overlay
        if (this.gameOver || this.won) {
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
            this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

            this.ctx.fillStyle = this.won ? '#f9a825' : '#776e65';
            this.ctx.font = 'bold 64px Arial';
            this.ctx.textAlign = 'center';
            this.ctx.fillText(
                this.won ? 'You Win!' : 'Game Over!',
                this.canvas.width / 2,
                this.canvas.height / 2 - 30
            );

            this.ctx.font = '24px Arial';
            this.ctx.fillText(
                `Final Score: ${this.score}`,
                this.canvas.width / 2,
                this.canvas.height / 2 + 20
            );

            this.ctx.font = '18px Arial';
            this.ctx.fillText(
                'Press Reset to play again',
                this.canvas.width / 2,
                this.canvas.height / 2 + 60
            );
        }
    }

    gameLoop() {
        this.update();
        this.draw();
    }

    reset() {
        this.score = 0;
        this.gameOver = false;
        this.won = false;
        this.animations = [];
        this.setupGame();
    }
}

// Export for use in games page
window.Game2048 = Game2048;