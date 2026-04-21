import type { Metadata } from 'next'
import WhyMestContent from './WhyMestContent'

export const metadata: Metadata = {
  title: 'Why Mest Tire — The Manufacturer Advantage',
  description: 'Why specialty tire buyers and distributors choose Mest Tire: 30 years of manufacturing depth, custom engineering capability, and real accountability.',
}

export default function WhyMestPage() {
  return <WhyMestContent />
}
