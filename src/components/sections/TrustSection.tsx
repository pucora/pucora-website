import { Container } from '../ui/Container'
import { Badge } from '../ui/Badge'

const badges = ['Open Source', 'Linux Foundation — Lura', 'KrakenD Compatible', 'Docker Ready']

export function TrustSection() {
  return (
    <section className="border-y border-border bg-background py-10">
      <Container>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {badges.map((label) => (
            <Badge key={label} variant="accent">
              {label}
            </Badge>
          ))}
        </div>
      </Container>
    </section>
  )
}
