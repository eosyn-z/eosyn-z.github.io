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
  
  /* 3D Glass Effects */
  --glass-emboss-outer: rgba(255, 255, 255, 0.8);
  --glass-emboss-inner: rgba(0, 0, 0, 0.2);
  --glass-emboss-gap: rgba(0, 0, 0, 0.1);
  --glass-chromatic-red: rgba(255, 0, 0, 0.1);
  --glass-chromatic-blue: rgba(0, 0, 255, 0.1);
  --glass-chromatic-green: rgba(0, 255, 0, 0.1);
  --glass-emboss-gradient: linear-gradient(145deg, 
    rgba(255, 255, 255, 0.4) 0%, 
    rgba(255, 255, 255, 0.1) 30%, 
    rgba(0, 0, 0, 0.05) 70%, 
    rgba(0, 0, 0, 0.1) 100%);
  --glass-emboss-inner-gradient: linear-gradient(145deg, 
    rgba(0, 0, 0, 0.1) 0%, 
    rgba(0, 0, 0, 0.05) 30%, 
    rgba(255, 255, 255, 0.1) 70%, 
    rgba(255, 255, 255, 0.2) 100%);
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
  max-width: 900px;
  margin: 0 auto;
  background: var(--glass-bg);
  border-radius: 20px;
  padding: 30px;
  box-shadow: 
    0 20px 40px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border),
    /* 3D Embossed Border Effect */
    0 0 0 2px var(--glass-emboss-outer),
    0 0 0 3px var(--glass-emboss-gap),
    0 0 0 4px var(--glass-emboss-inner),
    /* Chromatic Aberration */
    2px 0 0 var(--glass-chromatic-red),
    -2px 0 0 var(--glass-chromatic-blue),
    0 2px 0 var(--glass-chromatic-green);
  backdrop-filter: blur(25px) saturate(200%);
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
  background: var(--glass-emboss-gradient);
  border-radius: 20px;
  pointer-events: none;
  z-index: -1;
}

.container::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  background: var(--glass-emboss-inner-gradient);
  border-radius: 16px;
  pointer-events: none;
  z-index: -1;
}

.header {
  text-align: center;
  margin-bottom: 30px;
}

.header h1 {
  color: var(--text-accent);
  margin-bottom: 10px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.back-link {
  color: var(--text-white);
  text-decoration: none;
  font-size: 18px;
  background: var(--glass-bg);
  padding: 12px 20px;
  border-radius: 25px;
  transition: all 0.3s ease;
  backdrop-filter: blur(20px) saturate(200%);
  box-shadow: 
    0 4px 16px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border),
    /* 3D Embossed Border Effect */
    0 0 0 2px var(--glass-emboss-outer),
    0 0 0 3px var(--glass-emboss-gap),
    0 0 0 4px var(--glass-emboss-inner),
    /* Chromatic Aberration */
    1px 0 0 var(--glass-chromatic-red),
    -1px 0 0 var(--glass-chromatic-blue),
    0 1px 0 var(--glass-chromatic-green);
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
  background: var(--glass-emboss-gradient);
  border-radius: 25px;
  pointer-events: none;
  z-index: -1;
}

.back-link::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  background: var(--glass-emboss-inner-gradient);
  border-radius: 21px;
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

.selections-display {
  background: var(--glass-bg);
  box-shadow: 
    0 4px 16px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border),
    /* 3D Embossed Border Effect */
    0 0 0 2px var(--glass-emboss-outer),
    0 0 0 3px var(--glass-emboss-gap),
    0 0 0 4px var(--glass-emboss-inner),
    /* Chromatic Aberration */
    1px 0 0 var(--glass-chromatic-red),
    -1px 0 0 var(--glass-chromatic-blue),
    0 1px 0 var(--glass-chromatic-green);
  border-radius: 15px;
  padding: 20px;
  margin-bottom: 30px;
  display: none;
  border: none;
  backdrop-filter: blur(20px) saturate(200%);
  position: relative;
  overflow: hidden;
}

