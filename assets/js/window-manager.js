// Window Manager - Handles window interactions and positioning
class WindowManager {
    constructor() {
        this.windows = [];
        this.activeWindow = null;
        this.isDragging = false;
        this.isResizing = false;
        this.dragOffset = { x: 0, y: 0 };
        this.resizeHandle = null;
        this.nextWindowId = 1; // Track next available window ID
        this.deletedWindowIds = []; // Track deleted IDs for reuse
        this.gridSize = 20; // Grid snap size in pixels
        
        this.init();
        this.loadWindowStates();
    }

    // Get next available window ID
    getNextWindowId() {
        if (this.deletedWindowIds.length > 0) {
            return this.deletedWindowIds.shift(); // Reuse deleted ID
        }
        return this.nextWindowId++;
    }

    // Mark window ID as available for reuse
    releaseWindowId(id) {
        if (!this.deletedWindowIds.includes(id)) {
            this.deletedWindowIds.push(id);
            this.deletedWindowIds.sort((a, b) => a - b); // Keep sorted
        }
    }

    // Snap position to grid
    snapToGrid(x, y) {
        return {
            x: Math.round(x / this.gridSize) * this.gridSize,
            y: Math.round(y / this.gridSize) * this.gridSize
        };
    }

    init() {
        // Find all windows and initialize them
        const windowElements = document.querySelectorAll('.window');
        windowElements.forEach((windowEl, index) => {
            const windowId = windowEl.id || `window-${this.getNextWindowId()}`;
            this.windows.push({
                element: windowEl,
                id: windowId,
                position: { x: 0, y: 0 },
                size: { width: windowEl.offsetWidth, height: windowEl.offsetHeight },
                isMinimized: false,
                isMaximized: false
            });
            windowEl.id = windowId; // Ensure ID is set
        });

        this.setupEventListeners();
        this.setupWindowControls();
    }

    // Load saved window states from cookies
    loadWindowStates() {
        try {
            const savedStates = this.getCookie('windowStates');
            if (savedStates) {
                const states = JSON.parse(savedStates);
                Object.keys(states).forEach(windowId => {
                    const state = states[windowId];
                    const windowData = this.getWindow(windowId);
                    if (windowData) {
                        // Apply saved position and size
                        windowData.position = state.position || { x: 0, y: 0 };
                        windowData.size = state.size || { width: 400, height: 300 };
                        windowData.isMinimized = state.isMinimized || false;
                        windowData.isMaximized = state.isMaximized || false;
                        
                        // Apply to DOM
                        windowData.element.style.transform = `translate(${windowData.position.x}px, ${windowData.position.y}px)`;
                        windowData.element.style.width = `${windowData.size.width}px`;
                        windowData.element.style.height = `${windowData.size.height}px`;
                        
                        if (windowData.isMinimized) {
                            windowData.element.style.transform = 'scale(0.1)';
                            windowData.element.style.opacity = '0';
                            windowData.element.style.pointerEvents = 'none';
                        }
                        
                        if (windowData.isMaximized) {
                            windowData.element.style.position = 'fixed';
                            windowData.element.style.top = '0';
                            windowData.element.style.left = '0';
                            windowData.element.style.width = '100vw';
                            windowData.element.style.height = '100vh';
                            windowData.element.style.zIndex = '9999';
                        }
                    }
                });
            }
        } catch (error) {
            console.error('Error loading window states:', error);
        }
    }

    // Save window states to cookies
    saveWindowStates() {
        const states = {};
        this.windows.forEach(windowData => {
            states[windowData.id] = {
                position: windowData.position,
                size: windowData.size,
                isMinimized: windowData.isMinimized,
                isMaximized: windowData.isMaximized
            };
        });
        this.setCookie('windowStates', JSON.stringify(states), 365); // Save for 1 year
    }

    // Helper method to set a cookie
    setCookie(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
    }

