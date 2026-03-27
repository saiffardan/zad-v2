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
      <div ref={sentinelRef} className="h-0 w-0" />

      {/* Fixed mini header */}
      <div
        className="fixed top-0 inset-x-0 z-40 pointer-events-none"
        aria-hidden={!scrolled}
      >
        {/* Pure backdrop blur — no mask, no gradient tricks */}
        <div
          className="absolute inset-x-0 top-0 transition-opacity duration-300"
          style={{
            height: "calc(env(safe-area-inset-top, 0px) + 3rem)",
            opacity: scrolled ? 1 : 0,
            backdropFilter: "blur(16px) saturate(180%)",
            WebkitBackdropFilter: "blur(16px) saturate(180%)",
            background: "color-mix(in srgb, var(--background) 50%, transparent)",
          }}
        />
        {/* Soft fade below the blur to avoid a hard cutoff */}
        <div
          className="absolute inset-x-0 transition-opacity duration-300"
          style={{
            top: "calc(env(safe-area-inset-top, 0px) + 3rem)",
            height: "1.5rem",
            opacity: scrolled ? 1 : 0,
            background: "linear-gradient(to bottom, color-mix(in srgb, var(--background) 30%, transparent), transparent)",
          }}
        />
        {/* Title text */}
        <div
          className="relative flex justify-center"
          style={{ paddingTop: "env(safe-area-inset-top, 0px)" }}
        >
          <p
            className="text-sm font-semibold py-2 transition-all duration-300 ease-out"
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
