document.addEventListener('DOMContentLoaded', () => {
    // Manages the slide-in tray for creating sticky notes
    class StickyNotesTray {
        constructor() {
            this.tray = null;
            this.createButton = null;
            this._createTray();
            this._attachEventListeners();
        }

        _createTray() {
            const trayContainer = document.createElement('div');
            trayContainer.innerHTML = `
                <div id="sticky-notes-tray" class="sticky-notes-tray slide-in-right">
                    <div class="tray-header">
                        <h2 style="margin: 0; color: var(--theme-text);">📝 Sticky Notes</h2>
                        <button class="tray-close-btn" title="Close Sticky Notes Tray">&times;</button>
                    </div>
                    <div class="tray-content"></div>
                </div>
            `;
            this.tray = trayContainer.firstElementChild;
            document.body.appendChild(this.tray);
        }

        _attachEventListeners() {
            // Attach to global header button (for site mode)
            const globalBtn = document.getElementById('sticky-note-tray-btn');
            if (globalBtn) {
                globalBtn.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggle();
                });
            }
            
            // Attach to desktop plus button
            this.createButton = document.getElementById('create-note-btn');
            if (this.createButton) {
                this.createButton.addEventListener('click', (e) => {
                    e.stopPropagation();
                    this.toggle();
                });
            }
            
            const closeButton = this.tray.querySelector('.tray-close-btn');
            if (closeButton) {
                closeButton.addEventListener('click', () => this.hide());
            }
            
            this.tray.querySelectorAll('.sticky-notes-buttons-grid .glass-button').forEach(button => {
                button.addEventListener('click', () => {
                    if (window.windowManager) {
                        const type = button.dataset.type;
                        const content = button.dataset.content;
                        // Create sticky note with global visibility
                        const note = window.windowManager.createStickyNote(type, content);
                        if (note) {
                            note.dataset.globalVisible = 'true';
                        }
                        this.hide(); // Hide tray after creating a note
                    } else {
                        console.error("WindowManager not found.");
                        alert("Error: Cannot create sticky note. Window Manager is not loaded.");
                    }
                });
            });
            
            // Only one tray open at a time (close theme editor tray if open)
            document.addEventListener('click', (e) => {
                if (this.tray.style.display === 'block' && !this.tray.contains(e.target) && 
                    (!globalBtn || !globalBtn.contains(e.target)) && 
                    (!this.createButton || !this.createButton.contains(e.target))) {
                    this.hide();
                }
            });
        }

        toggle() {
            // Close theme editor tray if open
            const themeEditorTray = document.querySelector('.theme-editor-tray');
            if (themeEditorTray && themeEditorTray.classList.contains('active')) {
                themeEditorTray.classList.remove('active');
                setTimeout(() => {
                    themeEditorTray.style.display = 'none';
                }, 300);
            }
            if (this.tray.style.display === 'none' || this.tray.style.display === '') {
                this.show();
            } else {
                this.hide();
            }
        }

        show() {
            // Inject sticky notes manager UI into tray-content
            if (window.windowManager && typeof window.windowManager.createStickyNotesContent === 'function') {
                this.tray.querySelector('.tray-content').innerHTML = window.windowManager.createStickyNotesContent();
            }
            this.tray.style.display = 'block';
            this.tray.classList.add('visible');
            localStorage.setItem('stickyNotesTrayOpen', 'true');
        }

        hide() {
            this.tray.classList.remove('visible');
            this.tray.style.display = 'none';
            localStorage.setItem('stickyNotesTrayOpen', 'false');
        }

        // Check if tray should be restored on page load
        checkRestoreState() {
            const wasOpen = localStorage.getItem('stickyNotesTrayOpen') === 'true';
            if (wasOpen) {
                this.show();
            }
        }
    }

    // Expose to global scope if not already present
    if (!window.stickyNotesTray) {
        window.stickyNotesTray = new StickyNotesTray();
    }

    // Check if tray should be restored
    setTimeout(() => {
        if (window.stickyNotesTray) {
            window.stickyNotesTray.checkRestoreState();
        }
    }, 200);

    // Ensure plus button works in both modes
    const stickyBtn = document.getElementById('sticky-note-tray-btn') || document.getElementById('create-note-btn');
    if (stickyBtn && window.stickyNotesTray) {
        stickyBtn.onclick = (e) => {
            e.preventDefault();
            window.stickyNotesTray.show();
        };
    }

    // Ensure sticky notes container is always on top and persistent
    function ensureStickyNotesContainer() {
        let container = document.querySelector('.sticky-notes-container');
        if (!container) {
            container = document.createElement('div');
            container.className = 'sticky-notes-container';
            container.style.position = 'fixed';
            container.style.top = '0';
            container.style.left = '0';
            container.style.width = '100vw';
            container.style.height = '100vh';
            container.style.pointerEvents = 'none';
            container.style.zIndex = '99999';
            document.body.appendChild(container);
        }
        return container;
    }

    // Call this on DOMContentLoaded and after mode switches
    ensureStickyNotesContainer();
}); 