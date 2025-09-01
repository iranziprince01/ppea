'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X, ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'

interface Service {
  _id: string
  title: string
  slug: { current: string }
}

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const pathname = usePathname()

  // Check if a navigation item is active
  const isActive = (href: string) => {
    if (href === '/') {
      return pathname === '/'
    }
    return pathname.startsWith(href)
  }

  // Default services data
  const defaultServices = [
    { _id: '1', title: 'Banking and Finance', slug: { current: 'banking-and-finance' } },
    { _id: '2', title: 'Insurance', slug: { current: 'insurance' } },
    { _id: '3', title: 'Labour and Administration', slug: { current: 'labour-and-administration' } },
    { _id: '4', title: 'Contracts', slug: { current: 'contracts' } },
    { _id: '5', title: 'Taxation', slug: { current: 'taxation' } },
    { _id: '6', title: 'Corporate and Commercial Law', slug: { current: 'corporate-and-commercial-law' } },
    { _id: '7', title: 'Energy and Infrastructure', slug: { current: 'energy-and-infrastructure' } },
    { _id: '8', title: 'Human Rights Law', slug: { current: 'human-rights-law' } },
    { _id: '9', title: 'Criminal and Civil Litigation', slug: { current: 'criminal-and-civil-litigation' } },
    { _id: '10', title: 'Family Law', slug: { current: 'family-law' } },
    { _id: '11', title: 'Notarisation and Legalisation', slug: { current: 'notarisation-and-legalisation' } },
    { _id: '12', title: 'Intellectual Property', slug: { current: 'intellectual-property' } },
    { _id: '13', title: 'Institutional Support & Development', slug: { current: 'institutional-support-development' } }
  ]

  const toggleMenu = () => setIsOpen(!isOpen)
  const toggleServices = () => setIsServicesOpen(!isServicesOpen)

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services', hasDropdown: true },
    { name: 'Team', href: '/team' },
    { name: 'Blogs', href: '/blogs' }
  ]

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen && !(event.target as Element).closest('header')) {
        setIsOpen(false)
        setIsServicesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen])

  // Close services dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isServicesOpen && !(event.target as Element).closest('.services-dropdown')) {
        setIsServicesOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isServicesOpen])

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg transition-all duration-300">
      <div className="container-max">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4" onClick={(e) => {
            // If already on home, scroll smoothly to top
            if (window.location.pathname === '/') {
              e.preventDefault()
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
          }}>
            <div className="relative w-24 h-16 sm:w-28 sm:h-20 md:w-32 md:h-24 lg:w-36 lg:h-36">
              <Image
                src="/assets/Logo5.png"
                alt="Probity Partners East Africa"
                fill
                className="object-contain"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => (
              <div key={item.name} className="relative group">
                {item.hasDropdown ? (
                  <div className="services-dropdown">
                                      <button
                    onClick={toggleServices}
                                                 className={`flex items-center space-x-1 cursor-pointer transition-colors ${
                               isActive(item.href)
                                 ? 'text-secondary-800 font-semibold'
                                 : 'text-gray-700 hover:text-secondary-800'
                             }`}
                  >
                    <span>{item.name}</span>
                    <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                  </button>
                    <AnimatePresence>
                      {isServicesOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: -10, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: -10, scale: 0.95 }}
                          transition={{ duration: 0.2 }}
                          className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden"
                        >
                          <div className="py-3">
                            <div className="px-4 py-2 border-b border-gray-100">
                              <h3 className="text-sm font-semibold text-gray-900">All Services</h3>
                            </div>
                            <div className="max-h-96 overflow-y-auto">
                              {defaultServices.map((service) => (
                                <Link
                                  key={service._id}
                                  href={`/services/${service.slug.current}`}
                                  className="block px-4 py-3 text-gray-700 hover:bg-secondary-50 hover:text-secondary-800 transition-all duration-200 border-l-2 border-transparent hover:border-secondary-500"
                                  onClick={() => setIsServicesOpen(false)}
                                >
                                  <div className="font-medium">{service.title}</div>
                                </Link>
                              ))}
                            </div>
                            <div className="px-4 py-3 border-t border-gray-100 bg-gray-50">
                              <Link
                                href="/services"
                                className="text-secondary-800 hover:text-secondary-700 font-medium text-sm transition-colors"
                                onClick={() => setIsServicesOpen(false)}
                              >
                                View All Services →
                              </Link>
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                ) : (
                                           <Link
                           href={item.href}
                           className={`transition-colors ${
                             isActive(item.href)
                               ? 'text-secondary-800 font-semibold'
                               : 'text-gray-700 hover:text-secondary-800'
                           }`}
                         >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link href="/#contact" className="btn-primary">
              Get In Touch
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
                                className="lg:hidden p-2 text-gray-700 hover:text-secondary-800 transition-colors"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="lg:hidden bg-white border-t border-gray-100 overflow-hidden"
            >
              <div className="py-4 space-y-1">
                {navigation.map((item) => (
                  <div key={item.name}>
                    {item.hasDropdown ? (
                      <div className="px-4 py-2">
                        <button
                          onClick={toggleServices}
                                                           className={`flex items-center justify-between w-full font-medium mb-2 transition-colors ${
                                   isActive(item.href)
                                     ? 'text-secondary-800 font-semibold'
                                     : 'text-gray-700 hover:text-secondary-800'
                                 }`}
                        >
                          {item.name}
                          <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${isServicesOpen ? 'rotate-180' : ''}`} />
                        </button>
                        <AnimatePresence>
                          {isServicesOpen && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.2 }}
                              className="pl-4 space-y-1 overflow-hidden"
                            >
                              <div className="max-h-64 overflow-y-auto overscroll-contain">
                                {defaultServices.map((service) => (
                                  <Link
                                    key={service._id}
                                    href={`/services/${service.slug.current}`}
                                    className="block py-2 text-gray-600 hover:text-secondary-800 transition-colors border-l-2 border-transparent hover:border-secondary-500 pl-3"
                                    onClick={() => {
                                      setIsOpen(false)
                                      setIsServicesOpen(false)
                                    }}
                                  >
                                    {service.title}
                                  </Link>
                                ))}
                              </div>
                              <div className="pt-2 border-t border-gray-100 mt-2">
                                <Link
                                  href="/services"
                                  className="block py-2 text-secondary-800 hover:text-secondary-700 font-medium text-sm transition-colors"
                                  onClick={() => {
                                    setIsOpen(false)
                                    setIsServicesOpen(false)
                                  }}
                                >
                                  View All Services →
                                </Link>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    ) : (
                      <Link
                        href={item.href}
                                                     className={`block px-4 py-2 transition-colors ${
                               isActive(item.href)
                                 ? 'text-secondary-800 font-semibold bg-secondary-50'
                                 : 'text-gray-700 hover:text-secondary-800'
                             }`}
                        onClick={() => setIsOpen(false)}
                      >
                        {item.name}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="px-4 pt-4">
                  <Link
                    href="/#contact"
                    className="btn-primary w-full text-center block"
                    onClick={() => setIsOpen(false)}
                  >
                    Get In Touch
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}
