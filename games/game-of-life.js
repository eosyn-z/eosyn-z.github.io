// Conway's Game of Life - Interactive cellular automaton
class GameOfLife {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.cellSize = 10;
        this.cols = Math.floor(canvas.width / this.cellSize);
        this.rows = Math.floor(canvas.height / this.cellSize);
        this.grid = [];
        this.nextGrid = [];
        this.running = false;
        this.generation = 0;
        this.population = 0;
        this.speed = 100; // ms between generations
        this.lastUpdate = 0;
        this.drawing = false;
        this.erasing = false;
        this.rainbow = false;
        this.trail = false;
        this.cellAge = [];

        // Predefined patterns
        this.patterns = {
            glider: [
                [0, 1, 0],
                [0, 0, 1],
                [1, 1, 1]
            ],
            blinker: [
                [1, 1, 1]
            ],
            toad: [
                [0, 1, 1, 1],
                [1, 1, 1, 0]
            ],
            beacon: [
                [1, 1, 0, 0],
                [1, 1, 0, 0],
                [0, 0, 1, 1],
                [0, 0, 1, 1]
            ],
            pulsar: [
                [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0]
            ],
            gliderGun: [
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,1,1],
                [1,1,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [1,1,0,0,0,0,0,0,0,0,1,0,0,0,1,0,1,1,0,0,0,0,1,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
                [0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
            ]
        };

        this.setupGame();
        this.setupInput();
    }

    setupGame() {
        // Initialize grids
        this.grid = new Array(this.rows);
        this.nextGrid = new Array(this.rows);
        this.cellAge = new Array(this.rows);

        for (let i = 0; i < this.rows; i++) {
            this.grid[i] = new Array(this.cols).fill(0);
            this.nextGrid[i] = new Array(this.cols).fill(0);
            this.cellAge[i] = new Array(this.cols).fill(0);
        }

        // Random initial state
        this.randomize(0.2); // 20% density
    }

    setupInput() {
        // Mouse controls for drawing
        this.canvas.addEventListener('mousedown', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const col = Math.floor(x / this.cellSize);
            const row = Math.floor(y / this.cellSize);

            if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
                if (this.grid[row][col] === 1) {
                    this.erasing = true;
                    this.grid[row][col] = 0;
                    this.cellAge[row][col] = 0;
                } else {
                    this.drawing = true;
                    this.grid[row][col] = 1;
                    this.cellAge[row][col] = 1;
                }
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (this.drawing || this.erasing) {
                const rect = this.canvas.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const col = Math.floor(x / this.cellSize);
                const row = Math.floor(y / this.cellSize);

                if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
                    if (this.drawing) {
                        this.grid[row][col] = 1;
                        this.cellAge[row][col] = 1;
                    } else if (this.erasing) {
                        this.grid[row][col] = 0;
                        this.cellAge[row][col] = 0;
                    }
                }
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            this.drawing = false;
            this.erasing = false;
        });

        // Touch support
        this.canvas.addEventListener('touchstart', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;
            const col = Math.floor(x / this.cellSize);
            const row = Math.floor(y / this.cellSize);

            if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
                if (this.grid[row][col] === 1) {
                    this.erasing = true;
                    this.grid[row][col] = 0;
                } else {
                    this.drawing = true;
                    this.grid[row][col] = 1;
                }
            }
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (this.drawing || this.erasing) {
                const rect = this.canvas.getBoundingClientRect();
                const touch = e.touches[0];
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                const col = Math.floor(x / this.cellSize);
                const row = Math.floor(y / this.cellSize);

                if (col >= 0 && col < this.cols && row >= 0 && row < this.rows) {
                    this.grid[row][col] = this.drawing ? 1 : 0;
                    this.cellAge[row][col] = this.drawing ? 1 : 0;
                }
            }
        });

        this.canvas.addEventListener('touchend', () => {
            this.drawing = false;
            this.erasing = false;
        });

        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            switch(e.key.toLowerCase()) {
                case ' ':
                    e.preventDefault();
                    this.toggleRunning();
                    break;
                case 'r':
                    this.randomize(0.3);
                    break;
                case 'c':
                    this.clear();
                    break;
                case 'g':
                    this.insertPattern('glider', 10, 10);
                    break;
                case 'p':
                    this.insertPattern('pulsar', 20, 20);
                    break;
                case 't':
                    this.trail = !this.trail;
                    break;
                case 'h':
                    this.rainbow = !this.rainbow;
                    break;
                case '+':
                case '=':
                    this.speed = Math.max(10, this.speed - 20);
                    break;
                case '-':
                    this.speed = Math.min(500, this.speed + 20);
                    break;
            }
        });
    }

    randomize(density) {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col] = Math.random() < density ? 1 : 0;
                this.cellAge[row][col] = this.grid[row][col];
            }
        }
        this.generation = 0;
    }

    clear() {
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                this.grid[row][col] = 0;
                this.cellAge[row][col] = 0;
            }
        }
        this.generation = 0;
        this.running = false;
    }

    insertPattern(patternName, startRow, startCol) {
        const pattern = this.patterns[patternName];
        if (!pattern) return;

        for (let row = 0; row < pattern.length; row++) {
            for (let col = 0; col < pattern[row].length; col++) {
                const r = startRow + row;
                const c = startCol + col;
                if (r >= 0 && r < this.rows && c >= 0 && c < this.cols) {
                    this.grid[r][c] = pattern[row][col];
                    this.cellAge[r][c] = pattern[row][col];
                }
            }
        }
    }

    countNeighbors(row, col) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                if (i === 0 && j === 0) continue;

                const r = row + i;
                const c = col + j;

                // Wrap around edges (toroidal topology)
                const wrapRow = (r + this.rows) % this.rows;
                const wrapCol = (c + this.cols) % this.cols;

                count += this.grid[wrapRow][wrapCol];
            }
        }
        return count;
    }

    update() {
        if (!this.running) return;

        const now = Date.now();
        if (now - this.lastUpdate < this.speed) return;
        this.lastUpdate = now;

        this.population = 0;

        // Calculate next generation
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                const neighbors = this.countNeighbors(row, col);
                const alive = this.grid[row][col] === 1;

                // Conway's rules
                if (alive) {
                    if (neighbors < 2 || neighbors > 3) {
                        // Cell dies
                        this.nextGrid[row][col] = 0;
                        if (this.trail) {
                            this.cellAge[row][col] = -10; // Mark as recently dead for trail effect
                        } else {
                            this.cellAge[row][col] = 0;
                        }
                    } else {
                        // Cell survives
                        this.nextGrid[row][col] = 1;
                        this.cellAge[row][col] = Math.min(100, this.cellAge[row][col] + 1);
                        this.population++;
                    }
                } else {
                    if (neighbors === 3) {
                        // Cell born
                        this.nextGrid[row][col] = 1;
                        this.cellAge[row][col] = 1;
                        this.population++;
                    } else {
                        this.nextGrid[row][col] = 0;
                        if (this.trail && this.cellAge[row][col] < 0) {
                            this.cellAge[row][col] = Math.min(0, this.cellAge[row][col] + 1);
                        } else {
                            this.cellAge[row][col] = 0;
                        }
                    }
                }
            }
        }

        // Swap grids
        const temp = this.grid;
        this.grid = this.nextGrid;
        this.nextGrid = temp;

        this.generation++;
    }

    getColorForCell(row, col) {
        const age = this.cellAge[row][col];

        if (this.rainbow && age > 0) {
            // Rainbow mode - color based on age
            const hue = (age * 3) % 360;
            return `hsl(${hue}, 100%, 50%)`;
        } else if (this.trail && age < 0) {
            // Trail effect for recently dead cells
            const alpha = Math.abs(age / 10);
            return `rgba(100, 100, 255, ${alpha * 0.3})`;
        } else if (age > 0) {
            // Normal living cells - brighter with age
            const brightness = Math.min(255, 100 + age * 1.5);
            return `rgb(${brightness}, ${brightness}, ${brightness})`;
        }

        return null;
    }

    draw() {
        // Clear canvas
        this.ctx.fillStyle = '#0a0a0a';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw grid lines (subtle)
        if (this.cellSize > 5) {
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
            this.ctx.lineWidth = 1;

            for (let i = 0; i <= this.cols; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(i * this.cellSize, 0);
                this.ctx.lineTo(i * this.cellSize, this.canvas.height);
                this.ctx.stroke();
            }

            for (let i = 0; i <= this.rows; i++) {
                this.ctx.beginPath();
                this.ctx.moveTo(0, i * this.cellSize);
                this.ctx.lineTo(this.canvas.width, i * this.cellSize);
                this.ctx.stroke();
            }
        }

        // Draw cells
        for (let row = 0; row < this.rows; row++) {
            for (let col = 0; col < this.cols; col++) {
                if (this.grid[row][col] === 1 || (this.trail && this.cellAge[row][col] < 0)) {
                    const color = this.getColorForCell(row, col);
                    if (color) {
                        this.ctx.fillStyle = color;
                        this.ctx.fillRect(
                            col * this.cellSize,
                            row * this.cellSize,
                            this.cellSize - 1,
                            this.cellSize - 1
                        );
                    }
                }
            }
        }

        // Draw UI overlay
        this.drawUI();
    }

    drawUI() {
        // Semi-transparent background for UI
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        this.ctx.fillRect(0, 0, this.canvas.width, 80);

        // Title and stats
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.fillText('Conway\'s Game of Life', 20, 35);

        this.ctx.font = '16px Arial';
        this.ctx.fillText(`Generation: ${this.generation}`, 20, 60);
        this.ctx.fillText(`Population: ${this.population}`, 200, 60);
        this.ctx.fillText(`Speed: ${1000/this.speed}fps`, 350, 60);

        // Status
        if (this.running) {
            this.ctx.fillStyle = '#4caf50';
            this.ctx.fillText('● Running', 480, 60);
        } else {
            this.ctx.fillStyle = '#f44336';
            this.ctx.fillText('● Paused', 480, 60);
        }

        // Controls help
        this.ctx.fillStyle = '#aaaaaa';
        this.ctx.font = '12px Arial';
        const controls = [
            'Space: Play/Pause',
            'Click/Drag: Draw',
            'R: Random',
            'C: Clear',
            'G: Glider',
            'P: Pulsar',
            'T: Trails',
            'H: Rainbow',
            '+/-: Speed'
        ];

        const controlsPerLine = 3;
        for (let i = 0; i < controls.length; i++) {
            const x = 600 + (i % controlsPerLine) * 120;
            const y = 35 + Math.floor(i / controlsPerLine) * 20;
            this.ctx.fillText(controls[i], x, y);
        }

        // Visual mode indicators
        if (this.rainbow) {
            this.ctx.fillStyle = 'hsl(300, 100%, 50%)';
            this.ctx.fillText(' Rainbow', this.canvas.width - 100, 35);
        }
        if (this.trail) {
            this.ctx.fillStyle = '#4444ff';
            this.ctx.fillText('〜 Trails', this.canvas.width - 100, 55);
        }
    }

    toggleRunning() {
        this.running = !this.running;
        if (this.running) {
            this.lastUpdate = Date.now();
        }
    }

    gameLoop() {
        this.update();
        this.draw();
    }

    reset() {
        this.clear();
        this.randomize(0.2);
    }

    // Override start for this game
    start() {
        this.toggleRunning();
    }
}

// Export for use in games page
window.GameOfLife = GameOfLife;