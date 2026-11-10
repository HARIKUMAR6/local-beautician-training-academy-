// Courses: level filter for the catalogue, and the discipline rail follows the visible group.
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

function initLevelFilter() {
  const form = $('[data-level-form]');
  if (!form) return;
  const courses = $$('.cs-course');
  const groups = $$('.cs-group');
  const count = $('[data-level-count]');
  const empty = $('[data-level-empty]');
  const apply = () => {
    const level = form.elements.level.value;
    let n = 0;
    courses.forEach((c) => {
      const show = level === 'any' || c.dataset.level === level;
      c.hidden = !show;
      if (show) n++;
    });
    // hide a discipline group when none of its courses match, and its rail link with it
    groups.forEach((g) => {
      const any = $$('.cs-course', g).some((c) => !c.hidden);
      g.hidden = !any;
      const link = $(`.cs-rail__list a[href="#${g.id}"]`);
      if (link) link.closest('li').hidden = !any;
    });
    count.textContent = `${n} ${n === 1 ? 'course' : 'courses'}`;
    empty.hidden = n !== 0;
  };
  form.addEventListener('change', apply);
  form.addEventListener('submit', (e) => e.preventDefault());
  apply();
}

function initRail() {
  const links = $$('.cs-rail__list a');
  const groups = $$('.cs-group');
  if (!links.length || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (!en.isIntersecting) return;
      links.forEach((a) => {
        if (a.getAttribute('href') === `#${en.target.id}`) a.setAttribute('aria-current', 'true');
        else a.removeAttribute('aria-current');
      });
    });
  }, { rootMargin: '-30% 0px -60% 0px' });
  groups.forEach((g) => io.observe(g));
}

initLevelFilter();
initRail();
