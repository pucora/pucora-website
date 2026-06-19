import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { PucoraLogoImage } from '../ui/PucoraLogoImage'
import { brand, externalLinks } from '../../content/brand'
import { Reveal } from '../../hooks/useScrollReveal'

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background pt-8 pb-16 md:pt-12 md:pb-24">
      <div
        className="hero-logo-wash pointer-events-none absolute left-1/2 top-24 h-[420px] w-[420px] -translate-x-1/2 rounded-full md:top-20 md:h-[520px] md:w-[520px]"
        aria-hidden
      />

      <Container className="relative">
        <div className="mx-auto max-w-4xl text-center">
          <Reveal>
            <div className="animate-float">
              <PucoraLogoImage size="hero" blend animate />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <p className="mt-8 text-sm font-medium text-brand">Open Source API Gateway</p>
            <h1 className="mt-3 apple-headline">
              The fastest gateway.
              <br />
              <span className="text-gradient">Built for scale.</span>
            </h1>
            <p className="mx-auto mt-5 max-w-2xl apple-subhead">{brand.description}</p>
          </Reveal>

          <Reveal delay={0.25}>
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/get-started" size="lg">
                Get Pucora
              </Button>
              <Button href="/docs/overview/installing" variant="link" size="lg">
                Learn more ›
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.35}>
            <div className="mt-16 flex items-center justify-center gap-10 border-t border-border pt-10">
              {[
                { value: '70K+', label: 'requests/sec' },
                { value: '<50MB', label: 'memory' },
                { value: '15', label: 'protocols' },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-semibold tracking-tight text-foreground md:text-3xl">{stat.value}</p>
                  <p className="mt-1 text-xs text-muted">{stat.label}</p>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal delay={0.45}>
            <div className="mt-10">
              <Button href={externalLinks.github} external variant="outline" size="sm">
                View on GitHub
              </Button>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
