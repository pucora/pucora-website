export interface DocPageMeta {
  slug: string
  file: string
  title: string
  description: string
  weight: number
  section: string
}

export interface DocNavSection {
  id: string
  label: string
  pages: DocPageMeta[]
}

export interface DocsManifest {
  pages: DocPageMeta[]
  nav: DocNavSection[]
  generatedAt: string
}
