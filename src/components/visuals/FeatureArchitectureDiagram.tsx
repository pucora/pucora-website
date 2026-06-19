import { architectureDiagrams, getArchitectureDiagram } from '../../content/architecture-diagrams'
import { getDiagramIdForFeature } from '../../content/diagram-maps'
import { TrafficFlowDiagram } from './TrafficFlowDiagram'

interface FeatureArchitectureDiagramProps {
  slug: string
}

export function FeatureArchitectureDiagram({ slug }: FeatureArchitectureDiagramProps) {
  const diagramId = getDiagramIdForFeature(slug)
  const diagram = getArchitectureDiagram(diagramId) ?? architectureDiagrams[0]

  return (
    <div className="mb-10">
      <h3 className="mb-4 text-lg font-semibold text-foreground">How it works</h3>
      <TrafficFlowDiagram diagram={diagram} />
    </div>
  )
}
