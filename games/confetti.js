let scene, camera, renderer, particles = [];
function initThreeJS() {

    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(
        window.innerWidth / -2,
        window.innerWidth / 2,
        window.innerHeight / 2,
        window.innerHeight / -2,
        0.1,
        1000
    );
    camera.position.z = 100;
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.domElement.style.position = 'fixed';
    renderer.domElement.style.top = '0';
    renderer.domElement.style.left = '0';
    renderer.domElement.style.pointerEvents = 'none';
    renderer.domElement.style.zIndex = '1';
    renderer.domElement.id = 'confetti-canvas';
    document.body.appendChild(renderer.domElement);
    const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
    light1.position.set(100, 100, 100);
    scene.add(light1);
    const light2 = new THREE.DirectionalLight(0xffffff, 0.4);
    light2.position.set(-100, -100, -100);
    scene.add(light2);
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    window.addEventListener('resize', () => {
        camera.left = window.innerWidth / -2;
        camera.right = window.innerWidth / 2;
        camera.top = window.innerHeight / 2;
        camera.bottom = window.innerHeight / -2;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });
}
function createStarGeometry() {
    const geometry = new THREE.BufferGeometry();
    const outerRadius = 15;
    const innerRadius = 6;
    const height = 8;
    const points = 5;
    const vertices = [];
    const indices = [];
    const topCenter = [0, height, 0];
    const bottomCenter = [0, -height, 0];
    vertices.push(...topCenter, ...bottomCenter);
    for (let i = 0; i < points; i++) {
        const angle = (i * 2 * Math.PI) / points - Math.PI / 2;
        const outerX = Math.cos(angle) * outerRadius;
        const outerZ = Math.sin(angle) * outerRadius;
        vertices.push(outerX, 0, outerZ);
        const innerAngle = angle + Math.PI / points;
        const innerX = Math.cos(innerAngle) * innerRadius;
        const innerZ = Math.sin(innerAngle) * innerRadius;
        vertices.push(innerX, 0, innerZ);
    }
    const topIdx = 0;
    const bottomIdx = 1;
    for (let i = 0; i < points; i++) {
        const outerIdx = 2 + i * 2;
        const innerIdx = 2 + i * 2 + 1;
        const nextOuterIdx = 2 + ((i + 1) % points) * 2;
        indices.push(topIdx, outerIdx, innerIdx);
        indices.push(topIdx, innerIdx, nextOuterIdx);
        indices.push(bottomIdx, innerIdx, outerIdx);
        indices.push(bottomIdx, nextOuterIdx, innerIdx);
    }
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
    geometry.setIndex(indices);
    geometry.computeVertexNormals();
    return geometry;
}
function createGlitterGeometry() {
    return new THREE.OctahedronGeometry(5 / 6, 0);
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
class Particle3D {
    constructor(x, y, type, rainbowMode = false) {

        let geometry;
        if (type === 'star') {
            geometry = createStarGeometry();
        } else if (type === 'flat-star') {
            geometry = createFlatHollowStarGeometry();
        } else {
            geometry = createGlitterGeometry();
        }
        const pastelColors = [
            0xffb3ba,
            0xffcc99,
            0xb3f0b3,
            0xb3d9ff,
            0xd9b3ff
        ];
        const rainbowColors = [0xff0080, 0x00ffff, 0xffff00, 0xff00ff, 0x00ff00, 0xff6600];
        let color;
        if (type === 'flat-star') {

            color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        } else if (rainbowMode) {

            color = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
        } else {

            color = (type === 'star' ? 0xFFD700 : 0xFFED4E);
        }
        const material = new THREE.MeshPhongMaterial({
            color: color,
            emissive: rainbowMode ? color : 0xFFA500,
            emissiveIntensity: rainbowMode ? 0.5 : 0.3,
            shininess: 100,
            specular: 0xFFFFFF,
            side: THREE.DoubleSide
        });
        this.mesh = new THREE.Mesh(geometry, material);
        this.rainbowMode = rainbowMode;
        this.hueShift = 0;
        this.mesh.position.x = x - window.innerWidth / 2;
        this.mesh.position.y = -(y - window.innerHeight / 2);
        this.mesh.position.z = 0;
        scene.add(this.mesh);
        const angle = Math.random() * Math.PI * 2;
        if (rainbowMode) {

            const driftSpeed = Math.random() * 0.1 + 0.05;
            this.vx = (Math.random() - 0.5) * driftSpeed;
            this.vy = (Math.random() - 0.3) * driftSpeed;
        } else {

            const speed = (type === 'star' ? 1.5 : 1.2) + Math.random() * 1;
            this.vx = Math.cos(angle) * speed;
            this.vy = Math.abs(Math.sin(angle) * speed) + (type === 'star' ? 2 : 1.5);
        }
        this.opacity = rainbowMode ? 0.4 : 1;
        this.type = type;
        this.rainbowMode = rainbowMode;
        this.age = 0;
        this.rotationSpeed = {
            x: (Math.random() - 0.5) * 0.15,
            y: (Math.random() - 0.5) * 0.15,
            z: (Math.random() - 0.5) * 0.15
        };
    }
    update() {

        if (this.rainbowMode) {
            this.vy -= 0.01;
        } else {
            this.vy -= 0.08;
        }
        this.vx *= 0.98;
        const velocityCapFrame = 78;
        if (this.age >= velocityCapFrame) {
            const maxSpeed = 3;
            const currentSpeed = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
            if (currentSpeed > maxSpeed) {
                this.vx = (this.vx / currentSpeed) * maxSpeed;
                this.vy = (this.vy / currentSpeed) * maxSpeed;
            }
        }
        this.mesh.position.x += this.vx;
        this.mesh.position.y += this.vy;
        this.age++;
        const fadeStartFrame = 60;
        const fadeEndFrame = 120;
        if (this.age > fadeStartFrame) {
            const fadeDuration = fadeEndFrame - fadeStartFrame;
            const fadeProgress = (this.age - fadeStartFrame) / fadeDuration;
            const startOpacity = this.rainbowMode ? 0.4 : 1;
            this.opacity = startOpacity * (1 - fadeProgress);
        }
        this.mesh.rotation.x += this.rotationSpeed.x;
        this.mesh.rotation.y += this.rotationSpeed.y;
        this.mesh.rotation.z += this.rotationSpeed.z;
        if (this.rainbowMode) {
            this.hueShift += 0.02;
            const hue = (this.hueShift % 1);
            const rgb = this.hslToRgb(hue, 1, 0.5);
            this.mesh.material.color.setRGB(rgb.r, rgb.g, rgb.b);
            this.mesh.material.emissive.setRGB(rgb.r * 0.8, rgb.g * 0.8, rgb.b * 0.8);
        }
        this.mesh.material.opacity = this.opacity;
        this.mesh.material.transparent = true;
        return this.opacity > 0;
    }
    hslToRgb(h, s, l) {
        let r, g, b;
        if (s === 0) {
            r = g = b = l;
        } else {
            const hue2rgb = (p, q, t) => {
                if (t < 0) t += 1;
                if (t > 1) t -= 1;
                if (t < 1/6) return p + (q - p) * 6 * t;
                if (t < 1/2) return q;
                if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
                return p;
            };
            const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
            const p = 2 * l - q;
            r = hue2rgb(p, q, h + 1/3);
            g = hue2rgb(p, q, h);
            b = hue2rgb(p, q, h - 1/3);
        }
        return { r, g, b };
    }
    destroy() {
        scene.remove(this.mesh);
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
    }
}
function createConfetti(x, y, rainbowMode = false) {
    const starCount = rainbowMode ? 2 : (3 + Math.floor(Math.random() * 3));
    const flatStarCount = rainbowMode ? 10 : 25;
    const glitterCount = rainbowMode ? 4 : 20;
    for (let i = 0; i < starCount; i++) {
        const offsetX = rainbowMode ? x + (Math.random() - 0.5) * 200 : x;
        const offsetY = rainbowMode ? y + (Math.random() - 0.5) * 200 : y;
        particles.push(new Particle3D(offsetX, offsetY, 'star', rainbowMode));
    }
    for (let i = 0; i < flatStarCount; i++) {
        const offsetX = rainbowMode ? x + (Math.random() - 0.5) * 200 : x;
        const offsetY = rainbowMode ? y + (Math.random() - 0.5) * 200 : y;
        particles.push(new Particle3D(offsetX, offsetY, 'flat-star', rainbowMode));
    }
    for (let i = 0; i < glitterCount; i++) {
        const offsetX = rainbowMode ? x + (Math.random() - 0.5) * 200 : x;
        const offsetY = rainbowMode ? y + (Math.random() - 0.5) * 200 : y;
        particles.push(new Particle3D(offsetX, offsetY, 'glitter', rainbowMode));
    }
}
let partyModeInterval = null;
window.startPartyMode = function() {
    if (partyModeInterval) return;
    partyModeInterval = setInterval(() => {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        createConfetti(x, y, true);
    }, 150);
};
window.stopPartyMode = function() {
    if (partyModeInterval) {
        clearInterval(partyModeInterval);
        partyModeInterval = null;
    }
};
function animate() {
    requestAnimationFrame(animate);
    particles = particles.filter(particle => {
        const alive = particle.update();
        if (!alive) {
            particle.destroy();
        }
        return alive;
    });
    renderer.render(scene, camera);
}
window.sparklesEnabled = true;
function initializeConfettiHandlers() {
    console.log(' Initializing THREE.js volumetric sparkle clicks! ');
    document.addEventListener('click', (e) => {
        if (window.sparklesEnabled) {
            createConfetti(e.clientX, e.clientY);
        }
    });
    console.log(' Volumetric 3D sparkles enabled on all clicks! ');
}
initThreeJS();
animate();
initializeConfettiHandlers();