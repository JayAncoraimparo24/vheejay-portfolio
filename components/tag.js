import { el } from '../js/dom.js';

export const tag = (text) => el('li', { class: 'tag', text });

export function tagList(items, modifier = '') {
  return el('ul', { class: `tag-list ${modifier}`.trim() }, items.map(tag));
}
