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
  --border-pink: #ffb6c1;
  
  /* Shadow Colors */
  --shadow-light: rgba(0, 0, 0, 0.1);
  --shadow-medium: rgba(0, 0, 0, 0.2);
  --shadow-heavy: rgba(0, 0, 0, 0.3);
}

body {
  background: var(--gradient-primary);
  color: var(--text-primary);
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  margin: 0;
  padding: 20px;
  min-height: 100vh;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  background: var(--bg-primary);
  border-radius: 20px;
  padding: 40px;
  box-shadow: 0 20px 40px var(--shadow-medium);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

h1 {
  color: var(--primary-purple);
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
  background: var(--bg-secondary);
  border-radius: 15px;
  border: 2px solid var(--border-primary);
}

.starfield-image {
  width: 200px;
  height: 200px;
  border-radius: 50%;
  border: 4px solid var(--border-pink);
  object-fit: cover;
  display: inline-block;
  box-shadow: 0 8px 25px var(--shadow-medium);
  margin: 0 10px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.starfield-image:hover {
  transform: translateY(-5px);
  box-shadow: 0 15px 35px var(--shadow-heavy);
}

.nav-links {
  background: var(--bg-secondary);
  border-radius: 15px;
  padding: 25px;
  margin-top: 30px;
  border: 2px solid var(--border-primary);
}

.nav-links a {
  display: inline-block;
  color: var(--text-primary);
  text-decoration: none;
  padding: 12px 20px;
  margin: 8px;
  background: var(--bg-primary);
  border-radius: 25px;
  border: 2px solid var(--border-primary);
  transition: all 0.3s ease;
  font-weight: 500;
}

.nav-links a:hover {
  background: var(--gradient-primary);
  color: var(--text-white);
  transform: translateY(-2px);
  box-shadow: 0 8px 20px var(--shadow-medium);
  border-color: var(--primary-purple);
}

.discord-info {
  text-align: center;
  margin-top: 20px;
  padding: 15px;
  background: var(--gradient-secondary);
  border-radius: 15px;
  color: var(--text-white);
  font-weight: 600;
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    padding: 20px;
    margin: 10px;
  }
  
  h1 {
    font-size: 2em;
  }
  
  .starfield-image {
    width: 150px;
    height: 150px;
    margin: 5px;
  }
  
  .nav-links a {
    display: block;
    margin: 5px 0;
  }
}
</style>

<div class="container">
  <h1>hi, i'm eosyn</h1>
  
  <div class="starfield-container">
    <img src="https://upload.wikimedia.org/wikipedia/commons/e/e4/StarfieldSimulation.gif" alt="Starfield Simulation" class="starfield-image">
    <img src="https://i.pinimg.com/originals/60/ad/28/60ad28e7dfa78920e0bbf782053b040a.gif" alt="Animated GIF" class="starfield-image">
    <img src="https://i.pinimg.com/originals/74/8e/75/748e75ec3a7fe0b13bff7c282b458e3e.gif" alt="Animated GIF" class="starfield-image">
    <img src="https://i.gifer.com/23dZ.gif" alt="Animated GIF" class="starfield-image">
  </div>

  <p style="text-align: center; font-size: 1.2em; color: var(--text-secondary); line-height: 1.6;">
    this site is under construction.<br>
    if you know about this already, you're probably one of my friends.<br>
    thank you for checking it out so early! <3
  </p>

  <div class="nav-links">
    <a href="https://github.com/eosyn-z">🛠️ Check out my projects on GitHub</a>
    <a href="/etc/">🎵 music</a>
    <a href="/nature/">🌿 nature</a>
    <a href="/search/">🔍 discover sites</a>
    <a href="/howtodothat/">how to do that</a>
  </div>

  <div class="discord-info">
    Discord: @eosyn
  </div>
</div>
