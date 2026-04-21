import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: 'About Us — Mest Tire',
  description: 'The story behind Mest Tire — 30+ years of tire manufacturing history, from bicycle tires in 1990 to specialty hot-melt karting and GSE tires today.',
}

export default function AboutPage() {
  return <AboutContent />
}
