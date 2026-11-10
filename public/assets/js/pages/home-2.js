// Home 2 - The Studio Tour: expanding panels, timeline scroller, course grid filter, kit pins, pinboard lightbox,
// certificate stepper, enquiry form (demo only, nothing is sent) and the section index with scroll-spy.

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isRtl = () => document.documentElement.dir === 'rtl';

/* ---------- 1 Expanding studio panels ---------- */
function initPanels() {
  const wrap = $('[data-panels]');
  if (!wrap) return;
  const pans = $$('.pan', wrap);
  function open(pan) {
    pans.forEach((p) => {
      const on = p === pan;
      p.classList.toggle('is-open', on);
      $('.pan__btn', p).setAttribute('aria-expanded', String(on));
      $('.pan__body', p).hidden = !on;
    });
  }
  pans.forEach((p) => $('.pan__btn', p).addEventListener('click', () => open(p)));

  // "Find ... courses" jumps to the course grid with that discipline selected.
  $$('[data-find]').forEach((btn) => btn.addEventListener('click', () => {
    const radio = $(`[data-finder-form] input[name="d"][value="${btn.dataset.find}"]`);
    if (radio) { radio.checked = true; radio.dispatchEvent(new Event('change', { bubbles: true })); }
    $('#finder')?.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
    history.replaceState(null, '', '#finder');
  }));
}

/* ---------- 2 Timeline scroller ---------- */
function initTimeline() {
  const track = $('[data-day-track]');
  if (!track) return;
  const step = () => {
    const first = $('.tl__item', track);
    return first ? first.getBoundingClientRect().width : 300;
  };
  const go = (dir) => track.scrollBy({ left: dir * (isRtl() ? -1 : 1) * step(), behavior: reduceMotion() ? 'auto' : 'smooth' }); // physical-ok: scrollBy API is physical; RTL handled via sign
  $('[data-day-prev]')?.addEventListener('click', () => go(-1));
  $('[data-day-next]')?.addEventListener('click', () => go(1));
}

/* ---------- 3 Course grid: highlight matches, dim the rest ---------- */
function initGrid() {
  const form = $('[data-finder-form]');
  const rows = $$('.mx tbody tr');
  if (!form || !rows.length) return;
  const count = $('[data-finder-count]');
  const apply = () => {
    const d = form.elements.d.value;
    const l = form.elements.level.value;
    let n = 0;
    rows.forEach((tr) => {
      const rowOn = d === 'all' || tr.dataset.row === d;
      tr.inert = !rowOn;
      $$('td', tr).forEach((td, i) => {
        const level = i === 0 ? 'foundation' : 'advanced';
        const cellOn = rowOn && (l === 'any' || l === level);
        td.inert = !cellOn;
        if (cellOn && $('a.mcell', td)) n++;
      });
    });
    count.textContent = `${n} ${n === 1 ? 'course' : 'courses'}`;
  };
  form.addEventListener('change', apply);
  form.addEventListener('submit', (e) => e.preventDefault());
  apply();
}

/* ---------- 4 Kit pins ---------- */
const KIT = {
  palettes: ['Palettes', 'Colour matching, blending and layering.'],
  brushes: ['Brushes', 'Choosing, using and caring for each tool.'],
  glitter: ['Colour play', 'Bold pigments for editorial work.'],
  pigment: ['Pigments', 'Mixing custom shades from scratch.'],
};
function initKit() {
  const pins = $$('[data-kit]');
  if (!pins.length) return;
  const keys = Object.keys(KIT);
  pins.forEach((p) => p.addEventListener('click', () => {
    const k = p.dataset.kit;
    pins.forEach((x) => { const on = x === p; x.classList.toggle('is-on', on); x.setAttribute('aria-pressed', String(on)); });
    $('[data-kit-title]').textContent = KIT[k][0];
    $('[data-kit-text]').textContent = KIT[k][1];
    $('[data-kit-count]').textContent = `0${keys.indexOf(k) + 1} / 0${keys.length}`;
  }));
}

