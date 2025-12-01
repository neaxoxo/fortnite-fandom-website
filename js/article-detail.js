document.addEventListener('DOMContentLoaded', () => {

  /* =========================================================
     1. Dapatkan elemen DOM yang akan diisi
  ========================================================= */
  const articleTitleEl = document.getElementById('article-title');
  const articleDateEl = document.getElementById('article-date');
  const articleCategoryEl = document.getElementById('article-category');
  const articleFeaturedImageEl = document.getElementById('article-featured-image');
  const articleBodyEl = document.getElementById('article-body');

  /* =========================================================
     2. Logika Tombol "Kembali"
  ========================================================= */
  const backLink = document.getElementById('back-link');

  if (backLink) {
    backLink.addEventListener('click', (event) => {
      event.preventDefault(); // Mencegah link '#' berpindah ke atas halaman

      // Jika ada halaman sebelumnya, kembali ke sana
      if (document.referrer && document.referrer !== window.location.href) {
        history.back();
      } else {
        // Jika tidak ada riwayat (misalnya dibuka langsung)
        window.location.href = '/news.html';
      }
    });
  }

  /* =========================================================
     3. Pastikan elemen artikel utama tersedia
  ========================================================= */
  if (
    !articleTitleEl ||
    !articleDateEl ||
    !articleCategoryEl ||
    !articleFeaturedImageEl ||
    !articleBodyEl
  ) {
    console.error("Satu atau lebih elemen detail artikel tidak ditemukan.");

    // Sembunyikan gambar jika error
    if (articleFeaturedImageEl && articleFeaturedImageEl.parentElement) {
      articleFeaturedImageEl.parentElement.style.display = 'none';
    }
    return; // Hentikan eksekusi jika elemen penting tidak ada
  }

  /* =========================================================
     4. Ambil Query Parameter dari URL
  ========================================================= */
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('article'); // Contoh: ?article=fortnitemares-2025

  /* =========================================================
     5. Tampilkan artikel jika datanya ditemukan
  ========================================================= */
  if (articleId && typeof articleData !== 'undefined' && articleData[articleId]) {
    const data = articleData[articleId];

    // Isi elemen DOM dengan data artikel
    document.title = `Fortnite News - ${data.title}`;
    articleTitleEl.textContent = data.title;
    articleDateEl.textContent = data.date;
    articleCategoryEl.textContent = data.category;

    // Tambahkan class kategori jika ada
    if (data.categoryClass) {
      articleCategoryEl.className = `article-category ${data.categoryClass}`;
    }

    // Gambar & konten
    articleFeaturedImageEl.src = data.featuredImage;
    articleFeaturedImageEl.alt = data.title;
    articleBodyEl.innerHTML = data.body;

  } else {
    /* =========================================================
       6. Jika artikel tidak ditemukan
    ========================================================= */
    articleTitleEl.textContent = "Artikel Tidak Ditemukan";
    articleDateEl.textContent = "";
    articleCategoryEl.textContent = "";
    articleBodyEl.innerHTML = `
      <p>
        Maaf, artikel yang Anda cari tidak dapat ditemukan.
        Silakan kembali ke <a href="/news.html">halaman berita</a>.
      </p>
    `;

    // Sembunyikan gambar karena tidak ada artikel
    if (articleFeaturedImageEl.parentElement) {
      articleFeaturedImageEl.parentElement.style.display = 'none';
    }
  }
});
