import { el } from '../js/dom.js';
import { siteUrl } from '../js/config.js';
import { navLinks, profile } from '../data/profile.js';
import { icon } from './icons.js';
import { createThemeToggle } from './themeToggle.js';

const SCROLLED_OFFSET = 8;

function linkHref(id, isHome) {
  return isHome ? `#${id}` : siteUrl(`index.html#${id}`);
}

function createMenuLink({ id, label }, isHome, onNavigate) {
  const link = el('a', {
    class: 'nav__link',
    href: linkHref(id, isHome),
    'data-nav-link': id,
    text: label,
    on: { click: onNavigate },
  });
  return el('li', { class: 'nav__item' }, link);
}

export function createNavbar({ isHome }) {
  const toggle = el('button', {
    class: 'nav__toggle',
    type: 'button',
    'aria-expanded': 'false',
    'aria-controls': 'nav-menu',
    'aria-label': 'Open menu',
  });
  const setToggleIcon = (open) => toggle.replaceChildren(icon(open ? 'close' : 'menu', 24));
  setToggleIcon(false);

  const header = el('header', { class: 'site-header' });

  const setOpen = (open) => {
    header.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    setToggleIcon(open);
  };

  toggle.addEventListener('click', () => setOpen(!header.classList.contains('is-open')));
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setOpen(false);
  });
  window.addEventListener(
    'scroll',
    () => header.classList.toggle('is-scrolled', window.scrollY > SCROLLED_OFFSET),
    { passive: true },
  );

  const menu = el(
    'ul',
    { class: 'nav__menu', id: 'nav-menu' },
    navLinks.map((link) => createMenuLink(link, isHome, () => setOpen(false))),
  );

  header.append(
    el(
      'nav',
      { class: 'nav container', 'aria-label': 'Main navigation' },
      el('a', { class: 'nav__brand', href: linkHref('home', isHome), 'aria-label': `${profile.name} – home` },
        el('span', { class: 'nav__logo', text: profile.initials }),
        el('span', { class: 'nav__name', text: profile.name }),
      ),
      menu,
      el(
        'div',
        { class: 'nav__actions' },
        createThemeToggle(),
        el('a', { class: 'nav__cta', href: linkHref('contact', isHome), text: 'Hire Me' }),
        toggle,
      ),
    ),
  );
  return header;
}

/** Marks the navbar link matching `id` as the current section. */
export function setActiveNavLink(id) {
  document.querySelectorAll('[data-nav-link]').forEach((link) => {
    if (link.dataset.navLink === id) link.setAttribute('aria-current', 'true');
    else link.removeAttribute('aria-current');
  });
}
