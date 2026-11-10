import { initTheme } from './modules/theme.js';
import { initDirection } from './modules/direction.js';
import { initDropdowns, initAccordions } from './modules/disclosure.js';
import { initMobileMenu } from './modules/mobile-menu.js';
import { initScrollTop } from './modules/scroll-top.js';
import { initImages } from './modules/images.js';

function init() {
  initTheme();
  initDirection();
  initDropdowns();
  initAccordions();
  initMobileMenu();
  initScrollTop();
  initImages();

  // Unlinked social items (no real profile URL yet) must not jump the page.
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-unlinked]');
    if (a) e.preventDefault();
  });
}

if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
