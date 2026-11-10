#!/usr/bin/env node
// Draws the link-preview cards (Open Graph images) that the built pages point at, after `zola build`:
//   public/og/<page-slug>.png  for each page (certificates, gallery): the page's title
//   public/og/default.png      for the home page and the rest: the name, the hero lines and the portrait
// Every card is 1200 x 630 in the Rim tokens (public/css/tokens.css) and Switzer, like the site.
// It reads what to draw from the built pages' own meta tags, then checks that every og:image under
// /og/ exists, so a page can never point at a card that is not there.
//
//   node scripts/og-cards.mjs [public]
//
// Needs Chrome or Chromium (CHROME_PATH, else the usual install paths) and puppeteer-core, found in
// OG_PUPPETEER (a folder holding node_modules/puppeteer-core) or next to this script. The font
// comes from Fontshare as on the site; OG_FONT_CSS points at another stylesheet (local checks).
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

const OUT = path.resolve(process.argv[2] || 'public');
const W = 1200, H = 630;
const FONT_CSS = process.env.OG_FONT_CSS || 'https://api.fontshare.com/v2/css?f[]=switzer@400,500&display=swap';
const PORTRAIT = path.join(OUT, 'img', 'latest.jpg');

function fail(msg) { console.error(`::error::og-cards: ${msg}`); process.exit(1); }

const requireFrom = createRequire(process.env.OG_PUPPETEER ? path.join(path.resolve(process.env.OG_PUPPETEER), 'noop.js') : import.meta.url);
const puppeteer = requireFrom('puppeteer-core');
const chrome = [process.env.CHROME_PATH, '/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/usr/bin/chromium', '/usr/bin/chromium-browser']
  .find((p) => p && fs.existsSync(p));
if (!chrome) fail('no Chrome or Chromium found: set CHROME_PATH');

function htmlFiles(dir) {
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((e) => {
    const p = path.join(dir, e.name);
    return e.isDirectory() ? htmlFiles(p) : e.name.endsWith('.html') ? [p] : [];
  });
}

