// Student dashboard (front-end only): hash-based view switching, drawer navigation, dropdowns and search.

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const VIEWS = { overview: 'Overview', learning: 'My Learning', schedule: 'Batch Schedule', logs: 'Practical Logs', certificates: 'Certificates', profile: 'Profile' };
const desktop = window.matchMedia('(min-width: 64rem)');

/* ---------- toast ---------- */
const toastEl = $('[data-toast-region]');
let toastTimer;
function toast(msg) {
  clearTimeout(toastTimer);
  toastEl.textContent = '';
  requestAnimationFrame(() => {
    toastEl.textContent = msg;
    toastEl.classList.add('is-on');
  });
  toastTimer = setTimeout(() => { toastEl.classList.remove('is-on'); toastEl.textContent = ''; }, 6000);
}
document.addEventListener('click', (e) => {
  const t = e.target.closest('[data-toast]');
  if (t && t !== toastEl) toast(t.dataset.toast);
});

/* ---------- dropdowns (notifications, profile) ---------- */
const drops = $$('[data-drop]').map((root) => ({ root, btn: $('[data-drop-btn]', root), panel: $('[data-drop-panel]', root) }));
function closeDrops(except, focusBtn = false) {
  drops.forEach((d) => {
    if (d === except || d.panel.hidden) return;
    d.panel.hidden = true;
    d.btn.setAttribute('aria-expanded', 'false');
    if (focusBtn) d.btn.focus();
  });
}
drops.forEach((d) => {
  d.btn.addEventListener('click', () => {
    const open = d.panel.hidden;
    closeDrops(d);
    closeSearch();
    d.panel.hidden = !open;
    d.btn.setAttribute('aria-expanded', String(open));
    if (open) $('a, button', d.panel)?.focus();
  });
  d.root.addEventListener('focusout', (e) => { if (!d.root.contains(e.relatedTarget) && e.relatedTarget) { d.panel.hidden = true; d.btn.setAttribute('aria-expanded', 'false'); } });
  d.panel.addEventListener('keydown', (e) => {
    if (!['ArrowDown', 'ArrowUp'].includes(e.key)) return;
    const items = $$('a, button', d.panel);
    const i = items.indexOf(document.activeElement);
    e.preventDefault();
    items[(i + (e.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length].focus();
  });
});
document.addEventListener('click', (e) => { if (!e.target.closest('[data-drop]')) closeDrops(); if (!e.target.closest('[data-search], [data-search-toggle]')) closeSearch(); });
document.addEventListener('keydown', (e) => {
  if (e.key !== 'Escape') return;
  const open = drops.find((d) => !d.panel.hidden);
  if (open) { closeDrops(null, true); return; }
  if (!$('#db-q-results').hidden) { closeSearch(); $('#db-q').focus(); return; }
  if (document.documentElement.classList.contains('db-drawer-open')) closeDrawer(true);
});

// Mark notifications read (front-end state only)
$('[data-mark-read]')?.addEventListener('click', () => {
  $$('.db-notes__list .is-unread').forEach((li) => li.classList.remove('is-unread'));
  $('[data-unread-dot]')?.remove();
  $('.db-bell').setAttribute('aria-label', 'Notifications');
});

/* ---------- drawer navigation (< 1024px) ---------- */
const side = $('[data-db-side]');
const scrim = $('[data-db-scrim]');
const opener = $('[data-db-open]');
function openDrawer() {
  document.documentElement.classList.add('db-drawer-open');
  scrim.hidden = false;
  opener.setAttribute('aria-expanded', 'true');
  side.setAttribute('role', 'dialog');
  side.setAttribute('aria-modal', 'true');
  $('[data-db-close]').focus();
}
function closeDrawer(restore = false) {
  document.documentElement.classList.remove('db-drawer-open');
  scrim.hidden = true;
  opener.setAttribute('aria-expanded', 'false');
  side.removeAttribute('role');
  side.removeAttribute('aria-modal');
  if (restore) opener.focus();
}
opener.addEventListener('click', openDrawer);
$('[data-db-close]').addEventListener('click', () => closeDrawer(true));
scrim.addEventListener('click', () => closeDrawer(true));
side.addEventListener('keydown', (e) => { // focus trap while the drawer is open
  if (e.key !== 'Tab' || !document.documentElement.classList.contains('db-drawer-open')) return;
  const f = $$('a[href], button', side).filter((x) => x.offsetParent !== null);
  if (e.shiftKey && document.activeElement === f[0]) { e.preventDefault(); f.at(-1).focus(); }
  else if (!e.shiftKey && document.activeElement === f.at(-1)) { e.preventDefault(); f[0].focus(); }
});
desktop.addEventListener('change', (e) => { if (e.matches) closeDrawer(); });

/* ---------- views (hash based, so refresh and direct links keep the view) ---------- */
const title = $('[data-view-title]');
function show(view, { focus = false } = {}) {
  if (!VIEWS[view]) view = 'overview';
  $$('[data-view]').forEach((s) => { s.hidden = s.dataset.view !== view; });
  $$('.db-nav [data-view-link]').forEach((a) => {
    if (a.dataset.viewLink === view) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
  });
  title.textContent = VIEWS[view];
  $('[data-crumb]').textContent = VIEWS[view];
  document.title = `${VIEWS[view]} | Student Dashboard | Sorrel Academy of Beauty`;
  if (focus) { window.scrollTo(0, 0); title.focus({ preventScroll: true }); }
}
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[data-view-link]');
  if (!a) return;
  e.preventDefault();
  const view = a.dataset.viewLink;
  if (location.hash !== `#${view}`) history.pushState(null, '', `#${view}`);
  closeDrops(); closeDrawer(); closeSearch();
  show(view, { focus: true });
});
window.addEventListener('popstate', () => { closeDrops(); closeDrawer(); closeSearch(); show(location.hash.slice(1), { focus: true }); });
show(location.hash.slice(1));

