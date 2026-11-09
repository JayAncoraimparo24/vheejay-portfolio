import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';
import { createSection } from '../components/section.js';

export function createAbout() {
  return createSection(
    { id: 'about', eyebrow: 'About', title: 'Professional Summary' },
    el('p', { class: 'about__summary', text: profile.summary }),
  );
}
