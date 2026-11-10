import { el } from '../js/dom.js';
import { projects } from '../data/projects.js';
import { createSection } from '../components/section.js';
import { projectCard } from '../components/projectCard.js';
import { GALLERY_ID, selectGalleryTab } from './galleries.js';

// The gallery tabs, so a visitor can jump straight to one from here
const MORE_WORK = [
  { id: 'ui-ux', label: 'UI/UX Design' },
  { id: 'graphic-design', label: 'Graphic Design' },
  { id: 'photography', label: 'Photography' },
  { id: 'it-support', label: 'IT Support' },
];

function createMoreWork() {
  return el(
    'nav',
    { class: 'jump-links', 'aria-label': 'More of my work' },
    el('span', { class: 'jump-links__label', text: 'More of my work:' }),
    MORE_WORK.map(({ id, label }) =>
      el('a', {
        class: 'jump-links__link',
        href: `#${GALLERY_ID}`,
        text: label,
        on: { click: () => selectGalleryTab(id) }, // the browser then scrolls to the gallery
      }),
    ),
  );
}

export function createProjects() {
  return createSection(
    {
      id: 'projects',
      eyebrow: 'Projects',
      title: 'Featured Projects',
      intro: 'Select a project to see its overview, tools, key features, and my contributions.',
    },
    el('div', { class: 'grid grid--projects' }, projects.map(projectCard)),
    createMoreWork(),
  );
}
