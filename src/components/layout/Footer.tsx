import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { GitHubIcon } from '../ui/GitHubIcon'
import { Container } from '../ui/Container'
import { Logo } from '../ui/Logo'
import { footerColumns } from '../../content/nav'
import { brand, externalLinks } from '../../content/brand'

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-light">
      <div className="pointer-events-none absolute inset-0 section-pattern opacity-30" />
      <div className="pointer-events-none absolute -bottom-40 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-accent/5 blur-3xl" />
      <Container className="relative py-16">
        <div className="mb-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 text-sm leading-relaxed text-muted">{brand.description}</p>
            <a
              href={externalLinks.github}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
            >
              <GitHubIcon className="h-4 w-4" />
              {externalLinks.githubLabel}
            </a>
          </div>
          {footerColumns.map((col, colIndex) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: colIndex * 0.1 }}
            >
              <h3 className="mb-4 text-sm font-semibold text-white">{col.title}</h3>
              <ul className="space-y-2">
                {col.links.map((link) => (
                  <li key={link.href}>
                    {'external' in link && link.external ? (
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-muted transition-colors hover:text-accent"
                      >
                        {link.label}
                      </a>
                    ) : (
                      <Link to={link.href} className="text-sm text-muted transition-colors hover:text-accent">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <p className="text-sm text-muted">Stay up to date with Pucora releases and important updates.</p>
            <form
              className="flex gap-2"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="rounded-xl border border-white/10 bg-navy/80 px-4 py-2.5 text-sm text-white backdrop-blur-sm placeholder:text-muted transition-colors focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent/30"
                aria-label="Email for newsletter"
              />
              <button
                type="submit"
                className="shine-hover relative overflow-hidden rounded-xl bg-gradient-to-r from-accent to-teal-400 px-5 py-2.5 text-sm font-semibold text-navy transition-all hover:shadow-lg hover:shadow-accent/20"
              >
                Subscribe
              </button>
            </form>
          </div>
          <p className="mt-8 text-center text-xs text-muted">
            © {new Date().getFullYear()} {brand.name}. Open source API Gateway.
          </p>
        </div>
      </Container>
    </footer>
  )
}
