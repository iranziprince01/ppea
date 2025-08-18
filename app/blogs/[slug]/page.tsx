import { notFound } from 'next/navigation'
import { activeClient, blogPostsQuery } from '@/lib/sanity.client'
import { urlFor } from '@/lib/sanity.client'
import { PortableText } from '@portabletext/react'
import { Calendar, User, Clock, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'

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
  tags: string[]
  body: any[]
  readingTime?: number
  featured: boolean
}

interface PageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  try {
    const posts = await activeClient.fetch(blogPostsQuery)
    return posts?.map((post: BlogPost) => ({
      slug: post.slug.current,
    })) || []
  } catch (error) {
    console.error('Error generating static params:', error)
    return []
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params

  try {
    const posts = await activeClient.fetch(blogPostsQuery)
    const post = posts?.find((p: BlogPost) => p.slug.current === slug)

    if (!post) {
      notFound()
    }

    const formatDate = (dateString: string) => {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    }

    return (
      <div className="pt-20">
        {/* Hero Section */}
        <section className="bg-gradient-to-br from-primary-700 to-primary-900 text-white py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              {/* Categories */}
              {post.categories && post.categories.length > 0 && (
                <div className="flex justify-center gap-2 mb-6">
                  {post.categories.map((category: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium"
                    >
                      {category}
                    </span>
                  ))}
                </div>
              )}

              {/* Title */}
              <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-xl text-primary-100 leading-relaxed mb-8 max-w-3xl mx-auto">
                  {post.excerpt}
                </p>
              )}

              {/* Meta Info */}
              <div className="flex flex-wrap justify-center items-center gap-6 text-primary-100">
                {/* Author */}
                <div className="flex items-center space-x-2">
                  <User className="w-5 h-5" />
                  <span>{post.author?.name || 'Unknown Author'}</span>
                  {post.author?.position && (
                    <span className="text-primary-200">• {post.author.position}</span>
                  )}
                </div>

                {/* Date */}
                <div className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>{formatDate(post.publishedAt)}</span>
                </div>

                {/* Reading Time */}
                {post.readingTime && (
                  <div className="flex items-center space-x-2">
                    <Clock className="w-5 h-5" />
                    <span>{post.readingTime} min read</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <section className="py-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back to Blogs */}
            <div className="mb-8">
              <Link
                href="/blogs"
                className="inline-flex items-center text-primary-600 hover:text-primary-700 transition-colors duration-200"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blogs
              </Link>
            </div>

            {/* Featured Image */}
            {post.mainImage && (
              <div className="mb-12">
                <div className="relative h-96 lg:h-[500px] rounded-2xl overflow-hidden shadow-2xl">
                  <img
                    src={typeof post.mainImage === 'string' ? post.mainImage : urlFor(post.mainImage).url()}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            )}

            {/* Article Body */}
            <article className="prose prose-lg max-w-none">
              <PortableText
                value={post.body}
                components={{
                  types: {
                    image: ({ value }: any) => (
                      <div className="my-8">
                        <img
                          src={urlFor(value).url()}
                          alt={value.alt || 'Blog image'}
                          className="w-full h-auto rounded-lg shadow-lg"
                        />
                        {value.caption && (
                          <p className="text-center text-gray-600 text-sm mt-2">
                            {value.caption}
                          </p>
                        )}
                      </div>
                    ),
                  },
                }}
              />
            </article>

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-center space-x-2 mb-4">
                  <Tag className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-700 font-medium">Tags:</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string, idx: number) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full hover:bg-primary-100 hover:text-primary-700 transition-colors duration-200"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Author Bio */}
            {post.author && (
              <div className="mt-12 pt-8 border-t border-gray-200">
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    {post.author.photo ? (
                      <img
                        src={typeof post.author.photo === 'string' ? post.author.photo : urlFor(post.author.photo).url()}
                        alt={post.author.name}
                        className="w-full h-full rounded-full object-cover"
                      />
                    ) : (
                      <span className="text-primary-600 text-xl font-bold">
                        {post.author.name ? post.author.name.split(' ').map((n: string) => n[0]).join('') : 'A'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      {post.author.name || 'Unknown Author'}
                    </h3>
                    {post.author.position && (
                      <p className="text-primary-600 font-medium mb-2">
                        {post.author.position}
                      </p>
                    )}
                    <p className="text-gray-600">
                      Expert legal professional with extensive experience in East African legal frameworks and regulations.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    )
  } catch (error) {
    console.error('Error fetching blog post:', error)
    notFound()
  }
}
