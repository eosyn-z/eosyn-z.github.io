---
layout: default
title: Search
permalink: /search/
---

<div class="main-content">
  <div class="glass-container container">
    <div class="glass-card">
      <header class="page-header">
        <h1>some cool or helpful websites</h1>
        <p>Discover amazing tools, resources, and websites</p>
      </header>

      <div class="search-section">
        <input type="text" id="searchInput" class="glass-input" placeholder="Search websites..." style="width: 100%; margin-bottom: 20px;">
        
        <div class="filters">
          <div class="filter-group">
            <input type="checkbox" id="personal" checked>
            <label for="personal">Personal</label>
          </div>
          <div class="filter-group">
            <input type="checkbox" id="professional" checked>
            <label for="professional">Professional</label>
          </div>
          <div class="filter-group">
            <input type="checkbox" id="tool" checked>
            <label for="tool">Tool</label>
          </div>
          <div class="filter-group">
            <input type="checkbox" id="other" checked>
            <label for="other">Other</label>
          </div>
        </div>
      </div>

        <!-- Social Websites Ticker -->
        <div class="ticker-section">
            <h3>Social Websites</h3>
            <div class="ticker-container">
                <div class="ticker-track social">
                    <a href="https://twitter.com" class="ticker-item" target="_blank">Twitter</a>
                    <a href="https://discord.com" class="ticker-item" target="_blank">Discord</a>
                    <a href="https://youtube.com" class="ticker-item" target="_blank">YouTube</a>
                    <a href="https://twitch.tv" class="ticker-item" target="_blank">Twitch</a>
                    <a href="https://github.com" class="ticker-item" target="_blank">GitHub</a>
                    <a href="https://dev.to" class="ticker-item" target="_blank">Dev.to</a>
                    <a href="https://dribbble.com" class="ticker-item" target="_blank">Dribbble</a>
                    <a href="https://behance.net" class="ticker-item" target="_blank">Behance</a>
                    <a href="https://pinterest.com" class="ticker-item" target="_blank">Pinterest</a>
                    <a href="https://medium.com" class="ticker-item" target="_blank">Medium</a>
                    <a href="https://hashnode.com" class="ticker-item" target="_blank">Hashnode</a>
                </div>
            </div>
        </div>

        <!-- Forums Ticker -->
        <div class="ticker-section">
            <h3>Forums & Communities</h3>
            <div class="ticker-container">
                <div class="ticker-track forums">
                    <a href="https://stackoverflow.com" class="ticker-item" target="_blank">Stack Overflow</a>
                    <a href="https://reddit.com/r/art" class="ticker-item" target="_blank">r/art</a>
                </div>
            </div>
        </div>

        <div class="website-grid" id="websiteGrid">
            <!-- Websites will be populated here -->
        </div>
    </div>

    <div id="results" class="results-grid">
      <!-- Results will be populated by JavaScript -->
    </div>
  </div>
</div>

<script type="application/json" id="websites-data">
{
  "websites": [
    {
      "name": "Notion",
      "url": "https://notion.so",
      "description": "All-in-one workspace for notes, docs, and collaboration",
      "category": "tool",
      "rating": 5,
      "tags": ["productivity", "notes", "collaboration"]
    },
    {
      "name": "Obsidian",
      "url": "https://obsidian.md",
      "description": "A second brain, for you, forever",
      "category": "tool",
      "rating": 5,
      "tags": ["notes", "knowledge", "markdown"]
    }
  ]
}
</script>

<script>
// list of websites, not really a "database" xdddd -eos



