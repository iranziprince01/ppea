import { Suspense } from 'react'
import AboutHeroSection from '@/components/AboutHeroSection'
import FirmHistorySection from '@/components/FirmHistorySection'
import MissionSection from '@/components/MissionSection'
import ValuesSection from '@/components/ValuesSection'
import ContactInfoCTA from '@/components/ContactInfoCTA'

export default function AboutPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <AboutHeroSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <FirmHistorySection />
      </Suspense>
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <MissionSection />
      </Suspense>
      
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <ValuesSection />
      </Suspense>
      
      {/* Contact CTA Section */}
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <ContactInfoCTA />
      </Suspense>
    </div>
  )
}
