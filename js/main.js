/* ============================================================
   EL MAGO DE OZ — Main JavaScript
   La Corte Teatral, Querétaro
   ============================================================ */

/* ── Theme (Dark / Light Mode) ──────────────────────────────── */
(function initTheme() {
  // Default siempre es 'light'. Solo cambia si el usuario lo eligió manualmente.
  const saved = localStorage.getItem('theme');
  const theme = saved || 'light';
  document.documentElement.setAttribute('data-theme', theme);
})();

function toggleTheme() {
  const html    = document.documentElement;
  const current = html.getAttribute('data-theme');
  const next    = current === 'dark' ? 'light' : 'dark';
  html.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
}

/* ── Countdown Timer ─────────────────────────────────────────── */
// Próximas funciones (en 2026)
const SHOW_DATES = [
  new Date('2026-04-05T14:30:00'), // 5 abril 2:30 PM
  new Date('2026-04-05T16:30:00'), // 5 abril 4:30 PM
  new Date('2026-04-12T14:30:00'), // 12 abril 2:30 PM
  new Date('2026-04-19T16:30:00'), // 19 abril 4:30 PM
];

function getNextShow() {
  const now = new Date();
  for (const date of SHOW_DATES) {
    if (date > now) return date;
  }
  return null; // Todas las funciones pasaron
}

function updateCountdown() {
  const target = getNextShow();
  const units  = ['days', 'hours', 'mins', 'secs'];

  if (!target) {
    // Todas las funciones pasaron
    units.forEach(u => {
      document.querySelectorAll(`.cd-${u}`).forEach(el => el.textContent = '00');
    });
    return;
  }

  const now   = new Date();
  const diff  = target - now;

  const days  = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const mins  = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const secs  = Math.floor((diff % (1000 * 60)) / 1000);

  const pad = n => String(n).padStart(2, '0');

  document.querySelectorAll('.cd-days').forEach(el  => el.textContent = pad(days));
  document.querySelectorAll('.cd-hours').forEach(el => el.textContent = pad(hours));
  document.querySelectorAll('.cd-mins').forEach(el  => el.textContent = pad(mins));
  document.querySelectorAll('.cd-secs').forEach(el  => el.textContent = pad(secs));
}

/* ── Hamburger / Mobile Menu ─────────────────────────────────── */
function initMobileMenu() {
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');
  if (!hamburger || !mobileMenu) return;

  hamburger.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close on link click
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });
}

/* ── Sparkles ────────────────────────────────────────────────── */
function createSparkles(container, count = 18) {
  const glyphs = ['✦', '✧', '★', '✨', '⋆', '·'];
  for (let i = 0; i < count; i++) {
    const s     = document.createElement('span');
    s.className = 'sparkle';
    s.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
    s.style.setProperty('--dur',   `${3 + Math.random() * 4}s`);
    s.style.setProperty('--delay', `${Math.random() * 5}s`);
    s.style.left = `${Math.random() * 100}%`;
    s.style.top  = `${Math.random() * 100}%`;
    container.appendChild(s);
  }
}

/* ── AOS Init ────────────────────────────────────────────────── */
function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 700,
      offset:   120,
      once:     true,
      easing:   'ease-out-quad',
    });
  }
}

/* ── Swiper Init ─────────────────────────────────────────────── */
function initSwiper() {
  if (typeof Swiper === 'undefined') return;
  new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween:  16,
    loop:          true,
    autoplay: {
      delay:               3500,
      disableOnInteraction: false,
    },
    pagination: {
      el:        '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    effect: 'coverflow',
    coverflowEffect: {
      rotate:      5,
      stretch:     0,
      depth:       100,
      modifier:    2,
      slideShadows: true,
    },
    breakpoints: {
      768:  { slidesPerView: 2, spaceBetween: 24 },
      1024: { slidesPerView: 3, spaceBetween: 32 },
    },
  });
}

/* ── Smooth scroll for anchor links ─────────────────────────── */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', e => {
      const id  = link.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* ── Deep links para redes sociales en móvil ────────────────── */
function initSocialDeepLinks() {
  const isAndroid = /android/i.test(navigator.userAgent);
  const isIOS     = /iphone|ipad|ipod/i.test(navigator.userAgent);
  if (!isAndroid && !isIOS) return; // desktop: el href normal funciona bien

  document.querySelectorAll('.social-icon-link[data-app-ios]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      const appUrl     = isIOS ? link.dataset.appIos : link.dataset.appAndroid;
      const webUrl     = link.href;
      const fallbackMs = 1500; // si la app no abre en 1.5s, abre el navegador

      // Intenta abrir la app
      window.location = appUrl;

      // Fallback: si no se fue a la app, abre la web
      const timer = setTimeout(() => {
        window.open(webUrl, '_blank', 'noopener,noreferrer');
      }, fallbackMs);

      // Si el usuario sale de la página (app abrió), cancela el fallback
      window.addEventListener('blur', () => clearTimeout(timer), { once: true });
    });
  });
}

/* ── Navbar compact on scroll ────────────────────────────────── */
function initNavScroll() {
  const nav = document.getElementById('navbar');
  if (!nav) return;
  window.addEventListener('scroll', () => {
    nav.style.boxShadow = window.scrollY > 20
      ? '0 2px 20px rgba(0,0,0,0.15)'
      : '';
  }, { passive: true });
}

/* ── DOMContentLoaded ────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  // Theme toggle button
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.addEventListener('click', toggleTheme);

  // Botón hero: verde → rojo al hacer click (toggle)
  const heroCta = document.getElementById('btn-hero-cta');
  if (heroCta) {
    heroCta.addEventListener('click', () => {
      heroCta.classList.toggle('clicked');
    });
  }

  // Sparkle containers
  document.querySelectorAll('.sparkles').forEach(c => createSparkles(c, 18));

  // Countdown
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // UI components
  initMobileMenu();
  initSmoothScroll();
  initNavScroll();
  initSocialDeepLinks();

  // Libs (may load async)
  initAOS();
  initSwiper();
});

// Fallback in case libs load after DOMContentLoaded
window.addEventListener('load', () => {
  initAOS();
  initSwiper();
});
