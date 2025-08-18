#!/usr/bin/env node

/**
 * Favicon Generator Script for Probity Partners East Africa
 * This script helps generate the required favicon files from the SVG
 */

const fs = require('fs');
const path = require('path');

console.log('🎨 Favicon Generator for Probity Partners East Africa');
console.log('==================================================\n');

// Check if required files exist
const publicDir = path.join(process.cwd(), 'public');
const svgPath = path.join(publicDir, 'favicon.svg');

if (!fs.existsSync(svgPath)) {
  console.log('❌ favicon.svg not found in public/ directory');
  console.log('Please ensure the SVG favicon exists before running this script.\n');
  process.exit(1);
}

console.log('✅ Found favicon.svg');
console.log('📁 Public directory:', publicDir);

// List current favicon files
console.log('\n📋 Current favicon files:');
const files = fs.readdirSync(publicDir).filter(file => 
  file.startsWith('favicon') || file.includes('apple-touch') || file.includes('manifest')
);

files.forEach(file => {
  const filePath = path.join(publicDir, file);
  const stats = fs.statSync(filePath);
  const size = stats.size;
  
  if (file.endsWith('.svg') || file.endsWith('.webmanifest')) {
    console.log(`  ✅ ${file} (${size} bytes)`);
  } else if (file.includes('placeholder') || file.includes('#')) {
    console.log(`  ⏳ ${file} (placeholder - needs conversion)`);
  } else {
    console.log(`  ❓ ${file} (${size} bytes)`);
  }
});

console.log('\n🔄 Next Steps:');
console.log('1. Download the SVG favicon from: http://localhost:3000/favicon.svg');
console.log('2. Convert to required formats using online tools:');
console.log('   • ICO: https://favicon.io/favicon-converter/');
console.log('   • PNG: https://cloudconvert.com/svg-to-png');
console.log('3. Place converted files in public/ directory');
console.log('4. Restart your development server');

console.log('\n📱 Required Formats:');
console.log('  • favicon.ico (16x16, 32x32, 48x48)');
console.log('  • favicon.png (32x32)');
console.log('  • apple-touch-icon.png (180x180)');

console.log('\n🎯 Quick Conversion:');
console.log('1. Go to: https://favicon.io/favicon-converter/');
console.log('2. Upload your SVG file');
console.log('3. Download all generated formats');
console.log('4. Replace placeholder files in public/ directory');

console.log('\n✨ Your favicon design features:');
console.log('  • Professional blue (#1e40af) background');
console.log('  • Scales of justice symbol');
console.log('  • Modern geometric accents');
console.log('  • Clean, law firm aesthetic');

console.log('\n🚀 Ready to generate professional favicons!');