/* ---------- search (front-end index of this dashboard) ---------- */
const INDEX = [
  ...Object.entries(VIEWS).map(([v, label]) => ({ label, hint: 'Dashboard view', view: v })),
  ...$$('.mod .mod__main > b').map((b, i) => ({ label: b.textContent, hint: `Module ${i + 1}`, view: 'learning' })),
  ...$$('[data-sched="list"] tbody tr').map((tr) => ({ label: tr.cells[2].textContent, hint: `Session · ${tr.cells[0].textContent}`, view: 'schedule' })),
  ...$$('[data-logs] tr[data-s]').map((tr) => ({ label: tr.cells[1].textContent, hint: `Practical log · ${tr.cells[0].textContent}`, view: 'logs' })),
];
const q = $('#db-q');
const results = $('#db-q-results');
const searchBox = $('[data-search]');
const searchBtn = $('[data-search-toggle]');
let active = -1;
function closeSearch() {
  results.hidden = true;
  q.setAttribute('aria-expanded', 'false');
  q.removeAttribute('aria-activedescendant');
  active = -1;
}
function render() {
  const term = q.value.trim().toLowerCase();
  if (!term) { closeSearch(); return; }
  const hits = INDEX.filter((x) => `${x.label} ${x.hint}`.toLowerCase().includes(term)).slice(0, 7);
  results.innerHTML = hits.length
    ? hits.map((h, i) => `<li role="option" id="q-opt-${i}" aria-selected="false" data-go="${h.view}"><b></b><span></span></li>`).join('')
    : '<li class="db-search__none" role="option" aria-disabled="true">No matches found</li>';
  hits.forEach((h, i) => { const li = results.children[i]; li.querySelector('b').textContent = h.label; li.querySelector('span').textContent = h.hint; });
  results.hidden = false;
  q.setAttribute('aria-expanded', 'true');
  active = -1;
}
function go(li) {
  if (!li?.dataset.go) return;
  const view = li.dataset.go;
  history.pushState(null, '', `#${view}`);
  q.value = '';
  closeSearch();
  searchBox.classList.remove('is-open');
  searchBtn.setAttribute('aria-expanded', 'false');
  show(view, { focus: true });
}
q.addEventListener('input', render);
q.addEventListener('keydown', (e) => {
  const opts = $$('[data-go]', results);
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    if (results.hidden || !opts.length) return;
    e.preventDefault();
    active = (active + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
    opts.forEach((o, i) => o.setAttribute('aria-selected', String(i === active)));
    q.setAttribute('aria-activedescendant', opts[active].id);
  } else if (e.key === 'Enter') {
    e.preventDefault();
    go(opts[Math.max(active, 0)]);
  }
});
results.addEventListener('click', (e) => go(e.target.closest('[data-go]')));
searchBtn.addEventListener('click', () => { // small screens: the search field opens below the top bar
  const open = !searchBox.classList.contains('is-open');
  searchBox.classList.toggle('is-open', open);
  searchBtn.setAttribute('aria-expanded', String(open));
  closeDrops();
  if (open) q.focus(); else closeSearch();
});

