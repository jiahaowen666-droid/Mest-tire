import type { Metadata } from 'next'
import ContactContent from './ContactContent'

export const metadata: Metadata = {
  title: 'Contact Us — Mest Tire',
  description: 'Get in touch with Mest Tire for tire inquiries, custom orders, and pricing. Fast response from our engineering team.',
}

export default function ContactPage() {
  return <ContactContent />
}
