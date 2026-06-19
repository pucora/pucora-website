import { motion, useReducedMotion } from 'framer-motion'

const logos = [
  'Acme Cloud',
  'DataFlow',
  'NexusPay',
  'StreamTech',
  'Orbital',
  'Vertex',
  'CloudScale',
  'ApiForge',
]

export function LogoMarquee() {
  const reduced = useReducedMotion()
  const items = [...logos, ...logos]

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-navy to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-navy to-transparent" />

      <motion.div
        className="flex w-max gap-16"
        animate={reduced ? {} : { x: ['0%', '-50%'] }}
        transition={{ duration: 35, repeat: Infinity, ease: 'linear' }}
      >
        {items.map((name, i) => (
          <div
            key={`${name}-${i}`}
            className="flex shrink-0 items-center gap-3 rounded-xl border border-white/5 bg-white/5 px-6 py-3 backdrop-blur-sm"
          >
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-accent/20 to-indigo/20">
              <span className="text-xs font-bold text-accent">{name[0]}</span>
            </div>
            <span className="whitespace-nowrap text-sm font-semibold text-white/40">{name}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
