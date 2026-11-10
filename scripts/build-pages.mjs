// Build-time page assembler (zero dependencies).
//   src/pages/**/*.html  +  src/partials/*.html  +  src/icons/*.svg  +  src/config/site.json
//   -> public/**/*.html   (standalone pages, no runtime includes)
//
// Syntax inside pages/partials:
//   <!--@include name-->        insert src/partials/name.html (nested includes allowed)
//   {{icon:name extra classes}} inline SVG from src/icons/name.svg
//   {{@nav-desktop}} {{@nav-mobile}} {{@footer-nav}} {{@footer-courses}} {{@footer-social}}   generated lists
//   {{@current:key}}            ` aria-current="page"` when this page's data-page equals key
//   {{root}}                    relative prefix to the site root ("" or "../" ...)
//   {{year}} {{site.path.to.value}}
// A page declares its identity with <body data-page="key"> (used for aria-current).

import { readFileSync, writeFileSync, readdirSync, mkdirSync, statSync, existsSync } from 'node:fs';
import { join, dirname, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const SRC = join(ROOT, 'src');
const OUT = join(ROOT, 'public');
const site = JSON.parse(readFileSync(join(SRC, 'config', 'site.json'), 'utf8'));
const images = JSON.parse(readFileSync(join(SRC, 'config', 'images.json'), 'utf8'));
const imageUse = {}; // key -> [page file, ...]
const PAGE_LABEL = { 'home-1': 'Home 1', 'home-2': 'Home 2', about: 'About', contact: 'Contact', courses: 'Courses', certification: 'Certification', login: 'Student Login', dashboard: 'Student Dashboard' };

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function walk(dir) {
  return readdirSync(dir).flatMap((f) => {
    const p = join(dir, f);
    return statSync(p).isDirectory() ? walk(p) : p.endsWith('.html') ? [p] : [];
  });
}

function partial(name, depth = 0) {
  if (depth > 5) throw new Error(`Include nesting too deep at "${name}"`);
  const file = join(SRC, 'partials', `${name}.html`);
  if (!existsSync(file)) throw new Error(`Missing partial: ${name}`);
  return resolveIncludes(readFileSync(file, 'utf8'), depth + 1);
}
const resolveIncludes = (html, depth = 0) =>
  html.replace(/<!--@include ([\w/-]+)-->/g, (_, n) => partial(n, depth));

function icon(spec) {
  const [name, ...cls] = spec.trim().split(/\s+/);
  const file = join(SRC, 'icons', `${name}.svg`);
  if (!existsSync(file)) throw new Error(`Missing icon: ${name}`);
  return `<svg class="icon${cls.length ? ' ' + cls.join(' ') : ''}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">${readFileSync(file, 'utf8')}</svg>`;
}

const cur = (page, key) => (page === key ? ' aria-current="page"' : '');
const href = (h) => `{{root}}${h}`;

const generators = {
  'nav-desktop': (page) =>
    site.nav
      .map((it) => {
        if (!it.children) {
          return `<li><a class="nav-link" href="${href(it.href)}"${cur(page, it.key)}>${esc(it.label)}</a></li>`;
        }
        const active = it.children.some((c) => c.key === page) ? ' data-active="true"' : '';
        const kids = it.children
          .map((c) => `<li><a class="nav-dd__link" href="${href(c.href)}"${cur(page, c.key)}>${esc(c.label)}</a></li>`)
          .join('');
        return `<li class="nav-dd" data-dropdown><button type="button" class="nav-link" data-dropdown-trigger aria-expanded="false" aria-controls="dd-${it.key}"${active}>${esc(it.label)} {{icon:chevron-down}}</button><ul class="nav-dd__panel" id="dd-${it.key}" data-dropdown-panel hidden>${kids}</ul></li>`;
      })
      .join('\n        '),

  'nav-mobile': (page) =>
    site.nav
      .map((it, i) => {
        const n = String(i + 1).padStart(2, '0');
        if (!it.children) {
          return `<li class="m-item"><a class="m-link" href="${href(it.href)}"${cur(page, it.key)}><span class="folio">${n}</span>${esc(it.label)}</a></li>`;
        }
        const kids = it.children
          .map((c) => `<li><a href="${href(c.href)}"${cur(page, c.key)}>${esc(c.label)}</a></li>`)
          .join('');
        return `<li class="m-item"><button type="button" class="m-link" data-accordion-trigger aria-expanded="false" aria-controls="m-${it.key}"><span class="folio">${n}</span>${esc(it.label)} {{icon:chevron-down}}</button><ul class="m-sub" id="m-${it.key}" data-accordion-panel hidden>${kids}</ul></li>`;
      })
      .join('\n        '),

  'footer-nav': (page) => {
    // the header's Dashboard link is represented in the footer by the existing "Student Dashboard" entry (listed once)
    const flat = site.nav.filter((it) => !(site.actions.dashboard && it.href === site.actions.dashboard.href)).flatMap((it) => (it.children ? it.children : [it]));
    flat.push(site.actions.login);
    if (site.actions.dashboard) flat.push(site.actions.dashboard);
    return flat.map((it) => `<li><a href="${href(it.href)}"${cur(page, it.key)}>${esc(it.label)}</a></li>`).join('\n          ');
  },

  'footer-courses': () =>
    site.footerCourses.items.map((it) => `<li><a href="${href(it.href)}">${esc(it.label)}</a></li>`).join('\n          '),

  'footer-social': () =>
    site.social
      .map((s) => {
        const name = s.label.toLowerCase();
        return s.url
          ? `<li><a class="f-ico" href="${esc(s.url)}" target="_blank" rel="noopener noreferrer" aria-label="${esc(s.label)}">{{icon:${name}}}</a></li>`
          : `<li><a class="f-ico" href="#" data-unlinked aria-label="${esc(s.label)} (profile link not set up yet)">{{icon:${name}}}</a></li>`;
      })
      .join('\n          '),
};

// Contact page: course <option>s and social handles come from site.json (single source of truth).
generators['course-options'] = () =>
  site.footerCourses.items.map((it) => `<option value="${esc(it.label)}">${esc(it.label)}</option>`).join('');

generators['social-handles'] = () =>
  site.social
    .map((s) => {
      const name = s.label.toLowerCase();
      const body = `{{icon:${name}}}<span><b>${esc(s.label)}</b> ${esc(s.handle)}</span>`;
      return s.url
        ? `<li><a href="${esc(s.url)}" target="_blank" rel="noopener noreferrer">${body}</a></li>`
        : `<li>${body}</li>`;
    })
    .join('');

generators.credits = () => {
  const groups = {};
  for (const [key, im] of Object.entries(images)) (groups[im.page] ||= []).push([key, im]);
  const item = (im) => {
    const s = im.source;
    const lic = im.attributionRequired
      ? `<a href="${esc(s.licenseUrl)}" rel="noopener noreferrer" target="_blank">${esc(s.license)}</a>`
      : `${esc(s.license)} (no attribution required)`;
    return `<li><span class="folio">Section ${im.section}</span> <span class="credits-title">&ldquo;${esc(s.title)}&rdquo;</span> by ${esc(s.author)}. Licence: ${lic}. <a href="${esc(s.url)}" rel="noopener noreferrer" target="_blank">Source on Wikimedia Commons</a>.</li>`;
  };
  return Object.entries(groups)
    .map(([pg, list]) => `<section class="credits-group" aria-labelledby="cg-${pg}"><h2 id="cg-${pg}" class="text-h3">${PAGE_LABEL[pg] || pg}</h2><ol class="credits-list">${list.map(([, im]) => item(im)).join('')}</ol></section>`)
    .join('\n');
};

function img(spec, pageFile) {
  const [key, ...opts] = spec.split('|').map((x) => x.trim());
  const im = images[key];
  if (!im) throw new Error(`Unknown image key: ${key}`);
  const o = {};
  opts.forEach((p) => {
    const i = p.indexOf('=');
    if (i < 0) o[p] = true; else o[p.slice(0, i)] = p.slice(i + 1);
  });
  (imageUse[key] ||= []).push(pageFile);
  const cls = o.class ? ` class="${esc(o.class)}"` : '';
  const load = o.eager ? 'loading="eager" fetchpriority="high"' : 'loading="lazy"';
  return `<img src="{{root}}${im.file}-800.webp" srcset="{{root}}${im.file}-800.webp 800w, {{root}}${im.file}.webp ${im.w}w" sizes="${esc(o.sizes || '100vw')}" width="${im.w}" height="${im.h}" alt="${esc(o.alt ?? im.alt)}"${cls} ${load} decoding="async">`;
}

function lookup(path) {
  const v = path.split('.').reduce((o, k) => (o == null ? o : o[k]), site);
  if (v == null || typeof v === 'object') throw new Error(`Unknown site value: site.${path}`);
  return esc(v);
}

function render(html, page, root, pageFile) {
  html = resolveIncludes(html);
  html = html.replace(/\{\{@current:([\w-]+)\}\}/g, (_, k) => cur(page, k));
  html = html.replace(/\{\{@([\w-]+)\}\}/g, (_, g) => {
    if (!generators[g]) throw new Error(`Unknown generator: ${g}`);
    return generators[g](page);
  });
  html = html.replace(/\{\{icon:([^}]+)\}\}/g, (_, s) => icon(s));
  html = html.replace(/\{\{img:([^}]+)\}\}/g, (_, s) => img(s, pageFile));
  html = html.replace(/\{\{root\}\}/g, root);
  html = html.replace(/\{\{year\}\}/g, String(new Date().getFullYear()));
  html = html.replace(/\{\{site\.([\w.]+)\}\}/g, (_, p) => lookup(p));
  const left = html.match(/\{\{[^}]+\}\}/);
  if (left) throw new Error(`Unresolved token ${left[0]}`);
  return html;
}

