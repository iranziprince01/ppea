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

async function updateSiteSettings() {
  try {
    console.log('🔄 Updating site settings...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables')
      return
    }

    // Get existing site settings
    const existingSettings = await client.fetch(`*[_type == "siteSettings"][0]`)
    
    if (!existingSettings) {
      console.error('❌ No site settings found. Run npm run sanity:populate first.')
      return
    }

    // Get team members for preview
    const teamMembers = await client.fetch(`*[_type == "teamMember"] | order(order asc)`)
    
    // Create team preview data
    const teamPreview = {
      heading: 'Meet Our Attorneys',
      description: 'Our experienced legal professionals are dedicated to providing exceptional service and achieving the best possible outcomes for our clients.',
      teamMembers: teamMembers.slice(0, 3).map(member => ({
        _id: member._id,
        name: member.name,
        position: member.position,
        shortBio: member.shortBio,
        photo: member.photo,
        slug: member.slug
      }))
    }

    // Update site settings
    const updatedSettings = {
      ...existingSettings,
      teamPreview: teamPreview
    }

    await client.createOrReplace(updatedSettings)
    
    console.log('✅ Site settings updated successfully!')
    console.log(`📋 Team preview now includes ${teamPreview.teamMembers.length} members:`)
    teamPreview.teamMembers.forEach((member, index) => {
      console.log(`   ${index + 1}. ${member.name} - ${member.position}`)
    })

  } catch (error) {
    console.error('❌ Error updating site settings:', error)
  }
}

// Run the update
updateSiteSettings()
