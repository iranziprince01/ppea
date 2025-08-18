'use client'

import { Suspense } from 'react'
import { notFound } from 'next/navigation'
import { motion } from 'framer-motion'
import { ExternalLink, Users, Shield, FileText, Globe, Building, Award, Briefcase, Target, CheckCircle, FileCheck, Gavel, Scale, BookOpen, Zap, Heart, Eye, Lock, Star, TrendingUp } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'

// Service data based on the website information
const servicesData = {
  'banking-and-finance': {
    title: 'Banking and Finance',
    description: 'We provide our clients with banking and financial legal support through handling legal issues that may arise from contractual legal binds associated with loans and borrowing. We provide regulatory and licensing advice to our clients, as well as procurement and drafting of standard form documentation.',
    icon: Shield,
    clients: [
      { name: 'Ecobank', logo: '/assets/ECOBank.png' },
      { name: 'Equity Rwanda PLC', logo: '/assets/Equity Rwanda plc.png' },
      { name: 'BPR Bank', logo: '/assets/BPR Bank.jpg' },
      { name: 'Rwanda Medical Supply Ltd', logo: '/assets/RMS.jpg' },
      { name: 'Business Development Fund', logo: '/assets/BDF.jpg' },
      { name: 'Orient Park Hotel', logo: '/assets/Orient Park Hotel.jpg' }
    ],
    features: [
      { text: 'Regulatory and licensing advice', icon: Scale },
      { text: 'Contract drafting and preparation', icon: FileCheck },
      { text: 'Legal documentation services', icon: FileText },
      { text: 'Legal opinions and guidance', icon: BookOpen },
      { text: 'Procedural compliance assurance', icon: CheckCircle }
    ]
  },
  'insurance': {
    title: 'Insurance',
    description: 'We provide legal aid in terms of insurance law. Insurance law is the collection of laws and regulations that relate to insurance. Insurance is a contract between two parties.',
    icon: Shield,
    clients: [
      { name: 'MUA Insurance Rwanda', logo: '/assets/MUA.jpg' },
      { name: 'UAP Insurance Rwanda Ltd', logo: '/assets/UAP-RWANDA.jpg' }
    ],
    features: [
      { text: 'Insurance law compliance', icon: Shield },
      { text: 'Contract review and negotiation', icon: FileCheck },
      { text: 'Risk assessment and management', icon: Eye },
      { text: 'Claims handling support', icon: CheckCircle },
      { text: 'Regulatory guidance', icon: Scale }
    ]
  },
  'labour-and-administration': {
    title: 'Labour and Administration',
    description: 'With the ever-expanding labour market, managing relationships between employer and employee is a dire necessity. We provide labour law services including contract preparation, negotiation, and representation.',
    icon: Users,
    clients: [
      { name: 'Tract Afrique', logo: '/assets/Tract Afrique.jpg' },
      { name: 'Primate Safaris', logo: '/assets/Primate Safaris.jpg' },
      { name: 'City of Kigali', logo: '/assets/CoK.jpg' },
      { name: 'Rwanda Medical Supply Ltd', logo: '/assets/RMS.jpg' },
      { name: 'Business Development Fund', logo: '/assets/BDF.jpg' },
      { name: 'Orient Park Hotel', logo: '/assets/Orient Park Hotel.jpg' },
      { name: 'Rwanda Development Bank', logo: '/assets/BRD.jpg' },
      { name: 'Kobil-Rubis', logo: '/assets/Kobil-Rubis.jpg' }
    ],
    features: [
      { text: 'Employment contract preparation', icon: FileText },
      { text: 'Labour dispute resolution', icon: Gavel },
      { text: 'Regulatory compliance', icon: CheckCircle },
      { text: 'Workplace policy development', icon: BookOpen },
      { text: 'Employee rights protection', icon: Shield }
    ]
  },
  'contracts': {
    title: 'Contracts',
    description: 'Contract related legal assistance is a service desired by most of our clients. We offer contractual legal services including drafting, preparing, negotiating, and analysing contracts of all types.',
    icon: FileText,
    clients: [
      { name: 'Kobil-Rubis', logo: '/assets/Kobil-Rubis.jpg' },
      { name: 'The Church of Jesus Christ of Latter-Day Saints', logo: '/assets/The Church of Jesus Christ of Latter-Day Saints.jpg' },
      { name: 'Salesians of Don Bosco AGL Province', logo: '/assets/Salesians of Don Bosco AGL Province.jpg' },
      { name: 'Orient Park Hotel', logo: '/assets/Orient Park Hotel.jpg' },
      { name: 'Tract Afrique', logo: '/assets/Tract Afrique.jpg' },
      { name: 'Primate Safaris', logo: '/assets/Primate Safaris.jpg' }
    ],
    features: [
      { text: 'Contract drafting and preparation', icon: FileText },
      { text: 'Negotiation support', icon: Users },
      { text: 'Contract analysis and review', icon: FileCheck },
      { text: 'Dispute resolution', icon: Gavel },
      { text: 'Legal representation', icon: Briefcase }
    ]
  },
  'taxation': {
    title: 'Taxation',
    description: 'PPEA offers comprehensive tax services to handle international trade and commercial operations. We assist with complex tax issues and provide guidance on national and international tax matters.',
    icon: Building,
    clients: [
      { name: 'Kobil-Rubis', logo: '/assets/Kobil-Rubis.jpg' },
      { name: 'Orient Park Hotel', logo: '/assets/Orient Park Hotel.jpg' },
      { name: 'Tract Afrique', logo: '/assets/Tract Afrique.jpg' },
      { name: 'Primate Safaris', logo: '/assets/Primate Safaris.jpg' }
    ],
    features: [
      { text: 'International tax compliance', icon: Globe },
      { text: 'Tax dispute resolution', icon: Gavel },
      { text: 'Cross-border tax planning', icon: TrendingUp },
      { text: 'Regulatory guidance', icon: Scale },
      { text: 'Comprehensive tax services', icon: CheckCircle }
    ]
  },
  'corporate-and-commercial-law': {
    title: 'Corporate and Commercial Law',
    description: 'We provide corporate and commercial legal services through drafting legal documentation, ensuring procedural compliance, and issuing legal opinions on business matters.',
    icon: Briefcase,
    clients: [
      { name: 'Kobil-Rubis', logo: '/assets/Kobil-Rubis.jpg' },
      { name: 'Rwanda Development Bank', logo: '/assets/BRD.jpg' },
      { name: 'Business Development Fund', logo: '/assets/BDF.jpg' },
      { name: 'Orient Park Hotel', logo: '/assets/Orient Park Hotel.jpg' },
      { name: 'Rwanda Medical Supply Ltd', logo: '/assets/RMS.jpg' },
      { name: 'Tract Afrique', logo: '/assets/Tract Afrique.jpg' },
      { name: 'City of Kigali', logo: '/assets/CoK.jpg' },
      { name: 'Primate Safaris', logo: '/assets/Primate Safaris.jpg' }
    ],
    features: [
      { text: 'Corporate documentation', icon: FileText },
      { text: 'Business formation and structuring', icon: Building },
      { text: 'Regulatory compliance', icon: CheckCircle },
      { text: 'Legal opinions and guidance', icon: BookOpen },
      { text: 'Commercial transaction support', icon: Briefcase }
    ]
  },
  'energy-and-infrastructure': {
    title: 'Energy and Infrastructure',
    description: 'We provide legal assistance in energy law, infrastructure finance, transport, and oil and energy. We understand the commercial, strategic, and technical elements of these industries.',
    icon: Target,
    clients: [
      { name: 'Kobil-Rubis', logo: '/assets/Kobil-Rubis.jpg' },
      { name: 'ITEC Engineering Ltd', logo: '/assets/ITEC Engineering ltd.jpg' }
    ],
    features: [
      { text: 'Energy law expertise', icon: Zap },
      { text: 'Infrastructure finance', icon: Building },
      { text: 'Transport regulations', icon: Globe },
      { text: 'Oil and energy law', icon: Target },
      { text: 'Cross-disciplinary legal support', icon: Star }
    ]
  },
  'human-rights-law': {
    title: 'Human Rights Law',
    description: 'We provide legal aid in terms of human rights law. Human Rights Law exists to help protect our rights as human beings. These human rights are the basic freedoms that every person should be entitled to.',
    icon: Award,
    clients: [
      { name: 'Legal Aid Forum', logo: '/assets/legal-aid-forum.jpg' },
      { name: 'Wayamo Foundation', logo: '/assets/wayamo-foundation.jpg' },
      { name: 'Oxfam', logo: '/assets/oxfam.jpg' },
      { name: 'Deseret International Charities', logo: '/assets/Deseret International Charities.png' },
      { name: 'LDGL', logo: '/assets/Ligue des droits de la Personne dans la région des Grands Lacs (LDGL).jpg' },
      { name: 'AJPRODHO-JIJUKIRWA', logo: '/assets/AJPRODHO-JIJUKIRWA.jpg' },
      { name: 'Tony Blair Institute', logo: '/assets/toni-blair.jpg' },
      { name: 'Population Media Center', logo: '/assets/Population Media Center.jpg' },
      { name: 'Umurage Communication', logo: '/assets/Umurage Communication for Development.jpg' },
      { name: 'Haguruka', logo: '/assets/Haguruka.jpg' }
    ],
    features: [
      { text: 'Human rights protection', icon: Heart },
      { text: 'Legal advocacy', icon: Gavel },
      { text: 'Rights education', icon: BookOpen },
      { text: 'Policy development', icon: FileText },
      { text: 'Community empowerment', icon: Users }
    ]
  },
  'criminal-and-civil-litigation': {
    title: 'Criminal and Civil Litigation',
    description: 'We provide legal aid in terms of criminal law. Criminal law aims to deter and punish conduct which is perceived as threatening, harmful or endangering to the public, its property or moral welfare.',
    icon: Shield,
    clients: [
      { name: 'Rwanda Law Reform Commission', logo: '/assets/Rwanda-Law-Reform-Commission.jpg' }
    ],
    features: [
      { text: 'Criminal defense', icon: Shield },
      { text: 'Civil litigation', icon: Gavel },
      { text: 'Court representation', icon: Briefcase },
      { text: 'Legal strategy', icon: Target },
      { text: 'Case management', icon: FileText }
    ]
  },
  'family-law': {
    title: 'Family Law',
    description: 'We provide legal aid in terms of family law. Family Law focuses on finding solutions to issues relating to often complex legal relationships. These include marriage and parenthood among others.',
    icon: Users,
    clients: [
      { name: 'Various Individuals', logo: '/assets/Avatar.png' }
    ],
    features: [
      { text: 'Marriage and divorce', icon: Heart },
      { text: 'Child custody', icon: Users },
      { text: 'Family mediation', icon: Users },
      { text: 'Property division', icon: Building },
      { text: 'Legal documentation', icon: FileText }
    ]
  },
  'notarisation-and-legalisation': {
    title: 'Notarisation, Research and Legalisation of Documents',
    description: 'PPEA team has a certified and qualified private notary. With this we can offer notary services as well as legalisation of documents to our clients. This service is an official fraud-deterrent process that assures the parties of a transaction that a document is authentic, and can be trusted.',
    icon: FileText,
    clients: [
      { name: 'Various Clients', logo: '/assets/Avatar.png' }
    ],
    features: [
      { text: 'Document notarisation', icon: FileCheck },
      { text: 'Document legalisation', icon: CheckCircle },
      { text: 'Fraud prevention', icon: Lock },
      { text: 'Authentication services', icon: Shield },
      { text: 'Legal research', icon: BookOpen }
    ]
  },
  'intellectual-property': {
    title: 'Registration of Intellectual Property (IP)',
    description: 'PPEA offers specialized services in the registration of Intellectual Property. Our team is equipped to assist clients with registering trademarks, patents, copyrights, and designs, ensuring legal protection for their innovative ideas and creative works.',
    icon: Award,
    clients: [
      { name: 'Innovation Hub', logo: '/assets/Avatar.png' }
    ],
    features: [
      { text: 'Trademark registration', icon: Star },
      { text: 'Patent applications', icon: FileText },
      { text: 'Copyright protection', icon: Lock },
      { text: 'Design registration', icon: Award },
      { text: 'IP strategy and advice', icon: Target }
    ]
  }
}

