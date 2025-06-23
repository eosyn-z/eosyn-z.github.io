class DesktopManager {
    constructor(container) {
        this.container = document.getElementById('window-container');
        this.windows = [];
        this.grid = new Set();
        this.grid = document.getElementById('desktop-grid');
        if (!this.grid) {
            console.error("Desktop grid container not found!");
            return;
        }
        this.icons = Array.from(this.grid.children);
        this.gridCellSize = { width: 110, height: 110 }; // Based on CSS: 100px icon + 10px gap
        this.iconPositions = this.loadIconPositions();
        this.occupiedSlots = new Set(); // Track occupied grid slots
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
        this.occupiedSlots.clear();

        // First, layout saved icons and record their positions
        this.icons.forEach(icon => {
            const savedPosition = this.iconPositions[icon.id];
            if (savedPosition) {
                // Check if the saved position is available
                const slotKey = `${savedPosition.gridX},${savedPosition.gridY}`;
                if (!this.occupiedSlots.has(slotKey)) {
                    icon.style.left = `${savedPosition.gridX * this.gridCellSize.width}px`;
                    icon.style.top = `${savedPosition.gridY * this.gridCellSize.height}px`;
                    this.occupiedSlots.add(slotKey);
                } else {
                    // Position is occupied, find new position
                    const { gridX, gridY } = this.findNextAvailableSlot();
                    icon.style.left = `${gridX * this.gridCellSize.width}px`;
                    icon.style.top = `${gridY * this.gridCellSize.height}px`;
                    this.iconPositions[icon.id] = { gridX, gridY };
                    this.occupiedSlots.add(`${gridX},${gridY}`);
                }
            }
        });

        // Then, layout new icons in the first available slots
        this.icons.forEach(icon => {
            if (!this.iconPositions[icon.id]) {
                const { gridX, gridY } = this.findNextAvailableSlot();
                icon.style.left = `${gridX * this.gridCellSize.width}px`;
                icon.style.top = `${gridY * this.gridCellSize.height}px`;
                this.iconPositions[icon.id] = { gridX, gridY };
                this.occupiedSlots.add(`${gridX},${gridY}`);
            }
        });

        this.saveIconPositions();
    }

    findNextAvailableSlot() {
        const maxCols = Math.floor(this.grid.clientWidth / this.gridCellSize.width);
        const maxRows = Math.floor(this.grid.clientHeight / this.gridCellSize.height);

        for (let r = 0; r < maxRows; r++) {
            for (let c = 0; c < maxCols; c++) {
                const slotKey = `${c},${r}`;
                if (!this.occupiedSlots.has(slotKey)) {
                    return { gridX: c, gridY: r };
                }
            }
        }
        return { gridX: 0, gridY: 0 }; // Fallback
    }

    // Check if a grid position is occupied
    isSlotOccupied(gridX, gridY) {
        return this.occupiedSlots.has(`${gridX},${gridY}`);
    }

    // Find the nearest available slot
    findNearestAvailableSlot(targetGridX, targetGridY) {
        const maxCols = Math.floor(this.grid.clientWidth / this.gridCellSize.width);
        const maxRows = Math.floor(this.grid.clientHeight / this.gridCellSize.height);
        
        // Search in expanding radius
        for (let radius = 0; radius < Math.max(maxCols, maxRows); radius++) {
            for (let dx = -radius; dx <= radius; dx++) {
                for (let dy = -radius; dy <= radius; dy++) {
                    if (Math.abs(dx) === radius || Math.abs(dy) === radius) {
                        const testX = targetGridX + dx;
                        const testY = targetGridY + dy;
                        
                        if (testX >= 0 && testX < maxCols && testY >= 0 && testY < maxRows) {
                            if (!this.isSlotOccupied(testX, testY)) {
                                return { gridX: testX, gridY: testY };
                            }
                        }
                    }
                }
            }
        }
        
        return this.findNextAvailableSlot(); // Fallback
    }

    makeDraggable(icon) {
        let isDragging = false;
        let offsetX, offsetY;
        let originalGridX, originalGridY;

        // Mouse events
        icon.addEventListener('mousedown', (e) => {
            if (e.button !== 0) return;
            e.preventDefault();
            isDragging = true;
            offsetX = e.clientX - icon.getBoundingClientRect().left;
            offsetY = e.clientY - icon.getBoundingClientRect().top;
            
            // Store original position
            const currentPos = this.iconPositions[icon.id];
            originalGridX = currentPos ? currentPos.gridX : 0;
            originalGridY = currentPos ? currentPos.gridY : 0;
            
            icon.style.zIndex = 1000;
        });

        // Touch events for mobile
        icon.addEventListener('touchstart', (e) => {
            e.preventDefault();
            isDragging = true;
            const touch = e.touches[0];
            const rect = icon.getBoundingClientRect();
            offsetX = touch.clientX - rect.left;
            offsetY = touch.clientY - rect.top;
            
            // Store original position
            const currentPos = this.iconPositions[icon.id];
            originalGridX = currentPos ? currentPos.gridX : 0;
            originalGridY = currentPos ? currentPos.gridY : 0;
            
            icon.style.zIndex = 1000;
        });

        // Mouse move
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

        // Touch move
        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            e.preventDefault();
            const touch = e.touches[0];
            const gridRect = this.grid.getBoundingClientRect();
            let x = touch.clientX - gridRect.left - offsetX;
            let y = touch.clientY - gridRect.top - offsetY;

            // Constrain to grid boundaries
            x = Math.max(0, Math.min(x, gridRect.width - icon.offsetWidth));
            y = Math.max(0, Math.min(y, gridRect.height - icon.offsetHeight));

            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
        });

        // Mouse up
        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            this.finalizeDrag(icon, originalGridX, originalGridY);
        });

        // Touch end
        document.addEventListener('touchend', () => {
            if (!isDragging) return;
            this.finalizeDrag(icon, originalGridX, originalGridY);
        });

        // Launch app on double-click or double-tap
        icon.addEventListener('dblclick', () => {
            const url = icon.dataset.appUrl;
            const title = icon.dataset.appTitle;
            if (url && window.windowManager) {
                window.windowManager.createWindow(url, title);
            }
        });

        // Double tap for mobile
        let lastTap = 0;
        icon.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            if (tapLength < 500 && tapLength > 0) {
                // Double tap detected
                const url = icon.dataset.appUrl;
                const title = icon.dataset.appTitle;
                if (url && window.windowManager) {
                    window.windowManager.createWindow(url, title);
                }
            }
            lastTap = currentTime;
        });
    }

    // Helper method to finalize drag operation
    finalizeDrag(icon, originalGridX, originalGridY) {
        this.isDragging = false;
        icon.style.zIndex = 'auto';

        // Calculate the target grid cell
        const gridX = Math.round(parseFloat(icon.style.left) / this.gridCellSize.width);
        const gridY = Math.round(parseFloat(icon.style.top) / this.gridCellSize.height);

        // Remove from old position
        if (originalGridX !== undefined && originalGridY !== undefined) {
            this.occupiedSlots.delete(`${originalGridX},${originalGridY}`);
        }

        // Check if target position is occupied
        if (this.isSlotOccupied(gridX, gridY)) {
            // Find nearest available slot
            const nearestSlot = this.findNearestAvailableSlot(gridX, gridY);
            const finalGridX = nearestSlot.gridX;
            const finalGridY = nearestSlot.gridY;
            
            // Snap to the nearest available position
            icon.style.left = `${finalGridX * this.gridCellSize.width}px`;
            icon.style.top = `${finalGridY * this.gridCellSize.height}px`;
            
            // Update position tracking
            this.iconPositions[icon.id] = { gridX: finalGridX, gridY: finalGridY };
            this.occupiedSlots.add(`${finalGridX},${finalGridY}`);
        } else {
            // Snap to the calculated grid position
            icon.style.left = `${gridX * this.gridCellSize.width}px`;
            icon.style.top = `${gridY * this.gridCellSize.height}px`;

            // Update position tracking
            this.iconPositions[icon.id] = { gridX, gridY };
            this.occupiedSlots.add(`${gridX},${gridY}`);
        }

        this.saveIconPositions();
    }

    // Add bookmark to desktop
    addBookmarkToDesktop(site) {
        if (!this.grid) return false;
        
        const iconId = `bookmark-${site.url.replace(/[^a-zA-Z0-9]/g, '')}`;
        
        // Check if already exists
        if (document.getElementById(iconId)) {
            return false;
        }
        
        const icon = document.createElement('div');
        icon.className = 'desktop-icon';
        icon.id = iconId;
        icon.dataset.appUrl = site.url;
        icon.dataset.appTitle = site.title;
        icon.dataset.appId = iconId;
        
        icon.innerHTML = `
            <div class="icon-image">🔖</div>
            <div class="icon-label">${site.title}</div>
        `;
        
        // Find next available slot
        const { gridX, gridY } = this.findNextAvailableSlot();
        icon.style.left = `${gridX * this.gridCellSize.width}px`;
        icon.style.top = `${gridY * this.gridCellSize.height}px`;
        
        // Add to tracking
        this.iconPositions[iconId] = { gridX, gridY };
        this.occupiedSlots.add(`${gridX},${gridY}`);
        this.icons.push(icon);
        
        // Add to DOM
        this.grid.appendChild(icon);
        
        // Make draggable
        this.makeDraggable(icon);
        
        // Save positions
        this.saveIconPositions();
        
        return true;
    }

    // Remove bookmark from desktop
    removeBookmarkFromDesktop(siteUrl) {
        const iconId = `bookmark-${siteUrl.replace(/[^a-zA-Z0-9]/g, '')}`;
        const icon = document.getElementById(iconId);
        
        if (icon) {
            // Remove from tracking
            const position = this.iconPositions[iconId];
            if (position) {
                this.occupiedSlots.delete(`${position.gridX},${position.gridY}`);
                delete this.iconPositions[iconId];
            }
            
            // Remove from icons array
            const iconIndex = this.icons.findIndex(i => i.id === iconId);
            if (iconIndex > -1) {
                this.icons.splice(iconIndex, 1);
            }
            
            // Remove from DOM
            icon.remove();
            
            // Save positions
            this.saveIconPositions();
            
            return true;
        }
        
        return false;
    }

    // Check if bookmark is on desktop
    isBookmarkOnDesktop(siteUrl) {
        const iconId = `bookmark-${siteUrl.replace(/[^a-zA-Z0-9]/g, '')}`;
        return document.getElementById(iconId) !== null;
    }

    createWindow(id, title, url, iconClass) {
        if (this.windows.length >= 50) {
            console.warn("Window limit reached. Cannot create new window.");
            this.showNotification("Window limit (50) reached.");
            return;
        }

        if (this.findWindow(id)) {
            this.findWindow(id).focus();
            return;
        }

        const newWindow = new AppWindow(id, title, url, iconClass, this);
        this.addWindow(newWindow);
    }

    findWindow(id) {
        return this.windows.find(win => win.id === id);
    }

    removeWindow(id) {
        this.windows = this.windows.filter(win => win.id !== id);
        this.updateWindowCounter();
    }

    addWindow(win) {
        this.windows.push(win);
        this.updateWindowCounter();
    }

    updateWindowCounter() {
        const counter = document.getElementById('window-counter');
        if (counter) {
            counter.textContent = `${this.windows.length}/50`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // ... existing code ...
}); 