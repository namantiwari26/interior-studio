import fs from 'fs';
import path from 'path';
import https from 'https';

const downloadFile = (url, dest) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 10000) {
      console.log(`Already exists: ${dest}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    const getWithRedirect = (currentUrl) => {
      https.get(currentUrl, (response) => {
        if (response.statusCode >= 300 && response.statusCode < 400 && response.headers.location) {
          getWithRedirect(response.headers.location);
          return;
        }
        if (response.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Failed to get '${currentUrl}' (${response.statusCode})`));
        }
        response.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`Downloaded: ${dest}`);
            resolve();
          });
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    getWithRedirect(url);
  });
};

async function main() {
  const panos = [
    { url: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/reading_room.jpg', dest: 'public/panoramas/living.jpg' },
    { url: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/hotel_room.jpg', dest: 'public/panoramas/bedroom.jpg' },
    { url: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/art_studio.jpg', dest: 'public/panoramas/kitchen.jpg' },
    { url: 'https://dl.polyhaven.org/file/ph-assets/HDRIs/extra/Tonemapped%20JPG/ballroom.jpg', dest: 'public/panoramas/dining.jpg' }
  ];

  const models = [
    { url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/GlamVelvetSofa/glTF-Binary/GlamVelvetSofa.glb', dest: 'public/models/sofa.glb' },
    { url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/SheenChair/glTF-Binary/SheenChair.glb', dest: 'public/models/armchair.glb' },
    { url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/ChairDamaskPurplegold/glTF-Binary/ChairDamaskPurplegold.glb', dest: 'public/models/accent-chair.glb' },
    { url: 'https://raw.githubusercontent.com/KhronosGroup/glTF-Sample-Assets/main/Models/GlassVaseFlowers/glTF-Binary/GlassVaseFlowers.glb', dest: 'public/models/decor-vase.glb' }
  ];

  console.log('Downloading panoramas...');
  for (const p of panos) {
    try {
      await downloadFile(p.url, p.dest);
    } catch (e) {
      console.error(`Error downloading ${p.dest}:`, e.message);
    }
  }

  console.log('Downloading 3D models...');
  for (const m of models) {
    try {
      await downloadFile(m.url, m.dest);
    } catch (e) {
      console.error(`Error downloading ${m.dest}:`, e.message);
    }
  }

  console.log('Done downloading assets!');
}

main();

