# Design: amintaheri23.github.io

The locked system. Every Hallmark run reads this first and pages share it. Change it on purpose; the file is the rule.

## System
- Genre: modern-minimal
- Shape of the first page: Marquee Hero (draw 674e0a), Stage hero on `/`, Banner on `/gallery/` and `/certificates/`
- Theme: Console (by request), colourway `graphite`
- Axes: dark/grotesk-sans/chromatic-amber · posture: restrained

## Tokens
`static/css/tokens.css` is the source of truth. The roles:
```css
:root {
  --color-paper: oklch(17% 0.008 250);  --color-paper-2: oklch(21% 0.009 250);  --color-paper-3: oklch(13.5% 0.007 250);
  --color-ink: oklch(95% 0.005 250);  --color-ink-2: oklch(83% 0.008 250);  --color-muted: oklch(71% 0.01 250);
  --color-rule: oklch(31% 0.01 250);  --color-rule-2: oklch(42% 0.012 250);
  --color-accent: oklch(82% 0.15 80);  --color-accent-ink: oklch(18% 0.04 75);  --color-focus: oklch(82% 0.15 80);
  --color-cool: oklch(77% 0.12 245);  --color-cool-soft: oklch(29% 0.05 245);
  --font-display: "Host Grotesk", ui-sans-serif, system-ui, sans-serif;  --font-body: var(--font-display);
  --font-outlier: "Atkinson Hyperlegible Mono", ui-monospace, monospace;
  --radius-card: 10px;  --radius-pill: 6px;  --rule-hair: 1px;  --shadow-card: none;
}
```
The spacing scale, the type scale, the easings and the durations are the scaffold's and live in `tokens.css`.
Amber is the person and the one primary action; cool blue is state (the pressed chip, the open menu).
Host Grotesk 500 for heads, 400 for body; mono only for measured figures, never labels or buttons.

## Controls
- Primary: amber fill, `--color-accent-ink` text · 6px radius · 44px high · one per screen
- Secondary: 1px `--color-rule-2` outline on `--color-paper-2` · same radius and height
- Chip: 1px `--color-rule` at 4px, 40px high; pressed = `--color-cool-soft` fill, `--color-cool` edge
- Focus: 2px `--color-focus` outline, 2px offset, on every control

## Surfaces
- Graphite ground in three steps; panels are one surface split by 1px seams (`.panels`); no shadow, glow or gradient.
- Photographs are duotone (`.duotone`), from `--color-paper-3` to `--color-ink`; screenshots and certificates stay in colour.

## Motion
- Character: still. Only filter and lightbox opacity at `--dur-short`, inside `prefers-reduced-motion: no-preference`; no reveals, parallax or hover lifts.

## Exports
`static/css/tokens.css` in this project. Tailwind, DTCG or shadcn blocks are added here on request, per `export-formats.md`.
