// Wallpaper Picker Logic
class WallpaperPicker {
  constructor(desktopManager) {
    this.desktopManager = desktopManager;
    this.wallpaperFolders = ['/assets/wallpapers/default/', '/assets/wallpaper/'];
  }

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
            <div class="tab-content active" id="default-tab">
              <div class="tab-header">
                <h4>Default Wallpapers</h4>
                <button class="refresh-btn glass-button small" onclick="window.wallpaperPicker.refreshDefaultWallpapers()">
                  🔄 Refresh
                </button>
              </div>
              <div class="wallpaper-grid" id="defaultWallpaperGrid">
                <div class="loading">Scanning for wallpapers...</div>
              </div>
            </div>
            
            <!-- Custom Wallpapers Tab -->
            <div class="tab-content" id="custom-tab">
              <div class="tab-header">
                <h4>Custom Wallpapers</h4>
                <button class="save-btn glass-button small" onclick="window.wallpaperPicker.saveCustomWallpapers()">
                  💾 Save to Cookie
                </button>
              </div>
              <div class="wallpaper-grid" id="customWallpaperGrid">
                <!-- Custom wallpapers will be loaded here -->
              </div>
            </div>
            
            <!-- Add New Wallpaper Tab -->
            <div class="tab-content" id="add-tab">
              <div class="add-wallpaper-form">
                <h4>Add Custom Wallpaper</h4>
                <div class="form-group">
                  <label for="wallpaperUrl">Image URL:</label>
                  <input type="url" id="wallpaperUrl" placeholder="https://example.com/image.jpg" required>
                </div>
                <div class="form-group">
                  <label for="wallpaperName">Name (optional):</label>
                  <input type="text" id="wallpaperName" placeholder="My Wallpaper">
                </div>
                <div class="form-group">
                  <button class="add-wallpaper-btn glass-button" onclick="window.wallpaperPicker.addCustomWallpaper()">Add Wallpaper</button>
                </div>
                <div class="recommended-sources">
                  <h5>Recommended Image Sources:</h5>
                  <ul>
                    <li><a href="https://unsplash.com" target="_blank">Unsplash</a> - High-quality free photos</li>
                    <li><a href="https://pixabay.com" target="_blank">Pixabay</a> - Free stock photos</li>
                    <li><a href="https://pexels.com" target="_blank">Pexels</a> - Free stock photos</li>
                    <li><a href="https://wallhaven.cc" target="_blank">Wallhaven</a> - Wallpaper collection</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;

    // Remove existing picker if present
    const existingPicker = document.getElementById('wallpaperPickerOverlay');
    if (existingPicker) {
      existingPicker.remove();
    }

    // Add picker to page
    document.body.insertAdjacentHTML('beforeend', pickerHTML);

    // Make picker globally accessible
    window.wallpaperPicker = this;

    // Load wallpapers
    this.refreshDefaultWallpapers();
    this.loadCustomWallpapers();

