import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { GradientText } from '../ui/GradientText'
import { stats } from '../../content/stats'
import { Reveal } from '../../hooks/useScrollReveal'

function AnimatedStat({ value, suffix, label, prefix, display }: (typeof stats)[number]) {
  const [count, setCount] = useState(0)
  const isZeroDisplay = display === '0'

  useEffect(() => {
    if (isZeroDisplay) return
    const duration = 1800
    const steps = 50
    const increment = value / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= value) {
        setCount(value)
        clearInterval(timer)
      } else {
        setCount(Math.floor(current))
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [value, isZeroDisplay])

  const shown = isZeroDisplay ? '0' : `${prefix ?? ''}${count}${suffix}`

  return (
    <motion.div
      className="group relative text-center"
      whileHover={{ scale: 1.08 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="absolute -inset-4 -z-10 rounded-2xl bg-gradient-to-b from-accent/10 to-transparent opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100" />
      <motion.div
        className="text-5xl font-extrabold md:text-6xl lg:text-7xl"
        animate={{ filter: ['drop-shadow(0 0 8px rgba(0,212,170,0.2))', 'drop-shadow(0 0 20px rgba(0,212,170,0.4))', 'drop-shadow(0 0 8px rgba(0,212,170,0.2))'] }}
        transition={{ duration: 3, repeat: Infinity }}
      >
        <GradientText>{shown}</GradientText>
      </motion.div>
      <p className="mt-3 text-sm text-muted">{label}</p>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute inset-x-0 top-1/2 h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/5 blur-3xl" />
      <Container className="relative">
        <Reveal>
          <div className="text-center">
            <h2 className="text-3xl font-bold md:text-4xl lg:text-5xl">
              The fastest open-source{' '}
              <span className="text-gradient-static">API Gateway</span> in the market
            </h2>
          </div>
        </Reveal>
        <div className="mt-16 grid gap-12 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.15} direction="scale">
              <AnimatedStat {...stat} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.4}>
          <div className="mt-14 text-center">
            <Button href="/get-started">Get Pucora</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
