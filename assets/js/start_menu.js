class StartMenu {
    constructor() {
        this.startButton = document.querySelector('.start-button');
        this.startMenu = document.getElementById('start-menu');
        this.programsList = document.querySelector('.programs-list');
        this.gamesList = document.querySelector('.games-list');
        this.utilitiesList = document.querySelector('.utilities-list');
        this.socialList = document.querySelector('.social-list');
        this.categoryButtons = document.querySelectorAll('.start-menu-category-button');
        this.listsContainer = document.querySelector('.start-menu-list-container');

        this.init();
    }

    init() {
        if (!this.startButton || !this.startMenu) return;

        this.startButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.toggleMenu();
        });
        
        this.categoryButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                this.switchCategory(e.target.dataset.category);
            });
        });

        document.addEventListener('click', (event) => {
            if (this.startMenu.classList.contains('active') && !this.startMenu.contains(event.target) && !this.startButton.contains(event.target)) {
                this.toggleMenu(false);
            }
        });
    }

    toggleMenu(forceState) {
        if (typeof forceState === 'boolean') {
            this.startMenu.classList.toggle('active', forceState);
        } else {
            this.startMenu.classList.toggle('active');
        }
    }

    switchCategory(category) {
        // Switch active button
        this.categoryButtons.forEach(button => {
            button.classList.toggle('active', button.dataset.category === category);
        });
        // Switch active list
        const listElements = this.listsContainer.querySelectorAll('.start-menu-list');
        listElements.forEach(list => {
            list.classList.toggle('active-list', list.classList.contains(`${category}-list`));
        });
    }

    populate() {
        const pages = window.jekyllPages || [];
        const games = (window.siteGames || window.gamesData || []).filter(g => g.title && g.title !== 'Game Center');

        if (pages.length === 0 && games.length === 0) {
            console.error('No pages or games data found to populate Start Menu.');
            return;
        }

        const lists = {
            programs: this.programsList,
            games: this.gamesList,
            utilities: this.utilitiesList,
            social: this.socialList
        };

        // Clear all lists first
        Object.values(lists).forEach(list => {
            if (list) list.innerHTML = '';
        });

        // --- Add Built-in Utilities only if not present as a page ---
        const pageTitles = pages.map(p => p.title.replace(/^[^\w]+/, '').trim().toLowerCase());
        if (!pageTitles.includes('theme editor')) {
            this.addBuiltInUtility('🎨 Theme Editor', 'theme-editor', lists.utilities);
        }
        if (!pageTitles.includes('sticky notes')) {
            this.addBuiltInUtility('📝 Sticky Notes', 'sticky-notes', lists.utilities);
        }
        if (!pageTitles.includes('retro terminal')) {
            this.addBuiltInUtility('🖥️ Retro Terminal', 'retro-terminal', lists.utilities);
        }
        if (!pageTitles.includes('desktop settings')) {
            this.addBuiltInUtility('🖥️ Desktop Settings', 'desktop-settings', lists.utilities);
        }

        // --- Categorize and Populate ---

        // 1. Populate Games
        games.forEach(game => {
            this.addPageToList(game, lists.games);
        });

        // 2. Define keywords for other categories
        const utilityKeywords = ['settings', 'paint', 'sticky', 'editor', 'calculator'];
        const socialKeywords = ['chat', 'discord', 'github', 'social'];

        // 3. Populate Utilities and Social based on keywords
        pages.forEach(page => {
            const pageTitleLower = page.title.replace(/^[^\w]+/, '').trim().toLowerCase();
            if (utilityKeywords.some(kw => pageTitleLower.includes(kw))) {
                // Avoid duplicate utilities
                if (!['theme editor', 'sticky notes', 'retro terminal'].includes(pageTitleLower)) {
                    this.addPageToList(page, lists.utilities);
                }
            } else if (socialKeywords.some(kw => pageTitleLower.includes(kw))) {
                this.addPageToList(page, lists.social);
            } else {
                // If it's not a game or other category, add to programs
                const isGame = games.some(g => g.permalink === page.permalink);
                const isUtility = utilityKeywords.some(kw => pageTitleLower.includes(kw));
                const isSocial = socialKeywords.some(kw => pageTitleLower.includes(kw));
                if (!isGame && !isUtility && !isSocial) {
                    this.addPageToList(page, lists.programs);
                }
            }
        });

        // --- Final Touches ---
        Object.values(lists).forEach(list => {
            if (list && list.children.length === 0) {
                const li = document.createElement('li');
                li.className = 'empty-category';
                li.textContent = 'No items in this category.';
                list.appendChild(li);
            }
        });
        
        // Activate the default category
        this.switchCategory('programs');
    }

    addPageToList(page, listElement) {
        if (!listElement || !page.title) return;

        // Only create one button per page, with icon and text
        const li = document.createElement('li');
        li.className = 'start-menu-item';

        const pageIcon = document.createElement('span');
        pageIcon.className = 'icon';
        pageIcon.innerHTML = page.icon || '📄';
        const pageTitle = document.createElement('span');
        pageTitle.className = 'title';
        pageTitle.textContent = page.title;

        li.appendChild(pageIcon);
        li.appendChild(pageTitle);

        if (window.favoritesManager) {
            const favoriteToggle = document.createElement('span');
            favoriteToggle.className = 'favorite-toggle';
            favoriteToggle.innerHTML = window.favoritesManager.isFavorite(page.url || page.permalink) ? '★' : '☆';
            favoriteToggle.title = 'Pin to taskbar';
            favoriteToggle.addEventListener('click', (e) => {
                e.stopPropagation();
                window.favoritesManager.toggleFavorite(page);
                favoriteToggle.innerHTML = window.favoritesManager.isFavorite(page.url || page.permalink) ? '★' : '☆';
            });
            li.appendChild(favoriteToggle);
        }

        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-toggle')) return;
            if (window.windowManager) {
                window.windowManager.createWindow(page.permalink || page.url, page.title);
                this.toggleMenu(false);
            } else {
                console.error('WindowManager not available.');
            }
        });

        listElement.appendChild(li);
    }

    addBuiltInUtility(title, type, listElement) {
        if (!listElement) return;

        const li = document.createElement('li');
        li.className = 'start-menu-item';

        const pageIcon = document.createElement('span');
        pageIcon.className = 'icon';
        pageIcon.innerHTML = title.split(' ')[0]; // Get the emoji
        
        const pageTitle = document.createElement('span');
        pageTitle.className = 'title';
        pageTitle.textContent = title;

        li.appendChild(pageIcon);
        li.appendChild(pageTitle);

        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-toggle')) return;

            if (type === 'theme-editor') {
                // Open theme editor as a window
                if (window.windowManager)
                    window.windowManager.createWindow('theme-editor', '🎨 Theme Editor', `
                        <div style="padding: 1rem; height: 100%; overflow-y: auto; color: var(--theme-text);">
                            <h2 style="margin-top: 0;">🎨 Theme Editor</h2>
                            <p>Customize your theme colors and settings.</p>
                            <div style="margin: 2rem 0;">
                                <button class="glass-button" onclick="window.customThemeEditor.createThemeEditorWindow()" style="margin-right: 1rem;">
                                    Open Theme Editor
                                </button>
                                <button class="glass-button" onclick="window.customThemeEditor.closeThemeEditorTray()">
                                    Close Theme Editor
                                </button>
                            </div>
                            <div style="background: var(--glass-bg-light); padding: 1rem; border-radius: 8px; margin-top: 1rem;">
                                <h3>Quick Theme Buttons</h3>
                                <p>Use the theme buttons in the header to quickly switch between themes:</p>
                                <ul>
                                    <li><strong>C</strong> - Cosmic</li>
                                    <li><strong>A</strong> - Aurora</li>
                                    <li><strong>R</strong> - Rainbow</li>
                                    <li><strong>Z</strong> - Zenith</li>
                                    <li><strong>E</strong> - Eclipse</li>
                                    <li><strong>N</strong> - Nebula</li>
                                    <li><strong>🎨</strong> - Custom Theme Editor</li>
                                </ul>
                            </div>
                        </div>
                    `);
            }
            // Open sticky notes as a window
            if (window.windowManager && type === 'sticky-notes') {
                window.windowManager.createWindow('sticky-notes', '📝 Sticky Notes', window.windowManager.createStickyNotesContent());
                // Initialize sticky notes in the window
                setTimeout(() => {
                    if (window.windowManager && typeof window.windowManager.initializeStickyNotes === 'function') {
                        window.windowManager.initializeStickyNotes();
                    }
                }, 100);
            } else if (type === 'retro-terminal') {
                // Open retro terminal
                if (window.retroTerminal) {
                    window.retroTerminal.open();
                } else {
                    console.error('Retro Terminal not available');
                }
            } else if (type === 'desktop-settings') {
                if (window.openSettingsWindow) {
                    window.openSettingsWindow();
                }
            }
            
            this.toggleMenu(false);
        });

        listElement.appendChild(li);
    }

    populateGamesList() {
        const gamesList = document.querySelector('.games-list');
        if (!gamesList) return;
        gamesList.innerHTML = '';

        // Collect all games from site.games collection (Jekyll will expose this as window.siteGames if needed)
        let games = window.siteGames ? window.siteGames.filter(p => p.title && p.title !== 'Game Center') : [];

        // Check if Paint is already in the games list
        const paintPage = window.sitePages ? window.sitePages.find(p => p.permalink === '/paint/' || p.url === '/paint/') : null;
        const paintInGames = games.some(g => (g.permalink === '/paint/' || g.url === '/paint/'));
        if (paintPage && !paintInGames) {
            games.push({
                title: paintPage.title || 'Paint',
                icon: paintPage.icon || '🎨',
                permalink: paintPage.permalink || '/paint/',
                description: paintPage.description || 'Draw and doodle freely!'
            });
        }

        games.forEach(game => {
            this.addPageToList(game, gamesList);
        });
    }
}

// Initialization is now handled by desktop.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.startMenu = new StartMenu();
// }); 