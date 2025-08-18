'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { activeClient, teamMembersQuery } from '@/lib/sanity.client'
import Link from 'next/link'

interface TeamOverview {
  heading?: string
  content?: any[]
  stats?: Array<{
    number: string
    label: string
  }>
}

interface TeamMember {
  _id: string
  name: string
  position: string
  shortBio: string
  photo: string
  slug: {
    current: string
  }
}

export default function TeamOverviewSection() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const data = await activeClient.fetch(teamMembersQuery)
        setTeamMembers(data || [])
      } catch (error) {
        console.error('Error fetching team data:', error)
        setTeamMembers([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeamData()
  }, [])

  // Default team members if CMS data is not available
  const defaultTeamMembers = [
    { _id: '1', name: 'Me Alice Umulisa Kayigamba', position: 'Managing Partner', shortBio: 'Leading our firm with over 15 years of experience in corporate law and strategic legal counsel.', photo: '/assets/UMULISA Alice.jpg', slug: { current: 'alice-umulisa' } },
    { _id: '2', name: 'Aloys Ntirushwamaboko', position: 'Senior Partner', shortBio: 'Specializing in litigation and dispute resolution with a track record of successful case outcomes.', photo: '/assets/Aloys Ntirushwamaboko.jpg', slug: { current: 'aloys-ntirushwamaboko' } },
    { _id: '3', name: 'Evode Kayitana', position: 'Partner', shortBio: 'Expert in real estate law and corporate transactions, providing strategic legal solutions.', photo: '/assets/KAYITANA Evode.jpeg', slug: { current: 'evode-kayitana' } }
  ]

  const displayTeamMembers = teamMembers.length > 0 ? teamMembers : defaultTeamMembers

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team information...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Our <span className="text-primary-600">Team</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who make it all possible
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayTeamMembers.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Member Photo */}
              <div className="relative h-64 overflow-hidden">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full bg-primary-100 flex items-center justify-center">
                    <div className="text-center text-primary-400">
                      <div className="w-20 h-20 bg-primary-200 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="text-2xl font-bold">
                          {member.name ? member.name.split(' ').map((n: string) => n[0]).join('') : 'M'}
                        </span>
                      </div>
                      <p className="text-sm">Photo</p>
                    </div>
                  </div>
                )}
              </div>

              {/* Member Info */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-600 font-medium mb-3">
                  {member.position}
                </p>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {member.shortBio}
                </p>
                <Link
                  href={`/team/${member.slug.current}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  View Profile
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Team Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link
            href="/team"
            className="btn-primary text-lg px-8 py-4"
          >
            View All Team Members
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
