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

export function BottomNav() {
  const pathname = usePathname()
  const navRef = useRef<HTMLDivElement>(null)
  const [translateY, setTranslateY] = useState(0)
  const velocityRef = useRef(0)
  const lastScrollRef = useRef(0)
  const lastTimeRef = useRef(Date.now())
  const rafRef = useRef<number>(0)
  const springRef = useRef<number>(0)

  useEffect(() => {
    // Softer spring: lower stiffness = slower return, higher damping = less oscillation
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

      // Gentle velocity from scroll, clamped softly
      const scrollVelocity = Math.max(-1.5, Math.min(1.5, scrollDelta / dt))

      // Accumulate as a gentle push
      velocity += scrollVelocity * FORCE_MULTIPLIER

      lastScrollRef.current = scrollY
      lastTimeRef.current = now
    }

    const animate = () => {
      // Spring pulls back to rest
      const springForce = -STIFFNESS * currentY
      velocity = (velocity + springForce) * DAMPING
      currentY += velocity

      // Soft clamp
      currentY = Math.max(-MAX_OFFSET, Math.min(MAX_OFFSET, currentY))

      // Settle
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

  return (
    <div className="fixed bottom-4 inset-x-0 z-50 flex justify-center px-6">
      <nav
        ref={navRef}
        className="glass shadow-depth-lg rounded-2xl w-full max-w-sm will-change-transform"
        style={{
          transform: `translateY(${translateY}px)`,
        }}
      >
        <div className="flex items-center justify-around px-1 py-1.5">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative flex flex-col items-center gap-0.5 rounded-xl px-2 py-1.5 text-[10px] font-medium transition-all duration-200",
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground active:scale-95"
                )}
              >
                {isActive && (
                  <span className="absolute inset-0 rounded-xl bg-primary/10" />
                )}
                <span className="relative">{item.icon}</span>
                <span className="relative">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </div>
  )
}
