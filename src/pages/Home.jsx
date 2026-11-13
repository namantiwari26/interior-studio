import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  ArrowUpRight, Compass, Building2, 
  Armchair, Home as HomeIcon, ChevronRight, 
  Phone, Mail, Play, Image as ImageIcon, Ruler, Layers, Star
} from 'lucide-react';
import { BRAND, STATS, PILLARS, SERVICES, HOW_IT_WORKS, TESTIMONIALS } from '../data/content';
import { IMAGES } from '../data/images';
import Marquee from '../components/Marquee';
import BeforeAfter from '../components/BeforeAfter';
import Lightbox from '../components/Lightbox';
import HeroDepthCanvas from '../components/3d/HeroDepthCanvas';

const PanoramaCanvas = lazy(() => import('../components/3d/PanoramaCanvas'));
const FurnitureViewer = lazy(() => import('../components/3d/FurnitureViewer'));
const Floating3DObject = lazy(() => import('../components/3d/Floating3DObject'));

export default function Home() {
  const [activeMediaTab, setActiveMediaTab] = useState('360');
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [heroSlide, setHeroSlide] = useState(0);

  const heroImages = [
    IMAGES.heroVilla,
    IMAGES.warmLiving,
    IMAGES.aboutInterior
  ];

  return (
    <div className="relative w-full overflow-hidden bg-[#F4EEE4] text-[#2B2118]">
      {/* ========================================================
          1. HERO SECTION (Warm Editorial Luxury)
         ======================================================== */}
      <section className="relative min-h-screen w-full flex flex-col justify-between pt-24 pb-12 px-4 sm:px-8 overflow-hidden">
        {/* Background Architectural Photo with Warm Scrim */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImages[heroSlide]}
            alt="Private residential villa architecture"
            className="w-full h-full object-cover filter brightness-[0.78] contrast-100 transition-all duration-1000 scale-102"
          />
          {/* Warm Gradient Scrim ensuring high-contrast readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#F4EEE4] via-[#F4EEE4]/40 to-[#2B2118]/70" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,#EAE1D3_0%,transparent_60%)] opacity-30" />
        </div>

        {/* 3D Depth Particle Canvas */}
        <HeroDepthCanvas />

        {/* Serif Studio Watermark */}
        <div className="relative z-10 max-w-7xl mx-auto w-full pt-6 sm:pt-12 text-center select-none pointer-events-none">
          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-[11rem] font-serif font-normal tracking-tight text-white/95 drop-shadow-sm leading-none uppercase"
          >
            AAKRITI
          </motion.h1>
          <div className="flex items-center justify-center gap-3 sm:gap-6 -mt-1 sm:-mt-4">
            <span className="h-px w-8 sm:w-16 bg-[#A9814A]/70" />
            <p className="text-[10px] sm:text-xs md:text-sm tracking-[0.3em] text-[#EAE1D3] font-mono uppercase">
              Architecture & Interior Practice
            </p>
            <span className="h-px w-8 sm:w-16 bg-[#A9814A]/70" />
          </div>
        </div>

        {/* Hero Bottom Narrative & Stats */}
        <div className="relative z-20 max-w-7xl mx-auto w-full mt-auto pt-10 sm:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
            {/* Left Headline */}
            <motion.div 
              initial={{ opacity: 0, x: -25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="lg:col-span-7 flex flex-col gap-4"
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EF]/90 border border-[rgba(60,45,30,0.15)] text-[11px] text-[#2B2118] w-max font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#A9814A]" />
                <span>Established in Ambala • {BRAND.since}</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-serif font-light text-[#2B2118] leading-[1.15]">
                Designing spaces. <br />
                <span className="italic font-normal text-[#A9814A]">Elevating lives.</span>
              </h2>

              <p className="text-xs sm:text-sm text-[#4E4236] max-w-lg leading-relaxed">
                {BRAND.subheadline} Delivering tailored residences, private estates, and commercial landmarks with dedicated on-site construction stewardship.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to="/projects"
                  className="group flex items-center gap-3 px-6 py-3 rounded-full btn-primary text-xs tracking-wide shadow-sm"
                >
                  <span className="font-medium">View Portfolio</span>
                  <div className="w-5 h-5 rounded-full bg-[#A9814A] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                    <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
                  </div>
                </Link>

                <Link
                  to="/tour"
                  className="flex items-center gap-2 px-5 py-3 rounded-full btn-secondary text-xs font-medium"
                >
                  <Compass className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
                  <span>Explore 360 Virtual Tour</span>
                </Link>
              </div>
            </motion.div>

            {/* Right Glass Stats & Slide Indicator */}
            <motion.div 
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="lg:col-span-5 flex flex-col items-start lg:items-end gap-4"
            >
              <div className="grid grid-cols-3 gap-2.5 w-full max-w-sm">
                <div className="card-ivory p-3.5 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-serif font-semibold text-[#2B2118]">25</div>
                  <div className="text-[10px] text-[#6F6254] uppercase tracking-wider mt-0.5">Years Practice</div>
                </div>
                <div className="card-ivory p-3.5 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-serif font-semibold text-[#2B2118]">250+</div>
                  <div className="text-[10px] text-[#6F6254] uppercase tracking-wider mt-0.5">Projects Built</div>
                </div>
                <div className="card-ivory p-3.5 rounded-xl text-center">
                  <div className="text-xl sm:text-2xl font-serif font-semibold text-[#2B2118]">Ambala</div>
                  <div className="text-[10px] text-[#6F6254] uppercase tracking-wider mt-0.5">Headquarters</div>
                </div>
              </div>

              {/* Slider Dots */}
              <div className="flex items-center gap-2 pt-1">
                {heroImages.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setHeroSlide(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      heroSlide === idx ? 'w-6 bg-[#A9814A]' : 'w-2 bg-[rgba(60,45,30,0.25)] hover:bg-[rgba(60,45,30,0.5)]'
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
          2. ABOUT SECTION & STUDIO PRACTICE (Cream & Ivory)
         ======================================================== */}
      <section className="relative py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Mission Narrative */}
          <div className="lg:col-span-5 flex flex-col gap-5">
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9814A] font-mono">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9814A]" />
              <span>Studio Practice</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#2B2118] leading-tight">
              Architecture grounded in purpose. <br />
              <span className="italic font-normal text-[#A9814A]">Refined by detail.</span>
            </h3>

            <p className="text-xs sm:text-sm text-[#6F6254] leading-relaxed">
              AAKRITI is an architectural and interior atelier founded in Ambala in 2000. We design residences that balance environmental orientation, acoustic quiet, natural materials, and joinery precision tailored to the way each family lives.
            </p>

            {/* Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {PILLARS.map((pillar) => (
                <div key={pillar.title} className="card-ivory p-4 rounded-xl border border-[rgba(60,45,30,0.1)]">
                  <span className="font-serif text-sm font-semibold text-[#A9814A] block mb-1">{pillar.num}</span>
                  <h5 className="text-xs font-serif font-medium text-[#2B2118] mb-1">{pillar.title}</h5>
                  <p className="text-[11px] text-[#6F6254] leading-snug">{pillar.description}</p>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <Link
                to="/about"
                className="inline-flex items-center gap-2 text-xs font-medium text-[#2B2118] hover:text-[#A9814A] border-b border-[rgba(60,45,30,0.2)] pb-1 transition-colors"
              >
                <span>Read Studio Heritage & Philosophy</span>
                <ChevronRight className="w-3.5 h-3.5 text-[#A9814A]" />
              </Link>
            </div>
          </div>

          {/* Right Column: Architectural Photo with Since 2000 Badge */}
          <div className="lg:col-span-7 relative">
            <div className="relative rounded-2xl overflow-hidden border border-[rgba(60,45,30,0.12)] shadow-md group">
              <img
                src={IMAGES.aboutInterior}
                alt="Living room interior architecture"
                className="w-full h-[400px] sm:h-[480px] object-cover group-hover:scale-103 transition-transform duration-700"
              />

              <div className="absolute bottom-5 left-5 bg-[#FAF6EF]/95 backdrop-blur-md p-4 rounded-xl border border-[rgba(60,45,30,0.12)] shadow-md">
                <span className="text-[9px] uppercase font-mono tracking-wider text-[#A9814A] block">Founded in Ambala</span>
                <div className="text-xl sm:text-2xl font-serif font-medium text-[#2B2118]">Since 2000</div>
                <p className="text-[11px] text-[#6F6254] mt-0.5">25 years of residential practice.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          3. OUR DISCIPLINES (Soft Sand Background)
         ======================================================== */}
      <section className="py-20 bg-[#EAE1D3]/50 border-y border-[rgba(60,45,30,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9814A] font-mono">
                Services & Disciplines
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#2B2118] mt-1">
                End-to-end design stewardship <br />
                <span className="italic font-normal text-[#A9814A]">for every residence.</span>
              </h3>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#2B2118] hover:text-[#A9814A] bg-[#FAF6EF] px-4 py-2 rounded-full border border-[rgba(60,45,30,0.15)] shadow-sm"
            >
              <span>Explore All Disciplines</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.5} />
            </Link>
          </div>

          {/* 6 Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {SERVICES.map((srv) => (
              <div
                key={srv.id}
                className="group relative bg-[#FAF6EF] p-6 rounded-2xl border border-[rgba(60,45,30,0.12)] hover:border-[#A9814A] transition-all flex flex-col justify-between shadow-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-lg text-[#A9814A] font-medium">{srv.num}</span>
                    <div className="w-9 h-9 rounded-full border border-[rgba(60,45,30,0.12)] flex items-center justify-center text-[#2B2118] group-hover:border-[#A9814A] transition-colors">
                      {srv.num === "01" && <Building2 className="w-4 h-4" strokeWidth={1.4} />}
                      {srv.num === "02" && <Armchair className="w-4 h-4" strokeWidth={1.4} />}
                      {srv.num === "03" && <HomeIcon className="w-4 h-4" strokeWidth={1.4} />}
                      {srv.num === "04" && <Ruler className="w-4 h-4" strokeWidth={1.4} />}
                      {srv.num === "05" && <Layers className="w-4 h-4" strokeWidth={1.4} />}
                      {srv.num === "06" && <Building2 className="w-4 h-4" strokeWidth={1.4} />}
                    </div>
                  </div>

                  <h4 className="text-lg font-serif font-medium text-[#2B2118] group-hover:text-[#A9814A] transition-colors">
                    {srv.title}
                  </h4>
                  <p className="text-xs text-[#6F6254] mt-2 leading-relaxed">
                    {srv.shortDesc}
                  </p>
                </div>

                <div className="pt-5 mt-5 border-t border-[rgba(60,45,30,0.08)] flex items-center justify-between">
                  <span className="text-[10px] font-mono text-[#6F6254]">DISCIPLINE {srv.num}</span>
                  <Link
                    to="/services"
                    className="w-7 h-7 rounded-full bg-[#EAE1D3] flex items-center justify-center text-[#2B2118] group-hover:bg-[#A9814A] group-hover:text-white transition-all"
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.4} />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          4. 360° VIRTUAL TOUR TEASER (Deliberate Contrast Dark Frame)
         ======================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9814A] font-mono">
              <Compass className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
              <span>Spatial Visualization</span>
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#2B2118] mt-1">
              Step inside unbuilt spaces <br />
              <span className="italic font-normal text-[#A9814A]">in 360-degree virtual reality.</span>
            </h3>
          </div>

          {/* Switcher Tab Pill */}
          <div className="bg-[#FAF6EF] p-1.5 rounded-full flex items-center gap-1 border border-[rgba(60,45,30,0.14)] self-start md:self-auto shadow-sm">
            <button
              onClick={() => setActiveMediaTab('images')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeMediaTab === 'images' ? 'bg-[#2B2118] text-[#FAF6EF]' : 'text-[#6F6254] hover:text-[#2B2118]'
              }`}
            >
              <ImageIcon className="w-3 h-3" strokeWidth={1.4} />
              <span>Images</span>
              <span className="text-[10px] opacity-75 font-mono">12 Previews</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('videos')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeMediaTab === 'videos' ? 'bg-[#2B2118] text-[#FAF6EF]' : 'text-[#6F6254] hover:text-[#2B2118]'
              }`}
            >
              <Play className="w-3 h-3" strokeWidth={1.4} />
              <span>Reels</span>
              <span className="text-[10px] opacity-75 font-mono">03 Films</span>
            </button>

            <button
              onClick={() => setActiveMediaTab('360')}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeMediaTab === '360' ? 'bg-[#2B2118] text-[#FAF6EF]' : 'text-[#6F6254] hover:text-[#2B2118]'
              }`}
            >
              <Compass className="w-3 h-3 text-[#A9814A]" strokeWidth={1.4} />
              <span>360 Virtual Tour</span>
              <span className="text-[9px] px-1.5 py-0.2 rounded-full bg-[#A9814A] text-white font-mono">LIVE</span>
            </button>
          </div>
        </div>

        {/* Tab Content (Held in Dark Espresso Contrast Box so 3D pops) */}
        {activeMediaTab === '360' && (
          <div className="relative">
            <Suspense fallback={
              <div className="h-[540px] w-full rounded-2xl bg-[#1F1812] flex items-center justify-center text-[#A9814A] text-xs font-mono">
                Loading 360 Spatial Environment...
              </div>
            }>
              <PanoramaCanvas embedded={true} initialRoomId="living" />
            </Suspense>

            <div className="mt-3 flex items-center justify-between text-xs text-[#6F6254] px-1">
              <span>Interactive study mode. Click pins to move between rooms.</span>
              <Link to="/tour" className="text-[#A9814A] hover:text-[#8C6A3B] font-medium flex items-center gap-1">
                <span>Launch Fullscreen VR Tour</span>
                <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.4} />
              </Link>
            </div>
          </div>
        )}

        {activeMediaTab === 'images' && (
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-[440px]">
            <img src={IMAGES.projects[0].image} alt="Architectural preview" className="w-full h-full object-cover rounded-xl border border-[rgba(60,45,30,0.12)]" />
            <img src={IMAGES.projects[1].image} alt="Interior architecture" className="w-full h-full object-cover rounded-xl border border-[rgba(60,45,30,0.12)]" />
            <img src={IMAGES.projects[2].image} alt="Bespoke salon study" className="w-full h-full object-cover rounded-xl border border-[rgba(60,45,30,0.12)]" />
          </div>
        )}

        {activeMediaTab === 'videos' && (
          <div className="h-[420px] rounded-2xl bg-[#FAF6EF] border border-[rgba(60,45,30,0.12)] flex flex-col items-center justify-center p-8 text-center shadow-sm">
            <div className="w-12 h-12 rounded-full bg-[#2B2118] text-white flex items-center justify-center mb-3">
              <Play className="w-5 h-5 ml-0.5 text-[#A9814A]" strokeWidth={1.4} />
            </div>
            <h4 className="text-xl font-serif text-[#2B2118]">Architectural Walkthrough Films</h4>
            <p className="text-xs text-[#6F6254] max-w-md mt-1">
              Documented 4K film recordings of our completed residential projects in Ambala and Chandigarh.
            </p>
          </div>
        )}
      </section>

      {/* ========================================================
          5. FEATURED 3D FURNITURE VIEWER ATELIER (Sand Floor)
         ======================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <Suspense fallback={
          <div className="h-80 rounded-2xl bg-[#FAF6EF] flex items-center justify-center text-[#A9814A] text-xs font-mono">
            Loading Bespoke 3D Furniture Atelier...
          </div>
        }>
          <FurnitureViewer />
        </Suspense>
      </section>

      {/* ========================================================
          6. SELECTED PROJECTS (Asymmetric Editorial Layout)
         ======================================================== */}
      <section className="py-20 bg-[#FAF6EF] border-y border-[rgba(60,45,30,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9814A] font-mono">
                Recent Commissions
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#2B2118] mt-1">
                Spaces shaped by <br />
                <span className="italic font-normal text-[#A9814A]">material and light.</span>
              </h3>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-xs font-medium text-[#2B2118] hover:text-[#A9814A] bg-[#FAF6EF] px-4 py-2 rounded-full border border-[rgba(60,45,30,0.15)] shadow-sm"
            >
              <span>View All Commissions</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.5} />
            </Link>
          </div>

          {/* Asymmetric 4-Card Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {IMAGES.projects.slice(0, 4).map((proj) => (
              <div
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group relative h-[360px] rounded-2xl overflow-hidden border border-[rgba(60,45,30,0.12)] cursor-pointer shadow-sm bg-[#EAE1D3]"
                data-cursor="view"
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2118]/85 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />

                <div className="absolute top-4 left-4 bg-[#FAF6EF]/90 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-medium text-[#2B2118]">
                  {proj.category}
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-0.5 text-white">
                  <h4 className="text-base font-serif font-medium group-hover:text-[#EAE1D3] transition-colors">
                    {proj.title}
                  </h4>
                  <div className="flex items-center justify-between text-[11px] text-[#D8CCBD]">
                    <span>{proj.location}</span>
                    <span className="font-mono">{proj.area}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          7. HOW IT WORKS (Deep Olive Accent Section)
         ======================================================== */}
      <section className="relative py-24 bg-[#2F4A3F] text-[#FAF6EF] border-y border-[rgba(255,255,255,0.1)] overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 relative z-10">
          <div className="max-w-xl mb-14">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#D8CCBD] font-mono">
              Process Methodology
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif font-light text-white mt-1">
              A transparent journey from <br />
              <span className="italic font-normal text-[#EAE1D3]">blueprint to occupation.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#D8CCBD] mt-2 leading-relaxed">
              We manage architectural planning and interior construction with milestone-based schedules and zero budget variance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {HOW_IT_WORKS.map((step) => (
              <div
                key={step.step}
                className="bg-[#1E2F28]/70 backdrop-blur-md p-5 rounded-xl border border-white/10 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-2xl font-serif font-light text-[#EAE1D3]">{step.step}</span>
                    <span className="text-[9px] uppercase font-mono tracking-wider px-2 py-0.5 rounded bg-white/10 text-emerald-100">
                      {step.tag}
                    </span>
                  </div>
                  <h4 className="text-base font-serif font-medium text-white mb-1.5">
                    {step.title}
                  </h4>
                  <p className="text-xs text-[#D8CCBD] leading-relaxed">
                    {step.desc}
                  </p>
                </div>

                <div className="pt-4 mt-4 border-t border-white/10">
                  <span className="text-[9px] text-[#A9814A] font-mono tracking-wider uppercase">Stage {step.step}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================
          8. BEFORE & AFTER RENOVATION SLIDER
         ======================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9814A] font-mono">
            Spatial Transformation
          </span>
          <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#2B2118] mt-1">
            Site condition <span className="italic font-normal text-[#A9814A]">before and after.</span>
          </h3>
        </div>

        <BeforeAfter />
      </section>

      {/* ========================================================
          9. CLIENT EXPERIENCES (Cream Editorial Card)
         ======================================================== */}
      <section className="py-20 bg-[#EAE1D3]/40 border-y border-[rgba(60,45,30,0.1)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-5">
              <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9814A] font-mono font-semibold">
                Client Testimonials
              </span>
              <h3 className="text-3xl sm:text-4xl font-serif font-light text-[#2B2118] mt-1">
                Trusted by patrons <br />
                <span className="italic text-[#A9814A]">across Northern India.</span>
              </h3>
              <p className="text-xs sm:text-sm text-[#6F6254] mt-2.5 leading-relaxed">
                Over 25 years, our practice has grown through repeat commissions and word of mouth from private homeowners, doctors, and business leaders.
              </p>

              {/* Slider Dots */}
              <div className="flex items-center gap-2 mt-5">
                {TESTIMONIALS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveTestimonial(idx)}
                    className={`h-1.5 rounded-full transition-all cursor-pointer ${
                      activeTestimonial === idx ? 'w-6 bg-[#A9814A]' : 'w-2 bg-[rgba(60,45,30,0.25)] hover:bg-[rgba(60,45,30,0.5)]'
                    }`}
                    title={`Review ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* Testimonial Quote Card */}
            <div className="lg:col-span-7">
              {(() => {
                const item = TESTIMONIALS[activeTestimonial];
                return (
                  <div className="bg-[#FAF6EF] p-7 sm:p-9 rounded-2xl border border-[rgba(60,45,30,0.12)] flex flex-col justify-between gap-5 shadow-sm">
                    <div>
                      {/* Brass Star Rating */}
                      <div className="flex items-center gap-1 text-[#A9814A] mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3.5 h-3.5 fill-current" strokeWidth={1} />
                        ))}
                        <span className="text-xs font-mono text-[#6F6254] ml-2">4.9 / 5 Verified Review</span>
                      </div>

                      <p className="text-sm sm:text-base text-[#2B2118] font-serif leading-relaxed italic">
                        &ldquo;{item.text}&rdquo;
                      </p>
                    </div>

                    <div className="flex items-center gap-3.5 pt-4 border-t border-[rgba(60,45,30,0.08)]">
                      <img
                        src={item.avatar}
                        alt={item.name}
                        className="w-10 h-10 rounded-full object-cover border border-[#A9814A]"
                      />
                      <div>
                        <h5 className="text-xs font-semibold text-[#2B2118]">{item.name}</h5>
                        <p className="text-[11px] text-[#A9814A]">{item.role}</p>
                        <p className="text-[10px] text-[#6F6254]">{item.location} • {item.project}</p>
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
          10. CALL TO ACTION BANNER (Ivory Card on Sand)
         ======================================================== */}
      <section className="py-20 px-4 sm:px-8 max-w-7xl mx-auto">
        <div className="card-ivory p-8 sm:p-12 rounded-2xl border border-[rgba(60,45,30,0.14)] flex flex-col lg:flex-row items-center justify-between gap-8 shadow-sm">
          <div className="max-w-xl">
            <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9814A] font-mono font-semibold">
              Begin a Project
            </span>
            <h3 className="text-3xl sm:text-4xl font-serif text-[#2B2118] font-light mt-1">
              Let us plan your <br />
              <span className="italic font-normal text-[#A9814A]">next architectural residence.</span>
            </h3>
            <p className="text-xs sm:text-sm text-[#6F6254] mt-2 leading-relaxed">
              Schedule a spatial consultation at our Ambala atelier or request a private site review.
            </p>

            <div className="flex flex-wrap items-center gap-5 mt-5 text-xs text-[#2B2118]">
              <a href={`tel:${BRAND.phone}`} className="flex items-center gap-2 hover:text-[#A9814A] font-mono">
                <Phone className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
                <span>{BRAND.phone}</span>
              </a>
              <a href={`mailto:${BRAND.email}`} className="flex items-center gap-2 hover:text-[#A9814A]">
                <Mail className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
                <span>{BRAND.email}</span>
              </a>
            </div>
          </div>

          <div className="shrink-0 flex flex-col sm:flex-row items-center gap-3">
            <Link
              to="/contact"
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full btn-primary text-xs tracking-wide shadow-sm"
            >
              <span className="font-medium">Book Consultation</span>
              <div className="w-5 h-5 rounded-full bg-[#A9814A] text-white flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedProject && (
        <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}
