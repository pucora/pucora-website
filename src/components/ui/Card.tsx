import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

interface CardProps {
  children: React.ReactNode
  className?: string
  hover?: boolean
  glow?: boolean
}

export function Card({ children, className, hover = false }: CardProps) {
  const Component = hover ? motion.div : 'div'
  const motionProps = hover
    ? {
        whileHover: { y: -2 },
        transition: { type: 'spring' as const, stiffness: 400, damping: 30 },
      }
    : {}

  return (
    <Component
      className={cn(
        'relative overflow-hidden rounded-2xl border border-border bg-background p-6 shadow-sm',
        hover && 'cursor-pointer transition-shadow duration-300 hover:shadow-md',
        className,
      )}
      {...motionProps}
    >
      {children}
    </Component>
  )
}
