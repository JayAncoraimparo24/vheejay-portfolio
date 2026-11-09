import { el } from '../js/dom.js';
import { skillCategories } from '../data/skills.js';

/**
 * Slowly scrolling strip of the tools listed in the Skills section.
 * Decorative only (hidden from screen readers), since the same list is in Skills.
 */
export function createToolsMarquee() {
  const tools = skillCategories.find((category) => category.id === 'tools')?.items ?? [];
  if (!tools.length) return null;

  const makeGroup = () =>
    el('ul', { class: 'marquee__group' }, tools.map((name) => el('li', { class: 'marquee__item', text: name })));

  // Two identical groups: the track moves by exactly one group width, so the loop is seamless.
  return el(
    'div',
    { class: 'marquee', 'aria-hidden': 'true' },
    el('div', { class: 'marquee__track' }, makeGroup(), makeGroup()),
  );
}
