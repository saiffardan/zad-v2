"use client"

import { useState, useCallback, useRef } from "react"
import { cn } from "@/lib/utils"

export interface DonutSegment {
  label: string
  value: number
  color: string
  centerColor?: string
}

interface DonutChartProps {
  segments: DonutSegment[]
  className?: string
  formatValue?: (value: number) => string
  /** Total income — used to compute "X% of income" subtitle */
  income?: number
}

const INNER_RADIUS = 34
const OUTER_RADIUS = 46
const CENTER = 50
const CORNER_RADIUS = 1.2

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

function describeAnnularSector(
  startAngle: number,
  endAngle: number,
  innerR: number,
  outerR: number
): string {
  const outerStart = polarToCartesian(CENTER, CENTER, outerR, startAngle)
  const outerEnd = polarToCartesian(CENTER, CENTER, outerR, endAngle)
  const innerEnd = polarToCartesian(CENTER, CENTER, innerR, endAngle)
  const innerStart = polarToCartesian(CENTER, CENTER, innerR, startAngle)
  const largeArc = endAngle - startAngle > 180 ? 1 : 0

  return [
    `M ${outerStart.x} ${outerStart.y}`,
    `A ${outerR} ${outerR} 0 ${largeArc} 1 ${outerEnd.x} ${outerEnd.y}`,
    `L ${innerEnd.x} ${innerEnd.y}`,
    `A ${innerR} ${innerR} 0 ${largeArc} 0 ${innerStart.x} ${innerStart.y}`,
    "Z",
  ].join(" ")
}

function getSegmentIndexAtAngle(
  angle: number,
  arcs: { startAngle: number; endAngle: number }[]
): number | null {
  const normalized = ((angle % 360) + 360) % 360
  for (let i = 0; i < arcs.length; i++) {
    const { startAngle, endAngle } = arcs[i]
    if (normalized >= startAngle && normalized <= endAngle) return i
  }
  return null
}

export function DonutChart({
  segments,
  className,
  formatValue,
  income,
}: DonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const touchActiveRef = useRef(false)

  const total = segments.reduce((sum, s) => sum + Math.abs(s.value), 0)

  // Build arcs
  const arcs: {
    segment: DonutSegment
    startAngle: number
    endAngle: number
    index: number
  }[] = []
  let currentAngle = 0
  for (let i = 0; i < segments.length; i++) {
    const segment = segments[i]
    const sliceAngle =
      total > 0 ? (Math.abs(segment.value) / total) * 360 : 0
    const gap = segments.length > 1 ? 4 : 0
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
  const lastSegment = segments[segments.length - 1]
  const defaultLabel = lastSegment?.label ?? "Total"
  const defaultValue = lastSegment ? Math.abs(lastSegment.value) : total
  const defaultCenterColor =
    lastSegment?.centerColor ?? lastSegment?.color ?? "var(--text-primary)"

  const centerLabel = activeSegment ? activeSegment.label : defaultLabel
  const centerValue = activeSegment
    ? Math.abs(activeSegment.value)
    : defaultValue
  const centerColor = activeSegment
    ? (activeSegment.centerColor ?? activeSegment.color)
    : defaultCenterColor

  // Subtitle: "X.X% of income" when hovering, "of {incomeK}" at rest
  const incomeBase = income ?? total
  const pct =
    incomeBase > 0 ? ((centerValue / incomeBase) * 100).toFixed(1) : "0.0"
  const centerSubtitle =
    activeSegment || !formatValue
      ? `${pct}% of income`
      : `of ${formatValue(incomeBase)}`

  const handleHover = useCallback((index: number | null) => {
    setActiveIndex(index)
  }, [])

  const handleCenterTap = useCallback(() => {
    setActiveIndex(null)
  }, [])

  // ─── Touch handling ───
  const resolveTouch = useCallback(
    (clientX: number, clientY: number) => {
      const svg = svgRef.current
      if (!svg) return
      const rect = svg.getBoundingClientRect()
      const cx = rect.left + rect.width / 2
      const cy = rect.top + rect.height / 2
      const dx = clientX - cx
      const dy = clientY - cy

      const dist = Math.sqrt(dx * dx + dy * dy)
      const outerRadius = rect.width / 2
      const innerRadius = outerRadius * 0.4
      if (dist < innerRadius || dist > outerRadius * 1.15) {
        setActiveIndex(null)
        return
      }

      let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90
      if (angle < 0) angle += 360

      const idx = getSegmentIndexAtAngle(angle, arcs)
      setActiveIndex(idx)
    },
    [arcs]
  )

  const onTouchStart = useCallback(
    (e: React.TouchEvent) => {
      touchActiveRef.current = true
      const t = e.touches[0]
      resolveTouch(t.clientX, t.clientY)
    },
    [resolveTouch]
  )

  const onTouchMove = useCallback(
    (e: React.TouchEvent) => {
      if (!touchActiveRef.current) return
      e.preventDefault()
      const t = e.touches[0]
      resolveTouch(t.clientX, t.clientY)
    },
    [resolveTouch]
  )

  const onTouchEnd = useCallback(() => {
    touchActiveRef.current = false
  }, [])

  return (
    <div
      className={cn(
        "relative inline-flex aspect-square w-full max-w-[220px] items-center justify-center",
        className
      )}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 100 100"
        className="h-full w-full touch-none overflow-visible"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <defs>
          <filter id="donut-round">
            <feMorphology operator="erode" radius={CORNER_RADIUS} />
            <feMorphology operator="dilate" radius={CORNER_RADIUS} />
          </filter>
        </defs>

        {arcs.map(({ segment, startAngle, endAngle, index }) => {
          const isActive = activeIndex === index
          const midAngle = (startAngle + endAngle) / 2
          const expandDistance = 2.5
          const offset = isActive
            ? polarToCartesian(0, 0, expandDistance, midAngle)
            : { x: 0, y: 0 }

          return (
            <path
              key={segment.label}
              d={describeAnnularSector(
                startAngle,
                endAngle,
                INNER_RADIUS,
                isActive ? OUTER_RADIUS + 1.5 : OUTER_RADIUS
              )}
              fill={segment.color}
              filter="url(#donut-round)"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px)`,
                transition:
                  "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), d 0.4s cubic-bezier(0.16, 1, 0.3, 1)",
                cursor: "pointer",
                filter: isActive
                  ? `url(#donut-round) drop-shadow(0 0 4px ${segment.color}50)`
                  : "url(#donut-round)",
              }}
              onMouseEnter={() => handleHover(index)}
              onMouseLeave={() => handleHover(null)}
            />
          )
        })}
      </svg>

      {/* Center text */}
      <button
        type="button"
        className="absolute inset-[28%] flex flex-col items-center justify-center rounded-full"
        onClick={handleCenterTap}
        aria-label="Reset chart selection"
      >
        <span
          className="text-text-secondary text-[9px] font-medium uppercase tracking-wider transition-all duration-300"
          style={{
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {centerLabel}
        </span>
        <span
          className="font-mono text-lg font-semibold leading-tight transition-all duration-300"
          style={{
            color: centerColor,
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {formatValue ? formatValue(centerValue) : centerValue.toLocaleString()}
        </span>
        <span
          className="text-text-tertiary text-[9px] transition-all duration-300"
          style={{
            transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        >
          {centerSubtitle}
        </span>
      </button>
    </div>
  )
}
