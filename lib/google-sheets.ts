import { SHEET_ID, SHEETS_API_BASE, SHEET_NAMES } from "@/lib/constants"
import type { Transaction, Holding, Trade, Category, BudgetEntry, NetWorthSnapshot, CategoryType } from "@/lib/types"

/* ─── Low-level helpers ─── */

async function fetchSheet(sheetName: string, range: string, accessToken: string): Promise<string[][]> {
  const encodedRange = encodeURIComponent(`${sheetName}!${range}`)
  const url = `${SHEETS_API_BASE}/${SHEET_ID}/values/${encodedRange}`
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Sheets API error (${res.status}): ${error}`)
  }
  const data = await res.json()
  return (data.values as string[][]) ?? []
}

async function updateSheet(
  sheetName: string,
  range: string,
  values: string[][],
  accessToken: string
): Promise<void> {
  const encodedRange = encodeURIComponent(`${sheetName}!${range}`)
  const url = `${SHEETS_API_BASE}/${SHEET_ID}/values/${encodedRange}?valueInputOption=USER_ENTERED`
  const res = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  })
  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Sheets API update error (${res.status}): ${error}`)
  }
}

async function appendSheet(
  sheetName: string,
  range: string,
  values: string[][],
  accessToken: string
): Promise<void> {
  const encodedRange = encodeURIComponent(`${sheetName}!${range}`)
  const url = `${SHEETS_API_BASE}/${SHEET_ID}/values/${encodedRange}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ values }),
  })
  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Sheets API append error (${res.status}): ${error}`)
  }
}

async function deleteSheetRow(
  sheetId: number,
  rowIndex: number,
  accessToken: string
): Promise<void> {
  const url = `${SHEETS_API_BASE}/${SHEET_ID}:batchUpdate`
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      requests: [
        {
          deleteDimension: {
            range: {
              sheetId,
              dimension: "ROWS",
              startIndex: rowIndex - 1,
              endIndex: rowIndex,
            },
          },
        },
      ],
    }),
  })
  if (!res.ok) {
    const error = await res.text()
    throw new Error(`Sheets API delete error (${res.status}): ${error}`)
  }
}

/* ─── Transactions ─── */

export async function fetchTransactions(accessToken: string): Promise<Transaction[]> {
  const rows = await fetchSheet(SHEET_NAMES.transactions, "A2:F1000", accessToken)
  return rows.map((row, i) => ({
    date: row[0] ?? "",
    type: (row[1] ?? "EXPENSES") as CategoryType,
    category: row[2] ?? "",
    account: row[3] ?? "",
    amount: parseFloat(row[4] ?? "0"),
    description: row[5] ?? "",
    sheetRow: i + 2,
  }))
}

export async function addTransaction(txn: Omit<Transaction, "sheetRow">, accessToken: string) {
  await appendSheet(SHEET_NAMES.transactions, "A:F", [
    [txn.date, txn.type, txn.category, txn.account, String(txn.amount), txn.description],
  ], accessToken)
}

export async function updateTransaction(txn: Transaction, accessToken: string) {
  await updateSheet(SHEET_NAMES.transactions, `A${txn.sheetRow}:F${txn.sheetRow}`, [
    [txn.date, txn.type, txn.category, txn.account, String(txn.amount), txn.description],
  ], accessToken)
}

/* ─── Categories ─── */

export async function fetchCategories(accessToken: string): Promise<Category[]> {
  const rows = await fetchSheet(SHEET_NAMES.categories, "A2:C100", accessToken)
  return rows.map((row) => ({
    name: row[0] ?? "",
    type: (row[1] ?? "EXPENSES") as CategoryType,
    budget: row[2] ? parseFloat(row[2]) : undefined,
  }))
}

export async function addCategory(cat: Category, accessToken: string) {
  await appendSheet(SHEET_NAMES.categories, "A:C", [
    [cat.name, cat.type, cat.budget !== undefined ? String(cat.budget) : ""],
  ], accessToken)
}

