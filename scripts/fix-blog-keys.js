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

// Function to add missing keys to PortableText blocks
function addMissingKeys(body) {
  if (!body || !Array.isArray(body)) return body
  
  return body.map((block, blockIndex) => {
    const updatedBlock = { ...block }
    
    // Add _key to block if missing
    if (!updatedBlock._key) {
      updatedBlock._key = `block${blockIndex + 1}`
    }
    
    // Add _key to children if they exist
    if (updatedBlock.children && Array.isArray(updatedBlock.children)) {
      updatedBlock.children = updatedBlock.children.map((child, childIndex) => {
        const updatedChild = { ...child }
        if (!updatedChild._key) {
          updatedChild._key = `span${blockIndex + 1}_${childIndex + 1}`
        }
        return updatedChild
      })
    }
    
    return updatedBlock
  })
}

async function fixBlogKeys() {
  try {
    console.log('🔧 Fixing missing keys in blog posts...')
    
    // Check if we have the required environment variables
    if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
      console.error('❌ Missing required environment variables')
      return
    }

    console.log('✅ Environment variables found')
    console.log(`📁 Project ID: ${process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}`)
    console.log(`📊 Dataset: ${process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'}`)

    // Get all blog posts
    const blogPosts = await client.fetch(`*[_type == "blogPost"]`)
    console.log(`📊 Found ${blogPosts.length} blog posts to check`)

    let fixedCount = 0

    for (const post of blogPosts) {
      let needsUpdate = false
      const updatedPost = { ...post }

      // Check if body has missing keys
      if (post.body && Array.isArray(post.body)) {
        const hasMissingKeys = post.body.some(block => !block._key || 
          (block.children && block.children.some(child => !child._key)))
        
        if (hasMissingKeys) {
          console.log(`🔧 Fixing keys for: ${post.title}`)
          updatedPost.body = addMissingKeys(post.body)
          needsUpdate = true
        }
      }

      // Update the post if needed
      if (needsUpdate) {
        try {
          await client.createOrReplace(updatedPost)
          console.log(`✅ Fixed: ${post.title}`)
          fixedCount++
        } catch (error) {
          console.error(`❌ Error fixing ${post.title}:`, error.message)
        }
      } else {
        console.log(`✅ Already correct: ${post.title}`)
      }
    }

    console.log(`\n🎉 Blog post keys fix completed!`)
    console.log(`📊 Fixed ${fixedCount} blog posts`)
    
    if (fixedCount > 0) {
      console.log('\n📋 Next steps:')
      console.log('1. Open Sanity Studio at http://localhost:3333')
      console.log('2. Check the Blog Post section')
      console.log('3. The "Missing keys" error should be resolved')
      console.log('4. You can now edit blog posts normally')
    } else {
      console.log('\n✅ All blog posts already have proper keys!')
    }

  } catch (error) {
    console.error('❌ Error during blog keys fix:', error)
  }
}

// Run the fix script
fixBlogKeys()
