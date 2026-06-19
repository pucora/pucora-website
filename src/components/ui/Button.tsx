import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline'
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
  primary:
    'bg-gradient-to-r from-accent to-teal-400 text-navy hover:from-accent-hover hover:to-teal-500 font-semibold shadow-lg shadow-accent/20 hover:shadow-accent/30',
  secondary:
    'bg-gradient-to-r from-indigo to-violet-600 text-white hover:from-indigo/90 hover:to-violet-500 font-semibold shadow-lg shadow-indigo/20',
  ghost: 'text-white hover:bg-white/10',
  outline:
    'border border-white/20 text-white hover:border-accent hover:text-accent hover:shadow-lg hover:shadow-accent/10 backdrop-blur-sm',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const motionProps = {
  whileHover: { scale: 1.03, y: -1 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring' as const, stiffness: 400, damping: 20 },
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
  const classes = cn(
    'shine-hover relative inline-flex items-center justify-center rounded-xl transition-all duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent',
    variants[variant],
    sizes[size],
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
