document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('#playlist-buttons .glass-button');
  const players = document.querySelectorAll('.spotify-player');

  if (buttons.length > 0 && players.length > 0) {
    buttons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Deactivate all buttons and players
        buttons.forEach(btn => btn.classList.remove('primary'));
        players.forEach(player => {
          player.classList.remove('active');
        });

        // Activate clicked button and corresponding player
        button.classList.add('primary');
        if (players[index]) {
            players[index].classList.add('active');
        }
      });
    });

    // Set the first button as active by default
    buttons[0].classList.add('primary');
  }
}); 