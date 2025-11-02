# Quick Start Guide

Make a copy of EOSYN.NET in 5 minutes!

## 1. Install Node.js

Download from https://nodejs.org/ (choose LTS version)

Verify installation:
```bash
node --version
```

## 2. Configure Your Site

Edit `config/settings.txt`:
```
SITE_TITLE=Your Name
MOTD=Your tagline here
DEFAULT_THEME=monokai
```

## 3. Add Your Content

Create markdown files in:
- `content/projects/` - Your projects
- `content/thoughts/` - Blog posts
- `content/learning/` - Notes, TILs
- `content/resources/` - Links, references

Example file (`content/projects/my-project.md`):
```markdown
---
title: "My First Project"
date: 2025-10-21
tags: [web, javascript]
---

# My First Project

Description of what you built...
```

## 4. Add Recommended Sites (Optional)

Edit `config/sites.txt`:
```
SITE=GitHub|https://github.com|Code hosting|Tool,Learning
SITE=Your Site|https://example.com|Description|Personal,Portfolio
```

## 5. Build Your Site

```bash
npm install       # First time only
npm run build     # Build the site
```

## 6. Test Locally

```bash
npx serve .
```

Open http://localhost:3000

## 7. Deploy to GitHub Pages

```bash
git init
git add .
git commit -m "My portfolio site"
git branch -M main
git remote add origin https://github.com/yourusername/yourrepo.git
git push -u origin main
```

Then:
1. Go to GitHub repo Settings > Pages
2. Source: GitHub Actions
3. Wait 1-2 minutes
4. Visit `https://yourusername.github.io/yourrepo/`

Done! Your site auto-rebuilds on every git push.

## Need Help?

- Full documentation: [docs/README.md](docs/README.md)
- Main README: [README.md](README.md)
