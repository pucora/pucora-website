export interface Solution {
  slug: string
  title: string
  subtitle: string
  problem: string
  solution: string
  outcomes: string[]
  preset?: string
  relatedFeatures: string[]
}

export const solutions: Solution[] = [
  {
    slug: 'microservices-bff',
    title: 'Microservices & BFF',
    subtitle: 'Aggregate APIs for faster client experiences',
    problem:
      'Mobile and web clients need data from many microservices. Multiple round trips increase latency and complexity on the client side.',
    solution:
      'Pucora aggregates multiple backend calls into a single endpoint. Create Backend-for-Frontend views that return only the fields your UI needs.',
    outcomes: [
      'One API call instead of four or more',
      'Smaller payloads — filter fields at the gateway',
      'Decouple clients from backend API contracts',
      'Concurrent backend calls for faster responses',
    ],
    preset: 'rest-proxy',
    relatedFeatures: ['api-aggregation', 'traffic-management', 'gitops'],
  },
  {
    slug: 'event-driven',
    title: 'Event-Driven Architecture',
    subtitle: 'Kafka, RabbitMQ, NATS, and async agents',
    problem:
      'Event-driven systems need a unified entry point. HTTP clients must publish to queues, and background workers must react to incoming messages.',
    solution:
      'Pucora connects HTTP endpoints to message brokers and runs async agents that consume events and trigger internal webhooks.',
    outcomes: [
      'HTTP → Kafka/RabbitMQ/NATS publish on request',
      'Async agents for event-driven background processing',
      'Mix REST and queue backends in one endpoint',
      'Configurator presets for Kafka and async patterns',
    ],
    preset: 'kafka-pubsub',
    relatedFeatures: ['connectivity', 'gitops'],
  },
  {
    slug: 'legacy-integration',
    title: 'Legacy Integration',
    subtitle: 'SOAP/XML to modern REST/JSON',
    problem:
      'Legacy enterprise systems expose SOAP/XML APIs. Modern clients expect REST and JSON.',
    solution:
      'Pucora transparently converts SOAP/XML backends to REST/JSON for your clients, without changing the legacy system.',
    outcomes: [
      'SOAP backend integration with REST façade',
      'Automatic XML ↔ JSON conversion',
      'No changes to legacy service contracts',
      'Configurator soap preset for quick setup',
    ],
    preset: 'soap',
    relatedFeatures: ['data-transformation', 'connectivity'],
  },
  {
    slug: 'real-time',
    title: 'Real-Time Communications',
    subtitle: 'WebSockets, gRPC, and HTTP streaming',
    problem:
      'Real-time applications need bidirectional communication, low-latency RPC, or long-lived HTTP streams beyond traditional REST.',
    solution:
      'Pucora proxies WebSockets (RFC-6455), consumes and serves gRPC, and supports HTTP streaming and Server-Sent Events.',
    outcomes: [
      'WebSocket multiplex and direct proxy modes',
      'gRPC client and server on the gateway',
      'JWT validation on WebSocket upgrade',
      'SSE and streaming with no-op encoding',
    ],
    preset: 'websocket',
    relatedFeatures: ['connectivity', 'authentication'],
  },
]

export function getSolutionBySlug(slug: string): Solution | undefined {
  return solutions.find((s) => s.slug === slug)
}