const websites = [
    {
        title: "GitHub",
        description: "The world's leading software development platform",
        url: "https://github.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "beginner",
        functions: ["code-storage", "version-control", "collaboration", "project-management", "open-source", "deployment", "ci-cd", "code-review"],
        personalRecommendation: false,
        starRating: null,
        personalReview: null
    },
    {
        title: "Stack Overflow",
        description: "Where developers learn, share, & build careers",
        url: "https://stackoverflow.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "beginner",
        functions: ["q&a", "problem-solving", "learning", "community", "debugging", "troubleshooting", "code-examples"],
        personalRecommendation: false,
        starRating: null,
        personalReview: null
    },
    {
        title: "CSS-Tricks",
        description: "Tips, tricks, and techniques for CSS",
        url: "https://css-tricks.com",
        tags: ["personal", "tools", "documentation"],
        difficulty: "beginner",
        functions: ["css-learning", "tutorials", "examples", "reference", "frontend", "styling", "layout", "responsive-design"],
        personalRecommendation: false,
        starRating: null,
        personalReview: null
    },
    {
        title: "Smashing Magazine",
        description: "For professional web designers and developers",
        url: "https://www.smashingmagazine.com",
        tags: ["company", "tools", "documentation"],
        difficulty: "intermediate",
        functions: ["web-design", "tutorials", "articles", "resources", "ux-ui", "accessibility", "performance", "best-practices"],
        personalRecommendation: false,
        starRating: null,
        personalReview: null
    },
    {
        title: "A List Apart",
        description: "For people who make websites",
        url: "https://alistapart.com",
        tags: ["company", "tools", "documentation"],
        difficulty: "intermediate",
        functions: ["web-standards", "best-practices", "articles", "learning", "accessibility", "semantic-html", "css", "javascript"]
    },
    {
        title: "Codrops",
        description: "Creative front-end resources and inspiration",
        url: "https://tympanus.net/codrops",
        tags: ["personal", "tools", "documentation"],
        difficulty: "expert",
        functions: ["inspiration", "experiments", "tutorials", "creative-coding", "animations", "interactions", "css-effects", "javascript-effects"]
    },
    {
        title: "Figma",
        description: "The collaborative interface design tool",
        url: "https://www.figma.com",
        tags: ["company", "tools"],
        difficulty: "beginner",
        functions: ["design", "prototyping", "collaboration", "ui-ux", "wireframing", "design-systems", "components", "plugins"]
    },
    {
        title: "Notion",
        description: "All-in-one workspace for notes, docs, and collaboration",
        url: "https://www.notion.so",
        tags: ["company", "tools"],
        difficulty: "beginner",
        functions: ["note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"]
    },
    {
        title: "Linear",
        description: "Issue tracking tool for high-performance teams",
        url: "https://linear.app",
        tags: ["company", "tools"],
        difficulty: "beginner",
        functions: ["project-management", "issue-tracking", "team-collaboration", "roadmaps", "sprints", "kanban", "agile"]
    },
    {
        title: "W3Schools",
        description: "Web development learning platform with tutorials and references",
        url: "https://www.w3schools.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "beginner",
        functions: ["learning", "tutorials", "reference", "examples", "html", "css", "javascript", "sql", "python", "php"]
    },
    {
        title: "freeCodeCamp",
        description: "Learn to code for free with interactive tutorials",
        url: "https://www.freecodecamp.org",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["learning", "interactive-tutorials", "certification", "projects", "html-css", "javascript", "react", "nodejs", "databases"]
    },
    {
        title: "MDN Web Docs",
        description: "The Mozilla Developer Network - comprehensive web documentation",
        url: "https://developer.mozilla.org",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["documentation", "reference", "tutorials", "web-standards", "html", "css", "javascript", "apis", "web-apis"]
    },
    {
        title: "React Documentation",
        description: "Official React documentation and tutorials",
        url: "https://react.dev",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["documentation", "tutorials", "examples", "reference", "react", "hooks", "components", "state-management"]
    },
    {
        title: "Vue.js",
        description: "Progressive JavaScript framework",
        url: "https://vuejs.org",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["framework", "documentation", "tutorials", "examples", "vue", "components", "composition-api", "ecosystem"]
    },
    {
        title: "TypeScript",
        description: "Typed JavaScript for better development",
        url: "https://www.typescriptlang.org",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["programming-language", "type-safety", "documentation", "compiler", "javascript", "static-analysis", "ide-support", "refactoring"]
    },
    {
        title: "Vercel",
        description: "Frontend deployment platform",
        url: "https://vercel.com",
        tags: ["tools", "company"],
        difficulty: "beginner",
        functions: ["deployment", "hosting", "serverless", "ci-cd", "edge-functions", "domains", "analytics", "preview-deployments"]
    },
    {
        title: "Netlify",
        description: "Web hosting and deployment platform",
        url: "https://netlify.com",
        tags: ["tools", "company"],
        difficulty: "beginner",
        functions: ["deployment", "hosting", "forms", "cms", "functions", "redirects", "headers", "build-tools"]
    },
    {
        title: "Firebase",
        description: "Backend-as-a-Service by Google",
        url: "https://firebase.google.com",
        tags: ["tools", "company"],
        difficulty: "intermediate",
        functions: ["backend-as-a-service", "authentication", "database", "hosting", "cloud-functions", "analytics", "messaging", "storage"]
    },
    {
        title: "MongoDB",
        description: "Document database for modern applications",
        url: "https://www.mongodb.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["database", "nosql", "data-storage", "scalability", "aggregation", "indexing", "replication", "sharding"]
    },
    {
        title: "Node.js",
        description: "JavaScript runtime for server-side development",
        url: "https://nodejs.org",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["runtime", "server-side", "npm", "javascript", "event-driven", "non-blocking", "package-management", "ecosystem"]
    },
    {
        title: "Express.js",
        description: "Web framework for Node.js",
        url: "https://expressjs.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["web-framework", "api", "middleware", "routing", "nodejs", "http-server", "static-files", "templating"]
    },
    {
        title: "Next.js",
        description: "React framework for production",
        url: "https://nextjs.org",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["react-framework", "ssr", "ssg", "routing", "api-routes", "image-optimization", "performance", "deployment"]
    },
    {
        title: "Tailwind CSS",
        description: "Utility-first CSS framework",
        url: "https://tailwindcss.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "beginner",
        functions: ["css-framework", "utility-classes", "responsive-design", "customization", "components", "dark-mode", "purge-css", "jit-compiler"]
    },
    {
        title: "Git",
        description: "Version control system",
        url: "https://git-scm.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["version-control", "collaboration", "branching", "history", "merging", "stashing", "rebase", "hooks"]
    },
    {
        title: "Postman",
        description: "API development platform",
        url: "https://www.postman.com",
        tags: ["tools", "company"],
        difficulty: "beginner",
        functions: ["api", "testing", "development", "documentation", "collections", "environments", "automation", "collaboration"]
    },
    {
        title: "Can I Use",
        description: "Browser compatibility tables",
        url: "https://caniuse.com",
        tags: ["tools", "personal"],
        difficulty: "beginner",
        functions: ["browser-support", "compatibility", "reference", "web-standards", "css", "javascript", "html", "apis"]
    },
    {
        title: "Web.dev",
        description: "Modern web development guide by Google",
        url: "https://web.dev",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["web-development", "performance", "pwa", "accessibility", "seo", "best-practices", "tutorials", "analysis"]
    },
    {
        title: "Angular",
        description: "Full-featured framework for building applications",
        url: "https://angular.io",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["framework", "documentation", "tutorials", "cli-tools", "typescript", "dependency-injection", "routing", "forms"]
    },
    {
        title: "Flutter",
        description: "Cross-platform UI toolkit",
        url: "https://flutter.dev",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["mobile-development", "cross-platform", "ui-framework", "hot-reload", "dart", "widgets", "state-management", "packages"]
    },
    {
        title: "Socket.io",
        description: "Real-time communication library",
        url: "https://socket.io",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["real-time", "websockets", "communication", "api", "chat", "gaming", "collaboration", "live-updates"]
    },
    {
        title: "PostgreSQL",
        description: "Advanced open-source database",
        url: "https://www.postgresql.org",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["database", "sql", "data-storage", "scalability", "acid-compliance", "json-support", "full-text-search", "extensions"]
    },
    {
        title: "Tauri",
        description: "Desktop app framework",
        url: "https://tauri.app",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["desktop-apps", "cross-platform", "performance", "security", "rust", "webview", "native-apis", "bundling"]
    },
    {
        title: "Electron",
        description: "Cross-platform desktop apps with web technologies",
        url: "https://www.electronjs.org",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["desktop-apps", "cross-platform", "web-technologies", "packaging", "distribution", "auto-updater", "native-modules", "chromium"]
    },
    {
        title: "Docker",
        description: "Containerization platform",
        url: "https://www.docker.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["containerization", "deployment", "devops", "microservices", "orchestration", "images", "volumes", "networking"]
    },
    {
        title: "AWS",
        description: "Cloud computing platform",
        url: "https://aws.amazon.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["cloud-computing", "hosting", "storage", "ai-ml", "serverless", "containers", "databases", "security"]
    },
    {
        title: "Google Cloud",
        description: "Cloud computing services",
        url: "https://cloud.google.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["cloud-computing", "hosting", "storage", "ai-ml", "kubernetes", "bigquery", "firestore", "functions"]
    },
    {
        title: "Unity",
        description: "Game development platform",
        url: "https://unity.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["game-development", "3d", "2d", "cross-platform", "physics", "animation", "audio", "asset-store"]
    },
    {
        title: "Unreal Engine",
        description: "3D creation tool for games and visualization",
        url: "https://www.unrealengine.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["game-development", "3d", "visualization", "vr-ar", "blueprints", "materials", "lighting", "cinematics"]
    },
    {
        title: "CodePen",
        description: "Frontend code playground",
        url: "https://codepen.io",
        tags: ["tools", "personal"],
        difficulty: "beginner",
        functions: ["code-editor", "frontend", "css", "javascript", "html", "inspiration", "showcase", "learning"]
    },
    {
        title: "Glitch",
        description: "Friendly coding community and platform",
        url: "https://glitch.com",
        tags: ["tools", "company"],
        difficulty: "beginner",
        functions: ["code-editor", "deployment", "collaboration", "learning", "web-development", "javascript", "nodejs", "community"]
    },
    {
        title: "Replit",
        description: "Collaborative browser IDE",
        url: "https://replit.com",
        tags: ["tools", "company"],
        difficulty: "beginner",
        functions: ["code-editor", "deployment", "collaboration", "learning", "web-development", "python", "javascript", "education"]
    },
    {
        title: "Stripe",
        description: "Payment processing platform",
        url: "https://stripe.com",
        tags: ["tools", "company", "documentation"],
        difficulty: "intermediate",
        functions: ["payments", "e-commerce", "api", "security", "subscriptions", "invoicing", "taxes", "fraud-prevention"]
    },
    {
        title: "Expo",
        description: "React Native platform",
        url: "https://expo.dev",
        tags: ["tools", "company", "documentation"],
        difficulty: "expert",
        functions: ["mobile-development", "react-native", "deployment", "testing", "sdk", "cli", "ejected", "managed-workflow"]
    },
    {
        title: "Cursor",
        description: "AI-powered code editor",
        url: "https://cursor.sh",
        tags: ["tools", "company"],
        difficulty: "beginner",
        functions: ["code-editor", "ai-assistance", "debugging", "learning", "chat", "code-generation", "refactoring", "explanation"]
    },
    {
        title: "Wisk",
        description: "Modern Notion alternative",
        url: "https://wisk.cc",
        tags: ["tools", "personal"],
        difficulty: "beginner",
        functions: ["note-taking", "project-management", "collaboration", "organization", "documentation", "databases", "templates", "knowledge-base"]
    },
    {
        title: "cameronsworld",
        description: "Web aesthetic archive and inspiration",
        url: "https://cameronsworld.net",
        tags: ["personal", "tools"],
        difficulty: "beginner",
        functions: ["inspiration", "web-aesthetics", "archive", "retro-web", "design-inspiration", "creative-coding"]
    },
    {
        title: "everything2",
        description: "Collaborative writing and knowledge base",
        url: "https://everything2.com",
        tags: ["personal", "tools"],
        difficulty: "beginner",
        functions: ["collaborative-writing", "knowledge-base", "community", "articles", "learning", "reference"]
    },
    {
        title: "codespaced.com",
        description: "Development platform and tools",
        url: "https://codespaced.com",
        tags: ["tools", "company"],
        difficulty: "beginner",
        functions: ["development-platform", "tools", "coding", "productivity"]
    },
    {
        title: "strwb.com",
        description: "Personal website and portfolio",
        url: "https://strwb.com",
        tags: ["personal", "tools"],
        difficulty: "beginner",
        functions: ["portfolio", "personal-site", "inspiration", "web-design"]
    },
    {
        title: "cyb3r17.space",
        description: "Personal portfolio with ML focus",
        url: "https://cyb3r17.space",
        tags: ["personal", "tools"],
        difficulty: "expert",
        functions: ["portfolio", "machine-learning", "personal-site", "ai", "research"]
    },
    {
        title: "Wayback Machine",
        description: "Internet archive and historical web snapshots",
        url: "https://web.archive.org",
        tags: ["tools", "company"],
        difficulty: "beginner",
        functions: ["archive", "historical-data", "web-history", "research", "reference"]
    },
    {
        title: "Archive.today",
        description: "Web archiving service",
        url: "https://archive.today",
        tags: ["tools", "personal"],
        difficulty: "beginner",
        functions: ["archive", "web-snapshots", "research", "reference", "historical-data"]
    },
    {
        title: "GitLab",
        description: "DevOps platform and Git repository manager",
        url: "https://gitlab.com",
        tags: ["tools", "company", "repository"],
        difficulty: "intermediate",
        functions: ["version-control", "ci-cd", "devops", "collaboration", "project-management", "deployment"]
    },
    {
        title: "Bitbucket",
        description: "Git code hosting and collaboration platform",
        url: "https://bitbucket.org",
        tags: ["tools", "company", "repository"],
        difficulty: "intermediate",
        functions: ["version-control", "collaboration", "project-management", "code-review", "deployment"]
    },
    {
        title: "Hacker News",
        description: "Social news website focusing on computer science and entrepreneurship",
        url: "https://news.ycombinator.com",
        tags: ["tools", "personal"],
        difficulty: "beginner",
        functions: ["news", "community", "programming", "technology", "discussion", "startups"]
    },
    {
        title: "Convert Tool",
        description: "CLI tool for image conversion and markdown to PDF by @SuleDevSec",
        url: "https://github.com/Sule57/convert",
        tags: ["tools", "repository"],
        difficulty: "expert",
        functions: ["cli-tool", "image-conversion", "markdown", "pdf", "utilities"],
        personalRecommendation: true,
        starRating: 4,
        personalReview: "Vibe-coded but functional CLI tool for quick conversions. Great for batch processing!"
    }
];

