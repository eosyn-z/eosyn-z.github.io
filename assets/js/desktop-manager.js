import { WallpaperPicker } from '../wallpaper/picker.js';

class DesktopManager {
  constructor() {
    this.desktop = document.body;
    this.icons = [];
    this.currentWallpaper = '';
    this.iconSize = 64;
    this.iconSpacing = 20;
    
    // Initialize wallpaper picker
    this.wallpaperPicker = new WallpaperPicker(this);
    
    this.loadDesktopState();
    this.initializeDesktop();
  }

  // Load saved desktop state from localStorage
  loadDesktopState() {
    try {
      const savedState = JSON.parse(localStorage.getItem('desktopState') || '{}');
      this.icons = savedState.icons || this.getDefaultIcons();
      this.currentWallpaper = savedState.wallpaper || '/assets/wallpapers/default/desktop-1.jpg';
    } catch (error) {
      console.error('Error loading desktop state:', error);
      this.icons = this.getDefaultIcons();
      this.currentWallpaper = '/assets/wallpapers/default/desktop-1.jpg';
    }
  }

  // Save desktop state to localStorage
  saveDesktopState() {
    const state = {
      icons: this.icons,
      wallpaper: this.currentWallpaper
    };
    localStorage.setItem('desktopState', JSON.stringify(state));
  }

  // Get default icons configuration
  getDefaultIcons() {
    return [
      {
        id: 'portfolio',
        title: 'Portfolio',
        icon: '🎨', // Using emoji instead of image file
        x: 50,
        y: 50,
        appId: 'portfolio',
        appTitle: 'Portfolio'
      },
      {
        id: 'music',
        title: 'Music',
        icon: '🎵', // Using emoji instead of image file
        x: 50,
        y: 150,
        appId: 'music',
        appTitle: 'Music Player'
      },
      {
        id: 'search',
        title: 'Search',
        icon: '🔍', // Using emoji instead of image file
        x: 50,
        y: 250,
        appId: 'search',
        appTitle: 'Search & Pin'
      },
      {
        id: 'chat',
        title: 'Chat',
        icon: '💬', // Using emoji instead of image file
        x: 50,
        y: 350,
        appId: 'chat',
        appTitle: 'AI Chat'
      },
      {
        id: 'sticky-notes',
        title: 'Sticky Notes',
        icon: '📝', // Using emoji instead of image file
        x: 50,
        y: 450,
        appId: 'sticky-notes',
        appTitle: 'Sticky Notes'
      },
      {
        id: 'games',
        title: 'Games',
        icon: '🎮', // Using emoji instead of image file
        x: 200,
        y: 50,
        appId: 'games',
        appTitle: 'Game Center'
      },
      {
        id: 'snake',
        title: 'Snake',
        icon: '🐍', // Using emoji instead of image file
        x: 200,
        y: 150,
        appId: 'snake',
        appTitle: 'Snake'
      },
      {
        id: 'tetris',
        title: 'Tetris',
        icon: '🧩', // Using emoji instead of image file
        x: 200,
        y: 250,
        appId: 'tetris',
        appTitle: 'Tetris'
      }
    ];
  }

  // Initialize desktop
  initializeDesktop() {
    this.setWallpaper(this.currentWallpaper);
    this.renderIcons();
    this.createDesktopSettings();
  }

  // Set wallpaper
  setWallpaper(wallpaperUrl) {
    this.currentWallpaper = wallpaperUrl;
    this.desktop.style.backgroundImage = `url('${wallpaperUrl}')`;
    this.desktop.style.backgroundSize = 'cover';
    this.desktop.style.backgroundPosition = 'center';
    this.desktop.style.backgroundRepeat = 'no-repeat';
    this.saveDesktopState();
  }

  // Render all desktop icons
  renderIcons() {
    // Clear existing icons
    const existingIcons = document.querySelectorAll('.desktop-icon');
    existingIcons.forEach(icon => icon.remove());

    // Create new icons
    this.icons.forEach(iconData => {
      this.createDesktopIcon(iconData);
    });
  }

