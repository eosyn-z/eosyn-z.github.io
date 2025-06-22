class DesktopManager {
    constructor() {
        this.grid = document.getElementById('desktop-grid');
        if (!this.grid) {
            console.error("Desktop grid container not found!");
            return;
        }
        this.icons = Array.from(this.grid.children);
        this.gridCellSize = { width: 110, height: 110 }; // Based on CSS: 100px icon + 10px gap
        this.iconPositions = this.loadIconPositions();
    }

    init() {
        if (!this.grid) return;
        this.layoutIcons();
        this.icons.forEach(icon => this.makeDraggable(icon));
    }

    loadIconPositions() {
        try {
            const positions = localStorage.getItem('desktopIconPositions');
            return positions ? JSON.parse(positions) : {};
        } catch (e) {
            console.error("Error loading icon positions:", e);
            return {};
        }
    }

    saveIconPositions() {
        localStorage.setItem('desktopIconPositions', JSON.stringify(this.iconPositions));
    }

    layoutIcons() {
        const occupiedSlots = new Set();

        // First, layout saved icons and record their positions
        this.icons.forEach(icon => {
            const savedPosition = this.iconPositions[icon.id];
            if (savedPosition) {
                icon.style.left = `${savedPosition.gridX * this.gridCellSize.width}px`;
                icon.style.top = `${savedPosition.gridY * this.gridCellSize.height}px`;
                occupiedSlots.add(`${savedPosition.gridX},${savedPosition.gridY}`);
            }
        });

        // Then, layout new icons in the first available slots
        this.icons.forEach(icon => {
            if (!this.iconPositions[icon.id]) {
                const { gridX, gridY } = this.findNextAvailableSlot(occupiedSlots);
                icon.style.left = `${gridX * this.gridCellSize.width}px`;
                icon.style.top = `${gridY * this.gridCellSize.height}px`;
                this.iconPositions[icon.id] = { gridX, gridY };
                occupiedSlots.add(`${gridX},${gridY}`);
            }
        });

        this.saveIconPositions();
    }

    findNextAvailableSlot(occupiedSlots) {
        const maxCols = Math.floor(this.grid.clientWidth / this.gridCellSize.width);
        const maxRows = Math.floor(this.grid.clientHeight / this.gridCellSize.height);

        for (let r = 0; r < maxRows; r++) {
            for (let c = 0; c < maxCols; c++) {
                if (!occupiedSlots.has(`${c},${r}`)) {
                    return { gridX: c, gridY: r };
                }
            }
        }
        return { gridX: 0, gridY: 0 }; // Fallback
    }

    makeDraggable(icon) {
        let isDragging = false;
        let offsetX, offsetY;

        icon.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            isDragging = true;
            offsetX = e.clientX - icon.getBoundingClientRect().left;
            offsetY = e.clientY - icon.getBoundingClientRect().top;
            icon.style.zIndex = 1000;
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            const gridRect = this.grid.getBoundingClientRect();
            let x = e.clientX - gridRect.left - offsetX;
            let y = e.clientY - gridRect.top - offsetY;

            // Constrain to grid boundaries
            x = Math.max(0, Math.min(x, gridRect.width - icon.offsetWidth));
            y = Math.max(0, Math.min(y, gridRect.height - icon.offsetHeight));

            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            icon.style.zIndex = 'auto';

            // Calculate the target grid cell
            const gridX = Math.round(parseFloat(icon.style.left) / this.gridCellSize.width);
            const gridY = Math.round(parseFloat(icon.style.top) / this.gridCellSize.height);

            // Snap to the calculated grid position
            icon.style.left = `${gridX * this.gridCellSize.width}px`;
            icon.style.top = `${gridY * this.gridCellSize.height}px`;

            // Save the new grid position
            this.iconPositions[icon.id] = { gridX, gridY };
            this.saveIconPositions();
        });

        // Launch app on double-click
        icon.addEventListener('dblclick', () => {
            const url = icon.dataset.appUrl;
            const title = icon.dataset.appTitle;
            if (url && window.windowManager) {
                window.windowManager.createWindow(url, title);
            }
        });
    }
} 