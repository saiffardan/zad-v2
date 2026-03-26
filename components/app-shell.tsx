"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect } from "react"
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

  // Scroll detection for header border
  useEffect(() => {
    const onScroll = () => {
      document.documentElement.classList.toggle("scrolled", window.scrollY > 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div className="flex min-h-svh flex-col">
      {/* Header */}
      <header className="bg-background/70 sticky top-0 z-50 border-b border-transparent backdrop-blur-[40px] transition-colors [.scrolled_&]:border-border">
        <div className="mx-auto flex h-12 max-w-screen-xl items-center justify-between px-4 md:px-6">
          {/* Logo */}
          <Link href="/dashboard" className="flex items-center gap-2">
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
            <span className="font-sans text-sm font-extralight uppercase tracking-[0.25em]">
              Zad
            </span>
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

          {/* Right side: auth + theme */}
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
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-secondary text-[10px] font-medium">
                    {user.name.charAt(0)}
                  </span>
                )}
              </button>
            ) : (
              <button
                type="button"
                onClick={signIn}
                className="hidden rounded-full px-2.5 py-1 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground sm:block"
              >
                Sign in
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto w-full max-w-screen-xl flex-1 px-3 py-6 md:px-6 lg:px-[clamp(80px,15vw,200px)]">
        {children}
      </main>
    </div>
  )
}
