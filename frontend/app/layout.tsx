import { Fredericka_the_Great } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import './globals.css'

const fredericka = Fredericka_the_Great({ subsets: ['latin'], weight: '400', variable: '--font-fredericka' })

export const metadata: Metadata = {
  title: 'Sadegh Khosravi — Cognitive Science & AI',
  description: 'The digital twin and portfolio of Sadegh Khosravi, an AI-oriented Cognitive Science student at Osnabrück University.',
  generator: 'Next.js',
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

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={fredericka.variable}>
      <body className="antialiased">{children}</body>
    </html>
  )
}
