import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, Compass, Sparkles, Building2, 
  Armchair, Home as HomeIcon, CheckCircle2, ChevronRight, 
  Star, Quote, Phone, Mail, MapPin, Eye, Play, Image as ImageIcon
} from 'lucide-react';
import { BRAND, STATS, PILLARS, SERVICES, HOW_IT_WORKS, TESTIMONIALS } from '../data/content';
import { IMAGES } from '../data/images';
import Marquee from '../components/Marquee';
import BeforeAfter from '../components/BeforeAfter';
import Lightbox from '../components/Lightbox';
import HeroDepthCanvas from '../components/3d/HeroDepthCanvas';

// Lazy loaded 3D interactive components
const PanoramaCanvas = lazy(() => import('../components/3d/PanoramaCanvas'));
const FurnitureViewer = lazy(() => import('../components/3d/FurnitureViewer'));
const ScrollRoomCanvas = lazy(() => import('../components/3d/ScrollRoomCanvas'));
const Floating3DObject = lazy(() => import('../components/3d/Floating3DObject'));

export default function Home() {
  const [activeMediaTab, setActiveMediaTab] = useState('360'); // 'images' | 'videos' | '360'
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [heroSlide, setHeroSlide] = useState(0);

  const heroImages = [
    IMAGES.heroVilla,
    IMAGES.warmLiving,
    IMAGES.aboutInterior
  ];

  return (
    <div className="relative w-full overflow-hidden bg-neutral-950 text-white">
      {/* ========================================================
          1. HERO SECTION (Blend of Image 1 + Image 2 + Image 3)
         ======================================================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 overflow-hidden">
        {/* Background Hero Image with smooth fade */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages[heroSlide]}
            alt="AAKRITI Luxury Villa Architecture"
            className="w-full h-full object-cover filter brightness-[0.7] contrast-105 transition-all duration-1000 scale-105"
          />
          {/* Radial warm lighting gradient and vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/40 to-neutral-950/80" />
          <div className="absolute inset-0 bg-radial from-amber-500/10 via-transparent to-neutral-950/90" />
        </div>

        {/* 3D Depth Canvas Overlay (Golden dust particles, parallax bloom) */}
        <HeroDepthCanvas />

        {/* Giant Monogram Typography Watermark */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-8 sm:pt-14 text-center select-none pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="text-6xl sm:text-8xl md:text-9xl lg:text-[13rem] font-serif font-black tracking-tighter text-white/90 drop-shadow-2xl leading-none uppercase"
          >
            AAKRITI
          </motion.h1>
          <div className="flex items-center justify-center gap-3 sm:gap-6 -mt-2 sm:-mt-6">
            <span className="h-px w-10 sm:w-20 bg-amber-400/60" />
            <p className="text-xs sm:text-sm md:text-base tracking-[0.35em] text-amber-300 font-mono uppercase">
              Interiors & Architecture
            </p>
            <span className="h-px w-10 sm:w-20 bg-amber-400/60" />
          </div>
        </div>

        {/* Hero Middle & Bottom Content Bar */}
        <div className="relative z-20 max-w-7xl mx-auto w-full mt-auto pt-12 sm:pt-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            {/* Left Headline & Pitch */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="lg:col-span-6 flex flex-col gap-4"
            >
              <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-xs text-amber-300 border border-amber-500/30 w-max">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Elevating Spaces Since {BRAND.since}</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-white leading-tight">
                Designing spaces. <br />
                <span className="italic font-normal text-amber-300">Elevating lives.</span>
              </h2>

              <p className="text-xs sm:text-sm text-neutral-300 max-w-md leading-relaxed font-light">
                {BRAND.subheadline} Based in Ambala and delivering iconic private estates, luxury penthouses, and commercial spaces across India.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/projects"
                  className="group flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-neutral-950 font-semibold text-xs tracking-wide hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20"
                >
                  <span>View Projects</span>
                  <div className="w-5 h-5 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                    <ArrowUpRight className="w-3 h-3" />
                  </div>
                </Link>

                <Link
                  to="/tour"
                  className="flex items-center gap-2 px-5 py-3 rounded-full glass-pill border border-white/20 text-white font-medium text-xs hover:border-amber-400 hover:text-amber-300 transition-all"
                >
                  <Compass className="w-4 h-4 text-amber-400 animate-spin" style={{ animationDuration: '9s' }} />
                  <span>360° VR Experience</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Glass Stats & Slide Indicator (From Image 1 & 2) */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="lg:col-span-6 flex flex-col items-start lg:items-end gap-4"
            >
              {/* Glass Stats Trio */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3 w-full max-w-md">
                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">25+</div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Years Legacy</div>
                </div>
                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">250+</div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">Projects Handed</div>
                </div>
                <div className="glass-panel p-3.5 rounded-2xl border border-white/10 text-center">
                  <div className="text-xl sm:text-2xl font-serif font-bold text-amber-300">Ambala</div>
                  <div className="text-[10px] text-neutral-400 uppercase tracking-wider mt-0.5">India & Global</div>
                </div>
              </div>

              {/* Slider Dots (Image 2 style) */}
              <div className="flex items-center gap-2 pt-2">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroSlide(idx)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      heroSlide === idx ? 'w-8 bg-amber-400 shadow-md shadow-amber-400/50' : 'w-2 bg-white/30 hover:bg-white/60'
                    }`}
                    title={`Slide ${idx + 1}`}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Marquee Strip */}
      <Marquee />

      {/* ========================================================
          2. ABOUT SECTION WITH OVERLAPPING 3D PIECE (Image 1 & 3)
         ======================================================== */}
      <section className="relative py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        {/* Floating 3D Chair Accent overlapping the top edge */}
        <div className="absolute -top-20 right-6 z-20 hidden md:block">
          <Suspense fallback={null}>
            <Floating3DObject modelPath="/models/accent-chair.glb" scale={1.4} className="w-56 h-56 lg:w-72 lg:h-72" />
          </Suspense>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <span>ABOUT AAKRITI</span>
            </div>

            <h3 className="text-3xl sm:text-5xl font-serif font-light text-white leading-tight">
              Inspired by purpose. <br />
              <span className="italic font-normal text-amber-300">Driven by detail.</span>
            </h3>

            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              AAKRITI Architects is a premier architecture and interior design atelier based in Ambala, creating timeless spaces since 2000. We believe in thoughtful architecture that blends functionality, acoustics, aesthetics, and craftsmanship—tailored specifically to the way you live, entertain, and dream.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="glass-panel p-4 rounded-2xl border border-white/5">
                  <h5 className="text-xs font-semibold text-white mb-1">{pillar.title}</h5>
                  <p className="text-[11px] text-neutral-400 leading-snug">{pillar.description}</p>
                </div>
              ))}
            </div>

            <div>
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-semibold text-amber-400 hover:text-amber-300 border-b border-amber-400/40 pb-1"
              >
                <span>Read Our 25-Year Studio Story</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Image & Badge */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-2xl group">
              <img
                src={IMAGES.aboutInterior}
                alt="Luxury living salon architecture"
                className="w-full h-[450px] sm:h-[520px] object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />

              {/* Glass Floating Since 2000 Badge */}
              <div className="absolute bottom-6 left-6 glass-panel-gold p-4 sm:p-5 rounded-2xl border border-amber-500/30 backdrop-blur-xl">
                <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300 block">Established</span>
                <div className="text-2xl sm:text-3xl font-serif font-bold text-white">Since 2000</div>
                <p className="text-[11px] text-neutral-300 mt-0.5">Building trust. Designing the future.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. OUR SERVICES GRID (Image 1: 6 Cards with Hover & Icons)
         ======================================================== */}
      <section className="py-24 bg-neutral-900/40 border-y border-white/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-mono">
                DISCIPLINES & SERVICES
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif font-light text-white mt-2">
                Complete design solutions <br />
                <span className="italic font-normal text-amber-300">for every space.</span>
              </h3>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-white glass-pill px-4 py-2 rounded-full border border-white/10"
            >
              <span>Explore All Disciplines</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((srv, idx) => (
              <motion.div
                key={srv.id}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="group relative glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-amber-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-amber-400 mb-6 group-hover:bg-amber-400 group-hover:text-neutral-950 transition-colors">
                    {idx === 0 && <Building2 className="w-6 h-6" />}
                    {idx === 1 && <Armchair className="w-6 h-6" />}
                    {idx === 2 && <HomeIcon className="w-6 h-6" />}
                    {idx === 3 && <Building2 className="w-6 h-6" />}
                    {idx === 4 && <Armchair className="w-6 h-6" />}
                    {idx === 5 && <CheckCircle2 className="w-6 h-6" />}
                  </div>

                  <h4 className="text-xl font-serif font-medium text-white group-hover:text-amber-300 transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-400 mt-2 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-neutral-500">0{idx + 1}</span>
                  <Link
                    to="/services"
                    className="w-8 h-8 rounded-full glass-pill border border-white/10 flex items-center justify-center text-neutral-400 group-hover:text-neutral-950 group-hover:bg-amber-400 group-hover:border-amber-400 transition-all"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. 360° VIRTUAL TOUR TEASER WITH IMAGE/VIDEO/360 SWITCHER
             (From Reference 3 style)
         ======================================================== */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto relative">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400">
              <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
              <span>IMMERSIVE SPATIAL LAB</span>
            </div>
            <h3 className="text-3xl sm:text-5xl font-serif font-light text-white mt-2">
              Step inside unbuilt dreams in <br />
              <span className="italic font-normal text-amber-300">photorealistic 360°.</span>
            </h3>
          </div>

          {/* Switcher Tab Pill (From Reference Image 3) */}
          <div className="glass-panel p-1.5 rounded-full flex items-center gap-1 border border-white/10 self-start md:self-auto">
            <button
              onClick={() => setActiveMediaTab('images')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeMediaTab === 'images' ? 'bg-amber-400 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <ImageIcon className="w-3.5 h-3.5" />
              <span>Images</span>
              <span className="text-[10px] opacity-75 font-mono">12 Previews</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('videos')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeMediaTab === 'videos' ? 'bg-amber-400 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Play className="w-3.5 h-3.5" />
              <span>Videos</span>
              <span className="text-[10px] opacity-75 font-mono">03 Reels</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('360')}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeMediaTab === '360' ? 'bg-amber-400 text-neutral-950 font-semibold' : 'text-neutral-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>360° Panoramas</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-neutral-900 text-amber-300 font-mono">LIVE</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeMediaTab === '360' && (
          <div className="relative">
            <Suspense fallback={
              <div className="h-[580px] w-full rounded-3xl glass-panel flex items-center justify-center text-amber-400 text-sm">
                Initializing 360° Panorama Engine...
              </div>
            }>
              <PanoramaCanvas embedded={true} initialRoomId="living" />
            </Suspense>

            <div className="mt-4 flex items-center justify-between text-xs text-neutral-400 px-2">
              <span>Interactive preview mode. Click hotspots to change rooms.</span>
              <Link to="/tour" className="text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1">
                <span>Launch Fullscreen VR Walkthrough</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        )}

        {activeMediaTab === 'images' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[500px]">
            <img src={IMAGES.projects[0].image} alt="Preview 1" className="w-full h-full object-cover rounded-2xl border border-white/10" />
            <img src={IMAGES.projects[1].image} alt="Preview 2" className="w-full h-full object-cover rounded-2xl border border-white/10" />
            <img src={IMAGES.projects[2].image} alt="Preview 3" className="w-full h-full object-cover rounded-2xl border border-white/10" />
          </div>
        )}

        {activeMediaTab === 'videos' && (
          <div className="h-[480px] rounded-3xl glass-panel border border-white/10 flex flex-col items-center justify-center p-8 text-center">
            <div className="w-16 h-16 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center mb-4">
              <Play className="w-6 h-6 ml-1" />
            </div>
            <h4 className="text-xl font-serif text-white">Cinematic Villa Walkthrough Reels</h4>
            <p className="text-xs text-neutral-400 max-w-md mt-2">
              Experience the 4K architectural flythrough of our Ambala and Chandigarh estate commissions.
            </p>
          </div>
        )}
      </section>

      {/* ========================================================
          5. FEATURED 3D FURNITURE VIEWER ATELIER
         ======================================================== */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <Suspense fallback={
          <div className="h-96 rounded-3xl glass-panel flex items-center justify-center text-amber-400">
            Loading Bespoke 3D Furniture Atelier...
          </div>
        }>
          <FurnitureViewer />
        </Suspense>
      </section>

      {/* ========================================================
          6. SELECTED PROJECTS GALLERY STRIP (Image 1 Style)
         ======================================================== */}
      <section className="py-24 bg-neutral-900/30 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-mono">
                SELECTED PROJECTS
              </span>
              <h3 className="text-3xl sm:text-5xl font-serif font-light text-white mt-2">
                Spaces that speak <br />
                <span className="italic font-normal text-amber-300">our design language.</span>
              </h3>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-medium text-neutral-300 hover:text-white glass-pill px-4 py-2 rounded-full border border-white/10"
            >
              <span>Explore All Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-amber-400" />
            </Link>
          </div>

          {/* 4-Image Strip (From Image 1) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {IMAGES.projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group relative h-[380px] rounded-3xl overflow-hidden border border-white/10 cursor-pointer shadow-xl"
                data-cursor="view"
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                <div className="absolute top-4 left-4 glass-pill px-3 py-1 rounded-full text-[11px] text-amber-300 border border-white/10">
                  {proj.category}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-1">
                  <h4 className="text-lg font-serif font-medium text-white group-hover:text-amber-300 transition-colors">
                    {proj.title}
                  </h4>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span>{proj.location}</span>
                    <span className="font-mono text-amber-400/80">{proj.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. FEATURED PROJECT SPOTLIGHT (Image 1 Style)
         ======================================================== */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 flex flex-col gap-4">
            <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
              FEATURED PROJECT
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-white">
              Modern living. <br />
              <span className="italic text-amber-300">Timeless elegance.</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
              This residence is a perfect balance of modern architecture and warm interiors, designed to offer comfort, openness, and acoustic sophistication. Cantilevered floorplates and bespoke walnut millwork define every corner.
            </p>

            <div className="space-y-2 pt-2 text-xs text-neutral-300 font-mono">
              <div className="flex items-center gap-2">
                <span className="text-amber-400">Location:</span>
                <span>Ambala, Haryana</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">Project Type:</span>
                <span>Private Residential Villa</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-400">Built-Up Area:</span>
                <span>7,500 sq.ft.</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-neutral-950 font-semibold text-xs tracking-wide hover:bg-amber-300 transition-all shadow-lg shadow-amber-400/20"
              >
                <span>Explore Dossier</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
            <img
              src={IMAGES.heroVillaNight}
              alt="Villa night architectural illumination"
              className="w-full h-[380px] sm:h-[450px] object-cover"
            />
          </div>
        </div>
      </section>

      {/* ========================================================
          8. "HOW IT WORKS" 4 STEPS IN DEEP EMERALD ACCENT (Image 3)
         ======================================================== */}
      <section className="relative py-28 bg-[#0F2A24] border-y border-white/10 overflow-hidden">
        {/* Ambient emerald lights */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

        {/* Floating 3D Armchair cutout overlapping section edge */}
        <div className="absolute -bottom-16 right-8 z-20 hidden lg:block">
          <Suspense fallback={null}>
            <Floating3DObject modelPath="/models/armchair.glb" scale={1.5} className="w-72 h-72" />
          </Suspense>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-2xl mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-300 font-mono">
              HOW IT WORKS
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif font-light text-white mt-2">
              The seamless journey from <br />
              <span className="italic font-normal text-amber-300">vision to reality.</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-3 font-light">
              We orchestrate architecture and interior realizations with institutional discipline, transparent milestones, and zero compromise.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="glass-emerald p-6 rounded-3xl border border-white/10 flex flex-col justify-between hover:border-amber-400/50 transition-all"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-3xl font-serif font-bold text-amber-300">{step.step}</span>
                    <span className="text-[10px] uppercase font-mono tracking-wider px-2.5 py-1 rounded-full bg-white/10 text-emerald-200">
                      {step.tag}
                    </span>
                  </div>
                  <h4 className="text-lg font-serif font-medium text-white mb-2">
                    {step.title}
                  </h4>
                  <p className="text-xs text-neutral-300 leading-relaxed font-light">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-white/10">
                  <span className="text-[10px] text-amber-400 font-mono">STEP {step.step} COMPLIANCE</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          9. BEFORE & AFTER RENOVATION COMPARISON SLIDER
         ======================================================== */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-mono">
            PRECISION TRANSFORMATION
          </span>
          <h3 className="text-3xl sm:text-5xl font-serif font-light text-white mt-2">
            Witness the craftsmanship <br />
            <span className="italic font-normal text-amber-300">before & after.</span>
          </h3>
        </div>

        <BeforeAfter />
      </section>

      {/* ========================================================
          10. TESTIMONIALS SLIDER (Image 1 Style)
         ======================================================== */}
      <section className="py-24 bg-neutral-900/40 border-y border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-xs uppercase tracking-widest text-amber-400 font-mono">
                CLIENTS LOVE OUR WORK
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-white mt-2">
                Trusted by homeowners <br />
                <span className="italic text-amber-300">and businesses alike.</span>
              </h3>
              <p className="text-xs sm:text-sm text-neutral-400 mt-3 font-light leading-relaxed">
                Over 25 years, our studio has earned the deep trust of private patrons, industrialists, and doctors through relentless honesty, quality materials, and punctual deliveries.
              </p>

              {/* Slider Dots */}
              <div className="flex items-center gap-2 mt-6">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-2.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonial === idx ? 'w-8 bg-amber-400' : 'w-2.5 bg-white/20 hover:bg-white/50'
                    }`}
                    title={`Review ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Testimonial Quote Card (From Image 1) */}
            <div className="lg:col-span-7">
              {(() => {
                const item = TESTIMONIALS[activeTestimonial];
                return (
                  <div className="glass-panel p-8 sm:p-10 rounded-3xl border border-white/10 flex flex-col justify-between gap-6 shadow-2xl relative">
                    <Quote className="w-10 h-10 text-amber-400/30 absolute top-6 right-6" />

                    <div>
                      <div className="flex items-center gap-1 text-amber-400 mb-4">
                        {[...Array(item.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-current" />
                        ))}
                        <span className="text-xs font-mono text-neutral-300 ml-2">5.0 Rating on Google</span>
                      </div>

                      <p className="text-base sm:text-lg text-white font-serif leading-relaxed italic">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-4 pt-4 border-t border-white/10">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-12 h-12 rounded-full object-cover border-2 border-amber-400"
                      />
                      <div>
                        <h5 className="text-sm font-semibold text-white">{item.name}</h5>
                        <p className="text-xs text-amber-300">{item.role}</p>
                        <p className="text-[11px] text-neutral-500">{item.location} • {item.project}</p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          11. CALL TO ACTION BANNER (Image 1 Style)
         ======================================================== */}
      <section className="py-24 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="relative glass-panel-gold p-8 sm:p-12 lg:p-16 rounded-3xl border border-amber-500/30 overflow-hidden flex flex-col lg:flex-row items-center justify-between gap-8 shadow-2xl">
          {/* Subtle background glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-xl">
            <span className="text-xs uppercase tracking-widest text-amber-300 font-mono font-semibold">
              BEGIN YOUR PROJECT
            </span>
            <h3 className="text-3xl sm:text-5xl font-serif text-white font-light mt-2">
              Let&apos;s create something <br />
              <span className="italic font-normal text-amber-300">extraordinary together.</span>
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 mt-3 font-light leading-relaxed">
              Book a private spatial consultation with our principal architects. We review your site, blueprints, and aesthetic aspirations.
            </p>

            <div className="flex flex-wrap items-center gap-6 mt-6 text-xs text-neutral-300">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 hover:text-white font-mono">
                <Phone className="w-4 h-4 text-amber-400" />
                <span>{BRAND.phone}</span>
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-white">
                <Mail className="w-4 h-4 text-amber-400" />
                <span>{BRAND.email}</span>
              </a>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-3 px-8 py-4 rounded-full bg-amber-400 text-neutral-950 font-semibold text-sm hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20"
            >
              <span>Book Consultation</span>
              <div className="w-6 h-6 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-4 h-4" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox for Image Zoom */}
      {selectedProject && (
        <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

