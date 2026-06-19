import { architectureDiagrams, getArchitectureDiagram } from '../../content/architecture-diagrams'
import { getDiagramIdForSolution } from '../../content/diagram-maps'
import { TrafficFlowDiagram } from './TrafficFlowDiagram'

interface SolutionArchitectureDiagramProps {
  slug: string
}

export function SolutionArchitectureDiagram({ slug }: SolutionArchitectureDiagramProps) {
  const diagramId = getDiagramIdForSolution(slug)
  const diagram = getArchitectureDiagram(diagramId) ?? architectureDiagrams[0]

  return (
    <div className="mt-10">
      <h3 className="mb-4 text-lg font-semibold text-foreground">Architecture flow</h3>
      <TrafficFlowDiagram diagram={diagram} />
    </div>
  )
}