    // Helper method to get a cookie
    getCookie(name) {
        const nameEQ = name + "=";
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
        }
        return null;
    }

    // Save sticky notes data with proper ID management
    saveStickyNotes() {
        const stickyNotes = [];
        const noteElements = document.querySelectorAll('.sticky-note');
        
        noteElements.forEach((noteEl, index) => {
            const rect = noteEl.getBoundingClientRect();
            const content = noteEl.querySelector('.note-content');
            const title = noteEl.querySelector('.note-title');
            
            stickyNotes.push({
                id: noteEl.dataset.noteId || `note-${this.getNextWindowId()}`,
                position: {
                    x: rect.left,
                    y: rect.top
                },
                size: {
                    width: rect.width,
                    height: rect.height
                },
                title: title ? title.textContent : 'New Note',
                content: content ? content.innerHTML : '',
                transform: noteEl.style.transform || '',
                isPinned: noteEl.classList.contains('pinned')
            });
        });
        
        this.setCookie('stickyNotes', JSON.stringify(stickyNotes), 365); // Save for 1 year
    }

    // Load sticky notes data
    loadStickyNotes() {
        try {
            const savedNotes = this.getCookie('stickyNotes');
            if (savedNotes) {
                const notes = JSON.parse(savedNotes);
                const container = document.querySelector('.sticky-notes-container');
                
                if (container && notes.length > 0) {
                    // Clear existing notes
                    container.innerHTML = '';
                    
                    // Restore saved notes
                    notes.forEach(noteData => {
                        this.createStickyNoteFromData(noteData);
                    });
                }
            }
        } catch (error) {
            console.error('Error loading sticky notes:', error);
        }
    }

    // Create sticky note from saved data
    createStickyNoteFromData(noteData) {
        const container = document.querySelector('.sticky-notes-container');
        if (!container) return;
        
        const note = document.createElement('div');
        note.className = 'sticky-note';
        note.dataset.noteId = noteData.id;
        
        // Apply saved position and size
        note.style.position = 'absolute';
        note.style.left = `${noteData.position.x}px`;
        note.style.top = `${noteData.position.y}px`;
        note.style.width = `${noteData.size.width}px`;
        note.style.height = `${noteData.size.height}px`;
        note.style.transform = noteData.transform;
        
        if (noteData.isPinned) {
            note.classList.add('pinned');
        }
        
        note.innerHTML = `
            <div class="note-header">
                <span class="note-title">${noteData.title}</span>
                <div class="note-controls">
                    <button class="note-btn btn-pin" title="Pin Note">📌</button>
                    <button class="note-btn btn-close" title="Close Note">✕</button>
                </div>
            </div>
            <div class="note-content" contenteditable="true">
                ${noteData.content}
            </div>
            <div class="resize-handle"></div>
        `;
        
        // Make note draggable and resizable
        this.makeStickyNoteDraggable(note);
        this.makeStickyNoteResizable(note);
        this.setupStickyNoteControls(note);
        
        container.appendChild(note);
        
        // Setup checkboxes if content contains task lists
        if (noteData.content && (noteData.content.includes('- [') || noteData.content.includes('- [x]'))) {
            this.setupTaskCheckboxes(note);
        }
    }

    // Make sticky note draggable with grid snapping
    makeStickyNoteDraggable(note) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        const header = note.querySelector('.note-header');
        if (!header) return;

        const onMouseDown = (e) => {
            if (e.target.closest('.note-controls')) return; // Don't drag if clicking controls
            
            isDragging = true;
            note.style.cursor = 'grabbing';
            note.style.zIndex = '1000';
            
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(note.style.left) || 0;
            startTop = parseInt(note.style.top) || 0;
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!isDragging) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            let newX = startLeft + deltaX;
            let newY = startTop + deltaY;
            
            // Constrain to viewport
            const maxX = window.innerWidth - note.offsetWidth;
            const maxY = window.innerHeight - note.offsetHeight;
            
            newX = Math.max(0, Math.min(newX, maxX));
            newY = Math.max(0, Math.min(newY, maxY));
            
            note.style.left = `${newX}px`;
            note.style.top = `${newY}px`;
        };

        const onMouseUp = () => {
            if (isDragging) {
                isDragging = false;
                note.style.cursor = 'grab';
                note.style.zIndex = 'auto';
                
                // Snap to grid
                const currentX = parseInt(note.style.left) || 0;
                const currentY = parseInt(note.style.top) || 0;
                const snapped = this.snapToGrid(currentX, currentY);
                
                note.style.left = `${snapped.x}px`;
                note.style.top = `${snapped.y}px`;
                
                // Save sticky notes
                this.saveStickyNotes();
                
                document.removeEventListener('mousemove', onMouseMove);
                document.removeEventListener('mouseup', onMouseUp);
            }
        };

        header.addEventListener('mousedown', onMouseDown);
    }

    // Make sticky note resizable
    makeStickyNoteResizable(note) {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        const resizeHandle = note.querySelector('.resize-handle');
        if (!resizeHandle) return;

        const onMouseDown = (e) => {
            isResizing = true;
            note.style.cursor = 'se-resize';
            
            startX = e.clientX;
            startY = e.clientY;
            startWidth = note.offsetWidth;
            startHeight = note.offsetHeight;
            
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
        };

        const onMouseMove = (e) => {
            if (!isResizing) return;
            
            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;
            
            const newWidth = Math.max(200, startWidth + deltaX);
            const newHeight = Math.max(150, startHeight + deltaY);
            
            note.style.width = `${newWidth}px`;
            note.style.height = `${newHeight}px`;
        };

        const onMouseUp = () => {
            if (isResizing) {
                isResizing = false;
                note.style.cursor = '';
                this.saveStickyNotes();
            }
            
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        };

        resizeHandle.addEventListener('mousedown', onMouseDown);
    }

    // Setup sticky note controls
    setupStickyNoteControls(note) {
        const pinBtn = note.querySelector('.btn-pin');
        const closeBtn = note.querySelector('.btn-close');
        const content = note.querySelector('.note-content');
        const title = note.querySelector('.note-title');

        // Pin button
        if (pinBtn) {
            pinBtn.addEventListener('click', () => {
                note.classList.toggle('pinned');
                this.saveStickyNotes();
            });
        }

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                // Release the note ID for reuse
                const noteId = note.dataset.noteId;
                if (noteId) {
                    const idNumber = parseInt(noteId.replace('note-', ''));
                    if (!isNaN(idNumber)) {
                        this.releaseWindowId(idNumber);
                    }
                }
                
                note.remove();
                this.saveStickyNotes();
                this.updateStickyNotesCounter();
            });
        }

        // Auto-save content changes
        if (content) {
            content.addEventListener('input', () => {
                this.saveStickyNotes();
            });
        }

        // Auto-save title changes
        if (title) {
            title.addEventListener('input', () => {
                this.saveStickyNotes();
            });
        }
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

        // Set up global event listeners only once
        if (!this.globalListenersSetup) {
            this.setupGlobalEventListeners();
            this.globalListenersSetup = true;
        }
    }

    setupWindowControls() {
        this.windows.forEach(windowData => {
            const windowEl = windowData.element;
            const controls = windowEl.querySelectorAll('.window-control-btn');
            
            controls.forEach((control, index) => {
                control.addEventListener('click', (e) => {
                    e.stopPropagation();
                    
                    // Determine which control was clicked based on index or content
                    if (control.innerHTML === '−' || index === 0) {
                        this.minimizeWindow(windowData);
                    } else if (control.innerHTML === '□' || index === 1) {
                        this.maximizeWindow(windowData);
                    } else if (control.innerHTML === '✕' || index === 2) {
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
        
        // Focus this window (bring to front)
        this.focusWindow(windowData.id);
        
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
            // Snap to grid when dragging stops
            const snapped = this.snapToGrid(this.activeWindow.position.x, this.activeWindow.position.y);
            this.activeWindow.element.style.transform = `translate(${snapped.x}px, ${snapped.y}px)`;
            this.activeWindow.position = snapped;
            
            this.activeWindow.element.style.cursor = '';
            this.activeWindow = null;
            this.saveWindowStates(); // Save position after dragging
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
        
        // Don't snap size to grid - allow free resizing
        this.activeWindow.element.style.width = `${clampedWidth}px`;
        this.activeWindow.element.style.height = `${clampedHeight}px`;
        this.activeWindow.size = { width: clampedWidth, height: clampedHeight };
    }

    stopResizing() {
        if (this.activeWindow) {
            this.activeWindow.element.style.cursor = '';
            this.activeWindow = null;
            this.saveWindowStates(); // Save size after resizing
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
        
        this.saveWindowStates(); // Save minimized state
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
        
        this.saveWindowStates(); // Save maximized state
    }

    closeWindow(windowData) {
        // Release the window ID for reuse
        this.releaseWindowId(windowData.id);
        
        // Remove from windows array
        this.windows = this.windows.filter(w => w.id !== windowData.id);
        
        // Remove from DOM
        if (windowData.element && windowData.element.parentNode) {
            windowData.element.parentNode.removeChild(windowData.element);
        }
        
        // Save window states
        this.saveWindowStates();
        
        // Refresh window switcher if it exists
        if (window.windowSwitcher) {
            window.windowSwitcher.refresh();
        }
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
        const windowId = `window-${this.getNextWindowId()}`;
        
        // Create window container
        const windowContainer = document.createElement('div');
        windowContainer.className = 'app-window';
        windowContainer.id = windowId;
        windowContainer.style.position = 'absolute';
        windowContainer.style.top = '10%';
        windowContainer.style.left = '15%';
        windowContainer.style.width = '70vw';
        windowContainer.style.maxWidth = '900px';
        windowContainer.style.minWidth = '350px';
        windowContainer.style.height = '60vh';
        windowContainer.style.minHeight = '400px';
        windowContainer.style.display = 'flex';
        windowContainer.style.flexDirection = 'column';
        windowContainer.style.zIndex = '100';
        windowContainer.style.border = '1px solid var(--glass-border-light)';
        windowContainer.style.borderRadius = '15px';
        windowContainer.style.transition = 'all 0.3s ease';
        windowContainer.style.background = 'var(--glass-bg)';
        windowContainer.style.backdropFilter = 'var(--glass-backdrop-filter)';
        windowContainer.style.webkitBackdropFilter = 'var(--glass-webkit-backdrop-filter)';
        windowContainer.style.boxShadow = 'var(--glass-box-shadow)';
        
        // Create window header
        const windowHeader = document.createElement('div');
        windowHeader.className = 'window-header';
        windowHeader.style.height = '40px';
        windowHeader.style.display = 'flex';
        windowHeader.style.alignItems = 'center';
        windowHeader.style.justifyContent = 'space-between';
        windowHeader.style.padding = '0 10px';
        windowHeader.style.background = 'var(--glass-bg-medium)';
        windowHeader.style.borderBottom = '1px solid var(--glass-border-light)';
        windowHeader.style.cursor = 'move';
        windowHeader.style.borderRadius = '15px 15px 0 0';
        windowHeader.style.backdropFilter = 'var(--glass-blur-medium)';
        
        // Create window title
        const windowTitle = document.createElement('h3');
        windowTitle.className = 'window-title';
        windowTitle.textContent = title;
        windowTitle.style.color = 'var(--theme-text)';
        windowTitle.style.fontWeight = '600';
        windowTitle.style.paddingLeft = '10px';
        windowTitle.style.pointerEvents = 'none';
        windowTitle.style.margin = '0';
        
        // Create window controls
        const windowControls = document.createElement('div');
        windowControls.className = 'window-controls';
        windowControls.style.display = 'flex';
        windowControls.style.gap = '8px';
        
        // Create control buttons
        const favBtn = document.createElement('button');
        favBtn.className = 'btn-fav';
        favBtn.innerHTML = '★';
        favBtn.title = 'Favorite';
        favBtn.style.width = '28px';
        favBtn.style.height = '28px';
        favBtn.style.borderRadius = '50%';
        favBtn.style.border = 'none';
        favBtn.style.background = 'var(--glass-bg-light)';
        favBtn.style.color = 'var(--theme-text)';
        favBtn.style.fontFamily = "'Segoe UI Symbol', sans-serif";
        favBtn.style.fontSize = '14px';
        favBtn.style.fontWeight = '700';
        favBtn.style.display = 'flex';
        favBtn.style.alignItems = 'center';
        favBtn.style.justifyContent = 'center';
        favBtn.style.cursor = 'pointer';
        favBtn.style.transition = 'all 0.2s ease';
        
        const minBtn = document.createElement('button');
        minBtn.className = 'btn-min';
        minBtn.innerHTML = '−';
        minBtn.title = 'Minimize';
        minBtn.style.width = '28px';
        minBtn.style.height = '28px';
        minBtn.style.borderRadius = '50%';
        minBtn.style.border = 'none';
        minBtn.style.background = 'var(--glass-bg-light)';
        minBtn.style.color = 'var(--theme-text)';
        minBtn.style.fontFamily = "'Segoe UI Symbol', sans-serif";
        minBtn.style.fontSize = '14px';
        minBtn.style.fontWeight = '700';
        minBtn.style.display = 'flex';
        minBtn.style.alignItems = 'center';
        minBtn.style.justifyContent = 'center';
        minBtn.style.cursor = 'pointer';
        minBtn.style.transition = 'all 0.2s ease';
        
        const closeBtn = document.createElement('button');
        closeBtn.className = 'btn-close';
        closeBtn.innerHTML = '×';
        closeBtn.title = 'Close';
        closeBtn.style.width = '28px';
        closeBtn.style.height = '28px';
        closeBtn.style.borderRadius = '50%';
        closeBtn.style.border = 'none';
        closeBtn.style.background = 'var(--glass-bg-light)';
        closeBtn.style.color = 'var(--theme-text)';
        closeBtn.style.fontFamily = "'Segoe UI Symbol', sans-serif";
        closeBtn.style.fontSize = '14px';
        closeBtn.style.fontWeight = '700';
        closeBtn.style.display = 'flex';
        closeBtn.style.alignItems = 'center';
        closeBtn.style.justifyContent = 'center';
        closeBtn.style.cursor = 'pointer';
        closeBtn.style.transition = 'all 0.2s ease';
        
        // Create window content area
        const windowContent = document.createElement('div');
        windowContent.className = 'window-content';
        windowContent.style.flexGrow = '1';
        windowContent.style.padding = '0';
        windowContent.style.background = 'var(--glass-bg-medium)';
        windowContent.style.backdropFilter = 'var(--glass-blur-medium)';
        windowContent.style.borderRadius = '0 0 15px 15px';
        windowContent.style.overflowY = 'hidden';
        windowContent.style.overflowX = 'hidden';
        
        // Assemble window
        windowHeader.appendChild(windowTitle);
        windowControls.appendChild(favBtn);
        windowControls.appendChild(minBtn);
        windowControls.appendChild(closeBtn);
        windowHeader.appendChild(windowControls);
        windowContainer.appendChild(windowHeader);
        windowContainer.appendChild(windowContent);
        
        // Add to DOM
        document.body.appendChild(windowContainer);
        
        // Create window data object
        const windowData = {
            element: windowContainer,
            id: windowId,
            appId: appId,
            position: { x: 0, y: 0 },
            size: { width: windowContainer.offsetWidth, height: windowContainer.offsetHeight },
            isMinimized: false,
            isMaximized: false
        };
        
        this.windows.push(windowData);
        
        // Setup event listeners and controls
        this.setupWindowEventListeners(windowData);
        this.setupWindowControlsForWindow(windowData);
        
        // Load content if provided
        if (content) {
            windowContent.innerHTML = content;
        } else if (appId) {
            // Load app content based on appId
            this.loadAppContent(appId, windowContent, title);
        }
        
        // Add refresh button
        this.addRefreshButton(windowData);
        
        // Save window states
        this.saveWindowStates();
        
        return windowId;
    }

    createStickyNotesContent() {
        return `
            <div class="sticky-notes-app" style="padding: 1rem; height: 100%; overflow-y: auto; color: var(--theme-text);">
                <div class="app-header" style="margin-bottom: 1.5rem;">
                    <h2 style="margin: 0 0 0.5rem 0;">📝 Sticky Notes & Tasks</h2>
                    <p style="margin: 0; color: var(--text-secondary); font-size: 0.9rem;">
                        Create notes and manage tasks with clickable checkboxes
                    </p>
                </div>
                
                <div class="app-controls" style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem;">
                    <button class="glass-button" onclick="window.windowManager.addNewStickyNote()" style="padding: 0.75rem;">
                        📄 New Note
                    </button>
                    <button class="glass-button" onclick="window.windowManager.addNewTaskList()" style="padding: 0.75rem;">
                        ✅ New Task List
                    </button>
                </div>
                
                <div class="quick-templates" style="margin-bottom: 1.5rem;">
                    <h3 style="margin: 0 0 0.75rem 0; font-size: 1rem;">Quick Templates</h3>
                    <div class="template-buttons" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 0.5rem;">
                        <button class="glass-button" onclick="window.windowManager.createStickyNote('Todo List', '📋 My Tasks:\\n\\n- [ ] Task 1\\n- [ ] Task 2\\n- [ ] Task 3')" style="padding: 0.5rem; font-size: 0.8rem;">
                            📋 Todo List
                        </button>
                        <button class="glass-button" onclick="window.windowManager.createStickyNote('Shopping List', '🛒 Shopping:\\n\\n- [ ] Milk\\n- [ ] Bread\\n- [ ] Eggs\\n- [ ] Cheese')" style="padding: 0.5rem; font-size: 0.8rem;">
                            🛒 Shopping
                        </button>
                        <button class="glass-button" onclick="window.windowManager.createStickyNote('Meeting Notes', '📅 Meeting Notes:\\n\\nAgenda:\\n- Topic 1\\n- Topic 2\\n\\nAction Items:\\n- [ ] Action 1\\n- [ ] Action 2')" style="padding: 0.5rem; font-size: 0.8rem;">
                            📅 Meeting
                        </button>
                        <button class="glass-button" onclick="window.windowManager.createStickyNote('Ideas', '💡 Ideas:\\n\\n• Idea 1\\n• Idea 2\\n• Idea 3')" style="padding: 0.5rem; font-size: 0.8rem;">
                            💡 Ideas
                        </button>
                        <button class="glass-button" onclick="window.windowManager.createStickyNote('Contact Info', '📞 Contact:\\nName: [Your Name]\\nEmail: [your.email@example.com]\\nPhone: [Your Phone]')" style="padding: 0.5rem; font-size: 0.8rem;">
                            📞 Contact
                        </button>
                        <button class="glass-button" onclick="window.windowManager.createStickyNote('Empty Note', '')" style="padding: 0.5rem; font-size: 0.8rem;">
                            📄 Empty
                        </button>
                    </div>
                </div>
                
                <div class="notes-container">
                    <h3 style="margin: 0 0 0.75rem 0; font-size: 1rem;">Your Notes</h3>
                    <div class="sticky-notes-container" style="min-height: 200px;">
                        <!-- Sticky notes will be loaded here -->
                    </div>
                </div>
                
                <div class="app-footer" style="margin-top: 1.5rem; padding-top: 1rem; border-top: 1px solid var(--glass-border-light); font-size: 0.8rem; color: var(--text-secondary);">
                    <p style="margin: 0;">💡 Tip: Click checkboxes in task lists to mark them complete!</p>
                </div>
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
            const noteId = `note-${this.getNextWindowId()}`;
            const newNote = document.createElement('div');
            newNote.className = 'sticky-note';
            newNote.dataset.noteId = noteId;
            newNote.style.cssText = `
                position: absolute;
                top: ${Math.random() * 50}px;
                left: ${Math.random() * 100}px;
                transform: rotate(${(Math.random() - 0.5) * 4}deg);
                width: 300px;
                height: 250px;
                pointer-events: auto;
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
                <div class="resize-handle"></div>
            `;
            
            // Make note draggable and resizable
            this.makeStickyNoteDraggable(newNote);
            this.makeStickyNoteResizable(newNote);
            this.setupStickyNoteControls(newNote);
            
            stickyNotesContainer.appendChild(newNote);
            
            // Setup checkboxes if content contains task lists
            if (newNote.querySelector('.note-content').innerHTML.includes('- [') || newNote.querySelector('.note-content').innerHTML.includes('- [x]')) {
                this.setupTaskCheckboxes(newNote);
            }
            
            // Save sticky notes
            this.saveStickyNotes();
            
            // Update counter
            this.updateStickyNotesCounter();
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
        const window = windowData.element;
        const favBtn = window.querySelector('.btn-fav');
        const minBtn = window.querySelector('.btn-min');
        const closeBtn = window.querySelector('.btn-close');
        
        if (favBtn) {
            favBtn.addEventListener('click', () => {
                window.classList.toggle('favorited');
                this.saveWindowStates();
            });
            
            favBtn.addEventListener('mouseenter', () => {
                favBtn.style.background = 'var(--window-fav-hover, #ffdd00)';
                favBtn.style.color = 'var(--window-fav-text, #333)';
            });
            
            favBtn.addEventListener('mouseleave', () => {
                favBtn.style.background = 'var(--glass-bg-light)';
                favBtn.style.color = 'var(--theme-text)';
            });
        }
        
        if (minBtn) {
            minBtn.addEventListener('click', () => {
                this.minimizeWindow(windowData);
            });
            
            minBtn.addEventListener('mouseenter', () => {
                minBtn.style.background = 'var(--window-min-hover, #55aaff)';
                minBtn.style.color = 'white';
            });
            
            minBtn.addEventListener('mouseleave', () => {
                minBtn.style.background = 'var(--glass-bg-light)';
                minBtn.style.color = 'var(--theme-text)';
            });
        }
        
        if (closeBtn) {
            closeBtn.addEventListener('click', () => {
                this.closeWindow(windowData);
            });
            
            closeBtn.addEventListener('mouseenter', () => {
                closeBtn.style.background = 'var(--window-close-hover, #ff5555)';
                closeBtn.style.color = 'var(--text-white)';
            });
            
            closeBtn.addEventListener('mouseleave', () => {
                closeBtn.style.background = 'var(--glass-bg-light)';
                closeBtn.style.color = 'var(--theme-text)';
            });
        }
    }

    closeAllWindows() {
        this.windows.forEach(windowData => {
            if (windowData.element && windowData.element.parentNode) {
                windowData.element.remove();
            }
        });
        this.windows = [];
    }

    // Global function to create sticky notes (for demo page)
    createStickyNote(title = 'New Note', content = '') {
        const stickyNotesContainer = document.querySelector('.sticky-notes-container');
        if (!stickyNotesContainer) {
            // If no container exists, create a sticky notes window first
            this.createWindow('sticky-notes', 'Sticky Notes');
            setTimeout(() => {
                this.createStickyNote(title, content);
            }, 200);
            return;
        }

        const noteId = `note-${this.getNextWindowId()}`;
        const newNote = document.createElement('div');
        newNote.className = 'sticky-note';
        newNote.dataset.noteId = noteId;
        
        // Check if this note should be globally visible (created from header tray)
        const isGlobalVisible = this.shouldStickyNoteBeGloballyVisible();
        if (isGlobalVisible) {
            newNote.dataset.globalVisible = 'true';
            // Position the note so it's visible on the main page, not just in the window
            newNote.style.cssText = `
                position: fixed;
                top: ${Math.random() * 100 + 100}px;
                left: ${Math.random() * 150 + 100}px;
                transform: rotate(${(Math.random() - 0.5) * 4}deg);
                width: 300px;
                height: 250px;
                pointer-events: auto;
                z-index: 1000;
            `;
            // Add to body instead of container for global visibility
            document.body.appendChild(newNote);
        } else {
            // Normal positioning within the sticky notes container
            newNote.style.cssText = `
                position: absolute;
                top: ${Math.random() * 100 + 50}px;
                left: ${Math.random() * 150 + 50}px;
                transform: rotate(${(Math.random() - 0.5) * 4}deg);
                width: 300px;
                height: 250px;
                pointer-events: auto;
            `;
            stickyNotesContainer.appendChild(newNote);
        }
        
        newNote.innerHTML = `
            <div class="note-header">
                <span class="note-title">${title}</span>
                <div class="note-controls">
                    <button class="note-btn btn-pin" title="Pin Note">📌</button>
                    <button class="note-btn btn-close" title="Close Note">✕</button>
                </div>
            </div>
            <div class="note-content" contenteditable="true">
                ${content}
            </div>
            <div class="resize-handle"></div>
        `;
        
        // Make note draggable and resizable
        this.makeStickyNoteDraggable(newNote);
        this.makeStickyNoteResizable(newNote);
        this.setupStickyNoteControls(newNote);
        
        // Setup checkboxes if content contains task lists
        if (content.includes('- [') || content.includes('- [x]')) {
            this.setupTaskCheckboxes(newNote);
        }
        
        // Save sticky notes
        this.saveStickyNotes();
        
        // Update counter if it exists
        this.updateStickyNotesCounter();
        
        return newNote;
    }

    // Check if sticky notes should be globally visible by default
    shouldStickyNoteBeGloballyVisible() {
        // Check if there's a setting for this
        const setting = localStorage.getItem('stickyNotesGlobalVisible');
        if (setting !== null) {
            return setting === 'true';
        }
        // Default to true for notes created from the header tray
        return true;
    }

    // Set the global visibility setting for sticky notes
    setStickyNotesGlobalVisible(enabled) {
        localStorage.setItem('stickyNotesGlobalVisible', enabled.toString());
    }

    // Update sticky notes counter
    updateStickyNotesCounter() {
        const counter = document.querySelector('.window-counter');
        if (counter) {
            const stickyNotes = document.querySelectorAll('.sticky-note');
            const totalWindows = this.windows.length + stickyNotes.length;
            counter.innerHTML = `Windows: ${totalWindows}/50`;
            
            if (totalWindows >= 45) {
                counter.classList.add('warning');
            } else if (totalWindows >= 50) {
                counter.classList.add('danger');
            } else {
                counter.classList.remove('warning', 'danger');
            }
        }
    }

    // Initialize sticky notes on page load
    initializeStickyNotes() {
        // Load any existing sticky notes
        this.loadStickyNotes();
        
        // Make global function available
        window.createStickyNote = this.createStickyNote.bind(this);
        
        // Update counter
        this.updateStickyNotesCounter();
    }

    // Focus a window (bring to front)
    focusWindow(windowId) {
        const windowData = this.getWindow(windowId);
        if (windowData) {
            // Find the highest z-index currently used by windows
            let maxZIndex = 100;
            this.windows.forEach(win => {
                const currentZ = parseInt(win.element.style.zIndex) || 100;
                maxZIndex = Math.max(maxZIndex, currentZ);
            });
            
            // Set all windows to lower z-index, then bring focused window to top
            this.windows.forEach(win => {
                if (win.id === windowId) {
                    win.element.style.zIndex = (maxZIndex + 1).toString();
                } else {
                    win.element.style.zIndex = '100';
                }
            });
            
            this.activeWindow = windowData;
        }
    }

    async loadAppContent(pageUrl, windowElement, title) {
        const contentAreaEl = windowElement.querySelector('.window-content');
        if (!contentAreaEl) {
            console.error(`Window content area not found for app: ${pageUrl}`);
            contentAreaEl.innerHTML = `<div class="error"><p>Error: Window content area is missing.</p></div>`;
            return;
        }

        contentAreaEl.innerHTML = '<div class="loader"></div>'; // Show loader

        try {
            const baseUrl = window.siteBaseUrl || '';
            const fullPageUrl = new URL(pageUrl, baseUrl).href;
            console.log(`Fetching content from URL: ${fullPageUrl}`);

            const response = await fetch(fullPageUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            // Extract the main content from the fetched page
            const mainContent = doc.querySelector('.main-content'); 

            if (mainContent) {
                // We need to re-route any relative links or image sources
                const base = new URL(fullPageUrl, window.location.origin);
                mainContent.querySelectorAll('[href]').forEach(el => {
                    const href = el.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                        el.href = new URL(href, base).href;
                    }
                });
                mainContent.querySelectorAll('[src]').forEach(el => {
                    const src = el.getAttribute('src');
                    if (src && !src.startsWith('http')) {
                        el.src = new URL(src, base).href;
                    }
                });

                contentAreaEl.innerHTML = mainContent.innerHTML;
                
                // Execute scripts after content is loaded
                this.executeScriptsInWindow(contentAreaEl, base);
            } else {
                 // Fallback for pages that might not have a .main-content div
                contentAreaEl.innerHTML = doc.body.innerHTML;
                console.warn(`'.main-content' not found in fetched HTML for ${pageUrl}. Loading full body.`);
                
                // Execute scripts after content is loaded
                const base = new URL(fullPageUrl, window.location.origin);
                this.executeScriptsInWindow(contentAreaEl, base);
            }

        } catch (error) {
            console.error(`Failed to load content for app "${pageUrl}":`, error);
            contentAreaEl.innerHTML = `<div class="error"><p>Could not load content for "${title}".</p><p>Please check the console for more details.</p></div>`;
        }

        // Now that content is loaded, append the window to the body and manage it
        document.body.appendChild(windowElement);
        const windowId = windowElement.id;
        const windowData = {
            element: windowElement,
            id: windowId,
            pageUrl: fullPageUrl, // Store the URL for refreshing
            position: { x: 50, y: 50 }, // Use a default position
            size: { width: 600, height: 400 },
            isMinimized: false,
            isMaximized: false
        };
        
        // Ensure glass theme is applied
        windowElement.style.zIndex = '1000';
        windowElement.style.border = '1px solid var(--glass-border-light)';
        windowElement.style.borderRadius = '15px';
        windowElement.style.background = 'var(--glass-bg)';
        windowElement.style.backdropFilter = 'var(--glass-backdrop-filter)';
        windowElement.style.webkitBackdropFilter = 'var(--glass-webkit-backdrop-filter)';
        windowElement.style.boxShadow = 'var(--glass-box-shadow)';
        
        // Ensure header has glass theme
        const header = windowElement.querySelector('.window-header');
        if (header) {
            header.style.background = 'var(--glass-bg-medium)';
            header.style.borderBottom = '1px solid var(--glass-border-light)';
            header.style.backdropFilter = 'var(--glass-blur-medium)';
        }
        
        // Ensure content area has glass theme
        const contentAreaTheme = windowElement.querySelector('.window-content');
        if (contentAreaTheme) {
            contentAreaTheme.style.background = 'var(--glass-bg-medium)';
            contentAreaTheme.style.backdropFilter = 'var(--glass-blur-medium)';
        }
        
        this.windows.push(windowData);
        this.setupWindowEventListeners(windowData);
        this.setupWindowControlsForWindow(windowData);
        this.addResizeHandles(windowData);
        this.addTilingControls(windowData);
        this.focusWindow(windowId);
        this.saveWindowStates();
        if (window.windowSwitcher) {
            window.windowSwitcher.refresh();
        }
    }

    // Apply theme settings to all currently open windows
    applyThemeToAllWindows(theme) {
        console.log('Applying theme to all windows:', theme);
        this.windows.forEach(windowData => {
            const windowEl = windowData.element;
            if (!windowEl) return;

            // Apply Window Shape
            if (theme.windowShape) {
                let borderRadius = '15px'; // default
                if (theme.windowShape === 'square') borderRadius = '0';
                if (theme.windowShape === 'circle') borderRadius = '50%';
                windowEl.style.borderRadius = borderRadius;
            }

            // Apply Window Size
            if (theme.windowSize) {
                let width = '60vw'; // default
                let height = '60vh';
                if (theme.windowSize === 'small') { width = '40vw'; height = '45vh'; }
                if (theme.windowSize === 'large') { width = '80vw'; height = '85vh'; }
                windowEl.style.width = width;
                windowEl.style.height = height;
                // We should also update the internal state
                windowData.size = { width: windowEl.offsetWidth, height: windowEl.offsetHeight };
            }

            // Apply Window Image (background) - Use CSS patterns instead of images
            if (theme.windowImage) {
                const contentEl = windowEl.querySelector('.window-content');
                let background = 'var(--glass-bg-heavy)'; // default
                
                // Use CSS patterns and gradients instead of image files
                const backgroundPatterns = {
                    minimal: 'linear-gradient(135deg, var(--glass-bg-heavy) 0%, var(--glass-bg-medium) 100%)',
                    gradient: 'linear-gradient(45deg, var(--theme-accent) 0%, var(--theme-accent-light) 50%, var(--theme-accent) 100%)',
                    pattern: 'repeating-linear-gradient(45deg, var(--glass-bg-medium) 0px, var(--glass-bg-medium) 2px, var(--glass-bg-heavy) 2px, var(--glass-bg-heavy) 4px)',
                    abstract: 'radial-gradient(circle at 30% 20%, var(--theme-accent) 0%, var(--theme-accent-light) 30%, var(--glass-bg-medium) 70%, var(--glass-bg-heavy) 100%)',
                    nature: 'linear-gradient(135deg, #4CAF50 0%, #8BC34A 25%, #CDDC39 50%, #FFEB3B 75%, #FF9800 100%)'
                };
                
                if (backgroundPatterns[theme.windowImage]) {
                    background = backgroundPatterns[theme.windowImage];
                }
                
                if (contentEl) {
                    contentEl.style.backgroundImage = background;
                    contentEl.style.backgroundSize = 'cover';
                    contentEl.style.backgroundPosition = 'center';
                }
            }
        });

        // Save the state after applying changes
        this.saveWindowStates();
    }

    // Find bookmark data by title
    findBookmarkData(title) {
        const bookmarks = this.getCookie('bookmarkedSites');
        if (bookmarks) {
            try {
                const bookmarkedSites = JSON.parse(bookmarks);
                return bookmarkedSites.find(site => site.title === title);
            } catch (error) {
                console.error('Error parsing bookmarks:', error);
            }
        }
        return null;
    }

    // Create bookmark content
    createBookmarkContent(bookmarkData) {
        return `
            <div style="padding: 1rem; height: 100%; overflow-y: auto;">
                <div class="glass-card" style="margin-bottom: 1rem;">
                    <h3 style="margin-top: 0; color: var(--theme-text);">${bookmarkData.title}</h3>
                    <p style="color: var(--theme-text-secondary); margin-bottom: 1rem;">${bookmarkData.description}</p>
                    <div class="tags" style="margin-bottom: 1rem;">
                        ${bookmarkData.tags.map(tag => `<span style="background: var(--glass-bg-medium); padding: 0.3rem 0.7rem; border-radius: 6px; font-size: 0.8rem; margin-right: 0.5rem;">${tag}</span>`).join('')}
                    </div>
                    <a href="${bookmarkData.url}" target="_blank" class="glass-button" style="display: inline-block;">
                        🔗 Open ${bookmarkData.title}
                    </a>
                </div>
                
                <div class="glass-card">
                    <h4 style="margin-top: 0; color: var(--theme-text);">Bookmark Actions</h4>
                    <button class="glass-button" onclick="window.open('${bookmarkData.url}', '_blank')" style="margin-right: 0.5rem;">
                        🌐 Open in New Tab
                    </button>
                    <button class="glass-button" onclick="removeBookmark('${bookmarkData.url}')" style="background: var(--theme-error);">
                        🗑️ Remove Bookmark
                    </button>
                </div>
            </div>
        `;
    }

    // Create bookmark error content
    createBookmarkErrorContent(title) {
        return `
            <div style="padding: 1rem; text-align: center; color: var(--theme-text-secondary);">
                <h3>Bookmark Not Found</h3>
                <p>The bookmark "${title}" could not be found.</p>
                <p>It may have been removed or the data is corrupted.</p>
            </div>
        `;
    }

    // Simple markdown to HTML conversion
    convertMarkdownToHtml(markdown) {
        let html = markdown;
        
        // Convert headers
        html = html.replace(/^### (.*$)/gim, '<h3>$1</h3>');
        html = html.replace(/^## (.*$)/gim, '<h2>$1</h2>');
        html = html.replace(/^# (.*$)/gim, '<h1>$1</h1>');
        
        // Convert bold and italic
        html = html.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        html = html.replace(/\*(.*?)\*/g, '<em>$1</em>');
        
        // Convert links
        html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank">$1</a>');
        
        // Convert paragraphs
        html = html.replace(/^(?!<[h|a|d|u|o])(.+)$/gm, '<p>$1</p>');
        
        // Clean up empty paragraphs
        html = html.replace(/<p><\/p>/g, '');
        
        return html;
    }

    setupGlobalEventListeners() {
        // Global mouse events for dragging and resizing
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

    executeScriptsInWindow(contentArea, base) {
        // Handle external game scripts specified by a data attribute
        const pageScriptElement = contentArea.querySelector('[data-page-script]');
        if (pageScriptElement) {
            const scriptName = pageScriptElement.dataset.pageScript;
            if (scriptName) {
                const script = document.createElement('script');
                // Use the correct base URL for script loading - games are in assets/js/, not assets/js/games/
                const scriptBase = base || window.location.origin;
                script.src = `${scriptBase}/assets/js/${scriptName}.js`;
                script.defer = true; // Ensure it runs after the DOM is ready
                script.onload = () => console.log(`Loaded game script: ${scriptName}`);
                script.onerror = () => console.error(`Failed to load game script: ${scriptName}`);
                contentArea.appendChild(script);
            }
        }

        // Handle any inline scripts
        const inlineScripts = contentArea.querySelectorAll('script');
        inlineScripts.forEach(oldScript => {
            const newScript = document.createElement('script');
            newScript.textContent = oldScript.textContent;
            oldScript.parentNode.replaceChild(newScript, oldScript);
        });
    }

    addRefreshButton(windowData) {
        const window = windowData.element;
        const header = window.querySelector('.window-header');
        const controls = window.querySelector('.window-controls');
        
        if (!header || !controls) return;
        
        const refreshBtn = document.createElement('button');
        refreshBtn.className = 'btn-refresh';
        refreshBtn.innerHTML = '↻';
        refreshBtn.title = 'Refresh';
        refreshBtn.style.width = '28px';
        refreshBtn.style.height = '28px';
        refreshBtn.style.borderRadius = '50%';
        refreshBtn.style.border = 'none';
        refreshBtn.style.background = 'var(--glass-bg-light)';
        refreshBtn.style.color = 'var(--theme-text)';
        refreshBtn.style.fontFamily = "'Segoe UI Symbol', sans-serif";
        refreshBtn.style.fontSize = '14px';
        refreshBtn.style.fontWeight = '700';
        refreshBtn.style.display = 'flex';
        refreshBtn.style.alignItems = 'center';
        refreshBtn.style.justifyContent = 'center';
        refreshBtn.style.cursor = 'pointer';
        refreshBtn.style.transition = 'all 0.2s ease';
        refreshBtn.style.marginRight = '8px';
        
        refreshBtn.addEventListener('click', () => {
            this.refreshWindowContent(windowData.id);
        });
        
        refreshBtn.addEventListener('mouseenter', () => {
            refreshBtn.style.background = 'var(--theme-accent)';
            refreshBtn.style.color = 'white';
        });
        
        refreshBtn.addEventListener('mouseleave', () => {
            refreshBtn.style.background = 'var(--glass-bg-light)';
            refreshBtn.style.color = 'var(--theme-text)';
        });
        
        // Insert before the first control button
        controls.insertBefore(refreshBtn, controls.firstChild);
    }

    async refreshWindowContent(windowId) {
        const windowData = this.getWindow(windowId);
        if (!windowData || !windowData.pageUrl) {
            console.error("Cannot refresh window: data or URL missing.", windowData);
            return;
        }

        const contentAreaRefresh = windowData.element.querySelector('.window-content');
        contentAreaRefresh.innerHTML = '<div class="loader"></div>';

        try {
            const response = await fetch(windowData.pageUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const mainContent = doc.querySelector('.main-content');
            if (mainContent) {
                const base = new URL(windowData.pageUrl, window.location.origin);
                mainContent.querySelectorAll('[href]').forEach(el => {
                    const href = el.getAttribute('href');
                    if (href && !href.startsWith('http') && !href.startsWith('#')) {
                        el.href = new URL(href, base).href;
                    }
                });
                mainContent.querySelectorAll('[src]').forEach(el => {
                    const src = el.getAttribute('src');
                    if (src && !src.startsWith('http')) {
                        el.src = new URL(src, base).href;
                    }
                });
                contentAreaRefresh.innerHTML = mainContent.innerHTML;
                this.executeScriptsInWindow(contentAreaRefresh, base);
            } else {
                throw new Error("'.main-content' not found in fetched HTML.");
            }
        } catch (error) {
            console.error(`Failed to refresh content for window "${windowId}":`, error);
            contentAreaRefresh.innerHTML = `<div class="error"><p>Could not reload content.</p></div>`;
        }
    }

    // Tiling manager methods
    tileWindow(windowData, position) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        
        switch (position) {
            case 'left':
                this.setWindowPosition(windowData.id, 0, 0);
                this.setWindowSize(windowData.id, viewportWidth / 2, viewportHeight);
                break;
            case 'right':
                this.setWindowPosition(windowData.id, viewportWidth / 2, 0);
                this.setWindowSize(windowData.id, viewportWidth / 2, viewportHeight);
                break;
            case 'top':
                this.setWindowPosition(windowData.id, 0, 0);
                this.setWindowSize(windowData.id, viewportWidth, viewportHeight / 2);
                break;
            case 'bottom':
                this.setWindowPosition(windowData.id, 0, viewportHeight / 2);
                this.setWindowSize(windowData.id, viewportWidth, viewportHeight / 2);
                break;
            case 'fullscreen':
                this.setWindowPosition(windowData.id, 0, 0);
                this.setWindowSize(windowData.id, viewportWidth, viewportHeight);
                break;
            case 'center':
                const centerX = (viewportWidth - windowData.size.width) / 2;
                const centerY = (viewportHeight - windowData.size.height) / 2;
                this.setWindowPosition(windowData.id, centerX, centerY);
                break;
        }
        
        this.saveWindowStates();
    }

    // Add tiling indicators to window headers
    addTilingControls(windowData) {
        const window = windowData.element;
        const header = window.querySelector('.window-header');
        const controls = window.querySelector('.window-controls');
        
        if (!header || !controls) return;
        
        const tileBtn = document.createElement('button');
        tileBtn.className = 'btn-tile';
        tileBtn.innerHTML = '⊞';
        tileBtn.title = 'Tile Window';
        tileBtn.style.width = '28px';
        tileBtn.style.height = '28px';
        tileBtn.style.borderRadius = '50%';
        tileBtn.style.border = 'none';
        tileBtn.style.background = 'var(--glass-bg-light)';
        tileBtn.style.color = 'var(--theme-text)';
        tileBtn.style.fontFamily = "'Segoe UI Symbol', sans-serif";
        tileBtn.style.fontSize = '14px';
        tileBtn.style.fontWeight = '700';
        tileBtn.style.display = 'flex';
        tileBtn.style.alignItems = 'center';
        tileBtn.style.justifyContent = 'center';
        tileBtn.style.cursor = 'pointer';
        tileBtn.style.transition = 'all 0.2s ease';
        tileBtn.style.marginRight = '8px';
        
        tileBtn.addEventListener('click', () => {
            const positions = [
                { x: 0, y: 0, width: '50%', height: '50%' },
                { x: '50%', y: 0, width: '50%', height: '50%' },
                { x: 0, y: '50%', width: '50%', height: '50%' },
                { x: '50%', y: '50%', width: '50%', height: '50%' }
            ];
            
            const currentIndex = this.windows.indexOf(windowData);
            const position = positions[currentIndex % positions.length];
            
            this.tileWindow(windowData, position);
        });
        
        tileBtn.addEventListener('mouseenter', () => {
            tileBtn.style.background = 'var(--theme-accent)';
            tileBtn.style.color = 'white';
        });
        
        tileBtn.addEventListener('mouseleave', () => {
            tileBtn.style.background = 'var(--glass-bg-light)';
            tileBtn.style.color = 'var(--theme-text)';
        });
        
        // Insert after refresh button
        const refreshBtn = controls.querySelector('.btn-refresh');
        if (refreshBtn) {
            controls.insertBefore(tileBtn, refreshBtn.nextSibling);
        } else {
            controls.insertBefore(tileBtn, controls.firstChild);
        }
    }

    // Add new task list method
    addNewTaskList() {
        const taskList = this.createStickyNote('Task List', '📋 Task List:\n\n- [ ] Add your first task here\n- [ ] Click checkboxes to complete tasks\n- [ ] Tasks are saved automatically');
        
        // Add click handlers for checkboxes
        if (taskList) {
            this.setupTaskCheckboxes(taskList);
        }
    }

    // Setup clickable checkboxes for task lists
    setupTaskCheckboxes(note) {
        const content = note.querySelector('.note-content');
        if (!content) return;
        
        // Convert markdown-style checkboxes to clickable ones
        this.convertCheckboxesToClickable(content);
        
        // Listen for new content to convert new checkboxes
        const observer = new MutationObserver(() => {
            this.convertCheckboxesToClickable(content);
        });
        
        observer.observe(content, { childList: true, subtree: true });
    }

    // Convert markdown checkboxes to clickable buttons
    convertCheckboxesToClickable(content) {
        const text = content.innerHTML;
        const checkboxRegex = /- \[([ x])\] /g;
        
        if (checkboxRegex.test(text)) {
            const newText = text.replace(checkboxRegex, (match, checked) => {
                const isChecked = checked === 'x';
                return `- <button class="task-checkbox ${isChecked ? 'checked' : ''}" onclick="window.windowManager.toggleTaskCheckbox(this)">${isChecked ? '☑️' : '☐'}</button> `;
            });
            
            if (newText !== text) {
                content.innerHTML = newText;
            }
        }
    }

    // Toggle task checkbox
    toggleTaskCheckbox(checkbox) {
        const isChecked = checkbox.classList.contains('checked');
        
        if (isChecked) {
            checkbox.classList.remove('checked');
            checkbox.innerHTML = '☐';
        } else {
            checkbox.classList.add('checked');
            checkbox.innerHTML = '☑️';
        }
        
        // Save the note
        this.saveStickyNotes();
    }

    // --- Tamagotchi Web Pet ---
    createPetWindow() {
        // Only one pet window at a time
        if (document.getElementById('pet-window')) {
            this.focusWindow('pet-window');
            return;
        }
        const petHtml = `
            <div class="pet-container" style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%;">
                <div class="pet-art" style="width: 120px; height: 120px; margin-bottom: 1rem;">
                    <img src="/assets/pet/pet-placeholder.gif" alt="Web Pet" style="width: 100%; height: 100%; object-fit: contain;" id="pet-art-img">
                </div>
                <div class="pet-stats" style="margin-bottom: 1rem;">
                    <span id="pet-mood">Mood: 😊</span> | <span id="pet-hunger">Hunger: 🍔🍔🍔</span>
                </div>
                <div class="pet-actions" style="display: flex; gap: 1rem;">
                    <button class="glass-button" id="pet-feed">Feed</button>
                    <button class="glass-button" id="pet-play">Play</button>
                    <button class="glass-button" id="pet-pet">Pet</button>
                </div>
            </div>
        `;
        const win = this.createWindow('pet-window', '🐾 Web Pet', petHtml, 320, 320, true);
        win.classList.add('always-on-top');
        win.style.zIndex = 99999;
        // Simple pet logic
        let mood = 3, hunger = 3;
        const moodSpan = win.querySelector('#pet-mood');
        const hungerSpan = win.querySelector('#pet-hunger');
        function updateStats() {
            const moods = ['😢', '😐', '😊', '😄'];
            moodSpan.textContent = `Mood: ${moods[mood]}`;
            hungerSpan.textContent = `Hunger: ${'🍔'.repeat(hunger)}`;
        }
        win.querySelector('#pet-feed').onclick = () => { hunger = Math.min(3, hunger + 1); mood = Math.min(3, mood + 1); updateStats(); };
        win.querySelector('#pet-play').onclick = () => { mood = Math.min(3, mood + 1); hunger = Math.max(0, hunger - 1); updateStats(); };
        win.querySelector('#pet-pet').onclick = () => { mood = Math.min(3, mood + 1); updateStats(); };
        // Mood/hunger decay
        win.petInterval = setInterval(() => { hunger = Math.max(0, hunger - 1); if (hunger === 0) mood = Math.max(0, mood - 1); updateStats(); }, 10000);
        win.onclose = () => { clearInterval(win.petInterval); };
        updateStats();
    }
}

// Initialize window manager globally
document.addEventListener('DOMContentLoaded', () => {
    if (!window.windowManager) {
        window.windowManager = new WindowManager();
    }
    
    // Ensure sticky notes are initialized
    if (window.windowManager && typeof window.windowManager.initializeStickyNotes === 'function') {
        window.windowManager.initializeStickyNotes();
    }
}); 