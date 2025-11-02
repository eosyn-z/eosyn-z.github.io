let aliceScene, aliceCamera, aliceRenderer, aliceParticles = [];
let aliceAnimationFrame;
let aliceContainer;
function isAliceThemeActive() {
    return localStorage.getItem('selectedTheme') === 'alice';
}
function createFlatHollowStarGeometry() {
    const shape = new THREE.Shape();
    const outerRadius = 8;
    const innerRadius = 3;
    const points = 5;
    for (let i = 0; i <= points * 2; i++) {
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) {
            shape.moveTo(x, y);
        } else {
            shape.lineTo(x, y);
        }
    }
    shape.closePath();
    const hole = new THREE.Path();
    const holeScale = 0.6;
    for (let i = 0; i <= points * 2; i++) {
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const radius = (i % 2 === 0 ? outerRadius : innerRadius) * holeScale;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        if (i === 0) {
            hole.moveTo(x, y);
        } else {
            hole.lineTo(x, y);
        }
    }
    hole.closePath();
    shape.holes.push(hole);
    const extrudeSettings = {
        depth: 0.5,
        bevelEnabled: false
    };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    return geometry;
}
function createGlitterGeometry(isBackground = false) {
    const radius = isBackground ? 3 / 6 : 5 / 6;
    return new THREE.OctahedronGeometry(radius, 0);
}
class AliceFloatingParticle {
    constructor(type = 'flat-star', layer = 'back') {
        this.type = type;
        this.layer = layer;
        const geometry = type === 'flat-star'
            ? createFlatHollowStarGeometry()
            : createGlitterGeometry(true);
        const pastelColors = [
            0xffb3ba,
            0xffcc99,
            0xb3f0b3,
            0xb3d9ff,
            0xd9b3ff,
            0xffb3d9,
            0xffc9e0,
            0xffd4e5
        ];
        const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        const opacity = layer === 'front' ? 0.35 : 0.6;
        const material = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: opacity,
            side: THREE.DoubleSide
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.position.x = (Math.random() - 0.5) * window.innerWidth * 1.2;
        this.mesh.position.y = (Math.random() - 0.5) * window.innerHeight * 1.2;
        if (layer === 'front') {
            this.mesh.position.z = 50 + Math.random() * 100;
        } else {
            this.mesh.position.z = -50 - Math.random() * 100;
        }
        this.velocity = {
            x: (Math.random() - 0.5) * 0.5,
            y: (Math.random() - 0.5) * 0.5,
            z: (Math.random() - 0.5) * 0.2
        };
        const rotationMultiplier = type === 'glitter' ? 1.25 : 1.0;
        this.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.04 * rotationMultiplier,
            y: (Math.random() - 0.5) * 0.04 * rotationMultiplier,
            z: (Math.random() - 0.5) * 0.04 * rotationMultiplier
        };
        const scale = type === 'glitter'
            ? 0.125 + Math.random() * 0.125
            : 0.8 + Math.random() * 0.6;
        this.mesh.scale.set(scale, scale, scale);
        this.maxLife = 3500;
        this.life = 0;
        this.mesh.rotation.x = Math.random() * Math.PI * 2;
        this.mesh.rotation.y = Math.random() * Math.PI * 2;
        this.mesh.rotation.z = Math.random() * Math.PI * 2;
    }
    update(deltaTime) {
        this.life += deltaTime;
        this.mesh.position.x += this.velocity.x;
        this.mesh.position.y += this.velocity.y;
        this.mesh.position.z += this.velocity.z;
        this.mesh.rotation.x += this.rotationSpeed.x;
        this.mesh.rotation.y += this.rotationSpeed.y;
        this.mesh.rotation.z += this.rotationSpeed.z;
        const lifeProgress = this.life / this.maxLife;
        const baseOpacity = this.layer === 'front' ? 0.35 : 0.6;
        if (lifeProgress < 0.15) {

            const fadeInProgress = lifeProgress / 0.15;
            this.mesh.material.opacity = baseOpacity * fadeInProgress;
        } else if (lifeProgress > 0.85) {

            const fadeOutProgress = (lifeProgress - 0.85) / 0.15;
            this.mesh.material.opacity = baseOpacity * (1 - fadeOutProgress);
        } else {

            this.mesh.material.opacity = baseOpacity;
        }
        const halfWidth = window.innerWidth / 2;
        const halfHeight = window.innerHeight / 2;
        if (this.mesh.position.x > halfWidth + 50) this.mesh.position.x = -halfWidth - 50;
        if (this.mesh.position.x < -halfWidth - 50) this.mesh.position.x = halfWidth + 50;
        if (this.mesh.position.y > halfHeight + 50) this.mesh.position.y = -halfHeight - 50;
        if (this.mesh.position.y < -halfHeight - 50) this.mesh.position.y = halfHeight + 50;
        if (this.layer === 'front') {

            if (this.mesh.position.z < 10) {
                this.velocity.z = Math.abs(this.velocity.z);
            }
            if (this.mesh.position.z > 200) {
                this.velocity.z = -Math.abs(this.velocity.z);
            }
        } else {

            if (this.mesh.position.z > -10) {
                this.velocity.z = -Math.abs(this.velocity.z);
            }
            if (this.mesh.position.z < -200) {
                this.velocity.z = Math.abs(this.velocity.z);
            }
        }
        return this.life < this.maxLife;
    }
}
function initAliceBackground() {
    if (!isAliceThemeActive()) {
        return;
    }
    if (aliceContainer) {
        stopAliceBackground();
    }
    aliceContainer = document.createElement('div');
    aliceContainer.id = 'alice-background';
    aliceContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 5;
    `;
    document.body.appendChild(aliceContainer);
    aliceScene = new THREE.Scene();
    aliceCamera = new THREE.OrthographicCamera(
        -window.innerWidth / 2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        -window.innerHeight / 2,
        1,
        1000
    );
    aliceCamera.position.z = 500;
    aliceRenderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    aliceRenderer.setSize(window.innerWidth, window.innerHeight);
    aliceRenderer.setClearColor(0x000000, 0);
    aliceContainer.appendChild(aliceRenderer.domElement);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    aliceScene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(5, 10, 7);
    aliceScene.add(directionalLight);
    const fillLight = new THREE.DirectionalLight(0xffec8b, 0.3);
    fillLight.position.set(-5, -5, 5);
    aliceScene.add(fillLight);
    for (let i = 0; i < 35; i++) {
        spawnAliceParticle('flat-star', 'back');
    }
    for (let i = 0; i < 40; i++) {
        spawnAliceParticle('glitter', 'back');
    }
    for (let i = 0; i < 25; i++) {
        spawnAliceParticle('flat-star', 'front');
    }
    for (let i = 0; i < 30; i++) {
        spawnAliceParticle('glitter', 'front');
    }
    animateAliceBackground();
}
function spawnAliceParticle(type = 'flat-star', layer = 'back') {
    const particle = new AliceFloatingParticle(type, layer);
    aliceParticles.push(particle);
    aliceScene.add(particle.mesh);
}
let lastTime = Date.now();
function animateAliceBackground() {
    aliceAnimationFrame = requestAnimationFrame(animateAliceBackground);
    const now = Date.now();
    const deltaTime = now - lastTime;
    lastTime = now;

    if (isAliceThemeActive()) {
        aliceParticles = aliceParticles.filter(particle => {
            const alive = particle.update(deltaTime);
            if (!alive) {
                aliceScene.remove(particle.mesh);
                particle.mesh.geometry.dispose();
                particle.mesh.material.dispose();
            }
            return alive;
        });
        const backStars = aliceParticles.filter(p => p.type === 'flat-star' && p.layer === 'back').length;
        const frontStars = aliceParticles.filter(p => p.type === 'flat-star' && p.layer === 'front').length;
        const backGlitter = aliceParticles.filter(p => p.type === 'glitter' && p.layer === 'back').length;
        const frontGlitter = aliceParticles.filter(p => p.type === 'glitter' && p.layer === 'front').length;
        if (backStars < 35 && Math.random() < 0.2) {
            spawnAliceParticle('flat-star', 'back');
        }
        if (backGlitter < 40 && Math.random() < 0.2) {
            spawnAliceParticle('glitter', 'back');
        }
        if (frontStars < 25 && Math.random() < 0.2) {
            spawnAliceParticle('flat-star', 'front');
        }
        if (frontGlitter < 30 && Math.random() < 0.2) {
            spawnAliceParticle('glitter', 'front');
        }
    }

    aliceClickBursts = aliceClickBursts.filter(burst => burst.update(deltaTime));

    aliceRenderer.render(aliceScene, aliceCamera);
}
function stopAliceBackground() {
    if (aliceAnimationFrame) {
        cancelAnimationFrame(aliceAnimationFrame);
        aliceAnimationFrame = null;
    }
    if (aliceContainer) {
        aliceContainer.remove();
        aliceContainer = null;
    }
    aliceParticles.forEach(particle => {
        if (particle.mesh) {
            particle.mesh.geometry.dispose();
            particle.mesh.material.dispose();
        }
    });
    aliceParticles = [];
    aliceClickBursts = [];
    if (aliceRenderer) {
        aliceRenderer.dispose();
        aliceRenderer = null;
    }
}
function createFivePointedStarGeometry() {
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const points = 5;
    const outerRadius = 10;
    const innerRadius = 4;
    const centerDepth = 3;
    const frontCenter = [0, 0, centerDepth];
    const backCenter = [0, 0, -centerDepth];
    const starPoints = [];
    for (let i = 0; i < points * 2; i++) {
        const angle = (i * Math.PI) / points - Math.PI / 2;
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        starPoints.push({
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius,
            z: 0
        });
    }

    for (let i = 0; i < starPoints.length; i++) {
        const current = starPoints[i];
        const next = starPoints[(i + 1) % starPoints.length];
        vertices.push(frontCenter[0], frontCenter[1], frontCenter[2]);
        vertices.push(current.x, current.y, current.z);
        vertices.push(next.x, next.y, next.z);
        vertices.push(backCenter[0], backCenter[1], backCenter[2]);
        vertices.push(next.x, next.y, next.z);
        vertices.push(current.x, current.y, current.z);
    }

    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.computeVertexNormals();

    return geometry;
}

class AliceClickBurst {
    constructor(x, y) {
        this.particles = [];

        const defaultConfig = {
            bigStar: { count: 3, upward: 1, gravity: 0.005, scale: 1.25, color: 'gold' },
            hollowStar: { count: 20, upward: 0.7, gravity: 0.0025, scale: 0.7, color: 'colorful' },
            glitter: { count: 27, upward: 1.4, gravity: 0.0025, scale: 0.5, color: 'colorful' },
            global: { horizontalSpread: 1, lifetime: 2000 }
        };

        let config = window.confettiConfig;
        if (!config) {
            try {
                config = JSON.parse(localStorage.getItem('confettiConfig')) || defaultConfig;
            } catch (e) {
                config = defaultConfig;
            }
        }

        const colorPalettes = {
            gold: [0xffd700, 0xffec8b, 0xffc125, 0xffb90f, 0xeec900],
            silver: [0xc0c0c0, 0xd3d3d3, 0xe8e8e8, 0xb0b0b0, 0xa8a8a8],
            colorful: [0xffb3ba, 0xffcc99, 0xb3f0b3, 0xb3d9ff, 0xd9b3ff, 0xffb3d9, 0xffc9e0, 0xffd4e5],
            custom: null
        };

        function getColors(colorType, customColor) {
            if (colorType === 'custom' && customColor) {
                const hex = customColor.replace('#', '');
                return [parseInt(hex, 16)];
            }
            return colorPalettes[colorType] || colorPalettes.colorful;
        }
        const numBigStars = Math.floor(Math.random() * config.bigStar.count) + 1;
        for (let i = 0; i < numBigStars; i++) {
            const angle = Math.random() * Math.PI * 2;
            const horizontalSpeed = (0.75 + Math.random() * 1) * (config.global.horizontalSpread || 1);
            const upwardSpeed = 0.5 + Math.random() * config.bigStar.upward;

            const colors = getColors(config.bigStar.color, config.bigStar.customColor);
            const color = colors[Math.floor(Math.random() * colors.length)];

            const material = new THREE.MeshStandardMaterial({
                color: color,
                transparent: true,
                opacity: 0.9,
                metalness: 0.5,
                roughness: 0.3,
                emissive: color,
                emissiveIntensity: 0.5
            });

            const geometry = createFivePointedStarGeometry();
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = x - window.innerWidth / 2;
            mesh.position.y = window.innerHeight / 2 - y;
            mesh.position.z = 100;

            const scale = 1.0 + Math.random() * (config.bigStar.scale * 0.5);
            mesh.scale.set(scale, scale, scale);

            this.particles.push({
                mesh: mesh,
                velocity: {
                    x: Math.cos(angle) * horizontalSpeed,
                    y: upwardSpeed,
                    z: (Math.random() - 0.5) * 1
                },
                gravity: config.bigStar.gravity,
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.1,
                    y: (Math.random() - 0.5) * 0.1,
                    z: (Math.random() - 0.5) * 0.1
                },
                life: 0,
                maxLife: (config.global.lifetime || 2000) + Math.random() * 1000,
                type: 'big-star'
            });

            aliceScene.add(mesh);
        }

        // Spawn hollow stars
        const numHollowStars = Math.floor(Math.random() * (config.hollowStar.count * 0.25)) + Math.floor(config.hollowStar.count * 0.75);
        for (let i = 0; i < numHollowStars; i++) {
            const angle = Math.random() * Math.PI * 2;
            const horizontalSpeed = (1 + Math.random() * 1.5) * (config.global.horizontalSpread || 1);
            const upwardSpeed = 0.3 + Math.random() * (config.hollowStar.upward * 0.8);

            const colors = getColors(config.hollowStar.color, config.hollowStar.customColor);
            const color = colors[Math.floor(Math.random() * colors.length)];

            const material = new THREE.MeshStandardMaterial({
                color: color,
                transparent: true,
                opacity: 1.0,
                metalness: 0.3,
                roughness: 0.4,
                side: THREE.DoubleSide
            });

            const geometry = createFlatHollowStarGeometry();
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = x - window.innerWidth / 2;
            mesh.position.y = window.innerHeight / 2 - y;
            mesh.position.z = 80 + Math.random() * 40;

            const scale = (0.4 + Math.random() * (config.hollowStar.scale * 0.6)) * 2.0;
            mesh.scale.set(scale, scale, scale);

            this.particles.push({
                mesh: mesh,
                velocity: {
                    x: Math.cos(angle) * horizontalSpeed,
                    y: upwardSpeed,
                    z: (Math.random() - 0.5) * 2
                },
                gravity: config.hollowStar.gravity,
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.15,
                    y: (Math.random() - 0.5) * 0.15,
                    z: (Math.random() - 0.5) * 0.15
                },
                life: 0,
                maxLife: (config.global.lifetime || 2000) * 0.75 + Math.random() * 800,
                type: 'hollow-star'
            });

            aliceScene.add(mesh);
        }

        // Spawn glitter particles
        const numGlitter = Math.floor(Math.random() * (config.glitter.count * 0.26)) + Math.floor(config.glitter.count * 0.74);
        for (let i = 0; i < numGlitter; i++) {
            const angle = Math.random() * Math.PI * 2;
            const horizontalSpeed = (1.25 + Math.random() * 1.75) * (config.global.horizontalSpread || 1);
            const upwardSpeed = 0.8 + Math.random() * (config.glitter.upward * 1.2);

            const colors = getColors(config.glitter.color, config.glitter.customColor);
            const color = colors[Math.floor(Math.random() * colors.length)];

            // Use MeshStandardMaterial with metallic/emissive for sparkle shader effect
            const material = new THREE.MeshStandardMaterial({
                color: color,
                transparent: true,
                opacity: 0.8,
                metalness: 0.6,
                roughness: 0.2,
                emissive: color,
                emissiveIntensity: 0.4,
                side: THREE.DoubleSide
            });

            const geometry = createGlitterGeometry();
            const mesh = new THREE.Mesh(geometry, material);

            mesh.position.x = x - window.innerWidth / 2;
            mesh.position.y = window.innerHeight / 2 - y;
            mesh.position.z = 90 + Math.random() * 20;

            const scale = (0.3 + Math.random() * (config.glitter.scale * 0.4)) * 2.0;
            mesh.scale.set(scale, scale, scale);

            this.particles.push({
                mesh: mesh,
                velocity: {
                    x: Math.cos(angle) * horizontalSpeed,
                    y: upwardSpeed,
                    z: (Math.random() - 0.5) * 2.5
                },
                gravity: config.glitter.gravity,
                baseEmissive: 0.4,
                rotationSpeed: {
                    x: (Math.random() - 0.5) * 0.2,
                    y: (Math.random() - 0.5) * 0.2,
                    z: (Math.random() - 0.5) * 0.2
                },
                life: 0,
                maxLife: (config.global.lifetime || 2000) * 0.6 + Math.random() * 600,
                type: 'glitter'
            });

            aliceScene.add(mesh);
        }
    }

    update(deltaTime) {
        let allDead = true;

        this.particles.forEach(particle => {
            particle.life += deltaTime;

            if (particle.life < particle.maxLife) {
                allDead = false;

                particle.velocity.y -= particle.gravity * deltaTime;
                particle.mesh.position.x += particle.velocity.x;
                particle.mesh.position.y += particle.velocity.y;
                particle.mesh.position.z += particle.velocity.z;

                particle.mesh.rotation.x += particle.rotationSpeed.x;
                particle.mesh.rotation.y += particle.rotationSpeed.y;
                particle.mesh.rotation.z += particle.rotationSpeed.z;

                const lifeProgress = particle.life / particle.maxLife;
                const baseOpacity = particle.type === 'big-star' ? 0.9 : (particle.type === 'hollow-star' ? 0.7 : 0.8);

                if (lifeProgress > 0.7) {
                    const fadeProgress = (lifeProgress - 0.7) / 0.3;
                    particle.mesh.material.opacity = baseOpacity * (1 - fadeProgress);
                }

                if (particle.type === 'glitter' && particle.baseEmissive !== undefined) {
                    const sparkleSpeed = 0.003;
                    const sparkle = Math.sin(particle.life * sparkleSpeed) * 0.3 + 0.7;
                    particle.mesh.material.emissiveIntensity = particle.baseEmissive * sparkle;
                }
            } else {
                aliceScene.remove(particle.mesh);
                particle.mesh.geometry.dispose();
                particle.mesh.material.dispose();
            }
        });

        return !allDead;
    }
}

let aliceClickBursts = [];

document.addEventListener('click', (e) => {
    if (!aliceScene && !isAliceThemeActive()) {
        initAliceBackground();
    }
    const burst = new AliceClickBurst(e.clientX, e.clientY);
    aliceClickBursts.push(burst);
});

window.addEventListener('resize', () => {
    if (aliceRenderer) {
        aliceCamera.left = -window.innerWidth / 2;
        aliceCamera.right = window.innerWidth / 2;
        aliceCamera.top = window.innerHeight / 2;
        aliceCamera.bottom = -window.innerHeight / 2;
        aliceCamera.updateProjectionMatrix();
        aliceRenderer.setSize(window.innerWidth, window.innerHeight);
    }
});
window.addEventListener('storage', (e) => {
    if (e.key === 'selectedTheme') {
        if (e.newValue === 'alice') {
            initAliceBackground();
        } else {
            stopAliceBackground();
        }
    }
});
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initAliceBackground, 500);
    });
} else {
    setTimeout(initAliceBackground, 500);
}