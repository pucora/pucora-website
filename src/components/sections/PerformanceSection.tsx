import { CheckCircle2 } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'
import { AnimatedBar } from '../visuals/AnimatedBar'
import { Reveal } from '../../hooks/useScrollReveal'

const benchmarks = [
  'Network limit verification',
  'Resource consumption assessment',
  'Independent performance benchmarking',
  'Stateless horizontal scale-out',
]

const bars = [
  { name: 'Pucora CE', value: 100, display: '70K+', color: 'bg-brand', delay: 0.2 },
  { name: 'Traditional proxy', value: 35, display: '~25K', color: 'bg-link', delay: 0.4 },
  { name: 'Heavyweight gateway', value: 20, display: '~14K', color: 'bg-muted', delay: 0.6 },
]

export function PerformanceSection() {
  return (
    <section className="apple-section-alt">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <SectionHeading
              align="left"
              title="Built for performance."
              description="Stateless architecture and a performance-first design deliver consistent throughput at any scale."
            />
            <ul className="space-y-3">
              {benchmarks.map((item) => (
                <li key={item} className="flex items-center gap-3 text-sm text-subtle">
                  <CheckCircle2 className="h-4 w-4 shrink-0 text-brand" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/features/traffic-management" variant="link">
                See traffic management ›
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="rounded-2xl border border-border bg-background p-8 shadow-sm">
              <p className="mb-6 text-sm font-medium text-muted">Throughput comparison (req/s)</p>
              <div className="space-y-6">
                {bars.map((bar) => (
                  <AnimatedBar key={bar.name} {...bar} />
                ))}
              </div>
              <p className="mt-6 text-xs text-muted">* Illustrative benchmark — run your own tests on your hardware.</p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
