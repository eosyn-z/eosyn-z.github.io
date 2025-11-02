# Templates & Schemas

## Frontmatter Template

```yaml
---
title: "Article Title"
date: 2025-10-16
tags: [category-theory, math, ai]
excerpt: "Optional excerpt (auto-generated if omitted)"
sources:
  - url: https://arxiv.org/abs/2301.00001
    title: "Paper Title"
    type: arxiv
    authors: ["Author 1", "Author 2"]
    year: 2023
    notes: "Key insights"
  - url: https://pubmed.ncbi.nlm.nih.gov/12345678/
    title: "Study Title"
    type: pubmed
  - url: https://ncatlab.org/nlab/show/Category
    title: "Category Entry"
    type: nlab
  - url: https://doi.org/10.1234/example
    title: "DOI Reference"
    type: doi
  - url: https://example.com/article
    title: "Web Resource"
    type: web
---

# Article Content

Use [[Wiki Links]] to connect articles.
```

## Theme Template

Add to `themes.js`:

```javascript
mytheme: {
    name: 'My Theme',
    colors: {
        '--bg-primary': '#1a1a1a',
        '--bg-secondary': '#2a2a2a',
        '--bg-tertiary': '#0a0a0a',
        '--text-primary': '#ffffff',
        '--text-secondary': '#888888',
        '--accent-primary': '#ff6b6b',
        '--accent-secondary': '#4ecdc4',
        '--accent-tertiary': '#95e1d3',
        '--accent-success': '#06d6a0',
        '--accent-warning': '#ffd93d',
        '--accent-error': '#ef476f',
        '--border-color': '#444444',
        '--header-gradient-start': '#2a2a2a',
        '--header-gradient-end': '#3a3a3a'
    }
}
```

Then add to `index.html`:
```html
<option value="mytheme">My Theme</option>
```

## Content Folder Structure

```
content/
├── projects/
│   └── my-project.md
├── thoughts/
│   └── my-thought.md
├── learning/
│   └── my-notes.md
└── resources/
    └── my-resource.md
```

## Build Configuration

Edit `build.js`:

```javascript
const CONFIG = {
    contentFolders: [
        { name: 'Projects', path: 'content/projects' },
        { name: 'Thoughts', path: 'content/thoughts' },
        { name: 'Learning', path: 'content/learning' },
        { name: 'Resources', path: 'content/resources' }
    ],
    outputFile: 'manifest.json'
};
```
