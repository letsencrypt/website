// Add anchor links to headings in the page content
document.addEventListener('DOMContentLoaded', function() {
  const page = document.querySelector('.prose-content');
  if (page) {
    const selector = 'h1,h2,h3'; // same selector as css for anchors
    page.querySelectorAll(selector).forEach(function(el) {
      if (el.id) {
        const icon = document.createElement('a');
        icon.className = 'autoanchor fas fa-link';
        icon.href = '#' + el.id;
        el.appendChild(icon);
      }
    });
  }
});