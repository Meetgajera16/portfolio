import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Meet Gajera — Data Science Portfolio',
  description: 'Graduate student at Stevens Institute of Technology specializing in Data Science, ML, and Analytics.',
  keywords: ['Data Science', 'Machine Learning', 'Analytics', 'Python', 'SQL', 'Meet Gajera'],
  openGraph: {
    title: 'Meet Gajera — Data Science Portfolio',
    description: 'Stevens Institute MS Data Science student. Python · SQL · ML · Tableau.',
    type: 'website',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600;700;900&family=Outfit:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  )
}
