import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Card } from '../ui/Card'
import { homeFeatures } from '../../content/features'
import { StaggerChildren, StaggerItem } from '../../hooks/useScrollReveal'

export function FeaturesGridSection() {
  const displayFeatures = homeFeatures.filter((f) => f.slug !== 'documentation')

  return (
    <section className="relative py-20 md:py-28">
      <div className="pointer-events-none absolute left-0 top-1/4 h-72 w-72 rounded-full bg-indigo/10 blur-3xl" />
      <Container className="relative">
        <SectionHeading
          eyebrow="Solving shared concerns"
          title="Focus on business logic, not boilerplate"
          description="Pucora saves you time by handling common concerns across all your microservices, allowing you to focus solely on your business logic."
        />

        <StaggerChildren className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4" stagger={0.06}>
          {displayFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <StaggerItem key={feature.slug}>
                <Link to={`/features/${feature.slug}`} className="block h-full">
                  <Card hover className="group h-full">
                    <motion.div
                      className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-accent/10 to-indigo/10 p-3"
                      whileHover={{ rotate: [0, -5, 5, 0], scale: 1.1 }}
                      transition={{ duration: 0.4 }}
                    >
                      <Icon className="h-7 w-7 text-accent" />
                    </motion.div>
                    <h3 className="mb-2 font-semibold text-white transition-colors group-hover:text-accent">
                      {feature.title}
                    </h3>
                    <p className="mb-4 text-sm leading-relaxed text-muted">{feature.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-accent opacity-0 transition-all duration-300 group-hover:opacity-100">
                      Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </span>
                  </Card>
                </Link>
              </StaggerItem>
            )
          })}
        </StaggerChildren>
      </Container>
    </section>
  )
}
