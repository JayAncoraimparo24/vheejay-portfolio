import { el } from './dom.js';
import { readEdits, writeEdits, isEditing } from './editStorage.js';

const SLOT_SELECTOR = '.media__box, .hero__photo';
const MAX_SIDE = 1000;
const JPEG_QUALITY = 0.8;

function loadImage(file) {
  return new Promise((resolve, reject) => {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(url);
      resolve(image);
    };
    image.onerror = () => {
      URL.revokeObjectURL(url);
      reject(new Error('Not a readable image'));
    };
    image.src = url;
  });
}

/** Shrinks the picture so it fits comfortably in browser storage. */
async function fileToDataUrl(file) {
  const image = await loadImage(file);
  const scale = Math.min(1, MAX_SIDE / Math.max(image.width, image.height));
  const canvas = document.createElement('canvas');
  canvas.width = Math.round(image.width * scale);
  canvas.height = Math.round(image.height * scale);
  canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
  return canvas.toDataURL('image/jpeg', JPEG_QUALITY);
}

/** The picture shipped in the page for this slot ('' when it is only a placeholder). */
function builtInSrc(slot) {
  if (slot.dataset.builtIn === undefined) {
    slot.dataset.builtIn = slot.querySelector(':scope > .slot-image')?.getAttribute('src') ?? '';
  }
  return slot.dataset.builtIn;
}

function showImage(slot, dataUrl) {
  slot.dataset.customImage = 'true';
  slot.querySelector(':scope > .slot-image')?.remove();
  slot.append(el('img', { class: 'slot-image', src: dataUrl, alt: '' }));
}

function pickFile() {
  return new Promise((resolve) => {
    const input = el('input', { type: 'file', accept: 'image/*' });
    input.addEventListener('change', () => resolve(input.files[0] ?? null));
    input.click();
  });
}

async function replaceImage(slot, index) {
  const file = await pickFile();
  if (!file) return;
  try {
    const dataUrl = await fileToDataUrl(file);
    const edits = readEdits('image');
    edits[index] = { original: builtInSrc(slot), data: dataUrl };
    if (!writeEdits('image', edits)) {
      window.alert('The browser storage is full, so this picture could not be saved. Try a smaller picture.');
      return;
    }
    showImage(slot, dataUrl);
  } catch (error) {
    console.error(error);
    window.alert('That file could not be read as a picture.');
  }
}

/** Lets the user click an image area (while editing) to replace it with their own picture. */
export function initImageEditing() {
  const slots = [...document.querySelectorAll(SLOT_SELECTOR)];
  const saved = readEdits('image');

  slots.forEach((slot, index) => {
    // An edit applies only while the slot's built-in picture is unchanged (like text edits).
    // Older edits were plain data URLs made when the slot had no built-in picture.
    const entry = saved[index];
    const savedOriginal = typeof entry === 'string' ? '' : entry?.original;
    const savedData = typeof entry === 'string' ? entry : entry?.data;
    if (savedData && savedOriginal === builtInSrc(slot)) showImage(slot, savedData);
    slot.addEventListener('click', (event) => {
      if (!isEditing()) return;
      event.preventDefault(); // do not open the full-size link while replacing
      replaceImage(slot, index);
    });
  });
}
