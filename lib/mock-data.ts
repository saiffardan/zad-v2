import type { Transaction, Holding, Trade, BudgetEntry, Category, NetWorthSnapshot } from "@/lib/types"

/* ─── Mock Transactions ─── */

export const MOCK_TRANSACTIONS: Transaction[] = [
  // ─── Income ───
  { date: "01/03/2026", type: "INCOME", category: "Salary", account: "ADCB", amount: 25000, description: "Monthly salary", sheetRow: 2 },
  { date: "05/03/2026", type: "INCOME", category: "Freelance", account: "ADCB", amount: 3500, description: "Client project", sheetRow: 3 },
  { date: "15/03/2026", type: "INCOME", category: "Dividends", account: "FAB", amount: 850, description: "Q1 dividends", sheetRow: 4 },

  // ─── Expenses ───
  { date: "01/03/2026", type: "EXPENSES", category: "Rent", account: "ADCB", amount: -5500, description: "Monthly rent", sheetRow: 5 },
  { date: "03/03/2026", type: "EXPENSES", category: "Groceries", account: "ADCB", amount: -1200, description: "Carrefour", sheetRow: 6 },
  { date: "05/03/2026", type: "EXPENSES", category: "Dining Out", account: "ADCB", amount: -650, description: "Restaurants", sheetRow: 7 },
  { date: "07/03/2026", type: "EXPENSES", category: "Transport", account: "ADCB", amount: -400, description: "Fuel + Salik", sheetRow: 8 },
  { date: "10/03/2026", type: "EXPENSES", category: "Utilities", account: "ADCB", amount: -350, description: "DEWA + internet", sheetRow: 9 },
  { date: "12/03/2026", type: "EXPENSES", category: "Shopping", account: "FAB", amount: -800, description: "Clothes + misc", sheetRow: 10 },
  { date: "14/03/2026", type: "EXPENSES", category: "Entertainment", account: "ADCB", amount: -300, description: "Movies + games", sheetRow: 11 },
  { date: "18/03/2026", type: "EXPENSES", category: "Groceries", account: "ADCB", amount: 150, description: "Carrefour refund", sheetRow: 12 },

  // ─── Savings ───
  { date: "02/03/2026", type: "SAVINGS", category: "Emergency Fund", account: "FAB", amount: -3000, description: "Monthly transfer", sheetRow: 13 },
  { date: "02/03/2026", type: "SAVINGS", category: "Investments", account: "Interactive Brokers", amount: -5000, description: "Monthly DCA", sheetRow: 14 },

  // ─── Debt ───
  { date: "05/03/2026", type: "DEBT", category: "Car Loan", account: "ADCB", amount: -2200, description: "Monthly payment", sheetRow: 15 },
  { date: "05/03/2026", type: "DEBT", category: "Credit Card", account: "FAB", amount: -1500, description: "CC balance", sheetRow: 16 },
]

/* ─── Mock Budgets per type ─── */

export const MOCK_BUDGETS = {
  INCOME: 30000,
  EXPENSES: 10000,
  SAVINGS: 9000,
  DEBT: 4000,
}

/* ─── Mock Categories ─── */

export const MOCK_CATEGORIES: Category[] = [
  { name: "Salary", type: "INCOME", budget: 25000 },
  { name: "Freelance", type: "INCOME", budget: 4000 },
  { name: "Dividends", type: "INCOME", budget: 1000 },
  { name: "Rent", type: "EXPENSES", budget: 5500 },
  { name: "Groceries", type: "EXPENSES", budget: 1500 },
  { name: "Dining Out", type: "EXPENSES", budget: 800 },
  { name: "Transport", type: "EXPENSES", budget: 500 },
  { name: "Utilities", type: "EXPENSES", budget: 400 },
  { name: "Shopping", type: "EXPENSES", budget: 800 },
  { name: "Entertainment", type: "EXPENSES", budget: 500 },
  { name: "Emergency Fund", type: "SAVINGS", budget: 3000 },
  { name: "Investments", type: "SAVINGS", budget: 6000 },
  { name: "Car Loan", type: "DEBT", budget: 2200 },
  { name: "Credit Card", type: "DEBT", budget: 1800 },
]

/* ─── Mock Budget Entries (per category) ─── */

export const MOCK_BUDGET_ENTRIES: BudgetEntry[] = MOCK_CATEGORIES.map((cat) => {
  const tracked = MOCK_TRANSACTIONS
    .filter((t) => t.category === cat.name)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0)
  return {
    category: cat.name,
    type: cat.type,
    budgetAmount: cat.budget ?? 0,
    trackedAmount: tracked,
  }
})

/* ─── Mock Holdings ─── */

