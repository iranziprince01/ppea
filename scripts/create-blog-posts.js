const { createClient } = require('@sanity/client')
require('dotenv').config({ path: '.env.local' })

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Sample blog posts data (without image dependencies)
const blogPosts = [
  {
    _type: 'blogPost',
    title: 'Understanding Corporate Governance in East Africa',
    slug: {
      _type: 'slug',
      current: 'corporate-governance-east-africa'
    },
    excerpt: 'A comprehensive guide to corporate governance practices and regulations across East African markets.',
    publishedAt: '2024-01-15T10:00:00Z',
    categories: ['Corporate Law'],
    tags: ['Governance', 'Regulations', 'East Africa'],
    featured: true,
    readingTime: 8,
    status: 'published',
    body: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'Corporate governance is a critical aspect of business operations in East Africa. As the region continues to experience rapid economic growth and increased foreign investment, understanding and implementing proper corporate governance practices has become essential for both local and international businesses.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Key Principles of Corporate Governance'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'The fundamental principles of corporate governance include transparency, accountability, fairness, and responsibility. These principles ensure that companies operate in the best interests of all stakeholders while maintaining ethical business practices.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'block4',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span4',
            text: 'In East Africa, these principles are particularly important as the region continues to attract significant foreign investment. Companies that demonstrate strong corporate governance practices are more likely to attract and retain investors, while also building trust with local communities and regulatory authorities.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Corporate Governance in East Africa - Legal Guide',
      metaDescription: 'Comprehensive guide to corporate governance practices and regulations across East African markets.',
      keywords: ['corporate governance', 'East Africa', 'business law', 'regulations']
    }
  },
  {
    _type: 'blogPost',
    title: 'Recent Changes in Employment Law: What Employers Need to Know',
    slug: {
      _type: 'slug',
      current: 'employment-law-changes-2024'
    },
    excerpt: 'Key updates to employment legislation and their implications for businesses and employees.',
    publishedAt: '2024-01-10T14:30:00Z',
    categories: ['Employment Law'],
    tags: ['Employment', 'Legislation', 'Business'],
    featured: false,
    readingTime: 6,
    status: 'published',
    body: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'The employment law landscape in East Africa is evolving rapidly, with new regulations and amendments being introduced to protect workers\' rights while balancing the needs of businesses.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Key Changes in 2024'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'Employers across East Africa need to stay informed about these changes to ensure compliance and maintain positive workplace relationships. The new regulations focus on worker protection, fair compensation, and workplace safety standards.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Employment Law Changes 2024 - What Employers Need to Know',
      metaDescription: 'Key updates to employment legislation and their implications for businesses and employees in East Africa.',
      keywords: ['employment law', '2024', 'business', 'legislation']
    }
  },
  {
    _type: 'blogPost',
    title: 'Real Estate Investment: Legal Considerations for Foreign Investors',
    slug: {
      _type: 'slug',
      current: 'real-estate-foreign-investment'
    },
    excerpt: 'Essential legal aspects foreign investors should understand when investing in East African real estate.',
    publishedAt: '2024-01-05T09:15:00Z',
    categories: ['Real Estate'],
    tags: ['Real Estate', 'Investment', 'Foreign Investors'],
    featured: true,
    readingTime: 10,
    status: 'published',
    body: [
      {
        _type: 'block',
        _key: 'block1',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span1',
            text: 'East Africa presents significant opportunities for real estate investment, but foreign investors must navigate complex legal frameworks and regulatory requirements.'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'block2',
        style: 'h2',
        children: [
          {
            _type: 'span',
            _key: 'span2',
            text: 'Legal Framework for Foreign Investment'
          }
        ]
      },
      {
        _type: 'block',
        _key: 'block3',
        style: 'normal',
        children: [
          {
            _type: 'span',
            _key: 'span3',
            text: 'Understanding the legal requirements for foreign investment in real estate is crucial for success. This includes land ownership laws, tax implications, and regulatory compliance requirements that vary across different East African countries.'
          }
        ]
      }
    ],
    seo: {
      metaTitle: 'Real Estate Investment in East Africa - Legal Guide',
      metaDescription: 'Essential legal aspects foreign investors should understand when investing in East African real estate.',
      keywords: ['real estate', 'investment', 'foreign investors', 'East Africa']
    }
  }
]

async function createBlogPosts() {
  try {
    console.log('🚀 Creating blog posts...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables:')
      console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID')
      console.error('   - SANITY_API_TOKEN')
      return
    }

    console.log('✅ Environment variables found')
    console.log(`📁 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

    // Create blog posts
    for (const post of blogPosts) {
      try {
        const createdPost = await client.create(post)
        console.log(`✅ Created blog post: ${post.title}`)
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  Blog post already exists: ${post.title}`)
        } else {
          console.error(`❌ Error creating blog post ${post.title}:`, error.message)
        }
      }
    }

    console.log('\n🎉 Blog posts creation completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Open Sanity Studio at http://localhost:3333')
    console.log('2. Check the Blog Post section - you should now see 3 blog posts')
    console.log('3. You can edit the content and add images as needed')
    console.log('4. Your website will automatically reflect the changes')

  } catch (error) {
    console.error('❌ Error during blog posts creation:', error)
  }
}

// Run the creation script
createBlogPosts()
