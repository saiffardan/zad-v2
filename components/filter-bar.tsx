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
    <div className={cn("glass flex items-center gap-0.5 rounded-full p-1", className)}>
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={cn(
            "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300",
            value === opt.value
              ? "bg-foreground/10 text-foreground"
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

interface MonthSelectorProps {
  value: number
  onChange: (month: number) => void
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

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
