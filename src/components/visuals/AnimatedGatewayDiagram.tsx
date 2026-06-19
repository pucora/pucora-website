import { architectureDiagrams } from '../../content/architecture-diagrams'
import { TrafficFlowDiagram } from './TrafficFlowDiagram'

const gatewayDiagram = architectureDiagrams[0]

export function AnimatedGatewayDiagram() {
  return <TrafficFlowDiagram diagram={gatewayDiagram} showLegend={false} />
}
