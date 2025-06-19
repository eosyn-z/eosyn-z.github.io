---
layout: page
title: How to Do That
permalink: /howtodothat/
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
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  background: var(--gradient-primary);
  min-height: 100vh;
  color: var(--text-primary);
}

.container {
  max-width: 900px;
  margin: 0 auto;
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 0 20px 40px var(--shadow-medium);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: var(--primary-purple);
  margin-bottom: 10px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.back-link {
  position: absolute;
  top: 20px;
  left: 20px;
  color: var(--text-white);
  text-decoration: none;
  font-size: 18px;
  background: var(--shadow-heavy);
  padding: 12px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.back-link:hover {
  background: var(--gradient-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-medium);
}

.selections-display {
  background: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  display: none;
}

.selections-display.show {
  display: block;
}

.selections-display h3 {
  margin: 0 0 15px 0;
  color: var(--text-primary);
  font-size: 16px;
}

.selection-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.selection-tag {
  background: var(--gradient-primary);
  color: var(--text-white);
  padding: 6px 12px;
  border-radius: 15px;
  font-size: 12px;
  font-weight: 500;
}

.quiz-section {
  margin-bottom: 30px;
  display: none;
}

.quiz-section.active {
  display: block;
}

.question {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  text-align: center;
}

.question-description {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 25px;
  font-size: 14px;
  line-height: 1.5;
}

.options {
  display: grid;
  gap: 15px;
}

.option {
  background: var(--bg-secondary);
  border: 2px solid var(--border-primary);
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
}

.option:hover {
  border-color: var(--primary-purple);
  background: var(--bg-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-medium);
}

.option.selected {
  border-color: var(--primary-purple);
  background: var(--bg-accent);
  box-shadow: 0 8px 20px var(--shadow-medium);
}

.option-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
}

.option-description {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.navigation {
  display: flex;
  justify-content: space-between;
  margin-top: 30px;
}

.btn {
  background: var(--gradient-primary);
  color: var(--text-white);
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  font-weight: 500;
}

.btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-medium);
}

