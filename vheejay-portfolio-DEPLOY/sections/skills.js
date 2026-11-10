import { el } from '../js/dom.js';
import { skillCategories } from '../data/skills.js';
import { createSection } from '../components/section.js';
import { skillCard } from '../components/skillCard.js';

export function createSkills() {
  return createSection(
    { id: 'skills', eyebrow: 'Skills', title: 'Technical Skills', tone: 'tint' },
    el('div', { class: 'grid grid--skills' }, skillCategories.map(skillCard)),
  );
}
