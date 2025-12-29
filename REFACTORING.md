# Personal Website - Refactored

A refactored Jekyll implementation of the [Creative Theme](http://startbootstrap.com/template-overviews/creative/) template.

## Local Development Setup

### Prerequisites

Install Ruby and Bundler:

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install ruby-full build-essential zlib1g-dev
echo '# Install Ruby Gems to ~/.gem' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/.gem"' >> ~/.bashrc
echo 'export PATH="$GEM_HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc
gem install bundler

# macOS
brew install ruby
gem install bundler
```

### Install Dependencies

```bash
bundle install
```

### Run Locally

```bash
bundle exec jekyll serve
```

Site will be available at http://localhost:4000

## Refactoring Summary

### Completed Changes

1. **Data-Driven Content**
   - Created `_data/projects.yml` - All portfolio projects in one place
   - Created `_data/certificates.yml` - All certificates in one place
   - Created `_data/photos.yml` - All gallery photos in one place
   - Updated templates to iterate over data files instead of hardcoded HTML

2. **Code Organization**
   - Extracted 60 lines of inline CSS from `header.html` to `_sass/header.scss`
   - Updated `main.scss` to include the new header styles

3. **Cleanup**
   - Removed `cv.html` file
   - Removed all CV/resume links from the site
   - Added development settings to `_config.yml`

4. **Image Optimization Preparation**
   - Created `convert-images-to-webp.sh` script for converting images to WebP format
   - Run this script after installing webp package (see script header)

### To Run Image Conversion

```bash
# Install webp tools
sudo apt-get install webp  # Ubuntu/Debian
brew install webp           # macOS

# Run conversion script
./convert-images-to-webp.sh
```

## Project Structure

```
.
├── _config.yml           # Site configuration
├── _data/               # Jekyll data files
│   ├── projects.yml       # Portfolio projects
│   ├── certificates.yml   # Certificates
│   └── photos.yml        # Photo gallery
├── _includes/            # Reusable components
├── _layouts/             # Page layouts
├── _sass/               # SCSS stylesheets
│   ├── base.scss
│   ├── mixins.scss
│   └── header.scss       # NEW: extracted inline styles
├── css/                 # Compiled CSS
├── js/                  # JavaScript files
├── img/                 # Images
└── index.html            # Homepage
```

## Adding New Content

### Add a New Project

Edit `_data/projects.yml`:

```yaml
- title: "Project Name"
  category: ["all", "cv", "nlp", "strucdata", "website", "etc"]
  link: "https://project-url.com"
  image: "img/portfolio/project-screenshot.png"
  alt: "Project screenshot"
  description: "Brief project description"
  github: "https://github.com/username/project"
  tech_stack: "Tech - Stack - Here"
```

### Add a New Certificate

Edit `_data/certificates.yml`:

```yaml
- category: "Coursera"
  image_large: "img/Certificates_images/Large/certificate.jpg"
  image_thumb: "img/Certificates_images/Thumb/certificate.jpg"
```

### Add a New Photo

Edit `_data/photos.yml`:

```yaml
- category: "CACTB"
  image: "img/Gallery/CACTB/photo.jpg"
  title: "Event Name"
  description: "Photo description"
```

## Next Steps (Optional Improvements)

- [ ] Bootstrap 5 migration (incremental approach)
  - Update CDN links
  - Replace old Bootstrap classes
  - Remove jQuery dependency
- [ ] Image WebP conversion and HTML updates
- [ ] Add GitHub Actions for deployment
- [ ] Implement search functionality
- [ ] Add dark mode support

## Deployment

Site is automatically deployed via GitHub Pages at:
https://amintaheri23.github.io
