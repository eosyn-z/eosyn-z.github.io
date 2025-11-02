// WebGL Fluid Simulation - Interactive fluid dynamics
class FluidSimulation {
    constructor(canvas, ctx) {
        this.canvas = canvas;
        this.ctx = ctx;

        // Pretty colors for splats (moved up so fallback mode can access)
        this.colors = [
            [1, 0, 0],      // Red
            [0, 1, 0],      // Green
            [0, 0, 1],      // Blue
            [1, 1, 0],      // Yellow
            [1, 0, 1],      // Magenta
            [0, 1, 1],      // Cyan
            [1, 0.5, 0],    // Orange
            [0.5, 0, 1],    // Purple
            [0, 1, 0.5],    // Mint
            [1, 0, 0.5],    // Pink
        ];

        // Interaction state
        this.pointers = [];
        this.splatStack = [];
        this.colorIndex = 0;

        // Try to get WebGL context
        this.gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');

        if (!this.gl) {
            console.warn('WebGL not supported - using fallback mode');
            this.fallbackMode = true;
            this.initFallbackMode();
            return;
        }

        // Simulation parameters
        this.dyeResolution = 512;
        this.simResolution = 128;
        this.densityDissipation = 0.97;
        this.velocityDissipation = 0.98;
        this.pressure = 0.8;
        this.pressureIterations = 20;
        this.curl = 30;
        this.splatRadius = 0.25;

        this.initWebGL();
        this.setupInput();

        // Start with some initial splats
        this.multipleSplats(parseInt(Math.random() * 20) + 5);
    }

