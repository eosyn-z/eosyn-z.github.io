document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.querySelector('.start-button');
  const startMenu = document.getElementById('start-menu');

  if (startButton && startMenu) {
    startButton.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevents the click from bubbling up to the document
      startMenu.classList.toggle('active');
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
}); 