// Graceful image fallback: a missing/broken image keeps its frame, shows a tonal block with the alt text.
function mark(img) {
  const frame = img.closest('.media, .inline-img');
  if (!frame) return;
  frame.classList.add('is-broken');
  frame.setAttribute('data-alt', img.alt || '');
}

export function initImages() {
  document.querySelectorAll('img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) mark(img);
  });
  // error events do not bubble, so listen in the capture phase
  document.addEventListener('error', (e) => {
    if (e.target instanceof HTMLImageElement) mark(e.target);
  }, true);
}
