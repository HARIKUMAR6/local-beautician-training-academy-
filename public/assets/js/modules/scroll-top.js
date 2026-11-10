const THRESHOLD = 600;

export function initScrollTop() {
  const btn = document.querySelector('[data-scroll-top]');
  if (!btn) return;

  let ticking = false;
  const update = () => {
    btn.classList.toggle('is-visible', window.scrollY > THRESHOLD);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }, { passive: true });
  update();

  btn.addEventListener('click', () => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
    // Move focus to the top of the document so keyboard users are not left at the old position.
    document.getElementById('main')?.focus({ preventScroll: true });
  });
}