const websiteData = JSON.parse(document.getElementById('website-data').text);
const tagCheckboxes = document.querySelectorAll('input[name="tag"]');

// Sort websites: "Personal" first, then alphabetically by title
websiteData.sort((a, b) => {
    const aIsPersonal = a.tags.includes('Personal');
    const bIsPersonal = b.tags.includes('Personal');

    if (aIsPersonal && !bIsPersonal) return -1;
    if (!aIsPersonal && bIsPersonal) return 1;

    return a.title.localeCompare(b.title);
});

function renderResults(results) {
    resultsContainer.innerHTML = '';
    if (results.length === 0) {
        resultsContainer.innerHTML = '<p>No results found.</p>';
        return;
    }

    results.forEach(website => {
        const card = document.createElement('div');
        card.className = 'website-card';
        
        let personalBadge = '';
        let starRating = '';
        let personalReview = '';
        
        if (website.personalRecommendation) {
            personalBadge = '<span class="personal-recommendation">⭐ eosyn has used this</span>';
            if (website.starRating) {
                starRating = renderStarRating(website.starRating);
            }
            if (website.personalReview) {
                personalReview = `<div class="personal-review">${website.personalReview}</div>`;
            }
        }

        card.innerHTML = `
            <div style="padding: 20px;">
                <div style="font-size: 1.2em; font-weight: 600; color: var(--theme-text);">${website.title}</div>
                <p style="font-size: 0.9em; color: var(--theme-text-secondary); margin-top: 10px;">${website.description}</p>
            </div>
            <div style="padding: 20px; border-top: 1px solid var(--glass-border-light);">
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${website.tags.map(tag => `<span class="glass-badge">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('searchBar');
    searchBar.addEventListener('input', filterResults);
    
    populateFiltersFromUrl();
    setupFilterListeners();
    filterResults();
});

function getUrlParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        projectType: params.get('projectType'),
        features: params.getAll('features'),
        learningStyle: params.get('learningStyle'),
        resultsSpeed: params.get('resultsSpeed')
    };
}

