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
        this.loadWindowStates();
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

    // Save sticky notes data
    saveStickyNotes() {
        const stickyNotes = [];
        const noteElements = document.querySelectorAll('.sticky-note');
        
        noteElements.forEach((noteEl, index) => {
            const rect = noteEl.getBoundingClientRect();
            const content = noteEl.querySelector('.note-content');
            const title = noteEl.querySelector('.note-title');
            
            stickyNotes.push({
                id: noteEl.dataset.noteId || `note-${index}`,
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
    }

    // Make sticky note draggable
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
                note.style.cursor = '';
                note.style.zIndex = '';
                this.saveStickyNotes();
            }
            
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
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
                note.remove();
                this.saveStickyNotes();
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
        const windowId = `window-${Date.now()}`;
        const window = document.createElement('div');
        window.className = 'window glass-card';
        window.id = windowId;
        
        // Set initial position (staggered)
        const x = 50 + (this.windows.length * 30);
        const y = 50 + (this.windows.length * 30);
        
        window.style.cssText = `
            position: absolute;
            left: 0;
            top: 0;
            width: 600px;
            height: 400px;
            background: var(--glass-bg-heavy);
            backdrop-filter: var(--glass-blur-heavy);
            border: 1px solid var(--glass-border-light);
            border-radius: 15px;
            box-shadow: var(--glass-shadow-heavy);
            z-index: 1000;
            display: flex;
            flex-direction: column;
            overflow: hidden;
            transform: translate(${x}px, ${y}px);
        `;

        // Create window header
        const header = document.createElement('div');
        header.className = 'window-header';
        header.style.cssText = `
            background: var(--glass-bg-heavy);
            backdrop-filter: var(--glass-blur-heavy);
            border-bottom: 1px solid var(--glass-border-light);
            border-radius: 15px 15px 0 0;
            padding: 0.75rem 1rem;
            display: flex;
            align-items: center;
            justify-content: space-between;
            cursor: move;
            user-select: none;
        `;

        // Window title
        const titleElement = document.createElement('div');
        titleElement.className = 'window-title';
        titleElement.textContent = title;
        titleElement.style.cssText = `
            font-weight: 600;
            color: var(--theme-text);
            font-size: 1rem;
        `;

        // Window controls
        const controls = document.createElement('div');
        controls.className = 'window-controls';
        controls.style.cssText = `
            display: flex;
            gap: 0.5rem;
            align-items: center;
        `;

        const minimizeBtn = document.createElement('button');
        minimizeBtn.innerHTML = '−';
        minimizeBtn.className = 'window-control-btn';
        minimizeBtn.title = 'Minimize';
        minimizeBtn.style.cssText = `
            background: var(--glass-bg-medium);
            border: none;
            border-radius: 4px;
            width: 24px;
            height: 24px;
            color: var(--theme-text);
            cursor: pointer;
            font-size: 1rem;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
        `;

        const maximizeBtn = document.createElement('button');
        maximizeBtn.innerHTML = '□';
        maximizeBtn.className = 'window-control-btn';
        maximizeBtn.title = 'Maximize';
        maximizeBtn.style.cssText = minimizeBtn.style.cssText;

        const closeBtn = document.createElement('button');
        closeBtn.innerHTML = '✕';
        closeBtn.className = 'window-control-btn';
        closeBtn.title = 'Close';
        closeBtn.style.cssText = minimizeBtn.style.cssText;

        // Add hover effects
        [minimizeBtn, maximizeBtn, closeBtn].forEach(btn => {
            btn.addEventListener('mouseenter', () => {
                btn.style.background = 'var(--theme-accent)';
                btn.style.color = 'white';
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.background = 'var(--glass-bg-medium)';
                btn.style.color = 'var(--theme-text)';
            });
        });

        controls.appendChild(minimizeBtn);
        controls.appendChild(maximizeBtn);
        controls.appendChild(closeBtn);

        header.appendChild(titleElement);
        header.appendChild(controls);

        // Create window content
        const contentDiv = document.createElement('div');
        contentDiv.className = 'window-content';
        contentDiv.style.cssText = `
            flex: 1;
            background: var(--glass-bg-medium);
            backdrop-filter: var(--glass-blur-medium);
            border-radius: 0 0 15px 15px;
            overflow: hidden;
            position: relative;
        `;

        // Add content based on appId
        if (content) {
            contentDiv.innerHTML = content;
        } else {
            // The 'appId' is now the full page URL
            this.loadAppContent(appId, window, title);
            // We can't return a window object here because content is loaded async
            // The loadAppContent function now handles adding the window to the DOM
            return;
        }

        window.appendChild(header);
        window.appendChild(contentDiv);
        document.body.appendChild(window);
        
        // Create window data object
        const windowData = {
            element: window,
            id: windowId,
            pageUrl: fullPageUrl, // Store the URL for refreshing
            position: { x, y },
            size: { width: 600, height: 400 },
            isMinimized: false,
            isMaximized: false
        };
        
        this.windows.push(windowData);
        this.setupWindowEventListeners(windowData);
        this.setupWindowControlsForWindow(windowData);
        this.addResizeHandles(windowData);
        
        // If it's a game, add a refresh button
        if (contentArea.querySelector('[data-page-script]')) {
            this.addRefreshButton(windowData);
        }

        this.focusWindow(windowId);
        
        // Save window states
        this.saveWindowStates();

        // Refresh window switcher if it exists
        if (window.windowSwitcher) {
            window.windowSwitcher.refresh();
        }
        
        return windowData;
    }

    createStickyNotesContent() {
        return `
            <div style="padding: 1rem; height: 100%; overflow-y: auto;">
                <div class="sticky-notes-container">
                    <!-- Sticky notes will be loaded here -->
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
            const noteId = `note-${Date.now()}`;
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
            
            // Save sticky notes
            this.saveStickyNotes();
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

        const noteId = `note-${Date.now()}`;
        const newNote = document.createElement('div');
        newNote.className = 'sticky-note';
        newNote.dataset.noteId = noteId;
        newNote.style.cssText = `
            position: absolute;
            top: ${Math.random() * 100 + 50}px;
            left: ${Math.random() * 150 + 50}px;
            transform: rotate(${(Math.random() - 0.5) * 4}deg);
            width: 300px;
            height: 250px;
            pointer-events: auto;
        `;
        
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
        
        stickyNotesContainer.appendChild(newNote);
        
        // Save sticky notes
        this.saveStickyNotes();
        
        return newNote;
    }

    // Initialize sticky notes on page load
    initializeStickyNotes() {
        // Load any existing sticky notes
        this.loadStickyNotes();
        
        // Make global function available
        window.createStickyNote = this.createStickyNote.bind(this);
    }

    // Focus a window (bring to front)
    focusWindow(windowId) {
        const windowData = this.getWindow(windowId);
        if (windowData) {
            // Bring the clicked window to the front
            this.windows.forEach(win => {
                win.element.style.zIndex = win.id === windowId ? '999' : '998';
            });
            this.activeWindow = windowData;
        }
    }

    async loadAppContent(pageUrl, windowElement, title) {
        const contentArea = windowElement.querySelector('.window-content');
        if (!contentArea) {
            console.error(`Window content area not found for app: ${pageUrl}`);
            contentArea.innerHTML = `<div class="error"><p>Error: Window content area is missing.</p></div>`;
            return;
        }

        contentArea.innerHTML = '<div class="loader"></div>'; // Show loader

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

                contentArea.innerHTML = mainContent.innerHTML;
                
                // Execute scripts after content is loaded
                this.executeScriptsInWindow(contentArea, base);
            } else {
                 // Fallback for pages that might not have a .main-content div
                contentArea.innerHTML = doc.body.innerHTML;
                console.warn(`'.main-content' not found in fetched HTML for ${pageUrl}. Loading full body.`);
                
                // Execute scripts after content is loaded
                const base = new URL(fullPageUrl, window.location.origin);
                this.executeScriptsInWindow(contentArea, base);
            }

        } catch (error) {
            console.error(`Failed to load content for app "${pageUrl}":`, error);
            contentArea.innerHTML = `<div class="error"><p>Could not load content for "${title}".</p><p>Please check the console for more details.</p></div>`;
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
        
        this.windows.push(windowData);
        this.setupWindowEventListeners(windowData);
        this.setupWindowControlsForWindow(windowData);
        this.addResizeHandles(windowData);
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

            // Apply Window Image (background)
            if (theme.windowImage) {
                const contentEl = windowEl.querySelector('.window-content');
                let background = 'var(--glass-bg-heavy)'; // default
                const baseUrl = window.siteBaseUrl || '';
                const imageUrls = {
                    minimal: `url("${baseUrl}/assets/images/window-bgs/minimal.gif")`,
                    gradient: `url("${baseUrl}/assets/images/window-bgs/gradient.gif")`,
                    pattern: `url("${baseUrl}/assets/images/window-bgs/pattern.gif")`,
                    abstract: `url("${baseUrl}/assets/images/window-bgs/abstract.gif")`,
                    nature: `url("${baseUrl}/assets/images/window-bgs/nature.gif")`,
                };
                if (imageUrls[theme.windowImage]) {
                    background = imageUrls[theme.windowImage];
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
                script.src = `${base || ''}/assets/js/games/${scriptName}.js`;
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
        const controls = windowData.element.querySelector('.window-controls');
        if (!controls) return;

        const refreshBtn = document.createElement('button');
        refreshBtn.innerHTML = '🔄';
        refreshBtn.className = 'window-control-btn';
        refreshBtn.title = 'Refresh';
        
        // Match existing button styles
        const existingBtn = controls.querySelector('.window-control-btn');
        if(existingBtn) {
            refreshBtn.style.cssText = existingBtn.style.cssText;
        }

        refreshBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.refreshWindowContent(windowData.id);
        });

        // Add hover effects like other buttons
        refreshBtn.addEventListener('mouseenter', () => {
            refreshBtn.style.background = 'var(--theme-accent)';
            refreshBtn.style.color = 'white';
        });
        refreshBtn.addEventListener('mouseleave', () => {
            refreshBtn.style.background = 'var(--glass-bg-medium)';
            refreshBtn.style.color = 'var(--theme-text)';
        });

        controls.insertBefore(refreshBtn, controls.firstChild);
    }

    async refreshWindowContent(windowId) {
        const windowData = this.getWindow(windowId);
        if (!windowData || !windowData.pageUrl) {
            console.error("Cannot refresh window: data or URL missing.", windowData);
            return;
        }

        const contentArea = windowData.element.querySelector('.window-content');
        contentArea.innerHTML = '<div class="loader"></div>';

        try {
            const response = await fetch(windowData.pageUrl);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const mainContent = doc.querySelector('.main-content');

            if (mainContent) {
                const base = new URL(windowData.pageUrl, window.location.origin);
                // Fix relative links and sources
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
                contentArea.innerHTML = mainContent.innerHTML;
                this.executeScriptsInWindow(contentArea);
            } else {
                throw new Error("'.main-content' not found in fetched HTML.");
            }
        } catch (error) {
            console.error(`Failed to refresh content for window "${windowId}":`, error);
            contentArea.innerHTML = `<div class="error"><p>Could not reload content.</p></div>`;
        }
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // Check if we are in desktop mode
    if (document.body.classList.contains('desktop-mode')) {
        // Initialize the window manager
        if (!window.windowManager) {
            window.windowManager = new WindowManager();
            console.log('WindowManager initialized for desktop mode.');
        }

        // Initialize sticky notes if the container exists
        if (document.querySelector('.sticky-notes-container')) {
            window.windowManager.initializeStickyNotes();
        }
    }
    
    // Make a simplified sticky note creator available globally for buttons
    // This is useful if you want a "create note" button outside the main desktop app
    if (!window.createStickyNote) {
        // Ensure WindowManager is initialized first if needed
        if (!window.windowManager && !document.body.classList.contains('desktop-mode')) {
            // A lightweight manager for non-desktop pages if needed
            window.windowManager = new WindowManager();
        }
        window.createStickyNote = window.windowManager.createStickyNote.bind(window.windowManager);
    }
}); 