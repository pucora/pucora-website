import { architectureDiagrams, getArchitectureDiagram } from '../../content/architecture-diagrams'
import { getDiagramIdForProduct } from '../../content/diagram-maps'
import { TrafficFlowDiagram } from './TrafficFlowDiagram'
import { PipelineFlowDiagram, pipelinePresets } from './PipelineFlowDiagram'

interface ProductArchitectureDiagramProps {
  slug: string
}

export function ProductArchitectureDiagram({ slug }: ProductArchitectureDiagramProps) {
  const diagramId = getDiagramIdForProduct(slug)
  const diagram = getArchitectureDiagram(diagramId) ?? architectureDiagrams[0]

  if (slug === 'configurator') {
    return (
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <PipelineFlowDiagram {...pipelinePresets.configurator} />
        <TrafficFlowDiagram diagram={diagram} compact showLegend={false} />
      </div>
    )
  }

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Architecture</h3>
      <TrafficFlowDiagram diagram={diagram} />
    </div>
  )
}
