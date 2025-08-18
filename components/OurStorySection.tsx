'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface OurStory {
  heading?: string
  content?: any[]
  image?: any
}

export default function OurStorySection() {
  const [storyData, setStoryData] = useState<OurStory>({})

  useEffect(() => {
    const fetchStoryData = async () => {
      try {
        // Simulating API call - replace with actual data fetching
        const data: any = null
        setStoryData(data?.ourStory || {})
      } catch (error) {
        console.error('Error fetching story data:', error)
      }
    }

    fetchStoryData()
  }, [])

  const defaultHeading = "Our Story"
  const defaultContent = "Founded with a vision to provide exceptional legal services across East Africa, Probity Partners has grown from a small practice to one of the region's most respected law firms. Our journey is marked by unwavering commitment to integrity, excellence, and client success."
  const defaultImage = null

  const heading = storyData.heading || defaultHeading
  const content = storyData.content || [{ children: [{ text: defaultContent }] }]
  const image = storyData.image || defaultImage

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900">
              {heading === "Our Story" ? (
                <>Our <span className="text-primary-600">Story</span></>
              ) : (
                heading
              )}
            </h2>
            
            <div className="prose prose-lg text-gray-600 space-y-6">
              {content.map((block: any, index) => (
                <p key={index} className="text-lg leading-relaxed">
                  {block.children?.[0]?.text || block}
                </p>
              ))}
            </div>

            <div className="flex items-center space-x-8 pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">25+ Years Experience</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">500+ Cases Won</span>
              </div>
            </div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <img
                src="/assets/about-teaser.jpg"
                alt="Our Story"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
