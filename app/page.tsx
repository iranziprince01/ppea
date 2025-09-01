import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import RevealOnScroll from '@/components/RevealOnScroll'
import MarqueeSection from '@/components/MarqueeSection'
import OurStorySection from '@/components/OurStorySection'
import TrustedBySection from '@/components/TrustedBySection'
import WhyChooseUsSection from '@/components/WhyChooseUsSection'
import TeamPreviewSection from '@/components/TeamPreviewSection'
import ContactSection from '@/components/ContactSection'
import MapSection from '@/components/MapSection'

export default function HomePage() {
  return (
    <div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <HeroSection />
        <RevealOnScroll>
          <MarqueeSection />
        </RevealOnScroll>
        <RevealOnScroll delay={0.2}>
          <OurStorySection />
        </RevealOnScroll>
        <RevealOnScroll delay={0.3}>
          <TrustedBySection />
        </RevealOnScroll>
        <RevealOnScroll delay={0.4}>
          <WhyChooseUsSection />
        </RevealOnScroll>
        <RevealOnScroll delay={0.5}>
          <TeamPreviewSection />
        </RevealOnScroll>
        <RevealOnScroll delay={0.6}>
          <ContactSection />
        </RevealOnScroll>
        <RevealOnScroll delay={0.7}>
          <MapSection />
        </RevealOnScroll>
      </Suspense>
    </div>
  )
}
