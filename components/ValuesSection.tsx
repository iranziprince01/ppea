'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Shield, Scale, Users, Heart, Lightbulb, Target } from 'lucide-react'

interface Values {
  heading?: string
  valuesList?: Array<{
    title: string
    description: string
    icon: string
  }>
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  'shield': Shield,
  'scale': Scale,
  'users': Users,
  'heart': Heart,
  'lightbulb': Lightbulb,
  'target': Target,
}

export default function ValuesSection() {
  const [valuesData, setValuesData] = useState<Values>({})

  useEffect(() => {
    const fetchValuesData = async () => {
      try {
        // Simulating API call - replace with actual data fetching
        const data: any = null
        setValuesData(data?.values || {})
      } catch (error) {
        console.error('Error fetching values data:', error)
      }
    }

    fetchValuesData()
  }, [])

  const defaultHeading = "Our Core Values"
  const defaultValues = [
    {
      title: "Integrity",
      description: "We uphold the highest ethical standards in all our dealings.",
      icon: "shield"
    },
    {
      title: "Excellence",
      description: "We strive for excellence in every aspect of our legal services.",
      icon: "target"
    },
    {
      title: "Client Focus",
      description: "Our clients' success is our primary objective and motivation.",
      icon: "users"
    },
    {
      title: "Innovation",
      description: "We embrace new approaches and technologies to better serve our clients.",
      icon: "lightbulb"
    },
    {
      title: "Justice",
      description: "We are committed to upholding the principles of justice and fairness.",
      icon: "scale"
    },
    {
      title: "Community",
      description: "We actively contribute to the development of our communities.",
      icon: "heart"
    }
  ]

  const heading = valuesData.heading || defaultHeading
  const values = valuesData.valuesList || defaultValues

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-primary-600">Values</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            The principles that guide everything we do
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group relative bg-gray-200 rounded-3xl p-8 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-gray-200 hover:border-primary-200 overflow-hidden"
            >
              {/* Background Pattern */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-200/40 to-transparent rounded-full blur-3xl group-hover:scale-150 transition-transform duration-500"></div>
              
              {/* Icon Container */}
              <div className="relative z-10 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-300 shadow-lg group-hover:shadow-primary-500/25">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary-600 group-hover:text-primary-700 transition-colors duration-300">
                      {index + 1}
                    </span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 text-center">
                <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-primary-600 transition-colors duration-300">
                  {value.title}
                </h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {value.description}
                </p>
              </div>

              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-primary-200/50 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
