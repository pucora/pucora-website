import { Zap, Layers, Unlock } from 'lucide-react'
import { Container } from '../ui/Container'
import { Card } from '../ui/Card'
import { SectionHeading } from '../ui/SectionHeading'
import { pillars } from '../../content/stats'
import { StaggerChildren, StaggerItem } from '../../hooks/useScrollReveal'

const icons = [Zap, Layers, Unlock]

export function PillarsSection() {
  return (
    <section className="apple-section-alt">
      <Container>
        <SectionHeading title="Why Pucora." description="Performance, simplicity, and openness — without compromise." />
        <StaggerChildren className="grid gap-6 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = icons[i]
            return (
              <StaggerItem key={pillar.title}>
                <Card className="h-full text-center">
                  <div className="mx-auto mb-4 inline-flex rounded-full bg-brand/10 p-3 text-brand">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold text-foreground">{pillar.title}</h3>
                  <p className="text-sm leading-relaxed text-subtle">{pillar.description}</p>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </Container>
    </section>
  )
}
