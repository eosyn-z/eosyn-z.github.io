// Unified floating panel for Favorites and Notes
function toggleUnifiedPanel(activeTab = 'favorites') {
    let panel = document.getElementById('unified-panel');

    // If panel exists and is open with the same tab, close it
    if (panel && panel.classList.contains('open') && panel.dataset.activeTab === activeTab) {
        panel.classList.remove('open');
        setTimeout(() => panel.remove(), 300);
        return;
    }

    // If panel exists but different tab, just switch tabs
    if (panel && panel.dataset.activeTab !== activeTab) {
        panel.dataset.activeTab = activeTab;
        switchPanelTab(activeTab);
        return;
    }

    // Create new panel
    if (!panel) {
        // Add styles if not already added
        if (!document.getElementById('unified-panel-styles')) {
            const styles = document.createElement('style');
            styles.id = 'unified-panel-styles';
            styles.textContent = `
                .unified-panel {
                    position: fixed;
                    top: 50%;
                    right: -400px;
                    transform: translateY(-50%);
                    width: 380px;
                    height: 70vh;
                    max-height: 600px;
                    background: var(--bg-secondary);
                    border: 1px solid var(--border-color);
                    border-radius: 8px 0 0 8px;
                    box-shadow: -4px 0 20px rgba(0, 0, 0, 0.3);
                    z-index: 10000;
                    display: flex;
                    flex-direction: column;
                    transition: right 0.3s ease;
                }

                .unified-panel.open {
                    right: 0;
                }

                .panel-header {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    padding: 0.75rem 1rem;
                    background: var(--bg-tertiary);
                    border-bottom: 1px solid var(--border-color);
                    border-radius: 8px 0 0 0;
                }

                .panel-tabs {
                    display: flex;
                    gap: 0.5rem;
                }

                .panel-tab {
                    padding: 0.5rem 1rem;
                    background: transparent;
                    border: 1px solid transparent;
                    border-radius: 4px;
                    color: var(--text-secondary);
                    cursor: pointer;
                    transition: all 0.2s;
                    font-size: 0.9rem;
                }

                .panel-tab:hover {
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                }

                .panel-tab.active {
                    background: var(--accent-primary);
                    color: white;
                    border-color: var(--accent-primary);
                }

                .panel-close {
                    width: 30px;
                    height: 30px;
                    border-radius: 4px;
                    border: none;
                    background: transparent;
                    color: var(--text-secondary);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 1.2rem;
                }

                .panel-close:hover {
                    background: var(--bg-secondary);
                    color: var(--text-primary);
                }

                .panel-content {
                    flex: 1;
                    overflow-y: auto;
                    padding: 1rem;
                }

                .panel-empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    height: 100%;
                    text-align: center;
                    color: var(--text-secondary);
                }

                .panel-empty p {
                    margin: 0.5rem 0;
                }

                .panel-hint {
                    font-size: 0.85rem;
                    opacity: 0.7;
                }

                .panel-category {
                    margin-bottom: 1rem;
                }

                .panel-category-header {
                    width: 100%;
                    padding: 0.75rem;
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                    color: var(--text-primary);
                }

                .panel-category-header:hover {
                    background: var(--bg-primary);
                }

                .category-icon {
                    transition: transform 0.2s;
                }

                .panel-category.collapsed .category-icon {
                    transform: rotate(-90deg);
                }

                .category-name {
                    flex: 1;
                }

                .category-count {
                    background: var(--accent-primary);
                    color: white;
                    padding: 0.125rem 0.5rem;
                    border-radius: 12px;
                    font-size: 0.75rem;
                }

                .panel-category-items {
                    margin-top: 0.5rem;
                    display: flex;
                    flex-direction: column;
                    gap: 0.25rem;
                }

                .panel-category.collapsed .panel-category-items {
                    display: none;
                }

                .panel-item {
                    padding: 0.75rem;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .panel-item:hover {
                    background: var(--bg-tertiary);
                    border-color: var(--accent-primary);
                }

                .panel-item-title {
                    color: var(--text-primary);
                    font-weight: 500;
                    margin-bottom: 0.25rem;
                }

                .panel-item-date {
                    color: var(--text-secondary);
                    font-size: 0.75rem;
                }

                /* Notes specific styles */
                .notes-editor {
                    width: 100%;
                    min-height: 200px;
                    padding: 0.75rem;
                    background: var(--bg-primary);
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    color: var(--text-primary);
                    font-family: inherit;
                    resize: vertical;
                }

                .notes-toolbar {
                    display: flex;
                    gap: 0.5rem;
                    margin-top: 1rem;
                }

                .notes-toolbar button {
                    padding: 0.5rem 1rem;
                    background: var(--bg-tertiary);
                    border: 1px solid var(--border-color);
                    border-radius: 4px;
                    color: var(--text-primary);
                    cursor: pointer;
                    font-size: 0.85rem;
                }

                .notes-toolbar button:hover {
                    background: var(--accent-primary);
                    color: white;
                }
            `;
            document.head.appendChild(styles);
        }

        panel = document.createElement('div');
        panel.id = 'unified-panel';
        panel.className = 'unified-panel';
        panel.dataset.activeTab = activeTab;

        // Create panel structure
        panel.innerHTML = `
            <div class="panel-header">
                <div class="panel-tabs">
                    <button class="panel-tab ${activeTab === 'favorites' ? 'active' : ''}" onclick="switchPanelTab('favorites')">
                         Favorites
                    </button>
                    <button class="panel-tab ${activeTab === 'notes' ? 'active' : ''}" onclick="switchPanelTab('notes')">
                         Notes
                    </button>
                </div>
                <button class="panel-close" onclick="toggleUnifiedPanel()">✕</button>
            </div>
            <div class="panel-content" id="panel-content">
                <!-- Content will be loaded here -->
            </div>
        `;

        document.body.appendChild(panel);
        updatePanelContent(activeTab);
        setTimeout(() => panel.classList.add('open'), 10);
    }
}

