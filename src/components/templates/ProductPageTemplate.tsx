import { Container } from '../ui/Container'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { MarketingPage } from './MarketingPage'
import { Reveal } from '../../hooks/useScrollReveal'
import type { Product } from '../../content/products'

interface ProductPageTemplateProps {
  product: Product
}

export function ProductPageTemplate({ product }: ProductPageTemplateProps) {
  return (
    <MarketingPage
      title={product.name}
      subtitle={product.tagline}
      description={product.description}
      cta={product.cta}
    >
      <section className="py-16">
        <Container>
          <Reveal>
            <Card className="max-w-3xl">
              <h3 className="mb-6 text-xl font-bold text-white">Key capabilities</h3>
              <ul className="space-y-3">
                {product.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-muted">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    {f}
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <Button href={product.cta.href}>{product.cta.label}</Button>
            </div>
          </Reveal>
        </Container>
      </section>
    </MarketingPage>
  )
}
