import { Container } from '../ui/Container'
import { Card } from '../ui/Card'
import { Button } from '../ui/Button'
import { MarketingPage } from './MarketingPage'
import type { Product } from '../../content/products'
import { ProductArchitectureDiagram } from '../visuals/ProductArchitectureDiagram'

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
      <section className="apple-section">
        <Container>
          <Card className="max-w-3xl">
            <h3 className="mb-4 text-lg font-semibold text-foreground">Key capabilities</h3>
            <ul className="space-y-3">
              {product.features.map((f) => (
                <li key={f} className="flex items-start gap-3 text-subtle">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-brand" />
                  {f}
                </li>
              ))}
            </ul>
          </Card>
          <Button href={product.cta.href} className="mt-8">{product.cta.label}</Button>
          <ProductArchitectureDiagram slug={product.slug} />
        </Container>
      </section>
    </MarketingPage>
  )
}
