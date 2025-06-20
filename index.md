---
layout: home
title: eosyn
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
  --border-pink: #ff9800;
  
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

/* Sparkle Animations */
.sparkle {
  position: fixed;
  pointer-events: none;
  z-index: 1;
  opacity: 0;
  animation: sparkleFade 4s ease-in-out forwards;
  will-change: opacity;
}

.sparkle::before {
  content: '★';
  font-size: 20px;
  color: var(--text-white);
  text-shadow: 0 0 10px var(--text-white);
  display: block;
  will-change: opacity;
}

/* Distant Star Dots */
.distant-star {
  position: fixed;
  pointer-events: none;
  z-index: 0;
  opacity: 0;
  border-radius: 50%;
  background: var(--text-white);
  box-shadow: 0 0 4px var(--text-white);
  animation: distantStarFade 4s ease-in-out infinite;
  will-change: opacity, transform;
}

@keyframes sparkleFade {
  0% {
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}

@keyframes distantStarFade {
  0% {
    opacity: 0;
    transform: scale(0.5);
  }
  25% {
    opacity: 1;
    transform: scale(1);
  }
  75% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(0.5);
  }
}

/* Theme-specific distant star variations */
[data-theme="c"] .distant-star {
  background: var(--text-white);
  box-shadow: 0 0 6px var(--text-white);
}

[data-theme="a"] .distant-star {
  background: var(--text-white);
  box-shadow: 0 0 8px var(--text-white);
}

[data-theme="r"] .distant-star {
  background: var(--text-white);
  box-shadow: 0 0 5px var(--text-white);
}

[data-theme="z"] .distant-star {
  background: var(--text-white);
  box-shadow: 0 0 4px var(--text-white);
}

[data-theme="e"] .distant-star {
  background: var(--text-white);
  box-shadow: 0 0 10px var(--text-white);
}

[data-theme="n"] .distant-star {
  background: var(--text-white);
  box-shadow: 0 0 6px var(--text-white);
}

[data-theme="sunset"] .distant-star {
  background: rgba(255, 255, 255, 0.7);
  box-shadow: 0 0 6px rgba(255, 255, 255, 0.4);
}

[data-theme="ocean"] .distant-star {
  background: rgba(255, 255, 255, 0.6);
  box-shadow: 0 0 5px rgba(255, 255, 255, 0.3);
}

[data-theme="forest"] .distant-star {
  background: rgba(255, 255, 255, 0.5);
  box-shadow: 0 0 4px rgba(255, 255, 255, 0.2);
}

