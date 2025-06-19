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
      const option = document.querySelector(`[data-value="${value}"]`);
      if (option) {
        const label = option.getAttribute('data-label');
        const tag = document.createElement('span');
        tag.className = 'selection-tag';
        tag.textContent = label;
        selectionTags.appendChild(tag);
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

  // Analyze project type
  switch(answers.projectType) {
    case 'webapp':
      if (answers.experience === 'beginner') {
        techStack = [
          { name: 'HTML/CSS', type: 'frontend' },
          { name: 'JavaScript', type: 'frontend' },
          { name: 'React', type: 'frontend' },
          { name: 'Firebase', type: 'backend' }
        ];
        resources = [
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
        `;
      } else {
        techStack = [
          { name: 'Next.js', type: 'frontend' },
          { name: 'TypeScript', type: 'frontend' },
          { name: 'PostgreSQL', type: 'database' },
          { name: 'Vercel', type: 'deployment' }
        ];
        resources = [
          '<a href="https://nextjs.org/" target="_blank">Next.js</a>',
          '<a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>',
          '<a href="https://vercel.com/" target="_blank">Vercel</a>',
          '<a href="https://www.postgresql.org/docs/" target="_blank">PostgreSQL Documentation</a>'
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
        `;
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
          '<a href="https://expo.dev/" target="_blank">Expo</a>',
          '<a href="https://reactnative.dev/" target="_blank">React Native</a>',
          '<a href="https://firebase.google.com/" target="_blank">Firebase</a>',
          '<a href="https://www.w3schools.com/js/" target="_blank">W3Schools JavaScript Tutorial</a>'
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
        `;
      } else {
        techStack = [
          { name: 'Flutter', type: 'frontend' },
          { name: 'Dart', type: 'frontend' },
          { name: 'Firebase', type: 'backend' }
        ];
        resources = [
          '<a href="https://flutter.dev/" target="_blank">Flutter</a>',
          '<a href="https://dart.dev/" target="_blank">Dart</a>',
          '<a href="https://firebase.google.com/" target="_blank">Firebase</a>'
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
        `;
      }
      break;

    case 'desktop':
      techStack = [
        { name: 'Electron', type: 'frontend' },
        { name: 'JavaScript', type: 'frontend' },
        { name: 'Node.js', type: 'backend' }
      ];
      resources = [
        '<a href="https://www.electronjs.org/" target="_blank">Electron</a>',
        '<a href="https://nodejs.org/" target="_blank">Node.js</a>',
        '<a href="https://www.w3schools.com/js/" target="_blank">W3Schools JavaScript Tutorial</a>'
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
      `;
      break;

    case 'api':
      techStack = [
        { name: 'Node.js', type: 'backend' },
        { name: 'Express', type: 'backend' },
        { name: 'MongoDB', type: 'database' },
        { name: 'Heroku', type: 'deployment' }
      ];
      resources = [
        '<a href="https://nodejs.org/" target="_blank">Node.js</a>',
        '<a href="https://expressjs.com/" target="_blank">Express</a>',
        '<a href="https://www.mongodb.com/" target="_blank">MongoDB</a>',
        '<a href="https://www.w3schools.com/js/" target="_blank">W3Schools JavaScript Tutorial</a>'
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
          '<a href="https://phaser.io/" target="_blank">Phaser.js</a>',
          '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" target="_blank">HTML5 Canvas</a>',
          '<a href="https://www.w3schools.com/js/" target="_blank">W3Schools JavaScript Tutorial</a>'
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
        `;
      } else {
        techStack = [
          { name: 'Unity', type: 'frontend' },
          { name: 'C#', type: 'frontend' },
          { name: 'Steam', type: 'deployment' }
        ];
        resources = [
          '<a href="https://unity.com/" target="_blank">Unity</a>',
          '<a href="https://docs.unity3d.com/" target="_blank">Unity Documentation</a>',
          '<a href="https://docs.microsoft.com/en-us/dotnet/csharp/" target="_blank">C# Documentation</a>'
        ];
        learningPath = [
          'Learn C# programming basics',
          'Download and set up Unity',
          'Learn Unity interface and workflow',
          'Create game objects and scenes',
          'Write C# scripts for game logic',
          'Add audio, effects, and UI',
          'Build and test your game'
        ];
        recommendation = `
          <h2>🎯 Professional Game Development</h2>
          <p>Use <strong>Unity</strong> for a professional game. Unity provides:</p>
          <ul>
            <li>Powerful 3D and 2D game engine</li>
            <li>Extensive asset store</li>
            <li>Cross-platform deployment</li>
            <li>Large community and tutorials</li>
          </ul>
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
</script> 