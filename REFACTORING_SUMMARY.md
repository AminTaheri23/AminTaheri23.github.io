# Website Refactoring - Summary

## ✅ Completed Refactoring

### 1. Data-Driven Content Management

**Created Jekyll Data Files:**
- `_data/projects.yml` - 12 portfolio projects centralized
- `_data/certificates.yml` - 24 certificates centralized
- `_data/photos.yml` - 48 gallery photos centralized

**Updated Templates:**
- `_includes/portfolio.html` - Now iterates over projects.yml
- `_includes/mycertificates.html` - Now iterates over certificates.yml
- `_includes/myphotos.html` - Now iterates over photos.yml

**Benefits:**
- ✅ Easier to add/edit content (just edit YAML)
- ✅ No more hardcoded HTML for gallery items
- ✅ Consistent formatting across all items
- ✅ Easier to maintain

### 2. Code Organization

**CSS Extraction:**
- Created `_sass/header.scss` with 60 lines of inline CSS from `header.html`
- Updated `css/main.scss` to import new header styles
- Removed all inline `<style>` blocks from HTML

**Benefits:**
- ✅ Better code organization
- ✅ SCSS preprocessing
- ✅ Cleaner HTML templates
- ✅ Easier to customize styles

### 3. Cleanup & Removal

**Removed Files:**
- ❌ `cv.html` - Removed from repository

**Removed References:**
- ❌ CV/resume link from `header.html`
- ❌ All paths to cv.pdf

**Configuration Updates:**
- Added local development settings to `_config.yml`
  - `host: 0.0.0.0` for network access
  - `port: 4000` standard Jekyll port
  - `livereload: true` for live updates
  - Added exclude patterns for clean builds

**Git Improvements:**
- Updated `.gitignore` with common exclusions
  - Build artifacts
  - Gem files
  - Node modules
  - Editor temp files

### 4. Image Optimization

**Created Tools:**
- `convert-images-to-webp.sh` - Script to convert all images to WebP format
- Quality setting: 80% (good balance of size/quality)

**Usage:**
```bash
# Install webp tools
sudo apt-get install webp  # Ubuntu/Debian
brew install webp           # macOS

# Run conversion
./convert-images-to-webp.sh
```

**Note:** HTML still references original formats (jpg/png). After conversion, update HTML to use `<picture>` elements for WebP with fallbacks.

### 5. Bootstrap 5 Migration

**Prepared:**
- Created `BOOTSTRAP5_MIGRATION.md` with comprehensive migration guide
- 4-phase incremental migration plan (nothing breaks)
- Component-by-component approach
- Complete mapping of Bootstrap 3 → 5 classes
- Testing checklist for each component
- Rollback plan if issues arise

**Status:** Ready for migration when you're ready

## 🚀 Getting Started Locally

### Step 1: Install Ruby & Bundler

```bash
# Ubuntu/Debian
sudo apt-get update
sudo apt-get install ruby-full build-essential zlib1g-dev

# Add Ruby gems to path
echo '# Install Ruby Gems to ~/.gem' >> ~/.bashrc
echo 'export GEM_HOME="$HOME/.gem"' >> ~/.bashrc
echo 'export PATH="$GEM_HOME/bin:$PATH"' >> ~/.bashrc
source ~/.bashrc

# Install Bundler
gem install bundler
```

### Step 2: Install Project Dependencies

```bash
cd /home/amin/Desktop/AminTaheri23.github.io
bundle install
```

### Step 3: Start Local Server

```bash
bundle exec jekyll serve
```

Site will be available at: http://localhost:4000

With `livereload: true` in config, pages auto-refresh when you save changes.

## 📝 How to Add Content

### Add a New Project

Edit `_data/projects.yml`:

```yaml
- title: "Your Project"
  category: ["all", "cv"]  # Options: all, cv, nlp, strucdata, website, etc
  link: "https://your-project.com"
  image: "img/portfolio/screenshot.png"
  alt: "Project screenshot description"
  description: "Brief project description"
  github: "https://github.com/yourusername/project"
  tech_stack: "Tech - Stack - Details"
```

### Add a New Certificate

Edit `_data/certificates.yml`:

