export interface Product {
  slug: string
  name: string
  tagline: string
  description: string
  features: string[]
  cta: { label: string; href: string }
}

export const products: Product[] = [
  {
    slug: 'community-edition',
    name: 'Community Edition',
    tagline: 'Open-source API Gateway',
    description:
      'Pucora Community Edition is an extensible, ultra-high performance API Gateway that helps you effortlessly adopt microservices and secure communications. Free to use, stateless, and production-ready.',
    features: [
      '+70K requests/second on a single instance',
      'KrakenD-compatible declarative configuration',
      'WebSockets, gRPC, SOAP, Pub/Sub, GraphQL, Lambda in CE',
      'JWT, OAuth2, rate limiting, circuit breakers',
      'OpenTelemetry, Prometheus, Jaeger integrations',
      'Go plugins, Lua, Martian, CEL extensibility',
      'Docker image: niteesh20/pucora',
    ],
    cta: { label: 'Get Pucora CE', href: '/get-started' },
  },
  {
    slug: 'configurator',
    name: 'Configurator',
    tagline: 'YAML profiles to gateway config',
    description:
      'A configuration tool that turns a simple YAML profile into a complete Pucora gateway setup — routes, CORS, JWT auth, pub/sub, gRPC, WebSockets, and more. No more hand-writing extra_config namespaces.',
    features: [
      'Interactive wizard: pucora-config init',
      'Ready-made presets for Kafka, gRPC, WebSockets, SOAP, GraphQL',
      'Generates pucora.json + optional docker-compose',
      'Validates profiles before generation',
      'apiVersion: configurator.pucora.io/v1',
    ],
    cta: { label: 'Learn Configurator', href: '/products/configurator' },
  },
  {
    slug: 'lura',
    name: 'Lura Engine',
    tagline: 'The framework behind Pucora',
    description:
      'The Lura Project is an open framework to assemble ultra-performance API Gateways with middlewares. Formerly the Pucora framework, now under the Linux Foundation. Build custom gateways or extend Pucora.',
    features: [
      'Go library for building API gateways and proxies',
      'Aggregator of many sources into single endpoints',
      'Supports HTTP(S), gRPC, and custom protocols',
      'Unix philosophy: small, independent, reusable components',
      'Core service of the Pucora API Gateway',
    ],
    cta: { label: 'Explore Lura', href: '/products/lura' },
  },
]

export const configuratorPresets = [
  'rest-proxy',
  'rest-with-auth',
  'kafka-pubsub',
  'nats-pubsub',
  'grpc-client',
  'websocket',
  'graphql',
  'soap',
  'streaming-sse',
  'async-kafka',
] as const

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug)
}
