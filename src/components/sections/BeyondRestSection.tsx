import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { beyondRestHighlights } from '../../content/connectivity'
import { AmbientBackground } from '../visuals/AmbientBackground'
import { StaggerChildren, StaggerItem } from '../../hooks/useScrollReveal'
import { Reveal } from '../../hooks/useScrollReveal'

const icons = ['⚡', '🔄', '🔗', '✦']

export function BeyondRestSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <AmbientBackground variant="section" />
      <div className="absolute inset-0 bg-gradient-to-b from-indigo/10 via-transparent to-accent/5" />
      <Container className="relative">
        <Reveal>
          <SectionHeading
            eyebrow="Beyond REST Connectivity"
            title="15 protocols. All in Community Edition."
            description="Connect to message brokers, event-driven systems, and alternative protocols beyond traditional REST/HTTP — enterprise-grade connectivity included in Pucora CE."
          />
        </Reveal>

        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.1}>
          {beyondRestHighlights.map((item, i) => (
            <StaggerItem key={item.title}>
              <Card hover className="group h-full border-accent/10">
                <span className="mb-3 block text-2xl transition-transform duration-300 group-hover:scale-125">
                  {icons[i]}
                </span>
                <h3 className="mb-2 font-semibold text-accent">{item.title}</h3>
                <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              </Card>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <Button href="/features/connectivity">Explore all connectivity features</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
