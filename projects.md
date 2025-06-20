---
layout: page
title: Personal Projects
permalink: /projects/
---

<style>
:root {
  /* Primary Color Palette */
  --primary-purple: #667eea;
  --primary-pink: #f093fb;
  --accent-blue: #4facfe;
  --accent-green: #43e97b;
  --accent-orange: #fa709a;
  
  /* Background Gradients */
  --gradient-primary: linear-gradient(135deg, var(--primary-purple) 0%, var(--primary-pink) 100%);
  --gradient-secondary: linear-gradient(135deg, var(--accent-blue) 0%, var(--accent-green) 100%);
  --gradient-warm: linear-gradient(135deg, var(--accent-orange) 0%, var(--primary-pink) 100%);
  
  /* Text Colors */
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
  
  /* Background Colors */
  --bg-primary: #ffffff;
  --bg-secondary: #f7fafc;
  --bg-accent: #edf2f7;
  
  /* Border Colors */
  --border-primary: #e2e8f0;
  --border-accent: #cbd5e0;
  --border-pink: #ffb6c1;
  
  /* Shadow Colors */
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.2);
  --shadow-heavy: rgba(0, 0, 0, 0.3);
  
  /* Glass Effects */
  --glass-bg: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.3);
  --glass-shadow: rgba(0, 0, 0, 0.1);
  --text-accent: #667eea;
  
  /* Advanced Glass Effects */
  --glass-bevel: rgba(255, 255, 255, 0.4);
  --glass-inner-shadow: rgba(0, 0, 0, 0.1);
  --glass-highlight: rgba(255, 255, 255, 0.6);
  --glass-gradient-1: linear-gradient(135deg, rgba(255, 255, 255, 0.3) 0%, rgba(255, 255, 255, 0.1) 50%, rgba(255, 255, 255, 0.05) 100%);
  --glass-gradient-2: linear-gradient(45deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.05) 100%);
  --glass-gradient-3: linear-gradient(225deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.02) 100%);
}

