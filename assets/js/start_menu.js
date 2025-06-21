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
        if (appId && appTitle) {
          windowManager.createWindow(appId, appTitle);
          startMenu.classList.remove('active'); // Close menu after launching
        }
      });
    });
  }
}); 