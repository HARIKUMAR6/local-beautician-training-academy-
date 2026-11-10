// Disclosure patterns: desktop dropdown (click only, closed by default) and mobile accordion.

const setOpen = (trigger, panel, open) => {
  trigger.setAttribute('aria-expanded', String(open));
  panel.hidden = !open;
};

export function initDropdowns() {
  const dropdowns = [...document.querySelectorAll('[data-dropdown]')].map((root) => ({
    root,
    trigger: root.querySelector('[data-dropdown-trigger]'),
    panel: root.querySelector('[data-dropdown-panel]'),
  })).filter((d) => d.trigger && d.panel);

  const links = (d) => [...d.panel.querySelectorAll('a')];
  const isOpen = (d) => !d.panel.hidden;
  const close = (d, restoreFocus = false) => {
    if (!isOpen(d)) return;
    setOpen(d.trigger, d.panel, false);
    if (restoreFocus) d.trigger.focus();
  };
  const closeAll = () => dropdowns.forEach((d) => close(d));

  for (const d of dropdowns) {
    setOpen(d.trigger, d.panel, false); // always closed on load

    // Click toggles. There is deliberately no hover/pointerenter handler.
    d.trigger.addEventListener('click', () => {
      const willOpen = !isOpen(d);
      closeAll();
      setOpen(d.trigger, d.panel, willOpen);
    });

    d.root.addEventListener('keydown', (e) => {
      const items = links(d);
      const i = items.indexOf(document.activeElement);
      if (e.key === 'Escape' && isOpen(d)) {
        e.preventDefault();
        close(d, true);
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        if (!isOpen(d)) setOpen(d.trigger, d.panel, true);
        items[i < 0 ? 0 : (i + 1) % items.length]?.focus();
      } else if (e.key === 'ArrowUp' && isOpen(d)) {
        e.preventDefault();
        items[i <= 0 ? items.length - 1 : i - 1]?.focus();
      } else if (e.key === 'Home' && i >= 0) {
        e.preventDefault();
        items[0].focus();
      } else if (e.key === 'End' && i >= 0) {
        e.preventDefault();
        items[items.length - 1].focus();
      }
    });

    // Close after choosing an option.
    d.panel.addEventListener('click', (e) => {
      if (e.target.closest('a')) close(d);
    });

    // Close when keyboard focus leaves the dropdown.
    d.root.addEventListener('focusout', (e) => {
      if (e.relatedTarget && !d.root.contains(e.relatedTarget)) close(d);
    });
  }

  // Close on outside click/tap.
  document.addEventListener('pointerdown', (e) => {
    for (const d of dropdowns) if (isOpen(d) && !d.root.contains(e.target)) close(d);
  });
  window.addEventListener('resize', closeAll);
  document.addEventListener('dirchange', closeAll);
}

export function initAccordions() {
  document.querySelectorAll('[data-accordion-trigger]').forEach((trigger) => {
    const panel = document.getElementById(trigger.getAttribute('aria-controls'));
    if (!panel) return;
    setOpen(trigger, panel, false);
    trigger.addEventListener('click', () => setOpen(trigger, panel, panel.hidden));
  });
}