/* ─── Budget Planning ─── */

export async function fetchBudgetEntries(accessToken: string): Promise<BudgetEntry[]> {
  const rows = await fetchSheet(SHEET_NAMES.budgetPlanning, "A2:D100", accessToken)
  return rows.map((row) => ({
    category: row[0] ?? "",
    type: (row[1] ?? "EXPENSES") as CategoryType,
    budgetAmount: parseFloat(row[2] ?? "0"),
    trackedAmount: parseFloat(row[3] ?? "0"),
  }))
}

export async function updateBudgetEntry(
  rowIndex: number,
  entry: BudgetEntry,
  accessToken: string
) {
  await updateSheet(SHEET_NAMES.budgetPlanning, `A${rowIndex}:D${rowIndex}`, [
    [entry.category, entry.type, String(entry.budgetAmount), String(entry.trackedAmount)],
  ], accessToken)
}

/* ─── Investments ─── */

export async function fetchInvestments(accessToken: string): Promise<{ holdings: Holding[]; trades: Trade[] }> {
  const rows = await fetchSheet(SHEET_NAMES.investments, "A2:G500", accessToken)

  const tradesData: Trade[] = []
  const holdingsMap = new Map<string, { name: string; totalQty: number; totalCost: number }>()

  for (let i = 0; i < rows.length; i++) {
    const row = rows[i]
    const date = row[0] ?? ""
    const symbol = row[1] ?? ""
    const action = (row[2] ?? "BUY") as "BUY" | "SELL"
    const quantity = parseFloat(row[3] ?? "0")
    const price = parseFloat(row[4] ?? "0")
    const total = parseFloat(row[5] ?? "0")
    const name = row[6] ?? symbol

    tradesData.push({ date, symbol, action, quantity, price, total, sheetRow: i + 2 })

    if (!holdingsMap.has(symbol)) {
      holdingsMap.set(symbol, { name, totalQty: 0, totalCost: 0 })
    }
    const h = holdingsMap.get(symbol)!
    if (action === "BUY") {
      h.totalQty += quantity
      h.totalCost += total
    } else {
      h.totalQty -= quantity
      h.totalCost -= quantity * (h.totalCost / (h.totalQty || 1))
    }
  }

  const totalMarketValue = Array.from(holdingsMap.entries()).reduce((sum, [, h]) => {
    return sum + h.totalQty * (h.totalCost / (h.totalQty || 1))
  }, 0)

  const holdings: Holding[] = Array.from(holdingsMap.entries())
    .filter(([, h]) => h.totalQty > 0)
    .map(([symbol, h]) => {
      const avgCost = h.totalCost / h.totalQty
      const currentPrice = avgCost * 1.15 // placeholder — real price from API
      const marketValue = h.totalQty * currentPrice
      const pnl = marketValue - h.totalCost
      return {
        symbol,
        name: h.name,
        quantity: h.totalQty,
        avgCost,
        currentPrice,
        marketValue,
        totalCost: h.totalCost,
        pnl,
        pnlPercent: (pnl / h.totalCost) * 100,
        allocation: totalMarketValue > 0 ? (marketValue / totalMarketValue) * 100 : 0,
      }
    })

  return { holdings, trades: tradesData }
}

/* ─── Net Worth ─── */

export async function fetchNetWorth(accessToken: string): Promise<NetWorthSnapshot[]> {
  const rows = await fetchSheet(SHEET_NAMES.netWorth, "A2:D100", accessToken)
  return rows.map((row) => ({
    month: row[0] ?? "",
    assets: parseFloat(row[1] ?? "0"),
    liabilities: parseFloat(row[2] ?? "0"),
    netWorth: parseFloat(row[3] ?? "0"),
  }))
}

/* ─── User Profile ─── */

export async function fetchUserProfile(accessToken: string) {
  const res = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  if (!res.ok) throw new Error("Failed to fetch user profile")
  return res.json() as Promise<{ name: string; email: string; picture?: string }>
}

export { deleteSheetRow }
