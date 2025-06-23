// assets/js/bookmark_manager.js

class BookmarkManager {
    constructor() {
        this.bookmarks = this.loadBookmarks();
        this.onBookmarkChange = null; // Callback for when bookmarks change
    }

    loadBookmarks() {
        try {
            return JSON.parse(localStorage.getItem('desktopBookmarks') || '[]');
        } catch (e) {
            console.error("Error loading bookmarks:", e);
            return [];
        }
    }

    saveBookmarks() {
        localStorage.setItem('desktopBookmarks', JSON.stringify(this.bookmarks));
        if (this.onBookmarkChange) {
            this.onBookmarkChange();
        }
    }

    isBookmarked(url) {
        return this.bookmarks.some(bookmark => bookmark.url === url);
    }

    toggleBookmark(pageData) {
        if (this.isBookmarked(pageData.url)) {
            this.bookmarks = this.bookmarks.filter(b => b.url !== pageData.url);
        } else {
            // Ensure we have the necessary data before adding
            const bookmarkData = {
                title: pageData.title,
                url: pageData.url,
                permalink: pageData.permalink,
                icon: pageData.icon || '📄'
            };
            this.bookmarks.push(bookmarkData);
        }
        this.saveBookmarks();
    }

    getBookmarks() {
        return this.bookmarks;
    }
}

class IconManager {
    constructor() {
        this.desktopGrid = document.getElementById('desktop-grid');
    }

    renderIcons(bookmarks) {
        if (!this.desktopGrid) return;
        
        // Clear existing icons
        this.desktopGrid.innerHTML = '';

        // Render new icons from bookmarks
        bookmarks.forEach(bookmark => {
            const iconEl = document.createElement('div');
            iconEl.className = 'desktop-icon';
            iconEl.id = `icon-${bookmark.title.replace(/\s+/g, '-').toLowerCase()}`;
            iconEl.dataset.appUrl = bookmark.url || bookmark.permalink;
            iconEl.dataset.appTitle = bookmark.title;

            // Here is where you would check for custom icons/titles from the icon editor
            const iconImage = bookmark.icon;
            const iconTitle = bookmark.title;

            iconEl.innerHTML = `
                <div class="icon-image">${iconImage}</div>
                <div class="icon-label">${iconTitle}</div>
            `;
            this.desktopGrid.appendChild(iconEl);
        });

        // Re-initialize the desktop manager to make new icons draggable
        if (window.desktopManager) {
            window.desktopManager.init();
        }
    }
}

// Instantiate managers on load
document.addEventListener('DOMContentLoaded', () => {
    window.bookmarkManager = new BookmarkManager();
    window.iconManager = new IconManager();

    // Set the callback to re-render icons whenever bookmarks change
    window.bookmarkManager.onBookmarkChange = () => {
        window.iconManager.renderIcons(window.bookmarkManager.getBookmarks());
    };

    // Initial render for when the desktop page loads
    if (document.getElementById('desktop-grid')) {
         window.iconManager.renderIcons(window.bookmarkManager.getBookmarks());
    }
}); 