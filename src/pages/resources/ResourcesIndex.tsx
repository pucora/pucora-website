import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Reveal } from '../../hooks/useScrollReveal'
import { externalLinks } from '../../content/brand'

const resourceLinks = [
  { title: 'Documentation', description: 'Guides, reference, and configuration docs.', href: '/resources/documentation' },
  { title: 'Community', description: 'GitHub, issues, and contributing.', href: '/resources/community' },
  { title: 'Get Started', description: 'Install and run Pucora in minutes.', href: '/get-started' },
  { title: 'Downloads', description: 'Docker images and release binaries.', href: '/downloads' },
  { title: 'Configurator', description: 'YAML profiles to gateway configuration.', href: '/products/configurator' },
  { title: 'Designer', description: 'Visual configuration designer.', href: externalLinks.designer, external: true },
]

export function ResourcesIndex() {
  return (
    <MarketingPage
      title="Resources"
      subtitle="Learn & Build"
      description="Documentation, community, tools, and guides to help you deploy and operate Pucora."
    >
      <section className="py-16">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {resourceLinks.map((r, i) => (
              <Reveal key={r.title} delay={i * 0.05}>
                <Card className="flex h-full flex-col">
                  <h3 className="font-semibold text-white">{r.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{r.description}</p>
                  <Button
                    href={r.href}
                    external={'external' in r && r.external}
                    variant="outline"
                    className="mt-4"
                  >
                    Open
                  </Button>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </MarketingPage>
  )
}
