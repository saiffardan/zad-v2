"use client"

import { DonutChart } from "@/components/donut-chart"
import { aggregateMockByType } from "@/lib/mock-data"
import { formatK } from "@/lib/format"

export default function DashboardPage() {
  const { income, expenses, savings, debt } = aggregateMockByType()

  const totalOut = Math.abs(expenses) + Math.abs(savings) + Math.abs(debt)
  const remaining = income - totalOut
  const savingsRate = income > 0 ? (Math.abs(savings) / income) * 100 : 0

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

  return (
    <div className="space-y-4">
      {/* Hero card: income + donut */}
      <div className="shadow-card flex items-center justify-between gap-4 rounded-xl bg-card p-6">
        <div className="flex flex-col gap-5">
          {/* Income header */}
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

          {/* Breakdown column */}
          <div className="flex w-full max-w-[240px] flex-col gap-3">
            {breakdownRows.map((row) => (
              <div key={row.label} className="flex items-center">
                <span
                  className="mr-2.5 h-2.5 w-2.5 shrink-0 rounded-sm"
                  style={{ backgroundColor: row.color }}
                />
                <span className="text-text-secondary w-20 text-sm">
                  {row.label}
                </span>
                <span
                  className="ml-auto min-w-[56px] text-right font-mono text-sm font-medium tabular-nums"
                  style={{ color: row.color }}
                >
                  {formatK(row.value)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Donut chart */}
        <DonutChart
          segments={donutSegments}
          size={200}
          formatValue={formatK}
          centerSubtitle={`of ${formatK(income)}`}
          className="shrink-0"
        />
      </div>

      {/* Stat cards row */}
      <div className="grid grid-cols-2 gap-4">
        <div className="shadow-card flex flex-col gap-1 rounded-xl bg-card p-4">
          <span className="text-text-secondary text-[11px] font-medium uppercase tracking-wider">
            Savings Rate
          </span>
          <span
            className="font-mono text-2xl font-semibold leading-tight"
            style={{ color: "var(--financial-blue)" }}
          >
            {savingsRate.toFixed(1)}%
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
        </div>
      </div>
    </div>
  )
}
