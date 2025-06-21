document.addEventListener('DOMContentLoaded', () => {
  const startButton = document.getElementById('start-button');
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
  }
}); 