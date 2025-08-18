require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@sanity/client');

console.log('🔍 COMPREHENSIVE SANITY CONNECTION TEST\n');
console.log('=' .repeat(50));

// 1. Environment Variables Check
console.log('1️⃣ ENVIRONMENT VARIABLES:');
console.log('   Project ID:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '❌ MISSING');
console.log('   Dataset:', process.env.NEXT_PUBLIC_SANITY_DATASET || '❌ MISSING');
console.log('   API Token:', process.env.SANITY_API_TOKEN ? '✅ FOUND' : '❌ MISSING');
console.log('   Site URL:', process.env.NEXT_PUBLIC_SITE_URL || '❌ MISSING');

// 2. Configuration Files Check
console.log('\n2️⃣ CONFIGURATION FILES:');
const fs = require('fs');

if (fs.existsSync('sanity.config.ts')) {
  console.log('   ✅ sanity.config.ts exists');
} else {
  console.log('   ❌ sanity.config.ts missing');
}

if (fs.existsSync('sanity.cli.js')) {
  console.log('   ✅ sanity.cli.js exists');
} else {
  console.log('   ❌ sanity.cli.js missing');
}

if (fs.existsSync('.sanityrc')) {
  console.log('   ✅ .sanityrc exists');
} else {
  console.log('   ❌ .sanityrc missing');
}

// 3. Sanity Client Test
console.log('\n3️⃣ SANITY CLIENT CONNECTION:');
if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.SANITY_API_TOKEN) {
  console.log('   ❌ Cannot test client - missing environment variables');
} else {
  const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: process.env.SANITY_API_TOKEN,
  });

  // Test basic connection
  client.fetch('*[_type == "service"][0...1]')
    .then(result => {
      console.log('   ✅ Client connection successful');
      console.log('   ✅ API responding correctly');
      console.log('   ✅ Found services:', result ? result.length : 0);
    })
    .catch(error => {
      console.log('   ❌ Client connection failed:', error.message);
    });
}

// 4. Studio Deployment Check
console.log('\n4️⃣ STUDIO DEPLOYMENT:');
console.log('   🌐 Studio URL: https://ppeastudio.sanity.studio/');
console.log('   📁 Studio Host: ppeastudio');

// 5. Schema Check
console.log('\n5️⃣ SCHEMA VALIDATION:');
const schemasDir = './schemas';
if (fs.existsSync(schemasDir)) {
  const schemaFiles = fs.readdirSync(schemasDir).filter(file => file.endsWith('.ts'));
  console.log('   ✅ Schema files found:', schemaFiles.length);
  schemaFiles.forEach(file => console.log('      -', file));
} else {
  console.log('   ❌ Schemas directory missing');
}

console.log('\n' + '=' .repeat(50));
console.log('🏁 TEST COMPLETE');
