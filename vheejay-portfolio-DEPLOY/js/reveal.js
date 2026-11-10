const REVEAL_SELECTOR = '.section__header, .card, .media, .timeline__item, .contact__row, .form, .detail-block';
const VISIBLE_CLASS = 'is-visible';
const STAGGER_MS = 90;
const MAX_STAGGER_STEPS = 5;

/** Gives siblings that reveal together a small stagger, so grids cascade instead of popping in. */
function assignDelays(targets) {
  const seen = new Map();
  targets.forEach((target) => {
    const count = seen.get(target.parentElement) ?? 0;
    seen.set(target.parentElement, count + 1);
    target.style.setProperty('--reveal-delay', `${Math.min(count, MAX_STAGGER_STEPS) * STAGGER_MS}ms`);
  });
}

/** Fades elements in once as they scroll into view. Falls back to visible when unsupported. */
export function initReveal(root = document) {
  const targets = root.querySelectorAll(REVEAL_SELECTOR);
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion || !('IntersectionObserver' in window)) return;

  assignDelays(targets);

  const observer = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add(VISIBLE_CLASS);
        observer.unobserve(entry.target);
      }
    },
    { threshold: 0.1 },
  );

  targets.forEach((target) => {
    target.classList.add('reveal');
    observer.observe(target);
  });

  // The experience timeline's vertical line draws itself when it comes into view.
  const drawObserver = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.replace('is-pending', 'is-drawn');
        drawObserver.unobserve(entry.target);
      }
    },
    { threshold: 0.15 },
  );
  root.querySelectorAll('.timeline').forEach((timeline) => {
    timeline.classList.add('is-pending');
    drawObserver.observe(timeline);
  });
}
