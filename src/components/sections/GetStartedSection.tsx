import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { CodeBlock } from '../ui/CodeBlock'
import { Button } from '../ui/Button'
import { codeSnippets } from '../../content/code-snippets'
import { externalLinks } from '../../content/brand'
import { Reveal } from '../../hooks/useScrollReveal'

export function GetStartedSection() {
  return (
    <section className="bg-inverse py-20 text-inverse-foreground md:py-28">
      <Container>
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <SectionHeading
              dark
              title="Get started in 5 minutes."
              description="Pull the Docker image and run Pucora with your configuration."
            />
            <CodeBlock code={`$ ${codeSnippets.dockerRun}`} className="text-left" />
            <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button
                href="/get-started"
                size="lg"
                className="!bg-background !text-foreground hover:!bg-background/90"
              >
                Installation Guide
              </Button>
              <Button href={externalLinks.github} external variant="link" size="lg" className="!text-inverse-foreground hover:!text-inverse-foreground/80">
                View on GitHub ›
              </Button>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