function populateFiltersFromUrl() {
    const { projectType, features, learningStyle, resultsSpeed } = getUrlParams();
    const filters = {
        'project-type-filter': projectType ? [projectType] : [],
        'features-filter': features,
        'learning-style-filter': learningStyle ? [learningStyle] : [],
        'results-speed-filter': resultsSpeed ? [resultsSpeed] : []
    };

    for (const [filterId, values] of Object.entries(filters)) {
        const container = document.getElementById(filterId);
        if (container) {
            const allOptions = new Set(toolsData.flatMap(tool => tool.tags));
            const relevantOptions = Array.from(allOptions).filter(option => {
                if (filterId === 'project-type-filter') return ["Web Application", "Mobile App", "Desktop Application", "API/Backend Service", "Game"].includes(option);
                if (filterId === 'features-filter') return ["User Accounts & Login", "Store Data", "Real-time Updates", "Handle Media", "Process Payments", "Simple Content"].includes(option);
                if (filterId === 'learning-style-filter') return ["Video Tutorials", "Interactive Courses", "Documentation", "Community Learning"].includes(option);
                if (filterId === 'results-speed-filter') return ["Quick & Simple", "Balanced Pace", "Deep Dive"].includes(option);
                return false;
            });
            
            relevantOptions.forEach(optionText => {
                const optionEl = document.createElement('span');
                optionEl.className = 'glass-badge';
                optionEl.dataset.value = optionText;
                optionEl.textContent = optionText;
                if (values.includes(optionText)) {
                    optionEl.classList.add('primary');
                }
                container.appendChild(optionEl);
            });
        }
    }
}

