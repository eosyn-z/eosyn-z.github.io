// Water Ring Toss Game - Classic childhood game recreation
class WaterRingToss {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.score = 0;
        this.ringsOnPosts = [0, 0, 0]; // Track rings on each post

        // Game state
        this.rings = [];
        this.posts = [];
        this.bubbles = [];
        this.pushActive = false;
        this.pushPower = 0;
        this.maxPushPower = 15;

        // Physics
        this.gravity = 0.2;
        this.waterDrag = 0.98;
        this.buoyancy = 0.15;

        // Visual settings
        this.waterLevel = 0.3; // 30% from bottom
        this.containerWidth = 0.8; // 80% of canvas width
        this.containerHeight = 0.9; // 90% of canvas height

        // Initialize game
        this.setupGame();
        this.setupInput();
    }

    setupGame() {
        // Resize canvas to fit container
        this.resizeCanvas();

        // Create posts (targets)
        this.createPosts();

        // Create rings
        this.createRings();

        // Start with some initial bubbles
        for (let i = 0; i < 5; i++) {
            this.createBubble();
        }
    }

    resizeCanvas() {
        // Make canvas responsive
        const container = this.canvas.parentElement;
        this.canvas.width = container.offsetWidth;
        this.canvas.height = container.offsetHeight;
    }

    createPosts() {
        const postCount = 3;
        const spacing = this.canvas.width * 0.25;
        const startX = this.canvas.width * 0.25;
        const postY = this.canvas.height * 0.4;

        this.posts = [];
        for (let i = 0; i < postCount; i++) {
            this.posts.push({
                x: startX + (spacing * i),
                y: postY,
                width: 8,
                height: 120,
                color: '#ff6b6b',
                points: (i === 1) ? 10 : 5, // Center post worth more
                rings: []
            });
        }
    }

    createRings() {
        const ringCount = 6;
        const colors = ['#ff9999', '#99ff99', '#9999ff', '#ffff99', '#ff99ff', '#99ffff'];

        this.rings = [];
        for (let i = 0; i < ringCount; i++) {
            this.rings.push({
                x: Math.random() * (this.canvas.width * 0.6) + (this.canvas.width * 0.2),
                y: this.canvas.height * 0.7 + Math.random() * 100,
                vx: (Math.random() - 0.5) * 2,
                vy: 0,
                radius: 20,
                innerRadius: 12,
                color: colors[i % colors.length],
                floating: true,
                onPost: null,
                scored: false
            });
        }
    }

    createBubble() {
        this.bubbles.push({
            x: Math.random() * this.canvas.width,
            y: this.canvas.height,
            radius: Math.random() * 3 + 1,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.3,
            wobble: Math.random() * Math.PI * 2
        });
    }

    setupInput() {
        // Mouse/touch controls
        this.canvas.addEventListener('mousedown', () => this.startPush());
        this.canvas.addEventListener('mouseup', () => this.releasePush());
        this.canvas.addEventListener('touchstart', () => this.startPush());
        this.canvas.addEventListener('touchend', () => this.releasePush());

        // Keyboard controls
        document.addEventListener('keydown', (e) => {
            if (e.code === 'Space') {
                e.preventDefault();
                this.startPush();
            }
        });

        document.addEventListener('keyup', (e) => {
            if (e.code === 'Space') {
                this.releasePush();
            }
        });
    }

    startPush() {
        this.pushActive = true;
        this.pushPower = 0;
    }

    releasePush() {
        if (this.pushActive && this.pushPower > 0) {
            this.applyPushForce();
        }
        this.pushActive = false;
        this.pushPower = 0;
    }

    applyPushForce() {
        // Create water jet effect
        const jetX = this.canvas.width / 2;
        const jetY = this.canvas.height * 0.9;

        // Apply force to all rings based on distance and angle
        this.rings.forEach(ring => {
            if (!ring.onPost) {
                const dx = ring.x - jetX;
                const dy = ring.y - jetY;
                const distance = Math.sqrt(dx * dx + dy * dy);

                // Force decreases with distance
                const forceMagnitude = this.pushPower * (1 - Math.min(distance / 400, 1));

                // Apply force
                ring.vx += (dx / distance) * forceMagnitude * 0.3;
                ring.vy += (dy / distance) * forceMagnitude * 0.5 - forceMagnitude * 0.3; // More upward force
            }
        });

        // Create bubble burst effect
        for (let i = 0; i < 10; i++) {
            this.bubbles.push({
                x: jetX + (Math.random() - 0.5) * 40,
                y: jetY,
                radius: Math.random() * 5 + 2,
                speed: Math.random() * 4 + 3,
                opacity: 0.8,
                wobble: Math.random() * Math.PI * 2
            });
        }
    }

    update() {
        // Update push power
        if (this.pushActive) {
            this.pushPower = Math.min(this.pushPower + 0.5, this.maxPushPower);
        }

        // Update rings
        this.rings.forEach(ring => {
            if (!ring.onPost) {
                // Apply gravity
                ring.vy += this.gravity;

                // Apply buoyancy if below water level
                const waterY = this.canvas.height * (1 - this.waterLevel);
                if (ring.y > waterY) {
                    ring.vy -= this.buoyancy;
                }

                // Apply water drag
                ring.vx *= this.waterDrag;
                ring.vy *= this.waterDrag;

                // Update position
                ring.x += ring.vx;
                ring.y += ring.vy;

                // Bounce off walls
                if (ring.x - ring.radius < 50 || ring.x + ring.radius > this.canvas.width - 50) {
                    ring.vx *= -0.8;
                    ring.x = Math.max(50 + ring.radius, Math.min(this.canvas.width - 50 - ring.radius, ring.x));
                }

                // Don't go below bottom
                if (ring.y + ring.radius > this.canvas.height - 20) {
                    ring.y = this.canvas.height - 20 - ring.radius;
                    ring.vy *= -0.3;
                }

                // Don't go above top
                if (ring.y - ring.radius < 50) {
                    ring.y = 50 + ring.radius;
                    ring.vy *= -0.5;
                }

                // Check collision with posts
                this.checkPostCollision(ring);
            }
        });

        // Update bubbles
        this.bubbles = this.bubbles.filter(bubble => {
            bubble.y -= bubble.speed;
            bubble.x += Math.sin(bubble.wobble) * 0.5;
            bubble.wobble += 0.1;
            bubble.opacity -= 0.01;
            return bubble.y > -10 && bubble.opacity > 0;
        });

        // Occasionally add new bubbles
        if (Math.random() < 0.02) {
            this.createBubble();
        }
    }

    checkPostCollision(ring) {
        this.posts.forEach(post => {
            const dx = Math.abs(ring.x - post.x);
            const dy = ring.y - post.y;

            // Check if ring is above post and aligned
            if (dx < ring.innerRadius && dy > -20 && dy < post.height && ring.vy > 0) {
                // Check if ring can fit on post (not too many rings already)
                if (post.rings.length < 5) {
                    // Ring lands on post!
                    ring.onPost = post;
                    ring.vx = 0;
                    ring.vy = 0;
                    ring.x = post.x;
                    ring.y = post.y + (post.rings.length * 15);
                    post.rings.push(ring);

                    // Score points
                    if (!ring.scored) {
                        this.score += post.points;
                        ring.scored = true;

                        // Celebration effect
                        this.createCelebrationBubbles(post.x, post.y);
                    }
                }
            }
        });
    }

    createCelebrationBubbles(x, y) {
        for (let i = 0; i < 20; i++) {
            this.bubbles.push({
                x: x + (Math.random() - 0.5) * 60,
                y: y + Math.random() * 50,
                radius: Math.random() * 6 + 2,
                speed: Math.random() * 5 + 3,
                opacity: 1,
                wobble: Math.random() * Math.PI * 2
            });
        }
    }

    draw() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw container background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#e3f2fd');
        gradient.addColorStop(0.3, '#bbdefb');
        gradient.addColorStop(0.7, '#90caf9');
        gradient.addColorStop(1, '#64b5f6');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw water
        const waterY = this.canvas.height * (1 - this.waterLevel);
        const waterGradient = this.ctx.createLinearGradient(0, waterY, 0, this.canvas.height);
        waterGradient.addColorStop(0, 'rgba(33, 150, 243, 0.6)');
        waterGradient.addColorStop(1, 'rgba(13, 71, 161, 0.8)');
        this.ctx.fillStyle = waterGradient;
        this.ctx.fillRect(0, waterY, this.canvas.width, this.canvas.height);

        // Draw water surface waves
        this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.4)';
        this.ctx.lineWidth = 2;
        this.ctx.beginPath();
        for (let x = 0; x <= this.canvas.width; x += 5) {
            const waveY = waterY + Math.sin(x * 0.02 + Date.now() * 0.001) * 3;
            if (x === 0) {
                this.ctx.moveTo(x, waveY);
            } else {
                this.ctx.lineTo(x, waveY);
            }
        }
        this.ctx.stroke();

        // Draw container edges
        this.ctx.strokeStyle = '#333';
        this.ctx.lineWidth = 4;
        this.ctx.strokeRect(50, 50, this.canvas.width - 100, this.canvas.height - 70);

        // Draw bubbles (behind rings)
        this.bubbles.forEach(bubble => {
            this.ctx.fillStyle = `rgba(255, 255, 255, ${bubble.opacity})`;
            this.ctx.beginPath();
            this.ctx.arc(bubble.x, bubble.y, bubble.radius, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw posts
        this.posts.forEach(post => {
            // Post shadow
            this.ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.fillRect(post.x - post.width/2 + 2, post.y + 2, post.width, post.height);

            // Post
            const postGradient = this.ctx.createLinearGradient(
                post.x - post.width/2, 0,
                post.x + post.width/2, 0
            );
            postGradient.addColorStop(0, '#ff8a80');
            postGradient.addColorStop(0.5, post.color);
            postGradient.addColorStop(1, '#c62828');
            this.ctx.fillStyle = postGradient;
            this.ctx.fillRect(post.x - post.width/2, post.y, post.width, post.height);

            // Post tip
            this.ctx.fillStyle = '#fff';
            this.ctx.beginPath();
            this.ctx.arc(post.x, post.y, post.width/2, 0, Math.PI * 2);
            this.ctx.fill();
        });

        // Draw rings
        this.rings.forEach(ring => {
            // Ring shadow
            this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.2)';
            this.ctx.lineWidth = 4;
            this.ctx.beginPath();
            this.ctx.arc(ring.x + 2, ring.y + 2, ring.radius, 0, Math.PI * 2);
            this.ctx.stroke();

            // Ring
            this.ctx.strokeStyle = ring.color;
            this.ctx.lineWidth = 8;
            this.ctx.beginPath();
            this.ctx.arc(ring.x, ring.y, ring.radius, 0, Math.PI * 2);
            this.ctx.stroke();

            // Ring highlight
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.beginPath();
            this.ctx.arc(ring.x, ring.y, ring.radius - 3, -Math.PI * 0.7, -Math.PI * 0.3);
            this.ctx.stroke();
        });

        // Draw push indicator
        if (this.pushActive) {
            const jetX = this.canvas.width / 2;
            const jetY = this.canvas.height * 0.9;

            // Power meter
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            this.ctx.fillRect(jetX - 50, jetY - 60, 100, 10);

            const powerColor = this.pushPower > 10 ? '#ff5252' :
                              this.pushPower > 5 ? '#ffeb3b' : '#4caf50';
            this.ctx.fillStyle = powerColor;
            this.ctx.fillRect(jetX - 50, jetY - 60, (this.pushPower / this.maxPushPower) * 100, 10);

            // Jet preview
            this.ctx.strokeStyle = 'rgba(255, 255, 255, 0.5)';
            this.ctx.lineWidth = 2;
            this.ctx.setLineDash([5, 5]);
            this.ctx.beginPath();
            this.ctx.moveTo(jetX, jetY);
            this.ctx.lineTo(jetX, jetY - this.pushPower * 10);
            this.ctx.stroke();
            this.ctx.setLineDash([]);
        }

        // Draw UI
        this.drawUI();
    }

    drawUI() {
        // Score
        this.ctx.fillStyle = '#fff';
        this.ctx.font = 'bold 24px Arial';
        this.ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
        this.ctx.shadowBlur = 4;
        this.ctx.fillText(`Score: ${this.score}`, 20, 40);

        // Instructions
        this.ctx.font = '16px Arial';
        this.ctx.fillText('Hold SPACE or Click to push water!', this.canvas.width / 2 - 120, 30);

        // Ring count on posts
        this.ctx.font = '14px Arial';
        this.posts.forEach((post, i) => {
            const ringCount = post.rings.length;
            if (ringCount > 0) {
                this.ctx.fillStyle = '#4caf50';
                this.ctx.fillText(`${ringCount}/5`, post.x - 15, post.y - 10);
            }
            this.ctx.fillStyle = '#fff';
            this.ctx.fillText(`${post.points}pts`, post.x - 15, post.y + post.height + 20);
        });

        this.ctx.shadowBlur = 0;
    }

    gameLoop() {
        this.update();
        this.draw();
    }

    reset() {
        this.score = 0;
        this.pushPower = 0;
        this.pushActive = false;
        this.setupGame();
    }
}

// Export for use in games page
window.WaterRingToss = WaterRingToss;