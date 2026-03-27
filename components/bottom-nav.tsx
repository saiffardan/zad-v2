"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

const navItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <rect x="3" y="3" width="7" height="7" rx="1" />
        <rect x="14" y="3" width="7" height="7" rx="1" />
        <rect x="3" y="14" width="7" height="7" rx="1" />
        <rect x="14" y="14" width="7" height="7" rx="1" />
      </svg>
    ),
  },
  {
    label: "Transactions",
    href: "/transactions",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
  },
  {
    label: "Budgets",
    href: "/budgets",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        <path d="M21 3v5h-5" />
      </svg>
    ),
  },
  {
    label: "Showcase",
    href: "/showcase",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M4 3h16a1 1 0 0 1 1 1v16a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" />
        <path d="M7 7h3v3H7zM14 7h3v3h-3zM7 14h3v3H7zM14 14h3v3h-3z" />
      </svg>
    ),
  },
  {
    label: "Settings",
    href: "/settings",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="size-5">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
]

const ITEM_COUNT = navItems.length

export function BottomNav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const rafRef = useRef<number>(0)

  const activeIndex = navItems.findIndex((item) => item.href === pathname)

  // Scroll momentum spring
  useEffect(() => {
    const DAMPING = 0.92
    const STIFFNESS = 0.035
    const MAX_OFFSET = 5
    const FORCE_MULTIPLIER = 1.5

    let currentY = 0
    let velocity = 0

    const onScroll = () => {
      const now = Date.now()
      const scrollY = window.scrollY
      const dt = Math.max(1, now - lastTimeRef.current)
      const scrollDelta = scrollY - lastScrollRef.current
      const scrollVelocity = Math.max(-1.5, Math.min(1.5, scrollDelta / dt))
      velocity += scrollVelocity * FORCE_MULTIPLIER
      lastScrollRef.current = scrollY
      lastTimeRef.current = now
    }

    const animate = () => {
      const springForce = -STIFFNESS * currentY
      velocity = (velocity + springForce) * DAMPING
      currentY += velocity
      currentY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, currentY))
      if (Math.abs(currentY) < 0.05 && Math.abs(velocity) < 0.005) {
        currentY = 0
        velocity = 0
      }
      setTranslateY(currentY)
      rafRef.current = requestAnimationFrame(animate)
    }

    window.addEventListener("scroll", onScroll, { passive: true })
    rafRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener("scroll", onScroll)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  // Pill position: percentage-based, no DOM measurement needed
  const pillLeft = `${(activeIndex / ITEM_COUNT) * 100}%`
  const pillWidth = `${100 / ITEM_COUNT}%`

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-6">
      <nav
        ref={navRef}
        className="glass shadow-depth-lg rounded-2xl w-full max-w-sm will-change-transform relative overflow-hidden"
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      >
        {/* Sliding pill — pure CSS percentage positioning, no JS measurement */}
        <div
          className="absolute top-1 bottom-1 rounded-xl bg-primary/12"
          style={{
            left: pillLeft,
            width: pillWidth,
            transition: "left 350ms cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        />

        <div className="relative flex items-center py-1.5">
          {navItems.map((item, i) => {
            const isActive = i === activeIndex
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-1 flex-col items-center gap-0.5 py-1.5 text-[10px] font-medium transition-colors duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground active:scale-95"
                )}
              >
                <span
                  className="transition-transform duration-200"
                  style={{
                    transform: isActive ? "scale(1.15)" : "scale(1)",
                  }}
                >
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
