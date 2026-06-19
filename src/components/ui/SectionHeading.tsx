import { cn } from '../../lib/cn'

interface SectionHeadingProps {
  eyebrow?: string
  title: string
  description?: string
  align?: 'left' | 'center'
  className?: string
  dark?: boolean
}

export function SectionHeading({ eyebrow, title, description, align = 'center', className, dark }: SectionHeadingProps) {
  return (
    <div className={cn(align === 'center' && 'text-center', 'mb-12 md:mb-16', className)}>
      {eyebrow && (
        <p className={cn('mb-3 text-sm font-medium uppercase tracking-widest', dark ? 'text-brand' : 'text-brand')}>
          {eyebrow}
        </p>
      )}
      <h2 className={cn('apple-headline', dark && 'text-inverse-foreground')}>{title}</h2>
      {description && (
        <p
          className={cn(
            'apple-subhead mt-4',
            align === 'center' && 'mx-auto max-w-3xl',
            dark ? 'text-inverse-foreground/70' : 'text-subtle',
          )}
        >
          {description}
        </p>
      )}
    </div>
  )
}
