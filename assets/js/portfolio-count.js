// This script updates the art piece counts on the portfolio page using a JSON file with counts for each category

document.addEventListener('DOMContentLoaded', function () {
  fetch('/assets/js/portfolio-count.json')
    .then(response => response.json())
    .then(counts => {
      document.querySelectorAll('.art-count[data-art-category]').forEach(span => {
        const category = span.getAttribute('data-art-category');
        const count = counts[category];
        if (typeof count === 'number') {
          span.textContent = `${count} piece${count === 1 ? '' : 's'}`;
        } else {
          span.textContent = '0 pieces';
        }
      });
    })
    .catch(() => {
      document.querySelectorAll('.art-count[data-art-category]').forEach(span => {
        span.textContent = 'N/A';
      });
    });
}); 