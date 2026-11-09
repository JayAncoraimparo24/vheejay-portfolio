import { el } from '../js/dom.js';

/**
 * Standard page section with heading. `nav` maps the section to a navbar link for scroll-spy.
 * tone: 'light' | 'tint' | 'dark'
 */
export function createSection({ id, nav = id, eyebrow, title, intro, tone = 'light' }, ...content) {
  const header = el(
    'header',
    { class: 'section__header' },
    eyebrow ? el('p', { class: 'eyebrow', text: eyebrow }) : null,
    el('h2', { class: 'section__title', id: `${id}-title`, text: title }),
    intro ? el('p', { class: 'section__intro', text: intro }) : null,
  );

  return el(
    'section',
    {
      class: `section section--${tone}`,
      id,
      'data-nav': nav,
      'aria-labelledby': `${id}-title`,
    },
    el('div', { class: 'container' }, header, content),
  );
}

/** Short note shown wherever real content has not been provided yet. */
export function placeholderNote(text) {
  return el('p', { class: 'placeholder-note', text });
}
