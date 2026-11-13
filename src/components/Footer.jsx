import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, ArrowUp, Phone, Mail, MapPin, 
  Sparkles, Globe, Share2 
} from 'lucide-react';
import { BRAND, SERVICES } from '../data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-neutral-950 border-t border-white/10 text-neutral-300 pt-16 sm:pt-24 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-80 h-80 bg-emerald-950/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Giant Monogram Branding Background */}
        <div className="relative mb-16 pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-widest text-amber-400 mb-2">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Premier Architecture & Luxury Atelier</span>
            </div>
            <h2 className="text-4xl sm:text-6xl lg:text-7xl font-serif font-light text-white tracking-tight">
              Let&apos;s architect <br />
              <span className="italic font-normal text-amber-300">your sanctuary.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-3 px-7 py-3.5 rounded-full bg-amber-400 text-neutral-950 font-semibold text-sm hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20"
            >
              <span>Book Discovery Meeting</span>
              <div className="w-6 h-6 rounded-full bg-neutral-950 text-white flex items-center justify-center group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </Link>

            <button
              onClick={scrollToTop}
              className="p-3.5 rounded-full glass-pill border border-white/10 text-neutral-400 hover:text-white hover:border-amber-400/50 transition-all cursor-pointer"
              title="Back to Top"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-white/10 text-sm">
          {/* Col 1: Studio Story */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-400 text-neutral-950 font-serif font-bold text-base flex items-center justify-center">
                A
              </div>
              <span className="font-serif font-semibold text-lg text-white tracking-wider">
                AAKRITI
              </span>
            </div>
            <p className="text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              AAKRITI Interiors & Architecture is an award-winning design atelier based in Ambala, Haryana, crafting bespoke estates, contemporary villas, and luxury commercial landmarks across India since 2000.
            </p>
            <div className="flex items-center gap-3 pt-2 text-neutral-400">
              <a href={BRAND.socials.instagram} target="_blank" rel="noreferrer" className="p-2.5 rounded-full glass-pill border border-white/10 hover:text-amber-400 hover:border-amber-400/40 transition-colors" title="Instagram">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={BRAND.socials.facebook} target="_blank" rel="noreferrer" className="p-2.5 rounded-full glass-pill border border-white/10 hover:text-amber-400 hover:border-amber-400/40 transition-colors" title="Facebook">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.667 0 9 1.667 9 4.667V8z"/></svg>
              </a>
              <a href={BRAND.socials.linkedin} target="_blank" rel="noreferrer" className="p-2.5 rounded-full glass-pill border border-white/10 hover:text-amber-400 hover:border-amber-400/40 transition-colors" title="LinkedIn">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-semibold">
              Explore
            </h4>
            <Link to="/" className="text-neutral-400 hover:text-white transition-colors">Home Experience</Link>
            <Link to="/about" className="text-neutral-400 hover:text-white transition-colors">About Our Atelier</Link>
            <Link to="/services" className="text-neutral-400 hover:text-white transition-colors">Our Design Services</Link>
            <Link to="/projects" className="text-neutral-400 hover:text-white transition-colors">Project Portfolio</Link>
            <Link to="/tour" className="text-amber-400 hover:text-amber-300 transition-colors flex items-center gap-1">
              <span>360° Virtual Tour</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-amber-400/20 text-amber-300 font-mono">VR</span>
            </Link>
          </div>

          {/* Col 3: Services */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-semibold">
              Disciplines
            </h4>
            {SERVICES.slice(0, 5).map((srv) => (
              <Link 
                key={srv.id} 
                to="/services" 
                className="text-neutral-400 hover:text-white transition-colors text-xs sm:text-sm"
              >
                {srv.title}
              </Link>
            ))}
          </div>

          {/* Col 4: Studio Location & Contact */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs uppercase tracking-widest text-white font-mono font-semibold">
              Headquarters
            </h4>
            <div className="flex items-start gap-2.5 text-xs text-neutral-400 leading-relaxed">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>{BRAND.headquarters}</span>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-400 pt-1">
              <Phone className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={`tel:${BRAND.phone}`} className="hover:text-white font-mono">{BRAND.phone}</a>
            </div>
            <div className="flex items-center gap-2.5 text-xs text-neutral-400">
              <Mail className="w-4 h-4 text-amber-400 shrink-0" />
              <a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-500">
          <p>© {new Date().getFullYear()} AAKRITI Architects & Interiors. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/about" className="hover:text-neutral-400">Privacy Policy</Link>
            <Link to="/about" className="hover:text-neutral-400">Terms of Commission</Link>
            <span className="text-amber-400/80">Designed with WebGL & Three.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
