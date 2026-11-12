/**
 * Adds `is-scrolling` to <html> while the page is being scrolled, and removes it shortly after.
 * CSS uses it to pause decorative looping animations during the scroll, so scrolling stays smooth.
 * (The animations carry on from where they stopped, so nothing jumps.)
 */
export function initScrollState() {
  const root = document.documentElement;
  let timer = 0;

  window.addEventListener(
    'scroll',
    () => {
      root.classList.add('is-scrolling');
      clearTimeout(timer);
      timer = setTimeout(() => root.classList.remove('is-scrolling'), 160);
    },
    { passive: true },
  );
}
