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
        
        // Combine defaults with user actions
        let combined = defaultFavorites.filter(p => !userRemoved.includes(p.url));
        userFavorites.forEach(uf => {
            if (!combined.some(p => p.url === uf.url)) {
                combined.push(uf);
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
        } else {
            if (!this.favorites.some(fav => fav.url === page.url)) {
                this.favorites.push(page);
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
} 