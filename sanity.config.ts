import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'Probity Partners East Africa',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  basePath: '/studio',
  apiVersion: '2024-01-01',
  plugins: [deskTool(), visionTool()],
  schema: {
    types: schemaTypes,
  },
  cors: {
    credentials: 'include',
    origin: [
      'http://localhost:3000', 
      'http://localhost:3333',
      'https://your-production-domain.com' // Add your production domain
    ]
  }
})
