import { el } from '../js/dom.js';
import { icon } from './icons.js';

/**
 * Accessible tabs: a row of buttons that switches between panels.
 * Each tab is `{ id, label, content }`. Left/Right/Home/End move between tabs.
 * A link to `#<tab id>` anywhere on the page opens that tab and scrolls to it.
 */
export function createTabs({ label, tabs }) {
  const buttons = [];
  const panels = [];

  const select = (index, { focus = false } = {}) => {
    buttons.forEach((button, i) => {
      const active = i === index;
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
    });
    if (focus) buttons[index].focus();
  };

  const tablist = el('div', { class: 'tabs__list', role: 'tablist', 'aria-label': label });

  tabs.forEach(({ id, label: tabLabel, icon: iconName, content }, index) => {
    const button = el(
      'button',
      {
        class: 'tabs__tab',
        type: 'button',
        role: 'tab',
        id: `tab-${id}`,
        'aria-controls': id,
        on: { click: () => select(index) },
      },
      iconName ? icon(iconName, 18) : null,
      tabLabel,
    );
    const panel = el('div', { class: 'tabs__panel', role: 'tabpanel', id, 'aria-labelledby': `tab-${id}` }, content);
    buttons.push(button);
    panels.push(panel);
    tablist.append(button);
  });

  tablist.addEventListener('keydown', (event) => {
    const current = buttons.indexOf(document.activeElement);
    if (current < 0) return;
    const last = buttons.length - 1;
    const moves = {
      ArrowRight: current === last ? 0 : current + 1,
      ArrowLeft: current === 0 ? last : current - 1,
      Home: 0,
      End: last,
    };
    if (!(event.key in moves)) return;
    event.preventDefault();
    select(moves[event.key], { focus: true });
  });

  const root = el('div', { class: 'tabs' }, tablist, panels);

  // Links like <a href="#photography"> open that tab
  const openFromHash = (hash, { scroll }) => {
    const index = tabs.findIndex(({ id }) => `#${id}` === hash);
    if (index < 0) return false;
    select(index);
    if (scroll) root.scrollIntoView({ behavior: 'smooth', block: 'start' });
    return true;
  };

  document.addEventListener('click', (event) => {
    const link = event.target.closest?.('a[href^="#"]');
    if (link && openFromHash(link.getAttribute('href'), { scroll: true })) event.preventDefault();
  });
  window.addEventListener('hashchange', () => openFromHash(window.location.hash, { scroll: true }));

  select(0);
  // Deep links such as index.html#photography: wait until the page has been built
  queueMicrotask(() => openFromHash(window.location.hash, { scroll: false }));

  return root;
}
