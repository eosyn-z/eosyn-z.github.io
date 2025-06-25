---
layout: default
title: Search & Pin
permalink: /search/
icon: 🔍
description: "Search for websites, filter content, and manage your bookmarks."
---

<style>
.filter-btn {
  padding: 0.5rem 1rem;
  border: 1px solid var(--glass-border-light);
  background: var(--glass-bg-medium);
  color: var(--theme-text);
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.9rem;
}

.filter-btn:hover {
  background: var(--glass-bg-heavy);
  transform: translateY(-1px);
}

.filter-btn.active {
  background: var(--theme-accent);
  color: white;
  border-color: var(--theme-accent);
}

.filter-btn.active:hover {
  background: var(--theme-accent-dark);
}

.website-card {
  background: var(--glass-bg-light);
  border: 1px solid var(--glass-border-light);
  border-radius: 12px;
  padding: 1.5rem;
  position: relative;
  transition: all 0.3s ease;
}

.website-card:hover {
  transform: translateY(-2px);
  box-shadow: var(--glass-shadow-heavy);
}

.website-card h4 a {
  color: var(--theme-accent);
  text-decoration: none;
  font-size: 1.2rem;
}

.website-card p {
  color: var(--text-secondary);
  font-size: 0.95rem;
  margin: 0.5rem 0 1rem;
}

.website-card .tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.website-card .tags span {
  background: var(--glass-bg-medium);
  padding: 0.3rem 0.7rem;
  border-radius: 6px;
  font-size: 0.8rem;
  margin: 0.2rem;
}

.bookmark-btn.bookmarked {
  background: var(--theme-accent);
  color: white;
}

.desktop-btn.on-desktop {
  background: var(--theme-success);
  color: white;
}

.desktop-btn.on-desktop:hover {
  background: var(--theme-success-dark);
}

/* Star button styles */
.star-button {
  position: absolute;
  top: 10px;
  right: 10px;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: 50%;
  background: var(--glass-bg-medium);
  color: var(--theme-text-secondary);
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  transition: all 0.3s ease;
  z-index: 10;
  backdrop-filter: var(--glass-blur-medium);
  border: 1px solid var(--glass-border-light);
}

.star-button:hover {
  background: var(--glass-bg-heavy);
  color: var(--theme-accent);
  transform: scale(1.1);
}

.star-button.bookmarked {
  color: #ffd700;
  background: var(--glass-bg-heavy);
  animation: starPulse 0.3s ease;
}

.star-button.bookmarked:hover {
  color: #ffed4e;
  transform: scale(1.1);
}

@keyframes starPulse {
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
}

.star-button.disabled {
  opacity: 0.5;
  cursor: not-allowed;
  pointer-events: none;
}

.star-button.disabled:hover {
  transform: none;
  background: var(--glass-bg-medium);
  color: var(--theme-text-secondary);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .social-forums-section {
    flex-direction: column;
  }
  
  .social-forums-section .glass-card {
    flex: none;
    width: 100%;
  }
  
  .filter-buttons {
    justify-content: center;
  }
  
  .filter-buttons .glass-button {
    flex: 1;
    min-width: 120px;
    text-align: center;
  }
}

.tray-content {
  overflow-x: auto;
  white-space: nowrap;
  scrollbar-width: thin;
  scrollbar-color: var(--theme-accent) var(--glass-bg-medium);
}

/* Chrome, Edge, Safari */
.tray-content::-webkit-scrollbar {
  height: 10px;
  background: var(--glass-bg-medium);
  border-radius: 8px;
}
.tray-content::-webkit-scrollbar-thumb {
  background: var(--theme-accent);
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.15);
}
.tray-content::-webkit-scrollbar-thumb:hover {
  background: var(--theme-accent-dark);
}
</style>

