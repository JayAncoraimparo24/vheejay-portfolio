import { el } from '../js/dom.js';
import { placeholderNote } from './section.js';
/** One entry in the experience timeline. */
export function timelineItem(job) {
  const body = job.responsibilities.length
    ? el('ul', { class: 'bullet-list' }, job.responsibilities.map((text) => el('li', { text })))
    : placeholderNote('Responsibilities: to be announced.');

  return el(
    'article',
    { class: 'timeline__item' },
    el('p', { class: 'timeline__period', text: job.period }),
    el('h3', { class: 'card__title', text: job.company }),
    el('p', { class: 'timeline__meta', text: job.location }),
    el('p', { class: 'timeline__position', text: job.position }),
    job.note ? el('p', { class: 'timeline__note', text: job.note }) : null,
    body,
  );
}
