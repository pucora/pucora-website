import { Link } from 'react-router-dom'
import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Reveal } from '../../hooks/useScrollReveal'
import { homeFeatures } from '../../content/features'
import { getDiagramIdForFeature } from '../../content/diagram-maps'
import { getArchitectureDiagram } from '../../content/architecture-diagrams'
import { TrafficFlowDiagram } from '../../components/visuals/TrafficFlowDiagram'

export function FeaturesIndex() {
  const heroDiagram = getArchitectureDiagram(getDiagramIdForFeature('connectivity'))!

  return (
    <MarketingPage
      title="Features"
      subtitle="Capabilities"
      description="Everything Pucora handles at the gateway layer so your microservices stay focused on business logic."
    >
      <section className="border-b border-border bg-surface py-12">
        <Container>
          <Reveal>
            <TrafficFlowDiagram diagram={heroDiagram} />
          </Reveal>
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeFeatures.map((f, i) => {
              const Icon = f.icon
              const href = f.slug === 'documentation' ? '/docs/overview' : `/features/${f.slug}`
              const miniDiagram = getArchitectureDiagram(getDiagramIdForFeature(f.slug))
              return (
                <Reveal key={f.slug} delay={i * 0.05}>
                  <Link to={href}>
                    <Card hover className="h-full overflow-hidden !p-0">
                      {miniDiagram && (
                        <div className="border-b border-border">
                          <TrafficFlowDiagram diagram={miniDiagram} compact showLegend={false} />
                        </div>
                      )}
                      <div className="p-6">
                        <Icon className="mb-4 h-8 w-8 text-accent" />
                        <h3 className="font-semibold text-foreground">{f.title}</h3>
                        <p className="mt-2 text-sm text-muted">{f.description}</p>
                      </div>
                    </Card>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>
    </MarketingPage>
  )
}
