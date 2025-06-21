// Window Manager - Handles window interactions and positioning
class WindowManager {
    constructor() {
        this.windows = [];
        this.activeWindow = null;
        this.isDragging = false;
        this.isResizing = false;
        this.dragOffset = { x: 0, y: 0 };
        this.resizeHandle = null;
        
        this.init();
    }

    init() {
        // Find all windows and initialize them
        const windowElements = document.querySelectorAll('.window');
        windowElements.forEach((windowEl, index) => {
            this.windows.push({
                element: windowEl,
                id: windowEl.id || `window-${index}`,
                position: { x: 0, y: 0 },
                size: { width: windowEl.offsetWidth, height: windowEl.offsetHeight },
                isMinimized: false,
                isMaximized: false
            });
        });

        this.setupEventListeners();
        this.setupWindowControls();
    }

    setupEventListeners() {
        this.windows.forEach(windowData => {
            const windowEl = windowData.element;
            const header = windowEl.querySelector('.window-header');
            
            if (header) {
                // Make window draggable by header
                header.addEventListener('mousedown', (e) => {
                    if (e.target.closest('.window-controls')) return; // Don't drag if clicking controls
                    this.startDragging(windowData, e);
                });
            }

            // Add resize handles
            this.addResizeHandles(windowData);
        });

        // Global mouse events
        document.addEventListener('mousemove', (e) => {
            if (this.isDragging) {
                this.handleDrag(e);
            }
            if (this.isResizing) {
                this.handleResize(e);
            }
        });

        document.addEventListener('mouseup', () => {
            this.stopDragging();
            this.stopResizing();
        });
    }

