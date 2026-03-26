"use client"

import { useEffect, useRef, useState } from "react"
import { formatK } from "@/lib/format"
import { TICK_COUNT, TICK_STAGGER_MS } from "@/lib/constants"

interface BudgetRow {
  label: string
  tracked: number
  budget: number
  invertStatus?: boolean
}

interface BudgetProgressProps {
  rows: BudgetRow[]
}

function getStatus(pct: number, invert: boolean): { label: string; isGood: boolean } {
  if (invert) {
    if (pct >= 100) return { label: "Over budget", isGood: false }
    if (pct >= 85) return { label: "Near limit", isGood: false }
    return { label: "On track", isGood: true }
  }
  if (pct >= 100) return { label: "Complete", isGood: true }
  if (pct >= 75) return { label: "On track", isGood: true }
  return { label: "Behind", isGood: false }
}

function TickBar({ pct, animate }: { pct: number; animate: boolean }) {
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
              backgroundColor: isFilled ? "var(--foreground)" : "var(--muted)",
              opacity: animate && isFilled ? 0.9 : isFilled ? 0.9 : 0.2,
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
    <div ref={ref} className="glass flex flex-col gap-4 rounded-2xl p-6">
      <h2 className="text-xs font-medium uppercase tracking-wider text-text-tertiary">
        Budget Progress
      </h2>

      <div className="flex flex-col gap-5">
        {rows.map((row) => {
          const pct = row.budget > 0 ? (row.tracked / row.budget) * 100 : 0
          const status = getStatus(pct, !!row.invertStatus)

          return (
            <div key={row.label} className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">{row.label}</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-xs tabular-nums">
                    <span className="text-foreground">{formatK(row.tracked)}</span>
                    <span className="text-text-tertiary"> / {formatK(row.budget)}</span>
                  </span>
                  <span
                    className="rounded-full px-2 py-0.5 text-[10px] font-medium"
                    style={{
                      color: status.isGood ? "var(--zad-accent)" : "var(--muted-foreground)",
                      backgroundColor: status.isGood ? "var(--zad-accent-dim)" : "var(--muted)",
                    }}
                  >
                    {pct.toFixed(0)}%
                  </span>
                </div>
              </div>
              <TickBar pct={pct} animate={animate} />
            </div>
          )
        })}
      </div>
    </div>
  )
}
