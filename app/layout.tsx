import React from "react"
import { Outfit, Atkinson_Hyperlegible } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { Toaster } from "@/components/ui/sonner"
import { AppShell } from "@/components/app-shell"

const _outfit = Outfit({ 
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
});

const _atkinson = Atkinson_Hyperlegible({ 
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: '--font-atkinson',
  display: 'swap',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${_outfit.variable} ${_atkinson.variable} font-sans antialiased`}>
        <AppShell>{children}</AppShell>
        <Toaster />
        <Analytics />
      </body>
    </html>
  )
}
