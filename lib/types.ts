/* ─── Category Types ─── */

export type CategoryType =
  | "INCOME"
  | "EXPENSES"
  | "SAVINGS"
  | "DEBT"
  | "TRANSFER"
  | "ASSETS"
  | "LIABILITIES"

export interface Category {
  name: string
  type: CategoryType
  budget?: number
}

/* ─── Transactions ─── */

export interface Transaction {
  date: string // DD/MM/YYYY
  type: CategoryType
  category: string
  account: string
  amount: number // negative = outflow, positive = inflow (expenses can be positive for refunds)
  description: string
  sheetRow: number
}

/* ─── Budget ─── */

export interface BudgetCategory {
  name: string
  type: CategoryType
  monthlyBudget: number
}

export interface BudgetEntry {
  category: string
  type: CategoryType
  budgetAmount: number
  trackedAmount: number
}

/* ─── Portfolio / Investments ─── */

export interface Holding {
  symbol: string
  name: string
  quantity: number
  avgCost: number
  currentPrice: number
  marketValue: number
  totalCost: number
  pnl: number
  pnlPercent: number
  allocation: number
}

export interface Trade {
  date: string
  symbol: string
  action: "BUY" | "SELL"
  quantity: number
  price: number
  total: number
  sheetRow: number
}

/* ─── Net Worth ─── */

export interface NetWorthSnapshot {
  month: string // YYYY-MM
  assets: number
  liabilities: number
  netWorth: number
}

/* ─── DCA Advisor ─── */

export interface DCAScore {
  symbol: string
  score: number
  factors: Record<string, number>
  recommendation: string
}

/* ─── Filters ─── */

export type ViewFilter = "All" | "Budget" | "Tracked" | "B&T"
export type DetailFilter = "Granule" | "Category"
export type PeriodFilter = number | "YTD" | "All Year"

export interface TransactionFilters {
  year: number | "All Years"
  period: PeriodFilter
  view: ViewFilter
  detail: DetailFilter
}

/* ─── Currency ─── */

export type Currency = "AED" | "USD"

/* ─── Google Sheets ─── */

export interface SheetRange {
  sheetName: string
  range: string
}

/* ─── User ─── */

export interface UserProfile {
  name: string
  email: string
  picture?: string
}
