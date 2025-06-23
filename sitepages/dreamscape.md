---
layout: page
title: "🌌 Dreamscape"
description: "Navigate through immersive dream spaces and surreal experiences"
icon: "🌌"
permalink: /dreamscape/
---

<div class="dreamscape-container">
    <div class="dreamscape-header">
        <h1>🌌 Dreamscape Navigator</h1>
        <p>Choose your path through the infinite dream spaces...</p>
    </div>

    <div class="dreamscape-grid">
        <!-- Cosmic Void -->
        <div class="dreamscape-portal glass-card" data-destination="cosmic-void">
            <div class="portal-icon">🌌</div>
            <h3>Cosmic Void</h3>
            <p>Float through infinite space among distant stars and nebulae</p>
            <div class="portal-effects">
                <div class="star-field"></div>
            </div>
        </div>

        <!-- Digital Forest -->
        <div class="dreamscape-portal glass-card" data-destination="digital-forest">
            <div class="portal-icon">🌳</div>
            <h3>Digital Forest</h3>
            <p>Wander through a forest of glowing trees and data streams</p>
            <div class="portal-effects">
                <div class="data-leaves"></div>
            </div>
        </div>

        <!-- Crystal Caves -->
        <div class="dreamscape-portal glass-card" data-destination="crystal-caves">
            <div class="portal-icon">💎</div>
            <h3>Crystal Caves</h3>
            <p>Explore caverns filled with prismatic crystals and light</p>
            <div class="portal-effects">
                <div class="crystal-shards"></div>
            </div>
        </div>

        <!-- Quantum Ocean -->
        <div class="dreamscape-portal glass-card" data-destination="quantum-ocean">
            <div class="portal-icon">🌊</div>
            <h3>Quantum Ocean</h3>
            <p>Dive into waves of probability and quantum foam</p>
            <div class="portal-effects">
                <div class="quantum-waves"></div>
            </div>
        </div>

        <!-- Memory Palace -->
        <div class="dreamscape-portal glass-card" data-destination="memory-palace">
            <div class="portal-icon">🏛️</div>
            <h3>Memory Palace</h3>
            <p>Navigate through halls of forgotten memories and dreams</p>
            <div class="portal-effects">
                <div class="memory-echoes"></div>
            </div>
        </div>

        <!-- Neon City -->
        <div class="dreamscape-portal glass-card" data-destination="neon-city">
            <div class="portal-icon">🏙️</div>
            <h3>Neon City</h3>
            <p>Walk through streets of eternal night and neon lights</p>
            <div class="portal-effects">
                <div class="neon-glow"></div>
            </div>
        </div>

        <!-- Time Garden -->
        <div class="dreamscape-portal glass-card" data-destination="time-garden">
            <div class="portal-icon">⏰</div>
            <h3>Time Garden</h3>
            <p>Witness flowers that bloom in different moments of time</p>
            <div class="portal-effects">
                <div class="time-petals"></div>
            </div>
        </div>

        <!-- Mirror Maze -->
        <div class="dreamscape-portal glass-card" data-destination="mirror-maze">
            <div class="portal-icon">🪞</div>
            <h3>Mirror Maze</h3>
            <p>Navigate through infinite reflections of yourself</p>
            <div class="portal-effects">
                <div class="mirror-fragments"></div>
            </div>
        </div>
    </div>

    <div class="dreamscape-controls">
        <button class="glass-button" onclick="randomDreamscape()">🎲 Random Journey</button>
        <button class="glass-button" onclick="createCustomDreamscape()">✨ Create Custom</button>
        <button class="glass-button" onclick="saveDreamscapeProgress()">💾 Save Progress</button>
    </div>
</div>

<style>
.dreamscape-container {
    min-height: 100vh;
    padding: 2rem;
    background: linear-gradient(135deg, 
        var(--theme-primary) 0%, 
        var(--theme-secondary) 25%, 
        var(--theme-accent) 50%, 
        var(--theme-primary) 75%, 
        var(--theme-secondary) 100%);
    background-size: 400% 400%;
    animation: dreamscapeGradient 20s ease infinite;
}

@keyframes dreamscapeGradient {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
}

.dreamscape-header {
    text-align: center;
    margin-bottom: 3rem;
    color: var(--theme-text);
}

.dreamscape-header h1 {
    font-size: 3rem;
    margin-bottom: 1rem;
    text-shadow: 0 0 20px var(--theme-accent));
}

.dreamscape-header p {
    font-size: 1.2rem;
    opacity: 0.8;
}

.dreamscape-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
    margin: 2rem 0;
}

.dreamscape-portal {
    position: relative;
    min-height: 250px;
    padding: 2rem;
    border-radius: 20px;
    background: var(--glass-bg-heavy);
    backdrop-filter: var(--glass-blur-heavy);
    border: 2px solid var(--glass-border-light);
    transition: all 0.5s ease;
    cursor: pointer;
    overflow: hidden;
}

