import { brand, externalLinks } from './brand'

export interface NavItem {
  label: string
  href: string
  description?: string
  external?: boolean
}

export interface NavGroup {
  label: string
  items: NavItem[]
}

export const productNav: NavGroup = {
  label: 'Products',
  items: [
    { label: 'Community Edition', href: '/products/community-edition', description: 'Open-source API Gateway' },
    { label: 'Configurator', href: '/products/configurator', description: 'YAML profiles to gateway config' },
    { label: 'Lura Engine', href: '/products/lura', description: 'API engine (Lura Project, originally developed by KrakenD)' },
    { label: 'All Products', href: '/products', description: 'Compare offerings' },
  ],
}

export const solutionNav: NavGroup = {
  label: 'Solutions',
  items: [
    { label: 'Microservices & BFF', href: '/solutions/microservices-bff', description: 'API aggregation' },
    { label: 'Event-Driven', href: '/solutions/event-driven', description: 'Kafka, RabbitMQ, async agents' },
    { label: 'Legacy Integration', href: '/solutions/legacy-integration', description: 'SOAP to REST/JSON' },
    { label: 'Real-Time', href: '/solutions/real-time', description: 'WebSockets, gRPC, SSE' },
    { label: 'All Solutions', href: '/solutions', description: 'Use case overview' },
  ],
}

export const resourceNav: NavGroup = {
  label: 'Resources',
  items: [
    { label: 'GitHub Repository', href: externalLinks.github, description: externalLinks.githubLabel, external: true },
    { label: 'Documentation', href: '/docs/overview', description: 'Guides and reference' },
    { label: 'Community', href: '/resources/community', description: 'GitHub and contributing' },
    { label: 'Features', href: '/features', description: 'Capability overview' },
    { label: 'Get Started', href: '/get-started', description: 'Install and run' },
    { label: 'Downloads', href: '/downloads', description: 'Docker and releases' },
    { label: 'External Docs', href: externalLinks.docs, description: 'docs.pucora.in', external: true },
  ],
}

export const footerColumns = [
  {
    title: 'Products',
    links: productNav.items,
  },
  {
    title: 'Solutions',
    links: solutionNav.items.filter((i) => i.href !== '/solutions'),
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '/docs/overview' },
      { label: 'Get Started', href: '/get-started' },
      { label: 'Downloads', href: '/downloads' },
      { label: 'GitHub', href: externalLinks.github, description: externalLinks.githubLabel, external: true },
      { label: 'Lura Project', href: externalLinks.lura, external: true },
    ],
  },
  {
    title: brand.name,
    links: [
      { label: 'About', href: '/products' },
      { label: 'Features', href: '/features' },
      { label: 'Community', href: '/resources/community' },
    ],
  },
] as const
