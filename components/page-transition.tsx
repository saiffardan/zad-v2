"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Brief fade on route change
    setVisible(false)
    const timer = requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setVisible(true)
      })
    })
    return () => cancelAnimationFrame(timer)
  }, [pathname])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transition: "opacity 200ms ease-out",
      }}
    >
      {children}
    </div>
  )
}
