import { setActiveNavLink } from '../components/navbar.js';

/** Highlights the navbar link for the section currently in view. */
export function initScrollSpy() {
  const sections = document.querySelectorAll('section[data-nav]');
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries.find((entry) => entry.isIntersecting);
      if (visible) setActiveNavLink(visible.target.dataset.nav);
    },
    { rootMargin: '-40% 0px -55% 0px' },
  );
  sections.forEach((section) => observer.observe(section));
}
