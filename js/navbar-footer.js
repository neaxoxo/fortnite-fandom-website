document.addEventListener("DOMContentLoaded", () => {

  // -------------------------------------------------------
  // Fungsi untuk memuat komponen HTML (navbar/footer)
  // -------------------------------------------------------
  const loadComponent = (path, placeholderId) => {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return Promise.resolve();

    return fetch(path)
      .then(res => {
        if (!res.ok) throw new Error(`Gagal memuat ${path}: ${res.status}`);
        return res.text();
      })
      .then(html => {
        placeholder.innerHTML = html;

        // Animasi halus saat navbar selesai dimuat
        if (placeholderId === 'navbar-placeholder') {
          const nav = placeholder.querySelector('.nav');
          if (nav) {
            setTimeout(() => nav.classList.add('navbar-loaded'), 10);
          }
        }
      })
      .catch(err => {
        console.error(`Error memuat komponen:`, err);
      });
  };

  // -------------------------------------------------------
  // Jalankan pemuatan komponen
  // -------------------------------------------------------
  loadComponent('/navbar.html', 'navbar-placeholder').then(() => {
    runNavbarInit();
  });

  loadComponent('/footer.html', 'footer-placeholder');
});


// =========================================================
// Fungsi Utama untuk Inisialisasi Navbar
// =========================================================
function runNavbarInit() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  initNavScroll(nav);
  setActiveLink();
  initSearchToggle();
  initDropdown(); // <--- FUNGSI BARU DIPANGGIL DI SINI
}


// =========================================================
// 1. Efek Scroll Navbar (bayangan muncul saat scroll)
// =========================================================
function initNavScroll(nav) {
  if (nav.dataset.scrollInit) return; // Hindari inisialisasi ganda
  nav.dataset.scrollInit = 'true';

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      nav.classList.add('active');
    } else {
      nav.classList.remove('active');
    }
  });
}


// =========================================================
// 2. Tandai Link Aktif Berdasarkan Halaman Saat Ini
// =========================================================
function setActiveLink() {
  const links = document.querySelectorAll('.nav-link, .nav a');
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';

  links.forEach(a => {
    // Lewati link yang hanya "#"
    if (a.getAttribute('href') === '#') return;

    try {
      const url = new URL(a.href, window.location.origin);
      const linkPath = url.pathname.replace(/\/$/, '') || '/index.html';

      const isHome =
        linkPath === '/index.html' &&
        (currentPath === '' || currentPath === '/');

      if (linkPath === currentPath || isHome) {
        a.classList.add('current');
        a.setAttribute('aria-current', 'page');
      } else {
        a.classList.remove('current');
        a.removeAttribute('aria-current');
      }
    } catch (e) {
      // Abaikan error jika href tidak valid
    }
  });
}


// =========================================================
// 3. Tombol Search Expandable
// =========================================================
function initSearchToggle() {
  const search = document.querySelector('.search');
  const btn = document.querySelector('.btn');
  const input = document.querySelector('.input');

  if (!search || !btn || !input) return;

  btn.addEventListener('click', () => {
    search.classList.toggle('active');
    input.focus();
  });
}


// =========================================================
// 4. Dropdown Menu
// =========================================================
function initDropdown() {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown) return;

  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');

  // Klik pada tombol dropdown
  toggle.addEventListener('click', (event) => {
    event.preventDefault(); // Hindari berpindah halaman

    dropdown.classList.toggle('active'); // Warna & rotasi panah
    menu.classList.toggle('show');       // Tampilkan menu
  });

  // Tutup dropdown jika klik di luar area dropdown
  window.addEventListener('click', (event) => {
    if (!dropdown.contains(event.target)) {
      menu.classList.remove('show');
      dropdown.classList.remove('active');
    }
  });
}
