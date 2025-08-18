'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'

export default function ServicesGridSection() {
  const services = [
    {
      _id: '1',
      title: 'Banking and Finance',
      slug: { current: 'banking-and-finance' },
      shortDescription: 'We provide our clients with banking and financial legal support through handling legal issues that may arise from contractual legal binds associated with loans and borrowing.',
      mainImage: '/assets/banking.jpg',
      featured: true
    },
    {
      _id: '2',
      title: 'Insurance',
      slug: { current: 'insurance' },
      shortDescription: 'We provide legal aid in terms of insurance law. Insurance law is the collection of laws and regulations that relate to insurance.',
      mainImage: '/assets/insurance.jpg',
      featured: false
    },
    {
      _id: '3',
      title: 'Labour and Administration',
      slug: { current: 'labour-and-administration' },
      shortDescription: 'With the ever-expanding labour market, managing relationships between employer and employee is a dire necessity.',
      mainImage: '/assets/employment.jpg',
      featured: true
    },
    {
      _id: '4',
      title: 'Contracts',
      slug: { current: 'contracts' },
      shortDescription: 'Contract related legal assistance is a service desired by most of our clients, both legal persons and individuals.',
      mainImage: '/assets/contract.jpg',
      featured: false
    },
    {
      _id: '5',
      title: 'Taxation',
      slug: { current: 'taxation' },
      shortDescription: 'PPEA offers a comprehensive variety of tax services to handle the issues of international trade and commercial operations.',
      mainImage: '/assets/tax.jpg',
      featured: true
    },
    {
      _id: '6',
      title: 'Corporate and Commercial Law',
      slug: { current: 'corporate-and-commercial-law' },
      shortDescription: 'We provide corporate and commercial legal services to our client through the drafting and preparing of all types of legal documentation.',
      mainImage: '/assets/corporate.jpg',
      featured: true
    },
    {
      _id: '7',
      title: 'Energy and Infrastructure',
      slug: { current: 'energy-and-infrastructure' },
      shortDescription: 'We provide legal assistance and representation in matters of energy law, infrastructure finance, transport, and oil and energy.',
      mainImage: '/assets/international.jpg',
      featured: false
    },
    {
      _id: '8',
      title: 'Human Rights Law',
      slug: { current: 'human-rights-law' },
      shortDescription: 'We provide legal aid in terms of human rights law. Human Rights Law exists to help protect our rights as human beings.',
      mainImage: '/assets/human rigths.jpg',
      featured: false
    },
    {
      _id: '9',
      title: 'Criminal and Civil Litigation',
      slug: { current: 'criminal-and-civil-litigation' },
      shortDescription: 'We provide legal aid in terms of criminal law. Criminal law aims to deter and punish conduct which is perceived as threatening, harmful or endangering.',
      mainImage: '/assets/Litigation.jpg',
      featured: false
    },
    {
      _id: '10',
      title: 'Family Law',
      slug: { current: 'family-law' },
      shortDescription: 'We provide legal aid in terms of family law. Family Law focuses on finding solutions to issues relating to often complex legal relationships.',
      mainImage: '/assets/family.jpg',
      featured: false
    },
    {
      _id: '11',
      title: 'Notarisation and Legalisation',
      slug: { current: 'notarisation-and-legalisation' },
      shortDescription: 'PPEA team has a certified and qualified private notary. We offer notary services as well as legalisation of documents to our clients.',
      mainImage: '/assets/notarisation.jpg',
      featured: false
    },
    {
      _id: '12',
      title: 'Intellectual Property',
      slug: { current: 'intellectual-property' },
      shortDescription: 'PPEA offers specialized services in the registration of Intellectual Property including trademarks, patents, copyrights, and designs.',
      mainImage: '/assets/intellectual.jpg',
      featured: false
    },
    {
      _id: '13',
      title: 'Institutional Support & Development',
      slug: { current: 'institutional-support-development' },
      shortDescription: 'We provide comprehensive support to government institutions, CSOs, private sector and individuals in access to justice, capacity building, project management, and institutional development.',
      mainImage: '/assets/institutional.jpg',
      featured: true
    }
  ]

  const getServiceImage = (title: string): string => {
    switch (title) {
      case 'Banking and Finance':
        return '/assets/banking.jpg';
      case 'Insurance':
        return '/assets/insurance.jpg';
      case 'Labour and Administration':
        return '/assets/employment.jpg';
      case 'Contracts':
        return '/assets/contract.jpg';
      case 'Taxation':
        return '/assets/tax.jpg';
      case 'Corporate and Commercial Law':
        return '/assets/corporate.jpg';
      case 'Energy and Infrastructure':
        return '/assets/international.jpg';
      case 'Human Rights Law':
        return '/assets/human rigths.jpg';
      case 'Criminal and Civil Litigation':
        return '/assets/Litigation.jpg';
      case 'Family Law':
        return '/assets/family.jpg';
      case 'Notarisation and Legalisation':
        return '/assets/notarisation.jpg';
      case 'Intellectual Property':
        return '/assets/intellectual.jpg';
      case 'Institutional Support & Development':
        return '/assets/institutional.jpg';
      default:
        return '/assets/services-hero.jpg';
    }
  };

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
            Our <span className="text-primary-600">Services</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive legal solutions delivered with expertise and integrity
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="group bg-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={getServiceImage(service.title)}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  {service.shortDescription}
                </p>
                <Link
                  href={`/services/${service.slug.current}`}
                  className="inline-flex items-center text-primary-600 hover:text-primary-700 font-medium transition-colors duration-200"
                >
                  Learn More
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
