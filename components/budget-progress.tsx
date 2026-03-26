"use client"

import { useEffect, useRef, useState } from "react"
import { formatK } from "@/lib/format"
import { TICK_COUNT, TICK_STAGGER_MS } from "@/lib/constants"

interface BudgetRow {
  label: string
  tracked: number
  budget: number
  color: string
  /** For income/savings: being ahead is good. For expenses/debt: being behind is good. */
  invertStatus?: boolean
}

interface BudgetProgressProps {
  rows: BudgetRow[]
}

function getStatus(
  pct: number,
  invert: boolean
): { label: string; color: string } {
  if (invert) {
    // Expenses/Debt: lower is better
    if (pct >= 100) return { label: "Over budget", color: "var(--financial-red)" }
    if (pct >= 85) return { label: "Near limit", color: "var(--financial-amber)" }
    if (pct >= 50) return { label: "On track", color: "var(--financial-green)" }
    return { label: "Well under", color: "var(--financial-green)" }
  }
  // Income/Savings: higher is better
  if (pct >= 100) return { label: "Complete", color: "var(--financial-green)" }
  if (pct >= 75) return { label: "On track", color: "var(--financial-green)" }
  if (pct >= 50) return { label: "Behind", color: "var(--financial-amber)" }
  return { label: "Behind", color: "var(--financial-red)" }
}

function TickBar({
  pct,
  color,
  animate,
}: {
  pct: number
  color: string
  animate: boolean
}) {
  const filledCount = Math.round((Math.min(pct, 100) / 100) * TICK_COUNT)

  return (
    <div className="flex gap-[1px]">
      {Array.from({ length: TICK_COUNT }, (_, i) => {
        const isFilled = i < filledCount
        return (
          <div
            key={i}
            className="h-2 flex-1 rounded-[1px]"
            style={{
              backgroundColor: isFilled ? color : "var(--muted)",
              opacity: animate && isFilled ? 1 : isFilled ? 1 : 0.4,
              transition: animate
                ? `opacity ${TICK_STAGGER_MS}ms ease ${i * TICK_STAGGER_MS}ms, background-color ${TICK_STAGGER_MS}ms ease ${i * TICK_STAGGER_MS}ms`
                : "none",
            }}
          />
        )
      })}
    </div>
  )
}

export function BudgetProgress({ rows }: BudgetProgressProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [animate, setAnimate] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimate(true)
          observer.disconnect()
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="shadow-card flex flex-col gap-4 rounded-xl bg-card p-6"
    >
      <h2 className="text-text-secondary text-xs font-medium uppercase tracking-wider">
        Budget Progress
      </h2>

      <div className="flex flex-col gap-5">
        {rows.map((row) => {
          const pct = row.budget > 0 ? (row.tracked / row.budget) * 100 : 0
          const status = getStatus(pct, !!row.invertStatus)

          return (
            <div key={row.label} className="flex flex-col gap-1.5">
              {/* Header row */}
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tabular-nums">
                    <span style={{ color: row.color }}>
                      {formatK(row.tracked)}
                    </span>
                    <span className="text-text-tertiary">
                      {" "}
                      / {formatK(row.budget)}
                    </span>
                  </span>
                  <span
                    className="rounded-md px-1.5 py-0.5 text-[10px] font-medium"
                    style={{
                      color: status.color,
                      backgroundColor: `color-mix(in srgb, ${status.color} 12%, transparent)`,
                    }}
                  >
                    {pct.toFixed(0)}%
                  </span>
                </div>
              </div>

              {/* Tick bar */}
              <TickBar pct={pct} color={row.color} animate={animate} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
