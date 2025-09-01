import { Suspense } from 'react'
import ServicesHeroSection from '@/components/ServicesHeroSection'
import ServicesGridSection from '@/components/ServicesGridSection'
import RevealOnScroll from '@/components/RevealOnScroll'
import ContactInfoCTA from '@/components/ContactInfoCTA'

export default function ServicesPage() {
  return (
    <div>
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <ServicesHeroSection />
        <ServicesGridSection />
      </Suspense>
      <RevealOnScroll>
        <ContactInfoCTA />
      </RevealOnScroll>
    </div>
  )
}
