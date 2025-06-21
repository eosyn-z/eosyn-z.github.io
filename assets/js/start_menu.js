document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-button');
  const startMenu = document.getElementById('start-menu');

  if (startButton && startMenu) {
    startButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevents the click from bubbling up to the document
      startMenu.classList.toggle('active');
      loadBookmarksToStartMenu(); // Load bookmarks when menu opens
    });

    // Close the menu if clicking outside of it
    document.addEventListener('click', (event) => {
      if (!startMenu.contains(event.target) && !startButton.contains(event.target)) {
        startMenu.classList.remove('active');
      }
    });

    // Add event listeners to app launchers
    startMenu.querySelectorAll('[data-app-id]').forEach(launcher => {
      launcher.addEventListener('click', () => {
        const appId = launcher.dataset.appId;
        const appTitle = launcher.dataset.appTitle;
        
        console.log(`Attempting to launch app: ${appTitle} (ID: ${appId})`);

        if (window.windowManager) {
          if (appId && appTitle) {
            console.log('WindowManager found, creating window...');
            window.windowManager.createWindow(appId, appTitle);
            startMenu.classList.remove('active'); // Close menu after launching
          } else {
            console.error('App ID or Title is missing for this menu item.');
          }
        } else {
          console.error('WindowManager is not available. Cannot create window.');
          alert('Error: Window Manager is not loaded. Cannot open application.');
        }
      });
    });
  }

  // Load bookmarks from cookies and add them to start menu
  function loadBookmarksToStartMenu() {
    const bookmarks = getCookie('bookmarkedSites');
    if (!bookmarks) return;

    try {
      const bookmarkedSites = JSON.parse(bookmarks);
      const utilitiesSubmenu = startMenu.querySelector('.start-menu-item:nth-child(3) .submenu');
      
      if (utilitiesSubmenu && bookmarkedSites.length > 0) {
        // Clear existing bookmark items
        utilitiesSubmenu.querySelectorAll('.bookmark-item').forEach(item => item.remove());
        
        // Add bookmark items
        bookmarkedSites.forEach(site => {
          const bookmarkItem = document.createElement('div');
          bookmarkItem.className = 'submenu-item bookmark-item';
          bookmarkItem.dataset.appId = 'bookmark';
          bookmarkItem.dataset.appTitle = site.title;
          bookmarkItem.dataset.bookmarkUrl = site.url;
          bookmarkItem.innerHTML = `🔖 ${site.title}`;
          
          // Add click handler for bookmark items
          bookmarkItem.addEventListener('click', () => {
            if (window.windowManager) {
              window.windowManager.createWindow('bookmark', site.title);
              startMenu.classList.remove('active');
            }
          });
          
          utilitiesSubmenu.appendChild(bookmarkItem);
        });
      }
    } catch (error) {
      console.error('Error loading bookmarks to start menu:', error);
    }
  }

  // Cookie helper function
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for(let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return decodeURIComponent(c.substring(nameEQ.length, c.length));
    }
    return null;
  }
}); 