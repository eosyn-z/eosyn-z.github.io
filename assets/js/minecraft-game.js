class MinecraftGame {
  constructor(container) {
    this.container = container;
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.controls = null;
    this.world = {};
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.player = { position: new THREE.Vector3(0, 10, 0), velocity: new THREE.Vector3() };
    this.isGrounded = false;
    this.jumpCooldown = 0;
    this.selectedBlock = 1; // 1 = grass, 2 = stone, 3 = wood, 4 = leaves
    this.blockTypes = {
      0: { name: 'air', color: 0x000000 },
      1: { name: 'grass', color: 0x7cb342, topColor: 0x8bc34a },
      2: { name: 'stone', color: 0x757575 },
      3: { name: 'wood', color: 0x8d6e63 },
      4: { name: 'leaves', color: 0x4caf50 },
      5: { name: 'dirt', color: 0x8d6e63 },
      6: { name: 'sand', color: 0xffeb3b }
    };
    
    this.keys = {};
    this.mouseDown = false;
    this.lastTime = 0;
    
    this.init();
  }

  init() {
    // Create scene
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87ceeb); // Sky blue - will be overridden by theme

    // Create camera
    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.camera.position.copy(this.player.position);

    // Create renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.container.appendChild(this.renderer.domElement);

    // Update sky color based on theme
    this.updateThemeColors();

    // Add lighting
    this.setupLighting();

    // Generate world
    this.generateWorld();

    // Setup controls
    this.setupControls();

    // Setup event listeners
    this.setupEventListeners();

    // Start game loop
    this.animate();
  }

  updateThemeColors() {
    // Get theme colors from CSS variables
    const style = getComputedStyle(document.documentElement);
    const primaryColor = style.getPropertyValue('--theme-primary').trim();
    const accentColor = style.getPropertyValue('--theme-accent').trim();
    const secondaryColor = style.getPropertyValue('--theme-secondary').trim();
    
    // Convert hex string to hex number for Three.js
    const hexToHex = (hex) => {
      return parseInt(hex.replace('#', ''), 16);
    };

    // Update sky color based on theme
    const skyColor = hexToHex(accentColor);
    this.scene.background = new THREE.Color(skyColor);

    // Update block colors to use theme colors
    this.blockTypes = {
      0: { name: 'air', color: 0x000000 },
      1: { name: 'grass', color: hexToHex(primaryColor), topColor: hexToHex(accentColor) },
      2: { name: 'stone', color: hexToHex(secondaryColor) },
      3: { name: 'wood', color: 0x8d6e63 },
      4: { name: 'leaves', color: hexToHex(accentColor) },
      5: { name: 'dirt', color: 0x8d6e63 },
      6: { name: 'sand', color: hexToHex(secondaryColor) }
    };
  }

  setupLighting() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
    this.scene.add(ambientLight);

    // Directional light (sun)
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(50, 100, 50);
    directionalLight.castShadow = true;
    directionalLight.shadow.mapSize.width = 2048;
    directionalLight.shadow.mapSize.height = 2048;
    directionalLight.shadow.camera.near = 0.5;
    directionalLight.shadow.camera.far = 500;
    directionalLight.shadow.camera.left = -100;
    directionalLight.shadow.camera.right = 100;
    directionalLight.shadow.camera.top = 100;
    directionalLight.shadow.camera.bottom = -100;
    this.scene.add(directionalLight);
  }

  generateWorld() {
    const worldSize = 32;
    const height = 8;

    for (let x = -worldSize/2; x < worldSize/2; x++) {
      for (let z = -worldSize/2; z < worldSize/2; z++) {
        // Generate height using simple noise
        const heightValue = Math.floor(
          (Math.sin(x * 0.1) + Math.cos(z * 0.1)) * 2 + height
        );

        for (let y = 0; y <= heightValue; y++) {
          let blockType = 0;
          
          if (y === 0) {
            blockType = 2; // Stone at bottom
          } else if (y === heightValue) {
            blockType = 1; // Grass on top
          } else if (y === heightValue - 1) {
            blockType = 5; // Dirt layer
          } else {
            blockType = 2; // Stone in middle
          }

          // Add some random features
          if (Math.random() < 0.02 && y === heightValue) {
            this.generateTree(x, y + 1, z);
          }

          if (blockType !== 0) {
            this.addBlock(x, y, z, blockType);
          }
        }
      }
    }
  }

  generateTree(x, y, z) {
    // Tree trunk
    for (let i = 0; i < 4; i++) {
      this.addBlock(x, y + i, z, 3);
    }

    // Tree leaves
    for (let dx = -2; dx <= 2; dx++) {
      for (let dz = -2; dz <= 2; dz++) {
        for (let dy = 0; dy <= 2; dy++) {
          if (Math.abs(dx) + Math.abs(dz) + dy <= 3) {
            this.addBlock(x + dx, y + 4 + dy, z + dz, 4);
          }
        }
      }
    }
  }

  addBlock(x, y, z, type) {
    const key = `${x},${y},${z}`;
    this.world[key] = type;

    if (type === 0) return; // Don't render air

    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ 
      color: this.blockTypes[type].color,
      transparent: true,
      opacity: 0.9
    });

    const cube = new THREE.Mesh(geometry, material);
    cube.position.set(x, y, z);
    cube.castShadow = true;
    cube.receiveShadow = true;
    cube.userData = { x, y, z, type };

    this.scene.add(cube);
  }

  removeBlock(x, y, z) {
    const key = `${x},${y},${z}`;
    if (this.world[key] && this.world[key] !== 0) {
      this.world[key] = 0;
      
      // Remove mesh from scene
      this.scene.children.forEach(child => {
        if (child.userData && child.userData.x === x && child.userData.y === y && child.userData.z === z) {
          this.scene.remove(child);
        }
      });
    }
  }

  setupControls() {
    // Pointer lock controls for mouse look
    this.controls = new THREE.PointerLockControls(this.camera, this.renderer.domElement);
    
    // Add click to lock pointer
    this.renderer.domElement.addEventListener('click', () => {
      this.controls.lock();
    });
  }

  setupEventListeners() {
    // Keyboard controls
    document.addEventListener('keydown', (event) => {
      this.keys[event.code] = true;
      
      // Block selection
      if (event.code === 'Digit1') this.selectedBlock = 1;
      if (event.code === 'Digit2') this.selectedBlock = 2;
      if (event.code === 'Digit3') this.selectedBlock = 3;
      if (event.code === 'Digit4') this.selectedBlock = 4;
      if (event.code === 'Digit5') this.selectedBlock = 5;
      if (event.code === 'Digit6') this.selectedBlock = 6;
    });

    document.addEventListener('keyup', (event) => {
      this.keys[event.code] = false;
    });

    // Mouse controls
    this.renderer.domElement.addEventListener('mousedown', (event) => {
      this.mouseDown = true;
      this.handleMouseClick(event);
    });

    this.renderer.domElement.addEventListener('mouseup', () => {
      this.mouseDown = false;
    });

    // Window resize
    window.addEventListener('resize', () => {
      this.camera.aspect = this.container.clientWidth / this.container.clientHeight;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    });
  }

  handleMouseClick(event) {
    if (!this.controls.isLocked) return;

    // Calculate mouse position
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    // Raycast
    this.raycaster.setFromCamera(this.mouse, this.camera);
    const intersects = this.raycaster.intersectObjects(this.scene.children);

    if (intersects.length > 0) {
      const intersect = intersects[0];
      const block = intersect.object;
      
      if (event.button === 0) { // Left click - destroy
        this.removeBlock(block.userData.x, block.userData.y, block.userData.z);
      } else if (event.button === 2) { // Right click - place
        const normal = intersect.face.normal;
        const newX = block.userData.x + normal.x;
        const newY = block.userData.y + normal.y;
        const newZ = block.userData.z + normal.z;
        
        const key = `${newX},${newY},${newZ}`;
        if (!this.world[key] || this.world[key] === 0) {
          this.addBlock(newX, newY, newZ, this.selectedBlock);
        }
      }
    }
  }

  updatePlayer(deltaTime) {
    const speed = 10;
    const jumpForce = 15;
    const gravity = -30;

    // Handle input
    const direction = new THREE.Vector3();
    
    if (this.keys['KeyW']) direction.z -= 1;
    if (this.keys['KeyS']) direction.z += 1;
    if (this.keys['KeyA']) direction.x -= 1;
    if (this.keys['KeyD']) direction.x += 1;

    // Apply camera direction to movement
    direction.applyQuaternion(this.camera.quaternion);
    direction.y = 0;
    direction.normalize();

    // Apply movement
    this.player.velocity.x = direction.x * speed;
    this.player.velocity.z = direction.z * speed;

    // Jumping
    if (this.keys['Space'] && this.isGrounded && this.jumpCooldown <= 0) {
      this.player.velocity.y = jumpForce;
      this.isGrounded = false;
      this.jumpCooldown = 0.1;
    }

    // Apply gravity
    this.player.velocity.y += gravity * deltaTime;

    // Update position
    this.player.position.add(this.player.velocity.clone().multiplyScalar(deltaTime));

    // Simple collision detection
    this.checkCollision();

    // Update camera position
    this.camera.position.copy(this.player.position);
    this.camera.position.y += 1.8; // Eye height

    // Update cooldowns
    if (this.jumpCooldown > 0) {
      this.jumpCooldown -= deltaTime;
    }
  }

  checkCollision() {
    const playerX = Math.floor(this.player.position.x);
    const playerY = Math.floor(this.player.position.y);
    const playerZ = Math.floor(this.player.position.z);

    // Check if player is on ground
    const groundKey = `${playerX},${playerY - 1},${playerZ}`;
    this.isGrounded = this.world[groundKey] && this.world[groundKey] !== 0;

    // Simple collision with blocks
    const playerKey = `${playerX},${playerY},${playerZ}`;
    if (this.world[playerKey] && this.world[playerKey] !== 0) {
      // Push player up if inside a block
      this.player.position.y = playerY + 1;
      this.player.velocity.y = 0;
    }
  }

  createUI() {
    // Create UI container
    const ui = document.createElement('div');
    ui.style.cssText = `
      position: absolute;
      top: 10px;
      left: 10px;
      color: white;
      font-family: Arial, sans-serif;
      font-size: 14px;
      text-shadow: 2px 2px 4px rgba(0,0,0,0.8);
      pointer-events: none;
    `;

    // Instructions
    const instructions = document.createElement('div');
    instructions.innerHTML = `
      <div style="margin-bottom: 10px;">
        <strong>Controls:</strong><br>
        WASD - Move | Space - Jump | Mouse - Look<br>
        Left Click - Destroy | Right Click - Place<br>
        1-6 - Select Block Type
      </div>
      <div>
        <strong>Selected:</strong> <span id="selected-block">Grass</span><br>
        <strong>Position:</strong> <span id="player-pos">0, 10, 0</span>
      </div>
    `;
    ui.appendChild(instructions);

    // Block selector
    const blockSelector = document.createElement('div');
    blockSelector.style.cssText = `
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      gap: 5px;
      pointer-events: auto;
    `;

    Object.entries(this.blockTypes).forEach(([id, block]) => {
      if (id === '0') return; // Skip air
      
      const blockBtn = document.createElement('div');
      blockBtn.style.cssText = `
        width: 40px;
        height: 40px;
        background-color: #${block.color.toString(16).padStart(6, '0')};
        border: 2px solid white;
        border-radius: 5px;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px 2px rgba(0,0,0,0.8);
      `;
      blockBtn.textContent = id;
      blockBtn.title = block.name;
      
      blockBtn.addEventListener('click', () => {
        this.selectedBlock = parseInt(id);
        this.updateUI();
      });
      
      blockSelector.appendChild(blockBtn);
    });

    ui.appendChild(blockSelector);
    this.container.appendChild(ui);
    this.ui = ui;
  }

  updateUI() {
    if (!this.ui) return;
    
    const selectedBlockSpan = this.ui.querySelector('#selected-block');
    const playerPosSpan = this.ui.querySelector('#player-pos');
    
    if (selectedBlockSpan) {
      selectedBlockSpan.textContent = this.blockTypes[this.selectedBlock].name;
    }
    
    if (playerPosSpan) {
      const pos = this.player.position;
      playerPosSpan.textContent = `${Math.floor(pos.x)}, ${Math.floor(pos.y)}, ${Math.floor(pos.z)}`;
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());

    const currentTime = performance.now() / 1000;
    const deltaTime = currentTime - this.lastTime;
    this.lastTime = currentTime;

    if (this.controls.isLocked) {
      this.updatePlayer(deltaTime);
    }

    this.updateUI();
    this.renderer.render(this.scene, this.camera);
  }

  destroy() {
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.container && this.renderer) {
      this.container.removeChild(this.renderer.domElement);
    }
    if (this.ui) {
      this.container.removeChild(this.ui);
    }
  }
}

// Automatically instantiate the game when the script is loaded
document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('minecraft-container');
    if (container) {
        new MinecraftGame(container);
    }
}); 