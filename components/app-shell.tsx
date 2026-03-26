"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-provider"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/planner", label: "Planner" },
] as const

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-svh flex-col">
      {/* Header */}
      <header className="bg-background/70 sticky top-0 z-50 border-b border-transparent backdrop-blur-[40px] transition-colors [.scrolled_&]:border-border">
        <div className="mx-auto flex h-12 max-w-screen-xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link
            href="/dashboard"
            className="font-sans text-sm font-extralight uppercase tracking-[0.25em]"
          >
            Zad
          </Link>

          {/* Nav pill */}
          <nav className="flex items-center gap-1 rounded-full bg-secondary p-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "rounded-full px-3 py-1 text-xs font-medium transition-all",
                    "duration-300",
                    isActive
                      ? "bg-background text-foreground shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  style={{
                    transitionTimingFunction:
                      "cubic-bezier(0.34, 1.4, 0.64, 1)",
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Theme toggle */}
          <ThemeToggle />
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-screen-xl flex-1 px-3 py-6 md:px-6 lg:px-[clamp(80px,15vw,200px)]">
        {children}
      </main>
    </div>
  )
}
