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

    // Load saved window states from localStorage
    loadWindowStates() {
        try {
            const savedStates = JSON.parse(localStorage.getItem('windowStates') || '{}');
            Object.keys(savedStates).forEach(windowId => {
                const state = savedStates[windowId];
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
        } catch (error) {
            console.error('Error loading window states:', error);
        }
    }

    // Save window states to localStorage
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
        localStorage.setItem('windowStates', JSON.stringify(states));
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
        
        localStorage.setItem('stickyNotes', JSON.stringify(stickyNotes));
    }

    // Load sticky notes data
    loadStickyNotes() {
        try {
            const savedNotes = JSON.parse(localStorage.getItem('stickyNotes') || '[]');
            const container = document.querySelector('.sticky-notes-container');
            
            if (container && savedNotes.length > 0) {
                // Clear existing notes
                container.innerHTML = '';
                
                // Restore saved notes
                savedNotes.forEach(noteData => {
                    this.createStickyNoteFromData(noteData);
                });
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
        windowData.element.style.transform = 'scale(0.8)';
        windowData.element.style.opacity = '0';
        
        setTimeout(() => {
            windowData.element.style.display = 'none';
            // Remove from windows array
            const index = this.windows.indexOf(windowData);
            if (index > -1) {
                this.windows.splice(index, 1);
            }
            this.saveWindowStates(); // Save after closing
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
        windowEl.className = 'app-window glass-container';
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
        
        // Create window data object
        const windowData = {
            element: windowEl,
            id: windowId,
            position: { x: 50, y: 50 },
            size: { width: 400, height: 300 },
            isMinimized: false,
            isMaximized: false
        };
        
        // Add to windows array
        this.windows.push(windowData);
        
        // Setup window functionality
        this.setupWindowEventListeners(windowData);
        this.setupWindowControlsForWindow(windowData);
        this.addResizeHandles(windowData);
        
        // Load sticky notes if this is a sticky notes window
        if (appId === 'sticky-notes') {
            setTimeout(() => {
                this.loadStickyNotes();
            }, 100);
        }
        
        // Save window states
        this.saveWindowStates();
        
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
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize window manager globally
    window.windowManager = new WindowManager();
    
    // Initialize sticky notes
    if (window.windowManager) {
        window.windowManager.initializeStickyNotes();
    }
}); 