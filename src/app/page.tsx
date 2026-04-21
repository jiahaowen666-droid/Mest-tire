import HeroSection from '@/components/HeroSection'
import StatsSection from '@/components/StatsSection'
import ApplicationSection from '@/components/ApplicationSection'
import ProductOrbit from '@/components/ProductOrbit'
import FAQSection from '@/components/FAQSection'
import HomeContent from './HomeContent'
import HomeCTA from './HomeCTA'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ApplicationSection />
      <ProductOrbit />
      <HomeContent />
      <FAQSection />
      <HomeCTA />
    </>
  )
}
