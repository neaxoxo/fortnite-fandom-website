document.addEventListener("DOMContentLoaded", () => {
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
        if (placeholderId === 'navbar-placeholder') {
          const nav = placeholder.querySelector('.nav');
          if (nav) setTimeout(() => nav.classList.add('navbar-loaded'), 10);
        }
      });
  };

  loadComponent('/navbar.html', 'navbar-placeholder').then(() => {
    runNavbarInit();
  });

  loadComponent('/footer.html', 'footer-placeholder');
});

function runNavbarInit() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  initNavScroll(nav);
  setActiveLink();
  initSearchToggle();
  initDropdown();
  initMobileMenu(); // <--- FUNGSI BARU
}

function initNavScroll(nav) {
  if (nav.dataset.scrollInit) return;
  nav.dataset.scrollInit = 'true';
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) nav.classList.add('active');
    else nav.classList.remove('active');
  });
}

function setActiveLink() {
  const links = document.querySelectorAll('.nav-link, .nav a');
  const currentPath = window.location.pathname.replace(/\/$/, '') || '/index.html';
  links.forEach(a => {
    if (a.getAttribute('href') === '#') return;
    try {
      const url = new URL(a.href, window.location.origin);
      const linkPath = url.pathname.replace(/\/$/, '') || '/index.html';
      const isHome = linkPath === '/index.html' && (currentPath === '' || currentPath === '/');
      if (linkPath === currentPath || isHome) {
        a.classList.add('current');
      } else {
        a.classList.remove('current');
      }
    } catch (e) {}
  });
}

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

function initDropdown() {
  const dropdown = document.querySelector('.dropdown');
  if (!dropdown) return;
  const toggle = dropdown.querySelector('.dropdown-toggle');
  const menu = dropdown.querySelector('.dropdown-menu');
  toggle.addEventListener('click', (e) => {
    e.preventDefault();
    menu.classList.toggle('show');
  });
  window.addEventListener('click', (e) => {
    if (!dropdown.contains(e.target)) menu.classList.remove('show');
  });
}

// === LOGIKA HAMBURGER MENU (BARU) ===
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('nav-links');
  const icon = menuBtn ? menuBtn.querySelector('i') : null;

  if (!menuBtn || !navLinks) return;

  menuBtn.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    if (navLinks.classList.contains('nav-active')) {
      icon.classList.remove('fa-bars');
      icon.classList.add('fa-times');
    } else {
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('nav-active');
      icon.classList.remove('fa-times');
      icon.classList.add('fa-bars');
    });
  });
}
