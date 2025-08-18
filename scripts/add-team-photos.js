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

// Team member photo mapping
const teamPhotoMapping = [
  {
    slug: 'alice-umulisa',
    photoPath: '/assets/Profile pictures/Alice.jpg'
  },
  {
    slug: 'keza-ntaganda',
    photoPath: '/assets/Profile pictures/Keza.jpg'
  },
  {
    slug: 'rene-munyamahoro',
    photoPath: '/assets/Profile pictures/Rene.jpg'
  },
  {
    slug: 'furaha-umutoni',
    photoPath: '/assets/Profile pictures/Furaha.jpg'
  },
  {
    slug: 'mukashema-louise',
    photoPath: '/assets/Profile pictures/Louise.png'
  },
  {
    slug: 'aloys-ntirushwamaboko',
    photoPath: '/assets/Profile pictures/Aloys.jpg'
  },
  {
    slug: 'aziza-lola',
    photoPath: '/assets/Profile pictures/Aziza.jpg'
  },
  {
    slug: 'jules-lambert',
    photoPath: '/assets/Profile pictures/Jules.jpg'
  },
  {
    slug: 'bakunda-emmanuel',
    photoPath: '/assets/Profile pictures/Emmanuel.jpg'
  },
  {
    slug: 'anny-princia',
    photoPath: '/assets/Profile pictures/Princia.jpg'
  },
  {
    slug: 'mary-stella',
    photoPath: '/assets/Profile pictures/Stella.jpg'
  },
  {
    slug: 'muhire-herve',
    photoPath: '/assets/Profile pictures/Herve.jpg'
  },
  {
    slug: 'ntaganda-ganza',
    photoPath: '/assets/Profile pictures/Ganza.jpg'
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

// Function to update team member with photo
async function updateTeamMemberPhoto(slug, imageAsset) {
  try {
    // Find existing team member by slug
    const existingMember = await client.fetch(
      `*[_type == "teamMember" && slug.current == $slug][0]`,
      { slug: slug }
    )

    if (existingMember && imageAsset) {
      // Update the member with photo
      const updatedMember = {
        ...existingMember,
        photo: {
          _type: 'image',
          asset: {
            _type: 'reference',
            _ref: imageAsset._id
          }
        }
      }

      await client.createOrReplace(updatedMember)
      console.log(`✅ Updated photo for: ${existingMember.name}`)
      return true
    } else {
      console.log(`⚠️  Member not found or no image: ${slug}`)
      return false
    }
  } catch (error) {
    console.error(`❌ Error updating photo for ${slug}:`, error.message)
    return false
  }
}

async function addTeamPhotos() {
  try {
    console.log('📸 Adding photos to team members...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables')
      return
    }

    console.log('✅ Environment variables found')
    console.log(`📁 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

    let successCount = 0
    let totalCount = teamPhotoMapping.length

    console.log(`\n📋 Processing ${totalCount} team members...`)

    for (const memberData of teamPhotoMapping) {
      console.log(`\n👤 Processing: ${memberData.slug}`)
      
      // Upload image
      const imageAsset = await uploadImage(memberData.photoPath)
      
      // Update team member with photo
      const success = await updateTeamMemberPhoto(memberData.slug, imageAsset)
      
      if (success) {
        successCount++
      }
    }

    console.log(`\n🎉 Team photo addition completed!`)
    console.log(`📊 Successfully updated: ${successCount}/${totalCount} team members`)
    
    if (successCount > 0) {
      console.log('\n📋 Next steps:')
      console.log('1. Refresh your website at http://localhost:3000/team')
      console.log('2. You should now see all team members with photos')
      console.log('3. Check Sanity Studio to verify the photo updates')
    }

  } catch (error) {
    console.error('❌ Error during team photo addition:', error)
  }
}

// Run the script
addTeamPhotos()
