import { MarketingPage } from '../components/templates/MarketingPage'
import { Container } from '../components/ui/Container'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { CodeBlock } from '../components/ui/CodeBlock'
import { Reveal } from '../hooks/useScrollReveal'
import { externalLinks } from '../content/brand'
import { codeSnippets } from '../content/code-snippets'

const downloads = [
  {
    title: 'Docker Hub',
    description: 'Official Pucora CE container image.',
    detail: 'niteesh20/pucora:2.0.0',
    href: externalLinks.dockerHub,
    command: codeSnippets.dockerPull,
  },
  {
    title: 'GitHub Releases',
    description: 'Source code and release binaries.',
    detail: externalLinks.githubLabel,
    href: externalLinks.github,
  },
  {
    title: 'JSON Schema',
    description: 'Configuration schema for validation and IDE support.',
    detail: 'pucora.json schema v2.0',
    href: externalLinks.schema,
  },
]

export function Downloads() {
  return (
    <MarketingPage
      title="Downloads"
      subtitle="Get Pucora"
      description="Download Pucora Community Edition via Docker, GitHub releases, or validate your config against the official JSON schema."
    >
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-3">
            {downloads.map((item, i) => (
              <Reveal key={item.title} delay={i * 0.1}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-lg font-bold text-foreground">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm text-muted">{item.description}</p>
                  <p className="mt-4 font-mono text-xs text-accent">{item.detail}</p>
                  {item.command && <CodeBlock code={`$ ${item.command}`} className="mt-4 text-xs" />}
                  <Button href={item.href} external variant="outline" className="mt-4">
                    Download
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
