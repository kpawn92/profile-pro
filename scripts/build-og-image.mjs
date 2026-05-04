// Regenerate public/og-image.png from public/og-image.svg.
//
// Usage:
//   npx --yes --package=sharp@latest node scripts/build-og-image.mjs
//
// The PNG is what gets served to crawlers (WhatsApp, Twitter, LinkedIn,
// Facebook) — those platforms do not support SVG for OG previews.
// The SVG is the editable master; the PNG is the rasterised output.

import sharp from 'sharp';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, '..');

const input = resolve(root, 'public', 'og-image.svg');
const output = resolve(root, 'public', 'og-image.png');

const info = await sharp(input)
  .resize(1200, 630, { fit: 'fill' })
  .png({ quality: 95, compressionLevel: 9 })
  .toFile(output);

console.log(`✓ ${output}  ${info.width}×${info.height}  ${info.size} bytes`);
