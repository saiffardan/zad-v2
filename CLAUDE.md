# Zad v2 — Personal Finance PWA

## Project Overview
Zad is a personal finance PWA rebuilt from a single-file HTML app into **Next.js 16 + shadcn/ui + Tailwind CSS 4**. It reads/writes data from Google Sheets via OAuth2.

**Original app:** https://github.com/saiffardan/investment-dashboard
**Live (v1):** https://saiffardan.github.io/investment-dashboard/

## Tech Stack
- **Framework:** Next.js 16 (App Router, RSC, Turbopack)
- **UI:** shadcn/ui (radix-mira style), Tailwind CSS 4
- **Icons:** Hugeicons
- **Fonts:** Inter (sans), DM Mono (monospace)
- **Theme:** next-themes (dark default, class strategy)
- **Data:** Google Sheets API v4 via OAuth2 (GIS)
- **PWA:** Web manifest + service worker

## Folder Structure
```
app/
  layout.tsx          — Root layout (fonts, metadata, ThemeProvider)
  page.tsx            — Redirects to /dashboard
  globals.css         — Design tokens, Tailwind theme
  (app)/
    layout.tsx        — App shell (header + nav + main)
    dashboard/page.tsx
    portfolio/page.tsx
    planner/page.tsx
components/
  app-shell.tsx       — Header, nav pill, content wrapper
  theme-provider.tsx  — next-themes wrapper + 'd' hotkey
  ui/                 — shadcn/ui components
hooks/                — Custom React hooks
lib/
  utils.ts            — cn() helper
  types.ts            — All TypeScript types (Transaction, Holding, Budget, etc.)
  constants.ts        — Sheet ID, API config, colors, breakpoints
public/
  manifest.json       — PWA manifest
```

## Design System

### Direction: Minimal / Notion-like
- Flat backgrounds, no glass blur on content cards
- Typography-driven hierarchy: big bold numbers, tiny muted labels
- Green reserved for financial values only — UI chrome uses white/neutral
- No emojis in the UI

### Colors (CSS variables)
- **Background:** `--background` (#0e0e0e dark / #fafafa light)
- **Card:** `--card` (#161616 dark / #ffffff light)
- **Financial green:** `--financial-green` (#30d158 dark / #22863a light)
- **Financial red:** `--financial-red` (#ff453a dark / #d63031 light)
- **Financial amber:** `--financial-amber` (#e8a435 dark / #b08020 light)
- **Financial blue:** `--financial-blue` (#5aa8f5 dark / #3b82f6 light)
- **Brand:** `--brand` (#1db954)
- **Text tiers:** `--text-primary`, `--text-secondary`, `--text-tertiary`

### Card Shadow
Use `shadow-card` utility class for the layered card shadow.

### Fonts
- Sans: Inter (weights 200, 400, 500, 600, 700) via `font-sans`
- Mono: DM Mono (400, 500) via `font-mono` — use for financial numbers
- Logo wordmark: Inter weight 200, letter-spacing 0.25em, uppercase

### Border Radius
- Content cards: 12px (`rounded-xl`)
- Pills/tracks: 99px (`rounded-full`)
- Status badges: 8px (`rounded-lg`)

### Animation
- Spring easing: `var(--ease-spring)` = `cubic-bezier(0.16, 1, 0.3, 1)`
- Pill slide: `var(--ease-pill)` = `cubic-bezier(0.34, 1.4, 0.64, 1)`

### Layout
- Desktop: `clamp(80px, 15vw, 200px)` side padding
- Mobile: 12px side padding
- Card gap: 16px uniform

## Data Model
All types are in `lib/types.ts`. Key models:
- `Transaction` — date, type, category, account, amount, description, sheetRow
- `Holding` — symbol, name, quantity, avgCost, currentPrice, pnl, allocation
- `Trade` — date, symbol, action (BUY/SELL), quantity, price, total
- `BudgetCategory` / `BudgetEntry` — budget tracking per category
- `Category` — name, type (7 types), optional budget
- `TransactionFilters` — year, period, view, detail

## Google Sheets
- **Sheet ID:** `1NNOt_RCDxKyZ-E0YYN1cpvDji_bhRC8sZvoLV0pWX48`
- **OAuth scopes:** spreadsheets + userinfo.profile
- **Sheet tabs:** Investments, Transactions, Budget Planning, Categories, Net Worth Planning
- **Client ID:** Set via `NEXT_PUBLIC_GOOGLE_CLIENT_ID` env var

## Important Gotchas
1. **Expense refunds:** Expenses can be positive (refunds). Never blindly `Math.abs()` expense amounts.
2. **Date format:** DD/MM/YYYY from Google Sheets.
3. **Currency:** AED default, USD conversion at pegged rate 3.6725.
4. **Green accent:** Reserved for financial values ONLY. UI chrome uses neutral colors.
5. **No emojis** in the UI.
6. **Dark mode is default.**
7. **Monospace for financial numbers** — use `font-mono` class.

## Commands
```bash
npm run dev        # Dev server with Turbopack
npm run build      # Production build
npm run lint       # ESLint
npm run format     # Prettier
npm run typecheck  # TypeScript check
```