    // Add event listeners
    this.addPickerEventListeners();
  }

  async refreshDefaultWallpapers() {
    const defaultGrid = document.getElementById('defaultWallpaperGrid');
    if (!defaultGrid) return;

    defaultGrid.innerHTML = '<div class="loading">Scanning for wallpapers...</div>';

    try {
      const wallpapers = await this.scanWallpaperFolders();
      
      if (wallpapers.length === 0) {
        defaultGrid.innerHTML = `
          <div class="no-wallpapers">
            <p>No wallpapers found in the default folders.</p>
            <p>Add images to <code>/assets/wallpapers/default/</code> or <code>/assets/wallpaper/</code></p>
          </div>
        `;
        return;
      }

      defaultGrid.innerHTML = wallpapers.map(wallpaper => `
        <div class="wallpaper-item" data-wallpaper="${wallpaper.url}">
          <img src="${wallpaper.url}" alt="${wallpaper.name}" onerror="this.parentElement.remove()">
          <span>${wallpaper.name}</span>
        </div>
      `).join('');

      // Re-add event listeners for default wallpapers
      this.addWallpaperEventListeners(defaultGrid);

    } catch (error) {
      console.error('Error scanning wallpapers:', error);
      defaultGrid.innerHTML = '<div class="error">Error scanning wallpapers. Please try again.</div>';
    }
  }

  async scanWallpaperFolders() {
    const wallpapers = [];
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp'];

    // Try to fetch a directory listing or known wallpaper files
    for (const folder of this.wallpaperFolders) {
      try {
        // Try common wallpaper filenames
        const commonNames = [
          'desktop-1.jpg', 'desktop-2.jpg', 'desktop-3.jpg', 'desktop-4.jpg',
          'wallpaper-1.jpg', 'wallpaper-2.jpg', 'wallpaper-3.jpg',
          'bg-1.jpg', 'bg-2.jpg', 'background-1.jpg', 'background-2.jpg',
          'default.jpg', 'default.png', 'wallpaper.jpg', 'wallpaper.png'
        ];

        for (const filename of commonNames) {
          const url = folder + filename;
          if (await this.checkImageExists(url)) {
            wallpapers.push({
              url: url,
              name: filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
            });
          }
        }

        // Also try to scan for any image files (this is limited by browser security)
        // We'll rely on the common names for now
      } catch (error) {
        console.warn(`Could not scan folder ${folder}:`, error);
      }
    }

    return wallpapers;
  }

  async checkImageExists(url) {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(true);
      img.onerror = () => resolve(false);
      img.src = url;
    });
  }

  addWallpaperEventListeners(container) {
    const wallpaperItems = container.querySelectorAll('.wallpaper-item');
    wallpaperItems.forEach(item => {
      item.addEventListener('click', () => {
        const wallpaperUrl = item.dataset.wallpaper;
        this.desktopManager.setWallpaper(wallpaperUrl);
        document.getElementById('wallpaperPickerOverlay').remove();
      });
    });
  }

  addPickerEventListeners() {
    // Tab switching
    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        const tabName = btn.dataset.tab;
        
        // Update active tab button
        tabBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Update active tab content
        tabContents.forEach(content => {
          content.classList.remove('active');
          if (content.id === `${tabName}-tab`) {
            content.classList.add('active');
          }
        });
      });
    });

    // Close on overlay click
    const overlay = document.getElementById('wallpaperPickerOverlay');
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
  }

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
        <button class="remove-wallpaper-btn" onclick="window.wallpaperPicker.removeCustomWallpaper('${wallpaper.id}')">×</button>
      </div>
    `).join('');

    // Re-add event listeners for custom wallpapers
    this.addWallpaperEventListeners(customGrid);
  }

  getCustomWallpapers() {
    try {
      const saved = localStorage.getItem('customWallpapers');
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.error('Error loading custom wallpapers:', error);
      return [];
    }
  }

  saveCustomWallpapers() {
    const customWallpapers = this.getCustomWallpapers();
    
    // Also save to cookies as backup
    try {
      document.cookie = `customWallpapers=${JSON.stringify(customWallpapers)}; path=/; max-age=31536000`;
      alert(`Saved ${customWallpapers.length} custom wallpapers to cookies!`);
    } catch (error) {
      console.error('Error saving to cookies:', error);
      alert('Error saving to cookies. Wallpapers are still saved in browser storage.');
    }
  }

  addCustomWallpaper() {
    const urlInput = document.getElementById('wallpaperUrl');
    const nameInput = document.getElementById('wallpaperName');
    
    const url = urlInput.value.trim();
    const name = nameInput.value.trim();
    
    if (!url) {
      alert('Please enter a valid image URL');
      return;
    }

    // Validate URL
    try {
      new URL(url);
    } catch (error) {
      alert('Please enter a valid URL');
      return;
    }

    // Add to custom wallpapers
    const customWallpapers = this.getCustomWallpapers();
    const newWallpaper = {
      id: Date.now().toString(),
      url: url,
      name: name || 'Custom Wallpaper',
      added: new Date().toISOString()
    };

    customWallpapers.push(newWallpaper);
    
    try {
      localStorage.setItem('customWallpapers', JSON.stringify(customWallpapers));
      urlInput.value = '';
      nameInput.value = '';
      
      // Refresh custom wallpapers display
      this.loadCustomWallpapers();
      
      alert('Wallpaper added successfully!');
    } catch (error) {
      console.error('Error saving custom wallpaper:', error);
      alert('Error saving wallpaper. Please try again.');
    }
  }

  removeCustomWallpaper(id) {
    if (!confirm('Are you sure you want to remove this wallpaper?')) {
      return;
    }

    const customWallpapers = this.getCustomWallpapers();
    const filtered = customWallpapers.filter(w => w.id !== id);
    
    try {
      localStorage.setItem('customWallpapers', JSON.stringify(filtered));
      this.loadCustomWallpapers();
    } catch (error) {
      console.error('Error removing custom wallpaper:', error);
      alert('Error removing wallpaper. Please try again.');
    }
  }
} 