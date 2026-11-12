import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';

export function createFooter() {
  return el(
    'footer',
    { class: 'site-footer' },
    el(
      'div',
      { class: 'container site-footer__inner' },
      el('p', { text: `© ${new Date().getFullYear()} ${profile.name}` }),
      el('p', { class: 'site-footer__roles', text: profile.roles.join(' | ') }),
      // Scrolls to the very top of whatever page this is (project pages have no #home section)
      el('a', {
        class: 'site-footer__top',
        href: '#',
        'aria-label': 'Back to top',
        on: {
          click: (event) => {
            event.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          },
        },
      }, 'Back to top ↑'),
    ),
  );
}
