import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { MarketingPage } from './MarketingPage'
import type { Feature } from '../../content/features'
import { FeatureArchitectureDiagram } from '../visuals/FeatureArchitectureDiagram'

const featureDocPaths: Record<string, string> = {
  'api-aggregation': 'design/backend-for-frontend',
  'traffic-management': 'throttling',
  authentication: 'authorization',
  connectivity: 'non-rest-connectivity',
  'data-transformation': 'backends/data-manipulation',
  observability: 'telemetry',
  gitops: 'configuration/flexible-config',
  documentation: 'overview',
}

interface FeaturePageTemplateProps {
  feature: Feature
  relatedSlugs?: string[]
  allFeatures: Feature[]
}

export function FeaturePageTemplate({ feature, relatedSlugs = [], allFeatures }: FeaturePageTemplateProps) {
  const Icon = feature.icon
  const related = allFeatures.filter((f) => relatedSlugs.includes(f.slug) && f.slug !== feature.slug)

  return (
    <MarketingPage
      title={feature.title}
      subtitle="Feature"
      description={feature.description}
      cta={{ label: 'Get Started', href: '/get-started' }}
    >
      <section className="apple-section">
        <Container>
          <FeatureArchitectureDiagram slug={feature.slug} />
          <div className="grid gap-10 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <Icon className="mb-6 h-10 w-10 text-brand" />
              {feature.namespace && <Badge variant="accent" className="mb-4">{feature.namespace}</Badge>}
              {feature.bullets && (
                <ul className="space-y-3">
                  {feature.bullets.map((b) => (
                    <li key={b} className="flex items-start gap-3 text-subtle">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                      {b}
                    </li>
                  ))}
                </ul>
              )}
              <Button href={`/docs/${featureDocPaths[feature.slug] ?? 'overview'}`} variant="link" className="mt-8">
                Learn in documentation ›
              </Button>
            </div>
            {related.length > 0 && (
              <div>
                <h3 className="mb-4 font-semibold text-foreground">Related</h3>
                <div className="space-y-2">
                  {related.map((r) => (
                    <Link key={r.slug} to={`/features/${r.slug}`}>
                      <Card hover className="!p-4"><p className="font-medium text-foreground">{r.title}</p></Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </Container>
      </section>
    </MarketingPage>
  )
}
