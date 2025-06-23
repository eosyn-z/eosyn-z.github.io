class AppWindow {
    constructor(id, title, url, iconClass, manager) {
        this.id = id;
        this.title = title;
        this.url = url;
        this.iconClass = iconClass || 'fas fa-window-maximize';
        this.manager = manager;
        this.minimized = false;
        
        this.element = this._createWindowElement();
        this.manager.container.appendChild(this.element);

        this._makeDraggable();
        this._makeResizable();
        this._attachEventListeners();
        
        this.focus();
    }

    _createWindowElement() {
        const windowEl = document.createElement('div');
        windowEl.className = 'app-window glass-panel';
        windowEl.id = this.id;
        windowEl.style.position = 'absolute';
        
        // Find a random position on screen
        const x = Math.floor(Math.random() * (window.innerWidth - 450));
        const y = Math.floor(Math.random() * (window.innerHeight - 350));
        windowEl.style.left = `${x}px`;
        windowEl.style.top = `${y}px`;

        windowEl.innerHTML = `
            <div class="window-header">
                <span class="window-icon"><i class="${this.iconClass}"></i></span>
                <span class="window-title">${this.title}</span>
                <div class="window-controls">
                    <button class="minimize-btn">－</button>
                    <button class="maximize-btn">□</button>
                    <button class="close-btn">×</button>
                </div>
            </div>
            <div class="window-body">
                <iframe src="${this.url}" frameborder="0"></iframe>
            </div>
            <div class="resize-handle"></div>
        `;
        return windowEl;
    }

    _attachEventListeners() {
        this.element.querySelector('.close-btn').addEventListener('click', () => this.close());
        this.element.querySelector('.minimize-btn').addEventListener('click', () => this.minimize());
        this.element.querySelector('.maximize-btn').addEventListener('click', () => this.maximize());
        this.element.addEventListener('mousedown', () => this.focus());
    }
    
    _makeDraggable() { /* ... Placeholder for drag logic ... */ }
    _makeResizable() { /* ... Placeholder for resize logic ... */ }

    focus() {
        this.manager.windows.forEach(win => win.element.style.zIndex = '999');
        this.element.style.zIndex = '1000';
    }

    close() {
        this.manager.removeWindow(this.id);
        this.element.remove();
    }

    minimize() {
        this.minimized = true;
        this.element.style.display = 'none';
        // In a full implementation, we'd update a taskbar icon here
    }

    maximize() {
        this.element.style.top = '0';
        this.element.style.left = '0';
        this.element.style.width = '100vw';
        this.element.style.height = '100vh';
    }
} 