/* Theme: Sunset */
[data-theme="sunset"] {
  --primary-purple: #ff6b6b;
  --primary-pink: #ffa726;
  --accent-blue: #ff7043;
  --accent-green: #ffb74d;
  --accent-orange: #ff8a65;
  --gradient-primary: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
  --gradient-secondary: linear-gradient(135deg, #ff7043 0%, #ffb74d 100%);
  --text-accent: #ff6b6b;
  --glass-bg: rgba(255, 107, 107, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: Ocean */
[data-theme="ocean"] {
  --primary-purple: #4fc3f7;
  --primary-pink: #29b6f6;
  --accent-blue: #26c6da;
  --accent-green: #4dd0e1;
  --accent-orange: #00bcd4;
  --gradient-primary: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
  --gradient-secondary: linear-gradient(135deg, #26c6da 0%, #4dd0e1 100%);
  --text-accent: #4fc3f7;
  --glass-bg: rgba(79, 195, 247, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: Forest */
[data-theme="forest"] {
  --primary-purple: #66bb6a;
  --primary-pink: #81c784;
  --accent-blue: #4caf50;
  --accent-green: #66bb6a;
  --accent-orange: #8bc34a;
  --gradient-primary: linear-gradient(135deg, #66bb6a 0%, #81c784 100%);
  --gradient-secondary: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  --text-accent: #66bb6a;
  --glass-bg: rgba(102, 187, 106, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: Dark */
[data-theme="dark"] {
  --primary-purple: #9c27b0;
  --primary-pink: #e91e63;
  --accent-blue: #3f51b5;
  --accent-green: #4caf50;
  --accent-orange: #ff9800;
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-light: #bdbdbd;
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-accent: #404040;
  --border-primary: #404040;
  --border-accent: #555555;
  --gradient-primary: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
  --gradient-secondary: linear-gradient(135deg, #3f51b5 0%, #4caf50 100%);
  --text-accent: #e91e63;
  --glass-bg: rgba(233, 30, 99, 0.25);
  --text-white: #ffffff;
}

/* Theme: C - Cosmic */
[data-theme="c"] {
  --primary-purple: #667eea;
  --primary-pink: #f093fb;
  --accent-blue: #4facfe;
  --accent-green: #43e97b;
  --accent-orange: #fa709a;
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #f093fb 100%);
  --gradient-secondary: linear-gradient(135deg, #4facfe 0%, #43e97b 100%);
  --text-accent: #667eea;
  --glass-bg: rgba(102, 126, 234, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: A - Aurora */
[data-theme="a"] {
  --primary-purple: #ff6b6b;
  --primary-pink: #ffa726;
  --accent-blue: #ff7043;
  --accent-green: #ffb74d;
  --accent-orange: #ff8a65;
  --gradient-primary: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%);
  --gradient-secondary: linear-gradient(135deg, #ff7043 0%, #ffb74d 100%);
  --text-accent: #ff6b6b;
  --glass-bg: rgba(255, 107, 107, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: R - Rainbow */
[data-theme="r"] {
  --primary-purple: #4fc3f7;
  --primary-pink: #29b6f6;
  --accent-blue: #26c6da;
  --accent-green: #4dd0e1;
  --accent-orange: #00bcd4;
  --gradient-primary: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%);
  --gradient-secondary: linear-gradient(135deg, #26c6da 0%, #4dd0e1 100%);
  --text-accent: #4fc3f7;
  --glass-bg: rgba(79, 195, 247, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: Z - Zenith */
[data-theme="z"] {
  --primary-purple: #66bb6a;
  --primary-pink: #81c784;
  --accent-blue: #4caf50;
  --accent-green: #66bb6a;
  --accent-orange: #8bc34a;
  --gradient-primary: linear-gradient(135deg, #66bb6a 0%, #81c784 100%);
  --gradient-secondary: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  --text-accent: #66bb6a;
  --glass-bg: rgba(102, 187, 106, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: E - Eclipse */
[data-theme="e"] {
  --primary-purple: #9c27b0;
  --primary-pink: #e91e63;
  --accent-blue: #3f51b5;
  --accent-green: #4caf50;
  --accent-orange: #ff9800;
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-light: #bdbdbd;
  --bg-primary: #1a1a1a;
  --bg-secondary: #2d2d2d;
  --bg-accent: #404040;
  --border-primary: #404040;
  --border-accent: #555555;
  --gradient-primary: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%);
  --gradient-secondary: linear-gradient(135deg, #3f51b5 0%, #4caf50 100%);
  --text-accent: #e91e63;
  --glass-bg: rgba(233, 30, 99, 0.25);
  --text-white: #ffffff;
}

/* Theme: N - Nebula */
[data-theme="n"] {
  --primary-purple: #ff5722;
  --primary-pink: #ff9800;
  --accent-blue: #ff5722;
  --accent-green: #ff9800;
  --accent-orange: #ff5722;
  --gradient-primary: linear-gradient(135deg, #ff5722 0%, #ff9800 100%);
  --gradient-secondary: linear-gradient(135deg, #ff9800 0%, #ff5722 100%);
  --text-accent: #ff5722;
  --glass-bg: rgba(255, 87, 34, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  background: var(--gradient-primary);
  min-height: 100vh;
  color: var(--text-primary);
  transition: all 0.3s ease;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  background: var(--glass-bg);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 
    0 20px 40px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  backdrop-filter: blur(20px) saturate(180%);
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.container::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-gradient-1);
  border-radius: 20px;
  pointer-events: none;
  z-index: -1;
}

.container::after {
  content: '';
  position: absolute;
  top: 1px;
  left: 1px;
  right: 1px;
  bottom: 1px;
  background: var(--glass-gradient-2);
  border-radius: 19px;
  pointer-events: none;
  z-index: -1;
}

.header {
  text-align: center;
  margin-bottom: 40px;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  color: var(--text-accent);
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.header p {
  font-size: 1.1rem;
  color: var(--text-secondary);
  margin: 0;
}

.back-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: var(--text-white);
  text-decoration: none;
  font-size: 18px;
  background: var(--glass-bg);
  padding: 12px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  backdrop-filter: blur(15px) saturate(180%);
  box-shadow: 
    0 4px 16px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  border: none;
  position: relative;
  overflow: hidden;
}

.back-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-gradient-2);
  border-radius: 25px;
  pointer-events: none;
  z-index: -1;
}

.back-link:hover {
  background: var(--gradient-primary);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 20px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: 30px;
  margin-top: 40px;
}

.project-card {
  background: var(--glass-bg);
  box-shadow: 
    0 8px 32px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  border-radius: 15px;
  padding: 25px;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: none;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.project-card::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-gradient-1);
  border-radius: 15px;
  pointer-events: none;
  z-index: -1;
}

.project-card:hover::before {
  transform: scaleX(1);
}

.project-card:hover {
  border-color: var(--text-accent);
  transform: translateY(-5px);
  box-shadow: 
    0 15px 30px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
}

.project-title {
  font-size: 1.4rem;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 10px;
}

.project-description {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 15px;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.tech-tag {
  background: var(--gradient-primary);
  color: var(--text-white);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 0.8rem;
  font-weight: 500;
}

.project-links {
  display: flex;
  gap: 10px;
}

.project-link {
  color: var(--text-accent);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.project-link:hover {
  color: var(--primary-pink);
}

/* Theme Switcher */
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--glass-bg);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 
    0 10px 30px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  backdrop-filter: blur(20px) saturate(180%);
  border: none;
  z-index: 1000;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.theme-switcher::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-gradient-1);
  border-radius: 15px;
  pointer-events: none;
  z-index: -1;
}

.theme-switcher h3 {
  margin: 0 0 10px 0;
  color: var(--text-primary);
  font-size: 14px;
  text-align: center;
}

.theme-buttons {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
  justify-content: center;
}

.theme-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  box-shadow: 
    0 2px 8px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  backdrop-filter: blur(10px) saturate(180%);
  border: none;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.theme-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-gradient-2);
  border-radius: 50%;
  pointer-events: none;
  z-index: -1;
}

.theme-btn:hover {
  transform: scale(1.1);
  box-shadow: 
    0 4px 12px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
}

.theme-btn.active {
  box-shadow: 
    0 0 0 3px rgba(102, 126, 234, 0.2),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
  border-color: var(--text-accent);
}

.theme-btn[data-theme="sunset"] { background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); }
.theme-btn[data-theme="ocean"] { background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%); }
.theme-btn[data-theme="forest"] { background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%); }
.theme-btn[data-theme="dark"] { background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%); }

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 30px 20px;
  }
  
  .projects-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }
  
  .project-card {
    padding: 20px;
  }
  
  .header h1 {
    font-size: 2rem;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 25px 15px;
  }
  
  .header h1 {
    font-size: 1.8rem;
  }
  
  .project-title {
    font-size: 1.2rem;
  }
}
</style>

<!-- Starfield Background -->
<div class="starfield-container">
  <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="starfield-image" data-image="stars">
  <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="starfield-image" data-image="clouds1">
  <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="starfield-image" data-image="clouds2">
  <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="starfield-image" data-image="clouds4">
</div>

<a href="/" class="back-link">← Back to Home</a>

<div class="container">
  <div class="header">
    <h1>🚀 Personal Projects</h1>
    <p>A collection of things I've built and am working on</p>
  </div>

  <div class="projects-grid">
    <div class="project-card">
      <div class="status-badge completed">Completed</div>
      <div class="project-header">
        <span class="project-icon">Web</span>
        <h3>Personal Website</h3>
      </div>
      <p class="project-description">
        My personal website built with Jekyll, featuring multiple themes, interactive elements, and a magical sparkle system. Includes a search page, project recommendations, and nature backgrounds.
      </p>
      <div class="project-tech">
        <span class="tech-tag">Jekyll</span>
        <span class="tech-tag">HTML/CSS</span>
        <span class="tech-tag">JavaScript</span>
        <span class="tech-tag">GitHub Pages</span>
      </div>
      <div class="project-links">
        <a href="https://github.com/eosyn-z/eosyn-z.github.io" class="project-link" target="_blank">GitHub</a>
        <a href="/" class="project-link live">Live Site</a>
      </div>
    </div>

    <div class="project-card">
      <div class="status-badge in-progress">In Progress</div>
      <div class="project-header">
        <span class="project-icon">Game</span>
        <h3>Game Project</h3>
      </div>
      <p class="project-description">
        Working on a small indie game project. Learning game development fundamentals and exploring creative coding techniques.
      </p>
      <div class="project-tech">
        <span class="tech-tag">Unity</span>
        <span class="tech-tag">C#</span>
        <span class="tech-tag">Game Design</span>
      </div>
      <div class="project-links">
        <a href="#" class="project-link">Coming Soon</a>
      </div>
    </div>

    <div class="project-card">
      <div class="status-badge planned">Planned</div>
      <div class="project-title">
        <span class="project-icon">🤖</span>
        AI Assistant
      </div>
      <p class="project-description">
        Planning to build a personal AI assistant that can help with daily tasks, learning, and creative projects.
      </p>
      <div class="project-tech">
        <span class="tech-tag">Python</span>
        <span class="tech-tag">OpenAI API</span>
        <span class="tech-tag">Machine Learning</span>
      </div>
      <div class="project-links">
        <a href="#" class="project-link">Planning</a>
      </div>
    </div>

    <div class="project-card">
      <div class="status-badge planned">Planned</div>
      <div class="project-header">
        <span class="project-icon">Mobile</span>
        <h3>Mobile App</h3>
      </div>
      <p class="project-description">
        A productivity app focused on helping developers and creators stay organized and inspired.
      </p>
      <div class="project-tech">
        <span class="tech-tag">React Native</span>
        <span class="tech-tag">TypeScript</span>
        <span class="tech-tag">Firebase</span>
      </div>
      <div class="project-links">
        <a href="#" class="project-link">Planning</a>
      </div>
    </div>

    <div class="project-card">
      <div class="status-badge planned">Planned</div>
      <div class="project-header">
        <span class="project-icon">Art</span>
        <h3>Art Project</h3>
      </div>
      <p class="project-description">
        Exploring generative art and creative coding projects using p5.js and other creative coding libraries.
      </p>
      <div class="project-tech">
        <span class="tech-tag">p5.js</span>
        <span class="tech-tag">Creative Coding</span>
        <span class="tech-tag">Generative Art</span>
      </div>
      <div class="project-links">
        <a href="#" class="project-link">Coming Soon</a>
      </div>
    </div>

    <div class="project-card">
      <div class="status-badge planned">Planned</div>
      <div class="project-title">
        <span class="project-icon">🔧</span>
        Developer Tools
      </div>
      <p class="project-description">
        Building useful developer tools and utilities to improve workflow and productivity.
      </p>
      <div class="project-tech">
        <span class="tech-tag">Node.js</span>
        <span class="tech-tag">CLI Tools</span>
        <span class="tech-tag">Developer Experience</span>
      </div>
      <div class="project-links">
        <a href="#" class="project-link">Planning</a>
      </div>
    </div>
  </div>
</div>

<!-- Theme Switcher -->
<div class="theme-switcher">
  <h3>Theme</h3>
  <div class="theme-buttons">
    <div class="theme-btn active" data-theme="default" title="Default"></div>
    <div class="theme-btn" data-theme="sunset" title="Sunset"></div>
    <div class="theme-btn" data-theme="ocean" title="Ocean"></div>
    <div class="theme-btn" data-theme="forest" title="Forest"></div>
    <div class="theme-btn" data-theme="dark" title="Dark"></div>
  </div>
</div>

<!-- Cookie Consent -->
<div class="cookie-consent" id="cookieConsent">
  <h3>Cookie Notice</h3>
  <p>This website uses cookies to save your theme preference and improve your experience. We only store your theme choice and don't track any personal information.</p>
  <div class="cookie-buttons">
    <button class="cookie-btn reject" onclick="rejectCookies()">Reject</button>
    <button class="cookie-btn accept" onclick="acceptCookies()">Accept</button>
  </div>
</div>

<script>
// Cookie management functions
function setCookie(name, value, days) {
  const expires = new Date();
  expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
  document.cookie = name + "=" + value + ";expires=" + expires.toUTCString() + ";path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
}

// Cookie consent management
function showCookieConsent() {
  if (!getCookie('cookiesAccepted') && !getCookie('cookiesRejected')) {
    document.getElementById('cookieConsent').classList.add('show');
  }
}

function acceptCookies() {
  setCookie('cookiesAccepted', 'true', 365);
  document.getElementById('cookieConsent').classList.remove('show');
  
  // Save current theme preference
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'c';
  setCookie('theme', currentTheme, 365);
}

function rejectCookies() {
  setCookie('cookiesRejected', 'true', 365);
  document.getElementById('cookieConsent').classList.remove('show');
  
  // Clear any existing theme cookie
  deleteCookie('theme');
}

// Theme management
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
  
  // Save theme preference ONLY if cookies are accepted
  if (getCookie('cookiesAccepted') === 'true') {
    setCookie('theme', theme, 365);
  }
}

function loadTheme() {
  // Only load theme from cookie if cookies are accepted
  if (getCookie('cookiesAccepted') === 'true') {
    const savedTheme = getCookie('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme('c');
    }
  } else {
    // Set default theme to "c" if no cookies accepted
    setTheme('c');
  }
}

// Event listeners
document.addEventListener('DOMContentLoaded', function() {
  // Show cookie consent if needed
  showCookieConsent();
  
  // Load saved theme
  loadTheme();
  
  // Theme button click handlers
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });
});
</script> 