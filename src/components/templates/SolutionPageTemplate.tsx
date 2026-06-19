import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { MarketingPage } from './MarketingPage'
import { Reveal } from '../../hooks/useScrollReveal'
import type { Solution } from '../../content/solutions'
import { homeFeatures } from '../../content/features'

interface SolutionPageTemplateProps {
  solution: Solution
}

export function SolutionPageTemplate({ solution }: SolutionPageTemplateProps) {
  const related = homeFeatures.filter((f) => solution.relatedFeatures.includes(f.slug))

  return (
    <MarketingPage
      title={solution.title}
      subtitle={solution.subtitle}
      description={solution.problem}
      cta={{ label: 'Get Started', href: '/get-started' }}
    >
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-2">
            <Reveal>
              <Card>
                <h3 className="mb-3 text-lg font-semibold text-accent">The challenge</h3>
                <p className="text-muted">{solution.problem}</p>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <Card>
                <h3 className="mb-3 text-lg font-semibold text-accent">How Pucora helps</h3>
                <p className="text-muted">{solution.solution}</p>
              </Card>
            </Reveal>
          </div>

          <Reveal delay={0.2}>
            <div className="mt-12">
              <h3 className="mb-6 text-xl font-bold text-white">Outcomes</h3>
              <ul className="grid gap-4 sm:grid-cols-2">
                {solution.outcomes.map((o) => (
                  <li key={o} className="flex items-start gap-3 rounded-xl border border-white/10 bg-navy-card p-4 text-muted">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {o}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>

          {solution.preset && (
            <Reveal delay={0.3}>
              <div className="mt-12 rounded-xl border border-accent/20 bg-accent/5 p-6">
                <p className="text-sm text-muted">Configurator preset</p>
                <p className="mt-1 font-mono text-accent">{solution.preset}</p>
                <Button href="/products/configurator" variant="outline" className="mt-4">
                  View Configurator presets
                </Button>
              </div>
            </Reveal>
          )}

          {related.length > 0 && (
            <Reveal delay={0.4}>
              <div className="mt-12">
                <h3 className="mb-6 text-xl font-bold text-white">Related features</h3>
                <div className="grid gap-4 sm:grid-cols-3">
                  {related.map((f) => (
                    <Link key={f.slug} to={`/features/${f.slug}`}>
                      <Card hover>
                        <p className="font-medium text-white">{f.title}</p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          )}
        </Container>
      </section>
    </MarketingPage>
  )
}
