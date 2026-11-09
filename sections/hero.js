import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';
import { button } from '../components/button.js';
import { icon } from '../components/icons.js';
import { createSnakeBorder } from '../components/snakeBorder.js';
import { createFlipCard } from '../components/flipCard.js';
import { siteUrl } from '../js/config.js';

/** Back of the portrait card: a second picture with a short label. */
function createPortraitBack({ src, alt, caption }) {
  return el(
    'div',
    { class: 'hero__back' },
    el('img', { class: 'hero__back-img', src: siteUrl(src), alt, loading: 'lazy' }),
    el('span', { class: 'hero__back-caption', text: caption }),
  );
}

function createProfileImage() {
  if (profile.photo) {
    const front = el(
      'div',
      { class: 'hero__photo hero__photo--filled' },
      el('img', { class: 'slot-image', src: siteUrl(profile.photo), alt: `Portrait of ${profile.name}` }),
      createSnakeBorder({ radius: 16 }),
    );
    if (!profile.photoBack) return front;
    return createFlipCard({
      front,
      back: createPortraitBack(profile.photoBack),
      label: 'Flip the photo to see the other side',
      hint: 'Tap the photo to flip it',
    });
  }
  return el(
    'div',
    { class: 'hero__photo', role: 'img', 'aria-label': 'Profile photo placeholder' },
    createSnakeBorder({ radius: 16 }),
    el('span', { class: 'hero__initials', text: profile.initials }),
    el('span', { class: 'hero__photo-hint', text: 'Profile photo placeholder' }),
  );
}

export function createHero() {
  return el(
    'section',
    { class: 'hero', id: 'home', 'data-nav': 'home', 'aria-labelledby': 'hero-title' },
    el(
      'div',
      { class: 'container hero__inner' },
      el(
        'div',
        { class: 'hero__content' },
        el('p', { class: 'eyebrow', text: 'Portfolio' }),
        el('h1', { class: 'hero__title', id: 'hero-title', text: profile.name }),
        profile.verse
          ? el(
              'p',
              { class: 'hero__verse' },
              el('q', { text: profile.verse.text }),
              el('cite', { text: profile.verse.reference }),
            )
          : null,
        profile.quote
          ? el(
              'blockquote',
              { class: 'hero__quote' },
              el('p', { text: profile.quote.text }),
              el('footer', { text: `— ${profile.quote.author}` }),
            )
          : null,
        el('p', { class: 'hero__roles', text: profile.roles.join(' | ') }),
        el(
          'div',
          { class: 'hero__actions' },
          button({ label: 'View My Work', href: '#projects', iconName: 'arrow' }),
          button({ label: 'About Me', href: '#about', variant: 'secondary' }),
        ),
        el('p', { class: 'hero__location' }, icon('pin', 18), el('span', { text: profile.location })),
      ),
      createProfileImage(),
    ),
    el('a', { class: 'scroll-cue', href: '#about', 'aria-label': 'Scroll down to the About section' }),
  );
}
