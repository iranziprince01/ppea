'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface HomePageData {
  trustedBy: {
    title: string
    subtitle: string
    logos: Array<{
      _key: string
      logo: any
      name: string
      link?: string
    }>
  }
}

export default function TrustedBySection() {
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

  const defaultLogos = [
    { _key: '1', logo: '/assets/Population Media Center.jpg', name: 'Population Media Center', link: '#' },
    { _key: '2', logo: '/assets/toni-blair.jpg', name: 'Toni Blair', link: '#' },
    { _key: '3', logo: '/assets/AJPRODHO-JIJUKIRWA.jpg', name: 'AJPRODHO-JIJUKIRWA', link: '#' },
    { _key: '4', logo: '/assets/ECOBank.png', name: 'ECOBank', link: '#' },
    { _key: '5', logo: '/assets/copedu.jpg', name: 'Copedu', link: '#' },
    { _key: '6', logo: '/assets/Rwanda-Law-Reform-Commission.jpg', name: 'Rwanda Law Reform Commission', link: '#' },
    { _key: '7', logo: '/assets/Deseret International Charities.png', name: 'Deseret International Charities', link: '#' },
    { _key: '8', logo: '/assets/oxfam.jpg', name: 'Oxfam', link: '#' },
    { _key: '9', logo: '/assets/wayamo-foundation.jpg', name: 'Wayamo Foundation', link: '#' },
    { _key: '10', logo: '/assets/BPR Bank.jpg', name: 'BPR Bank', link: '#' },
    { _key: '11', logo: '/assets/Equity Rwanda plc.png', name: 'Equity Rwanda', link: '#' },
    { _key: '12', logo: '/assets/UAP-RWANDA.jpg', name: 'UAP Rwanda', link: '#' },
    { _key: '13', logo: '/assets/MUA.jpg', name: 'MUA', link: '#' },
    { _key: '14', logo: '/assets/RMS.jpg', name: 'RMS', link: '#' },
    { _key: '15', logo: '/assets/CoK.jpg', name: 'CoK', link: '#' },
    { _key: '16', logo: '/assets/Salesians of Don Bosco AGL Province.jpg', name: 'Salesians of Don Bosco', link: '#' },
    { _key: '17', logo: '/assets/The Church of Jesus Christ of Latter-Day Saints.jpg', name: 'The Church of Jesus Christ', link: '#' },
    { _key: '18', logo: '/assets/Primate Safaris.jpg', name: 'Primate Safaris', link: '#' },
    { _key: '19', logo: '/assets/Tract Afrique.jpg', name: 'Tract Afrique', link: '#' },
    { _key: '20', logo: '/assets/Orient Park Hotel.jpg', name: 'Orient Park Hotel', link: '#' },
    { _key: '21', logo: '/assets/BDF.jpg', name: 'BDF', link: '#' },
    { _key: '22', logo: '/assets/BRD.jpg', name: 'BRD', link: '#' },
    { _key: '23', logo: '/assets/ITEC Engineering ltd.jpg', name: 'ITEC Engineering', link: '#' },
    { _key: '24', logo: '/assets/Kobil-Rubis.jpg', name: 'Kobil Rubis', link: '#' },
    { _key: '25', logo: '/assets/legal-aid-forum.jpg', name: 'Legal Aid Forum', link: '#' },
    { _key: '26', logo: '/assets/Haguruka.jpg', name: 'Haguruka', link: '#' },
    { _key: '27', logo: '/assets/Gabiro Agri Busness hub.jpg', name: 'Gabiro Agri Business Hub', link: '#' },
    { _key: '28', logo: '/assets/Umurage Communication for Development.jpg', name: 'Umurage Communication', link: '#' },
    { _key: '29', logo: '/assets/Ligue des droits de la Personne dans la région des Grands Lacs (LDGL).jpg', name: 'LDGL', link: '#' }
  ]

  const displayLogos = homeData?.trustedBy?.logos || defaultLogos

  if (loading) {
    return (
      <section className="section-padding bg-white">
        <div className="container-max">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading trusted partners...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Trusted <span className="text-primary-600">By</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We are proud to serve clients across various sectors, building lasting partnerships based on trust and excellence.
          </p>
        </motion.div>

        {/* Logos Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8"
        >
          {displayLogos.map((logo) => (
            <motion.div
              key={logo._key}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="group flex items-center justify-center p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300"
            >
              {logo.logo ? (
                <img 
                  src={logo.logo} 
                  alt={logo.name} 
                  className="max-w-full max-h-16 object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300" 
                />
              ) : (
                <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center">
                  <span className="text-gray-400 text-xs text-center">{logo.name}</span>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
