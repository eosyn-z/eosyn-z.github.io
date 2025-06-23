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
        const games = window.gamesData || [];

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

        // --- Categorize and Populate ---

        // 1. Populate Games
        games.forEach(game => {
            if (game.id !== 'games') { // Exclude the launcher page itself
                 this.addPageToList(game, lists.games);
            }
        });

        // 2. Define keywords for other categories
        const utilityKeywords = ['settings', 'paint', 'sticky', 'editor', 'calculator'];
        const socialKeywords = ['chat', 'discord', 'github', 'social'];

        // 3. Populate Utilities and Social based on keywords
        pages.forEach(page => {
            const pageTitleLower = page.title.toLowerCase();
            if (utilityKeywords.some(kw => pageTitleLower.includes(kw))) {
                this.addPageToList(page, lists.utilities);
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
                e.stopPropagation(); // Prevent the app from launching
                window.favoritesManager.toggleFavorite(page);
                favoriteToggle.innerHTML = window.favoritesManager.isFavorite(page.url || page.permalink) ? '★' : '☆';
            });
            li.appendChild(favoriteToggle);
        }

        li.addEventListener('click', (e) => {
            if (e.target.classList.contains('favorite-toggle')) return;

            if (window.windowManager) {
                // Use permalink for games, url for pages
                window.windowManager.createWindow(page.permalink || page.url, page.title);
                this.toggleMenu(false);
            } else {
                console.error('WindowManager not available.');
            }
        });

        listElement.appendChild(li);
    }
}

// Initialization is now handled by desktop.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.startMenu = new StartMenu();
// }); 