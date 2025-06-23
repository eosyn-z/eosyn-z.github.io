// Diary Utility - Rich text, tags, color, save/delete, themed
(function() {
  const form = document.getElementById('diary-form');
  const titleInput = document.getElementById('diary-title');
  const tagsInput = document.getElementById('diary-tags');
  const colorInput = document.getElementById('diary-color');
  const entriesDiv = document.getElementById('diary-entries');
  let editingIndex = null;

  // Initialize SimpleMDE
  const mde = new window.SimpleMDE({
    element: document.getElementById('diary-content'),
    spellChecker: false,
    status: false,
    toolbar: ["bold", "italic", "heading", "|", "quote", "unordered-list", "ordered-list", "link", "preview", "guide"]
  });

  function getEntries() {
    return JSON.parse(localStorage.getItem('diary-entries') || '[]');
  }
  function saveEntries(entries) {
    localStorage.setItem('diary-entries', JSON.stringify(entries));
  }
  function renderEntries() {
    const entries = getEntries();
    entriesDiv.innerHTML = '';
    if (!entries.length) {
      entriesDiv.innerHTML = '<div style="color:var(--theme-text-secondary);text-align:center;">No diary entries yet.</div>';
      return;
    }
    entries.forEach((entry, i) => {
      const entryDiv = document.createElement('div');
      entryDiv.className = 'glass-card';
      entryDiv.style.marginBottom = '1.5rem';
      entryDiv.style.background = entry.color || 'var(--glass-bg-light)';
      entryDiv.innerHTML = `
        <div style="display:flex;align-items:center;justify-content:space-between;">
          <div style="font-size:1.2rem;font-weight:600;color:var(--theme-accent);">${entry.title}</div>
          <div style="font-size:0.9rem;color:var(--theme-text-secondary);">${entry.date}</div>
        </div>
        <div style="margin:0.5rem 0 0.5rem 0;">
          <span style="font-size:0.9rem;color:var(--theme-text-secondary);">${entry.tags.map(t=>`<span style='background:var(--glass-bg-medium);border-radius:6px;padding:2px 8px;margin-right:4px;'>#${t}</span>`).join('')}</span>
        </div>
        <div class="diary-content" style="margin:1rem 0;">${window.SimpleMDE.prototype.markdown(entry.content)}</div>
        <div style="display:flex;gap:0.5rem;">
          <button class="glass-button" data-edit="${i}">Edit</button>
          <button class="glass-button" data-del="${i}" style="background:var(--theme-error, #ef4444);color:white;">Delete</button>
        </div>
      `;
      entryDiv.querySelector('[data-edit]').onclick = () => editEntry(i);
      entryDiv.querySelector('[data-del]').onclick = () => deleteEntry(i);
      entriesDiv.appendChild(entryDiv);
    });
  }
  function resetForm() {
    form.reset();
    mde.value('');
    colorInput.value = '#fef3c7';
    editingIndex = null;
    form.querySelector('button[type="submit"]').textContent = 'Save Entry';
  }
  function editEntry(i) {
    const entries = getEntries();
    const entry = entries[i];
    titleInput.value = entry.title;
    tagsInput.value = entry.tags.join(', ');
    colorInput.value = entry.color || '#fef3c7';
    mde.value(entry.content);
    editingIndex = i;
    form.querySelector('button[type="submit"]').textContent = 'Update Entry';
    window.scrollTo({top:0,behavior:'smooth'});
  }
  function deleteEntry(i) {
    if (!confirm('Delete this entry?')) return;
    const entries = getEntries();
    entries.splice(i,1);
    saveEntries(entries);
    renderEntries();
    resetForm();
  }
  form.onsubmit = function(e) {
    e.preventDefault();
    const title = titleInput.value.trim();
    const tags = tagsInput.value.split(',').map(t=>t.trim()).filter(Boolean);
    const color = colorInput.value;
    const content = mde.value();
    const date = new Date().toLocaleString();
    if (!title || !content) return;
    let entries = getEntries();
    if (editingIndex !== null) {
      entries[editingIndex] = {title, tags, color, content, date};
    } else {
      entries.unshift({title, tags, color, content, date});
    }
    saveEntries(entries);
    renderEntries();
    resetForm();
  };
  renderEntries();
})(); 