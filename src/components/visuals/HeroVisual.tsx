import { motion, useReducedMotion } from 'framer-motion'
import { LazyThreeCanvasWrapper as ThreeCanvas } from '../three/LazyThreeCanvas'

const labels = [
  { name: 'REST', angle: 0, color: '#00D4AA' },
  { name: 'gRPC', angle: 72, color: '#4F46E5' },
  { name: 'WS', angle: 144, color: '#00D4AA' },
  { name: 'Kafka', angle: 216, color: '#4F46E5' },
  { name: 'SOAP', angle: 288, color: '#00D4AA' },
]

export function HeroVisual() {
  const reduced = useReducedMotion()
  const radius = 155

  return (
    <div className="relative mx-auto h-[340px] w-full max-w-xl md:h-[400px]">
      {/* 3D Canvas */}
      <div className="absolute inset-0 overflow-hidden rounded-3xl gradient-border glow-accent">
        <ThreeCanvas variant="hero" className="h-full w-full" />
      </div>

      {/* Floating protocol labels overlay */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        {labels.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180
          const x = Math.cos(rad) * radius
          const y = Math.sin(rad) * radius

          return (
            <motion.div
              key={node.name}
              className="absolute"
              style={{ transform: `translate(${x}px, ${y}px)` }}
              initial={reduced ? {} : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.8 + i * 0.1, type: 'spring', stiffness: 200 }}
            >
              <motion.div
                className="flex h-11 items-center justify-center rounded-lg border px-3 text-xs font-bold backdrop-blur-md"
                style={{
                  color: node.color,
                  borderColor: `${node.color}40`,
                  backgroundColor: `${node.color}10`,
                }}
                animate={reduced ? {} : { y: [0, -5, 0] }}
                transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: 'easeInOut', delay: i * 0.2 }}
              >
                {node.name}
              </motion.div>
            </motion.div>
          )
        })}
      </div>

      {/* Center badge */}
      <motion.div
        className="pointer-events-none absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2"
        initial={reduced ? {} : { opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, type: 'spring' }}
      >
        <div className="rounded-xl border border-accent/30 bg-navy/60 px-3 py-1.5 text-center backdrop-blur-md">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-accent">Gateway</p>
        </div>
      </motion.div>
    </div>
  )
}
