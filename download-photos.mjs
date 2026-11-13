import fs from 'fs';
import https from 'https';

const download = (url, dest) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(dest) && fs.statSync(dest).size > 5000) {
      console.log(`Already exists: ${dest}`);
      return resolve();
    }
    const file = fs.createWriteStream(dest);
    const getWithRedirect = (currentUrl) => {
      https.get(currentUrl, (res) => {
        if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
          getWithRedirect(res.headers.location);
          return;
        }
        if (res.statusCode !== 200) {
          file.close();
          fs.unlink(dest, () => {});
          return reject(new Error(`Status ${res.statusCode} for ${currentUrl}`));
        }
        res.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            console.log(`Saved: ${dest}`);
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

const images = [
  // Hero & Architecture dusk villa (from Image 1 style)
  { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/hero-villa.jpg' },
  { url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/hero-villa-night.jpg' },
  
  // Warm glowing living room with wall art (Image 2 style)
  { url: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=2000&q=85', dest: 'public/images/warm-living.jpg' },
  { url: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/about-interior.jpg' },
  
  // Deep emerald moody living room (Image 3 style)
  { url: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/emerald-lounge.jpg' },
  { url: 'https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/emerald-sofa.jpg' },

  // Projects
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/project-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/project-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/project-3.jpg' },
  { url: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/project-4.jpg' },
  { url: 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/project-5.jpg' },
  { url: 'https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/project-6.jpg' },

  // Before & After
  { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/before-renovation.jpg' },
  { url: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85', dest: 'public/images/after-renovation.jpg' },

  // Services
  { url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85', dest: 'public/images/service-arch.jpg' },
  { url: 'https://images.unsplash.com/photo-1616486029423-aaa4789e8c9a?auto=format&fit=crop&w=1200&q=85', dest: 'public/images/service-interior.jpg' },
  { url: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1200&q=85', dest: 'public/images/service-residential.jpg' },
  { url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=85', dest: 'public/images/service-commercial.jpg' },
  { url: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=85', dest: 'public/images/service-kitchen.jpg' },
  { url: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85', dest: 'public/images/service-turnkey.jpg' },

  // Client portraits
  { url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=85', dest: 'public/images/client-1.jpg' },
  { url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=85', dest: 'public/images/client-2.jpg' },
  { url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=400&q=85', dest: 'public/images/client-3.jpg' }
];

async function run() {
  console.log(`Downloading ${images.length} photos...`);
  for (const img of images) {
    try {
      await download(img.url, img.dest);
    } catch (e) {
      console.error(`Failed ${img.dest}:`, e.message);
    }
  }
  console.log('Photos ready!');
}

run();

