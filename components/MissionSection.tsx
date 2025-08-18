'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface Mission {
  heading?: string
  content?: any[]
  missionImage?: any
}

export default function MissionSection() {
  const [missionData, setMissionData] = useState<Mission>({})

  useEffect(() => {
    const fetchMissionData = async () => {
      try {
        // Simulating API call - replace with actual data fetching
        const data: any = null
        setMissionData(data?.mission || {})
      } catch (error) {
        console.error('Error fetching mission data:', error)
      }
    }

    fetchMissionData()
  }, [])

  const defaultHeading = "Our Mission"
  const defaultContent = "To provide exceptional legal services with integrity, professionalism, and unwavering commitment to our clients' success, while contributing to the development of a just and equitable legal system in East Africa."
  const defaultImage = null

  const heading = missionData.heading || defaultHeading
  const content = missionData.content || [{ children: [{ text: defaultContent }] }]
  const image = missionData.missionImage || defaultImage

  return (
    <section className="py-20 bg-gray-50">
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
              Our <span className="text-primary-600">Mission</span>
            </h2>
            
            <div className="prose prose-lg text-gray-600 space-y-6">
              <p className="text-lg leading-relaxed">
                To provide exceptional legal services that empower our clients to achieve their goals while maintaining the highest standards of integrity and professionalism.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Client Empowerment</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Integrity First</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Professional Excellence</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 bg-primary-500 rounded-full"></div>
                <span className="text-gray-700 font-medium">Innovation</span>
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
            <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="/assets/teaser2.jpg"
                alt="Our Mission"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
