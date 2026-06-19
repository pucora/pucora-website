import { cn } from '../../lib/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'indigo'
  className?: string
}

const variants = {
  default: 'bg-white/10 text-white',
  accent: 'bg-accent/20 text-accent',
  indigo: 'bg-indigo/20 text-indigo-300',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
