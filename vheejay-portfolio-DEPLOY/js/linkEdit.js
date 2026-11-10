import { el } from './dom.js';
import { readEdits, writeEdits, isEditing } from './editStorage.js';

const ROW_SELECTOR = '.contact__row';
const ALLOWED_PROTOCOLS = ['http:', 'https:', 'mailto:', 'tel:'];

function isAllowedHref(href) {
  try {
    return ALLOWED_PROTOCOLS.includes(new URL(href, window.location.href).protocol);
  } catch {
    return false;
  }
}

function createValue({ href, text }) {
  if (!href) return el('span', { class: 'placeholder-note', text });
  const isWeb = href.startsWith('http');
  return el('a', { href, text, ...(isWeb && { target: '_blank', rel: 'noopener noreferrer' }) });
}

function currentValue(row) {
  const node = row.lastElementChild.lastElementChild;
  return { href: node.getAttribute('href') ?? '', text: node.textContent };
}

function showValue(row, value) {
  row.lastElementChild.lastElementChild.replaceWith(createValue(value));
}

function askForLink(row) {
  const { href, text } = currentValue(row);
  const newHref = window.prompt('Link address (https://..., mailto:..., or tel:...). Leave empty for no link.', href);
  if (newHref === null) return null;
  const trimmed = newHref.trim();
  if (trimmed && !isAllowedHref(trimmed)) {
    window.alert('Only http(s), mailto, and tel links are allowed.');
    return null;
  }
  const newText = window.prompt('Text to show', text);
  if (newText === null || newText.trim() === '') return null;
  return { href: trimmed, text: newText.trim() };
}

/** Lets the user click a contact row (while editing) to change its link and label. */
export function initLinkEditing() {
  const rows = [...document.querySelectorAll(ROW_SELECTOR)];
  const saved = readEdits('link');

  rows.forEach((row, index) => {
    if (saved[index]) showValue(row, saved[index]);

    row.addEventListener(
      'click',
      (event) => {
        if (!isEditing()) return;
        event.preventDefault();
        const value = askForLink(row);
        if (!value) return;
        const edits = readEdits('link');
        edits[index] = value;
        writeEdits('link', edits);
        showValue(row, value);
      },
      true,
    );
  });
}
