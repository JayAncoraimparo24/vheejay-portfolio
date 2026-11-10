// Resolves paths against the site root so they work from index.html and pages/*.html.
const SITE_ROOT = new URL('../', import.meta.url);

export const siteUrl = (path) => new URL(path, SITE_ROOT).href;
export const projectUrl = (id) => siteUrl(`pages/project.html?id=${encodeURIComponent(id)}`);