[data-theme="dark"] .distant-star {
  background: rgba(255, 255, 255, 0.9);
  box-shadow: 0 0 10px rgba(255, 255, 255, 0.6);
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
  --border-pink: #f093fb;
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
  --border-pink: #ffa726;
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
  --border-pink: #29b6f6;
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
  --border-pink: #81c784;
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
  --border-pink: #e91e63;
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
  --border-pink: #ff9800;
  --text-accent: #ff5722;
  --glass-bg: rgba(255, 87, 34, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: Sunset */
[data-theme="sunset"] {
  --primary-purple: #ff8a65;
  --primary-pink: #ffcc02;
  --accent-blue: #ff7043;
  --accent-green: #ffb74d;
  --accent-orange: #ff8a65;
  --gradient-primary: linear-gradient(135deg, #ff8a65 0%, #ffcc02 100%);
  --gradient-secondary: linear-gradient(135deg, #ff7043 0%, #ffb74d 100%);
  --border-pink: #ffcc02;
  --text-accent: #ff8a65;
  --glass-bg: rgba(255, 138, 101, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: Ocean */
[data-theme="ocean"] {
  --primary-purple: #0277bd;
  --primary-pink: #039be5;
  --accent-blue: #00acc1;
  --accent-green: #00bcd4;
  --accent-orange: #0097a7;
  --gradient-primary: linear-gradient(135deg, #0277bd 0%, #039be5 100%);
  --gradient-secondary: linear-gradient(135deg, #00acc1 0%, #00bcd4 100%);
  --border-pink: #039be5;
  --text-accent: #0277bd;
  --glass-bg: rgba(2, 119, 189, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: Forest */
[data-theme="forest"] {
  --primary-purple: #2e7d32;
  --primary-pink: #388e3c;
  --accent-blue: #4caf50;
  --accent-green: #66bb6a;
  --accent-orange: #8bc34a;
  --gradient-primary: linear-gradient(135deg, #2e7d32 0%, #388e3c 100%);
  --gradient-secondary: linear-gradient(135deg, #4caf50 0%, #66bb6a 100%);
  --border-pink: #388e3c;
  --text-accent: #2e7d32;
  --glass-bg: rgba(46, 125, 50, 0.25);
  --text-primary: #2d3748;
  --text-secondary: #4a5568;
  --text-light: #718096;
  --text-white: #ffffff;
}

/* Theme: Dark */
[data-theme="dark"] {
  --primary-purple: #424242;
  --primary-pink: #616161;
  --accent-blue: #757575;
  --accent-green: #9e9e9e;
  --accent-orange: #bdbdbd;
  --text-primary: #ffffff;
  --text-secondary: #e0e0e0;
  --text-light: #bdbdbd;
  --bg-primary: #121212;
  --bg-secondary: #1e1e1e;
  --bg-accent: #2d2d2d;
  --border-primary: #404040;
  --border-accent: #555555;
  --gradient-primary: linear-gradient(135deg, #424242 0%, #616161 100%);
  --gradient-secondary: linear-gradient(135deg, #757575 0%, #9e9e9e 100%);
  --border-pink: #616161;
  --text-accent: #424242;
  --glass-bg: rgba(66, 66, 66, 0.25);
  --text-white: #ffffff;
}

body {
  background: var(--gradient-primary);
  color: var(--text-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 0;
  min-height: 100vh;
  transition: all 0.3s ease;
  overflow-x: hidden;
}

#sparkleContainer {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
}

.top-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 15px 30px;
    background: var(--glass-bg);
    backdrop-filter: blur(10px);
    border-bottom: 1px solid var(--glass-border);
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1001;
}

.logo a {
    color: var(--text-white);
    text-decoration: none;
    font-size: 1.5em;
    font-weight: 600;
}

.main-nav a {
    color: var(--text-white);
    text-decoration: none;
    margin: 0 15px;
    font-size: 1em;
    font-weight: 500;
    transition: color 0.3s ease;
}

.main-nav a:hover {
    color: var(--text-accent);
}

.container {
  max-width: 800px;
  margin: 120px auto 40px;
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
  z-index: 1;
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

h1 {
  color: var(--text-accent);
  text-align: center;
  font-size: 2.5em;
  margin-bottom: 30px;
  background: var(--gradient-primary);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-weight: 700;
}

.starfield-container {
  text-align: center;
  margin: 30px 0;
  padding: 20px;
  background: var(--glass-bg);
  border-radius: 15px;
  border: 2px solid var(--glass-border);
  transition: all 0.3s ease;
}

.starfield-image {
  width: 250px;
  height: 250px;
  border-radius: 50%;
  border: 4px solid var(--text-accent);
  object-fit: cover;
  display: inline-block;
  box-shadow: 0 8px 25px var(--glass-shadow);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

.starfield-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px var(--shadow-heavy);
}

/* Theme-specific image display */
[data-theme="c"] .starfield-image[data-image="stars"],
[data-theme="a"] .starfield-image[data-image="clouds1"],
[data-theme="r"] .starfield-image[data-image="clouds2"],
[data-theme="e"] .starfield-image[data-image="clouds4"],
[data-theme="z"] .starfield-image[data-image="stars"],
[data-theme="n"] .starfield-image[data-image="stars"] {
  display: inline-block;
}

/* Hide all images by default */
.starfield-image {
  display: none;
}

.nav-links {
  background: var(--glass-bg);
  border-radius: 15px;
  padding: 25px;
  margin-top: 30px;
  box-shadow: 
    0 8px 32px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  backdrop-filter: blur(20px) saturate(180%);
  border: none;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.nav-links::before {
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

.nav-links a {
  display: inline-block;
  color: var(--text-primary);
  text-decoration: none;
  padding: 12px 20px;
  margin: 8px;
  background: var(--glass-bg);
  border-radius: 25px;
  box-shadow: 
    0 4px 16px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  backdrop-filter: blur(15px) saturate(180%);
  border: none;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.nav-links a::before {
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

.nav-links a:hover {
  background: var(--gradient-primary);
  color: var(--text-white);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 20px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
  border-color: var(--text-accent);
}

.social-links {
  background: var(--glass-bg);
  border-radius: 15px;
  padding: 25px;
  margin-top: 20px;
  box-shadow: 
    0 8px 32px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  backdrop-filter: blur(20px) saturate(180%);
  border: none;
  text-align: center;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.social-links::before {
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

.social-links a {
  display: inline-block;
  color: var(--text-primary);
  text-decoration: none;
  padding: 12px 20px;
  margin: 8px;
  background: var(--glass-bg);
  border-radius: 25px;
  box-shadow: 
    0 4px 16px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  backdrop-filter: blur(15px) saturate(180%);
  border: none;
  transition: all 0.3s ease;
  font-weight: 500;
  position: relative;
  overflow: hidden;
}

.social-links a::before {
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

.social-links a:hover {
  background: var(--gradient-secondary);
  color: var(--text-white);
  transform: translateY(-2px);
  box-shadow: 
    0 8px 20px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
  border-color: var(--text-accent);
}

/* Theme Switcher */
.theme-switcher {
  position: relative;
}

.gear-button {
  width: 40px;
  height: 40px;
  background: var(--glass-bg);
  border-radius: 50%;
  box-shadow: 
    0 4px 16px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--glass-border);
  backdrop-filter: blur(15px) saturate(180%);
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 18px;
  color: var(--text-primary);
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
}

.gear-button::before {
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

.gear-button:hover {
  transform: rotate(90deg);
  background: var(--gradient-primary);
  color: var(--text-white);
  box-shadow: 
    0 8px 24px var(--glass-shadow),
    inset 0 1px 0 var(--glass-highlight),
    inset 0 -1px 0 var(--glass-inner-shadow),
    0 0 0 1px var(--text-accent);
  border-color: var(--text-accent);
}

.theme-content {
    display: none;
    position: absolute;
    top: 55px;
    right: 0;
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
    z-index: 1002;
    text-align: center;
    width: 200px;
    position: relative;
    overflow: hidden;
}

.theme-content::before {
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
  background: var(--glass-bg);
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 10px 30px var(--glass-shadow);
  border: 2px solid var(--glass-border);
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
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  transition: all 0.3s ease;
}

.cookie-btn.accept {
  background: var(--gradient-primary);
  color: var(--text-white);
}

.cookie-btn.decline {
  background: var(--bg-secondary);
  color: var(--text-primary);
  border: 1px solid var(--border-primary);
}

.cookie-btn:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px var(--glass-shadow);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    margin: 100px 20px 40px;
    padding: 30px 20px;
  }
  
  .top-bar {
    padding: 10px 20px;
  }
  
  .main-nav a {
    margin: 0 10px;
    font-size: 0.9em;
  }
  
  .starfield-image {
    width: 200px;
    height: 200px;
  }
  
  .nav-links, .social-links {
    padding: 20px;
  }
  
  .nav-links a, .social-links a {
    padding: 10px 16px;
    margin: 6px;
    font-size: 0.9em;
  }
}

@media (max-width: 480px) {
  .container {
    margin: 80px 15px 40px;
    padding: 25px 15px;
  }
  
  h1 {
    font-size: 2em;
  }
  
  .starfield-image {
    width: 150px;
    height: 150px;
  }
  
  .nav-links a, .social-links a {
    display: block;
    margin: 8px 0;
    text-align: center;
  }
}
</style>

<body>
<header class="top-bar">
    <div class="logo">
        <a href="/">eosyn.net</a>
    </div>
    <nav class="main-nav">
        <a href="/etc/">ETC</a>
        <a href="/howtodothat/">How To Do That</a>
        <a href="/nature/">Nature</a>
        <a href="/search/">Search</a>
    </nav>
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
</header>

<div class="container">
  <h1>hi, i'm eosyn</h1>
  
  <div class="starfield-container">
    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="starfield-image" data-image="stars">
    <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="starfield-image" data-image="clouds1">
    <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="starfield-image" data-image="clouds2">
    <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="starfield-image" data-image="clouds4">
  </div>

  <p style="text-align: center; font-size: 1.2em; color: var(--text-secondary); line-height: 1.6;">
    this site is under construction.<br>
    if you know about this already, you're probably one of my friends.<br>
    thank you for checking it out so early! <3
  </p>

  <div class="social-links">
    <a href="https://github.com/eosyn-z">GitHub: eosyn-z</a>
    <a href="https://discord.gg/PsSsx3NcAp"> Discord: eosyn</a>
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

<!-- Sparkle Container -->
<div id="sparkleContainer"></div>

<script>
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

document.addEventListener('DOMContentLoaded', function() {
  // Show cookie consent if needed
  showCookieConsent();
  
  // Load saved theme (only if cookies are accepted)
  loadTheme();
  
  // Gear button click handler
  document.getElementById('gearButton').addEventListener('click', function(event) {
    event.stopPropagation();
    const themeContent = document.querySelector('.theme-content');
    const isShown = themeContent.style.display === 'block';
    themeContent.style.display = isShown ? 'none' : 'block';
  });

  document.addEventListener('click', function() {
      const themeContent = document.querySelector('.theme-content');
      themeContent.style.display = 'none';
  });
  
  // Theme button click handlers
  document.querySelectorAll('.theme-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const theme = this.getAttribute('data-theme');
      setTheme(theme);
    });
  });
  
  // Initialize sparkles
  initSparkles();
});

// Sparkle Animation Functions
function createSparkle() {
  const sparkle = document.createElement('div');
  sparkle.className = 'sparkle';
  
  // Random position across the entire viewport
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  sparkle.style.left = x + 'px';
  sparkle.style.top = y + 'px';
  
  // Random size
  const size = 15 + Math.random() * 15; // 15-30px
  sparkle.style.fontSize = size + 'px';
  
  document.getElementById('sparkleContainer').appendChild(sparkle);
  
  // Remove sparkle after animation completes
  setTimeout(() => {
    if (sparkle.parentNode) {
      sparkle.parentNode.removeChild(sparkle);
    }
  }, 4000); // 4 seconds to match animation duration
}

function createDistantStar() {
  const star = document.createElement('div');
  star.className = 'distant-star';
  
  // Random position across the entire viewport
  const x = Math.random() * window.innerWidth;
  const y = Math.random() * window.innerHeight;
  star.style.left = x + 'px';
  star.style.top = y + 'px';
  
  // Theme-specific size variations
  const currentTheme = document.documentElement.getAttribute('data-theme') || 'c';
  let minSize, maxSize;
  
  switch(currentTheme) {
    case 'c': // Cosmic - medium stars
      minSize = 2; maxSize = 4;
      break;
    case 'a': // Aurora - bright, larger stars
      minSize = 3; maxSize = 6;
      break;
    case 'r': // Rainbow - small, delicate stars
      minSize = 1; maxSize = 3;
      break;
    case 'z': // Zenith - tiny, subtle stars
      minSize = 1; maxSize = 2;
      break;
    case 'e': // Eclipse - bright, prominent stars
      minSize = 2; maxSize = 5;
      break;
    case 'n': // Nebula - medium-bright stars
      minSize = 2; maxSize = 4;
      break;
    default:
      minSize = 2; maxSize = 4;
  }
  
  const size = minSize + Math.random() * (maxSize - minSize);
  star.style.width = size + 'px';
  star.style.height = size + 'px';
  
  // Random animation duration and delay
  const duration = 3 + Math.random() * 3; // 3-6 seconds
  const delay = Math.random() * 2;
  star.style.animationDuration = duration + 's';
  star.style.animationDelay = delay + 's';
  
  document.getElementById('sparkleContainer').appendChild(star);
  
  // Remove star after animation completes
  setTimeout(() => {
    if (star.parentNode) {
      star.parentNode.removeChild(star);
    }
  }, (duration + delay) * 1000);
}

function initSparkles() {
  // Create initial sparkles
  for (let i = 0; i < 50; i++) {
    setTimeout(() => {
      createSparkle();
    }, i * 200); // Stagger creation
  }
  
  // Create initial distant stars
  for (let i = 0; i < 80; i++) {
    setTimeout(() => {
      createDistantStar();
    }, i * 80); // More frequent, smaller delay
  }
  
  // Continue creating sparkles
  setInterval(() => {
    if (document.getElementById('sparkleContainer').children.length < 60) {
      createSparkle();
    }
  }, 800);
  
  // Continue creating distant stars (more frequent)
  setInterval(() => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'c';
    let maxStars;
    
    // Theme-specific star density
    switch(currentTheme) {
      case 'a': // Aurora - more stars
        maxStars = 80;
        break;
      case 'e': // Eclipse - more stars
        maxStars = 90;
        break;
      case 'r': // Rainbow - medium stars
        maxStars = 70;
        break;
      case 'c': // Cosmic - medium stars
        maxStars = 75;
        break;
      case 'n': // Nebula - medium stars
        maxStars = 85;
        break;
      case 'z': // Zenith - fewer stars
        maxStars = 60;
        break;
      default:
        maxStars = 75;
    }
    
    const distantStars = document.querySelectorAll('.distant-star').length;
    if (distantStars < maxStars) {
      createDistantStar();
    }
  }, 400); // More frequent than sparkles
}
</script>
</body>
