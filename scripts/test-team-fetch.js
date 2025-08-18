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

async function testTeamFetch() {
  try {
    console.log('🧪 Testing team member fetch...')
    
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

    // Test the team members query
    const teamMembersQuery = `*[_type == "teamMember"] | order(order asc)`
    const teamMembers = await client.fetch(teamMembersQuery)
    
    console.log(`\n📊 Found ${teamMembers.length} team members:`)
    
    if (teamMembers.length === 0) {
      console.log('❌ No team members found in Sanity')
      console.log('\n💡 To fix this:')
      console.log('1. Run: npm run sanity:populate')
      console.log('2. Or run: npm run sanity:fix-team')
      console.log('3. Or create team members manually in Sanity Studio')
    } else {
      teamMembers.forEach((member, index) => {
        console.log(`\n${index + 1}. ${member.name}`)
        console.log(`   Position: ${member.position}`)
        console.log(`   Slug: ${member.slug?.current}`)
        console.log(`   Has Photo: ${member.photo ? '✅' : '❌'}`)
        console.log(`   Is Partner: ${member.isPartner ? '✅' : '❌'}`)
        console.log(`   Order: ${member.order}`)
        if (member.specialties && member.specialties.length > 0) {
          console.log(`   Specialties: ${member.specialties.join(', ')}`)
        }
      })
    }

    // Test the home page query
    console.log('\n🏠 Testing home page query...')
    const homePageQuery = `*[_type == "siteSettings"][0]`
    const homePageData = await client.fetch(homePageQuery)
    
    if (homePageData) {
      console.log('✅ Home page data found')
      if (homePageData.teamPreview && homePageData.teamPreview.teamMembers) {
        console.log(`📋 Team preview has ${homePageData.teamPreview.teamMembers.length} members`)
      } else {
        console.log('⚠️  No team preview data found')
      }
    } else {
      console.log('❌ No home page data found')
    }

    console.log('\n🎉 Test completed!')

  } catch (error) {
    console.error('❌ Error during test:', error)
  }
}

// Run the test
testTeamFetch()