.dreamscape-portal:hover {
    transform: translateY(-10px) scale(1.05);
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
    border-color: var(--theme-accent);
}

.dreamscape-portal::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
    transform: translateX(-100%);
    transition: transform 0.6s ease;
}

.dreamscape-portal:hover::before {
    transform: translateX(100%);
}

.portal-icon {
    font-size: 4rem;
    text-align: center;
    margin-bottom: 1rem;
    filter: drop-shadow(0 0 10px var(--theme-accent));
}

.dreamscape-portal h3 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: var(--theme-text);
    text-align: center;
}

.dreamscape-portal p {
    color: var(--theme-text-secondary);
    text-align: center;
    line-height: 1.6;
}

.portal-effects {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    transition: opacity 0.3s ease;
}

.dreamscape-portal:hover .portal-effects {
    opacity: 1;
}

/* Star Field Effect */
.star-field {
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: 
        radial-gradient(2px 2px at 20px 30px, #eee, transparent),
        radial-gradient(2px 2px at 40px 70px, rgba(255,255,255,0.8), transparent),
        radial-gradient(1px 1px at 90px 40px, #fff, transparent),
        radial-gradient(1px 1px at 130px 80px, rgba(255,255,255,0.6), transparent),
        radial-gradient(2px 2px at 160px 30px, #ddd, transparent);
    background-repeat: repeat;
    background-size: 200px 100px;
    animation: twinkle 4s ease-in-out infinite;
}

@keyframes twinkle {
    0%, 100% { opacity: 0.3; }
    50% { opacity: 1; }
}

/* Data Leaves Effect */
.data-leaves {
    position: absolute;
    width: 100%;
    height: 100%;
}

.data-leaves::before {
    content: '01';
    position: absolute;
    color: #00ff00;
    font-family: monospace;
    font-size: 0.8rem;
    animation: dataFall 3s linear infinite;
}

@keyframes dataFall {
    0% { transform: translateY(-100px) rotate(0deg); opacity: 0; }
    10% { opacity: 1; }
    90% { opacity: 1; }
    100% { transform: translateY(300px) rotate(360deg); opacity: 0; }
}

/* Crystal Shards Effect */
.crystal-shards {
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(45deg, 
        transparent 30%, 
        rgba(255, 255, 255, 0.1) 50%, 
        transparent 70%);
    animation: crystalShimmer 2s ease-in-out infinite;
}

@keyframes crystalShimmer {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
}

/* Quantum Waves Effect */
.quantum-waves {
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 50% 50%, 
            rgba(0, 255, 255, 0.3) 0%, 
            transparent 50%);
    animation: quantumPulse 2s ease-in-out infinite;
}

@keyframes quantumPulse {
    0%, 100% { transform: scale(1); opacity: 0.3; }
    50% { transform: scale(1.2); opacity: 0.6; }
}

/* Memory Echoes Effect */
.memory-echoes {
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        repeating-linear-gradient(
            45deg,
            transparent,
            transparent 10px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.1) 20px
        );
    animation: memoryFade 3s ease-in-out infinite;
}

@keyframes memoryFade {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.4; }
}

/* Neon Glow Effect */
.neon-glow {
    position: absolute;
    width: 100%;
    height: 100%;
    box-shadow: 
        inset 0 0 20px rgba(255, 0, 255, 0.3),
        0 0 20px rgba(0, 255, 255, 0.3);
    animation: neonFlicker 0.5s ease-in-out infinite;
}

@keyframes neonFlicker {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
}

/* Time Petals Effect */
.time-petals {
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        radial-gradient(circle at 30% 30%, 
            rgba(255, 215, 0, 0.3) 0%, 
            transparent 30%),
        radial-gradient(circle at 70% 70%, 
            rgba(255, 20, 147, 0.3) 0%, 
            transparent 30%);
    animation: timeFlow 4s ease-in-out infinite;
}

@keyframes timeFlow {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}

/* Mirror Fragments Effect */
.mirror-fragments {
    position: absolute;
    width: 100%;
    height: 100%;
    background: 
        linear-gradient(90deg, 
            transparent 0%, 
            rgba(255, 255, 255, 0.2) 50%, 
            transparent 100%);
    animation: mirrorReflect 1.5s ease-in-out infinite;
}

@keyframes mirrorReflect {
    0%, 100% { transform: translateX(-100%); }
    50% { transform: translateX(100%); }
}

.dreamscape-controls {
    display: flex;
    gap: 1rem;
    justify-content: center;
    margin-top: 3rem;
    flex-wrap: wrap;
}

.dreamscape-controls .glass-button {
    padding: 1rem 2rem;
    font-size: 1.1rem;
    border-radius: 15px;
    transition: all 0.3s ease;
}

