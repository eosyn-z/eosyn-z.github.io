function getBasePath() {
    return window.location.pathname.includes('/pages/') ? '../' : '';
}

const CONFIG = {

    contentFolders: [
        { name: 'Projects', path: 'content/projects', description: 'My creative and technical projects' },
        { name: 'Thoughts', path: 'content/thoughts', description: 'Ideas, reflections, and insights' },
        { name: 'Learning', path: 'content/learning', description: 'Notes and resources from my learning journey' },
        { name: 'Resources', path: 'content/resources', description: 'Useful tools, links, and references' },
        { name: 'Art', path: 'content/art', description: 'Gallery of my artwork and creative pieces', isGallery: true },
        { name: 'Nature', path: 'content/nature', description: 'Natural beauty and landscapes', isGallery: true }
    ],
    supportedExtensions: ['.md', '.markdown'],
    maxExcerptLength: 150
};
let manifest = null;
let contentData = {};
let currentSection = 'home';
let currentPage = null;
let contentCache = new Map();
let lastLoadTime = 0;
const CACHE_DURATION = 5 * 60 * 1000;
let knowledgeGraph = { backlinks: {}, links: [] };
let citationIndex = { byType: {}, byPage: {}, stats: {} };
let siteSettings = {};
let currentNoteKey = 'general';

