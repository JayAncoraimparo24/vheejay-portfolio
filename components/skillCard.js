import { el } from '../js/dom.js';
import { icon } from './icons.js';
import { tagList } from './tag.js';
export function skillCard({ title, icon: iconName, items }) {
  return el(
    'article',
    { class: 'card skill-card' },
    el('div', { class: 'card__icon' }, icon(iconName, 22)),
    el('h3', { class: 'card__title', text: title }),
    tagList(items),
  );
}
