/**
 * Tiny DOM helper. Builds elements without innerHTML so content is always escaped.
 * Props: `class`, `text`, `on` ({event: handler}); any other key becomes an attribute.
 */
export function el(tag, props = {}, ...children) {
  const node = document.createElement(tag);
  for (const [key, value] of Object.entries(props)) {
    applyProp(node, key, value);
  }
  appendChildren(node, children);
  return node;
}

function applyProp(node, key, value) {
  if (value == null || value === false) return;
  if (key === 'class') {
    node.className = value;
  } else if (key === 'text') {
    node.textContent = value;
  } else if (key === 'on') {
    for (const [eventName, handler] of Object.entries(value)) {
      node.addEventListener(eventName, handler);
    }
  } else {
    node.setAttribute(key, value === true ? '' : value);
  }
}

export function appendChildren(node, children) {
  for (const child of children.flat(Infinity)) {
    if (child == null || child === false) continue;
    node.append(child);
  }
}
