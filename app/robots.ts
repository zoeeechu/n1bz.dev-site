import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        disallow: '/', 
      },
    ],
    sitemap: '',
    host: 'https://example.com',
  }
}
