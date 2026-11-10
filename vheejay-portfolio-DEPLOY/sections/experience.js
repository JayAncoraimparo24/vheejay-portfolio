import { el } from '../js/dom.js';
import { experience, education } from '../data/experience.js';
import { createSection } from '../components/section.js';
import { timelineItem } from '../components/timelineItem.js';
export function createExperience() {
  return createSection(
    { id: 'experience', eyebrow: 'Experience', title: 'Work Experience' },
    el('div', { class: 'timeline' }, experience.map(timelineItem)),
  );
}

export function createEducation() {
  const details = education.details.map(({ label, value }) =>
    el('li', {}, el('strong', { text: `${label}: ` }), el('span', { text: value })),
  );

  return createSection(
    { id: 'education', nav: 'experience', eyebrow: 'Education', title: 'Education', tone: 'tint' },
    el(
      'article',
      { class: 'card education-card' },
      el('p', { class: 'timeline__period', text: education.period }),
      el('h3', { class: 'card__title', text: education.school }),
      el('p', { class: 'timeline__meta', text: education.location }),
      el('p', { class: 'timeline__position', text: education.degree }),
      el('ul', { class: 'bullet-list' }, details),
    ),
  );
}
