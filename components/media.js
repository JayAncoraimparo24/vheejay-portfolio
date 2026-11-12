import { el } from '../js/dom.js';
import { siteUrl } from '../js/config.js';
import { icon } from './icons.js';
function createPlaceholder(label) {
  return el(
    'div',
    { class: 'media__placeholder' },
    icon('image', 28),
    el('span', { class: 'media__label', text: label }),
    el('span', { class: 'media__hint', text: 'Image placeholder' }),
  );
}

/**
 * Figure that shows an image when `src` is set and loads, otherwise a placeholder.
 */
export function mediaFrame({ src, alt, label, caption, ratio = '16 / 10', openFull = false }) {
  const frame = el('figure', { class: 'media', style: `--media-ratio: ${ratio}` });
  const placeholder = createPlaceholder(label ?? alt);
  const box = el('div', { class: 'media__box' });

  if (src) {
    const image = el('img', { class: 'media__img', src: siteUrl(src), alt, loading: 'lazy', decoding: 'async' });
    image.addEventListener('error', () => box.replaceChildren(placeholder));
    // With openFull, clicking the picture opens it at full size in a new tab.
    box.append(
      openFull
        ? el(
            'a',
            { class: 'media__link', href: siteUrl(src), target: '_blank', rel: 'noopener noreferrer', 'aria-label': `Open full image: ${alt}` },
            image,
          )
        : image,
    );
  } else {
    box.append(placeholder);
  }

  frame.append(box);
  if (caption) frame.append(el('figcaption', { class: 'media__caption', text: caption }));
  return frame;
}
