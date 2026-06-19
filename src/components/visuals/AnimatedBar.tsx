import { motion, useReducedMotion } from 'framer-motion'

interface AnimatedBarProps {
  name: string
  value: number
  display: string
  color: string
  delay: number
}

export function AnimatedBar({ name, value, display, color, delay }: AnimatedBarProps) {
  const reduced = useReducedMotion()

  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-white">{name}</span>
        <motion.span
          className="text-muted"
          initial={reduced ? {} : { opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.8 }}
        >
          {display}
        </motion.span>
      </div>
      <div className="relative h-4 overflow-hidden rounded-full bg-white/5">
        <motion.div
          className={`absolute inset-y-0 left-0 rounded-full ${color}`}
          initial={{ width: reduced ? `${value}%` : '0%' }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
        />
        {!reduced && value === 100 && (
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-white/20"
            initial={{ width: '0%' }}
            whileInView={{ width: `${value}%` }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay, ease: [0.22, 1, 0.36, 1] }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.15), transparent)',
            }}
          />
        )}
      </div>
    </div>
  )
}