/* ---------- 5 Pinboard lightbox ---------- */
function initBoard() {
  const dlg = $('[data-lightbox]');
  const board = $('[data-wall]');
  if (!dlg || !board || typeof dlg.showModal !== 'function') return;
  const img = $('[data-lightbox-img]', dlg);
  const cap = $('[data-lightbox-cap]', dlg);
  board.addEventListener('click', (e) => {
    const btn = e.target.closest('.wall__btn');
    if (!btn) return;
    const src = $('img', btn);
    img.src = (src.currentSrc || src.src).replace('-800.webp', '.webp');
    img.alt = src.alt;
    cap.textContent = btn.dataset.caption || src.alt;
    dlg.showModal();
  });
  $('[data-lightbox-close]', dlg).addEventListener('click', () => dlg.close());
  dlg.addEventListener('click', (e) => { if (e.target === dlg) dlg.close(); });
  dlg.addEventListener('close', () => img.removeAttribute('src'));
}

/* ---------- 6 Certificate stepper ---------- */
function initCert() {
  const steps = $$('[data-steps] .stp');
  const parts = $$('[data-cert] [data-part]');
  if (!steps.length) return;
  const set = (key) => {
    steps.forEach((s) => s.setAttribute('aria-pressed', String(s.dataset.part === key)));
    parts.forEach((p) => p.classList.toggle('is-hl', p.dataset.part === key));
  };
  steps.forEach((s) => {
    s.addEventListener('click', () => set(s.dataset.part));
    s.addEventListener('pointerenter', () => set(s.dataset.part));
    s.addEventListener('focus', () => set(s.dataset.part));
  });
  set(steps[0].dataset.part);
}

/* ---------- 7 Enquiry form (demo: validates, never sends) ---------- */
function initEnquiry() {
  const form = $('[data-enquiry]');
  if (!form) return;
  const status = $('[data-enquiry-status]', form);
  const fields = [
    { el: $('#eq-name'), err: $('#eq-name-err'), ok: (v) => v.trim().length > 1 },
    { el: $('#eq-email'), err: $('#eq-email-err'), ok: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) },
  ];
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.hidden = true;
    let first = null;
    fields.forEach(({ el, err, ok }) => {
      const good = ok(el.value);
      el.setAttribute('aria-invalid', String(!good));
      err.hidden = good;
      if (!good && !first) first = el;
    });
    if (first) { first.focus(); return; }
    status.textContent = `Thank you, ${fields[0].el.value.trim()}. This is a demonstration form, so nothing was sent.`;
    status.hidden = false;
    form.reset();
    fields.forEach(({ el }) => el.removeAttribute('aria-invalid'));
  });
}

/* ---------- Section index + scroll-spy ---------- */
function initIndex() {
  const links = $$('[data-index] a');
  const sections = $$('[data-section]');
  if (!links.length || !('IntersectionObserver' in window)) return;
  const set = (id) => links.forEach((a) => {
    if (a.getAttribute('href') === `#${id}`) {
      a.setAttribute('aria-current', 'true');
      const bar = a.closest('ol');
      if (bar && bar.scrollWidth > bar.clientWidth) { // keep the active item visible on narrow screens
        const x = a.offsetLeft - bar.clientWidth / 2 + a.clientWidth / 2;
        bar.scrollTo({ left: isRtl() ? -Math.abs(x) : x, behavior: reduceMotion() ? 'auto' : 'smooth' }); // physical-ok: scrollTo API is physical; RTL handled via sign
      }
    } else a.removeAttribute('aria-current');
  });
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => { if (en.isIntersecting) set(en.target.id); });
  }, { rootMargin: '-35% 0px -55% 0px' });
  sections.forEach((s) => io.observe(s));
}

initPanels();
initTimeline();
initGrid();
initKit();
initBoard();
initCert();
initEnquiry();
initIndex();
