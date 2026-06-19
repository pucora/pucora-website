import { Zap, Layers, Unlock } from 'lucide-react'
import { Container } from '../ui/Container'
import { Card } from '../ui/Card'
import { pillars } from '../../content/stats'
import { StaggerChildren, StaggerItem } from '../../hooks/useScrollReveal'

const icons = [Zap, Layers, Unlock]
const accents = ['text-accent', 'text-indigo-300', 'text-teal-300']
const glows = ['from-accent/10', 'from-indigo/10', 'from-teal-400/10']

export function PillarsSection() {
  return (
    <section className="relative overflow-hidden bg-navy-light py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-indigo/5 to-transparent" />
      <Container className="relative">
        <StaggerChildren className="grid gap-8 md:grid-cols-3">
          {pillars.map((pillar, i) => {
            const Icon = icons[i]
            return (
              <StaggerItem key={pillar.title}>
                <Card hover className="group h-full overflow-hidden">
                  <div
                    className={`absolute -right-8 -top-8 h-32 w-32 rounded-full bg-gradient-to-br ${glows[i]} to-transparent opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100`}
                  />
                  <div className={`mb-5 inline-flex rounded-xl bg-white/5 p-3 ${accents[i]}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="mb-3 text-xl font-bold text-white">{pillar.title}</h3>
                  <p className="text-muted leading-relaxed">{pillar.description}</p>
                </Card>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </Container>
    </section>
  )
}