async function preloadGalleryImages() {
    try {
        const basePath = getBasePath();
        const response = await fetch(basePath + 'gallery/images.json');
        const data = await response.json();

        if (data.art && data.art.length > 0) {
            // Create hidden container for preloading
            const preloadContainer = document.createElement('div');
            preloadContainer.style.display = 'none';
            preloadContainer.id = 'image-preload-container';
            document.body.appendChild(preloadContainer);

            // Preload up to 20 images
            const imagesToPreload = data.art.slice(0, 20);

            imagesToPreload.forEach(artwork => {
                const img = new Image();
                img.src = basePath + 'gallery/art/' + artwork.filename;
                // Add to container to ensure browser caches it
                preloadContainer.appendChild(img);
            });

            console.log(`Preloaded ${imagesToPreload.length} gallery images`);
        }
    } catch (error) {
        console.log('Gallery preloading skipped:', error.message);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    window.pageLoadTime = Date.now();
    await loadSiteSettings();
    await loadManifest();
    initializeTheme();

    // Only load home content if we're on the main index page, not on /pages/ or project pages
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const isProjectPage = window.location.hash && window.location.hash !== '#home' && window.location.hash !== '';

    if (!isInPagesFolder && !isProjectPage) {
        await loadHomeContent();
        // Preload gallery images when on home page
        preloadGalleryImages();
        // Only set home section active on main page
        setTimeout(() => {
            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.classList.add('active');
            }
        }, 100);
    }

    initializeNavigation();
    loadAllContent();
    setupEventListeners();
    setupRouting();
    loadDiscordPresence();
    initializeNotesSystem();
    if (typeof initializeDesktopMode === 'function') {
        initializeDesktopMode();
    }
    await initializeTicker();
});
async function loadManifest() {
    try {
        const response = await fetch(getBasePath() + 'data/manifest.json');
        if (!response.ok) {
            console.warn('data/manifest.json not found, citations and graph features will be disabled');
            manifest = {
                pages: [],
                citationIndex: { byType: {}, byPage: {}, stats: {} },
                knowledgeGraph: { nodes: [], links: [], backlinks: {} }
            };
            knowledgeGraph = { backlinks: {}, links: [] };
            citationIndex = { byType: {}, byPage: {}, stats: {} };
            return;
        }
        manifest = await response.json();
        if (manifest.knowledgeGraph) {
            knowledgeGraph = manifest.knowledgeGraph;
        }
        if (manifest.citationIndex) {
            citationIndex = manifest.citationIndex;
        }
        console.log(' Manifest loaded:', {
            pages: manifest.pages.length,
            citations: Object.values(citationIndex.stats || {}).reduce((a, b) => a + b, 0),
            links: knowledgeGraph.links?.length || 0
        });
    } catch (error) {
        console.error('Error loading manifest:', error);
        manifest = {
            pages: [],
            citationIndex: { byType: {}, byPage: {}, stats: {} },
            knowledgeGraph: { nodes: [], links: [], backlinks: {} }
        };
        knowledgeGraph = { backlinks: {}, links: [] };
        citationIndex = { byType: {}, byPage: {}, stats: {} };
    }
}
async function loadHomeContent() {
    try {
        const response = await fetch(getBasePath() + 'home.html');
        if (response.ok) {
            const homeContent = await response.text();
            const homeSection = document.getElementById('home');
            if (homeSection) {
                homeSection.innerHTML = homeContent;
                initializeTerminal();
                populateCitationNotes();
                initializeArtGallery();
                initializeTPOTCarousel();
                console.log('Home content loaded successfully');
            }
        } else {
            console.warn('Failed to fetch home.html, using default');
            setDefaultHomeContent();
        }
    } catch (error) {
        console.error('Error loading home content:', error);
        setDefaultHomeContent();
    }
}
function setDefaultHomeContent() {
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.innerHTML = `
            <div class="welcome-content">
                <h2>Welcome to My Digital Garden</h2>
                <p>This portfolio is automatically generated from my Obsidian vault. Each section below represents a folder in my knowledge base, and each page is a markdown file that gets rendered beautifully here.</p>
                <div class="stats">
                    <div class="stat-item">
                        <span class="stat-number" id="totalPages">0</span>
                        <span class="stat-label">Total Pages</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="totalSections">0</span>
                        <span class="stat-label">Sections</span>
                    </div>
                    <div class="stat-item">
                        <span class="stat-number" id="totalWords">0</span>
                        <span class="stat-label">Words</span>
                    </div>
                </div>
            </div>
        `;
    }
}
function populateCitationNotes() {
    if (!manifest || !manifest.pages) {
        return;
    }

    // Map card IDs to content sections
    const sectionMapping = {
        'arxiv': 'learning',
        'pubmed': 'projects',
        'nlab': 'thoughts'
    };

    Object.entries(sectionMapping).forEach(([cardId, sectionName]) => {
        const sourcesColumn = document.querySelector(`#${cardId}-sources`)?.closest('.sources-column');
        const sourcesList = document.getElementById(`${cardId}-sources`);
        const writeupsList = document.getElementById(`${cardId}-writeups`);
        const notesList = document.getElementById(`${cardId}-notes`);
        const gridContainer = sourcesList?.closest('.card-links-grid-three');
        const card = sourcesList?.closest('.research-card');

        if (!sourcesList || !writeupsList || !notesList) return;

        // Get pages from this section
        const sectionPages = manifest.pages.filter(p => p.section === sectionName);

        if (sectionPages.length === 0) {
            // Hide the entire card if the section is empty
            if (card) card.style.display = 'none';
            return;
        } else {
            // Show the card if it has content
            if (card) card.style.display = '';
        }

        // "Recent Reading" - Show pages WITH citations/sources
        const pagesWithCitations = sectionPages.filter(p => p.sources && p.sources.length > 0).slice(0, 3);

        if (pagesWithCitations.length > 0) {
            // Show Recent Reading column
            if (sourcesColumn) sourcesColumn.style.display = '';
            if (gridContainer) gridContainer.style.gridTemplateColumns = '2fr 1.5fr 0.75fr';

            sourcesList.innerHTML = '';
            pagesWithCitations.forEach(page => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = page.title;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    showPage(page.section, page.slug);
                });
                li.appendChild(link);
                sourcesList.appendChild(li);
            });
        } else {
            // Hide Recent Reading column, expand Writeups
            if (sourcesColumn) sourcesColumn.style.display = 'none';
            if (gridContainer) gridContainer.style.gridTemplateColumns = '3.5fr 0.75fr';
        }

        // "Writeups" - Show ALL pages (these are your writeups!)
        writeupsList.innerHTML = '';
        const allWriteups = sectionPages.slice(0, 3);
        if (allWriteups.length > 0) {
            allWriteups.forEach(page => {
                const li = document.createElement('li');
                const link = document.createElement('a');
                link.href = '#';
                link.textContent = page.title;
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    showPage(page.section, page.slug);
                });
                li.appendChild(link);
                writeupsList.appendChild(li);
            });
        } else {
            writeupsList.innerHTML = '<li class="no-notes">Coming soon!</li>';
        }

        // "My Notes" - Keep empty for now (could be for user-added notes later)
        notesList.innerHTML = '<li class="no-notes">No notes yet!</li>';
    });
}
function showPagesCitingSource(type, sourceId, sourceTitle, pageIds) {
    if (!manifest || !pageIds) return;
    let pagesHTML = `
        <div class="citing-pages">
            <h3>Articles citing: ${sourceTitle}</h3>
            <ul>
    `;
    pageIds.forEach(pageId => {

        const page = manifest.pages.find(p => p.id === pageId);
        if (page) {
            pagesHTML += `<li><a href="#" onclick="showPage('${page.section}', '${page.slug}')">${page.title}</a></li>`;
        }
    });
    pagesHTML += `
            </ul>
        </div>
    `;
    const mainContent = document.querySelector('.content-wrapper');
    const citingSection = document.createElement('section');
    citingSection.className = 'content-section active';
    citingSection.innerHTML = pagesHTML;
    document.querySelectorAll('.content-section').forEach(s => s.classList.remove('active'));
    mainContent.innerHTML = '';
    mainContent.appendChild(citingSection);
}
function setupEventListeners() {

    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    const searchInput = document.getElementById('search-input');
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                performSearch();
            }
        });
    }
    document.addEventListener('click', (e) => {
        // Handle wiki link clicks
        if (e.target.classList.contains('wiki-link')) {
            e.preventDefault();
            const section = e.target.dataset.section;
            const slug = e.target.dataset.slug;
            if (section && slug) {
                showPage(section, slug);
            }
            return;
        }

        const modal = document.querySelector('.modal');
        if (e.target === modal) {
            closeModal();
        }
    });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
}
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    document.body.appendChild(notification);
    setTimeout(() => {
        notification.remove();
    }, 3000);
}
function initializeNavigation() {
    const navMenu = document.getElementById('navMenu');
    if (!navMenu) return;
    const isInPagesFolder = window.location.pathname.includes('/pages/');
    const createNavItem = (text, href) => {
        const item = document.createElement('li');
        item.innerHTML = `<a href="${href}" class="nav-link">${text}</a>`;
        return item;
    };

    // Sites link at the top, near search
    const sitesPath = isInPagesFolder ? 'sites.html' : 'pages/sites.html';
    navMenu.appendChild(createNavItem('Sites', sitesPath));

    // Art is now a content section, still link to gallery page
    const artPath = isInPagesFolder ? 'art.html' : 'pages/art.html';
    navMenu.appendChild(createNavItem('Art', artPath));

    const devHref = isInPagesFolder ? 'dev.html' : 'pages/dev.html';
    navMenu.appendChild(createNavItem('Dev', devHref));
    const gamesPath = isInPagesFolder ? 'games.html' : 'pages/games.html';
    navMenu.appendChild(createNavItem('Games', gamesPath));
    const shopPath = isInPagesFolder ? 'shop.html' : 'pages/shop.html';
    navMenu.appendChild(createNavItem('Shop', shopPath));
    const ircPath = isInPagesFolder ? 'irc.html' : 'pages/irc.html';
    navMenu.appendChild(createNavItem('IRC', ircPath));
    const funItem = document.createElement('li');
    funItem.className = 'nav-item-dropdown';
    const funPath = isInPagesFolder ? 'fun.html' : 'pages/fun.html';
    funItem.innerHTML = `
        <a href="${funPath}" class="nav-link">Fun ▼</a>
        <ul class="nav-dropdown">
            <li><a href="${isInPagesFolder ? 'confetti.html' : 'pages/confetti.html'}" class="nav-dropdown-link">Confetti</a></li>
            <li><a href="${isInPagesFolder ? 'nature.html' : 'pages/nature.html'}" class="nav-dropdown-link">Nature</a></li>
            <li><a href="${isInPagesFolder ? 'watchlist.html' : 'pages/watchlist.html'}" class="nav-dropdown-link">Watchlist</a></li>
            <li><a href="${isInPagesFolder ? 'music.html' : 'pages/music.html'}" class="nav-dropdown-link">Music</a></li>
        </ul>
    `;
    navMenu.appendChild(funItem);
    const situationPath = isInPagesFolder ? 'situation.html' : 'pages/situation.html';
    navMenu.appendChild(createNavItem('Situation', situationPath));
    navMenu.addEventListener('click', (e) => {
        if (e.target.classList.contains('nav-link')) {
            const section = e.target.getAttribute('data-section');
            if (section) {
                e.preventDefault();
                showSection(section);
                document.querySelectorAll('.nav-link').forEach(link => {
                    link.classList.remove('active');
                });
                e.target.classList.add('active');
            }
        }
    });
}
function loadAllContent() {
    showLoading();
    if (!manifest || !manifest.pages) {
        console.warn('No manifest data available');
        hideLoading();
        return;
    }
    contentData = {};
    manifest.pages.forEach(page => {
        const section = page.section;
        if (!contentData[section]) {

            const folderConfig = CONFIG.contentFolders.find(f => f.name.toLowerCase() === section);
            contentData[section] = {
                folder: folderConfig || { name: section.charAt(0).toUpperCase() + section.slice(1), path: `content/${section}`, description: '' },
                pages: []
            };
        }
        contentData[section].pages.push(page);
    });
    renderAllContent();
    updateStats();
    hideLoading();
    setTimeout(() => {
        const homeSection = document.getElementById('home');
        if (homeSection) {
            homeSection.classList.add('active');
            initializeTerminal();
        }
    }, 200);
}
async function loadFolderContent(folder) {
    const pages = [];
    try {

        const files = await getMarkdownFiles(folder.path);
        for (const file of files) {
            try {
                const content = await fetchMarkdownFile(`${folder.path}/${file}`);
                const page = parseMarkdownFile(file, content);
                if (page) {
                    pages.push(page);
                }
            } catch (error) {
                console.warn(`Could not load ${file}:`, error);
            }
        }
        return {
            folder: folder,
            pages: pages
        };
    } catch (error) {
        console.error(`Error loading folder ${folder.name}:`, error);
        return {
            folder: folder,
            pages: []
        };
    }
}
async function getMarkdownFiles(folderPath) {

    try {
        const response = await fetch(`${folderPath}/files.json`);
        if (response.ok) {
            const files = await response.json();
            return files.filter(f => f.endsWith('.md') || f.endsWith('.markdown'));
        }
    } catch (error) {

    }
    const knownFiles = {
        'content/projects': ['website-redesign.md', 'portfolio-site.md', 'web-app.md'],
        'content/thoughts': ['learning-in-public.md', 'coding-journey.md', 'tech-trends.md'],
        'content/learning': ['javascript-fundamentals.md', 'react-basics.md', 'web-development.md'],
        'content/resources': ['development-tools.md', 'useful-links.md', 'learning-resources.md']
    };
    const filesToCheck = knownFiles[folderPath] || [];
    const existingFiles = [];
    for (const file of filesToCheck) {
        try {
            const response = await fetch(`${folderPath}/${file}`, { method: 'HEAD' });
            if (response.ok) {
                existingFiles.push(file);
            }
        } catch (error) {

        }
    }
    return existingFiles;
}
async function fetchMarkdownFile(filePath) {

    if (contentCache.has(filePath)) {
        const cached = contentCache.get(filePath);
        const age = Date.now() - cached.timestamp;
        if (age < CACHE_DURATION) {
            return cached.content;
        }
    }
    const response = await fetch(filePath);
    if (!response.ok) {
        throw new Error(`Failed to fetch ${filePath}: ${response.status} ${response.statusText}`);
    }
    const content = await response.text();
    contentCache.set(filePath, {
        content: content,
        timestamp: Date.now()
    });
    return content;
}
function parseMarkdownFile(filename, content) {
    // First, parse and remove frontmatter
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n/;
    const match = content.match(frontmatterRegex);
    let bodyContent = content;

    if (match) {
        // Remove frontmatter from content
        bodyContent = content.substring(match[0].length);
    }

    // Now extract title from the body content (not from the full content with frontmatter)
    const lines = bodyContent.split('\n');
    const title = extractTitle(lines);
    const cleanContent = removeDuplicateTitle(bodyContent, title);

    return {
        title,
        content: cleanContent
    };
}
function parseFrontmatter(content) {
    const frontmatterRegex = /^---\s*\n([\s\S]*?)\n---\s*\n([\s\S]*)$/;
    const match = content.match(frontmatterRegex);
    if (!match) {
        return {
            frontmatter: {},
            bodyContent: content
        };
    }
    const yamlContent = match[1];
    const bodyContent = match[2];
    const frontmatter = parseSimpleYAML(yamlContent);
    return {
        frontmatter,
        bodyContent
    };
}
function parseSimpleYAML(yaml) {
    const result = {};
    const lines = yaml.split('\n');
    let currentKey = null;
    let currentArray = null;
    let currentObject = null;
    for (let i = 0; i < lines.length; i++) {
        const line = lines[i];
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) continue;
        if (line.match(/^(\w+):\s*(.*)$/)) {
            const match = line.match(/^(\w+):\s*(.*)$/);
            const key = match[1];
            const value = match[2].trim();
            if (value === '') {

                currentKey = key;
                currentArray = [];
                result[key] = currentArray;
            } else {

                result[key] = parseYAMLValue(value);
                currentKey = null;
                currentArray = null;
            }
        }
        else if (line.match(/^\s+-\s+(.*)$/)) {
            const match = line.match(/^\s+-\s+(.*)$/);
            const value = match[1].trim();
            if (value.includes(':')) {

                currentObject = {};
                currentArray.push(currentObject);
                const [objKey, objValue] = value.split(':').map(s => s.trim());
                currentObject[objKey] = parseYAMLValue(objValue);
            } else {

                currentArray.push(parseYAMLValue(value));
                currentObject = null;
            }
        }
        else if (line.match(/^\s+(\w+):\s*(.*)$/) && currentObject) {
            const match = line.match(/^\s+(\w+):\s*(.*)$/);
            const key = match[1];
            const value = match[2].trim();
            currentObject[key] = parseYAMLValue(value);
        }
    }
    return result;
}
function parseYAMLValue(value) {

    if ((value.startsWith('"') && value.endsWith('"')) ||
        (value.startsWith("'") && value.endsWith("'"))) {
        return value.slice(1, -1);
    }
    if (value === 'true') return true;
    if (value === 'false') return false;
    if (/^\d+$/.test(value)) return parseInt(value);
    if (/^\d+\.\d+$/.test(value)) return parseFloat(value);
    return value;
}
function extractWikiLinks(content) {
    const links = [];
    const regex = /\[\[([^\]]+)\]\]/g;
    let match;
    while ((match = regex.exec(content)) !== null) {
        const linkText = match[1].trim();
        const parts = linkText.split('|');
        const targetTitle = parts[0].trim();
        const displayText = parts[1] ? parts[1].trim() : targetTitle;
        links.push({
            target: targetTitle,
            display: displayText,
            position: match.index
        });
    }
    return links;
}
function removeDuplicateTitle(content, title) {

    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
        if (lines[i].startsWith('# ')) {
            const headingText = lines[i].substring(2).trim();
            if (headingText === title) {
                lines.splice(i, 1);
                if (i < lines.length && lines[i].trim() === '') {
                    lines.splice(i, 1);
                }
                break;
            }
        }
    }
    return lines.join('\n');
}
function extractTitle(lines) {
    for (const line of lines) {
        if (line.startsWith('# ')) {
            return line.substring(2).trim();
        }
    }
    return lines[0] || 'Untitled';
}
function extractExcerpt(content) {

    const cleanContent = content
        .replace(/^#+\s*/gm, '')
        .replace(/^\*\*.*?\*\*$/gm, '')
        .replace(/^-\s*/gm, '')
        .replace(/\n+/g, ' ')
        .trim();
    return cleanContent.substring(0, CONFIG.maxExcerptLength) +
           (cleanContent.length > CONFIG.maxExcerptLength ? '...' : '');
}
function extractDate(content) {
    const dateMatch = content.match(/\*Last updated: ([^*]+)\*/);
    if (dateMatch) {
        return dateMatch[1].trim();
    }
    return null;
}
function getFileDate(filename) {
    return new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
function setupRouting() {
    // Handle browser back/forward buttons
    window.addEventListener('popstate', (event) => {
        console.log('popstate event triggered');
        handleRoute();
    });

    // Handle hash changes (including back/forward with hash-based routing)
    window.addEventListener('hashchange', (event) => {
        console.log('hashchange event triggered');
        handleRoute();
    });

    // Initial route
    handleRoute();
}
function handleRoute() {
    const url = new URL(window.location);
    const path = url.pathname.substring(1);
    const hash = url.hash.substring(1);
    console.log('handleRoute called:', { path, hash });
    if (hash) {
        const pathParts = hash.split('/');
        if (pathParts.length === 2) {
            const [section, slug] = pathParts;
            console.log('Routing to page:', section, slug);
            // Pass skipHistoryUpdate=true since we're already responding to a hash change
            showPage(section, slug, true);
        } else if (pathParts.length === 1 && pathParts[0] !== '') {

            const section = pathParts[0];
            console.log('Routing to section:', section);
            if (section === 'home') {
                showHome();
            } else if (section === 'favorites') {
                showFavorites();
            } else if (section === 'notebook') {
                showNotebook();
            } else {
                showSection(section);
            }
        } else {
            console.log('Routing to home (empty hash)');
            showHome();
        }
    } else if (path === '' || path === 'index.html' || path === '/') {
        console.log('Routing to home (no hash)');
        showHome();
    } else {

        const pathParts = path.split('/');
        if (pathParts.length === 2) {
            const [section, slug] = pathParts;
            console.log('Path-based routing to:', section, slug);
            window.location.hash = `${section}/${slug}`;
            // skipHistoryUpdate=true since we just set the hash
            showPage(section, slug, true);
        } else {
            console.log('Routing to home (unrecognized path)');
            showHome();
        }
    }
}
function renderAllContent() {
    const mainContent = document.querySelector('.main-content .content-wrapper');
    const homeSection = document.getElementById('home');
    const homeHTML = homeSection ? homeSection.outerHTML : '';
    mainContent.innerHTML = homeHTML;
    CONFIG.contentFolders.forEach(folder => {
        const sectionData = contentData[folder.name.toLowerCase()];
        if (sectionData) {
            const sectionElement = createSectionElement(sectionData);
            mainContent.appendChild(sectionElement);
        }
    });
}
function createSectionElement(sectionData) {
    const section = document.createElement('section');
    section.id = sectionData.folder.name.toLowerCase();
    section.className = 'content-section';
    const header = document.createElement('div');
    header.className = 'section-header';
    header.innerHTML = `
        <h2 class="section-title">${sectionData.folder.name}</h2>
        <p class="section-description">${sectionData.folder.description}</p>
    `;
    const pagesGrid = document.createElement('div');
    pagesGrid.className = 'pages-grid';
    if (sectionData.pages.length === 0) {
        pagesGrid.innerHTML = `
            <div class="empty-state">
                <h3>No pages yet</h3>
                <p>Add some markdown files to the <code>${sectionData.folder.path}</code> folder to see them here.</p>
            </div>
        `;
    } else {
        sectionData.pages.forEach(page => {
            const pageCard = createPageCard(page, sectionData.folder.name.toLowerCase());
            pagesGrid.appendChild(pageCard);
        });
    }
    section.appendChild(header);
    section.appendChild(pagesGrid);
    return section;
}
function createPageCard(page, sectionName) {
    const card = document.createElement('div');
    // Make projects section cards non-clickable
    const isClickable = sectionName.toLowerCase() !== 'projects';
    card.className = isClickable ? 'page-card' : 'page-card non-clickable';

    card.innerHTML = `
        <h3 class="page-title">${page.title}</h3>
        <p class="page-excerpt">${page.excerpt}</p>
        <div class="page-meta">
            <span class="page-date">${formatDate(page.date)}</span>
        </div>
    `;

    // Only add click handler if not projects section
    if (isClickable) {
        card.addEventListener('click', () => {
            showPage(sectionName, page.slug);
        });
    }
    return card;
}
async function showPage(sectionName, slug, skipHistoryUpdate = false) {
    console.log('showPage called:', { sectionName, slug, currentPage, currentSection, skipHistoryUpdate });

    const sectionData = contentData[sectionName];
    if (!sectionData) {
        console.warn('Section not found:', sectionName);
        showHome();
        return;
    }
    const page = sectionData.pages.find(p => p.slug === slug);
    if (!page) {
        console.warn('Page not found:', slug, 'in section:', sectionName);
        showHome();
        return;
    }

    // Check if we're already on this page AND it's not from history navigation
    if (currentPage && currentPage.slug === slug && currentSection === sectionName && !skipHistoryUpdate) {
        console.log('Already on this page, skipping');
        return;
    }

    console.log('Loading page:', page.title);
    if (!page.content) {
        showLoading();
        try {

            const filePath = page.path || `content/${sectionName}/${page.filename}`;
            console.log('Fetching content from:', filePath);
            const content = await fetchMarkdownFile(filePath);
            const parsed = parseMarkdownFile(page.filename, content);
            page.content = parsed.content;
            page.originalContent = content;
            page.path = filePath;
        } catch (error) {
            console.error(`Failed to load page content: ${error}`);
            hideLoading();
            showHome();
            return;
        }
        hideLoading();
    }
    currentPage = page;
    currentSection = sectionName;

    // Only update history if not coming from hashchange/popstate
    if (!skipHistoryUpdate) {
        window.location.hash = `${sectionName}/${slug}`;
    }

    // Hide all content sections including home
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Specifically ensure home section is hidden
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.remove('active');
    }
    const mainContent = document.querySelector('.main-content .content-wrapper');
    let articleSection = document.getElementById('article-content');
    if (!articleSection) {
        articleSection = document.createElement('section');
        articleSection.id = 'article-content';
        articleSection.className = 'content-section';
        mainContent.appendChild(articleSection);
    }
    articleSection.innerHTML = createPageContent(page, sectionName);
    articleSection.classList.add('active');
    const headers = generateTableOfContents(page.originalContent || page.content);
    showTOC(headers);
    setTimeout(() => {

        if (headers.length === 0) {
            const htmlHeaders = extractHeadersFromDOM();
            if (htmlHeaders.length > 0) {
                showTOC(htmlHeaders);
                headers.push(...htmlHeaders);
            }
        }
        headers.forEach(header => {
            const headerElements = document.querySelectorAll(`h${header.level}`);
            headerElements.forEach((element) => {
                if (element.textContent.trim() === header.title && !element.id) {
                    element.id = header.id;
                }
            });
        });
        updateFavoriteButton(sectionName, slug);
        loadNoteForArticle(sectionName, slug);
    }, 200);
    updateNavigation(sectionName);
    if (typeof Prism !== 'undefined') {
        Prism.highlightAll();
    }
}
function updateFavoriteButton(sectionName, slug) {
    const key = `${sectionName}/${slug}`;
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const starIcon = document.querySelector('.favorite-btn .star-icon');
    if (starIcon) {
        starIcon.textContent = favorites.includes(key) ? '★' : '☆';
    }
}
function showHome() {

    if (currentSection === 'home' && !currentPage) {
        return;
    }
    currentPage = null;
    currentSection = 'home';
    history.pushState({}, '', '#');

    // Hide TOC when showing home page
    hideTOC();

    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const homeSection = document.getElementById('home');
    if (homeSection) {
        homeSection.classList.add('active');
        if (!homeSection.innerHTML.trim()) {
            loadHomeContent().then(() => updateStats());
        } else {

            initializeTerminal();
            updateStats();
            const discordCard = document.getElementById('discord-presence');
            if (discordCard && !discordCard.querySelector('.discord-card')) {
                loadDiscordPresence();
            }
        }
    } else {

        const mainContent = document.querySelector('.main-content .content-wrapper');
        const newHomeSection = document.createElement('section');
        newHomeSection.id = 'home';
        newHomeSection.className = 'content-section active';
        mainContent.insertBefore(newHomeSection, mainContent.firstChild);
        loadHomeContent();
        renderAllContent();
        updateStats();
    }
    hideTOC();
    resetTOCSidebar();
    updateNavigation('home');
}
function createPageContent(page, sectionName) {

    const toc = generateTableOfContents(page.content);
    let contentToRender = page.content;
    const firstH1Match = contentToRender.match(/^#\s+(.+?)$/m);
    if (firstH1Match && firstH1Match[1].trim() === page.title.trim()) {
        contentToRender = contentToRender.replace(/^#\s+.+?$/m, '').trim();
    }
    // Don't render wiki links before markdown parsing
    const backlinks = getBacklinksForPage(sectionName, page.slug);
    let backlinksHtml = '';
    if (backlinks.length > 0) {
        backlinksHtml = `
            <div class="backlinks-section">
                <h3 class="backlinks-title">Linked References (${backlinks.length})</h3>
                <div class="backlinks-list">
                    ${backlinks.map(bl => `
                        <div class="backlink-item" onclick="showPage('${bl.sourceSection}', '${bl.sourceSlug}')">
                            <span class="backlink-title">${bl.sourceTitle}</span>
                            <span class="backlink-section">${bl.sourceSection}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    const citations = getCitationsForPage(sectionName, page.slug);
    let citationsHtml = '';
    if (citations.length > 0) {
        const citationsByType = {};
        citations.forEach(citation => {
            const type = citation.type || 'other';
            if (!citationsByType[type]) {
                citationsByType[type] = [];
            }
            citationsByType[type].push(citation);
        });
        const typeIcons = {
            arxiv: '',
            pubmed: '',
            nlab: '',
            doi: '',
            web: ''
        };
        const typeLabels = {
            arxiv: 'arXiv Papers',
            pubmed: 'PubMed Articles',
            nlab: 'nLab Entries',
            doi: 'DOI References',
            web: 'Web Resources'
        };
        citationsHtml = `
            <div class="citations-section">
                <h3 class="citations-title">Sources & References (${citations.length})</h3>
                ${Object.entries(citationsByType).map(([type, sources]) => `
                    <div class="citation-type-group">
                        <h4 class="citation-type-title">${typeLabels[type] || type.toUpperCase()}</h4>
                        <div class="citations-list">
                            ${sources.map(source => `
                                <div class="citation-item">
                                    <a href="${source.url}" target="_blank" rel="noopener noreferrer" class="citation-link">
                                        <span class="citation-title">${source.title}</span>
                                        ${source.authors ? `<span class="citation-authors">${source.authors.join(', ')}</span>` : ''}
                                        ${source.year ? `<span class="citation-year">(${source.year})</span>` : ''}
                                    </a>
                                    ${source.notes ? `<p class="citation-notes">${source.notes}</p>` : ''}
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
    return `
        <section class="page-content">
            <div class="page-header">
                <div class="page-header-top">
                    <nav class="breadcrumb">
                        <a href="#" onclick="showHome(); return false;">Home</a>
                        <span class="separator">/</span>
                        <a href="#" onclick="showSection('${sectionName}'); return false;">${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}</a>
                        <span class="separator">/</span>
                        <span class="current">${page.title}</span>
                    </nav>
                    <div class="page-actions">
                        <button class="action-btn favorite-btn" onclick="toggleFavorite('${sectionName}', '${page.slug}')" title="Favorite">
                            <span class="star-icon">☆</span>
                        </button>
                        <button class="action-btn share-btn" onclick="shareArticle('${sectionName}', '${page.slug}', '${page.title.replace(/'/g, "\\'")}', event)" title="Share">
                            <span>LINK</span>
                        </button>
                        <button class="action-btn save-btn" onclick="saveArticle('${sectionName}', '${page.slug}', '${page.title.replace(/'/g, "\\'")}', event)" title="Save">
                            <span>SAVE</span>
                        </button>
                    </div>
                </div>
                <h1 class="page-title">${page.title}</h1>
                <div class="page-meta">
                    <span class="page-date">${formatDate(page.date)}</span>
                </div>
            </div>
            <div class="page-body">
                <div class="markdown-content">${renderWikiLinks(addHeaderIds(marked.parse(contentToRender)))}</div>
                ${citationsHtml}
                ${backlinksHtml}
            </div>
            <div class="page-footer">
                <a href="#" onclick="showHome(); return false;" class="back-link">← Back to Home</a>
                <a href="#" onclick="showSection('${sectionName}'); return false;" class="back-link">← Back to ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}</a>
            </div>
        </section>
    `;
}
function updateNavigation(activeSection) {
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
    });
    const activeLink = document.querySelector(`[data-section="${activeSection}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
}
function showSection(sectionName) {

    if (currentSection === sectionName && !currentPage) {
        return;
    }
    if (currentPage) {
        showHome();
        setTimeout(() => {
            showSectionDirect(sectionName);
        }, 100);
        return;
    }
    showSectionDirect(sectionName);
}
function showSectionDirect(sectionName) {

    // Hide TOC when showing section list (not an article)
    hideTOC();

    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const targetSection = document.getElementById(sectionName);
    if (targetSection) {
        targetSection.classList.add('active');
    }
    currentSection = sectionName;
    currentPage = null;
    history.pushState({}, '', `#${sectionName}`);
    hideTOC();
    resetTOCSidebar();
    updateNavigation(sectionName);
}
function updateStats() {
    let totalPages = 0;
    let totalSections = 0;
    let totalWords = 0;
    Object.values(contentData).forEach(section => {
        if (section && section.pages) {
            totalPages += section.pages.length;
            section.pages.forEach(page => {
                if (page && page.content) {
                    const wordCount = countWords(page.content);
                    const headerCount = countHeaders(page.content);
                    totalWords += wordCount;
                    totalSections += headerCount;
                }
            });
        }
    });
    const totalPagesElement = document.getElementById('totalPages');
    const totalSectionsElement = document.getElementById('totalSections');
    const totalWordsElement = document.getElementById('totalWords');
    if (totalPagesElement) {
        totalPagesElement.textContent = totalPages;
    } else {
        console.warn('totalPages element not found in DOM');
    }
    if (totalSectionsElement) {
        totalSectionsElement.textContent = totalSections;
    } else {
        console.warn('totalSections element not found in DOM');
    }
    if (totalWordsElement) {
        totalWordsElement.textContent = formatWordCount(totalWords);
    } else {
        console.warn('totalWords element not found in DOM');
    }
    console.log('Stats updated:', { totalPages, totalSections, totalWords });
}
function countHeaders(content) {
    if (!content || typeof content !== 'string') {
        return 0;
    }
    const headerMatches = content.match(/^#{1,6}\s+/gm);
    return headerMatches ? headerMatches.length : 0;
}
function countWords(content) {
    if (!content || typeof content !== 'string') {
        return 0;
    }
    const cleanContent = content
        .replace(/#+\s*/g, '')
        .replace(/\*\*([^*]+)\*\*/g, '$1')
        .replace(/\*([^*]+)\*/g, '$1')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/```[\s\S]*?```/g, '')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/!\[([^\]]*)\]\([^)]+\)/g, '')
        .replace(/^\s*[-*+]\s+/gm, '')
        .replace(/^\s*\d+\.\s+/gm, '')
        .replace(/^\s*>\s*/gm, '')
        .replace(/\n+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
    const words = cleanContent.split(' ').filter(word => word.length > 0);
    return words.length;
}
function formatWordCount(count) {
    if (count >= 1000) {
        return (count / 1000).toFixed(1) + 'k';
    }
    return count.toString();
}
function generateTableOfContents(content) {
    const headers = [];
    if (!content) {
        return headers;
    }
    const lines = content.split(/\r?\n/);
    lines.forEach((line, index) => {
        const headerMatch = line.match(/^(#{1,6})\s+(.+)$/);
        if (headerMatch) {
            const level = headerMatch[1].length;
            const title = headerMatch[2].replace(/\r$/, '').trim();
            const id = title.toLowerCase()
                .replace(/[^a-z0-9\s-]/g, '')
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-')
                .replace(/^-|-$/g, '');
            headers.push({
                level,
                title,
                id,
                line: index
            });
        }
    });
    return headers;
}
function extractHeadersFromDOM() {
    const headers = [];
    const headerElements = document.querySelectorAll('.markdown-content h1, .markdown-content h2, .markdown-content h3, .markdown-content h4, .markdown-content h5, .markdown-content h6');
    headerElements.forEach((element, index) => {
        const level = parseInt(element.tagName.substring(1));
        const title = element.textContent.trim();
        const id = element.id || title.toLowerCase()
            .replace(/[^a-z0-9\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
        if (!element.id) {
            element.id = id;
        }
        headers.push({
            level,
            title,
            id,
            line: index
        });
    });
    return headers;
}
function showTOC(headers) {
    const sidebar = document.getElementById('toc-sidebar');
    const tocNav = document.getElementById('toc-nav');
    if (!sidebar || !tocNav) {
        return;
    }
    tocNav.innerHTML = '';
    if (headers.length === 0) {
        sidebar.classList.remove('visible');
        return;
    }
    const filteredHeaders = headers.filter((header, index) => {
        return !(index === 0 && header.level === 1);
    });
    if (filteredHeaders.length === 0) {
        sidebar.classList.remove('visible');
        return;
    }
    const tocTree = buildTOCTree(filteredHeaders);
    renderTOCTree(tocTree, tocNav, 0);
    sidebar.classList.add('visible');
    setTimeout(() => {
        setupScrollSpy(filteredHeaders);
    }, 100);
}
function buildTOCTree(headers) {
    const tree = [];
    const stack = [];
    headers.forEach(header => {
        const node = {
            ...header,
            children: []
        };
        while (stack.length > 0 && stack[stack.length - 1].level >= header.level) {
            stack.pop();
        }
        if (stack.length === 0) {

            tree.push(node);
        } else {

            stack[stack.length - 1].children.push(node);
        }
        stack.push(node);
    });
    return tree;
}
function renderTOCTree(nodes, container, depth = 0) {
    nodes.forEach(node => {
        const item = document.createElement('div');
        item.className = 'toc-item';
        item.dataset.headerId = node.id;
        const link = document.createElement('div');
        link.className = `toc-link h${node.level}`;
        link.dataset.headerId = node.id;
        if (node.children.length > 0) {
            const toggle = document.createElement('span');
            toggle.className = 'toc-toggle';
            toggle.innerHTML = '▼';
            if (depth === 0) {
                toggle.classList.add('collapsed');
            }
            toggle.onclick = (e) => {
                e.preventDefault();
                e.stopPropagation();
                toggleTOCChildren(item, true);
            };
            link.appendChild(toggle);
        } else {

            const spacer = document.createElement('span');
            spacer.style.width = '16px';
            spacer.style.flexShrink = '0';
            link.appendChild(spacer);
        }
        const titleSpan = document.createElement('span');
        titleSpan.textContent = node.title;
        titleSpan.style.cursor = 'pointer';
        titleSpan.onclick = (e) => {
            e.preventDefault();
            scrollToHeader(node.id);
        };
        link.appendChild(titleSpan);
        item.appendChild(link);
        if (node.children.length > 0) {
            const childContainer = document.createElement('div');
            childContainer.className = 'toc-children';
            if (depth === 0) {
                childContainer.classList.add('collapsed');
            }
            renderTOCTree(node.children, childContainer, depth + 1);
            item.appendChild(childContainer);
        }
        container.appendChild(item);
    });
}
function toggleTOCChildren(item, isManual = false) {
    const childContainer = item.querySelector('.toc-children');
    const toggle = item.querySelector('.toc-toggle');
    if (childContainer && toggle) {
        childContainer.classList.toggle('collapsed');
        toggle.classList.toggle('collapsed');
        if (isManual) {
            item.dataset.manualToggle = 'true';
        }
    }
}
function hideTOC() {
    const sidebar = document.getElementById('toc-sidebar');
    if (sidebar) {
        sidebar.classList.remove('visible');
    }
}
function resetTOCSidebar() {
    const sidebar = document.getElementById('toc-sidebar');
    if (sidebar) {
        sidebar.innerHTML = `
            <div class="toc-content">
                <h3 class="toc-title">Table of Contents</h3>
                <nav id="toc-nav" class="toc-nav">
                    <!-- TOC links will be populated by JavaScript -->
                </nav>
            </div>
            <!-- Article-specific notes (appears below TOC) -->
            <div id="article-notes" class="article-notes">
                <div class="notes-header">
                    <h3 class="notes-title">Article Notes</h3>
                </div>
                <div id="article-notes-content" class="notes-content">
                    <textarea id="article-notes-editor" class="notes-editor" placeholder="Notes for this article..."></textarea>
                    <div class="notes-footer">
                        <span id="article-note-status" class="note-status"></span>
                    </div>
                    <div id="article-notes-history" class="notes-history"></div>
                </div>
            </div>
        `;
        const articleNotesEditor = document.getElementById('article-notes-editor');
        if (articleNotesEditor) {

            let saveTimeout;
            articleNotesEditor.addEventListener('input', () => {
                clearTimeout(saveTimeout);
                saveTimeout = setTimeout(() => {
                    saveNoteForCurrentArticleWithHistory();
                }, 1000);
            });
            articleNotesEditor.addEventListener('blur', () => {
                clearTimeout(saveTimeout);
                saveNoteForCurrentArticleWithHistory();
            });
        }
    }
}
function addHeaderIds(html) {
    // Add IDs to headers that don't have them
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;

    const headers = tempDiv.querySelectorAll('h1, h2, h3, h4, h5, h6');
    headers.forEach(header => {
        if (!header.id) {
            // Generate ID from header text
            const id = header.textContent.trim()
                .toLowerCase()
                .replace(/[^\w\s-]/g, '')
                .replace(/\s+/g, '-');
            header.id = id;
        }
    });

    return tempDiv.innerHTML;
}

function scrollToHeader(headerId) {
    // First try to find by ID
    let element = document.getElementById(headerId);

    // If not found, try to find heading by text content
    if (!element) {
        const decodedId = decodeURIComponent(headerId);
        const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
        for (const heading of headings) {
            const headingText = heading.textContent.trim().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
            if (headingText === headerId.toLowerCase() || heading.textContent.trim() === decodedId) {
                element = heading;
                // Add ID to heading for future reference
                heading.id = headerId;
                break;
            }
        }
    }

    if (element) {
        // Get the header and nav height to offset scroll
        const header = document.querySelector('.header');
        const nav = document.querySelector('.navigation');
        const headerHeight = (header ? header.offsetHeight : 0) + (nav ? nav.offsetHeight : 0);
        const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
        const offsetPosition = elementPosition - headerHeight - 20; // 20px extra padding

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });

        // Add a brief highlight effect
        element.style.backgroundColor = 'var(--accent-primary-alpha, rgba(189, 147, 249, 0.1))';
        setTimeout(() => {
            element.style.transition = 'background-color 1s ease';
            element.style.backgroundColor = '';
        }, 500);
    }
}
function setupScrollSpy(headers) {
    let previouslyExpandedItems = new Set();
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {

                document.querySelectorAll('.toc-link').forEach(link => {
                    link.classList.remove('active');
                });
                const activeLink = document.querySelector(`.toc-link[data-header-id="${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                    const parentsToExpand = [];
                    let parentItem = activeLink.closest('.toc-item').parentElement;
                    while (parentItem && parentItem.classList.contains('toc-children')) {
                        const parentTocItem = parentItem.closest('.toc-item');
                        if (parentTocItem) {
                            parentsToExpand.push(parentTocItem);
                        }
                        parentItem = parentItem.parentElement.closest('.toc-item')?.parentElement;
                    }
                    previouslyExpandedItems.forEach(item => {

                        if (item.dataset.manualToggle !== 'true' && !parentsToExpand.includes(item)) {
                            const toggle = item.querySelector(':scope > .toc-link > .toc-toggle');
                            const children = item.querySelector(':scope > .toc-children');
                            if (toggle && children && !children.classList.contains('collapsed')) {
                                toggle.classList.add('collapsed');
                                children.classList.add('collapsed');
                            }
                        }
                    });
                    const newExpandedItems = new Set();
                    parentsToExpand.forEach(parentTocItem => {
                        const toggle = parentTocItem.querySelector(':scope > .toc-link > .toc-toggle');
                        const children = parentTocItem.querySelector(':scope > .toc-children');
                        if (toggle && children && children.classList.contains('collapsed')) {

                            if (parentTocItem.dataset.manualToggle !== 'true') {
                                toggle.classList.remove('collapsed');
                                children.classList.remove('collapsed');
                                newExpandedItems.add(parentTocItem);
                            }
                        } else if (toggle && children && !children.classList.contains('collapsed')) {

                            if (parentTocItem.dataset.manualToggle !== 'true') {
                                newExpandedItems.add(parentTocItem);
                            }
                        }
                    });
                    previouslyExpandedItems = newExpandedItems;
                }
            }
        });
    }, {
        rootMargin: '-20% 0px -70% 0px'
    });
    headers.forEach(header => {
        const element = document.getElementById(header.id);
        if (element) {
            observer.observe(element);
        }
    });
}
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}
function showLoading() {

}
function hideLoading() {

}
function showError(message) {
    const mainContent = document.querySelector('.main-content .content-wrapper');
    if (mainContent) {
        mainContent.innerHTML = `
            <div class="empty-state">
                <h3>Error</h3>
                <p>${message}</p>
            </div>
        `;
    }
}
window.PortfolioApp = {
    showSection,
    showPage,
    showHome,
    contentData
};
window.showSection = showSection;
window.showPage = showPage;
window.showHome = showHome;
window.toggleFavorite = toggleFavorite;
window.shareArticle = shareArticle;
window.saveArticle = saveArticle;
window.openNotebook = openNotebook;
function toggleFavorite(sectionName, slug) {
    const key = `${sectionName}/${slug}`;
    let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const starIcon = document.querySelector('.favorite-btn .star-icon');
    if (favorites.includes(key)) {

        favorites = favorites.filter(f => f !== key);
        if (starIcon) starIcon.textContent = '☆';
        showNotification('Removed from favorites');
    } else {

        favorites.push(key);
        if (starIcon) starIcon.textContent = '★';
        showNotification('Added to favorites');
    }
    localStorage.setItem('favorites', JSON.stringify(favorites));
}
function shareArticle(sectionName, slug, title, event) {
    event.preventDefault();
    const url = `${window.location.origin}${window.location.pathname}#${sectionName}/${slug}`;
    if (navigator.share) {
        navigator.share({
            title: title,
            url: url
        }).catch(() => {

            copyToClipboard(url);
        });
    } else {

        copyToClipboard(url);
    }
}
function saveArticle(sectionName, slug, title, event) {
    event.preventDefault();
    const sectionData = contentData[sectionName];
    if (!sectionData) return;
    const page = sectionData.pages.find(p => p.slug === slug);
    if (!page) return;
    let savedArticles = JSON.parse(localStorage.getItem('savedArticles') || '[]');
    const articleData = {
        key: `${sectionName}/${slug}`,
        section: sectionName,
        slug: slug,
        title: page.title,
        content: page.content,
        date: page.date,
        savedAt: new Date().toISOString()
    };
    const existingIndex = savedArticles.findIndex(a => a.key === articleData.key);
    if (existingIndex >= 0) {
        savedArticles[existingIndex] = articleData;
        showNotification('Article updated in saved collection');
    } else {
        savedArticles.push(articleData);
        showNotification('Article saved for offline reading');
    }
    localStorage.setItem('savedArticles', JSON.stringify(savedArticles));
}
function copyToClipboard(text) {
    if (navigator.clipboard) {
        navigator.clipboard.writeText(text).then(() => {
            showNotification('Link copied to clipboard');
        }).catch(() => {
            fallbackCopyToClipboard(text);
        });
    } else {
        fallbackCopyToClipboard(text);
    }
}
function fallbackCopyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        document.execCommand('copy');
        showNotification('Link copied to clipboard');
    } catch (err) {
        showNotification('Failed to copy link');
    }
    document.body.removeChild(textarea);
}
let terminalClickHandler = null;
let terminalKeyHandler = null;
async function initializeTerminal() {
    const terminalInput = document.getElementById('terminal-input');
    const terminalHistory = document.getElementById('terminal-history');
    if (!terminalInput || !terminalHistory) {
        return;
    }
    try {
        const response = await fetch(getBasePath() + 'config/settings.txt');
        if (response.ok) {
            const settingsText = await response.text();
            const pathMatch = settingsText.match(/TERMINAL_PATH=(.+)/);
            const usernameMatch = settingsText.match(/TERMINAL_USERNAME=(.+)/);
            if (pathMatch) {
                const terminalPath = document.getElementById('terminal-path');
                if (terminalPath) {
                    terminalPath.textContent = pathMatch[1].trim();
                }
            }
            if (usernameMatch) {
                const terminalUsername = document.getElementById('terminal-username');
                if (terminalUsername) {
                    terminalUsername.textContent = usernameMatch[1].trim();
                }
            }
        }
    } catch (error) {
        console.warn('Could not load terminal settings:', error);
    }
    if (terminalKeyHandler) {
        terminalInput.removeEventListener('keydown', terminalKeyHandler);
    }
    terminalKeyHandler = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault();
            const command = terminalInput.value.trim();
            if (command) {
                const history = document.getElementById('terminal-history');
                executeTerminalCommand(command.toLowerCase(), history);
                terminalInput.value = '';
            }
        }
    };
    terminalInput.addEventListener('keydown', terminalKeyHandler);
    if (!terminalClickHandler) {
        terminalClickHandler = (e) => {
            if (e.target.closest('.terminal-window')) {
                const input = document.getElementById('terminal-input');
                if (input) input.focus();
            }
        };
        document.addEventListener('click', terminalClickHandler);
    }
    terminalInput.focus();
}
function executeTerminalCommand(cmd, terminalHistory) {

    const cmdLine = document.createElement('div');
    cmdLine.className = 'terminal-line';
    cmdLine.style.marginTop = '1rem';
    cmdLine.innerHTML = `<span class="terminal-prompt">$</span> <span>${cmd}</span>`;
    terminalHistory.appendChild(cmdLine);
    const output = document.createElement('div');
    output.className = 'terminal-output';
    const parts = cmd.trim().split(/\s+/);
    const command = parts[0];
    const args = parts.slice(1).join(' ');
    switch(command) {
        case 'p':
        case 'projects':
            output.innerHTML = '<span style="color: #ff79c6;">→ navigating to projects...</span>';
            setTimeout(() => window.showSection('projects'), 500);
            break;
        case 't':
        case 'thoughts':
            output.innerHTML = '<span style="color: #8be9fd;">→ navigating to thoughts...</span>';
            setTimeout(() => window.showSection('thoughts'), 500);
            break;
        case 'l':
        case 'learning':
            output.innerHTML = '<span style="color: #f1fa8c;">→ navigating to learning...</span>';
            setTimeout(() => window.showSection('learning'), 500);
            break;
        case 'r':
        case 'resources':
            output.innerHTML = '<span style="color: #bd93f9;">→ navigating to resources...</span>';
            setTimeout(() => window.showSection('resources'), 500);
            break;
        case 'help':
            output.innerHTML = `
                <span style="color: #50fa7b;">Navigation:</span><br>
                <span style="color: #ff79c6;">p, projects</span> - View projects<br>
                <span style="color: #8be9fd;">t, thoughts</span> - View thoughts<br>
                <span style="color: #f1fa8c;">l, learning</span> - View learning notes<br>
                <span style="color: #bd93f9;">r, resources</span> - View resources<br>
                <span style="color: #f8f8f2;">cd [dir]</span> - Change directory<br>
                <span style="color: #f8f8f2;">open [file]</span> - Open specific file<br><br>
                <span style="color: #50fa7b;">File System:</span><br>
                <span style="color: #f8f8f2;">ls</span> - List directories<br>
                <span style="color: #f8f8f2;">tree</span> - Show directory tree<br>
                <span style="color: #f8f8f2;">cat [file]</span> - View file contents<br>
                <span style="color: #f8f8f2;">find [query]</span> - Search files<br>
                <span style="color: #f8f8f2;">recent</span> - Show recent files<br>
                <span style="color: #f8f8f2;">graph</span> - Knowledge graph stats<br><br>
                <span style="color: #50fa7b;">System:</span><br>
                <span style="color: #f8f8f2;">clear</span> - Clear terminal<br>
                <span style="color: #f8f8f2;">status</span> - Quick stats<br>
                <span style="color: #f8f8f2;">stats</span> - Detailed statistics<br>
                <span style="color: #f8f8f2;">whoami</span> - Show identity<br>
                <span style="color: #f8f8f2;">about</span> - About site owner<br>
                <span style="color: #f8f8f2;">date</span> - Current date<br>
                <span style="color: #f8f8f2;">uptime</span> - Page uptime<br>
                <span style="color: #f8f8f2;">pwd</span> - Current directory<br>
                <span style="color: #f8f8f2;">neofetch</span> - System info<br>
                <span style="color: #f8f8f2;">theme</span> - Show current theme<br>
                <span style="color: #f8f8f2;">theme [name]</span> - Change theme<br><br>
                <span style="color: #50fa7b;">Fun:</span><br>
                <span style="color: #f8f8f2;">cat</span> - View file (or meow)<br>
                <span style="color: #f8f8f2;">coffee</span> - Brew coffee<br>
                <span style="color: #f8f8f2;">matrix</span> - Red or blue pill?<br>
                <span style="color: #f8f8f2;">fortune</span> - Random quote<br>
                <span style="color: #f8f8f2;">echo [text]</span> - Echo text<br>
                <span style="color: #f8f8f2;">rave</span> - Party mode!<br>
                <span style="color: #f8f8f2;">alice</span> - Enter wonderland
            `;
            break;
        case 'clear':
            terminalHistory.innerHTML = '';
            return;
        case 'status':
            const pagesEl = document.getElementById('totalPages');
            const sectionsEl = document.getElementById('totalSections');
            const wordsEl = document.getElementById('totalWords');
            const pages = pagesEl ? pagesEl.textContent : '0';
            const sections = sectionsEl ? sectionsEl.textContent : '0';
            const words = wordsEl ? wordsEl.textContent : '0';
            output.innerHTML = `Documents: <span class="status-val">${pages}</span> Concepts: <span class="status-val">${sections}</span> Words: <span class="status-val">${words}</span> GPU: <span class="status-val" style="color: #ff5555;">poor</span>`;
            break;
        case 'whoami':
            output.innerHTML = '<span class="bright">Lu Sichu</span>';
            break;
        case 'ls':
            output.innerHTML = `
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0 2rem;">
                    <span><span class="cmd-shortcut p">[p]</span> projects/</span>
                    <span><span class="cmd-shortcut t">[t]</span> thoughts/</span>
                    <span><span class="cmd-shortcut l">[l]</span> learning/</span>
                    <span><span class="cmd-shortcut r">[r]</span> resources/</span>
                </div>
            `;
            break;
        case 'cat':
            if (!args) {
                output.innerHTML = '🐱 <span style="color: #ff79c6;">meow</span> (usage: cat [filename] to view file)';
            } else {
                const filePath = args.trim();
                let found = false;
                for (const [section, data] of Object.entries(contentData)) {
                    if (data && data.pages) {
                        for (const page of data.pages) {
                            if (page.slug === filePath || page.title.toLowerCase() === filePath.toLowerCase()) {
                                output.innerHTML = `<span style="color: #50fa7b;">${page.title}</span><br>
                                    <span style="color: #8be9fd;">${formatDate(page.date)}</span><br><br>
                                    <span style="color: #f8f8f2;">${page.excerpt}...</span><br><br>
                                    <span style="color: #bd93f9;">→ Full content in ${section}/${page.slug}</span>`;
                                found = true;
                                break;
                            }
                        }
                    }
                    if (found) break;
                }
                if (!found) {
                    output.innerHTML = `<span style="color: #ff5555;">cat: ${filePath}: No such file or directory</span>`;
                }
            }
            break;
        case 'coffee':
            output.innerHTML = '☕ <span style="color: #8b4513;">Brewing coffee... done! Here you go: ☕</span>';
            break;
        case 'matrix':
            output.innerHTML = '<span style="color: #ff0000;"></span> or <span style="color: #0000ff;">🔵</span>? The choice is yours...';
            break;
        case 'vim':
        case 'emacs':
            output.innerHTML = '<span style="color: #ff5555;">Error: Editor wars detected. Please choose peace.</span>';
            break;
        case 'sudo':
            output.innerHTML = '<span style="color: #ff5555;">Nice try, but you\'re not root here.</span>';
            break;
        case 'rm -rf /':
            output.innerHTML = '<span style="color: #ff5555;">🚫 I\'m not going to do that, Dave.</span>';
            break;
        case 'hello':
        case 'hi':
            output.innerHTML = '<span style="color: #8be9fd;">Hello! Welcome to my digital garden 🌱</span>';
            break;
        case 'about':
            output.innerHTML = `<span style="color: #f8f8f2;">Lu Sichu - Category theorist, HoTT enthusiast, bridging mathematics and biology.</span><br>
                <span style="color: #bd93f9;">Interests:</span> Higher categories, ∞-groupoids, topos theory, complex systems<br>
                <span style="color: #8be9fd;">Currently:</span> Exploring the computational nature of biological systems`;
            break;
        case 'date':
            output.innerHTML = `<span style="color: #f1fa8c;">${new Date().toString()}</span>`;
            break;
        case 'uptime':
            const uptimeMs = Date.now() - (window.pageLoadTime || Date.now());
            const uptimeSecs = Math.floor(uptimeMs / 1000);
            const uptimeMins = Math.floor(uptimeSecs / 60);
            const uptimeHours = Math.floor(uptimeMins / 60);
            output.innerHTML = `<span style="color: #50fa7b;">Uptime: ${uptimeHours}h ${uptimeMins % 60}m ${uptimeSecs % 60}s</span>`;
            break;
        case 'pwd':
            output.innerHTML = '<span style="color: #8be9fd;">/home/lu_sichu/digital_garden</span>';
            break;
        case 'echo':
            if (!args) {
                output.innerHTML = '<span style="color: #f8f8f2;">echo: missing operand</span>';
            } else {
                output.innerHTML = `<span style="color: #f8f8f2;">${args}</span>`;
            }
            break;
        case 'neofetch':
        case 'fetch':
            output.innerHTML = `<pre style="color: #bd93f9;">
    ╭─────────╮    <span style="color: #f8f8f2;">lu@sichu</span>
    │  ∞  ∞  │    <span style="color: #f8f8f2;">--------</span>
    │    >    │    <span style="color: #ff79c6;">OS:</span> Web Browser
    │   ___   │    <span style="color: #ff79c6;">Shell:</span> JavaScript
    ╰─────────╯    <span style="color: #ff79c6;">Theme:</span> Dracula
                   <span style="color: #ff79c6;">Editor:</span> Obsidian
                   <span style="color: #ff79c6;">Uptime:</span> ∞
</pre>`;
            break;
        case 'python':
        case 'python3':
            output.innerHTML = '<span style="color: #f1fa8c;">Python 3.14.159 (main, Jan 1 2024, 00:00:00)<br>Type "exit()" to exit<br>>>> </span><span style="color: #ff5555;">Error: This is just a simulation!</span>';
            break;
        case 'make':
            output.innerHTML = '<span style="color: #50fa7b;">make: *** No targets specified and no makefile found.  Stop.</span>';
            break;
        case 'fortune':
            const fortunes = [
                '"A monad is just a monoid in the category of endofunctors, what\'s the problem?"',
                '"Mathematics is the music of reason." — James Joseph Sylvester',
                '"The essence of mathematics lies in its freedom." — Georg Cantor',
                '"Pure mathematics is, in its way, the poetry of logical ideas." — Einstein'
            ];
            const randomFortune = fortunes[Math.floor(Math.random() * fortunes.length)];
            output.innerHTML = `<span style="color: #bd93f9; font-style: italic;">${randomFortune}</span>`;
            break;
        case 'hack':
        case 'hacker':
            output.innerHTML = '<span style="color: #50fa7b;">Accessing mainframe...</span><br><span style="color: #ff5555;">ACCESS DENIED</span><br><span style="color: #f8f8f2;">Nice try though 😎</span>';
            break;
        case 'rave':
            output.innerHTML = '<span style="color: #ff79c6;">🎉 PARTY MODE ACTIVATED! 🎉</span><br><span style="color: #8be9fd;">Press ESC to exit</span>';
            setTimeout(() => activateRaveMode(), 100);
            break;
        case 'alice':
            applyTheme('alice');
            output.innerHTML = '<span style="color: #ffb3d9;">Welcome to Wonderland</span>';
            break;
        case 'tree':
            let treeOutput = '<span style="color: #50fa7b;">Content Directory Tree:</span><br>';
            treeOutput += '<span style="color: #f8f8f2;">.<br>';
            for (const [section, data] of Object.entries(contentData)) {
                if (data && data.pages && data.pages.length > 0) {
                    treeOutput += `├── <span style="color: #8be9fd;">${section}/</span> <span style="color: #666;">(${data.pages.length} files)</span><br>`;
                    data.pages.forEach((page, index) => {
                        const isLast = index === data.pages.length - 1;
                        const prefix = isLast ? '    └── ' : '    ├── ';
                        treeOutput += `${prefix}<span style="color: #f1fa8c;">${page.slug}.md</span><br>`;
                    });
                }
            }
            output.innerHTML = treeOutput || '<span style="color: #888;">No content files found</span>';
            break;
        case 'graph':
            if (knowledgeGraph && knowledgeGraph.links) {
                const nodeCount = new Set([...knowledgeGraph.links.map(l => l.source), ...knowledgeGraph.links.map(l => l.target)]).size;
                const linkCount = knowledgeGraph.links.length;
                const backlinks = knowledgeGraph.backlinks || {};
                const backlinkCount = Object.values(backlinks).reduce((sum, arr) => sum + arr.length, 0);
                output.innerHTML = `<span style="color: #50fa7b;">Knowledge Graph:</span><br>
                    <span style="color: #f8f8f2;">Nodes: </span><span style="color: #ff79c6;">${nodeCount}</span><br>
                    <span style="color: #f8f8f2;">Links: </span><span style="color: #8be9fd;">${linkCount}</span><br>
                    <span style="color: #f8f8f2;">Backlinks: </span><span style="color: #f1fa8c;">${backlinkCount}</span><br><br>
                    <span style="color: #666;">Most connected pages:</span><br>`;
                const connections = {};
                knowledgeGraph.links.forEach(link => {
                    connections[link.source] = (connections[link.source] || 0) + 1;
                    connections[link.target] = (connections[link.target] || 0) + 1;
                });
                const topNodes = Object.entries(connections)
                    .sort((a, b) => b[1] - a[1])
                    .slice(0, 5);
                topNodes.forEach(([node, count]) => {
                    output.innerHTML += `  <span style="color: #bd93f9;">→</span> ${node} <span style="color: #666;">(${count} connections)</span><br>`;
                });
            } else {
                output.innerHTML = '<span style="color: #888;">No knowledge graph data available</span>';
            }
            break;
        case 'find':
        case 'search':
            if (!args) {
                output.innerHTML = '<span style="color: #ff5555;">Usage: find [query]</span>';
            } else {
                const query = args.toLowerCase();
                const results = [];
                for (const [section, data] of Object.entries(contentData)) {
                    if (data && data.pages) {
                        data.pages.forEach(page => {
                            if (page.title.toLowerCase().includes(query) ||
                                page.excerpt.toLowerCase().includes(query) ||
                                page.slug.toLowerCase().includes(query)) {
                                results.push({ section, page });
                            }
                        });
                    }
                }
                if (results.length > 0) {
                    output.innerHTML = `<span style="color: #50fa7b;">Found ${results.length} results:</span><br>`;
                    results.slice(0, 10).forEach(({ section, page }) => {
                        output.innerHTML += `<span style="color: #bd93f9;">→</span> ${section}/<span style="color: #f1fa8c;">${page.slug}</span> - ${page.title}<br>`;
                    });
                    if (results.length > 10) {
                        output.innerHTML += `<span style="color: #666;">... and ${results.length - 10} more</span>`;
                    }
                } else {
                    output.innerHTML = `<span style="color: #888;">No files found matching "${query}"</span>`;
                }
            }
            break;
        case 'recent':
            const allPages = [];
            for (const [section, data] of Object.entries(contentData)) {
                if (data && data.pages) {
                    data.pages.forEach(page => {
                        allPages.push({ section, page });
                    });
                }
            }
            allPages.sort((a, b) => new Date(b.page.date) - new Date(a.page.date));
            if (allPages.length > 0) {
                output.innerHTML = '<span style="color: #50fa7b;">Recent content:</span><br>';
                allPages.slice(0, 10).forEach(({ section, page }) => {
                    output.innerHTML += `<span style="color: #8be9fd;">${formatDate(page.date)}</span> - ${section}/<span style="color: #f1fa8c;">${page.slug}</span><br>`;
                });
            } else {
                output.innerHTML = '<span style="color: #888;">No content found</span>';
            }
            break;
        case 'stats':
            let totalPages = 0;
            let totalWords = 0;
            let totalConcepts = 0; // Count of markdown headers (## concepts)
            const sectionStats = {};
            for (const [section, data] of Object.entries(contentData)) {
                if (data && data.pages) {
                    totalPages += data.pages.length;
                    sectionStats[section] = data.pages.length;
                    data.pages.forEach(page => {
                        // Count words from originalContent (full markdown) or content
                        const textContent = page.originalContent || page.content || page.excerpt || '';
                        const words = textContent.split(/\s+/).filter(w => w.length > 0);
                        totalWords += words.length;

                        // Count concepts (markdown headers: ##, ###, etc.)
                        const headerMatches = textContent.match(/^#{1,6}\s+.+$/gm);
                        if (headerMatches) {
                            totalConcepts += headerMatches.length;
                        }
                    });
                }
            }
            output.innerHTML = `<span style="color: #50fa7b;">System Statistics:</span><br>
                <span style="color: #f8f8f2;">────────────────</span><br>
                <span style="color: #ff79c6;">Total Concepts:</span> ${totalConcepts} <span style="color: #666;">(headers in markdown)</span><br>
                <span style="color: #8be9fd;">Total Pages:</span> ${totalPages}<br>
                <span style="color: #f1fa8c;">Total Words:</span> ${totalWords.toLocaleString()}<br>
                <span style="color: #bd93f9;">Avg Words/Page:</span> ${totalPages ? Math.round(totalWords/totalPages) : 0}<br><br>
                <span style="color: #50fa7b;">Section Breakdown:</span><br>`;
            for (const [section, count] of Object.entries(sectionStats)) {
                const percentage = totalPages ? Math.round((count/totalPages) * 100) : 0;
                output.innerHTML += `  ${section}: <span style="color: #ff79c6;">${count}</span> pages <span style="color: #666;">(${percentage}%)</span><br>`;
            }
            if (citationIndex && citationIndex.stats) {
                const totalCitations = Object.values(citationIndex.stats).reduce((a, b) => a + b, 0);
                if (totalCitations > 0) {
                    output.innerHTML += `<br><span style="color: #50fa7b;">Citations:</span><br>`;
                    for (const [type, count] of Object.entries(citationIndex.stats)) {
                        output.innerHTML += `  ${type}: <span style="color: #8be9fd;">${count}</span><br>`;
                    }
                }
            }
            break;
        case 'cd':
            if (!args || args === '~' || args === '/') {
                output.innerHTML = '<span style="color: #8be9fd;">Changed to home directory</span>';
            } else if (args === '..') {
                output.innerHTML = '<span style="color: #8be9fd;">Already at root directory</span>';
            } else if (contentData[args]) {
                output.innerHTML = `<span style="color: #8be9fd;">Changed to ${args}/</span>`;
                setTimeout(() => window.showSection(args), 500);
            } else {
                output.innerHTML = `<span style="color: #ff5555;">cd: ${args}: No such directory</span>`;
            }
            break;
        case 'open':
            if (!args) {
                output.innerHTML = '<span style="color: #ff5555;">Usage: open [filename]</span>';
            } else {
                const fileName = args.trim();
                let found = false;
                for (const [section, data] of Object.entries(contentData)) {
                    if (data && data.pages) {
                        for (const page of data.pages) {
                            if (page.slug === fileName || page.title.toLowerCase() === fileName.toLowerCase()) {
                                output.innerHTML = `<span style="color: #50fa7b;">Opening ${page.title}...</span>`;
                                setTimeout(() => window.showPage(section, page.slug), 500);
                                found = true;
                                break;
                            }
                        }
                    }
                    if (found) break;
                }
                if (!found) {
                    output.innerHTML = `<span style="color: #ff5555;">File not found: ${fileName}</span>`;
                }
            }
            break;
        case 'theme':
            if (args) {
                const themeName = args.trim();
                const availableThemes = getAvailableThemes();
                if (availableThemes.includes(themeName)) {
                    const displayName = applyTheme(themeName);
                    output.innerHTML = `<span style="color: var(--accent-success);">✓ Switched to ${displayName} theme</span>`;
                } else {
                    output.innerHTML = `<span style="color: var(--accent-error);">Unknown theme: ${themeName}</span><br>
                        <span style="color: var(--text-secondary);">Available: ${availableThemes.join(', ')}</span>`;
                }
            } else {
                const currentTheme = getCurrentTheme();
                const availableThemes = getAvailableThemes();
                output.innerHTML = `<span style="color: var(--accent-tertiary);">Current theme: ${currentTheme}</span><br>
                    <span style="color: var(--text-secondary);">Available themes: ${availableThemes.join(', ')}</span><br>
                    <span style="color: var(--text-secondary);">Usage: theme [name]</span>`;
            }
            break;
        default:
            output.innerHTML = `<span style="color: #ff5555;">Command not found: ${cmd}</span><br><span style="color: #888;">Type 'help' for available commands</span>`;
    }
    terminalHistory.appendChild(output);
    const terminal = document.querySelector('.terminal-content');
    if (terminal) {
        terminal.scrollTop = terminal.scrollHeight;
    }
}
let raveInterval = null;
let raveActive = false;
function activateRaveMode() {
    if (raveActive) return;
    raveActive = true;
    if (window.startPartyMode) {
        window.startPartyMode();
    }
    const escHandler = (e) => {
        if (e.key === 'Escape') {
            deactivateRaveMode();
            document.removeEventListener('keydown', escHandler);
        }
    };
    document.addEventListener('keydown', escHandler);
}
function deactivateRaveMode() {
    if (!raveActive) return;
    raveActive = false;
    if (window.stopPartyMode) {
        window.stopPartyMode();
    }
}
let aliceActive = false;
let originalStyles = null;
function toggleAliceMode() {
    if (!aliceActive) {
        activateAliceMode();
    } else {
        deactivateAliceMode();
    }
}
function activateAliceMode() {
    if (aliceActive) return;
    aliceActive = true;
    const root = document.documentElement;
    originalStyles = {
        '--bg-primary': getComputedStyle(root).getPropertyValue('--bg-primary'),
        '--bg-secondary': getComputedStyle(root).getPropertyValue('--bg-secondary'),
        '--text-primary': getComputedStyle(root).getPropertyValue('--text-primary'),
    };
    const aliceStyle = document.createElement('style');
    aliceStyle.id = 'alice-mode-styles';
    aliceStyle.textContent = `
        body {
            background: linear-gradient(135deg, #ffd4e5 0%, #ffc9e0 50%, #ffb3d9 100%) !important;
            transition: all 0.5s ease;
        }
        .container {
            background: rgba(255, 240, 250, 0.95) !important;
        }
        .header {
            background: linear-gradient(135deg, #ffb3d9 0%, #ffc9e0 100%) !important;
        }
        .navigation {
            background: #ffd4e5 !important;
        }
        .nav-link {
            color: #d946aa !important;
        }
        .nav-link:hover,
        .nav-link.active {
            color: #ff79c6 !important;
        }
        .toc-sidebar {
            background: #ffe8f5 !important;
            border-color: #ffc9e0 !important;
        }
        .page-card {
            background: #fff0f9 !important;
            border-color: #ffc9e0 !important;
        }
        .page-card:hover {
            box-shadow: 0 8px 25px rgba(255, 121, 198, 0.3) !important;
        }
        .markdown-content h1 {
            color: #d946aa !important;
        }
        .markdown-content h2 {
            color: #ff79c6 !important;
        }
        .markdown-content h3 {
            color: #ffb3d9 !important;
        }
        .markdown-content {
            color: #5a2342 !important;
        }
        .terminal-window {
            background: #fff0f9 !important;
            border-color: #ffc9e0 !important;
        }
        .terminal-header {
            background: #ffc9e0 !important;
        }
        .terminal-content {
            background: #fff5fc !important;
            color: #5a2342 !important;
        }
        .footer {
            background: #ffd4e5 !important;
            color: #5a2342 !important;
        }
        .section-header {
            border-bottom-color: #ffc9e0 !important;
        }
        .section-title,
        .page-title {
            color: #d946aa !important;
        }
        code {
            background: #ffe8f5 !important;
            color: #d946aa !important;
        }
        pre {
            background: #fff0f9 !important;
            border-color: #ffc9e0 !important;
        }
        blockquote {
            background: linear-gradient(135deg, #ffe8f5 0%, #ffd4e5 100%) !important;
            border-left-color: #ff79c6 !important;
        }
    `;
    document.head.appendChild(aliceStyle);
}
function deactivateAliceMode() {
    if (!aliceActive) return;
    aliceActive = false;
    const aliceStyle = document.getElementById('alice-mode-styles');
    if (aliceStyle) {
        aliceStyle.remove();
    }
}
async function loadDiscordPresence() {
    try {

        const settingsResponse = await fetch(getBasePath() + 'config/settings.txt');
        if (!settingsResponse.ok) {
            return;
        }
        const settingsText = await settingsResponse.text();
        const userIdMatch = settingsText.match(/DISCORD_USER_ID=(\d+)/);
        if (!userIdMatch) {
            return;
        }
        const userId = userIdMatch[1];
        const bannerMatch = settingsText.match(/DISCORD_BANNER_URL=(.+)/);
        const manualBannerUrl = bannerMatch && bannerMatch[1].trim() ? bannerMatch[1].trim() : null;
        const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);
        const data = await response.json();
        if (data.success) {
            displayDiscordPresence(data.data, manualBannerUrl);
        }
    } catch (error) {

    }
}
function displayDiscordPresence(data, manualBannerUrl = null) {
    const presenceCard = document.getElementById('discord-presence');
    const { discord_user, discord_status, spotify, activities } = data;
    console.log('Full Discord user data:', discord_user);
    // Get ALL non-Spotify, non-custom-status activities
    const gameActivities = activities?.filter(a => a.name !== 'Spotify' && a.type !== 4) || [];
    const customStatus = activities?.find(a => a.type === 4);
    // For ticker, still use just the first activity for simplicity
    const mainActivity = gameActivities[0];
    updateActivityTicker(discord_status, spotify, mainActivity, customStatus);
    if (!presenceCard) return;
    const isInitialLoad = !presenceCard.querySelector('.discord-card');
    const cardClass = isInitialLoad ? 'discord-card initial-load' : 'discord-card';
    let bannerStyle = '';
    if (manualBannerUrl) {
        console.log('Using manual banner URL:', manualBannerUrl);
        bannerStyle = `style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${manualBannerUrl}'); background-size: cover; background-position: center;"`;
    } else if (discord_user.banner) {

        const bannerExtension = discord_user.banner.startsWith('a_') ? 'gif' : 'png';
        const bannerUrl = `https://cdn.discordapp.com/banners/${discord_user.id}/${discord_user.banner}.${bannerExtension}?size=512`;
        console.log('Discord banner URL:', bannerUrl);
        bannerStyle = `style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${bannerUrl}'); background-size: cover; background-position: center;"`;
    } else {
        console.log('No Discord banner found for user:', discord_user.id);
    }
    const avatarExtension = discord_user.avatar.startsWith('a_') ? 'gif' : 'png';
    const avatarUrl = `https://cdn.discordapp.com/avatars/${discord_user.id}/${discord_user.avatar}.${avatarExtension}?size=128`;
    let presenceHTML = `
        <div class="${cardClass}" ${bannerStyle}>
            <div class="discord-layout">
                <div class="discord-avatar-column">
                    <img src="${avatarUrl}"
                         alt="${discord_user.username}"
                         class="discord-avatar">
                    <a href="https://discord.com" target="_blank" class="discord-username-pill ${discord_status}" title="Discord">${discord_user.username}</a>
                </div>
                <div class="discord-content-column">
    `;

    // Handle custom status and activity display
    if (customStatus && customStatus.state) {
        // Show custom status
        presenceHTML += `
            <div class="discord-activity">
                <div class="activity-name">${customStatus.state}</div>
            </div>
        `;
    }

    // Display all game activities merged into one pill
    if (gameActivities.length > 0) {
        presenceHTML += `
            <div class="discord-activity">
        `;

        // Build the list of activities
        let activityNames = [];

        for (const activity of gameActivities) {
            // Handle "with X" activities specially
            if (activity.state && activity.state.toLowerCase().startsWith('with ') && !activity.name) {
                activityNames.push(activity.state);
            } else if (activity.name) {
                activityNames.push(activity.name);
            }
        }

        // Format the activity string with proper grammar
        let activityText = '';
        if (activityNames.length === 1) {
            // Single activity
            if (activityNames[0].toLowerCase().startsWith('with ')) {
                activityText = `Playing ${activityNames[0]}`;
            } else {
                activityText = `Playing ${activityNames[0]}`;
            }
        } else if (activityNames.length === 2) {
            // Two activities: "Playing X and Y"
            activityText = `Playing ${activityNames.join(' and ')}`;
        } else if (activityNames.length > 2) {
            // Multiple activities: "Playing X, Y, and Z"
            const lastActivity = activityNames.pop();
            activityText = `Playing ${activityNames.join(', ')}, and ${lastActivity}`;
        }

        presenceHTML += `<div class="activity-name">${activityText}</div>`;

        // If there's only one activity and it has details/state, show them
        if (gameActivities.length === 1) {
            const activity = gameActivities[0];
            if (activity.details) {
                presenceHTML += `<div class="activity-details">${activity.details}</div>`;
            }
            if (activity.state && !activity.state.toLowerCase().startsWith('with ')) {
                presenceHTML += `<div class="activity-state">${activity.state}</div>`;
            }
        }

        presenceHTML += `
            </div>
        `;
    }
    if (spotify) {
        presenceHTML += `
            <div class="discord-spotify">
                <div class="spotify-header">
                    <span class="spotify-icon">♪</span>
                    Listening to Spotify
                </div>
                <div class="spotify-song">${spotify.song}</div>
                <div class="spotify-artist">by ${spotify.artist}</div>
            </div>
        `;
    }
    if (data.kv && data.kv.location) {
        presenceHTML += `
            <div class="discord-location">
                <span class="location-icon">📍</span>
                ${data.kv.location}
            </div>
        `;
    }
    presenceHTML += `
                    <div class="discord-footer">
                        <div class="social-links-icons">
                            <a href="https://www.youtube.com/@eosyn" target="_blank" class="social-icon-btn youtube" title="YouTube">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                                </svg>
                            </a>
                            <a href="https://www.redbubble.com/people/eosyn/shop" target="_blank" class="social-icon-btn redbubble" title="Redbubble">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm3.5 17.5h-3.2l-1.6-4h-3l1.4-3.5h3l1.4-3.5h3.5l-1.5 3.5h3l-1.5 3.5h-3l1.5 4z"/>
                                </svg>
                            </a>
                            <a href="https://www.patreon.com/eosyn" target="_blank" class="social-icon-btn patreon" title="Patreon">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M15.386 0c-4.764 0-8.641 3.877-8.641 8.641 0 4.75 3.877 8.641 8.641 8.641 4.75 0 8.627-3.891 8.627-8.641C24.013 3.877 20.136 0 15.386 0zM.013 24h4.659V0H.013v24z"/>
                                </svg>
                            </a>
                            <a href="https://www.twitch.tv/eosyn" target="_blank" class="social-icon-btn twitch" title="Twitch">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714z"/>
                                </svg>
                            </a>
                            <a href="https://x.com/lu_sichu" target="_blank" class="social-icon-btn twitter" title="@lu_sichu">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                                </svg>
                            </a>
                            <a href="https://github.com" target="_blank" class="social-icon-btn github" title="GitHub">
                                <svg viewBox="0 0 24 24" fill="currentColor" width="18" height="18">
                                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    presenceCard.innerHTML = presenceHTML;
    // Ticker is already updated by updateActivityTicker called earlier
    setTimeout(() => loadDiscordPresence(), 30000);
}
async function loadSiteSettings() {
    try {
        const response = await fetch(getBasePath() + 'config/settings.txt');
        if (!response.ok) return;
        const text = await response.text();
        const lines = text.split('\n');
        lines.forEach(line => {
            line = line.trim();
            if (line && !line.startsWith('#')) {
                const [key, value] = line.split('=').map(s => s.trim());
                if (key && value) {

                    if (value.toLowerCase() === 'true') {
                        siteSettings[key] = true;
                    } else if (value.toLowerCase() === 'false') {
                        siteSettings[key] = false;
                    } else {
                        siteSettings[key] = value;
                    }
                }
            }
        });
        window.siteSettings = siteSettings;
        if (siteSettings.SITE_TITLE) {
            const siteTitleElement = document.querySelector('.site-title');
            if (siteTitleElement) {
                siteTitleElement.textContent = siteSettings.SITE_TITLE;
            }
        }
    } catch (e) {

    }
}
async function updateActivityTicker(status, spotify, activity, customStatus) {
    const tickerContent = document.getElementById('ticker-content');
    if (!tickerContent) return;
    let items = [];

    // MOTD if available
    if (window.siteSettings && window.siteSettings.MOTD) {
        items.push(`${window.siteSettings.MOTD}`);
    }

    // Discord status with color indicator
    const statusColors = {
        online: '#50fa7b',
        idle: '#f1fa8c',
        dnd: '#ff5555',
        offline: '#6272a4'
    };
    const statusColor = statusColors[status] || statusColors.offline;
    items.push(`Discord: <span style="color: ${statusColor};">● ${status.toUpperCase()}</span>`);

    // Custom status (just show the text, no label)
    if (customStatus && customStatus.state) {
        items.push(customStatus.state);
    }

    // Spotify
    if (spotify) {
        items.push(`♪ ${spotify.song} — ${spotify.artist}`);
    }

    // Game/Activity
    if (activity) {
        let activityText;
        // Special handling for activities with "with" state
        if (activity.state && activity.state.toLowerCase().startsWith('with ')) {
            activityText = `Playing ${activity.state}`;
        } else {
            activityText = `Playing ${activity.name}`;
            if (activity.details) {
                activityText += ` — ${activity.details}`;
            }
            if (activity.state && !activity.state.toLowerCase().startsWith('with ')) {
                activityText += ` (${activity.state})`;
            }
        }
        items.push(activityText);
    }

    // Most recent page
    if (manifest && manifest.pages && manifest.pages.length > 0) {
        const recentPage = manifest.pages[0];
        const sectionName = recentPage.section.charAt(0).toUpperCase() + recentPage.section.slice(1);
        items.push(`Most recent: ${recentPage.title} [${sectionName}]`);
    }

    const tickerHTML = items.map(item => `<span class="ticker-item">${item}</span>`).join('');
    tickerContent.innerHTML = tickerHTML + tickerHTML;
}
function initializeNotesSystem() {

    const articleNotesEditor = document.getElementById('article-notes-editor');
    if (articleNotesEditor) {

        let saveTimeout;
        articleNotesEditor.addEventListener('input', () => {
            clearTimeout(saveTimeout);
            saveTimeout = setTimeout(() => {
                saveNoteForCurrentArticleWithHistory();
            }, 1000);
        });
        articleNotesEditor.addEventListener('blur', () => {
            clearTimeout(saveTimeout);
            saveNoteForCurrentArticleWithHistory();
        });
    }
}
function openNotebook(event) {
    if (event) event.preventDefault();
    // Use new unified panel for notes
    toggleUnifiedPanel('notes');
}
function showNotebook() {
    currentPage = null;
    currentSection = 'notebook';
    history.pushState({}, '', '#notebook');
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const notes = JSON.parse(localStorage.getItem('articleNotes') || '{}');
    const allArticles = getAllArticles();
    const noteKeys = Object.keys(notes);
    const notesCount = noteKeys.length;
    const totalArticles = allArticles.length;
    const percentage = totalArticles > 0 ? Math.round((notesCount / totalArticles) * 100) : 0;
    let sidebarHtml = `
        <div class="toc-content">
            <h3 class="toc-title">📓 My Notes</h3>
            <div class="notebook-stats-mini">
                <div>${notesCount} notes</div>
                <div>${percentage}% annotated</div>
            </div>
            <nav class="toc-nav">
                <div class="toc-item">
                    <div class="toc-link active" data-note-key="general" onclick="loadNotebookNote('general')">
                        <span style="width: 16px; flex-shrink: 0;"></span>
                        <span> General Notes</span>
                    </div>
                </div>
    `;
    if (notesCount > 0) {
        noteKeys.forEach(key => {
            const [section, slug] = key.split('/');
            const article = allArticles.find(a => a.section === section && a.slug === slug);
            const title = article ? article.title : key;
            sidebarHtml += `
                <div class="toc-item">
                    <div class="toc-link" data-note-key="${key}" onclick="loadNotebookNote('${key}')">
                        <span style="width: 16px; flex-shrink: 0;"></span>
                        <span>${title}</span>
                    </div>
                </div>
            `;
        });
    }
    sidebarHtml += `
            </nav>
        </div>
    `;
    const tocSidebar = document.getElementById('toc-sidebar');
    if (tocSidebar) {
        tocSidebar.innerHTML = sidebarHtml;
        tocSidebar.classList.add('visible');
    }
    const mainContent = document.querySelector('.main-content .content-wrapper');
    const generalNotes = localStorage.getItem('generalNotes') || '';
    let notebookSection = document.getElementById('notebook-content');
    if (!notebookSection) {
        notebookSection = document.createElement('section');
        notebookSection.id = 'notebook-content';
        notebookSection.className = 'content-section';
        mainContent.appendChild(notebookSection);
    }
    let html = `
        <div class="page-content">
            <div class="page-header">
                <h1 class="page-title">📓 My Notebook</h1>
                <div class="notebook-stats">
                    <div class="stat-badge">
                        <span class="stat-number">${notesCount}</span>
                        <span class="stat-label">Article Notes</span>
                    </div>
                    <div class="stat-badge">
                        <span class="stat-number">${percentage}%</span>
                        <span class="stat-label">Articles Annotated</span>
                    </div>
                </div>
            </div>
            <div class="page-body">
                <div id="notebook-editor-container" class="notebook-editor-container">
                    <div class="notebook-note-header">
                        <h2 id="notebook-note-title"> General Notes</h2>
                        <button id="delete-current-note" class="delete-note-btn" style="display: none;" onclick="deleteCurrentNotebookNote()">🗑️ Delete Note</button>
                    </div>
                    <textarea id="notebook-editor" class="notebook-editor" placeholder="Write your notes here...">${generalNotes}</textarea>
                    <div class="notebook-editor-footer">
                        <button id="save-notebook-note" class="save-note-btn">Save Note</button>
                        <span id="notebook-status" class="note-status"></span>
                    </div>
                </div>
            </div>
        </div>
    `;
    notebookSection.innerHTML = html;
    notebookSection.classList.add('active');
    const saveBtn = document.getElementById('save-notebook-note');
    const editor = document.getElementById('notebook-editor');
    if (saveBtn && editor) {
        saveBtn.addEventListener('click', () => {
            saveCurrentNotebookNote();
        });
        editor.addEventListener('blur', () => {
            saveCurrentNotebookNote();
        });
    }
    window.currentNotebookNoteKey = 'general';
    updateNavigation('notebook');
}
function getAllArticles() {
    const articles = [];
    for (const [sectionName, sectionData] of Object.entries(contentData)) {
        if (sectionData && sectionData.pages) {
            sectionData.pages.forEach(page => {
                articles.push({
                    section: sectionName,
                    slug: page.slug,
                    title: page.title
                });
            });
        }
    }
    return articles;
}
function loadNotebookNote(noteKey) {
    window.currentNotebookNoteKey = noteKey;
    const editor = document.getElementById('notebook-editor');
    const titleElement = document.getElementById('notebook-note-title');
    const deleteBtn = document.getElementById('delete-current-note');
    if (!editor || !titleElement) return;
    document.querySelectorAll('#toc-sidebar .toc-link').forEach(link => {
        link.classList.remove('active');
        if (link.dataset.noteKey === noteKey) {
            link.classList.add('active');
        }
    });
    if (noteKey === 'general') {
        const generalNotes = localStorage.getItem('generalNotes') || '';
        editor.value = generalNotes;
        titleElement.textContent = ' General Notes';
        if (deleteBtn) deleteBtn.style.display = 'none';
    } else {
        const notes = JSON.parse(localStorage.getItem('articleNotes') || '{}');
        const note = notes[noteKey] || '';
        editor.value = note;
        const [section, slug] = noteKey.split('/');
        const allArticles = getAllArticles();
        const article = allArticles.find(a => a.section === section && a.slug === slug);
        const title = article ? article.title : noteKey;
        titleElement.innerHTML = `${title} <a href="#${section}/${slug}" class="view-article-link" onclick="showPage('${section}', '${slug}')">View Article →</a>`;
        if (deleteBtn) deleteBtn.style.display = 'inline-block';
    }
    editor.focus();
}
function saveCurrentNotebookNote() {
    const editor = document.getElementById('notebook-editor');
    if (!editor || !window.currentNotebookNoteKey) return;
    const noteKey = window.currentNotebookNoteKey;
    if (noteKey === 'general') {
        localStorage.setItem('generalNotes', editor.value);
    } else {
        const notes = JSON.parse(localStorage.getItem('articleNotes') || '{}');
        if (editor.value.trim()) {
            notes[noteKey] = editor.value;
        } else {
            delete notes[noteKey];
        }
        localStorage.setItem('articleNotes', JSON.stringify(notes));
    }
    showNoteStatus('notebook-status', 'Saved!');
}
function deleteCurrentNotebookNote() {
    if (!window.currentNotebookNoteKey || window.currentNotebookNoteKey === 'general') return;
    if (!confirm('Delete this note?')) return;
    const noteKey = window.currentNotebookNoteKey;
    const notes = JSON.parse(localStorage.getItem('articleNotes') || '{}');
    delete notes[noteKey];
    localStorage.setItem('articleNotes', JSON.stringify(notes));
    showNotification('Note deleted');
    showNotebook();
}
function loadNoteForArticle(sectionName, slug) {
    const noteKey = `${sectionName}/${slug}`;
    currentNoteKey = noteKey;
    const notes = JSON.parse(localStorage.getItem('articleNotes') || '{}');
    const history = JSON.parse(localStorage.getItem('articleNotesHistory') || '{}');
    const editor = document.getElementById('article-notes-editor');
    if (editor) {
        editor.value = notes[noteKey] || '';
    }
    const historyContainer = document.getElementById('article-notes-history');
    if (historyContainer && history[noteKey] && history[noteKey].length > 0) {
        const historyItems = history[noteKey]
            .slice(-5)
            .reverse()
            .map(item => {
                const date = new Date(item.timestamp);
                const timeStr = date.toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                });
                return `<div class="history-item">
                    <span class="history-time">${timeStr}</span>
                    <button class="history-restore-btn" onclick="restoreNoteFromHistory('${noteKey}', ${item.timestamp})">Restore</button>
                </div>`;
            })
            .join('');
        historyContainer.innerHTML = `
            <div class="history-header">Edit History (last 5)</div>
            ${historyItems}
        `;
    } else if (historyContainer) {
        historyContainer.innerHTML = '';
    }
    const articleNotes = document.getElementById('article-notes');
    if (articleNotes) {
        articleNotes.style.display = 'block';
    }
}
function saveNoteForCurrentArticleWithHistory() {
    const editor = document.getElementById('article-notes-editor');
    if (!editor || !currentNoteKey) return;
    const notes = JSON.parse(localStorage.getItem('articleNotes') || '{}');
    const history = JSON.parse(localStorage.getItem('articleNotesHistory') || '{}');
    const newContent = editor.value;
    const oldContent = notes[currentNoteKey] || '';
    if (newContent === oldContent) return;
    if (oldContent.trim()) {
        if (!history[currentNoteKey]) {
            history[currentNoteKey] = [];
        }
        history[currentNoteKey].push({
            content: oldContent,
            timestamp: Date.now()
        });
        if (history[currentNoteKey].length > 20) {
            history[currentNoteKey] = history[currentNoteKey].slice(-20);
        }
        localStorage.setItem('articleNotesHistory', JSON.stringify(history));
    }
    if (newContent.trim()) {
        notes[currentNoteKey] = newContent;
    } else {
        delete notes[currentNoteKey];
    }
    localStorage.setItem('articleNotes', JSON.stringify(notes));
    showNoteStatus('article-note-status', 'Saved');
    if (currentPage) {
        const [section, slug] = currentNoteKey.split('/');
        loadNoteForArticle(section, slug);
    }
}
function restoreNoteFromHistory(noteKey, timestamp) {
    const history = JSON.parse(localStorage.getItem('articleNotesHistory') || '{}');
    if (!history[noteKey]) return;
    const historyItem = history[noteKey].find(item => item.timestamp === timestamp);
    if (!historyItem) return;
    const editor = document.getElementById('article-notes-editor');
    if (editor) {
        editor.value = historyItem.content;
        saveNoteForCurrentArticleWithHistory();
        showNotification('Note restored from history');
    }
}
function saveNoteForCurrentArticle() {
    saveNoteForCurrentArticleWithHistory();
}
function deleteArticleNote(key) {
    const notes = JSON.parse(localStorage.getItem('articleNotes') || '{}');
    delete notes[key];
    localStorage.setItem('articleNotes', JSON.stringify(notes));
    loadAllNotesToNotebook();
    showNotification('Note deleted');
}
function navigateToArticle(section, slug) {
    const modal = document.getElementById('notebook-modal');
    if (modal) {
        modal.classList.remove('visible');
    }
    showPage(section, slug);
}
function showNoteStatus(statusId, message) {
    const status = document.getElementById(statusId);
    if (status) {
        status.textContent = message;
        status.classList.add('visible');
        setTimeout(() => {
            status.classList.remove('visible');
        }, 2000);
    }
}
function showFavorites() {
    // Use new unified panel
    toggleUnifiedPanel('favorites');
}
function toggleFavoritesTray() {
    let tray = document.getElementById('favorites-tray');
    if (tray) {

        tray.classList.remove('open');
        setTimeout(() => tray.remove(), 300);
        return;
    }
    tray = document.createElement('div');
    tray.id = 'favorites-tray';
    tray.className = 'favorites-tray';
    const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
    const grouped = {};
    favorites.forEach(key => {
        const [section, slug] = key.split('/');
        if (!grouped[section]) grouped[section] = [];
        const sectionData = contentData[section];
        if (sectionData) {
            const page = sectionData.pages.find(p => p.slug === slug);
            if (page) {
                grouped[section].push({ section, slug, page });
            }
        }
    });
    let html = `
        <div class="tray-header">
            <h2> Favorites</h2>
            <button class="tray-close" onclick="toggleFavoritesTray()">✕</button>
        </div>
        <div class="tray-content">
    `;
    if (favorites.length === 0) {
        html += `
            <div class="tray-empty">
                <p>No favorites yet!</p>
                <p class="tray-hint">Click  on any article to save it here</p>
            </div>
        `;
    } else {

        for (const [section, items] of Object.entries(grouped)) {
            const sectionName = section.charAt(0).toUpperCase() + section.slice(1);
            html += `
                <div class="tray-category">
                    <button class="tray-category-header" onclick="this.parentElement.classList.toggle('collapsed')">
                        <span class="category-icon">▼</span>
                        <span class="category-name">${sectionName}</span>
                        <span class="category-count">${items.length}</span>
                    </button>
                    <div class="tray-category-items">
            `;
            items.forEach(({ section, slug, page }) => {
                html += `
                    <div class="tray-item" onclick="showPage('${section}', '${slug}'); toggleFavoritesTray();">
                        <div class="tray-item-title">${page.title}</div>
                        <div class="tray-item-date">${formatDate(page.date)}</div>
                    </div>
                `;
            });
            html += `
                    </div>
                </div>
            `;
        }
    }
    html += `
        </div>
    `;
    tray.innerHTML = html;
    document.body.appendChild(tray);
    setTimeout(() => tray.classList.add('open'), 10);
}
window.toggleFavoritesTray = toggleFavoritesTray;
window.deleteArticleNote = deleteArticleNote;
window.navigateToArticle = navigateToArticle;
window.showFavorites = showFavorites;
window.showNotebook = showNotebook;
window.loadNotebookNote = loadNotebookNote;
window.deleteCurrentNotebookNote = deleteCurrentNotebookNote;
window.restoreNoteFromHistory = restoreNoteFromHistory;
window.performSearch = performSearch;
window.getKnowledgeGraph = getKnowledgeGraph;
window.getBacklinksForPage = getBacklinksForPage;
function performSearch() {
    const searchInput = document.getElementById('search-input');
    const query = searchInput?.value.trim().toLowerCase();
    if (!query) {
        showNotification('Please enter a search term');
        return;
    }
    const results = searchArticles(query);
    showSearchResults(query, results);
}
function searchArticles(query) {
    const results = [];
    const queryTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    for (const [sectionName, sectionData] of Object.entries(contentData)) {
        if (!sectionData || !sectionData.pages) continue;
        sectionData.pages.forEach(page => {
            const titleLower = page.title.toLowerCase();
            const contentLower = page.content.toLowerCase();
            const excerptLower = page.excerpt.toLowerCase();
            let score = 0;
            let titleMatch = false;
            let contentMatches = [];
            queryTerms.forEach(term => {

                if (titleLower.includes(term)) {
                    score += 10;
                    titleMatch = true;
                }
                const regex = new RegExp(`(.{0,50})(${escapeRegex(term)})(.{0,50})`, 'gi');
                let match;
                while ((match = regex.exec(contentLower)) !== null && contentMatches.length < 3) {
                    score += 1;
                    contentMatches.push({
                        before: match[1],
                        match: match[2],
                        after: match[3]
                    });
                }
            });
            if (score > 0) {
                results.push({
                    section: sectionName,
                    slug: page.slug,
                    title: page.title,
                    excerpt: page.excerpt,
                    date: page.date,
                    score: score,
                    titleMatch: titleMatch,
                    contentMatches: contentMatches
                });
            }
        });
    }
    results.sort((a, b) => b.score - a.score);
    return results;
}
function escapeRegex(str) {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
function highlightSearchTerms(text, query) {
    const queryTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 0);
    let highlighted = text;
    queryTerms.forEach(term => {
        const regex = new RegExp(`(${escapeRegex(term)})`, 'gi');
        highlighted = highlighted.replace(regex, '<mark class="search-highlight">$1</mark>');
    });
    return highlighted;
}
function showSearchResults(query, results) {
    currentPage = null;
    currentSection = 'search';
    history.pushState({}, '', `#search?q=${encodeURIComponent(query)}`);
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });
    const mainContent = document.querySelector('.main-content .content-wrapper');
    let html = `
        <section class="page-content">
            <div class="page-header">
                <h1 class="page-title">🔍 Search Results</h1>
                <p class="search-query">Searching for: <strong>"${query}"</strong></p>
                <p class="search-count">${results.length} result${results.length !== 1 ? 's' : ''} found</p>
            </div>
            <div class="page-body">
    `;
    if (results.length === 0) {
        html += `
            <div class="empty-state">
                <h3>No results found</h3>
                <p>Try different search terms or browse sections directly.</p>
            </div>
        `;
    } else {
        html += '<div class="search-results">';
        results.forEach(result => {
            const highlightedTitle = highlightSearchTerms(result.title, query);
            const sectionLabel = result.section.charAt(0).toUpperCase() + result.section.slice(1);
            html += `
                <div class="search-result-card" onclick="showPage('${result.section}', '${result.slug}')">
                    <div class="search-result-header">
                        <h3 class="search-result-title">${highlightedTitle}</h3>
                        <span class="search-result-section">${sectionLabel}</span>
                    </div>
                    <p class="search-result-excerpt">${highlightSearchTerms(result.excerpt, query)}</p>
            `;
            if (result.contentMatches.length > 0) {
                html += '<div class="search-result-matches">';
                result.contentMatches.slice(0, 2).forEach(match => {
                    const contextText = `...${match.before}${match.match}${match.after}...`;
                    html += `<div class="search-match">${highlightSearchTerms(contextText, query)}</div>`;
                });
                html += '</div>';
            }
            html += `
                    <div class="search-result-meta">
                        <span class="search-result-date">${formatDate(result.date)}</span>
                        <span class="search-result-score">Relevance: ${result.score}</span>
                    </div>
                </div>
            `;
        });
        html += '</div>';
    }
    html += `
            </div>
        </section>
    `;
    mainContent.innerHTML = html;
    hideTOC();
    resetTOCSidebar();
    updateNavigation('search');
}
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    if (searchInput) {

        searchInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                e.preventDefault();
                performSearch();
            }
        });
    }
    loadTheme();
});
const themes = {
    dracula: {
        '--bg-primary': '#282a36',
        '--bg-secondary': '#44475a',
        '--bg-tertiary': '#1e1e1e',
        '--text-primary': '#f8f8f2',
        '--text-secondary': '#6272a4',
        '--accent-primary': '#bd93f9',
        '--accent-secondary': '#ff79c6',
        '--accent-tertiary': '#8be9fd',
        '--accent-success': '#50fa7b',
        '--accent-warning': '#f1fa8c',
        '--accent-error': '#ff5555',
        '--border-color': '#6272a4',
        '--header-gradient-start': '#44475a',
        '--header-gradient-end': '#6272a4'
    },
    light: {
        '--bg-primary': '#ffffff',
        '--bg-secondary': '#f5f5f5',
        '--bg-tertiary': '#e8e8e8',
        '--text-primary': '#2e3440',
        '--text-secondary': '#4c566a',
        '--accent-primary': '#5e81ac',
        '--accent-secondary': '#b48ead',
        '--accent-tertiary': '#88c0d0',
        '--accent-success': '#a3be8c',
        '--accent-warning': '#ebcb8b',
        '--accent-error': '#bf616a',
        '--border-color': '#d8dee9',
        '--header-gradient-start': '#e5e9f0',
        '--header-gradient-end': '#d8dee9'
    },
    nord: {
        '--bg-primary': '#2e3440',
        '--bg-secondary': '#3b4252',
        '--bg-tertiary': '#2e3440',
        '--text-primary': '#eceff4',
        '--text-secondary': '#d8dee9',
        '--accent-primary': '#88c0d0',
        '--accent-secondary': '#b48ead',
        '--accent-tertiary': '#8fbcbb',
        '--accent-success': '#a3be8c',
        '--accent-warning': '#ebcb8b',
        '--accent-error': '#bf616a',
        '--border-color': '#4c566a',
        '--header-gradient-start': '#3b4252',
        '--header-gradient-end': '#4c566a'
    },
    monokai: {
        '--bg-primary': '#272822',
        '--bg-secondary': '#3e3d32',
        '--bg-tertiary': '#1e1e1b',
        '--text-primary': '#f8f8f2',
        '--text-secondary': '#75715e',
        '--accent-primary': '#ae81ff',
        '--accent-secondary': '#f92672',
        '--accent-tertiary': '#66d9ef',
        '--accent-success': '#a6e22e',
        '--accent-warning': '#e6db74',
        '--accent-error': '#f92672',
        '--border-color': '#75715e',
        '--header-gradient-start': '#3e3d32',
        '--header-gradient-end': '#75715e'
    },
    alice: {
        '--bg-primary': '#fff0f9',
        '--bg-secondary': '#ffe8f5',
        '--bg-tertiary': '#ffd4e5',
        '--text-primary': '#5a2342',
        '--text-secondary': '#8b4570',
        '--accent-primary': '#ff79c6',
        '--accent-secondary': '#d946aa',
        '--accent-tertiary': '#ffb3d9',
        '--accent-success': '#ec4899',
        '--accent-warning': '#f472b6',
        '--accent-error': '#be185d',
        '--border-color': '#ffc9e0',
        '--header-gradient-start': '#ffb3d9',
        '--header-gradient-end': '#ffc9e0'
    }
};
function changeTheme(themeName) {
    const theme = themes[themeName];
    if (!theme) return;
    const root = document.documentElement;
    for (const [property, value] of Object.entries(theme)) {
        root.style.setProperty(property, value);
    }
    localStorage.setItem('selectedTheme', themeName);
    showNotification(`Theme changed to ${themeName.charAt(0).toUpperCase() + themeName.slice(1)}`);
}
function loadTheme() {
    const savedTheme = localStorage.getItem('selectedTheme') || 'dracula';
    const themeSelect = document.getElementById('theme-select');
    if (themeSelect) {
        themeSelect.value = savedTheme;
    }
    changeTheme(savedTheme);
}
function buildKnowledgeGraph() {
    knowledgeGraph.nodes = [];
    knowledgeGraph.links = [];
    knowledgeGraph.backlinks = {};
    const titleToPage = {};
    for (const [sectionName, sectionData] of Object.entries(contentData)) {
        if (!sectionData || !sectionData.pages) continue;
        sectionData.pages.forEach(page => {
            const pageId = `${sectionName}/${page.slug}`;
            knowledgeGraph.nodes.push({
                id: pageId,
                title: page.title,
                section: sectionName,
                slug: page.slug,
                excerpt: page.excerpt,
                wikiLinks: page.wikiLinks || []
            });
            titleToPage[page.title.toLowerCase()] = {
                section: sectionName,
                slug: page.slug,
                id: pageId
            };
            knowledgeGraph.backlinks[pageId] = [];
        });
    }
    knowledgeGraph.nodes.forEach(node => {
        if (!node.wikiLinks || node.wikiLinks.length === 0) return;
        node.wikiLinks.forEach(link => {
            const targetKey = link.target.toLowerCase();
            const targetPage = titleToPage[targetKey];
            if (targetPage) {

                knowledgeGraph.links.push({
                    source: node.id,
                    target: targetPage.id,
                    type: 'wiki-link',
                    linkText: link.target
                });
                if (knowledgeGraph.backlinks[targetPage.id]) {
                    knowledgeGraph.backlinks[targetPage.id].push({
                        sourceId: node.id,
                        sourceTitle: node.title,
                        sourceSection: node.section,
                        sourceSlug: node.slug
                    });
                }
            }
        });
    });
    console.log('Knowledge Graph built:', {
        nodes: knowledgeGraph.nodes.length,
        links: knowledgeGraph.links.length,
        backlinksCount: Object.keys(knowledgeGraph.backlinks).length
    });
}
function renderWikiLinks(content) {

    const titleToPage = {};
    for (const [sectionName, sectionData] of Object.entries(contentData)) {
        if (!sectionData || !sectionData.pages) continue;
        sectionData.pages.forEach(page => {
            // Store the full title in lowercase
            titleToPage[page.title.toLowerCase()] = {
                section: sectionName,
                slug: page.slug
            };

            // Also store partial matches - if title has a colon, store the part before it
            if (page.title.includes(':')) {
                const shortTitle = page.title.split(':')[0].trim().toLowerCase();
                titleToPage[shortTitle] = {
                    section: sectionName,
                    slug: page.slug
                };
            }

            // Also store by slug name for flexibility
            const slugTitle = page.slug.replace(/-/g, ' ').toLowerCase();
            titleToPage[slugTitle] = {
                section: sectionName,
                slug: page.slug
            };
        });
    }
    if (!content) return '';
    return content.replace(/\[\[([^\]]+)\]\]/g, (match, linkText) => {
        const parts = linkText.split('|');
        const targetTitle = parts[0].trim();
        const displayText = parts[1] ? parts[1].trim() : targetTitle;
        const targetPage = titleToPage[targetTitle.toLowerCase()];
        if (targetPage) {
            // Use data attributes instead of inline onclick to avoid quote escaping issues
            return `<a href="#${targetPage.section}/${targetPage.slug}" class="wiki-link" data-section="${targetPage.section}" data-slug="${targetPage.slug}">${displayText}</a>`;
        } else {

            return `<span class="wiki-link-broken" title="Page not found">${displayText}</span>`;
        }
    });
}
function getKnowledgeGraph() {
    return {
        nodes: knowledgeGraph.nodes,
        links: knowledgeGraph.links,
        backlinks: knowledgeGraph.backlinks
    };
}
function getBacklinksForPage(sectionName, slug) {
    const pageId = `${sectionName}/${slug}`;
    return knowledgeGraph.backlinks[pageId] || [];
}
function buildCitationIndex() {
    citationIndex.byType = {};
    citationIndex.byPage = {};
    citationIndex.stats = {};
    for (const [sectionName, sectionData] of Object.entries(contentData)) {
        if (!sectionData || !sectionData.pages) continue;
        sectionData.pages.forEach(page => {
            const pageId = `${sectionName}/${page.slug}`;
            if (!page.sources || page.sources.length === 0) return;
            citationIndex.byPage[pageId] = page.sources;
            page.sources.forEach(source => {
                const type = source.type || 'unknown';
                if (!citationIndex.byType[type]) {
                    citationIndex.byType[type] = {};
                }
                const sourceId = extractSourceId(source.url, type);
                if (!citationIndex.byType[type][sourceId]) {
                    citationIndex.byType[type][sourceId] = {
                        url: source.url,
                        title: source.title,
                        pages: []
                    };
                }
                citationIndex.byType[type][sourceId].pages.push({
                    pageId: pageId,
                    section: sectionName,
                    slug: page.slug,
                    title: page.title
                });
                citationIndex.stats[type] = (citationIndex.stats[type] || 0) + 1;
            });
        });
    }
    console.log('Citation Index built:', {
        types: Object.keys(citationIndex.byType),
        stats: citationIndex.stats,
        totalPages: Object.keys(citationIndex.byPage).length
    });
}
function extractSourceId(url, type) {
    try {
        switch (type) {
            case 'arxiv':
                const arxivMatch = url.match(/arxiv\.org\/abs\/(.+)$/);
                return arxivMatch ? arxivMatch[1] : url;
            case 'pubmed':
                const pubmedMatch = url.match(/pubmed\.ncbi\.nlm\.nih\.gov\/(\d+)/);
                return pubmedMatch ? pubmedMatch[1] : url;
            case 'nlab':
                const nlabMatch = url.match(/ncatlab\.org\/nlab\/show\/(.+)$/);
                return nlabMatch ? decodeURIComponent(nlabMatch[1]) : url;
            case 'doi':
                const doiMatch = url.match(/doi\.org\/(.+)$/);
                return doiMatch ? doiMatch[1] : url;
            default:
                return url;
        }
    } catch (e) {
        return url;
    }
}
function getCitationsForPage(sectionName, slug) {
    const pageId = `${sectionName}/${slug}`;
    return citationIndex.byPage[pageId] || [];
}
function getCitationStats() {
    return citationIndex.stats;
}
function getPagesCitingSource(type, sourceId) {
    if (!citationIndex.byType[type] || !citationIndex.byType[type][sourceId]) {
        return [];
    }
    return citationIndex.byType[type][sourceId].pages;
}
window.getCitationsForPage = getCitationsForPage;
window.getCitationStats = getCitationStats;
window.getPagesCitingSource = getPagesCitingSource;
async function initializeArtGallery() {
    console.log('Art gallery init called');
    console.log('Settings:', window.siteSettings);
    if (!window.siteSettings || !window.siteSettings.ART_GALLERY_CARD_ENABLED) {
        console.log('Art gallery disabled or settings not loaded');
        return;
    }
    console.log('Art gallery enabled, loading images...');
    try {
        const response = await fetch(getBasePath() + 'gallery/images.json');
        const data = await response.json();
        let images = data.art || [];

        // Filter out NSFW images for main page gallery
        images = images.filter(img => !img.isNSFW && !img.nsfw);

        console.log('Art images loaded (excluding NSFW):', images.length);
        if (images.length > 0) {

            const card = document.getElementById('art-gallery-card');
            console.log('Card element:', card);
            if (card) {
                card.style.display = 'block';
                console.log('Card displayed!');
                renderArtGallery(images);
            }
        } else {
            console.log('No art images found');
        }
    } catch (error) {
        console.error('Error loading art gallery:', error);
    }
}
let currentArtIndex = 0;
let artImages = [];
const IMAGES_PER_VIEW = 8;  // Increased to fill the gallery area
function renderArtGallery(images) {
    artImages = images;
    currentArtIndex = 0;
    updateArtCarousel();
}
function updateArtCarousel() {
    const track = document.getElementById('art-carousel');
    const titleEl = document.getElementById('gallery-title');
    const tagsEl = document.getElementById('gallery-tags');
    if (!track || artImages.length === 0) return;
    const numToShow = Math.min(IMAGES_PER_VIEW, artImages.length);
    let imagesHTML = '';
    for (let i = 0; i < numToShow; i++) {
        const index = (currentArtIndex + i) % artImages.length;
        const image = artImages[index];
        const imageUrl = image.filename.startsWith('http')
            ? image.filename
            : `gallery/art/${image.filename}`;
        imagesHTML += `<img src="${imageUrl}" alt="${image.title || 'Artwork'}" title="${image.title || 'Artwork'}" onclick="window.openImageFullsize('${imageUrl}', '${(image.title || 'Artwork').replace(/'/g, "\\'")}')">`;
    }
    track.innerHTML = imagesHTML;
    const currentImage = artImages[currentArtIndex];
    if (titleEl) {
        titleEl.textContent = `${currentArtIndex + 1}/${artImages.length}`;
    }
    if (tagsEl && currentImage.tags) {
        tagsEl.innerHTML = currentImage.tags.map(tag =>
            `<span class="gallery-tag">${tag}</span>`
        ).join('');
    }
}
function nextArtImage() {
    currentArtIndex = (currentArtIndex + 1) % artImages.length;
    updateArtCarousel();
}
function prevArtImage() {
    currentArtIndex = (currentArtIndex - 1 + artImages.length) % artImages.length;
    updateArtCarousel();
}
function openImageFullsize(imageUrl, title) {
    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fullsize-modal';
    modal.innerHTML = `
        <div class="fullsize-modal-content">
            <button class="fullsize-close" onclick="this.closest('.fullsize-modal').remove()">&times;</button>
            <img src="${imageUrl}" alt="${title}">
            <div class="fullsize-title">${title}</div>
        </div>
    `;

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close on ESC key
    const closeOnEsc = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    };
    document.addEventListener('keydown', closeOnEsc);

    document.body.appendChild(modal);
}

