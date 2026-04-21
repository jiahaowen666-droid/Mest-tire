import type { Metadata } from 'next'
import ProductsContent from './ProductsContent'

export const metadata: Metadata = {
  title: 'Products — Mest Tire',
  description: 'Specialty tire products from Mest Tire: karting, golf cart, airport GSE, forklift, motorcycle, bicycle, e-scooter, lawn mower, trailer tires and more.',
}

export default function ProductsPage() {
  return <ProductsContent />
}
