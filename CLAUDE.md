# Zad — Project Guide

## Architecture

Single-page finance dashboard running on Next.js App Router. The UI is vanilla HTML/CSS/JS served through a server component:

- `app/layout.tsx` — Root layout, loads fonts + CSS
- `app/page.tsx` — Server component, reads and renders `public/zad-body.html`
- `app/zad-scripts.tsx` — Client component, injects config + loads JS
- `public/zad-app.css` — All styles
- `public/zad-app.js` — All app logic (portfolio, transactions, budget, charts, Google Sheets API)
- `public/zad-body.html` — HTML body content

## Design System

All new CSS must use the established design tokens. Never use raw values when a token exists.

### Font Stacks

| Token | Value |
|-------|-------|
| `var(--font-sans)` | -apple-system, SF Pro Display, SF Pro Text, BlinkMacSystemFont, sans-serif |
| `var(--font-mono)` | SF Mono, DM Mono, ui-monospace, monospace |

### Font Size Scale (raw values, no CSS variables)

| Size | Usage |
|------|-------|
| `9px` | Micro labels |
| `10px` | Small labels, badges |
| `12px` | Body small, table cells |
| `14px` | Body default |
| `16px` | Body large, inputs |
| `20px` | Heading small |
| `24px` | Heading medium |
| `28px` | Heading large |
| `36px` | Display |

Use `clamp()` for responsive sizes where appropriate.

### Letter Spacing

| Token | Value | Usage |
|-------|-------|-------|
| `var(--ls-tight)` | -0.02em | Headlines, large text |
| `var(--ls-slight)` | 0.04em | Subtle emphasis |
| `var(--ls-wide)` | 0.1em | Labels, section headers |
| `var(--ls-caps)` | 0.5px | Uppercase labels |
| `var(--ls-spread)` | 1px | Wide uppercase, decorative |

### Line Height

| Token | Value | Usage |
|-------|-------|-------|
| `var(--lh-none)` | 1 | Single-line text, numbers |
| `var(--lh-tight)` | 1.2 | Headings, compact text |
| `var(--lh-normal)` | 1.4 | Body text |
| `var(--lh-relaxed)` | 1.6 | Longer-form content |

### Border Radius Scale (raw values, no CSS variables)

| Size | Usage |
|------|-------|
| `2px` | Tiny elements, tags |
| `4px` | Badges, small pills |
| `6px` | Buttons, inputs |
| `10px` | Cards, inner containers |
| `12px` | Standard cards |
| `14px` | Large cards |
| `16px` | Modal corners |
| `20px` | Sheet/panel corners |
| `24px` | Full-screen panels |
| `50%` | Circles |

### Shadows (theme-aware CSS variables)

| Token | Usage |
|-------|-------|
| `var(--shadow-sm)` | Subtle depth, tooltips |
| `var(--shadow-md)` | Cards, elevated surfaces |
| `var(--shadow-lg)` | Modals, floating panels |
| `var(--shadow-xl)` | Dropdowns, overlays |

Aliases: `--shadow-elevated` = md, `--shadow-card` = md, `--shadow-subtle` = sm.

### Animation / Timing

| Token | Value | Usage |
|-------|-------|-------|
| `var(--duration-fast)` | 0.15s | Hovers, micro-interactions |
| `var(--duration-normal)` | 0.25s | Standard transitions |
| `var(--duration-slow)` | 0.4s | Theme transitions, panels |
| `var(--duration-enter)` | 0.6s | Page/element entrances |
| `var(--ease-out)` | cubic-bezier(0.16, 1, 0.3, 1) | General motion |
| `var(--ease-spring)` | cubic-bezier(0.34, 1.4, 0.64, 1) | Bouncy/playful motion |

### Spacing (raw values, 4px-based grid)

Use multiples of 4: `4px`, `8px`, `12px`, `16px`, `20px`, `24px`. The content horizontal padding is `var(--content-px)` (16px).

### Theme Colors (CSS variables)

| Token | Usage |
|-------|-------|
| `var(--bg)` | Page background |
| `var(--glass-bg)` | Card/surface background |
| `var(--text-1)` | Primary text |
| `var(--text-2)` | Secondary text |
| `var(--text-3)` | Tertiary/hint text |
| `var(--divider)` | Borders, dividers |
| `var(--emerald)` | Positive/gain |
| `var(--red)` | Negative/loss |
| `var(--amber)` | Warning/neutral |
| `var(--blue)` | Info/accent |
| `var(--card-bg-solid)` | Solid card backgrounds |
| `var(--nav-bg)` | Navigation background |
| `var(--hover-bg)` | Hover state |

### Opacity Scale (raw values)

Common values: `0`, `0.3`, `0.4`, `0.5`, `0.6`, `0.7`, `1`.

## Rules

- Always use design tokens over raw values
- Dark/light theming is handled via `[data-theme]` attribute — use theme CSS variables for all colors
- Never define a CSS custom property as `var()` of itself (e.g. `--foo: var(--foo)` is a bug)
- Spacing follows a 4px grid
- The app uses vanilla JS — no React for UI logic
