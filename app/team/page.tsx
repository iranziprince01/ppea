import { Suspense } from 'react'
import TeamHeroSection from '@/components/TeamHeroSection'
import TeamGridSection from '@/components/TeamGridSection'
import RevealOnScroll from '@/components/RevealOnScroll'
import ContactInfoCTA from '@/components/ContactInfoCTA'

export default function TeamPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <TeamHeroSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <RevealOnScroll>
          <TeamGridSection />
        </RevealOnScroll>
      </Suspense>

      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <ContactInfoCTA />
      </Suspense>
    </div>
  )
}
