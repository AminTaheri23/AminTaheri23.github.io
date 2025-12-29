# Bootstrap 5 Migration Guide

This guide outlines the incremental migration from Bootstrap 3 to Bootstrap 5.

## Current State
- Bootstrap 3.3.7 currently in use
- jQuery dependency required
- Grid system: `.col-md-4`, `.col-lg-8`, etc.
- Navbar: `.navbar-default`
- Buttons: `.btn-default`

## Migration Strategy: Incremental Approach

### Phase 1: Preparation (No Breaking Changes)
- [ ] Add Bootstrap 5 CSS/JS alongside Bootstrap 3 (parallel installation)
- [ ] Test both versions work independently
- [ ] Document all Bootstrap 3 components used in the site
- [ ] Create component mapping document

### Phase 2: Component-by-Component Migration
Migrate one component at a time, testing each change:

1. **Navbar** (Low Risk)
   - Replace `.navbar-default` → `.navbar-light`
   - Replace `.navbar-toggle` → `.navbar-toggler`
   - Replace `data-toggle="collapse"` → `data-bs-toggle="collapse"`
   - Update toggle icon to Bootstrap 5 markup

2. **Buttons** (Low Risk)
   - `.btn-default` → `.btn-outline-secondary`
   - `.btn-primary` (stays same)
   - `.btn-xl` (custom size, test if works)
   - No functional changes expected

3. **Grid System** (Medium Risk)
   - `.col-md-4` → `.col-md-4` (same syntax)
   - `.col-lg-8` → `.col-lg-8` (same syntax)
   - `.col-lg-offset-2` → `.offset-lg-2`
   - Update `.row` to include `.g-3` for spacing if needed

4. **Forms & Inputs** (Medium Risk)
   - Form groups: `.form-group` → individual labels and classes
   - Input classes remain mostly the same
   - Validation styles changed significantly

5. **Modals & Alerts** (Low Risk)
   - Update `data-dismiss` → `data-bs-dismiss`
   - Update `data-target` → `data-bs-target`
   - Modal markup structure changes slightly

6. **Responsive Utilities** (Low Risk)
   - `.hidden-xs` → `.d-none .d-sm-block`
   - `.visible-*` classes replaced with `.d-*-block`

### Phase 3: Remove jQuery Dependency
Bootstrap 5 doesn't require jQuery:
- [ ] Replace jQuery event handlers with vanilla JS
- [ ] Remove `jquery.js` and `jquery.easing.min.js`
- [ ] Test all interactive elements

### Phase 4: Final Cleanup
- [ ] Remove all Bootstrap 3 CSS/JS references
- [ ] Remove old Bootstrap 3 files from `css/` and `js/`
- [ ] Final testing across all pages

## Component Mapping Reference

| Bootstrap 3 | Bootstrap 5 | Notes |
|--------------|--------------|-------|
| `.navbar-default` | `.navbar-light` or `.navbar-dark` | Choose based on theme |
| `.navbar-toggle` | `.navbar-toggler` | Icon structure changed |
| `.icon-bar` | `.navbar-toggler-icon` | Use Bootstrap icon SVG |
| `data-toggle="collapse"` | `data-bs-toggle="collapse"` | All data-* attributes changed to data-bs-* |
| `data-target` | `data-bs-target` | Attribute name change |
| `.col-*-offset-*` | `.offset-*-*` | Offset prefix removed |
| `.pull-left` | `.float-start` | RTL support |
| `.pull-right` | `.float-end` | RTL support |
| `.hidden-*` | `.d-*` | New responsive utility system |
| `.visible-*` | `.d-*` | Use `.d-none` and `.d-*-block` |
| `.img-responsive` | `.img-fluid` | New class name |
| `.thumbnail` | `.card` | Card component replaces thumbnail |

## Key Breaking Changes

### 1. Data Attributes
All Bootstrap data attributes now use `data-bs-*` prefix:
```html
<!-- Bootstrap 3 -->
<button data-toggle="modal" data-target="#myModal">Open</button>

<!-- Bootstrap 5 -->
<button data-bs-toggle="modal" data-bs-target="#myModal">Open</button>
```

### 2. Dropdowns
Dropdown markup changed significantly:
```html
<!-- Bootstrap 3 -->
<div class="dropdown">
  <button class="dropdown-toggle" data-toggle="dropdown">Menu <b class="caret"></b></button>
  <ul class="dropdown-menu">
    <li><a href="#">Item</a></li>
  </ul>
</div>

<!-- Bootstrap 5 -->
<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown">Menu</button>
  <ul class="dropdown-menu">
    <li><a class="dropdown-item" href="#">Item</a></li>
  </ul>
</div>
```

### 3. Responsive Utilities
```html
<!-- Bootstrap 3 -->
<div class="hidden-xs hidden-sm">Visible on md-lg-xl</div>

<!-- Bootstrap 5 -->
<div class="d-none d-md-block">Visible on md-lg-xl</div>
```

## Testing Checklist

After each component migration:
- [ ] Test on mobile (320px, 375px, 414px)
- [ ] Test on tablet (768px, 1024px)
- [ ] Test on desktop (1200px+)
- [ ] Test all interactive elements
- [ ] Check JavaScript console for errors
- [ ] Verify no visual regressions

## Rollback Plan

If any migration breaks the site:
1. Revert the specific component change
2. Keep working on other components
3. Document the issue for future resolution

## Resources

- [Bootstrap 5 Migration Guide](https://getbootstrap.com/docs/5.0/migration/)
- [Bootstrap 5 Documentation](https://getbootstrap.com/docs/5.0/)
- [Bootstrap 3 to 5 Migration Tool](https://github.com/jackd248/bs3-to-5)

## Current Files to Update

1. `_includes/head.html` - CSS links
2. `_includes/scripts.html` - JS includes
3. `_includes/nav.html` - Navbar component
4. `_includes/header.html` - Button classes
5. `_includes/portfolio.html` - Grid system
6. `_includes/mycertificates.html` - Grid system
7. `_includes/myphotos.html` - Grid system
8. `_sass/_base.scss` - Custom Bootstrap overrides
