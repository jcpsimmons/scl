import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'SCL Example',
  description: 'Example Next.js app using @drjoshcsimmons/scl',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-background text-primary min-h-screen">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
