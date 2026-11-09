import { el } from '../js/dom.js';
import { icon } from './icons.js';

const OPEN_CLASS = 'is-open';
const GALLERY_SELECTOR = '.grid--shots, .photo-masonry';
const LINK_SELECTOR = 'a.media__link';

/** Full-screen picture viewer for gallery images: arrows, keyboard, Esc, click outside to close. */
export function initLightbox() {
  let links = [];
  let index = 0;
  let opener = null;

  const image = el('img', { class: 'lightbox__img', alt: '' });
  const caption = el('figcaption', { class: 'lightbox__caption' });
  const counter = el('span', { class: 'lightbox__counter' });
  const closeButton = el('button', { class: 'lightbox__btn lightbox__close', type: 'button', 'aria-label': 'Close' }, icon('close', 24));
  const prevButton = el('button', { class: 'lightbox__btn lightbox__prev', type: 'button', 'aria-label': 'Previous picture' }, icon('back', 24));
  const nextButton = el('button', { class: 'lightbox__btn lightbox__next', type: 'button', 'aria-label': 'Next picture' }, icon('arrow', 24));
  const overlay = el(
    'div',
    { class: 'lightbox', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Picture viewer', hidden: true },
    el('div', { class: 'lightbox__backdrop' }),
    el('figure', { class: 'lightbox__figure' }, image, caption),
    counter,
    closeButton,
    prevButton,
    nextButton,
  );
  document.body.append(overlay);

  const show = (nextIndex) => {
    index = (nextIndex + links.length) % links.length;
    const link = links[index];
    const figure = link.closest('figure');
    image.classList.remove('is-ready');
    image.src = link.getAttribute('href');
    image.alt = link.querySelector('img')?.alt ?? '';
    caption.textContent = figure?.querySelector('figcaption')?.textContent ?? '';
    counter.textContent = `${index + 1} / ${links.length}`;
    const single = links.length < 2;
    prevButton.hidden = single;
    nextButton.hidden = single;
  };

  image.addEventListener('load', () => image.classList.add('is-ready'));

  const open = (link) => {
    const gallery = link.closest(GALLERY_SELECTOR);
    links = gallery ? [...gallery.querySelectorAll(LINK_SELECTOR)] : [link];
    opener = link;
    overlay.hidden = false;
    document.body.classList.add('has-lightbox');
    show(links.indexOf(link));
    window.requestAnimationFrame(() => overlay.classList.add(OPEN_CLASS));
    closeButton.focus();
  };

  const close = () => {
    overlay.classList.remove(OPEN_CLASS);
    document.body.classList.remove('has-lightbox');
    window.setTimeout(() => {
      if (!overlay.classList.contains(OPEN_CLASS)) overlay.hidden = true;
    }, 250);
    opener?.focus({ preventScroll: true });
  };

  document.addEventListener('click', (event) => {
    if (event.defaultPrevented) return; // edit mode replaces the picture instead
    const link = event.target.closest?.(LINK_SELECTOR);
    if (!link) return;
    event.preventDefault();
    open(link);
  });

  overlay.querySelector('.lightbox__backdrop').addEventListener('click', close);
  closeButton.addEventListener('click', close);
  prevButton.addEventListener('click', () => show(index - 1));
  nextButton.addEventListener('click', () => show(index + 1));

  document.addEventListener('keydown', (event) => {
    if (overlay.hidden) return;
    if (event.key === 'Escape') close();
    else if (event.key === 'ArrowLeft' && links.length > 1) show(index - 1);
    else if (event.key === 'ArrowRight' && links.length > 1) show(index + 1);
  });
}
