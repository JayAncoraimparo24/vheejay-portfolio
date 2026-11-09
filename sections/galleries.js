import { el } from '../js/dom.js';
import { uiuxShowcase, figmaLinks, graphicDesignShowcase, photographyShowcase, itSupportShowcase } from '../data/showcases.js';
import { createSection } from '../components/section.js';
import { button } from '../components/button.js';
import { mediaFrame } from '../components/media.js';

/**
 * Photo galleries keep each picture's own proportions (masonry columns, no cropping)
 * and open the picture at full size when clicked.
 */
const tile = ({ title, src, ratio }) =>
  mediaFrame({ src, alt: title, label: title, caption: title, ratio: ratio ?? '4 / 3', openFull: true });

const createGallery = (items) => el('div', { class: 'photo-masonry' }, items.map(tile));

function createFigmaButtons() {
  return el(
    'div',
    { class: 'section__actions' },
    figmaLinks.map(({ label, url }, index) =>
      button({ label, href: url, iconName: 'arrow', external: true, variant: index === 0 ? 'primary' : 'secondary' }),
    ),
  );
}

/** One tab per kind of work. Add a tab here and it appears on the page. */
const TABS = [
  {
    id: 'ui-ux',
    label: 'UI/UX Design',
    intro: 'Design work built in Figma, including the GECAR Calendar 2027 souvenir design.',
    items: uiuxShowcase,
    extra: createFigmaButtons,
  },
  {
    id: 'graphic-design',
    label: 'Graphic Design',
    intro: 'Posters, logos, covers, and branding I have designed.',
    items: graphicDesignShowcase,
  },
  {
    id: 'photography',
    label: 'Photography',
    intro: 'A collection of photographs I have taken.',
    items: photographyShowcase,
  },
  {
    id: 'it-support',
    label: 'IT Support',
    intro: 'Hands-on IT support work: computer and printer maintenance, network racks and cabling, and workstation setup.',
    items: itSupportShowcase,
  },
];

export const GALLERY_ID = 'gallery';

const tabId = (id) => `gallery-tab-${id}`;
const panelId = (id) => `gallery-panel-${id}`;

/** Shows the tab with this id (or the first tab) and returns whether it exists. */
export function selectGalleryTab(id, { focus = false } = {}) {
  const tabs = [...document.querySelectorAll('.gallery-tabs__tab')];
  const target = tabs.find((tab) => tab.dataset.tab === id);
  if (!target) return false;
  tabs.forEach((tab) => {
    const selected = tab === target;
    tab.setAttribute('aria-selected', String(selected));
    tab.tabIndex = selected ? 0 : -1;
    document.getElementById(panelId(tab.dataset.tab)).hidden = !selected;
  });
  if (focus) target.focus();
  return true;
}

function createTabList() {
  const list = el('div', { class: 'gallery-tabs', role: 'tablist', 'aria-label': 'Kinds of work' });
  TABS.forEach(({ id, label }, index) => {
    list.append(
      el('button', {
        class: 'gallery-tabs__tab',
        type: 'button',
        role: 'tab',
        id: tabId(id),
        'data-tab': id,
        'aria-controls': panelId(id),
        'aria-selected': String(index === 0),
        tabindex: index === 0 ? '0' : '-1',
        text: label,
        on: { click: () => selectGalleryTab(id) },
      }),
    );
  });

  // Arrow keys, Home and End move between tabs, as people expect from tabs
  list.addEventListener('keydown', (event) => {
    const keys = { ArrowRight: 1, ArrowLeft: -1 };
    const current = TABS.findIndex(({ id }) => id === document.activeElement?.dataset.tab);
    if (current < 0) return;
    let next = null;
    if (event.key in keys) next = (current + keys[event.key] + TABS.length) % TABS.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TABS.length - 1;
    if (next === null) return;
    event.preventDefault();
    selectGalleryTab(TABS[next].id, { focus: true });
  });
  return list;
}

function createPanel({ id, intro, items, extra }, index) {
  return el(
    'div',
    {
      class: 'gallery-panel',
      role: 'tabpanel',
      id: panelId(id),
      'aria-labelledby': tabId(id),
      hidden: index !== 0,
    },
    el('p', { class: 'section__intro gallery-panel__intro', text: intro }),
    createGallery(items),
    extra ? extra() : null,
  );
}

export function createGalleryShowcase() {
  return createSection(
    {
      id: GALLERY_ID,
      nav: 'projects',
      eyebrow: 'Gallery',
      title: 'My Work Gallery',
      intro: 'Choose a tab to browse my design, graphics, photography, and IT support work.',
      tone: 'tint',
    },
    createTabList(),
    TABS.map(createPanel),
  );
}
