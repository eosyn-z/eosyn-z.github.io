# Gallery System

This folder contains the auto-generated `images.json` file for the Nature and Art galleries.

## Quick Setup

### Nature Gallery (Cinemagraphs - External URLs)

Edit `config/settings.txt` in the root directory and add:

```
NATURE_IMAGE=https://example.com/cinemagraph.gif|forest|happy|sunny|day|Tumblr
```

**Format:** `url|group|vibe|weather|time|credit`

- **group**: forest, water, ocean, clouds, mountains, tech, anime, plants
- **vibe**: happy, neutral, gloomy
- **weather**: sunny, clear, rainy
- **time**: day, night
- **credit**: Source attribution (Tumblr, Pinterest, etc.)

### Art Gallery (Local Files)

1. Drop image files (`.jpg`, `.jpeg`, `.png`, `.gif`, `.webp`) into `gallery/art/`
2. Titles are auto-generated from filenames

## Build Process

After making changes:

```bash
node build.js
```

This generates `gallery/images.json` from:
- `NATURE_IMAGE` entries in `config/settings.txt`
- Files in `gallery/art/` folder

## Feature Toggles

In `config/settings.txt`:

```
NATURE_GALLERY_ENABLED=true         # Shows "Nature" link in nav
ART_GALLERY_CARD_ENABLED=true       # Shows art carousel on home page
```

## Examples

### Adding a Nature Cinemagraph

```
# config/settings.txt
NATURE_IMAGE=https://64.media.tumblr.com/example.gif|water|neutral|clear|day|Tumblr
```

### Adding Art

```bash
# Just drop files in gallery/art/
cp my-artwork.gif gallery/art/
node build.js
```

## Notes

- Nature images use **external URLs** (not stored locally)
- Art images are **local files** in `gallery/art/`
- `images.json` is auto-generated - don't edit manually
- Run `node build.js` after any changes
