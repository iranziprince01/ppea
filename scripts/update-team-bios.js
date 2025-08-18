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

// Team member data with proper bios and details
const teamMembersData = [
  {
    name: 'Me Alice Umulisa Kayigamba',
    position: 'Managing Partner',
    shortBio: 'Leading our firm with over 15 years of experience in corporate law and strategic legal counsel.',
    slug: 'alice-umulisa',
    isPartner: true,
    order: 1,
    specialties: ['Corporate Law', 'Strategic Legal Counsel', 'Leadership', 'Human Rights', 'Public International Law']
  },
  {
    name: 'Aloys Ntirushwamaboko',
    position: 'Senior Partner',
    shortBio: 'Specializing in litigation and dispute resolution with a track record of successful case outcomes.',
    slug: 'aloys-ntirushwamaboko',
    isPartner: true,
    order: 2,
    specialties: ['Litigation', 'Dispute Resolution', 'Corporate Law', 'Public International Law', 'Commercial Practice']
  },
  {
    name: 'Evode Kayitana',
    position: 'Partner',
    shortBio: 'Expert in real estate law and corporate transactions, providing strategic legal solutions.',
    slug: 'evode-kayitana',
    isPartner: true,
    order: 3,
    specialties: ['Real Estate Law', 'Corporate Transactions', 'Strategic Planning']
  },
  {
    name: 'Prince Iranzi',
    position: 'Legal lawyer',
    shortBio: 'Dedicated legal professional providing comprehensive legal services and client support.',
    slug: 'prince-iranzi',
    isPartner: false,
    order: 4,
    specialties: ['Legal Services', 'Client Support', 'Documentation']
  },
  {
    name: 'Louise',
    position: 'Associate',
    shortBio: 'Experienced legal professional specializing in legal research and documentation.',
    slug: 'louise',
    isPartner: false,
    order: 5,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Rene',
    position: 'Associate',
    shortBio: 'Skilled legal analyst with expertise in case preparation and client relations.',
    slug: 'rene',
    isPartner: false,
    order: 6,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  },
  {
    name: 'Aziza',
    position: 'Associate',
    shortBio: 'Dedicated legal professional providing comprehensive research and documentation support.',
    slug: 'aziza',
    isPartner: false,
    order: 7,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Emmanuel',
    position: 'Associate',
    shortBio: 'Experienced legal analyst specializing in case preparation and client relationship management.',
    slug: 'emmanuel',
    isPartner: false,
    order: 8,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  },
  {
    name: 'Princia',
    position: 'Associate',
    shortBio: 'Skilled legal professional providing research and documentation services.',
    slug: 'princia',
    isPartner: false,
    order: 9,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Stella',
    position: 'Associate',
    shortBio: 'Dedicated legal analyst with expertise in case preparation and client support.',
    slug: 'stella',
    isPartner: false,
    order: 10,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  },
  {
    name: 'Ganza',
    position: 'Associate',
    shortBio: 'Experienced legal professional providing research and documentation support.',
    slug: 'ganza',
    isPartner: false,
    order: 11,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Herve',
    position: 'Associate',
    shortBio: 'Skilled legal analyst specializing in case preparation and client relations.',
    slug: 'herve',
    isPartner: false,
    order: 12,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  },
  {
    name: 'Jules',
    position: 'Associate',
    shortBio: 'Dedicated legal professional providing research and documentation services.',
    slug: 'jules',
    isPartner: false,
    order: 13,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Furaha',
    position: 'Associate',
    shortBio: 'Experienced legal analyst with expertise in case preparation and client support.',
    slug: 'furaha',
    isPartner: false,
    order: 14,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  }
]

async function updateTeamBios() {
  try {
    console.log('📝 Updating team member bios...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables')
      return
    }

    console.log('✅ Environment variables found')
    console.log(`📁 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

    let updatedCount = 0
    let totalCount = teamMembersData.length

    console.log(`\n📋 Processing ${totalCount} team members...`)

    for (const memberData of teamMembersData) {
      try {
        // Find existing team member by slug
        const existingMember = await client.fetch(
          `*[_type == "teamMember" && slug.current == $slug][0]`,
          { slug: memberData.slug }
        )

        if (existingMember) {
          // Update the member with new bio and details
          const updatedMember = {
            ...existingMember,
            name: memberData.name,
            position: memberData.position,
            shortBio: memberData.shortBio,
            isPartner: memberData.isPartner,
            order: memberData.order,
            specialties: memberData.specialties
          }

          await client.createOrReplace(updatedMember)
          console.log(`✅ Updated: ${memberData.name}`)
          updatedCount++
        } else {
          console.log(`⚠️  Not found: ${memberData.name}`)
        }
      } catch (error) {
        console.error(`❌ Error updating ${memberData.name}:`, error.message)
      }
    }

    console.log(`\n🎉 Team member bio update completed!`)
    console.log(`📊 Successfully updated: ${updatedCount}/${totalCount} team members`)
    
    if (updatedCount > 0) {
      console.log('\n📋 Next steps:')
      console.log('1. Refresh your website at http://localhost:3000/team')
      console.log('2. You should now see all team members with proper bios')
      console.log('3. Check Sanity Studio to verify the updates')
    }

  } catch (error) {
    console.error('❌ Error during team bio update:', error)
  }
}

// Run the script
updateTeamBios()
