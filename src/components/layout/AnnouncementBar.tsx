import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { brand } from '../../content/brand'

export function AnnouncementBar() {
  return (
    <motion.div
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: 'auto', opacity: 1 }}
      className="relative overflow-hidden border-b border-indigo/20 bg-gradient-to-r from-indigo/20 via-accent/10 to-indigo/20"
    >
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(0,212,170,0.08),transparent)] animate-shimmer" style={{ backgroundSize: '200% 100%' }} />
      <div className="relative mx-auto flex max-w-7xl items-center justify-center gap-2 px-4 py-2.5 text-sm">
        <span className="relative flex h-2 w-2 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-50" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
        </span>
        <span className="text-white/90">{brand.announcement.text}</span>
        <Link to={brand.announcement.link} className="font-semibold text-accent transition-colors hover:text-white">
          {brand.announcement.linkText} →
        </Link>
      </div>
    </motion.div>
  )
}
