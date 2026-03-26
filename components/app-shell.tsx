"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-provider"
import { useAuth } from "@/lib/auth-context"

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/planner", label: "Planner" },
] as const

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { user, isSignedIn, signIn, signOut } = useAuth()
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="flex min-h-svh flex-col">
      {/* Glass header */}
      <header
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled
            ? "glass border-b border-glass-border"
            : "bg-transparent"
        )}
        style={{ transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
      >
        <div className="mx-auto flex h-14 max-w-screen-xl items-center justify-between px-5 md:px-8">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2.5">
            <img
              src="/icon_light.svg"
              alt="Zad"
              className="hidden h-5 w-5 dark:block"
            />
            <img
              src="/icon_dark.svg"
              alt="Zad"
              className="block h-5 w-5 dark:hidden"
            />
            <span className="text-sm font-extralight uppercase tracking-[0.3em] text-foreground/80">
              Zad
            </span>
          </Link>

          {/* Nav pill — glass style */}
          <nav className="glass flex items-center gap-0.5 rounded-full p-1">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-4 py-1.5 text-xs font-medium transition-all duration-300",
                    isActive
                      ? "bg-foreground/10 text-foreground"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                  style={{
                    transitionTimingFunction: "cubic-bezier(0.34, 1.4, 0.64, 1)",
                  }}
                >
                  {item.label}
                </Link>
              )
            })}
          </nav>

          {/* Right: auth + theme */}
          <div className="flex items-center gap-2">
            {isSignedIn && user ? (
              <button
                type="button"
                onClick={signOut}
                className="flex items-center gap-1.5 rounded-full px-2 py-1 text-xs text-muted-foreground transition-colors hover:text-foreground"
                title={`Signed in as ${user.name}`}
              >
                {user.picture ? (
                  <img src={user.picture} alt="" className="h-5 w-5 rounded-full" />
                ) : (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-foreground/5 text-[10px] font-medium">
                    {user.name.charAt(0)}
                  </span>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={signIn}
                className="hidden rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                Sign in
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-screen-xl flex-1 px-5 py-6 md:px-8">
        {children}
      </main>
    </div>
  )
}
