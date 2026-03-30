# Zad — Project Guide

## Architecture

Single-page finance dashboard running on Next.js App Router. The UI is vanilla HTML/CSS/JS served through a server component.

### Next.js Shell

- `app/layout.tsx` — Root layout, loads fonts + CSS
- `app/page.tsx` — Server component, reads and renders `public/zad-body.html`
- `app/zad-scripts.tsx` — Client component, injects config + loads JS

### Source Modules (`src/js/`)

App logic is split into source modules that get concatenated into `public/zad-app.js` at build time. All code shares one global scope — no ES module boundaries.

| Module | Purpose |
|--------|---------|
| `config.js` | Constants, globals, state declarations, API config |
| `ui-utils.js` | Theme toggle, animations, formatters, pills, layout sync |
| `demo.js` | Demo mode (fake portfolio + transaction data) |
| `auth.js` | Google Identity Services, sign in/out, data fetching |
| `portfolio.js` | Price fetching, dashboard, holdings, trades, allocation |
| `advisor.js` | Investment advisor engine + UI |
| `nav.js` | Sidebar, hub navigation, home page |
| `charts.js` | Chart.js rendering (pie, waterfall, historical) |
| `transactions.js` | Transactions dashboard, calendar, insights, heatmap |
| `net-worth.js` | Net worth page |
| `budget.js` | Budget page, categories management |

### Build System

- `npm run build:js` — Concatenates `src/js/*.js` → `public/zad-app.js`
- `npm run build:js:watch` — Watch mode for development
- `npm run build` — Builds JS then runs Next.js build
- `npm run dev` — Watch JS + Next.js dev server in parallel

Source of truth is `src/js/`. Never edit `public/zad-app.js` directly — it is a build artifact.

### Backend Modes

The app supports two backends, controlled by `NEXT_PUBLIC_BACKEND_MODE`:

- **`supabase`** (default) — Supabase for auth (Google OAuth via Supabase) and data storage. Requires `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
- **`sheets`** — Google Sheets API for data, Google Identity Services for auth. Requires `NEXT_PUBLIC_GOOGLE_CLIENT_ID` and `NEXT_PUBLIC_SHEET_ID`.

The `BACKEND_MODE` constant in `config.js` gates all auth and data operations. Supabase client/auth lives in `supabase.js`. Google Sheets auth lives in `auth.js`. The database schema is in `supabase/schema.sql`.

### Static Assets

- `public/zad-app.css` — All styles
- `public/zad-body.html` — HTML body content
- `public/sw.js` — Service worker (cache management)
- `public/manifest.json` — PWA manifest

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

**Bottom spacing:** All tab/page containers use `padding-bottom: 24px` for consistent spacing above the floating bottom nav. This is defined once in CSS for all tab IDs — never add per-section `padding-bottom: 80px` or similar. The tab spacer elements handle the rest.

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

### Floating Pill (standard surface style)

All floating UI elements (tab bars, hub button, action pills) use the same frosted-glass pill treatment. Never add shimmer `::before` or glow `::after` pseudo-elements — keep it clean.

| Property | Dark | Light |
|----------|------|-------|
| `background` | `rgba(30,30,30,0.4)` | `rgba(255,255,255,0.45)` |
| `backdrop-filter` | `blur(50px) saturate(200%) brightness(1.15)` | same |
| `border` | `1px solid rgba(255,255,255,0.15)` | `1px solid rgba(255,255,255,0.6)` |
| `border-radius` | `24px` (pills/bars), `50%` (circle buttons) | same |
| `box-shadow` | `var(--shadow-lg)` | `var(--shadow-lg)` |

Apply to: `.txn-bottom-tabs` (mobile), `#floatingHubBtn`, and any future floating controls.

## Rules

- Always use design tokens over raw values
- Dark/light theming is handled via `[data-theme]` attribute — use theme CSS variables for all colors
- Never define a CSS custom property as `var()` of itself (e.g. `--foo: var(--foo)` is a bug)
- Spacing follows a 4px grid
- The app uses vanilla JS — no React for UI logic
