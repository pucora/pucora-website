import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Card } from '../ui/Card'
import { MarketingPage } from './MarketingPage'
import type { Solution } from '../../content/solutions'
import { homeFeatures } from '../../content/features'
import { SolutionArchitectureDiagram } from '../visuals/SolutionArchitectureDiagram'

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
      <section className="apple-section">
        <Container>
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <h3 className="mb-2 font-semibold text-brand">The challenge</h3>
              <p className="text-subtle">{solution.problem}</p>
            </Card>
            <Card>
              <h3 className="mb-2 font-semibold text-brand">How Pucora helps</h3>
              <p className="text-subtle">{solution.solution}</p>
            </Card>
          </div>
          <div className="mt-10">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Outcomes</h3>
            <ul className="grid gap-3 sm:grid-cols-2">
              {solution.outcomes.map((o) => (
                <li key={o} className="rounded-xl border border-border bg-surface p-4 text-sm text-subtle">
                  {o}
                </li>
              ))}
            </ul>
          </div>
          {solution.preset && (
            <div className="mt-8 rounded-xl border border-brand/20 bg-brand/5 p-5">
              <p className="text-sm text-muted">Configurator preset</p>
              <p className="mt-1 font-mono text-brand">{solution.preset}</p>
            </div>
          )}
          <SolutionArchitectureDiagram slug={solution.slug} />
          {related.length > 0 && (
            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {related.map((f) => (
                <Link key={f.slug} to={`/features/${f.slug}`}>
                  <Card hover><p className="font-medium text-foreground">{f.title}</p></Card>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </section>
    </MarketingPage>
  )
}
