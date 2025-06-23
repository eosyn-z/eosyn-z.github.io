// Sparkles Background Animation System
class SparklesBackground {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.sparkles = [];
        this.isActive = true;
        this.animationId = null;
        this.sparkleCount = 30;
        this.themeColors = {
            'c': ['#6366f1', '#8b5cf6', '#06b6d4', '#0891b2', '#ffffff'],
            'a': ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6', '#ffffff'],
            'r': ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899', '#ffffff'],
            'z': ['#1f2937', '#374151', '#6b7280', '#9ca3af', '#ffffff'],
            'e': ['#7c3aed', '#5b21b6', '#4c1d95', '#2e1065', '#ffffff'],
            'n': ['#0ea5e9', '#0284c7', '#0369a1', '#075985', '#ffffff'],
            'custom': ['#6366f1', '#8b5cf6', '#06b6d4', '#0891b2', '#ffffff']
        };
        
        this.init();
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'sparkles-background';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -2;
            opacity: 0.6;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        this.createSparkles();
        this.setupEventListeners();
        this.animate();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createSparkles() {
        this.sparkles = [];
        const colors = this.getCurrentThemeColors();
        
        for (let i = 0; i < this.sparkleCount; i++) {
            this.sparkles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                size: Math.random() * 4 + 2,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.8 + 0.2,
                life: Math.random() * 200 + 100,
                maxLife: Math.random() * 200 + 100,
                fadeDirection: Math.random() > 0.5 ? 1 : -1,
                fadeSpeed: Math.random() * 0.02 + 0.005,
                rotation: Math.random() * Math.PI * 2,
                rotationSpeed: (Math.random() - 0.5) * 0.1
            });
        }
    }

    getCurrentThemeColors() {
        const currentTheme = document.body.getAttribute('data-theme') || 'c';
        return this.themeColors[currentTheme] || this.themeColors['c'];
    }

    updateSparkleColors() {
        const colors = this.getCurrentThemeColors();
        this.sparkles.forEach(sparkle => {
            if (Math.random() < 0.1) { // 10% chance to change color
                sparkle.color = colors[Math.floor(Math.random() * colors.length)];
            }
        });
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createSparkles();
        });

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    this.updateSparkleColors();
                }
            });
        });
        
        observer.observe(document.body, { attributes: true });
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.sparkles.forEach((sparkle, index) => {
            // Update position
            sparkle.x += sparkle.vx;
            sparkle.y += sparkle.vy;
            sparkle.rotation += sparkle.rotationSpeed;

            // Bounce off edges
            if (sparkle.x <= 0 || sparkle.x >= this.canvas.width) {
                sparkle.vx *= -0.8;
            }
            if (sparkle.y <= 0 || sparkle.y >= this.canvas.height) {
                sparkle.vy *= -0.8;
            }

            // Keep sparkles in bounds
            sparkle.x = Math.max(0, Math.min(this.canvas.width, sparkle.x));
            sparkle.y = Math.max(0, Math.min(this.canvas.height, sparkle.y));

            // Update life and fade
            sparkle.life--;
            if (sparkle.life <= 0) {
                sparkle.life = sparkle.maxLife;
                sparkle.x = Math.random() * this.canvas.width;
                sparkle.y = Math.random() * this.canvas.height;
                sparkle.color = this.getCurrentThemeColors()[Math.floor(Math.random() * this.getCurrentThemeColors().length)];
                sparkle.fadeDirection = Math.random() > 0.5 ? 1 : -1;
            }

            // Fade in/out effect
            sparkle.opacity += sparkle.fadeDirection * sparkle.fadeSpeed;
            if (sparkle.opacity <= 0.1 || sparkle.opacity >= 0.9) {
                sparkle.fadeDirection *= -1;
            }

            // Draw sparkle
            this.ctx.save();
            this.ctx.globalAlpha = sparkle.opacity * (sparkle.life / sparkle.maxLife);
            this.ctx.translate(sparkle.x, sparkle.y);
            this.ctx.rotate(sparkle.rotation);
            
            // Create sparkle shape (4-pointed star)
            const size = sparkle.size;
            this.ctx.fillStyle = sparkle.color;
            this.ctx.strokeStyle = sparkle.color;
            this.ctx.lineWidth = 1;
            
            // Draw sparkle as a cross with dots
            this.ctx.beginPath();
            
            // Vertical line
            this.ctx.moveTo(0, -size);
            this.ctx.lineTo(0, size);
            
            // Horizontal line
            this.ctx.moveTo(-size, 0);
            this.ctx.lineTo(size, 0);
            
            // Diagonal lines
            this.ctx.moveTo(-size * 0.7, -size * 0.7);
            this.ctx.lineTo(size * 0.7, size * 0.7);
            this.ctx.moveTo(-size * 0.7, size * 0.7);
            this.ctx.lineTo(size * 0.7, -size * 0.7);
            
            this.ctx.stroke();
            
            // Add center dot
            this.ctx.beginPath();
            this.ctx.arc(0, 0, size * 0.3, 0, Math.PI * 2);
            this.ctx.fill();
            
            // Add glow effect
            const gradient = this.ctx.createRadialGradient(0, 0, 0, 0, 0, size * 2);
            gradient.addColorStop(0, sparkle.color + '40');
            gradient.addColorStop(0.5, sparkle.color + '20');
            gradient.addColorStop(1, sparkle.color + '00');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(0, 0, size * 2, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    enable() {
        this.isActive = true;
        this.canvas.style.opacity = '0.6';
        if (!this.animationId) {
            this.animate();
        }
    }

    disable() {
        this.isActive = false;
        this.canvas.style.opacity = '0';
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
    }

    toggle() {
        if (this.isActive) {
            this.disable();
        } else {
            this.enable();
        }
    }
}

// Initialize sparkles background
document.addEventListener('DOMContentLoaded', () => {
    window.sparklesBackground = new SparklesBackground();
    
    // Add global console command
    window.toggleSparkles = () => {
        if (window.sparklesBackground) {
            window.sparklesBackground.toggle();
            console.log(`Sparkles ${window.sparklesBackground.isActive ? 'enabled' : 'disabled'} ✨`);
        } else {
            console.log('Sparkles background not available');
        }
    };
    
    console.log('✨ Sparkles background loaded! Use toggleSparkles() in console to toggle.');
}); 