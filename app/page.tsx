import { Suspense } from 'react'
import HeroSection from '@/components/HeroSection'
import MarqueeSection from '@/components/MarqueeSection'
import OurStorySection from '@/components/OurStorySection'
import TrustedBySection from '@/components/TrustedBySection'
import WhyChooseUsSection from '@/components/WhyChooseUsSection'
import TeamPreviewSection from '@/components/TeamPreviewSection'
import ContactSection from '@/components/ContactSection'
import MapSection from '@/components/MapSection'

export default function HomePage() {
  return (
    <div className="pt-20">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <HeroSection />
        <MarqueeSection />
        <OurStorySection />
        <TrustedBySection />
        <WhyChooseUsSection />
        <TeamPreviewSection />
        <ContactSection />
        <MapSection />
      </Suspense>
    </div>
  )
}