function switchPanelTab(tab) {
    const panel = document.getElementById('unified-panel');
    if (!panel) return;

    // Update active tab
    panel.dataset.activeTab = tab;

    // Update tab buttons
    panel.querySelectorAll('.panel-tab').forEach(btn => {
        btn.classList.remove('active');
    });

    const activeBtn = panel.querySelector(`.panel-tab:nth-child(${tab === 'favorites' ? 1 : 2})`);
    if (activeBtn) activeBtn.classList.add('active');

    // Update content
    updatePanelContent(tab);
}

function updatePanelContent(tab) {
    const contentArea = document.getElementById('panel-content');
    if (!contentArea) return;

    if (tab === 'favorites') {
        loadFavoritesContent(contentArea);
    } else if (tab === 'notes') {
        loadNotesContent(contentArea);
    }
}

function loadFavoritesContent(container) {
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const grouped = {};

    // Group favorites by section
    favorites.forEach(key => {
        const [section, slug] = key.split('/');
        if (!grouped[section]) grouped[section] = [];
        const sectionData = window.contentData ? window.contentData[section] : null;
        if (sectionData) {
            const page = sectionData.pages.find(p => p.slug === slug);
            if (page) {
                grouped[section].push({ section, slug, page });
            }
        }
    });

    let html = '';

    if (favorites.length === 0) {
        html = `
            <div class="panel-empty">
                <p style="font-size: 1.2rem;">No favorites yet!</p>
                <p class="panel-hint">Click  on any article to save it here</p>
            </div>
        `;
    } else {
        for (const [section, items] of Object.entries(grouped)) {
            const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
            html += `
                <div class="panel-category">
                    <button class="panel-category-header" onclick="this.parentElement.classList.toggle('collapsed')">
                        <span class="category-icon">▼</span>
                        <span class="category-name">${sectionName}</span>
                        <span class="category-count">${items.length}</span>
                    </button>
                    <div class="panel-category-items">
            `;

            items.forEach(({ section, slug, page }) => {
                html += `
                    <div class="panel-item" onclick="showPage('${section}', '${slug}'); toggleUnifiedPanel();">
                        <div class="panel-item-title">${page.title}</div>
                        <div class="panel-item-date">${page.date ? formatDate(page.date) : ''}</div>
                    </div>
                `;
            });

            html += `
                    </div>
                </div>
            `;
        }
    }

    container.innerHTML = html;
}

function loadNotesContent(container) {
    const currentNote = localStorage.getItem('current_note') || '';
    const notes = JSON.parse(localStorage.getItem('notebook_notes') || '{}');

    let html = `
        <div class="notes-section">
            <h3>Quick Note</h3>
            <textarea class="notes-editor" id="quick-note-editor" placeholder="Write your notes here...">${currentNote}</textarea>
            <div class="notes-toolbar">
                <button onclick="saveQuickNote()"> Save</button>
                <button onclick="clearQuickNote()">🗑️ Clear</button>
            </div>
        </div>
    `;

    // Add saved notes if any
    const notesArray = Object.entries(notes);
    if (notesArray.length > 0) {
        html += `
            <div class="notes-section" style="margin-top: 2rem;">
                <h3>Saved Notes</h3>
        `;

        notesArray.forEach(([key, note]) => {
            const title = note.title || key.split('/').pop();
            html += `
                <div class="panel-item" onclick="loadSavedNote('${key}')">
                    <div class="panel-item-title">${title}</div>
                    <div class="panel-item-date">${note.date ? formatDate(note.date) : ''}</div>
                </div>
            `;
        });

        html += `</div>`;
    }

    container.innerHTML = html;
}

function saveQuickNote() {
    const editor = document.getElementById('quick-note-editor');
    if (editor) {
        const note = editor.value.trim();
        localStorage.setItem('current_note', note);
        showNotification('Note saved!');
    }
}

function clearQuickNote() {
    const editor = document.getElementById('quick-note-editor');
    if (editor && confirm('Clear this note?')) {
        editor.value = '';
        localStorage.setItem('current_note', '');
        showNotification('Note cleared!');
    }
}

function loadSavedNote(key) {
    const notes = JSON.parse(localStorage.getItem('notebook_notes') || '{}');
    const note = notes[key];
    if (note) {
        const editor = document.getElementById('quick-note-editor');
        if (editor) {
            editor.value = note.content || '';
            showNotification('Note loaded!');
        }
    }
}

function formatDate(dateStr) {
    if (!dateStr) return '';
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message) {
    // Create or use existing notification system
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 4px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
        z-index: 10001;
        animation: slideInUp 0.3s ease;
    `;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
        notification.style.animation = 'slideOutDown 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 2000);
}

// Export functions
window.toggleUnifiedPanel = toggleUnifiedPanel;
window.switchPanelTab = switchPanelTab;
window.saveQuickNote = saveQuickNote;
window.clearQuickNote = clearQuickNote;
window.loadSavedNote = loadSavedNote;