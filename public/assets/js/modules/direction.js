import { store } from './storage.js';

const KEY = 'aca-dir';
const root = document.documentElement;

const current = () => (root.getAttribute('dir') === 'rtl' ? 'rtl' : 'ltr');

function apply(dir) {
  root.setAttribute('dir', dir); // lang stays "en": content is identical in both directions
  document.querySelectorAll('[data-dir-set]').forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.dirSet === dir));
  });
  document.dispatchEvent(new CustomEvent('dirchange', { detail: { dir } }));
}

export function initDirection() {
  apply(current());

  document.querySelectorAll('[data-dir-set]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const dir = btn.dataset.dirSet === 'rtl' ? 'rtl' : 'ltr';
      apply(dir);
      store.set(KEY, dir);
    });
  });

  window.addEventListener('storage', (e) => {
    if (e.key === KEY && (e.newValue === 'ltr' || e.newValue === 'rtl')) apply(e.newValue);
  });
}
