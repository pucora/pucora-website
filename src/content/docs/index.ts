import manifest from './manifest.json'
import type { DocsManifest } from './types'

export const docsManifest = manifest as DocsManifest

export function getDocPage(slug: string) {
  return docsManifest.pages.find((p) => p.slug === slug)
}

export function getDefaultDocSlug() {
  return docsManifest.pages.find((p) => p.slug === 'overview')?.slug ?? docsManifest.pages[0]?.slug ?? 'home'
}
