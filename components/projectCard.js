import { el } from '../js/dom.js';
import { projectUrl } from '../js/config.js';
import { icon } from './icons.js';
import { mediaFrame } from './media.js';
import { tagList } from './tag.js';
import { withSnakeBorder } from './snakeBorder.js';

const MAX_CARD_TOOLS = 3; // the project page lists every tool

export function projectCard(project) {
  const cover = project.screenshots[0];
  // Cards stay clean: the "tools to be added" note only appears on the detail page.
  const hidden = project.tools.length - MAX_CARD_TOOLS;
  const shownTools = hidden > 0 ? [...project.tools.slice(0, MAX_CARD_TOOLS), `+${hidden} more`] : project.tools;
  const tools = shownTools.length ? tagList(shownTools) : null;

  return withSnakeBorder(el(
    'article',
    { class: 'card project-card' },
    mediaFrame({
      src: cover?.src,
      alt: `${project.title} screenshot`,
      label: 'Project screenshot', // the title is right below, so do not repeat it here
    }),
    el('span', { class: 'project-card__badge', 'aria-hidden': 'true', text: String(project.number).padStart(2, '0') }),
    el(
      'div',
      { class: 'project-card__body' },
      // The number is already shown in the badge on the picture, so the label only carries the type
      project.type ? el('p', { class: 'eyebrow', text: project.type }) : null,
      el('h3', { class: 'card__title', text: project.title }),
      el('p', { class: 'project-card__overview', text: project.overview }),
      el('p', { class: 'project-card__role' }, el('strong', { text: 'Role: ' }), el('span', { text: project.role })),
      tools,
      el(
        'a',
        { class: 'link-arrow', href: projectUrl(project.id), 'aria-label': `View details: ${project.title}` },
        'View details',
        icon('arrow', 18),
      ),
    ),
  ));
}
