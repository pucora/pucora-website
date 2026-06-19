import { PageMeta } from '../components/ui/PageMeta'
import { HeroSection } from '../components/sections/HeroSection'
import { GatewayPatternSection } from '../components/sections/GatewayPatternSection'
import { PillarsSection } from '../components/sections/PillarsSection'
import { StatsSection } from '../components/sections/StatsSection'
import { PerformanceSection } from '../components/sections/PerformanceSection'
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
      <PillarsSection />
      <StatsSection />
      <PerformanceSection />
      <FeaturesGridSection />
      <BeyondRestSection />
      <TestimonialsSection />
      <TrustSection />
      <GetStartedSection />
    </>
  )
}
