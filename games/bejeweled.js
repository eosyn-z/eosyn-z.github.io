// Bejeweled / Match-3 Game
class Bejeweled {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.gridSize = 8;
        this.grid = [];
        this.score = 0;
        this.moves = 0;
        this.selectedGem = null;
        this.animating = false;
        this.animations = [];
        this.particles = [];
        this.combo = 0;

        // Gem types with colors and symbols
        this.gemTypes = [
            { color: '#ff4444', highlight: '#ff6666', symbol: '♦', name: 'ruby' },
            { color: '#44ff44', highlight: '#66ff66', symbol: '♣', name: 'emerald' },
            { color: '#4444ff', highlight: '#6666ff', symbol: '♠', name: 'sapphire' },
            { color: '#ffff44', highlight: '#ffff66', symbol: '★', name: 'topaz' },
            { color: '#ff44ff', highlight: '#ff66ff', symbol: '♥', name: 'amethyst' },
            { color: '#44ffff', highlight: '#66ffff', symbol: '◆', name: 'diamond' },
            { color: '#ff8844', highlight: '#ffaa66', symbol: '✦', name: 'amber' }
        ];

        this.cellSize = 0;
        this.boardX = 0;
        this.boardY = 0;

        this.setupGame();
        this.setupInput();
    }

    setupGame() {
        this.calculateSizes();
        this.initializeGrid();
        this.fillBoard();

        // Ensure no initial matches
        while (this.findMatches().length > 0) {
            this.initializeGrid();
            this.fillBoard();
        }
    }

    calculateSizes() {
        const minDimension = Math.min(this.canvas.width, this.canvas.height);
        const boardSize = minDimension * 0.85;
        this.cellSize = boardSize / this.gridSize;
        this.boardX = (this.canvas.width - boardSize) / 2;
        this.boardY = (this.canvas.height - boardSize) / 2 + 30;
    }

    initializeGrid() {
        this.grid = [];
        for (let row = 0; row < this.gridSize; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.gridSize; col++) {
                this.grid[row][col] = null;
            }
        }
    }

    fillBoard() {
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                if (!this.grid[row][col]) {
                    this.grid[row][col] = {
                        type: Math.floor(Math.random() * this.gemTypes.length),
                        row: row,
                        col: col,
                        x: this.boardX + col * this.cellSize + this.cellSize / 2,
                        y: this.boardY + row * this.cellSize + this.cellSize / 2,
                        scale: 1,
                        rotation: 0,
                        falling: false,
                        matched: false
                    };
                }
            }
        }
    }

    setupInput() {
        let mouseDown = false;
        let startX, startY;

        this.canvas.addEventListener('mousedown', (e) => {
            if (this.animating) return;

            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const gem = this.getGemAt(x, y);
            if (gem) {
                mouseDown = true;
                startX = x;
                startY = y;
                this.selectGem(gem);
            }
        });

        this.canvas.addEventListener('mousemove', (e) => {
            if (!mouseDown || this.animating) return;

            const rect = this.canvas.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const dx = x - startX;
            const dy = y - startY;

            if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
                const direction = this.getSwipeDirection(dx, dy);
                if (this.selectedGem && direction) {
                    this.trySwap(this.selectedGem, direction);
                    mouseDown = false;
                }
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            mouseDown = false;
        });

        // Touch support
        this.canvas.addEventListener('touchstart', (e) => {
            if (this.animating) return;

            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            const gem = this.getGemAt(x, y);
            if (gem) {
                this.selectGem(gem);
                startX = x;
                startY = y;
            }
        });

        this.canvas.addEventListener('touchmove', (e) => {
            if (this.animating || !this.selectedGem) return;
            e.preventDefault();

            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const x = touch.clientX - rect.left;
            const y = touch.clientY - rect.top;

            const dx = x - startX;
            const dy = y - startY;

            if (Math.abs(dx) > 30 || Math.abs(dy) > 30) {
                const direction = this.getSwipeDirection(dx, dy);
                if (direction) {
                    this.trySwap(this.selectedGem, direction);
                }
            }
        });
    }

    getGemAt(x, y) {
        const col = Math.floor((x - this.boardX) / this.cellSize);
        const row = Math.floor((y - this.boardY) / this.cellSize);

        if (row >= 0 && row < this.gridSize && col >= 0 && col < this.gridSize) {
            return this.grid[row][col];
        }
        return null;
    }

    selectGem(gem) {
        this.selectedGem = gem;

        // Add selection animation
        this.animations.push({
            type: 'select',
            gem: gem,
            progress: 0
        });
    }

    getSwipeDirection(dx, dy) {
        if (Math.abs(dx) > Math.abs(dy)) {
            return dx > 0 ? 'right' : 'left';
        } else {
            return dy > 0 ? 'down' : 'up';
        }
    }

    trySwap(gem, direction) {
        const targetRow = gem.row + (direction === 'down' ? 1 : direction === 'up' ? -1 : 0);
        const targetCol = gem.col + (direction === 'right' ? 1 : direction === 'left' ? -1 : 0);

        if (targetRow >= 0 && targetRow < this.gridSize &&
            targetCol >= 0 && targetCol < this.gridSize) {

            const targetGem = this.grid[targetRow][targetCol];
            if (targetGem) {
                this.swapGems(gem, targetGem);
            }
        }

        this.selectedGem = null;
    }

    swapGems(gem1, gem2) {
        this.animating = true;
        this.moves++;

        // Swap positions in grid
        this.grid[gem1.row][gem1.col] = gem2;
        this.grid[gem2.row][gem2.col] = gem1;

        // Swap row/col properties
        const tempRow = gem1.row;
        const tempCol = gem1.col;
        gem1.row = gem2.row;
        gem1.col = gem2.col;
        gem2.row = tempRow;
        gem2.col = tempCol;

        // Animate the swap
        this.animations.push({
            type: 'swap',
            gem1: gem1,
            gem2: gem2,
            startX1: gem1.x,
            startY1: gem1.y,
            startX2: gem2.x,
            startY2: gem2.y,
            targetX1: this.boardX + gem1.col * this.cellSize + this.cellSize / 2,
            targetY1: this.boardY + gem1.row * this.cellSize + this.cellSize / 2,
            targetX2: this.boardX + gem2.col * this.cellSize + this.cellSize / 2,
            targetY2: this.boardY + gem2.row * this.cellSize + this.cellSize / 2,
            progress: 0,
            onComplete: () => {
                // Check for matches after swap
                const matches = this.findMatches();
                if (matches.length > 0) {
                    this.handleMatches(matches);
                } else {
                    // No matches, swap back
                    this.swapBack(gem1, gem2);
                }
            }
        });
    }

    swapBack(gem1, gem2) {
        // Swap positions back
        this.grid[gem1.row][gem1.col] = gem2;
        this.grid[gem2.row][gem2.col] = gem1;

        const tempRow = gem1.row;
        const tempCol = gem1.col;
        gem1.row = gem2.row;
        gem1.col = gem2.col;
        gem2.row = tempRow;
        gem2.col = tempCol;

        // Animate swap back
        this.animations.push({
            type: 'swap',
            gem1: gem1,
            gem2: gem2,
            startX1: gem1.x,
            startY1: gem1.y,
            startX2: gem2.x,
            startY2: gem2.y,
            targetX1: this.boardX + gem1.col * this.cellSize + this.cellSize / 2,
            targetY1: this.boardY + gem1.row * this.cellSize + this.cellSize / 2,
            targetX2: this.boardX + gem2.col * this.cellSize + this.cellSize / 2,
            targetY2: this.boardY + gem2.row * this.cellSize + this.cellSize / 2,
            progress: 0,
            onComplete: () => {
                this.animating = false;
            }
        });
    }

    findMatches() {
        const matches = [];

        // Check horizontal matches
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize - 2; col++) {
                const gem = this.grid[row][col];
                if (gem && !gem.matched) {
                    let matchLength = 1;
                    while (col + matchLength < this.gridSize &&
                           this.grid[row][col + matchLength] &&
                           this.grid[row][col + matchLength].type === gem.type) {
                        matchLength++;
                    }

                    if (matchLength >= 3) {
                        const match = [];
                        for (let i = 0; i < matchLength; i++) {
                            match.push(this.grid[row][col + i]);
                            this.grid[row][col + i].matched = true;
                        }
                        matches.push(match);
                    }
                }
            }
        }

        // Check vertical matches
        for (let col = 0; col < this.gridSize; col++) {
            for (let row = 0; row < this.gridSize - 2; row++) {
                const gem = this.grid[row][col];
                if (gem && !gem.matched) {
                    let matchLength = 1;
                    while (row + matchLength < this.gridSize &&
                           this.grid[row + matchLength][col] &&
                           this.grid[row + matchLength][col].type === gem.type) {
                        matchLength++;
                    }

                    if (matchLength >= 3) {
                        const match = [];
                        for (let i = 0; i < matchLength; i++) {
                            match.push(this.grid[row + i][col]);
                            this.grid[row + i][col].matched = true;
                        }
                        matches.push(match);
                    }
                }
            }
        }

        return matches;
    }

    handleMatches(matches) {
        this.combo++;

        // Calculate score with combo multiplier
        matches.forEach(match => {
            const baseScore = match.length * 10;
            const comboMultiplier = Math.min(this.combo, 5);
            this.score += baseScore * comboMultiplier;

            // Create particle effects for matched gems
            match.forEach(gem => {
                this.createParticles(gem.x, gem.y, this.gemTypes[gem.type].color);

                // Animate gem disappearing
                this.animations.push({
                    type: 'disappear',
                    gem: gem,
                    progress: 0
                });
            });
        });

        // Remove matched gems after animation
        setTimeout(() => {
            matches.forEach(match => {
                match.forEach(gem => {
                    this.grid[gem.row][gem.col] = null;
                });
            });

            this.dropGems();
        }, 300);
    }

    dropGems() {
        let dropped = false;

        // Drop existing gems
        for (let col = 0; col < this.gridSize; col++) {
            for (let row = this.gridSize - 2; row >= 0; row--) {
                const gem = this.grid[row][col];
                if (gem) {
                    let dropDistance = 0;
                    let targetRow = row;

                    // Find how far to drop
                    for (let checkRow = row + 1; checkRow < this.gridSize; checkRow++) {
                        if (!this.grid[checkRow][col]) {
                            dropDistance++;
                            targetRow = checkRow;
                        } else {
                            break;
                        }
                    }

                    if (dropDistance > 0) {
                        dropped = true;
                        this.grid[targetRow][col] = gem;
                        this.grid[row][col] = null;
                        gem.row = targetRow;

                        // Animate drop
                        this.animations.push({
                            type: 'drop',
                            gem: gem,
                            startY: gem.y,
                            targetY: this.boardY + targetRow * this.cellSize + this.cellSize / 2,
                            progress: 0
                        });
                    }
                }
            }
        }

        // Add new gems at top
        for (let col = 0; col < this.gridSize; col++) {
            let newGems = 0;
            for (let row = 0; row < this.gridSize; row++) {
                if (!this.grid[row][col]) {
                    newGems++;
                    const newGem = {
                        type: Math.floor(Math.random() * this.gemTypes.length),
                        row: row,
                        col: col,
                        x: this.boardX + col * this.cellSize + this.cellSize / 2,
                        y: this.boardY - newGems * this.cellSize + this.cellSize / 2,
                        scale: 1,
                        rotation: 0,
                        falling: true,
                        matched: false
                    };

                    this.grid[row][col] = newGem;

                    // Animate new gem falling
                    this.animations.push({
                        type: 'drop',
                        gem: newGem,
                        startY: newGem.y,
                        targetY: this.boardY + row * this.cellSize + this.cellSize / 2,
                        progress: 0
                    });
                }
            }
        }

        // Check for new matches after drops
        setTimeout(() => {
            const newMatches = this.findMatches();
            if (newMatches.length > 0) {
                this.handleMatches(newMatches);
            } else {
                this.combo = 0;
                this.animating = false;
            }
        }, 400);
    }

    createParticles(x, y, color) {
        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                vx: (Math.random() - 0.5) * 8,
                vy: (Math.random() - 0.5) * 8,
                color: color,
                life: 1,
                size: Math.random() * 4 + 2
            });
        }
    }

    update() {
        // Update animations
        this.animations = this.animations.filter(anim => {
            anim.progress += 0.1;

            if (anim.type === 'swap') {
                const t = Math.min(anim.progress, 1);
                anim.gem1.x = anim.startX1 + (anim.targetX1 - anim.startX1) * t;
                anim.gem1.y = anim.startY1 + (anim.targetY1 - anim.startY1) * t;
                anim.gem2.x = anim.startX2 + (anim.targetX2 - anim.startX2) * t;
                anim.gem2.y = anim.startY2 + (anim.targetY2 - anim.startY2) * t;

                if (t >= 1 && anim.onComplete) {
                    anim.onComplete();
                    return false;
                }
            } else if (anim.type === 'drop') {
                const t = Math.min(anim.progress, 1);
                anim.gem.y = anim.startY + (anim.targetY - anim.startY) * t;
            } else if (anim.type === 'disappear') {
                anim.gem.scale = 1 - anim.progress;
                anim.gem.rotation = anim.progress * Math.PI;
            } else if (anim.type === 'select') {
                anim.gem.scale = 1 + Math.sin(anim.progress * Math.PI * 2) * 0.1;
            }

            return anim.progress < 1;
        });

        // Update particles
        this.particles = this.particles.filter(particle => {
            particle.x += particle.vx;
            particle.y += particle.vy;
            particle.vy += 0.5; // Gravity
            particle.life -= 0.02;
            return particle.life > 0;
        });
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw background gradient
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#1a1a2e');
        gradient.addColorStop(1, '#16213e');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw board background
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        this.ctx.fillRect(
            this.boardX - 5,
            this.boardY - 5,
            this.cellSize * this.gridSize + 10,
            this.cellSize * this.gridSize + 10
        );

        // Draw grid lines
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
        this.ctx.lineWidth = 1;
        for (let i = 0; i <= this.gridSize; i++) {
            // Horizontal lines
            this.ctx.beginPath();
            this.ctx.moveTo(this.boardX, this.boardY + i * this.cellSize);
            this.ctx.lineTo(this.boardX + this.gridSize * this.cellSize, this.boardY + i * this.cellSize);
            this.ctx.stroke();

            // Vertical lines
            this.ctx.beginPath();
            this.ctx.moveTo(this.boardX + i * this.cellSize, this.boardY);
            this.ctx.lineTo(this.boardX + i * this.cellSize, this.boardY + this.gridSize * this.cellSize);
            this.ctx.stroke();
        }

        // Draw gems
        for (let row = 0; row < this.gridSize; row++) {
            for (let col = 0; col < this.gridSize; col++) {
                const gem = this.grid[row][col];
                if (gem && gem.scale > 0) {
                    this.drawGem(gem);
                }
            }
        }

        // Draw particles
        this.particles.forEach(particle => {
            this.ctx.globalAlpha = particle.life;
            this.ctx.fillStyle = particle.color;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
        });
        this.ctx.globalAlpha = 1;

        // Draw UI
        this.drawUI();
    }

    drawGem(gem) {
        const gemType = this.gemTypes[gem.type];

        this.ctx.save();
        this.ctx.translate(gem.x, gem.y);
        this.ctx.rotate(gem.rotation);
        this.ctx.scale(gem.scale, gem.scale);

        // Draw gem background
        const gemSize = this.cellSize * 0.8;
        const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, gemSize / 2);
        gradient.addColorStop(0, gemType.highlight);
        gradient.addColorStop(1, gemType.color);

        this.ctx.fillStyle = gradient;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, gemSize / 2, 0, Math.PI * 2);
        this.ctx.fill();

        // Draw gem border
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
        this.ctx.lineWidth = 2;
        this.ctx.stroke();

        // Draw gem symbol
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
        this.ctx.font = `bold ${gemSize * 0.6}px Arial`;
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(gemType.symbol, 0, 0);

        // Draw selection highlight
        if (this.selectedGem === gem) {
            this.ctx.strokeStyle = '#ffff00';
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, gemSize / 2 + 5, 0, Math.PI * 2);
            this.ctx.stroke();
        }

        this.ctx.restore();
    }

    drawUI() {
        // Draw score
        this.ctx.fillStyle = '#ffffff';
        this.ctx.font = 'bold 32px Arial';
        this.ctx.fillText(`Score: ${this.score}`, 20, 40);

        // Draw moves
        this.ctx.font = '20px Arial';
        this.ctx.fillText(`Moves: ${this.moves}`, 20, 70);

        // Draw combo
        if (this.combo > 1) {
            this.ctx.fillStyle = '#ffff00';
            this.ctx.font = 'bold 24px Arial';
            this.ctx.fillText(`${this.combo}x Combo!`, this.canvas.width / 2 - 60, 40);
        }

        // Draw instructions
        this.ctx.fillStyle = '#aaaaaa';
        this.ctx.font = '14px Arial';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Swap gems to match 3 or more', this.canvas.width / 2, this.canvas.height - 10);
        this.ctx.textAlign = 'left';
    }

    gameLoop() {
        this.update();
        this.draw();
    }

    reset() {
        this.score = 0;
        this.moves = 0;
        this.combo = 0;
        this.selectedGem = null;
        this.animating = false;
        this.animations = [];
        this.particles = [];
        this.setupGame();
    }
}

// Export for use in games page
window.Bejeweled = Bejeweled;