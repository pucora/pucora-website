import { Link } from 'react-router-dom'
import { Container } from '../ui/Container'
import { GitHubIcon } from '../ui/GitHubIcon'
import { PucoraLogoImage } from '../ui/PucoraLogoImage'
import { footerColumns } from '../../content/nav'
import { brand, externalLinks } from '../../content/brand'

export function Footer() {
  return (
    <footer className="border-t border-border bg-surface text-xs text-subtle">
      <Container className="py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {footerColumns.map((col) => (
            <div key={col.title}>
              <h3 className="mb-3 text-[11px] font-semibold uppercase tracking-wide text-foreground">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer" className="hover:text-foreground hover:underline">
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="hover:text-foreground hover:underline">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-border pt-6 sm:flex-row">
          <div className="flex items-center gap-3">
            <PucoraLogoImage size="sm" blend className="opacity-90" />
            <span>© {new Date().getFullYear()} {brand.name}. All rights reserved.</span>
          </div>
          <a
            href={externalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 hover:text-foreground hover:underline"
          >
            <GitHubIcon className="h-4 w-4" />
            {externalLinks.githubLabel}
          </a>
        </div>
      </Container>
    </footer>
  )
}
