import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { CodeBlock } from '../ui/CodeBlock'
import { Button } from '../ui/Button'
import { codeSnippets } from '../../content/code-snippets'
import { externalLinks } from '../../content/brand'
import { AmbientBackground } from '../visuals/AmbientBackground'
import { Reveal } from '../../hooks/useScrollReveal'

export function GetStartedSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <AmbientBackground variant="subtle" />
      <Container className="relative">
        <Reveal direction="scale">
          <div className="gradient-border glow-accent overflow-hidden rounded-3xl p-1">
            <div className="relative rounded-[22px] bg-gradient-to-br from-navy-card via-navy-light to-navy-card p-8 md:p-14">
              <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-accent/10 blur-3xl" />
              <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-indigo/10 blur-3xl" />
              <div className="relative">
                <SectionHeading
                  title="Get started in 5 minutes"
                  description="Pull the Docker image and run Pucora with your configuration."
                />
                <CodeBlock code={`$ ${codeSnippets.dockerRun}`} className="mx-auto max-w-3xl" />
                <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row sm:flex-wrap">
                  <Button href="/get-started" size="lg">
                    View Installation Guide
                  </Button>
                  <Button href="/downloads" variant="outline" size="lg">
                    Downloads
                  </Button>
                  <Button href={externalLinks.github} external variant="ghost" size="lg">
                    Star on GitHub
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
