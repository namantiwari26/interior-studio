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
          {SERVICES.map((srv) => (
            <div
              key={srv.id}
              className="card-ivory p-6 sm:p-9 rounded-2xl border border-[rgba(60,45,30,0.14)] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center shadow-sm"
            >
              {/* Service Architectural Photo - Order first on mobile so phone users see it instantly */}
              <div className="lg:col-span-5 order-first lg:order-last h-60 sm:h-72 lg:h-[340px] rounded-xl overflow-hidden border border-[rgba(60,45,30,0.12)] bg-[#EAE1D3] relative shadow-2xs">
                <img
                  src={srv.image}
                  alt={srv.title}
                  loading="eager"
                  className="w-full h-full object-cover hover:scale-103 transition-transform duration-700"
                />
                <div className="absolute bottom-3 left-3 bg-[#FAF6EF]/95 backdrop-blur-md px-3 py-1 rounded-md text-[10px] font-mono text-[#8A5620] font-semibold border border-[rgba(60,45,30,0.12)] shadow-sm">
                  PORTFOLIO ARCHIVE • {srv.num}
                </div>
              </div>

              {/* Service Details */}
              <div className="lg:col-span-7 flex flex-col gap-3.5">
                <div className="flex items-center gap-3">
                  <span className="text-sm font-serif font-semibold text-[#8A5620]">
                    {srv.num}
                  </span>
                  <span className="text-[10px] text-[#574839] uppercase tracking-wider font-mono font-medium">{srv.shortDesc}</span>
                </div>

                <h2 className="text-2xl sm:text-3xl font-serif text-[#1C140D]">
                  {srv.title}
                </h2>

                <p className="text-xs sm:text-sm text-[#574839] leading-relaxed">
                  {srv.fullDesc}
                </p>

                {/* Features checklist with thin brass dashes */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                  {srv.features.map((feat, fIdx) => (
                    <div key={fIdx} className="flex items-start gap-2 text-xs text-[#3E3125]">
                      <span className="w-2 h-0.5 bg-[#8A5620] mt-2 shrink-0 rounded-full" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>

                {/* Deliverables */}
                <div className="mt-2 p-3.5 rounded-xl bg-[#EAE1D3]/60 border border-[rgba(60,45,30,0.1)] text-xs text-[#574839]">
                  <span className="text-[#1C140D] font-medium block mb-0.5">Atelier Deliverables</span>
                  <span className="text-[11px] leading-relaxed">{srv.deliverables}</span>
                </div>
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