export default function ServicePage({ params }: { params: { slug: string } }) {
  // Try to find the service
  const service = servicesData[params.slug as keyof typeof servicesData]

  // Debug logging
  console.log('Service page params:', params);
  console.log('Available services:', Object.keys(servicesData));
  console.log('Requested slug:', params.slug);
  console.log('Found service:', service);

  if (!service) {
    console.log('Service not found, calling notFound()');
    
    // Return a simple error page for debugging
    return (
      <div className="pt-20">
        <div className="container-max py-20">
          <h1 className="text-4xl font-bold text-red-600 mb-4">Service Not Found</h1>
          <p className="text-lg text-gray-600 mb-4">Requested slug: {params.slug}</p>
          <p className="text-lg text-gray-600 mb-4">Available services: {Object.keys(servicesData).join(', ')}</p>
          <Link href="/services" className="text-primary-600 hover:underline">
            Back to Services
          </Link>
        </div>
      </div>
    )
  }

  const IconComponent = service.icon

  return (
    <div className="pt-20">
      <Suspense fallback={<div className="h-screen flex items-center justify-center">Loading...</div>}>


        {/* Hero Section */}
        <section className="py-16 bg-gradient-to-br from-primary-50 to-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center max-w-4xl mx-auto"
            >
              <div className="w-20 h-20 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <IconComponent className="w-10 h-10 text-primary-600" />
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
                {service.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                What We <span className="text-primary-600">Offer</span>
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {service.features.map((feature: any, index: number) => {
                const IconComponent = feature.icon;
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="bg-gray-200 rounded-2xl p-6 text-center hover:shadow-lg transition-all duration-300"
                  >
                    <div className="w-12 h-12 bg-primary-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                      <IconComponent className="w-6 h-6 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {feature.text}
                    </h3>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Clients Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-max">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Trusted by <span className="text-primary-600">Leading</span> Organizations
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                We're proud to serve a diverse portfolio of clients across various sectors
              </p>
            </motion.div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {service.clients.map((client: any, index: number) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="group"
                >
                  <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                    <div className="relative h-20 mb-4">
                      <Image
                        src={client.logo}
                        alt={client.name}
                        fill
                        className="object-contain group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <h3 className="text-sm font-medium text-gray-700 text-center group-hover:text-primary-600 transition-colors duration-200">
                      {client.name}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-primary-600">
          <div className="container-max text-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
                Let us help you navigate the legal complexities with our expert guidance and comprehensive solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/#contact"
                  className="inline-flex items-center px-8 py-4 bg-white text-primary-600 font-semibold rounded-xl hover:bg-gray-100 transition-all duration-200 shadow-lg hover:shadow-xl"
                >
                  Get In Touch
                  <ExternalLink className="w-5 h-5 ml-2" />
                </Link>
                <Link
                  href="/team"
                  className="inline-flex items-center px-8 py-4 border-2 border-white text-white font-semibold rounded-xl hover:bg-white hover:text-primary-600 transition-all duration-200"
                >
                  Meet Our Team
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </Suspense>
    </div>
  )
}
