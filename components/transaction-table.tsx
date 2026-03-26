"use client"

import { useState } from "react"
import type { Transaction } from "@/lib/types"
import { formatCurrency, formatDate } from "@/lib/format"
import { CATEGORY_COLORS } from "@/lib/constants"
import { cn } from "@/lib/utils"

interface TransactionTableProps {
  transactions: Transaction[]
  onEdit?: (txn: Transaction) => void
  onDelete?: (txn: Transaction) => void
}

export function TransactionTable({ transactions, onEdit, onDelete }: TransactionTableProps) {
  const [expandedRow, setExpandedRow] = useState<number | null>(null)

  if (transactions.length === 0) {
    return (
      <div className="flex h-32 items-center justify-center text-text-tertiary text-sm">
        No transactions found
      </div>
    )
  }

  return (
    <div className="flex flex-col divide-y divide-border">
      {transactions.map((txn) => {
        const isExpanded = expandedRow === txn.sheetRow
        const isPositive = txn.amount > 0
        const typeColor = CATEGORY_COLORS[txn.type] ?? "var(--muted-foreground)"

        return (
          <div key={txn.sheetRow}>
            <button
              type="button"
              className="flex w-full items-center gap-3 px-1 py-3 text-left transition-colors hover:bg-secondary/50"
              onClick={() => setExpandedRow(isExpanded ? null : txn.sheetRow)}
            >
              {/* Color dot */}
              <span
                className="h-2 w-2 shrink-0 rounded-full"
                style={{ backgroundColor: typeColor }}
              />

              {/* Category + description */}
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{txn.category}</p>
                <p className="truncate text-xs text-text-tertiary">{txn.description}</p>
              </div>

              {/* Amount + date */}
              <div className="shrink-0 text-right">
                <p
                  className={cn(
                    "font-mono text-sm font-medium tabular-nums",
                  )}
                  style={{ color: isPositive ? "var(--financial-green)" : "var(--financial-red)" }}
                >
                  {isPositive ? "+" : "-"}{formatCurrency(txn.amount)}
                </p>
                <p className="text-[11px] text-text-tertiary">{formatDate(txn.date)}</p>
              </div>
            </button>

            {/* Expanded details */}
            {isExpanded && (
              <div className="flex items-center gap-3 border-t border-border/50 px-1 py-2">
                <div className="flex flex-1 gap-4 text-xs text-text-secondary">
                  <span>Type: <span className="font-medium" style={{ color: typeColor }}>{txn.type}</span></span>
                  <span>Account: <span className="font-medium">{txn.account}</span></span>
                  <span>Date: <span className="font-medium">{txn.date}</span></span>
                </div>
                {(onEdit || onDelete) && (
                  <div className="flex gap-2">
                    {onEdit && (
                      <button
                        type="button"
                        onClick={() => onEdit(txn)}
                        className="rounded-md px-2 py-1 text-xs text-text-secondary transition-colors hover:bg-secondary hover:text-foreground"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        type="button"
                        onClick={() => onDelete(txn)}
                        className="rounded-md px-2 py-1 text-xs text-financial-red transition-colors hover:bg-secondary"
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
