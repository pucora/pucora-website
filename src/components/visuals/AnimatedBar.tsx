import { motion } from 'framer-motion'

interface AnimatedBarProps {
  name: string
  value: number
  display: string
  color: string
  delay: number
}

export function AnimatedBar({ name, value, display, color, delay }: AnimatedBarProps) {
  return (
    <div>
      <div className="mb-2 flex justify-between text-sm">
        <span className="font-medium text-foreground">{name}</span>
        <span className="text-muted">{display}</span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface">
        <motion.div
          className={`h-2 rounded-full ${color}`}
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </div>
  )
}
