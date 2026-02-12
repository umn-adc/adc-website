"use client"

import * as React from "react"
import { usePathname } from "next/navigation"
import { ReactLenis } from "lenis/react"
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith("/studio")
  const [isCustomCursorEnabled, setIsCustomCursorEnabled] = React.useState(false)

  React.useEffect(() => {
    const root = document.documentElement
    if (isStudio) {
      root.classList.remove("smooth-cursor-active")
      setIsCustomCursorEnabled(false)
      return
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)")
    const syncCursorMode = (matches: boolean) => {
      setIsCustomCursorEnabled(matches)
      root.classList.toggle("smooth-cursor-active", matches)
    }

    syncCursorMode(mediaQuery.matches)
    const onChange = (event: MediaQueryListEvent) => {
      syncCursorMode(event.matches)
    }

    mediaQuery.addEventListener("change", onChange)

    return () => {
      mediaQuery.removeEventListener("change", onChange)
      root.classList.remove("smooth-cursor-active")
      setIsCustomCursorEnabled(false)
    }
  }, [isStudio])

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <ReactLenis root>
      {isCustomCursorEnabled ? <SmoothCursor disableRotation /> : null}
      <Navigation />
      {children}
      <Footer />
    </ReactLenis>
  )
}
