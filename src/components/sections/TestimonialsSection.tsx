import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Card } from '../ui/Card'
import { Badge } from '../ui/Badge'
import { testimonials } from '../../content/testimonials'

export function TestimonialsSection() {
  const [index, setIndex] = useState(0)

  return (
    <section className="apple-section">
      <Container>
        <SectionHeading title="What teams are saying." />
        <div className="mx-auto max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
            >
              <Card className="text-center">
                <p className="text-xl font-normal leading-relaxed text-foreground md:text-2xl">
                  &ldquo;{testimonials[index].quote}&rdquo;
                </p>
                <div className="mt-8 flex items-center justify-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand">
                    {testimonials[index].author[0]}
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-medium text-foreground">{testimonials[index].author}</p>
                    <p className="text-xs text-muted">
                      {testimonials[index].role}, {testimonials[index].company}
                    </p>
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
                onClick={() => setIndex(i)}
                className={`h-2 rounded-full transition-all ${i === index ? 'w-6 bg-brand' : 'w-2 bg-border'}`}
                aria-label={`Testimonial ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
