---
layout: default
title: Portfolio
description: A curated collection of my creative works, spanning digital art and development projects.
permalink: /portfolio/
---

<div class="main-content glass-container">
  <div class="page-header">
    <h1>Portfolio</h1>
    <p>A curated collection of my creative works, spanning digital art and development projects.</p>
  </div>

  <!-- Portfolio Introduction -->
  <div class="glass-card" style="margin-bottom: 3rem; padding: 2rem;">
    <div class="portfolio-intro">
      <h2>Welcome to My Creative Universe</h2>
      <p>
        I'm a multidisciplinary creator who bridges the gap between art and technology. 
        My portfolio showcases both my artistic journey across various mediums and my 
        technical projects that push the boundaries of what's possible.
      </p>
      <p>
        From digital paintings that explore emotion through color, to interactive 
        web experiences that blend creativity with functionality, each piece represents 
        a moment of discovery and growth in my creative journey.
      </p>
    </div>
  </div>

  <!-- Two-Column Portfolio Layout -->
  <div class="portfolio-grid">
    <!-- Left Column - Art Portfolio -->
    <div class="portfolio-column art-column">
      <div class="column-header">
        <h2>🎨 Art Portfolio</h2>
        <p>Exploring creativity across multiple mediums</p>
      </div>
      
      <div class="art-categories">
        <!-- 3D Art -->
        <div class="art-category-card glass-card" onclick="window.location.href='/portfolio/art/3d/'">
          <div class="art-preview">
            <div class="art-placeholder">🎭</div>
          </div>
          <div class="art-info">
            <h3>3D Modeling</h3>
            <p>Three-dimensional digital sculptures and models</p>
            <span class="art-count" data-art-category="3d">Loading...</span>
          </div>
        </div>

        <!-- Digital Art -->
        <div class="art-category-card glass-card" onclick="window.location.href='/portfolio/art/digital/'">
          <div class="art-preview">
            <div class="art-placeholder">🎨</div>
          </div>
          <div class="art-info">
            <h3>Digital Art</h3>
            <p>Digital paintings and illustrations</p>
            <span class="art-count" data-art-category="digital">Loading...</span>
          </div>
        </div>

        <!-- Traditional Art -->
        <div class="art-category-card glass-card" onclick="window.location.href='/portfolio/art/traditional/'">
          <div class="art-preview">
            <div class="art-placeholder">🖌️</div>
          </div>
          <div class="art-info">
            <h3>Traditional Art</h3>
            <p>Classical techniques and mixed media</p>
            <span class="art-count" data-art-category="traditional">Loading...</span>
          </div>
        </div>

        <!-- Oil/Acrylic -->
        <div class="art-category-card glass-card" onclick="window.location.href='/portfolio/art/oil-acrylic/'">
          <div class="art-preview">
            <div class="art-placeholder">🖼️</div>
          </div>
          <div class="art-info">
            <h3>Oil & Acrylic</h3>
            <p>Canvas paintings with rich textures</p>
            <span class="art-count" data-art-category="oil-acrylic">Loading...</span>
          </div>
        </div>

        <!-- Ink Art -->
        <div class="art-category-card glass-card" onclick="window.location.href='/portfolio/art/ink/'">
          <div class="art-preview">
            <div class="art-placeholder">✒️</div>
          </div>
          <div class="art-info">
            <h3>Ink Art</h3>
            <p>Pen and ink illustrations</p>
            <span class="art-count" data-art-category="ink">Loading...</span>
          </div>
        </div>

        <!-- Mixed Media -->
        <div class="art-category-card glass-card" onclick="window.location.href='/portfolio/art/mixed-media/'">
          <div class="art-preview">
            <div class="art-placeholder">🔗</div>
          </div>
          <div class="art-info">
            <h3>Mixed Media</h3>
            <p>Combined techniques and materials</p>
            <span class="art-count" data-art-category="mixed-media">Loading...</span>
          </div>
        </div>

        <!-- Sketch -->
        <div class="art-category-card glass-card" onclick="window.location.href='/portfolio/art/sketch/'">
          <div class="art-preview">
            <div class="art-placeholder">✏️</div>
          </div>
          <div class="art-info">
            <h3>Sketches</h3>
            <p>Quick studies and concept drawings</p>
            <span class="art-count" data-art-category="sketch">Loading...</span>
          </div>
        </div>

        <!-- Watercolor -->
        <div class="art-category-card glass-card" onclick="window.location.href='/portfolio/art/watercolor/'">
          <div class="art-preview">
            <div class="art-placeholder">💧</div>
          </div>
          <div class="art-info">
            <h3>Watercolor</h3>
            <p>Fluid and expressive watercolor paintings</p>
            <span class="art-count" data-art-category="watercolor">Loading...</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Right Column - Projects Portfolio -->
    <div class="portfolio-column projects-column">
      <div class="column-header">
        <h2>💻 Technical Projects</h2>
        <p>Innovation through code and creativity</p>
      </div>
      
      <div class="projects-preview">
        <div class="project-card glass-card" onclick="window.location.href='/projects/'">
          <div class="project-icon">🚀</div>
          <div class="project-info">
            <h3>Web Applications</h3>
            <p>Interactive web experiences and tools</p>
            <span class="project-tech">React • Node.js • Python</span>
          </div>
        </div>

        <div class="project-card glass-card" onclick="window.location.href='/projects/'">
          <div class="project-icon">🎮</div>
          <div class="project-info">
            <h3>Game Development</h3>
            <p>Creative coding and interactive experiences</p>
            <span class="project-tech">JavaScript • Canvas • WebGL</span>
          </div>
        </div>

        <div class="project-card glass-card" onclick="window.location.href='/projects/'">
          <div class="project-icon">🤖</div>
          <div class="project-info">
            <h3>AI & Machine Learning</h3>
            <p>Exploring the intersection of art and AI</p>
            <span class="project-tech">Python • TensorFlow • OpenCV</span>
          </div>
        </div>

        <div class="project-card glass-card" onclick="window.location.href='/projects/'">
          <div class="project-icon">📱</div>
          <div class="project-info">
            <h3>Mobile Development</h3>
            <p>Cross-platform mobile applications</p>
            <span class="project-tech">React Native • Flutter • Swift</span>
          </div>
        </div>

        <div class="project-card glass-card" onclick="window.location.href='/projects/'">
          <div class="project-icon">🎨</div>
          <div class="project-info">
            <h3>Creative Coding</h3>
            <p>Generative art and visual programming</p>
            <span class="project-tech">Processing • p5.js • GLSL</span>
          </div>
        </div>

        <div class="project-card glass-card" onclick="window.location.href='/projects/'">
          <div class="project-icon">🔧</div>
          <div class="project-info">
            <h3>Open Source</h3>
            <p>Contributions to the developer community</p>
            <span class="project-tech">GitHub • Documentation • Tools</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>

