import { useId } from 'react'
import { useReducedMotion } from 'framer-motion'
import { cn } from '../../lib/cn'

export interface PipelineStep {
  id: string
  label: string
  sublabel?: string
  highlight?: boolean
}

interface PipelineFlowDiagramProps {
  title: string
  description?: string
  steps: readonly PipelineStep[]
  className?: string
  compact?: boolean
}

export function PipelineFlowDiagram({ title, description, steps, className, compact }: PipelineFlowDiagramProps) {
  const reduced = useReducedMotion() ?? false
  const uid = useId().replace(/:/g, '')
  const gradId = `pipe-grad-${uid}`

  return (
    <div className={cn('overflow-hidden rounded-2xl border border-border bg-surface', className)}>
      {!compact && (
        <div className="border-b border-border bg-background/50 px-4 py-3 md:px-6">
          <p className="text-sm font-semibold text-foreground">{title}</p>
          {description && <p className="text-xs text-muted">{description}</p>}
        </div>
      )}
      <div className={cn('relative', compact ? 'p-4' : 'p-6 md:p-8')}>
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,color-mix(in_srgb,var(--color-brand)_6%,transparent),transparent_65%)]" />
        <svg
          viewBox={`0 0 360 ${steps.length * 88 + 20}`}
          className="relative mx-auto w-full max-w-sm"
          role="img"
          aria-label={`${title} pipeline flow`}
        >
          <defs>
            <linearGradient id={gradId} x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="var(--color-brand)" />
              <stop offset="100%" stopColor="var(--color-link)" />
            </linearGradient>
          </defs>

          {steps.map((step, i) => {
            const y = 24 + i * 88
            const nextY = 24 + (i + 1) * 88
            const isLast = i === steps.length - 1

            return (
              <g key={step.id}>
                {!isLast && (
                  <>
                    <line x1="180" y1={y + 36} x2="180" y2={nextY - 12} stroke="var(--color-diagram-line)" strokeWidth="2" />
                    {!reduced && (
                      <>
                        <line
                          x1="180"
                          y1={y + 36}
                          x2="180"
                          y2={nextY - 12}
                          stroke="var(--color-brand)"
                          strokeWidth="2"
                          className="animate-data-flow"
                          opacity="0.6"
                        />
                        <circle r="4" fill={`url(#${gradId})`}>
                          <animateMotion
                            dur="1.8s"
                            repeatCount="indefinite"
                            begin={`${i * 0.4}s`}
                            path={`M 180 ${y + 36} L 180 ${nextY - 12}`}
                          />
                        </circle>
                      </>
                    )}
                  </>
                )}
                <rect
                  x="60"
                  y={y}
                  width="240"
                  height="52"
                  rx="12"
                  fill="var(--color-diagram-node)"
                  stroke={step.highlight ? `url(#${gradId})` : 'var(--color-diagram-line)'}
                  strokeWidth={step.highlight ? 2 : 1.5}
                />
                <text x="180" y={y + (step.sublabel ? 22 : 30)} textAnchor="middle" fill="var(--color-diagram-text)" fontSize="13" fontWeight="600">
                  {step.label}
                </text>
                {step.sublabel && (
                  <text x="180" y={y + 38} textAnchor="middle" fill="var(--color-brand)" fontSize="10">
                    {step.sublabel}
                  </text>
                )}
                <circle cx="48" cy={y + 26} r="12" fill={step.highlight ? 'var(--color-brand)' : 'var(--color-surface)'} stroke="var(--color-brand)" strokeWidth="1.5" />
                <text x="48" y={y + 30} textAnchor="middle" fill={step.highlight ? 'var(--color-background)' : 'var(--color-brand)'} fontSize="11" fontWeight="700">
                  {i + 1}
                </text>
              </g>
            )
          })}
        </svg>
      </div>
    </div>
  )
}

export const pipelinePresets = {
  configurator: {
    title: 'Configurator workflow',
    description: 'From preset to production-ready gateway config in minutes.',
    steps: [
      { id: 'init', label: 'pucora configurator init', sublabel: 'Scaffold project' },
      { id: 'preset', label: 'Apply preset profile', sublabel: 'rest-proxy, kafka…' },
      { id: 'validate', label: 'pucora check', sublabel: 'Schema validation', highlight: true },
      { id: 'run', label: 'pucora run', sublabel: 'Serve traffic' },
    ],
  },
  gitops: {
    title: 'GitOps pipeline',
    description: 'Version-controlled config with CI validation before deploy.',
    steps: [
      { id: 'git', label: 'Git commit', sublabel: 'pucora.json + overlays' },
      { id: 'ci', label: 'CI: pucora check', sublabel: 'Lint & audit' },
      { id: 'deploy', label: 'Deploy to cluster', sublabel: 'Rolling update', highlight: true },
      { id: 'reload', label: 'Hot reload config', sublabel: 'Zero downtime' },
    ],
  },
  docker: {
    title: 'Docker deployment',
    description: 'Pull, mount config, and expose your gateway in one command.',
    steps: [
      { id: 'pull', label: 'docker pull', sublabel: 'pucora/pucora-ce' },
      { id: 'mount', label: 'Mount pucora.json', sublabel: 'Volume bind' },
      { id: 'run', label: 'docker run -p 8080:8080', highlight: true },
      { id: 'health', label: 'GET /__health', sublabel: 'Verify ready' },
    ],
  },
} as const
