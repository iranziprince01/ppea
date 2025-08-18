'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Scale, 
  Users, 
  Shield, 
  Clock, 
  Award, 
  Globe,
  Gavel,
  Building
} from 'lucide-react'

interface WhyChooseUs {
  heading?: string
  reasons?: Array<{
    title: string
    description: string
    icon: string
  }>
}

const iconMap: { [key: string]: React.ComponentType<any> } = {
  'scale': Scale,
  'users': Users,
  'shield': Shield,
  'clock': Clock,
  'award': Award,
  'globe': Globe,
  'gavel': Gavel,
  'building': Building,
}

export default function WhyChooseUsSection() {
  const [whyChooseUsData, setWhyChooseUsData] = useState<WhyChooseUs>({})

  useEffect(() => {
    const fetchWhyChooseUsData = async () => {
      try {
        // Simulating API call - replace with actual data fetching
        const data: any = null
        setWhyChooseUsData(data?.whyChooseUs || {})
      } catch (error) {
        console.error('Error fetching why choose us data:', error)
      }
    }

    fetchWhyChooseUsData()
  }, [])

  const defaultHeading = "Why Choose Us"
  const defaultReasons = [
    {
      title: "Expert Legal Team",
      description: "Our attorneys bring decades of combined experience across all major practice areas.",
      icon: "users"
    },
    {
      title: "Proven Track Record",
      description: "We have successfully handled thousands of cases with exceptional outcomes.",
      icon: "award"
    },
    {
      title: "Client-Focused Approach",
      description: "Every case is handled with personalized attention and strategic planning.",
      icon: "shield"
    },
    {
      title: "Timely Solutions",
      description: "We understand the urgency of legal matters and deliver efficient solutions.",
      icon: "clock"
    },
    {
      title: "Local Expertise",
      description: "Deep understanding of East African legal systems and business environments.",
      icon: "globe"
    },
    {
      title: "Comprehensive Services",
      description: "Full-service law firm covering all major legal practice areas.",
      icon: "building"
    }
  ]

  const heading = whyChooseUsData.heading || defaultHeading
  const reasons = whyChooseUsData.reasons || defaultReasons

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
            {heading === "Why Choose Us" ? (
              <>Why Choose <span className="text-primary-600">Us</span></>
            ) : (
              heading
            )}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {reasons[0]?.description || "Our commitment to excellence and client success sets us apart"}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reasons.map((reason, index) => {
            const IconComponent = iconMap[reason.icon] || Users
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-gray-200 rounded-2xl p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-16 h-16 bg-primary-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <IconComponent className="w-8 h-8 text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">
                  {reason.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {reason.description}
                </p>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
