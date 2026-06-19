import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', 'mb-12 md:mb-16', className)}>
      {eyebrow && (
        <p className="mb-3 inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-wider text-accent">
          <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent" />
          {eyebrow}
          {align === 'center' && <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent" />}
        </p>
      )}
      <h2 className="text-3xl font-bold tracking-tight text-white md:text-4xl lg:text-5xl">{title}</h2>
      {description && (
        <p className={cn('mt-4 text-lg leading-relaxed text-muted', align === 'center' && 'mx-auto max-w-3xl')}>
          {description}
        </p>
      )}
    </div>
  )
}
