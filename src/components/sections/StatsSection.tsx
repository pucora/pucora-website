import { useEffect, useState } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { SectionHeading } from '../ui/SectionHeading'
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
    <div className="text-center">
      <p className="text-5xl font-semibold tracking-tight text-foreground md:text-6xl">{shown}</p>
      <p className="mt-2 text-sm text-muted">{label}</p>
    </div>
  )
}

export function StatsSection() {
  return (
    <section className="apple-section">
      <Container>
        <SectionHeading title="Numbers that speak." description="Benchmarked for real-world throughput on commodity hardware." />
        <div className="grid gap-12 md:grid-cols-3">
          {stats.map((stat, i) => (
            <Reveal key={stat.label} delay={i * 0.1}>
              <AnimatedStat {...stat} />
            </Reveal>
          ))}
        </div>
        <Reveal delay={0.3}>
          <div className="mt-12 text-center">
            <Button href="/get-started">Get Pucora</Button>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
