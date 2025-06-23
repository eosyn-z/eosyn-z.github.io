// Sticky Notes with Rich Text Editor
class StickyNotes {
    constructor() {
        this.notes = [];
        this.nextId = 1;
        this.loadNotes();
        this.init();
    }

    init() {
        // Add rich text editor styles
        this.addRichTextStyles();
        
        // Create sticky notes app in desktop
        this.createStickyNotesApp();
        
        // Load existing notes
        this.renderNotes();
        
        // Add global event listeners
        this.addGlobalListeners();
    }

    addRichTextStyles() {
        const style = document.createElement('style');
        style.textContent = `
            .sticky-note {
                position: absolute;
                min-width: 200px;
                min-height: 150px;
                background: var(--postit-bg-color, #fef3c7);
                border: 1px solid var(--postit-border-color, #f59e0b);
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                padding: 8px;
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                font-size: 14px;
                resize: both;
                overflow: hidden;
                z-index: 1000;
                transition: all 0.2s ease;
            }

            .sticky-note:hover {
                box-shadow: 0 8px 15px rgba(0, 0, 0, 0.15);
                transform: translateY(-2px);
            }

            .sticky-note-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 8px;
                padding-bottom: 4px;
                border-bottom: 1px solid rgba(0, 0, 0, 0.1);
                cursor: move;
            }

            .sticky-note-title {
                font-weight: bold;
                font-size: 12px;
                color: var(--postit-text-color, #92400e);
                flex: 1;
            }

            .sticky-note-controls {
                display: flex;
                gap: 4px;
            }

            .sticky-note-btn {
                background: none;
                border: none;
                cursor: pointer;
                padding: 2px;
                border-radius: 3px;
                font-size: 12px;
                color: var(--postit-text-color, #92400e);
                transition: all 0.2s ease;
            }

            .sticky-note-btn:hover {
                background: rgba(0, 0, 0, 0.1);
            }

            .sticky-note-content {
                flex: 1;
                outline: none;
                border: none;
                background: transparent;
                font-family: inherit;
                font-size: inherit;
                line-height: 1.4;
                resize: none;
                width: 100%;
                min-height: 100px;
            }

            .sticky-note-content:focus {
                outline: none;
            }

            /* Rich Text Editor Styles */
            .rich-text-toolbar {
                display: flex;
                gap: 4px;
                margin-bottom: 8px;
                padding: 4px;
                background: rgba(255, 255, 255, 0.8);
                border-radius: 4px;
                flex-wrap: wrap;
            }

            .rich-text-btn {
                background: none;
                border: 1px solid var(--border-accent, #d1d5db);
                border-radius: 4px;
                padding: 8px 12px;
                color: var(--theme-text, #374151);
                background: var(--bg-accent, #f3f4f6);
                border-color: var(--theme-text-secondary, #9ca3af);
                transition: all 0.2s ease;
            }

            .rich-text-btn:hover {
                background: var(--theme-primary, #6366f1);
                color: var(--text-white, #ffffff);
                border-color: var(--theme-primary, #6366f1);
            }

            .rich-text-btn.active {
                background: linear-gradient(135deg, var(--theme-primary-light, #e0e7ff), var(--theme-primary-lighter, #c7d2fe));
                border-color: var(--theme-primary, #6366f1);
            }

            .rich-text-btn.theme-c {
                background: linear-gradient(135deg, var(--theme-primary-light, #e0e7ff), var(--theme-primary-lighter, #c7d2fe));
                border-color: var(--theme-primary, #6366f1);
            }

            .rich-text-btn.theme-a {
                background: linear-gradient(135deg, var(--postit-bg-color, #fef3c7), var(--postit-border-color, #fde68a));
                border-color: var(--postit-border-color, #f59e0b);
            }

            .rich-text-btn.theme-r {
                background: linear-gradient(135deg, var(--warning-color, #fee2e2), var(--error-color, #fecaca));
                border-color: var(--error-color, #ef4444);
            }

            .rich-text-btn.theme-z {
                background: linear-gradient(135deg, var(--bg-accent, #f3f4f6), var(--border-primary, #e5e7eb));
                border-color: var(--theme-text-secondary, #6b7280);
            }

            .rich-text-btn.theme-e {
                background: linear-gradient(135deg, var(--theme-secondary-light, #f3e8ff), var(--theme-secondary-lighter, #e9d5ff));
                border-color: var(--theme-secondary, #7c3aed);
            }

            .rich-text-btn.theme-n {
                background: linear-gradient(135deg, var(--theme-accent-light, #e0f2fe), var(--theme-accent-lighter, #bae6fd));
                border-color: var(--theme-accent, #0ea5e9);
            }

            .color-picker {
                width: 20px;
                height: 20px;
                border: none;
                border-radius: 3px;
                cursor: pointer;
                padding: 0;
            }

            .checkbox-item {
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 4px 0;
                cursor: pointer;
            }

            .checkbox-item input[type="checkbox"] {
                margin: 0;
                cursor: pointer;
            }

            .checkbox-item.completed {
                text-decoration: line-through;
                opacity: 0.7;
            }

            .checkbox-item.completed input[type="checkbox"] {
                opacity: 0.7;
            }

            /* Theme-specific colors */
            [data-theme="c"] .sticky-note {
                background: linear-gradient(135deg, var(--theme-primary-light, #e0e7ff), var(--theme-primary-lighter, #c7d2fe));
                border-color: var(--theme-primary, #6366f1);
            }

            [data-theme="a"] .sticky-note {
                background: linear-gradient(135deg, var(--postit-bg-color, #fef3c7), var(--postit-border-color, #fde68a));
                border-color: var(--postit-border-color, #f59e0b);
            }

            [data-theme="r"] .sticky-note {
                background: linear-gradient(135deg, var(--warning-color, #fee2e2), var(--error-color, #fecaca));
                border-color: var(--error-color, #ef4444);
            }

            [data-theme="z"] .sticky-note {
                background: linear-gradient(135deg, var(--bg-accent, #f3f4f6), var(--border-primary, #e5e7eb));
                border-color: var(--theme-text-secondary, #6b7280);
            }

            [data-theme="e"] .sticky-note {
                background: linear-gradient(135deg, var(--theme-secondary-light, #f3e8ff), var(--theme-secondary-lighter, #e9d5ff));
                border-color: var(--theme-secondary, #7c3aed);
            }

            [data-theme="n"] .sticky-note {
                background: linear-gradient(135deg, var(--theme-accent-light, #e0f2fe), var(--theme-accent-lighter, #bae6fd));
                border-color: var(--theme-accent, #0ea5e9);
            }
        `;
        document.head.appendChild(style);
    }

