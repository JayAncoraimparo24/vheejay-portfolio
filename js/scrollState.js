/**
 * Adds `is-scrolling` to <html> while the page is being scrolled, and removes it shortly after.
 * CSS uses it to pause decorative looping animations during the scroll, so scrolling stays smooth.
 * (The animations carry on from where they stopped, so nothing jumps.)
 */
export function initScrollState() {
  const root = document.documentElement;
  let timer = 0;

  // Looping animations of the hero and the tools strip stop while they are off screen
  // (nobody can see them), and start again when they come back.
  if ('IntersectionObserver' in window) {
    const watcher = new IntersectionObserver((entries) => {
      entries.forEach(({ target, isIntersecting }) => target.toggleAttribute('data-offscreen', !isIntersecting));
    });
    document.querySelectorAll('.hero, .marquee').forEach((section) => watcher.observe(section));
  }

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
