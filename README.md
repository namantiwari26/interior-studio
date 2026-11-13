# AAKRITI Interiors & Architecture — 3D WebGL Studio Experience

> **"Designing spaces. Elevating lives."**
> A cinematic, high-performance interior design and architecture studio web application built with React, WebGL, Three.js, React Three Fiber, GSAP, and Tailwind CSS v4.

---

## 🌟 Key Features

### 1. 360° Photorealistic Virtual Reality Tour
- **Inside-Out Panoramic Spheres:** Real-time equirectangular mapping with seamless room teleportation.
- **Interactive Teleport Hotspots:** Glowing 3D spatial rings created with `@react-three/drei`'s `<Html>` that smoothly zoom and transition between environments.
- **Damping & Gyroscope-ready:** Custom inertial camera controller with zoom clamp ($35^\circ$ to $85^\circ$ FOV), smooth drag, and idle auto-rotation.
- **Multi-Room Selector:** Switch instantly between the **Executive Living Salon**, **Presidential Master Suite**, **Atelier Kitchen & Lounge**, and **Grand Dining & Banquet**.
- **Optimized Textures:** $2048 \times 1024$ WebGL-compliant equirectangular textures with texture caching to prevent VRAM overflow.

### 2. Interactive 3D Bespoke Furniture Atelier
- **glTF / GLB PBR Loaders:** Real-time 3D furniture models (Milano Curved Velvet Sofa, Aurelia Sheen Lounge Chair, Royal Damask Throne, Murano Fluted Vessel).
- **Live Fabric & Color Swatch Tinting:** Live material manipulation across velvets, damask brocades, and leathers.
- **3D Annotation Markers:** Interactive pins detailing upholstery nanotech coatings, foam density, and artisan origins.
- **Realistic Lighting:** Directional warm key lights, fill lights, and soft contact shadows.

### 3. Hero 3D Parallax & Depth Atmosphere
- Interactive mouse-tracking parallax depth rig.
- Ambient golden dust motes particle system.
- Volumetric lighting glow and subtle camera breathing.

### 4. Precision Turnkey Before & After Slider
- Interactive split slider comparing raw structural renovation against final finished realization.
- Touch and mouse drag supported.

### 5. Architectural Dossier Lightbox & Portfolio
- Categorized masonry showcase (Residential, Commercial, Living, Bedroom, Kitchen).
- Deep-dive technical dossier displaying square footage, spatial challenges, and architectural solutions.

### 6. Studio Motion & Smooth Navigation
- **Lenis Smooth Scroll** synced with GSAP ScrollTrigger ticker.
- **Framer Motion** page transitions.
- **Adaptive Custom Cursor** with `"DRAG"` and `"VIEW"` dynamic modes.
- Slender gold progress indicator bar and architectural preloader.

---

## 🛠️ Tech Stack

- **Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`)
- **3D & WebGL:** Three.js, `@react-three/fiber`, `@react-three/drei`, `maath`
- **Animations:** GSAP, `@gsap/react`, `framer-motion`, `lenis`
- **Typography:** Playfair Display (`@fontsource/playfair-display`), Inter (`@fontsource/inter`)
- **Icons:** `lucide-react`
- **Routing:** `react-router-dom`

---

## 🚀 Quick Start

### 1. Clone & Install
```bash
git clone https://github.com/<your-username>/interior-studio.git
cd interior-studio
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for Production
```bash
npm run build
```

---

## 📁 Project Architecture

```
interior-studio/
├── public/
│   ├── images/          # Curated architectural and estate photography
│   ├── models/          # 3D glTF/GLB models (sofa, armchair, accent-chair, vase)
│   └── panoramas/       # 2048x1024 360° equirectangular panoramas
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   ├── PanoramaCanvas.jsx    # 360° Inside-out sphere VR viewer
│   │   │   ├── FurnitureViewer.jsx   # 3D Furniture model viewer + swatch picker
│   │   │   ├── HeroDepthCanvas.jsx   # Hero 3D dust particle system
│   │   │   ├── ScrollRoomCanvas.jsx  # Scroll-driven camera interior scene
│   │   │   └── Floating3DObject.jsx  # Floating 3D cutout piece
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── BeforeAfter.jsx
│   │   ├── Lightbox.jsx
│   │   ├── CustomCursor.jsx
│   │   ├── Marquee.jsx
│   │   └── Preloader.jsx
│   ├── data/
│   │   ├── content.js   # Copy, services, testimonials, timeline, specs
│   │   ├── images.js    # Central image asset mappings
│   │   └── models.js    # 3D models and 360° room registry
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── VirtualTour.jsx
│   │   ├── Projects.jsx
│   │   ├── Services.jsx
│   │   ├── About.jsx
│   │   └── Contact.jsx
│   ├── App.jsx          # Route management + Lenis + ScrollTrigger sync
│   └── main.jsx
└── package.json
```

---

## 📜 License
Private Commercial / Portfolio Project. All rights reserved.
