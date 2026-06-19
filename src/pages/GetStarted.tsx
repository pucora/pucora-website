import { MarketingPage } from '../components/templates/MarketingPage'
import { Container } from '../components/ui/Container'
import { CodeBlock } from '../components/ui/CodeBlock'
import { Card } from '../components/ui/Card'
import { Reveal } from '../hooks/useScrollReveal'
import { codeSnippets } from '../content/code-snippets'

const steps = [
  {
    title: 'Docker (recommended)',
    commands: [codeSnippets.dockerPull, codeSnippets.dockerRun, codeSnippets.healthCheck],
  },
  {
    title: 'Build from source',
    commands: [codeSnippets.binaryBuild, codeSnippets.binaryRun, codeSnippets.healthCheck],
  },
  {
    title: 'Configurator',
    commands: [
      codeSnippets.configuratorInit,
      codeSnippets.configuratorPreset,
      codeSnippets.configuratorGenerate,
      codeSnippets.configCheck,
      codeSnippets.binaryRun,
    ],
  },
]

export function GetStarted() {
  return (
    <MarketingPage
      title="Get Started"
      subtitle="Installation"
      description="Run Pucora in minutes with Docker, build from source, or use the Configurator to generate your gateway setup."
    >
      <section className="py-16">
        <Container>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <Card>
                  <h3 className="mb-4 text-xl font-bold text-white">{step.title}</h3>
                  <div className="space-y-3">
                    {step.commands.map((cmd) => (
                      <CodeBlock key={cmd} code={`$ ${cmd}`} />
                    ))}
                  </div>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </MarketingPage>
  )
}
