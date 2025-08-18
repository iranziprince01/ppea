require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

console.log('🔍 Testing Sanity Connection...\n');

// Check environment variables
console.log('Environment Variables:');
console.log('Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID ? '✅ Found' : '❌ Missing');
console.log('Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET ? '✅ Found' : '❌ Missing');
console.log('API Token:', process.env.SANITY_API_TOKEN ? '✅ Found' : '❌ Missing');
console.log('Site URL:', process.env.NEXT_PUBLIC_SITE_URL ? '✅ Found' : '❌ Missing');

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.log('\n❌ Missing required environment variables!');
  process.exit(1);
}

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

console.log('\n🚀 Testing API connection...');

// Test query
client.fetch('*[_type == "service"][0...3]')
  .then(result => {
    console.log('✅ Sanity connection successful!');
    console.log('Found services:', result ? result.length : 0);
    if (result && result.length > 0) {
      console.log('First service:', result[0].title || 'No title');
    }
  })
  .catch(error => {
    console.log('❌ Sanity connection failed:');
    console.log('Error:', error.message);
    
    if (error.message.includes('401')) {
      console.log('\n💡 This looks like an authentication error. Check your API token.');
    } else if (error.message.includes('404')) {
      console.log('\n💡 This looks like a project not found error. Check your project ID.');
    }
  });
