"use client"

import { useState } from "react"
import type { Transaction } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/format"

interface TransactionTableProps {
  transactions: Transaction[]
  onEdit?: (txn: Transaction) => void
  onDelete?: (txn: Transaction) => void
}

export function TransactionTable({ transactions, onEdit, onDelete }: TransactionTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  if (transactions.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-sm text-text-tertiary">
        No transactions found
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {transactions.map((txn) => {
        const isExpanded = expandedRow === txn.sheetRow
        const isPositive = txn.amount > 0

        return (
          <div key={txn.sheetRow}>
            <button
              type="button"
              className="flex w-full items-center gap-3 px-1 py-3.5 text-left transition-colors hover:bg-foreground/[0.03]"
              onClick={() => setExpandedRow(isExpanded ? null : txn.sheetRow)}
            >
              {/* Accent dot for positive, dim for negative */}
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full"
                style={{
                  backgroundColor: isPositive ? "var(--zad-accent)" : "var(--muted-foreground)",
                }}
              />

              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{txn.category}</p>
                <p className="truncate text-xs text-text-tertiary">{txn.description}</p>
              </div>

              <div className="shrink-0 text-right">
                <p
                  className="font-mono text-sm font-medium tabular-nums"
                  style={{
                    color: isPositive ? "var(--zad-accent)" : "var(--foreground)",
                  }}
                >
                  {isPositive ? "+" : "-"}{formatCurrency(txn.amount)}
                </p>
                <p className="text-[11px] text-text-tertiary">{formatDate(txn.date)}</p>
              </div>
            </button>

            {isExpanded && (
              <div className="flex items-center gap-3 border-t border-border/50 px-1 py-2.5">
                <div className="flex flex-1 gap-4 text-xs text-text-secondary">
                  <span>{txn.type}</span>
                  <span>{txn.account}</span>
                  <span>{txn.date}</span>
                </div>
                {(onEdit || onDelete) && (
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(txn)}
                        className="rounded-lg px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-foreground/5"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(txn)}
                        className="rounded-lg px-2 py-1 text-xs text-destructive transition-colors hover:bg-foreground/5"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
