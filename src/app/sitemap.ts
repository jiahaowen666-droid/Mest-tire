import type { MetadataRoute } from 'next'

const BASE_URL = 'https://www.mesttire.com'

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()

  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' as const },
    { path: '/products', priority: 0.9, changeFrequency: 'weekly' as const },
    { path: '/why-mest', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { path: '/blog', priority: 0.7, changeFrequency: 'weekly' as const },
    { path: '/contact', priority: 0.9, changeFrequency: 'monthly' as const },
  ]

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${BASE_URL}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }))
}
