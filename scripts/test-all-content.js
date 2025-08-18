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

async function testAllContent() {
  try {
    console.log('🧪 Testing all content types...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables')
      return
    }

    console.log('✅ Environment variables found')
    console.log(`📁 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

    // Test team members
    console.log('\n👥 Testing Team Members...')
    const teamMembers = await client.fetch(`*[_type == "teamMember"] | order(order asc)`)
    console.log(`📊 Found ${teamMembers.length} team members:`)
    
    if (teamMembers.length === 0) {
      console.log('❌ No team members found')
    } else {
      teamMembers.forEach((member, index) => {
        console.log(`   ${index + 1}. ${member.name} - ${member.position} (${member.isPartner ? 'Partner' : 'Associate'})`)
      })
    }

    // Test blog posts
    console.log('\n📝 Testing Blog Posts...')
    const blogPosts = await client.fetch(`*[_type == "blogPost"] | order(publishedAt desc)`)
    console.log(`📊 Found ${blogPosts.length} blog posts:`)
    
    if (blogPosts.length === 0) {
      console.log('❌ No blog posts found')
    } else {
      blogPosts.forEach((post, index) => {
        console.log(`   ${index + 1}. ${post.title} (${post.status})`)
        console.log(`      Categories: ${post.categories?.join(', ') || 'None'}`)
        console.log(`      Featured: ${post.featured ? 'Yes' : 'No'}`)
      })
    }

    // Test site settings
    console.log('\n⚙️  Testing Site Settings...')
    const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]`)
    
    if (siteSettings) {
      console.log('✅ Site settings found')
      if (siteSettings.teamPreview && siteSettings.teamPreview.teamMembers) {
        console.log(`📋 Team preview has ${siteSettings.teamPreview.teamMembers.length} members`)
      } else {
        console.log('⚠️  No team preview data found')
      }
    } else {
      console.log('❌ No site settings found')
    }

    // Test client inquiries
    console.log('\n📧 Testing Client Inquiries...')
    const clientInquiries = await client.fetch(`*[_type == "clientInquiry"] | order(submittedAt desc)`)
    console.log(`📊 Found ${clientInquiries.length} client inquiries`)

    // Summary
    console.log('\n📋 Summary:')
    console.log(`   Team Members: ${teamMembers.length}`)
    console.log(`   Blog Posts: ${blogPosts.length}`)
    console.log(`   Site Settings: ${siteSettings ? '✅' : '❌'}`)
    console.log(`   Client Inquiries: ${clientInquiries.length}`)

    if (teamMembers.length > 0 && blogPosts.length > 0 && siteSettings) {
      console.log('\n🎉 All content types are working correctly!')
      console.log('\n🌐 Your website should now display:')
      console.log('   - Home page: 3 featured team members')
      console.log('   - Team page: All team members with individual profiles')
      console.log('   - Blogs page: All blog posts with individual blog pages')
    } else {
      console.log('\n⚠️  Some content types are missing. Run the appropriate scripts:')
      if (teamMembers.length === 0) console.log('   - npm run sanity:fix-team')
      if (blogPosts.length === 0) console.log('   - npm run sanity:create-blogs')
      if (!siteSettings) console.log('   - npm run sanity:populate')
    }

  } catch (error) {
    console.error('❌ Error during testing:', error)
  }
}

// Run the test
testAllContent()
