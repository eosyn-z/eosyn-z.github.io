# Default Icons Directory

This directory contains default icons for the desktop environment.

## Icon Requirements:
- **Size**: 48x48px or 64x64px (PNG recommended)
- **Format**: PNG, SVG, or ICO
- **Style**: Consistent with the site's aesthetic

## Default Icons:
- `portfolio.png` - Portfolio app icon
- `music.png` - Music player icon  
- `search.png` - Search & pin icon
- `chat.png` - AI Chat icon
- `default.png` - Default fallback icon

## Adding New Icons:
1. Place your icon file in this directory
2. Update the `getDefaultIcons()` method in `desktop-manager.js`
3. Icons will be available in the icon picker

## Icon Naming Convention:
- Use lowercase with hyphens: `app-name.png`
- Keep names descriptive and consistent 