window.artGalleryNext = nextArtImage;
window.artGalleryPrev = prevArtImage;
window.openImageFullsize = openImageFullsize;

// TPOT Sites Carousel
let tpotSites = [];
let currentTPOTIndex = 0;

async function initializeTPOTCarousel() {
    console.log('Initializing TPOT carousel...');
    try {
        const response = await fetch(getBasePath() + 'content/sites.json');
        const data = await response.json();

        // Filter for TPOT Spotlight category
        tpotSites = data.sites.filter(site => site.category === 'TPOT Spotlight');

        if (tpotSites.length > 0) {
            updateTPOTCarousel();
            // Update every 5 seconds automatically
            setInterval(() => {
                currentTPOTIndex = (currentTPOTIndex + 1) % tpotSites.length;
                updateTPOTCarousel();
            }, 5000);
        } else {
            document.getElementById('tpot-carousel').innerHTML = '<div class="no-sites">No TPOT sites available</div>';
        }
    } catch (error) {
        console.error('Error loading TPOT sites:', error);
        document.getElementById('tpot-carousel').innerHTML = '<div class="error">Failed to load sites</div>';
    }
}

function updateTPOTCarousel() {
    const carousel = document.getElementById('tpot-carousel');
    const dotsContainer = document.getElementById('tpot-dots');

    if (!carousel || tpotSites.length === 0) return;

    const cardsToShow = 3;
    const sitesHtml = [];

    // Tags to hide (redundant/generic ones)
    const hiddenTags = ['personal', 'developer', 'portfolio', 'blog', 'tools', 'business'];

    // Show 3 cards at a time
    for (let i = 0; i < cardsToShow; i++) {
        const index = (currentTPOTIndex + i) % tpotSites.length;
        const site = tpotSites[index];

        // Filter out hidden tags
        const visibleTags = site.tags.filter(tag => !hiddenTags.includes(tag.toLowerCase()));

        const siteName = site.name || site.title || site.url;
        const siteDesc = site.description || '';

        sitesHtml.push(`
            <div class="tpot-site-card" onclick="window.toggleTPOTCard(this)" data-site-index="${index}">
                <h4 class="tpot-site-name">
                    <a href="https://${site.url}" target="_blank" rel="noopener noreferrer" onclick="event.stopPropagation()">${siteName}</a>
                </h4>
                <p class="tpot-site-description">${siteDesc}</p>
                ${visibleTags.length > 0 ? `
                <div class="tpot-site-tags">
                    ${visibleTags.slice(0, 5).map(tag => `<span class="tpot-tag">${tag}</span>`).join('')}
                </div>
                ` : ''}
            </div>
        `);
    }

    carousel.innerHTML = sitesHtml.join('');

    // Update dots - one dot per page (every 3 sites)
    const totalPages = Math.ceil(tpotSites.length / cardsToShow);
    const currentPage = Math.floor(currentTPOTIndex / cardsToShow);
    dotsContainer.innerHTML = Array.from({length: totalPages}, (_, index) =>
        `<span class="dot ${index === currentPage ? 'active' : ''}" onclick="window.setTPOTPage(${index})"></span>`
    ).join('');
}

