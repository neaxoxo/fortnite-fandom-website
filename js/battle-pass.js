// Slider untuk Outfits (karakter & background)
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.querySelector('.outfits-slider-wrapper');
  if (!wrapper) return;

  const charSlider = wrapper.querySelector('#outfits-char-slider');
  const bgContainer = wrapper.querySelector('.outfits-background-container');
  const nextBtn = wrapper.querySelector('#slider-next');
  const prevBtn = wrapper.querySelector('#slider-prev');

  const slides = charSlider.querySelectorAll('.outfit-char-slide');
  const bgImages = bgContainer.querySelectorAll('.outfit-bg-image');
  const total = slides.length;
  let index = 0;

  const goToSlide = (i) => {
    index = Math.max(0, Math.min(i, total - 1));
    charSlider.style.transform = `translateX(-${index * 100}%)`;

    const outfit = slides[index]?.dataset.outfit;
    if (outfit) {
      bgImages.forEach(bg => bg.classList.remove('active'));
      const activeBg = bgContainer.querySelector(`.outfit-bg-image[data-outfit="${outfit}"]`);
      if (activeBg) activeBg.classList.add('active');
    }

    prevBtn.classList.toggle('hidden', index === 0);
    nextBtn.classList.toggle('hidden', index === total - 1);
  };

  nextBtn.addEventListener('click', () => goToSlide(index + 1));
  prevBtn.addEventListener('click', () => goToSlide(index - 1));

  goToSlide(0);
});
