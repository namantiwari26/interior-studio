import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SERVICES } from '../data/content';
import { IMAGES } from '../data/images';
import { 
  ArrowUpRight, ChevronDown 
} from 'lucide-react';

export default function Services() {
  const [activeAccordion, setActiveAccordion] = useState(0);

  const faqs = [
    {
      q: "What is your typical project timeline from initial design to key handover?",
      a: "For comprehensive luxury residential villas (6,000 to 10,000 sq.ft.), the complete architectural planning and turnkey build spans 8 to 14 months. Turnkey interior fit-outs typically take 4 to 6 months with our milestone-based schedule guarantee."
    },
    {
      q: "Do you manage both architectural design and on-site turnkey construction?",
      a: "Yes. AAKRITI operates as a single-source integrated studio. Our resident civil engineers, artisan carpenters, and MEP supervisors execute the project end-to-end, preventing contractor conflict and ensuring budget adherence."
    },
    {
      q: "How do the 360 virtual tours help during the design phase?",
      a: "Before procurement or construction starts, we model your entire project in 3D WebGL. You can walk through corridors, inspect natural light, and review furniture proportions, eliminating costly on-site change orders."
    },
    {
      q: "Where do you source materials and bespoke furniture?",
      a: "We source natural marble directly from Indian and Carrara quarries, Belgian linen drapery, German BLUM and Hettich architectural hardware, and manufacture bespoke furniture at our private ateliers in Northern India."
    }
  ];

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#2B2118] pt-28 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EF] border border-[rgba(60,45,30,0.14)] text-[10px] text-[#A9814A] font-mono uppercase tracking-[0.2em] mb-3">
            <span>Disciplines & Expertise</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-[#2B2118] leading-tight">
            Integrated architecture. <br />
            <span className="italic font-normal text-[#A9814A]">Turnkey craftsmanship.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6254] mt-3 leading-relaxed">
            From plot topography analysis to custom furniture fabrication and handover, our studio provides single-point architectural responsibility.
          </p>
        </div>

        {/* Services In-Depth List */}
        <div className="space-y-10 mb-20">
          {SERVICES.map((srv, idx) => (
            <div
              key={srv.id}
              className="card-ivory p-6 sm:p-9 rounded-2xl border border-[rgba(60,45,30,0.12)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm"
            >
              {/* Left Details */}
              <div className="lg:col-span-7 flex flex-col gap-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-serif font-semibold text-[#A9814A]">
                    {srv.num}
                  </span>
                  <span className="text-[10px] text-[#6F6254] uppercase tracking-wider font-mono">{srv.shortDesc}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2118]">
                  {srv.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#6F6254] leading-relaxed">
                  {srv.fullDesc}
                </p>

                {/* Features checklist with thin brass dashes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-[#4E4236]">
                      <span className="w-1.5 h-px bg-[#A9814A] mt-2 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Deliverables */}
                <div className="mt-2 p-3.5 rounded-xl bg-[#EAE1D3]/50 border border-[rgba(60,45,30,0.08)] text-xs text-[#6F6254]">
                  <span className="text-[#2B2118] font-medium block mb-0.5">Atelier Deliverables</span>
                  <span className="text-[11px] leading-relaxed">{srv.deliverables}</span>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:col-span-5 h-[260px] sm:h-[320px] rounded-xl overflow-hidden border border-[rgba(60,45,30,0.1)]">
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
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
              </div>
            </div>
          ))}
        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto pt-10 border-t border-[rgba(60,45,30,0.1)]">
          <div className="text-center mb-8">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9814A] font-mono">
              Common Questions
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2118] mt-1">
              Frequently Addressed Inquiries
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => {
              const isOpen = activeAccordion === index;
              return (
                <div
                  key={index}
                  className="bg-[#FAF6EF] rounded-xl border border-[rgba(60,45,30,0.12)] overflow-hidden"
                >
                  <button
                    onClick={() => setActiveAccordion(isOpen ? -1 : index)}
                    className="w-full p-4.5 text-left flex items-center justify-between gap-4 cursor-pointer hover:bg-black/[0.02] transition-colors"
                  >
                    <span className="text-sm font-serif text-[#2B2118]">{faq.q}</span>
                    <ChevronDown className={`w-4 h-4 text-[#A9814A] shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`} strokeWidth={1.4} />
                  </button>

                  {isOpen && (
                    <div className="px-4.5 pb-4.5 text-xs text-[#6F6254] leading-relaxed border-t border-[rgba(60,45,30,0.08)] pt-3">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Consultation Card */}
          <div className="mt-12 text-center card-ivory p-8 rounded-2xl border border-[rgba(60,45,30,0.14)]">
            <h3 className="text-xl font-serif text-[#2B2118] mb-1.5">Have a site or bespoke architectural brief?</h3>
            <p className="text-xs text-[#6F6254] mb-5">
              Our principal architects are available for on-site reviews and private consultations.
            </p>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-primary text-xs font-medium"
            >
              <span>Schedule Spatial Consultation</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.4} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
