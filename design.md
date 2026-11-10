# Design: amintaheri23.github.io

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: Marquee Hero (draw 674e0a), Stage hero on `/`, Banner on `/gallery/` and `/certificates/`
- Theme: Rim (by request), colourway `night`; restyled from Console on the owner's request
- Axes: dark/grotesk-sans/warm · posture: committed

## Tokens
`static/css/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(9% 0.008 75);  --color-paper-2: oklch(12.5% 0.009 75);  --color-paper-3: oklch(6.5% 0.007 75);
  --color-ink: oklch(94% 0.010 80);  --color-ink-2: oklch(84% 0.011 80);  --color-muted: oklch(68% 0.012 80);  --color-muted-2: oklch(50% 0.010 80);
  --color-rule: oklch(25% 0.010 78);  --color-rule-2: oklch(16% 0.009 78);
  --color-accent: oklch(72% 0.17 45);  --color-accent-ink: oklch(10% 0.02 45);  --color-accent-soft: oklch(24% 0.06 45);
  --color-accent-2: oklch(74% 0.12 250);  --color-focus: oklch(78% 0.15 45);
  --font-display: "Switzer", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);
  --font-outlier: "Geist Mono", ui-monospace, monospace;
  --radius-card: 0;  --radius-pill: 0;  --rule-hair: 1px;  --shadow-card: none;
  --tracking-display: -0.04em;  --display-weight: 500;
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`.
Orange is the one primary action and the current state (the pressed chip, the open menu, the current MSc on the trail); sky-blue `--color-accent-2` is reserved for a second state and is unused today.
`--color-rule` is the stronger hairline (sections, wells, control outlines, frames); `--color-rule-2` is the faint row line; `--color-muted-2` underlines links on hover.
Switzer 500 for heads (hero at -0.04em, section heads -0.03em, line-height 1.02), 400 for body, loaded from Fontshare; mono (Geist Mono) only for a measured figure, so it is not loaded today.

## Controls
- Primary: orange fill, `--color-accent-ink` text · square · 44px high · one per screen
- Secondary: 1px `--color-rule` outline on `--color-paper-2` · square · same height
- Chip: 1px `--color-rule`, square, 40px high; pressed = `--color-accent-soft` fill, `--color-accent` edge
- Focus: 2px `--color-focus` outline, 2px offset, on every control

## Surfaces
- Warm black ground in three steps; panels are one surface split by 1px seams (`.panels`); nothing round, no shadow, glow or gradient.
- Every picture sits in a `.frame` on `--color-paper-3` and shows in true colour: the owner's photographs, the screenshots and the certificates. Rim's `sat=-20 con=10` photo treatment is not applied, at the owner's request.
- Site icon: a pixel-art crop of the portrait, 32×32 in 12 flat colours on the photo's grey backdrop (`img/amin.ico` with 16/32/64, `img/favicon.svg`, `img/apple-touch-icon.png` at 36 cells ×5). Pixels stay square: every size is its own grid or a whole-number upscale.

## Phones (40rem and under)
- The hero shows the portrait first (a 4:3 crop, visual order only), then the name and the lines.
- Projects are compact rows: a 5rem square thumbnail beside the title and description, the rest full width under them.
- Section gaps 48 / 56 / 72px.

## Motion
- Character: still. Only filter and lightbox opacity at `--dur-short`, inside `prefers-reduced-motion: no-preference`; no reveals, parallax or hover lifts.

## Exports
`static/css/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request, per `export-formats.md`.