function setupFilterListeners() {
    document.querySelectorAll('.glass-badge').forEach(option => {
        option.addEventListener('click', () => {
            option.classList.toggle('primary');
            filterResults();
        });
    });
}

function filterResults() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const selectedProjectTypes = Array.from(document.querySelectorAll('#project-type-filter .glass-badge.primary')).map(el => el.dataset.value);
    const selectedFeatures = Array.from(document.querySelectorAll('#features-filter .glass-badge.primary')).map(el => el.dataset.value);
    const selectedLearningStyles = Array.from(document.querySelectorAll('#learning-style-filter .glass-badge.primary')).map(el => el.dataset.value);
    const selectedResultsSpeeds = Array.from(document.querySelectorAll('#results-speed-filter .glass-badge.primary')).map(el => el.dataset.value);

    const resultsContainer = document.getElementById('results-container');
    resultsContainer.innerHTML = '';

    const matchingTools = toolsData.filter(tool => {
        const termMatch = searchTerm === '' || tool.name.toLowerCase().includes(searchTerm) || tool.description.toLowerCase().includes(searchTerm);
        const projectTypeMatch = selectedProjectTypes.length === 0 || tool.tags.some(tag => selectedProjectTypes.includes(tag));
        const featuresMatch = selectedFeatures.length === 0 || selectedFeatures.every(feature => tool.tags.includes(feature));
        const learningStyleMatch = selectedLearningStyles.length === 0 || tool.tags.some(tag => selectedLearningStyles.includes(tag));
        const resultsSpeedMatch = selectedResultsSpeeds.length === 0 || tool.tags.some(tag => selectedResultsSpeeds.includes(tag));
        
        return termMatch && projectTypeMatch && featuresMatch && learningStyleMatch && resultsSpeedMatch;
    });

    matchingTools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'glass-card';
        card.innerHTML = `
            <div style="padding: 20px;">
                <div style="font-size: 1.2em; font-weight: 600; color: var(--theme-text);">${tool.name}</div>
                <p style="font-size: 0.9em; color: var(--theme-text-secondary); margin-top: 10px;">${tool.description}</p>
            </div>
            <div style="padding: 20px; border-top: 1px solid var(--glass-border-light);">
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${tool.tags.map(tag => `<span class="glass-badge">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        resultsContainer.appendChild(card);
    });
}

