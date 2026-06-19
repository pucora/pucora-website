export interface ArchNode {
  id: string
  x: number
  y: number
  w: number
  h: number
  label: string
  sublabel?: string
  primary?: boolean
  icon?: 'client' | 'gateway' | 'service' | 'broker'
}

export interface ArchEdge {
  id: string
  from: string
  to: string
  label?: string
  response?: boolean
  packets?: number
  duration?: number
}

export interface ArchitectureDiagram {
  id: string
  title: string
  description: string
  viewBox: string
  nodes: ArchNode[]
  edges: ArchEdge[]
}

export const architectureDiagrams: ArchitectureDiagram[] = [
  {
    id: 'gateway',
    title: 'API Gateway',
    description: 'Aggregate REST, gRPC, and message brokers through a single declarative entry point.',
    viewBox: '0 0 820 320',
    nodes: [
      { id: 'client', x: 36, y: 110, w: 132, h: 84, label: 'Clients', sublabel: 'Web · Mobile · IoT', icon: 'client' },
      { id: 'gateway', x: 292, y: 86, w: 196, h: 132, label: 'Pucora', sublabel: 'Gateway Layer', primary: true, icon: 'gateway' },
      { id: 'rest', x: 588, y: 48, w: 148, h: 52, label: 'REST APIs', icon: 'service' },
      { id: 'grpc', x: 588, y: 118, w: 148, h: 52, label: 'gRPC / SOAP', icon: 'service' },
      { id: 'mq', x: 588, y: 188, w: 148, h: 52, label: 'Kafka / AMQP', icon: 'broker' },
    ],
    edges: [
      { id: 'c-g', from: 'client', to: 'gateway', packets: 4, duration: 2.2 },
      { id: 'g-rest', from: 'gateway', to: 'rest', packets: 3, duration: 1.8 },
      { id: 'g-grpc', from: 'gateway', to: 'grpc', packets: 2, duration: 2.4 },
      { id: 'g-mq', from: 'gateway', to: 'mq', packets: 2, duration: 2.8 },
      { id: 'g-c', from: 'gateway', to: 'client', response: true, packets: 3, duration: 2.5 },
    ],
  },
  {
    id: 'pucora-idp',
    title: 'Pucora + Identity Provider',
    description: 'OAuth2/OIDC login at the IdP, JWT validation at pucora gateway — JWK keys cached locally.',
    viewBox: '0 0 820 360',
    nodes: [
      { id: 'client', x: 36, y: 168, w: 124, h: 88, label: 'Client App', sublabel: 'SPA · Mobile · M2M', icon: 'client' },
      { id: 'idp', x: 300, y: 28, w: 172, h: 64, label: 'Identity Provider', sublabel: 'Auth0 · Keycloak · Azure AD', icon: 'service' },
      { id: 'gateway', x: 248, y: 148, w: 208, h: 148, label: 'Pucora Gateway', sublabel: 'Pucora · JWT', primary: true, icon: 'gateway' },
      { id: 'backend', x: 560, y: 176, w: 156, h: 84, label: 'Backend API', sublabel: 'Microservice', icon: 'service' },
    ],
    edges: [
      { id: 'c-idp', from: 'client', to: 'idp', label: '1. OAuth2 / OIDC', packets: 2, duration: 2.4 },
      { id: 'idp-c', from: 'idp', to: 'client', response: true, label: 'JWT token', packets: 2, duration: 2.2 },
      { id: 'c-gw', from: 'client', to: 'gateway', label: '2. Bearer JWT', packets: 4, duration: 2 },
      { id: 'gw-idp', from: 'gateway', to: 'idp', label: 'JWKS (cached)', packets: 1, duration: 3.2 },
      { id: 'gw-be', from: 'gateway', to: 'backend', label: '3. Authorized', packets: 3, duration: 1.8 },
      { id: 'gw-c', from: 'gateway', to: 'client', response: true, label: 'API response', packets: 3, duration: 2.3 },
    ],
  },
  {
    id: 'bff',
    title: 'Backend for Frontend',
    description: 'One mobile call fans out to many microservices — Pucora merges responses at the edge.',
    viewBox: '0 0 820 340',
    nodes: [
      { id: 'mobile', x: 36, y: 128, w: 120, h: 88, label: 'Mobile App', sublabel: '1 HTTP call', icon: 'client' },
      { id: 'gateway', x: 268, y: 96, w: 188, h: 148, label: 'Pucora BFF', sublabel: 'Aggregate · Filter · Auth', primary: true, icon: 'gateway' },
      { id: 'products', x: 560, y: 36, w: 148, h: 56, label: 'Products API', icon: 'service' },
      { id: 'users', x: 560, y: 118, w: 148, h: 56, label: 'Users API', icon: 'service' },
      { id: 'cart', x: 560, y: 200, w: 148, h: 56, label: 'Cart API', icon: 'service' },
    ],
    edges: [
      { id: 'm-g', from: 'mobile', to: 'gateway', label: 'GET /frontpage', packets: 3, duration: 2 },
      { id: 'g-p', from: 'gateway', to: 'products', packets: 2, duration: 1.6 },
      { id: 'g-u', from: 'gateway', to: 'users', packets: 2, duration: 1.9 },
      { id: 'g-c', from: 'gateway', to: 'cart', packets: 2, duration: 2.1 },
      { id: 'g-m', from: 'gateway', to: 'mobile', response: true, label: 'JSON bundle', packets: 3, duration: 2.3 },
    ],
  },
  {
    id: 'events',
    title: 'Event-Driven',
    description: 'HTTP ingress triggers async agents — publish to Kafka, consume from RabbitMQ, fan-out at scale.',
    viewBox: '0 0 820 320',
    nodes: [
      { id: 'producer', x: 36, y: 118, w: 128, h: 84, label: 'HTTP Client', sublabel: 'POST /events', icon: 'client' },
      { id: 'gateway', x: 268, y: 92, w: 188, h: 136, label: 'Pucora', sublabel: 'Async Agent', primary: true, icon: 'gateway' },
      { id: 'kafka', x: 560, y: 48, w: 156, h: 64, label: 'Kafka', sublabel: 'Pub/Sub', icon: 'broker' },
      { id: 'amqp', x: 560, y: 148, w: 156, h: 64, label: 'RabbitMQ', sublabel: 'AMQP', icon: 'broker' },
      { id: 'workers', x: 560, y: 248, w: 156, h: 52, label: 'Workers', sublabel: 'Consumers', icon: 'service' },
    ],
    edges: [
      { id: 'p-g', from: 'producer', to: 'gateway', packets: 3, duration: 2 },
      { id: 'g-k', from: 'gateway', to: 'kafka', packets: 3, duration: 1.7 },
      { id: 'g-a', from: 'gateway', to: 'amqp', packets: 2, duration: 2.2 },
      { id: 'k-w', from: 'kafka', to: 'workers', packets: 2, duration: 2.5 },
      { id: 'a-w', from: 'amqp', to: 'workers', packets: 2, duration: 2.8 },
    ],
  },
  {
    id: 'security',
    title: 'Zero-Trust Edge',
    description: 'JWT validation, rate limits, and mTLS terminate at the gateway before traffic reaches backends.',
    viewBox: '0 0 820 300',
    nodes: [
      { id: 'client', x: 36, y: 108, w: 120, h: 84, label: 'Client', sublabel: 'Bearer JWT', icon: 'client' },
      { id: 'gateway', x: 248, y: 72, w: 220, h: 156, label: 'Pucora', sublabel: 'Auth · Rate limit · TLS', primary: true, icon: 'gateway' },
      { id: 'idp', x: 560, y: 36, w: 148, h: 56, label: 'Keycloak / Auth0', icon: 'service' },
      { id: 'api', x: 560, y: 118, w: 148, h: 56, label: 'Protected API', icon: 'service' },
      { id: 'audit', x: 560, y: 200, w: 148, h: 56, label: 'Audit / Metrics', icon: 'service' },
    ],
    edges: [
      { id: 'c-g', from: 'client', to: 'gateway', label: 'HTTPS', packets: 4, duration: 2 },
      { id: 'g-idp', from: 'gateway', to: 'idp', packets: 2, duration: 2.4 },
      { id: 'g-api', from: 'gateway', to: 'api', packets: 3, duration: 1.8 },
      { id: 'g-audit', from: 'gateway', to: 'audit', packets: 2, duration: 2.6, response: true },
      { id: 'g-c', from: 'gateway', to: 'client', response: true, packets: 2, duration: 2.2 },
    ],
  },
  {
    id: 'websocket',
    title: 'WebSockets',
    description: 'Persistent duplex channels — multiplex many backend streams through one gateway connection.',
    viewBox: '0 0 820 300',
    nodes: [
      { id: 'browser', x: 36, y: 108, w: 120, h: 84, label: 'Browser', sublabel: 'WS connect', icon: 'client' },
      { id: 'gateway', x: 268, y: 82, w: 196, h: 136, label: 'Pucora', sublabel: 'WS multiplex', primary: true, icon: 'gateway' },
      { id: 'chat', x: 560, y: 36, w: 148, h: 52, label: 'Chat svc', icon: 'service' },
      { id: 'live', x: 560, y: 118, w: 148, h: 52, label: 'Live feed', icon: 'service' },
      { id: 'notify', x: 560, y: 200, w: 148, h: 52, label: 'Notifications', icon: 'service' },
    ],
    edges: [
      { id: 'b-g', from: 'browser', to: 'gateway', label: 'Upgrade', packets: 3, duration: 2.2 },
      { id: 'g-chat', from: 'gateway', to: 'chat', packets: 2, duration: 1.7 },
      { id: 'g-live', from: 'gateway', to: 'live', packets: 2, duration: 2 },
      { id: 'g-notify', from: 'gateway', to: 'notify', packets: 2, duration: 2.3 },
      { id: 'g-b', from: 'gateway', to: 'browser', response: true, label: 'Push events', packets: 4, duration: 1.8 },
    ],
  },
  {
    id: 'grpc',
    title: 'gRPC Gateway',
    description: 'Translate HTTP/JSON at the edge into gRPC calls — catalog, client, and server modes.',
    viewBox: '0 0 820 300',
    nodes: [
      { id: 'client', x: 36, y: 108, w: 120, h: 84, label: 'HTTP Client', sublabel: 'REST / JSON', icon: 'client' },
      { id: 'gateway', x: 268, y: 82, w: 196, h: 136, label: 'Pucora', sublabel: 'gRPC proxy', primary: true, icon: 'gateway' },
      { id: 'catalog', x: 560, y: 48, w: 148, h: 52, label: 'gRPC Catalog', icon: 'service' },
      { id: 'orders', x: 560, y: 148, w: 148, h: 52, label: 'Orders svc', sublabel: 'protobuf', icon: 'service' },
    ],
    edges: [
      { id: 'c-g', from: 'client', to: 'gateway', packets: 3, duration: 2 },
      { id: 'g-cat', from: 'gateway', to: 'catalog', packets: 2, duration: 2.2 },
      { id: 'g-ord', from: 'gateway', to: 'orders', packets: 3, duration: 1.8 },
      { id: 'g-c', from: 'gateway', to: 'client', response: true, packets: 2, duration: 2.4 },
    ],
  },
  {
    id: 'observability',
    title: 'Observability',
    description: 'Every request emits metrics, traces, and logs to your observability stack — no code changes in backends.',
    viewBox: '0 0 820 320',
    nodes: [
      { id: 'client', x: 36, y: 118, w: 108, h: 84, label: 'Traffic', icon: 'client' },
      { id: 'gateway', x: 228, y: 92, w: 188, h: 136, label: 'Pucora', sublabel: 'OTEL · Metrics', primary: true, icon: 'gateway' },
      { id: 'prom', x: 520, y: 36, w: 140, h: 52, label: 'Prometheus', icon: 'service' },
      { id: 'jaeger', x: 520, y: 118, w: 140, h: 52, label: 'Jaeger', icon: 'service' },
      { id: 'logs', x: 520, y: 200, w: 140, h: 52, label: 'ELK / Loki', icon: 'broker' },
      { id: 'api', x: 680, y: 118, w: 120, h: 84, label: 'Backend', icon: 'service' },
    ],
    edges: [
      { id: 'c-g', from: 'client', to: 'gateway', packets: 3, duration: 2 },
      { id: 'g-api', from: 'gateway', to: 'api', packets: 3, duration: 1.8 },
      { id: 'g-prom', from: 'gateway', to: 'prom', packets: 2, duration: 2.4 },
      { id: 'g-j', from: 'gateway', to: 'jaeger', packets: 2, duration: 2.6 },
      { id: 'g-log', from: 'gateway', to: 'logs', packets: 2, duration: 2.8 },
      { id: 'g-c', from: 'gateway', to: 'client', response: true, packets: 2, duration: 2.2 },
    ],
  },
  {
    id: 'rate-limit',
    title: 'Rate Limiting',
    description: 'Token bucket and spike arrest policies protect backends — reject overload before it propagates.',
    viewBox: '0 0 820 280',
    nodes: [
      { id: 'clients', x: 36, y: 98, w: 128, h: 84, label: 'Clients', sublabel: 'Burst traffic', icon: 'client' },
      { id: 'gateway', x: 248, y: 72, w: 204, h: 136, label: 'Pucora', sublabel: 'Token bucket', primary: true, icon: 'gateway' },
      { id: 'allowed', x: 560, y: 48, w: 148, h: 56, label: 'Backend', sublabel: '200 OK', icon: 'service' },
      { id: 'rejected', x: 560, y: 168, w: 148, h: 56, label: 'Rejected', sublabel: '429 Too Many', icon: 'service' },
    ],
    edges: [
      { id: 'c-g', from: 'clients', to: 'gateway', packets: 5, duration: 1.6 },
      { id: 'g-ok', from: 'gateway', to: 'allowed', packets: 3, duration: 2 },
      { id: 'g-no', from: 'gateway', to: 'rejected', packets: 2, duration: 2.2, response: true },
      { id: 'g-c', from: 'gateway', to: 'clients', response: true, packets: 2, duration: 2.4 },
    ],
  },
  {
    id: 'sequential',
    title: 'Sequential Proxy',
    description: 'Chain backend calls in order — output of step one feeds step two for multi-stage workflows.',
    viewBox: '0 0 820 280',
    nodes: [
      { id: 'client', x: 36, y: 98, w: 108, h: 84, label: 'Client', icon: 'client' },
      { id: 'gateway', x: 188, y: 72, w: 160, h: 136, label: 'Pucora', sublabel: 'Orchestrator', primary: true, icon: 'gateway' },
      { id: 'step1', x: 400, y: 48, w: 120, h: 56, label: 'Validate', icon: 'service' },
      { id: 'step2', x: 560, y: 112, w: 120, h: 56, label: 'Enrich', icon: 'service' },
      { id: 'step3', x: 400, y: 176, w: 120, h: 56, label: 'Persist', icon: 'service' },
    ],
    edges: [
      { id: 'c-g', from: 'client', to: 'gateway', packets: 3, duration: 2 },
      { id: 'g-1', from: 'gateway', to: 'step1', packets: 2, duration: 1.8 },
      { id: '1-2', from: 'step1', to: 'step2', packets: 2, duration: 2 },
      { id: '2-3', from: 'step2', to: 'step3', packets: 2, duration: 2.2 },
      { id: 'g-c', from: 'gateway', to: 'client', response: true, packets: 2, duration: 2.5 },
    ],
  },
  {
    id: 'kubernetes',
    title: 'Kubernetes',
    description: 'Horizontally scaled Pucora pods behind ingress — stateless config reload without downtime.',
    viewBox: '0 0 820 300',
    nodes: [
      { id: 'ingress', x: 36, y: 108, w: 120, h: 84, label: 'Ingress', sublabel: 'TLS terminate', icon: 'client' },
      { id: 'pod1', x: 248, y: 48, w: 120, h: 64, label: 'Pucora pod', icon: 'gateway' },
      { id: 'pod2', x: 248, y: 128, w: 120, h: 64, label: 'Pucora pod', primary: true, icon: 'gateway' },
      { id: 'pod3', x: 248, y: 208, w: 120, h: 64, label: 'Pucora pod', icon: 'gateway' },
      { id: 'svc', x: 520, y: 118, w: 148, h: 64, label: 'ClusterIP', sublabel: 'Backends', icon: 'service' },
      { id: 'config', x: 520, y: 36, w: 148, h: 52, label: 'ConfigMap', icon: 'broker' },
    ],
    edges: [
      { id: 'i-p1', from: 'ingress', to: 'pod1', packets: 2, duration: 2.2 },
      { id: 'i-p2', from: 'ingress', to: 'pod2', packets: 3, duration: 2 },
      { id: 'i-p3', from: 'ingress', to: 'pod3', packets: 2, duration: 2.4 },
      { id: 'p2-svc', from: 'pod2', to: 'svc', packets: 3, duration: 1.8 },
      { id: 'cfg-p2', from: 'config', to: 'pod2', packets: 1, duration: 3, response: true },
    ],
  },
]

export function getArchitectureDiagram(id: string) {
  return architectureDiagrams.find((d) => d.id === id)
}
