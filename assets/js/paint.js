document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('paint-canvas');
    const ctx = canvas.getContext('2d');
    const toolbar = document.querySelector('.paint-toolbar');
    const palette = document.querySelector('.paint-palette');
    const currentColorEl = document.getElementById('current-color');

    let currentTool = 'pencil';
    let currentColor = '#000000';
    let isDrawing = false;
    let lastX = 0;
    let lastY = 0;

    // --- Canvas Setup ---
    function resizeCanvas() {
        const canvasArea = document.querySelector('.paint-canvas-area');
        canvas.width = canvasArea.offsetWidth - 20; // account for padding
        canvas.height = canvasArea.offsetHeight - 20;
        ctx.fillStyle = '#ffffff';
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
    document.getElementById('pencil').classList.add('active');

    // --- Export Functions ---
    function saveCanvas() {
        const link = document.createElement('a');
        link.download = 'paint-drawing.png';
        link.href = canvas.toDataURL();
        link.click();
    }

    function clearCanvas() {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }

    // Add export buttons to toolbar
    const exportButtons = document.createElement('div');
    exportButtons.style.cssText = 'display: flex; gap: 10px; margin-left: auto;';
    exportButtons.innerHTML = `
        <button class="glass-button" onclick="clearCanvas()" title="Clear Canvas">🗑️ Clear</button>
        <button class="glass-button" onclick="saveCanvas()" title="Save as PNG">💾 Save</button>
    `;
    toolbar.appendChild(exportButtons);

    // --- Color Palette ---
    const colors = [
        '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
        '#c0c0c0', '#ffffff', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff',
        '#f5deb3', '#d2b48c', '#a0522d', '#8b4513', '#654321', '#ffb6c1', '#ff69b4', '#db7093',
        '#c71585', '#ff1493', '#ff00ff', '#ee82ee',
    ];

    colors.forEach(color => {
        const colorBox = document.createElement('div');
        colorBox.classList.add('color-box');
        colorBox.style.backgroundColor = color;
        colorBox.dataset.color = color;
        palette.appendChild(colorBox);
    });

    palette.addEventListener('click', (e) => {
        if (e.target.dataset.color) {
            currentColor = e.target.dataset.color;
            currentColorEl.style.backgroundColor = currentColor;
        }
    });

    // Set default color
    currentColorEl.style.backgroundColor = currentColor;
}); 