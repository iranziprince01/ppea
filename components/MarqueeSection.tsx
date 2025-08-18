'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function MarqueeSection() {
  const [marqueeHeadings, setMarqueeHeadings] = useState<string[]>([])

  useEffect(() => {
    const fetchMarqueeData = async () => {
      try {
        // Simulating API call - replace with actual data fetching
        const data: any = null
        setMarqueeHeadings(data?.marqueeHeadings || [])
      } catch (error) {
        console.error('Error fetching marquee data:', error)
      }
    }

    fetchMarqueeData()
  }, [])

  const defaultHeadings = [
    "Corporate Law Excellence",
    "Litigation Success",
    "Real Estate Expertise"
  ]

  const headings = marqueeHeadings.length > 0 ? marqueeHeadings : defaultHeadings

  return (
    <section className="bg-primary-700 py-12 overflow-hidden">
      <div className="relative">
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: '-100%' }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'linear'
          }}
          className="flex space-x-16 whitespace-nowrap"
        >
          {headings.map((heading, index) => (
            <div
              key={index}
              className="text-white text-2xl md:text-3xl font-semibold tracking-wide"
            >
              {heading}
            </div>
          ))}
          {/* Duplicate for seamless loop */}
          {headings.map((heading, index) => (
            <div
              key={`duplicate-${index}`}
              className="text-white text-2xl md:text-3xl font-semibold tracking-wide"
            >
              {heading}
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
