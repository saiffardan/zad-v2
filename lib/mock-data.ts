import type { Transaction } from "@/lib/types"

/* Mock transactions for development — mimics Google Sheets data */

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

/* ─── Mock budgets per type ─── */

export const MOCK_BUDGETS = {
  INCOME: 30000,
  EXPENSES: 10000,
  SAVINGS: 9000,
  DEBT: 4000,
}

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
