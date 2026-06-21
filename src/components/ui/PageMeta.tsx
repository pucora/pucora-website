import { Helmet } from 'react-helmet-async'
import { brand, externalLinks } from '../../content/brand'

interface PageMetaProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  type?: 'website' | 'article' | 'product'
  publishedTime?: string
  modifiedTime?: string
}

export function PageMeta({
  title,
  description,
  canonical,
  ogImage,
  type = 'website',
  publishedTime,
  modifiedTime,
}: PageMetaProps) {
  const baseUrl = 'https://pucora.in'
  const fullTitle = title ? `${title} | ${brand.name}` : `${brand.name} — High-Performance Open Source API Gateway`
  const desc = description ?? brand.description
  const canonicalUrl = canonical ? `${baseUrl}${canonical}` : baseUrl
  const ogImageUrl = ogImage ?? `${baseUrl}/og-image.png`

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': type === 'product' ? 'SoftwareApplication' : 'WebSite',
    name: brand.name,
    url: baseUrl,
    description: desc,
    ...(type === 'product' && {
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Linux, Windows, macOS, Docker, Kubernetes',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    }),
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime }),
  }

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta name="keywords" content="API Gateway, microservices, open source, high performance, REST, gRPC, GraphQL, Kafka, RabbitMQ, WebSocket, BFF, API management" />
      <link rel="canonical" href={canonicalUrl} />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Pucora" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={ogImageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={brand.name} />
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={ogImageUrl} />

      {/* Additional SEO */}
      <meta name="theme-color" content="#ffffff" />
      <link rel="icon" type="image/png" href="/pucora.png" />
      <link rel="apple-touch-icon" href="/pucora.png" />

      {/* Structured Data (JSON-LD) */}
      <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
    </Helmet>
  )
}
