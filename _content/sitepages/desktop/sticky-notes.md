---
layout: default
title: Sticky Notes
permalink: /sticky-notes/
icon: 📝
---

<div class="main-content">
  <div class="page-header">
    <h1>📝 Sticky Notes Manager</h1>
    <p>Click any button below to create a sticky note with the glass theme. Notes are draggable, resizable, and editable! You can have up to 50 windows open at once.</p>
  </div>

  <div class="glass-panel">
    <h2>Create Sticky Notes</h2>
    <p>Each button below will spawn a sticky note with different content. The notes use the glass theme and have "E" as default content.</p>
    
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem; margin: 2rem 0;">
      
      <button class="glass-button" onclick="createStickyNote('Quick Note', 'E')">
        📝 Quick Note
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Todo List', '📋 Todo:\n• Task 1\n• Task 2\n• Task 3')">
        ✅ Todo List
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Ideas', '💡 Ideas:\n• Project idea 1\n• Project idea 2\n• Creative thought')">
        💡 Ideas
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Reminder', '⏰ Reminder:\nDon\'t forget to...')">
        ⏰ Reminder
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Code Snippet', '```javascript\nfunction hello() {\n  console.log("Hello World!");\n}```')">
        💻 Code Snippet
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Quote', '> "The best way to predict the future is to invent it."\n\n- Alan Kay')">
        💬 Quote
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Contact Info', '📞 Contact:\nName: [Your Name]\nEmail: [your.email@example.com]\nPhone: [Your Phone]')">
        📞 Contact Info
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Shopping List', '🛒 Shopping:\n• Milk\n• Bread\n• Eggs\n• Cheese')">
        🛒 Shopping List
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Meeting Notes', '📅 Meeting Notes:\n\nAgenda:\n- Topic 1\n- Topic 2\n\nAction Items:\n- [ ] Action 1\n- [ ] Action 2')">
        📅 Meeting Notes
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Password', '🔐 Password:\nWebsite: [website.com]\nUsername: [username]\nPassword: [password]')">
        🔐 Password
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Bookmark', '🔖 Bookmark:\nTitle: [Article Title]\nURL: [https://example.com]\nNotes: [Your notes here]')">
        🔖 Bookmark
      </button>
      
      <button class="glass-button" onclick="createStickyNote('Empty Note', '')">
        📄 Empty Note
      </button>
      
      <button class="glass-button" onclick="launchRichTextNotes()" style="background: var(--theme-accent); color: white;">
        ✨ Rich Text Editor
      </button>
    </div>
  </div>

  <!-- Sticky Notes Container -->
  <div class="sticky-notes-container" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1000;">
    <!-- Notes will be spawned here with pointer-events: auto -->
  </div>

  <div class="glass-panel">
    <h2>Enhanced Window Management</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 1.5rem;">
      
      <div class="glass-card">
        <h3>🎯 Multiple Instances</h3>
        <p>Create multiple instances of any app or game. Each window has unique positioning and state.</p>
      </div>
      
      <div class="glass-card">
        <h3>📏 Smart Sizing</h3>
        <p>Each app type has minimum window sizes to ensure all content is viewable and usable.</p>
      </div>
      
      <div class="glass-card">
        <h3>✏️ Rich Text Editor</h3>
        <p>Sticky notes use a full rich text editor with support for formatting, links, and code blocks.</p>
      </div>
      
      <div class="glass-card">
        <h3>📌 Taskbar Integration</h3>
        <p>All open windows appear in the taskbar with icons and titles. Click to focus or restore.</p>
      </div>
      
      <div class="glass-card">
        <h3>💾 Auto-Save</h3>
        <p>All window positions, content, and states are automatically saved and restored on reload.</p>
      </div>
      
      <div class="glass-card">
        <h3>🎨 Glass Theme</h3>
        <p>All windows follow the glass aesthetic with proper blur effects and transparency.</p>
      </div>
    </div>
  </div>

  <div class="glass-panel">
    <h2>Window Controls</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem;">
      <div><strong>⭐ Favorite:</strong> Pin important windows</div>
      <div><strong>－ Minimize:</strong> Hide window (restore from taskbar)</div>
      <div><strong>✕ Close:</strong> Close window completely</div>
      <div><strong>Drag Header:</strong> Move window around</div>
      <div><strong>Drag Corner:</strong> Resize window</div>
      <div><strong>Click Taskbar:</strong> Focus/restore window</div>
    </div>
  </div>

  <div class="glass-panel">
    <h2>Advanced Usage</h2>
    <p>You can also create windows programmatically using JavaScript:</p>
    
    <div class="glass-card">
      <h3>JavaScript Examples</h3>
      <pre><code>// Create a sticky note
windowManager.createStickyNote('My Note', 'Hello World!');

// Create a game window
windowManager.createGameWindow('snake', 'My Snake Game');

// Create any app window
windowManager.createWindow('portfolio', 'My Portfolio');

// Get all windows of a type
const stickyNotes = windowManager.getWindowsByType('sticky-notes');

// Close all windows of a type
windowManager.closeAllWindowsOfType('snake');</code></pre>
    </div>
  </div>

  <div class="glass-panel">
    <h2>Window Limits & Performance</h2>
    <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1rem;">
      <div class="glass-card">
        <h3>📊 Maximum Windows</h3>
        <p>Up to 50 unique windows can be open simultaneously. Each window has its own position and state.</p>
      </div>
      <div class="glass-card">
        <h3>⚡ Performance</h3>
        <p>Windows are efficiently managed with minimal memory usage. Only visible content is rendered.</p>
      </div>
      <div class="glass-card">
        <h3>💾 Storage</h3>
        <p>All window data is stored in localStorage for persistence across browser sessions.</p>
      </div>
    </div>
  </div>

</div>

<script>
// Function to launch rich text notes app
function launchRichTextNotes() {
  if (window.stickyNotesApp) {
    window.stickyNotesApp.createNoteWindow();
  } else {
    console.error('Rich text notes app not available');
    alert('Rich text notes app is not available. Please refresh the page and try again.');
  }
}

// Additional demo functions
document.addEventListener('DOMContentLoaded', () => {
  // Create a welcome note on page load
  setTimeout(() => {
    createStickyNote('Welcome! 👋', 'Welcome to the Enhanced Sticky Notes demo!\n\nTry clicking the buttons above to create different types of notes.\n\nYou can:\n• Drag notes around\n• Resize them\n• Edit the content\n• Pin important ones\n• Have up to 50 windows open\n• See all windows in the taskbar\n\nEnjoy! 🎉');
  }, 1000);
  
  // Add some interactive demo buttons
  const demoButtons = document.querySelectorAll('.glass-button');
  demoButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Add a subtle animation effect
      button.style.transform = 'scale(0.95)';
      setTimeout(() => {
        button.style.transform = '';
      }, 150);
    });
  });
  
  // Add window counter display
  const counter = document.createElement('div');
  counter.className = 'window-counter';
  counter.innerHTML = 'Windows: 0/50';
  document.body.appendChild(counter);
  
  // Update counter when windows change
  const updateCounter = () => {
    const count = Object.keys(windowManager.windows).length;
    counter.innerHTML = `Windows: ${count}/50`;
    
    if (count >= 45) {
      counter.classList.add('warning');
    } else if (count >= 50) {
      counter.classList.add('danger');
    } else {
      counter.classList.remove('warning', 'danger');
    }
  };
  
  // Monitor window changes
  const originalCreateWindow = windowManager.createWindow.bind(windowManager);
  windowManager.createWindow = function(...args) {
    const result = originalCreateWindow(...args);
    updateCounter();
    return result;
  };
  
  const originalCloseWindow = windowManager.closeWindow.bind(windowManager);
  windowManager.closeWindow = function(windowId) {
    originalCloseWindow(windowId);
    updateCounter();
  };
  
  // Initial counter update
  updateCounter();
});
</script> 