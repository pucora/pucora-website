import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Reveal } from '../../hooks/useScrollReveal'
import { docsManifest } from '../../content/docs'

const featuredSlugs = ['overview/installing', 'deploying/helm', 'configuration/configurator', 'websockets']

export function Documentation() {
  const featured = featuredSlugs
    .map((slug) => docsManifest.pages.find((p) => p.slug === slug))
    .filter(Boolean)

  return (
    <MarketingPage
      title="Documentation"
      subtitle="Guides & Reference"
      description="Browse the full Pucora documentation — installation, configuration, backends, security, and more."
      cta={{ label: 'Browse all docs', href: '/docs/overview' }}
    >
      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((page, i) => page && (
              <Reveal key={page.slug} delay={i * 0.05}>
                <Card hover className="h-full">
                  <h3 className="font-semibold text-foreground">{page.title}</h3>
                  <p className="mt-2 text-sm text-muted">{page.description || 'Read the guide'}</p>
                  <Button href={`/docs/${page.slug}`} variant="ghost" className="mt-4 !px-0">
                    Read guide →
                  </Button>
                </Card>
              </Reveal>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Button href="/docs/overview" size="lg">
              Open documentation
            </Button>
          </div>
        </Container>
      </section>
    </MarketingPage>
  )
}
