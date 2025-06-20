---
layout: page
title: How to Do That
permalink: /howtodothat/
---

<style>
{% include themes.css %}

:root {
  /* Spacing & Sizing */
  --container-width: 900px;
  --padding-large: 30px;
  --padding-medium: 20px;
  --padding-small: 15px;
  --border-radius-large: 20px;
  --border-radius-medium: 15px;
  --gradient-primary: linear-gradient(135deg, var(--accent), var(--primary-pink, var(--accent)));
  --gradient-secondary: linear-gradient(135deg, var(--accent-blue, var(--accent)), var(--accent-green, var(--accent)));
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding-top: 80px;
  background: var(--bg-primary);
  min-height: 100vh;
  color: var(--text-primary);
  transition: background 0.3s ease, color 0.3s ease;
}

.container {
  max-width: var(--container-width);
  margin: 0 auto;
  padding: var(--padding-large);
  border-radius: var(--border-radius-large);
  position: relative;
}

/* Glass Effect */
.glass-effect {
  background: var(--glass-bg);
  backdrop-filter: blur(20px);
  -webkit-backdrop-filter: blur(20px);
  border: 1px solid var(--glass-border);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.2);
}

/* Progress Bar */
.progress-bar {
  width: 100%;
  height: 6px;
  background: var(--bg-accent);
  border-radius: 3px;
  margin-bottom: 30px;
  overflow: hidden;
  position: relative;
}

.progress-fill {
  height: 100%;
  background: var(--gradient-primary);
  border-radius: 3px;
  transition: width 0.3s ease;
  position: relative;
}

.progress-fill::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
  animation: shimmer 2s infinite;
}

@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: var(--accent);
  margin-bottom: 10px;
  font-weight: 700;
}

.header p {
  color: var(--text-secondary);
}

.selections-display {
  padding: var(--padding-medium);
  margin-bottom: 30px;
  display: none;
  border-radius: var(--border-radius-medium);
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
  padding: var(--padding-medium);
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  border-radius: var(--border-radius-medium);
  border: 1px solid transparent;
}

.option:hover {
  border-color: var(--accent);
  background: var(--bg-accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1), 0 0 0 1px var(--accent);
}

.option.selected {
  border-color: var(--accent);
  background: var(--bg-accent);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1), 0 0 0 2px var(--accent);
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
  align-items: center;
  margin-top: 30px;
}

.nav-btn, .btn, .restart-btn {
  color: var(--text-primary);
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: 1px solid transparent;
}

.nav-btn:hover, .btn:hover, .restart-btn:hover {
  background: var(--gradient-primary);
  color: var(--text-white);
  border-color: var(--accent);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.15);
}

.nav-btn:disabled, .btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.restart-btn {
  background: var(--gradient-primary);
  color: var(--text-white);
  margin-top: 20px;
}

.results {
  text-align: center;
  margin-top: 30px;
}

.results h2 {
  color: var(--accent);
  margin-bottom: 20px;
  font-size: 24px;
}

.recommendation {
  padding: 25px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  border-radius: var(--border-radius-medium);
}

.recommendation:hover {
  border-color: var(--accent);
  transform: translateY(-2px);
}

.recommendation h3 {
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 18px;
}

.recommendation p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 15px;
}

.recommendation-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 15px;
}

.recommendation-tag {
  background: var(--gradient-primary);
  color: var(--text-white);
  padding: 4px 12px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
}

.recommendation-link {
  display: inline-block;
  background: var(--gradient-secondary);
  color: var(--text-white);
  text-decoration: none;
  padding: 8px 16px;
  border-radius: 20px;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.recommendation-link:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.1);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 25px 20px;
  }
  .question { font-size: 18px; }
  .option { padding: 15px; }
  .navigation { flex-direction: column; gap: 15px; }
  .nav-btn, .btn { width: 100%; }
}

@media (max-width: 480px) {
  .container { padding: 20px 15px; }
  .header h1 { font-size: 1.8rem; }
  .question { font-size: 16px; }
  .option { padding: 12px; }
  .recommendation { padding: 20px; }
}

</style>


