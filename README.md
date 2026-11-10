# Personal Website - Amin Taheri

Source of my personal website, built with [Zola](https://www.getzola.org).

Live at: <https://amintaheri23.github.io>

## Quick start

1. Install Zola **0.23.6**: <https://www.getzola.org/documentation/getting-started/installation/>
2. Serve locally with live reload:

   ```bash
   zola serve
   ```

   The site is at <http://127.0.0.1:1111>.
3. Build the static site into `public/`:

   ```bash
   zola build
   ```

## Structure

```
.
├── config.toml               # Site configuration (base URL, author, social usernames, analytics)
├── content/                  # Pages: _index.md (home), gallery.md, certificates.md
├── templates/
│   ├── base.html             # Page shell: head, nav, main, contact, footer, scripts
│   ├── partials/             # nav.html, contact.html, footer.html
│   ├── macros.html           # Shared components (icon, picture, social_links, chips, glossary)
│   └── index.html, gallery.html, certificates.html, 404.html
├── static/                   # Copied as-is to the site root
│   ├── css/                  # tokens.css, base.css, site.css and page sheets
│   ├── js/site.js            # Filters, lightbox, mobile nav
│   ├── img/                  # All images (portfolio, Gallery, Certificates_images, ...)
│   ├── cv.pdf, AminTaheri_Jan26.pdf
│   └── projects.html         # Redirect from the old /projects.html URL
├── data/                     # Content data, read with load_data()
│   ├── projects.yml
│   ├── certificates.yml
│   └── photos.yml
├── design.md                 # The locked design system
└── .github/workflows/zola.yml  # CI: validate data, build, deploy to GitHub Pages
```

## Adding content

Projects, certificates and photos are data-driven. Edit the YAML file and rebuild.

- `data/projects.yml` - one entry per project:
  - `title`
  - `category`: a list that starts with `"all"`, then one or more filters, e.g. `["all", "cv", "website"]`
  - `link`, `image`, `alt`, `description`, `github`, `tech_stack`
- `data/certificates.yml` - `category`, `image_large`, `image_thumb`
- `data/photos.yml` - `category`, `image`, `title`, `description`

Project filter categories:

| Value | Filter label |
|---|---|
| `cv` | Computer Vision |
| `nlp` | Natural Language Processing |
| `strucdata` | Machine Learning |
| `website` | Website |
| `etc` | Other |

Certificate and photo categories (`Coursera`, `IEEEsb`, `CACTB`, ...) are the ones already used in their files.

### Images

Put images under `static/img/` and reference them in the data files as `img/...` (relative to `static/`). Every image should have a `.webp` sibling; create the missing ones with:

```bash
./convert-images-to-webp.sh   # needs cwebp (Ubuntu/Debian: apt-get install webp, macOS: brew install webp)
```

## Old URLs

These links from the previous site still work and redirect to the new pages:

| Old | New |
|---|---|
| `/gallery.html` | `/gallery/` |
| `/cert_gal.html` | `/certificates/` |
| `/projects.html` | `/#projects` |

`/blog` is a separate repository and is not part of this site.

## Deployment

The GitHub Actions workflow `.github/workflows/zola.yml` validates the data files, builds the site with Zola and deploys `public/` to GitHub Pages on every push to the default branch. Pull requests are built and checked, and the built site is attached to the run as an artifact.

In the repository settings, **Settings → Pages → Build and deployment → Source** must be set to **GitHub Actions**.

## Design

- Built with [Hallmark](https://github.com/nutlope/hallmark), Rim theme. The locked design system is [design.md](design.md).
- Font: [Switzer](https://www.fontshare.com/fonts/switzer) (Fontshare).
- Link previews: every page carries Open Graph and Twitter tags; `scripts/og-cards.mjs` draws the preview images into `public/og/` after `zola build` (CI runs it). A page's `description` in its front matter sets the preview text.
- Icons: [Font Awesome Free 6](https://fontawesome.com) ([CC BY 4.0](https://fontawesome.com/license/free)), inlined as SVG.

## License

Licensed under the Apache License 2.0. See [LICENCE](LICENCE).
