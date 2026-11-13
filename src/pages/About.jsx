import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, STATS, TIMELINE } from '../data/content';
import { IMAGES } from '../data/images';
import { ArrowUpRight } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#2B2118] pt-28 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAF6EF] border border-[rgba(60,45,30,0.14)] text-[10px] text-[#A9814A] font-mono uppercase tracking-[0.2em] mb-3">
            <span>Established in Ambala Since 2000</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-[#2B2118] leading-tight">
            Twenty-five years of <br />
            <span className="italic font-normal text-[#A9814A]">architectural practice.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#6F6254] mt-3 leading-relaxed">
            Founded with an emphasis on climatic orientation, spatial calmness, and artisan carpentry, AAKRITI has evolved from a local Ambala practice into a dedicated residential atelier serving patrons across Northern India.
          </p>
        </div>

        {/* Hero Image & Philosophy */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-20 items-center">
          <div className="lg:col-span-7 rounded-2xl overflow-hidden border border-[rgba(60,45,30,0.12)] shadow-sm relative">
            <img
              src={IMAGES.warmLiving}
              alt="AAKRITI living room architectural interior"
              className="w-full h-[420px] sm:h-[480px] object-cover"
            />
            <div className="absolute bottom-5 left-5 right-5 bg-[#FAF6EF]/95 backdrop-blur-md p-4 rounded-xl border border-[rgba(60,45,30,0.12)] shadow-sm">
              <span className="text-[10px] uppercase font-mono tracking-wider text-[#A9814A]">Studio Philosophy</span>
              <p className="text-xs sm:text-sm font-serif italic text-[#2B2118] mt-1">
                &ldquo;Architecture is not mere enclosure; it is the thoughtful alignment of natural light, acoustic rest, and human habit.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-4">
            <div className="card-ivory p-5 rounded-xl border border-[rgba(60,45,30,0.12)]">
              <span className="text-xs font-mono font-semibold text-[#A9814A] block mb-1">01</span>
              <h4 className="text-base font-serif font-medium text-[#2B2118]">Environmental Orientation</h4>
              <p className="text-xs text-[#6F6254] leading-relaxed mt-1">
                Every layout is drafted in direct response to sun paths, prevailing breezes, and passive shading to reduce thermal load naturally.
              </p>
            </div>

            <div className="card-ivory p-5 rounded-xl border border-[rgba(60,45,30,0.12)]">
              <span className="text-xs font-mono font-semibold text-[#A9814A] block mb-1">02</span>
              <h4 className="text-base font-serif font-medium text-[#2B2118]">Honest Materials</h4>
              <p className="text-xs text-[#6F6254] leading-relaxed mt-1">
                We prioritize authentic stone, natural teak, Belgian linens, and raw brass finishes that develop character and patina with time.
              </p>
            </div>

            <div className="card-ivory p-5 rounded-xl border border-[rgba(60,45,30,0.12)]">
              <span className="text-xs font-mono font-semibold text-[#A9814A] block mb-1">03</span>
              <h4 className="text-base font-serif font-medium text-[#2B2118]">Single-Point Accountability</h4>
              <p className="text-xs text-[#6F6254] leading-relaxed mt-1">
                By overseeing both blueprint creation and turnkey civil execution, our studio ensures structural fidelity without middleman disputes.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
          {STATS.map((stat) => (
            <div key={stat.label} className="card-ivory p-5 rounded-xl border border-[rgba(60,45,30,0.12)] text-center">
              <div className="text-3xl sm:text-4xl font-serif font-semibold text-[#2B2118] mb-1">{stat.value}</div>
              <div className="text-xs font-medium text-[#2B2118] uppercase tracking-wider">{stat.label}</div>
              <p className="text-[11px] text-[#6F6254] mt-0.5">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <div className="mb-20 pt-10 border-t border-[rgba(60,45,30,0.1)]">
          <div className="text-center max-w-xl mx-auto mb-14">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9814A] font-mono">
              Milestone Chronicle
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2118] mt-1">
              Twenty-Five Years of Practice
            </h2>
          </div>

          <div className="relative border-l border-[#A9814A]/40 ml-4 md:ml-32 pl-6 md:pl-10 space-y-10">
            {TIMELINE.map((item) => (
              <div key={item.year} className="relative">
                {/* Marker */}
                <div className="absolute -left-[31px] md:-left-[47px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#FAF6EF] border-2 border-[#A9814A]" />

                <div className="card-ivory p-5 rounded-xl border border-[rgba(60,45,30,0.12)] max-w-2xl">
                  <span className="text-xs font-mono font-semibold text-[#A9814A]">{item.year}</span>
                  <h3 className="text-lg font-serif font-medium text-[#2B2118] mt-0.5 mb-1.5">{item.title}</h3>
                  <p className="text-xs text-[#6F6254] leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center card-ivory p-8 rounded-2xl border border-[rgba(60,45,30,0.14)]">
          <h3 className="text-2xl font-serif text-[#2B2118] mb-2">Commission your architectural project</h3>
          <p className="text-xs text-[#6F6254] max-w-md mx-auto mb-5">
            We welcome inquiries for new residential commissions, private farmhouses, and turnkey interior fit-outs.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full btn-primary text-xs font-medium"
          >
            <span>Book Architectural Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.4} />
          </Link>
        </div>
      </div>
    </div>
  );
}
