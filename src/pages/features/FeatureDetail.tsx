import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { FeaturePageTemplate } from '../../components/templates/FeaturePageTemplate'
import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Badge } from '../../components/ui/Badge'
import { Button } from '../../components/ui/Button'
import { Reveal } from '../../hooks/useScrollReveal'
import { getFeatureBySlug, homeFeatures } from '../../content/features'
import { connectivityFeatures } from '../../content/connectivity'

const relatedMap: Record<string, string[]> = {
  'api-aggregation': ['traffic-management', 'gitops'],
  'traffic-management': ['api-aggregation', 'observability'],
  authentication: ['traffic-management', 'connectivity'],
  connectivity: ['data-transformation', 'gitops'],
  'data-transformation': ['connectivity', 'api-aggregation'],
  observability: ['traffic-management', 'gitops'],
  gitops: ['api-aggregation', 'observability'],
}

export function FeatureDetail() {
  const { slug } = useParams<{ slug: string }>()

  if (slug === 'connectivity') {
    const [filter, setFilter] = useState<'all' | 'ce'>('all')
    const filtered =
      filter === 'ce' ? connectivityFeatures.filter((f) => f.inCE) : connectivityFeatures

    return (
      <MarketingPage
        title="Services Connectivity"
        subtitle="Beyond REST"
        description="Integrate with message brokers, event-driven systems, and alternative protocols beyond traditional REST/HTTP."
        cta={{ label: 'Get Started', href: '/get-started' }}
      >
        <section className="py-16">
          <Container>
            <div className="mb-6 flex gap-2">
              <button
                type="button"
                onClick={() => setFilter('all')}
                className={`rounded-lg px-4 py-2 text-sm ${filter === 'all' ? 'bg-accent text-navy' : 'bg-white/10 text-white'}`}
              >
                All ({connectivityFeatures.length})
              </button>
              <button
                type="button"
                onClick={() => setFilter('ce')}
                className={`rounded-lg px-4 py-2 text-sm ${filter === 'ce' ? 'bg-accent text-navy' : 'bg-white/10 text-white'}`}
              >
                In CE ({connectivityFeatures.filter((f) => f.inCE).length})
              </button>
            </div>
            <div className="overflow-x-auto rounded-xl border border-white/10">
              <table className="w-full text-left text-sm">
                <thead className="border-b border-white/10 bg-navy-card">
                  <tr>
                    <th className="px-4 py-3 font-semibold text-white">#</th>
                    <th className="px-4 py-3 font-semibold text-white">Feature</th>
                    <th className="px-4 py-3 font-semibold text-white">Namespace</th>
                    <th className="px-4 py-3 font-semibold text-white">Description</th>
                    <th className="px-4 py-3 font-semibold text-white">Edition</th>
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((f) => (
                    <tr key={f.id} className="border-b border-white/5 hover:bg-white/5">
                      <td className="px-4 py-3 text-muted">{f.id}</td>
                      <td className="px-4 py-3 font-medium text-white">{f.name}</td>
                      <td className="px-4 py-3 font-mono text-xs text-accent">{f.namespace}</td>
                      <td className="px-4 py-3 text-muted">{f.description}</td>
                      <td className="px-4 py-3">
                        <Badge variant={f.inCE ? 'accent' : 'default'}>
                          {f.inCE ? 'CE' : 'EE'}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Reveal delay={0.2}>
              <div className="mt-8">
                <Button href="/solutions/event-driven" variant="outline">
                  See event-driven solution
                </Button>
              </div>
            </Reveal>
          </Container>
        </section>
      </MarketingPage>
    )
  }

  const feature = slug ? getFeatureBySlug(slug) : undefined
  if (!feature) return <Navigate to="/features" replace />

  return (
    <FeaturePageTemplate
      feature={feature}
      relatedSlugs={slug ? (relatedMap[slug] ?? []) : []}
      allFeatures={homeFeatures}
    />
  )
}
