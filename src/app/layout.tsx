import type { Metadata } from 'next'
import { Geist } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'

const geist = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mest Tire — Precision in Every Turn',
  description:
    'Mest Tire is a global specialty tire manufacturer with 30+ years of experience. Karting, golf cart, industrial, forklift, airport GSE tires and more. Built to spec, shipped worldwide.',
  keywords: 'specialty tires, karting tires, golf cart tires, forklift tires, industrial tires, airport GSE tires, tire manufacturer China',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${geist.variable} h-full`}>
      <body className="min-h-full flex flex-col antialiased">
        <LanguageProvider>
          <Navbar />
          <main className="flex-1 pt-16">{children}</main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  )
}
