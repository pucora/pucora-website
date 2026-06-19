import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { TrafficFlowDiagram } from '../visuals/TrafficFlowDiagram'
import { architectureDiagrams } from '../../content/architecture-diagrams'
import { Reveal } from '../../hooks/useScrollReveal'
import { cn } from '../../lib/cn'

export function ArchitectureTrafficSection() {
  const [activeId, setActiveId] = useState('pucora-idp')
  const active = architectureDiagrams.find((d) => d.id === activeId) ?? architectureDiagrams[0]

  return (
    <section className="apple-section-alt">
      <Container>
        <SectionHeading
          title="Architecture in motion."
          description="Watch how requests flow through Pucora — IdP integration, aggregation, async events, and zero-trust security."
        />

        <Reveal delay={0.1}>
          <div className="-mx-4 mb-6 overflow-x-auto px-4 pb-2">
            <div className="flex min-w-max gap-2">
              {architectureDiagrams.map((diagram) => (
                <button
                  key={diagram.id}
                  type="button"
                  onClick={() => setActiveId(diagram.id)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-all whitespace-nowrap',
                    activeId === diagram.id
                      ? 'border-brand bg-brand/10 font-medium text-brand'
                      : 'border-border bg-background text-subtle hover:border-brand/30 hover:text-foreground',
                  )}
                >
                  {diagram.title}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <AnimatePresence mode="wait">
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <TrafficFlowDiagram diagram={active} />
            </motion.div>
          </AnimatePresence>
        </Reveal>

        <Reveal delay={0.25}>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[
              { label: '70K+ req/s', hint: 'Stateless throughput' },
              { label: '<50MB RAM', hint: 'Lean binary footprint' },
              { label: '15 protocols', hint: 'Single config surface' },
            ].map((stat) => (
              <div key={stat.label} className="rounded-xl border border-border bg-background px-4 py-3 text-center">
                <p className="text-lg font-semibold text-foreground">{stat.label}</p>
                <p className="text-xs text-muted">{stat.hint}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
