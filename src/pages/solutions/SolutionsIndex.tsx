import { Link } from 'react-router-dom'
import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Reveal } from '../../hooks/useScrollReveal'
import { solutions } from '../../content/solutions'

export function SolutionsIndex() {
  return (
    <MarketingPage
      title="Solutions"
      subtitle="Use Cases"
      description="Pucora solves real-world API gateway challenges — from microservices aggregation to event-driven architectures and legacy integration."
    >
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {solutions.map((s, i) => (
              <Reveal key={s.slug} delay={i * 0.1}>
                <Link to={`/solutions/${s.slug}`}>
                  <Card hover className="h-full">
                    <p className="text-sm font-medium text-accent">{s.subtitle}</p>
                    <h3 className="mt-2 text-xl font-bold text-foreground">{s.title}</h3>
                    <p className="mt-3 text-sm text-muted">{s.problem}</p>
                  </Card>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </MarketingPage>
  )
}
