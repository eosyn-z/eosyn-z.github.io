// Minimal To-Do List implementation
(function() {
  const container = document.getElementById('todo-container');
  if (!container) return;
  container.innerHTML = `
    <form id="todo-form" style="display:flex;gap:0.5rem;">
      <input id="todo-input" class="glass-input" style="flex:1;" placeholder="Add a task..." />
      <button class="glass-button" type="submit">Add</button>
    </form>
    <ul id="todo-list" style="list-style:none;padding:0;margin-top:1rem;"></ul>
  `;
  const form = container.querySelector('#todo-form');
  const input = container.querySelector('#todo-input');
  const list = container.querySelector('#todo-list');
  let tasks = JSON.parse(localStorage.getItem('todo-tasks') || '[]');
  function render() {
    list.innerHTML = '';
    tasks.forEach((task, i) => {
      const li = document.createElement('li');
      li.style.display = 'flex';
      li.style.alignItems = 'center';
      li.style.background = 'var(--glass-bg-light)';
      li.style.border = '1px solid var(--glass-border-light)';
      li.style.borderRadius = '8px';
      li.style.marginBottom = '0.5rem';
      li.style.padding = '0.5rem 1rem';
      li.style.color = 'var(--theme-text)';
      li.innerHTML = `<span style="flex:1;${task.done ? 'text-decoration:line-through;opacity:0.6;' : ''}">${task.text}</span><button class="glass-button" data-done="${i}">${task.done ? 'Undo' : 'Done'}</button><button class="glass-button" data-del="${i}" style="margin-left:0.5rem;">Delete</button>`;
      li.querySelector('[data-done]').onclick = () => { tasks[i].done = !tasks[i].done; save(); };
      li.querySelector('[data-del]').onclick = () => { tasks.splice(i,1); save(); };
      list.appendChild(li);
    });
  }
  function save() {
    localStorage.setItem('todo-tasks', JSON.stringify(tasks));
    render();
  }
  form.onsubmit = e => {
    e.preventDefault();
    if (input.value.trim()) {
      tasks.push({text:input.value.trim(),done:false});
      input.value = '';
      save();
    }
  };
  render();
})(); 