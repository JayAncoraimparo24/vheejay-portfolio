import { el } from '../js/dom.js';
import { uiuxShowcase, figmaLinks, graphicFigmaLinks, graphicDesignShowcase, photographyShowcase, itSupportShowcase } from '../data/showcases.js';
import { createSection } from '../components/section.js';
import { createTabs } from '../components/tabs.js';
import { button } from '../components/button.js';
import { mediaFrame } from '../components/media.js';

/**
 * Photo galleries keep each picture's own proportions (masonry columns, no cropping)
 * and open the picture at full size when clicked.
 */
const tile = ({ title, src, ratio }) => mediaFrame({ src, alt: title, label: title, caption: title, ratio: ratio ?? '4 / 3', openFull: true });

const createGallery = (items) => el('div', { class: 'photo-masonry' }, items.map(tile));

function createFigmaButtons(links) {
  if (!links.length) return null; // no links yet: show no empty row
  return el(
    'div',
    { class: 'section__actions' },
    links.map(({ label, url }, index) =>
      button({ label, href: url, iconName: 'arrow', external: true, variant: index === 0 ? 'primary' : 'secondary' }),
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
