import { Link } from 'react-router-dom'
import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Reveal } from '../../hooks/useScrollReveal'
import { homeFeatures } from '../../content/features'

export function FeaturesIndex() {
  return (
    <MarketingPage
      title="Features"
      subtitle="Capabilities"
      description="Everything Pucora handles at the gateway layer so your microservices stay focused on business logic."
    >
      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {homeFeatures.map((f, i) => {
              const Icon = f.icon
              const href = f.slug === 'documentation' ? '/resources/documentation' : `/features/${f.slug}`
              return (
                <Reveal key={f.slug} delay={i * 0.05}>
                  <Link to={href}>
                    <Card hover className="h-full">
                      <Icon className="mb-4 h-8 w-8 text-accent" />
                      <h3 className="font-semibold text-white">{f.title}</h3>
                      <p className="mt-2 text-sm text-muted">{f.description}</p>
                    </Card>
                  </Link>
                </Reveal>
              )
            })}
          </div>
        </Container>
      </section>
    </MarketingPage>
  )
}
