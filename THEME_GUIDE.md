# C A R Z E N Theme System Guide

## Overview
The C A R Z E N theme system provides beautiful glass morphism effects with 6 color variations. The "E" theme is the default, featuring neutral translucent glass that blurs background colors rather than adding its own colors.

## Quick Start

### 1. Include the Theme CSS
```html
<link rel="stylesheet" href="assets/css/themes.css">
```

### 2. Set Default Theme (E)
```html
<html data-theme="e">
```

### 3. Use Glass Containers
```html
<!-- Basic glass container -->
<div class="glass-container">
  <h2>Glass Content</h2>
  <p>This has beautiful translucent glass effects!</p>
</div>

<!-- Glass button with theme colors -->
<button class="glass-button primary">Click Me</button>

<!-- Glass card with hover effects -->
<div class="glass-card">
  <h3>Card Title</h3>
  <p>Hover over me for a nice effect!</p>
</div>
```

## Available Glass Containers

### 🎯 **Easy-to-Use Default Classes**

#### `.glass-container`
Basic glass container with medium blur and shadow
```html
<div class="glass-container">
  <p>Your content here</p>
</div>
```

#### `.glass-button`
Glass button with hover effects
```html
<button class="glass-button">Regular Button</button>
<button class="glass-button primary">Primary Button</button>
```

#### `.glass-card`
Glass card with hover lift effect
```html
<div class="glass-card">
  <h3>Card Title</h3>
  <p>Card content with hover animation</p>
</div>
```

#### `.glass-panel`
Heavy glass panel for important content
```html
<div class="glass-panel">
  <h2>Important Panel</h2>
  <p>This has stronger glass effects</p>
</div>
```

#### `.glass-nav`
Glass navigation bar
```html
<nav class="glass-nav">
  <a href="/">Home</a>
  <a href="/about">About</a>
</nav>
```

#### `.glass-modal`
Glass modal dialog
```html
<div class="glass-modal">
  <h2>Modal Title</h2>
  <p>Modal content</p>
  <button class="glass-button">Close</button>
</div>
```

#### `.glass-input`
Glass input field
```html
<input type="text" class="glass-input" placeholder="Enter text...">
```

#### `.glass-badge`
Glass badge/tag
```html
<span class="glass-badge">New</span>
```

#### `.glass-divider`
Glass divider line
```html
<hr class="glass-divider">
```

## Theme Variations

### C A R Z E N Color Schemes

| Theme | Primary | Secondary | Accent | Description |
|-------|---------|-----------|---------|-------------|
| **C** | #ff6b6b | #ffa726 | #ff7043 | Cosmic Red/Orange |
| **A** | #4fc3f7 | #29b6f6 | #00bcd4 | Aurora Blue |
| **R** | #66bb6a | #81c784 | #4caf50 | Rainbow Green |
| **Z** | #9c27b0 | #e91e63 | #f44336 | Zenith Purple/Red |
| **E** | #667eea | #f093fb | #4fc3f7 | **Default** Purple/Blue |
| **N** | #ff9800 | #ffc107 | #ffeb3b | Nebula Orange/Yellow |

### Switching Themes
```javascript
// Set theme
document.documentElement.setAttribute('data-theme', 'c');

// Get current theme
const currentTheme = document.documentElement.getAttribute('data-theme') || 'e';
```

## Glass Effect Variables

### Background Opacity Levels
- `--glass-bg-light`: 10% white opacity
- `--glass-bg-medium`: 15% white opacity  
- `--glass-bg-heavy`: 20% white opacity
- `--glass-bg-dark`: 20% black opacity

### Blur Effects
- `--glass-blur-light`: 5px blur
- `--glass-blur-medium`: 10px blur
- `--glass-blur-heavy`: 15px blur

### Shadows
- `--glass-shadow-light`: Subtle shadow
- `--glass-shadow-medium`: Medium shadow
- `--glass-shadow-heavy`: Heavy shadow

