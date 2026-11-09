const STORAGE_KEY = 'portfolio-theme';
const NIGHT_STARTS = 18; // 6 pm
const NIGHT_ENDS = 6; // 6 am
const META_COLORS = { light: '#0F172A', dark: '#0B1326' };

function readStored() {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null; // storage can be blocked; the page still works
  }
}

/** A saved choice wins. Otherwise the page follows the visitor's clock: dark at night. */
export function getInitialTheme(now = new Date()) {
  const stored = readStored();
  if (stored) return stored;
  const hour = now.getHours();
  return hour >= NIGHT_STARTS || hour < NIGHT_ENDS ? 'dark' : 'light';
}

export function currentTheme() {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
}

export function applyTheme(theme) {
  document.documentElement.dataset.theme = theme;
  document.querySelector('meta[name="theme-color"]')?.setAttribute('content', META_COLORS[theme]);
}

const FADE_CLASS = 'theme-fade';
const FADE_MS = 500;
let fadeTimer = 0;

/** Applies and remembers the visitor's choice. Colours glide for a moment (see interactions.css). */
export function setTheme(theme) {
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    document.documentElement.classList.add(FADE_CLASS);
    window.clearTimeout(fadeTimer);
    fadeTimer = window.setTimeout(() => document.documentElement.classList.remove(FADE_CLASS), FADE_MS);
  }
  applyTheme(theme);
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    /* choice just won't be remembered */
  }
}
