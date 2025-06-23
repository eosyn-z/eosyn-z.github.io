// Background Animation System
class BackgroundAnimation {
    constructor() {
        this.canvas = null;
        this.ctx = null;
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        this.isActive = false;
        this.animationId = null;
        this.particleCount = 50;
        this.themeColors = {
            'c': ['#6366f1', '#8b5cf6', '#06b6d4', '#0891b2'],
            'a': ['#f59e0b', '#ef4444', '#ec4899', '#8b5cf6'],
            'r': ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#8b5cf6', '#ec4899'],
            'z': ['#1f2937', '#374151', '#6b7280', '#9ca3af'],
            'e': ['#7c3aed', '#5b21b6', '#4c1d95', '#2e1065'],
            'n': ['#0ea5e9', '#0284c7', '#0369a1', '#075985'],
            'custom': ['#6366f1', '#8b5cf6', '#06b6d4', '#0891b2'] // Default custom colors
        };
        
        this.init();
    }

    init() {
        // Create canvas element
        this.canvas = document.createElement('canvas');
        this.canvas.id = 'background-animation';
        this.canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: -1;
            opacity: 0.3;
            transition: opacity 0.5s ease;
        `;
        
        document.body.appendChild(this.canvas);
        this.ctx = this.canvas.getContext('2d');
        
        this.resizeCanvas();
        this.createParticles();
        this.setupEventListeners();
        
        // Check if animation should be enabled by default
        const savedState = localStorage.getItem('backgroundAnimation');
        if (savedState === 'enabled' || savedState === null) {
            this.enable();
        }
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    createParticles() {
        this.particles = [];
        const colors = this.getCurrentThemeColors();
        
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                size: Math.random() * 3 + 1,
                color: colors[Math.floor(Math.random() * colors.length)],
                opacity: Math.random() * 0.5 + 0.2,
                life: Math.random() * 100 + 50,
                maxLife: Math.random() * 100 + 50
            });
        }
    }

    getCurrentThemeColors() {
        const currentTheme = document.body.getAttribute('data-theme') || 'c';
        return this.themeColors[currentTheme] || this.themeColors['c'];
    }

    setupEventListeners() {
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.createParticles();
        });

        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });

        // Listen for theme changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'data-theme') {
                    this.updateParticleColors();
                }
            });
        });
        
        observer.observe(document.body, { attributes: true });
    }

    updateParticleColors() {
        const colors = this.getCurrentThemeColors();
        this.particles.forEach(particle => {
            particle.color = colors[Math.floor(Math.random() * colors.length)];
        });
    }

    animate() {
        if (!this.isActive) return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.particles.forEach((particle, index) => {
            // Update position
            particle.x += particle.vx;
            particle.y += particle.vy;

            // Mouse interaction
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                particle.vx += dx * force * 0.001;
                particle.vy += dy * force * 0.001;
            }

            // Bounce off edges
            if (particle.x <= 0 || particle.x >= this.canvas.width) {
                particle.vx *= -0.8;
            }
            if (particle.y <= 0 || particle.y >= this.canvas.height) {
                particle.vy *= -0.8;
            }

            // Keep particles in bounds
            particle.x = Math.max(0, Math.min(this.canvas.width, particle.x));
            particle.y = Math.max(0, Math.min(this.canvas.height, particle.y));

            // Update life
            particle.life--;
            if (particle.life <= 0) {
                particle.life = particle.maxLife;
                particle.x = Math.random() * this.canvas.width;
                particle.y = Math.random() * this.canvas.height;
                particle.color = this.getCurrentThemeColors()[Math.floor(Math.random() * this.getCurrentThemeColors().length)];
            }

            // Draw particle
            this.ctx.save();
            this.ctx.globalAlpha = particle.opacity * (particle.life / particle.maxLife);
            
            // Create glass effect
            const gradient = this.ctx.createRadialGradient(
                particle.x, particle.y, 0,
                particle.x, particle.y, particle.size
            );
            gradient.addColorStop(0, particle.color + '80');
            gradient.addColorStop(0.5, particle.color + '40');
            gradient.addColorStop(1, particle.color + '00');
            
            this.ctx.fillStyle = gradient;
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fill();
            
            this.ctx.restore();
        });

        this.animationId = requestAnimationFrame(() => this.animate());
    }

    enable() {
        if (this.isActive) return;
        
        this.isActive = true;
        this.canvas.style.opacity = '0.3';
        localStorage.setItem('backgroundAnimation', 'enabled');
        this.animate();
        this.updateToggleButton();
    }

    disable() {
        if (!this.isActive) return;
        
        this.isActive = false;
        this.canvas.style.opacity = '0';
        localStorage.setItem('backgroundAnimation', 'disabled');
        
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
            this.animationId = null;
        }
        
        this.updateToggleButton();
    }

    toggle() {
        if (this.isActive) {
            this.disable();
        } else {
            this.enable();
        }
    }

    updateToggleButton() {
        const toggleBtn = document.getElementById('background-animation-toggle');
        if (toggleBtn) {
            toggleBtn.classList.toggle('active', this.isActive);
        }
    }

    // Public method to update custom theme colors
    updateCustomThemeColors(colors) {
        this.themeColors.custom = colors;
        this.updateParticleColors();
    }
}

// Initialize background animation
document.addEventListener('DOMContentLoaded', () => {
    window.backgroundAnimation = new BackgroundAnimation();
}); 