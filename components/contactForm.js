import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';
import { button } from './button.js';

function field({ id, label, type = 'text', multiline = false }) {
  const input = multiline
    ? el('textarea', { id, name: id, rows: '5', required: true })
    : el('input', { id, name: id, type, required: true });
  return el('div', { class: 'field' }, el('label', { for: id, text: label }), input);
}

/** Builds a mailto: link so the form works without a backend. */
export function buildMailto({ name, email, message }) {
  const subject = encodeURIComponent(`Portfolio inquiry from ${name}`);
  const body = encodeURIComponent(`${message}\n\nFrom: ${name} <${email}>`);
  return `mailto:${profile.email}?subject=${subject}&body=${body}`;
}

export function createContactForm() {
  const status = el('p', { class: 'form__status', role: 'status' });
  const form = el(
    'form',
    { class: 'form', novalidate: true },
    field({ id: 'name', label: 'Your name' }),
    field({ id: 'email', label: 'Your email', type: 'email' }),
    field({ id: 'message', label: 'Message', multiline: true }),
    button({ label: 'Send message', type: 'submit', iconName: 'send' }),
    status,
  );

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = Object.fromEntries(new FormData(form));
    window.location.href = buildMailto(data);
    status.textContent = 'Opening your email app to send the message…';
  });

  return form;
}
