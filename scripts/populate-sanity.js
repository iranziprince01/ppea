require('dotenv').config({ path: '.env.local' })
const { createClient } = require('@sanity/client')

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Sample team members data
const teamMembers = [
  {
    _type: 'teamMember',
    name: 'Me Alice Umulisa Kayigamba',
    position: 'Managing Partner',
    shortBio: 'Leading our firm with over 15 years of experience in corporate law and strategic legal counsel.',
    photo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-1234567890' // This will be replaced with actual image upload
      }
    },
    slug: {
      _type: 'slug',
      current: 'alice-umulisa'
    },
    isPartner: true,
    specialties: ['Corporate Law', 'Strategic Legal Counsel', 'Leadership'],
    order: 1
  },
  {
    _type: 'teamMember',
    name: 'Aloys Ntirushwamaboko',
    position: 'Senior Partner',
    shortBio: 'Specializing in litigation and dispute resolution with a track record of successful case outcomes.',
    photo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-1234567891'
      }
    },
    slug: {
      _type: 'slug',
      current: 'aloys-ntirushwamaboko'
    },
    isPartner: true,
    specialties: ['Litigation', 'Dispute Resolution', 'Corporate Law'],
    order: 2
  },
  {
    _type: 'teamMember',
    name: 'Evode Kayitana',
    position: 'Partner',
    shortBio: 'Expert in real estate law and corporate transactions, providing strategic legal solutions.',
    photo: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-1234567892'
      }
    },
    slug: {
      _type: 'slug',
      current: 'evode-kayitana'
    },
    isPartner: true,
    specialties: ['Real Estate Law', 'Corporate Transactions', 'Strategic Planning'],
    order: 3
  }
]

// Sample blog posts data
const blogPosts = [
  {
    _type: 'blogPost',
    title: 'Understanding Corporate Governance in East Africa',
    slug: {
      _type: 'slug',
      current: 'corporate-governance-east-africa'
    },
    excerpt: 'A comprehensive guide to corporate governance practices and regulations across East African markets.',
    author: {
      _type: 'reference',
      _ref: 'teamMember-1' // Reference to team member
    },
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-1234567893'
      }
    },
    publishedAt: '2024-01-15T10:00:00Z',
    categories: ['Corporate Law'],
    tags: ['Governance', 'Regulations', 'East Africa'],
    featured: true,
    readingTime: 8,
    status: 'published',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'Corporate governance is a critical aspect of business operations in East Africa. As the region continues to experience rapid economic growth and increased foreign investment, understanding and implementing proper corporate governance practices has become essential for both local and international businesses.'
          }
        ]
      },
      {
        _type: 'block',
        style: 'h2',
        children: [
          {
            _type: 'span',
            text: 'Key Principles of Corporate Governance'
          }
        ]
      },
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The fundamental principles of corporate governance include transparency, accountability, fairness, and responsibility. These principles ensure that companies operate in the best interests of all stakeholders while maintaining ethical business practices.'
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
    author: {
      _type: 'reference',
      _ref: 'teamMember-2'
    },
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-1234567894'
      }
    },
    publishedAt: '2024-01-10T14:30:00Z',
    categories: ['Employment Law'],
    tags: ['Employment', 'Legislation', 'Business'],
    featured: false,
    readingTime: 6,
    status: 'published',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'The employment law landscape in East Africa is evolving rapidly, with new regulations and amendments being introduced to protect workers\' rights while balancing the needs of businesses.'
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
    author: {
      _type: 'reference',
      _ref: 'teamMember-3'
    },
    mainImage: {
      _type: 'image',
      asset: {
        _type: 'reference',
        _ref: 'image-1234567895'
      }
    },
    publishedAt: '2024-01-05T09:15:00Z',
    categories: ['Real Estate'],
    tags: ['Real Estate', 'Investment', 'Foreign Investors'],
    featured: true,
    readingTime: 10,
    status: 'published',
    body: [
      {
        _type: 'block',
        style: 'normal',
        children: [
          {
            _type: 'span',
            text: 'East Africa presents significant opportunities for real estate investment, but foreign investors must navigate complex legal frameworks and regulatory requirements.'
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

// Site settings data
const siteSettings = {
  _type: 'siteSettings',
  title: 'Probity Partners East Africa',
  description: 'Leading law firm in East Africa providing expert legal services across multiple practice areas.',
  contactInfo: {
    address: 'Kigali, Rwanda',
    phone: '+250791676618 / +250788561313',
    email: 'probitypartnersea1@gmail.com',
    workingHours: 'Mon - Fri: 8:00 AM - 6:00 PM'
  },
  socialMedia: {
    facebook: 'https://facebook.com/probitypartners',
    twitter: 'https://twitter.com/probitypartners',
    linkedin: 'https://linkedin.com/company/probitypartners',
    instagram: 'https://instagram.com/probitypartners'
  }
}

async function populateSanity() {
  try {
    console.log('🚀 Starting Sanity population...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables:')
      console.error('   - NEXT_PUBLIC_SANITY_PROJECT_ID')
      console.error('   - SANITY_API_TOKEN')
      console.error('\nPlease check your .env.local file and ensure these variables are set.')
      return
    }

    console.log('✅ Environment variables found')
    console.log(`📁 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

    // Create team members first (blog posts reference them)
    console.log('\n👥 Creating team members...')
    const createdTeamMembers = []
    
    for (const member of teamMembers) {
      try {
        const createdMember = await client.create(member)
        createdTeamMembers.push(createdMember)
        console.log(`✅ Created team member: ${member.name}`)
      } catch (error) {
        if (error.message.includes('already exists')) {
          console.log(`⚠️  Team member already exists: ${member.name}`)
        } else {
          console.error(`❌ Error creating team member ${member.name}:`, error.message)
        }
      }
    }

    // Update blog posts with correct team member references
    console.log('\n📝 Creating blog posts...')
    for (const post of blogPosts) {
      try {
        // Find the corresponding team member reference
        const teamMember = createdTeamMembers.find(member => 
          member.slug?.current === post.author._ref.replace('teamMember-', '').split('-')[0]
        )
        
        if (teamMember) {
          post.author._ref = teamMember._id
        }

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

    // Create site settings
    console.log('\n⚙️  Creating site settings...')
    try {
      await client.create(siteSettings)
      console.log('✅ Created site settings')
    } catch (error) {
      if (error.message.includes('already exists')) {
        console.log('⚠️  Site settings already exist')
      } else {
        console.error('❌ Error creating site settings:', error.message)
      }
    }

    console.log('\n🎉 Sanity population completed successfully!')
    console.log('\n📋 Next steps:')
    console.log('1. Open Sanity Studio at http://localhost:3333')
    console.log('2. Upload images for team members and blog posts')
    console.log('3. Edit content as needed')
    console.log('4. Your website will automatically reflect the changes')

  } catch (error) {
    console.error('❌ Error during Sanity population:', error)
  }
}

// Run the population script
populateSanity()
