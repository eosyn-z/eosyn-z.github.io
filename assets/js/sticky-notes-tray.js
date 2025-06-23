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
                <div id="sticky-notes-tray" class="sticky-notes-tray glass-panel">
                    <div class="tray-header">
                        <h3>📝 Create a New Note</h3>
                        <button class="close-tray-btn">&times;</button>
                    </div>
                    <div class="tray-content">
                        <p>Click any button below to create a new sticky note on your desktop.</p>
                        <div class="sticky-notes-buttons-grid">
                            <button class="glass-button" data-type="Quick Note" data-content="📝 Quick Note\n\nWrite your thoughts here...">📝 Quick Note</button>
                            <button class="glass-button" data-type="Todo List" data-content="📋 Todo:\n• Task 1\n• Task 2\n• Task 3">✅ Todo List</button>
                            <button class="glass-button" data-type="Ideas" data-content="💡 Ideas:\n• Project idea 1\n• Creative thought">💡 Ideas</button>
                            <button class="glass-button" data-type="Reminder" data-content="⏰ Reminder:\nDon't forget to...">⏰ Reminder</button>
                            <button class="glass-button" data-type="Code Snippet" data-content="// Code Snippet\nfunction hello() {\n  console.log('Hello World!');\n}">💻 Code Snippet</button>
                            <button class="glass-button" data-type="Quote" data-content="> 'The best way to predict the future is to invent it.'\n\n- Alan Kay">💬 Quote</button>
                            <button class="glass-button" data-type="Contact Info" data-content="📞 Contact:\nName: [Your Name]\nEmail: [your.email@example.com]">📞 Contact Info</button>
                            <button class="glass-button" data-type="Shopping List" data-content="🛒 Shopping:\n• Milk\n• Bread\n• Eggs">🛒 Shopping List</button>
                            <button class="glass-button" data-type="Meeting Notes" data-content="📅 Meeting Notes:\n\nAgenda:\n- Topic 1\n- Topic 2">📅 Meeting Notes</button>
                            <button class="glass-button" data-type="Empty Note" data-content="">📄 Empty Note</button>
                        </div>
                    </div>
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
            
            const closeButton = this.tray.querySelector('.close-tray-btn');
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
            this.tray.style.display = 'block';
            setTimeout(() => this.tray.classList.add('visible'), 10);
        }

        hide() {
            this.tray.classList.remove('visible');
            setTimeout(() => {
                this.tray.style.display = 'none';
            }, 300);
        }
    }

    // Expose to global scope if not already present
    if (!window.stickyNotesTray) {
        window.stickyNotesTray = new StickyNotesTray();
    }

    // Ensure plus button works in both modes
    const stickyBtn = document.getElementById('sticky-note-tray-btn') || document.getElementById('create-note-btn');
    if (stickyBtn && window.stickyNotesTray) {
        stickyBtn.onclick = (e) => {
            e.preventDefault();
            window.stickyNotesTray.show();
        };
    }
}); 