<div class="main-content glass-container">
  <div class="glass-card" style="margin-bottom: 2rem; padding: 2rem;">
    <header class="page-header" style="margin-bottom: 0; text-align: center;">
        <h1>some cool or helpful websites</h1>
        <p>Discover amazing tools, resources, and websites</p>
      </header>
  </div>
  
  <div class="glass-card" style="margin-bottom: 2rem; padding: 2rem;">
    <div class="search-section">
      <input type="text" id="searchBar" class="glass-input" placeholder="Search websites by name, tag, or description..." style="width: 100%; margin-bottom: 20px; padding: 1rem;">
      
      <!-- Filter Buttons -->
      <div class="filter-buttons" style="display: flex; gap: 0.5rem; flex-wrap: wrap; margin-bottom: 1rem;">
        <button class="filter-btn glass-button active" data-filter="all">All</button>
        <button class="filter-btn glass-button" data-filter="personal">Personal</button>
        <button class="filter-btn glass-button" data-filter="tools">Tools</button>
        <button class="filter-btn glass-button" data-filter="company">Company</button>
        <button class="filter-btn glass-button" data-filter="documentation">Documentation</button>
        <button class="filter-btn glass-button" data-filter="repository">Repository</button>
        <button class="filter-btn glass-button" data-filter="archive">Archive</button>
        <button class="filter-btn glass-button" data-filter="in-construction">🚧 In Construction</button>
        <button class="filter-btn glass-button" data-filter="github-portfolio">📁 GitHub Portfolio</button>
        <button class="filter-btn glass-button" data-filter="bookmark">🔖 Bookmarks</button>
      </div>
    </div>
  </div>

  <!-- Social & Forums Section -->
  <div class="social-forums-section" style="display: flex; gap: 1.5rem; margin-bottom: 2rem;">
    
    <!-- Social Websites Container -->
    <div class="glass-card" style="flex: 3; padding: 2rem;">
      <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--theme-text);">Social Websites</h3>
      <div class="link-group" style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
        <a href="https://twitter.com" class="glass-button" target="_blank">Twitter</a>
        <a href="https://discord.com" class="glass-button" target="_blank">Discord</a>
        <a href="https://youtube.com" class="glass-button" target="_blank">YouTube</a>
        <a href="https://twitch.tv" class="glass-button" target="_blank">Twitch</a>
        <a href="https://github.com" class="glass-button" target="_blank">GitHub</a>
        <a href="https://dev.to" class="glass-button" target="_blank">Dev.to</a>
        <a href="https://dribbble.com" class="glass-button" target="_blank">Dribbble</a>
        <a href="https://behance.net" class="glass-button" target="_blank">Behance</a>
        <a href="https://pinterest.com" class="glass-button" target="_blank">Pinterest</a>
        <a href="https://medium.com" class="glass-button" target="_blank">Medium</a>
        <a href="https://hashnode.com" class="glass-button" target="_blank">Hashnode</a>
      </div>
    </div>
    
    <!-- Forums & Communities Container -->
    <div class="glass-card" style="flex: 1; padding: 2rem;">
      <h3 style="margin-top: 0; margin-bottom: 1.5rem; color: var(--theme-text);">Forums & Communities</h3>
      <div class="link-group" style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
        <a href="https://stackoverflow.com" class="glass-button" target="_blank">Stack Overflow</a>
        <a href="https://reddit.com/r/art" class="glass-button" target="_blank">r/art</a>
      </div>
    </div>
  </div>

  <div class="glass-card" style="padding: 2rem;">
    <div class="website-grid" id="websiteGrid">
      <!-- Websites will be populated here -->
    </div>
  </div>
</div>

