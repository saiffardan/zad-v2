"use client"

import { useState, useMemo } from "react"
import { MOCK_HOLDINGS, MOCK_TRADES, getPortfolioSummary } from "@/lib/mock-data"
import { formatCurrency, formatPercent, formatDate } from "@/lib/format"
import { FilterBar } from "@/components/filter-bar"
import { cn } from "@/lib/utils"

type PortfolioTab = "holdings" | "trades" | "allocation"

const TAB_OPTIONS: { value: PortfolioTab; label: string }[] = [
  { value: "holdings", label: "Holdings" },
  { value: "trades", label: "Trades" },
  { value: "allocation", label: "Allocation" },
]

function AllocationBar({ holdings }: { holdings: typeof MOCK_HOLDINGS }) {
  const total = holdings.reduce((s, h) => s + h.marketValue, 0)

  return (
    <div className="space-y-3">
      <div className="flex h-3 overflow-hidden rounded-full">
        {holdings.map((h, i) => (
          <div
            key={h.symbol}
            className="bg-foreground transition-all duration-500"
            style={{
              width: `${(h.marketValue / total) * 100}%`,
              opacity: 1 - i * 0.12,
              transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
            }}
          />
        ))}
      </div>
      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {holdings.map((h, i) => (
          <div key={h.symbol} className="flex items-center gap-1.5">
            <span
              className="h-2 w-2 rounded-sm bg-foreground"
              style={{ opacity: 1 - i * 0.12 }}
            />
            <span className="text-xs text-text-secondary">{h.symbol}</span>
            <span className="font-mono text-xs text-text-tertiary">
              {h.allocation.toFixed(1)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default function PortfolioPage() {
  const [tab, setTab] = useState<PortfolioTab>("holdings")
  const [sortBy, setSortBy] = useState<"value" | "pnl" | "allocation">("value")

  const summary = useMemo(() => getPortfolioSummary(MOCK_HOLDINGS), [])

  const sortedHoldings = useMemo(() => {
    const h = [...MOCK_HOLDINGS]
    switch (sortBy) {
      case "value": return h.sort((a, b) => b.marketValue - a.marketValue)
      case "pnl": return h.sort((a, b) => b.pnlPercent - a.pnlPercent)
      case "allocation": return h.sort((a, b) => b.allocation - a.allocation)
    }
  }, [sortBy])

  return (
    <div className="space-y-4">
      <FilterBar options={TAB_OPTIONS} value={tab} onChange={setTab} />

      {/* Summary card */}
      <div className="glass grid grid-cols-2 gap-4 rounded-2xl p-6 sm:grid-cols-4">
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            Total Value
          </span>
          <span className="font-mono text-xl font-semibold leading-tight">
            ${formatCurrency(summary.totalValue)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            Total Cost
          </span>
          <span className="font-mono text-xl font-semibold leading-tight text-text-secondary">
            ${formatCurrency(summary.totalCost)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            Total P&L
          </span>
          <span
            className="font-mono text-xl font-semibold leading-tight"
            style={{ color: summary.totalPnl >= 0 ? "var(--zad-accent)" : "var(--foreground)" }}
          >
            {summary.totalPnl >= 0 ? "+" : ""}${formatCurrency(summary.totalPnl)}
          </span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[11px] font-medium uppercase tracking-wider text-text-tertiary">
            Return
          </span>
          <span
            className="font-mono text-xl font-semibold leading-tight"
            style={{ color: summary.totalPnlPercent >= 0 ? "var(--zad-accent)" : "var(--foreground)" }}
          >
            {summary.totalPnlPercent >= 0 ? "+" : ""}{formatPercent(summary.totalPnlPercent)}
          </span>
        </div>
      </div>

      {/* Holdings */}
      {tab === "holdings" && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs text-text-tertiary">{sortedHoldings.length} holdings</span>
            <FilterBar
              options={[
                { value: "value", label: "Value" },
                { value: "pnl", label: "P&L" },
                { value: "allocation", label: "%" },
              ]}
              value={sortBy}
              onChange={setSortBy}
            />
          </div>

          <div className="glass divide-y divide-border rounded-2xl">
            {sortedHoldings.map((h) => (
              <div key={h.symbol} className="flex items-center gap-3 px-5 py-3.5">
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-sm font-semibold">{h.symbol}</p>
                  <p className="truncate text-xs text-text-tertiary">{h.name}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="font-mono text-xs tabular-nums text-text-secondary">
                    {h.quantity} @ ${formatCurrency(h.avgCost)}
                  </p>
                </div>
                <div className="shrink-0 text-right">
                  <p className="font-mono text-sm font-medium tabular-nums">
                    ${formatCurrency(h.marketValue)}
                  </p>
                  <p
                    className="font-mono text-xs tabular-nums"
                    style={{ color: h.pnl >= 0 ? "var(--zad-accent)" : "var(--muted-foreground)" }}
                  >
                    {h.pnl >= 0 ? "+" : ""}{formatPercent(h.pnlPercent)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Trades */}
      {tab === "trades" && (
        <div className="glass divide-y divide-border rounded-2xl">
          {MOCK_TRADES.map((t) => (
            <div key={t.sheetRow} className="flex items-center gap-3 px-5 py-3.5">
              <span
                className={cn(
                  "rounded-full px-2 py-0.5 font-mono text-[10px] font-semibold",
                )}
                style={{
                  color: t.action === "BUY" ? "var(--zad-accent)" : "var(--muted-foreground)",
                  backgroundColor: t.action === "BUY" ? "var(--zad-accent-dim)" : "var(--muted)",
                }}
              >
                {t.action}
              </span>
              <div className="min-w-0 flex-1">
                <p className="font-mono text-sm font-semibold">{t.symbol}</p>
                <p className="text-xs text-text-tertiary">{formatDate(t.date)}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-sm tabular-nums">
                  {t.quantity} @ ${formatCurrency(t.price)}
                </p>
                <p className="font-mono text-xs tabular-nums text-text-secondary">
                  ${formatCurrency(t.total)}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Allocation */}
      {tab === "allocation" && (
        <div className="glass rounded-2xl p-6">
          <h2 className="mb-4 text-xs font-medium uppercase tracking-wider text-text-tertiary">
            Portfolio Allocation
          </h2>
          <AllocationBar holdings={sortedHoldings} />

          <div className="mt-6 divide-y divide-border">
            {sortedHoldings.map((h) => (
              <div key={h.symbol} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-semibold">{h.symbol}</span>
                  <span className="text-xs text-text-tertiary">{h.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-mono text-sm tabular-nums">
                    ${formatCurrency(h.marketValue)}
                  </span>
                  <span className="w-12 text-right font-mono text-xs tabular-nums text-text-secondary">
                    {h.allocation.toFixed(1)}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
