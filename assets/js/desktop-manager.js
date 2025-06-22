class DesktopManager {
  constructor(pages) {
    this.desktop = document.body;
    this.pages = pages || []; // Store pages data
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
      const baseUrl = window.siteBaseUrl || '';
      if (savedState) {
        const state = JSON.parse(savedState);
        this.icons = state.icons || this.getDefaultIcons();
        this.currentWallpaper = state.wallpaper || `${baseUrl}/assets/wallpapers/default/desktop-1.jpg`;
      } else {
        this.icons = this.getDefaultIcons();
        this.currentWallpaper = `${baseUrl}/assets/wallpapers/default/desktop-1.jpg`;
      }
    } catch (error) {
      console.error('Error loading desktop state:', error);
      const baseUrl = window.siteBaseUrl || '';
      this.icons = this.getDefaultIcons();
      this.currentWallpaper = `${baseUrl}/assets/wallpapers/default/desktop-1.jpg`;
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
    const defaultIconData = [
      { title: 'Paint', icon: '🎨' },
      { title: 'Nature', icon: '🌳' },
      { title: 'Games', icon: '🎮' },
      { title: 'Portfolio', icon: '🎨' },
      { title: 'Music', icon: '🎵' },
      { title: 'Search', icon: '🔍' },
      { title: 'Chat', icon: '💬' },
      { title: 'Sticky Notes', icon: '📝' },
      { title: 'Snake', icon: '🐍' },
      { title: 'Tetris', icon: '🧩' },
    ];

    return defaultIconData.map((icon, index) => {
      const page = this.pages.find(p => p.title === icon.title);
      return {
        id: page ? page.url.split('/').filter(Boolean).pop() : icon.title.toLowerCase().replace(' ', '-'),
        title: icon.title,
        icon: icon.icon,
        x: 50 + (index % 3) * 120, // Simple grid layout
        y: 50 + Math.floor(index / 3) * 120,
        url: page ? page.url : '#', // Use page URL
        description: page ? (page.description || `Open the ${page.title} page.`) : `A desktop shortcut.`,
      };
    }).filter(icon => icon.url !== '#'); // Filter out icons with no matching page
  }

  // Initialize desktop
  initializeDesktop() {
    this.setWallpaper(this.currentWallpaper);
    this.renderIcons();
    this.loadBookmarkedIcons(); // Load bookmarked sites as icons
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
        // Use the openApp function from desktop.js if available
        if (window.openApp) {
          // Map appId to the correct URL using siteBaseUrl
          const baseUrl = window.siteBaseUrl || '';
          const appUrls = {
            // Main applications
            'paint': baseUrl + '/paint/',
            'sticky-notes': baseUrl + '/sticky-notes/',
            
            // Site pages
            'nature': baseUrl + '/nature/',
            'music': baseUrl + '/music/',
            'portfolio': baseUrl + '/portfolio/',
            'search': baseUrl + '/search/',
            'chat': baseUrl + '/chat/',
            'projects': baseUrl + '/projects/',
            'howtodothat': baseUrl + '/howtodothat/',
            'art': baseUrl + '/art/',
            
            // Games
            'games': baseUrl + '/games/',
            'snake': baseUrl + '/snake/',
            'tetris': baseUrl + '/tetris/',
            'pong': baseUrl + '/pong/',
            'minecraft': baseUrl + '/minecraft/',
            
            // Desktop utilities
            'windowsettings': baseUrl + '/window-demo/',
            'desktopsettings': baseUrl + '/wallpaper-demo/',
            
            // Art pages
            'digital': baseUrl + '/art/digital/',
            'traditional': baseUrl + '/art/traditional/',
            '3d': baseUrl + '/art/3d/',
            
            // Additional pages that might exist
            'index': baseUrl + '/',
            'desktop': baseUrl + '/desktop/'
          };
          
          const appUrl = appUrls[iconData.id];
          if (appUrl) {
            window.openApp(iconData.id, appUrl, iconData.title);
          } else {
            console.error('No URL mapping found for appId:', iconData.id);
          }
        } else if (window.windowManager) {
          window.windowManager.createWindow(iconData.url, iconData.title);
        } else {
          console.error('Neither openApp nor windowManager found');
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
      case 'open':
        if (window.windowManager && iconData.url) {
            window.windowManager.createWindow(iconData.url, iconData.title);
        }
        break;
    }
  }

  // Show desktop settings
  showDesktopSettings() {
    // Create a proper window for desktop settings
    const settingsWindow = document.createElement('div');
    settingsWindow.className = 'app-window glass-effect';
    settingsWindow.id = 'settings-window';
    settingsWindow.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 600px;
      height: 500px;
      z-index: 1000;
      display: flex;
      flex-direction: column;
    `;

    settingsWindow.innerHTML = `
      <div class="window-header">
        <div class="window-title">🖥️ Desktop Settings</div>
        <div class="window-controls">
          <button class="control-btn close" onclick="this.closest('.app-window').remove()">×</button>
        </div>
      </div>
      <div class="window-content" style="flex: 1; overflow-y: auto; padding: 20px;">
        <div class="settings-section">
          <h3>🎨 Wallpaper</h3>
          <div class="wallpaper-picker">
            <div class="current-wallpaper">
              <strong>Current:</strong> ${this.currentWallpaper.split('/').pop()}
            </div>
            <button class="glass-button" onclick="desktopManager.showWallpaperPicker()">Change Wallpaper</button>
          </div>
        </div>

        <div class="settings-section">
          <h3>📱 Desktop Icons</h3>
          <div class="icon-management">
            <button class="glass-button" onclick="desktopManager.addNewIcon()">Add New Icon</button>
            <div class="icon-list">
              ${this.icons.map(icon => `
                <div class="icon-item">
                  <span>${icon.icon} ${icon.title}</span>
                  <button class="glass-button" onclick="desktopManager.editIcon('${icon.id}')">Edit</button>
                  <button class="glass-button" onclick="desktopManager.deleteIcon('${icon.id}')">Delete</button>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <div class="settings-section">
          <h3>🎨 Window Theme</h3>
          <div class="window-theme-section">
            <button class="glass-button" onclick="desktopManager.showWindowThemeEditor()">Customize Window Appearance</button>
          </div>
        </div>
      </div>
    `;

    // Make the window draggable
    const header = settingsWindow.querySelector('.window-header');
    let isDragging = false;
    let startX, startY, startLeft, startTop;

    header.addEventListener('mousedown', (e) => {
      if (e.target.classList.contains('control-btn')) return;
      
      isDragging = true;
      startX = e.clientX;
      startY = e.clientY;
      startLeft = parseInt(settingsWindow.style.left) || 0;
      startTop = parseInt(settingsWindow.style.top) || 0;
      
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    });

    const onMouseMove = (e) => {
      if (!isDragging) return;
      
      const deltaX = e.clientX - startX;
      const deltaY = e.clientY - startY;
      
      settingsWindow.style.left = `${startLeft + deltaX}px`;
      settingsWindow.style.top = `${startTop + deltaY}px`;
      settingsWindow.style.transform = 'none';
    };

    const onMouseUp = () => {
      isDragging = false;
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.body.appendChild(settingsWindow);
  }

  // Show wallpaper picker
  showWallpaperPicker() {
    const baseUrl = window.siteBaseUrl || '';
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
                <div class="wallpaper-item" data-wallpaper="${baseUrl}/assets/wallpapers/default/desktop-1.jpg">
                  <img src="${baseUrl}/assets/wallpapers/default/desktop-1.jpg" alt="Default Wallpaper 1">
                  <span>Cosmic</span>
                </div>
                <div class="wallpaper-item" data-wallpaper="${baseUrl}/assets/wallpapers/default/desktop-2.jpg">
                  <img src="${baseUrl}/assets/wallpapers/default/desktop-2.jpg" alt="Default Wallpaper 2">
                  <span>Aurora</span>
                </div>
                <div class="wallpaper-item" data-wallpaper="${baseUrl}/assets/wallpapers/default/desktop-3.jpg">
                  <img src="${baseUrl}/assets/wallpapers/default/desktop-3.jpg" alt="Default Wallpaper 3">
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
          <h3> Properties</h3>
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

  // Load bookmarked sites from cookies and add them to desktop
  loadBookmarkedIcons() {
    const bookmarks = this.getCookie('bookmarkedSites');
    if (bookmarks) {
      try {
        const bookmarkedSites = JSON.parse(bookmarks);
        bookmarkedSites.forEach((site, index) => {
          this.addBookmarkToDesktop(site, index);
        });
      } catch (error) {
        console.error('Error loading bookmarked icons:', error);
      }
    }
  }

  // Add a bookmark to the desktop
  addBookmarkToDesktop(site, index = null) {
    const iconId = `bookmark-${site.url.replace(/[^a-zA-Z0-9]/g, '')}`;
    
    // Check if icon already exists
    if (document.getElementById(iconId)) {
      return;
    }

    const icon = {
      id: iconId,
      title: site.title,
      icon: '🔖', // Bookmark emoji
      x: index ? 50 + (index * 100) : 50 + (Math.random() * 200),
      y: index ? 100 + (index * 120) : 100 + (Math.random() * 200),
      appId: 'bookmark',
      appTitle: site.title,
      dateCreated: new Date().toISOString().split('T')[0],
      description: site.description,
      redbubbleLink: '',
      bookmarkData: site // Store the full bookmark data
    };

    this.icons.push(icon);
    this.renderIcon(icon);
    this.saveIcons();
  }

  // Remove a bookmark from the desktop
  removeBookmarkFromDesktop(siteUrl) {
    const iconId = `bookmark-${siteUrl.replace(/[^a-zA-Z0-9]/g, '')}`;
    const iconIndex = this.icons.findIndex(icon => icon.id === iconId);
    
    if (iconIndex !== -1) {
      const iconElement = document.getElementById(iconId);
      if (iconElement) {
        iconElement.remove();
      }
      this.icons.splice(iconIndex, 1);
      this.saveIcons();
    }
  }
}

// Global initialization
document.addEventListener('DOMContentLoaded', () => {
  // Initialize when desktop mode is active or when we're on a desktop page
  if (!document.body.classList.contains('desktop-mode') && !window.location.pathname.includes('/desktop')) return;

  console.log('Initializing desktop manager...');
  try {
    window.desktopManager = new DesktopManager();
    console.log('Desktop manager initialized successfully');
  } catch (error) {
    console.error('Error initializing desktop manager:', error);
  }
}); 