import { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { locales, defaultLocale } from '@/lib/config'
import { generateSEOTags, generateHreflangTags, generateSchemaOrg } from '@/lib/seo'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

type Props = {
  children: React.ReactNode
  params: { locale: string }
}

export async function generateStaticParams() {
  return locales.map((locale) => ({ locale }))
}

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const { locale } = params
  
  if (!locales.includes(locale as any)) {
    notFound()
  }

  const seoData = generateSEOTags({
    locale: locale as any,
    pathname: `/${locale}`,
  })

  return {
    title: seoData.title,
    description: seoData.description,
    openGraph: seoData.openGraph,
    twitter: seoData.twitter,
    alternates: seoData.alternates,
    robots: seoData.robots,
  }
}

export default function LocaleLayout({ children, params }: Props) {
  const { locale } = params
  
  if (!locales.includes(locale as any)) {
    notFound()
  }

  return (
    <html lang={locale} className="h-full">
      <head>
        {generateHreflangTags(locale as any, `/${locale}`).map((tag, index) => (
          <link key={index} rel={tag.rel} hrefLang={tag.hrefLang} href={tag.href} />
        ))}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(generateSchemaOrg(locale as any, `/${locale}`))
          }}
        />
      </head>
      <body className="min-h-full bg-gray-50 antialiased">
        <div className="min-h-full">
          <Header />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
