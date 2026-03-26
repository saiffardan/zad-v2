/* ─── Google Sheets ─── */

export const SHEET_ID = "1NNOt_RCDxKyZ-E0YYN1cpvDji_bhRC8sZvoLV0pWX48"

export const SHEETS_API_BASE = "https://sheets.googleapis.com/v4/spreadsheets"

export const OAUTH_SCOPES = [
  "https://www.googleapis.com/auth/spreadsheets",
  "https://www.googleapis.com/auth/userinfo.profile",
] as const

export const SHEET_NAMES = {
  investments: "Investments",
  transactions: "Transactions",
  budgetPlanning: "Budget Planning",
  categories: "Categories",
  netWorth: "Net Worth Planning",
} as const

/* ─── Currency ─── */

export const AED_USD_RATE = 3.6725
export const DEFAULT_CURRENCY = "AED" as const

/* ─── Category Types ─── */

export const CATEGORY_TYPES = [
  "INCOME",
  "EXPENSES",
  "SAVINGS",
  "DEBT",
  "TRANSFER",
  "ASSETS",
  "LIABILITIES",
] as const

/* ─── Category Colors (monochrome — accent for income, dimming for others) ─── */

export const CATEGORY_COLORS: Record<string, string> = {
  INCOME: "var(--zad-accent)",
  EXPENSES: "var(--foreground)",
  SAVINGS: "var(--foreground)",
  DEBT: "var(--foreground)",
  TRANSFER: "var(--muted-foreground)",
  ASSETS: "var(--zad-accent)",
  LIABILITIES: "var(--foreground)",
}

/* ─── Tick Bar ─── */

export const TICK_COUNT = 60
export const TICK_STAGGER_MS = 8

/* ─── Breakpoints ─── */

export const BREAKPOINTS = {
  mobile: 768,
  tablet: 1024,
  desktop: 1280,
} as const
