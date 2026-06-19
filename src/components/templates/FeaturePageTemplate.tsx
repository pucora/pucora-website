import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { Button } from '../ui/Button'
import { MarketingPage } from './MarketingPage'
import { Reveal } from '../../hooks/useScrollReveal'
import type { Feature } from '../../content/features'
import { externalLinks } from '../../content/brand'

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
      <section className="py-16">
        <Container>
          <div className="grid gap-12 lg:grid-cols-3">
            <Reveal>
              <div className="lg:col-span-2">
                <Icon className="mb-6 h-12 w-12 text-accent" />
                {feature.namespace && (
                  <Badge variant="accent" className="mb-4">
                    {feature.namespace}
                  </Badge>
                )}
                {feature.bullets && (
                  <ul className="space-y-3">
                    {feature.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-muted">
                        <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                        {b}
                      </li>
                    ))}
                  </ul>
                )}
                <div className="mt-8">
                  <Button href={externalLinks.docs} external variant="outline">
                    Learn in documentation
                  </Button>
                </div>
              </div>
            </Reveal>
            {related.length > 0 && (
              <Reveal delay={0.2}>
                <div>
                  <h3 className="mb-4 font-semibold text-white">Related features</h3>
                  <div className="space-y-3">
                    {related.map((r) => (
                      <Link key={r.slug} to={`/features/${r.slug}`}>
                        <Card hover className="!p-4">
                          <p className="font-medium text-white">{r.title}</p>
                        </Card>
                      </Link>
                    ))}
                  </div>
                </div>
              </Reveal>
            )}
          </div>
        </Container>
      </section>
    </MarketingPage>
  )
}
