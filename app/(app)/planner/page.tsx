"use client"

import { useState, useMemo } from "react"
import { MOCK_CATEGORIES, MOCK_BUDGET_ENTRIES, MOCK_BUDGETS, MOCK_NET_WORTH, aggregateMockByType } from "@/lib/mock-data"
import { formatK } from "@/lib/format"
import { FilterBar } from "@/components/filter-bar"
import type { CategoryType } from "@/lib/types"
import { cn } from "@/lib/utils"

type PlannerTab = "budget" | "categories" | "networth"

const TAB_OPTIONS: { value: PlannerTab; label: string }[] = [
  { value: "budget", label: "Budget" },
  { value: "categories", label: "Categories" },
  { value: "networth", label: "Net Worth" },
]

function MiniBar({ pct }: { pct: number }) {
  return (
    <div className="h-1.5 w-full rounded-full bg-foreground/5">
      <div
        className="h-full rounded-full bg-foreground transition-all duration-500"
        style={{
          width: `${Math.min(pct, 100)}%`,
          opacity: 0.7,
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
    </div>
  )
}

function NetWorthChart({ data }: { data: typeof MOCK_NET_WORTH }) {
  if (data.length === 0) return null

  const maxVal = Math.max(...data.map((d) => Math.max(d.assets, d.netWorth)))
  const minVal = Math.min(...data.map((d) => Math.min(d.liabilities, d.netWorth)))
  const range = maxVal - minVal || 1
  const height = 160
  const width = 100

  const getY = (val: number) => height - ((val - minVal) / range) * height

  const netWorthPoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    return `${x},${getY(d.netWorth)}`
  }).join(" ")

  const assetsPoints = data.map((d, i) => {
    const x = (i / (data.length - 1)) * width
    return `${x},${getY(d.assets)}`
  }).join(" ")

  // Fill area under net worth line
  const fillPoints = `0,${height} ${netWorthPoints} ${width},${height}`

  const latest = data[data.length - 1]
  const prev = data[data.length - 2]
  const change = latest.netWorth - (prev?.netWorth ?? latest.netWorth)
  const changePct = prev ? ((change / prev.netWorth) * 100).toFixed(1) : "0.0"

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-3 gap-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            Net Worth
          </span>
          <span className="font-mono text-xl font-semibold text-zad-accent">
            {formatK(latest.netWorth)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            Assets
          </span>
          <span className="font-mono text-xl font-semibold">
            {formatK(latest.assets)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            Liabilities
          </span>
          <span className="font-mono text-xl font-semibold text-text-secondary">
            {formatK(latest.liabilities)}
          </span>
        </div>
      </div>

      <div className="relative">
        <svg viewBox={`0 0 ${width} ${height}`} className="h-40 w-full" preserveAspectRatio="none">
          {/* Fill area */}
          <polygon
            points={fillPoints}
            fill="var(--zad-accent)"
            opacity="0.08"
          />
          {/* Assets dashed line */}
          <polyline
            points={assetsPoints}
            fill="none"
            stroke="var(--text-tertiary)"
            strokeWidth="0.8"
            strokeDasharray="2 2"
            vectorEffect="non-scaling-stroke"
          />
          {/* Net worth solid line */}
          <polyline
            points={netWorthPoints}
            fill="none"
            stroke="var(--zad-accent)"
            strokeWidth="1.5"
            vectorEffect="non-scaling-stroke"
          />
          {data.map((d, i) => (
            <circle
              key={d.month}
              cx={(i / (data.length - 1)) * width}
              cy={getY(d.netWorth)}
              r="1.5"
              fill="var(--zad-accent)"
              vectorEffect="non-scaling-stroke"
            />
          ))}
        </svg>

        <div className="mt-1 flex justify-between">
          {data.map((d) => (
            <span key={d.month} className="text-[10px] text-text-tertiary">
              {d.month.slice(5)}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-text-secondary">
        <span>MoM change:</span>
        <span
          className="font-mono font-medium"
          style={{ color: change >= 0 ? "var(--zad-accent)" : "var(--muted-foreground)" }}
        >
          {change >= 0 ? "+" : ""}{formatK(change)} ({changePct}%)
        </span>
      </div>
    </div>
  )
}

export default function PlannerPage() {
  const [tab, setTab] = useState<PlannerTab>("budget")
  const [expandedType, setExpandedType] = useState<string | null>("EXPENSES")

  const { income, expenses, savings, debt } = aggregateMockByType()

  const budgetSummary = [
    { type: "INCOME" as const, label: "Income", tracked: income, budget: MOCK_BUDGETS.INCOME },
    { type: "EXPENSES" as const, label: "Expenses", tracked: Math.abs(expenses), budget: MOCK_BUDGETS.EXPENSES },
    { type: "SAVINGS" as const, label: "Savings", tracked: Math.abs(savings), budget: MOCK_BUDGETS.SAVINGS },
    { type: "DEBT" as const, label: "Debt", tracked: Math.abs(debt), budget: MOCK_BUDGETS.DEBT },
  ]

  const categoriesByType = useMemo(() => {
    const map = new Map<string, typeof MOCK_BUDGET_ENTRIES>()
    for (const entry of MOCK_BUDGET_ENTRIES) {
      const list = map.get(entry.type) ?? []
      list.push(entry)
      map.set(entry.type, list)
    }
    return map
  }, [])

  return (
    <div className="space-y-4">
      <FilterBar options={TAB_OPTIONS} value={tab} onChange={setTab} />

      {/* Budget tab */}
      {tab === "budget" && (
        <div className="space-y-4">
          <div className="glass rounded-2xl p-6">
            <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Monthly Budget
            </h2>

            <div className="flex flex-col gap-5">
              {budgetSummary.map((row) => {
                const pct = row.budget > 0 ? (row.tracked / row.budget) * 100 : 0
                const isExpanded = expandedType === row.type
                const entries = categoriesByType.get(row.type) ?? []

                return (
                  <div key={row.type}>
                    <button
                      type="button"
                      className="flex w-full flex-col gap-1.5"
                      onClick={() => setExpandedType(isExpanded ? null : row.type)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-medium">{row.label}</span>
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth={2}
                            className={cn(
                              "h-3 w-3 text-text-tertiary transition-transform duration-300",
                              isExpanded && "rotate-180"
                            )}
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs tabular-nums">
                            <span>{formatK(row.tracked)}</span>
                            <span className="text-text-tertiary"> / {formatK(row.budget)}</span>
                          </span>
                          <span
                            className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                            style={{
                              color: pct >= 75 ? "var(--zad-accent)" : "var(--muted-foreground)",
                              backgroundColor: pct >= 75 ? "var(--zad-accent-dim)" : "var(--muted)",
                            }}
                          >
                            {pct.toFixed(0)}%
                          </span>
                        </div>
                      </div>
                      <MiniBar pct={pct} />
                    </button>

                    {isExpanded && entries.length > 0 && (
                      <div className="mt-3 flex flex-col gap-2.5 pl-4">
                        {entries.map((entry) => {
                          const entryPct = entry.budgetAmount > 0
                            ? (entry.trackedAmount / entry.budgetAmount) * 100
                            : 0
                          return (
                            <div key={entry.category} className="flex flex-col gap-1">
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-text-secondary">{entry.category}</span>
                                <span className="font-mono text-[11px] tabular-nums">
                                  <span>{formatK(entry.trackedAmount)}</span>
                                  <span className="text-text-tertiary"> / {formatK(entry.budgetAmount)}</span>
                                </span>
                              </div>
                              <MiniBar pct={entryPct} />
                            </div>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {/* Allocation bar */}
          <div className="glass rounded-2xl p-6">
            <h2 className="mb-3 text-xs font-medium uppercase tracking-wider text-text-tertiary">
              Budget Allocation
            </h2>
            <div className="flex h-3 overflow-hidden rounded-full">
              {budgetSummary.filter(r => r.type !== "INCOME").map((row, i) => {
                const total = budgetSummary
                  .filter(r => r.type !== "INCOME")
                  .reduce((s, r) => s + r.budget, 0)
                return (
                  <div
                    key={row.type}
                    className="bg-foreground transition-all duration-500"
                    style={{
                      width: `${(row.budget / total) * 100}%`,
                      opacity: 1 - i * 0.25,
                    }}
                  />
                )
              })}
            </div>
            <div className="mt-3 flex gap-4">
              {budgetSummary.filter(r => r.type !== "INCOME").map((row, i) => (
                <div key={row.type} className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-sm bg-foreground"
                    style={{ opacity: 1 - i * 0.25 }}
                  />
                  <span className="text-xs text-text-secondary">{row.label}</span>
                  <span className="font-mono text-xs text-text-tertiary">{formatK(row.budget)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Categories tab */}
      {tab === "categories" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Categories ({MOCK_CATEGORIES.length})
          </h2>

          <div className="flex flex-col">
            {(["INCOME", "EXPENSES", "SAVINGS", "DEBT"] as CategoryType[]).map((type, i) => {
              const cats = MOCK_CATEGORIES.filter((c) => c.type === type)
              return (
                <div key={type} className="border-b border-border/50 py-3.5 last:border-0">
                  <div className="mb-2 flex items-center gap-2">
                    <span
                      className="h-2.5 w-2.5 rounded-sm bg-foreground"
                      style={{ opacity: 1 - i * 0.2 }}
                    />
                    <span className="text-sm font-medium">{type}</span>
                    <span className="text-xs text-text-tertiary">({cats.length})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 pl-5">
                    {cats.map((cat) => (
                      <span
                        key={cat.name}
                        className="glass rounded-full px-3 py-1 text-xs text-text-secondary"
                      >
                        {cat.name}
                        {cat.budget !== undefined && (
                          <span className="ml-1.5 font-mono text-text-tertiary">{formatK(cat.budget)}</span>
                        )}
                      </span>
                    ))}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* Net Worth tab */}
      {tab === "networth" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Net Worth Trend
          </h2>
          <NetWorthChart data={MOCK_NET_WORTH} />
        </div>
      )}
    </div>
  )
}
