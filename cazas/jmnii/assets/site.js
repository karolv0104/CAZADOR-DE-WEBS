/* =========================================================
   JMNII Global Holdings — site behaviour (vanilla JS)
   1. Header turns solid on scroll · 2. Mobile menu
   3. Restrained scroll reveals · 4. Hero mouse parallax (home only)
   ========================================================= */
(() => {
  const root = document.documentElement;
  root.classList.add('js');
  requestAnimationFrame(() => root.classList.add('is-ready'));
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* 1 · Header */
  const header = document.querySelector('.site-header');
  const solidify = () => header && header.classList.toggle('is-solid', window.scrollY > 24);
  solidify();
  window.addEventListener('scroll', solidify, { passive: true });

  /* 2 · Mobile menu */
  const toggle = document.querySelector('[data-menu-toggle]');
  const menu = document.querySelector('[data-menu]');
  if (toggle && menu) {
    const set = (open) => {
      menu.classList.toggle('is-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      document.body.style.overflow = open ? 'hidden' : '';
    };
    toggle.addEventListener('click', () => set(!menu.classList.contains('is-open')));
    menu.querySelectorAll('a').forEach(a => a.addEventListener('click', () => set(false)));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') set(false); });
  }

  /* 3 · Reveals */
  const items = document.querySelectorAll('.reveal-up');
  if (reduced || !('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
    items.forEach(el => io.observe(el));
  }

  /* 4 · Hero parallax — transform-only, rAF-driven, sleeps when settled */
  const hero = document.getElementById('hero');
  if (!hero || reduced) return;

  const layers = [...hero.querySelectorAll('[data-speed]')].map(el => ({
    el, speed: parseFloat(el.dataset.speed) || 0, tilt: parseFloat(el.dataset.tilt) || 0
  }));
  const EASE = 0.075;
  const target = { x: 0, y: 0 }, current = { x: 0, y: 0 };
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  let rafId = null, rect = hero.getBoundingClientRect();

  const measure = () => { rect = hero.getBoundingClientRect(); };
  window.addEventListener('resize', measure, { passive: true });
  window.addEventListener('scroll', measure, { passive: true });

  hero.addEventListener('mousemove', (e) => {
    target.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
    target.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
    wake();
  }, { passive: true });
  hero.addEventListener('mouseleave', () => { target.x = 0; target.y = 0; wake(); }, { passive: true });

  function render(t) {
    if (!finePointer) {               // touch: slow ambient drift
      target.x = Math.sin(t / 5200) * 0.35;
      target.y = Math.cos(t / 7100) * 0.22;
    }
    current.x += (target.x - current.x) * EASE;
    current.y += (target.y - current.y) * EASE;

    for (const { el, speed, tilt } of layers) {
      const x = (-current.x * speed).toFixed(2);
      const y = (-current.y * speed * 0.6).toFixed(2);
      el.style.transform = tilt
        ? `translate3d(${x}px, ${y}px, 0) rotateX(${(current.y * tilt).toFixed(3)}deg) rotateY(${(-current.x * tilt).toFixed(3)}deg)`
        : `translate3d(${x}px, ${y}px, 0)`;
    }
    const settled = Math.abs(target.x - current.x) < 0.0005 && Math.abs(target.y - current.y) < 0.0005;
    rafId = (settled && finePointer) ? null : requestAnimationFrame(render);
  }
  function wake() { if (!rafId) rafId = requestAnimationFrame(render); }

  new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) wake();
    else if (rafId) { cancelAnimationFrame(rafId); rafId = null; }
  }).observe(hero);
})();
