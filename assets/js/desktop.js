document.addEventListener('DOMContentLoaded', () => {
    const desktopToggle = document.getElementById('start-button');
    const body = document.body;
    const windowContainer = document.getElementById('window-container');
    const taskbarPrograms = document.getElementById('taskbar-programs');
    const mainContent = document.querySelector('.main-content');
    
    let isDesktopMode = false;
    let openWindows = {};
    let zIndexCounter = 100;

    // Make openApp globally accessible
    window.openApp = openApp;

    // Listen for desktop mode changes from view-manager
    const observer = new MutationObserver((mutations) => {
        mutations.forEach((mutation) => {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const isDesktopMode = body.classList.contains('desktop-mode');
                if (mutation.oldValue !== body.className) {
                     if (isDesktopMode) initializeDesktopMode();
                     else exitDesktopMode();
                }
            }
        });
    });

    observer.observe(body, { attributes: true, attributeOldValue: true });

    // Star button toggle (for returning to normal mode)
    if (desktopToggle) {
        desktopToggle.addEventListener('click', () => {
            // This is handled by the StartMenu class now
        });
    }

    function initializeDesktopMode() {
        console.log('Desktop mode initialized');
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        // The DesktopManager now handles icon initialization
        if (window.desktopManager) {
            window.desktopManager.init();
        }
    }

    function exitDesktopMode() {
        console.log('Exiting desktop mode');
        if (mainContent) {
            mainContent.style.display = '';
        }
        closeAllWindows();
    }

    async function openApp(appId, appUrl, appTitle) {
        // Allow multiple instances of games or other specified apps
        if (appId.startsWith('game-') || appId.startsWith('sticky-note-')) {
            appId = `${appId}-${Date.now()}`;
        }

        if (openWindows[appId]) {
            focusWindow(appId);
            return;
        }

        const windowEl = createWindow(appId, appTitle);
        try {
            const response = await fetch(appUrl);
            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const appContent = doc.querySelector('.main-content')?.innerHTML || doc.body.innerHTML;
            
            windowEl.querySelector('.window-content').innerHTML = appContent;

            // This script loading is problematic, better to handle scripts within the page logic itself
            // For example, using a data-page-script attribute and initializing it after content load
            const pageScript = doc.querySelector('[data-page-script]')?.dataset.pageScript;
            if (pageScript && window.pageInitializers && window.pageInitializers[pageScript]) {
                 window.pageInitializers[pageScript]();
            }

        } catch (error) {
            windowEl.querySelector('.window-content').innerHTML = `<p>Error loading content for ${appTitle}.</p>`;
            console.error(`Error fetching content for ${appId}:`, error);
        }
    }
    
    function createWindow(appId, title) {
        const windowEl = document.createElement('div');
        windowEl.className = 'app-window glass-effect';
        windowEl.id = `window-${appId}`;
        windowEl.style.zIndex = zIndexCounter++;
        
        windowEl.innerHTML = `
            <div class="window-header">
                <div class="window-title">${title}</div>
                <div class="window-controls">
                    <button class="control-btn minimize" title="Minimize">-</button>
                    <button class="control-btn close" title="Close">×</button>
                </div>
            </div>
            <div class="window-content"><p>Loading...</p></div>
            <div class="resize-handle"></div>`;

        windowContainer.appendChild(windowEl);
        openWindows[appId] = { element: windowEl, minimized: false };

        makeWindowDraggable(windowEl);
        makeWindowResizable(windowEl);
        createTaskbarIcon(appId, title);

        windowEl.querySelector('.close').onclick = () => closeWindow(appId);
        windowEl.querySelector('.minimize').onclick = () => minimizeWindow(appId);
        windowEl.onmousedown = () => focusWindow(appId);

        return windowEl;
    }

    function closeWindow(appId) {
        if (openWindows[appId]) {
            openWindows[appId].element.remove();
            const taskbarIcon = document.getElementById(`taskbar-${appId}`);
            if (taskbarIcon) taskbarIcon.remove();
            delete openWindows[appId];
        }
    }

    function minimizeWindow(appId) {
        const win = openWindows[appId];
        win.element.style.display = 'none';
        win.minimized = true;
        document.getElementById(`taskbar-${appId}`).classList.remove('active');
    }

    function focusWindow(appId) {
        const win = openWindows[appId];
        if (win.minimized) {
            win.element.style.display = 'block';
            win.minimized = false;
        }
        win.element.style.zIndex = zIndexCounter++;
        document.querySelectorAll('.taskbar-item').forEach(item => item.classList.remove('active'));
        document.getElementById(`taskbar-${appId}`).classList.add('active');
    }

    function createTaskbarIcon(appId, title) {
        if (document.getElementById(`taskbar-${appId}`)) return; // Already exists

        const taskbarIcon = document.createElement('div');
        taskbarIcon.className = 'taskbar-item active';
        taskbarIcon.id = `taskbar-${appId}`;
        taskbarIcon.textContent = title.substring(0, 15); // Keep titles short
        taskbarIcon.title = title;
        taskbarIcon.onclick = () => focusWindow(appId);
        taskbarPrograms.appendChild(taskbarIcon);
    }
    
    function makeWindowDraggable(el) {
        const header = el.querySelector('.window-header');
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const dragMouseDown = (e) => {
            e.preventDefault();
            focusWindow(el.id.replace('window-',''));
            pos3 = e.clientX;
            pos4 = e.clientY;
            document.onmouseup = closeDragElement;
            document.onmousemove = elementDrag;
        };

        const elementDrag = (e) => {
            e.preventDefault();
            pos1 = pos3 - e.clientX;
            pos2 = pos4 - e.clientY;
            pos3 = e.clientX;
            pos4 = e.clientY;
            el.style.top = (el.offsetTop - pos2) + "px";
            el.style.left = (el.offsetLeft - pos1) + "px";
        };

        const closeDragElement = () => {
            this.saveIconPositions();
            document.onmouseup = null;
            document.onmousemove = null;
        };

        header.onmousedown = dragMouseDown;
    }

    function makeWindowResizable(el) {
        const handle = el.querySelector('.resize-handle');
        let startX, startY, startWidth, startHeight;

        const move = (e) => {
            const width = startWidth + (e.clientX - startX);
            const height = startHeight + (e.clientY - startY);
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
        };

        const initResize = (e) => {
            startX = e.clientX;
            startY = e.clientY;
            startWidth = el.offsetWidth;
            startHeight = el.offsetHeight;
            document.addEventListener('mousemove', move);
            document.addEventListener('mouseup', stopResize);
        };

        const stopResize = () => {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', stopResize);
        };

        handle.addEventListener('mousedown', initResize);
    }
    
    function closeAllWindows() {
        windowContainer.innerHTML = '';
        taskbarPrograms.innerHTML = '';
        openWindows = {};
    }

    // --- Manager Classes ---

    class ViewManager {
        constructor() {
            this.body = document.body;
            this.toggleButton = document.getElementById('desktop-back-button');
            if (this.toggleButton) {
                this.toggleButton.addEventListener('click', () => this.toggleView());
            }
        }

        toggleView() {
            window.location.href = window.siteBaseUrl || '/';
        }
    }

    class DesktopManager {
        constructor(grid) {
            this.grid = grid;
            if (!this.grid) {
                console.error("Desktop grid container not found!");
                return;
            }
            this.icons = Array.from(this.grid.children);
            this.gridSize = 80; // Icon size + gap
        }

        init() {
            this.loadIconPositions();
            this.icons.forEach(icon => {
                this.makeIconDraggable(icon);
                icon.ondblclick = () => window.openApp(icon.id, icon.dataset.appUrl, icon.dataset.appTitle);
                icon.onclick = (e) => { e.preventDefault(); }; // Prevent single-click actions
            });
        }

        loadIconPositions() {
            try {
                const positions = JSON.parse(localStorage.getItem('desktopIconPositions'));
                if (positions) {
                    this.icons.forEach(icon => {
                        if (positions[icon.id]) {
                            icon.style.top = positions[icon.id].top;
                            icon.style.left = positions[icon.id].left;
                        }
                    });
                }
            } catch (e) {
                console.error("Could not load icon positions:", e);
            }
        }

        saveIconPositions() {
            const positions = {};
            this.icons.forEach(icon => {
                positions[icon.id] = { top: icon.style.top, left: icon.style.left };
            });
            localStorage.setItem('desktopIconPositions', JSON.stringify(positions));
        }
        
        makeIconDraggable(icon) {
            let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
            icon.onmousedown = (e) => {
                if (e.button === 1) e.preventDefault();
                pos3 = e.clientX;
                pos4 = e.clientY;
                document.onmouseup = closeDragElement;
                document.onmousemove = elementDrag;
            };

            const elementDrag = (e) => {
                e.preventDefault();
                pos1 = pos3 - e.clientX;
                pos2 = pos4 - e.clientY;
                pos3 = e.clientX;
                pos4 = e.clientY;
                icon.style.top = (icon.offsetTop - pos2) + "px";
                icon.style.left = (icon.offsetLeft - pos1) + "px";
            };

            const closeDragElement = () => {
                this.saveIconPositions();
                document.onmouseup = null;
                document.onmousemove = null;
            };
        }
    }

    // --- Initialize Core Components ---
    window.viewManager = new ViewManager();
    // window.windowManager = new WindowManager(); // This is not a class, it's a set of functions
    
    // -- Desktop-specific initialization --
    const desktopGrid = document.getElementById('desktop-grid');
    if (desktopGrid) {
        window.desktopManager = new DesktopManager(desktopGrid);
    }

    if (window.startMenu) {
        window.startMenu.populate();
    }
});

