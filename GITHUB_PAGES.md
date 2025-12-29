# GitHub Pages Deployment Guide

This website is configured to run on GitHub Pages.

## GitHub Pages Configuration

### Automatic Deployment

This repository is set up for automatic GitHub Pages deployment via:

1. **GitHub Actions workflow** - `.github/workflows/jekyll.yml` tests Jekyll builds
2. **GitHub Pages settings** - Repository serves the `_site` folder

### Repository Settings

Ensure your repository has GitHub Pages enabled:

1. Go to repository **Settings** → **Pages**
2. **Source**: Deploy from a branch
3. **Branch**: `main` (or `master`)
4. **Folder**: `/ (root)`

## Dependencies

### Gemfile
```ruby
source 'https://rubygems.org'
gem 'github-pages', group: :jekyll_plugins
gem 'webrick'
```

This uses the `github-pages` gem which includes:
- Jekyll (static site generator)
- kramdown (Markdown parser)
- jekyll-sass-converter (SCSS compiler)
- And other required dependencies

### Ruby Version
GitHub Pages uses a specific Ruby version. The `github-pages` gem handles this automatically.

## Testing Locally Before Pushing

To test changes locally before pushing:

```bash
# Install dependencies
bundle install

# Build site
bundle exec jekyll build

# Or serve locally
bundle exec jekyll serve --host 0.0.0.0 --port 4000
```

Check the `_site/` folder to see generated files.

## Troubleshooting GitHub Pages Builds

### Build Fails on GitHub Pages

1. Check GitHub Actions tab for build errors
2. Look for:
   - YAML syntax errors in `_data/` files
   - Liquid template syntax errors
   - Missing dependencies in Gemfile
   - Invalid characters in filenames

### Common Issues

**Issue: "GitHub Pages: Could not locate Gemfile"**
- Ensure `Gemfile` exists in repository root

**Issue: "Invalid YAML"**
- Validate YAML files:
  ```bash
  # Using Python
  python3 -c "import yaml; yaml.safe_load(open('_data/projects.yml'))"
  ```

**Issue: "Liquid syntax error"**
- Check for unclosed tags:
  - `{% if %}` needs `{% endif %}`
  - `{% for %}` needs `{% endfor %}`
  - `{% assign var = value %}` syntax

**Issue: Projects/Certificates appearing multiple times**
- Check that data files don't have duplicate entries
- Verify Liquid loop iterates correctly
- Check that template doesn't duplicate content

## File Structure for GitHub Pages

```
.
├── _config.yml              # Jekyll configuration
├── Gemfile                 # Ruby dependencies
├── _data/                  # Jekyll data files
│   ├── projects.yml         # Portfolio projects
│   ├── certificates.yml     # Certificates
│   └── photos.yml          # Photo gallery
├── _includes/              # HTML components
│   ├── portfolio.html       # Portfolio section
│   ├── mycertificates.html # Certificate gallery
│   └── myphotos.html      # Photo gallery
├── _layouts/               # Page layouts
│   └── front.html         # Main layout
├── _sass/                  # SCSS stylesheets
│   ├── base.scss          # Base styles
│   ├── mixins.scss        # SCSS mixins
│   └── header.scss       # Header styles
├── css/                    # Compiled CSS
├── js/                     # JavaScript
├── img/                    # Images
├── index.html             # Homepage
└── projects.html          # Projects page (optional)
```

## Key Files Explained

### _config.yml
Jekyll configuration:
- Site metadata (title, description, social links)
- Markdown settings
- Exclude patterns (build artifacts, docs)

### _data/*.yml
Jekyll data files accessible via `site.data.projects`, etc.:
- `projects.yml` - Portfolio items
- `certificates.yml` - Certificate gallery
- `photos.yml` - Photo gallery

### _includes/*.html
Reusable HTML snippets included by layouts:
- `portfolio.html` - Projects grid
- `mycertificates.html` - Certificate thumbnails
- `myphotos.html` - Photo gallery

### _layouts/*.html
Page templates:
- `front.html` - Main page layout
- `photo.html` - Photo gallery page
- `certificate_gallery.html` - Certificate gallery page

### _sass/*.scss
SCSS that compiles to CSS:
- `base.scss` - Core styles
- `mixins.scss` - Reusable SCSS functions
- `header.scss` - Header-specific styles

## Adding Content

### Add a Project
Edit `_data/projects.yml`:
```yaml
- title: "Project Name"
  category: ["all", "cv", "nlp", "strucdata", "website", "etc"]
  link: "https://project-url.com"
  image: "img/portfolio/screenshot.png"
  alt: "Screenshot description"
  description: "Brief description"
  github: "https://github.com/user/repo"
  tech_stack: "Tech1 - Tech2"
```

### Add a Certificate
Edit `_data/certificates.yml`:
```yaml
- category: "Coursera"
  image_large: "img/Certificates_images/Large/cert.jpg"
  image_thumb: "img/Certificates_images/Thumb/cert_small.jpg"
```

### Add a Photo
Edit `_data/photos.yml`:
```yaml
- category: "CACTB"
  image: "img/Gallery/CACTB/photo.jpg"
  title: "Event Title"
  description: "Photo caption"
```

## Performance Tips

1. **Optimize Images**
   ```bash
   ./convert-images-to-webp.sh
   ```

2. **Minify Assets** (GitHub Pages does this automatically)
   - CSS/JS is minified during build
   - HTML is served compressed

3. **Lazy Loading** (Not implemented yet)
   - Add `loading="lazy"` to images
   - Use Intersection Observer API

## Monitoring

### GitHub Actions
Check `.github/workflows/jekyll.yml`:
- Runs on every push to `main`
- Tests Jekyll build locally
- Uploads build artifacts

### Deployment Status
- Go to repository **Actions** tab
- View "Build and Test Jekyll Site" workflow
- Check for successful/failed runs

## Security

- No server-side code (static site)
- No database (data in YAML files)
- HTTPS enforced by GitHub Pages
- No secrets in repository

## Resources

- [Jekyll Documentation](https://jekyllrb.com/docs/)
- [GitHub Pages Documentation](https://docs.github.com/en/pages)
- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Liquid Templating Language](https://shopify.github.io/liquid/)
