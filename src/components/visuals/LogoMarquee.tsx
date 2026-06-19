import { motion, useReducedMotion } from 'framer-motion'
import { trustLogos } from '../../content/testimonials'

export function LogoMarquee() {
  const reduced = useReducedMotion()
  const items = [...trustLogos, ...trustLogos]

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-background to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-background to-transparent" />
      <motion.div
        className="flex w-max gap-12"
        animate={reduced ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((name, i) => (
          <span key={`${name}-${i}`} className="whitespace-nowrap text-sm font-medium text-muted">
            {name}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
