// Wallpaper Picker Logic
class WallpaperPicker {
  constructor(desktopManager) {
    this.desktopManager = desktopManager;
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
              <div class="wallpaper-grid">
                <div class="wallpaper-item" data-wallpaper="/assets/wallpapers/default/desktop-1.jpg">
                  <img src="/assets/wallpapers/default/desktop-1.jpg" alt="Default 1">
                  <span>Default 1</span>
                </div>
                <div class="wallpaper-item" data-wallpaper="/assets/wallpapers/default/desktop-2.jpg">
                  <img src="/assets/wallpapers/default/desktop-2.jpg" alt="Default 2">
                  <span>Default 2</span>
                </div>
                <div class="wallpaper-item" data-wallpaper="/assets/wallpapers/default/desktop-3.jpg">
                  <img src="/assets/wallpapers/default/desktop-3.jpg" alt="Default 3">
                  <span>Default 3</span>
                </div>
                <div class="wallpaper-item" data-wallpaper="/assets/wallpapers/default/desktop-4.jpg">
                  <img src="/assets/wallpapers/default/desktop-4.jpg" alt="Default 4">
                  <span>Default 4</span>
                </div>
              </div>
            </div>
            
            <!-- Custom Wallpapers Tab -->
            <div class="tab-content" id="custom-tab">
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
                  <button class="add-wallpaper-btn" onclick="window.desktopManager.addCustomWallpaper()">Add Wallpaper</button>
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

    // Load custom wallpapers
    this.loadCustomWallpapers();

    // Add event listeners
    this.addPickerEventListeners();
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

    // Wallpaper selection
    const wallpaperItems = document.querySelectorAll('.wallpaper-item');
    wallpaperItems.forEach(item => {
      item.addEventListener('click', () => {
        const wallpaperUrl = item.dataset.wallpaper;
        this.desktopManager.setWallpaper(wallpaperUrl);
        document.getElementById('wallpaperPickerOverlay').remove();
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

    const customWallpapers = this.desktopManager.getCustomWallpapers();
    
    if (customWallpapers.length === 0) {
      customGrid.innerHTML = '<p class="no-wallpapers">No custom wallpapers yet. Add some in the "Add New" tab!</p>';
      return;
    }

    customGrid.innerHTML = customWallpapers.map(wallpaper => `
      <div class="wallpaper-item custom-wallpaper" data-wallpaper="${wallpaper.url}" data-id="${wallpaper.id}">
        <img src="${wallpaper.url}" alt="${wallpaper.name || 'Custom Wallpaper'}" onerror="this.parentElement.remove()">
        <span>${wallpaper.name || 'Custom'}</span>
        <button class="remove-wallpaper-btn" onclick="window.desktopManager.removeCustomWallpaper('${wallpaper.id}')">×</button>
      </div>
    `).join('');

    // Re-add event listeners for custom wallpapers
    const customItems = customGrid.querySelectorAll('.wallpaper-item');
    customItems.forEach(item => {
      item.addEventListener('click', (e) => {
        if (!e.target.classList.contains('remove-wallpaper-btn')) {
          const wallpaperUrl = item.dataset.wallpaper;
          this.desktopManager.setWallpaper(wallpaperUrl);
          document.getElementById('wallpaperPickerOverlay').remove();
        }
      });
    });
  }

  getCustomWallpapers() {
    return this.desktopManager.getCustomWallpapers();
  }

  saveCustomWallpapers(wallpapers) {
    this.desktopManager.saveCustomWallpapers(wallpapers);
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

    // Use desktop manager's method
    this.desktopManager.addCustomWallpaperFromPicker(url, name);
  }

  removeCustomWallpaper(id) {
    if (!confirm('Are you sure you want to remove this wallpaper?')) {
      return;
    }

    // Use desktop manager's method
    this.desktopManager.removeCustomWallpaper(id);
  }
} 