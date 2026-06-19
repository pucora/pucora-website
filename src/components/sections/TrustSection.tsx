import { motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Badge } from '../ui/Badge'
import { Reveal } from '../../hooks/useScrollReveal'

const badges = [
  { label: 'Open Source', variant: 'accent' as const },
  { label: 'Linux Foundation — Lura', variant: 'indigo' as const },
  { label: 'KrakenD Compatible', variant: 'default' as const },
  { label: 'Docker Ready', variant: 'default' as const },
]

export function TrustSection() {
  return (
    <section className="relative overflow-hidden border-y border-white/10 bg-navy-light py-16">
      <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-indigo/5" />
      <Container className="relative">
        <Reveal>
          <div className="flex flex-wrap items-center justify-center gap-4">
            {badges.map((b, i) => (
              <motion.div
                key={b.label}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Badge variant={b.variant}>{b.label}</Badge>
              </motion.div>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
