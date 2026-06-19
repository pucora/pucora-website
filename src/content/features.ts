import type { LucideIcon } from 'lucide-react'
import {
  Layers,
  Shield,
  Radio,
  Gauge,
  FileJson,
  Activity,
  GitBranch,
  BookOpen,
} from 'lucide-react'

export interface Feature {
  slug: string
  title: string
  description: string
  icon: LucideIcon
  bullets?: string[]
  namespace?: string
}

export const homeFeatures: Feature[] = [
  {
    slug: 'api-aggregation',
    title: 'API Aggregation',
    description:
      'Create faster interactions with automatic API composition and aggregation of multiple data sources into a single response.',
    icon: Layers,
    bullets: [
      'Merge multiple backend calls into one endpoint',
      'Backend-for-Frontend (BFF) pattern out of the box',
      'Filter and shrink responses before they reach clients',
    ],
    namespace: 'endpoints',
  },
  {
    slug: 'traffic-management',
    title: 'Traffic Management',
    description:
      'Control your traffic with rate limiting, concurrent calls, circuit breakers, bot detection, IP filtering, and load balancing.',
    icon: Gauge,
    bullets: [
      'Multi-layer rate limiting for end-users and backends',
      'Circuit breaker and timeout policies',
      'Concurrent backend calls for faster responses',
    ],
    namespace: 'qos/ratelimit',
  },
  {
    slug: 'authentication',
    title: 'Authentication',
    description:
      'End-user validation and gateway-to-service validation: JWT, OAuth2, OpenID, API keys, Basic Auth, and mTLS.',
    icon: Shield,
    bullets: [
      'JWT validation with JWK sets',
      'OAuth2 client credentials',
      'CORS, HSTS, XSS protection, and zero-trust patterns',
    ],
    namespace: 'auth/validator',
  },
  {
    slug: 'connectivity',
    title: 'Services Connectivity',
    description:
      'Connect not only to REST APIs, but RabbitMQ, Kafka, NATS, GraphQL, gRPC, SOAP, Lambda, WebSockets, and more.',
    icon: Radio,
    bullets: [
      '15 non-REST connectivity features',
      'Endpoint-backed and async agent patterns',
      'Mix protocols in a single endpoint',
    ],
    namespace: 'backend/*',
  },
  {
    slug: 'data-transformation',
    title: 'Data & Protocol Manipulation',
    description:
      'Modify the data you return to end-users or the payload you send to services. Filter fields, enrich responses, convert SOAP/XML to JSON.',
    icon: FileJson,
    bullets: [
      'XML ↔ JSON transparent conversion',
      'Response filtering and field manipulation',
      'Martian and CEL-based transformations',
    ],
    namespace: 'modifier/martian',
  },
  {
    slug: 'observability',
    title: 'Monitor & Analytics',
    description:
      'Push logs, metrics, and traces to your favorite processors via OpenTelemetry, Prometheus, Jaeger, Datadog, and more.',
    icon: Activity,
    bullets: [
      'OpenTelemetry exporters',
      'Prometheus metrics endpoint',
      'Distributed tracing with Jaeger and Zipkin',
    ],
    namespace: 'telemetry/opentelemetry',
  },
  {
    slug: 'gitops',
    title: 'GitOps Operated',
    description:
      'Manage your API gateway exactly as you manage the rest of your services. Version-controlled declarative configuration.',
    icon: GitBranch,
    bullets: [
      'Declarative JSON configuration',
      'Flexible config with environment overlays',
      'CI/CD friendly validation with pucora check',
    ],
    namespace: 'flexible_config',
  },
  {
    slug: 'documentation',
    title: 'Documentation',
    description:
      'Generate rich API documentation with the OpenAPI exporter. Import OpenAPI specs to bootstrap your gateway configuration.',
    icon: BookOpen,
    bullets: [
      'OpenAPI export from gateway config',
      'JSON Schema validation',
      'Configurator presets for fast onboarding',
    ],
    namespace: 'openapi',
  },
]

export function getFeatureBySlug(slug: string): Feature | undefined {
  return homeFeatures.find((f) => f.slug === slug)
}
