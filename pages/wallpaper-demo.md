---
layout: default
title: Wallpaper Demo
permalink: /wallpaper-demo/
---

<div class="main-content">
  <div class="glass-card">
    <h1>Enhanced Wallpaper Picker Demo</h1>
    <p>This page demonstrates the new wallpaper picker with custom image URL support.</p>
    
    <div class="glass-card" style="margin: 2rem 0;">
      <h2>How to Use the Wallpaper Picker</h2>
      
      <div class="feature-list">
        <div class="feature-item">
          <h3>🖥️ Desktop Mode</h3>
          <p>Switch to desktop mode using the 🌐/🖥️ button, then:</p>
          <ol>
            <li>Right-click on the desktop or click the settings icon</li>
            <li>Go to the "Wallpaper" section</li>
            <li>Click "Change Wallpaper" to open the picker</li>
          </ol>
        </div>
        
        <div class="feature-item">
          <h3>📁 Three Tabs Available</h3>
          <ul>
            <li><strong>Default Wallpapers:</strong> Pre-selected high-quality images</li>
            <li><strong>Custom Images:</strong> Your saved image URLs</li>
            <li><strong>Add New Image:</strong> Add images via URL links</li>
          </ul>
        </div>
        
        <div class="feature-item">
          <h3>🔗 Adding Custom Images</h3>
          <p>To add your own images:</p>
          <ol>
            <li>Find an image online (use recommended sources below)</li>
            <li>Right-click the image and "Copy image address"</li>
            <li>Paste the URL in the "Add New Image" tab</li>
            <li>Give it a name and click "Add Image"</li>
          </ol>
        </div>
      </div>
    </div>
    
    <div class="glass-card">
      <h2>Recommended Image Sources</h2>
      <div class="source-grid">
        <div class="source-card">
          <h3>Unsplash</h3>
          <p>High-quality free stock photos</p>
          <a href="https://unsplash.com" target="_blank" class="glass-button">Visit Unsplash</a>
        </div>
        <div class="source-card">
          <h3>Pexels</h3>
          <p>Free stock photos and videos</p>
          <a href="https://pexels.com" target="_blank" class="glass-button">Visit Pexels</a>
        </div>
        <div class="source-card">
          <h3>Pixabay</h3>
          <p>Free images, photos, and graphics</p>
          <a href="https://pixabay.com" target="_blank" class="glass-button">Visit Pixabay</a>
        </div>
      </div>
    </div>
    
    <div class="glass-card">
      <h2>Example Image URLs</h2>
      <p>Here are some example URLs you can try:</p>
      
      <div class="example-urls">
        <div class="url-item">
          <strong>Mountain Landscape:</strong>
          <code>https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1920&h=1080&fit=crop</code>
        </div>
        <div class="url-item">
          <strong>Ocean Waves:</strong>
          <code>https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&h=1080&fit=crop</code>
        </div>
        <div class="url-item">
          <strong>Forest:</strong>
          <code>https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1920&h=1080&fit=crop</code>
        </div>
        <div class="url-item">
          <strong>Sunset:</strong>
          <code>https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=1920&h=1080&fit=crop</code>
        </div>
      </div>
    </div>
    
    <div class="glass-card">
      <h2>Features</h2>
      <ul>
        <li>✅ Add custom images via URL links</li>
        <li>✅ Remove custom images you no longer want</li>
        <li>✅ Images are saved locally in your browser</li>
        <li>✅ Works with any direct image URL</li>
        <li>✅ Responsive design for mobile devices</li>
        <li>✅ Tabbed interface for easy organization</li>
        <li>✅ Error handling for broken image links</li>
      </ul>
    </div>
  </div>
</div>

<style>
.feature-list {
  display: grid;
  gap: 1.5rem;
  margin: 1rem 0;
}

.feature-item {
  background: var(--glass-bg-light);
  border: 1px solid var(--glass-border-light);
  border-radius: 12px;
  padding: 1.5rem;
}

.feature-item h3 {
  margin: 0 0 1rem 0;
  color: var(--theme-text);
}

.feature-item ol,
.feature-item ul {
  margin: 0.5rem 0;
  padding-left: 1.5rem;
}

.feature-item li {
  margin: 0.25rem 0;
  color: var(--theme-text-secondary);
}

.source-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
  margin: 1rem 0;
}

.source-card {
  background: var(--glass-bg-light);
  border: 1px solid var(--glass-border-light);
  border-radius: 12px;
  padding: 1.5rem;
  text-align: center;
}

.source-card h3 {
  margin: 0 0 0.5rem 0;
  color: var(--theme-text);
}

.source-card p {
  margin: 0 0 1rem 0;
  color: var(--theme-text-secondary);
}

.example-urls {
  display: grid;
  gap: 1rem;
  margin: 1rem 0;
}

.url-item {
  background: var(--glass-bg-light);
  border: 1px solid var(--glass-border-light);
  border-radius: 8px;
  padding: 1rem;
}

.url-item strong {
  display: block;
  margin-bottom: 0.5rem;
  color: var(--theme-text);
}

.url-item code {
  background: var(--glass-bg-medium);
  padding: 0.5rem;
  border-radius: 4px;
  font-size: 0.9rem;
  word-break: break-all;
  color: var(--theme-text);
}
</style> 