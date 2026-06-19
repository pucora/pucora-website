import { MarketingPage } from '../../components/templates/MarketingPage'
import { Container } from '../../components/ui/Container'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Reveal } from '../../hooks/useScrollReveal'
import { externalLinks } from '../../content/brand'

const communityLinks = [
  {
    title: 'GitHub — pucora-ce',
    description: 'Main repository — source code, issues, releases, and contributions.',
    href: externalLinks.github,
  },
  {
    title: 'Lura Project',
    description: 'The open framework behind Pucora, under the Linux Foundation.',
    href: externalLinks.lura,
  },
  {
    title: 'Docker Hub',
    description: 'Official container images for Pucora CE.',
    href: externalLinks.dockerHub,
  },
]

export function Community() {
  return (
    <MarketingPage
      title="Community"
      subtitle="Open Source"
      description="Pucora is open source. Contribute, report issues, and join the community building high-performance API gateways."
      cta={{ label: 'View on GitHub', href: externalLinks.github }}
    >
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {communityLinks.map((link, i) => (
              <Reveal key={link.title} delay={i * 0.1}>
                <Card className="flex h-full flex-col">
                  <h3 className="font-semibold text-foreground">{link.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{link.description}</p>
                  <Button href={link.href} external variant="outline" className="mt-4">
                    Visit
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
