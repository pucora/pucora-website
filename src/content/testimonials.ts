export interface Testimonial {
  quote: string
  author: string
  role: string
  company: string
  placeholder?: boolean
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Pucora allowed us to focus on our backend and deploy a secure, performant gateway in days. The declarative config and Configurator presets cut our onboarding time dramatically.',
    author: 'Alex Rivera',
    role: 'CTO',
    company: 'Placeholder Corp',
    placeholder: true,
  },
  {
    quote:
      'We needed WebSockets and gRPC in our gateway without an enterprise license. Pucora CE delivered enterprise-grade connectivity in the open-source edition.',
    author: 'Priya Sharma',
    role: 'Platform Engineering Lead',
    company: 'Placeholder Inc',
    placeholder: true,
  },
  {
    quote:
      'The stateless design means we scale linearly in Kubernetes. +70K req/s per pod with under 50MB memory — exactly what our SRE team needed.',
    author: 'Marcus Chen',
    role: 'Engineering Director',
    company: 'Placeholder Systems',
    placeholder: true,
  },
  {
    quote:
      'KrakenD-compatible config with more features in CE. Migration was straightforward and the documentation is comprehensive.',
    author: 'Elena Kowalski',
    role: 'Senior Architect',
    company: 'Placeholder Digital',
    placeholder: true,
  },
]

export const trustLogos = [
  'Acme Cloud',
  'DataFlow',
  'NexusPay',
  'StreamTech',
  'Orbital',
  'Vertex',
] as const
