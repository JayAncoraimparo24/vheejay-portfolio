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
      el('a', { class: 'site-footer__top', href: '#home' }, 'Back to top'),
    ),
  );
}
