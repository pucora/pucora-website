import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronDown, Menu, X } from 'lucide-react'
import { GitHubIcon } from '../ui/GitHubIcon'
import { Logo } from '../ui/Logo'
import { Button } from '../ui/Button'
import { ThemeToggle } from '../ui/ThemeToggle'
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
        className="flex items-center gap-0.5 px-3 py-2 text-xs font-normal text-foreground/80 transition-colors hover:text-foreground"
        aria-expanded={open}
      >
        {group.label}
        <ChevronDown className={cn('h-3 w-3 opacity-60 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.2 }}
            className="absolute left-1/2 top-full z-50 w-64 -translate-x-1/2 overflow-hidden rounded-xl border border-border bg-background/95 p-2 shadow-xl backdrop-blur-xl"
          >
            {group.items.map((item) =>
              item.external ? (
                <a
                  key={item.href}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface"
                >
                  <span className="block text-xs font-medium text-foreground">{item.label}</span>
                  {item.description && <span className="block text-[11px] text-muted">{item.description}</span>}
                </a>
              ) : (
                <Link key={item.href} to={item.href} className="block rounded-lg px-3 py-2.5 transition-colors hover:bg-surface">
                  <span className="block text-xs font-medium text-foreground">{item.label}</span>
                  {item.description && <span className="block text-[11px] text-muted">{item.description}</span>}
                </Link>
              ),
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function MobileAccordion({ group }: { group: NavGroup }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="border-b border-border">
      <button
        type="button"
        className="flex w-full items-center justify-between py-3 text-sm text-foreground"
        onClick={() => setOpen(!open)}
      >
        {group.label}
        <ChevronDown className={cn('h-4 w-4 transition-transform', open && 'rotate-180')} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
            <div className="pb-3 pl-2">
              {group.items.map((item) =>
                item.external ? (
                  <a key={item.href} href={item.href} target="_blank" rel="noopener noreferrer" className="block py-2 text-sm text-subtle hover:text-link">
                    {item.label}
                  </a>
                ) : (
                  <Link key={item.href} to={item.href} className="block py-2 text-sm text-subtle hover:text-link">
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
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-40 transition-all duration-300',
        scrolled ? 'border-b border-border bg-background/80 backdrop-blur-xl' : 'bg-background/70 backdrop-blur-md',
      )}
    >
      <div className="mx-auto flex h-12 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Logo size="sm" showText={false} />

        <nav className="hidden items-center lg:flex" aria-label="Main navigation">
          <NavDropdown group={productNav} />
          <NavDropdown group={solutionNav} />
          <NavDropdown group={resourceNav} />
          <a href={externalLinks.github} target="_blank" rel="noopener noreferrer" className="px-3 py-2 text-xs text-foreground/80 hover:text-foreground">
            GitHub
          </a>
          <Link to="/docs/overview" className="px-3 py-2 text-xs text-foreground/80 hover:text-foreground">
            Docs
          </Link>
          <Link to="/downloads" className="px-3 py-2 text-xs text-foreground/80 hover:text-foreground">
            Downloads
          </Link>
        </nav>

        <div className="hidden items-center gap-1 lg:flex">
          <ThemeToggle />
          <a href={externalLinks.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="rounded-full p-2 text-foreground/70 hover:bg-surface hover:text-foreground">
            <GitHubIcon className="h-4 w-4" />
          </a>
          <Button href="/get-started" size="sm">
            Get Started
          </Button>
        </div>

        <div className="flex items-center gap-1 lg:hidden">
          <ThemeToggle />
          <button type="button" className="p-2 text-foreground" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden border-t border-border bg-background lg:hidden">
            <div className="px-4 py-4">
              <MobileAccordion group={productNav} />
              <MobileAccordion group={solutionNav} />
              <MobileAccordion group={resourceNav} />
              <a href={externalLinks.github} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 border-b border-border py-3 text-sm">
                <GitHubIcon className="h-4 w-4" /> GitHub
              </a>
              <Link to="/downloads" className="block border-b border-border py-3 text-sm">Downloads</Link>
              <div className="pt-4">
                <Button href="/get-started" className="w-full">Get Started</Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