class ViewManager {
    constructor() {
        this.toggleButton = document.getElementById('view-toggle');
        this.body = document.body;
        this.init();
    }

    init() {
        if (!this.toggleButton) return;
        this.toggleButton.addEventListener('click', () => this.toggleView());
    }

    toggleView() {
        this.body.classList.toggle('desktop-mode');
    }
}

class DesktopManager {
    constructor(grid) {
        this.grid = grid;
        if (!this.grid) {
            console.error("Desktop grid container not found!");
            return;
        }
        this.icons = Array.from(this.grid.children);
        this.gridCellSize = { width: 110, height: 110 };
        this.iconPositions = this.loadIconPositions();
    }

    init() {
        if (!this.grid) return;
        this.layoutIcons();
        this.icons.forEach(icon => this.makeIconDraggable(icon));
    }

    loadIconPositions() {
        try {
            const positions = localStorage.getItem('desktopIconPositions');
            return positions ? JSON.parse(positions) : {};
        } catch (e) {
            return {};
        }
    }

    saveIconPositions() {
        localStorage.setItem('desktopIconPositions', JSON.stringify(this.iconPositions));
    }

    layoutIcons() {
        const occupiedSlots = new Set();
        this.icons.forEach(icon => {
            const savedPosition = this.iconPositions[icon.id];
            if (savedPosition) {
                icon.style.left = `${savedPosition.gridX * this.gridCellSize.width}px`;
                icon.style.top = `${savedPosition.gridY * this.gridCellSize.height}px`;
                occupiedSlots.add(`${savedPosition.gridX},${savedPosition.gridY}`);
            }
        });

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
        return { gridX: 0, gridY: 0 };
    }

    makeIconDraggable(icon) {
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
            x = Math.max(0, Math.min(x, gridRect.width - icon.offsetWidth));
            y = Math.max(0, Math.min(y, gridRect.height - icon.offsetHeight));
            icon.style.left = `${x}px`;
            icon.style.top = `${y}px`;
        });

        document.addEventListener('mouseup', () => {
            if (!isDragging) return;
            isDragging = false;
            icon.style.zIndex = 'auto';
            const gridX = Math.round(parseFloat(icon.style.left) / this.gridCellSize.width);
            const gridY = Math.round(parseFloat(icon.style.top) / this.gridCellSize.height);
            icon.style.left = `${gridX * this.gridCellSize.width}px`;
            icon.style.top = `${gridY * this.gridCellSize.height}px`;
            this.iconPositions[icon.id] = { gridX, gridY };
            this.saveIconPositions();
        });

        icon.addEventListener('dblclick', () => {
            const url = icon.dataset.appUrl;
            const title = icon.dataset.appTitle;
            if (url && window.windowManager) {
                window.windowManager.createWindow(url, title);
            }
        });
    }
} 