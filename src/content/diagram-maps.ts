export const featureDiagramMap: Record<string, string> = {
  'api-aggregation': 'bff',
  'traffic-management': 'rate-limit',
  authentication: 'pucora-idp',
  connectivity: 'gateway',
  'data-transformation': 'sequential',
  observability: 'observability',
  gitops: 'kubernetes',
  documentation: 'gateway',
}

export const productDiagramMap: Record<string, string> = {
  'community-edition': 'gateway',
  configurator: 'sequential',
  lura: 'bff',
}

export const solutionDiagramMap: Record<string, string> = {
  'microservices-bff': 'bff',
  'event-driven': 'events',
  'legacy-integration': 'grpc',
  'real-time': 'websocket',
}

export function getDiagramIdForFeature(slug: string) {
  return featureDiagramMap[slug] ?? 'gateway'
}

export function getDiagramIdForProduct(slug: string) {
  return productDiagramMap[slug] ?? 'gateway'
}

export function getDiagramIdForSolution(slug: string) {
  return solutionDiagramMap[slug] ?? 'gateway'
}
