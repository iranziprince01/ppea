'use client'

import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setIsVisible(window.scrollY > 400)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <button
      aria-label="Back to top"
      onClick={scrollToTop}
      className={`fixed bottom-6 right-6 z-[60] transition-all duration-300 focus:outline-none group ${
        isVisible ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}
    >
      <span className="relative inline-flex items-center justify-center w-12 h-12 rounded-2xl shadow-2xl">
        {/* Branded gradient background */}
        <span className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900"></span>
        <span className="absolute -inset-0.5 rounded-2xl bg-primary-500/30 blur-md group-hover:bg-primary-500/40 transition-colors"></span>
        <ArrowUp className="relative z-10 w-6 h-6 text-white" />
      </span>
    </button>
  )
}


