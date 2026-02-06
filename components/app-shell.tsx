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

  React.useEffect(() => {
    const root = document.documentElement
    if (isStudio) {
      root.classList.remove("smooth-cursor-active")
      return
    }

    root.classList.add("smooth-cursor-active")
    return () => {
      root.classList.remove("smooth-cursor-active")
    }
  }, [isStudio])

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <ReactLenis root>
      <SmoothCursor disableRotation />
      <Navigation />
      {children}
      <Footer />
    </ReactLenis>
  )
}
