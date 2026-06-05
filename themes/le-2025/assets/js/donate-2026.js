const Donate2026 = {
  init() {
    const page = document.getElementById('donate-2026-page');
    if (!page) return;

    this.initCarousels();
    this.initLightbox();
    this.initStickyCTA();
  },

  initCarousels() {
    document.querySelectorAll('.donate-2026-carousel').forEach(carousel => {
      const images = carousel.querySelectorAll('.donate-2026-carousel-img');
      const prevBtn = carousel.querySelector('.donate-2026-carousel-prev');
      const nextBtn = carousel.querySelector('.donate-2026-carousel-next');
      const counter = carousel.querySelector('.donate-2026-carousel-counter');
      if (images.length <= 1) return;

      let current = 0;

      const show = (index) => {
        images[current].classList.remove('active');
        current = (index + images.length) % images.length;
        images[current].classList.add('active');
        if (counter) counter.textContent = `${current + 1} / ${images.length}`;
      };

      prevBtn.addEventListener('click', () => show(current - 1));
      nextBtn.addEventListener('click', () => show(current + 1));

      images.forEach(img => {
        img.addEventListener('click', () => {
          const fullSrc = img.getAttribute('data-full');
          if (fullSrc) this.openLightbox(fullSrc);
        });
      });
    });
  },

  initLightbox() {
    const lightbox = document.getElementById('donate-2026-lightbox');
    const lightboxImg = document.getElementById('donate-2026-lightbox-img');
    if (!lightbox || !lightboxImg) return;

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightboxImg) return;
      this.closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && lightbox.getAttribute('aria-hidden') === 'false') {
        this.closeLightbox();
      }
    });
  },

  openLightbox(src) {
    const lightbox = document.getElementById('donate-2026-lightbox');
    const lightboxImg = document.getElementById('donate-2026-lightbox-img');
    lightboxImg.src = src;
    lightbox.setAttribute('aria-hidden', 'false');
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  },

  closeLightbox() {
    const lightbox = document.getElementById('donate-2026-lightbox');
    lightbox.setAttribute('aria-hidden', 'true');
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  },

  initStickyCTA() {
    const cta = document.getElementById('donate-2026-sticky-cta');
    const anchor = document.getElementById('donate-2026-form-anchor');
    if (!cta || !anchor) return;

    const update = () => {
      const rect = anchor.getBoundingClientRect();
      const formVisible = rect.top >= -100 && rect.top <= window.innerHeight + 100;
      cta.classList.toggle('visible', !formVisible);
    };

    cta.querySelector('a').addEventListener('click', (e) => {
      e.preventDefault();
      anchor.scrollIntoView({ behavior: 'smooth' });
    });

    document.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    update();
  }
};

document.addEventListener('DOMContentLoaded', () => {
  Donate2026.init();
});