    createStickyNotesApp() {
        const desktop = document.querySelector('.desktop');
        if (!desktop) return;

        const appContainer = document.createElement('div');
        appContainer.className = 'desktop-app sticky-notes-app';
        appContainer.style.display = 'none';
        appContainer.innerHTML = `
            <div class="app-header">
                <h3>Sticky Notes</h3>
                <div class="app-controls">
                    <button class="new-note-btn">New Note</button>
                    <button class="new-task-btn">New Task List</button>
                    <button class="close-app-btn">×</button>
                </div>
            </div>
            <div class="app-content">
                <div class="notes-container"></div>
            </div>
        `;

        desktop.appendChild(appContainer);

        // Event listeners
        appContainer.querySelector('.new-note-btn').addEventListener('click', () => {
            this.createNote();
        });

        appContainer.querySelector('.new-task-btn').addEventListener('click', () => {
            this.createTaskList();
        });

        appContainer.querySelector('.close-app-btn').addEventListener('click', () => {
            appContainer.style.display = 'none';
        });
    }

    createNote(content = '', position = null) {
        const note = {
            id: this.nextId++,
            type: 'note',
            content: content,
            position: position || this.getRandomPosition(),
            size: { width: 250, height: 200 },
            backgroundColor: this.getCurrentThemeColor(),
            textColor: 'var(--theme-text, #000000)',
            highlightColor: 'var(--theme-accent, #ffff00)',
            created: Date.now()
        };

        this.notes.push(note);
        this.saveNotes();
        this.renderNote(note);
        return note;
    }

