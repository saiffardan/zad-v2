"use client"

import { DonutChart } from "@/components/donut-chart"
import { aggregateMockByType } from "@/lib/mock-data"

export default function DashboardPage() {
  const { income, expenses, savings, debt } = aggregateMockByType()

  const totalOut = Math.abs(expenses) + Math.abs(savings) + Math.abs(debt)
  const remaining = income - totalOut
  const savingsRate = income > 0 ? (Math.abs(savings) / income) * 100 : 0

  const remainingColor =
    remaining >= 0 ? "var(--financial-green)" : "var(--financial-red)"

  const donutSegments = [
    { label: "Expenses", value: Math.abs(expenses), color: "var(--financial-red)" },
    { label: "Savings", value: Math.abs(savings), color: "var(--financial-blue)" },
    { label: "Debt", value: Math.abs(debt), color: "var(--financial-amber)" },
    { label: "Remaining", value: Math.abs(remaining), color: remainingColor },
  ]

  const breakdownRows = [
    { label: "Expenses", value: Math.abs(expenses), color: "var(--financial-red)" },
    { label: "Debt", value: Math.abs(debt), color: "var(--financial-amber)" },
    { label: "Savings", value: Math.abs(savings), color: "var(--financial-blue)" },
  ]

  return (
    <div className="space-y-4">
      {/* Hero card: income + donut */}
      <div className="shadow-card flex flex-col items-center gap-6 rounded-xl bg-card p-6 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex flex-col gap-4">
          <div>
            <p className="text-text-secondary text-xs font-medium uppercase tracking-wider">
              Monthly Income
            </p>
            <p
              className="font-mono text-3xl font-semibold leading-tight"
              style={{ color: "var(--financial-green)" }}
            >
              {income.toLocaleString()}{" "}
              <span className="text-text-tertiary text-base font-normal">
                AED
              </span>
            </p>
          </div>

          {/* Breakdown column */}
          <div className="flex flex-col gap-2">
            {breakdownRows.map((row) => (
              <div key={row.label} className="flex items-center gap-2">
                <span
                  className="h-2 w-2 rounded-full"
                  style={{ backgroundColor: row.color }}
                />
                <span className="text-text-secondary text-xs">
                  {row.label}
                </span>
                <span
                  className="font-mono text-sm font-medium"
                  style={{ color: row.color }}
                >
                  {row.value.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        <DonutChart segments={donutSegments} size={180} strokeWidth={12} />
      </div>

      {/* Stat pills row */}
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
            {totalOut.toLocaleString()}{" "}
            <span className="text-text-tertiary text-sm font-normal">AED</span>
          </span>
        </div>
      </div>
    </div>
  )
}
