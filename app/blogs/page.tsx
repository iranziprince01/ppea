import { Suspense } from 'react'
import BlogsHeroSection from '@/components/BlogsHeroSection'
import BlogsGridSection from '@/components/BlogsGridSection'

export default function BlogsPage() {
  return (
    <div className="pt-20">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>
        <BlogsHeroSection />
      </Suspense>
      
      <Suspense fallback={<div>Loading...</div>}>
        <BlogsGridSection />
      </Suspense>
    </div>
  )
}