    createTaskList(tasks = [], position = null) {
        const taskList = {
            id: this.nextId++,
            type: 'tasklist',
            tasks: tasks.length > 0 ? tasks : [{ text: 'New task', completed: false }],
            position: position || this.getRandomPosition(),
            size: { width: 250, height: 200 },
            backgroundColor: this.getCurrentThemeColor(),
            textColor: 'var(--theme-text, #000000)',
            highlightColor: 'var(--theme-accent, #ffff00)',
            created: Date.now()
        };

        this.notes.push(taskList);
        this.saveNotes();
        this.renderNote(taskList);
        return taskList;
    }

    getCurrentThemeColor() {
        const theme = document.body.getAttribute('data-theme') || 'c';
        const themeColors = {
            'c': 'var(--theme-primary-light, #e0e7ff)',
            'a': 'var(--postit-bg-color, #fef3c7)',
            'r': 'var(--warning-color, #fee2e2)',
            'z': 'var(--bg-accent, #f3f4f6)',
            'e': 'var(--theme-secondary-light, #f3e8ff)',
            'n': 'var(--theme-accent-light, #e0f2fe)'
        };
        return themeColors[theme] || 'var(--theme-primary-light, #e0e7ff)';
    }

    getRandomPosition() {
        const desktop = document.querySelector('.desktop');
        if (!desktop) return { x: 50, y: 50 };

        const rect = desktop.getBoundingClientRect();
        const maxX = rect.width - 300;
        const maxY = rect.height - 250;

        return {
            x: Math.max(50, Math.min(maxX, Math.random() * maxX)),
            y: Math.max(50, Math.min(maxY, Math.random() * maxY))
        };
    }

    renderNote(note) {
        const desktop = document.querySelector('.desktop');
        if (!desktop) return;

        const noteElement = document.createElement('div');
        noteElement.className = 'sticky-note';
        noteElement.id = `sticky-note-${note.id}`;
        noteElement.style.cssText = `
            left: ${note.position.x}px;
            top: ${note.position.y}px;
            width: ${note.size.width}px;
            height: ${note.size.height}px;
            background: ${note.backgroundColor};
            color: ${note.textColor};
        `;

        if (note.type === 'note') {
            noteElement.innerHTML = `
                <div class="sticky-note-header">
                    <div class="sticky-note-title">Note ${note.id}</div>
                    <div class="sticky-note-controls">
                        <button class="sticky-note-btn format-btn" title="Format">🎨</button>
                        <button class="sticky-note-btn delete-btn" title="Delete">🗑️</button>
                    </div>
                </div>
                <div class="rich-text-toolbar" style="display: none;">
                    <button class="rich-text-btn" data-command="bold" title="Bold">B</button>
                    <button class="rich-text-btn" data-command="italic" title="Italic">I</button>
                    <button class="rich-text-btn" data-command="underline" title="Underline">U</button>
                    <button class="rich-text-btn" data-command="strikeThrough" title="Strikethrough">S</button>
                    <input type="color" class="color-picker" data-command="foreColor" title="Text Color">
                    <input type="color" class="color-picker" data-command="hiliteColor" title="Highlight Color">
                    <input type="color" class="color-picker" data-command="backgroundColor" title="Background Color">
                    <button class="rich-text-btn" data-command="insertUnorderedList" title="Bullet List">•</button>
                    <button class="rich-text-btn" data-command="insertOrderedList" title="Numbered List">1.</button>
                </div>
                <div class="sticky-note-content" contenteditable="true" data-note-id="${note.id}">${note.content}</div>
            `;
        } else {
            noteElement.innerHTML = `
                <div class="sticky-note-header">
                    <div class="sticky-note-title">Task List ${note.id}</div>
                    <div class="sticky-note-controls">
                        <button class="sticky-note-btn add-task-btn" title="Add Task">+</button>
                        <button class="sticky-note-btn delete-btn" title="Delete">🗑️</button>
                    </div>
                </div>
                <div class="task-list" data-note-id="${note.id}">
                    ${note.tasks.map((task, index) => `
                        <div class="checkbox-item ${task.completed ? 'completed' : ''}" data-task-index="${index}">
                            <input type="checkbox" ${task.completed ? 'checked' : ''}>
                            <span class="task-text" contenteditable="true">${task.text}</span>
                        </div>
                    `).join('')}
                </div>
            `;
        }

        desktop.appendChild(noteElement);
        this.setupNoteEventListeners(noteElement, note);
    }