.dreamscape-controls .glass-button:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.2);
}

@media (max-width: 768px) {
    .dreamscape-grid {
        grid-template-columns: 1fr;
    }
    
    .dreamscape-header h1 {
        font-size: 2rem;
    }
    
    .dreamscape-controls {
        flex-direction: column;
        align-items: center;
    }
}
</style>

<script>
// Dreamscape Navigation System
class DreamscapeNavigator {
    constructor() {
        this.currentLocation = 'dreamscape-hub';
        this.visitedLocations = new Set();
        this.dreamscapeProgress = {};
        this.init();
    }

    init() {
        this.loadProgress();
        this.setupEventListeners();
        this.createDreamscapeExperiences();
    }

    setupEventListeners() {
        // Portal click events
        document.querySelectorAll('.dreamscape-portal').forEach(portal => {
            portal.addEventListener('click', (e) => {
                const destination = portal.dataset.destination;
                this.navigateToDreamscape(destination);
            });
        });

        // Control buttons
        window.randomDreamscape = () => {
            this.navigateToRandomDreamscape();
        };

        window.createCustomDreamscape = () => {
            this.createCustomDreamscape();
        };

        window.saveDreamscapeProgress = () => {
            this.saveProgress();
        };
    }

    navigateToDreamscape(destination) {
        this.currentLocation = destination;
        this.visitedLocations.add(destination);
        
        // Create immersive experience
        this.createDreamscapeExperience(destination);
        
        // Save progress
        this.saveProgress();
        
        // Show navigation message
        this.showNavigationMessage(destination);
    }

    createDreamscapeExperience(destination) {
        const experiences = {
            'cosmic-void': {
                title: '🌌 Cosmic Void',
                description: 'You float through infinite space, surrounded by distant stars and colorful nebulae. Time seems to stand still here.',
                effects: ['star-field', 'cosmic-drift', 'nebula-colors']
            },
            'digital-forest': {
                title: '🌳 Digital Forest',
                description: 'Glowing trees pulse with data streams. Binary leaves fall around you as you navigate through this digital wilderness.',
                effects: ['data-streams', 'glowing-trees', 'binary-rain']
            },
            'crystal-caves': {
                title: '💎 Crystal Caves',
                description: 'Prismatic crystals refract light in impossible ways. Each surface reflects a different moment in time.',
                effects: ['crystal-reflections', 'prismatic-light', 'time-echoes']
            },
            'quantum-ocean': {
                title: '🌊 Quantum Ocean',
                description: 'Waves of probability crash around you. Reality itself seems to shift and change with each observation.',
                effects: ['probability-waves', 'reality-shift', 'quantum-foam']
            },
            'memory-palace': {
                title: '🏛️ Memory Palace',
                description: 'Halls of forgotten memories stretch infinitely. Each door leads to a different moment from the past.',
                effects: ['memory-echoes', 'time-corridors', 'forgotten-dreams']
            },
            'neon-city': {
                title: '🏙️ Neon City',
                description: 'Eternal night reigns in this cyberpunk metropolis. Neon lights pulse to the rhythm of the digital heartbeat.',
                effects: ['neon-pulse', 'cyber-rain', 'digital-heartbeat']
            },
            'time-garden': {
                title: '⏰ Time Garden',
                description: 'Flowers bloom in different moments of time. Some are from the past, others from futures yet to come.',
                effects: ['time-bloom', 'temporal-petals', 'chrono-wind']
            },
            'mirror-maze': {
                title: '🪞 Mirror Maze',
                description: 'Infinite reflections of yourself stretch in every direction. Which one is the real you?',
                effects: ['infinite-reflection', 'mirror-fragments', 'identity-shift']
            }
        };

        const experience = experiences[destination];
        if (experience) {
            this.showDreamscapeExperience(experience);
        }
    }

