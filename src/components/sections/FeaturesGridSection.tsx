import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import { Container } from '../ui/Container'
import { SectionHeading } from '../ui/SectionHeading'
import { Card } from '../ui/Card'
import { homeFeatures } from '../../content/features'
import { StaggerChildren, StaggerItem } from '../../hooks/useScrollReveal'

export function FeaturesGridSection() {
  const displayFeatures = homeFeatures.filter((f) => f.slug !== 'documentation')

  return (
    <section className="apple-section">
      <Container>
        <SectionHeading
          title="Everything your gateway should handle."
          description="Focus on business logic. Let Pucora handle the rest."
        />
        <StaggerChildren className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" stagger={0.05}>
          {displayFeatures.map((feature) => {
            const Icon = feature.icon
            return (
              <StaggerItem key={feature.slug}>
                <Link to={`/features/${feature.slug}`} className="block h-full">
                  <Card hover className="group h-full">
                    <Icon className="mb-4 h-7 w-7 text-brand" />
                    <h3 className="mb-2 font-semibold text-foreground">{feature.title}</h3>
                    <p className="mb-4 text-sm leading-relaxed text-subtle">{feature.description}</p>
                    <span className="inline-flex items-center gap-1 text-sm text-link opacity-0 transition-opacity group-hover:opacity-100">
                      Learn more <ChevronRight className="h-4 w-4" />
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
