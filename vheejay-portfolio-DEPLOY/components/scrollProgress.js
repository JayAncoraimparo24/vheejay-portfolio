import { el } from '../js/dom.js';

/** Thin cyan bar at the top of the page showing how far the visitor has scrolled. */
export function createScrollProgress() {
  const bar = el('div', { class: 'scroll-progress', 'aria-hidden': 'true' });
  let frame = 0;

  const update = () => {
    frame = 0;
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const ratio = max > 0 ? Math.min(1, window.scrollY / max) : 0;
    bar.style.setProperty('--progress', ratio.toFixed(3));
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!frame) frame = window.requestAnimationFrame(update);
    },
    { passive: true },
  );
  window.addEventListener('resize', update);
  update();
  return bar;
}
