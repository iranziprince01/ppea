import { Suspense } from 'react'
import TeamMemberProfile from '@/components/TeamMemberProfile'

interface PageProps {
  params: {
    slug: string
  }
}

export default function TeamMemberPage({ params }: PageProps) {
  return (
    <Suspense fallback={
      <div className="pt-20">
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading profile...</p>
          </div>
        </div>
      </div>
    }>
      <TeamMemberProfile slug={params.slug} />
    </Suspense>
  )
}
