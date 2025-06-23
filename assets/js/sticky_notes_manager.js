// assets/js/sticky_notes_manager.js

class StickyNotesManager {
    constructor() {
        this.notes = this.loadNotes();
        this.nextId = this.calculateNextId();
        this.init();
    }

    init() {
        // This event will be triggered by the Start Menu or a desktop icon
        document.addEventListener('launch-sticky-note', () => this.createNote());

        // Load existing notes on page load, but only in desktop mode
        if (document.body.classList.contains('desktop-mode')) {
            this.renderAllNotes();
        }
    }

    loadNotes() {
        try {
            return JSON.parse(localStorage.getItem('stickyNotes') || '[]');
        } catch (e) {
            console.error("Error loading sticky notes:", e);
            return [];
        }
    }

    saveNotes() {
        localStorage.setItem('stickyNotes', JSON.stringify(this.notes));
    }

    calculateNextId() {
        if (this.notes.length === 0) {
            return 1;
        }
        const ids = this.notes.map(note => note.id).sort((a, b) => a - b);
        let nextId = 1;
        for (const id of ids) {
            if (id === nextId) {
                nextId++;
            } else {
                break;
            }
        }
        return nextId;
    }

    createNote() {
        const newNote = {
            id: this.nextId,
            content: '',
            position: { top: '100px', left: '100px' }, // Default position
            size: { width: '250px', height: '250px' }
        };

        this.notes.push(newNote);
        this.renderNote(newNote);
        this.nextId = this.calculateNextId(); // Recalculate for the next one
        this.saveNotes();
    }

    deleteNote(noteId) {
        this.notes = this.notes.filter(note => note.id !== noteId);
        this.nextId = this.calculateNextId(); // Recalculate next available ID
        this.saveNotes();
    }

    updateNoteContent(noteId, newContent) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            note.content = newContent;
            this.saveNotes();
        }
    }
    
    updateNotePosition(noteId, newPosition) {
        const note = this.notes.find(n => n.id === noteId);
        if (note) {
            note.position = newPosition;
            this.saveNotes();
        }
    }

    renderNote(noteData) {
        const noteId = `sticky-note-${noteData.id}`;
        const noteWindow = window.createWindow(
            noteId,
            `📝 Sticky Note #${noteData.id}`,
            noteData.size.width,
            noteData.size.height,
            false // Not a traditional app, doesn't need iframe logic
        );

        noteWindow.style.top = noteData.position.top;
        noteWindow.style.left = noteData.position.left;

        const content = noteWindow.querySelector('.window-content');
        content.innerHTML = `
            <textarea class="sticky-note-textarea" style="width: 100%; height: 100%; border: none; background: var(--postit-bg-color, #FFFACD); color: var(--postit-text-color, #333); font-family: 'Comic Sans MS', cursive, sans-serif; padding: 10px; resize: none; outline: none;">${noteData.content}</textarea>
        `;
        
        const textarea = content.querySelector('textarea');
        textarea.addEventListener('input', () => {
            this.updateNoteContent(noteData.id, textarea.value);
        });

        // Override the default close behavior
        noteWindow.querySelector('.close').onclick = () => {
            this.deleteNote(noteData.id);
            noteWindow.remove();
        };

        // Save position on drag end
        const header = noteWindow.querySelector('.window-header');
        header.addEventListener('mouseup', () => {
             this.updateNotePosition(noteData.id, { top: noteWindow.style.top, left: noteWindow.style.left });
        });
    }

    renderAllNotes() {
        this.notes.forEach(note => this.renderNote(note));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.stickyNotesManager = new StickyNotesManager();

    // We need an entry point. For now, let's create a temporary button in the start menu.
    // The correct way would be to have a 'Sticky Notes' icon in the 'Utilities' list that dispatches this event.
    const startMenu = document.getElementById('start-menu');
    if (startMenu) {
        const utilitiesList = startMenu.querySelector('.utilities-list');
        if (utilitiesList) {
            const stickyNoteButton = document.createElement('li');
            stickyNoteButton.className = 'start-menu-item';
            stickyNoteButton.innerHTML = `<span class="icon">📝</span><span class="title">New Sticky Note</span>`;
            stickyNoteButton.onclick = () => {
                document.dispatchEvent(new Event('launch-sticky-note'));
            };
            utilitiesList.appendChild(stickyNoteButton);
        }
    }
}); 