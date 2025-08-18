'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Linkedin, Instagram, Mail, Phone, MapPin, Clock } from 'lucide-react'
import { activeClient, siteSettingsQuery } from '@/lib/sanity.client'

interface SiteSettings {
  contactInfo?: {
    address?: string
    phone?: string
    email?: string
    workingHours?: string
  }
  socialMedia?: {
    linkedin?: string
    twitter?: string
    facebook?: string
    instagram?: string
  }
  footer?: {
    copyright?: string
    footerLinks?: Array<{
      title: string
      url: string
    }>
  }
}

export default function Footer() {
  const [settings, setSettings] = useState<SiteSettings>({})

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const settingsData = await activeClient.fetch(siteSettingsQuery)
        setSettings(settingsData)
      } catch (error) {
        console.error('Error fetching site settings:', error)
      }
    }

    fetchSettings()
  }, [])

  const currentYear = new Date().getFullYear()

  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Services', href: '/services' },
    { name: 'Team', href: '/team' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Contact', href: '/#contact' },
  ]

  const services = [
    { name: 'Corporate Law', href: '/services/corporate-law' },
    { name: 'Litigation', href: '/services/litigation' },
    { name: 'Real Estate', href: '/services/real-estate' },
    { name: 'Employment Law', href: '/services/employment-law' },
    { name: 'Tax Law', href: '/services/tax-law' },
    { name: 'Intellectual Property', href: '/services/intellectual-property' },
  ]

  return (
    <footer className="bg-secondary-800 text-white">
      <div className="container-max">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-16">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="relative w-28 h-28">
                <Image
                  src="/assets/logo4.png"
                  alt="Probity Partners East Africa"
                  fill
                  className="object-contain"
                />
              </div>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Leading law firm in East Africa providing expert legal services across multiple practice areas. 
              We are committed to delivering exceptional legal solutions with integrity and professionalism.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Our Services</h3>
            <ul className="space-y-2">
              {services.map((service) => (
                <li key={service.name}>
                  <Link
                    href={service.href}
                    className="text-gray-300 hover:text-white transition-colors duration-200"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Contact Info</h3>
            <div className="space-y-3">
              {settings?.contactInfo?.address && (
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-300 text-sm">
                    {settings.contactInfo.address}
                  </span>
                </div>
              )}
              {settings?.contactInfo?.phone && (
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300 text-sm">
                    {settings.contactInfo.phone}
                  </span>
                </div>
              )}
              {settings?.contactInfo?.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300 text-sm">
                    {settings.contactInfo.email}
                  </span>
                </div>
              )}
              {settings?.contactInfo?.workingHours && (
                <div className="flex items-center space-x-3">
                  <Clock className="w-5 h-5 text-primary-400" />
                  <span className="text-gray-300 text-sm">
                    {settings.contactInfo.workingHours}
                  </span>
                </div>
              )}
              
              {/* Fallback contact info when Sanity data is not available */}
              {!settings?.contactInfo && (
                <>
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-primary-400 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300 text-sm">
                      Kigali, Rwanda
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-primary-400" />
                    <span className="text-gray-300 text-sm">
                      +250791676618 / +250788561313
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-primary-400" />
                    <span className="text-gray-300 text-sm">
                      probitypartnersea1@gmail.com
                    </span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-primary-400" />
                    <span className="text-gray-300 text-sm">
                      Mon - Fri: 8:00 AM - 6:00 PM
                    </span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="border-t border-gray-700 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} Probity Partners East Africa. All rights reserved.
            </div>

            {/* Social Media */}
            <div className="flex items-center space-x-4">
              {settings.socialMedia?.linkedin && (
                <a
                  href={settings.socialMedia.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
              )}
              {settings.socialMedia?.twitter && (
                <a
                  href={settings.socialMedia.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              )}
              {settings.socialMedia?.facebook && (
                <a
                  href={settings.socialMedia.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label="Facebook"
                >
                  <Facebook className="w-5 h-5" />
                </a>
              )}
              {settings.socialMedia?.instagram && (
                <a
                  href={settings.socialMedia.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="w-5 h-5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
