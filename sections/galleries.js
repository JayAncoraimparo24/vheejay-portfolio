import { el } from '../js/dom.js';
import { uiuxShowcase, figmaLinks, graphicFigmaLinks, graphicDesignShowcase, photographyShowcase, itSupportShowcase } from '../data/showcases.js';
import { createSection } from '../components/section.js';
import { createTabs } from '../components/tabs.js';
import { icon } from '../components/icons.js';
import { mediaFrame } from '../components/media.js';

/**
 * Photo galleries keep each picture's own proportions (masonry columns, no cropping)
 * and open the picture at full size when clicked.
 */
const tile = ({ title, src, ratio }) => mediaFrame({ src, alt: title, label: title, caption: title, ratio: ratio ?? '4 / 3', openFull: true });

const createGallery = (items) => el('div', { class: 'photo-masonry' }, items.map(tile));

/**
 * A row of small, equal chips that open the Figma files in a new tab.
 * Each chip: a design icon on the left, the name, and an "opens in a new tab" arrow on the right.
 */
function createFigmaButtons(links) {
  if (!links.length) return null; // no links yet: show no empty row
  return el(
    'div',
    { class: 'figma-links' },
    el('span', { class: 'figma-links__label', text: 'Figma files' }),
    el(
      'ul',
      { class: 'figma-links__list' },
      links.map(({ label, url }) =>
        el(
          'li',
          {},
          el(
            'a',
            { class: 'figma-chip', href: url, target: '_blank', rel: 'noopener noreferrer', 'aria-label': `${label} (opens in Figma, new tab)` },
            icon('layout', 16),
            el('span', { text: label }),
            icon('external', 15),
          ),
        ),
      ),
    ),
  );
}

/**
 * One "Work Gallery" section with a tab for each kind of work.
 * The tab ids double as link targets, so #photography etc. open the right tab.
 */
export function createWorkGallery() {
  return createSection(
    {
      id: 'work-gallery',
      nav: 'projects',
      eyebrow: 'Gallery',
      title: 'Work Gallery',
      intro: 'Design, photography, and IT support work. Pick a tab to browse.',
      tone: 'tint',
    },
    createTabs({
      label: 'Work categories',
      tabs: [
        {
          id: 'ui-ux-showcase',
          label: 'UI/UX Design',
          icon: 'layout',
          content: [createFigmaButtons(figmaLinks), createGallery(uiuxShowcase)],
        },
        {
          id: 'graphic-design',
          label: 'Graphic Design',
          icon: 'palette',
          content: [createFigmaButtons(graphicFigmaLinks), createGallery(graphicDesignShowcase)],
        },
        { id: 'photography', label: 'Photography', icon: 'camera', content: createGallery(photographyShowcase) },
        { id: 'it-support-showcase', label: 'IT Support', icon: 'headset', content: createGallery(itSupportShowcase) },
      ],
    }),
  );
}
