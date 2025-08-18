const { createClient } = require('@sanity/client')
const fs = require('fs')
const path = require('path')
require('dotenv').config({ path: '.env.local' })

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

// Team member data with correct image paths
const teamMembersData = [
  {
    name: 'Me Alice Umulisa Kayigamba',
    position: 'Managing Partner',
    shortBio: 'Leading our firm with over 15 years of experience in corporate law and strategic legal counsel.',
    photoPath: './public/assets/Profile pictures/Alice.jpg',
    slug: 'alice-umulisa',
    isPartner: true,
    specialties: ['Corporate Law', 'Strategic Legal Counsel', 'Leadership'],
    order: 1
  },
  {
    name: 'Aloys Ntirushwamaboko',
    position: 'Senior Partner',
    shortBio: 'Specializing in litigation and dispute resolution with a track record of successful case outcomes.',
    photoPath: './public/assets/Profile pictures/Aloys.jpg',
    slug: 'aloys-ntirushwamaboko',
    isPartner: true,
    specialties: ['Litigation', 'Dispute Resolution', 'Corporate Law'],
    order: 2
  },
  {
    name: 'Evode Kayitana',
    position: 'Partner',
    shortBio: 'Expert in real estate law and corporate transactions, providing strategic legal solutions.',
    photoPath: './public/assets/Profile pictures/Keza.jpg',
    slug: 'evode-kayitana',
    isPartner: true,
    specialties: ['Real Estate Law', 'Corporate Transactions', 'Strategic Planning'],
    order: 3
  }
]

async function uploadImage(imagePath) {
  try {
    if (!fs.existsSync(imagePath)) {
      console.log(`⚠️  Image not found: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(imagePath)
    const asset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    })
    
    console.log(`✅ Uploaded image: ${path.basename(imagePath)}`)
    return asset
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error.message)
    return null
  }
}

async function createOrUpdateTeamMember(memberData, imageAsset) {
  try {
    // Check if team member already exists
    const existingMember = await client.fetch(
      `*[_type == "teamMember" && slug.current == $slug][0]`,
      { slug: memberData.slug }
    )

    const teamMemberDoc = {
      _type: 'teamMember',
      name: memberData.name,
      position: memberData.position,
      shortBio: memberData.shortBio,
      slug: {
        _type: 'slug',
        current: memberData.slug
      },
      isPartner: memberData.isPartner,
      specialties: memberData.specialties,
      order: memberData.order
    }

    // Add photo if uploaded successfully
    if (imageAsset) {
      teamMemberDoc.photo = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      }
    }

    let result
    if (existingMember) {
      // Update existing member
      result = await client.createOrReplace({
        ...teamMemberDoc,
        _id: existingMember._id
      })
      console.log(`✅ Updated team member: ${memberData.name}`)
    } else {
      // Create new member
      result = await client.create(teamMemberDoc)
      console.log(`✅ Created team member: ${memberData.name}`)
    }

    return result
  } catch (error) {
    console.error(`❌ Error creating/updating team member ${memberData.name}:`, error.message)
    return null
  }
}

async function fixTeamMembers() {
  try {
    console.log('🚀 Starting team member image fix...')
    
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

    // Process each team member
    for (const memberData of teamMembersData) {
      console.log(`\n👤 Processing: ${memberData.name}`)
      
      // Upload image
      const imageAsset = await uploadImage(memberData.photoPath)
      
      // Create or update team member
      await createOrUpdateTeamMember(memberData, imageAsset)
    }

    console.log('\n🎉 Team member fix completed!')
    console.log('\n📋 Next steps:')
    console.log('1. Open Sanity Studio at http://localhost:3333')
    console.log('2. Check that team members appear in the Team Member section')
    console.log('3. Verify images are displayed correctly')
    console.log('4. Your website will automatically reflect the changes')

  } catch (error) {
    console.error('❌ Error during team member fix:', error)
  }
}

// Run the fix script
fixTeamMembers()
