# Vheejay Delacruz Sugay – Portfolio

Plain HTML, CSS, and JavaScript (ES modules). No build step and no dependencies.

## Run locally

ES modules need a web server (opening `index.html` by double-click will not work):

```bash
powershell -ExecutionPolicy Bypass -File tools/serve.ps1
```

Then open http://localhost:5500. Any static server also works (for example VS Code "Live Server").
The "Edit text" toolbar appears only on localhost (or on a published copy when the address ends with `?edit`).

## Structure

| Folder        | Responsibility                                                  |
| ------------- | --------------------------------------------------------------- |
| `data/`       | All content: profile, skills, experience, projects, showcases   |
| `components/` | Reusable UI pieces: navbar, buttons, cards, media, lightbox     |
| `sections/`   | One file per page section, composed from components             |
| `js/`         | Page entry points and behaviour: reveal, scroll-spy, theme, edit mode |
| `pages/`      | Project detail page (`project.html?id=<project id>`)            |
| `styles/`     | One stylesheet per part of the page (see below)                 |
| `assets/`     | Favicon and images                                              |

### Stylesheets

`styles/main.css` imports everything in order:

- Foundations: `tokens.css` (colours, sizes, timing), `base.css`, `layout.css`
- Components: `navbar`, `buttons`, `cards`, `media`, `lightbox`, `marquee`, `snake`
- Page sections: `hero`, `experience`, `contact`, `project-page`
- Special cases: `edit-mode`, `theme-dark`

Each component keeps its own hover and animation rules in its own file.
Reduced-motion is handled once, in `base.css`.

## Replacing placeholders

Entries with `src: null` in `data/projects.js` and `data/showcases.js` render a placeholder.
Save your real image in `assets/images/` and set `src: 'assets/images/your-file.png'`.
Empty arrays (for example `tools`, `features`, `contributions`, `responsibilities`) show a
"to be added" note until you fill them in. Set `github.url` in `data/profile.js` to show the GitHub link.
