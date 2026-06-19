import { Helmet } from 'react-helmet-async'
import { brand } from '../../content/brand'

interface PageMetaProps {
  title?: string
  description?: string
}

export function PageMeta({ title, description }: PageMetaProps) {
  const fullTitle = title ? `${title} | ${brand.name}` : `${brand.name} — High-Performance Open Source API Gateway`
  const desc = description ?? brand.description

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:type" content="website" />
    </Helmet>
  )
}
