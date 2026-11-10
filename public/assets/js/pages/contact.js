// Contact page: course tiles pre-fill the enquiry form; the form validates in the browser only.
// There is no backend. Nothing is sent or stored, and the success message says so.

const $ = (s, r = document) => r.querySelector(s);
const reduceMotion = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const EMAIL = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;
const digits = (v) => v.replace(/\D/g, '').length;

const RULES = {
  name: (v) => v.trim().length >= 2,
  email: (v) => EMAIL.test(v.trim()),
  phone: (v) => /^[+()\d\s.-]+$/.test(v.trim()) && digits(v) >= 7 && digits(v) <= 15,
  course: (v) => v !== '',
  message: (v) => v.trim().length >= 10,
};

function initForm() {
  const form = $('[data-contact-form]');
  if (!form) return;
  const status = $('[data-contact-status]', form);
  const fields = Object.keys(RULES).map((name) => {
    const el = form.elements[name];
    return { name, el, err: document.getElementById(`${el.id}-err`) };
  });

  const check = (f) => {
    const ok = RULES[f.name](f.el.value);
    f.el.setAttribute('aria-invalid', String(!ok));
    f.err.hidden = ok;
    return ok;
  };

  // After a failed submit, fix-as-you-type: errors clear as soon as a field becomes valid.
  fields.forEach((f) => {
    const evt = f.el.tagName === 'SELECT' ? 'change' : 'input';
    f.el.addEventListener(evt, () => { if (f.el.getAttribute('aria-invalid') === 'true') check(f); });
    f.el.addEventListener('blur', () => { if (f.el.value !== '' && f.el.hasAttribute('aria-invalid')) check(f); });
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    status.className = 'eq__status';
    status.textContent = '';
    const bad = fields.filter((f) => !check(f));
    if (bad.length) {
      status.classList.add('is-error');
      status.textContent = bad.length === 1 ? 'Please correct 1 field.' : `Please correct ${bad.length} fields.`;
      bad[0].el.focus();
      return;
    }
    const first = form.elements.name.value.trim().split(/\s+/)[0];
    const course = form.elements.course.value;
    status.classList.add('is-ok');
    status.textContent = `Thank you, ${first}. Your ${course === 'Not sure yet' ? '' : course + ' '}enquiry passed all the checks. ` +
      'This is a demonstration website with no server, so it was not sent and nothing was stored. ' +
      'Please call or email the academy to reach admissions.';
    form.reset();
    fields.forEach((f) => f.el.removeAttribute('aria-invalid'));
  });
}

function initAsk() {
  const form = $('[data-contact-form]');
  const select = form?.elements.course;
  if (!select) return;
  document.querySelectorAll('[data-ask]').forEach((btn) => btn.addEventListener('click', () => {
    select.value = btn.dataset.ask;
    select.dispatchEvent(new Event('change'));
    const target = $('#enquiry');
    target.scrollIntoView({ behavior: reduceMotion() ? 'auto' : 'smooth', block: 'start' });
    // move focus to the first empty field without a second scroll jump
    const next = ['name', 'email', 'phone', 'message'].map((n) => form.elements[n]).find((el) => !el.value) || select;
    next.focus({ preventScroll: true });
    history.replaceState(null, '', '#enquiry');
  }));
}

initForm();
initAsk();
