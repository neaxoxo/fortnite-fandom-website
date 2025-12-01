document.addEventListener("DOMContentLoaded", () => {
  initNewsScroll();
});

function initNewsScroll() {
  const scrollWrapper = document.querySelector(".news-scroll-wrapper");
  if (!scrollWrapper) return;

  const grid = scrollWrapper.querySelector("#news-grid");
  const nextBtn = scrollWrapper.querySelector("#scroll-next-btn");
  const prevBtn = scrollWrapper.querySelector("#scroll-prev-btn");

  if (!grid || !nextBtn || !prevBtn) {
    console.error("Elemen scroll berita tidak ditemukan. Periksa ID di HTML.");
    return;
  }

  function updateButtonVisibility() {
    const maxScrollLeft = grid.scrollWidth - grid.clientWidth;

    if (grid.scrollLeft < 10) {
      prevBtn.classList.add("hidden");
    } else {
      prevBtn.classList.remove("hidden");
    }

    if (grid.scrollLeft >= maxScrollLeft - 10) {
      nextBtn.classList.add("hidden");
    } else {
      nextBtn.classList.remove("hidden");
    }
  }

  nextBtn.addEventListener("click", () => {
    grid.scrollBy({ left: grid.clientWidth, behavior: "smooth" });
  });

  prevBtn.addEventListener("click", () => {
    grid.scrollBy({ left: -grid.clientWidth, behavior: "smooth" });
  });

  grid.addEventListener("scroll", updateButtonVisibility);

  updateButtonVisibility();
}
