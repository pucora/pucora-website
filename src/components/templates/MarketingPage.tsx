import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { PageMeta } from '../ui/PageMeta'
import { Reveal } from '../../hooks/useScrollReveal'

interface MarketingPageProps {
  title: string
  subtitle?: string
  description: string
  metaDescription?: string
  children: React.ReactNode
  cta?: { label: string; href: string }
}

export function MarketingPage({ title, subtitle, description, metaDescription, children, cta }: MarketingPageProps) {
  return (
    <>
      <PageMeta title={title} description={metaDescription ?? description} />
      <section className="border-b border-border bg-surface py-16 md:py-20">
        <Container>
          <Reveal>
            {subtitle && <p className="mb-2 text-sm font-medium text-brand">{subtitle}</p>}
            <h1 className="apple-headline">{title}</h1>
            <p className="mt-4 max-w-3xl apple-subhead">{description}</p>
            {cta && (
              <div className="mt-8">
                <Button href={cta.href}>{cta.label}</Button>
              </div>
            )}
          </Reveal>
        </Container>
      </section>
      {children}
    </>
  )
}
