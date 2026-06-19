import { motion } from 'framer-motion'
import { cn } from '../../lib/cn'
import { useTheme } from '../../context/ThemeProvider'

interface PucoraLogoImageProps {
  className?: string
  size?: 'sm' | 'md' | 'lg' | 'hero'
  animate?: boolean
  blend?: boolean
  alt?: string
}

const sizes = {
  sm: 'h-8 w-8',
  md: 'h-10 w-10',
  lg: 'h-14 w-14',
  hero: 'h-32 w-32 md:h-44 md:w-44',
}

export function PucoraLogoImage({
  className,
  size = 'md',
  animate = false,
  blend = true,
  alt = 'Pucora logo',
}: PucoraLogoImageProps) {
  const { isDark } = useTheme()
  const src = blend
    ? isDark
      ? '/pucora-logo-dark.png'
      : '/pucora-logo.png'
    : isDark
      ? '/pucora_black.png'
      : '/pucora.png'

  const image = (
    <div className={cn('relative inline-flex items-center justify-center', sizes[size], className)}>
      {blend && <div className="logo-blend-wash pointer-events-none absolute inset-[-20%] rounded-full" aria-hidden />}
      <img
        src={src}
        alt={alt}
        className={cn(
          'relative h-full w-full object-contain',
          blend && 'drop-shadow-[0_8px_24px_rgba(0,168,232,0.15)] dark:drop-shadow-[0_8px_32px_rgba(0,195,255,0.35)]',
        )}
        draggable={false}
      />
    </div>
  )

  if (animate) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className="inline-flex"
      >
        {image}
      </motion.div>
    )
  }

  return image
}
