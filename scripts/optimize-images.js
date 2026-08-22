// scripts/optimize-images.js
//
// Resizes + converts portfolio images to webp using sharp.
// Run: npm install --save-dev sharp   then   node scripts/optimize-images.js
//
// Output goes to src/assets-optimized/ — swap your imports in Home.jsx
// from ./assets/xxx.jpg to ./assets-optimized/xxx.webp once this has run.

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const SRC_DIR = 'src/assets';
const OUT_DIR = 'src/assets-optimized';

// Max display width per use-case (2x the largest CSS-rendered size, for retina).
// Adjust these if you change layout sizes in Home.jsx.
const SIZES = {
  gallery: 320,     // PolaroidPhoto — rendered at ~112-160px wide
  dashboard: 1400,  // Screenshot (project dashboards / demo screenshots)
  headshot: 400,    // circular profile photos — rendered at ~96-128px
};

const FILE_MAP = {
  'ganiyat_bw.jpg': 'headshot',
  'reunite_dashboard.jpeg': 'dashboard',
  'mindease_dashboard.jpeg': 'dashboard',
  'emotion_demo.png': 'dashboard',
  'birthday.JPG': 'gallery',
  'eid.JPG': 'gallery',
  'excursion.jpg': 'gallery',
  'findout.jpg': 'gallery',
  'signout.jpg': 'gallery',
};

async function run() {
  fs.mkdirSync(OUT_DIR, { recursive: true });

  const results = [];

  for (const [file, kind] of Object.entries(FILE_MAP)) {
    const inPath = path.join(SRC_DIR, file);
    if (!fs.existsSync(inPath)) {
      console.warn(`⚠️  Skipping missing file: ${inPath}`);
      continue;
    }

    const outName = file.replace(/\.\w+$/, '.webp');
    const outPath = path.join(OUT_DIR, outName);
    const width = SIZES[kind];

    const before = fs.statSync(inPath).size;

    await sharp(inPath)
      .resize({ width, withoutEnlargement: true })
      .webp({ quality: 78 })
      .toFile(outPath);

    const after = fs.statSync(outPath).size;
    results.push({ file, outName, before, after });
  }

  console.log('\nImage optimization results:\n');
  let totalBefore = 0;
  let totalAfter = 0;
  for (const r of results) {
    totalBefore += r.before;
    totalAfter += r.after;
    const savings = (100 * (1 - r.after / r.before)).toFixed(0);
    console.log(
      `${r.file.padEnd(28)} ${(r.before / 1024).toFixed(0).padStart(7)} KB  →  ${(r.after / 1024).toFixed(0).padStart(6)} KB  (-${savings}%)`
    );
  }
  console.log(
    `\nTotal: ${(totalBefore / 1024 / 1024).toFixed(1)} MB → ${(totalAfter / 1024 / 1024).toFixed(1)} MB\n`
  );
  console.log(`Optimized files written to ${OUT_DIR}/`);
  console.log('Next: update imports in Home.jsx to point at assets-optimized/*.webp\n');
}

run().catch((err) => {
  console.error('Image optimization failed:', err);
  process.exit(1);
});