// News Page Filtering Logic
document.addEventListener('DOMContentLoaded', () => {
  const filterButtonsContainer = document.getElementById('filter-buttons');
  const newsList = document.getElementById('news-list');

  if (!filterButtonsContainer || !newsList) return;

  const filterButtons = filterButtonsContainer.querySelectorAll('.filter-btn');
  const articles = newsList.querySelectorAll('.news-article-item');

  // Event delegation untuk tombol filter
  filterButtonsContainer.addEventListener('click', (e) => {
    if (!e.target.matches('.filter-btn')) return;

    const selectedFilter = e.target.dataset.filter;

    filterButtons.forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');

    filterArticles(selectedFilter);
  });

  // Filter artikel berdasarkan kategori
  function filterArticles(filter) {
    articles.forEach(article => {
      const category = article.dataset.category;
      article.classList.toggle('hide', !(filter === 'all' || category === filter));
    });
  }
});
