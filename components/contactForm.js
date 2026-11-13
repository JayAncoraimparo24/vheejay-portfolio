import { el } from '../js/dom.js';
import { profile } from '../data/profile.js';
import { button } from './button.js';

// A mailto: link is limited in length, so very long messages are better copied
const MAILTO_SAFE_LENGTH = 1500;

function field({ id, label, type = 'text', multiline = false }) {
  const input = multiline
    ? el('textarea', { id, name: id, rows: '5', required: true })
    : el('input', { id, name: id, type, required: true, ...(type === 'email' && { autocomplete: 'email' }) });
  return el('div', { class: 'field' }, el('label', { for: id, text: label }), input);
}

/** The subject and text of the message, shared by every way of sending it. */
function composeMessage({ name, email, message }) {
  return {
    subject: `Portfolio inquiry from ${name}`,
    body: `${message}\n\nFrom: ${name} <${email}>`,
  };
}

/** A mailto: link (opens the visitor's email app, if they have one). */
export function buildMailto(data) {
  const { subject, body } = composeMessage(data);
  return `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/** A Gmail "compose" link (opens in the browser, so it works without an email app). */
export function buildGmail(data) {
  const { subject, body } = composeMessage(data);
  const query = new URLSearchParams({ view: 'cm', fs: '1', to: profile.email, su: subject, body });
  return `https://mail.google.com/mail/?${query.toString()}`;
}

/** Copies text to the clipboard; falls back to the old method on browsers that block the new one. */
async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    const area = el('textarea', { 'aria-hidden': 'true', style: 'position:fixed;opacity:0;pointer-events:none' });
    area.value = text;
    document.body.append(area);
    area.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    area.remove();
    return ok;
  }
}

export function createContactForm() {
  const status = el('p', { class: 'form__status', role: 'status', 'aria-live': 'polite' });
  const result = el('div', { class: 'form__result', hidden: true });
  const form = el(
    'form',
    { class: 'form', novalidate: true },
    field({ id: 'name', label: 'Your name' }),
    field({ id: 'email', label: 'Your email', type: 'email' }),
    field({ id: 'message', label: 'Message', multiline: true }),
    button({ label: 'Send message', type: 'submit', iconName: 'send' }),
    status,
    result,
  );

  // Any change after the options were shown makes them out of date, so hide them
  form.addEventListener('input', () => {
    result.hidden = true;
    result.replaceChildren();
    status.textContent = '';
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = Object.fromEntries(new FormData(form));
    data.name = data.name.trim();
    data.email = data.email.trim();
    data.message = data.message.trim();
    if (!data.name || !data.message) {
      status.textContent = 'Please fill in your name and a message.';
      return;
    }

    const { subject, body } = composeMessage(data);
    const mailto = buildMailto(data);
    const tooLong = mailto.length > MAILTO_SAFE_LENGTH;

    status.textContent = tooLong
      ? 'Your message is ready. It is long, so copying it and pasting it into an email is the safest way.'
      : 'Your message is ready. Choose how to send it:';

    const copyStatus = el('span', { class: 'form__copied', role: 'status', 'aria-live': 'polite' });
    result.replaceChildren(
      el(
        'div',
        { class: 'form__actions' },
        button({ label: 'Open Gmail', href: buildGmail(data), variant: 'primary', iconName: 'mail', external: true }),
        button({ label: 'Email app', href: mailto, variant: 'secondary', iconName: 'send' }),
        button({
          label: 'Copy message',
          variant: 'secondary',
          iconName: 'file',
          onClick: async () => {
            const ok = await copyText(`To: ${profile.email}\nSubject: ${subject}\n\n${body}`);
            copyStatus.textContent = ok ? 'Copied. Paste it into an email.' : 'Could not copy. Please select the text and copy it.';
          },
        }),
      ),
      copyStatus,
      el('p', { class: 'form__hint' }, `Or write directly to ${profile.email}.`),
    );
    result.hidden = false;
  });

  return form;
}
