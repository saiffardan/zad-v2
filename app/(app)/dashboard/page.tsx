"use client"

import { useState, useMemo } from "react"
import { DonutChart } from "@/components/donut-chart"
import { BudgetProgress } from "@/components/budget-progress"
import { TransactionTable } from "@/components/transaction-table"
import { CategoryBreakdown } from "@/components/category-breakdown"
import { FilterBar, MonthSelector } from "@/components/filter-bar"
import { aggregateMockByType, MOCK_BUDGETS, MOCK_TRANSACTIONS, MOCK_CATEGORIES, parseDate } from "@/lib/mock-data"
import { formatK } from "@/lib/format"
import { cn } from "@/lib/utils"

type DashboardTab = "overview" | "breakdown" | "transactions"

const TAB_OPTIONS: { value: DashboardTab; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "breakdown", label: "Breakdown" },
  { value: "transactions", label: "Transactions" },
]

export default function DashboardPage() {
  const [tab, setTab] = useState<DashboardTab>("overview")
  const [month, setMonth] = useState(3) // March
  const [typeFilter, setTypeFilter] = useState<string>("All")

  const filteredTransactions = useMemo(() => {
    return MOCK_TRANSACTIONS
      .filter((txn) => {
        if (month > 0) {
          const d = parseDate(txn.date)
          if (d.getMonth() + 1 !== month) return false
        }
        if (typeFilter !== "All" && txn.type !== typeFilter) return false
        return true
      })
      .sort((a, b) => parseDate(b.date).getTime() - parseDate(a.date).getTime())
  }, [month, typeFilter])

  const { income, expenses, savings, debt } = aggregateMockByType()

  const totalOut = Math.abs(expenses) + Math.abs(savings) + Math.abs(debt)
  const remaining = income - totalOut
  const unallocatedPct = income > 0 ? (remaining / income) * 100 : 0

  const remainingCenterColor =
    remaining >= 0 ? "var(--financial-green)" : "var(--financial-red)"

  const donutSegments = [
    { label: "Expenses", value: Math.abs(expenses), color: "var(--financial-red)" },
    { label: "Savings", value: Math.abs(savings), color: "var(--financial-blue)" },
    { label: "Debt", value: Math.abs(debt), color: "var(--financial-amber)" },
    { label: "Remaining", value: Math.abs(remaining), color: "var(--muted-foreground)", centerColor: remainingCenterColor },
  ]

  const breakdownRows = [
    { label: "Expenses", value: Math.abs(expenses), color: "var(--financial-red)" },
    { label: "Debt", value: Math.abs(debt), color: "var(--financial-amber)" },
    { label: "Savings", value: Math.abs(savings), color: "var(--financial-blue)" },
  ]

  const budgetMap = useMemo(() => {
    const map = new Map<string, number>()
    for (const cat of MOCK_CATEGORIES) {
      if (cat.budget) map.set(cat.name, cat.budget)
    }
    return map
  }, [])

  return (
    <div className="space-y-4">
      {/* Tab bar + month selector */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <FilterBar options={TAB_OPTIONS} value={tab} onChange={setTab} />
        <MonthSelector value={month} onChange={setMonth} />
      </div>

      {/* Overview tab */}
      {tab === "overview" && (
        <div className="space-y-4">
          {/* Hero card: income + donut */}
          <div className="shadow-card grid grid-cols-2 overflow-hidden rounded-xl bg-card">
            <div className="flex flex-col gap-5 p-6">
              <div>
                <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">
                  Monthly Income
                </p>
                <p
                  className="font-mono text-sm font-medium leading-relaxed"
                  style={{ color: "var(--financial-green)" }}
                >
                  AED
                </p>
                <p
                  className="font-mono text-4xl font-semibold leading-none tracking-tight"
                  style={{ color: "var(--financial-green)" }}
                >
                  {formatK(income)}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {breakdownRows.map((row) => (
                  <div key={row.label} className="flex items-center">
                    <span
                      className="mr-2.5 h-2.5 w-2.5 shrink-0 rounded-sm"
                      style={{ backgroundColor: row.color }}
                    />
                    <span className="text-text-secondary text-sm">
                      {row.label}
                    </span>
                    <span
                      className="ml-auto font-mono text-sm font-medium tabular-nums"
                      style={{ color: row.color }}
                    >
                      {formatK(row.value)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-center p-4">
              <DonutChart
                segments={donutSegments}
                formatValue={formatK}
                income={income}
              />
            </div>
          </div>

          {/* Stat cards row */}
          <div className="grid grid-cols-2 gap-4">
            <div className="shadow-card flex flex-col gap-1 rounded-xl bg-card p-4">
              <span className="text-text-secondary text-[11px] font-medium uppercase tracking-wider">
                Unallocated
              </span>
              <span
                className="font-mono text-2xl font-semibold leading-tight"
                style={{ color: remaining >= 0 ? "var(--financial-green)" : "var(--financial-red)" }}
              >
                {formatK(Math.abs(remaining))}
              </span>
              <span className="text-text-tertiary text-[11px]">
                {unallocatedPct.toFixed(1)}% of gross income
              </span>
            </div>
            <div className="shadow-card flex flex-col gap-1 rounded-xl bg-card p-4">
              <span className="text-text-secondary text-[11px] font-medium uppercase tracking-wider">
                Total Out
              </span>
              <span
                className="font-mono text-2xl font-semibold leading-tight"
                style={{ color: "var(--financial-red)" }}
              >
                {formatK(totalOut)}
              </span>
              <span className="text-text-tertiary text-[11px]">
                Exp + Sav + Debt
              </span>
            </div>
          </div>

          {/* Budget Progress */}
          <BudgetProgress
            rows={[
              { label: "Income", tracked: income, budget: MOCK_BUDGETS.INCOME, color: "var(--financial-green)" },
              { label: "Expenses", tracked: Math.abs(expenses), budget: MOCK_BUDGETS.EXPENSES, color: "var(--financial-red)", invertStatus: true },
              { label: "Savings", tracked: Math.abs(savings), budget: MOCK_BUDGETS.SAVINGS, color: "var(--financial-blue)" },
              { label: "Debt", tracked: Math.abs(debt), budget: MOCK_BUDGETS.DEBT, color: "var(--financial-amber)", invertStatus: true },
            ]}
          />
        </div>
      )}

      {/* Breakdown tab */}
      {tab === "breakdown" && (
        <CategoryBreakdown
          transactions={filteredTransactions}
          budgetMap={budgetMap}
        />
      )}

      {/* Transactions tab */}
      {tab === "transactions" && (
        <div className="space-y-3">
          {/* Type filter */}
          <FilterBar
            options={[
              { value: "All", label: "All" },
              { value: "INCOME", label: "Income" },
              { value: "EXPENSES", label: "Expenses" },
              { value: "SAVINGS", label: "Savings" },
              { value: "DEBT", label: "Debt" },
            ]}
            value={typeFilter}
            onChange={setTypeFilter}
          />

          <div className="shadow-card rounded-xl bg-card px-4 py-2">
            <TransactionTable transactions={filteredTransactions} />
          </div>
        </div>
      )}
    </div>
  )
}
