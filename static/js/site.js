/* site.js: nav toggle, category filters, lightbox. Vanilla, no dependencies.
   Progressive enhancement: without it every item is visible and every link works. */
(function () {
  'use strict';
  var d = document;

  /* ---------- Nav toggle ---------- */
  var toggle = d.querySelector('.nav__toggle');
  var links = toggle && d.getElementById(toggle.getAttribute('aria-controls'));
  if (toggle && links) {
    var setOpen = function (open) { toggle.setAttribute('aria-expanded', open ? 'true' : 'false'); };
    var isOpen = function () { return toggle.getAttribute('aria-expanded') === 'true'; };
    toggle.hidden = false;
    setOpen(false);
    toggle.addEventListener('click', function () { setOpen(!isOpen()); });
    links.addEventListener('click', function (e) { if (e.target.closest('a')) setOpen(false); });
    d.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen() && !d.querySelector('dialog[open]')) { setOpen(false); toggle.focus(); }
    });
    var narrow = window.matchMedia('(max-width: 60rem)');
    var onChange = function () { if (!narrow.matches) setOpen(false); };
    if (narrow.addEventListener) narrow.addEventListener('change', onChange);
    else if (narrow.addListener) narrow.addListener(onChange);
  }

  /* ---------- Filters: every [data-filter-scope] ---------- */
  d.addEventListener('click', function (e) {
    var chip = e.target.closest('.chip[data-filter]');
    var scope = chip && chip.closest('[data-filter-scope]');
    if (!scope) return;
    var value = chip.getAttribute('data-filter');
    (chip.closest('.chips') || scope).querySelectorAll('.chip[data-filter]').forEach(function (c) {
      c.setAttribute('aria-pressed', c === chip ? 'true' : 'false');
    });
    scope.querySelectorAll('[data-categories]').forEach(function (el) {
      el.hidden = value !== 'all' && el.getAttribute('data-categories').split(/\s+/).indexOf(value) < 0;
    });
  });

  /* ---------- Lightbox ---------- */
  if (typeof HTMLDialogElement !== 'function' || !('showModal' in HTMLDialogElement.prototype)) return;

  var svg = function (box, path) {
    return '<svg class="icon" viewBox="0 0 ' + box + ' 512" width="20" height="20" aria-hidden="true" focusable="false" fill="currentColor"><path d="' + path + '"/></svg>';
  };
  var ICON_CLOSE = svg(384, 'M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z');
  var ICON_PREV = svg(320, 'M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z');
  var ICON_NEXT = svg(320, 'M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z');

  var dlg, img, cap, title, desc, nav, opener, current, items = [];
  var btn = function (cls, label, icon) {
    return '<button type="button" class="lightbox__btn lightbox__' + cls + '" aria-label="' + label + '">' + icon + '</button>';
  };

  function build() {
    dlg = d.createElement('dialog');
    dlg.className = 'lightbox';
    dlg.innerHTML =
      '<div class="lightbox__bar">' + btn('close', 'Close', ICON_CLOSE) + '</div>' +
      '<figure class="lightbox__figure"><img class="lightbox__img" alt="">' +
      '<figcaption class="lightbox__caption"><span class="lightbox__title"></span><span class="lightbox__desc"></span></figcaption></figure>' +
      '<div class="lightbox__nav">' + btn('prev', 'Previous', ICON_PREV) + btn('next', 'Next', ICON_NEXT) + '</div>';
    d.body.appendChild(dlg);
    img = dlg.querySelector('.lightbox__img');
    cap = dlg.querySelector('.lightbox__caption');
    title = dlg.querySelector('.lightbox__title');
    desc = dlg.querySelector('.lightbox__desc');
    nav = dlg.querySelector('.lightbox__nav');
    dlg.querySelector('.lightbox__close').addEventListener('click', function () { dlg.close(); });
    dlg.querySelector('.lightbox__prev').addEventListener('click', function () { step(-1); });
    dlg.querySelector('.lightbox__next').addEventListener('click', function () { step(1); });
    dlg.addEventListener('click', function (e) { if (e.target === dlg) dlg.close(); });
    dlg.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowRight') { e.preventDefault(); step(1); }
      else if (e.key === 'ArrowLeft') { e.preventDefault(); step(-1); }
    });
    dlg.addEventListener('close', function () {
      img.removeAttribute('src');
      if (opener && opener.isConnected) opener.focus();
      opener = null;
    });
  }

  function show(link) {
    current = link;
    var thumb = link.querySelector('img');
    var t = link.getAttribute('data-caption-title') || '';
    var s = link.getAttribute('data-caption-desc') || '';
    img.src = link.href;
    img.alt = (thumb && thumb.alt) || t;
    title.textContent = t; title.hidden = !t;
    desc.textContent = s; desc.hidden = !s;
    cap.hidden = !t && !s;
    dlg.setAttribute('aria-label', t || img.alt || 'Image');
    var i = items.indexOf(link), n = items.length;
    if (n > 1) [items[(i + 1) % n], items[(i - 1 + n) % n]].forEach(function (a) { new Image().src = a.href; });
  }

  function step(dir) {
    var n = items.length;
    if (n < 2) return;
    show(items[(items.indexOf(current) + dir + n) % n]);
  }

  d.addEventListener('click', function (e) {
    var link = e.target.closest('a.lightbox-link');
    if (!link || e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) return;
    e.preventDefault();
    if (!dlg) build();
    var scope = link.closest('[data-filter-scope]') || d;
    items = Array.prototype.filter.call(scope.querySelectorAll('a.lightbox-link'), function (a) {
      return !a.closest('[hidden]');
    });
    if (items.indexOf(link) < 0) items = [link];
    nav.hidden = items.length < 2;
    opener = link;
    show(link);
    if (!dlg.open) dlg.showModal();
  });
})();
