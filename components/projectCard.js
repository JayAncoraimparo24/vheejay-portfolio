import { el } from '../js/dom.js';
import { projectUrl, thumbOf } from '../js/config.js';
import { icon } from './icons.js';
import { mediaFrame } from './media.js';
import { tagList } from './tag.js';
import { withSnakeBorder } from './snakeBorder.js';

const MAX_CARD_TOOLS = 3; // the project page lists every tool
const MAX_CARD_ROLES = 2; // the project page shows the full role

/**
 * The role line as small chips ("Role" label + up to two roles + "+N more").
 * A role is split at the commas in data/projects.js, so a role is never cut in the middle of a word.
 */
function roleChips(role) {
  const parts = role.split(',').map((part) => part.trim()).filter(Boolean);
  const shown = parts.slice(0, MAX_CARD_ROLES);
  const hidden = parts.length - shown.length;
  const labels = hidden > 0 ? [...shown, `+${hidden} more`] : shown;

  return el(
    'div',
    { class: 'project-card__roles', title: role },
    el('span', { class: 'project-card__roles-label', text: 'Role' }),
    el(
      'ul',
      { class: 'role-list' },
      labels.map((text) => el('li', { class: /^\+\d+ more$/.test(text) ? 'role role--more' : 'role', text })),
    ),
  );
}

export function projectCard(project) {
  const cover = project.screenshots[0];
  // Cards stay clean: the "tools to be added" note only appears on the detail page.
  const hidden = project.tools.length - MAX_CARD_TOOLS;
  const shownTools = hidden > 0 ? [...project.tools.slice(0, MAX_CARD_TOOLS), `+${hidden} more`] : project.tools;
  const tools = shownTools.length ? tagList(shownTools) : null;

  const card = el(
    'article',
    { class: 'card project-card' },
    mediaFrame({
      src: thumbOf(cover?.src), // a small copy for the card; the project page has the full pictures
      fullSrc: cover?.src,
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
      roleChips(project.role),
      tools,
      el(
        'a',
        { class: 'link-arrow', href: projectUrl(project.id), 'aria-label': `View details: ${project.title}` },
        'View details',
        icon('arrow', 18),
      ),
    ),
  );

  // The moving line around the card follows the card's rounded corners (18px)
  return withSnakeBorder(card, { radius: 18 });
}
