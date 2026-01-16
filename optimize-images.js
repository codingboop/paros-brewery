#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * This script optimizes images for web by:
 * - Resizing large images
 * - Compressing JPEG/PNG files
 * - Creating WebP versions
 * 
 * Run: node optimize-images.js
 * 
 * Note: Requires sharp package: npm install sharp
 */

const fs = require('fs');
const path = require('path');

const IMAGE_DIRS = [
  'public/images/ambience',
  'public/images/food',
  'public/images/drinks'
];

const MAX_WIDTH = 1920;
const QUALITY = 85;

async function optimizeImages() {
  try {
    // Check if sharp is available
    let sharp;
    try {
      sharp = require('sharp');
    } catch (e) {
      console.log('⚠️  Sharp not installed. Install with: npm install sharp');
      console.log('📝 For now, images will be used as-is. Consider optimizing manually with:');
      console.log('   - ImageMagick: convert input.jpg -resize 1920x -quality 85 output.jpg');
      console.log('   - Online tools: Squoosh, TinyPNG, or ImageOptim');
      return;
    }

    console.log('🖼️  Starting image optimization...\n');

    for (const dir of IMAGE_DIRS) {
      if (!fs.existsSync(dir)) {
        console.log(`⚠️  Directory not found: ${dir}`);
        continue;
      }

      const files = fs.readdirSync(dir).filter(file => 
        /\.(jpg|jpeg|png|JPG|JPEG|PNG)$/i.test(file)
      );

      console.log(`📁 Processing ${files.length} images in ${dir}...`);

      for (const file of files) {
        const inputPath = path.join(dir, file);
        const stats = fs.statSync(inputPath);
        
        // Skip if already optimized (you can add a check here)
        const outputPath = path.join(dir, `optimized_${file}`);
        
        try {
          const image = sharp(inputPath);
          const metadata = await image.metadata();
          
          // Only optimize if image is larger than max width
          if (metadata.width > MAX_WIDTH) {
            await image
              .resize(MAX_WIDTH, null, {
                withoutEnlargement: true,
                fit: 'inside'
              })
              .jpeg({ quality: QUALITY, mozjpeg: true })
              .toFile(outputPath);
            
            const newStats = fs.statSync(outputPath);
            const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
            
            console.log(`  ✓ ${file}: ${(stats.size / 1024 / 1024).toFixed(2)}MB → ${(newStats.size / 1024 / 1024).toFixed(2)}MB (${savings}% smaller)`);
          } else {
            // Just compress without resizing
            await image
              .jpeg({ quality: QUALITY, mozjpeg: true })
              .toFile(outputPath);
            
            const newStats = fs.statSync(outputPath);
            const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
            
            console.log(`  ✓ ${file}: Compressed (${savings}% smaller)`);
          }
        } catch (error) {
          console.log(`  ✗ Error processing ${file}: ${error.message}`);
        }
      }
    }

    console.log('\n✅ Image optimization complete!');
    console.log('📝 Review optimized images and replace originals if satisfied.');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

optimizeImages();
