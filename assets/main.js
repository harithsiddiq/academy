// Mobile menu toggle
const mobileToggle = document.getElementById('mobileMenuToggle');
const mobileMenu = document.getElementById('mobileMenu');
if (mobileToggle && mobileMenu) {
  mobileToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
  });
}

// Sticky header shadow on scroll
const header = document.querySelector('header');
if (header) {
  const onScroll = () => {
    if (window.scrollY > 8) {
      header.classList.add('shadow');
    } else {
      header.classList.remove('shadow');
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
}

// FAQ accordion
document.querySelectorAll('.faq-item').forEach((item) => {
  const btn = item.querySelector('[data-accordion="toggle"]');
  const ans = item.querySelector('.faq-answer');
  if (!btn || !ans) return;
  btn.addEventListener('click', () => {
    ans.classList.toggle('hidden');
    btn.classList.toggle('text-brand-600');
    const icon = btn.querySelector('svg path');
    if (icon) {
      // rotate chevron by toggling class
      const svg = btn.querySelector('svg');
      svg.classList.toggle('rotate-180');
    }
  });
});

// Testimonials slider (Swiper)
(() => {
  const container = document.getElementById('testimonialsSwiper');
  if (!container) return;
  if (typeof Swiper === 'undefined') return;
  const swiper = new Swiper('#testimonialsSwiper', {
    slidesPerView: 1,
    spaceBetween: 16,
    loop: true,
    autoplay: { delay: 6000, disableOnInteraction: false },
    navigation: {
      prevEl: '#testPrev',
      nextEl: '#testNext',
    },
    pagination: {
      el: '#testPagination',
      clickable: true,
    },
    breakpoints: {
      640: { slidesPerView: 2 },
      1024: { slidesPerView: 3 },
    },
  });
})();

// Scroll-reveal animations for sections
(() => {
  const targets = document.querySelectorAll('section > .max-w-7xl');
  if (!targets.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const el = entry.target;
      if (entry.isIntersecting) {
        el.classList.remove('opacity-0', 'translate-y-6');
        el.classList.add('animate-fade-in-up');
        observer.unobserve(el);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach((el) => {
    el.classList.add('opacity-0', 'translate-y-6', 'will-change-transform');
    observer.observe(el);
  });
})();

// Dynamic year in footer
const yearEl = document.getElementById('year');
if (yearEl) {
  yearEl.textContent = new Date().getFullYear();
}

// RTL / LTR direction support with persistent toggle
(() => {
  const saved = localStorage.getItem('dir');
  const urlDir = new URLSearchParams(window.location.search).get('dir');
  const initial = (urlDir === 'rtl' || urlDir === 'ltr') ? urlDir : (saved || 'ltr');
  document.documentElement.setAttribute('dir', initial);
  localStorage.setItem('dir', initial);

  const container = document.querySelector('header .flex.items-center.gap-3');
  if (container) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.id = 'dirToggle';
    btn.className = 'hidden sm:inline-flex items-center px-3 py-2 rounded-lg border border-slate-300 hover:bg-slate-50 text-sm';
    const updateLabel = () => {
      const current = document.documentElement.getAttribute('dir');
      btn.textContent = current === 'rtl' ? 'LTR' : 'RTL';
    };
    btn.addEventListener('click', () => {
      const next = document.documentElement.getAttribute('dir') === 'rtl' ? 'ltr' : 'rtl';
      document.documentElement.setAttribute('dir', next);
      localStorage.setItem('dir', next);
      updateLabel();
    });
    updateLabel();
    container.appendChild(btn);
  }
})();