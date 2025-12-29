import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/react'
import './globals.css'

export const metadata: Metadata = {
  title: 'SCL | Simsies Component Library',
  description:
    'A retro terminal-themed React component library built on Radix primitives and Tailwind CSS. Sharp corners, no shadows, pure CRT vibes.',
  keywords: ['react', 'components', 'ui', 'terminal', 'retro', 'radix', 'tailwind', 'shadcn'],
  authors: [{ name: 'Josh Simmons', url: 'https://github.com/jcpsimmons' }],
  openGraph: {
    title: 'SCL | Simsies Component Library',
    description: 'A retro terminal-themed React component library. Sharp corners, no shadows, pure CRT vibes.',
    type: 'website',
  },
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
