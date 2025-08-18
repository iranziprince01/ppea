require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

console.log('🌐 WEBSITE SANITY DATA TEST\n');
console.log('=' .repeat(50));

// Create Sanity client
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});

console.log('🔍 Testing data queries that your website uses...\n');

// Test 1: Home Page Data
console.log('1️⃣ HOME PAGE DATA:');
client.fetch('*[_type == "homePage"][0]')
  .then(result => {
    if (result) {
      console.log('   ✅ Home page data found');
      console.log('   📝 Hero title:', result.hero?.title || 'Not set');
      console.log('   📝 Marquee items:', result.marqueeHeadings?.length || 0);
    } else {
      console.log('   ⚠️  No home page data found (will use fallback)');
    }
  })
  .catch(error => {
    console.log('   ❌ Error fetching home page:', error.message);
  });

// Test 2: Services Data
console.log('\n2️⃣ SERVICES DATA:');
client.fetch('*[_type == "service"]')
  .then(result => {
    if (result && result.length > 0) {
      console.log('   ✅ Services found:', result.length);
      console.log('   📝 First service:', result[0].title || 'No title');
      console.log('   📝 Featured services:', result.filter(s => s.featured).length);
    } else {
      console.log('   ⚠️  No services found (will use fallback)');
    }
  })
  .catch(error => {
    console.log('   ❌ Error fetching services:', error.message);
  });

// Test 3: Team Members Data
console.log('\n3️⃣ TEAM MEMBERS DATA:');
client.fetch('*[_type == "teamMember"]')
  .then(result => {
    if (result && result.length > 0) {
      console.log('   ✅ Team members found:', result.length);
      console.log('   📝 Partners:', result.filter(t => t.isPartner).length);
      console.log('   📝 Associates:', result.filter(t => !t.isPartner).length);
    } else {
      console.log('   ⚠️  No team members found (will use fallback)');
    }
  })
  .catch(error => {
    console.log('   ❌ Error fetching team members:', error.message);
  });

// Test 4: About Page Data
console.log('\n4️⃣ ABOUT PAGE DATA:');
client.fetch('*[_type == "aboutPage"][0]')
  .then(result => {
    if (result) {
      console.log('   ✅ About page data found');
      console.log('   📝 Mission:', result.mission?.heading || 'Not set');
      console.log('   📝 Values:', result.values?.valueList?.length || 0);
    } else {
      console.log('   ⚠️  No about page data found (will use fallback)');
    }
  })
  .catch(error => {
    console.log('   ❌ Error fetching about page:', error.message);
  });

// Test 5: Blog Posts Data
console.log('\n5️⃣ BLOG POSTS DATA:');
client.fetch('*[_type == "blogPost"]')
  .then(result => {
    if (result && result.length > 0) {
      console.log('   ✅ Blog posts found:', result.length);
      console.log('   📝 Latest post:', result[0].title || 'No title');
    } else {
      console.log('   ⚠️  No blog posts found (will use fallback)');
    }
  })
  .catch(error => {
    console.log('   ❌ Error fetching blog posts:', error.message);
  });

console.log('\n' + '=' .repeat(50));
console.log('🏁 WEBSITE DATA TEST COMPLETE');
console.log('\n💡 Note: If no data is found, your website will use fallback data.');
console.log('   Create content in Sanity Studio to see real data!');
