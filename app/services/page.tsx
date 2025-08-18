import { Suspense } from 'react'
import ServicesHeroSection from '@/components/ServicesHeroSection'
import ServicesGridSection from '@/components/ServicesGridSection'
import ContactInfoCTA from '@/components/ContactInfoCTA'

export default function ServicesPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <ServicesHeroSection />
        <ServicesGridSection />
      </Suspense>

      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <ContactInfoCTA />
      </Suspense>
    </div>
  )
}
