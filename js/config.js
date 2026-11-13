// Resolves paths against the site root so they work from index.html and pages/*.html.
const SITE_ROOT = new URL('../', import.meta.url);

export const siteUrl = (path) => new URL(path, SITE_ROOT).href;
/**
 * Small copy of a picture for tiles and cards (assets/thumbs/..., 640px wide, JPEG).
 * The full picture in assets/images/ is still what opens when a visitor clicks a tile.
 */
export const thumbOf = (path) => path?.replace('assets/images/', 'assets/thumbs/').replace(/\.(png|webp|jpe?g)$/i, '.jpg') ?? path;

export const projectUrl =(id) => siteUrl(`pages/project.html?id=${encodeURIComponent(id)}`);
