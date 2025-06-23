// Global paint instance
let paintInstance = null;

function initializePaint() {
    // Check if already initialized
    if (paintInstance) {
        return;
    }
    
    const canvas = document.getElementById('paint-canvas');
    if (!canvas) {
        console.log('Paint canvas not found, waiting for DOM...');
        return;
    }
    
    const ctx = canvas.getContext('2d');
    const toolbar = document.querySelector('.paint-toolbar');
    const palette = document.querySelector('.paint-palette');
    const currentColorEl = document.getElementById('current-color');

    if (!ctx || !toolbar || !palette || !currentColorEl) {
        console.log('Paint elements not found, waiting for DOM...');
        return;
    }

    let currentTool = 'pencil';
    let currentColor = 'var(--theme-text, #000000)';
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // --- Canvas Setup ---
    function resizeCanvas() {
        const canvasArea = document.querySelector('.paint-canvas-area');
        if (!canvasArea) return;
        
        canvas.width = canvasArea.offsetWidth - 20; // account for padding
        canvas.height = canvasArea.offsetHeight - 20;
        ctx.fillStyle = 'var(--bg-secondary)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // --- Drawing Logic ---
    function draw(e) {
        if (!isDrawing) return;
        
        ctx.strokeStyle = currentColor;
        ctx.lineJoin = 'round';
        ctx.lineCap = 'round';
        ctx.lineWidth = (currentTool === 'eraser') ? 20 : 5;
        
        ctx.beginPath();
        ctx.moveTo(lastX, lastY);
        // Offset needed to draw correctly relative to canvas
        const [x, y] = [e.offsetX, e.offsetY];
        ctx.lineTo(x, y);
        ctx.stroke();
        [lastX, lastY] = [x, y];
    }

    canvas.addEventListener('mousedown', (e) => {
        isDrawing = true;
        [lastX, lastY] = [e.offsetX, e.offsetY];
    });

    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', () => isDrawing = false);
    canvas.addEventListener('mouseout', () => isDrawing = false);

    // --- Tool Selection ---
    toolbar.addEventListener('click', (e) => {
        if (e.target.classList.contains('tool')) {
            // Remove active class from previous tool
            const currentActive = toolbar.querySelector('.tool.active');
            if (currentActive) {
                currentActive.classList.remove('active');
            }
            // Add active class to new tool
            e.target.classList.add('active');
            currentTool = e.target.id;
             if (currentTool === 'eraser') {
                canvas.style.cursor = `url('https://i.imgur.com/N4CQ22X.png') 10 10, auto`;
            } else {
                 canvas.style.cursor = 'crosshair';
            }
        }
    });
    
    // Set pencil as active tool by default
    const pencilTool = document.getElementById('pencil');
    if (pencilTool) {
        pencilTool.classList.add('active');
    }

    // --- Menu Functions ---
    function saveCanvas() {
        const link = document.createElement('a');
        link.download = `drawing-${Date.now()}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    function clearCanvas() {
        if (confirm('Are you sure you want to clear the canvas? This cannot be undone.')) {
            ctx.fillStyle = 'var(--bg-secondary)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
    }

    // Attach listeners to the file menu
    const saveBtn = document.getElementById('paint-save');
    const clearBtn = document.getElementById('paint-clear');

    if (saveBtn) {
        saveBtn.addEventListener('click', saveCanvas);
    }
    if (clearBtn) {
        clearBtn.addEventListener('click', clearCanvas);
    }

    // --- Color Palette ---
    const colors = [
        // Theme colors first - we'll convert these to actual values
        'var(--theme-primary)',
        'var(--theme-accent)',
        'var(--theme-secondary)',
        'var(--theme-accent-light)',
        'var(--theme-accent-dark)',
        'var(--theme-primary-shadow)',
        'var(--theme-secondary-shadow)',
        // Standard colors (keep some for variety)
        '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
        '#c0c0c0', '#ffffff', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
        '#f5deb3', '#d2b48c', '#a0522d', '#8b4513', '#654321', '#ffb6c1', '#ff69b4', '#db7093',
        '#c71585', '#ff1493', '#ff00ff', '#ee82ee',
    ];

    // Function to convert CSS variable to actual color value
    function getComputedColor(cssVar) {
        if (cssVar.startsWith('var(--')) {
            const varName = cssVar.match(/var\(--([^)]+)\)/)[1];
            return getComputedStyle(document.documentElement).getPropertyValue(`--${varName}`).trim();
        }
        return cssVar;
    }

    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        const actualColor = getComputedColor(color);
        colorBox.style.backgroundColor = actualColor;
        colorBox.dataset.color = actualColor;
        palette.appendChild(colorBox);
    });

    palette.addEventListener('click', (e) => {
        if (e.target.dataset.color) {
            currentColor = e.target.dataset.color;
            currentColorEl.style.backgroundColor = currentColor;
        }
    });

    // Set default color
    const defaultColor = getComputedColor(currentColor);
    currentColor = defaultColor;
    currentColorEl.style.backgroundColor = defaultColor;
    
    // Mark as initialized
    paintInstance = true;
    console.log('Paint initialized successfully');
}

// Initialize on DOM content loaded
document.addEventListener('DOMContentLoaded', initializePaint);

// Also initialize when window content is loaded
document.addEventListener('windowContentLoaded', initializePaint); 