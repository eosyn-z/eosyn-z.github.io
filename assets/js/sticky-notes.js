class StickyNotesApp {
  constructor() {
    this.notes = this.loadNotes();
    this.currentNote = null;
  }

  createNoteWindow() {
    const noteWindow = document.createElement('div');
    noteWindow.className = 'app-window glass-effect';
    noteWindow.id = 'sticky-notes-window';
    noteWindow.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 600px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
    `;

    noteWindow.innerHTML = `
      <div class="window-header">
        <div class="window-title">📝 Sticky Notes</div>
        <div class="window-controls">
          <button class="control-btn close" onclick="this.closest('.app-window').remove()">×</button>
        </div>
      </div>
      
      <div class="window-content" style="flex: 1; display: flex; flex-direction: column; padding: 0;">
        <!-- Toolbar -->
        <div class="notes-toolbar" style="padding: 10px; border-bottom: 1px solid var(--glass-border-light); background: var(--glass-bg-medium);">
          <div style="display: flex; gap: 10px; align-items: center; flex-wrap: wrap;">
            <button class="glass-button" onclick="stickyNotesApp.newNote()">📄 New</button>
            <button class="glass-button" onclick="stickyNotesApp.saveNote()">💾 Save</button>
            <button class="glass-button" onclick="stickyNotesApp.exportNote()">📤 Export</button>
            <div style="width: 1px; height: 20px; background: var(--glass-border-light);"></div>
            
            <!-- Text formatting buttons -->
            <button class="glass-button" onclick="stickyNotesApp.formatText('bold')" title="Bold">B</button>
            <button class="glass-button" onclick="stickyNotesApp.formatText('italic')" title="Italic">I</button>
            <button class="glass-button" onclick="stickyNotesApp.formatText('underline')" title="Underline">U</button>
            <div style="width: 1px; height: 20px; background: var(--glass-border-light);"></div>
            
            <button class="glass-button" onclick="stickyNotesApp.formatText('insertUnorderedList')" title="Bullet List">•</button>
            <button class="glass-button" onclick="stickyNotesApp.formatText('insertOrderedList')" title="Numbered List">1.</button>
          </div>
        </div>
        
        <!-- Notes list and editor -->
        <div style="flex: 1; display: flex;">
          <!-- Notes list sidebar -->
          <div class="notes-sidebar" style="width: 200px; border-right: 1px solid var(--glass-border-light); background: var(--glass-bg-light); overflow-y: auto;">
            <div style="padding: 10px;">
              <h4 style="margin: 0 0 10px 0; color: var(--theme-text);">Notes</h4>
              <div id="notes-list">
                ${this.renderNotesList()}
              </div>
            </div>
          </div>
          
          <!-- Note editor -->
          <div class="note-editor" style="flex: 1; display: flex; flex-direction: column;">
            <div id="note-editor" contenteditable="true" style="flex: 1; padding: 20px; outline: none; overflow-y: auto; background: white; color: black; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; font-size: 14px; line-height: 1.5;">
              <p>Start typing your note here...</p>
            </div>
          </div>
        </div>
      </div>
    `;

    // Make the window draggable
    const header = noteWindow.querySelector('.window-header');
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    header.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('control-btn')) return;
      
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(noteWindow.style.left) || 0;
      startTop = parseInt(noteWindow.style.top) || 0;
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      noteWindow.style.left = `${startLeft + deltaX}px`;
      noteWindow.style.top = `${startTop + deltaY}px`;
      noteWindow.style.transform = 'none';
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    // Set up editor event listeners
    const editor = noteWindow.querySelector('#note-editor');
    editor.addEventListener('input', () => {
      this.autoSave();
    });

    document.body.appendChild(noteWindow);
    this.setupEditor();
  }

  renderNotesList() {
    if (this.notes.length === 0) {
      return '<p style="color: var(--theme-text-secondary); font-size: 12px;">No notes yet</p>';
    }

    return this.notes.map((note, index) => `
      <div class="note-item" onclick="stickyNotesApp.loadNote(${index})" style="padding: 8px; margin-bottom: 5px; background: var(--glass-bg-medium); border-radius: 5px; cursor: pointer; border: 1px solid transparent;">
        <div style="font-weight: bold; font-size: 12px; color: var(--theme-text);">${note.title || 'Untitled Note'}</div>
        <div style="font-size: 10px; color: var(--theme-text-secondary);">${note.lastModified}</div>
      </div>
    `).join('');
  }

  newNote() {
    const newNote = {
      id: Date.now(),
      title: 'Untitled Note',
      content: '<p>Start typing your note here...</p>',
      created: new Date().toLocaleDateString(),
      lastModified: new Date().toLocaleDateString()
    };

    this.notes.unshift(newNote);
    this.currentNote = 0;
    this.loadNote(0);
    this.updateNotesList();
    this.saveNotes();
  }

  loadNote(index) {
    this.currentNote = index;
    const note = this.notes[index];
    const editor = document.querySelector('#note-editor');
    
    if (editor) {
      editor.innerHTML = note.content;
    }

    // Update active state in notes list
    document.querySelectorAll('.note-item').forEach((item, i) => {
      if (i === index) {
        item.style.borderColor = 'var(--theme-accent)';
        item.style.background = 'var(--glass-bg-dark)';
      } else {
        item.style.borderColor = 'transparent';
        item.style.background = 'var(--glass-bg-medium)';
      }
    });
  }

  saveNote() {
    if (this.currentNote === null) return;

    const editor = document.querySelector('#note-editor');
    const content = editor.innerHTML;
    
    this.notes[this.currentNote].content = content;
    this.notes[this.currentNote].lastModified = new Date().toLocaleDateString();
    
    // Update title from first line
    const firstLine = editor.textContent.split('\n')[0].trim();
    if (firstLine) {
      this.notes[this.currentNote].title = firstLine.substring(0, 30) + (firstLine.length > 30 ? '...' : '');
    }

    this.saveNotes();
    this.updateNotesList();
  }

  autoSave() {
    // Debounced auto-save
    clearTimeout(this.autoSaveTimeout);
    this.autoSaveTimeout = setTimeout(() => {
      this.saveNote();
    }, 1000);
  }

  exportNote() {
    if (this.currentNote === null) return;

    const note = this.notes[this.currentNote];
    const content = note.content;
    
    // Create a blob with the note content
    const blob = new Blob([content], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    
    // Create download link
    const a = document.createElement('a');
    a.href = url;
    a.download = `${note.title || 'note'}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }

  formatText(command) {
    document.execCommand(command, false, null);
    document.querySelector('#note-editor').focus();
  }

  setupEditor() {
    const editor = document.querySelector('#note-editor');
    if (!editor) return;

    // Load first note if available
    if (this.notes.length > 0) {
      this.loadNote(0);
    }
  }

  updateNotesList() {
    const notesList = document.querySelector('#notes-list');
    if (notesList) {
      notesList.innerHTML = this.renderNotesList();
    }
  }

  loadNotes() {
    const saved = localStorage.getItem('stickyNotes');
    return saved ? JSON.parse(saved) : [];
  }

  saveNotes() {
    localStorage.setItem('stickyNotes', JSON.stringify(this.notes));
  }
}

// Initialize sticky notes app
let stickyNotesApp;
document.addEventListener('DOMContentLoaded', () => {
  stickyNotesApp = new StickyNotesApp();
});

// Make it globally accessible
window.stickyNotesApp = stickyNotesApp; 