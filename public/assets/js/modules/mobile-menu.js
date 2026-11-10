// Full-screen menu sheet for < 1280px: focus-trapped, Esc closes, body scroll locked.

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function initMobileMenu() {
  const menu = document.querySelector('[data-mobile-menu]');
  const opener = document.querySelector('[data-menu-toggle]');
  if (!menu || !opener) return;

  const html = document.documentElement;
  const wide = window.matchMedia('(min-width: 80rem)');
  const focusables = () => [...menu.querySelectorAll(FOCUSABLE)].filter((el) => !el.closest('[hidden]') && el.offsetParent !== null);

  function open() {
    menu.hidden = false;
    html.classList.add('menu-open');
    opener.setAttribute('aria-expanded', 'true');
    opener.setAttribute('aria-label', 'Close menu');
    menu.querySelector('[data-menu-close]')?.focus();
  }
  function close(restoreFocus = true) {
    if (menu.hidden) return;
    menu.hidden = true;
    html.classList.remove('menu-open');
    opener.setAttribute('aria-expanded', 'false');
    opener.setAttribute('aria-label', 'Open menu');
    if (restoreFocus) opener.focus();
  }

  opener.addEventListener('click', () => (menu.hidden ? open() : close()));
  menu.querySelectorAll('[data-menu-close]').forEach((b) => b.addEventListener('click', () => close()));

  menu.addEventListener('click', (e) => {
    if (e.target.closest('a[href]')) close(false);
  });

  menu.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'Tab') {
      const items = focusables();
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  // If the viewport grows to the desktop layout, drop the sheet.
  wide.addEventListener?.('change', (e) => { if (e.matches) close(false); });
}
