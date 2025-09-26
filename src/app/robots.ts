import { MetadataRoute } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://allinconverter.com'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',
        '/admin/',
        '/_next/',
        '/temp/',
        '/storage/',
        '/workers/',
        '/node_modules/',
        '/.git/',
        '/.env*',
        '/docker-compose.yml',
        '/Dockerfile*',
        '/start-workers.sh',
        '/WORKERS.md',
        '/TESTING.md',
        '/DEPLOYMENT.md'
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
