import { el } from '../js/dom.js';
import { icon } from './icons.js';
import { withSnakeBorder } from './snakeBorder.js';

/**
 * Renders a link-styled or native button.
 * variant: 'primary' | 'secondary' | 'ghost'
 */
export function button({ label, href, type = 'button', variant = 'primary', iconName, onClick, external = false }) {
  const tag = href ? 'a' : 'button';
  const props = { class: `btn btn--${variant}` };
  if (href) props.href = href;
  else props.type = type;
  if (href && external) Object.assign(props, { target: '_blank', rel: 'noopener noreferrer' });
  if (onClick) props.on = { click: onClick };
  const node = el(tag, props, label, iconName ? icon(iconName, 18) : null);
  return variant === 'primary' ? withSnakeBorder(node, { radius: 24 }) : node;
}
