class WaterGame {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;
        this.setupScene();
        this.score = 0;
        this.items = [];
        this.posts = [];
        this.jetActive = false;
        this.jetParticles = [];
        this.gravity = 0.02;
        this.buoyancy = 0.015;
        this.waterDrag = 0.97;
        this.maxJetForce = 0.8;
        this.time = 0;
        this.leftJetActive = false;
        this.rightJetActive = false;
        this.leftJetStrength = 0;
        this.rightJetStrength = 0;
        this.jetRampSpeed = 0.04;
        this.createPosts();
        this.createItems();
        this.setupInput();
        this.createJetButtons();
    }
    setupScene() {

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            70,
            this.canvas.width / this.canvas.height,
            0.1,
            1000
        );
        this.camera.position.set(0, -2, 35);
        this.camera.lookAt(0, -2, 0);
        this.threeCanvas = document.createElement('canvas');
        this.threeCanvas.width = this.canvas.width;
        this.threeCanvas.height = this.canvas.height;
        this.threeCanvas.style.position = 'absolute';
        this.threeCanvas.style.top = '0';
        this.threeCanvas.style.left = '0';
        this.threeCanvas.style.width = '100%';
        this.threeCanvas.style.height = '100%';
        this.threeCanvas.style.pointerEvents = 'none';
        this.canvas.parentElement.insertBefore(this.threeCanvas, this.canvas);
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.threeCanvas,
            alpha: true,
            antialias: true
        });
        this.renderer.setSize(this.canvas.width, this.canvas.height);
        this.renderer.setClearColor(0x87ceeb, 0.3);
        const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
        this.scene.add(ambientLight);
        const light1 = new THREE.DirectionalLight(0xffffff, 0.8);
        light1.position.set(10, 10, 10);
        this.scene.add(light1);
        const light2 = new THREE.DirectionalLight(0xffffff, 0.4);
        light2.position.set(-10, -10, -10);
        this.scene.add(light2);
        this.createContainer();
    }
    createContainer() {

        const wallGeometry = new THREE.PlaneGeometry(25, 30);
        const wallMaterial = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.1,
            side: THREE.DoubleSide
        });
        const frontWall = new THREE.Mesh(wallGeometry, wallMaterial);
        frontWall.position.z = 5;
        this.scene.add(frontWall);
        const backWall = new THREE.Mesh(wallGeometry, wallMaterial);
        backWall.position.z = -5;
        this.scene.add(backWall);
        const sideGeometry = new THREE.PlaneGeometry(10, 30);
        const leftWall = new THREE.Mesh(sideGeometry, wallMaterial);
        leftWall.rotation.y = Math.PI / 2;
        leftWall.position.x = -12.5;
        this.scene.add(leftWall);
        const rightWall = new THREE.Mesh(sideGeometry, wallMaterial);
        rightWall.rotation.y = Math.PI / 2;
        rightWall.position.x = 12.5;
        this.scene.add(rightWall);
        const bottomGeometry = new THREE.PlaneGeometry(25, 10);
        const bottomMaterial = new THREE.MeshPhongMaterial({
            color: 0xff6b6b,
            side: THREE.DoubleSide
        });
        const bottom = new THREE.Mesh(bottomGeometry, bottomMaterial);
        bottom.rotation.x = Math.PI / 2;
        bottom.position.y = -15;
        this.scene.add(bottom);
    }
    createPosts() {

        const postGeometry = new THREE.CylinderGeometry(0.3, 0.3, 8, 16);
        const postMaterial = new THREE.MeshPhongMaterial({ color: 0xffffff });
        const positions = [-5, 5];
        positions.forEach(x => {
            const post = new THREE.Mesh(postGeometry, postMaterial);
            post.position.set(x, -11, 0);
            this.scene.add(post);
            this.posts.push({
                mesh: post,
                x: x,
                y: -7,
                radius: 0.5
            });
        });
    }
    createItems() {

        const pastelColors = [
            0xffb3ba,
            0xffcc99,
            0xb3f0b3,
            0xb3d9ff,
            0xd9b3ff
        ];
        for (let i = 0; i < 3; i++) {
            const ringGeometry = new THREE.TorusGeometry(1.2, 0.3, 16, 32);
            const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
            const ringMaterial = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.3
            });
            const ring = new THREE.Mesh(ringGeometry, ringMaterial);
            const nearPost = Math.random() < 0.5 ? -5 : 5;
            ring.position.set(
                nearPost + (Math.random() - 0.5) * 4,
                -12 + Math.random() * 2,
                (Math.random() - 0.5) * 4
            );
            ring.rotation.set(
                (Math.random() - 0.5) * 0.3,
                Math.random() * Math.PI * 2,
                (Math.random() - 0.5) * 0.3
            );
            this.scene.add(ring);
            this.items.push({
                mesh: ring,
                vx: 0,
                vy: 0,
                vz: 0,
                angularVel: {
                    x: (Math.random() - 0.5) * 0.02,
                    y: (Math.random() - 0.5) * 0.02,
                    z: (Math.random() - 0.5) * 0.02
                },
                type: 'ring',
                innerRadius: 1.2,
                outerRadius: 1.5,
                thickness: 0.3,
                onPost: false,
                postIndex: -1,
                stackHeight: 0,
                scored: false
            });
        }
        for (let i = 0; i < 8; i++) {
            const starGeometry = this.createFlatHollowStar();
            const color = pastelColors[Math.floor(Math.random() * pastelColors.length)];
            const starMaterial = new THREE.MeshPhongMaterial({
                color: color,
                emissive: color,
                emissiveIntensity: 0.4,
                side: THREE.DoubleSide
            });
            const star = new THREE.Mesh(starGeometry, starMaterial);
            const nearPost = Math.random() < 0.5 ? -5 : 5;
            star.position.set(
                nearPost + (Math.random() - 0.5) * 4,
                -12 + Math.random() * 2,
                (Math.random() - 0.5) * 4
            );
            star.rotation.set(
                (Math.random() - 0.5) * 0.3,
                Math.random() * Math.PI * 2,
                (Math.random() - 0.5) * 0.3
            );
            const scale = 0.3 + Math.random() * 0.2;
            star.scale.set(scale, scale, scale);
            this.scene.add(star);
            this.items.push({
                mesh: star,
                vx: 0,
                vy: 0,
                vz: 0,
                angularVel: {
                    x: (Math.random() - 0.5) * 0.05,
                    y: (Math.random() - 0.5) * 0.05,
                    z: (Math.random() - 0.5) * 0.05
                },
                type: 'star',
                radius: scale * 4,
                thickness: scale * 0.3,
                onPost: false,
                postIndex: -1,
                stackHeight: 0,
                scored: false
            });
        }
    }
    createFlatHollowStar() {
        const shape = new THREE.Shape();
        const outerRadius = 4;
        const innerRadius = 1.5;
        const points = 5;
        for (let i = 0; i <= points * 2; i++) {
            const angle = (i * Math.PI) / points - Math.PI / 2;
            const radius = i % 2 === 0 ? outerRadius : innerRadius;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) shape.moveTo(x, y);
            else shape.lineTo(x, y);
        }
        shape.closePath();
        const hole = new THREE.Path();
        const holeScale = 0.6;
        for (let i = 0; i <= points * 2; i++) {
            const angle = (i * Math.PI) / points - Math.PI / 2;
            const radius = (i % 2 === 0 ? outerRadius : innerRadius) * holeScale;
            const x = Math.cos(angle) * radius;
            const y = Math.sin(angle) * radius;
            if (i === 0) hole.moveTo(x, y);
            else hole.lineTo(x, y);
        }
        hole.closePath();
        shape.holes.push(hole);
        return new THREE.ExtrudeGeometry(shape, { depth: 0.3, bevelEnabled: false });
    }
    setupInput() {

        this.keyHandler = (e) => {
            if (e.code === 'KeyQ' || e.code === 'KeyA') {
                e.preventDefault();
                this.leftJetActive = true;
            }
            if (e.code === 'KeyP' || e.code === 'KeyL') {
                e.preventDefault();
                this.rightJetActive = true;
            }
        };
        this.keyUpHandler = (e) => {
            if (e.code === 'KeyQ' || e.code === 'KeyA') {
                this.leftJetActive = false;
            }
            if (e.code === 'KeyP' || e.code === 'KeyL') {
                this.rightJetActive = false;
            }
        };
        document.addEventListener('keydown', this.keyHandler);
        document.addEventListener('keyup', this.keyUpHandler);
    }
    createJetButtons() {

        this.leftJetButton = document.createElement('button');
        this.leftJetButton.textContent = 'Left Jet';
        this.leftJetButton.style.cssText = `
            position: absolute;
            bottom: 20px;
            left: 20%;
            padding: 20px 40px;
            background: var(--accent-blue);
            border: 2px solid var(--border-color);
            border-radius: 8px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            z-index: 100;
            user-select: none;
        `;
        this.leftJetButton.addEventListener('mousedown', () => {
            this.leftJetActive = true;
        });
        this.leftJetButton.addEventListener('mouseup', () => {
            this.leftJetActive = false;
        });
        this.leftJetButton.addEventListener('mouseleave', () => {
            this.leftJetActive = false;
        });
        this.leftJetButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.leftJetActive = true;
        });
        this.leftJetButton.addEventListener('touchend', () => {
            this.leftJetActive = false;
        });
        this.rightJetButton = document.createElement('button');
        this.rightJetButton.textContent = 'Right Jet';
        this.rightJetButton.style.cssText = `
            position: absolute;
            bottom: 20px;
            right: 20%;
            padding: 20px 40px;
            background: var(--accent-purple);
            border: 2px solid var(--border-color);
            border-radius: 8px;
            color: white;
            font-size: 18px;
            font-weight: bold;
            cursor: pointer;
            z-index: 100;
            user-select: none;
        `;
        this.rightJetButton.addEventListener('mousedown', () => {
            this.rightJetActive = true;
        });
        this.rightJetButton.addEventListener('mouseup', () => {
            this.rightJetActive = false;
        });
        this.rightJetButton.addEventListener('mouseleave', () => {
            this.rightJetActive = false;
        });
        this.rightJetButton.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.rightJetActive = true;
        });
        this.rightJetButton.addEventListener('touchend', () => {
            this.rightJetActive = false;
        });
        this.canvas.parentElement.appendChild(this.leftJetButton);
        this.canvas.parentElement.appendChild(this.rightJetButton);
    }
    updatePhysics() {
        this.time += 0.016;
        if (this.leftJetActive) {
            this.leftJetStrength = Math.min(1, this.leftJetStrength + this.jetRampSpeed);
        } else {
            this.leftJetStrength = Math.max(0, this.leftJetStrength - this.jetRampSpeed * 2);
        }
        if (this.rightJetActive) {
            this.rightJetStrength = Math.min(1, this.rightJetStrength + this.jetRampSpeed);
        } else {
            this.rightJetStrength = Math.max(0, this.rightJetStrength - this.jetRampSpeed * 2);
        }
        this.items.forEach(item => {
            if (item.scored) return;
            item.vy += this.buoyancy;
            item.vy -= this.gravity;
            if (this.leftJetStrength > 0) {
                const jetX = this.posts[0].x;
                const jetY = -12;
                const dx = item.mesh.position.x - jetX;
                const dy = item.mesh.position.y - jetY;
                const dz = item.mesh.position.z;
                const horizontalDist = Math.sqrt(dx * dx + dz * dz);
                const coneRadius = 6.0 + Math.max(0, dy) * 0.5;
                if (horizontalDist < coneRadius && dy >= 0 && dy < 18) {

                    const distanceFactor = Math.max(0, 1 - (horizontalDist / coneRadius));
                    const heightFactor = Math.max(0, 1 - (dy / 18));
                    const jetForce = this.maxJetForce * this.leftJetStrength * distanceFactor * heightFactor;
                    item.vy += jetForce * 2.0;
                    const circulationStrength = this.leftJetStrength * 0.15;
                    item.vx += dz * circulationStrength * heightFactor;
                    item.vz += -dx * circulationStrength * heightFactor * 0.5;
                    if (dy > 2) {
                        const outwardPush = (dy / 18) * this.leftJetStrength * 0.2;
                        if (horizontalDist > 0.1) {
                            item.vx += (dx / horizontalDist) * outwardPush;
                            item.vz += (dz / horizontalDist) * outwardPush;
                        }
                    }
                    const turbulence = 0.03 + jetForce * 0.2;
                    item.vx += (Math.random() - 0.5) * turbulence;
                    item.vz += (Math.random() - 0.5) * turbulence;
                    item.vy += (Math.random() - 0.5) * turbulence * 0.6;
                    const rotationalTurbulence = 0.02 + jetForce * 0.15;
                    item.angularVel.x += (Math.random() - 0.5) * rotationalTurbulence;
                    item.angularVel.y += (Math.random() - 0.5) * rotationalTurbulence;
                    item.angularVel.z += (Math.random() - 0.5) * rotationalTurbulence;
                    const vortexStrength = jetForce * distanceFactor * 0.12;
                    item.angularVel.y += vortexStrength;
                }
            }
            if (this.rightJetStrength > 0) {
                const jetX = this.posts[1].x;
                const jetY = -12;
                const dx = item.mesh.position.x - jetX;
                const dy = item.mesh.position.y - jetY;
                const dz = item.mesh.position.z;
                const horizontalDist = Math.sqrt(dx * dx + dz * dz);
                const coneRadius = 6.0 + Math.max(0, dy) * 0.5;
                if (horizontalDist < coneRadius && dy >= 0 && dy < 18) {

                    const distanceFactor = Math.max(0, 1 - (horizontalDist / coneRadius));
                    const heightFactor = Math.max(0, 1 - (dy / 18));
                    const jetForce = this.maxJetForce * this.rightJetStrength * distanceFactor * heightFactor;
                    item.vy += jetForce * 2.0;
                    const circulationStrength = this.rightJetStrength * 0.15;
                    item.vx += dz * circulationStrength * heightFactor;
                    item.vz += -dx * circulationStrength * heightFactor * 0.5;
                    if (dy > 2) {
                        const outwardPush = (dy / 18) * this.rightJetStrength * 0.2;
                        if (horizontalDist > 0.1) {
                            item.vx += (dx / horizontalDist) * outwardPush;
                            item.vz += (dz / horizontalDist) * outwardPush;
                        }
                    }
                    const turbulence = 0.03 + jetForce * 0.2;
                    item.vx += (Math.random() - 0.5) * turbulence;
                    item.vz += (Math.random() - 0.5) * turbulence;
                    item.vy += (Math.random() - 0.5) * turbulence * 0.6;
                    const rotationalTurbulence = 0.02 + jetForce * 0.15;
                    item.angularVel.x += (Math.random() - 0.5) * rotationalTurbulence;
                    item.angularVel.y += (Math.random() - 0.5) * rotationalTurbulence;
                    item.angularVel.z += (Math.random() - 0.5) * rotationalTurbulence;
                    const vortexStrength = jetForce * distanceFactor * 0.12;
                    item.angularVel.y += vortexStrength;
                }
            }
            item.vx *= this.waterDrag;
            item.vy *= this.waterDrag;
            item.vz *= this.waterDrag;
            item.angularVel.x *= 0.98;
            item.angularVel.y *= 0.98;
            item.angularVel.z *= 0.98;
            const rotX = item.mesh.rotation.x;
            const rotZ = item.mesh.rotation.z;
            let targetX = rotX;
            let targetZ = rotZ;
            while (targetX > Math.PI) targetX -= Math.PI * 2;
            while (targetX < -Math.PI) targetX += Math.PI * 2;
            while (targetZ > Math.PI) targetZ -= Math.PI * 2;
            while (targetZ < -Math.PI) targetZ += Math.PI * 2;
            const restoreStrength = 0.03;
            item.angularVel.x -= targetX * restoreStrength;
            item.angularVel.z -= targetZ * restoreStrength;
            item.mesh.position.x += item.vx;
            item.mesh.position.y += item.vy;
            item.mesh.position.z += item.vz;
            item.mesh.rotation.x += item.angularVel.x;
            item.mesh.rotation.y += item.angularVel.y;
            item.mesh.rotation.z += item.angularVel.z;
            if (Math.abs(item.mesh.position.x) > 11) {
                item.vx *= -0.4;
                item.mesh.position.x = Math.sign(item.mesh.position.x) * 11;
            }
            if (Math.abs(item.mesh.position.z) > 4) {
                item.vz *= -0.4;
                item.mesh.position.z = Math.sign(item.mesh.position.z) * 4;
            }
            if (item.mesh.position.y < -12) {
                item.mesh.position.y = -12;
                if (item.vy < -0.02) {
                    item.vy *= -0.3;
                } else if (item.vy < 0) {
                    item.vy = 0;
                }
                item.vx *= 0.90;
                item.vz *= 0.90;
                const flattenForce = 0.35;
                let floorRotX = item.mesh.rotation.x % (Math.PI * 2);
                let floorRotZ = item.mesh.rotation.z % (Math.PI * 2);
                let normFloorX = floorRotX > Math.PI ? floorRotX - Math.PI * 2 : floorRotX;
                let normFloorZ = floorRotZ > Math.PI ? floorRotZ - Math.PI * 2 : floorRotZ;
                item.angularVel.x -= normFloorX * flattenForce;
                item.angularVel.z -= normFloorZ * flattenForce;
                item.angularVel.x *= 0.85;
                item.angularVel.y *= 0.94;
                item.angularVel.z *= 0.85;
            }
            if (item.mesh.position.y > 12) {
                item.vy *= -0.4;
                item.mesh.position.y = 12;
            }
        });
        this.checkCollisions();
    }
    checkCollisions() {

        for (let i = 0; i < this.items.length; i++) {
            const item1 = this.items[i];
            if (item1.scored) continue;
            for (let j = i + 1; j < this.items.length; j++) {
                const item2 = this.items[j];
                if (item2.scored) continue;
                const dx = item1.mesh.position.x - item2.mesh.position.x;
                const dy = item1.mesh.position.y - item2.mesh.position.y;
                const dz = item1.mesh.position.z - item2.mesh.position.z;
                const horizontalDist = Math.sqrt(dx * dx + dz * dz);
                const r1 = item1.type === 'ring' ? 0.8 : (item1.radius || 0.5);
                const r2 = item2.type === 'ring' ? 0.8 : (item2.radius || 0.5);
                if (horizontalDist < (r1 + r2) * 0.7 && Math.abs(dy) < 0.8) {

                    const overlap = (r1 + r2) * 0.7 - horizontalDist;
                    if (overlap > 0 && horizontalDist > 0.01) {
                        const pushStrength = overlap * 0.3;
                        const nx = dx / horizontalDist;
                        const nz = dz / horizontalDist;
                        item1.mesh.position.x += nx * pushStrength * 0.5;
                        item1.mesh.position.z += nz * pushStrength * 0.5;
                        item2.mesh.position.x -= nx * pushStrength * 0.5;
                        item2.mesh.position.z -= nz * pushStrength * 0.5;
                        item1.vx += nx * 0.03;
                        item1.vz += nz * 0.03;
                        item2.vx -= nx * 0.03;
                        item2.vz -= nz * 0.03;
                    }
                }
            }
        }
        this.items.forEach(item => {
            if (item.scored) return;
            this.posts.forEach((post, postIndex) => {
                const dx = item.mesh.position.x - post.x;
                const dz = item.mesh.position.z - 0;
                const horizontalDist = Math.sqrt(dx * dx + dz * dz);
                const postBottom = -11;
                const postTop = post.y;
                const postRadius = post.radius;
                if (item.type === 'ring') {

                    const itemsOnPost = this.items.filter(i => i.scored && i.postIndex === postIndex);
                    const stackY = postTop + itemsOnPost.length * 0.6;
                    const rotX = item.mesh.rotation.x % (Math.PI * 2);
                    const rotZ = item.mesh.rotation.z % (Math.PI * 2);
                    const tiltX = Math.abs(Math.sin(rotX));
                    const tiltZ = Math.abs(Math.sin(rotZ));
                    const isFlat = (tiltX < 0.5 && tiltZ < 0.5);
                    const holeIsOverPost = horizontalDist < item.innerRadius * 0.9;
                    const inPostRange = item.mesh.position.y > postBottom && item.mesh.position.y < stackY + 2.0;
                    if (isFlat && holeIsOverPost && inPostRange) {

                        if (Math.abs(item.vy) < 0.6 && item.mesh.position.y < stackY + 1.0) {

                            item.scored = true;
                            item.onPost = true;
                            item.postIndex = postIndex;
                            item.vx = 0;
                            item.vy = 0;
                            item.vz = 0;
                            item.angularVel = { x: 0, y: 0.01, z: 0 };
                            item.mesh.position.x = post.x;
                            item.mesh.position.y = stackY;
                            item.mesh.position.z = 0;
                            item.mesh.rotation.x = 0;
                            item.mesh.rotation.z = 0;
                            this.score += 100;
                        }
                    } else if (horizontalDist < postRadius + 0.4 && inPostRange) {

                        const pushDist = postRadius + 0.4;
                        if (horizontalDist > 0.001) {
                            item.mesh.position.x = post.x + (dx / horizontalDist) * pushDist;
                            item.mesh.position.z = (dz / horizontalDist) * pushDist;
                            item.vx += (dx / horizontalDist) * 0.15;
                            item.vz += (dz / horizontalDist) * 0.15;
                        }
                        item.vy *= 0.7;
                    }
                } else if (item.type === 'star') {

                    const itemsOnPost = this.items.filter(i => i.scored && i.postIndex === postIndex);
                    let landingY = postTop;
                    if (itemsOnPost.length > 0) {
                        const topItem = itemsOnPost[itemsOnPost.length - 1];
                        landingY = topItem.mesh.position.y + 0.5;
                    }
                    if (horizontalDist < postRadius + item.radius) {

                        if (item.mesh.position.y < landingY + 0.8 && item.mesh.position.y > landingY - 0.5) {

                            if (horizontalDist < 0.9 && Math.abs(item.vy) < 0.25) {

                                item.scored = true;
                                item.onPost = true;
                                item.postIndex = postIndex;
                                item.stackHeight = itemsOnPost.length;
                                item.vx = 0;
                                item.vy = 0;
                                item.vz = 0;
                                item.angularVel = { x: 0, y: 0.02, z: 0 };
                                item.mesh.position.x = post.x;
                                item.mesh.position.y = landingY;
                                item.mesh.position.z = 0;
                                this.score += 50;
                            } else {

                                const pushForce = 0.1;
                                item.vx += (dx / horizontalDist) * pushForce;
                                item.vz += (dz / horizontalDist) * pushForce;
                            }
                        } else if (item.mesh.position.y > landingY + 0.8) {

                            if (horizontalDist < postRadius + 0.2) {
                                const pushDist = postRadius + 0.2;
                                item.mesh.position.x = post.x + (dx / horizontalDist) * pushDist;
                                item.mesh.position.z = (dz / horizontalDist) * pushDist;
                                item.vx += (dx / horizontalDist) * 0.08;
                                item.vz += (dz / horizontalDist) * 0.08;
                            }
                        }
                    }
                }
            });
        });
    }
    update() {
        this.updatePhysics();
    }
    draw() {

        this.renderer.render(this.scene, this.camera);
        this.ctx.save();
        this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
        this.ctx.font = 'bold 30px monospace';
        this.ctx.textAlign = 'left';
        this.ctx.fillText(`Score: ${this.score}`, 20, 50);
        this.ctx.font = '16px monospace';
        this.ctx.fillText('Q/A or Left Button = Left Jet | P/L or Right Button = Right Jet', 20, this.canvas.height - 60);
        this.ctx.fillText('Get rings & stars onto the posts!', 20, this.canvas.height - 30);
        if (this.leftJetStrength > 0) {
            const barWidth = 80;
            const barHeight = 20;
            const xPos = this.canvas.width * 0.2 - barWidth / 2;
            const yPos = this.canvas.height - 120;
            this.ctx.fillStyle = 'rgba(50, 50, 50, 0.6)';
            this.ctx.fillRect(xPos, yPos, barWidth, barHeight);
            this.ctx.fillStyle = `rgba(100, 200, 255, ${0.4 + this.leftJetStrength * 0.6})`;
            this.ctx.fillRect(xPos, yPos, barWidth * this.leftJetStrength, barHeight);
            this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
            this.ctx.font = 'bold 12px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('LEFT', this.canvas.width * 0.2, yPos - 5);
        }
        if (this.rightJetStrength > 0) {
            const barWidth = 80;
            const barHeight = 20;
            const xPos = this.canvas.width * 0.8 - barWidth / 2;
            const yPos = this.canvas.height - 120;
            this.ctx.fillStyle = 'rgba(50, 50, 50, 0.6)';
            this.ctx.fillRect(xPos, yPos, barWidth, barHeight);
            this.ctx.fillStyle = `rgba(100, 200, 255, ${0.4 + this.rightJetStrength * 0.6})`;
            this.ctx.fillRect(xPos, yPos, barWidth * this.rightJetStrength, barHeight);
            this.ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--text-primary');
            this.ctx.font = 'bold 12px monospace';
            this.ctx.textAlign = 'center';
            this.ctx.fillText('RIGHT', this.canvas.width * 0.8, yPos - 5);
        }
        this.ctx.restore();
    }
    start() {
        const gameStep = () => {
            this.update();
            this.draw();
            gameLoop = requestAnimationFrame(gameStep);
        };
        gameLoop = requestAnimationFrame(gameStep);
    }
    cleanup() {
        document.removeEventListener('keydown', this.keyHandler);
        document.removeEventListener('keyup', this.keyUpHandler);
        this.canvas.removeEventListener('mousedown', this.mouseDownHandler);
        this.canvas.removeEventListener('mouseup', this.mouseUpHandler);
        if (this.leftJetButton && this.leftJetButton.parentElement) {
            this.leftJetButton.parentElement.removeChild(this.leftJetButton);
        }
        if (this.rightJetButton && this.rightJetButton.parentElement) {
            this.rightJetButton.parentElement.removeChild(this.rightJetButton);
        }
        this.items.forEach(item => {
            this.scene.remove(item.mesh);
            item.mesh.geometry.dispose();
            item.mesh.material.dispose();
        });
        this.posts.forEach(post => {
            this.scene.remove(post.mesh);
            post.mesh.geometry.dispose();
            post.mesh.material.dispose();
        });
        if (this.threeCanvas && this.threeCanvas.parentElement) {
            this.threeCanvas.parentElement.removeChild(this.threeCanvas);
        }
    }
}