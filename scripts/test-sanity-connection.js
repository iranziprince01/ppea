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

async function testSanityConnection() {
  try {
    console.log('🧪 Testing Sanity connection...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables')
      return
    }

    console.log('✅ Environment variables found')
    console.log(`📁 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

    // Test basic connection
    console.log('\n🔌 Testing basic connection...')
    const testQuery = `*[_type == "teamMember"][0]`
    const testResult = await client.fetch(testQuery)
    console.log('✅ Basic connection successful')
    console.log('📊 Test result:', testResult ? 'Data found' : 'No data')

    // Test team members query
    console.log('\n👥 Testing team members query...')
    const teamMembersQuery = `*[_type == "teamMember"] | order(order asc)`
    const teamMembers = await client.fetch(teamMembersQuery)
    console.log(`✅ Team members query successful`)
    console.log(`📊 Found ${teamMembers.length} team members`)

    // Show first few members
    if (teamMembers.length > 0) {
      console.log('\n📋 First 3 team members:')
      teamMembers.slice(0, 3).forEach((member, index) => {
        console.log(`${index + 1}. ${member.name} - ${member.position}`)
      })
    }

    // Test with limit
    console.log('\n🔢 Testing with limit...')
    const limitedQuery = `*[_type == "teamMember"] | order(order asc)[0...10]`
    const limitedMembers = await client.fetch(limitedQuery)
    console.log(`✅ Limited query successful`)
    console.log(`📊 Found ${limitedMembers.length} team members with limit`)

    console.log('\n🎉 All tests passed!')

  } catch (error) {
    console.error('❌ Error during Sanity connection test:', error)
  }
}

// Run the test
testSanityConnection()
