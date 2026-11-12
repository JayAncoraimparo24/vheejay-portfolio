import { el } from './dom.js';
import { readEdits, writeEdits, clearAllEdits } from './editStorage.js';
import { initImageEditing } from './imageEdit.js';
import { initLinkEditing } from './linkEdit.js';

/**
 * In-page editing: toggle "Edit text", then click text to type, an image to replace it,
 * or a contact row to change its link. Edits are saved in this browser (localStorage).
 * A text edit is applied only while the original text still matches, so changing the
 * data files never shows stale edits.
 */
const EDITABLE_SELECTOR = 'h1, h2, h3, p, li, dt, dd, figcaption, strong, span';
const EXCLUDED_SELECTOR = '.site-header, form, svg, .edit-toolbar, .skip-link, .marquee, .lightbox';
const EDITING_CLASS = 'is-editing-text';
const HELP_TEXT =
  'Click text to type. Click an image to replace it. Click a contact row to change its link. Saved in this browser.';

function findEditableElements() {
  return [...document.querySelectorAll(EDITABLE_SELECTOR)].filter(
    (node) => !node.closest(EXCLUDED_SELECTOR) && node.children.length === 0 && node.textContent.trim() !== '',
  );
}

function applySavedText(elements, originals) {
  const edits = readEdits('text');
  const entries = Object.values(edits).filter(Boolean);
  const occurrences = (text) => originals.filter((original) => original === text).length;
  elements.forEach((node, index) => {
    // Prefer the entry saved at this position. Otherwise look for one saved for the same
    // original text, so removing an element from the page does not orphan later edits.
    // That fallback is only safe when the text is unique: repeated labels such as
    // "Role: " must never receive an edit that was made on a different copy.
    const atIndex = edits[index];
    let saved = atIndex?.original === originals[index] ? atIndex : null;
    if (!saved && occurrences(originals[index]) === 1) {
      saved = entries.find((entry) => entry.original === originals[index]);
    }
    if (saved) node.textContent = saved.text;
  });
}

function setEditable(elements, enabled) {
  document.body.classList.toggle(EDITING_CLASS, enabled);
  elements.forEach((node) => {
    if (enabled) node.setAttribute('contenteditable', 'true');
    else node.removeAttribute('contenteditable');
  });
}

function bindTextEditing(elements, originals) {
  elements.forEach((node, index) => {
    node.addEventListener('input', () => {
      const edits = readEdits('text');
      edits[index] = { original: originals[index], text: node.textContent };
      writeEdits('text', edits);
    });
    node.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && node.isContentEditable) {
        event.preventDefault();
        node.blur();
      }
    });
    node.addEventListener('paste', (event) => {
      if (!node.isContentEditable) return;
      event.preventDefault();
      document.execCommand('insertText', false, event.clipboardData.getData('text/plain'));
    });
  });
}

function createToolbar({ onToggle, onReset }) {
  const status = el('span', { class: 'edit-toolbar__status', role: 'status' });
  const toggle = el('button', { type: 'button', class: 'edit-toolbar__btn', 'aria-pressed': 'false', text: 'Edit text' });
  const reset = el('button', { type: 'button', class: 'edit-toolbar__btn edit-toolbar__btn--ghost', text: 'Reset edits' });

  toggle.addEventListener('click', () => {
    const enabled = toggle.getAttribute('aria-pressed') !== 'true';
    toggle.setAttribute('aria-pressed', String(enabled));
    toggle.textContent = enabled ? 'Done editing' : 'Edit text';
    status.textContent = enabled ? HELP_TEXT : '';
    onToggle(enabled);
  });
  reset.addEventListener('click', onReset);

  return el('div', { class: 'edit-toolbar' }, status, toggle, reset);
}

const LOCAL_HOSTS = ['localhost', '127.0.0.1', '[::1]', '::1'];

/**
 * Editing is for the owner. It is available while running on this computer (localhost),
 * or on a published copy when the address ends with ?edit. Visitors never see the toolbar.
 */
function isEditingAllowed() {
  return LOCAL_HOSTS.includes(window.location.hostname) || new URLSearchParams(window.location.search).has('edit');
}

export function initEditMode() {
  if (!isEditingAllowed()) return;

  const elements = findEditableElements();
  const originals = elements.map((node) => node.textContent);

  applySavedText(elements, originals);
  bindTextEditing(elements, originals);
  // Run after text indexes are captured: link edits replace elements and would shift them.
  initImageEditing();
  initLinkEditing();

  const toolbar = createToolbar({
    onToggle: (enabled) => setEditable(elements, enabled),
    onReset: () => {
      if (!window.confirm('Remove all edits (text, images, links) on this page and restore the originals?')) return;
      clearAllEdits();
      window.location.reload();
    },
  });
  document.body.append(toolbar);
}
