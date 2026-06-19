import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Reveal } from '../../hooks/useScrollReveal'
import { externalLinks } from '../../content/brand'

const docSections = [
  { title: 'Getting Started', description: 'Installation, configuration, and first endpoint.' },
  { title: 'Non-REST Connectivity', description: 'WebSockets, gRPC, Pub/Sub, SOAP, GraphQL, Lambda.' },
  { title: 'Security', description: 'JWT, OAuth2, CORS, rate limiting, circuit breakers.' },
  { title: 'Observability', description: 'OpenTelemetry, Prometheus, Jaeger, logging.' },
  { title: 'Configuration', description: 'JSON schema, flexible config, validation.' },
  { title: 'Extending', description: 'Go plugins, Lua, Martian, CEL.' },
]

export function Documentation() {
  return (
    <MarketingPage
      title="Documentation"
      subtitle="Guides & Reference"
      description="Comprehensive documentation for configuring, deploying, and operating Pucora Community Edition."
      cta={{ label: 'Open docs.pucora.io', href: externalLinks.docs }}
    >
      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {docSections.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.05}>
                <Card>
                  <h3 className="font-semibold text-white">{s.title}</h3>
                  <p className="mt-2 text-sm text-muted">{s.description}</p>
                  <Button href={externalLinks.docs} external variant="ghost" className="mt-4 !px-0">
                    Read docs →
                  </Button>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </MarketingPage>
  )
}
