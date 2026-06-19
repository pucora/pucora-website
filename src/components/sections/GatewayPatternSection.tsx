import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { AnimatedGatewayDiagram } from '../visuals/AnimatedGatewayDiagram'
import { LazyThreeCanvasWrapper as ThreeCanvas } from '../three/LazyThreeCanvas'
import { Reveal } from '../../hooks/useScrollReveal'

export function GatewayPatternSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute right-0 top-1/2 h-[500px] w-[500px] -translate-y-1/2 translate-x-1/4 opacity-20">
        <ThreeCanvas variant="inline" interactive={false} className="h-full w-full" />
      </div>
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Go beyond a simple reverse-proxy"
            title="The API Gateway pattern at its full extent"
            description="Pucora creates an API Gateway able to connect, secure, aggregate, transform or remove data across your services and event-driven workloads."
          />
        </Reveal>

        <Reveal delay={0.2} direction="scale">
          <AnimatedGatewayDiagram />
        </Reveal>
      </Container>
    </section>
  )
}