<div class="container glass-effect">
  <div class="header">
    <h1>How to Do That?</h1>
    <p>Let's figure out the best way to build your project!</p>
  </div>

  <div class="progress-bar">
    <div class="progress-fill" id="progressFill"></div>
  </div>

  <!-- Selections Display -->
  <div class="selections-display glass-effect" id="selectionsDisplay">
    <h3>Your Selections:</h3>
    <div class="selection-tags" id="selectionTags"></div>
  </div>

  <!-- Question 1: Project Type -->
  <div class="quiz-section active" id="section1">
    <div class="question">I want to create a...</div>
    <div class="question-description">Choose the type of project you want to build</div>
    <div class="options">
      <div class="option glass-effect" data-value="webapp" data-label="Web Application">
        <div class="option-title">Web Application</div>
        <div class="option-description">A website that users can interact with, like a social media platform, e-commerce site, or online tool</div>
      </div>
      <div class="option glass-effect" data-value="mobile" data-label="Mobile App">
        <div class="option-title">Mobile App</div>
        <div class="option-description">An app for smartphones and tablets, like Instagram, a productivity app, or a game</div>
      </div>
      <div class="option glass-effect" data-value="desktop" data-label="Desktop Application">
        <div class="option-title">Desktop Application</div>
        <div class="option-description">Software that runs on computers, like a photo editor, game, or productivity tool</div>
      </div>
      <div class="option glass-effect" data-value="api" data-label="API/Backend Service">
        <div class="option-title">API/Backend Service</div>
        <div class="option-description">A service that provides data or functionality to other applications</div>
      </div>
      <div class="option glass-effect" data-value="game" data-label="Game">
        <div class="option-title">Game</div>
        <div class="option-description">An interactive game, either web-based, mobile, or desktop</div>
      </div>
    </div>
    <div class="navigation">
      <div></div>
      <button class="btn glass-effect" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 2: Features -->
  <div class="quiz-section" id="section2">
    <div class="question">It should be able to...</div>
    <div class="question-description">Select all the features your project needs (you can choose multiple)</div>
    <div class="options">
      <div class="option glass-effect" data-value="user-auth" data-label="User Accounts & Login">
        <div class="option-title">User Accounts & Login</div>
        <div class="option-description">Let users create accounts, log in, and manage their profiles</div>
      </div>
      <div class="option glass-effect" data-value="data-storage" data-label="Store Data">
        <div class="option-title">Store Data</div>
        <div class="option-description">Save and retrieve information like user data, posts, or files</div>
      </div>
      <div class="option glass-effect" data-value="real-time" data-label="Real-time Updates">
        <div class="option-title">Real-time Updates</div>
        <div class="option-description">Update information instantly, like chat messages or live data</div>
      </div>
      <div class="option glass-effect" data-value="media" data-label="Handle Media">
        <div class="option-title">Handle Media</div>
        <div class="option-description">Upload, process, and display images, videos, or audio files</div>
      </div>
      <div class="option glass-effect" data-value="payments" data-label="Process Payments">
        <div class="option-title">Process Payments</div>
        <div class="option-description">Accept credit cards, PayPal, or other payment methods</div>
      </div>
      <div class="option glass-effect" data-value="simple" data-label="Simple Content">
        <div class="option-title">Simple Content</div>
        <div class="option-description">Just display information, forms, or basic interactions</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary glass-effect" onclick="previousQuestion()">← Previous</button>
      <button class="btn glass-effect" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 3: What You Need to Build -->
  <div class="quiz-section" id="section3">
    <div class="question">What do you need to build?</div>
    <div class="question-description">This helps us determine the right difficulty level for you</div>
    <div class="options">
      <div class="option glass-effect" data-value="drag-drop" data-label="Drag & Drop Tools">
        <div class="option-title">Drag & Drop Tools</div>
        <div class="option-description">I want to use visual builders like Figma, Webflow, or no-code platforms</div>
      </div>
      <div class="option glass-effect" data-value="html-css" data-label="HTML/CSS Websites">
        <div class="option-title">HTML/CSS Websites</div>
        <div class="option-description">I want to learn HTML and CSS to build static websites</div>
      </div>
      <div class="option glass-effect" data-value="programming" data-label="Learn Programming Languages">
        <div class="option-title">Learn Programming Languages</div>
        <div class="option-description">I want to learn JavaScript, Python, or other programming languages</div>
      </div>
      <div class="option glass-effect" data-value="build-systems" data-label="Build Complex Systems">
        <div class="option-title">Build Complex Systems</div>
        <div class="option-description">I want to build full applications, APIs, databases, or complex features</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary glass-effect" onclick="previousQuestion()">← Previous</button>
      <button class="btn glass-effect" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 4: Learning Style -->
  <div class="quiz-section" id="section4">
    <div class="question">How do you prefer to learn?</div>
    <div class="question-description">This helps us recommend the best resources for you</div>
    <div class="options">
      <div class="option glass-effect" data-value="video" data-label="Video Tutorials">
        <div class="option-title">Video Tutorials</div>
        <div class="option-description">I learn best by watching step-by-step video guides</div>
      </div>
      <div class="option glass-effect" data-value="interactive" data-label="Interactive Courses">
        <div class="option-title">Interactive Courses</div>
        <div class="option-description">I prefer hands-on coding exercises and projects</div>
      </div>
      <div class="option glass-effect" data-value="documentation" data-label="Documentation">
        <div class="option-title">Documentation</div>
        <div class="option-description">I like reading official docs and learning by doing</div>
      </div>
      <div class="option glass-effect" data-value="community" data-label="Community Learning">
        <div class="option-title">Community Learning</div>
        <div class="option-description">I learn best through forums, Discord, and asking questions</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary glass-effect" onclick="previousQuestion()">← Previous</button>
      <button class="btn glass-effect" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 5: Timeline -->
  <div class="quiz-section" id="section5">
    <div class="question">How quickly do you want to see results?</div>
    <div class="question-description">This affects which tools and frameworks we recommend</div>
    <div class="options">
      <div class="option glass-effect" data-value="fast" data-label="As Fast as Possible">
        <div class="option-title">As Fast as Possible</div>
        <div class="option-description">I want to build something quickly, even if it's not perfect</div>
      </div>
      <div class="option glass-effect" data-value="balanced" data-label="Balanced Approach">
        <div class="option-title">Balanced Approach</div>
        <div class="option-description">I want to learn while building something good</div>
      </div>
      <div class="option glass-effect" data-value="thorough" data-label="Do It Right">
        <div class="option-title">Do It Right</div>
        <div class="option-description">I want to learn proper development practices</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary glass-effect" onclick="previousQuestion()">← Previous</button>
      <button class="btn glass-effect" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 6: Budget -->
  <div class="quiz-section" id="section6">
    <div class="question">What's your budget for hosting/deployment?</div>
    <div class="question-description">This helps us recommend cost-effective solutions</div>
    <div class="options">
      <div class="option glass-effect" data-value="free" data-label="Free">
        <div class="option-title">Free</div>
        <div class="option-description">I want to keep costs as low as possible</div>
      </div>
      <div class="option glass-effect" data-value="low" data-label="Low Cost">
        <div class="option-title">Low Cost</div>
        <div class="option-description">I can spend a few dollars per month</div>
      </div>
      <div class="option glass-effect" data-value="flexible" data-label="Flexible">
        <div class="option-title">Flexible</div>
        <div class="option-description">I can invest in better hosting and tools</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary glass-effect" onclick="previousQuestion()">← Previous</button>
      <button class="btn glass-effect" onclick="getRecommendation()">Get Recommendation →</button>
    </div>
  </div>

  <!-- Results Section -->
  <div class="result-section" id="resultSection">
    <div class="recommendation glass-effect" id="recommendation">
      <!-- Results will be populated here -->
    </div>
    <button class="restart-btn" onclick="restartQuiz()">Start Over</button>
  </div>
