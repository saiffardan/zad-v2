"use client"

import { useState, useMemo } from "react"
import { DonutChart } from "@/components/donut-chart"
import { BudgetProgress } from "@/components/budget-progress"
import { TransactionTable } from "@/components/transaction-table"
import { CategoryBreakdown } from "@/components/category-breakdown"
import { FilterBar, MonthSelector } from "@/components/filter-bar"
import { aggregateMockByType, MOCK_BUDGETS, MOCK_TRANSACTIONS, MOCK_CATEGORIES, parseDate } from "@/lib/mock-data"
import { formatK } from "@/lib/format"

type DashboardTab = "overview" | "breakdown" | "transactions"

const TAB_OPTIONS: { value: DashboardTab; label: string }[] = [
  { value: "overview", label: "Overview" },
  { value: "breakdown", label: "Breakdown" },
  { value: "transactions", label: "Transactions" },
]

export default function DashboardPage() {
  const [tab, setTab] = useState<DashboardTab>("overview")
  const [month, setMonth] = useState(3)
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

  const donutSegments = [
    { label: "Expenses", value: Math.abs(expenses) },
    { label: "Savings", value: Math.abs(savings), opacity: 0.6 },
    { label: "Debt", value: Math.abs(debt), opacity: 0.35 },
    { label: "Remaining", value: Math.abs(remaining), opacity: 0.1 },
  ]

  const breakdownRows = [
    { label: "Expenses", value: Math.abs(expenses) },
    { label: "Debt", value: Math.abs(debt) },
    { label: "Savings", value: Math.abs(savings) },
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

      {/* ── Overview ── */}
      {tab === "overview" && (
        <div className="space-y-4">
          {/* Hero card */}
          <div className="glass grid grid-cols-2 overflow-hidden rounded-2xl">
            <div className="flex flex-col gap-5 p-6">
              <div>
                <p className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
                  Monthly Income
                </p>
                <p className="mt-1 font-mono text-sm font-medium text-text-secondary">AED</p>
                <p className="font-mono text-4xl font-semibold leading-none tracking-tight text-zad-accent">
                  {formatK(income)}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {breakdownRows.map((row, i) => (
                  <div key={row.label} className="flex items-center">
                    <span
                      className="mr-2.5 h-2 w-2 shrink-0 rounded-full bg-foreground"
                      style={{ opacity: 1 - i * 0.3 }}
                    />
                    <span className="text-sm text-text-secondary">{row.label}</span>
                    <span className="ml-auto font-mono text-sm font-medium tabular-nums">
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

          {/* Stat cards */}
          <div className="grid grid-cols-2 gap-4">
            <div className="glass flex flex-col gap-1 rounded-2xl p-5">
              <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
                Unallocated
              </span>
              <span className="font-mono text-2xl font-semibold leading-tight text-zad-accent">
                {formatK(Math.abs(remaining))}
              </span>
              <span className="text-[11px] text-text-tertiary">
                {unallocatedPct.toFixed(1)}% of gross income
              </span>
            </div>
            <div className="glass flex flex-col gap-1 rounded-2xl p-5">
              <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
                Total Out
              </span>
              <span className="font-mono text-2xl font-semibold leading-tight">
                {formatK(totalOut)}
              </span>
              <span className="text-[11px] text-text-tertiary">
                Exp + Sav + Debt
              </span>
            </div>
          </div>

          {/* Budget Progress */}
          <BudgetProgress
            rows={[
              { label: "Income", tracked: income, budget: MOCK_BUDGETS.INCOME },
              { label: "Expenses", tracked: Math.abs(expenses), budget: MOCK_BUDGETS.EXPENSES, invertStatus: true },
              { label: "Savings", tracked: Math.abs(savings), budget: MOCK_BUDGETS.SAVINGS },
              { label: "Debt", tracked: Math.abs(debt), budget: MOCK_BUDGETS.DEBT, invertStatus: true },
            ]}
          />
        </div>
      )}

      {/* ── Breakdown ── */}
      {tab === "breakdown" && (
        <CategoryBreakdown transactions={filteredTransactions} budgetMap={budgetMap} />
      )}

      {/* ── Transactions ── */}
      {tab === "transactions" && (
        <div className="space-y-3">
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

          <div className="glass rounded-2xl px-5 py-1">
            <TransactionTable transactions={filteredTransactions} />
          </div>
        </div>
      )}
    </div>
  )
}
