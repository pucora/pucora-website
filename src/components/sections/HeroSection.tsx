import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { GradientText } from '../ui/GradientText'
import { brand, externalLinks } from '../../content/brand'
import { HeroThreeBackground } from '../visuals/HeroThreeBackground'
import { HeroVisual } from '../visuals/HeroVisual'
import { LogoMarquee } from '../visuals/LogoMarquee'
import { Reveal } from '../../hooks/useScrollReveal'

export function HeroSection() {
  const reduced = useReducedMotion()

  const headline = 'The fastest open-source'
  const highlight = 'API gateway.'
  const subline = 'True linear scalability.'

  return (
    <section className="relative min-h-[90vh] overflow-hidden">
      <HeroThreeBackground />
      <div className="pointer-events-none absolute inset-0 section-pattern opacity-30" />

      <Container className="relative py-16 md:py-24 lg:py-28">
        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative z-10">
            <Reveal direction="left">
              <motion.div
                className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/30 bg-navy/50 px-4 py-1.5 text-sm text-accent shadow-lg shadow-accent/10 backdrop-blur-md"
                initial={reduced ? {} : { opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                Open Source · Enterprise-grade connectivity in CE
              </motion.div>
            </Reveal>

            <Reveal direction="left" delay={0.1}>
              <h1 className="text-4xl font-extrabold leading-[1.08] tracking-tight md:text-5xl lg:text-6xl xl:text-7xl">
                {headline.split(' ').map((word, i) => (
                  <motion.span
                    key={i}
                    className="mr-[0.25em] inline-block"
                    initial={reduced ? {} : { opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  >
                    {word}
                  </motion.span>
                ))}
                <br />
                <GradientText>{highlight}</GradientText>
                <br />
                <motion.span
                  className="text-white/90"
                  initial={reduced ? {} : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.7 }}
                >
                  {subline}
                </motion.span>
              </h1>
            </Reveal>

            <Reveal direction="left" delay={0.2}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/70 md:text-xl">{brand.description}</p>
            </Reveal>

            <Reveal direction="left" delay={0.3}>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap">
                <Button href="/get-started" size="lg">
                  Get Pucora
                </Button>
                <Button href="/resources/documentation" variant="outline" size="lg">
                  View Docs
                </Button>
                <Button href={externalLinks.github} external variant="ghost" size="lg">
                  View on GitHub
                </Button>
              </div>
            </Reveal>

            <Reveal direction="left" delay={0.4}>
              <div className="mt-10 flex items-center gap-6 sm:gap-10">
                {[
                  { value: '70K+', label: 'req/s' },
                  { value: '<50MB', label: 'memory' },
                  { value: '15', label: 'protocols' },
                ].map((stat, i) => (
                  <motion.div
                    key={stat.label}
                    className="relative"
                    initial={reduced ? {} : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="absolute -inset-2 rounded-lg bg-accent/5 opacity-0 transition-opacity hover:opacity-100" />
                    <p className="text-2xl font-bold text-gradient-static md:text-3xl">{stat.value}</p>
                    <p className="text-xs uppercase tracking-wider text-muted">{stat.label}</p>
                  </motion.div>
                ))}
              </div>
            </Reveal>
          </div>

          <Reveal direction="scale" delay={0.25}>
            <div className="relative z-10">
              <HeroVisual />
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.6}>
          <div className="relative z-10 mt-20">
            <p className="mb-8 text-center text-xs font-medium uppercase tracking-[0.2em] text-muted">
              Trusted by platform teams worldwide
            </p>
            <LogoMarquee />
          </div>
        </Reveal>
      </Container>

      {/* Bottom fade */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-navy to-transparent" />
    </section>
  )
}
