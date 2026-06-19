import { MarketingPage } from '../components/templates/MarketingPage'
import { Container } from '../components/ui/Container'
import { CodeBlock } from '../components/ui/CodeBlock'
import { Card } from '../components/ui/Card'
import { Reveal } from '../hooks/useScrollReveal'
import { codeSnippets } from '../content/code-snippets'
import { PipelineFlowDiagram, pipelinePresets } from '../components/visuals/PipelineFlowDiagram'
import { TrafficFlowDiagram } from '../components/visuals/TrafficFlowDiagram'
import { getArchitectureDiagram } from '../content/architecture-diagrams'

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

const gatewayDiagram = getArchitectureDiagram('gateway')!

export function GetStarted() {
  return (
    <MarketingPage
      title="Get Started"
      subtitle="Installation"
      description="Run Pucora in minutes with Docker, build from source, or use the Configurator to generate your gateway setup."
    >
      <section className="border-b border-border bg-surface py-16">
        <Container>
          <Reveal>
            <h2 className="mb-2 text-2xl font-semibold text-foreground">Deployment flows</h2>
            <p className="mb-8 max-w-2xl text-subtle">
              Visual guides for the most common paths from zero to running gateway.
            </p>
          </Reveal>
          <div className="grid gap-6 lg:grid-cols-3">
            <Reveal delay={0.05}>
              <PipelineFlowDiagram {...pipelinePresets.docker} />
            </Reveal>
            <Reveal delay={0.1}>
              <PipelineFlowDiagram {...pipelinePresets.configurator} />
            </Reveal>
            <Reveal delay={0.15}>
              <PipelineFlowDiagram {...pipelinePresets.gitops} />
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="mt-8">
              <TrafficFlowDiagram diagram={gatewayDiagram} />
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="py-16">
        <Container>
          <div className="space-y-12">
            {steps.map((step, i) => (
              <Reveal key={step.title} delay={i * 0.1}>
                <Card>
                  <h3 className="mb-4 text-xl font-bold text-foreground">{step.title}</h3>
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
