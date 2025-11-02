# Archive - Obsidian Vault

This directory supports **recursive folder structures** for organizing your Obsidian vault or any markdown knowledge base.

## How it works

- Place markdown files anywhere in `content/archive/` - in any subfolder depth
- Run `npm run build` to scan all subdirectories recursively
- Files will preserve their folder structure in URLs (e.g., `archive/coding/javascript/async.md`)
- Supports wiki-linking `[[Other Note]]` and backlinks
- Supports frontmatter for metadata

## Example structure

```
content/archive/
├── daily-notes/
│   ├── 2024-01-15.md
│   └── 2024-01-16.md
├── projects/
│   ├── website/
│   │   ├── design-notes.md
│   │   └── technical-specs.md
│   └── app/
│       └── features.md
└── learning/
    ├── javascript/
    │   ├── async.md
    │   └── promises.md
    └── python/
        └── generators.md
```

All these files will be discoverable and linkable on your site!
