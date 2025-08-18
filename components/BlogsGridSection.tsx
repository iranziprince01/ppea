'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { activeClient, blogPostsQuery } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'
import { ArrowRight, Calendar, User, Search, Filter } from 'lucide-react'

interface BlogPost {
  _id: string
  title: string
  slug: { current: string }
  excerpt: string
  author: {
    name: string
    photo: any
    position?: string
  }
  mainImage: any
  publishedAt: string
  categories: string[]
  tags?: string[]
  featured: boolean
  readingTime?: number
}

export default function BlogsGridSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 9

  useEffect(() => {
    const fetchBlogPosts = async () => {
      try {
        const postsData = await activeClient.fetch(blogPostsQuery)
        setBlogPosts(postsData || [])
      } catch (error) {
        console.error('Error fetching blog posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchBlogPosts()
  }, [])

  const defaultBlogPosts = [
    {
      _id: '1',
      title: 'Understanding Corporate Governance in East Africa',
      slug: { current: 'corporate-governance-east-africa' },
      excerpt: 'A comprehensive guide to corporate governance practices and regulations across East African markets.',
      author: { name: 'Sarah Mwangi', photo: '/assets/Avatar.png' },
      mainImage: '/assets/corporate.jpg',
      publishedAt: '2024-01-15T10:00:00Z',
      categories: ['Corporate Law'],
      featured: true,
      readingTime: 8
    },
    {
      _id: '2',
      title: 'Recent Changes in Employment Law: What Employers Need to Know',
      slug: { current: 'employment-law-changes-2024' },
      excerpt: 'Key updates to employment legislation and their implications for businesses and employees.',
      author: { name: 'James Kamau', photo: '/assets/Avatar.png' },
      mainImage: '/assets/employment.jpg',
      publishedAt: '2024-01-10T14:30:00Z',
      categories: ['Employment Law'],
      featured: false,
      readingTime: 6
    },
    {
      _id: '3',
      title: 'Real Estate Investment: Legal Considerations for Foreign Investors',
      slug: { current: 'real-estate-foreign-investment' },
      excerpt: 'Essential legal aspects foreign investors should understand when investing in East African real estate.',
      author: { name: 'Grace Wanjiku', photo: '/assets/Avatar.png' },
      mainImage: '/assets/real estate.jpg',
      publishedAt: '2024-01-05T09:15:00Z',
      categories: ['Real Estate'],
      featured: true,
      readingTime: 10
    },
    {
      _id: '4',
      title: 'Tax Planning Strategies for Multinational Corporations',
      slug: { current: 'tax-planning-multinationals' },
      excerpt: 'Effective tax planning approaches for multinational corporations operating in East Africa.',
      author: { name: 'Mary Njeri', photo: '/assets/Avatar.png' },
      mainImage: '/assets/tax.jpg',
      publishedAt: '2023-12-28T16:45:00Z',
      categories: ['Tax Law'],
      featured: false,
      readingTime: 12
    },
    {
      _id: '5',
      title: 'Intellectual Property Protection in the Digital Age',
      slug: { current: 'ip-protection-digital-age' },
      excerpt: 'Modern approaches to protecting intellectual property in an increasingly digital business environment.',
      author: { name: 'Peter Odhiambo', photo: '/assets/Avatar.png' },
      mainImage: '/assets/intellectual.jpg',
      publishedAt: '2023-12-20T11:20:00Z',
      categories: ['Intellectual Property'],
      featured: false,
      readingTime: 7
    },
    {
      _id: '6',
      title: 'Alternative Dispute Resolution: Benefits for Business',
      slug: { current: 'alternative-dispute-resolution-business' },
      excerpt: 'How ADR methods can provide efficient and cost-effective solutions for business disputes.',
      author: { name: 'David Ochieng', photo: '/assets/Avatar.png' },
      mainImage: '/assets/Litigation.jpg',
      publishedAt: '2023-12-15T13:10:00Z',
      categories: ['Litigation'],
      featured: true,
      readingTime: 9
    }
  ]

  const displayPosts = blogPosts.length > 0 ? blogPosts : defaultBlogPosts

  // Get unique categories
  const categories = ['all', ...Array.from(new Set(displayPosts.flatMap(post => post.categories)))]

  // Filter posts based on search and category
  const filteredPosts = displayPosts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || post.categories.includes(selectedCategory)
    return matchesSearch && matchesCategory
  })

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)
  const startIndex = (currentPage - 1) * postsPerPage
  const currentPosts = filteredPosts.slice(startIndex, startIndex + postsPerPage)

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) {
    return (
      <section className="section-padding bg-gray-50">
        <div className="container-max">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-600 rounded-full animate-spin mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading blog posts...</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-max">
        {/* Search and Filter */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="bg-white rounded-2xl p-6 shadow-lg">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search blog posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                />
              </div>

              {/* Category Filter */}
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent appearance-none bg-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>
                      {category === 'all' ? 'All Categories' : category}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {currentPosts.map((post, index) => (
            <motion.article
              key={post._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="card group hover:shadow-2xl transition-all duration-300"
            >
              {/* Featured Badge */}
              {post.featured && (
                <div className="absolute top-4 left-4 bg-primary-500 text-white text-xs px-2 py-1 rounded-full font-medium z-10">
                  Featured
                </div>
              )}

              {/* Image */}
              <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
                {post.mainImage ? (
                  <img
                    src={typeof post.mainImage === 'string' ? post.mainImage : urlFor(post.mainImage).url()}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                ) : (
                  <img
                    src="/assets/Blog.jpg"
                    alt="Blog Image"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                {/* Categories */}
                <div className="flex flex-wrap gap-2">
                  {post.categories && post.categories.slice(0, 2).map((category: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-2 py-1 bg-primary-50 text-primary-600 text-xs rounded-full"
                    >
                      {category}
                    </span>
                  ))}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition-colors duration-300 line-clamp-2">
                  {post.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 text-sm leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>

                {/* Meta Info */}
                <div className="flex items-center justify-between text-sm text-gray-500 pt-2">
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4" />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  {post.readingTime && (
                    <span>{post.readingTime} min read</span>
                  )}
                </div>

                {/* Author */}
                <div className="flex items-center space-x-3 pt-3 border-t border-gray-100">
                  <div className="w-8 h-8 bg-primary-100 rounded-full flex items-center justify-center">
                    {post.author.photo ? (
                      <img
                        src={typeof post.author.photo === 'string' ? post.author.photo : urlFor(post.author.photo).url()}
                        alt={post.author.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary-600 text-sm font-medium">
                        {post.author.name ? post.author.name.split(' ').map((n: string) => n[0]).join('') : 'A'}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600">{post.author.name}</span>
                </div>

                {/* Read More */}
                <Link
                  href={`/blogs/${post.slug.current}`}
                  className="inline-flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium group-hover:translate-x-1 transition-all duration-300 pt-2"
                >
                  <span>Read More</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="flex justify-center items-center space-x-2 mb-12"
          >
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Previous
            </button>
            
            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`px-4 py-2 rounded-lg ${
                  currentPage === page
                    ? 'bg-primary-500 text-white'
                    : 'border border-gray-300 hover:bg-gray-50'
                }`}
              >
                {page}
              </button>
            ))}
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
            >
              Next
            </button>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <div className="bg-white rounded-2xl p-8 shadow-lg max-w-2xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Stay Updated with Legal Insights
            </h3>
            <p className="text-gray-600 mb-6">
              Subscribe to our newsletter for the latest legal updates, insights, and expert analysis.
            </p>
            <Link
              href="/#contact"
              className="btn-primary"
            >
              Subscribe Now
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
