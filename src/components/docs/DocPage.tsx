import { useEffect, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { DocMarkdown } from './DocMarkdown'
import { getDocPage, getDefaultDocSlug } from '../../content/docs'

const docModules = import.meta.glob('../../content/docs/processed/**/*.md', {
  query: '?raw',
  import: 'default',
})

async function loadDocContent(slug: string) {
  const page = getDocPage(slug)
  if (!page) return null
  const key = Object.keys(docModules).find((k) => k.endsWith(`/${page.file}`))
  if (!key) return null
  const loader = docModules[key]
  return (await loader()) as string
}

export function DocsIndex() {
  return <Navigate to={`/docs/${getDefaultDocSlug()}`} replace />
}

export function DocPage() {
  const { '*': slugPath } = useParams()
  const slug = slugPath?.replace(/\/$/, '') || 'home'
  const page = getDocPage(slug)
  const [content, setContent] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    loadDocContent(slug).then((text) => {
      if (!cancelled) {
        setContent(text)
        setLoading(false)
      }
    })
    return () => {
      cancelled = true
    }
  }, [slug])

  if (!page) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-subtle">This documentation page does not exist.</p>
      </div>
    )
  }

  if (loading) {
    return <p className="text-subtle">Loading…</p>
  }

  if (!content) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center">
        <h2 className="text-xl font-semibold text-foreground">Content unavailable</h2>
        <p className="mt-2 text-subtle">Could not load this page. Run `npm run docs:build`.</p>
      </div>
    )
  }

  return (
    <>
      {page.description && <p className="mb-8 text-lg text-subtle">{page.description}</p>}
      <DocMarkdown content={content} />
    </>
  )
}
