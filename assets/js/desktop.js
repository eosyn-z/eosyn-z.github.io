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
                const hasDesktopMode = body.classList.contains('desktop-mode');
                if (hasDesktopMode !== isDesktopMode) {
                    isDesktopMode = hasDesktopMode;
                    if (isDesktopMode) {
                        initializeDesktopMode();
                    } else {
                        exitDesktopMode();
                    }
                }
            }
        });
    });

    observer.observe(body, { attributes: true });

    // Star button toggle (for returning to normal mode)
    if (desktopToggle) {
        desktopToggle.addEventListener('click', () => {
            // Trigger the view toggle to return to normal mode
            const viewToggle = document.getElementById('view-toggle');
            if (viewToggle) {
                viewToggle.click();
            }
        });
    }

    function initializeDesktopMode() {
        console.log('Desktop mode initialized');
        if (mainContent) {
            mainContent.style.display = 'none';
        }
        initializeDesktopIcons();
    }

    function exitDesktopMode() {
        console.log('Exiting desktop mode');
        if (mainContent) {
            mainContent.style.display = '';
        }
        closeAllWindows();
    }

    function initializeDesktopIcons() {
        document.querySelectorAll('.desktop-icon[data-app-url]').forEach(icon => {
            icon.onclick = () => openApp(icon.id, icon.dataset.appUrl, icon.dataset.appTitle);
        });
    }

    async function openApp(appId, appUrl, appTitle) {
        // Allow multiple instances of games
        if (appId.startsWith('game-')) {
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
            
            // Important: Find the main content of the page to inject
            const appContent = doc.querySelector('.main-content')?.innerHTML || doc.body.innerHTML;
            
            windowEl.querySelector('.window-content').innerHTML = appContent;

            Array.from(doc.querySelectorAll('script')).forEach(script => {
                const newScript = document.createElement('script');
                newScript.async = false; // Ensure scripts execute in order
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                windowEl.querySelector('.window-content').appendChild(newScript);
            });

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
                    <button class="control-btn minimize">-</button>
                    <button class="control-btn close">×</button>
                </div>
            </div>
            <div class="window-content">
                <p>Loading...</p>
            </div>
            <div class="resize-handle"></div>
        `;

        windowContainer.appendChild(windowEl);
        openWindows[appId] = { element: windowEl, minimized: false };

        makeDraggable(windowEl);
        makeResizable(windowEl);
        createTaskbarIcon(appId, title);

        windowEl.querySelector('.close').onclick = () => closeWindow(appId);
        windowEl.querySelector('.minimize').onclick = () => minimizeWindow(appId);
        windowEl.onmousedown = () => focusWindow(appId);

        return windowEl;
    }

    function closeWindow(appId) {
        openWindows[appId].element.remove();
        document.getElementById(`taskbar-${appId}`).remove();
        delete openWindows[appId];
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
        const taskbarIcon = document.createElement('div');
        taskbarIcon.className = 'taskbar-item active';
        taskbarIcon.id = `taskbar-${appId}`;
        taskbarIcon.textContent = title;
        taskbarIcon.onclick = () => focusWindow(appId);
        taskbarPrograms.appendChild(taskbarIcon);
    }
    
    function makeDraggable(el) {
        const header = el.querySelector('.window-header');
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        const dragMouseDown = (e) => {
            e.preventDefault();
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
            document.onmouseup = null;
            document.onmousemove = null;
        };

        header.onmousedown = dragMouseDown;
    }

    function makeResizable(el) {
        const handle = el.querySelector('.resize-handle');
        let startX, startY, startWidth, startHeight;

        const move = (e) => {
            const width = startWidth + (e.clientX - startX);
            const height = startHeight + (e.clientY - startY);
            el.style.width = `${width}px`;
            el.style.height = `${height}px`;
        };

        const addMove = (e) => {
            startX = e.clientX;
            startY = e.clientY;
            startWidth = el.offsetWidth;
            startHeight = el.offsetHeight;
            document.addEventListener('mousemove', move);
        };

        const removeMove = () => {
            document.removeEventListener('mousemove', move);
        };

        handle.addEventListener('mousedown', addMove);
        handle.addEventListener('mouseup', removeMove);
        document.addEventListener('mouseup', removeMove);
    }
    
    function closeAllWindows() {
        windowContainer.innerHTML = '';
        taskbarPrograms.innerHTML = '';
        openWindows = {};
    }

    // Centralized initialization for all desktop components
    window.viewManager = new ViewManager();
    window.windowManager = new WindowManager();
    window.favoritesManager = new FavoritesManager();
    window.startMenu = new StartMenu();
    window.windowSwitcher = new WindowSwitcher();
    window.desktopManager = new DesktopManager();
    
    // Initialize managers that need it
    window.favoritesManager.init();
    window.desktopManager.init();

    // Populate the Start Menu once all managers are ready
    if (window.jekyllPages && window.jekyllPages.length > 0) {
        window.startMenu.populateMenu(window.jekyllPages);
    } else {
        console.warn('Jekyll pages not found or empty. Start menu will not be populated.');
    }

    const discordWidgetTray = document.getElementById('discord-status-widget-tray');
    if (discordWidgetTray) {
        discordWidgetTray.innerHTML = `
// ... existing code ...
        `;
    }
});

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