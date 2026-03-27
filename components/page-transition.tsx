"use client"

import { usePathname } from "next/navigation"
import { useEffect, useState, useRef } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [displayChildren, setDisplayChildren] = useState(children)
  const prevPathRef = useRef(pathname)

  useEffect(() => {
    if (pathname !== prevPathRef.current) {
      setIsTransitioning(true)
      // Short fade-out, then swap content
      const timer = setTimeout(() => {
        setDisplayChildren(children)
        setIsTransitioning(false)
        prevPathRef.current = pathname
      }, 150)
      return () => clearTimeout(timer)
    } else {
      setDisplayChildren(children)
    }
  }, [pathname, children])

  return (
    <div
      className="transition-all duration-300 ease-out"
      style={{
        opacity: isTransitioning ? 0 : 1,
        transform: isTransitioning ? "translateY(8px)" : "translateY(0)",
      }}
    >
      {displayChildren}
    </div>
  )
}
