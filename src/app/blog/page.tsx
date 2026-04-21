import type { Metadata } from 'next'
import BlogContent from './BlogContent'

export const metadata: Metadata = {
  title: 'Blog — Mest Tire',
  description: 'Industry insights, technical guides, and product news from the Mest Tire engineering team.',
}

export default function BlogPage() {
  return <BlogContent />
}