<script src="/assets/js/portfolio-count.js"></script>

<style>
.portfolio-intro {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
}

.portfolio-intro h2 {
  color: var(--theme-accent);
  margin-bottom: 1rem;
  font-size: 2rem;
}

.portfolio-intro p {
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-secondary);
  margin-bottom: 1rem;
}

.portfolio-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 3rem;
  margin-top: 2rem;
}

.portfolio-column {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.column-header {
  text-align: center;
  margin-bottom: 1rem;
}

.column-header h2 {
  color: var(--theme-accent);
  margin-bottom: 0.5rem;
  font-size: 1.5rem;
}

.column-header p {
  color: var(--text-secondary);
  font-size: 0.9rem;
}

/* Art Categories */
.art-categories {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.art-category-card {
  display: flex;
  align-items: center;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--glass-border-light);
}

.art-category-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--theme-accent);
}

.art-preview {
  width: 60px;
  height: 60px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 1rem;
  background: linear-gradient(135deg, var(--theme-accent), var(--theme-accent-secondary));
  flex-shrink: 0;
}

.art-placeholder {
  font-size: 2rem;
  color: white;
}

.art-info {
  flex: 1;
}

.art-info h3 {
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.art-info p {
  margin: 0 0 0.5rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.art-count {
  background: var(--glass-bg-medium);
  color: var(--theme-accent);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Projects */
.projects-preview {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.project-card {
  display: flex;
  align-items: center;
  padding: 1.5rem;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid var(--glass-border-light);
}

.project-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  border-color: var(--theme-accent);
}

.project-icon {
  font-size: 2.5rem;
  margin-right: 1rem;
  flex-shrink: 0;
}

.project-info {
  flex: 1;
}

.project-info h3 {
  margin: 0 0 0.25rem 0;
  color: var(--text-primary);
  font-size: 1.1rem;
}

.project-info p {
  margin: 0 0 0.5rem 0;
  color: var(--text-secondary);
  font-size: 0.9rem;
  line-height: 1.4;
}

.project-tech {
  background: var(--glass-bg-medium);
  color: var(--theme-accent);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.8rem;
  font-weight: 500;
}

/* Responsive Design */
@media (max-width: 1024px) {
  .portfolio-grid {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
  
  .portfolio-column {
    order: 2;
  }
  
  .projects-column {
    order: 1;
  }
}

@media (max-width: 768px) {
  .portfolio-intro h2 {
    font-size: 1.5rem;
  }
  
  .portfolio-intro p {
    font-size: 1rem;
  }
  
  .art-category-card,
  .project-card {
    padding: 0.75rem;
  }
  
  .art-preview {
    width: 50px;
    height: 50px;
  }
  
  .art-placeholder {
    font-size: 1.5rem;
  }
  
  .project-icon {
    font-size: 2rem;
  }
}

/* Enhanced glass morphism effects */
.art-category-card,
.project-card {
  backdrop-filter: blur(15px) saturate(180%);
  -webkit-backdrop-filter: blur(15px) saturate(180%);
}

.art-category-card:hover,
.project-card:hover {
  backdrop-filter: blur(20px) saturate(200%);
  -webkit-backdrop-filter: blur(20px) saturate(200%);
}
</style> 