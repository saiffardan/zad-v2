"use client"

import { cn } from "@/lib/utils"

interface FilterOption<T extends string> {
  value: T
  label: string
}

interface FilterBarProps<T extends string> {
  options: FilterOption<T>[]
  value: T
  onChange: (value: T) => void
  className?: string
}

export function FilterBar<T extends string>({
  options,
  value,
  onChange,
  className,
}: FilterBarProps<T>) {
  return (
    <div className={cn("flex items-center gap-1 rounded-full bg-secondary p-1", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full px-3 py-1 text-xs font-medium transition-all duration-300",
            value === opt.value
              ? "bg-background text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
          )}
          style={{
            transitionTimingFunction: "cubic-bezier(0.34, 1.4, 0.64, 1)",
          }}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}

interface YearSelectorProps {
  years: number[]
  value: number
  onChange: (year: number) => void
}

export function YearSelector({ years, value, onChange }: YearSelectorProps) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="rounded-lg border border-border bg-secondary px-2 py-1 text-xs font-medium text-foreground outline-none transition-colors focus:ring-1 focus:ring-ring"
    >
      {years.map((y) => (
        <option key={y} value={y}>{y}</option>
      ))}
    </select>
  )
}

interface MonthSelectorProps {
  value: number
  onChange: (month: number) => void
}

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
]

export function MonthSelector({ value, onChange }: MonthSelectorProps) {
  return (
    <div className="flex flex-wrap gap-1">
      <button
        type="button"
        onClick={() => onChange(0)}
        className={cn(
          "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-300",
          value === 0
            ? "bg-foreground text-background"
            : "text-muted-foreground hover:text-foreground"
        )}
      >
        All
      </button>
      {MONTHS.map((m, i) => (
        <button
          key={m}
          type="button"
          onClick={() => onChange(i + 1)}
          className={cn(
            "rounded-full px-2.5 py-1 text-[11px] font-medium transition-all duration-300",
            value === i + 1
              ? "bg-foreground text-background"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          {m}
        </button>
      ))}
    </div>
  )
}
