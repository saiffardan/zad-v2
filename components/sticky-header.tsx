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
      {/* Invisible sentinel — when this scrolls out of view, mini header appears */}
      <div ref={sentinelRef} className="h-0 w-0" />

      {/* Fixed mini header */}
      <div
        className="fixed top-0 inset-x-0 z-40 pointer-events-none"
        aria-hidden={!scrolled}
      >
        {/* Full blur layer — no mask, covers entire area */}
        <div
          className="absolute inset-x-0 top-0 h-12 transition-opacity duration-300"
          style={{
            opacity: scrolled ? 1 : 0,
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
          }}
        />
        {/* Subtle gradient fade below the blur to soften the edge */}
        <div
          className="absolute inset-x-0 top-12 h-8 transition-opacity duration-300"
          style={{
            opacity: scrolled ? 0.6 : 0,
            background: "linear-gradient(to bottom, var(--background), transparent)",
          }}
        />
        <div className="relative flex justify-center">
          <p
            className="text-sm font-semibold pt-3 pb-2 transition-all duration-300 ease-out"
            style={{
              opacity: scrolled ? 1 : 0,
              transform: scrolled ? "translateY(0)" : "translateY(-8px)",
            }}
          >
            {title}
          </p>
        </div>
      </div>

      {/* Full header — hides when scrolled */}
      <div
        className="transition-all duration-300"
        style={{
          opacity: scrolled ? 0 : 1,
          transform: scrolled ? "translateY(-4px)" : "translateY(0)",
        }}
      >
        <h1 className="text-2xl font-bold tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-sm text-muted-foreground">{subtitle}</p>
        )}
      </div>
    </>
  )
}
