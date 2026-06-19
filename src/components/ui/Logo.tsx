import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { brand } from '../../content/brand'
import { PucoraLogoImage } from './PucoraLogoImage'

interface LogoProps {
  className?: string
  showText?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function Logo({ className, showText = true, size = 'md' }: LogoProps) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className ?? ''}`}>
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
        <PucoraLogoImage size={size} blend />
      </motion.div>
      {showText && (
        <span className="text-lg font-semibold tracking-tight text-foreground transition-colors group-hover:text-brand">
          {brand.name}
        </span>
      )}
    </Link>
  )
}
