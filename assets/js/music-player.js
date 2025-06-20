document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('#playlist-buttons .glass-button');
  const players = document.querySelectorAll('.spotify-player');

  if (buttons.length > 0 && players.length > 0) {
    buttons.forEach((button) => {
      button.addEventListener('click', () => {
        const playlistId = button.dataset.playlist;
        const targetPlayer = document.getElementById(`spotify-player-${playlistId}`);

        // Deactivate all buttons and players
        buttons.forEach(btn => btn.classList.remove('primary'));
        players.forEach(player => player.classList.remove('active'));

        // Activate clicked button and corresponding player
        button.classList.add('primary');
        if (targetPlayer) {
          targetPlayer.classList.add('active');
        }
      });
    });

    // Set the first button and player as active by default
    buttons[0].classList.add('primary');
    players[0].classList.add('active');
  }
}); 