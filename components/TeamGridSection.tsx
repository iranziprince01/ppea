'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { activeClient, teamMembersQuery } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'
import { ArrowRight, Linkedin, Mail, Star, Award, Globe, Users } from 'lucide-react'

interface TeamMember {
  _id: string
  name: string
  position: string
  shortBio?: string
  bio?: string
  photo: any
  slug: { current: string }
  isPartner: boolean
  specialties: string[]
}

export default function TeamGridSection() {
  const defaultTeamMembers = [
    {
      _id: '1',
      name: 'Adv. KAYIGAMBA UMULISA ALICE',
      position: 'Managing Partner',
      shortBio: 'Senior Lawyer | Legal Strategist | Legal Consultant | Legal Scholar | Expert in Human Rights | Specialist in Public International Law | Banking and Commercial Practice',
      photo: '/assets/Profile pictures/Alice.jpg',
      slug: { current: 'alice-umulisa' },
      isPartner: true,
      specialties: ['Corporate Law', 'Strategic Legal Counsel', 'Leadership', 'Human Rights', 'Public International Law']
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
    },
    {
      _id: '4',
      name: 'Dr Furaha Umutoni Alida',
      position: 'Senior Associate',
      shortBio: 'PhD, Master: Human Rights, LL.B | Senior Researcher | Specialist in Gender, Identity & Peacebuilding',
      photo: '/assets/Profile pictures/Furaha.jpg',
      slug: { current: 'furaha-umutoni' },
      isPartner: true,
      specialties: ['Gender Issues', 'Identity', 'Peacebuilding', 'Human Rights']
    },
    {
      _id: '5',
      name: 'Adv. Mukashema Marie Louise',
      position: 'Senior Associate',
      shortBio: 'Senior Advocate | Criminal Defense & Family Law Specialist | Legal Strategist',
      photo: '/assets/Profile pictures/Louise.png',
      slug: { current: 'mukashema-louise' },
      isPartner: false,
      specialties: ['Criminal Defense', 'Family Law', 'Legal Strategy', 'Victim Protection']
    },
    {
      _id: '6',
      name: 'Adv. Aloys Ntirushwamaboko',
      position: 'Senior Associate',
      shortBio: 'LL.M, LL.B, DLP | Advocate | Legal Advisor | Specialist in Public International Law & Commercial Practice',
      photo: '/assets/Profile pictures/Aloys.jpg',
      slug: { current: 'aloys-ntirushwamaboko' },
      isPartner: true,
      specialties: ['Public International Law', 'Commercial Practice', 'Legal Advisory', 'Corporate Law']
    },
    {
      _id: '7',
      name: 'Adv. Aziza Lola',
      position: 'Senior Associate',
      shortBio: 'Legal Analyst | Specialist in Criminal Justice & Victim Advocacy',
      photo: '/assets/Profile pictures/Aziza.jpg',
      slug: { current: 'aziza-lola' },
      isPartner: true,
      specialties: ['Criminal Justice', 'Victim Advocacy', 'Transitional Justice', 'Legal Analysis']
    },
    {
      _id: '8',
      name: 'Adv. Jules Lambert Ineza',
      position: 'Senior Associate',
      shortBio: 'Advocate | Legal Consultant | Researcher in Justice and Development',
      photo: '/assets/Profile pictures/Jules.jpg',
      slug: { current: 'jules-lambert' },
      isPartner: true,
      specialties: ['Legal Research', 'Justice Development', 'Legal Aid', 'Policy Research']
    },
    {
      _id: '9',
      name: 'Adv. BAKUNDA Emmanuel',
      position: 'Senior Associate',
      shortBio: 'Legal Advisor | IP & Business Law Enthusiast',
      photo: '/assets/Profile pictures/Emmanuel.jpg',
      slug: { current: 'bakunda-emmanuel' },
      isPartner: false,
      specialties: ['Intellectual Property', 'Business Law', 'Corporate Governance', 'Legal Drafting']
    },
    {
      _id: '10',
      name: 'Anny Princia Habiyaremye',
      position: 'Legal Consultant',
      shortBio: 'Administrative & Employment Law Specialist | Legal Professional',
      photo: '/assets/Profile pictures/Princia.jpg',
      slug: { current: 'anny-princia' },
      isPartner: false,
      specialties: ['Administrative Law', 'Employment Law', 'Legal Research', 'Cross-jurisdictional Practice']
    },
    {
      _id: '11',
      name: 'Mary Stella Irasubiza',
      position: 'Junior Legal Associate',
      shortBio: 'Legal Researcher | Court & Document Drafter',
      photo: '/assets/Profile pictures/Stella.jpg',
      slug: { current: 'mary-stella' },
      isPartner: false,
      specialties: ['Legal Research', 'Document Drafting', 'Court Submissions', 'Legal Support']
    },
    {
      _id: '12',
      name: 'Muhire Herve',
      position: 'IT Support Specialist',
      shortBio: 'IT support specialist / Software engineer / Passionate Graphic designer',
      photo: '/assets/Profile pictures/Herve.jpg',
      slug: { current: 'muhire-herve' },
      isPartner: false,
      specialties: ['IT Support', 'Software Engineering', 'Graphic Design', 'System Administration']
    },
    {
      _id: '13',
      name: 'NTAGANDA Ganza Dan',
      position: 'IT Support Specialist',
      shortBio: 'IT support specialist / Software engineer / Passionate Graphic designer',
      photo: '/assets/Profile pictures/Ganza.jpg',
      slug: { current: 'ntaganda-ganza' },
      isPartner: false,
      specialties: ['IT Support', 'Software Engineering', 'System Security', 'Legal Sector IT']
    }
  ]

  // Temporarily disable Sanity fetching to test basic rendering
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>(defaultTeamMembers)
  const [loading, setLoading] = useState(false)

  // useEffect(() => {
  //   const fetchTeamMembers = async () => {
  //     try {
  //       if (!activeClient) {
  //         setTeamMembers(defaultTeamMembers)
  //         setLoading(false)
  //         return
  //       }

  //       const membersData = await activeClient.fetch(teamMembersQuery)
  //       setTeamMembers(membersData || [])
  //     } catch (error) {
  //       console.error('Error fetching team members:', error)
  //       setTeamMembers(defaultTeamMembers)
  //       }
  //     } finally {
  //       setLoading(false)
  //     }
  //   }

  //   fetchTeamMembers()
  // }, [])

  // Always use Sanity data if available, otherwise fall back to default
  const displayTeamMembers = teamMembers.length > 0 ? teamMembers : defaultTeamMembers

  if (loading) {
    return (
      <section className="py-20 bg-white">
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
    <section className="py-20 bg-white">
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
            Our <span className="text-primary-600">Legal Professionals</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Meet the dedicated professionals who make it all possible
          </p>
        </motion.div>

        {/* Team Grid */}
        <div className="w-full">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-16">
            {displayTeamMembers.map((member, index) => (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Member Photo */}
                <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-gray-50">
                  {member.photo ? (
                    <div className="w-full h-full flex items-center justify-center p-3">
                      <img
                        src={typeof member.photo === 'string' ? member.photo : urlFor(member.photo).url()}
                        alt={member.name}
                        className="w-full h-full object-cover rounded-lg hover:scale-105 transition-transform duration-500"
                        loading="lazy"
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
                <div className="p-4 sm:p-6">
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 line-clamp-2">
                    {member.name}
                  </h3>
                  <p className="text-primary-600 font-medium mb-3 text-sm sm:text-base">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                    {member.shortBio || (member as any).bio || `Experienced legal professional specializing in ${member.specialties?.join(', ') || 'legal services'}.`}
                  </p>
                  {/* View Profile Button */}
                  <Link
                    href={`/team/${member.slug.current}`}
                    className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-all duration-300 pt-2"
                  >
                    <span>View Profile</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
