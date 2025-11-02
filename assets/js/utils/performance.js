// Performance optimizations for faster loading

// Lazy load images with Intersection Observer
function initLazyLoading() {
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;

                    // Load the image
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                    }

                    // Stop observing this image
                    observer.unobserve(img);
                }
            });
        }, {
            // Start loading when image is 50px from viewport
            rootMargin: '50px'
        });

        // Observe all images with data-src
        document.querySelectorAll('img[data-src]').forEach(img => {
            imageObserver.observe(img);
        });
    } else {
        // Fallback for older browsers
        document.querySelectorAll('img[data-src]').forEach(img => {
            img.src = img.dataset.src;
        });
    }
}

// Prefetch pages when user hovers over links
function initLinkPrefetching() {
    const prefetchedUrls = new Set();

    document.addEventListener('mouseover', (e) => {
        const link = e.target.closest('a');
        if (link && link.href && link.href.includes('.html')) {
            const url = link.href;

            // Only prefetch once
            if (!prefetchedUrls.has(url)) {
                prefetchedUrls.add(url);

                // Create prefetch link
                const prefetch = document.createElement('link');
                prefetch.rel = 'prefetch';
                prefetch.href = url;
                document.head.appendChild(prefetch);
            }
        }
    });
}

// Optimize Discord presence updates
let discordUpdateTimer = null;
function optimizeDiscordUpdates() {
    // Reduce Discord API calls when tab is not visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            // Stop updates when tab is hidden
            if (discordUpdateTimer) {
                clearInterval(discordUpdateTimer);
            }
        } else {
            // Resume updates when tab is visible
            if (typeof loadDiscordPresence === 'function') {
                loadDiscordPresence();
                discordUpdateTimer = setInterval(loadDiscordPresence, 30000);
            }
        }
    });
}

// Debounce search input for better performance
function debounceSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput) return;

    let searchTimer = null;
    const originalHandler = searchInput.oninput;

    searchInput.oninput = (e) => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            if (originalHandler) {
                originalHandler(e);
            }
        }, 300); // Wait 300ms after user stops typing
    };
}

// Load non-critical CSS asynchronously
function loadAsyncCSS(href) {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = href;
    link.as = 'style';
    link.onload = function() {
        this.onload = null;
        this.rel = 'stylesheet';
    };
    document.head.appendChild(link);
}

// Progressive enhancement - load features based on connection speed
function adaptToConnectionSpeed() {
    if ('connection' in navigator && navigator.connection.effectiveType) {
        const connection = navigator.connection.effectiveType;

        switch(connection) {
            case 'slow-2g':
            case '2g':
                // Disable animations and backgrounds for slow connections
                document.body.classList.add('reduced-motion');
                console.log('Slow connection detected - reducing animations');
                break;
            case '3g':
                // Normal experience but skip prefetching
                console.log('3G connection - standard experience');
                break;
            case '4g':
                // Enable all features including prefetching
                initLinkPrefetching();
                console.log('Fast connection - all features enabled');
                break;
        }
    }
}

// Cache manifest data in sessionStorage for faster subsequent loads
function cacheManifest() {
    const originalLoadManifest = window.loadManifest;
    if (originalLoadManifest) {
        window.loadManifest = async function() {
            // Check cache first
            const cached = sessionStorage.getItem('manifest_cache');
            const cacheTime = sessionStorage.getItem('manifest_cache_time');
            const now = Date.now();

            // Use cache if less than 5 minutes old
            if (cached && cacheTime && (now - parseInt(cacheTime)) < 300000) {
                window.manifest = JSON.parse(cached);
                console.log('Using cached manifest');
                return;
            }

            // Load fresh and cache it
            await originalLoadManifest();
            if (window.manifest) {
                sessionStorage.setItem('manifest_cache', JSON.stringify(window.manifest));
                sessionStorage.setItem('manifest_cache_time', now.toString());
            }
        };
    }
}

// Initialize all performance optimizations
function initPerformanceOptimizations() {
    // Run immediately
    initLazyLoading();
    debounceSearch();
    adaptToConnectionSpeed();
    cacheManifest();

    // Run after page loads
    if (document.readyState === 'complete') {
        initLinkPrefetching();
        optimizeDiscordUpdates();
    } else {
        window.addEventListener('load', () => {
            initLinkPrefetching();
            optimizeDiscordUpdates();
        });
    }
}

// Start optimizations
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);
} else {
    initPerformanceOptimizations();
}