function updateResultsInfo(count) {
    const info = document.getElementById('resultsInfo');
    info.textContent = `Showing ${count} website${count !== 1 ? 's' : ''}`;
}

function loadTheme() {
    // Only load theme from cookie if cookies are accepted
    if (getCookie('cookiesAccepted') === 'true') {
        const savedTheme = getCookie('theme');
        if (savedTheme) {
            setTheme(savedTheme);
        } else {
            setTheme('a');
        }
    } else {
        // Set default theme to "a" if no cookies accepted
        setTheme('a');
    }
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
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'a';
    setCookie('theme', currentTheme, 365);
}

function rejectCookies() {
    setCookie('cookiesRejected', 'true', 365);
    document.getElementById('cookieConsent').classList.remove('show');
    
    // Clear any existing theme cookie
    deleteCookie('theme');
}

// Search and filter functionality
function filterWebsites() {
    const searchTerm = document.getElementById('searchBar').value.toLowerCase();
    const personalFilter = document.getElementById('personal').checked;
    const companyFilter = document.getElementById('company').checked;
    const toolsFilter = document.getElementById('tools').checked;
    const documentationFilter = document.getElementById('documentation').checked;
    const repositoryFilter = document.getElementById('repository').checked;
    const personalRecommendationFilter = document.getElementById('personalRecommendation').checked;
    const selectedDifficulty = document.querySelector('.difficulty-btn.active').getAttribute('data-difficulty');
    
    const filteredWebsites = websites.filter(website => {
        const matchesSearch = website.title.toLowerCase().includes(searchTerm) || 
                             website.description.toLowerCase().includes(searchTerm);
        
        const matchesPersonal = personalFilter && website.tags.includes('personal');
        const matchesCompany = companyFilter && website.tags.includes('company');
        const matchesTools = toolsFilter && website.tags.includes('tools');
        const matchesDocumentation = documentationFilter && website.tags.includes('documentation');
        const matchesRepository = repositoryFilter && website.tags.includes('repository');
        const matchesPersonalRecommendation = personalRecommendationFilter ? website.personalRecommendation : true;
        const matchesDifficulty = !selectedDifficulty || website.difficulty === selectedDifficulty;
        
        return matchesSearch && (matchesPersonal || matchesCompany || matchesTools || matchesDocumentation || matchesRepository) && matchesDifficulty && matchesPersonalRecommendation;
    });
    
    displayWebsites(filteredWebsites);
    updateResultsInfo(filteredWebsites.length);
}