  // Create a single desktop icon
  createDesktopIcon(iconData) {
    const icon = document.createElement('div');
    icon.className = 'desktop-icon';
    icon.dataset.iconId = iconData.id;
    
    // Check if icon is an emoji or image file
    const isEmoji = iconData.icon.length <= 2; // Emojis are typically 1-2 characters
    
    if (isEmoji) {
      // Use emoji as icon
      icon.innerHTML = `
        <div class="icon-emoji">${iconData.icon}</div>
        <span class="icon-label">${iconData.title}</span>
      `;
    } else {
      // Use image as icon
      icon.innerHTML = `
        <img src="${iconData.icon}" alt="${iconData.title}" class="icon-image" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
        <div class="icon-emoji" style="display: none;">📱</div>
        <span class="icon-label">${iconData.title}</span>
      `;
    }

    icon.style.left = `${iconData.x}px`;
    icon.style.top = `${iconData.y}px`;

    // Make icon draggable
    this.makeIconDraggable(icon, iconData);

    // Add click handler to launch app
    icon.addEventListener('click', (e) => {
      if (!icon.classList.contains('dragging')) {
        windowManager.createWindow(iconData.appId, iconData.appTitle);
      }
    });

    // Add right-click context menu
    icon.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showIconContextMenu(e, iconData);
    });

    this.desktop.appendChild(icon);
  }

  // Make icon draggable
  makeIconDraggable(icon, iconData) {
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    const onMouseDown = (e) => {
      if (e.button !== 0) return; // Only left click
      
      isDragging = true;
      icon.classList.add('dragging');
      
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(icon.style.left);
      startTop = parseInt(icon.style.top);
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };

    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      let newX = startLeft + deltaX;
      let newY = startTop + deltaY;
      
      // Constrain to viewport
      const maxX = window.innerWidth - this.iconSize;
      const maxY = window.innerHeight - this.iconSize - 100; // Account for taskbar
      
      newX = Math.max(0, Math.min(newX, maxX));
      newY = Math.max(0, Math.min(newY, maxY));
      
      icon.style.left = `${newX}px`;
      icon.style.top = `${newY}px`;
    };

    const onMouseUp = () => {
      if (isDragging) {
        isDragging = false;
        icon.classList.remove('dragging');
        
        // Update icon data with new position
        iconData.x = parseInt(icon.style.left);
        iconData.y = parseInt(icon.style.top);
        this.saveDesktopState();
      }
      
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    icon.addEventListener('mousedown', onMouseDown);
  }

  // Show icon context menu
  showIconContextMenu(e, iconData) {
    const menu = document.createElement('div');
    menu.className = 'context-menu glass-panel';
    menu.innerHTML = `
      <div class="menu-item" data-action="open">Open</div>
      <div class="menu-item" data-action="rename">Rename</div>
      <div class="menu-item" data-action="change-icon">Change Icon</div>
      <div class="menu-item" data-action="delete">Delete</div>
    `;

    menu.style.left = `${e.clientX}px`;
    menu.style.top = `${e.clientY}px`;
    document.body.appendChild(menu);

    // Handle menu actions
    menu.addEventListener('click', (e) => {
      const action = e.target.dataset.action;
      if (action) {
        this.handleIconAction(action, iconData);
      }
      menu.remove();
    });

    // Close menu when clicking outside
    document.addEventListener('click', () => menu.remove(), { once: true });
  }

  // Handle icon context menu actions
  handleIconAction(action, iconData) {
    switch (action) {
      case 'open':
        windowManager.createWindow(iconData.appId, iconData.appTitle);
        break;
      case 'rename':
        this.renameIcon(iconData);
        break;
      case 'change-icon':
        this.showIconPicker(iconData);
        break;
      case 'delete':
        this.deleteIcon(iconData);
        break;
    }
  }

  // Create desktop settings interface
  createDesktopSettings() {
    const settingsBtn = document.createElement('button');
    settingsBtn.className = 'desktop-settings-btn glass-button';
    settingsBtn.innerHTML = '⚙️ Desktop Settings';
    settingsBtn.style.position = 'fixed';
    settingsBtn.style.top = '20px';
    settingsBtn.style.right = '20px';
    settingsBtn.style.zIndex = '1000';
    
    settingsBtn.addEventListener('click', () => {
      this.showDesktopSettings();
    });
    
    this.desktop.appendChild(settingsBtn);
  }

  // Show desktop settings modal
  showDesktopSettings() {
    const modal = document.createElement('div');
    modal.className = 'glass-modal';
    modal.innerHTML = `
      <div class="modal-content" style="max-width: 800px;">
        <div class="modal-header">
          <h2>Desktop Settings</h2>
          <button class="close-btn" onclick="this.closest('.glass-modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <div class="settings-section">
            <h3>Wallpaper</h3>
            <div class="wallpaper-picker">
              <div class="current-wallpaper">
                <img src="${this.currentWallpaper}" alt="Current Wallpaper" style="width: 200px; height: 120px; object-fit: cover; border-radius: 8px;">
              </div>
              <div class="wallpaper-options">
                <button class="glass-button" onclick="desktopManager.showWallpaperPicker()">Change Wallpaper</button>
                <input type="url" id="wallpaperUrl" placeholder="Or enter URL..." class="glass-input">
                <button class="glass-button" onclick="desktopManager.setWallpaperFromUrl()">Set from URL</button>
              </div>
            </div>
          </div>
          <div class="settings-section">
            <h3>Desktop Icons</h3>
            <div class="icon-management">
              <button class="glass-button" onclick="desktopManager.addNewIcon()">Add New Icon</button>
              <div class="icon-list">
                ${this.icons.map(icon => `
                  <div class="icon-item">
                    <img src="${icon.icon}" alt="${icon.title}" style="width: 32px; height: 32px;">
                    <span>${icon.title}</span>
                    <button onclick="desktopManager.deleteIcon('${icon.id}')">Delete</button>
                  </div>
                `).join('')}
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(modal);
  }

  // Show wallpaper picker
  showWallpaperPicker() {
    this.wallpaperPicker.showWallpaperPicker();
  }

  // Get custom wallpapers from localStorage
  getCustomWallpapers() {
    try {
      return JSON.parse(localStorage.getItem('customWallpapers') || '[]');
    } catch (error) {
      console.error('Error loading custom wallpapers:', error);
      return [];
    }
  }

  // Save custom wallpapers to localStorage
  saveCustomWallpapers(wallpapers) {
    localStorage.setItem('customWallpapers', JSON.stringify(wallpapers));
  }

  // Add custom wallpaper from picker
  addCustomWallpaperFromPicker(url, name) {
    const customWallpapers = this.getCustomWallpapers();
    const newWallpaper = {
      id: 'custom-' + Date.now(),
      name: name || 'Custom Wallpaper',
      url: url,
      added: new Date().toISOString()
    };
    
    customWallpapers.push(newWallpaper);
    this.saveCustomWallpapers(customWallpapers);
    
    // Clear form
    const urlInput = document.getElementById('wallpaperUrl');
    const nameInput = document.getElementById('wallpaperName');
    if (urlInput) urlInput.value = '';
    if (nameInput) nameInput.value = '';
    
    // Reload wallpaper picker
    this.wallpaperPicker.loadCustomWallpapers();
    
    // Switch to custom tab
    const customTab = document.querySelector('[data-tab="custom"]');
    if (customTab) {
      customTab.click();
    }
    
    alert('Wallpaper added successfully!');
  }

  // Remove custom wallpaper
  removeCustomWallpaper(id) {
    if (confirm('Are you sure you want to remove this wallpaper?')) {
      const customWallpapers = this.getCustomWallpapers();
      const filtered = customWallpapers.filter(w => w.id !== id);
      this.saveCustomWallpapers(filtered);
      
      // Reload wallpaper picker
      this.wallpaperPicker.loadCustomWallpapers();
    }
  }

  // Set wallpaper from URL input
  setWallpaperFromUrl() {
    const url = document.getElementById('wallpaperUrl').value;
    if (url) {
      this.setWallpaper(url);
    }
  }

  // Add new icon
  addNewIcon() {
    const newIcon = {
      id: 'custom-' + Date.now(),
      title: 'New App',
      icon: '/assets/icons/default/default.png',
      x: 50,
      y: 50 + (this.icons.length * 100),
      appId: 'portfolio', // Default app
      appTitle: 'Portfolio'
    };
    
    this.icons.push(newIcon);
    this.createDesktopIcon(newIcon);
    this.saveDesktopState();
  }

  // Delete icon
  deleteIcon(iconId) {
    this.icons = this.icons.filter(icon => icon.id !== iconId);
    const iconElement = document.querySelector(`[data-icon-id="${iconId}"]`);
    if (iconElement) {
      iconElement.remove();
    }
    this.saveDesktopState();
  }

  // Rename icon
  renameIcon(iconData) {
    const newName = prompt('Enter new name:', iconData.title);
    if (newName && newName.trim()) {
      iconData.title = newName.trim();
      this.renderIcons();
      this.saveDesktopState();
    }
  }

  // Show icon picker
  showIconPicker(iconData) {
    const picker = document.createElement('div');
    picker.className = 'glass-modal';
    picker.innerHTML = `
      <div class="modal-content">
        <div class="modal-header">
          <h3>Choose Icon</h3>
          <button class="close-btn" onclick="this.closest('.glass-modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <div class="icon-grid">
            <div class="icon-option" data-url="🎨">
              <div class="icon-emoji">🎨</div>
            </div>
            <div class="icon-option" data-url="🎵">
              <div class="icon-emoji">🎵</div>
            </div>
            <div class="icon-option" data-url="🔍">
              <div class="icon-emoji">🔍</div>
            </div>
            <div class="icon-option" data-url="💬">
              <div class="icon-emoji">💬</div>
            </div>
            <div class="icon-option" data-url="📝">
              <div class="icon-emoji">📝</div>
            </div>
            <div class="icon-option" data-url="🎮">
              <div class="icon-emoji">🎮</div>
            </div>
            <div class="icon-option" data-url="🐍">
              <div class="icon-emoji">🐍</div>
            </div>
            <div class="icon-option" data-url="🧩">
              <div class="icon-emoji">🧩</div>
            </div>
            <div class="icon-option" data-url="🏓">
              <div class="icon-emoji">🏓</div>
            </div>
            <div class="icon-option" data-url="🔢">
              <div class="icon-emoji">🔢</div>
            </div>
            <div class="icon-option" data-url="🐦">
              <div class="icon-emoji">🐦</div>
            </div>
            <!-- Add more emoji icons here -->
          </div>
          <div class="custom-icon">
            <input type="text" id="customIconUrl" placeholder="Or enter emoji..." class="glass-input">
            <button class="glass-button" onclick="desktopManager.setCustomIcon('${iconData.id}')">Set Custom Icon</button>
          </div>
        </div>
      </div>
    `;
    
    // Add click handlers for icon selection
    picker.querySelectorAll('.icon-option').forEach(option => {
      option.addEventListener('click', () => {
        const url = option.dataset.url;
        iconData.icon = url;
        this.renderIcons();
        this.saveDesktopState();
        picker.remove();
      });
    });
    
    document.body.appendChild(picker);
  }

  // Set custom icon from URL
  setCustomIcon(iconId) {
    const url = document.getElementById('customIconUrl').value;
    if (url) {
      const iconData = this.icons.find(icon => icon.id === iconId);
      if (iconData) {
        iconData.icon = url;
        this.renderIcons();
        this.saveDesktopState();
      }
    }
  }
} 