const decode = (s) => s
  .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
  .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(+d))
  .replace(/&(quot|apos|lt|gt|nbsp|amp);/g, (_, n) => ({ quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ', amp: '&' })[n]);
const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const meta = (html, key) => {
  const m = html.match(new RegExp(`<meta (?:property|name)="${key}" content="([^"]*)"`));
  return m ? decode(m[1]) : '';
};

// What each card shows, keyed by the card's file name.
const home = fs.readFileSync(path.join(OUT, 'index.html'), 'utf8');
const site = { title: meta(home, 'og:site_name'), description: meta(home, 'og:description'), author: meta(home, 'author') };
const siteUrl = meta(home, 'og:url').replace(/^https?:\/\//, '').replace(/\/$/, '');
const cards = new Map();
const referenced = new Map();
for (const file of htmlFiles(OUT)) {
  const html = fs.readFileSync(file, 'utf8');
  const m = meta(html, 'og:image').match(/\/og\/([a-z0-9._-]+)\.png$/);
  if (!m) continue;
  const name = m[1];
  if (!referenced.has(name)) referenced.set(name, path.relative(OUT, file));
  if (cards.has(name)) continue;
  cards.set(name, name === 'default' ? { kind: 'site', title: site.title } : { kind: 'page', title: meta(html, 'og:title') });
}
if (!cards.size) fail(`no page under ${OUT} points at an /og/ card; run zola build first`);
if (cards.has('default') && !fs.existsSync(PORTRAIT)) fail(`${PORTRAIT} is missing`);

function cardHtml(card) {
  const tokens = pathToFileURL(path.join(OUT, 'css', 'tokens.css')).href;
  const top = `<div class="row"><span class="brand">${esc(site.author)}</span><span>${esc(siteUrl)}</span></div>`;
  const sub = card.kind === 'site' ? `<p class="sub">${esc(site.description)}</p>` : '';
  const photo = card.kind === 'site' ? `<div class="frame"><img src="${pathToFileURL(PORTRAIT).href}" alt=""></div>` : '';
  return `<!doctype html><html lang="en"><head><meta charset="utf-8">
<link rel="stylesheet" href="${tokens}"><link rel="stylesheet" href="${esc(FONT_CSS)}">
<style>
  html, body { margin: 0; }
  body { width: ${W}px; height: ${H}px; background: var(--color-paper); color: var(--color-ink); font-family: var(--font-display); -webkit-font-smoothing: antialiased; }
  .card { box-sizing: border-box; width: ${W}px; height: ${H}px; padding: 56px 72px; display: flex; flex-direction: column; }
  .row { display: flex; justify-content: space-between; align-items: baseline; gap: 32px; font-size: 26px; color: var(--color-muted); white-space: nowrap; padding-bottom: 28px; border-bottom: var(--rule-hair) solid var(--color-rule); }
  .brand { color: var(--color-ink); font-weight: 500; font-size: 30px; }
  .body { flex: 1; min-height: 0; display: flex; align-items: center; gap: 56px; padding-top: 28px; }
  .main { flex: 1; min-width: 0; align-self: stretch; display: flex; flex-direction: column; justify-content: center; overflow: hidden; }
  .mark { flex: none; width: 64px; height: 6px; background: var(--color-accent); margin-bottom: 36px; }
  .title { margin: 0; font-weight: var(--display-weight); letter-spacing: var(--tracking-display); line-height: 1.04; text-wrap: balance; }
  .sub { margin: 28px 0 0; font-size: 32px; line-height: 1.3; color: var(--color-ink-2); text-wrap: balance; }
  .frame { flex: none; width: 360px; height: 400px; background: var(--color-paper-3); outline: 1px solid var(--color-rule); overflow: hidden; }
  .frame img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: 50% 22%; }
</style></head><body><div class="card">${top}<div class="body"><div class="main"><div class="mark"></div><h1 class="title">${esc(card.title)}</h1>${sub}</div>${photo}</div></div></body></html>`;
}

const tmp = fs.mkdtempSync(path.join(os.tmpdir(), 'og-cards-'));
const browser = await puppeteer.launch({ executablePath: chrome, headless: true, args: ['--no-sandbox', '--font-render-hinting=none', '--allow-file-access-from-files'] });
let fontWarned = false;
try {
  const page = await browser.newPage();
  await page.setViewport({ width: W, height: H, deviceScaleFactor: 1 });
  fs.mkdirSync(path.join(OUT, 'og'), { recursive: true });
  for (const [name, card] of cards) {
    const file = path.join(tmp, `${name}.html`);
    fs.writeFileSync(file, cardHtml(card));
    await page.goto(pathToFileURL(file).href, { waitUntil: 'load', timeout: 30000 });
    const state = await page.evaluate(async () => {
      const wait = Promise.all([document.fonts.load('500 80px Switzer'), document.fonts.load('400 26px Switzer')]);
      await Promise.race([wait, new Promise((r) => setTimeout(r, 8000))]);
      const img = document.querySelector('.frame img');
      if (img) await img.decode().catch(() => {});
      return { font: document.fonts.check('500 80px Switzer'), img: !img || img.naturalWidth > 0 };
    });
    if (!state.img) fail(`the portrait did not load on og/${name}.png`);
    if (!state.font && !fontWarned) { console.log('::warning::og-cards: Switzer did not load; the cards use the fallback sans'); fontWarned = true; }
    // The largest title size that fits: a short title stands at 92px, the longest steps down to 48px.
    await page.evaluate(() => {
      const main = document.querySelector('.main'), title = document.querySelector('.title');
      const chars = title.textContent.length;
      let size = chars <= 40 ? 92 : chars <= 70 ? 76 : 64;
      title.style.fontSize = `${size}px`;
      while (main.scrollHeight > main.clientHeight && size > 48) { size -= 2; title.style.fontSize = `${size}px`; }
    });
    await page.screenshot({ path: path.join(OUT, 'og', `${name}.png`), type: 'png', clip: { x: 0, y: 0, width: W, height: H } });
    console.log(`og/${name}.png  ${card.title}`);
  }
} finally {
  await browser.close();
  fs.rmSync(tmp, { recursive: true, force: true });
}

// Every card a page points at must exist and be 1200 x 630.
const bad = [];
for (const [name, from] of referenced) {
  const f = path.join(OUT, 'og', `${name}.png`);
  if (!fs.existsSync(f)) { bad.push(`og/${name}.png (from ${from}) is missing`); continue; }
  const b = fs.readFileSync(f);
  if (b.readUInt32BE(16) !== W || b.readUInt32BE(20) !== H) bad.push(`og/${name}.png is ${b.readUInt32BE(16)}x${b.readUInt32BE(20)}, not ${W}x${H}`);
}
if (bad.length) fail(bad.join('; '));
console.log(`${cards.size} cards, ${referenced.size} referenced, all present.`);
