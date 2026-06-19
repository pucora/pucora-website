export interface ConnectivityFeature {
  id: number
  name: string
  namespace: string
  description: string
  inCE: boolean
}

export const connectivityFeatures: ConnectivityFeature[] = [
  { id: 1, name: 'SOAP Integration', namespace: 'backend/soap', description: 'Legacy XML → modern REST/JSON', inCE: true },
  { id: 2, name: 'WebSockets', namespace: 'websocket', description: 'Bidirectional real-time (RFC-6455)', inCE: true },
  { id: 3, name: 'gRPC Overview & Catalog', namespace: 'grpc', description: 'Protocol buffers catalog setup', inCE: true },
  { id: 4, name: 'gRPC Client', namespace: 'backend/grpc', description: 'Consume gRPC upstreams; REST conversion', inCE: true },
  { id: 5, name: 'gRPC Server', namespace: 'grpc.server', description: 'Expose gRPC on gateway port', inCE: true },
  { id: 6, name: 'HTTP Streaming & SSE', namespace: 'output_encoding: no-op', description: 'Long-lived HTTP streams', inCE: true },
  { id: 7, name: 'RabbitMQ Consumer', namespace: 'backend/amqp/consumer', description: 'Pull messages on HTTP request', inCE: true },
  { id: 8, name: 'RabbitMQ Producer', namespace: 'backend/amqp/producer', description: 'Push messages on HTTP request', inCE: true },
  { id: 9, name: 'Pub/Sub (Kafka, NATS, cloud)', namespace: 'backend/pubsub/*', description: 'Multi-broker publish/subscribe', inCE: true },
  { id: 10, name: 'Kafka Advanced PubSub', namespace: 'backend/pubsub/*/kafka', description: 'Kafka with mTLS/SASL', inCE: true },
  { id: 11, name: 'GraphQL', namespace: 'backend/graphql', description: 'REST↔GraphQL adapter or proxy', inCE: true },
  { id: 12, name: 'AWS Lambda', namespace: 'backend/lambda', description: 'Invoke serverless functions', inCE: true },
  { id: 13, name: 'Async Agents', namespace: 'async_agent', description: 'Event-driven background workers', inCE: true },
  { id: 14, name: 'AMQP Async Driver', namespace: 'async/amqp', description: 'RabbitMQ consumer for agents', inCE: true },
  { id: 15, name: 'Kafka Async Driver', namespace: 'async/kafka', description: 'Kafka consumer for agents', inCE: true },
]

export const beyondRestHighlights = [
  {
    title: 'Endpoint-backed',
    description: 'Client HTTP request triggers backend calls — REST, gRPC, SOAP, queues, and Lambda in one endpoint.',
  },
  {
    title: 'Async agents',
    description: 'Message arrives on Kafka or RabbitMQ and triggers internal webhooks — no HTTP client required.',
  },
  {
    title: 'Mix protocols',
    description: 'Combine REST + gRPC + Lambda + queue backends in a single gateway configuration.',
  },
  {
    title: 'All in CE',
    description: 'Enterprise-grade connectivity included in Pucora Community Edition — WebSockets, gRPC, SSE, and more.',
  },
] as const
