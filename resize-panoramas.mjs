import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const dir = 'public/panoramas';
const files = ['living.jpg', 'bedroom.jpg', 'kitchen.jpg', 'dining.jpg'];

async function processImages() {
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (!fs.existsSync(fullPath)) continue;

    console.log(`Resizing ${file}...`);
    const tempPath = path.join(dir, `temp_${file}`);

    await sharp(fullPath)
      .resize(2048, 1024, { fit: 'fill' })
      .jpeg({ quality: 88, mozjpeg: true })
      .toFile(tempPath);

    fs.unlinkSync(fullPath);
    fs.renameSync(tempPath, fullPath);

    const stats = fs.statSync(fullPath);
    console.log(`Processed ${file}: ${(stats.size / 1024).toFixed(1)} KB`);
  }
  console.log('All panoramas resized successfully to 2048x1024!');
}

processImages();

