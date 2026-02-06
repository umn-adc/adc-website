import React from "react"
import type { Metadata } from 'next'
import { Outfit, Atkinson_Hyperlegible } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'
import { ReactLenis } from 'lenis/react'
import { SmoothCursor } from "@/components/ui/smooth-cursor"
import { Toaster } from "@/components/ui/sonner"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"

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

export const metadata: Metadata = {
  title: 'ADC | UMN App Developers Club',
  description: 'Learn modern development and product skills through hands-on workshops, mentorship, and real projects built in teams at the University of Minnesota.',
  keywords: ['app development', 'university of minnesota', 'coding club', 'web development', 'mobile apps', 'student organization'],
  openGraph: {
    title: 'ADC | UMN App Developers Club',
    description: 'Build it right—from day one. Join the UMN App Developers Club.',
    type: 'website',
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="smooth-cursor-active">
      <body className={`${_outfit.variable} ${_atkinson.variable} font-sans antialiased`}>
        <ReactLenis root>
          <SmoothCursor disableRotation/>
          <Navigation />
          {children}
          <Footer />
          <Toaster />
          <Analytics />
        </ReactLenis>
      </body>
    </html>
  )
}