.selections-display::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-emboss-gradient);
  border-radius: 15px;
  pointer-events: none;
  z-index: -1;
}

.selections-display::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  background: var(--glass-emboss-inner-gradient);
  border-radius: 11px;
  pointer-events: none;
  z-index: -1;
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
  background: var(--glass-bg);
  box-shadow: 
    0 4px 16px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border),
    /* 3D Embossed Border Effect */
    0 0 0 2px var(--glass-emboss-outer),
    0 0 0 3px var(--glass-emboss-gap),
    0 0 0 4px var(--glass-emboss-inner),
    /* Chromatic Aberration */
    1px 0 0 var(--glass-chromatic-red),
    -1px 0 0 var(--glass-chromatic-blue),
    0 1px 0 var(--glass-chromatic-green);
  border-radius: 15px;
  padding: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: left;
  border: none;
  backdrop-filter: blur(20px) saturate(200%);
  position: relative;
  overflow: hidden;
}

.option::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-emboss-gradient);
  border-radius: 15px;
  pointer-events: none;
  z-index: -1;
}

.option::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  background: var(--glass-emboss-inner-gradient);
  border-radius: 11px;
  pointer-events: none;
  z-index: -1;
}

.option:hover {
  border-color: var(--text-accent);
  background: var(--bg-accent);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 20px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
}

.option.selected {
  border-color: var(--text-accent);
  background: var(--bg-accent);
  box-shadow: 
    0 8px 20px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
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

.nav-btn {
  background: var(--glass-bg);
  color: var(--text-primary);
  box-shadow: 
    0 4px 16px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border),
    /* 3D Embossed Border Effect */
    0 0 0 2px var(--glass-emboss-outer),
    0 0 0 3px var(--glass-emboss-gap),
    0 0 0 4px var(--glass-emboss-inner),
    /* Chromatic Aberration */
    1px 0 0 var(--glass-chromatic-red),
    -1px 0 0 var(--glass-chromatic-blue),
    0 1px 0 var(--glass-chromatic-green);
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  border: none;
  backdrop-filter: blur(20px) saturate(200%);
  position: relative;
  overflow: hidden;
}

.nav-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-emboss-gradient);
  border-radius: 25px;
  pointer-events: none;
  z-index: -1;
}

.nav-btn::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  background: var(--glass-emboss-inner-gradient);
  border-radius: 21px;
  pointer-events: none;
  z-index: -1;
}

.nav-btn:hover {
  background: var(--gradient-primary);
  color: var(--text-white);
  border-color: var(--text-accent);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 20px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
}

.nav-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
  transform: none;
}

.nav-btn:disabled:hover {
  background: var(--glass-bg);
  color: var(--text-primary);
  border-color: var(--glass-border);
  transform: none;
  box-shadow: none;
}

.results {
  text-align: center;
  margin-top: 30px;
}

.results h2 {
  color: var(--text-accent);
  margin-bottom: 20px;
  font-size: 24px;
}

.recommendation {
  background: var(--glass-bg);
  box-shadow: 
    0 8px 32px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border),
    /* 3D Embossed Border Effect */
    0 0 0 2px var(--glass-emboss-outer),
    0 0 0 3px var(--glass-emboss-gap),
    0 0 0 4px var(--glass-emboss-inner),
    /* Chromatic Aberration */
    1px 0 0 var(--glass-chromatic-red),
    -1px 0 0 var(--glass-chromatic-blue),
    0 1px 0 var(--glass-chromatic-green);
  border-radius: 15px;
  padding: 25px;
  margin-bottom: 20px;
  transition: all 0.3s ease;
  border: none;
  backdrop-filter: blur(25px) saturate(200%);
  position: relative;
  overflow: hidden;
}

.recommendation::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: var(--glass-emboss-gradient);
  border-radius: 15px;
  pointer-events: none;
  z-index: -1;
}