    setupNoteEventListeners(noteElement, note) {
        // Make draggable
        this.makeDraggable(noteElement, note);

        // Make resizable
        this.makeResizable(noteElement, note);

        // Format button
        const formatBtn = noteElement.querySelector('.format-btn');
        const toolbar = noteElement.querySelector('.rich-text-toolbar');
        if (formatBtn && toolbar) {
            formatBtn.addEventListener('click', () => {
                toolbar.style.display = toolbar.style.display === 'none' ? 'flex' : 'none';
            });
        }

        // Rich text editor buttons
        const richTextBtns = noteElement.querySelectorAll('.rich-text-btn');
        richTextBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const command = btn.dataset.command;
                const content = noteElement.querySelector('.sticky-note-content');
                
                if (content) {
                    document.execCommand(command, false, null);
                    content.focus();
                }
            });
        });

        // Color pickers
        const colorPickers = noteElement.querySelectorAll('.color-picker');
        colorPickers.forEach(picker => {
            picker.addEventListener('change', (e) => {
                const command = picker.dataset.command;
                const color = picker.value;
                const content = noteElement.querySelector('.sticky-note-content');
                
                if (content) {
                    if (command === 'backgroundColor') {
                        noteElement.style.background = color;
                        note.backgroundColor = color;
                    } else {
                        document.execCommand(command, false, color);
                    }
                    content.focus();
                    this.saveNotes();
                }
            });
        });

        // Content saving
        const content = noteElement.querySelector('.sticky-note-content');
        if (content) {
            content.addEventListener('input', () => {
                note.content = content.innerHTML;
                this.saveNotes();
            });
        }

        // Task list functionality
        if (note.type === 'tasklist') {
            this.setupTaskListListeners(noteElement, note);
        }

        // Delete button
        const deleteBtn = noteElement.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', () => {
                this.deleteNote(note.id);
            });
        }

        // Add task button
        const addTaskBtn = noteElement.querySelector('.add-task-btn');
        if (addTaskBtn) {
            addTaskBtn.addEventListener('click', () => {
                this.addTask(note.id);
            });
        }
    }

    setupTaskListListeners(noteElement, note) {
        const taskList = noteElement.querySelector('.task-list');
        
        // Checkbox functionality
        taskList.addEventListener('change', (e) => {
            if (e.target.type === 'checkbox') {
                const taskItem = e.target.closest('.checkbox-item');
                const taskIndex = parseInt(taskItem.dataset.taskIndex);
                
                note.tasks[taskIndex].completed = e.target.checked;
                taskItem.classList.toggle('completed', e.target.checked);
                this.saveNotes();
            }
        });

        // Task text editing
        taskList.addEventListener('input', (e) => {
            if (e.target.classList.contains('task-text')) {
                const taskItem = e.target.closest('.checkbox-item');
                const taskIndex = parseInt(taskItem.dataset.taskIndex);
                note.tasks[taskIndex].text = e.target.textContent;
                this.saveNotes();
            }
        });

        // Add new task on Enter
        taskList.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && e.target.classList.contains('task-text')) {
                e.preventDefault();
                this.addTask(note.id);
            }
        });
    }

    addTask(noteId) {
        const note = this.notes.find(n => n.id === noteId);
        if (!note || note.type !== 'tasklist') return;

        note.tasks.push({ text: 'New task', completed: false });
        this.saveNotes();
        this.renderNotes(); // Re-render to update the task list
    }

    makeDraggable(element, note) {
        let isDragging = false;
        let startX, startY, startLeft, startTop;

        const header = element.querySelector('.sticky-note-header');
        if (!header) return;

        header.addEventListener('mousedown', (e) => {
            if (e.target.closest('.sticky-note-controls')) return;
            
            isDragging = true;
            startX = e.clientX;
            startY = e.clientY;
            startLeft = parseInt(element.style.left);
            startTop = parseInt(element.style.top);
            
            element.style.cursor = 'grabbing';
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            element.style.left = (startLeft + deltaX) + 'px';
            element.style.top = (startTop + deltaY) + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isDragging) {
                isDragging = false;
                element.style.cursor = 'grab';
                
                // Save position
                note.position = {
                    x: parseInt(element.style.left),
                    y: parseInt(element.style.top)
                };
                this.saveNotes();
            }
        });
    }

    makeResizable(element, note) {
        let isResizing = false;
        let startX, startY, startWidth, startHeight;

        const handle = document.createElement('div');
        handle.style.cssText = `
            position: absolute;
            bottom: 0;
            right: 0;
            width: 15px;
            height: 15px;
            cursor: se-resize;
            background: linear-gradient(-45deg, transparent 30%, rgba(0,0,0,0.3) 30%, rgba(0,0,0,0.3) 70%, transparent 70%);
        `;
        element.appendChild(handle);

        handle.addEventListener('mousedown', (e) => {
            isResizing = true;
            startX = e.clientX;
            startY = e.clientY;
            startWidth = element.offsetWidth;
            startHeight = element.offsetHeight;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isResizing) return;

            const deltaX = e.clientX - startX;
            const deltaY = e.clientY - startY;

            const newWidth = Math.max(200, startWidth + deltaX);
            const newHeight = Math.max(150, startHeight + deltaY);

            element.style.width = newWidth + 'px';
            element.style.height = newHeight + 'px';
        });

        document.addEventListener('mouseup', () => {
            if (isResizing) {
                isResizing = false;
                
                // Save size
                note.size = {
                    width: element.offsetWidth,
                    height: element.offsetHeight
                };
                this.saveNotes();
            }
        });
    }

    deleteNote(id) {
        this.notes = this.notes.filter(note => note.id !== id);
        this.saveNotes();
        
        const element = document.getElementById(`sticky-note-${id}`);
        if (element) {
            element.remove();
        }
    }

    renderNotes() {
        // Clear existing notes
        const existingNotes = document.querySelectorAll('.sticky-note');
        existingNotes.forEach(note => note.remove());

        // Render all notes
        this.notes.forEach(note => {
            this.renderNote(note);
        });
    }

    loadNotes() {
        const saved = localStorage.getItem('stickyNotes');
        if (saved) {
            this.notes = JSON.parse(saved);
            this.nextId = Math.max(...this.notes.map(n => n.id), 0) + 1;
        }
    }

    saveNotes() {
        localStorage.setItem('stickyNotes', JSON.stringify(this.notes));
    }

    addGlobalListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey && e.key === 'n') {
                e.preventDefault();
                this.createNote();
            }
        });
    }
}

// Initialize sticky notes
document.addEventListener('DOMContentLoaded', () => {
    window.stickyNotes = new StickyNotes();
}); 