    showDreamscapeExperience(experience) {
        // Create immersive overlay
        const overlay = document.createElement('div');
        overlay.className = 'dreamscape-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            background: linear-gradient(135deg, 
                var(--theme-primary) 0%, 
                var(--theme-secondary) 50%, 
                var(--theme-accent) 100%);
            z-index: 10000;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            color: var(--theme-text);
            text-align: center;
            padding: 2rem;
        `;

        overlay.innerHTML = `
            <div class="dreamscape-experience">
                <h1 style="font-size: 3rem; margin-bottom: 1rem;">${experience.title}</h1>
                <p style="font-size: 1.2rem; margin-bottom: 2rem; max-width: 600px; line-height: 1.6;">
                    ${experience.description}
                </p>
                <div class="dreamscape-actions">
                    <button class="glass-button" onclick="this.parentElement.parentElement.parentElement.remove()">
                        Return to Hub
                    </button>
                    <button class="glass-button" onclick="window.dreamscapeNavigator.exploreFurther()">
                        Explore Further
                    </button>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);

        // Add immersive effects
        this.addImmersiveEffects(experience.effects, overlay);
    }

    addImmersiveEffects(effects, container) {
        effects.forEach(effect => {
            const effectElement = document.createElement('div');
            effectElement.className = `immersive-effect ${effect}`;
            effectElement.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            `;
            container.appendChild(effectElement);
        });
    }

    navigateToRandomDreamscape() {
        const destinations = [
            'cosmic-void', 'digital-forest', 'crystal-caves', 'quantum-ocean',
            'memory-palace', 'neon-city', 'time-garden', 'mirror-maze'
        ];
        
        const randomDestination = destinations[Math.floor(Math.random() * destinations.length)];
        this.navigateToDreamscape(randomDestination);
    }

    createCustomDreamscape() {
        const customName = prompt('Name your custom dreamscape:');
        if (customName) {
            const customDescription = prompt('Describe your dreamscape:');
            if (customDescription) {
                this.createDreamscapeExperience({
                    title: `✨ ${customName}`,
                    description: customDescription,
                    effects: ['custom-effect']
                });
            }
        }
    }

    exploreFurther() {
        const explorations = [
            'You discover a hidden passage...',
            'A new dimension opens before you...',
            'Time seems to bend around you...',
            'Reality shifts in unexpected ways...',
            'You encounter a being of pure thought...',
            'The laws of physics seem to change...'
        ];
        
        const randomExploration = explorations[Math.floor(Math.random() * explorations.length)];
        alert(`🌌 ${randomExploration}`);
    }

    showNavigationMessage(destination) {
        const messages = {
            'cosmic-void': '🌌 You drift into the infinite cosmic void...',
            'digital-forest': '🌳 You enter the digital forest...',
            'crystal-caves': '💎 You step into the crystal caves...',
            'quantum-ocean': '🌊 You dive into the quantum ocean...',
            'memory-palace': '🏛️ You enter the memory palace...',
            'neon-city': '🏙️ You walk into the neon city...',
            'time-garden': '⏰ You enter the time garden...',
            'mirror-maze': '🪞 You step into the mirror maze...'
        };

        const message = messages[destination] || '✨ You enter a new dreamscape...';
        console.log(message);
    }

    saveProgress() {
        this.dreamscapeProgress = {
            currentLocation: this.currentLocation,
            visitedLocations: Array.from(this.visitedLocations),
            timestamp: new Date().toISOString()
        };
        
        localStorage.setItem('dreamscapeProgress', JSON.stringify(this.dreamscapeProgress));
        console.log('💾 Dreamscape progress saved!');
    }

    loadProgress() {
        try {
            const saved = localStorage.getItem('dreamscapeProgress');
            if (saved) {
                this.dreamscapeProgress = JSON.parse(saved);
                this.currentLocation = this.dreamscapeProgress.currentLocation;
                this.visitedLocations = new Set(this.dreamscapeProgress.visitedLocations);
                console.log('📂 Dreamscape progress loaded!');
            }
        } catch (error) {
            console.error('Error loading dreamscape progress:', error);
        }
    }

    createDreamscapeExperiences() {
        // Add additional immersive elements
        this.addFloatingElements();
        this.addAmbientSounds();
    }

    addFloatingElements() {
        // Create floating particles
        for (let i = 0; i < 20; i++) {
            const particle = document.createElement('div');
            particle.style.cssText = `
                position: fixed;
                width: 4px;
                height: 4px;
                background: var(--theme-accent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 1;
                animation: float ${Math.random() * 10 + 10}s linear infinite;
                left: ${Math.random() * 100}vw;
                top: ${Math.random() * 100}vh;
            `;
            document.body.appendChild(particle);
        }
    }

    addAmbientSounds() {
        // Add ambient sound controls (visual only for now)
        const soundControl = document.createElement('div');
        soundControl.innerHTML = '🔊';
        soundControl.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            font-size: 2rem;
            cursor: pointer;
            z-index: 1000;
            opacity: 0.7;
            transition: opacity 0.3s ease;
        `;
        soundControl.addEventListener('click', () => {
            alert('🎵 Ambient dreamscape sounds would play here!');
        });
        document.body.appendChild(soundControl);
    }
}

// Initialize dreamscape navigator
document.addEventListener('DOMContentLoaded', () => {
    window.dreamscapeNavigator = new DreamscapeNavigator();
    console.log('🌌 Dreamscape Navigator loaded! Choose your path...');
});

// Add floating animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0% { transform: translateY(100vh) rotate(0deg); opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { transform: translateY(-100px) rotate(360deg); opacity: 0; }
    }
`;
document.head.appendChild(style);
</script> 