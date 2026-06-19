import { Link } from 'react-router-dom'
import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Reveal } from '../../hooks/useScrollReveal'
import { products } from '../../content/products'

export function ProductsIndex() {
  return (
    <MarketingPage
      title="Products"
      subtitle="Pucora Platform"
      description="From the open-source Community Edition to the Configurator and Lura engine — everything you need to build and operate a high-performance API gateway."
    >
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {products.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.1}>
                <Link to={`/products/${p.slug}`}>
                  <Card hover className="h-full">
                    <p className="text-sm font-medium text-accent">{p.tagline}</p>
                    <h3 className="mt-2 text-xl font-bold text-white">{p.name}</h3>
                    <p className="mt-3 text-sm text-muted">{p.description}</p>
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
