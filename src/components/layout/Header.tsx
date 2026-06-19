import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { GitHubIcon } from '../ui/GitHubIcon'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { productNav, resourceNav, solutionNav } from '../../content/nav'
import { externalLinks } from '../../content/brand'
import type { NavGroup } from '../../content/nav'
import { cn } from '../../lib/cn'

function NavDropdown({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="relative" onMouseEnter={() => setOpen(true)} onMouseLeave={() => setOpen(false)}>
      <button
        type="button"
        className="flex items-center gap-1 rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
        aria-expanded={open}
      >
        {group.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform duration-300', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="absolute left-0 top-full z-50 w-72 overflow-hidden rounded-xl border border-white/10 bg-navy-card/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl"
          >
            {group.items.map((item, i) => (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.03 }}
              >
                {item.external ? (
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block rounded-lg px-4 py-3 transition-colors hover:bg-white/5"
                  >
                    <span className="block text-sm font-medium text-white">{item.label}</span>
                    {item.description && <span className="block text-xs text-muted">{item.description}</span>}
                  </a>
                ) : (
                  <Link to={item.href} className="block rounded-lg px-4 py-3 transition-colors hover:bg-white/5">
                    <span className="block text-sm font-medium text-white">{item.label}</span>
                    {item.description && <span className="block text-xs text-muted">{item.description}</span>}
                  </Link>
                )}
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileAccordion({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-white/10">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-sm font-medium text-white"
        onClick={() => setOpen(!open)}
      >
        {group.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="pb-3 pl-2">
              {group.items.map((item) =>
                item.external ? (
                  <a
                    key={item.href}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block py-2 text-sm text-muted hover:text-accent"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.href} to={item.href} className="block py-2 text-sm text-muted hover:text-accent">
                    {item.label}
                  </Link>
                ),
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled
          ? 'border-b border-white/10 bg-navy/90 shadow-lg shadow-black/20 backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent',
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <Logo />

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Main navigation">
          <NavDropdown group={productNav} />
          <NavDropdown group={solutionNav} />
          <NavDropdown group={resourceNav} />
          <a
            href={externalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            <GitHubIcon className="h-4 w-4" />
            GitHub
          </a>
          <a
            href={externalLinks.docs}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            Docs
          </a>
          <Link
            to="/downloads"
            className="rounded-lg px-3 py-2 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            Downloads
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <a
            href={externalLinks.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
            className="rounded-lg p-2 text-white/80 transition-colors hover:bg-white/5 hover:text-white"
          >
            <GitHubIcon className="h-5 w-5" />
          </a>
          <Button href="/get-started" size="sm">
            Get Started
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg p-2 text-white transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden border-t border-white/10 bg-navy-light/95 backdrop-blur-xl lg:hidden"
          >
            <div className="px-4 py-4">
              <MobileAccordion group={productNav} />
              <MobileAccordion group={solutionNav} />
              <MobileAccordion group={resourceNav} />
              <a
                href={externalLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 border-b border-white/10 py-3 text-sm text-white"
              >
                <GitHubIcon className="h-4 w-4" />
                GitHub
              </a>
              <a
                href={externalLinks.docs}
                target="_blank"
                rel="noopener noreferrer"
                className="block border-b border-white/10 py-3 text-sm text-white"
              >
                Docs
              </a>
              <Link to="/downloads" className="block border-b border-white/10 py-3 text-sm text-white">
                Downloads
              </Link>
              <div className="pt-4">
                <Button href="/get-started" className="w-full">
                  Get Started
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