const pagesDir = join(SRC, 'pages');
const pages = existsSync(pagesDir) ? walk(pagesDir) : [];
for (const file of pages) {
  const rel = relative(pagesDir, file);
  const depth = rel.split(sep).length - 1;
  const src = readFileSync(file, 'utf8');
  const page = (src.match(/data-page="([^"]+)"/) || [])[1] || '';
  const out = join(OUT, rel);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, render(src, page, '../'.repeat(depth), rel.split(sep).join('/')));
  console.log(`built ${rel.split(sep).join('/')}`);
}
if (!pages.length) console.log('no pages in src/pages');

// ---- image rules (each image used once, on its assigned page, file present) + manifest
const problems = [];
const ASSIGNED = { 'home-1': 'index.html', 'home-2': 'home-2.html', about: 'about.html', contact: 'contact.html', courses: 'courses.html', certification: 'certification.html', login: 'login.html', dashboard: 'dashboard.html' };
for (const [key, uses] of Object.entries(imageUse)) {
  if (uses.length > 1) problems.push(`image "${key}" is used ${uses.length} times (${uses.join(', ')}); every image may be used once`);
  const want = ASSIGNED[images[key].page];
  if (want && uses[0] !== want) problems.push(`image "${key}" is assigned to ${want} but used in ${uses[0]}`);
}
// the same source photograph may not be registered twice under different keys (e.g. a homepage photo re-added for an inner page)
const bySource = {};
for (const [key, im] of Object.entries(images)) (bySource[im.source.url] ||= []).push(key);
for (const [url, keys] of Object.entries(bySource)) {
  if (keys.length > 1) problems.push(`source photo registered more than once (${keys.join(', ')}): ${url}`);
}
// registered but unused images: a warning, not a failure (a page may still be in progress)
const unused = Object.entries(images).filter(([key, im]) => ASSIGNED[im.page] && !imageUse[key]).map(([key, im]) => `${key} (${ASSIGNED[im.page]})`);
if (unused.length) console.warn(`images: ${unused.length} registered but not used yet: ${unused.join(', ')}`);
for (const [key, im] of Object.entries(images)) {
  for (const sfx of ['.webp', '-800.webp']) {
    if (!existsSync(join(OUT, im.file + sfx))) problems.push(`missing file for "${key}": ${im.file}${sfx}`);
  }
}
if (problems.length) {
  console.error('IMAGE PROBLEMS:\n  ' + problems.join('\n  '));
  process.exit(1);
}
const rows = Object.entries(images).map(([key, im]) => {
  const used = (imageUse[key] || ['(not yet used)'])[0];
  const check = `Verified as stated on Commons (${im.licenseCheck || 'Phase 3 download'})`;
  return `| ${key} | \`${im.file}.webp\` | ${PAGE_LABEL[im.page] || im.page} | ${im.section} | ${im.alt.replace(/\|/g, '/')} | ${used} | ${im.source.license} | ${im.source.author.replace(/\|/g, '/')} | [Commons](${im.source.url}) | ${check} |`;
});
writeFileSync(join(OUT, 'assets', 'images', 'MANIFEST.md'), [
  '# Image usage manifest',
  '',
  'Generated by scripts/build-pages.mjs from src/config/images.json. Every image is used exactly once across the site;',
  'future inner pages must use new files and register them in images.json. The build fails if an image key or a source photo is reused.',
  '',
  'Licence status: licence, author and source were read from the Wikimedia Commons API when each file was downloaded.',
  'That verifies the licence as stated on Commons. It is not legal clearance and does not cover model releases,',
  'so no image is treated as commercially cleared until the academy confirms it or replaces it with its own photography.',
  '',
  '| Key | File | Page | Section | Subject | Built page | Licence | Author | Source | Licence check |',
  '|---|---|---|---|---|---|---|---|---|---|',
  ...rows,
  '',
].join('\n'));
console.log(`images: ${Object.keys(imageUse).length} used, all unique`);
