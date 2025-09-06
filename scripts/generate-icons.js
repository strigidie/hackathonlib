/**
 * Icon Generator Script for Foodiet PWA
 * 
 * This script generates PWA icons from a base SVG
 * Run with: node scripts/generate-icons.js
 */

const fs = require('fs');
const path = require('path');

// Create a simple SVG icon for Foodiet
const createFoodietIcon = (size) => {
  return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1f2937;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" rx="${size * 0.2}" fill="url(#grad)"/>
  <text x="50%" y="50%" font-family="Arial, sans-serif" font-size="${size * 0.6}" font-weight="bold" text-anchor="middle" dy="0.35em" fill="white">F</text>
  <circle cx="${size * 0.8}" cy="${size * 0.2}" r="${size * 0.15}" fill="#00d4aa"/>
</svg>`;
};

// Icon sizes for PWA
const iconSizes = [72, 96, 128, 144, 152, 192, 384, 512];

// Create icons directory if it doesn't exist
const iconsDir = path.join(__dirname, '..', 'public', 'icons');
if (!fs.existsSync(iconsDir)) {
  fs.mkdirSync(iconsDir, { recursive: true });
}

// Generate SVG icons
iconSizes.forEach(size => {
  const svgContent = createFoodietIcon(size);
  const filename = `icon-${size}x${size}.svg`;
  const filepath = path.join(iconsDir, filename);
  
  fs.writeFileSync(filepath, svgContent);
  console.log(`Generated ${filename}`);
});

// Create a simple favicon.ico placeholder
const faviconSvg = createFoodietIcon(32);
const faviconPath = path.join(__dirname, '..', 'public', 'favicon.svg');
fs.writeFileSync(faviconPath, faviconSvg);
console.log('Generated favicon.svg');

// Create apple-touch-icon
const appleIconSvg = createFoodietIcon(180);
const appleIconPath = path.join(__dirname, '..', 'public', 'apple-touch-icon.png');
// Note: In a real scenario, you'd convert SVG to PNG using a library like sharp
// For now, we'll create an SVG version
const appleIconSvgPath = path.join(__dirname, '..', 'public', 'apple-touch-icon.svg');
fs.writeFileSync(appleIconSvgPath, appleIconSvg);
console.log('Generated apple-touch-icon.svg');

console.log('\n✅ PWA icons generated successfully!');
console.log('📝 Note: For production, convert SVG icons to PNG format using tools like:');
console.log('   - Online converters (SVG to PNG)');
console.log('   - ImageMagick: convert icon-192x192.svg icon-192x192.png');
console.log('   - Sharp library for automated conversion');