## Utility Classes

### Quick Modifiers
```html
<!-- Blur levels -->
<div class="glass-blur-light">Light blur</div>
<div class="glass-blur-medium">Medium blur</div>
<div class="glass-blur-heavy">Heavy blur</div>

<!-- Background levels -->
<div class="glass-bg-light">Light background</div>
<div class="glass-bg-medium">Medium background</div>
<div class="glass-bg-heavy">Heavy background</div>
<div class="glass-bg-dark">Dark background</div>

<!-- Border levels -->
<div class="glass-border-light">Light border</div>
<div class="glass-border-medium">Medium border</div>
<div class="glass-border-dark">Dark border</div>

<!-- Shadow levels -->
<div class="glass-shadow-light">Light shadow</div>
<div class="glass-shadow-medium">Medium shadow</div>
<div class="glass-shadow-heavy">Heavy shadow</div>
```

## Theme-Specific Effects

### Primary Buttons
```html
<button class="glass-button primary">Theme-colored button</button>
```
Uses `--theme-primary` and `--theme-secondary` for gradient

### Accent Cards
```html
<div class="glass-card accent">Accent-colored border</div>
```
Uses `--theme-accent` for border color

### Themed Panels
```html
<div class="glass-panel themed">Themed panel</div>
```
Uses `--theme-primary` for border and shadow

## How to Reference Elsewhere

### 1. **In HTML Files**
Simply add the class to any element:
```html
<div class="glass-container">
  <h2>My Content</h2>
  <button class="glass-button primary">Action</button>
</div>
```

### 2. **In CSS Files**
Reference the variables:
```css
.my-custom-element {
  background: var(--glass-bg-medium);
  backdrop-filter: var(--glass-blur-medium);
  border: 1px solid var(--glass-border-light);
  box-shadow: var(--glass-shadow-medium);
}
```

### 3. **In JavaScript**
Set themes dynamically:
```javascript
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
}

// Example usage
setTheme('c'); // Cosmic theme
setTheme('e'); // Default theme
```

### 4. **In Other Projects**
Copy the `assets/css/themes.css` file and include it:
```html
<link rel="stylesheet" href="path/to/themes.css">
```

## Best Practices

1. **Use semantic containers** - Choose the right glass class for your content
2. **Layer effects** - Combine multiple glass elements for depth
3. **Consider contrast ratios** for accessibility
4. **Test on mobile devices** to ensure responsive behavior
5. **Remember glass is translucent** - it blurs background colors and adds a slight grey only

## Troubleshooting

### Glass Effects Not Showing
- Ensure `backdrop-filter` is supported in your browser
- Check that the CSS file is properly linked
- Verify the `data-theme` attribute is set on the `<html>` element

### Theme Not Changing
- Make sure the theme attribute is set correctly: `data-theme="c"`
- Check that the CSS variables are being applied
- Clear browser cache if changes aren't appearing

### Mobile Issues
- Glass effects are automatically adjusted for mobile
- Blur effects may be reduced on older devices
- Consider using `@supports` for fallbacks

## Examples

### Complete Page Layout
```html
<!DOCTYPE html>
<html data-theme="e">
<head>
  <link rel="stylesheet" href="assets/css/themes.css">
</head>
<body>
  <nav class="glass-nav">
    <a href="/" class="glass-button">Home</a>
    <a href="/about" class="glass-button">About</a>
  </nav>
  
  <main>
    <div class="glass-container">
      <h1>Welcome</h1>
      <p>This page uses the C A R Z E N theme system!</p>
      <button class="glass-button primary">Get Started</button>
    </div>
    
    <div class="glass-card">
      <h2>Feature Card</h2>
      <p>Beautiful glass effects with hover animations.</p>
    </div>
  </main>
</body>
</html>
```

This system makes it incredibly easy to add beautiful glass morphism effects to any project with just a few CSS classes! 