# Portfolio Website Documentation

Hi, I'm EOSYN!
I made this personal site based off of what I wanted. If you're a fan at all, I included some configuration options so you could make it your own with little modification if you want to use it as a template. Feel free to copy it and put your stuff in there.

Note that Lanyard won't work unless you join their Discord server to expose your presence!

## Quick Start

```bash
npm install          # Install dependencies
npm run build        # Build site
npx serve .          # Run locally at http://localhost:3000
```

---

## Configuration

All customization happens in `config/settings.txt` - no coding required.

### Basic Settings

```
SITE_TITLE=Your Name
MOTD=A short tagline or status message
DEFAULT_THEME=monokai
```

**Available themes:** `monokai`, `dracula`, `nord`, `light`, `alice`

### Discord Integration (Optional)

1. Open Discord > Settings > Advanced
2. Enable "Developer Mode"
3. Right-click your username > Copy User ID
4. Paste in config/settings.txt:
   ```
   DISCORD_USER_ID=917811383876341820
   ```

### Feature Toggles

```
DESKTOP_MODE_ENABLED=false        # Window-based OS interface
NATURE_GALLERY_ENABLED=true       # Animated backgrounds page
ART_GALLERY_CARD_ENABLED=true     # Art carousel on home page
```

### Nature Gallery Images

Add animated GIFs for the nature gallery page:

```
NATURE_IMAGE=https://example.com/image.gif|forest|happy|sunny|day|Tumblr
```

**Format:** `url|group|vibe|weather|time|credit`

- **Groups:** forest, water, ocean, clouds, mountains, tech, anime, plants
- **Vibes:** happy, neutral, gloomy
- **Weather:** sunny, clear, rainy
- **Time:** day, night

After adding images, run: `npm run build`

---

## Adding Content

Content lives in `content/` folders:

```
content/
├── projects/       (Your projects)
├── thoughts/       (Blog posts, ideas)
├── learning/       (TILs, tutorials)
└── resources/      (Links, tools)
```

### Creating a New Page

1. Create a file: `content/projects/my-project.md`
2. Add frontmatter:

```markdown
---
title: "My Project"
date: 2025-10-21
tags: [javascript, web]
sources:
  - url: https://example.com
    title: "Reference"
    type: link
---

# My Project

Content goes here...

## What I Built

More content...
```

### Markdown Syntax

```markdown
# Heading 1
## Heading 2

**bold** *italic*

- Bullet point
1. Numbered list

[Link](https://example.com)
![Image](./image.png)
```

### Wiki-Style Links

Link between pages using double brackets:

```markdown
See also [[Learning in Public]]
```

This creates automatic backlinks.

### After Adding Content

Always rebuild:
```bash
npm run build
```

---

## Frontmatter Schema

See `TEMPLATES.md` for complete examples.

**Minimum required:**

```yaml
---
title: "Page Title"
date: 2025-10-21
---
```

**With citations:**

```yaml
---
title: "Research Notes"
date: 2025-10-21
tags: [ai, research]
sources:
  - url: https://arxiv.org/abs/2301.00001
    title: "Paper Title"
    type: arxiv
    authors: ["Author One", "Author Two"]
    year: 2023
---
```

**Citation types:** `arxiv`, `pubmed`, `nlab`, `doi`, `link`

---

## Gallery Setup

### Art Gallery (Local Files)

1. Add images to `gallery/art/`
2. Titles auto-generate from filenames
3. Run `npm run build`

### Nature Gallery (External URLs)

1. Edit `config/settings.txt`
2. Add `NATURE_IMAGE` lines (see Configuration section)
3. Run `npm run build`

Both galleries are configured in `config/settings.txt`:
```
NATURE_GALLERY_ENABLED=true
ART_GALLERY_CARD_ENABLED=true
```

---

## Deployment

### GitHub Pages

1. Create GitHub repository
2. Push code:
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/username/repo.git
   git push -u origin main
   ```
3. Settings > Pages > Source: `main` branch
4. Site live at: `https://username.github.io/repo/`

The included `.github/workflows/build.yml` auto-builds on push.

### Netlify / Vercel

1. Sign up (free)
2. Import from GitHub or drag-and-drop folder
3. Build command: `npm run build`
4. Deploy

---

## Troubleshooting

### Build Fails

```bash
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Changes Not Showing

Did you run `npm run build`? Required after:
- Editing content files
- Changing config/settings.txt
- Adding gallery images

### Images Not Loading

- **Nature gallery:** Check URLs still work (paste in browser)
- **Art gallery:** Files in `gallery/art/` + ran `npm run build`?

### Discord Presence Not Working

- Verify User ID is correct
- Check you're online on Discord
- Discord privacy settings allow status visibility

---

## Project Structure

```
├── content/          # Markdown content
│   ├── projects/
│   ├── thoughts/
│   ├── learning/
│   └── resources/
├── docs/            # Documentation
├── gallery/         # Images
│   ├── art/         # Local art images
│   └── images.json  # Generated (don't edit)
├── games/           # Game scripts
├── pages/           # Additional HTML pages
├── build.js         # Build script
├── config/settings.txt     # Configuration
├── manifest.json    # Generated (don't edit)
└── index.html       # Main entry point
```

---

## Features

- Build-time citation system (arXiv, PubMed, nLab, DOI)
- Wiki-style backlinks
- Knowledge graph with pre-computed nodes/links
- Full-text search with relevance scoring
- Notes system with edit history
- 5 themes
- Terminal interface
- Desktop mode (window management)
- Nature gallery (multi-filter backgrounds)
- Art gallery carousel
- GitHub Actions auto-build

---

## Terminal Commands

Type in terminal interface:

```
help           - Show commands
theme          - Show current theme
theme [name]   - Switch theme
p, t, l, r     - Navigate sections (Projects/Thoughts/Learning/Resources)
clear          - Clear terminal
status         - Show stats
```

---

## Advanced: Home Page Customization

Edit `home.html` to customize the landing page.

**Available functions:**

- `window.showSection('projects')` - Navigate to section
- `window.showPage('projects', 'slug')` - Navigate to page
- `window.PortfolioApp.contentData` - Access content data

**Auto-updating elements:**

```html
<span id="totalPages">0</span>
<span id="totalSections">0</span>
<span id="totalWords">0</span>
```

See the existing `home.html` for a complete example.

---

No frameworks. Pure performance. Open source.

### Recommended Sites

Add your favorite websites to `config/sites.txt`:

```
SITE=GitHub|https://github.com|Software development platform|tools,code,development
SITE=Stack Overflow|https://stackoverflow.com|Developer Q&A|tools,help,learning
```

**Format:** `SITE=Title|URL|Description|tags,separated,by,commas`

After adding sites, run: `npm run build`

**Features:**
- Browse all recommended sites
- Search by title, description, or tags
- Bookmark sites for quick access (saved in browser)
- Switch between "Recommended" and "My Bookmarks" tabs

Access the sites page via the "Sites" link in navigation.

