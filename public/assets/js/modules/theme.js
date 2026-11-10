import { store } from './storage.js';

const KEY = 'aca-theme';
const root = document.documentElement;
const mq = window.matchMedia('(prefers-color-scheme: dark)');

const current = () => (root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light');

function apply(theme) {
  root.setAttribute('data-theme', theme);
  const next = theme === 'dark' ? 'light' : 'dark';
  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.setAttribute('aria-label', `Switch to ${next} theme`);
  });
}

export function initTheme() {
  apply(current()); // head script already set data-theme before paint; this syncs labels

  document.querySelectorAll('[data-theme-toggle]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const next = current() === 'dark' ? 'light' : 'dark';
      apply(next);
      store.set(KEY, next);
    });
  });

  // Follow the system only while the visitor has not chosen explicitly.
  mq.addEventListener?.('change', (e) => {
    if (!store.get(KEY)) apply(e.matches ? 'dark' : 'light');
  });
  // Keep other open tabs in step.
  window.addEventListener('storage', (e) => {
    if (e.key === KEY && (e.newValue === 'light' || e.newValue === 'dark')) apply(e.newValue);
  });
}