    setupWindowControls() {
        this.windows.forEach(windowData => {
            const windowEl = windowData.element;
            const controls = windowEl.querySelectorAll('.window-control');
            
            controls.forEach(control => {
                control.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    if (control.classList.contains('minimize')) {
                        this.minimizeWindow(windowData);
                    } else if (control.classList.contains('maximize')) {
                        this.maximizeWindow(windowData);
                    } else if (control.classList.contains('close')) {
                        this.closeWindow(windowData);
                    }
                });
            });
        });
    }

    addResizeHandles(windowData) {
        const windowEl = windowData.element;
        
        // Add resize handle to bottom-right corner
        const resizeHandle = document.createElement('div');
        resizeHandle.className = 'window-resize-handle';
        resizeHandle.style.cssText = `
            position: absolute;
            bottom: 0;
            right: 0;
            width: 15px;
            height: 15px;
            cursor: se-resize;
            z-index: 10;
        `;
        
        windowEl.style.position = 'relative';
        windowEl.appendChild(resizeHandle);
        
        resizeHandle.addEventListener('mousedown', (e) => {
            e.stopPropagation();
            this.startResizing(windowData, e);
        });
    }

    startDragging(windowData, e) {
        this.isDragging = true;
        this.activeWindow = windowData;
        
        const rect = windowData.element.getBoundingClientRect();
        this.dragOffset = {
            x: e.clientX - rect.left,
            y: e.clientY - rect.top
        };
        
        windowData.element.style.cursor = 'grabbing';
        windowData.element.style.zIndex = '1000';
    }

    handleDrag(e) {
        if (!this.activeWindow) return;
        
        const newX = e.clientX - this.dragOffset.x;
        const newY = e.clientY - this.dragOffset.y;
        
        // Keep window within viewport bounds
        const maxX = window.innerWidth - this.activeWindow.element.offsetWidth;
        const maxY = window.innerHeight - this.activeWindow.element.offsetHeight;
        
        const clampedX = Math.max(0, Math.min(newX, maxX));
        const clampedY = Math.max(0, Math.min(newY, maxY));
        
        this.activeWindow.element.style.transform = `translate(${clampedX}px, ${clampedY}px)`;
        this.activeWindow.position = { x: clampedX, y: clampedY };
    }

    stopDragging() {
        if (this.activeWindow) {
            this.activeWindow.element.style.cursor = '';
            this.activeWindow = null;
        }
        this.isDragging = false;
    }

    startResizing(windowData, e) {
        this.isResizing = true;
        this.activeWindow = windowData;
        this.resizeHandle = e.target;
        
        const rect = windowData.element.getBoundingClientRect();
        this.dragOffset = {
            x: e.clientX - rect.right,
            y: e.clientY - rect.bottom
        };
        
        windowData.element.style.cursor = 'se-resize';
    }

    handleResize(e) {
        if (!this.activeWindow) return;
        
        const newWidth = e.clientX - this.activeWindow.element.offsetLeft - this.dragOffset.x;
        const newHeight = e.clientY - this.activeWindow.element.offsetTop - this.dragOffset.y;
        
        // Minimum size constraints
        const minWidth = 200;
        const minHeight = 150;
        
        const clampedWidth = Math.max(minWidth, newWidth);
        const clampedHeight = Math.max(minHeight, newHeight);
        
        this.activeWindow.element.style.width = `${clampedWidth}px`;
        this.activeWindow.element.style.height = `${clampedHeight}px`;
        this.activeWindow.size = { width: clampedWidth, height: clampedHeight };
    }

    stopResizing() {
        if (this.activeWindow) {
            this.activeWindow.element.style.cursor = '';
            this.activeWindow = null;
        }
        this.isResizing = false;
        this.resizeHandle = null;
    }

    minimizeWindow(windowData) {
        windowData.isMinimized = !windowData.isMinimized;
        const windowEl = windowData.element;
        
        if (windowData.isMinimized) {
            windowEl.style.transform = 'scale(0.1)';
            windowEl.style.opacity = '0';
            windowEl.style.pointerEvents = 'none';
        } else {
            windowEl.style.transform = '';
            windowEl.style.opacity = '1';
            windowEl.style.pointerEvents = '';
        }
    }

    maximizeWindow(windowData) {
        windowData.isMaximized = !windowData.isMaximized;
        const windowEl = windowData.element;
        
        if (windowData.isMaximized) {
            windowEl.style.position = 'fixed';
            windowEl.style.top = '0';
            windowEl.style.left = '0';
            windowEl.style.width = '100vw';
            windowEl.style.height = '100vh';
            windowEl.style.zIndex = '9999';
        } else {
            windowEl.style.position = 'relative';
            windowEl.style.top = '';
            windowEl.style.left = '';
            windowEl.style.width = '';
            windowEl.style.height = '';
            windowEl.style.zIndex = '';
        }
    }

    closeWindow(windowData) {
        windowData.element.style.transform = 'scale(0.8)';
        windowData.element.style.opacity = '0';
        
        setTimeout(() => {
            windowData.element.style.display = 'none';
        }, 200);
    }

    // Utility methods for external use
    getWindow(id) {
        return this.windows.find(w => w.id === id);
    }

    showWindow(id) {
        const windowData = this.getWindow(id);
        if (windowData) {
            windowData.element.style.display = '';
            windowData.element.style.transform = '';
            windowData.element.style.opacity = '1';
            windowData.element.style.pointerEvents = '';
        }
    }

    setWindowPosition(id, x, y) {
        const windowData = this.getWindow(id);
        if (windowData) {
            windowData.element.style.transform = `translate(${x}px, ${y}px)`;
            windowData.position = { x, y };
        }
    }

    setWindowSize(id, width, height) {
        const windowData = this.getWindow(id);
        if (windowData) {
            windowData.element.style.width = `${width}px`;
            windowData.element.style.height = `${height}px`;
            windowData.size = { width, height };
        }
    }

    // Desktop system integration methods
    createWindow(appId, title, content = null) {
        const windowId = `window-${Date.now()}`;
        let windowContent = content;
        
        // Generate content based on appId if no content provided
        if (!windowContent) {
            switch (appId) {
                case 'sticky-notes':
                    windowContent = this.createStickyNotesContent();
                    break;
                case 'window-demo':
                    windowContent = this.createWindowDemoContent();
                    break;
                default:
                    windowContent = `<div style="padding: 2rem; text-align: center; color: var(--theme-text);">
                        <h3>${title}</h3>
                        <p>This is a placeholder for the ${title} application.</p>
                    </div>`;
            }
        }
        
        // Create window element
        const windowEl = document.createElement('div');
        windowEl.className = 'window app-window';
        windowEl.id = windowId;
        windowEl.style.position = 'fixed';
        windowEl.style.top = '50px';
        windowEl.style.left = '50px';
        windowEl.style.zIndex = '1000';
        windowEl.style.width = '400px';
        windowEl.style.height = '300px';
        
        windowEl.innerHTML = `
            <div class="window-header">
                <div class="window-controls">
                    <span class="window-control minimize"></span>
                    <span class="window-control maximize"></span>
                    <span class="window-control close"></span>
                </div>
                <div class="window-title">${title}</div>
            </div>
            <div class="window-content">
                ${windowContent}
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(windowEl);
        
        // Add to windows array
        const windowData = {
            element: windowEl,
            id: windowId,
            appId: appId,
            title: title,
            position: { x: 50, y: 50 },
            size: { width: 400, height: 300 },
            isMinimized: false,
            isMaximized: false
        };
        
        this.windows.push(windowData);
        
        // Setup event listeners for this window
        this.setupWindowEventListeners(windowData);
        this.setupWindowControlsForWindow(windowData);
        this.addResizeHandles(windowData);
        
        return windowId;
    }

    createStickyNotesContent() {
        return `
            <div style="padding: 1rem; height: 100%; overflow-y: auto;">
                <div class="sticky-notes-container">
                    <div class="sticky-note" style="position: relative; top: 0; left: 0; transform: rotate(-2deg);">
                        <div class="note-header">
                            <span class="note-title">Welcome!</span>
                            <div class="note-controls">
                                <button class="note-btn btn-pin" title="Pin Note">📌</button>
                                <button class="note-btn btn-close" title="Close Note">✕</button>
                            </div>
                        </div>
                        <div class="note-content" contenteditable="true">
                            <h3>Sticky Notes</h3>
                            <p>Click to edit this note! You can write anything you want here.</p>
                            <ul>
                                <li>Make to-do lists</li>
                                <li>Write reminders</li>
                                <li>Jot down ideas</li>
                            </ul>
                        </div>
                    </div>
                    
                    <div class="sticky-note" style="position: relative; top: 20px; left: 120px; transform: rotate(1deg);">
                        <div class="note-header">
                            <span class="note-title">Quick Note</span>
                            <div class="note-controls">
                                <button class="note-btn btn-pin" title="Pin Note">📌</button>
                                <button class="note-btn btn-close" title="Close Note">✕</button>
                            </div>
                        </div>
                        <div class="note-content" contenteditable="true">
                            <p>Another note! You can drag these around and resize them too.</p>
                        </div>
                    </div>
                </div>
                
                <button class="glass-button" style="margin-top: 1rem;" onclick="window.windowManager.addNewStickyNote()">
                    + Add New Note
                </button>
            </div>
        `;
    }

    createWindowDemoContent() {
        return `
            <div style="padding: 1rem; height: 100%; overflow-y: auto;">
                <h3 style="color: var(--theme-text); margin-bottom: 1rem;">Window Demo</h3>
                <p style="color: var(--theme-text-secondary); line-height: 1.6; margin-bottom: 1rem;">
                    This window demonstrates the window system in desktop mode!
                </p>
                
                <div class="window-container" style="margin: 1rem 0;">
                    <div class="window" style="width: 200px; height: 150px;">
                        <div class="window-header">
                            <div class="window-controls">
                                <span class="window-control minimize"></span>
                                <span class="window-control maximize"></span>
                                <span class="window-control close"></span>
                            </div>
                            <div class="window-title">Nested Window</div>
                        </div>
                        <div class="window-content">
                            <p style="text-align: center; color: var(--theme-text);">Nested window!</p>
                        </div>
                    </div>
                </div>
                
                <div class="post-it-board" style="margin-top: 1rem;">
                    <div class="post-it">
                        <h3>Desktop Mode</h3>
                        <p>Windows work great in desktop mode with full drag & resize support!</p>
                    </div>
                </div>
            </div>
        `;
    }

    addNewStickyNote() {
        const stickyNotesContainer = document.querySelector('.sticky-notes-container');
        if (stickyNotesContainer) {
            const newNote = document.createElement('div');
            newNote.className = 'sticky-note';
            newNote.style.cssText = `
                position: relative;
                top: ${Math.random() * 50}px;
                left: ${Math.random() * 100}px;
                transform: rotate(${(Math.random() - 0.5) * 4}deg);
            `;
            
            newNote.innerHTML = `
                <div class="note-header">
                    <span class="note-title">New Note</span>
                    <div class="note-controls">
                        <button class="note-btn btn-pin" title="Pin Note">📌</button>
                        <button class="note-btn btn-close" title="Close Note">✕</button>
                    </div>
                </div>
                <div class="note-content" contenteditable="true">
                    <p>Click to edit this new note!</p>
                </div>
            `;
            
            stickyNotesContainer.appendChild(newNote);
        }
    }

    setupWindowEventListeners(windowData) {
        const windowEl = windowData.element;
        const header = windowEl.querySelector('.window-header');
        
        if (header) {
            header.addEventListener('mousedown', (e) => {
                if (e.target.closest('.window-controls')) return;
                this.startDragging(windowData, e);
            });
        }
    }

    setupWindowControlsForWindow(windowData) {
        const windowEl = windowData.element;
        const controls = windowEl.querySelectorAll('.window-control');
        
        controls.forEach(control => {
            control.addEventListener('click', (e) => {
                e.stopPropagation();
                
                if (control.classList.contains('minimize')) {
                    this.minimizeWindow(windowData);
                } else if (control.classList.contains('maximize')) {
                    this.maximizeWindow(windowData);
                } else if (control.classList.contains('close')) {
                    this.closeWindow(windowData);
                }
            });
        });
    }

    closeAllWindows() {
        this.windows.forEach(windowData => {
            if (windowData.element && windowData.element.parentNode) {
                windowData.element.remove();
            }
        });
        this.windows = [];
    }
}

// Initialize window manager when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    window.windowManager = new WindowManager();
    // Also expose as windowManager for desktop system compatibility
    window.windowManager = window.windowManager;
}); 