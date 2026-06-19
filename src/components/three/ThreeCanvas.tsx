import { Suspense, useEffect, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { useReducedMotion } from 'framer-motion'
import { GatewayScene } from './GatewayScene'
import { useIsMobile } from '../../hooks/useMediaQuery'

interface ThreeCanvasProps {
  className?: string
  variant?: 'hero' | 'inline' | 'background'
  interactive?: boolean
}

function CanvasFallback({ variant }: { variant: ThreeCanvasProps['variant'] }) {
  return (
    <div
      className={`flex items-center justify-center ${
        variant === 'background' ? 'h-full w-full' : 'h-full min-h-[280px] w-full'
      }`}
    >
      <div className="relative h-48 w-48">
        <div className="absolute inset-0 animate-pulse-glow rounded-full bg-accent/20 blur-2xl" />
        <div className="absolute inset-8 rounded-full border border-accent/30" />
        <div className="absolute inset-16 rounded-full border border-indigo/20" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="h-16 w-16 rounded-2xl border border-accent/40 bg-accent/10 backdrop-blur-sm" />
        </div>
      </div>
    </div>
  )
}

export function ThreeCanvas({ className = '', variant = 'hero', interactive = true }: ThreeCanvasProps) {
  const reduced = useReducedMotion()
  const isMobile = useIsMobile()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (reduced || !mounted) {
    return (
      <div className={className}>
        <CanvasFallback variant={variant} />
      </div>
    )
  }

  const particleCount = isMobile ? 60 : variant === 'background' ? 80 : 120
  const cameraZ = variant === 'background' ? 7 : 5.5

  return (
    <div className={`relative ${className}`}>
      <Suspense fallback={<CanvasFallback variant={variant} />}>
        <Canvas
          camera={{ position: [0, 0, cameraZ], fov: 50 }}
          dpr={[1, isMobile ? 1.5 : 2]}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
        >
          <fog attach="fog" args={['#0b1220', 4, 12]} />
          <GatewayScene interactive={interactive && variant !== 'background'} particleCount={particleCount} />
        </Canvas>
      </Suspense>

      {variant === 'hero' && (
        <>
          <div className="pointer-events-none absolute inset-0 rounded-2xl bg-gradient-to-t from-navy via-transparent to-transparent" />
          <div className="pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-inset ring-white/5" />
        </>
      )}
    </div>
  )
}
