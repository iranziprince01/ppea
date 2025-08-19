'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { ChevronDown, Download, Users, Award, Globe } from 'lucide-react'

interface HomePageData {
  hero: {
    title: string
    subtitle: string
    description: string
  }
}

export default function HeroSection() {
  const [homeData, setHomeData] = useState<HomePageData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const data = await null
        setHomeData(data)
      } catch (error) {
        console.error('Error fetching home data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  const scrollToContact = () => {
    const contactSection = document.getElementById('contact')
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const downloadCompanyProfile = () => {
    // This would link to the actual company profile PDF
    const link = document.createElement('a')
    link.href = '/assets/company-profile.pdf' // Placeholder path
    link.download = 'Probity-Partners-East-Africa-Company-Profile.pdf'
    link.click()
  }

  if (loading) {
    return (
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-primary-800 to-secondary-900">
        <div className="w-16 h-16 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
      </section>
    )
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="w-full h-full object-cover"
        >
          <source src="/assets/hero-bg.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-primary-900/60"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-screen py-20">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="text-left space-y-8"
          >
            {/* Main Title */}
            <div className="space-y-4">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-6xl md:text-7xl lg:text-8xl font-display font-bold leading-tight"
              >
                <span className="block text-white mb-2">
                  Leading Legal Experts
                </span>
                <span className="block text-4xl md:text-5xl lg:text-6xl text-blue-300">
                  in East Africa
                </span>
              </motion.h1>
            </div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="space-y-4"
            >
              <p className="text-xl md:text-2xl text-gray-200 leading-relaxed max-w-lg">
                Providing exceptional legal services across East Africa with unmatched dedication and expertise.
              </p>
              <p className="text-lg text-gray-300 leading-relaxed max-w-lg">
                Formerly known as Bona Fide Law Chambers, we are a regional law firm serving East Africa, headquartered in Kigali, Rwanda since 2011.
              </p>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 pt-4"
            >
              <button
                onClick={scrollToContact}
                className="bg-primary-600 hover:bg-primary-700 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 transform hover:scale-105 border-2 border-primary-500 group"
              >
                Get in Touch
                <span className="ml-2 group-hover:translate-x-1 transition-transform duration-300">→</span>
              </button>
              <button
                onClick={downloadCompanyProfile}
                className="bg-white hover:bg-gray-100 text-primary-900 font-bold text-lg px-8 py-4 rounded-xl shadow-2xl hover:shadow-white/50 transition-all duration-300 transform hover:scale-105 border-2 border-white"
              >
                ↓ Company Profile
              </button>
            </motion.div>
          </motion.div>

          {/* Right Content - Stats Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="space-y-6"
          >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.0 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="text-3xl font-bold text-white mb-2">15+</div>
                <div className="text-sm text-gray-200">Years Experience</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="text-3xl font-bold text-white mb-2">Fast</div>
                <div className="text-sm text-gray-200">Response Time</div>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20"
              >
                <div className="text-3xl font-bold text-white mb-2">Multi</div>
                <div className="text-sm text-gray-200">Practice Areas</div>
              </motion.div>
            </div>

            {/* Additional Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.3 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            >
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                <span className="text-white font-medium">Trusted by 500+ Clients</span>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                <span className="text-white font-medium">East Africa Coverage</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-400 rounded-full"></div>
                <span className="text-white font-medium">24/7 Legal Support</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