.btn:disabled {
  background: var(--border-accent);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

.btn.secondary {
  background: var(--text-secondary);
}

.btn.secondary:hover {
  background: var(--text-primary);
}

.progress-bar {
  width: 100%;
  height: 8px;
  background: var(--border-primary);
  border-radius: 4px;
  margin-bottom: 30px;
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  transition: width 0.3s ease;
  width: 0%;
}

.result-section {
  text-align: center;
  display: none;
}

.result-section.active {
  display: block;
}

.recommendation {
  background: var(--bg-secondary);
  border: 2px solid var(--accent-green);
  border-radius: 15px;
  padding: 30px;
  margin-bottom: 20px;
  text-align: left;
}

.recommendation h2 {
  color: var(--accent-green);
  margin-bottom: 15px;
  text-align: center;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.tech-tag {
  background: var(--primary-purple);
  color: var(--text-white);
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
}

.tech-tag.frontend { background: var(--accent-blue); }
.tech-tag.backend { background: var(--accent-green); }
.tech-tag.database { background: var(--accent-orange); }
.tech-tag.deployment { background: var(--primary-pink); }

.resources {
  background: var(--bg-accent);
  border: 2px solid var(--accent-orange);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
}

.resources h3 {
  color: var(--accent-orange);
  margin-bottom: 15px;
}

.resource-list {
  list-style: none;
  padding: 0;
}

.resource-list li {
  margin-bottom: 10px;
}

.resource-list a {
  color: var(--primary-purple);
  text-decoration: none;
}

.resource-list a:hover {
  text-decoration: underline;
}

.learning-path {
  background: var(--bg-secondary);
  border: 2px solid var(--primary-purple);
  border-radius: 15px;
  padding: 20px;
  margin-top: 20px;
}

.learning-path h3 {
  color: var(--primary-purple);
  margin-bottom: 15px;
}

.step-list {
  list-style: none;
  padding: 0;
  counter-reset: step-counter;
}

.step-list li {
  counter-increment: step-counter;
  margin-bottom: 15px;
  padding-left: 40px;
  position: relative;
}

.step-list li::before {
  content: counter(step-counter);
  position: absolute;
  left: 0;
  top: 0;
  background: var(--gradient-primary);
  color: var(--text-white);
  width: 25px;
  height: 25px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  font-weight: bold;
}

.restart-btn {
  background: var(--accent-orange);
  color: var(--text-white);
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.restart-btn:hover {
  background: #e53e3e;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .container {
    padding: 20px;
    margin: 10px;
  }
  
  .selections-display {
    padding: 15px;
  }
  
  .selection-tags {
    gap: 6px;
  }
  
  .selection-tag {
    font-size: 11px;
    padding: 4px 8px;
  }
}

/* Theme Switcher */
.theme-switcher {
  position: fixed;
  top: 20px;
  right: 20px;
  background: var(--bg-primary);
  border-radius: 15px;
  padding: 15px;
  box-shadow: 0 10px 30px var(--shadow-medium);
  border: 2px solid var(--border-primary);
  z-index: 1000;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.gear-button {
  width: 40px;
  height: 40px;
  background: var(--bg-primary);
  border-radius: 50%;
  border: 2px solid var(--border-primary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--text-primary);
  transition: all 0.3s ease;
  box-shadow: 0 4px 12px var(--shadow-medium);
  margin-bottom: 10px;
}

.gear-button:hover {
  transform: rotate(90deg);
  background: var(--gradient-primary);
  color: var(--text-white);
  border-color: var(--primary-purple);
}

.theme-content {
  display: none;
  text-align: center;
}

.theme-switcher.show .theme-content {
  display: block;
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
  border: 2px solid var(--border-primary);
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
}

.theme-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 4px 12px var(--shadow-medium);
}

.theme-btn.active {
  border-color: var(--primary-purple);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.theme-btn[data-theme="c"] { background: linear-gradient(135deg, #667eea 0%, #f093fb 100%); }
.theme-btn[data-theme="a"] { background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); }
.theme-btn[data-theme="r"] { background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%); }
.theme-btn[data-theme="z"] { background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%); }
.theme-btn[data-theme="e"] { background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%); }
.theme-btn[data-theme="n"] { background: linear-gradient(135deg, #ff5722 0%, #ff9800 100%); }

/* Cookie Consent */
.cookie-consent {
  position: fixed;
  bottom: 20px;
  left: 20px;
  right: 20px;
  background: var(--bg-primary);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px var(--shadow-medium);
  border: 2px solid var(--border-primary);
  z-index: 1001;
  max-width: 500px;
  margin: 0 auto;
  display: none;
}

.cookie-consent.show {
  display: block;
}

.cookie-consent h3 {
  margin: 0 0 10px 0;
  color: var(--text-primary);
  font-size: 16px;
}

.cookie-consent p {
  margin: 0 0 15px 0;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.cookie-buttons {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.cookie-btn {
  padding: 8px 16px;
  border-radius: 20px;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.cookie-btn.accept {
  background: var(--gradient-primary);
  color: var(--text-white);
}

.cookie-btn.reject {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 2px solid var(--border-primary);
}

.cookie-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px var(--shadow-medium);
}
</style>

<a href="/" class="back-link">← Back to Home</a>

<div class="container">
  <div class="header">
    <h1>🤔 How to Do That?</h1>
    <p>Let's figure out the best way to build your project!</p>
  </div>

  <div class="progress-bar">
    <div class="progress-fill" id="progressFill"></div>
  </div>

  <!-- Selections Display -->
  <div class="selections-display" id="selectionsDisplay">
    <h3>Your Selections:</h3>
    <div class="selection-tags" id="selectionTags"></div>
  </div>

  <!-- Theme Switcher -->
  <div class="theme-switcher">
    <div class="gear-button" id="gearButton" title="Theme Settings">⚙️</div>
    <div class="theme-content">
      <h3>Theme</h3>
      <div class="theme-buttons">
        <div class="theme-btn active" data-theme="c" title="C - Cosmic"></div>
        <div class="theme-btn" data-theme="a" title="A - Aurora"></div>
        <div class="theme-btn" data-theme="r" title="R - Rainbow"></div>
        <div class="theme-btn" data-theme="z" title="Z - Zenith"></div>
        <div class="theme-btn" data-theme="e" title="E - Eclipse"></div>
        <div class="theme-btn" data-theme="n" title="N - Nebula"></div>
      </div>
    </div>
  </div>

  <!-- Cookie Consent -->
  <div class="cookie-consent" id="cookieConsent">
    <h3>🍪 Cookie Notice</h3>
    <p>This website uses cookies to save your theme preference and improve your experience. We only store your theme choice and don't track any personal information.</p>
    <div class="cookie-buttons">
      <button class="cookie-btn reject" onclick="rejectCookies()">Reject</button>
      <button class="cookie-btn accept" onclick="acceptCookies()">Accept</button>
    </div>
  </div>

  <!-- Question 1: Project Type -->
  <div class="quiz-section active" id="section1">
    <div class="question">I want to create a...</div>
    <div class="question-description">Choose the type of project you want to build</div>
    <div class="options">
      <div class="option" data-value="webapp" data-label="Web Application">
        <div class="option-title">🌐 Web Application</div>
        <div class="option-description">A website that users can interact with, like a social media platform, e-commerce site, or online tool</div>
      </div>
      <div class="option" data-value="mobile" data-label="Mobile App">
        <div class="option-title">📱 Mobile App</div>
        <div class="option-description">An app for smartphones and tablets, like Instagram, a productivity app, or a game</div>
      </div>
      <div class="option" data-value="desktop" data-label="Desktop Application">
        <div class="option-title">💻 Desktop Application</div>
        <div class="option-description">Software that runs on computers, like a photo editor, game, or productivity tool</div>
      </div>
      <div class="option" data-value="api" data-label="API/Backend Service">
        <div class="option-title">🔌 API/Backend Service</div>
        <div class="option-description">A service that provides data or functionality to other applications</div>
      </div>
      <div class="option" data-value="game" data-label="Game">
        <div class="option-title">🎮 Game</div>
        <div class="option-description">An interactive game, either web-based, mobile, or desktop</div>
      </div>
    </div>
    <div class="navigation">
      <div></div>
      <button class="btn" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 2: Features -->
  <div class="quiz-section" id="section2">
    <div class="question">It should be able to...</div>
    <div class="question-description">Select all the features your project needs (you can choose multiple)</div>
    <div class="options">
      <div class="option" data-value="user-auth" data-label="User Accounts & Login">
        <div class="option-title">👤 User Accounts & Login</div>
        <div class="option-description">Let users create accounts, log in, and manage their profiles</div>
      </div>
      <div class="option" data-value="data-storage" data-label="Store Data">
        <div class="option-title">💾 Store Data</div>
        <div class="option-description">Save and retrieve information like user data, posts, or files</div>
      </div>
      <div class="option" data-value="real-time" data-label="Real-time Updates">
        <div class="option-title">⚡ Real-time Updates</div>
        <div class="option-description">Update information instantly, like chat messages or live data</div>
      </div>
      <div class="option" data-value="media" data-label="Handle Media">
        <div class="option-title">🖼️ Handle Media</div>
        <div class="option-description">Upload, process, and display images, videos, or audio files</div>
      </div>
      <div class="option" data-value="payments" data-label="Process Payments">
        <div class="option-title">💳 Process Payments</div>
        <div class="option-description">Accept credit cards, PayPal, or other payment methods</div>
      </div>
      <div class="option" data-value="simple" data-label="Simple Content">
        <div class="option-title">📝 Simple Content</div>
        <div class="option-description">Just display information, forms, or basic interactions</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary" onclick="previousQuestion()">← Previous</button>
      <button class="btn" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 3: Experience Level -->
  <div class="quiz-section" id="section3">
    <div class="question">What's your programming experience?</div>
    <div class="question-description">Be honest - this helps us recommend the right learning path</div>
    <div class="options">
      <div class="option" data-value="beginner" data-label="Complete Beginner">
        <div class="option-title">🌱 Complete Beginner</div>
        <div class="option-description">I've never written code before, but I'm excited to learn!</div>
      </div>
      <div class="option" data-value="some" data-label="Some Experience">
        <div class="option-title">📚 Some Experience</div>
        <div class="option-description">I've done some coding tutorials or basic projects</div>
      </div>
      <div class="option" data-value="intermediate" data-label="Intermediate">
        <div class="option-title">🚀 Intermediate</div>
        <div class="option-description">I can write code and have built a few projects</div>
      </div>
      <div class="option" data-value="advanced" data-label="Advanced">
        <div class="option-title">⚡ Advanced</div>
        <div class="option-description">I'm comfortable with multiple programming languages</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary" onclick="previousQuestion()">← Previous</button>
      <button class="btn" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 4: Learning Style -->
  <div class="quiz-section" id="section4">
    <div class="question">How do you prefer to learn?</div>
    <div class="question-description">This helps us recommend the best resources for you</div>
    <div class="options">
      <div class="option" data-value="video" data-label="Video Tutorials">
        <div class="option-title">📺 Video Tutorials</div>
        <div class="option-description">I learn best by watching step-by-step video guides</div>
      </div>
      <div class="option" data-value="interactive" data-label="Interactive Courses">
        <div class="option-title">🎯 Interactive Courses</div>
        <div class="option-description">I prefer hands-on coding exercises and projects</div>
      </div>
      <div class="option" data-value="documentation" data-label="Documentation">
        <div class="option-title">📖 Documentation</div>
        <div class="option-description">I like reading official docs and learning by doing</div>
      </div>
      <div class="option" data-value="community" data-label="Community Learning">
        <div class="option-title">👥 Community Learning</div>
        <div class="option-description">I learn best through forums, Discord, and asking questions</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary" onclick="previousQuestion()">← Previous</button>
      <button class="btn" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 5: Timeline -->
  <div class="quiz-section" id="section5">
    <div class="question">How quickly do you want to see results?</div>
    <div class="question-description">This affects which tools and frameworks we recommend</div>
    <div class="options">
      <div class="option" data-value="fast" data-label="As Fast as Possible">
        <div class="option-title">⚡ As Fast as Possible</div>
        <div class="option-description">I want to build something quickly, even if it's not perfect</div>
      </div>
      <div class="option" data-value="balanced" data-label="Balanced Approach">
        <div class="option-title">⚖️ Balanced Approach</div>
        <div class="option-description">I want to learn while building something good</div>
      </div>
      <div class="option" data-value="thorough" data-label="Do It Right">
        <div class="option-title">🎯 Do It Right</div>
        <div class="option-description">I want to learn proper development practices</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary" onclick="previousQuestion()">← Previous</button>
      <button class="btn" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 6: Budget -->
  <div class="quiz-section" id="section6">
    <div class="question">What's your budget for hosting/deployment?</div>
    <div class="question-description">This helps us recommend cost-effective solutions</div>
    <div class="options">
      <div class="option" data-value="free" data-label="Free">
        <div class="option-title">💰 Free</div>
        <div class="option-description">I want to keep costs as low as possible</div>
      </div>
      <div class="option" data-value="low" data-label="Low Cost">
        <div class="option-title">💵 Low Cost</div>
        <div class="option-description">I can spend a few dollars per month</div>
      </div>
      <div class="option" data-value="flexible" data-label="Flexible">
        <div class="option-title">💎 Flexible</div>
        <div class="option-description">I can invest in better hosting and tools</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary" onclick="previousQuestion()">← Previous</button>
      <button class="btn" onclick="getRecommendation()">Get Recommendation →</button>
    </div>
  </div>

  <!-- Results Section -->
  <div class="result-section" id="resultSection">
    <div class="recommendation" id="recommendation">
      <!-- Results will be populated here -->
    </div>
    <button class="restart-btn" onclick="restartQuiz()">Start Over</button>
  </div>
</div>

<script>
let currentSection = 1;
let totalSections = 6;
let answers = {};

// Update progress bar
function updateProgress() {
  const progress = (currentSection / totalSections) * 100;
  document.getElementById('progressFill').style.width = progress + '%';
}

// Show/hide sections
function showSection(sectionNumber) {
  document.querySelectorAll('.quiz-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById('section' + sectionNumber).classList.add('active');
  updateProgress();
}

// Update selections display
function updateSelectionsDisplay() {
  const selectionsDisplay = document.getElementById('selectionsDisplay');
  const selectionTags = document.getElementById('selectionTags');
  
  if (Object.keys(answers).length > 0) {
    selectionTags.innerHTML = '';
    Object.entries(answers).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        // Handle array values (like features)
        value.forEach(val => {
          const option = document.querySelector(`[data-value="${val}"]`);
          if (option) {
            const label = option.getAttribute('data-label');
            const tag = document.createElement('span');
            tag.className = 'selection-tag';
            tag.textContent = label;
            selectionTags.appendChild(tag);
          }
        });
      } else {
        // Handle single values
        const option = document.querySelector(`[data-value="${value}"]`);
        if (option) {
          const label = option.getAttribute('data-label');
          const tag = document.createElement('span');
          tag.className = 'selection-tag';
          tag.textContent = label;
          selectionTags.appendChild(tag);
        }
      }
    });
    selectionsDisplay.classList.add('show');
  } else {
    selectionsDisplay.classList.remove('show');
  }
}

// Handle option selection
document.querySelectorAll('.option').forEach(option => {
  option.addEventListener('click', function() {
    const section = this.closest('.quiz-section');
    const isMultiSelect = section.id === 'section2'; // Features question allows multiple selections
    
    if (isMultiSelect) {
      // Toggle selection for multi-select
      this.classList.toggle('selected');
    } else {
      // Single select - remove others
      section.querySelectorAll('.option').forEach(opt => {
        opt.classList.remove('selected');
      });
      this.classList.add('selected');
    }
  });
});

function nextQuestion() {
  const currentSectionElement = document.getElementById('section' + currentSection);
  const selectedOptions = currentSectionElement.querySelectorAll('.option.selected');
  
  if (selectedOptions.length === 0) {
    alert('Please select at least one option before continuing.');
    return;
  }

  // Store the answer(s)
  const questionKey = getQuestionKey(currentSection);
  if (selectedOptions.length === 1) {
    answers[questionKey] = selectedOptions[0].dataset.value;
  } else {
    // Multiple selections
    answers[questionKey] = Array.from(selectedOptions).map(opt => opt.dataset.value);
  }

  updateSelectionsDisplay();

  if (currentSection < totalSections) {
    currentSection++;
    showSection(currentSection);
  }
}

function previousQuestion() {
  if (currentSection > 1) {
    currentSection--;
    showSection(currentSection);
    restoreSelections();
  }
}

function restoreSelections() {
  // Clear all selections first
  document.querySelectorAll('.option').forEach(option => {
    option.classList.remove('selected');
  });
  
  // Restore selections based on stored answers
  const questionKey = getQuestionKey(currentSection);
  const answer = answers[questionKey];
  
  if (answer) {
    if (Array.isArray(answer)) {
      // Restore multiple selections
      answer.forEach(val => {
        const option = document.querySelector(`[data-value="${val}"]`);
        if (option) {
          option.classList.add('selected');
        }
      });
    } else {
      // Restore single selection
      const option = document.querySelector(`[data-value="${answer}"]`);
      if (option) {
        option.classList.add('selected');
      }
    }
  }
}

function getQuestionKey(section) {
  const keys = ['projectType', 'features', 'experience', 'learningStyle', 'timeline', 'budget'];
  return keys[section - 1];
}

function getRecommendation() {
  const currentSectionElement = document.getElementById('section' + currentSection);
  const selectedOptions = currentSectionElement.querySelectorAll('.option.selected');
  
  if (selectedOptions.length === 0) {
    alert('Please select at least one option before continuing.');
    return;
  }

  // Store the final answer
  const questionKey = getQuestionKey(currentSection);
  if (selectedOptions.length === 1) {
    answers[questionKey] = selectedOptions[0].dataset.value;
  } else {
    answers[questionKey] = Array.from(selectedOptions).map(opt => opt.dataset.value);
  }

  updateSelectionsDisplay();

  // Generate recommendation based on answers
  const recommendation = generateRecommendation(answers);
  
  // Show results
  document.querySelectorAll('.quiz-section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById('resultSection').classList.add('active');
  document.getElementById('recommendation').innerHTML = recommendation;
}

function generateRecommendation(answers) {
  let recommendation = '';
  let techStack = [];
  let resources = [];
  let learningPath = [];

  // Ensure features is always an array
  const features = Array.isArray(answers.features) ? answers.features : [answers.features];

  // Analyze project type and features
  switch(answers.projectType) {
    case 'webapp':
      if (answers.experience === 'beginner') {
        // Check for specific features to recommend appropriate tools
        if (features.includes('user-auth') || features.includes('data-storage')) {
          techStack = [
            { name: 'HTML/CSS', type: 'frontend' },
            { name: 'JavaScript', type: 'frontend' },
            { name: 'React', type: 'frontend' },
            { name: 'Firebase', type: 'backend' }
          ];
          resources = [
            '<a href="https://cursor.sh" target="_blank">Cursor (AI-powered code editor)</a>',
            '<a href="https://www.w3schools.com/html/" target="_blank">W3Schools HTML Tutorial</a>',
            '<a href="https://www.w3schools.com/css/" target="_blank">W3Schools CSS Tutorial</a>',
            '<a href="https://www.w3schools.com/js/" target="_blank">W3Schools JavaScript Tutorial</a>',
            '<a href="https://www.freecodecamp.org/" target="_blank">freeCodeCamp</a>',
            '<a href="https://react.dev/" target="_blank">React Documentation</a>',
            '<a href="https://firebase.google.com/" target="_blank">Firebase</a>'
          ];
          learningPath = [
            'Learn HTML basics (structure, elements, forms)',
            'Master CSS (styling, layout, responsive design)',
            'Learn JavaScript fundamentals (variables, functions, DOM)',
            'Build simple projects with HTML/CSS/JS',
            'Learn React basics (components, props, state)',
            'Set up Firebase for backend services',
            'Build your first React + Firebase app'
          ];
          recommendation = `
            <h2>🎉 Perfect for Beginners!</h2>
            <p>You should build a <strong>React web application</strong> with Firebase as your backend. This combination is perfect for beginners because:</p>
            <ul>
              <li>React has excellent documentation and community support</li>
              <li>Firebase handles authentication, database, and hosting automatically</li>
              <li>You can deploy for free and scale as needed</li>
              <li>Lots of tutorials and examples available</li>
            </ul>
            <p><strong>💡 Pro Tip:</strong> For beginners who want something to work quickly, I highly recommend <a href="https://cursor.sh" target="_blank" style="color: var(--primary-purple); font-weight: 600;">Cursor</a> as your code editor. It's built on VS Code but with AI assistance that can help you write code, debug issues, and learn as you go!</p>
          `;
        } else {
          // Simple content - no backend needed
          techStack = [
            { name: 'HTML', type: 'frontend' },
            { name: 'CSS', type: 'frontend' },
            { name: 'JavaScript', type: 'frontend' },
            { name: 'GitHub Pages', type: 'deployment' }
          ];
          resources = [
            getRecommendationsByDifficultyWithDescriptions('beginner', 4)
          ];
          learningPath = [
            'Learn HTML basics (structure, elements)',
            'Master CSS (styling, layout, responsive design)',
            'Learn JavaScript fundamentals (variables, functions, DOM)',
            'Build your website locally',
            'Deploy to GitHub Pages for free hosting'
          ];
          recommendation = `
            <h2>🌐 Simple Website</h2>
            <p>Start with <strong>HTML, CSS, and JavaScript</strong> for a simple website. This is perfect because:</p>
            <ul>
              <li>No complex backend setup required</li>
              <li>Deploy for free on GitHub Pages</li>
              <li>Learn fundamental web technologies</li>
              <li>Easy to maintain and update</li>
            </ul>
            <p><strong>💡 Pro Tip:</strong> For beginners who want something to work quickly, I highly recommend <a href="https://cursor.sh" target="_blank" style="color: var(--primary-purple); font-weight: 600;">Cursor</a> as your code editor. It's built on VS Code but with AI assistance that can help you write code, debug issues, and learn as you go!</p>
            <p><strong>🔧 Essential Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('beginner', 3)}</p>
          `;
        }
      } else {
        // Advanced webapp recommendations based on features
        if (features.includes('real-time')) {
          techStack = [
            { name: 'Next.js', type: 'frontend' },
            { name: 'TypeScript', type: 'frontend' },
            { name: 'Socket.io', type: 'backend' },
            { name: 'PostgreSQL', type: 'database' },
            { name: 'Vercel', type: 'deployment' }
          ];
          resources = [
            getRecommendationsByDifficultyWithDescriptions('intermediate', 2),
            getRecommendationsByDifficultyWithDescriptions('expert', 2)
          ];
          learningPath = [
            'Learn TypeScript fundamentals',
            'Master Next.js (pages, routing, API routes)',
            'Set up PostgreSQL database',
            'Implement real-time features with Socket.io',
            'Deploy with Vercel'
          ];
          recommendation = `
            <h2>⚡ Real-time Web Application</h2>
            <p>Build with <strong>Next.js and Socket.io</strong> for real-time features. This stack offers:</p>
            <ul>
              <li>Real-time communication between users</li>
              <li>Server-side rendering for better performance</li>
              <li>Type safety with TypeScript</li>
              <li>Easy deployment with Vercel</li>
            </ul>
            <p><strong>🔧 Advanced Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('expert', 2)}</p>
          `;
        } else if (features.includes('payments')) {
          techStack = [
            { name: 'Next.js', type: 'frontend' },
            { name: 'TypeScript', type: 'frontend' },
            { name: 'Stripe', type: 'backend' },
            { name: 'PostgreSQL', type: 'database' },
            { name: 'Vercel', type: 'deployment' }
          ];
          resources = [
            getRecommendationsByDifficultyWithDescriptions('intermediate', 2),
            getRecommendationsByDifficultyWithDescriptions('expert', 2)
          ];
          learningPath = [
            'Learn TypeScript fundamentals',
            'Master Next.js (pages, routing, API routes)',
            'Set up PostgreSQL database',
            'Integrate Stripe for payments',
            'Deploy with Vercel'
          ];
          recommendation = `
            <h2>💳 E-commerce Web Application</h2>
            <p>Build with <strong>Next.js and Stripe</strong> for secure payments. This stack offers:</p>
            <ul>
              <li>Secure payment processing with Stripe</li>
              <li>Server-side rendering for better performance</li>
              <li>Type safety with TypeScript</li>
              <li>Easy deployment with Vercel</li>
            </ul>
            <p><strong>🔧 Advanced Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('expert', 2)}</p>
          `;
        } else {
          techStack = [
            { name: 'Next.js', type: 'frontend' },
            { name: 'TypeScript', type: 'frontend' },
            { name: 'PostgreSQL', type: 'database' },
            { name: 'Vercel', type: 'deployment' }
          ];
          resources = [
            getRecommendationsByDifficultyWithDescriptions('intermediate', 4)
          ];
          learningPath = [
            'Learn TypeScript fundamentals',
            'Master Next.js (pages, routing, API routes)',
            'Set up PostgreSQL database',
            'Learn database design principles',
            'Deploy with Vercel',
            'Add authentication and user management'
          ];
          recommendation = `
            <h2>🚀 Modern Web Development</h2>
            <p>Build with <strong>Next.js and TypeScript</strong> for a production-ready web application. This stack offers:</p>
            <ul>
              <li>Server-side rendering for better performance</li>
              <li>Type safety with TypeScript</li>
              <li>Easy deployment with Vercel</li>
              <li>Great developer experience</li>
            </ul>
            <p><strong>🔧 Recommended Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('intermediate', 3)}</p>
          `;
        }
      }
      break;

    case 'mobile':
      if (answers.experience === 'beginner') {
        techStack = [
          { name: 'React Native', type: 'frontend' },
          { name: 'Expo', type: 'deployment' },
          { name: 'Firebase', type: 'backend' }
        ];
        resources = [
          getRecommendationsByDifficultyWithDescriptions('beginner', 5)
        ];
        learningPath = [
          'Learn JavaScript fundamentals',
          'Understand React basics (if not already known)',
          'Set up Expo development environment',
          'Learn React Native components and navigation',
          'Build simple mobile UI components',
          'Integrate Firebase for backend services',
          'Test on your phone with Expo Go app'
        ];
        recommendation = `
          <h2>📱 Mobile App Made Easy!</h2>
          <p>Use <strong>React Native with Expo</strong> to build your mobile app. This is the best choice because:</p>
          <ul>
            <li>Write once, run on both iOS and Android</li>
            <li>Expo handles the complex setup for you</li>
            <li>Hot reloading for fast development</li>
            <li>Easy to test on your phone</li>
          </ul>
          <p><strong>💡 Pro Tip:</strong> For beginners who want something to work quickly, I highly recommend <a href="https://cursor.sh" target="_blank" style="color: var(--primary-purple); font-weight: 600;">Cursor</a> as your code editor. It's built on VS Code but with AI assistance that can help you write code, debug issues, and learn as you go!</p>
          <p><strong>🔧 Essential Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('beginner', 3)}</p>
        `;
      } else {
        techStack = [
          { name: 'Flutter', type: 'frontend' },
          { name: 'Dart', type: 'frontend' },
          { name: 'Firebase', type: 'backend' }
        ];
        resources = [
          getRecommendationsByDifficultyWithDescriptions('expert', 3)
        ];
        learningPath = [
          'Learn Dart programming language',
          'Set up Flutter development environment',
          'Learn Flutter widgets and state management',
          'Build UI components and navigation',
          'Integrate Firebase services',
          'Test on multiple devices',
          'Publish to app stores'
        ];
        recommendation = `
          <h2>🎯 High-Performance Mobile App</h2>
          <p>Build with <strong>Flutter</strong> for a native-feeling mobile app. Flutter offers:</p>
          <ul>
            <li>Excellent performance and smooth animations</li>
            <li>Beautiful built-in widgets</li>
            <li>Single codebase for iOS and Android</li>
            <li>Great developer tools</li>
          </ul>
          <p><strong>🔧 Expert Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('expert', 3)}</p>
        `;
      }
      break;

    case 'desktop':
      // Better desktop app recommendations based on features and experience
      if (answers.experience === 'beginner') {
        if (features.includes('simple')) {
          techStack = [
            { name: 'Tauri', type: 'frontend' },
            { name: 'HTML/CSS/JS', type: 'frontend' },
            { name: 'Rust', type: 'backend' }
          ];
          resources = [
            getRecommendationsByDifficultyWithDescriptions('expert', 2),
            getRecommendationsByDifficultyWithDescriptions('beginner', 1)
          ];
          learningPath = [
            'Learn HTML, CSS, and JavaScript basics',
            'Set up Tauri development environment',
            'Learn Rust fundamentals',
            'Build simple desktop UI with web technologies',
            'Package and distribute your app'
          ];
          recommendation = `
            <h2>💻 Lightweight Desktop App</h2>
            <p>Use <strong>Tauri</strong> for a modern, lightweight desktop application. Tauri offers:</p>
            <ul>
              <li>Much smaller file sizes than Electron</li>
              <li>Better performance and security</li>
              <li>Use web technologies you already know</li>
              <li>Cross-platform deployment</li>
            </ul>
            <p><strong>🔧 Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('expert', 2)}</p>
          `;
        } else {
          techStack = [
            { name: 'Electron', type: 'frontend' },
            { name: 'JavaScript', type: 'frontend' },
            { name: 'Node.js', type: 'backend' }
          ];
          resources = [
            getRecommendationsByDifficultyWithDescriptions('expert', 2),
            getRecommendationsByDifficultyWithDescriptions('beginner', 1)
          ];
          learningPath = [
            'Learn JavaScript fundamentals',
            'Understand Node.js basics',
            'Learn Electron framework',
            'Build simple desktop UI',
            'Add native system integration',
            'Package and distribute your app'
          ];
          recommendation = `
            <h2>💻 Cross-Platform Desktop App</h2>
            <p>Use <strong>Electron</strong> to build your desktop application. Electron allows you to:</p>
            <ul>
              <li>Build for Windows, Mac, and Linux with one codebase</li>
              <li>Use web technologies (HTML, CSS, JavaScript)</li>
              <li>Access native system features</li>
              <li>Distribute easily to users</li>
            </ul>
            <p><strong>🔧 Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('expert', 2)}</p>
          `;
        }
      } else {
        // Advanced desktop options
        if (features.includes('media') || features.includes('data-storage')) {
          techStack = [
            { name: 'Tauri', type: 'frontend' },
            { name: 'React', type: 'frontend' },
            { name: 'Rust', type: 'backend' },
            { name: 'SQLite', type: 'database' }
          ];
          resources = [
            getRecommendationsByDifficultyWithDescriptions('expert', 3),
            getRecommendationsByDifficultyWithDescriptions('intermediate', 1)
          ];
          learningPath = [
            'Learn Rust programming language',
            'Set up Tauri development environment',
            'Build UI with React',
            'Implement local data storage with SQLite',
            'Add media handling capabilities',
            'Package and distribute your app'
          ];
          recommendation = `
            <h2>🎯 High-Performance Desktop App</h2>
            <p>Build with <strong>Tauri and React</strong> for a modern, performant desktop application. This stack offers:</p>
            <ul>
              <li>Excellent performance with Rust backend</li>
              <li>Modern UI with React</li>
              <li>Local data storage with SQLite</li>
              <li>Smaller file sizes than Electron</li>
            </ul>
            <p><strong>🔧 Expert Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('expert', 3)}</p>
          `;
        } else {
          techStack = [
            { name: 'Electron', type: 'frontend' },
            { name: 'TypeScript', type: 'frontend' },
            { name: 'Node.js', type: 'backend' }
          ];
          resources = [
            getRecommendationsByDifficultyWithDescriptions('expert', 2),
            getRecommendationsByDifficultyWithDescriptions('intermediate', 1)
          ];
          learningPath = [
            'Learn TypeScript fundamentals',
            'Understand Node.js and npm',
            'Learn Electron framework',
            'Build desktop UI with TypeScript',
            'Add native system integration',
            'Package and distribute your app'
          ];
          recommendation = `
            <h2>💻 Professional Desktop App</h2>
            <p>Build with <strong>Electron and TypeScript</strong> for a robust desktop application. This combination provides:</p>
            <ul>
              <li>Type safety with TypeScript</li>
              <li>Cross-platform compatibility</li>
              <li>Access to native system features</li>
              <li>Large ecosystem of packages</li>
            </ul>
            <p><strong>🔧 Expert Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('expert', 2)}</p>
          `;
        }
      }
      break;

    case 'api':
      techStack = [
        { name: 'Node.js', type: 'backend' },
        { name: 'Express', type: 'backend' },
        { name: 'MongoDB', type: 'database' },
        { name: 'Heroku', type: 'deployment' }
      ];
      resources = [
        getRecommendationsByDifficultyWithDescriptions('intermediate', 3),
        getRecommendationsByDifficultyWithDescriptions('beginner', 1)
      ];
      learningPath = [
        'Learn JavaScript fundamentals',
        'Understand Node.js and npm',
        'Learn Express.js framework',
        'Set up MongoDB database',
        'Build RESTful API endpoints',
        'Add authentication and validation',
        'Deploy to Heroku or similar platform'
      ];
      recommendation = `
        <h2>🔌 Robust API Backend</h2>
        <p>Build your API with <strong>Node.js and Express</strong>. This combination provides:</p>
        <ul>
          <li>Fast development with JavaScript</li>
          <li>Excellent ecosystem of packages</li>
          <li>Easy to deploy and scale</li>
          <li>Great for real-time features</li>
        </ul>
        <p><strong>🔧 Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('intermediate', 3)}</p>
      `;
      break;

    case 'game':
      if (answers.experience === 'beginner') {
        techStack = [
          { name: 'HTML5 Canvas', type: 'frontend' },
          { name: 'JavaScript', type: 'frontend' },
          { name: 'Phaser.js', type: 'frontend' }
        ];
        resources = [
          getRecommendationsByDifficultyWithDescriptions('beginner', 3)
        ];
        learningPath = [
          'Learn JavaScript fundamentals',
          'Understand HTML5 Canvas basics',
          'Learn Phaser.js game framework',
          'Create simple game sprites and animations',
          'Add game physics and collision detection',
          'Implement game logic and scoring',
          'Deploy your game online'
        ];
        recommendation = `
          <h2>🎮 Web-Based Game</h2>
          <p>Start with <strong>HTML5 Canvas and Phaser.js</strong> for your game. This approach offers:</p>
          <ul>
            <li>No installation required for players</li>
            <li>Phaser.js handles game physics and sprites</li>
            <li>Easy to share and distribute</li>
            <li>Works on all devices with a browser</li>
          </ul>
          <p><strong>🔧 Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('beginner', 3)}</p>
        `;
      } else {
        techStack = [
          { name: 'Unity', type: 'frontend' },
          { name: 'C#', type: 'frontend' },
          { name: 'Steam', type: 'deployment' }
        ];
        resources = [
          getRecommendationsByDifficultyWithDescriptions('expert', 3)
        ];
        learningPath = [
          'Learn C# programming basics',
          'Download and set up Unity',
          'Learn Unity interface and workflow',
          'Create 3D models and animations',
          'Implement game mechanics and physics',
          'Add sound effects and music',
          'Test and optimize performance',
          'Publish on Steam or other platforms'
        ];
        recommendation = `
          <h2>🎮 Professional Game Development</h2>
          <p>Use <strong>Unity and C#</strong> for professional game development. Unity provides:</p>
          <ul>
            <li>Powerful 3D and 2D game engine</li>
            <li>Extensive asset store and community</li>
            <li>Cross-platform deployment</li>
            <li>Professional-grade tools and features</li>
          </ul>
          <p><strong>🔧 Expert Tools:</strong> ${getRecommendationsByDifficultyWithDescriptions('expert', 3)}</p>
        `;
      }
      break;
  }

  // Add tech stack display
  if (techStack.length > 0) {
    recommendation += `
      <div class="tech-stack">
        ${techStack.map(tech => `<span class="tech-tag ${tech.type}">${tech.name}</span>`).join('')}
      </div>
    `;
  }

  // Add learning path
  if (learningPath.length > 0) {
    recommendation += `
      <div class="learning-path">
        <h3>📚 Learning Path</h3>
        <ol class="step-list">
          ${learningPath.map(step => `<li>${step}</li>`).join('')}
        </ol>
      </div>
    `;
  }

  // Add resources
  if (resources.length > 0) {
    recommendation += `
      <div class="resources">
        <h3>🔗 Learning Resources</h3>
        <ul class="resource-list">
          ${resources.map(resource => `<li>${resource}</li>`).join('')}
        </ul>
      </div>
    `;
  }

  return recommendation;
}

function restartQuiz() {
  currentSection = 1;
  answers = {};
  document.querySelectorAll('.option').forEach(option => {
    option.classList.remove('selected');
  });
  document.getElementById('resultSection').classList.remove('active');
  document.getElementById('selectionsDisplay').classList.remove('show');
  showSection(1);
}

// Initialize
updateProgress();

// Website database for recommendations
const websiteDatabase = {
    beginner: [
        { name: "Cursor", url: "https://cursor.sh", description: "AI-powered code editor", functions: ["code-editor", "ai-assistance", "debugging", "learning", "chat", "code-generation", "refactoring", "explanation"] },
        { name: "W3Schools", url: "https://www.w3schools.com", description: "Web development tutorials", functions: ["learning", "tutorials", "reference", "examples", "html", "css", "javascript", "sql", "python", "php"] },
        { name: "freeCodeCamp", url: "https://www.freecodecamp.org", description: "Free coding tutorials", functions: ["learning", "interactive-tutorials", "certification", "projects", "html-css", "javascript", "react", "nodejs", "databases"] },
        { name: "GitHub", url: "https://github.com", description: "Code hosting and collaboration", functions: ["code-storage", "version-control", "collaboration", "project-management", "open-source", "deployment", "ci-cd", "code-review"] },
        { name: "Figma", url: "https://www.figma.com", description: "Design and prototyping tool", functions: ["design", "prototyping", "collaboration", "ui-ux", "wireframing", "design-systems", "components", "plugins"] },
        { name: "Notion", url: "https://www.notion.so", description: "All-in-one workspace", functions: ["note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"] },
        { name: "Wisk", url: "https://wisk.cc", description: "Modern Notion alternative", functions: ["note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"] },
        { name: "Firebase", url: "https://firebase.google.com", description: "Backend-as-a-Service", functions: ["backend-as-a-service", "authentication", "database", "hosting", "cloud-functions", "analytics", "messaging", "storage"] },
        { name: "Netlify", url: "https://netlify.com", description: "Web hosting and deployment", functions: ["deployment", "hosting", "forms", "cms", "functions", "redirects", "headers", "build-tools"] },
        { name: "CodePen", url: "https://codepen.io", description: "Frontend code playground", functions: ["code-editor", "frontend", "css", "javascript", "html", "inspiration", "showcase", "learning"] },
        { name: "Glitch", url: "https://glitch.com", description: "Friendly coding community", functions: ["code-editor", "deployment", "collaboration", "learning", "web-development", "javascript", "nodejs", "community"] },
        { name: "Replit", url: "https://replit.com", description: "Collaborative browser IDE", functions: ["code-editor", "deployment", "collaboration", "learning", "web-development", "python", "javascript", "education"] }
    ],
    intermediate: [
        { name: "MDN Web Docs", url: "https://developer.mozilla.org", description: "Comprehensive web documentation", functions: ["documentation", "reference", "tutorials", "web-standards", "html", "css", "javascript", "apis", "web-apis"] },
        { name: "React Documentation", url: "https://react.dev", description: "Official React docs", functions: ["documentation", "tutorials", "examples", "reference", "react", "hooks", "components", "state-management"] },
        { name: "Vue.js", url: "https://vuejs.org", description: "Progressive JavaScript framework", functions: ["framework", "documentation", "tutorials", "examples", "vue", "components", "composition-api", "ecosystem"] },
        { name: "TypeScript", url: "https://www.typescriptlang.org", description: "Typed JavaScript", functions: ["programming-language", "type-safety", "documentation", "compiler", "javascript", "static-analysis", "ide-support", "refactoring"] },
        { name: "Vercel", url: "https://vercel.com", description: "Frontend deployment platform", functions: ["deployment", "hosting", "serverless", "ci-cd", "edge-functions", "domains", "analytics", "preview-deployments"] },
        { name: "Expo", url: "https://expo.dev", description: "React Native platform", functions: ["mobile-development", "react-native", "deployment", "testing", "sdk", "cli", "ejected", "managed-workflow"] },
        { name: "Stripe", url: "https://stripe.com", description: "Payment processing", functions: ["payments", "e-commerce", "api", "security", "subscriptions", "invoicing", "taxes", "fraud-prevention"] },
        { name: "MongoDB", url: "https://www.mongodb.com", description: "Document database", functions: ["database", "nosql", "data-storage", "scalability", "aggregation", "indexing", "replication", "sharding"] },
        { name: "Node.js", url: "https://nodejs.org", description: "JavaScript runtime", functions: ["runtime", "server-side", "npm", "javascript", "event-driven", "non-blocking", "package-management", "ecosystem"] },
        { name: "Express.js", url: "https://expressjs.com", description: "Web framework for Node.js", functions: ["web-framework", "api", "middleware", "routing", "nodejs", "http-server", "static-files", "templating"] },
        { name: "Next.js", url: "https://nextjs.org", description: "React framework for production", functions: ["react-framework", "ssr", "ssg", "routing", "api-routes", "image-optimization", "performance", "deployment"] },
        { name: "Tailwind CSS", url: "https://tailwindcss.com", description: "Utility-first CSS framework", functions: ["css-framework", "utility-classes", "responsive-design", "customization", "components", "dark-mode", "purge-css", "jit-compiler"] },
        { name: "Git", url: "https://git-scm.com", description: "Version control system", functions: ["version-control", "collaboration", "branching", "history", "merging", "stashing", "rebase", "hooks"] },
        { name: "Postman", url: "https://www.postman.com", description: "API development platform", functions: ["api", "testing", "development", "documentation", "collections", "environments", "automation", "collaboration"] },
        { name: "Can I Use", url: "https://caniuse.com", description: "Browser compatibility tables", functions: ["browser-support", "compatibility", "reference", "web-standards", "css", "javascript", "html", "apis"] },
        { name: "Web.dev", url: "https://web.dev", description: "Modern web development guide", functions: ["web-development", "performance", "pwa", "accessibility", "seo", "best-practices", "tutorials", "analysis"] }
    ],
    expert: [
        { name: "Angular", url: "https://angular.io", description: "Full-featured framework", functions: ["framework", "documentation", "tutorials", "cli-tools", "typescript", "dependency-injection", "routing", "forms"] },
        { name: "Flutter", url: "https://flutter.dev", description: "Cross-platform UI toolkit", functions: ["mobile-development", "cross-platform", "ui-framework", "hot-reload", "dart", "widgets", "state-management", "packages"] },
        { name: "Socket.io", url: "https://socket.io", description: "Real-time communication", functions: ["real-time", "websockets", "communication", "api", "chat", "gaming", "collaboration", "live-updates"] },
        { name: "PostgreSQL", url: "https://www.postgresql.org", description: "Advanced database", functions: ["database", "sql", "data-storage", "scalability", "acid-compliance", "json-support", "full-text-search", "extensions"] },
        { name: "Tauri", url: "https://tauri.app", description: "Desktop app framework", functions: ["desktop-apps", "cross-platform", "performance", "security", "rust", "webview", "native-apis", "bundling"] },
        { name: "Electron", url: "https://www.electronjs.org", description: "Cross-platform desktop apps", functions: ["desktop-apps", "cross-platform", "web-technologies", "packaging", "distribution", "auto-updater", "native-modules", "chromium"] },
        { name: "Docker", url: "https://www.docker.com", description: "Containerization platform", functions: ["containerization", "deployment", "devops", "microservices", "orchestration", "images", "volumes", "networking"] },
        { name: "AWS", url: "https://aws.amazon.com", description: "Cloud computing platform", functions: ["cloud-computing", "hosting", "storage", "ai-ml", "serverless", "containers", "databases", "security"] },
        { name: "Google Cloud", url: "https://cloud.google.com", description: "Cloud computing services", functions: ["cloud-computing", "hosting", "storage", "ai-ml", "kubernetes", "bigquery", "firestore", "functions"] },
        { name: "Unity", url: "https://unity.com", description: "Game development platform", functions: ["game-development", "3d", "2d", "cross-platform", "physics", "animation", "audio", "asset-store"] },
        { name: "Unreal Engine", url: "https://www.unrealengine.com", description: "3D creation tool", functions: ["game-development", "3d", "visualization", "vr-ar", "blueprints", "materials", "lighting", "cinematics"] }
    ]
};

function getRecommendationsByDifficulty(difficulty, count = 3) {
    const websites = websiteDatabase[difficulty] || [];
    return websites.slice(0, count).map(site => 
        `<a href="${site.url}" target="_blank">${site.name}</a>`
    ).join(', ');
}

function getRecommendationsByDifficultyWithDescriptions(difficulty, count = 3) {
    const websites = websiteDatabase[difficulty] || [];
    return websites.slice(0, count).map(site => 
        `<a href="${site.url}" target="_blank" title="${site.description}">${site.name}</a>`
    ).join(', ');
}

function getRecommendationsByFunction(functionType, userDifficulty, count = 3) {
    const allWebsites = [
        ...websiteDatabase.beginner,
        ...websiteDatabase.intermediate,
        ...websiteDatabase.expert
    ];
    
    const matchingWebsites = allWebsites.filter(site => 
        site.functions && site.functions.includes(functionType)
    );
    
    // Sort by difficulty preference
    const difficultyOrder = userDifficulty === 'beginner' ? ['beginner', 'intermediate', 'expert'] :
                           userDifficulty === 'intermediate' ? ['intermediate', 'beginner', 'expert'] :
                           ['expert', 'intermediate', 'beginner'];
    
    const sortedWebsites = matchingWebsites.sort((a, b) => {
        const aIndex = difficultyOrder.indexOf(a.difficulty);
        const bIndex = difficultyOrder.indexOf(b.difficulty);
        return aIndex - bIndex;
    });
    
    return sortedWebsites.slice(0, count).map(site => 
        `<a href="${site.url}" target="_blank" title="${site.description}">${site.name}</a>`
    ).join(', ');
}

function getDifficultyWarning(userDifficulty, requiredDifficulty) {
    if (userDifficulty === 'beginner' && requiredDifficulty === 'expert') {
        return '<div style="background: #fef3c7; border: 1px solid #f59e0b; border-radius: 10px; padding: 15px; margin: 15px 0; color: #92400e;"><strong>⚠️ Difficulty Warning:</strong> This project requires expert-level skills. You\'ll need to learn significantly more than just "vibe coding" to complete it successfully. Consider starting with a simpler project first!</div>';
    } else if (userDifficulty === 'beginner' && requiredDifficulty === 'intermediate') {
        return '<div style="background: #dbeafe; border: 1px solid #3b82f6; border-radius: 10px; padding: 15px; margin: 15px 0; color: #1e40af;"><strong>💡 Learning Opportunity:</strong> This project is slightly more advanced than your current level, but definitely achievable with some learning!</div>';
    }
    return '';
}

// Cookie management
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

// Theme management
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  
  // Update active button
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.classList.remove('active');
  });
  document.querySelector(`[data-theme="${theme}"]`).classList.add('active');
  
  // Save theme preference if cookies are accepted
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
    }
  } else {
    // Set default theme to "c" if no cookies
    setTheme('c');
  }
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

document.addEventListener('DOMContentLoaded', function() {
  // Show cookie consent if needed
  showCookieConsent();
  
  // Load saved theme (only if cookies are accepted)
  loadTheme();
  
  // Gear button click handler
  document.getElementById('gearButton').addEventListener('click', function() {
    const themeSwitcher = document.querySelector('.theme-switcher');
    themeSwitcher.classList.toggle('show');
  });
  
  // Theme button click handlers
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });
  
  // Initialize quiz
  initializeQuiz();
});
</script> 