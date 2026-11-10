// Student login portal (static). There is no authentication: nothing typed here is checked, sent or stored.
// "Sign in" simply opens the sample dashboard. Options that need a backend explain that they are not connected.

const $ = (s, r = document) => r.querySelector(s);

const MESSAGES = {
  google: 'Google sign-in is not connected in this static version. Nothing was sent to Google and you are not signed in.',
  apple: 'Apple sign-in is not connected in this static version. Nothing was sent to Apple and you are not signed in.',
  reset: 'Password reset is not connected in this static version, so no email was sent. Please contact admissions for help.',
  create: 'Account creation is not connected in this static version, so no account was created. Please contact admissions to enrol.',
};

const status = $('[data-login-status]');
function say(text, tone = 'info') {
  status.className = `lg-status is-${tone}`;
  status.textContent = '';
  // re-set on the next frame so screen readers announce repeated messages
  requestAnimationFrame(() => { status.textContent = text; });
}

document.querySelectorAll('[data-unconnected]').forEach((btn) => {
  btn.addEventListener('click', () => say(MESSAGES[btn.dataset.unconnected]));
});

// Password visibility
const toggle = $('[data-pass-toggle]');
const pass = $('#lg-pass');
toggle?.addEventListener('click', () => {
  const show = pass.type === 'password';
  pass.type = show ? 'text' : 'password';
  toggle.setAttribute('aria-pressed', String(show));
  toggle.setAttribute('aria-label', show ? 'Hide password' : 'Show password');
});

// Sign in: no verification. Clear the fields (never kept) and open the static dashboard.
$('[data-login-form]')?.addEventListener('submit', (e) => {
  e.preventDefault();
  e.target.reset();
  pass.type = 'password';
  toggle?.setAttribute('aria-pressed', 'false');
  say('Opening the sample dashboard. No sign-in took place.');
  const go = () => { window.location.href = 'dashboard.html'; };
  window.matchMedia('(prefers-reduced-motion: reduce)').matches ? go() : setTimeout(go, 600);
});
