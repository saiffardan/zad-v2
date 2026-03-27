"use client"

import { useEffect, useRef, useState } from "react"

interface StickyHeaderProps {
  title: string
  subtitle?: string
}

export function StickyHeader({ title, subtitle }: StickyHeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const sentinelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setScrolled(!entry.isIntersecting)
      },
      { threshold: 0 }
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* Invisible sentinel — when this scrolls out of view, header shrinks */}
      <div ref={sentinelRef} className="h-0 w-0" />

      {/* Sticky mini header */}
      <div
        className="sticky top-0 z-40 transition-all duration-300 ease-out"
        style={{
          opacity: scrolled ? 1 : 0,
          transform: scrolled ? "translateY(0)" : "translateY(-100%)",
          pointerEvents: scrolled ? "auto" : "none",
        }}
      >
        <div className="glass dark:!bg-[rgba(21,20,25,0.85)] py-2.5 -mx-4 px-4">
          <p className="text-sm font-semibold text-center">{title}</p>
        </div>
      </div>

      {/* Full header — always in document flow */}
      <div
        className="transition-opacity duration-300"
        style={{ opacity: scrolled ? 0.4 : 1 }}
      >
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </>
  )
}
