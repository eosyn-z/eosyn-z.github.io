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

    // Pass the jekyllPages data to the DesktopManager
    if (typeof DesktopManager !== 'undefined') {
        window.desktopManager = new DesktopManager(window.jekyllPages || []);
    } else {
        console.error('DesktopManager is not defined.');
    }

    if (typeof WindowManager !== 'undefined') {
        window.windowManager = new WindowManager();
    } else {
        console.error('WindowManager is not defined.');
    }
}); 