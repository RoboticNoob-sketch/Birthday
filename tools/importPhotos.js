const fs = require('fs');
const path = require('path');

const src = process.argv[2];
if (!src) {
  console.error('Usage: node tools/importPhotos.js <source-folder>');
  process.exit(1);
}

const dest = path.join(__dirname, '..', 'public', 'assets', 'photos');
if (!fs.existsSync(dest)) fs.mkdirSync(dest, { recursive: true });

const exts = ['.jpg', '.jpeg', '.png', '.webp', '.svg'];
const files = fs.readdirSync(src).filter((f) => exts.includes(path.extname(f).toLowerCase()));

files.slice(0, 20).forEach((file, i) => {
  const ext = path.extname(file);
  const destName = `photo-${i + 1}${ext}`;
  fs.copyFileSync(path.join(src, file), path.join(dest, destName));
  console.log(`Copied ${file} -> ${destName}`);
});

console.log('Import complete. Restart dev server if running.');
