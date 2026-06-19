import { cn } from '../../lib/cn'

interface BadgeProps {
  children: React.ReactNode
  variant?: 'default' | 'accent' | 'indigo'
  className?: string
}

const variants = {
  default: 'bg-surface text-subtle',
  accent: 'bg-brand/10 text-brand',
  indigo: 'bg-link/10 text-link',
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-medium', variants[variant], className)}>
      {children}
    </span>
  )
}
