# Personal Website - Amin Taheri

A refactored Jekyll website based on the [Creative Theme](http://startbootstrap.com/template-overviews/creative/) template.

Live at: <https://amintaheri23.github.io>

## Quick Start

### Adding Content

Edit data files to add content:
- `_data/projects.yml` - Add portfolio projects
- `_data/certificates.yml` - Add certificates
- `_data/photos.yml` - Add gallery photos

### Running Locally

```bash
# Install dependencies
bundle install

# Build and serve
bundle exec jekyll serve
```

Site available at: http://localhost:4000

## Documentation

- **[GITHUB_PAGES.md](GITHUB_PAGES.md)** - GitHub Pages deployment guide
- **[REFACTORING_SUMMARY.md](REFACTORING_SUMMARY.md)** - Complete refactoring documentation
- **[BOOTSTRAP5_MIGRATION.md](BOOTSTRAP5_MIGRATION.md)** - Bootstrap 5 upgrade guide

## Site Structure

```
.
├── _config.yml              # Site configuration
├── _data/                  # Data files (projects, certificates, photos)
├── _includes/               # HTML components
├── _layouts/               # Page layouts
├── _sass/                  # SCSS stylesheets
├── css/                    # Compiled CSS
├── js/                     # JavaScript
├── img/                    # Images
└── index.html             # Homepage
```

## Features

- Data-driven content management (YAML files)
- Dynamic portfolio/gallery filtering
- Responsive design (Bootstrap 3)
- Jekyll static site generation
- GitHub Pages deployment

## GitHub Pages

This site automatically deploys via GitHub Pages. See [GITHUB_PAGES.md](GITHUB_PAGES.md) for:
- Deployment configuration
- Troubleshooting builds
- Adding new content

## Development

### Image Optimization

Convert images to WebP for better performance:
```bash
./convert-images-to-webp.sh
```

### Bootstrap 5 Migration

See [BOOTSTRAP5_MIGRATION.md](BOOTSTRAP5_MIGRATION.md) for upgrade guide:
- Incremental migration plan
- Component-by-component approach
- Class reference mapping

## License

Based on [Creative Theme](http://startbootstrap.com/template-overviews/creative/) by [Start Bootstrap](http://startbootstrap.com).

