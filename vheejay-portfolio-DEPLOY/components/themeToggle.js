import { el } from '../js/dom.js';
import { currentTheme, setTheme } from '../js/theme.js';
import { icon } from './icons.js';

/** Sun/moon button that switches between the light and dark theme. */
export function createThemeToggle() {
  const button = el('button', { class: 'theme-toggle nav__theme', type: 'button' });

  const render = () => {
    const isDark = currentTheme() === 'dark';
    button.replaceChildren(icon(isDark ? 'sun' : 'moon', 20));
    button.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    button.title = isDark ? 'Light mode' : 'Dark mode';
  };

  button.addEventListener('click', () => {
    setTheme(currentTheme() === 'dark' ? 'light' : 'dark');
    render();
  });
  render();
  return button;
}
