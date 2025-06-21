class DesktopManager {
  constructor() {
    this.desktop = document.body;
    this.icons = [];
    this.currentWallpaper = '';
    this.iconSize = 64;
    this.iconSpacing = 20;
    
    this.loadDesktopState();
    this.initializeDesktop();
  }

  // Load saved desktop state from cookies
  loadDesktopState() {
    try {
      const savedState = this.getCookie('desktopState');
      if (savedState) {
        const state = JSON.parse(savedState);
        this.icons = state.icons || this.getDefaultIcons();
        this.currentWallpaper = state.wallpaper || '/assets/wallpapers/default/desktop-1.jpg';
      } else {
        this.icons = this.getDefaultIcons();
        this.currentWallpaper = '/assets/wallpapers/default/desktop-1.jpg';
      }
    } catch (error) {
      console.error('Error loading desktop state:', error);
      this.icons = this.getDefaultIcons();
      this.currentWallpaper = '/assets/wallpapers/default/desktop-1.jpg';
    }
  }

  // Save desktop state to cookies
  saveDesktopState() {
    const state = {
      icons: this.icons,
      wallpaper: this.currentWallpaper
    };
    this.setCookie('desktopState', JSON.stringify(state), 365); // Save for 1 year
  }

  // Helper method to set a cookie
  setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${encodeURIComponent(value)};expires=${expires.toUTCString()};path=/`;
  }

  // Helper method to get a cookie
  getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
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
        appTitle: 'Portfolio',
        dateCreated: '2024-01-01',
        description: 'View my art portfolio and creative works',
        redbubbleLink: ''
      },
      {
        id: 'music',
        title: 'Music',
        icon: '🎵', // Using emoji instead of image file
        x: 50,
        y: 150,
        appId: 'music',
        appTitle: 'Music Player',
        dateCreated: '2024-01-01',
        description: 'Listen to music and audio content',
        redbubbleLink: ''
      },
      {
        id: 'search',
        title: 'Search',
        icon: '🔍', // Using emoji instead of image file
        x: 50,
        y: 250,
        appId: 'search',
        appTitle: 'Search & Pin',
        dateCreated: '2024-01-01',
        description: 'Search and pin your favorite content',
        redbubbleLink: ''
      },
      {
        id: 'chat',
        title: 'Chat',
        icon: '💬', // Using emoji instead of image file
        x: 50,
        y: 350,
        appId: 'chat',
        appTitle: 'AI Chat',
        dateCreated: '2024-01-01',
        description: 'Chat with AI assistant',
        redbubbleLink: ''
      },
      {
        id: 'sticky-notes',
        title: 'Sticky Notes',
        icon: '📝', // Using emoji instead of image file
        x: 50,
        y: 450,
        appId: 'sticky-notes',
        appTitle: 'Sticky Notes',
        dateCreated: '2024-01-01',
        description: 'Create and manage sticky notes',
        redbubbleLink: ''
      },
      {
        id: 'games',
        title: 'Games',
        icon: '🎮', // Using emoji instead of image file
        x: 200,
        y: 50,
        appId: 'games',
        appTitle: 'Game Center',
        dateCreated: '2024-01-01',
        description: 'Play games and have fun',
        redbubbleLink: ''
      },
      {
        id: 'snake',
        title: 'Snake',
        icon: '🐍', // Using emoji instead of image file
        x: 200,
        y: 150,
        appId: 'snake',
        appTitle: 'Snake',
        dateCreated: '2024-01-01',
        description: 'Classic Snake game',
        redbubbleLink: ''
      },
      {
        id: 'tetris',
        title: 'Tetris',
        icon: '🧩', // Using emoji instead of image file
        x: 200,
        y: 250,
        appId: 'tetris',
        appTitle: 'Tetris',
        dateCreated: '2024-01-01',
        description: 'Classic Tetris puzzle game',
        redbubbleLink: ''
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

    // Get or create desktop icons container
    let desktopIconsContainer = document.getElementById('desktop-icons');
    if (!desktopIconsContainer) {
      desktopIconsContainer = document.createElement('div');
      desktopIconsContainer.id = 'desktop-icons';
      desktopIconsContainer.className = 'desktop-icons';
      document.body.appendChild(desktopIconsContainer);
    }

    // Create new icons
    this.icons.forEach(iconData => {
      this.createDesktopIcon(iconData, desktopIconsContainer);
    });
  }

  // Create a single desktop icon
  createDesktopIcon(iconData, container = null) {
    if (!container) {
      container = document.getElementById('desktop-icons') || document.body;
    }
    
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
        if (window.windowManager) {
          window.windowManager.createWindow(iconData.appId, iconData.appTitle);
        } else {
          console.error('Window manager not found');
        }
      }
    });

    // Add right-click context menu
    icon.addEventListener('contextmenu', (e) => {
      e.preventDefault();
      this.showIconContextMenu(e, iconData);
    });

    container.appendChild(icon);
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
    e.preventDefault();
    
    // Remove existing context menu
    const existingMenu = document.querySelector('.icon-context-menu');
    if (existingMenu) existingMenu.remove();
    
    const menu = document.createElement('div');
    menu.className = 'icon-context-menu glass-card';
    menu.style.cssText = `
      position: fixed;
      left: ${e.clientX}px;
      top: ${e.clientY}px;
      z-index: 10000;
      background: var(--glass-bg-heavy);
      backdrop-filter: var(--glass-blur-heavy);
      border: 1px solid var(--glass-border-light);
      border-radius: 8px;
      padding: 0.5rem 0;
      box-shadow: var(--glass-shadow-heavy);
      min-width: 150px;
    `;
    
    menu.innerHTML = `
      <div class="menu-item" data-action="edit">✏️ Edit Properties</div>
      <div class="menu-item" data-action="rename">📝 Rename</div>
      <div class="menu-item" data-action="change-icon">🎨 Change Icon</div>
      <div class="menu-item" data-action="delete">🗑️ Delete</div>
    `;
    
    // Add click handlers
    menu.querySelectorAll('.menu-item').forEach(item => {
      item.addEventListener('click', () => {
        const action = item.dataset.action;
        this.handleIconAction(action, iconData);
        menu.remove();
      });
      
      // Hover effects
      item.addEventListener('mouseenter', () => {
        item.style.background = 'var(--glass-bg-medium)';
      });
      
      item.addEventListener('mouseleave', () => {
        item.style.background = 'transparent';
      });
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', () => menu.remove(), { once: true });
    
    document.body.appendChild(menu);
  }

  // Handle icon context menu actions
  handleIconAction(action, iconData) {
    switch (action) {
      case 'edit':
        this.editIcon(iconData);
        break;
      case 'rename':
        this.renameIcon(iconData);
        break;
      case 'change-icon':
        this.showIconPicker(iconData);
        break;
      case 'delete':
        if (confirm(`Are you sure you want to delete "${iconData.title}"?`)) {
          this.deleteIcon(iconData.id);
        }
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
    const pickerHTML = `
      <div class="wallpaper-picker-overlay" id="wallpaperPickerOverlay">
        <div class="wallpaper-picker-modal">
          <div class="wallpaper-picker-header">
            <h3>Wallpaper Picker</h3>
            <button class="close-btn" onclick="this.closest('.wallpaper-picker-overlay').remove()">×</button>
          </div>
          
          <div class="wallpaper-picker-tabs">
            <button class="tab-btn active" data-tab="default">Default</button>
            <button class="tab-btn" data-tab="custom">Custom</button>
            <button class="tab-btn" data-tab="add">Add New</button>
          </div>
          
          <div class="wallpaper-picker-content">
            <!-- Default Wallpapers Tab -->
            <div class="tab-content active" id="defaultTab">
              <div class="wallpaper-grid" id="defaultWallpaperGrid">
                <div class="wallpaper-item" data-wallpaper="/assets/wallpapers/default/desktop-1.jpg">
                  <img src="/assets/wallpapers/default/desktop-1.jpg" alt="Default Wallpaper 1">
                  <span>Cosmic</span>
                </div>
                <div class="wallpaper-item" data-wallpaper="/assets/wallpapers/default/desktop-2.jpg">
                  <img src="/assets/wallpapers/default/desktop-2.jpg" alt="Default Wallpaper 2">
                  <span>Aurora</span>
                </div>
                <div class="wallpaper-item" data-wallpaper="/assets/wallpapers/default/desktop-3.jpg">
                  <img src="/assets/wallpapers/default/desktop-3.jpg" alt="Default Wallpaper 3">
                  <span>Nebula</span>
                </div>
              </div>
            </div>
            
            <!-- Custom Wallpapers Tab -->
            <div class="tab-content" id="customTab">
              <div class="wallpaper-grid" id="customWallpaperGrid">
                <!-- Custom wallpapers will be loaded here -->
              </div>
            </div>
            
            <!-- Add New Tab -->
            <div class="tab-content" id="addTab">
              <div class="add-wallpaper-form">
                <div class="form-group">
                  <label for="wallpaperUrl">Image URL:</label>
                  <input type="url" id="wallpaperUrl" placeholder="https://example.com/image.jpg" class="glass-input">
                </div>
                <div class="form-group">
                  <label for="wallpaperName">Name (optional):</label>
                  <input type="text" id="wallpaperName" placeholder="My Wallpaper" class="glass-input">
                </div>
                <button class="glass-button" onclick="desktopManager.addCustomWallpaper()">Add Wallpaper</button>
                
                <div class="recommended-sources">
                  <h4>Recommended Image Sources:</h4>
                  <ul>
                    <li><a href="https://unsplash.com" target="_blank">Unsplash</a> - High-quality free photos</li>
                    <li><a href="https://pexels.com" target="_blank">Pexels</a> - Free stock photos</li>
                    <li><a href="https://pixabay.com" target="_blank">Pixabay</a> - Free images and videos</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', pickerHTML);
    
    // Add tab switching functionality
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active tab content
        tabContents.forEach(content => content.classList.remove('active'));
        document.getElementById(tabName + 'Tab').classList.add('active');
        
        // Load custom wallpapers if switching to custom tab
        if (tabName === 'custom') {
          this.loadCustomWallpapers();
        }
      });
    });
    
    // Add wallpaper selection functionality
    const wallpaperItems = document.querySelectorAll('.wallpaper-item');
    wallpaperItems.forEach(item => {
      item.addEventListener('click', () => {
        const wallpaperUrl = item.dataset.wallpaper;
        this.setWallpaper(wallpaperUrl);
        document.getElementById('wallpaperPickerOverlay').remove();
      });
    });
    
    // Load custom wallpapers initially
    this.loadCustomWallpapers();
  }

  // Get custom wallpapers from cookies
  getCustomWallpapers() {
    try {
      return JSON.parse(this.getCookie('customWallpapers') || '[]');
    } catch (error) {
      console.error('Error loading custom wallpapers:', error);
      return [];
    }
  }

  // Save custom wallpapers to cookies
  saveCustomWallpapers(wallpapers) {
    this.setCookie('customWallpapers', JSON.stringify(wallpapers), 365); // Save for 1 year
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
    if (!confirm('Are you sure you want to remove this wallpaper?')) {
      return;
    }

    const customWallpapers = this.getCustomWallpapers();
    const filteredWallpapers = customWallpapers.filter(w => w.id !== id);
    this.saveCustomWallpapers(filteredWallpapers);
    
    // Reload wallpaper picker
    this.loadCustomWallpapers();
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
      icon: '📱', // Default emoji icon
      x: 50,
      y: 50 + (this.icons.length * 100),
      appId: 'portfolio', // Default app
      appTitle: 'Portfolio',
      dateCreated: new Date().toISOString().split('T')[0], // Current date
      description: 'New application',
      redbubbleLink: ''
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

  // Load custom wallpapers
  loadCustomWallpapers() {
    const customGrid = document.getElementById('customWallpaperGrid');
    if (!customGrid) return;

    const customWallpapers = this.getCustomWallpapers();
    
    if (customWallpapers.length === 0) {
      customGrid.innerHTML = '<p class="no-wallpapers">No custom wallpapers yet. Add some in the "Add New" tab!</p>';
      return;
    }

    customGrid.innerHTML = customWallpapers.map(wallpaper => `
      <div class="wallpaper-item custom-wallpaper" data-wallpaper="${wallpaper.url}" data-id="${wallpaper.id}">
        <img src="${wallpaper.url}" alt="${wallpaper.name || 'Custom Wallpaper'}" onerror="this.parentElement.remove()">
        <span>${wallpaper.name || 'Custom'}</span>
        <button class="remove-wallpaper-btn" onclick="desktopManager.removeCustomWallpaper('${wallpaper.id}')">×</button>
      </div>
    `).join('');

    // Add click handlers for custom wallpapers
    const customWallpaperItems = customGrid.querySelectorAll('.wallpaper-item');
    customWallpaperItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('remove-wallpaper-btn')) {
          const wallpaperUrl = item.dataset.wallpaper;
          this.setWallpaper(wallpaperUrl);
          document.getElementById('wallpaperPickerOverlay').remove();
        }
      });
    });
  }

  // Add custom wallpaper
  addCustomWallpaper() {
    const url = prompt('Enter wallpaper URL:');
    const name = prompt('Enter wallpaper name:');
    
    if (url && name) {
      this.addCustomWallpaperFromPicker(url, name);
    }
  }

  // Edit icon properties
  editIcon(iconData) {
    const editor = document.createElement('div');
    editor.className = 'glass-modal';
    editor.innerHTML = `
      <div class="modal-content" style="max-width: 500px;">
        <div class="modal-header">
          <h3>Edit Icon Properties</h3>
          <button class="close-btn" onclick="this.closest('.glass-modal').remove()">✕</button>
        </div>
        <div class="modal-body">
          <div class="form-group">
            <label for="iconTitle">Title:</label>
            <input type="text" id="iconTitle" value="${iconData.title}" class="glass-input">
          </div>
          <div class="form-group">
            <label for="iconDescription">Description:</label>
            <textarea id="iconDescription" class="glass-input" rows="3">${iconData.description || ''}</textarea>
          </div>
          <div class="form-group">
            <label for="iconDateCreated">Date Created:</label>
            <input type="date" id="iconDateCreated" value="${iconData.dateCreated || ''}" class="glass-input">
          </div>
          <div class="form-group">
            <label for="iconRedbubbleLink">Redbubble Link:</label>
            <input type="url" id="iconRedbubbleLink" value="${iconData.redbubbleLink || ''}" class="glass-input" placeholder="https://www.redbubble.com/...">
          </div>
          <div class="form-group">
            <label for="iconAppId">App ID:</label>
            <select id="iconAppId" class="glass-input">
              <option value="portfolio" ${iconData.appId === 'portfolio' ? 'selected' : ''}>Portfolio</option>
              <option value="music" ${iconData.appId === 'music' ? 'selected' : ''}>Music</option>
              <option value="search" ${iconData.appId === 'search' ? 'selected' : ''}>Search</option>
              <option value="chat" ${iconData.appId === 'chat' ? 'selected' : ''}>Chat</option>
              <option value="sticky-notes" ${iconData.appId === 'sticky-notes' ? 'selected' : ''}>Sticky Notes</option>
              <option value="games" ${iconData.appId === 'games' ? 'selected' : ''}>Games</option>
              <option value="snake" ${iconData.appId === 'snake' ? 'selected' : ''}>Snake</option>
              <option value="tetris" ${iconData.appId === 'tetris' ? 'selected' : ''}>Tetris</option>
            </select>
          </div>
          <div class="form-group">
            <label>Icon:</label>
            <div class="icon-preview" style="display: flex; align-items: center; gap: 10px;">
              <span style="font-size: 2rem;">${iconData.icon}</span>
              <button class="glass-button" onclick="desktopManager.showIconPicker('${iconData.id}')">Change Icon</button>
            </div>
          </div>
          <div class="form-actions" style="display: flex; gap: 10px; justify-content: flex-end; margin-top: 20px;">
            <button class="glass-button" onclick="this.closest('.glass-modal').remove()">Cancel</button>
            <button class="glass-button primary" onclick="desktopManager.saveIconChanges('${iconData.id}')">Save Changes</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.appendChild(editor);
  }

  // Save icon changes
  saveIconChanges(iconId) {
    const iconData = this.icons.find(icon => icon.id === iconId);
    if (!iconData) return;

    // Get values from form
    iconData.title = document.getElementById('iconTitle').value;
    iconData.description = document.getElementById('iconDescription').value;
    iconData.dateCreated = document.getElementById('iconDateCreated').value;
    iconData.redbubbleLink = document.getElementById('iconRedbubbleLink').value;
    iconData.appId = document.getElementById('iconAppId').value;

    // Update app title based on app ID
    const appTitles = {
      'portfolio': 'Portfolio',
      'music': 'Music Player',
      'search': 'Search & Pin',
      'chat': 'AI Chat',
      'sticky-notes': 'Sticky Notes',
      'games': 'Game Center',
      'snake': 'Snake',
      'tetris': 'Tetris'
    };
    iconData.appTitle = appTitles[iconData.appId] || 'App';

    // Re-render icons and save
    this.renderIcons();
    this.saveDesktopState();
    
    // Close modal
    document.querySelector('.glass-modal').remove();
  }

  // Apply window theme settings from the theme editor
  applyWindowTheme(themeSettings) {
    console.log('Applying window theme to Desktop Manager:', themeSettings);
    // Store the settings so new windows can use them
    this.windowTheme = themeSettings;

    // Note: This only affects new windows. 
    // The WindowManager will handle applying themes to existing windows.
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing desktop manager...');
    try {
        window.desktopManager = new DesktopManager();
        console.log('Desktop manager initialized successfully');
    } catch (error) {
        console.error('Error initializing desktop manager:', error);
    }
}); 