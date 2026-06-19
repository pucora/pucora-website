import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function Card({ children, className, hover = false, glow = false }: CardProps) {
  const Component = hover ? motion.div : 'div'
  const motionProps = hover
    ? {
        whileHover: { y: -4, scale: 1.01 },
        transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
      }
    : {}

  return (
    <Component
      className={cn(
        'relative overflow-hidden glass-card rounded-2xl p-6',
        hover && 'group cursor-pointer transition-all duration-300 hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5',
        glow && 'glow-accent',
        className,
      )}
      {...motionProps}
    >
      {hover && (
        <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-br from-accent/5 via-transparent to-indigo/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <div className="relative">{children}</div>
    </Component>
  )
}
