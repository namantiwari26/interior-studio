import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowUpRight, ArrowUp, Phone, Mail, MapPin 
} from 'lucide-react';
import { BRAND, SERVICES } from '../data/content';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative bg-[#1F1812] text-[#FAF6EF] pt-20 pb-12 overflow-hidden border-t border-[rgba(255,255,255,0.08)]">
      {/* Subtle warm ambient lighting */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#A9814A]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        {/* Top Header Block */}
        <div className="relative mb-14 pb-12 border-b border-white/10 flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div>
            <div className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] text-[#A9814A] font-mono font-semibold mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#A9814A]" />
              <span>Architectural Atelier Since {BRAND.since}</span>
            </div>
            <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-light text-white tracking-tight">
              Architecture shaped <br />
              <span className="italic font-normal text-[#EAE1D3]">around your life.</span>
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Link
              to="/contact"
              className="group flex items-center gap-3 px-6 py-3 rounded-full bg-[#A9814A] text-[#1F1812] font-semibold text-xs tracking-wide hover:bg-[#C49B61] transition-all"
            >
              <span>Schedule Initial Meeting</span>
              <div className="w-5 h-5 rounded-full bg-[#1F1812] text-[#FAF6EF] flex items-center justify-center group-hover:scale-105 transition-transform">
                <ArrowUpRight className="w-3 h-3" strokeWidth={1.5} />
              </div>
            </Link>

            <button
              onClick={scrollToTop}
              className="p-3 rounded-full border border-white/15 text-neutral-300 hover:text-white hover:border-[#A9814A] transition-colors cursor-pointer"
              title="Return to Top"
            >
              <ArrowUp className="w-4 h-4" strokeWidth={1.4} />
            </button>
          </div>
        </div>

        {/* 4 Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-14 border-b border-white/10 text-xs sm:text-sm">
          {/* Col 1: Studio Identity */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-full border border-[#A9814A] flex items-center justify-center text-[#A9814A] font-serif font-semibold text-xs">
                A
              </div>
              <span className="font-serif font-semibold text-base text-white tracking-wider">
                AAKRITI
              </span>
            </div>
            <p className="text-[#A8A39A] text-xs leading-relaxed max-w-sm">
              AAKRITI is an architectural and interior design studio established in Ambala, Haryana in 2000. We design private residences, multi-generational villas, and commercial workplaces with single-point execution stewardship.
            </p>
            <div className="flex items-center gap-3 pt-2 text-[#A8A39A]">
              <a href={BRAND.socials.instagram} target="_blank" rel="noreferrer" className="p-2 rounded-full border border-white/10 hover:text-[#A9814A] hover:border-[#A9814A] transition-colors" title="Instagram">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href={BRAND.socials.facebook} target="_blank" rel="noreferrer" className="p-2 rounded-full border border-white/10 hover:text-[#A9814A] hover:border-[#A9814A] transition-colors" title="Facebook">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.667 5H18V0h-3.889C10.667 0 9 1.667 9 4.667V8z"/></svg>
              </a>
              <a href={BRAND.socials.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-full border border-white/10 hover:text-[#A9814A] hover:border-[#A9814A] transition-colors" title="LinkedIn">
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24"><path d="M4.98 3.5c0 1.381-1.11 2.5-2.48 2.5s-2.48-1.119-2.48-2.5c0-1.38 1.11-2.5 2.48-2.5s2.48 1.12 2.48 2.5zm.02 4.5h-5v16h5v-16zm7.982 0h-4.968v16h4.969v-8.399c0-4.67 6.029-5.052 6.029 0v8.399h4.988v-10.131c0-7.88-8.922-7.593-11.018-3.714v-2.155z"/></svg>
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#A9814A] font-mono font-semibold">
              Explore
            </h4>
            <Link to="/" className="text-[#A8A39A] hover:text-white transition-colors">Home Studio</Link>
            <Link to="/about" className="text-[#A8A39A] hover:text-white transition-colors">Our Practice</Link>
            <Link to="/services" className="text-[#A8A39A] hover:text-white transition-colors">Disciplines</Link>
            <Link to="/projects" className="text-[#A8A39A] hover:text-white transition-colors">Portfolio</Link>
            <Link to="/tour" className="text-[#A9814A] hover:text-[#C49B61] transition-colors flex items-center gap-1.5">
              <span>360 Virtual Tour</span>
            </Link>
          </div>

          {/* Col 3: Disciplines */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#A9814A] font-mono font-semibold">
              Disciplines
            </h4>
            {SERVICES.slice(0, 5).map((srv) => (
              <Link 
                key={srv.id} 
                to="/services" 
                className="text-[#A8A39A] hover:text-white transition-colors text-xs"
              >
                {srv.title}
              </Link>
            ))}
          </div>

          {/* Col 4: Studio Location */}
          <div className="flex flex-col gap-2.5">
            <h4 className="text-[11px] uppercase tracking-[0.18em] text-[#A9814A] font-mono font-semibold">
              Headquarters
            </h4>
            <div className="flex items-start gap-2 text-xs text-[#A8A39A] leading-relaxed">
              <MapPin className="w-3.5 h-3.5 text-[#A9814A] shrink-0 mt-0.5" strokeWidth={1.4} />
              <span>{BRAND.headquarters}</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A8A39A] pt-1">
              <Phone className="w-3.5 h-3.5 text-[#A9814A] shrink-0" strokeWidth={1.4} />
              <a href={`tel:${BRAND.phone}`} className="hover:text-white font-mono">{BRAND.phone}</a>
            </div>
            <div className="flex items-center gap-2 text-xs text-[#A8A39A]">
              <Mail className="w-3.5 h-3.5 text-[#A9814A] shrink-0" strokeWidth={1.4} />
              <a href={`mailto:${BRAND.email}`} className="hover:text-white">{BRAND.email}</a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#A8A39A]">
          <p>© {new Date().getFullYear()} AAKRITI Architects & Interior Designers.</p>
          <div className="flex items-center gap-5">
            <Link to="/about" className="hover:text-white">Practice Ethics</Link>
            <Link to="/about" className="hover:text-white">Commission Terms</Link>
            <span className="text-[#A9814A] font-mono text-[11px]">Ambala • Chandigarh • Delhi NCR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
