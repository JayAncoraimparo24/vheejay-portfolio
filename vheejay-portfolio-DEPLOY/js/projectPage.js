import { el } from './dom.js';
import { siteUrl, projectUrl } from './config.js';
import { projects } from '../data/projects.js';
import { profile } from '../data/profile.js';
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { icon } from '../components/icons.js';
import { mediaFrame } from '../components/media.js';
import { tagList } from '../components/tag.js';
import { placeholderNote } from '../components/section.js';
import { initReveal } from './reveal.js';
import { initLightbox } from '../components/lightbox.js';
import { initEditMode } from './editMode.js';

const PENDING_TEXT = 'Details to be added.';

function detailBlock(title, content) {
  return el('section', { class: 'detail-block' }, el('h2', { class: 'detail-block__title', text: title }), content);
}

function bulletList(items) {
  return items.length
    ? el('ul', { class: 'bullet-list' }, items.map((text) => el('li', { text })))
    : placeholderNote(PENDING_TEXT);
}

function metaItem(label, value) {
  return el('div', { class: 'meta__item' }, el('dt', { text: label }), el('dd', {}, value ?? placeholderNote('To be added')));
}

function createHeader(project) {
  return el(
    'header',
    { class: 'project-header' },
    el('a', { class: 'link-back', href: siteUrl('index.html#projects') }, icon('back', 18), 'Back to projects'),
    el('p', { class: 'eyebrow', text: `Project ${project.number}${project.type ? ` · ${project.type}` : ''}` }),
    el('h1', { class: 'project-header__title', text: project.title }),
    el(
      'dl',
      { class: 'meta' },
      metaItem('My role', project.role),
      metaItem('Date', project.date),
    ),
  );
}

function createAchievement(text) {
  return el('div', { class: 'achievement' }, icon('award', 22), el('p', { text }));
}

function createGallery(project, items = project.screenshots, ratio = '16 / 10') {
  return el(
    'div',
    { class: 'grid grid--gallery grid--shots' },
    items.map(({ src, caption, ratio: ownRatio }) =>
      mediaFrame({ src, alt: `${project.title} – ${caption}`, label: caption, caption, ratio: ownRatio ?? ratio, openFull: true }),
    ),
  );
}

function createPager(index) {
  const neighbour = (offset, label, className) => {
    const target = projects[index + offset];
    if (!target) return null;
    return el('a', { class: `pager__link ${className}`, href: projectUrl(target.id) }, el('span', { text: label }), target.title);
  };
  return el('nav', { class: 'pager', 'aria-label': 'Other projects' }, neighbour(-1, 'Previous', 'pager__prev'), neighbour(1, 'Next', 'pager__next'));
}

function createProjectBody(project, index) {
  return el(
    'div',
    { class: 'container project-page' },
    createHeader(project),
    project.achievement ? createAchievement(project.achievement) : null,
    detailBlock('Overview', el('p', { text: project.overview })),
    detailBlock('Screenshots', createGallery(project)),
    el(
      'div',
      { class: 'detail-columns' },
      // The tools block is left out when no tools are listed
      project.tools.length ? detailBlock('Tools used', tagList(project.tools)) : null,
      detailBlock('Key features', bulletList(project.features)),
    ),
    detailBlock('My contributions', bulletList(project.contributions)),
    project.photos?.length ? detailBlock('Team photos', createGallery(project, project.photos, '4 / 3')) : null,
    createPager(index),
  );
}

function createNotFound() {
  return el(
    'div',
    { class: 'container project-page' },
    el('a', { class: 'link-back', href: siteUrl('index.html#projects') }, icon('back', 18), 'Back to projects'),
    el('h1', { class: 'project-header__title', text: 'Project not found' }),
    el('p', { text: 'The project you are looking for does not exist.' }),
  );
}

function mountPage() {
  const projectId = new URLSearchParams(window.location.search).get('id');
  const index = projects.findIndex((project) => project.id === projectId);
  const found = index >= 0;

  document.title = found ? `${projects[index].title} | ${profile.name}` : `Project not found | ${profile.name}`;
  document.getElementById('site-header').replaceWith(createNavbar({ isHome: false }));
  document.getElementById('main').append(found ? createProjectBody(projects[index], index) : createNotFound());
  document.getElementById('site-footer').replaceWith(createFooter());
  initReveal();
  initLightbox();
  initEditMode();
}

mountPage();
