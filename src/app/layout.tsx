import type { Metadata } from 'next'
import { Inter, DM_Sans } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { MotionProvider } from '@/components/MotionProvider'

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap',
})

const dmSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  display: 'swap',
})

const SITE_URL = 'https://www.mesttire.com'
const SITE_NAME = 'Mest Tire'
const DEFAULT_TITLE = 'Mest Tire — Precision in Every Turn'
const DEFAULT_DESC =
  'Mest Tire is a global specialty tire manufacturer with 30+ years of experience. Karting, golf cart, industrial, forklift, airport GSE tires and more. Built to spec, shipped worldwide.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: DEFAULT_TITLE,
    template: `%s | ${SITE_NAME}`,
  },
  description: DEFAULT_DESC,
  keywords: 'specialty tires, karting tires, golf cart tires, forklift tires, industrial tires, airport GSE tires, tire manufacturer China',
  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    url: SITE_URL,
    images: [
      {
        url: '/og-default.png',
        width: 1200,
        height: 630,
        alt: 'Mest Tire — Specialty Tire Manufacturer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: DEFAULT_TITLE,
    description: DEFAULT_DESC,
    images: ['/og-default.png'],
  },
  alternates: {
    canonical: SITE_URL,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${dmSans.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>
          <MotionProvider>
            <Navbar />
            <main className="flex-1 pt-16">{children}</main>
            <Footer />
          </MotionProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
