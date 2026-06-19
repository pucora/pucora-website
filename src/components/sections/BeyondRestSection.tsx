import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { beyondRestHighlights } from '../../content/connectivity'
import { architectureDiagrams } from '../../content/architecture-diagrams'
import { TrafficFlowDiagram } from '../visuals/TrafficFlowDiagram'
import { StaggerChildren, StaggerItem } from '../../hooks/useScrollReveal'
import { Reveal } from '../../hooks/useScrollReveal'

export function BeyondRestSection() {
  return (
    <section className="apple-section-alt">
      <Container>
        <SectionHeading
          title="15 protocols. All in Community Edition."
          description="Enterprise-grade connectivity — WebSockets, gRPC, Pub/Sub, SOAP, and more."
        />
        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.08}>
          {beyondRestHighlights.map((item) => (
            <StaggerItem key={item.title}>
              <Card className="h-full">
                <h3 className="mb-2 font-semibold text-brand">{item.title}</h3>
                <p className="text-sm leading-relaxed text-subtle">{item.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>
        <Reveal delay={0.15}>
          <div className="mt-12">
            <TrafficFlowDiagram diagram={architectureDiagrams.find((d) => d.id === 'events')!} />
          </div>
        </Reveal>
        <Reveal delay={0.2}>
          <div className="mt-10 text-center">
            <Button href="/features/connectivity" variant="link">
              Explore connectivity ›
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