```yaml
- category: "Coursera"  # Options: Simplilearn, Coursera, Sololearn, CACTB, IEEEsb, IEEEir, FanAsa
  image_large: "img/Certificates_images/Large/certificate.jpg"
  image_thumb: "img/Certificates_images/Thumb/certificate_small.jpg"
```

### Add a New Photo

Edit `_data/photos.yml`:

```yaml
- category: "CACTB"  # Options: CACTB, IEEEsb, IEEEir, Psimap, Rahhat, FanAsa, Digikala
  image: "img/Gallery/CACTB/photo.jpg"
  title: "Event Title"
  description: "Photo caption or description"
```

## 📁 Project Structure

```
.
├── _config.yml              # Site configuration + dev settings
├── Gemfile                 # Ruby dependencies
├── _data/                  # ⭐ NEW: Content data files
│   ├── projects.yml         # ⭐ NEW: Portfolio projects
│   ├── certificates.yml     # ⭐ NEW: Certificates
│   └── photos.yml          # ⭐ NEW: Photo gallery
├── _includes/              # HTML components
│   ├── portfolio.html       # ⭐ UPDATED: Uses data files
│   ├── mycertificates.html # ⭐ UPDATED: Uses data files
│   └── myphotos.html      # ⭐ UPDATED: Uses data files
├── _layouts/               # Page templates
├── _sass/                  # SCSS styles
│   └── header.scss         # ⭐ NEW: Extracted styles
├── css/                    # Compiled CSS
├── js/                     # JavaScript
├── img/                    # Images
│   ├── portfolio/
│   ├── Gallery/
│   └── Certificates_images/
├── convert-images-to-webp.sh  # ⭐ NEW: Image optimization
├── REFACTORING.md           # ⭐ NEW: This summary
└── BOOTSTRAP5_MIGRATION.md   # ⭐ NEW: Migration guide
```

## 🎯 Next Steps (Optional)

### Short Term
1. **Test locally** - Follow the "Getting Started Locally" section above
2. **Run image conversion** - Execute `convert-images-to-webp.sh` for performance
3. **Update image references** - Add `<picture>` elements for WebP support

### Medium Term
4. **Bootstrap 5 Migration** - Follow `BOOTSTRAP5_MIGRATION.md` guide
   - Start with Phase 1 (preparation)
   - Migrate component-by-component
   - Test thoroughly after each change

### Long Term
5. **Add GitHub Actions** - Automatic deployment and testing
6. **Implement search** - For finding projects/certificates
7. **Add dark mode** - Modern UX feature
8. **Performance optimization** - Lazy loading, critical CSS

## 📊 Statistics

**Before Refactoring:**
- 3 gallery sections with 600+ lines of hardcoded HTML
- 60 lines of inline CSS in header
- No centralized content management
- CV references scattered across site

**After Refactoring:**
- ✅ 3 data files with clean YAML structure
- ✅ 0 lines of inline CSS (extracted to SCSS)
- ✅ Centralized content management
- ✅ All CV references removed
- ✅ Migration path to Bootstrap 5 documented

## 🆘 Troubleshooting

### Ruby Installation Issues

If `gem install bundler` fails:
```bash
sudo gem install bundler
```

### Jekyll Build Errors

If you see "File not found" errors:
```bash
bundle update
bundle install
```

### Port Already in Use

If port 4000 is taken:
```bash
bundle exec jekyll serve --port 4001
```

Or change port in `_config.yml`:
```yaml
port: 4001
```

### Site Not Loading

Check for:
1. Build errors in terminal output
2. Missing image files (check console)
3. Correct YAML syntax (no tabs, only spaces)

## 📚 Documentation Files

- **README.md** - Original project documentation
- **REFACTORING.md** - This summary and quick start
- **BOOTSTRAP5_MIGRATION.md** - Detailed Bootstrap 5 migration guide

## 🎉 Summary

Your website is now:
- ✅ Easier to maintain with data files
- ✅ Better organized with extracted CSS
- ✅ Ready for local development
- ✅ Prepared for Bootstrap 5 upgrade
- ✅ Optimized for future improvements

All changes are backward compatible - your site should work exactly as before, but with much better code organization!
