class WindowManager {
    constructor() {
        this.windows = [];
        this.zIndexCounter = 1000;
        this.activeWindow = null;
        this.desktopIcons = [];
        this.iconPositions = this.loadIconPositions();
    }
    createWindow(options) {
        const windowId = `window-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
        const windowEl = document.createElement('div');
        windowEl.className = 'desktop-window';
        windowEl.id = windowId;
        windowEl.style.zIndex = ++this.zIndexCounter;
        const titleBar = document.createElement('div');
        titleBar.className = 'window-titlebar';
        titleBar.innerHTML = `
            <div class="window-dots">
                <span class="window-dot red"></span>
                <span class="window-dot yellow"></span>
                <span class="window-dot green"></span>
            </div>
            <span class="window-title">${options.title || 'Untitled'}</span>
            <div class="window-controls">
                <button class="window-minimize">−</button>
                <button class="window-maximize">□</button>
                <button class="window-close">×</button>
            </div>
        `;
        const contentArea = document.createElement('div');
        contentArea.className = 'window-content';
        contentArea.innerHTML = options.content || '';
        windowEl.appendChild(titleBar);
        windowEl.appendChild(contentArea);
        document.body.appendChild(windowEl);
        const width = options.width || 800;
        const height = options.height || 600;
        windowEl.style.width = `${width}px`;
        windowEl.style.height = `${height}px`;
        windowEl.style.left = `${(window.innerWidth - width) / 2}px`;
        windowEl.style.top = `${(window.innerHeight - height) / 2}px`;
        this.makeDraggable(windowEl, titleBar);
        this.makeResizable(windowEl);
        titleBar.querySelector('.window-close').addEventListener('click', () => {
            this.closeWindow(windowId);
        });
        titleBar.querySelector('.window-minimize').addEventListener('click', () => {
            this.minimizeWindow(windowId);
        });
        titleBar.querySelector('.window-maximize').addEventListener('click', () => {
            this.maximizeWindow(windowId);
        });
        windowEl.addEventListener('mousedown', () => {
            this.focusWindow(windowId);
        });
        this.windows.push({
            id: windowId,
            element: windowEl,
            options: options,
            minimized: false,
            maximized: false,
            originalBounds: null
        });
        this.focusWindow(windowId);
        return windowId;
    }
    makeDraggable(windowEl, handle) {
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        handle.addEventListener('mousedown', (e) => {
            if (e.target.classList.contains('window-dot') ||
                e.target.classList.contains('window-close') ||
                e.target.classList.contains('window-minimize') ||
                e.target.classList.contains('window-maximize')) {
                return;
            }
            isDragging = true;
            initialX = e.clientX - windowEl.offsetLeft;
            initialY = e.clientY - windowEl.offsetTop;
        });
        document.addEventListener('mousemove', (e) => {
            if (isDragging) {
                e.preventDefault();
                currentX = e.clientX - initialX;
                currentY = e.clientY - initialY;
                windowEl.style.left = `${currentX}px`;
                windowEl.style.top = `${currentY}px`;
            }
        });
        document.addEventListener('mouseup', () => {
            isDragging = false;
        });
    }
    makeResizable(windowEl) {
        const resizers = ['top', 'right', 'bottom', 'left', 'top-right', 'top-left', 'bottom-right', 'bottom-left'];
        resizers.forEach(position => {
            const resizer = document.createElement('div');
            resizer.className = `resizer resizer-${position}`;
            windowEl.appendChild(resizer);
            let isResizing = false;
            let startX, startY, startWidth, startHeight, startLeft, startTop;
            resizer.addEventListener('mousedown', (e) => {
                isResizing = true;
                startX = e.clientX;
                startY = e.clientY;
                startWidth = parseInt(windowEl.style.width, 10);
                startHeight = parseInt(windowEl.style.height, 10);
                startLeft = windowEl.offsetLeft;
                startTop = windowEl.offsetTop;
                e.preventDefault();
            });
            document.addEventListener('mousemove', (e) => {
                if (!isResizing) return;
                const dx = e.clientX - startX;
                const dy = e.clientY - startY;
                if (position.includes('right')) {
                    windowEl.style.width = `${Math.max(300, startWidth + dx)}px`;
                }
                if (position.includes('left')) {
                    const newWidth = Math.max(300, startWidth - dx);
                    if (newWidth > 300) {
                        windowEl.style.width = `${newWidth}px`;
                        windowEl.style.left = `${startLeft + dx}px`;
                    }
                }
                if (position.includes('bottom')) {
                    windowEl.style.height = `${Math.max(200, startHeight + dy)}px`;
                }
                if (position.includes('top')) {
                    const newHeight = Math.max(200, startHeight - dy);
                    if (newHeight > 200) {
                        windowEl.style.height = `${newHeight}px`;
                        windowEl.style.top = `${startTop + dy}px`;
                    }
                }
            });
            document.addEventListener('mouseup', () => {
                isResizing = false;
            });
        });
    }
    loadIconPositions() {
        const saved = localStorage.getItem('desktopIconPositions');
        return saved ? JSON.parse(saved) : {};
    }
    saveIconPositions() {
        localStorage.setItem('desktopIconPositions', JSON.stringify(this.iconPositions));
    }
    makeIconDraggable(iconEl) {
        let isDragging = false;
        let hasDragStarted = false;
        let startX, startY, initialX, initialY;
        const iconId = iconEl.dataset.action;
        const DRAG_THRESHOLD = 5; // pixels to move before drag starts

        if (this.iconPositions[iconId]) {
            iconEl.style.left = this.iconPositions[iconId].x + 'px';
            iconEl.style.top = this.iconPositions[iconId].y + 'px';
            iconEl.style.position = 'absolute';
        }

        iconEl.addEventListener('mousedown', (e) => {
            // Don't start drag on double-click
            if (e.detail === 2) return;

            // Mark potential drag start
            isDragging = true;
            hasDragStarted = false;
            startX = e.clientX;
            startY = e.clientY;
            const rect = iconEl.getBoundingClientRect();
            const desktop = iconEl.parentElement.getBoundingClientRect();
            initialX = rect.left - desktop.left;
            initialY = rect.top - desktop.top;
            // Don't set position absolute here - wait until drag actually starts

            // Select the icon
            document.querySelectorAll('.desktop-icon').forEach(icon => {
                icon.classList.remove('selected');
            });
            iconEl.classList.add('selected');
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const dx = e.clientX - startX;
            const dy = e.clientY - startY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            // Only start actual dragging after threshold is met
            if (!hasDragStarted && distance > DRAG_THRESHOLD) {
                hasDragStarted = true;
                iconEl.style.position = 'absolute';  // Set position when drag starts
                iconEl.style.zIndex = '1000';
                e.preventDefault();
            }

            // Only move if drag has actually started
            if (hasDragStarted) {
                iconEl.style.left = (initialX + dx) + 'px';
                iconEl.style.top = (initialY + dy) + 'px';
            }
        });
        document.addEventListener('mouseup', (e) => {
            if (isDragging) {
                isDragging = false;

                // Only snap and save if drag actually happened
                if (hasDragStarted) {
                    iconEl.style.zIndex = '';

                    // Grid snapping - snap to 100x100 grid
                    const gridSize = 100;
                    const currentX = parseInt(iconEl.style.left);
                    const currentY = parseInt(iconEl.style.top);
                    const snappedX = Math.round(currentX / gridSize) * gridSize;
                    const snappedY = Math.round(currentY / gridSize) * gridSize;

                    iconEl.style.left = snappedX + 'px';
                    iconEl.style.top = snappedY + 'px';

                    this.iconPositions[iconId] = {
                        x: snappedX,
                        y: snappedY
                    };
                    this.saveIconPositions();
                }
            }
        });
    }
    focusWindow(windowId) {
        const window = this.windows.find(w => w.id === windowId);
        if (!window) return;
        this.windows.forEach(w => {
            w.element.classList.remove('focused');
        });
        window.element.classList.add('focused');
        window.element.style.zIndex = ++this.zIndexCounter;
        this.activeWindow = windowId;
    }
    closeWindow(windowId) {
        const windowIndex = this.windows.findIndex(w => w.id === windowId);
        if (windowIndex === -1) return;
        const window = this.windows[windowIndex];
        window.element.remove();
        this.windows.splice(windowIndex, 1);
        if (this.activeWindow === windowId) {
            this.activeWindow = this.windows.length > 0 ? this.windows[this.windows.length - 1].id : null;
        }
    }
    minimizeWindow(windowId) {
        const window = this.windows.find(w => w.id === windowId);
        if (!window) return;
        window.minimized = !window.minimized;
        if (window.minimized) {
            window.element.style.display = 'none';
            this.addToTaskbar(window);
        } else {
            window.element.style.display = 'flex';
            this.focusWindow(windowId);
            this.removeFromTaskbar(windowId);
        }
    }
    addToTaskbar(window) {
        const taskbar = document.querySelector('.taskbar-windows');
        if (!taskbar) return;
        if (taskbar.querySelector(`[data-window-id="${window.id}"]`)) return;
        const taskbarItem = document.createElement('button');
        taskbarItem.className = 'taskbar-item';
        taskbarItem.dataset.windowId = window.id;
        taskbarItem.textContent = window.options.title || 'Untitled';
        taskbarItem.onclick = () => {
            this.minimizeWindow(window.id);
        };
        taskbar.appendChild(taskbarItem);
    }
    removeFromTaskbar(windowId) {
        const taskbar = document.querySelector('.taskbar-windows');
        if (!taskbar) return;
        const item = taskbar.querySelector(`[data-window-id="${windowId}"]`);
        if (item) item.remove();
    }
    maximizeWindow(windowId) {
        const window = this.windows.find(w => w.id === windowId);
        if (!window) return;
        window.maximized = !window.maximized;
        if (window.maximized) {

            window.originalBounds = {
                left: window.element.style.left,
                top: window.element.style.top,
                width: window.element.style.width,
                height: window.element.style.height
            };
            window.element.style.left = '0';
            window.element.style.top = '0';
            window.element.style.width = '100vw';
            window.element.style.height = '100vh';
        } else {

            if (window.originalBounds) {
                window.element.style.left = window.originalBounds.left;
                window.element.style.top = window.originalBounds.top;
                window.element.style.width = window.originalBounds.width;
                window.element.style.height = window.originalBounds.height;
            }
        }
    }
    openArticle(sectionName, slug) {
        const sectionData = window.contentData ? window.contentData[sectionName] : null;
        if (!sectionData) return;
        const page = sectionData.pages.find(p => p.slug === slug);
        if (!page) return;
        const content = `
            <div class="window-article">
                <h1>${page.title}</h1>
                <div class="article-meta">${formatDate(page.date)}</div>
                <div class="markdown-content">${typeof marked !== 'undefined' ? marked.parse(page.content) : page.content}</div>
            </div>
        `;
        this.createWindow({
            title: page.title,
            content: content,
            width: 900,
            height: 700
        });
    }
}
class ContextMenu {
    constructor() {
        this.menu = null;
        this.setupContextMenu();
    }
    setupContextMenu() {
        document.addEventListener('contextmenu', (e) => {
            if (!desktopModeActive) return;
            e.preventDefault();
            this.hideMenu();
            const isDesktopBackground = e.target.classList.contains('desktop-grid') ||
                                       e.target.classList.contains('desktop-interface');
            const isIcon = e.target.closest('.desktop-icon');
            if (isDesktopBackground || isIcon) {
                this.showMenu(e.clientX, e.clientY, isIcon);
            }
        });
        document.addEventListener('click', () => {
            this.hideMenu();
        });
    }
    showMenu(x, y, targetIcon) {
        this.menu = document.createElement('div');
        this.menu.className = 'context-menu';
        this.menu.style.left = `${x}px`;
        this.menu.style.top = `${y}px`;
        const items = [];
        if (targetIcon) {
            items.push(
                { label: 'Open', action: () => handleDesktopIconClick(targetIcon.dataset.action) },
                { label: 'Rename', action: () => this.renameIcon(targetIcon) },
                { divider: true },
                { label: 'Delete', action: () => this.deleteIcon(targetIcon) }
            );
        } else {
            items.push(
                { label: 'Refresh Desktop', action: () => location.reload() },
                { label: 'Change Wallpaper', action: () => this.changeWallpaper() },
                { divider: true },
                { label: 'New Folder', action: () => this.createNewFolder() },
                { label: 'Arrange Icons', action: () => this.arrangeIcons() }
            );
        }
        items.forEach(item => {
            if (item.divider) {
                const divider = document.createElement('div');
                divider.className = 'context-menu-divider';
                this.menu.appendChild(divider);
            } else {
                const menuItem = document.createElement('div');
                menuItem.className = 'context-menu-item';
                menuItem.textContent = item.label;
                menuItem.onclick = () => {
                    item.action();
                    this.hideMenu();
                };
                this.menu.appendChild(menuItem);
            }
        });
        document.body.appendChild(this.menu);
    }
    hideMenu() {
        if (this.menu) {
            this.menu.remove();
            this.menu = null;
        }
    }
    renameIcon(icon) {
        const label = icon.querySelector('.icon-label');
        const currentName = label.textContent;
        const newName = prompt('Enter new name:', currentName);
        if (newName && newName !== currentName) {
            label.textContent = newName;
        }
    }
    deleteIcon(icon) {
        if (confirm('Delete this icon?')) {
            icon.remove();
        }
    }
    changeWallpaper() {
        const wallpapers = [
            'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)',
            'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)',
            'linear-gradient(135deg, #fa709a 0%, #fee140 100%)',
            'linear-gradient(135deg, #30cfd0 0%, #330867 100%)',
            'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)',
            'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)'
        ];
        const desktop = document.querySelector('.desktop-interface');
        if (desktop) {
            const currentIndex = parseInt(localStorage.getItem('desktopWallpaper') || '0');
            const nextIndex = (currentIndex + 1) % wallpapers.length;
            desktop.style.background = wallpapers[nextIndex];
            localStorage.setItem('desktopWallpaper', nextIndex);
        }
    }
    createNewFolder() {
        const desktop = document.querySelector('.desktop-grid');
        if (!desktop) return;
        const folder = document.createElement('div');
        folder.className = 'desktop-icon';
        folder.dataset.action = 'folder-' + Date.now();
        folder.innerHTML = `
            <div class="icon">📁</div>
            <div class="icon-label">New Folder</div>
        `;
        desktop.appendChild(folder);
        windowManager.makeIconDraggable(folder);
    }
    arrangeIcons() {
        const icons = document.querySelectorAll('.desktop-icon');
        const grid = 120;
        icons.forEach((icon, index) => {
            const row = Math.floor(index / 8);
            const col = index % 8;
            icon.style.position = 'absolute';
            icon.style.left = (col * grid) + 'px';
            icon.style.top = (row * grid) + 'px';
            windowManager.iconPositions[icon.dataset.action] = {
                x: col * grid,
                y: row * grid
            };
        });
        windowManager.saveIconPositions();
    }
}
let windowManager = null;
let contextMenu = null;
function initializeDesktopMode() {

    if (!window.siteSettings || !window.siteSettings.DESKTOP_MODE_ENABLED) {
        console.log('Desktop mode not enabled');
        return;
    }
    windowManager = new WindowManager();
    contextMenu = new ContextMenu();
    const navActions = document.querySelector('.nav-actions');
    if (navActions) {
        const desktopToggle = document.createElement('button');
        desktopToggle.className = 'nav-action-btn desktop-mode-toggle';
        desktopToggle.innerHTML = '<span></span>';
        desktopToggle.title = 'Desktop Mode';
        desktopToggle.onclick = toggleDesktopMode;
        navActions.insertBefore(desktopToggle, navActions.firstChild);
    }
}
let desktopModeActive = false;
function toggleDesktopMode() {
    desktopModeActive = !desktopModeActive;
    document.body.classList.toggle('desktop-mode', desktopModeActive);
    if (desktopModeActive) {

        document.querySelector('.container').style.display = 'none';
        showDesktopInterface();
    } else {

        document.querySelector('.container').style.display = 'block';
        hideDesktopInterface();
    }
}
function showDesktopInterface() {
    let desktop = document.getElementById('desktop-interface');
    if (!desktop) {
        desktop = document.createElement('div');
        desktop.id = 'desktop-interface';
        desktop.className = 'desktop-interface';

        // Add proper desktop styles
        const styleSheet = document.createElement('style');
        styleSheet.textContent = `
            .desktop-interface {
                position: fixed;
                top: 0;
                left: 0;
                width: 100vw;
                height: 100vh;
                background: linear-gradient(135deg, #1e3c72, #2a5298);
                background-image: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect width="100" height="100" fill="%231e3c72"/><circle cx="50" cy="50" r="30" fill="%232a5298" opacity="0.3"/></svg>');
                background-size: cover;
                overflow: hidden;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }

            .desktop-wallpaper {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 40px;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            }

            .desktop-grid {
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                bottom: 60px;
                display: grid;
                grid-template-columns: repeat(auto-fill, 80px);
                grid-auto-rows: 90px;
                gap: 20px;
                align-content: start;
                padding: 10px;
            }

            .desktop-icon {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                cursor: pointer;
                padding: 8px;
                border-radius: 4px;
                transition: background 0.2s;
                user-select: none;
            }

            .desktop-icon:hover {
                background: rgba(255, 255, 255, 0.1);
                backdrop-filter: blur(10px);
            }

            .desktop-icon.selected {
                background: rgba(0, 120, 215, 0.5);
                backdrop-filter: blur(10px);
            }

            .desktop-icon .icon {
                font-size: 32px;
                margin-bottom: 4px;
                filter: drop-shadow(0 1px 2px rgba(0,0,0,0.3));
            }

            .desktop-icon .icon-label {
                color: white;
                font-size: 12px;
                text-align: center;
                text-shadow: 0 1px 2px rgba(0,0,0,0.8);
                max-width: 70px;
                word-wrap: break-word;
            }

            .desktop-taskbar {
                position: absolute;
                bottom: 0;
                left: 0;
                right: 0;
                height: 40px;
                background: rgba(0, 0, 0, 0.85);
                backdrop-filter: blur(10px);
                display: flex;
                align-items: center;
                padding: 0 10px;
                z-index: 10000;
            }

            .start-button {
                width: 100px;
                height: 30px;
                background: linear-gradient(to bottom, #3a7bd5, #2e5cb8);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 3px;
                color: white;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 5px;
                cursor: pointer;
                font-size: 14px;
                font-weight: 500;
                margin-right: 10px;
            }

            .start-button:hover {
                background: linear-gradient(to bottom, #4a8be5, #3e6cc8);
            }

            .taskbar-windows {
                display: flex;
                gap: 5px;
                flex: 1;
            }

            .taskbar-window {
                padding: 5px 15px;
                background: rgba(255,255,255,0.1);
                border: 1px solid rgba(255,255,255,0.2);
                border-radius: 3px;
                color: white;
                cursor: pointer;
                font-size: 13px;
                max-width: 200px;
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .taskbar-window:hover {
                background: rgba(255,255,255,0.2);
            }

            .taskbar-window.active {
                background: rgba(0, 120, 215, 0.7);
            }

            .system-tray {
                display: flex;
                align-items: center;
                gap: 10px;
                padding: 0 10px;
                color: white;
                font-size: 12px;
            }

            .start-menu {
                position: absolute;
                bottom: 45px;
                left: 5px;
                width: 350px;
                height: 500px;
                background: rgba(20, 20, 20, 0.95);
                backdrop-filter: blur(20px);
                border: 1px solid rgba(255,255,255,0.1);
                border-radius: 8px;
                display: none;
                flex-direction: column;
                overflow: hidden;
                box-shadow: 0 8px 32px rgba(0,0,0,0.5);
            }

            .start-menu.open {
                display: flex;
            }

            .start-menu-header {
                padding: 20px;
                background: linear-gradient(to right, #667eea, #764ba2);
                color: white;
            }

            .start-menu-items {
                flex: 1;
                overflow-y: auto;
                padding: 10px;
            }

            .start-menu-item {
                padding: 10px 15px;
                color: white;
                cursor: pointer;
                border-radius: 4px;
                display: flex;
                align-items: center;
                gap: 10px;
                transition: background 0.2s;
            }

            .start-menu-item:hover {
                background: rgba(255,255,255,0.1);
            }
        `;
        document.head.appendChild(styleSheet);

        desktop.innerHTML = `
            <div class="desktop-wallpaper"></div>
            <div class="desktop-grid">
                <!-- Browser -->
                <div class="desktop-icon" data-action="browser">
                    <div class="icon"></div>
                    <div class="icon-label">Web Browser</div>
                </div>

                <!-- Pages -->
                <div class="desktop-icon" data-action="page:home" data-url="index.html">
                    <div class="icon"></div>
                    <div class="icon-label">Home</div>
                </div>
                <div class="desktop-icon" data-action="page:art" data-url="pages/art.html">
                    <div class="icon"></div>
                    <div class="icon-label">Art Gallery</div>
                </div>
                <div class="desktop-icon" data-action="page:games" data-url="pages/games.html">
                    <div class="icon"></div>
                    <div class="icon-label">Games</div>
                </div>
                <div class="desktop-icon" data-action="page:nature" data-url="pages/nature.html">
                    <div class="icon">🌿</div>
                    <div class="icon-label">Nature</div>
                </div>
                <div class="desktop-icon" data-action="page:music" data-url="pages/music.html">
                    <div class="icon"></div>
                    <div class="icon-label">Music</div>
                </div>
                <div class="desktop-icon" data-action="page:media" data-url="pages/media.html">
                    <div class="icon"></div>
                    <div class="icon-label">Media</div>
                </div>
                <div class="desktop-icon" data-action="page:sites" data-url="pages/sites.html">
                    <div class="icon"></div>
                    <div class="icon-label">Sites</div>
                </div>
                <div class="desktop-icon" data-action="page:irc" data-url="pages/irc.html">
                    <div class="icon"></div>
                    <div class="icon-label">IRC Chat</div>
                </div>
                <!-- Content Folders -->
                <div class="desktop-icon" data-action="projects">
                    <div class="icon">📁</div>
                    <div class="icon-label">Projects</div>
                </div>
                <div class="desktop-icon" data-action="thoughts">
                    <div class="icon"></div>
                    <div class="icon-label">Thoughts</div>
                </div>
                <div class="desktop-icon" data-action="learning">
                    <div class="icon"></div>
                    <div class="icon-label">Learning</div>
                </div>
                <div class="desktop-icon" data-action="resources">
                    <div class="icon"></div>
                    <div class="icon-label">Resources</div>
                </div>
            </div>

            <!-- Start Menu -->
            <div class="start-menu" id="startMenu">
                <div class="start-menu-header">
                    <h3>EOSYN.NET</h3>
                    <p style="margin: 5px 0; opacity: 0.8;">Desktop Environment</p>
                </div>
                <div class="start-menu-items">
                    <div class="start-menu-item" data-action="page:home" data-url="index.html">
                        <span></span> Home
                    </div>
                    <div class="start-menu-item" data-action="page:art" data-url="pages/art.html">
                        <span></span> Art Gallery
                    </div>
                    <div class="start-menu-item" data-action="page:games" data-url="pages/games.html">
                        <span></span> Games
                    </div>
                    <div class="start-menu-item" data-action="page:music" data-url="pages/music.html">
                        <span></span> Music
                    </div>
                    <div class="start-menu-item" data-action="browser">
                        <span></span> Web Browser
                    </div>
                    <div class="start-menu-item" data-action="projects">
                        <span>📁</span> Projects
                    </div>
                    <hr style="border: 1px solid rgba(255,255,255,0.1); margin: 10px 0;">
                    <div class="start-menu-item" onclick="toggleDesktopMode()">
                        <span>🚪</span> Exit Desktop Mode
                    </div>
                </div>
            </div>

            <!-- Taskbar -->
            <div class="desktop-taskbar">
                <button class="start-button" id="startButton">
                    <span></span> Start
                </button>
                <div class="taskbar-windows"></div>
                <div class="system-tray">
                    <span id="desktopClock">--:--</span>
                </div>
            </div>
        `;
        document.body.appendChild(desktop);
        desktop.querySelectorAll('.desktop-icon').forEach(icon => {
            windowManager.makeIconDraggable(icon);

            // Add single-click to open windows
            icon.addEventListener('click', (e) => {
                e.preventDefault();
                const action = icon.dataset.action;
                if (action) {
                    handleDesktopIconClick(action);
                }
            });
        });

        // Start button functionality
        const startButton = desktop.querySelector('#startButton');
        const startMenu = desktop.querySelector('#startMenu');
        startButton.addEventListener('click', (e) => {
            e.stopPropagation();
            startMenu.classList.toggle('open');
        });

        // Close start menu when clicking elsewhere
        document.addEventListener('click', (e) => {
            if (!startMenu.contains(e.target) && e.target !== startButton) {
                startMenu.classList.remove('open');
            }
        });

        // Start menu items
        desktop.querySelectorAll('.start-menu-item').forEach(item => {
            item.addEventListener('click', () => {
                const action = item.dataset.action;
                if (action) {
                    handleDesktopIconClick(action);
                    startMenu.classList.remove('open');
                }
            });
        });

        // Update clock every second
        function updateClock() {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            document.getElementById('desktopClock').textContent = `${hours}:${minutes}`;
        }
        updateClock();
        setInterval(updateClock, 1000);
    }
    desktop.style.display = 'block';
}
function hideDesktopInterface() {
    const desktop = document.getElementById('desktop-interface');
    if (desktop) {
        desktop.style.display = 'none';
    }
    if (windowManager) {
        windowManager.windows.forEach(w => windowManager.closeWindow(w.id));
    }
}
function handleDesktopIconClick(action) {
    if (!windowManager) {
        console.error('Window manager not initialized');
        return;
    }

    const icon = document.querySelector(`[data-action="${action}"]`);
    if (action.startsWith('page:')) {
        const url = icon?.dataset.url;
        const pageName = action.replace('page:', '');
        const title = icon?.querySelector('.icon-label')?.textContent || pageName;
        if (url) {

            const content = `
                <iframe
                    src="${url}"
                    style="width: 100%; height: 100%; border: none; background: var(--bg-primary);"
                ></iframe>
            `;
            windowManager.createWindow({
                title: title,
                content: content,
                width: 1024,
                height: 768
            });
        }
    } else if (action === 'browser') {
        // Create mini browser with whitelisted sites
        createMiniBrowser();
    } else if (action === 'home') {

        const content = `
            <iframe
                src="index.html"
                style="width: 100%; height: 100%; border: none; background: var(--bg-primary);"
            ></iframe>
        `;
        windowManager.createWindow({
            title: 'Home',
            content: content,
            width: 1024,
            height: 768
        });
    } else {
        // For folder icons (projects, thoughts, etc), show a simple content list
        const folderName = action.charAt(0).toUpperCase() + action.slice(1);
        const content = `
            <div style="padding: 20px; color: var(--text-primary);">
                <h1>${folderName}</h1>
                <p>Browse ${folderName.toLowerCase()} content</p>
                <div style="margin-top: 20px;">
                    <p style="color: var(--text-secondary);">This folder contains various ${folderName.toLowerCase()} items.</p>
                    <button onclick="alert('Coming soon!')" style="
                        margin-top: 20px;
                        padding: 10px 20px;
                        background: var(--accent-primary);
                        color: white;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    ">Browse Content</button>
                </div>
            </div>
        `;
        windowManager.createWindow({
            title: folderName,
            content: content,
            width: 600,
            height: 400
        });
    }
}

// Mini Browser with whitelisted sites
function createMiniBrowser() {
    // Whitelisted sites for the mini browser
    const whitelistedSites = [
        { name: 'Wikipedia', url: 'https://en.wikipedia.org', icon: '' },
        { name: 'Archive.org', url: 'https://archive.org', icon: '' },
        { name: 'GitHub', url: 'https://github.com', icon: '' },
        { name: 'MDN Web Docs', url: 'https://developer.mozilla.org', icon: '🦊' },
        { name: 'Stack Overflow', url: 'https://stackoverflow.com', icon: '💡' },
        { name: 'Hacker News', url: 'https://news.ycombinator.com', icon: '📰' },
        { name: 'OpenStreetMap', url: 'https://www.openstreetmap.org', icon: '🗺️' },
        { name: 'Wolfram Alpha', url: 'https://www.wolframalpha.com', icon: '' },
        { name: 'NASA', url: 'https://www.nasa.gov', icon: '' },
        { name: 'TED Talks', url: 'https://www.ted.com', icon: '' },
        { name: 'Khan Academy', url: 'https://www.khanacademy.org', icon: '🎓' },
        { name: 'Coursera', url: 'https://www.coursera.org', icon: '📖' },
        { name: 'arXiv', url: 'https://arxiv.org', icon: '' },
        { name: 'XKCD', url: 'https://xkcd.com', icon: '🤓' },
        { name: 'Polymir', url: 'https://polymir.io', icon: '' }
    ];

    // Create browser HTML
    const browserHTML = `
        <div class="mini-browser">
            <div class="browser-toolbar">
                <div class="browser-nav-buttons">
                    <button class="browser-btn" id="browser-back" disabled>←</button>
                    <button class="browser-btn" id="browser-forward" disabled>→</button>
                    <button class="browser-btn" id="browser-refresh">↻</button>
                    <button class="browser-btn" id="browser-home"></button>
                </div>
                <div class="browser-address-bar">
                    <select class="browser-site-selector" id="site-selector">
                        <option value="">Choose a site...</option>
                        ${whitelistedSites.map(site =>
                            `<option value="${site.url}">${site.icon} ${site.name}</option>`
                        ).join('')}
                    </select>
                    <input type="text" class="browser-url" id="browser-url" readonly placeholder="Select a site from the dropdown">
                </div>
            </div>
            <div class="browser-bookmarks">
                ${whitelistedSites.slice(0, 8).map(site =>
                    `<button class="bookmark-btn" data-url="${site.url}" title="${site.name}">
                        <span class="bookmark-icon">${site.icon}</span>
                        <span class="bookmark-label">${site.name}</span>
                    </button>`
                ).join('')}
            </div>
            <div class="browser-content">
                <iframe
                    id="browser-frame"
                    src="about:blank"
                    sandbox="allow-scripts allow-popups allow-forms"
                    style="width: 100%; height: 100%; border: none; background: white;">
                </iframe>
                <div class="browser-welcome" id="browser-welcome">
                    <h2> Mini Browser</h2>
                    <p>Welcome to your curated web experience!</p>
                    <p>Select a site from the dropdown or click a bookmark to start browsing.</p>
                    <div class="site-grid">
                        ${whitelistedSites.map(site =>
                            `<div class="site-tile" data-url="${site.url}">
                                <div class="site-icon">${site.icon}</div>
                                <div class="site-name">${site.name}</div>
                            </div>`
                        ).join('')}
                    </div>
                </div>
            </div>
        </div>
        <style>
            .mini-browser {
                display: flex;
                flex-direction: column;
                height: 100%;
                background: #f0f0f0;
            }
            .browser-toolbar {
                display: flex;
                gap: 10px;
                padding: 10px;
                background: linear-gradient(to bottom, #e8e8e8, #d0d0d0);
                border-bottom: 1px solid #999;
            }
            .browser-nav-buttons {
                display: flex;
                gap: 5px;
            }
            .browser-btn {
                width: 30px;
                height: 30px;
                border: 1px solid #999;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                font-size: 16px;
            }
            .browser-btn:hover:not(:disabled) {
                background: #f0f0f0;
            }
            .browser-btn:disabled {
                opacity: 0.5;
                cursor: not-allowed;
            }
            .browser-address-bar {
                flex: 1;
                display: flex;
                gap: 10px;
            }
            .browser-site-selector {
                width: 200px;
                padding: 5px;
                border: 1px solid #999;
                border-radius: 4px;
                background: white;
            }
            .browser-url {
                flex: 1;
                padding: 5px 10px;
                border: 1px solid #999;
                border-radius: 4px;
                background: white;
            }
            .browser-bookmarks {
                display: flex;
                gap: 5px;
                padding: 5px 10px;
                background: #f8f8f8;
                border-bottom: 1px solid #ddd;
                overflow-x: auto;
            }
            .bookmark-btn {
                display: flex;
                align-items: center;
                gap: 5px;
                padding: 4px 8px;
                border: 1px solid #ddd;
                background: white;
                border-radius: 4px;
                cursor: pointer;
                white-space: nowrap;
                font-size: 12px;
            }
            .bookmark-btn:hover {
                background: #e8f4ff;
                border-color: #4a90e2;
            }
            .bookmark-icon {
                font-size: 14px;
            }
            .browser-content {
                flex: 1;
                position: relative;
                background: white;
            }
            .browser-welcome {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                padding: 20px;
            }
            .browser-welcome h2 {
                font-size: 32px;
                margin-bottom: 10px;
            }
            .browser-welcome p {
                font-size: 16px;
                margin: 5px 0;
            }
            .site-grid {
                display: grid;
                grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
                gap: 15px;
                margin-top: 30px;
                width: 100%;
                max-width: 600px;
            }
            .site-tile {
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 5px;
                padding: 15px;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 8px;
                cursor: pointer;
                transition: all 0.3s;
            }
            .site-tile:hover {
                background: rgba(255, 255, 255, 0.2);
                transform: scale(1.05);
            }
            .site-icon {
                font-size: 32px;
            }
            .site-name {
                font-size: 12px;
                text-align: center;
            }
            #browser-frame {
                display: none;
            }
            #browser-frame.active {
                display: block;
            }
            .browser-welcome.hidden {
                display: none;
            }
        </style>
    `;

    // Create the browser window
    const windowId = windowManager.createWindow({
        title: ' Web Browser',
        content: browserHTML,
        width: 1200,
        height: 800
    });

    // Add event listeners after window is created
    setTimeout(() => {
        const frame = document.getElementById('browser-frame');
        const urlInput = document.getElementById('browser-url');
        const siteSelector = document.getElementById('site-selector');
        const welcome = document.getElementById('browser-welcome');
        const refreshBtn = document.getElementById('browser-refresh');
        const homeBtn = document.getElementById('browser-home');

        // Load site function
        const loadSite = (url) => {
            if (url) {
                // Check if URL is whitelisted
                const isWhitelisted = whitelistedSites.some(site => url.startsWith(site.url));
                if (isWhitelisted) {
                    frame.src = url;
                    frame.classList.add('active');
                    welcome.classList.add('hidden');
                    urlInput.value = url;

                    // Update selector
                    siteSelector.value = url;
                } else {
                    alert('This URL is not in the whitelist. Please select from the available sites.');
                }
            }
        };

        // Site selector change
        siteSelector.addEventListener('change', (e) => {
            loadSite(e.target.value);
        });

        // Bookmark buttons
        document.querySelectorAll('.bookmark-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                loadSite(btn.dataset.url);
            });
        });

        // Site tiles in welcome screen
        document.querySelectorAll('.site-tile').forEach(tile => {
            tile.addEventListener('click', () => {
                loadSite(tile.dataset.url);
            });
        });

        // Refresh button
        refreshBtn.addEventListener('click', () => {
            if (frame.src && frame.src !== 'about:blank') {
                frame.src = frame.src;
            }
        });

        // Home button
        homeBtn.addEventListener('click', () => {
            frame.src = 'about:blank';
            frame.classList.remove('active');
            welcome.classList.remove('hidden');
            urlInput.value = '';
            siteSelector.value = '';
        });

        // Note: Back/Forward buttons would need more complex implementation
        // as iframe navigation history is restricted by browser security
    }, 100);
}

window.windowManager = windowManager;
window.initializeDesktopMode = initializeDesktopMode;
window.toggleDesktopMode = toggleDesktopMode;