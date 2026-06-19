import { motion, useReducedMotion } from 'framer-motion'

interface AmbientBackgroundProps {
  variant?: 'hero' | 'subtle' | 'section'
  className?: string
}

export function AmbientBackground({ variant = 'hero', className = '' }: AmbientBackgroundProps) {
  const reduced = useReducedMotion()

  const orbs =
    variant === 'hero'
      ? [
          { color: 'rgba(0,212,170,0.25)', size: 500, x: '10%', y: '10%', delay: 0 },
          { color: 'rgba(79,70,229,0.3)', size: 600, x: '70%', y: '5%', delay: 1 },
          { color: 'rgba(0,212,170,0.15)', size: 400, x: '50%', y: '60%', delay: 2 },
        ]
      : variant === 'section'
        ? [
            { color: 'rgba(79,70,229,0.12)', size: 300, x: '80%', y: '20%', delay: 0 },
            { color: 'rgba(0,212,170,0.1)', size: 250, x: '5%', y: '50%', delay: 1 },
          ]
        : [{ color: 'rgba(0,212,170,0.08)', size: 350, x: '60%', y: '30%', delay: 0 }]

  return (
    <div className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`} aria-hidden="true">
      {orbs.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full blur-3xl"
          style={{
            width: orb.size,
            height: orb.size,
            left: orb.x,
            top: orb.y,
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
          }}
          animate={
            reduced
              ? {}
              : {
                  x: [0, 30, -20, 0],
                  y: [0, -25, 15, 0],
                  scale: [1, 1.1, 0.95, 1],
                }
          }
          transition={{
            duration: 12 + i * 2,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: orb.delay,
          }}
        />
      ))}

      {variant === 'hero' && !reduced && (
        <svg className="absolute inset-0 h-full w-full opacity-[0.07]" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      )}
    </div>
  )
}
