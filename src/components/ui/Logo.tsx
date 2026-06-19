import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

interface LogoProps {
  className?: string
}

export function Logo({ className }: LogoProps) {
  return (
    <Link to="/" className={`group flex items-center gap-2.5 ${className ?? ''}`}>
      <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 400 }}>
        <svg width="36" height="36" viewBox="0 0 32 32" fill="none" aria-hidden="true" className="transition-shadow group-hover:drop-shadow-[0_0_12px_rgba(0,212,170,0.4)]">
          <rect width="32" height="32" rx="8" fill="#151d2e" stroke="rgba(0,212,170,0.4)" strokeWidth="1" />
          <path
            d="M8 16h6l2 6 2-12 2 6h6"
            stroke="#00D4AA"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>
      <span className="text-xl font-bold tracking-tight text-white transition-colors group-hover:text-accent">
        Pucora
      </span>
    </Link>
  )
}