function nextTPOTSite() {
    currentTPOTIndex = (currentTPOTIndex + 3) % tpotSites.length;
    updateTPOTCarousel();
}

function prevTPOTSite() {
    currentTPOTIndex = (currentTPOTIndex - 3 + tpotSites.length) % tpotSites.length;
    updateTPOTCarousel();
}

function setTPOTIndex(index) {
    currentTPOTIndex = index;
    updateTPOTCarousel();
}

function setTPOTPage(pageIndex) {
    currentTPOTIndex = pageIndex * 3;
    updateTPOTCarousel();
}

function toggleTPOTCard(cardElement) {
    // Get site data from the index
    const siteIndex = parseInt(cardElement.dataset.siteIndex);
    const site = tpotSites[siteIndex];

    if (!site) return;

    const siteName = site.name || site.title || site.url;
    const hiddenTags = ['personal', 'developer', 'portfolio', 'blog', 'tools', 'business'];
    const visibleTags = site.tags ? site.tags.filter(tag => !hiddenTags.includes(tag.toLowerCase())) : [];

    // Create modal overlay
    const modal = document.createElement('div');
    modal.className = 'fullsize-modal tpot-modal';
    modal.innerHTML = `
        <div class="fullsize-modal-content tpot-modal-content">
            <button class="fullsize-close" onclick="this.closest('.fullsize-modal').remove()">&times;</button>
            <div class="tpot-modal-card">
                <h3 class="tpot-modal-name">
                    <a href="https://${site.url}" target="_blank" rel="noopener noreferrer">${siteName}</a>
                </h3>
                <p class="tpot-modal-description">${site.description || ''}</p>
                ${visibleTags.length > 0 ? `
                <div class="tpot-modal-tags">
                    ${visibleTags.map(tag => `<span class="tpot-tag">${tag}</span>`).join('')}
                </div>
                ` : ''}
                ${site.contact ? `<div class="tpot-modal-contact">Contact: ${site.contact}</div>` : ''}
            </div>
        </div>
    `;

    // Close on background click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });

    // Close on ESC key
    const closeOnEsc = (e) => {
        if (e.key === 'Escape') {
            modal.remove();
            document.removeEventListener('keydown', closeOnEsc);
        }
    };
    document.addEventListener('keydown', closeOnEsc);

    document.body.appendChild(modal);
}