/* ---------- My Learning filter ---------- */
const modFilter = $('[data-mod-filter]');
modFilter?.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-f]');
  if (!b) return;
  $$('button', modFilter).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  let n = 0;
  $$('[data-mods] .mod').forEach((m) => { const on = b.dataset.f === 'all' || m.dataset.s === b.dataset.f; m.hidden = !on; n += on; });
  $('[data-mod-count]').textContent = `${n} ${n === 1 ? 'module' : 'modules'} shown`;
});

/* ---------- Schedule layout switch ---------- */
const sw = $('[data-sched-switch]');
sw?.addEventListener('click', (e) => {
  const b = e.target.closest('button[data-layout]');
  if (!b) return;
  $$('button', sw).forEach((x) => x.setAttribute('aria-pressed', String(x === b)));
  $$('[data-sched]').forEach((p) => { p.hidden = p.dataset.sched !== b.dataset.layout; });
});

/* ---------- Practical logs: filter + feedback rows ---------- */
const logFilter = $('[data-log-filter]');
logFilter?.addEventListener('change', () => {
  let n = 0;
  $$('[data-logs] tr[data-s]').forEach((tr) => {
    const on = logFilter.value === 'all' || tr.dataset.s === logFilter.value;
    tr.hidden = !on; n += on;
    const btn = $('[data-fb]', tr);
    const fb = document.getElementById(btn.getAttribute('aria-controls'));
    if (!on) { fb.hidden = true; btn.setAttribute('aria-expanded', 'false'); }
  });
  $('[data-log-count]').textContent = `${n} ${n === 1 ? 'entry' : 'entries'} shown`;
});
$$('[data-fb]').forEach((btn) => btn.addEventListener('click', () => {
  const fb = document.getElementById(btn.getAttribute('aria-controls'));
  fb.hidden = !fb.hidden;
  btn.setAttribute('aria-expanded', String(!fb.hidden));
}));

/* ---------- Visible theme-button text follows the label set by the shared theme module ---------- */
$$('[data-theme-text]').forEach((span) => {
  const btn = span.closest('[data-theme-toggle]');
  const sync = () => { span.textContent = btn.getAttribute('aria-label') || 'Switch theme'; };
  sync();
  new MutationObserver(sync).observe(btn, { attributes: true, attributeFilter: ['aria-label'] });
});

/* ---------- Certificate dialog (only when a certificate preview exists) ---------- */
const dlg = $('[data-cert-dialog]');
$('[data-cert-open]')?.addEventListener('click', () => dlg.showModal());
$('[data-cert-close]')?.addEventListener('click', () => dlg.close());
dlg?.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
