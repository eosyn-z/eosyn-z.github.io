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
        const snap_grid_size = 20;
        let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;

        header.onmousedown = (e) => {
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
            
            let newTop = el.offsetTop - pos2;
            let newLeft = el.offsetLeft - pos1;

            // Snap to grid
            newTop = Math.round(newTop / snap_grid_size) * snap_grid_size;
            newLeft = Math.round(newLeft / snap_grid_size) * snap_grid_size;
            
            el.style.top = newTop + "px";
            el.style.left = newLeft + "px";
        };

        const closeDragElement = () => {
            this.saveIconPositions();
            document.onmouseup = null;
            document.onmousemove = null;
        };
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
            if (!this.grid) return;
            this.icons = Array.from(this.grid.children);
        }
        init() {
            this.layoutIcons();
            this.icons.forEach(icon => {
                this.makeIconDraggable(icon);
                icon.ondblclick = () => window.openApp(icon.id, icon.dataset.appUrl, icon.dataset.appTitle);
                icon.onclick = (e) => { e.preventDefault(); };
            });
        }
        layoutIcons() {
            const occupiedSlots = new Set();
            // First, get all positions from icons that have already been placed and saved.
            const savedPositions = this.loadIconPositions();

            this.icons.forEach(icon => {
                if (savedPositions[icon.id]) {
                    icon.style.top = savedPositions[icon.id].top;
                    icon.style.left = savedPositions[icon.id].left;
                    occupiedSlots.add(`${savedPositions[icon.id].left},${savedPositions[icon.id].top}`);
                }
            });

            // Now, place any new icons that don't have a saved position.
            this.icons.forEach(icon => {
                if (!icon.style.top || !icon.style.left) {
                    const { x, y } = this.findNextAvailableSlot(occupiedSlots);
                    const top = `${y}px`;
                    const left = `${x}px`;
                    icon.style.top = top;
                    icon.style.left = left;
                    occupiedSlots.add(`${left},${top}`);
                }
            });
            this.saveIconPositions(); // Save positions of newly placed icons
        }
        findNextAvailableSlot(occupiedSlots) {
            const gridWidth = this.grid.offsetWidth;
            const iconWidth = 80;
            const iconHeight = 80;
            const cols = Math.floor(gridWidth / iconWidth);

            for (let i = 0; ; i++) {
                const row = Math.floor(i / cols);
                const col = i % cols;
                const x = col * iconWidth + 10; // Add some padding
                const y = row * iconHeight + 10;
                const slot = `${x}px,${y}px`;
                if (!occupiedSlots.has(slot)) {
                    return { x, y };
                }
            }
        }
        loadIconPositions() {
            try {
                return JSON.parse(localStorage.getItem('desktopIconPositions') || '{}');
            } catch (e) {
                console.error("Could not load icon positions:", e);
                return {};
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
            const snapSize = 10; 

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
                
                let newTop = icon.offsetTop - pos2;
                let newLeft = icon.offsetLeft - pos1;

                newTop = Math.round(newTop / snapSize) * snapSize;
                newLeft = Math.round(newLeft / snapSize) * snapSize;

                icon.style.top = newTop + "px";
                icon.style.left = newLeft + "px";
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

    // Global function to open settings window
    window.openSettingsWindow = function() {
        if (window.windowManager) {
            window.windowManager.createWindow('settings', '⚙️ Settings', `
                <div style="padding: 1.5rem; height: 100%; overflow-y: auto; color: var(--theme-text);">
                    <h2 style="margin-top: 0; margin-bottom: 1.5rem;">⚙️ Desktop Settings</h2>
                    
                    <div style="display: grid; gap: 1rem; margin-bottom: 2rem;">
                        <div class="glass-card" style="padding: 1.5rem; background: var(--glass-bg-light); border-radius: 12px;">
                            <h3 style="margin-top: 0; margin-bottom: 1rem;">🎨 Theme & Appearance</h3>
                            <p style="margin-bottom: 1rem; color: var(--theme-text-secondary);">
                                Customize your desktop theme and appearance settings.
                            </p>
                            <div style="display: flex; gap: 0.5rem; flex-wrap;">
                                <button class="glass-button" onclick="window.customThemeEditor.createThemeEditorWindow()">
                                    Open Theme Editor
                                </button>
                                <button class="glass-button" onclick="window.customThemeEditor.closeThemeEditorTray()">
                                    Close Theme Editor
                                </button>
                            </div>
                        </div>
                        
                        <div class="glass-card" style="padding: 1.5rem; background: var(--glass-bg-light); border-radius: 12px;">
                            <h3 style="margin-top: 0; margin-bottom: 1rem;">📝 Sticky Notes</h3>
                            <p style="margin-bottom: 1rem; color: var(--theme-text-secondary);">
                                Create and manage sticky notes on your desktop.
                            </p>
                            <div style="display: flex; gap: 0.5rem; flex-wrap; margin-bottom: 1rem;">
                                <button class="glass-button" onclick="window.windowManager.createWindow('sticky-notes', '📝 Sticky Notes', window.windowManager.createStickyNotesContent())">
                                    Open Sticky Notes
                                </button>
                                <button class="glass-button" onclick="window.stickyNotesTray && window.stickyNotesTray.hide()">
                                    Close Sticky Notes Tray
                                </button>
                            </div>
                            <div style="display: flex; align-items: center; gap: 0.5rem; margin-top: 1rem;">
                                <label style="display: flex; align-items: center; gap: 0.5rem; cursor: pointer;">
                                    <input type="checkbox" id="sticky-notes-global-toggle" style="width: 16px; height: 16px;">
                                    <span>Sticky notes visible over main page by default</span>
                                </label>
                            </div>
                            <script>
                                // Initialize the toggle
                                const toggle = document.getElementById('sticky-notes-global-toggle');
                                if (toggle) {
                                    // Set initial state
                                    toggle.checked = window.windowManager ? window.windowManager.shouldStickyNoteBeGloballyVisible() : true;
                                    
                                    // Add change listener
                                    toggle.addEventListener('change', function() {
                                        if (window.windowManager) {
                                            window.windowManager.setStickyNotesGlobalVisible(this.checked);
                                        }
                                    });
                                }
                            </script>
                        </div>
                        
                        <div class="glass-card" style="padding: 1.5rem; background: var(--glass-bg-light); border-radius: 12px;">
                            <h3 style="margin-top: 0; margin-bottom: 1rem;">🖥️ Desktop Options</h3>
                            <p style="margin-bottom: 1rem; color: var(--theme-text-secondary);">
                                Manage desktop icons and layout.
                            </p>
                            <div style="display: flex; gap: 0.5rem; flex-wrap: wrap;">
                                <button class="glass-button" onclick="window.windowManager.createWindow('desktop-settings', 'Desktop Settings', 'Desktop settings content here...')">
                                    Desktop Settings
                                </button>
                            </div>
                        </div>
                    </div>
                    
                    <div style="background: var(--glass-bg-medium); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                        <h4 style="margin-top: 0;">💡 Quick Tips</h4>
                        <ul style="margin: 0; padding-left: 1.5rem; color: var(--theme-text-secondary);">
                            <li>Use the theme buttons in the header for quick theme switching</li>
                            <li>Click the "+" button in the header to quickly create sticky notes</li>
                            <li>Right-click on the desktop for additional options</li>
                            <li>Use the start menu (⊞) to access all applications</li>
                        </ul>
                    </div>
                </div>
            `);
        }
    };

    // === Custom Context Menu for Desktop Icons ===

    // Remove any existing context menu
    function removeContextMenu() {
        const existingMenu = document.querySelector('.context-menu');
        if (existingMenu) existingMenu.remove();
    }

    // === Icon Editor Modal ===
    function removeIconEditor() {
        const existing = document.getElementById('icon-editor-modal');
        if (existing) existing.remove();
    }

    function showIconEditor(icon) {
        removeIconEditor();
        const modal = document.createElement('div');
        modal.id = 'icon-editor-modal';
        modal.style.position = 'fixed';
        modal.style.left = '50%';
        modal.style.top = '50%';
        modal.style.transform = 'translate(-50%, -50%)';
        modal.style.zIndex = '9999';
        modal.style.background = 'var(--glass-bg-heavy, #222)';
        modal.style.border = '1px solid var(--glass-border-light, #888)';
        modal.style.borderRadius = '16px';
        modal.style.padding = '2rem';
        modal.style.boxShadow = '0 8px 32px rgba(0,0,0,0.3)';
        modal.innerHTML = `
            <h2 style="margin-top:0; color:var(--theme-text)">Edit Icon</h2>
            <label style="color:var(--theme-text)">Icon (emoji or image URL):</label><br>
            <input id="icon-image-input" type="text" value="${icon.querySelector('.icon-image').textContent || ''}" style="width:80px; font-size:2rem; text-align:center; margin-bottom:1rem;"><br>
            <label style="color:var(--theme-text)">Label:</label><br>
            <input id="icon-label-input" type="text" value="${icon.querySelector('.icon-label').textContent}" style="width:160px; margin-bottom:1rem;"><br>
            <button id="icon-editor-save" class="glass-button" style="margin-right:1rem;">Save</button>
            <button id="icon-editor-cancel" class="glass-button">Cancel</button>
        `;
        document.body.appendChild(modal);

        // Live preview for icon
        const iconImageInput = modal.querySelector('#icon-image-input');
        iconImageInput.addEventListener('input', () => {
            const val = iconImageInput.value.trim();
            if (val.startsWith('http')) {
                icon.querySelector('.icon-image').innerHTML = `<img src='${val}' style='width:48px;height:48px;object-fit:contain;'>`;
            } else {
                icon.querySelector('.icon-image').textContent = val;
            }
        });
        // Live preview for label
        const iconLabelInput = modal.querySelector('#icon-label-input');
        iconLabelInput.addEventListener('input', () => {
            icon.querySelector('.icon-label').textContent = iconLabelInput.value;
            icon.dataset.appTitle = iconLabelInput.value;
        });
        // Save
        modal.querySelector('#icon-editor-save').onclick = () => {
            removeIconEditor();
        };
        // Cancel
        modal.querySelector('#icon-editor-cancel').onclick = () => {
            removeIconEditor();
        };
        // Remove on outside click
        setTimeout(() => {
            document.addEventListener('mousedown', function handler(e) {
                if (!modal.contains(e.target)) {
                    removeIconEditor();
                    document.removeEventListener('mousedown', handler);
                }
            });
        }, 0);
    }

    // Show context menu for a desktop icon
    function showIconContextMenu(icon, x, y) {
        removeContextMenu();
        const menu = document.createElement('div');
        menu.className = 'context-menu';
        menu.style.left = x + 'px';
        menu.style.top = y + 'px';
        menu.innerHTML = `
            <div class="menu-item" data-action="edit">Edit Icon...</div>
            <div class="menu-item" data-action="rename">Rename</div>
            <div class="menu-item" data-action="delete">Delete</div>
        `;
        document.body.appendChild(menu);
        menu.addEventListener('click', (e) => {
            if (e.target.classList.contains('menu-item')) {
                const action = e.target.dataset.action;
                if (action === 'edit') {
                    showIconEditor(icon);
                } else if (action === 'rename') {
                    const newName = prompt('Enter new name for this icon:', icon.dataset.appTitle);
                    if (newName) {
                        icon.querySelector('.icon-label').textContent = newName;
                        icon.dataset.appTitle = newName;
                    }
                } else if (action === 'delete') {
                    if (confirm('Delete this icon?')) {
                        icon.remove();
                    }
                }
                removeContextMenu();
            }
        });
        setTimeout(() => {
            document.addEventListener('mousedown', removeContextMenu, { once: true });
        }, 0);
    }

    // Attach context menu to all desktop icons after they are rendered
    function attachIconContextMenus() {
        document.querySelectorAll('.desktop-icon').forEach(icon => {
            icon.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                showIconContextMenu(icon, e.clientX, e.clientY);
            });
        });
    }

    // Call this after icons are rendered/updated
    if (window.desktopManager) {
        const origInit = window.desktopManager.init.bind(window.desktopManager);
        window.desktopManager.init = function() {
            origInit();
            attachIconContextMenus();
        };
        window.desktopManager.init();
    } else {
        // Fallback: attach on DOMContentLoaded
        document.addEventListener('DOMContentLoaded', attachIconContextMenus);
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
        this.layoutIcons();
        this.icons.forEach(icon => {
            this.makeIconDraggable(icon);
            icon.ondblclick = () => window.openApp(icon.id, icon.dataset.appUrl, icon.dataset.appTitle);
            icon.onclick = (e) => { e.preventDefault(); }; // Prevent single-click actions
        });
    }

    loadIconPositions() {
        try {
            const positions = localStorage.getItem('desktopIconPositions');
            return positions ? JSON.parse(positions) : {};
        } catch (e) {
            console.error("Could not load icon positions:", e);
            return {};
        }
    }

    saveIconPositions() {
        localStorage.setItem('desktopIconPositions', JSON.stringify(this.iconPositions));
    }

    layoutIcons() {
        const occupiedSlots = new Set();
        this.icons.forEach(icon => {
            // If an icon already has a saved position, respect it.
            if (icon.style.top && icon.style.left) {
                const slot = `${icon.style.left},${icon.style.top}`;
                occupiedSlots.add(slot);
            }
        });

        this.icons.forEach(icon => {
            // If an icon does NOT have a saved position, place it in the next available slot.
            if (!icon.style.top || !icon.style.left) {
                const { x, y } = this.findNextAvailableSlot(occupiedSlots);
                icon.style.left = `${x}px`;
                icon.style.top = `${y}px`;
                occupiedSlots.add(`${x},${y}`);
            }
        });

        this.loadIconPositions(); // Load saved positions for icons that have them
    }

    findNextAvailableSlot(occupiedSlots) {
        const gridWidth = this.grid.offsetWidth;
        const iconWidth = 80;
        const iconHeight = 80;
        const cols = Math.floor(gridWidth / iconWidth);

        for (let i = 0; ; i++) {
            const row = Math.floor(i / cols);
            const col = i % cols;
            const x = col * iconWidth;
            const y = row * iconHeight;

            const slot = `${x},${y}`;
            if (!occupiedSlots.has(slot)) {
                return { x, y };
            }
        }
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