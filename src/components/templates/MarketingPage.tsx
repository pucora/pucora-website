import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { GradientText } from '../ui/GradientText'
import { PageMeta } from '../ui/PageMeta'
import { LazyThreeCanvasWrapper as ThreeCanvas } from '../three/LazyThreeCanvas'
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
      <section className="relative overflow-hidden border-b border-white/10 py-16 md:py-24">
        <div className="pointer-events-none absolute inset-0 opacity-25">
          <ThreeCanvas variant="background" interactive={false} className="h-full w-full" />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-navy/70 via-navy/50 to-navy" />
        <div className="pointer-events-none absolute inset-0 section-pattern opacity-20" />
        <Container className="relative">
          <Reveal direction="up">
            {subtitle && (
              <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
                <span className="h-px w-6 bg-accent" />
                {subtitle}
              </p>
            )}
            <h1 className="text-4xl font-extrabold tracking-tight md:text-5xl lg:text-6xl">
              <GradientText>{title}</GradientText>
            </h1>
            <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{description}</p>
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
