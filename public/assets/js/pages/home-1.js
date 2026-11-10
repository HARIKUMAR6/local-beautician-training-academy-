// Home 1: ledger preview. Hovering or focusing a course row swaps the large image (desktop).
const ledger = document.querySelector('[data-ledger]');
if (ledger) {
  const rows = [...ledger.querySelectorAll('.ledger__row')];
  const activate = (row) => {
    rows.forEach((r) => r.classList.toggle('is-active', r === row));
  };
  rows.forEach((row) => {
    row.addEventListener('pointerenter', () => activate(row));
    row.addEventListener('focusin', () => activate(row));
  });
}
