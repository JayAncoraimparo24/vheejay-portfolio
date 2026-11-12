import { el } from './dom.js';
import { createNavbar } from '../components/navbar.js';
import { createFooter } from '../components/footer.js';
import { createScrollProgress } from '../components/scrollProgress.js';
import { createHero } from '../sections/hero.js';
import { createAbout } from '../sections/about.js';
import { createSkills } from '../sections/skills.js';
import { createProjects } from '../sections/projects.js';
import { createWorkGallery } from '../sections/galleries.js';
import { createExperience, createEducation } from '../sections/experience.js';
import { createContact } from '../sections/contact.js';
import { initReveal } from './reveal.js';
import { initScrollSpy } from './scrollSpy.js';
import { initEditMode } from './editMode.js';
import { initScrollState } from './scrollState.js';
import { initLightbox } from '../components/lightbox.js';
import { createToolsMarquee } from '../sections/toolsMarquee.js';

const SECTION_FACTORIES = [
  createHero,
  createToolsMarquee,
  createAbout,
  createSkills,
  createProjects,
  createWorkGallery,
  createExperience,
  createEducation,
  createContact,
];

function mountPage() {
  document.body.prepend(createScrollProgress());
  document.getElementById('site-header').replaceWith(createNavbar({ isHome: true }));
  document.getElementById('main').append(...SECTION_FACTORIES.map((create) => create()).filter(Boolean));
  document.getElementById('site-footer').replaceWith(createFooter());
  initReveal();
  initScrollSpy();
  initLightbox();
  initEditMode();
  initScrollState();
  scrollToHash();
}

/**
 * The page is built by JavaScript, so the browser cannot jump to #projects (or any #section)
 * by itself when arriving from the project page's "Back" link. Do it here, instantly.
 */
function scrollToHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  const target = id && document.getElementById(id);
  if (!target) return;
  requestAnimationFrame(() => {
    const top = target.getBoundingClientRect().top + window.scrollY - 8;
    window.scrollTo({ top, behavior: 'instant' });
  });
}

try {
  mountPage();
} catch (error) {
  console.error('Failed to render the portfolio:', error);
  document.getElementById('main').replaceChildren(
    el('p', { class: 'container error-message', text: 'Something went wrong while loading this page. Please refresh.' }),
  );
}
