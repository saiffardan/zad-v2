"use client"

import { useState, useCallback } from "react"
import { cn } from "@/lib/utils"

export interface DonutSegment {
  label: string
  value: number
  color: string
}

interface DonutChartProps {
  segments: DonutSegment[]
  size?: number
  strokeWidth?: number
  className?: string
  formatValue?: (value: number) => string
}

const RADIUS = 40
const CENTER = 50

function describeArc(
  startAngle: number,
  endAngle: number,
  radius: number
): string {
  const start = polarToCartesian(CENTER, CENTER, radius, endAngle)
  const end = polarToCartesian(CENTER, CENTER, radius, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0

  return `M ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y}`
}

function polarToCartesian(
  cx: number,
  cy: number,
  r: number,
  angleDeg: number
) {
  const rad = ((angleDeg - 90) * Math.PI) / 180
  return {
    x: cx + r * Math.cos(rad),
    y: cy + r * Math.sin(rad),
  }
}

function formatAED(value: number): string {
  return `${value.toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 })} AED`
}

export function DonutChart({
  segments,
  size = 200,
  strokeWidth = 10,
  className,
  formatValue = formatAED,
}: DonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  const total = segments.reduce((sum, s) => sum + Math.abs(s.value), 0)

  // Build arcs
  const arcs: { segment: DonutSegment; startAngle: number; endAngle: number; index: number }[] = []
  let currentAngle = 0
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    const sliceAngle = total > 0 ? (Math.abs(segment.value) / total) * 360 : 0
    // Leave a tiny gap between segments
    const gap = segments.length > 1 ? 2 : 0
    arcs.push({
      segment,
      startAngle: currentAngle + gap / 2,
      endAngle: currentAngle + sliceAngle - gap / 2,
      index: i,
    })
    currentAngle += sliceAngle
  }

  // Center display
  const activeSegment = activeIndex !== null ? segments[activeIndex] : null
  const centerLabel = activeSegment ? activeSegment.label : "Total"
  const centerValue = activeSegment ? Math.abs(activeSegment.value) : total
  const centerColor = activeSegment ? activeSegment.color : "var(--text-primary)"

  const handleHover = useCallback((index: number | null) => {
    setActiveIndex(index)
  }, [])

  const handleTap = useCallback(
    (index: number) => {
      setActiveIndex((prev) => (prev === index ? null : index))
    },
    []
  )

  const handleCenterTap = useCallback(() => {
    setActiveIndex(null)
  }, [])

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        viewBox="0 0 100 100"
        width={size}
        height={size}
        className="overflow-visible"
      >
        {arcs.map(({ segment, startAngle, endAngle, index }) => {
          const isActive = activeIndex === index
          const midAngle = (startAngle + endAngle) / 2
          const expandDistance = 3
          const offset = isActive
            ? polarToCartesian(0, 0, expandDistance, midAngle)
            : { x: 0, y: 0 }

          return (
            <path
              key={segment.label}
              d={describeArc(startAngle, endAngle, RADIUS)}
              fill="none"
              stroke={segment.color}
              strokeWidth={isActive ? strokeWidth + 2 : strokeWidth}
              strokeLinecap="round"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition:
                  "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), stroke-width 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
                filter: isActive
                  ? `drop-shadow(0 0 6px ${segment.color}40)`
                  : "none",
              }}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
              onClick={() => handleTap(index)}
            />
          )
        })}
      </svg>

      {/* Center text — sized to fit inside the donut hole only */}
      <button
        type="button"
        className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full"
        style={{
          width: `${size * 0.52}px`,
          height: `${size * 0.52}px`,
        }}
        onClick={handleCenterTap}
        aria-label="Reset chart selection"
      >
        <span
          className="text-text-secondary text-[10px] font-medium uppercase tracking-wider transition-all duration-300"
          style={{
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {centerLabel}
        </span>
        <span
          className="font-mono text-lg font-medium leading-tight transition-all duration-300"
          style={{
            color: centerColor,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {formatValue(centerValue)}
        </span>
      </button>
    </div>
  )
}
