"use client"

import { useState } from "react"
import type { Transaction, CategoryType } from "@/lib/types"
import { formatK } from "@/lib/format"
import { aggregateByCategory } from "@/lib/mock-data"
import { TICK_COUNT } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface CategoryBreakdownProps {
  transactions: Transaction[]
  budgetMap?: Map<string, number>
}

const SECTIONS: { type: CategoryType; label: string }[] = [
  { type: "EXPENSES", label: "Expenses" },
  { type: "SAVINGS", label: "Savings" },
  { type: "DEBT", label: "Debt" },
  { type: "INCOME", label: "Income" },
]

function MiniTickBar({ pct }: { pct: number }) {
  const filledCount = Math.round((Math.min(pct, 100) / 100) * TICK_COUNT)
  return (
    <div className="flex gap-[1px]">
      {Array.from({ length: TICK_COUNT }, (_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-[0.5px]"
          style={{
            backgroundColor: i < filledCount ? "var(--foreground)" : "var(--muted)",
            opacity: i < filledCount ? 0.7 : 0.2,
          }}
        />
      ))}
    </div>
  )
}

export function CategoryBreakdown({ transactions, budgetMap }: CategoryBreakdownProps) {
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["EXPENSES"]))

  const toggle = (type: string) => {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(type)) next.delete(type)
      else next.add(type)
      return next
    })
  }

  return (
    <div className="glass flex flex-col gap-2 rounded-2xl p-6">
      <h2 className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
        Breakdown by Category
      </h2>

      <div className="flex flex-col">
        {SECTIONS.map(({ type, label }) => {
          const categories = aggregateByCategory(transactions, type)
          const typeTotal = categories.reduce((s, c) => s + Math.abs(c.amount), 0)
          const isOpen = openSections.has(type)

          return (
            <div key={type} className="border-b border-border/50 last:border-0">
              <button
                type="button"
                className="flex w-full items-center justify-between py-3.5 text-left"
                onClick={() => toggle(type)}
              >
                <div className="flex items-center gap-2.5">
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-xs text-text-tertiary">({categories.length})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-medium tabular-nums">
                    {formatK(typeTotal)}
                  </span>
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className={cn(
                      "h-3.5 w-3.5 text-text-tertiary transition-transform duration-300",
                      isOpen && "rotate-180"
                    )}
                    style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="flex flex-col gap-3 pb-4 pl-0">
                  {categories.map(({ category, amount }) => {
                    const absAmount = Math.abs(amount)
                    const budget = budgetMap?.get(category)
                    const pct = budget && budget > 0 ? (absAmount / budget) * 100 : null

                    return (
                      <div key={category} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-secondary">{category}</span>
                          <div className="flex items-center gap-2">
                            <span className="font-mono text-xs font-medium tabular-nums">
                              {formatK(absAmount)}
                            </span>
                            {budget !== undefined && (
                              <span className="font-mono text-[10px] tabular-nums text-text-tertiary">
                                / {formatK(budget)}
                              </span>
                            )}
                          </div>
                        </div>
                        {pct !== null && <MiniTickBar pct={pct} />}
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
  )
}
