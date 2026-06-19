import { useState } from 'react'
import { Outlet, useParams } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { DocSidebar } from './DocSidebar'
import { PageMeta } from '../ui/PageMeta'
import { getDocPage } from '../../content/docs'
import { cn } from '../../lib/cn'

export function DocsLayout() {
  const { '*': slugPath } = useParams()
  const slug = slugPath?.replace(/\/$/, '') || 'home'
  const page = getDocPage(slug)
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <>
      <PageMeta title={page?.title ?? 'Documentation'} description={page?.description ?? 'Pucora documentation'} />
      <div className="border-b border-border bg-surface">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6">
          <div>
            <p className="text-sm font-medium text-brand">Documentation</p>
            <h1 className="text-2xl font-semibold tracking-tight text-foreground">{page?.title ?? 'Docs'}</h1>
          </div>
          <button
            type="button"
            className="rounded-lg border border-border p-2 text-foreground lg:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle docs menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl gap-10 px-4 py-8 sm:px-6">
        <aside
          className={cn(
            'w-64 shrink-0 lg:block',
            mobileOpen ? 'fixed inset-0 top-[var(--header-offset,7rem)] z-30 block overflow-y-auto bg-background p-4 lg:static lg:p-0' : 'hidden',
          )}
        >
          <DocSidebar currentSlug={slug} onNavigate={() => setMobileOpen(false)} />
        </aside>

        <article className="min-w-0 flex-1 pb-16">
          <Outlet />
        </article>
      </div>
    </>
  )
}