window.tpotCarouselNext = nextTPOTSite;
window.tpotCarouselPrev = prevTPOTSite;
window.setTPOTIndex = setTPOTIndex;
window.setTPOTPage = setTPOTPage;
window.toggleTPOTCard = toggleTPOTCard;

async function initializeTicker() {
    const tickerContainer = document.querySelector('.ticker-container');
    const tickerMotd = document.getElementById('ticker-motd');
    const tickerRecent = document.getElementById('ticker-recent');
    if (!tickerMotd || !tickerRecent || !tickerContainer) {
        console.warn('Ticker elements not found in DOM');
        return;
    }
    try {
        const response = await fetch(getBasePath() + 'config/settings.txt');
        if (response.ok) {
            const settingsText = await response.text();
            const motdMatch = settingsText.match(/MOTD=(.+)/);
            if (motdMatch) {
                tickerMotd.textContent = motdMatch[1].trim();
            } else {
                tickerMotd.textContent = 'Welcome to my knowledge base!';
            }
        } else {
            tickerMotd.textContent = 'Welcome to my knowledge base!';
        }
    } catch (error) {
        console.warn('Could not load config/settings.txt, using default');
        tickerMotd.textContent = 'Welcome to my knowledge base!';
    }
    if (manifest && manifest.pages && manifest.pages.length > 0) {

        const recentPage = manifest.pages[0];
        const sectionName = recentPage.section.charAt(0).toUpperCase() + recentPage.section.slice(1);
        tickerRecent.textContent = `Most recent: ${recentPage.title} [${sectionName}]`;
    } else {
        tickerRecent.textContent = 'Most recent: No articles yet';
    }
    tickerContainer.classList.add('loaded');
    console.log('Ticker initialized and displayed');
}
