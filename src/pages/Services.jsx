import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/content';
import { IMAGES } from '../data/images';
import { 
  Building2, Armchair, Home, CheckCircle2, 
  ArrowUpRight, Sparkles, ChevronDown, Layers, FileCheck 
} from 'lucide-react';

export default function Services() {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const faqs = [
    {
      q: "What is your typical project timeline from initial design to key handover?",
      a: "For comprehensive luxury residential villas (6,000 to 10,000 sq.ft.), the complete architectural and interior lifecycle spans 8 to 14 months. Turnkey interior fit-outs typically take 4 to 6 months with our milestone-based schedule guarantee."
    },
    {
      q: "Do you manage both architectural design and on-site turnkey construction?",
      a: "Yes. AAKRITI operates as a single-source integrated studio. Our in-house civil engineers, artisan carpenters, and MEP supervisors execute the project end-to-end, preventing contractor finger-pointing and ensuring budget fidelity."
    },
    {
      q: "How do the 360° virtual tours help during the design phase?",
      a: "Before procurement or construction starts, we model your entire project in 3D WebGL and VR. You can walk through every corridor, inspect lighting temperatures, and test furniture materials in real time, eliminating costly on-site change orders."
    },
    {
      q: "Where do you source materials and bespoke furniture?",
      a: "We source Italian marbles directly from Carrara and Brescia quarries, Belgian and French linen textiles, German BLUM and Hettich architectural hardware, and manufacture bespoke furniture at our private ateliers in Northern India."
    }
  ];

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-xs text-amber-300 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>DISCIPLINES & EXPERTISE</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-white leading-tight">
            Integrated architecture. <br />
            <span className="italic font-normal text-amber-300">Flawless execution.</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed font-light">
            From raw ground topography analysis to bespoke furniture manufacturing and turnkey handover, we offer full-spectrum architectural and interior stewardship.
          </p>
        </div>

        {/* Services In-Depth List */}
        <div className="space-y-12 mb-24">
          {SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center hover:border-amber-400/30 transition-all shadow-xl"
            >
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col gap-4">
                <div className="flex items-center gap-3">
                  <span className="text-xs font-mono text-amber-400 px-2.5 py-1 rounded-full bg-amber-400/10 border border-amber-500/30">
                    DISCIPLINE 0{idx + 1}
                  </span>
                  <span className="text-xs text-neutral-400 uppercase tracking-wider">{srv.shortDesc}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif font-medium text-white">
                  {srv.title}
                </h2>

                <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-light">
                  {srv.fullDesc}
                </p>

                {/* Features checklist */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-center gap-2 text-xs text-neutral-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Deliverables pill */}
                <div className="mt-2 p-3.5 rounded-2xl bg-white/5 border border-white/5 text-xs text-neutral-300">
                  <span className="text-amber-300 font-semibold block mb-0.5">Key Atelier Deliverables:</span>
                  <span className="text-neutral-400 text-[11px] leading-relaxed">{srv.deliverables}</span>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-5 h-[280px] sm:h-[340px] rounded-2xl overflow-hidden border border-white/10 shadow-lg">
                <img
                  src={
                    idx === 0 ? IMAGES.services.architectural :
                    idx === 1 ? IMAGES.services.interior :
                    idx === 2 ? IMAGES.services.residential :
                    idx === 3 ? IMAGES.services.commercial :
                    idx === 4 ? IMAGES.services.kitchen :
                    IMAGES.services.turnkey
                  }
                  alt={srv.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-12 border-t border-white/10">
          <div className="text-center mb-10">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-mono">
              COMMON INQUIRIES
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white mt-2">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => {
              const isOpen = activeAccordion === index;
              return (
                <div
                  key={index}
                  className="glass-panel rounded-2xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setActiveAccordion(isOpen ? -1 : index)}
                    className="w-full p-5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-white/5 transition-colors"
                  >
                    <span className="text-sm sm:text-base font-serif text-white">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-amber-400 shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isOpen && (
                    <div className="px-5 pb-5 text-xs sm:text-sm text-neutral-400 leading-relaxed border-t border-white/5 pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Consultation Banner */}
          <div className="mt-16 text-center glass-panel-gold p-8 rounded-3xl border border-amber-500/30">
            <h3 className="text-2xl font-serif text-white mb-2">Have a unique site or bespoke brief?</h3>
            <p className="text-xs sm:text-sm text-neutral-300 mb-6">
              Our principal team is available for on-site reviews and private architectural consultations.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full bg-amber-400 text-neutral-950 font-semibold text-xs tracking-wide hover:bg-amber-300 transition-all"
            >
              <span>Schedule Spatial Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

