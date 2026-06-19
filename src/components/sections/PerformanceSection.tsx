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
  { name: 'Pucora CE', value: 100, display: '70K+', color: 'bg-gradient-to-r from-accent to-teal-400', delay: 0.2 },
  { name: 'Traditional proxy', value: 35, display: '~25K', color: 'bg-gradient-to-r from-indigo to-violet-500', delay: 0.4 },
  { name: 'Heavyweight gateway', value: 20, display: '~14K', color: 'bg-white/25', delay: 0.6 },
]

export function PerformanceSection() {
  return (
    <section className="relative overflow-hidden bg-navy-light py-20 md:py-28">
      <div className="pointer-events-none absolute -left-40 top-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 bottom-0 h-80 w-80 rounded-full bg-indigo/10 blur-3xl" />
      <Container className="relative">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal direction="left">
            <SectionHeading
              align="left"
              eyebrow="Unprecedented throughput"
              title="Built for Performance"
              description="Pucora' stateless architecture and performance-first approach for every internal component delivers consistent, top-tier throughput on commodity hardware."
            />
            <ul className="space-y-4">
              {benchmarks.map((item, i) => (
                <Reveal key={item} delay={0.1 * i} direction="left">
                  <li className="flex items-center gap-3 text-muted">
                    <CheckCircle2 className="h-5 w-5 shrink-0 text-accent" />
                    {item}
                  </li>
                </Reveal>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/features/traffic-management" variant="outline">
                See traffic management
              </Button>
            </div>
          </Reveal>

          <Reveal delay={0.2} direction="right">
            <div className="gradient-border glow-indigo rounded-2xl p-1">
              <div className="glass-card rounded-xl p-6 md:p-8">
                <p className="mb-6 text-sm font-medium text-muted">Throughput comparison (req/s)</p>
                <div className="space-y-6">
                  {bars.map((bar) => (
                    <AnimatedBar key={bar.name} {...bar} />
                  ))}
                </div>
                <p className="mt-6 text-xs text-muted">
                  * Illustrative benchmark — run your own tests on your hardware.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
