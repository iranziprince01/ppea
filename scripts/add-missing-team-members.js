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

// Team member data based on available photos
const teamMembersData = [
  {
    name: 'Louise',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Louise.png',
    slug: 'louise',
    isPartner: false,
    order: 5,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Rene',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Rene.jpg',
    slug: 'rene',
    isPartner: false,
    order: 6,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  },
  {
    name: 'Aziza',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Aziza.jpg',
    slug: 'aziza',
    isPartner: false,
    order: 7,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Emmanuel',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Emmanuel.jpg',
    slug: 'emmanuel',
    isPartner: false,
    order: 8,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  },
  {
    name: 'Princia',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Princia.jpg',
    slug: 'princia',
    isPartner: false,
    order: 9,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Stella',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Stella.jpg',
    slug: 'stella',
    isPartner: false,
    order: 10,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  },
  {
    name: 'Ganza',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Ganza.jpg',
    slug: 'ganza',
    isPartner: false,
    order: 11,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Herve',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Herve.jpg',
    slug: 'herve',
    isPartner: false,
    order: 12,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  },
  {
    name: 'Jules',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Jules.jpg',
    slug: 'jules',
    isPartner: false,
    order: 13,
    specialties: ['Legal Research', 'Documentation', 'Client Support']
  },
  {
    name: 'Furaha',
    position: 'Associate',
    photoPath: '/assets/Profile pictures/Furaha.jpg',
    slug: 'furaha',
    isPartner: false,
    order: 14,
    specialties: ['Legal Analysis', 'Case Preparation', 'Client Relations']
  }
]

// Function to upload image to Sanity
async function uploadImage(imagePath) {
  try {
    const fullPath = path.join(process.cwd(), 'public', imagePath)
    
    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  Image not found: ${imagePath}`)
      return null
    }

    const imageBuffer = fs.readFileSync(fullPath)
    const imageAsset = await client.assets.upload('image', imageBuffer, {
      filename: path.basename(imagePath)
    })
    
    console.log(`✅ Uploaded image: ${path.basename(imagePath)}`)
    return imageAsset
  } catch (error) {
    console.error(`❌ Error uploading image ${imagePath}:`, error.message)
    return null
  }
}

// Function to create or update team member
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
      slug: { current: memberData.slug },
      isPartner: memberData.isPartner,
      order: memberData.order,
      specialties: memberData.specialties,
      bio: `Experienced legal professional specializing in ${memberData.specialties.join(', ')}.`,
      contactInfo: {
        email: `${memberData.slug}@ppea.com`,
        phone: '+250 788 XXX XXX'
      }
    }

    if (imageAsset) {
      teamMemberDoc.photo = {
        _type: 'image',
        asset: {
          _type: 'reference',
          _ref: imageAsset._id
        }
      }
    }

    if (existingMember) {
      // Update existing member
      teamMemberDoc._id = existingMember._id
      teamMemberDoc._rev = existingMember._rev
      await client.createOrReplace(teamMemberDoc)
      console.log(`🔄 Updated: ${memberData.name}`)
    } else {
      // Create new member
      await client.create(teamMemberDoc)
      console.log(`✅ Created: ${memberData.name}`)
    }

    return true
  } catch (error) {
    console.error(`❌ Error creating/updating ${memberData.name}:`, error.message)
    return false
  }
}

async function addMissingTeamMembers() {
  try {
    console.log('👥 Adding missing team members...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables')
      return
    }

    console.log('✅ Environment variables found')
    console.log(`📁 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

    let successCount = 0
    let totalCount = teamMembersData.length

    console.log(`\n📋 Processing ${totalCount} team members...`)

    for (const memberData of teamMembersData) {
      console.log(`\n👤 Processing: ${memberData.name}`)
      
      // Upload image
      const imageAsset = await uploadImage(memberData.photoPath)
      
      // Create or update team member
      const success = await createOrUpdateTeamMember(memberData, imageAsset)
      
      if (success) {
        successCount++
      }
    }

    console.log(`\n🎉 Team member addition completed!`)
    console.log(`📊 Successfully processed: ${successCount}/${totalCount} team members`)
    
    if (successCount > 0) {
      console.log('\n📋 Next steps:')
      console.log('1. Open Sanity Studio at http://localhost:3333')
      console.log('2. Check the Team Member section')
      console.log('3. You should now see all team members')
      console.log('4. You can edit their details, positions, and specialties')
      
      // Update site settings to include new team members in preview
      console.log('\n🔄 Updating site settings...')
      try {
        await require('./update-site-settings.js')
        console.log('✅ Site settings updated')
      } catch (error) {
        console.log('⚠️  Could not update site settings automatically')
      }
    }

  } catch (error) {
    console.error('❌ Error during team member addition:', error)
  }
}

// Run the script
addMissingTeamMembers()
