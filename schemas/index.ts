// Only import schemas for dynamic content (blogs)
// Other pages remain static for performance
import blogPost from './blogPost'
import teamMember from './teamMember'
import siteSettings from './siteSettings'
import clientInquiry from './clientInquiry'

export const schemaTypes = [
  // Dynamic content - only blogs
  blogPost,
  teamMember,
  siteSettings,
  
  // Static content - no schemas needed
  // homePage, aboutPage, service, etc. remain static
  
  // Contact form
  clientInquiry,
]
