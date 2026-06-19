import { useParams, Navigate } from 'react-router-dom'
import { ProductPageTemplate } from '../../components/templates/ProductPageTemplate'
import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { CodeBlock } from '../../components/ui/CodeBlock'
import { Reveal } from '../../hooks/useScrollReveal'
import { getProductBySlug, configuratorPresets } from '../../content/products'
import { codeSnippets } from '../../content/code-snippets'
import { externalLinks } from '../../content/brand'
import { Button } from '../../components/ui/Button'

export function ProductDetail() {
  const { slug } = useParams<{ slug: string }>()
  const product = slug ? getProductBySlug(slug) : undefined

  if (!product) return <Navigate to="/products" replace />

  if (slug === 'configurator') {
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
              <Card className="mb-8">
                <h3 className="mb-4 text-xl font-bold text-white">Quick start</h3>
                <div className="space-y-3">
                  <CodeBlock code={`$ ${codeSnippets.configuratorInit}`} />
                  <CodeBlock code={`$ ${codeSnippets.configuratorPreset}`} />
                  <CodeBlock code={`$ ${codeSnippets.configuratorValidate}`} />
                </div>
              </Card>
            </Reveal>
            <Reveal delay={0.1}>
              <h3 className="mb-4 text-xl font-bold text-white">Available presets</h3>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {configuratorPresets.map((preset) => (
                  <Card key={preset} className="!p-4">
                    <code className="text-sm text-accent">{preset}</code>
                  </Card>
                ))}
              </div>
            </Reveal>
          </Container>
        </section>
      </MarketingPage>
    )
  }

  if (slug === 'lura') {
    return (
      <MarketingPage
        title={product.name}
        subtitle={product.tagline}
        description={product.description}
        cta={{ label: 'Visit Lura Project', href: externalLinks.lura }}
      >
        <section className="py-16">
          <Container>
            <Reveal>
              <Card>
                <ul className="space-y-3">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-muted">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                      {f}
                    </li>
                  ))}
                </ul>
                <Button href={externalLinks.lura} external className="mt-6">
                  luraproject.org
                </Button>
              </Card>
            </Reveal>
          </Container>
        </section>
      </MarketingPage>
    )
  }

  return <ProductPageTemplate product={product} />
}