export const MOCK_HOLDINGS: Holding[] = [
  {
    symbol: "VOO",
    name: "Vanguard S&P 500 ETF",
    quantity: 15,
    avgCost: 420.5,
    currentPrice: 498.75,
    marketValue: 7481.25,
    totalCost: 6307.5,
    pnl: 1173.75,
    pnlPercent: 18.61,
    allocation: 32.5,
  },
  {
    symbol: "VTI",
    name: "Vanguard Total Stock Market",
    quantity: 20,
    avgCost: 230.0,
    currentPrice: 268.4,
    marketValue: 5368.0,
    totalCost: 4600.0,
    pnl: 768.0,
    pnlPercent: 16.7,
    allocation: 23.3,
  },
  {
    symbol: "VXUS",
    name: "Vanguard Total Intl Stock",
    quantity: 40,
    avgCost: 58.25,
    currentPrice: 62.1,
    marketValue: 2484.0,
    totalCost: 2330.0,
    pnl: 154.0,
    pnlPercent: 6.61,
    allocation: 10.8,
  },
  {
    symbol: "BND",
    name: "Vanguard Total Bond Market",
    quantity: 30,
    avgCost: 72.0,
    currentPrice: 71.85,
    marketValue: 2155.5,
    totalCost: 2160.0,
    pnl: -4.5,
    pnlPercent: -0.21,
    allocation: 9.4,
  },
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    quantity: 12,
    avgCost: 175.0,
    currentPrice: 228.5,
    marketValue: 2742.0,
    totalCost: 2100.0,
    pnl: 642.0,
    pnlPercent: 30.57,
    allocation: 11.9,
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corp.",
    quantity: 8,
    avgCost: 340.0,
    currentPrice: 448.2,
    marketValue: 3585.6,
    totalCost: 2720.0,
    pnl: 865.6,
    pnlPercent: 31.82,
    allocation: 15.6,
  },
]

/* ─── Mock Trades ─── */

export const MOCK_TRADES: Trade[] = [
  { date: "02/03/2026", symbol: "VOO", action: "BUY", quantity: 2, price: 495.0, total: 990.0, sheetRow: 2 },
  { date: "02/03/2026", symbol: "VTI", action: "BUY", quantity: 3, price: 266.5, total: 799.5, sheetRow: 3 },
  { date: "02/03/2026", symbol: "VXUS", action: "BUY", quantity: 5, price: 61.8, total: 309.0, sheetRow: 4 },
  { date: "10/02/2026", symbol: "AAPL", action: "BUY", quantity: 3, price: 220.0, total: 660.0, sheetRow: 5 },
  { date: "15/02/2026", symbol: "MSFT", action: "BUY", quantity: 2, price: 440.0, total: 880.0, sheetRow: 6 },
  { date: "01/02/2026", symbol: "VOO", action: "BUY", quantity: 2, price: 488.0, total: 976.0, sheetRow: 7 },
  { date: "01/02/2026", symbol: "BND", action: "BUY", quantity: 10, price: 72.1, total: 721.0, sheetRow: 8 },
  { date: "05/01/2026", symbol: "VTI", action: "BUY", quantity: 5, price: 258.0, total: 1290.0, sheetRow: 9 },
  { date: "15/01/2026", symbol: "VXUS", action: "BUY", quantity: 10, price: 59.5, total: 595.0, sheetRow: 10 },
  { date: "20/12/2025", symbol: "AAPL", action: "SELL", quantity: 5, price: 195.0, total: 975.0, sheetRow: 11 },
]

/* ─── Mock Net Worth ─── */

export const MOCK_NET_WORTH: NetWorthSnapshot[] = [
  { month: "2025-10", assets: 180000, liabilities: 45000, netWorth: 135000 },
  { month: "2025-11", assets: 188000, liabilities: 43500, netWorth: 144500 },
  { month: "2025-12", assets: 195000, liabilities: 42000, netWorth: 153000 },
  { month: "2026-01", assets: 203000, liabilities: 40500, netWorth: 162500 },
  { month: "2026-02", assets: 210000, liabilities: 39000, netWorth: 171000 },
  { month: "2026-03", assets: 218000, liabilities: 37500, netWorth: 180500 },
]

/** Aggregate mock data by type */
export function aggregateMockByType() {
  const totals = { income: 0, expenses: 0, savings: 0, debt: 0 }
  for (const txn of MOCK_TRANSACTIONS) {
    switch (txn.type) {
      case "INCOME":
        totals.income += txn.amount
        break
      case "EXPENSES":
        totals.expenses += txn.amount
        break
      case "SAVINGS":
        totals.savings += txn.amount
        break
      case "DEBT":
        totals.debt += txn.amount
        break
    }
  }
  return totals
}

/** Aggregate transactions by category within a type */
export function aggregateByCategory(transactions: Transaction[], type: string) {
  const map = new Map<string, number>()
  for (const txn of transactions) {
    if (txn.type !== type) continue
    map.set(txn.category, (map.get(txn.category) ?? 0) + txn.amount)
  }
  return Array.from(map.entries())
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => Math.abs(b.amount) - Math.abs(a.amount))
}

/** Parse DD/MM/YYYY to Date */
export function parseDate(dateStr: string): Date {
  const [d, m, y] = dateStr.split("/").map(Number)
  return new Date(y, m - 1, d)
}

/** Get portfolio summary */
export function getPortfolioSummary(holdings: Holding[]) {
  const totalValue = holdings.reduce((s, h) => s + h.marketValue, 0)
  const totalCost = holdings.reduce((s, h) => s + h.totalCost, 0)
  const totalPnl = totalValue - totalCost
  const totalPnlPercent = totalCost > 0 ? (totalPnl / totalCost) * 100 : 0
  return { totalValue, totalCost, totalPnl, totalPnlPercent }
}
