import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { testimonials } from '../../content/testimonials'
import { Reveal } from '../../hooks/useScrollReveal'

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)
  const [showAll, setShowAll] = useState(false)
  const [direction, setDirection] = useState(0)

  const goTo = (next: number) => {
    setDirection(next > index ? 1 : -1)
    setIndex(next)
  }

  const variants = {
    enter: (d: number) => ({ x: d > 0 ? 80 : -80, opacity: 0 }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({ x: d > 0 ? -80 : 80, opacity: 0 }),
  }

  return (
    <section className="relative overflow-hidden py-20 md:py-28">
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo/5 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          title="What people are saying"
          description="Trusted by platform teams building high-performance API infrastructure."
        />

        <div className="relative">
          {!showAll && (
            <>
              <button
                type="button"
                onClick={() => goTo((index - 1 + testimonials.length) % testimonials.length)}
                className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-navy-card/80 p-3 backdrop-blur-sm transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10 md:-left-6"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={() => goTo((index + 1) % testimonials.length)}
                className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full border border-white/10 bg-navy-card/80 p-3 backdrop-blur-sm transition-all hover:border-accent hover:shadow-lg hover:shadow-accent/10 md:-right-6"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}

          {showAll ? (
            <div className="grid gap-6 md:grid-cols-2">
              {testimonials.map((t) => (
                <Card key={t.author} className="relative">
                  <Quote className="mb-4 h-8 w-8 text-accent/40" />
                  <p className="mb-6 text-lg leading-relaxed text-white/90">&ldquo;{t.quote}&rdquo;</p>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{t.author}</p>
                      <p className="text-sm text-muted">{t.role}, {t.company}</p>
                    </div>
                    {t.placeholder && <Badge variant="indigo">Placeholder</Badge>}
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="mx-auto max-w-3xl overflow-hidden">
              <AnimatePresence mode="wait" custom={direction}>
                <motion.div
                  key={index}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Card className="relative glow-indigo">
                    <Quote className="mb-4 h-10 w-10 text-accent/30" />
                    <p className="mb-8 text-xl leading-relaxed text-white/90 md:text-2xl">
                      &ldquo;{testimonials[index].quote}&rdquo;
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-accent/30 to-indigo/30 text-lg font-bold text-white">
                          {testimonials[index].author[0]}
                        </div>
                        <div>
                          <p className="font-semibold text-white">{testimonials[index].author}</p>
                          <p className="text-sm text-muted">
                            {testimonials[index].role}, {testimonials[index].company}
                          </p>
                        </div>
                      </div>
                      {testimonials[index].placeholder && <Badge variant="indigo">Placeholder</Badge>}
                    </div>
                  </Card>
                </motion.div>
              </AnimatePresence>

              <div className="mt-6 flex justify-center gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => goTo(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === index ? 'w-8 bg-accent' : 'w-2 bg-white/20 hover:bg-white/40'
                    }`}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>

        {!showAll && (
          <Reveal delay={0.2}>
            <div className="mt-8 text-center">
              <button
                type="button"
                onClick={() => setShowAll(true)}
                className="text-sm font-medium text-accent transition-colors hover:text-white"
              >
                Show more...
              </button>
            </div>
          </Reveal>
        )}
      </Container>
    </section>
  )
}