function displayWebsites(websitesToShow) {
    const grid = document.getElementById('websiteGrid');
    grid.innerHTML = '';
    
    websitesToShow.forEach(website => {
        const card = document.createElement('div');
        card.className = 'website-card';
        
        let personalBadge = '';
        let starRating = '';
        let personalReview = '';
        
        if (website.personalRecommendation) {
            personalBadge = '<span class="personal-recommendation">⭐ eosyn has used this</span>';
            if (website.starRating) {
                starRating = renderStarRating(website.starRating);
            }
            if (website.personalReview) {
                personalReview = `<div class="personal-review">${website.personalReview}</div>`;
            }
        }

        card.innerHTML = `
            <div style="padding: 20px;">
                <div style="font-size: 1.2em; font-weight: 600; color: var(--theme-text);">${website.title}</div>
                <p style="font-size: 0.9em; color: var(--theme-text-secondary); margin-top: 10px;">${website.description}</p>
            </div>
            <div style="padding: 20px; border-top: 1px solid var(--glass-border-light);">
                <div style="display: flex; flex-wrap: wrap; gap: 8px;">
                    ${website.tags.map(tag => `<span class="glass-badge">${tag}</span>`).join('')}
                </div>
            </div>
        `;
        grid.appendChild(card);
    });
}
</script> 
