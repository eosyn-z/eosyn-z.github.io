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
                            <button class="glass-button" data-type="Quick Note" data-content="E">📝 Quick Note</button>
                            <button class="glass-button" data-type="Todo List" data-content="📋 Todo:\n• Task 1\n• Task 2\n• Task 3">✅ Todo List</button>
                            <button class="glass-button" data-type="Ideas" data-content="💡 Ideas:\n• Project idea 1\n• Creative thought">💡 Ideas</button>
                            <button class="glass-button" data-type="Reminder" data-content="⏰ Reminder:\nDon't forget to...">⏰ Reminder</button>
                            <button class="glass-button" data-type="Code Snippet" data-content="&#x60;&#x60;&#x60;javascript\nfunction hello() {\n  console.log(\"Hello World!\");\n}&#x60;&#x60;&#x60;">💻 Code Snippet</button>
                            <button class="glass-button" data-type="Quote" data-content="> &quot;The best way to predict the future is to invent it.&quot;\n\n- Alan Kay">💬 Quote</button>
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
                    if (window.desktopManager) {
                        const type = button.dataset.type;
                        const content = button.dataset.content;
                        window.desktopManager.createStickyNote(type, content);
                        this.hide(); // Hide tray after creating a note
                    } else {
                        console.error("DesktopManager not found.");
                        alert("Error: Cannot create sticky note. Desktop Manager is not loaded.");
                    }
                });
            });

            document.addEventListener('click', (e) => {
                if (this.tray.style.display === 'block' && !this.tray.contains(e.target) && !this.createButton.contains(e.target)) {
                    this.hide();
                }
            });
        }

        toggle() {
            if (this.tray.style.display === 'none' || this.tray.style.display === '') {
                this.show();
            } else {
                this.hide();
            }
        }

        show() {
             // Ensure other trays are closed
            const themeEditor = document.getElementById('theme-editor-tray');
            if (themeEditor && themeEditor.classList.contains('visible')) {
                themeEditor.classList.remove('visible');
                 setTimeout(() => {
                    themeEditor.style.display = 'none';
                }, 300);
            }
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
}); 