</div>

<script>
// --- QUIZ LOGIC ---
let currentSection = 1;
let totalSections = 6;
let answers = {};

function updateProgress() {
  const progress = (currentSection / totalSections) * 100;
  const progressFill = document.getElementById('progressFill');
  if(progressFill) {
    progressFill.style.width = progress + '%';
  }
}

function showSection(sectionNumber) {
  document.querySelectorAll('.quiz-section').forEach(section => {
    section.classList.remove('active');
  });
  const nextSection = document.getElementById('section' + sectionNumber);
  if (nextSection) {
    nextSection.classList.add('active');
  }
  updateProgress();
}

function updateSelectionsDisplay() {
  const selectionsDisplay = document.getElementById('selectionsDisplay');
  const selectionTags = document.getElementById('selectionTags');
  
  if (Object.keys(answers).length > 0 && selectionTags) {
    selectionTags.innerHTML = '';
    Object.entries(answers).forEach(([key, value]) => {
      if (Array.isArray(value)) {
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
  } else if (selectionsDisplay) {
    selectionsDisplay.classList.remove('show');
  }
}

function nextQuestion() {
  const currentSectionElement = document.getElementById('section' + currentSection);
  const selectedOptions = currentSectionElement.querySelectorAll('.option.selected');
  
  if (selectedOptions.length === 0) {
    alert('Please select at least one option before continuing.');
    return;
  }

  const questionKey = getQuestionKey(currentSection);
  if (currentSectionElement.id === 'section2') { // Multi-select
    answers[questionKey] = Array.from(selectedOptions).map(opt => opt.dataset.value);
  } else { // Single-select
    answers[questionKey] = selectedOptions[0].dataset.value;
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
    // No need to restore selections, they are preserved.
  }
}

function getQuestionKey(section) {
  const keys = ['projectType', 'features', 'buildType', 'learningStyle', 'timeline', 'budget'];
  return keys[section - 1];
}

function getRecommendation() {
  const currentSectionElement = document.getElementById('section' + currentSection);
  const selectedOptions = currentSectionElement.querySelectorAll('.option.selected');
  
  if (selectedOptions.length === 0) {
    alert('Please select at least one option before continuing.');
    return;
  }

  const questionKey = getQuestionKey(currentSection);
  answers[questionKey] = selectedOptions[0].dataset.value;
  updateSelectionsDisplay();

  const recommendation = generateRecommendation(answers);
  
  document.querySelectorAll('.quiz-section').forEach(section => {
    section.classList.remove('active');
  });
  const resultSection = document.getElementById('resultSection');
  const recommendationEl = document.getElementById('recommendation');
  if(resultSection && recommendationEl) {
    resultSection.style.display = 'block';
    recommendationEl.innerHTML = recommendation;
  }
}

function generateRecommendation(answers) {
  // This function can be expanded with the original complex logic if needed.
  let recommendation = '<h3>Recommendation based on your answers:</h3>';
  recommendation += `<pre>${JSON.stringify(answers, null, 2)}</pre>`;
  return recommendation;
}

function restartQuiz() {
  currentSection = 1;
  answers = {};
  document.querySelectorAll('.option').forEach(option => {
    option.classList.remove('selected');
  });
  const resultSection = document.getElementById('resultSection');
  if(resultSection) {
    resultSection.style.display = 'none';
  }
  const selectionsDisplay = document.getElementById('selectionsDisplay');
  if(selectionsDisplay) {
    selectionsDisplay.classList.remove('show');
  }
  showSection(1);
}

// --- THEME SWITCHER & COOKIE LOGIC ---

function setTheme(theme) {
  const body = document.body;
  const docEl = document.documentElement;
  docEl.setAttribute('data-theme', theme);

  const isDark = ['c', 'r', 'n', 'dark'].includes(theme);
  
  if (isDark) {
    body.setAttribute('data-theme-mode', 'dark');
  } else {
    body.removeAttribute('data-theme-mode');
  }

  if (getCookie('cookiesAccepted') === 'true') {
    setCookie('theme', theme, 365);
  }
}

function loadTheme() {
  const defaultTheme = 'a'; // Aurora
  let theme = defaultTheme;

  if (getCookie('cookiesAccepted') === 'true') {
    theme = getCookie('theme') || defaultTheme;
  }
  setTheme(theme);
}

function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie = name + "=" + (value || "") + expires + "; path=/";
}

function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') c = c.substring(1, c.length);
    if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
  }
  return null;
}

document.addEventListener('DOMContentLoaded', function() {
  loadTheme();
  updateProgress();
  
  document.querySelectorAll('.option').forEach(option => {
    option.addEventListener('click', function() {
      const section = this.closest('.quiz-section');
      const isMultiSelect = section.id === 'section2';
      
      if (isMultiSelect) {
        this.classList.toggle('selected');
      } else {
        section.querySelectorAll('.option').forEach(opt => {
          opt.classList.remove('selected');
        });
        this.classList.add('selected');
      }
    });
  });
});
</script> 