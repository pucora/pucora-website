import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { AnimatedGatewayDiagram } from '../visuals/AnimatedGatewayDiagram'
import { Reveal } from '../../hooks/useScrollReveal'

export function GatewayPatternSection() {
  return (
    <section className="apple-section">
      <Container>
        <SectionHeading
          title="More than a reverse proxy."
          description="Connect, secure, aggregate, and transform data across microservices and event-driven workloads."
        />
        <Reveal delay={0.15}>
          <AnimatedGatewayDiagram />
        </Reveal>
      </Container>
    </section>
  )
}
