// localStorage helpers for in-page edits. Every key is scoped to the current page.
const PAGE_SCOPE = `${window.location.pathname}${window.location.search}`;
const KINDS = ['text', 'image', 'link'];

const keyFor = (kind) => `portfolio-${kind}-edits:${PAGE_SCOPE}`;

export function readEdits(kind) {
  try {
    return JSON.parse(localStorage.getItem(keyFor(kind))) ?? {};
  } catch {
    return {};
  }
}

/** Returns false when the browser refuses to store the data (for example, storage full). */
export function writeEdits(kind, edits) {
  try {
    localStorage.setItem(keyFor(kind), JSON.stringify(edits));
    return true;
  } catch (error) {
    console.warn(`Could not save ${kind} edits:`, error);
    return false;
  }
}

export function clearAllEdits() {
  try {
    KINDS.forEach((kind) => localStorage.removeItem(keyFor(kind)));
  } catch (error) {
    console.warn('Could not clear edits:', error);
  }
}

export const isEditing = () => document.body.classList.contains('is-editing-text');
