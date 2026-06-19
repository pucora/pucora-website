import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'link'
type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonProps {
  variant?: ButtonVariant
  size?: ButtonSize
  href?: string
  external?: boolean
  className?: string
  children: React.ReactNode
  type?: 'button' | 'submit'
  onClick?: () => void
  disabled?: boolean
}

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-link text-white hover:bg-link-hover font-medium',
  secondary: 'bg-foreground text-background hover:bg-foreground/90 font-medium',
  ghost: 'text-link hover:text-link-hover bg-transparent',
  outline: 'border border-link text-link hover:bg-link/5 bg-transparent',
  link: 'text-link hover:text-link-hover hover:underline bg-transparent p-0',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-1.5 text-xs',
  md: 'px-5 py-2 text-sm',
  lg: 'px-6 py-3 text-base',
}

const motionProps = {
  whileHover: { scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 25 },
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  href,
  external,
  children,
  type = 'button',
  onClick,
  disabled,
}: ButtonProps) {
  const isLinkVariant = variant === 'link'
  const classes = cn(
    'inline-flex items-center justify-center rounded-full transition-all duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-link',
    variants[variant],
    !isLinkVariant && sizes[size],
    className,
  )

  if (href) {
    if (external || href.startsWith('http')) {
      return (
        <motion.a href={href} className={classes} target="_blank" rel="noopener noreferrer" {...motionProps}>
          {children}
        </motion.a>
      )
    }
    return (
      <motion.div {...motionProps} className="inline-flex">
        <Link to={href} className={classes}>
          {children}
        </Link>
      </motion.div>
    )
  }

  return (
    <motion.button className={classes} type={type} onClick={onClick} disabled={disabled} {...motionProps}>
      {children}
    </motion.button>
  )
}
