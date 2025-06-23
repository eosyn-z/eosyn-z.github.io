class FavoritesManager {
    constructor() {
        this.favoritesBar = document.getElementById('favorites-bar');
        this.favorites = [];
        this.sortable = null;
    }

    init() {
        this.loadFavorites();
        this.renderFavorites();
        this.initSortable();
    }

    loadFavorites() {
        const defaultFavorites = (window.jekyllPages || []).filter(p => p.favorite === true);
        const userFavorites = this.getStoredFavorites();
        const userRemoved = this.getStoredRemoved();
        
        // Load bookmarks from search page
        const searchBookmarks = this.loadSearchBookmarks();
        
        // Load game bookmarks
        const gameBookmarks = this.loadGameBookmarks();
        
        // Combine defaults with user actions
        let combined = defaultFavorites.filter(p => !userRemoved.includes(p.url));
        userFavorites.forEach(uf => {
            if (!combined.some(p => p.url === uf.url)) {
                combined.push(uf);
            }
        });
        
        // Add search bookmarks
        searchBookmarks.forEach(bookmark => {
            if (!combined.some(p => p.url === bookmark.url)) {
                combined.push(bookmark);
            }
        });
        
        // Add game bookmarks
        gameBookmarks.forEach(game => {
            if (!combined.some(p => p.url === game.url)) {
                combined.push(game);
            }
        });
        
        // Get the saved order
        const savedOrder = this.getStoredOrder();
        if (savedOrder && savedOrder.length > 0) {
            this.favorites = savedOrder
                .map(url => combined.find(p => p.url === url))
                .filter(p => p); // Filter out any pages that no longer exist
        } else {
            this.favorites = combined;
        }
    }

    getStoredFavorites() {
        return JSON.parse(localStorage.getItem('userAddedFavorites') || '[]');
    }

    getStoredRemoved() {
        return JSON.parse(localStorage.getItem('userRemovedFavorites') || '[]');
    }
    
    getStoredOrder() {
        return JSON.parse(localStorage.getItem('favoritesOrder') || '[]');
    }

    saveFavoritesState() {
        // We only need to save the user's *changes* to the defaults
        const defaultFavoriteUrls = (window.jekyllPages || []).filter(p => p.favorite).map(p => p.url);
        
        const userAdded = this.favorites.filter(p => !defaultFavoriteUrls.includes(p.url));
        const userRemoved = defaultFavoriteUrls.filter(url => !this.favorites.some(p => p.url === url));
        
        localStorage.setItem('userAddedFavorites', JSON.stringify(userAdded));
        localStorage.setItem('userRemovedFavorites', JSON.stringify(userRemoved));

        // Save the current visual order
        const currentOrder = this.favorites.map(p => p.url);
        localStorage.setItem('favoritesOrder', JSON.stringify(currentOrder));
    }

    isFavorite(pageUrl) {
        return this.favorites.some(fav => fav.url === pageUrl);
    }

    toggleFavorite(page) {
        if (this.isFavorite(page.url)) {
            this.favorites = this.favorites.filter(fav => fav.url !== page.url);
            // Remove from game bookmarks if it's a game
            if (page.type === 'game' || page.permalink?.includes('/games/')) {
                this.removeGameBookmark(page);
            }
        } else {
            if (!this.favorites.some(fav => fav.url === page.url)) {
                this.favorites.push(page);
                // Add to game bookmarks if it's a game
                if (page.type === 'game' || page.permalink?.includes('/games/')) {
                    this.addGameBookmark(page);
                }
            }
        }
        this.saveFavoritesState();
        this.renderFavorites();
    }
    
    renderFavorites() {
        if (!this.favoritesBar) return;
        this.favoritesBar.innerHTML = '';

        this.favorites.forEach(page => {
            const favoriteIcon = document.createElement('div');
            favoriteIcon.className = 'taskbar-program-icon glass-button';
            favoriteIcon.dataset.url = page.url; // Add data attribute for sorting
            favoriteIcon.innerHTML = `<span>${page.icon || '📄'}</span>`;
            favoriteIcon.title = page.title;

            favoriteIcon.addEventListener('click', () => {
                if (window.windowManager) {
                    window.windowManager.createWindow(page.url, page.title);
                }
            });

            this.favoritesBar.appendChild(favoriteIcon);
        });
    }

    initSortable() {
        if (this.favoritesBar && typeof Sortable !== 'undefined') {
            this.sortable = new Sortable(this.favoritesBar, {
                animation: 150,
                ghostClass: 'sortable-ghost',
                onEnd: () => {
                    // When dragging ends, update the order of the internal array
                    const newOrderUrls = Array.from(this.favoritesBar.children).map(el => el.dataset.url);
                    this.favorites.sort((a, b) => newOrderUrls.indexOf(a.url) - newOrderUrls.indexOf(b.url));
                    this.saveFavoritesState(); // Save the new order
                }
            });
        }
    }

    loadSearchBookmarks() {
        try {
            const bookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
            return bookmarks.map(bookmark => ({
                title: bookmark.title,
                url: bookmark.url,
                icon: '🔖',
                type: 'bookmark'
            }));
        } catch (e) {
            console.error("Error loading search bookmarks:", e);
            return [];
        }
    }

    loadGameBookmarks() {
        try {
            const gameBookmarks = JSON.parse(localStorage.getItem('gameBookmarks') || '[]');
            return gameBookmarks.map(game => ({
                title: game.title,
                url: game.url || game.permalink,
                icon: game.icon || '🎮',
                type: 'game'
            }));
        } catch (e) {
            console.error("Error loading game bookmarks:", e);
            return [];
        }
    }

    addGameBookmark(game) {
        try {
            const gameBookmarks = JSON.parse(localStorage.getItem('gameBookmarks') || '[]');
            if (!gameBookmarks.some(g => g.url === game.url)) {
                gameBookmarks.push({
                    title: game.title,
                    url: game.url || game.permalink,
                    icon: game.icon || '🎮',
                    type: 'game'
                });
                localStorage.setItem('gameBookmarks', JSON.stringify(gameBookmarks));
            }
        } catch (e) {
            console.error("Error adding game bookmark:", e);
        }
    }

    removeGameBookmark(game) {
        try {
            const gameBookmarks = JSON.parse(localStorage.getItem('gameBookmarks') || '[]');
            const filtered = gameBookmarks.filter(g => g.url !== game.url);
            localStorage.setItem('gameBookmarks', JSON.stringify(filtered));
        } catch (e) {
            console.error("Error removing game bookmark:", e);
        }
    }
} 