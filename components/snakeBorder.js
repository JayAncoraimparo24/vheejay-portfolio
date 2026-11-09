const SVG_NS = 'http://www.w3.org/2000/svg';
const INSET = 1.5;

/**
 * Cyan line that travels around its parent like a snake (CSS animation).
 * The parent must be `position: relative`.
 * `hover: true` shows it only while the parent is hovered or focused.
 */
export function createSnakeBorder({ radius = 10, hover = false } = {}) {
  const svg = document.createElementNS(SVG_NS, 'svg');
  svg.setAttribute('class', `snake-border${hover ? ' snake-border--hover' : ''}`);
  svg.setAttribute('aria-hidden', 'true');

  const rect = document.createElementNS(SVG_NS, 'rect');
  rect.setAttribute('class', 'snake-border__line');
  rect.setAttribute('pathLength', '100');
  rect.setAttribute('x', INSET);
  rect.setAttribute('y', INSET);
  rect.setAttribute('width', `calc(100% - ${INSET * 2}px)`);
  rect.setAttribute('height', `calc(100% - ${INSET * 2}px)`);
  rect.setAttribute('rx', radius - INSET);

  svg.append(rect);
  return svg;
}

/** Adds a hover snake border to an existing element and returns it. */
export function withSnakeBorder(node, options = {}) {
  node.append(createSnakeBorder({ hover: true, ...options }));
  return node;
}
