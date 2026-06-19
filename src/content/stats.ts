export const stats = [
  { value: 70, suffix: 'K+', label: 'requests/second on commodity hardware', prefix: undefined as string | undefined, display: undefined as string | undefined },
  { value: 50, suffix: 'MB', label: 'memory under heavy load', prefix: '<' as string | undefined, display: undefined as string | undefined },
  { value: 0, suffix: '', label: 'single point of failure — stateless design', prefix: undefined as string | undefined, display: '0' as string | undefined },
] as const

export const pillars = [
  {
    title: 'High performance',
    description:
      'Power your APIs with unrivaled speed. Pucora handles tens of thousands of requests per second. Whether you scale globally or run intense workloads, the stateless architecture ensures consistent, top-tier performance.',
  },
  {
    title: 'Simplicity',
    description:
      'A single binary and declarative JSON configuration are all you need to manage your APIs in a GitOps way. No cumbersome dependencies that increase your infrastructure costs.',
  },
  {
    title: 'Open & extensible',
    description:
      'No vendor lock-in. Reuse the best open-source and proprietary tools. Extend with Go plugins, Lua, Martian, or CEL. KrakenD-compatible configuration with more connectivity in CE.',
  },
] as const