<script>
document.addEventListener('DOMContentLoaded', () => {

  const sites = [
    {
        title: "GitHub",
        description: "The world's leading software development platform",
        url: "https://github.com",
        tags: ["tools", "company", "documentation", "code-storage", "version-control", "collaboration", "project-management", "open-source", "deployment", "ci-cd", "code-review"],
    },
    {
        title: "Stack Overflow",
        description: "Where developers learn, share, & build careers",
        url: "https://stackoverflow.com",
        tags: ["tools", "company", "documentation", "q&a", "problem-solving", "learning", "community", "debugging", "troubleshooting", "code-examples"],
    },
    {
        title: "CSS-Tricks",
        description: "Tips, tricks, and techniques for CSS",
        url: "https://css-tricks.com",
        tags: ["personal", "tpot", "tools", "documentation", "css-learning", "tutorials", "examples", "reference", "frontend", "styling", "layout", "responsive-design"],
    },
    {
        title: "Smashing Magazine",
        description: "For professional web designers and developers",
        url: "https://www.smashingmagazine.com",
        tags: ["company", "tools", "documentation", "web-design", "tutorials", "articles", "resources", "ux-ui", "accessibility", "performance", "best-practices"],
    },
    {
        title: "A List Apart",
        description: "For people who make websites",
        url: "https://alistapart.com",
        tags: ["company", "tools", "documentation", "web-standards", "best-practices", "articles", "learning", "accessibility", "semantic-html", "css", "javascript"],
    },
    {
        title: "Codrops",
        description: "Creative front-end resources and inspiration",
        url: "https://tympanus.net/codrops",
        tags: ["personal", "tpot", "tools", "documentation", "inspiration", "experiments", "tutorials", "creative-coding", "animations", "interactions", "css-effects", "javascript-effects"],
    },
    {
        title: "Figma",
        description: "The collaborative interface design tool",
        url: "https://www.figma.com",
        tags: ["company", "tools", "design", "prototyping", "collaboration", "ui-ux", "wireframing", "design-systems", "components", "plugins"],
    },
    {
        title: "Notion",
        description: "All-in-one workspace for notes, docs, and collaboration",
        url: "https://www.notion.so",
        tags: ["company", "tools", "note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"],
    },
    {
        title: "Linear",
        description: "Issue tracking tool for high-performance teams",
        url: "https://linear.app",
        tags: ["company", "tools", "project-management", "issue-tracking", "team-collaboration", "roadmaps", "sprints", "kanban", "agile"],
    },
    {
        title: "W3Schools",
        description: "Web development learning platform with tutorials and references",
        url: "https://www.w3schools.com",
        tags: ["tools", "company", "documentation", "learning", "tutorials", "reference", "examples", "html", "css", "javascript", "sql", "python", "php"],
    },
    {
        title: "freeCodeCamp",
        description: "Learn to code for free with interactive tutorials",
        url: "https://www.freecodecamp.org",
        tags: ["tools", "company", "documentation", "learning", "interactive-tutorials", "certification", "projects", "html-css", "javascript", "react", "nodejs", "databases"],
    },
    {
        title: "MDN Web Docs",
        description: "The Mozilla Developer Network - comprehensive web documentation",
        url: "https://developer.mozilla.org",
        tags: ["tools", "company", "documentation", "reference", "tutorials", "web-standards", "html", "css", "javascript", "apis", "web-apis"],
    },
    {
        title: "React Documentation",
        description: "Official React documentation and tutorials",
        url: "https://react.dev",
        tags: ["tools", "company", "documentation", "tutorials", "examples", "reference", "react", "hooks", "components", "state-management"],
    },
    {
        title: "Vue.js",
        description: "Progressive JavaScript framework",
        url: "https://vuejs.org",
        tags: ["tools", "company", "documentation", "framework", "documentation", "tutorials", "examples", "vue", "components", "composition-api", "ecosystem"],
    },
    {
        title: "TypeScript",
        description: "Typed JavaScript for better development",
        url: "https://www.typescriptlang.org",
        tags: ["tools", "company", "documentation", "programming-language", "type-safety", "documentation", "compiler", "javascript", "static-analysis", "ide-support", "refactoring"],
    },
    {
        title: "Vercel",
        description: "Frontend deployment platform",
        url: "https://vercel.com",
        tags: ["tools", "company", "deployment", "hosting", "serverless", "ci-cd", "edge-functions", "domains", "analytics", "preview-deployments"],
    },
    {
        title: "Netlify",
        description: "Web hosting and deployment platform",
        url: "https://netlify.com",
        tags: ["tools", "company", "deployment", "hosting", "forms", "cms", "functions", "redirects", "headers", "build-tools"],
    },
    {
        title: "Firebase",
        description: "Backend-as-a-Service by Google",
        url: "https://firebase.google.com",
        tags: ["tools", "company", "backend-as-a-service", "authentication", "database", "hosting", "cloud-functions", "analytics", "messaging", "storage"],
    },
    {
        title: "MongoDB",
        description: "Document database for modern applications",
        url: "https://www.mongodb.com",
        tags: ["tools", "company", "documentation", "database", "nosql", "data-storage", "scalability", "aggregation", "indexing", "replication", "sharding"],
    },
    {
        title: "Node.js",
        description: "JavaScript runtime for server-side development",
        url: "https://nodejs.org",
        tags: ["tools", "company", "documentation", "runtime", "server-side", "npm", "javascript", "event-driven", "non-blocking", "package-management", "ecosystem"],
    },
    {
        title: "Express.js",
        description: "Web framework for Node.js",
        url: "https://expressjs.com",
        tags: ["tools", "company", "documentation", "web-framework", "api", "middleware", "routing", "nodejs", "http-server", "static-files", "templating"],
    },
    {
        title: "Next.js",
        description: "React framework for production",
        url: "https://nextjs.org",
        tags: ["tools", "company", "documentation", "react-framework", "ssr", "ssg", "routing", "api-routes", "image-optimization", "performance", "deployment"],
    },
    {
        title: "Tailwind CSS",
        description: "Utility-first CSS framework",
        url: "https://tailwindcss.com",
        tags: ["tools", "company", "documentation", "css-framework", "utility-classes", "responsive-design", "customization", "components", "dark-mode", "purge-css", "jit-compiler"],
    },
    {
        title: "Git",
        description: "Version control system",
        url: "https://git-scm.com",
        tags: ["tools", "company", "documentation", "version-control", "collaboration", "branching", "history", "merging", "stashing", "rebase", "hooks"],
    },
    {
        title: "Postman",
        description: "API development platform",
        url: "https://www.postman.com",
        tags: ["tools", "company", "api", "testing", "development", "documentation", "collections", "environments", "automation", "collaboration"],
    },
    {
        title: "Can I Use",
        description: "Browser compatibility tables",
        url: "https://caniuse.com",
        tags: ["tools", "personal", "tpot", "browser-support", "compatibility", "reference", "web-standards", "css", "javascript", "html", "apis"],
    },
    {
        title: "Web.dev",
        description: "Modern web development guide by Google",
        url: "https://web.dev",
        tags: ["tools", "company", "documentation", "web-development", "performance", "pwa", "accessibility", "seo", "best-practices", "tutorials", "analysis"],
    },
    {
        title: "Angular",
        description: "Full-featured framework for building applications",
        url: "https://angular.io",
        tags: ["tools", "company", "documentation", "framework", "documentation", "tutorials", "cli-tools", "typescript", "dependency-injection", "routing", "forms"],
    },
    {
        title: "Flutter",
        description: "Cross-platform UI toolkit",
        url: "https://flutter.dev",
        tags: ["tools", "company", "documentation", "mobile-development", "cross-platform", "ui-framework", "hot-reload", "dart", "widgets", "state-management", "packages"],
    },
    {
        title: "Socket.io",
        description: "Real-time communication library",
        url: "https://socket.io",
        tags: ["tools", "company", "documentation", "real-time", "websockets", "communication", "api", "chat", "gaming", "collaboration", "live-updates"],
    },
    {
        title: "PostgreSQL",
        description: "Advanced open-source database",
        url: "https://www.postgresql.org",
        tags: ["tools", "company", "documentation", "database", "sql", "data-storage", "scalability", "acid-compliance", "json-support", "full-text-search", "extensions"],
    },
    {
        title: "Tauri",
        description: "Desktop app framework",
        url: "https://tauri.app",
        tags: ["tools", "company", "documentation", "desktop-apps", "cross-platform", "performance", "security", "rust", "webview", "native-apis", "bundling"],
    },
    {
        title: "Electron",
        description: "Cross-platform desktop apps with web technologies",
        url: "https://www.electronjs.org",
        tags: ["tools", "company", "documentation", "desktop-apps", "cross-platform", "web-technologies", "packaging", "distribution", "auto-updater", "native-modules", "chromium"],
    },
    {
        title: "Docker",
        description: "Containerization platform",
        url: "https://www.docker.com",
        tags: ["tools", "company", "documentation", "containerization", "deployment", "devops", "microservices", "orchestration", "images", "volumes", "networking"],
    },
    {
        title: "AWS",
        description: "Cloud computing platform",
        url: "https://aws.amazon.com",
        tags: ["tools", "company", "documentation", "cloud-computing", "hosting", "storage", "ai-ml", "serverless", "containers", "databases", "security"],
    },
    {
        title: "Google Cloud",
        description: "Cloud computing services",
        url: "https://cloud.google.com",
        tags: ["tools", "company", "documentation", "cloud-computing", "hosting", "storage", "ai-ml", "kubernetes", "bigquery", "firestore", "functions"],
    },
    {
        title: "Unity",
        description: "Game development platform",
        url: "https://unity.com",
        tags: ["tools", "company", "documentation", "game-development", "3d", "2d", "cross-platform", "physics", "animation", "audio", "asset-store"],
    },
    {
        title: "Unreal Engine",
        description: "3D creation tool for games and visualization",
        url: "https://www.unrealengine.com",
        tags: ["tools", "company", "documentation", "game-development", "3d", "visualization", "vr-ar", "blueprints", "materials", "lighting", "cinematics"],
    },
    {
        title: "CodePen",
        description: "Frontend code playground",
        url: "https://codepen.io",
        tags: ["tools", "personal", "tpot", "code-editor", "frontend", "css", "javascript", "html", "inspiration", "showcase", "learning"],
    },
    {
        title: "Glitch",
        description: "Friendly coding community and platform",
        url: "https://glitch.com",
        tags: ["tools", "company", "code-editor", "deployment", "collaboration", "learning", "web-development", "javascript", "nodejs", "community"],
    },
    {
        title: "Replit",
        description: "Collaborative browser IDE",
        url: "https://replit.com",
        tags: ["tools", "company", "code-editor", "deployment", "collaboration", "learning", "web-development", "python", "javascript", "education"],
    },
    {
        title: "Stripe",
        description: "Payment processing platform",
        url: "https://stripe.com",
        tags: ["tools", "company", "documentation", "payments", "e-commerce", "api", "security", "subscriptions", "invoicing", "taxes", "fraud-prevention"],
    },
    {
        title: "Expo",
        description: "React Native platform",
        url: "https://expo.dev",
        tags: ["tools", "company", "documentation", "mobile-development", "react-native", "deployment", "testing", "sdk", "cli", "ejected", "managed-workflow"],
    },
    {
        title: "Cursor",
        description: "AI-powered code editor",
        url: "https://cursor.sh",
        tags: ["tools", "company", "code-editor", "ai-assistance", "debugging", "learning", "chat", "code-generation", "refactoring", "explanation"],
    },
    {
        title: "Wisk",
        description: "Modern Notion alternative",
        url: "https://wisk.cc",
        tags: ["tools", "personal", "tpot", "note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"],
    },
    {
        title: "cameronsworld",
        description: "Web aesthetic archive and inspiration",
        url: "https://cameronsworld.net",
        tags: ["personal", "tpot", "tools", "inspiration", "web-aesthetics", "archive", "retro-web", "design-inspiration", "creative-coding"],
    },
    {
        title: "everything2",
        description: "Collaborative writing and knowledge base",
        url: "https://everything2.com",
        tags: ["personal", "tpot", "tools", "collaborative-writing", "knowledge-base", "community", "articles", "learning", "reference"],
    },
    {
        title: "codespaced.com",
        description: "Development platform and tools",
        url: "https://codespaced.com",
        tags: ["tools", "company", "development-platform", "tools", "coding", "productivity"],
    },
    {
        title: "strwb.com",
        description: "Personal website and portfolio",
        url: "https://strwb.com",
        tags: ["personal", "tpot", "tools", "portfolio", "personal-site", "inspiration", "web-design"],
    },
    {
        title: "cyb3r17.space",
        description: "Personal portfolio with ML focus",
        url: "https://cyb3r17.space",
        tags: ["personal", "tpot", "tools", "portfolio", "machine-learning", "personal-site", "ai", "research"],
    },
    {
        title: "Wayback Machine",
        description: "Internet archive and historical web snapshots",
        url: "https://web.archive.org",
        tags: ["tools", "company", "archive", "historical-data", "web-history", "research", "reference"],
    },
    {
        title: "Archive.today",
        description: "Web archiving service",
        url: "https://archive.today",
        tags: ["tools", "personal", "tpot", "archive", "web-snapshots", "research", "reference", "historical-data"],
    },
    {
        title: "GitLab",
        description: "DevOps platform and Git repository manager",
        url: "https://gitlab.com",
        tags: ["tools", "company", "repository", "version-control", "ci-cd", "devops", "collaboration", "project-management", "deployment"],
    },
    {
        title: "Bitbucket",
        description: "Git code hosting and collaboration platform",
        url: "https://bitbucket.org",
        tags: ["tools", "company", "repository", "version-control", "collaboration", "project-management", "code-review", "deployment"],
    },
    {
        title: "Hacker News",
        description: "Social news website focusing on computer science and entrepreneurship",
        url: "https://news.ycombinator.com",
        tags: ["tools", "personal", "tpot", "news", "community", "programming", "technology", "discussion", "startups"],
    },
    {
        title: "Convert Tool",
        description: "CLI tool for image conversion and markdown to PDF by @SuleDevSec",
        url: "https://github.com/Sule57/convert",
        tags: ["tools", "repository", "cli-tool", "image-conversion", "markdown", "pdf", "utilities"],
    },
    {
        title: "My Portfolio (Coming Soon)",
        description: "Personal portfolio website currently under development",
        url: "#",
        tags: ["personal", "tpot", "portfolio", "in-construction", "coming-soon"],
    },
    {
        title: "Art Gallery Project",
        description: "Digital art showcase platform - work in progress",
        url: "#",
        tags: ["personal", "tpot", "art", "gallery", "in-construction", "creative"],
    },
    {
        title: "Dev Blog",
        description: "Technical blog about web development and design - under construction",
        url: "#",
        tags: ["personal", "tpot", "blog", "development", "in-construction", "writing"],
    },
    {
        title: "Game Development Studio",
        description: "Indie game studio website - currently being built",
        url: "#",
        tags: ["personal", "tpot", "games", "studio", "in-construction", "gaming"],
    },
    {
        title: "Learning Platform",
        description: "Educational platform for coding tutorials - in development",
        url: "#",
        tags: ["tools", "education", "learning", "in-construction", "tutorials"],
    },
    {
        title: "GitHub Portfolio Template",
        description: "A clean GitHub portfolio template for developers",
        url: "https://github.com/username/github-portfolio-template",
        tags: ["tools", "repository", "github-portfolio", "template", "portfolio", "github"],
    },
    {
        title: "Developer Portfolio Starter",
        description: "Starter template for GitHub Pages portfolio",
        url: "https://github.com/username/portfolio-starter",
        tags: ["tools", "repository", "github-portfolio", "starter", "template", "github-pages"],
    },
    {
        title: "React Portfolio Template",
        description: "Modern React-based portfolio template",
        url: "https://github.com/username/react-portfolio",
        tags: ["tools", "repository", "github-portfolio", "react", "template", "portfolio"],
    },
    {
        title: "Vue.js Portfolio",
        description: "Vue.js portfolio template with animations",
        url: "https://github.com/username/vue-portfolio",
        tags: ["tools", "repository", "github-portfolio", "vue", "template", "animations"],
    }
  ];

  const grid = document.getElementById('websiteGrid');
  const searchBar = document.getElementById('searchBar');
  const filterButtons = document.querySelectorAll('.filter-btn');
  let activeFilter = 'all';

  // Load bookmarked sites from cookies
  function loadBookmarks() {
    const bookmarks = getCookie('bookmarkedSites');
    return bookmarks ? JSON.parse(bookmarks) : [];
  }

  // Save bookmarked sites to cookies
  function saveBookmarks(bookmarks) {
    setCookie('bookmarkedSites', JSON.stringify(bookmarks), 365);
  }

  // Cookie helper functions
  function setCookie(name, value, days) {
    const expires = new Date();
    expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = name + '=' + encodeURIComponent(value) + ';expires=' + expires.toUTCString() + ';path=/';
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }

  // Add bookmark to a site
  function addBookmark(site) {
    const bookmarks = loadBookmarks();
    if (!bookmarks.find(b => b.url === site.url)) {
      bookmarks.push(site);
      saveBookmarks(bookmarks);
      return true;
    }
    return false;
  }

  // Remove bookmark from a site
  function removeBookmark(site) {
    const bookmarks = loadBookmarks();
    const filteredBookmarks = bookmarks.filter(b => b.url !== site.url);
    saveBookmarks(filteredBookmarks);
    return filteredBookmarks.length !== bookmarks.length;
  }

  // Check if a site is bookmarked
  function isBookmarked(site) {
    const bookmarks = loadBookmarks();
    return bookmarks.some(b => b.url === site.url);
  }

  function renderSites(filter = 'all', searchTerm = '') {
    console.log('renderSites called with:', { filter, searchTerm });
    grid.innerHTML = '';
    searchTerm = searchTerm.toLowerCase();

    let filteredSites;
    
    if (filter === 'bookmark') {
      // Show only bookmarked sites
      filteredSites = loadBookmarks();
      console.log('Bookmark filter - found sites:', filteredSites.length);
    } else {
      // Filter from all sites
      filteredSites = sites.filter(site => {
        const matchesFilter = filter === 'all' || site.tags.includes(filter);
        const matchesSearch = searchTerm === '' || 
                              site.title.toLowerCase().includes(searchTerm) || 
                              site.description.toLowerCase().includes(searchTerm) || 
                              site.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        return matchesFilter && matchesSearch;
      });
      
      console.log('Filtered sites:', filteredSites.length, 'for filter:', filter, 'search:', searchTerm);
      
      // Also include bookmarked sites that match the search term (if not already in results)
      if (searchTerm !== '') {
        const bookmarks = loadBookmarks();
        const matchingBookmarks = bookmarks.filter(site => {
          const matchesSearch = site.title.toLowerCase().includes(searchTerm) || 
                               site.description.toLowerCase().includes(searchTerm) || 
                               site.tags.some(tag => tag.toLowerCase().includes(searchTerm));
          const notAlreadyIncluded = !filteredSites.some(s => s.url === site.url);
          return matchesSearch && notAlreadyIncluded;
        });
        filteredSites = [...filteredSites, ...matchingBookmarks];
        console.log('Added bookmarks:', matchingBookmarks.length);
      }
    }

    if (filteredSites.length === 0) {
      grid.innerHTML = '<p style="text-align: center; color: var(--text-secondary);">No sites found matching your criteria.</p>';
      console.log('No sites found');
      return;
    }
    
    // Sort sites: personal sites first, then alphabetically
    filteredSites.sort((a, b) => {
      const aIsPersonal = a.tags.includes('personal');
      const bIsPersonal = b.tags.includes('personal');
      
      if (aIsPersonal && !bIsPersonal) return -1;
      if (!aIsPersonal && bIsPersonal) return 1;
      
      return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
    });
    
    // Group sites by tag
    let groups;
    if (filter === 'bookmark') {
      groups = {
        'Bookmarked Sites': filteredSites
      };
    } else if (filter === 'all') {
      // For 'all' filter, group by categories with personal sites first
      groups = {
        'Personal Sites': filteredSites.filter(s => s.tags.includes('personal')),
        'Tools & Resources': filteredSites.filter(s => s.tags.includes('tools') && !s.tags.includes('personal')),
        'Company & Platform': filteredSites.filter(s => s.tags.includes('company') && !s.tags.includes('tools') && !s.tags.includes('personal')),
        'Other Sites': filteredSites.filter(s => !s.tags.includes('personal') && !s.tags.includes('tools') && !s.tags.includes('company')),
      };
    } else {
      // For specific filters, just show all matching sites in one group
      groups = {
        [`${filter.charAt(0).toUpperCase() + filter.slice(1)} Sites`]: filteredSites
      };
    }

    console.log('Groups:', Object.keys(groups).map(key => `${key}: ${groups[key].length}`));

    Object.entries(groups).forEach(([groupName, sitesInGroup]) => {
        if (sitesInGroup.length === 0) return;

        console.log('Creating group:', groupName, 'with', sitesInGroup.length, 'sites');

        // Create a container for the group
        const groupContainer = document.createElement('div');
        groupContainer.className = 'glass-card website-group';
        groupContainer.style.cssText = 'margin-bottom: 2rem; padding: 2rem;';
        
        // Add group title
        const groupTitle = document.createElement('h3');
        groupTitle.textContent = groupName;
        groupTitle.style.cssText = 'margin-top: 0; margin-bottom: 1.5rem; color: var(--theme-text);';
        groupContainer.appendChild(groupTitle);
        
        // Create the grid for the sites in this group
        const groupGrid = document.createElement('div');
        groupGrid.style.cssText = 'display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 1rem;';

        sitesInGroup.forEach(site => {
            const isBookmarked = isBookmarked(site);
            const card = document.createElement('div');
            card.className = 'website-card';
            card.innerHTML = `
                <button class="star-button ${isBookmarked ? 'bookmarked' : ''}" 
                        data-site='${JSON.stringify(site)}' 
                        title="${isBookmarked ? 'Remove from bookmarks' : 'Add to bookmarks'}"
                        onclick="handleStarClick(event, '${site.url}')">
                    ${isBookmarked ? '⭐' : '☆'}
                </button>
                <h4><a href="${site.url}" target="_blank">${site.title}</a></h4>
                <p>${site.description}</p>
                <div class="tags">
                    ${site.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            `;
            groupGrid.appendChild(card);
        });
        
        groupContainer.appendChild(groupGrid);
        grid.appendChild(groupContainer);
    });
    
    console.log('Render complete');
  }

  // Initial render
  renderSites();

  // Event Listeners
  searchBar.addEventListener('input', () => {
    renderSites(activeFilter, searchBar.value);
  });

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');
      activeFilter = button.dataset.filter;
      renderSites(activeFilter, searchBar.value);
    });
  });

  // Handle star button clicks
  window.handleStarClick = function(event, siteUrl) {
    event.preventDefault();
    event.stopPropagation();
    
    const siteData = JSON.parse(event.target.dataset.site);
    
    if (isBookmarked(siteData)) {
      // Remove bookmark
      removeBookmark(siteData);
      event.target.innerHTML = '☆';
      event.target.classList.remove('bookmarked');
      event.target.title = 'Add to bookmarks';
    } else {
      // Add bookmark
      addBookmark(siteData);
      event.target.innerHTML = '⭐';
      event.target.classList.add('bookmarked');
      event.target.title = 'Remove from bookmarks';
    }
    
    // If we're currently viewing bookmarks, re-render to update the list
    if (activeFilter === 'bookmark') {
      renderSites(activeFilter, searchBar.value);
    }
  };

});
</script>
