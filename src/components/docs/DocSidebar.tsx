import { NavLink } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { docsManifest } from '../../content/docs'
import { cn } from '../../lib/cn'

interface DocSidebarProps {
  currentSlug: string
  onNavigate?: () => void
}

export function DocSidebar({ currentSlug, onNavigate }: DocSidebarProps) {
  const currentSection = docsManifest.pages.find((p) => p.slug === currentSlug)?.section ?? 'overview'

  return (
    <nav className="space-y-6" aria-label="Documentation">
      {docsManifest.nav.map((section) => (
        <DocSidebarSection
          key={section.id}
          section={section}
          defaultOpen={section.id === currentSection}
          onNavigate={onNavigate}
        />
      ))}
    </nav>
  )
}

function DocSidebarSection({
  section,
  defaultOpen,
  onNavigate,
}: {
  section: (typeof docsManifest.nav)[number]
  defaultOpen: boolean
  onNavigate?: () => void
}) {
  const [open, setOpen] = useState(defaultOpen)

  return (
    <div>
      <button
        type="button"
        className="flex w-full items-center justify-between py-1 text-left text-xs font-semibold uppercase tracking-wider text-muted"
        onClick={() => setOpen(!open)}
      >
        {section.label}
        <ChevronDown className={cn('h-3.5 w-3.5 transition-transform', open && 'rotate-180')} />
      </button>
      {open && (
        <ul className="mt-2 space-y-0.5 border-l border-border pl-3">
          {section.pages.map((page) => (
            <li key={page.slug}>
              <NavLink
                to={`/docs/${page.slug}`}
                onClick={onNavigate}
                className={({ isActive }) =>
                  cn(
                    'block rounded-md px-2 py-1.5 text-sm transition-colors',
                    isActive ? 'bg-surface font-medium text-foreground' : 'text-subtle hover:text-link',
                  )
                }
              >
                {page.title}
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}
