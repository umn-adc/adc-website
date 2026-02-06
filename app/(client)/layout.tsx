import React from "react"
import '@/app/globals.css'
import { SanityLive } from "@/sanity/lib/live"
import { Metadata } from "next/types"

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
    <>
      {children}
      <SanityLive />
    </>
  )
}
