class StartMenu {
    constructor() {
        this.startButton = document.querySelector('.start-button');
        this.startMenu = document.getElementById('start-menu');
        this.programsList = document.querySelector('.programs-list');
        this.gamesList = document.querySelector('.games-list');
        this.utilitiesList = document.querySelector('.utilities-list');
        this.socialList = document.querySelector('.social-list');

        this.init();
    }

    init() {
        if (!this.startButton || !this.startMenu) return;

        this.startButton.addEventListener('click', (event) => {
            event.stopPropagation();
            this.startMenu.classList.toggle('active');
        });

        document.addEventListener('click', (event) => {
            if (!this.startMenu.contains(event.target) && !this.startButton.contains(event.target)) {
                this.startMenu.classList.remove('active');
            }
        });
    }

    populateMenu(pages) {
        if (!pages || pages.length === 0) {
            console.error('No pages data provided to populate Start Menu.');
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

        const categorizedPages = new Set();
        const categories = {
            games: ['Games', 'Snake', 'Tetris', 'Pong', 'Minecraft'],
            utilities: ['Sticky Notes', 'Paint', 'Desktop Settings', 'Theme Editor', 'Settings', 'Wallpaper'],
            social: ['Chat', 'Discord', 'Github']
        };

        // First pass: sort into specific categories
        pages.forEach(page => {
            for (const category in categories) {
                const keywords = categories[category];
                if (keywords.some(keyword => page.title.includes(keyword))) {
                    this.addPageToList(page, lists[category]);
                    categorizedPages.add(page.url);
                    return; // Move to next page once categorized
                }
            }
        });

        // Second pass: add all remaining pages to "Programs"
        pages.forEach(page => {
            if (!categorizedPages.has(page.url)) {
                this.addPageToList(page, lists.programs);
            }
        });

        // Add empty message if a list is empty
        Object.values(lists).forEach(list => {
            if (list && list.children.length === 0) {
                const li = document.createElement('li');
                li.className = 'empty-category';
                li.textContent = 'No items';
                list.appendChild(li);
            }
        });
    }

    addPageToList(page, listElement) {
        if (!listElement) return;

        const li = document.createElement('li');
        li.className = 'start-menu-item';

        const pageIcon = document.createElement('span');
        pageIcon.className = 'icon';
        pageIcon.innerHTML = page.icon || '📄';
        
        const pageTitle = document.createElement('span');
        pageTitle.className = 'title';
        pageTitle.textContent = page.title;

        const favoriteToggle = document.createElement('span');
        favoriteToggle.className = 'favorite-toggle';
        favoriteToggle.innerHTML = window.favoritesManager.isFavorite(page.url) ? '★' : '☆'; // Filled/Empty star
        favoriteToggle.title = 'Pin to taskbar';

        li.appendChild(pageIcon);
        li.appendChild(pageTitle);
        li.appendChild(favoriteToggle);

        li.addEventListener('click', (e) => {
            // Don't launch if the favorite star was clicked
            if (e.target === favoriteToggle) return;

            if (window.windowManager) {
                window.windowManager.createWindow(page.url, page.title);
                this.startMenu.classList.remove('active');
            } else {
                console.error('WindowManager not available.');
            }
        });

        favoriteToggle.addEventListener('click', () => {
            window.favoritesManager.toggleFavorite(page);
            // Update the star's appearance immediately
            favoriteToggle.innerHTML = window.favoritesManager.isFavorite(page.url) ? '★' : '☆';
        });

        listElement.appendChild(li);
    }
}

// Initialization is now handled by desktop.js
// document.addEventListener('DOMContentLoaded', () => {
//     window.startMenu = new StartMenu();
// }); 