.recommendation::after {
  content: '';
  position: absolute;
  top: 4px;
  left: 4px;
  right: 4px;
  bottom: 4px;
  background: var(--glass-emboss-inner-gradient);
  border-radius: 11px;
  pointer-events: none;
  z-index: -1;
}

.recommendation:hover {
  border-color: var(--text-accent);
  transform: translateY(-2px);
  box-shadow: 
    0 15px 30px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
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
  box-shadow: 0 8px 20px var(--glass-shadow);
}

.restart-btn {
  background: var(--gradient-primary);
  color: var(--text-white);
  border: none;
  padding: 12px 24px;
  border-radius: 25px;
  cursor: pointer;
  font-size: 16px;
  font-weight: 500;
  transition: all 0.3s ease;
  margin-top: 20px;
}

.restart-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--glass-shadow);
}

/* Theme Switcher */
.theme-switcher {
  display: flex;
  align-items: center;
  gap: 15px;
}

.theme-buttons {
  display: flex;
  gap: 8px;
}

.theme-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  border: 2px solid var(--glass-border);
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
  box-shadow: 0 4px 12px var(--glass-shadow);
  border-color: var(--text-accent);
}

.theme-btn.active {
  border-color: var(--text-accent);
  box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.2);
}

.theme-btn[data-theme="c"] { background: linear-gradient(135deg, #667eea 0%, #f093fb 100%); }
.theme-btn[data-theme="a"] { background: linear-gradient(135deg, #ff6b6b 0%, #ffa726 100%); }
.theme-btn[data-theme="r"] { background: linear-gradient(135deg, #4fc3f7 0%, #29b6f6 100%); }
.theme-btn[data-theme="z"] { background: linear-gradient(135deg, #66bb6a 0%, #81c784 100%); }
.theme-btn[data-theme="e"] { background: linear-gradient(135deg, #9c27b0 0%, #e91e63 100%); }
.theme-btn[data-theme="n"] { background: linear-gradient(135deg, #ff5722 0%, #ff9800 100%); }

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 25px 20px;
  }
  
  .question {
    font-size: 18px;
  }
  
  .option {
    padding: 15px;
  }
  
  .navigation {
    flex-direction: column;
    gap: 15px;
  }
  
  .nav-btn {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .container {
    padding: 20px 15px;
  }
  
  .header h1 {
    font-size: 1.8rem;
  }
  
  .question {
    font-size: 16px;
  }
  
  .option {
    padding: 12px;
  }
  
  .recommendation {
    padding: 20px;
  }
}

/* Starfield Background Styling */
.starfield-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  pointer-events: none;
  overflow: hidden;
}

.starfield-image {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease;
}

/* Theme-specific image display */
[data-theme="c"] .starfield-image[data-image="stars"],
[data-theme="a"] .starfield-image[data-image="clouds1"],
[data-theme="r"] .starfield-image[data-image="clouds2"],
[data-theme="e"] .starfield-image[data-image="clouds4"],
[data-theme="z"] .starfield-image[data-image="stars"],
[data-theme="n"] .starfield-image[data-image="stars"] {
  opacity: 0.05;
}

/* Ensure text has proper contrast against any background */
.container {
  position: relative;
  z-index: 1;
}

.option-title {
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 8px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.option-description {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.question {
  font-size: 20px;
  font-weight: 600;
  color: var(--text-primary);
  margin-bottom: 20px;
  text-align: center;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.question-description {
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 25px;
  font-size: 14px;
  line-height: 1.5;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.header h1 {
  color: var(--text-accent);
  margin-bottom: 10px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
  text-shadow: none;
}

.header p {
  color: var(--text-secondary);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.recommendation h3 {
  color: var(--text-primary);
  margin-bottom: 10px;
  font-size: 18px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.recommendation p {
  color: var(--text-secondary);
  line-height: 1.6;
  margin-bottom: 15px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.selections-display h3 {
  margin: 0 0 15px 0;
  color: var(--text-primary);
  font-size: 16px;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.top-bar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  z-index: 1000;
  box-sizing: border-box;
}

.button-container {
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(20px) saturate(180%);
  -webkit-backdrop-filter: blur(20px) saturate(180%);
  border-radius: 25px;
  padding: 10px;
  display: flex;
  align-items: center;
  gap: 10px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(255, 255, 255, 0.18);
}

.theme-buttons {
  display: flex;
  gap: 8px;
}

.theme-btn, .nav-btn {
  background: transparent;
  border: none;
  color: var(--text-white);
  padding: 8px 16px;
  border-radius: 18px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
  text-shadow: 0 1px 2px rgba(0,0,0,0.2);
}

.theme-btn:hover, .nav-btn:hover {
  background: rgba(255, 255, 255, 0.2);
}

.theme-btn.active {
  background: var(--gradient-primary);
  color: var(--text-white);
  box-shadow: 0 2px 10px rgba(0,0,0,0.3);
}
</style>

<div class="top-bar">
  <div class="button-container">
    <a href="/" class="back-link">← Back to Home</a>
    <div class="theme-buttons">
      <button class="theme-btn" data-theme="c" title="Cosmic">Cosmic</button>
      <button class="theme-btn" data-theme="a" title="Aurora">Aurora</button>
      <button class="theme-btn" data-theme="r" title="Rainbow">Rainbow</button>
      <button class="theme-btn" data-theme="z" title="Zenith">Zenith</button>
      <button class="theme-btn" data-theme="e" title="Eclipse">Eclipse</button>
      <button class="theme-btn" data-theme="n" title="Nebula">Nebula</button>
    </div>
  </div>
  <a href="/nature" class="nav-btn">Touch grass</a>
</div>

<div class="container">
  <div class="header">
    <h1>How to Do That?</h1>
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
        <div class="option-title">Web Application</div>
        <div class="option-description">A website that users can interact with, like a social media platform, e-commerce site, or online tool</div>
      </div>
      <div class="option" data-value="mobile" data-label="Mobile App">
        <div class="option-title">Mobile App</div>
        <div class="option-description">An app for smartphones and tablets, like Instagram, a productivity app, or a game</div>
      </div>
      <div class="option" data-value="desktop" data-label="Desktop Application">
        <div class="option-title">Desktop Application</div>
        <div class="option-description">Software that runs on computers, like a photo editor, game, or productivity tool</div>
      </div>
      <div class="option" data-value="api" data-label="API/Backend Service">
        <div class="option-title">API/Backend Service</div>
        <div class="option-description">A service that provides data or functionality to other applications</div>
      </div>
      <div class="option" data-value="game" data-label="Game">
        <div class="option-title">Game</div>
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
        <div class="option-title">User Accounts & Login</div>
        <div class="option-description">Let users create accounts, log in, and manage their profiles</div>
      </div>
      <div class="option" data-value="data-storage" data-label="Store Data">
        <div class="option-title">Store Data</div>
        <div class="option-description">Save and retrieve information like user data, posts, or files</div>
      </div>
      <div class="option" data-value="real-time" data-label="Real-time Updates">
        <div class="option-title">Real-time Updates</div>
        <div class="option-description">Update information instantly, like chat messages or live data</div>
      </div>
      <div class="option" data-value="media" data-label="Handle Media">
        <div class="option-title">Handle Media</div>
        <div class="option-description">Upload, process, and display images, videos, or audio files</div>
      </div>
      <div class="option" data-value="payments" data-label="Process Payments">
        <div class="option-title">Process Payments</div>
        <div class="option-description">Accept credit cards, PayPal, or other payment methods</div>
      </div>
      <div class="option" data-value="simple" data-label="Simple Content">
        <div class="option-title">Simple Content</div>
        <div class="option-description">Just display information, forms, or basic interactions</div>
      </div>
    </div>
    <div class="navigation">
      <button class="btn secondary" onclick="previousQuestion()">← Previous</button>
      <button class="btn" onclick="nextQuestion()">Next →</button>
    </div>
  </div>

  <!-- Question 3: What You Need to Build -->
  <div class="quiz-section" id="section3">
    <div class="question">What do you need to build?</div>
    <div class="question-description">This helps us determine the right difficulty level for you</div>
    <div class="options">
      <div class="option" data-value="drag-drop" data-label="Drag & Drop Tools">
        <div class="option-title">Drag & Drop Tools</div>
        <div class="option-description">I want to use visual builders like Figma, Webflow, or no-code platforms</div>
      </div>
      <div class="option" data-value="html-css" data-label="HTML/CSS Websites">
        <div class="option-title">HTML/CSS Websites</div>
        <div class="option-description">I want to learn HTML and CSS to build static websites</div>
      </div>
      <div class="option" data-value="programming" data-label="Learn Programming Languages">
        <div class="option-title">Learn Programming Languages</div>
        <div class="option-description">I want to learn JavaScript, Python, or other programming languages</div>
      </div>
      <div class="option" data-value="build-systems" data-label="Build Complex Systems">
        <div class="option-title">Build Complex Systems</div>
        <div class="option-description">I want to build full applications, APIs, databases, or complex features</div>
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
        <div class="option-title">Video Tutorials</div>
        <div class="option-description">I learn best by watching step-by-step video guides</div>
      </div>
      <div class="option" data-value="interactive" data-label="Interactive Courses">
        <div class="option-title">Interactive Courses</div>
        <div class="option-description">I prefer hands-on coding exercises and projects</div>
      </div>
      <div class="option" data-value="documentation" data-label="Documentation">
        <div class="option-title">Documentation</div>
        <div class="option-description">I like reading official docs and learning by doing</div>
      </div>
      <div class="option" data-value="community" data-label="Community Learning">
        <div class="option-title">Community Learning</div>
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
        <div class="option-title">As Fast as Possible</div>
        <div class="option-description">I want to build something quickly, even if it's not perfect</div>
      </div>
      <div class="option" data-value="balanced" data-label="Balanced Approach">
        <div class="option-title">Balanced Approach</div>
        <div class="option-description">I want to learn while building something good</div>
      </div>
      <div class="option" data-value="thorough" data-label="Do It Right">
        <div class="option-title">Do It Right</div>
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
        <div class="option-title">Free</div>
        <div class="option-description">I want to keep costs as low as possible</div>
      </div>
      <div class="option" data-value="low" data-label="Low Cost">
        <div class="option-title">Low Cost</div>
        <div class="option-description">I can spend a few dollars per month</div>
      </div>
      <div class="option" data-value="flexible" data-label="Flexible">
        <div class="option-title">Flexible</div>
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

  // Determine difficulty based on what they need to build
  let difficulty = 'beginner';
  if (answers.buildType === 'drag-drop' || answers.buildType === 'html-css') {
    difficulty = 'beginner';
  } else if (answers.buildType === 'programming') {
    difficulty = 'intermediate';
  } else if (answers.buildType === 'build-systems') {
    difficulty = 'expert';
  }

  // Analyze project type and features
  switch(answers.projectType) {
    case 'webapp':
      if (difficulty === 'beginner') {
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
            <h2>Perfect for Beginners!</h2>
            <p>You should build a <strong>React web application</strong> with Firebase as your backend. This combination is perfect for beginners because:</p>
            <ul>
              <li>React has excellent documentation and community support</li>
              <li>Firebase handles authentication, database, and hosting automatically</li>
              <li>You can deploy for free and scale as needed</li>
              <li>Lots of tutorials and examples available</li>
            </ul>
            <p><strong>Pro Tip:</strong> For beginners who want something to work quickly, I highly recommend <a href="https://cursor.sh" target="_blank" style="color: var(--primary-purple); font-weight: 600;">Cursor</a> as your code editor. It's built on VS Code but with AI assistance that can help you write code, debug issues, and learn as you go!</p>
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
            '<a href="https://cursor.sh" target="_blank">Cursor (AI-powered code editor)</a>',
            '<a href="https://www.w3schools.com/html/" target="_blank">W3Schools HTML Tutorial</a>',
            '<a href="https://www.w3schools.com/css/" target="_blank">W3Schools CSS Tutorial</a>',
            '<a href="https://www.w3schools.com/js/" target="_blank">W3Schools JavaScript Tutorial</a>'
          ];
          learningPath = [
            'Learn HTML basics (structure, elements)',
            'Master CSS (styling, layout, responsive design)',
            'Learn JavaScript fundamentals (variables, functions, DOM)',
            'Build your website locally',
            'Deploy to GitHub Pages for free hosting'
          ];
          recommendation = `
            <h2>Simple Website</h2>
            <p>Start with <strong>HTML, CSS, and JavaScript</strong> for a simple website. This is perfect because:</p>
            <ul>
              <li>No complex backend setup required</li>
              <li>Deploy for free on GitHub Pages</li>
              <li>Learn fundamental web technologies</li>
              <li>Easy to maintain and update</li>
            </ul>
            <p><strong>Pro Tip:</strong> For beginners who want something to work quickly, I highly recommend <a href="https://cursor.sh" target="_blank" style="color: var(--primary-purple); font-weight: 600;">Cursor</a> as your code editor. It's built on VS Code but with AI assistance that can help you write code, debug issues, and learn as you go!</p>
          `;
        }
      } else if (difficulty === 'intermediate') {
        // Intermediate recommendations - focus on learning programming languages
        techStack = [
          { name: 'JavaScript', type: 'frontend' },
          { name: 'TypeScript', type: 'frontend' },
          { name: 'React', type: 'frontend' },
          { name: 'Node.js', type: 'backend' },
          { name: 'MongoDB', type: 'database' }
        ];
        resources = [
          '<a href="https://www.typescriptlang.org/" target="_blank">TypeScript Documentation</a>',
          '<a href="https://react.dev/" target="_blank">React Documentation</a>',
          '<a href="https://nodejs.org/" target="_blank">Node.js</a>',
          '<a href="https://www.mongodb.com/" target="_blank">MongoDB</a>'
        ];
        learningPath = [
          'Master JavaScript fundamentals',
          'Learn TypeScript for type safety',
          'Build React components and state management',
          'Learn Node.js for backend development',
          'Set up MongoDB database',
          'Connect frontend and backend',
          'Deploy your full-stack application'
        ];
        recommendation = `
          <h2>Learn Programming Languages</h2>
          <p>Focus on <strong>JavaScript/TypeScript</strong> to build a full-stack web application. This path helps you:</p>
          <ul>
            <li>Master a programming language used everywhere</li>
            <li>Build both frontend and backend with the same language</li>
            <li>Learn modern development practices</li>
            <li>Create scalable applications</li>
          </ul>
        `;
      } else {
        // Expert recommendations - complex systems
        techStack = [
          { name: 'Next.js', type: 'frontend' },
          { name: 'TypeScript', type: 'frontend' },
          { name: 'PostgreSQL', type: 'database' },
          { name: 'Docker', type: 'deployment' }
        ];
        resources = [
          '<a href="https://nextjs.org/" target="_blank">Next.js Documentation</a>',
          '<a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a>',
          '<a href="https://www.postgresql.org/" target="_blank">PostgreSQL</a>',
          '<a href="https://www.docker.com/" target="_blank">Docker</a>'
        ];
        learningPath = [
          'Master advanced TypeScript patterns',
          'Learn Next.js with complex routing and API design',
          'Design scalable database architecture',
          'Set up containerization with Docker',
          'Learn cloud infrastructure (AWS/Google Cloud)',
          'Implement CI/CD pipelines',
          'Set up monitoring, logging, and analytics'
        ];
        recommendation = `
          <h2>Complex System Architecture</h2>
          <p>Build a <strong>scalable, production-ready system</strong> with enterprise-level features:</p>
          <ul>
            <li>Microservices architecture</li>
            <li>Advanced database design and optimization</li>
            <li>Cloud infrastructure and DevOps practices</li>
            <li>Security, monitoring, and performance optimization</li>
          </ul>
        `;
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
        '<a href="https://nodejs.org/" target="_blank">Node.js</a>',
        '<a href="https://expressjs.com/" target="_blank">Express.js</a>',
        '<a href="https://www.mongodb.com/" target="_blank">MongoDB</a>',
        '<a href="https://heroku.com/" target="_blank">Heroku</a>'
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
        <h2>Robust API Backend</h2>
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
      techStack = [
        { name: 'HTML5 Canvas', type: 'frontend' },
        { name: 'JavaScript', type: 'frontend' },
        { name: 'Phaser.js', type: 'frontend' }
      ];
      resources = [
        '<a href="https://phaser.io/" target="_blank">Phaser.js</a>',
        '<a href="https://www.w3schools.com/js/" target="_blank">JavaScript Tutorial</a>',
        '<a href="https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API" target="_blank">Canvas API</a>'
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
        <h2>Web-Based Game</h2>
        <p>Start with <strong>HTML5 Canvas and Phaser.js</strong> for your game. This approach offers:</p>
        <ul>
          <li>No installation required for players</li>
          <li>Phaser.js handles game physics and sprites</li>
          <li>Easy to share and distribute</li>
          <li>Works on all devices with a browser</li>
        </ul>
      `;
      break;

    case 'mobile':
      techStack = [
        { name: 'React Native', type: 'frontend' },
        { name: 'Expo', type: 'deployment' },
        { name: 'Firebase', type: 'backend' }
      ];
      resources = [
        '<a href="https://expo.dev/" target="_blank">Expo</a>',
        '<a href="https://reactnative.dev/" target="_blank">React Native</a>',
        '<a href="https://firebase.google.com/" target="_blank">Firebase</a>'
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
        <h2>Mobile App Made Easy!</h2>
        <p>Use <strong>React Native with Expo</strong> to build your mobile app. This is the best choice because:</p>
        <ul>
          <li>Write once, run on both iOS and Android</li>
          <li>Expo handles the complex setup for you</li>
          <li>Hot reloading for fast development</li>
          <li>Easy to test on your phone</li>
        </ul>
        <p><strong>Pro Tip:</strong> For beginners who want something to work quickly, I highly recommend <a href="https://cursor.sh" target="_blank" style="color: var(--primary-purple); font-weight: 600;">Cursor</a> as your code editor. It's built on VS Code but with AI assistance that can help you write code, debug issues, and learn as you go!</p>
      `;
      break;

    case 'desktop':
      techStack = [
        { name: 'Electron', type: 'frontend' },
        { name: 'HTML/CSS/JS', type: 'frontend' },
        { name: 'Node.js', type: 'backend' }
      ];
      resources = [
        '<a href="https://www.electronjs.org/" target="_blank">Electron</a>',
        '<a href="https://www.w3schools.com/html/" target="_blank">HTML Tutorial</a>',
        '<a href="https://www.w3schools.com/css/" target="_blank">CSS Tutorial</a>',
        '<a href="https://www.w3schools.com/js/" target="_blank">JavaScript Tutorial</a>'
      ];
      learningPath = [
        'Learn HTML, CSS, and JavaScript basics',
        'Set up Electron development environment',
        'Build simple desktop UI with web technologies',
        'Learn Node.js for desktop functionality',
        'Package and distribute your app'
      ];
      recommendation = `
        <h2>Simple Desktop App</h2>
        <p>Use <strong>Electron</strong> to build a desktop application with web technologies:</p>
        <ul>
          <li>Use familiar HTML, CSS, and JavaScript</li>
          <li>Cross-platform compatibility</li>
          <li>Easy to develop and maintain</li>
          <li>Large ecosystem of libraries</li>
        </ul>
      `;
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
        <h3>Learning Path</h3>
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
        <h3>Learning Resources</h3>
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
  
  // Theme button click handlers
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });
});
</script> 