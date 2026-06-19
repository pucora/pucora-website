import { architectureDiagrams } from '../../content/architecture-diagrams'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { TrafficFlowDiagram } from '../visuals/TrafficFlowDiagram'
import { Reveal } from '../../hooks/useScrollReveal'

const showcaseIds = ['pucora-idp', 'gateway', 'bff', 'websocket', 'grpc', 'observability'] as const

export function ImplementationShowcaseSection() {
  return (
    <section className="apple-section">
      <Container>
        <SectionHeading
          title="See every implementation pattern."
          description="Animated diagrams for the architectures teams deploy with Pucora every day."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {showcaseIds.map((id, i) => {
            const diagram = architectureDiagrams.find((d) => d.id === id)!
            return (
              <Reveal key={id} delay={i * 0.06}>
                <div className="group h-full">
                  <div className="mb-3">
                    <h3 className="font-semibold text-foreground">{diagram.title}</h3>
                    <p className="text-sm text-muted">{diagram.description}</p>
                  </div>
                  <TrafficFlowDiagram diagram={diagram} compact showLegend={false} />
                </div>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
