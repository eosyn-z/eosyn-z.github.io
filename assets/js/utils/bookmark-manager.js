class BookmarkManager {
    constructor() {
        this.storageKey = 'userBookmarks';
        this.bookmarks = this.load();
    }
    load() {
        try {
            const stored = localStorage.getItem(this.storageKey);
            return stored ? JSON.parse(stored) : [];
        } catch (error) {
            console.error('Failed to load bookmarks:', error);
            return [];
        }
    }
    save() {
        try {
            localStorage.setItem(this.storageKey, JSON.stringify(this.bookmarks));
            return true;
        } catch (error) {
            console.error('Failed to save bookmarks:', error);
            return false;
        }
    }
    add(site) {

        if (this.isBookmarked(site.url)) {
            return false;
        }
        this.bookmarks.push({
            name: site.name || site.title,
            title: site.name || site.title,
            url: site.url,
            description: site.description || '',
            tags: site.tags || [],
            category: site.category || '',
            addedAt: new Date().toISOString()
        });
        return this.save();
    }
    remove(url) {
        const index = this.bookmarks.findIndex(b => b.url === url);
        if (index > -1) {
            this.bookmarks.splice(index, 1);
            return this.save();
        }
        return false;
    }
    isBookmarked(url) {
        return this.bookmarks.some(b => b.url === url);
    }
    getAll() {
        return this.bookmarks;
    }
    search(query) {
        const lowerQuery = query.toLowerCase();
        return this.bookmarks.filter(b => {
            const bookmarkName = b.name || b.title || '';
            return bookmarkName.toLowerCase().includes(lowerQuery) ||
                b.description.toLowerCase().includes(lowerQuery) ||
                b.tags.some(tag => tag.toLowerCase().includes(lowerQuery));
        });
    }
    count() {
        return this.bookmarks.length;
    }
    clear() {
        this.bookmarks = [];
        return this.save();
    }
    export() {
        return JSON.stringify(this.bookmarks, null, 2);
    }
    import(jsonString) {
        try {
            const imported = JSON.parse(jsonString);
            if (Array.isArray(imported)) {
                this.bookmarks = imported;
                return this.save();
            }
            return false;
        } catch (error) {
            console.error('Failed to import bookmarks:', error);
            return false;
        }
    }
}
window.bookmarkManager = new BookmarkManager();