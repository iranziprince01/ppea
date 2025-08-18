'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { activeClient, teamMembersQuery } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'
import { ArrowRight, Linkedin, Mail, ChevronRight } from 'lucide-react'

interface TeamMember {
  _id: string
  name: string
  position: string
  shortBio: string
  photo: any
  slug: { current: string }
  isPartner: boolean
  specialties: string[]
}

export default function TeamPreviewSection() {

  // Define the top 3 featured team members for home page
  const featuredTeamMembers = [
    {
      _id: '1',
      name: 'Adv. KAYIGAMBA UMULISA ALICE',
      position: 'Managing Partner',
      shortBio: 'Senior Lawyer | Legal Strategist | Legal Consultant | Legal Scholar | Expert in Human Rights | Specialist in Public International Law | Banking and Commercial Practice',
      photo: '/assets/Profile pictures/Alice.jpg',
      slug: { current: 'alice-umulisa' },
      isPartner: true,
      specialties: ['Corporate Law', 'Strategic Legal Counsel', 'Leadership', 'Human Rights', 'Public International Law', 'Banking and Commercial Practice']
    },
    {
      _id: '2',
      name: 'Adv. Keza Ntaganda Lys',
      position: 'Associate',
      shortBio: 'Corporate | Banking & Finance Law | Arbitration & Humanitarian Law Practitioner',
      photo: '/assets/Profile pictures/Keza.jpg',
      slug: { current: 'keza-ntaganda' },
      isPartner: false,
      specialties: ['Corporate Law', 'Banking & Finance', 'Arbitration', 'Humanitarian Law']
    },
    {
      _id: '3',
      name: 'Dr. Munyamahoro Rene',
      position: 'Senior Associate',
      shortBio: 'PhD, LLM, LL.B | Advocate | Legal Scholar | Expert in International Investment Law & Human Rights',
      photo: '/assets/Profile pictures/Rene.jpg',
      slug: { current: 'rene-munyamahoro' },
      isPartner: true,
      specialties: ['International Investment Law', 'Human Rights', 'Business Transactions', 'Contract Law']
    }
  ]

  // For home page, always use the featured team members
  const teamMembers = featuredTeamMembers
  const loading = false

  const defaultHeading = "Meet Our Featured Attorneys"
  const defaultDescription = "Meet some of our key legal professionals who are dedicated to providing exceptional service and achieving the best possible outcomes for our clients."

  if (loading) {
    return (
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading team members...</p>
          </div>
        </div>
      </section>
    )
  }

  const heading = defaultHeading
  const description = defaultDescription

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
            Meet Our <span className="text-primary-600">Attorneys</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our experienced legal professionals are dedicated to providing exceptional service and achieving the best outcomes for our clients.
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={member._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              {/* Member Photo */}
              <div className="relative h-64 overflow-hidden bg-gray-50">
                {member.photo ? (
                  <div className="w-full h-full flex items-center justify-center p-2">
                    <img
                      src={typeof member.photo === 'string' ? member.photo : urlFor(member.photo).url()}
                      alt={member.name}
                      className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                    />
                  </div>
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
                  <ChevronRight className="w-4 h-4 ml-1" />
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
