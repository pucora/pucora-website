import { PageMeta } from '../components/ui/PageMeta'
import { HeroSection } from '../components/sections/HeroSection'
import { GatewayPatternSection } from '../components/sections/GatewayPatternSection'
import { ArchitectureTrafficSection } from '../components/sections/ArchitectureTrafficSection'
import { PillarsSection } from '../components/sections/PillarsSection'
import { StatsSection } from '../components/sections/StatsSection'
import { PerformanceSection } from '../components/sections/PerformanceSection'
import { ImplementationShowcaseSection } from '../components/sections/ImplementationShowcaseSection'
import { FeaturesGridSection } from '../components/sections/FeaturesGridSection'
import { BeyondRestSection } from '../components/sections/BeyondRestSection'
import { TestimonialsSection } from '../components/sections/TestimonialsSection'
import { TrustSection } from '../components/sections/TrustSection'
import { GetStartedSection } from '../components/sections/GetStartedSection'

export function Home() {
  return (
    <>
      <PageMeta />
      <HeroSection />
      <GatewayPatternSection />
      <ArchitectureTrafficSection />
      <PillarsSection />
      <StatsSection />
      <PerformanceSection />
      <ImplementationShowcaseSection />
      <FeaturesGridSection />
      <BeyondRestSection />
      <TestimonialsSection />
      <TrustSection />
      <GetStartedSection />
    </>
  )
}