    initFallbackMode() {
        // Simple particle system for fallback
        this.fallbackParticles = [];
        this.maxParticles = 200;
        this.mouseX = this.canvas.width / 2;
        this.mouseY = this.canvas.height / 2;
        this.mouseVX = 0;
        this.mouseVY = 0;

        // Setup input for fallback mode
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const newX = e.clientX - rect.left;
            const newY = e.clientY - rect.top;
            this.mouseVX = newX - this.mouseX;
            this.mouseVY = newY - this.mouseY;
            this.mouseX = newX;
            this.mouseY = newY;

            // Add particles on mouse move
            if (Math.abs(this.mouseVX) > 1 || Math.abs(this.mouseVY) > 1) {
                this.addFallbackParticle();
            }
        });

        this.canvas.addEventListener('click', () => {
            for (let i = 0; i < 10; i++) {
                this.addFallbackParticle();
            }
        });

        // Add some initial particles
        for (let i = 0; i < 20; i++) {
            this.fallbackParticles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                color: this.getNextColor(),
                life: 1.0,
                size: Math.random() * 20 + 10
            });
        }
    }

    addFallbackParticle() {
        if (this.fallbackParticles.length < this.maxParticles) {
            const color = this.getNextColor();
            this.fallbackParticles.push({
                x: this.mouseX + (Math.random() - 0.5) * 20,
                y: this.mouseY + (Math.random() - 0.5) * 20,
                vx: this.mouseVX * 0.1 + (Math.random() - 0.5) * 2,
                vy: this.mouseVY * 0.1 + (Math.random() - 0.5) * 2,
                color: color,
                life: 1.0,
                size: Math.random() * 30 + 20
            });
        }
    }

    initWebGL() {
        const gl = this.gl;

        // Extensions for float textures
        gl.getExtension('OES_texture_float');
        gl.getExtension('OES_texture_float_linear');

        // Clear to black
        gl.clearColor(0.0, 0.0, 0.0, 1.0);

        // Compile shaders
        this.programs = {
            advection: this.createProgram(this.vertexShader(), this.advectionShader()),
            divergence: this.createProgram(this.vertexShader(), this.divergenceShader()),
            curl: this.createProgram(this.vertexShader(), this.curlShader()),
            vorticity: this.createProgram(this.vertexShader(), this.vorticityShader()),
            pressure: this.createProgram(this.vertexShader(), this.pressureShader()),
            gradientSubtract: this.createProgram(this.vertexShader(), this.gradientSubtractShader()),
            splat: this.createProgram(this.vertexShader(), this.splatShader()),
            display: this.createProgram(this.vertexShader(), this.displayShader()),
            clear: this.createProgram(this.vertexShader(), this.clearShader())
        };

        // Create framebuffers
        this.dye = this.createDoubleFBO(this.dyeResolution, this.dyeResolution, gl.RGBA, gl.FLOAT);
        this.velocity = this.createDoubleFBO(this.simResolution, this.simResolution, gl.RGBA, gl.FLOAT);
        this.divergence = this.createFBO(this.simResolution, this.simResolution, gl.RGBA, gl.FLOAT);
        this.curl = this.createFBO(this.simResolution, this.simResolution, gl.RGBA, gl.FLOAT);
        this.pressure = this.createDoubleFBO(this.simResolution, this.simResolution, gl.RGBA, gl.FLOAT);

        // Create fullscreen quad
        const vertices = new Float32Array([-1, -1, -1, 1, 1, 1, 1, -1]);
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        this.quadBuffer = buffer;
    }

    vertexShader() {
        return `
            precision highp float;
            attribute vec2 aPosition;
            varying vec2 vUv;
            void main() {
                vUv = aPosition * 0.5 + 0.5;
                gl_Position = vec4(aPosition, 0.0, 1.0);
            }
        `;
    }

    advectionShader() {
        return `
            precision highp float;
            uniform sampler2D uVelocity;
            uniform sampler2D uSource;
            uniform vec2 texelSize;
            uniform float dt;
            uniform float dissipation;
            varying vec2 vUv;

            void main() {
                vec2 coord = vUv - dt * texture2D(uVelocity, vUv).xy * texelSize;
                gl_FragColor = dissipation * texture2D(uSource, coord);
                gl_FragColor.a = 1.0;
            }
        `;
    }

    divergenceShader() {
        return `
            precision highp float;
            uniform sampler2D uVelocity;
            uniform float halfrdx;
            uniform vec2 texelSize;
            varying vec2 vUv;

            void main() {
                vec2 vL = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).xy;
                vec2 vR = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).xy;
                vec2 vT = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).xy;
                vec2 vB = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).xy;
                float div = halfrdx * (vR.x - vL.x + vT.y - vB.y);
                gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
            }
        `;
    }

    curlShader() {
        return `
            precision highp float;
            uniform sampler2D uVelocity;
            uniform vec2 texelSize;
            uniform float halfrdx;
            varying vec2 vUv;

            void main() {
                vec2 vL = texture2D(uVelocity, vUv - vec2(texelSize.x, 0.0)).xy;
                vec2 vR = texture2D(uVelocity, vUv + vec2(texelSize.x, 0.0)).xy;
                vec2 vT = texture2D(uVelocity, vUv + vec2(0.0, texelSize.y)).xy;
                vec2 vB = texture2D(uVelocity, vUv - vec2(0.0, texelSize.y)).xy;
                float curl = halfrdx * (vT.x - vB.x - vR.y + vL.y);
                gl_FragColor = vec4(curl, 0.0, 0.0, 1.0);
            }
        `;
    }

    vorticityShader() {
        return `
            precision highp float;
            uniform sampler2D uVelocity;
            uniform sampler2D uCurl;
            uniform vec2 texelSize;
            uniform float curl;
            uniform float dt;
            varying vec2 vUv;

            void main() {
                float L = texture2D(uCurl, vUv - vec2(texelSize.x, 0.0)).x;
                float R = texture2D(uCurl, vUv + vec2(texelSize.x, 0.0)).x;
                float T = texture2D(uCurl, vUv + vec2(0.0, texelSize.y)).x;
                float B = texture2D(uCurl, vUv - vec2(0.0, texelSize.y)).x;
                float C = texture2D(uCurl, vUv).x;

                vec2 force = 0.5 * vec2(abs(T) - abs(B), abs(R) - abs(L));
                force /= length(force) + 0.0001;
                force *= curl * C;
                force.y *= -1.0;

                vec2 vel = texture2D(uVelocity, vUv).xy;
                gl_FragColor = vec4(vel + force * dt, 0.0, 1.0);
            }
        `;
    }

    pressureShader() {
        return `
            precision highp float;
            uniform sampler2D uPressure;
            uniform sampler2D uDivergence;
            uniform vec2 texelSize;
            varying vec2 vUv;

            void main() {
                float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
                float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
                float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
                float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
                float divergence = texture2D(uDivergence, vUv).x;
                gl_FragColor = vec4((L + R + T + B - divergence) * 0.25, 0.0, 0.0, 1.0);
            }
        `;
    }

    gradientSubtractShader() {
        return `
            precision highp float;
            uniform sampler2D uPressure;
            uniform sampler2D uVelocity;
            uniform vec2 texelSize;
            uniform float halfrdx;
            varying vec2 vUv;

            void main() {
                float L = texture2D(uPressure, vUv - vec2(texelSize.x, 0.0)).x;
                float R = texture2D(uPressure, vUv + vec2(texelSize.x, 0.0)).x;
                float T = texture2D(uPressure, vUv + vec2(0.0, texelSize.y)).x;
                float B = texture2D(uPressure, vUv - vec2(0.0, texelSize.y)).x;
                vec2 vel = texture2D(uVelocity, vUv).xy;
                vel.xy -= halfrdx * vec2(R - L, T - B);
                gl_FragColor = vec4(vel, 0.0, 1.0);
            }
        `;
    }

    splatShader() {
        return `
            precision highp float;
            uniform sampler2D uTarget;
            uniform float aspectRatio;
            uniform vec3 color;
            uniform vec2 point;
            uniform float radius;
            varying vec2 vUv;

            void main() {
                vec2 p = vUv - point;
                p.x *= aspectRatio;
                vec3 splat = exp(-dot(p, p) / radius) * color;
                vec3 base = texture2D(uTarget, vUv).xyz;
                gl_FragColor = vec4(base + splat, 1.0);
            }
        `;
    }

    displayShader() {
        return `
            precision highp float;
            uniform sampler2D uTexture;
            varying vec2 vUv;

            void main() {
                vec3 color = texture2D(uTexture, vUv).rgb;
                gl_FragColor = vec4(color, 1.0);
            }
        `;
    }

    clearShader() {
        return `
            precision highp float;
            uniform sampler2D uTexture;
            uniform float value;
            varying vec2 vUv;

            void main() {
                gl_FragColor = value * texture2D(uTexture, vUv);
            }
        `;
    }

    createProgram(vertexShader, fragmentShader) {
        const gl = this.gl;
        const program = gl.createProgram();

        const vs = this.compileShader(gl.VERTEX_SHADER, vertexShader);
        const fs = this.compileShader(gl.FRAGMENT_SHADER, fragmentShader);

        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program link error:', gl.getProgramInfoLog(program));
        }

        // Get uniform locations
        const uniforms = {};
        const numUniforms = gl.getProgramParameter(program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < numUniforms; i++) {
            const uniformInfo = gl.getActiveUniform(program, i);
            uniforms[uniformInfo.name] = gl.getUniformLocation(program, uniformInfo.name);
        }

        return {
            program: program,
            uniforms: uniforms,
            bind: function() {
                gl.useProgram(program);
            }
        };
    }

    compileShader(type, source) {
        const gl = this.gl;
        const shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            console.error('Shader compile error:', gl.getShaderInfoLog(shader));
        }

        return shader;
    }

    createFBO(width, height, format, type) {
        const gl = this.gl;
        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texImage2D(gl.TEXTURE_2D, 0, format, width, height, 0, format, type, null);

        const fbo = gl.createFramebuffer();
        gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
        gl.viewport(0, 0, width, height);
        gl.clear(gl.COLOR_BUFFER_BIT);

        return {
            texture: texture,
            fbo: fbo,
            width: width,
            height: height,
            attach: function() {
                gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
                gl.viewport(0, 0, width, height);
            }
        };
    }

    createDoubleFBO(width, height, format, type) {
        const fbo1 = this.createFBO(width, height, format, type);
        const fbo2 = this.createFBO(width, height, format, type);

        return {
            read: fbo1,
            write: fbo2,
            swap: function() {
                const temp = this.read;
                this.read = this.write;
                this.write = temp;
            }
        };
    }

    setupInput() {
        // Mouse input
        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width;
            const y = 1.0 - (e.clientY - rect.top) / rect.height;

            if (this.pointers.length === 0) {
                this.pointers.push({
                    x: x,
                    y: y,
                    dx: 0,
                    dy: 0,
                    color: this.getNextColor(),
                    down: false
                });
            } else {
                const pointer = this.pointers[0];
                pointer.dx = (x - pointer.x) * 10;
                pointer.dy = (y - pointer.y) * 10;
                pointer.x = x;
                pointer.y = y;

                if (pointer.down) {
                    this.splat(x, y, pointer.dx, pointer.dy, pointer.color);
                }
            }
        });

        this.canvas.addEventListener('mousedown', () => {
            if (this.pointers.length > 0) {
                this.pointers[0].down = true;
                this.pointers[0].color = this.getNextColor();
            }
        });

        this.canvas.addEventListener('mouseup', () => {
            if (this.pointers.length > 0) {
                this.pointers[0].down = false;
            }
        });

        // Touch input
        this.canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            const touches = e.targetTouches;

            for (let i = 0; i < touches.length; i++) {
                const touch = touches[i];
                const rect = this.canvas.getBoundingClientRect();
                const x = (touch.clientX - rect.left) / rect.width;
                const y = 1.0 - (touch.clientY - rect.top) / rect.height;

                this.pointers[i] = {
                    x: x,
                    y: y,
                    dx: 0,
                    dy: 0,
                    color: this.getNextColor(),
                    down: true
                };

                this.splat(x, y, 0, 0, this.pointers[i].color);
            }
        });

        this.canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            const touches = e.targetTouches;

            for (let i = 0; i < Math.min(touches.length, this.pointers.length); i++) {
                const touch = touches[i];
                const pointer = this.pointers[i];
                const rect = this.canvas.getBoundingClientRect();
                const x = (touch.clientX - rect.left) / rect.width;
                const y = 1.0 - (touch.clientY - rect.top) / rect.height;

                pointer.dx = (x - pointer.x) * 10;
                pointer.dy = (y - pointer.y) * 10;
                pointer.x = x;
                pointer.y = y;

                this.splat(x, y, pointer.dx, pointer.dy, pointer.color);
            }
        });

        this.canvas.addEventListener('touchend', () => {
            this.pointers = [];
        });
    }

    getNextColor() {
        const color = this.colors[this.colorIndex % this.colors.length];
        this.colorIndex++;
        return color;
    }

    splat(x, y, dx, dy, color) {
        this.splatStack.push({
            x: x,
            y: y,
            dx: dx,
            dy: dy,
            color: color
        });
    }

    multipleSplats(amount) {
        for (let i = 0; i < amount; i++) {
            const color = this.getNextColor();
            const x = Math.random();
            const y = Math.random();
            const dx = (Math.random() - 0.5) * 1000;
            const dy = (Math.random() - 0.5) * 1000;
            this.splat(x, y, dx, dy, color);
        }
    }

    update() {
        if (this.fallbackMode) {
            this.updateFallback();
            return;
        }

        const gl = this.gl;
        const dt = 0.016; // Fixed timestep

        // Process splats
        while (this.splatStack.length > 0) {
            const s = this.splatStack.pop();
            this.applyForce(s.x, s.y, s.dx, s.dy, s.color);
        }

        // Velocity advection
        this.programs.advection.bind();
        gl.uniform1i(this.programs.advection.uniforms.uVelocity, 0);
        gl.uniform1i(this.programs.advection.uniforms.uSource, 0);
        gl.uniform2f(this.programs.advection.uniforms.texelSize, 1.0 / this.simResolution, 1.0 / this.simResolution);
        gl.uniform1f(this.programs.advection.uniforms.dt, dt);
        gl.uniform1f(this.programs.advection.uniforms.dissipation, this.velocityDissipation);
        this.velocity.write.attach();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        this.drawQuad();
        this.velocity.swap();

        // Vorticity confinement
        this.programs.curl.bind();
        gl.uniform1i(this.programs.curl.uniforms.uVelocity, 0);
        gl.uniform2f(this.programs.curl.uniforms.texelSize, 1.0 / this.simResolution, 1.0 / this.simResolution);
        gl.uniform1f(this.programs.curl.uniforms.halfrdx, 0.5 / (1.0 / this.simResolution));
        this.curl.attach();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        this.drawQuad();

        this.programs.vorticity.bind();
        gl.uniform1i(this.programs.vorticity.uniforms.uVelocity, 0);
        gl.uniform1i(this.programs.vorticity.uniforms.uCurl, 1);
        gl.uniform2f(this.programs.vorticity.uniforms.texelSize, 1.0 / this.simResolution, 1.0 / this.simResolution);
        gl.uniform1f(this.programs.vorticity.uniforms.curl, this.curl);
        gl.uniform1f(this.programs.vorticity.uniforms.dt, dt);
        this.velocity.write.attach();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.curl.texture);
        this.drawQuad();
        this.velocity.swap();

        // Divergence
        this.programs.divergence.bind();
        gl.uniform1i(this.programs.divergence.uniforms.uVelocity, 0);
        gl.uniform2f(this.programs.divergence.uniforms.texelSize, 1.0 / this.simResolution, 1.0 / this.simResolution);
        gl.uniform1f(this.programs.divergence.uniforms.halfrdx, 0.5 / (1.0 / this.simResolution));
        this.divergence.attach();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        this.drawQuad();

        // Pressure solver
        this.programs.clear.bind();
        gl.uniform1i(this.programs.clear.uniforms.uTexture, 0);
        gl.uniform1f(this.programs.clear.uniforms.value, this.pressure);
        this.pressure.write.attach();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.pressure.read.texture);
        this.drawQuad();
        this.pressure.swap();

        this.programs.pressure.bind();
        gl.uniform1i(this.programs.pressure.uniforms.uDivergence, 1);
        gl.uniform2f(this.programs.pressure.uniforms.texelSize, 1.0 / this.simResolution, 1.0 / this.simResolution);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.divergence.texture);

        for (let i = 0; i < this.pressureIterations; i++) {
            gl.uniform1i(this.programs.pressure.uniforms.uPressure, 0);
            this.pressure.write.attach();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.pressure.read.texture);
            this.drawQuad();
            this.pressure.swap();
        }

        // Gradient subtract
        this.programs.gradientSubtract.bind();
        gl.uniform1i(this.programs.gradientSubtract.uniforms.uPressure, 0);
        gl.uniform1i(this.programs.gradientSubtract.uniforms.uVelocity, 1);
        gl.uniform2f(this.programs.gradientSubtract.uniforms.texelSize, 1.0 / this.simResolution, 1.0 / this.simResolution);
        gl.uniform1f(this.programs.gradientSubtract.uniforms.halfrdx, 0.5 / (1.0 / this.simResolution));
        this.velocity.write.attach();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.pressure.read.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        this.drawQuad();
        this.velocity.swap();

        // Dye advection
        this.programs.advection.bind();
        gl.uniform1i(this.programs.advection.uniforms.uVelocity, 0);
        gl.uniform1i(this.programs.advection.uniforms.uSource, 1);
        gl.uniform2f(this.programs.advection.uniforms.texelSize, 1.0 / this.dyeResolution, 1.0 / this.dyeResolution);
        gl.uniform1f(this.programs.advection.uniforms.dt, dt);
        gl.uniform1f(this.programs.advection.uniforms.dissipation, this.densityDissipation);
        this.dye.write.attach();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        gl.activeTexture(gl.TEXTURE1);
        gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
        this.drawQuad();
        this.dye.swap();
    }

    applyForce(x, y, dx, dy, color) {
        const gl = this.gl;

        // Apply to velocity
        this.programs.splat.bind();
        gl.uniform1i(this.programs.splat.uniforms.uTarget, 0);
        gl.uniform1f(this.programs.splat.uniforms.aspectRatio, this.canvas.width / this.canvas.height);
        gl.uniform2f(this.programs.splat.uniforms.point, x, y);
        gl.uniform3f(this.programs.splat.uniforms.color, dx, dy, 0.0);
        gl.uniform1f(this.programs.splat.uniforms.radius, this.splatRadius / 100.0);
        this.velocity.write.attach();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
        this.drawQuad();
        this.velocity.swap();

        // Apply to dye
        gl.uniform1i(this.programs.splat.uniforms.uTarget, 0);
        gl.uniform3f(this.programs.splat.uniforms.color, color[0] * 0.3, color[1] * 0.3, color[2] * 0.3);
        this.dye.write.attach();
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
        this.drawQuad();
        this.dye.swap();
    }

    drawQuad() {
        const gl = this.gl;
        gl.bindBuffer(gl.ARRAY_BUFFER, this.quadBuffer);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
        gl.enableVertexAttribArray(0);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
    }

    updateFallback() {
        if (!this.fallbackParticles) return;

        // Update particles
        for (let i = this.fallbackParticles.length - 1; i >= 0; i--) {
            const p = this.fallbackParticles[i];

            // Apply physics
            p.x += p.vx;
            p.y += p.vy;
            p.vx *= 0.99; // Friction
            p.vy *= 0.99;
            p.vy += 0.1; // Gravity
            p.life -= 0.01;

            // Bounce off walls
            if (p.x < 0 || p.x > this.canvas.width) {
                p.vx *= -0.8;
                p.x = Math.max(0, Math.min(this.canvas.width, p.x));
            }
            if (p.y < 0 || p.y > this.canvas.height) {
                p.vy *= -0.8;
                p.y = Math.max(0, Math.min(this.canvas.height, p.y));
            }

            // Remove dead particles
            if (p.life <= 0) {
                this.fallbackParticles.splice(i, 1);
            }
        }

        // Add new particles occasionally
        if (this.fallbackParticles.length < 50 && Math.random() < 0.1) {
            this.fallbackParticles.push({
                x: Math.random() * this.canvas.width,
                y: 0,
                vx: (Math.random() - 0.5) * 2,
                vy: Math.random() * 2,
                color: this.getNextColor(),
                life: 1.0,
                size: Math.random() * 20 + 10
            });
        }
    }

    drawFallback() {
        // Clear canvas with gradient background
        const gradient = this.ctx.createLinearGradient(0, 0, 0, this.canvas.height);
        gradient.addColorStop(0, '#000033');
        gradient.addColorStop(1, '#000066');
        this.ctx.fillStyle = gradient;
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // Draw particles
        if (this.fallbackParticles) {
            this.ctx.globalCompositeOperation = 'screen';

            for (const p of this.fallbackParticles) {
                const r = Math.floor(p.color[0] * 255);
                const g = Math.floor(p.color[1] * 255);
                const b = Math.floor(p.color[2] * 255);

                // Create radial gradient for each particle
                const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.size);
                gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${p.life * 0.8})`);
                gradient.addColorStop(0.5, `rgba(${r}, ${g}, ${b}, ${p.life * 0.3})`);
                gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);

                this.ctx.fillStyle = gradient;
                this.ctx.fillRect(p.x - p.size, p.y - p.size, p.size * 2, p.size * 2);
            }

            this.ctx.globalCompositeOperation = 'source-over';
        }

        // Draw instructions
        this.ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
        this.ctx.font = '14px monospace';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('Canvas2D Fallback Mode - Move mouse to create fluid particles', this.canvas.width / 2, 30);
    }

    draw() {
        if (this.fallbackMode) {
            this.drawFallback();
            return;
        }

        const gl = this.gl;

        // Render to screen
        this.programs.display.bind();
        gl.uniform1i(this.programs.display.uniforms.uTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);
        gl.viewport(0, 0, this.canvas.width, this.canvas.height);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
        this.drawQuad();
    }

    gameLoop() {
        this.update();
        this.draw();
    }

    reset() {
        if (this.fallbackMode) {
            // Reset fallback particles
            this.fallbackParticles = [];
            this.colorIndex = 0;

            // Add fresh particles
            for (let i = 0; i < 20; i++) {
                this.fallbackParticles.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    vx: (Math.random() - 0.5) * 4,
                    vy: (Math.random() - 0.5) * 4,
                    color: this.getNextColor(),
                    life: 1.0,
                    size: Math.random() * 20 + 10
                });
            }
        } else {
            // Clear textures and add new splats
            const gl = this.gl;

            // Clear velocity
            this.programs.clear.bind();
            gl.uniform1i(this.programs.clear.uniforms.uTexture, 0);
            gl.uniform1f(this.programs.clear.uniforms.value, 0.0);
            this.velocity.write.attach();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.velocity.read.texture);
            this.drawQuad();
            this.velocity.swap();

            // Clear dye
            this.dye.write.attach();
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, this.dye.read.texture);
            this.drawQuad();
            this.dye.swap();

            // Add random splats
            this.multipleSplats(parseInt(Math.random() * 20) + 5);
        }
    }

    start() {
        // Add some initial movement
        if (this.fallbackMode) {
            // Add burst of particles for start
            for (let i = 0; i < 10; i++) {
                this.addFallbackParticle();
            }
        } else {
            this.multipleSplats(3);
        }
    }
}

// Export for use in games page
window.FluidSimulation = FluidSimulation;