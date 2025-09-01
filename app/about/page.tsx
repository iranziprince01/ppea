import { Suspense } from 'react'
import AboutHeroSection from '@/components/AboutHeroSection'
import FirmHistorySection from '@/components/FirmHistorySection'
import MissionSection from '@/components/MissionSection'
import ValuesSection from '@/components/ValuesSection'
import ContactInfoCTA from '@/components/ContactInfoCTA'
import RevealOnScroll from '@/components/RevealOnScroll'

export default function AboutPage() {
  return (
    <div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <AboutHeroSection />
      </Suspense>

      <RevealOnScroll>
        <FirmHistorySection />
      </RevealOnScroll>

      <RevealOnScroll delay={0.2}>
        <MissionSection />
      </RevealOnScroll>

      <RevealOnScroll delay={0.3}>
        <ValuesSection />
      </RevealOnScroll>

      <RevealOnScroll delay={0.4}>
        <ContactInfoCTA />
      </RevealOnScroll>
    </div>
  )
}
