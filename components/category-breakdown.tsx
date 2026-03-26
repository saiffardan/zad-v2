"use client"

import { useState } from "react"
import type { Transaction, CategoryType } from "@/lib/types"
import { formatK } from "@/lib/format"
import { CATEGORY_COLORS, TICK_COUNT, TICK_STAGGER_MS } from "@/lib/constants"
import { aggregateByCategory } from "@/lib/mock-data"
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

function MiniTickBar({ pct, color }: { pct: number; color: string }) {
  const filledCount = Math.round((Math.min(pct, 100) / 100) * TICK_COUNT)
  return (
    <div className="flex gap-[1px]">
      {Array.from({ length: TICK_COUNT }, (_, i) => (
        <div
          key={i}
          className="h-1.5 flex-1 rounded-[0.5px]"
          style={{
            backgroundColor: i < filledCount ? color : "var(--muted)",
            opacity: i < filledCount ? 1 : 0.4,
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
    <div className="shadow-card flex flex-col gap-2 rounded-xl bg-card p-6">
      <h2 className="text-text-secondary text-xs font-medium uppercase tracking-wider">
        Breakdown by Category
      </h2>

      <div className="flex flex-col">
        {SECTIONS.map(({ type, label }) => {
          const categories = aggregateByCategory(transactions, type)
          const typeColor = CATEGORY_COLORS[type]
          const typeTotal = categories.reduce((s, c) => s + Math.abs(c.amount), 0)
          const isOpen = openSections.has(type)

          return (
            <div key={type} className="border-b border-border/50 last:border-0">
              {/* Section header */}
              <button
                type="button"
                className="flex w-full items-center justify-between py-3 text-left"
                onClick={() => toggle(type)}
              >
                <div className="flex items-center gap-2">
                  <span
                    className="h-2.5 w-2.5 rounded-sm"
                    style={{ backgroundColor: typeColor }}
                  />
                  <span className="text-sm font-medium">{label}</span>
                  <span className="text-text-tertiary text-xs">
                    ({categories.length})
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className="font-mono text-sm font-medium tabular-nums"
                    style={{ color: typeColor }}
                  >
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

              {/* Category rows */}
              {isOpen && (
                <div className="flex flex-col gap-3 pb-3 pl-5">
                  {categories.map(({ category, amount }) => {
                    const absAmount = Math.abs(amount)
                    const budget = budgetMap?.get(category)
                    const pct = budget && budget > 0 ? (absAmount / budget) * 100 : null

                    return (
                      <div key={category} className="flex flex-col gap-1">
                        <div className="flex items-center justify-between">
                          <span className="text-xs text-text-secondary">{category}</span>
                          <div className="flex items-center gap-2">
                            <span
                              className="font-mono text-xs font-medium tabular-nums"
                              style={{ color: typeColor }}
                            >
                              {formatK(absAmount)}
                            </span>
                            {budget !== undefined && (
                              <span className="font-mono text-[10px] text-text-tertiary tabular-nums">
                                / {formatK(budget)}
                              </span>
                            )}
                          </div>
                        </div>
                        {pct !== null && (
                          <MiniTickBar pct={pct} color={typeColor} />
                        )}
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
