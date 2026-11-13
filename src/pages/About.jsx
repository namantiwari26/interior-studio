import React from 'react';
import { Link } from 'react-router-dom';
import { BRAND, STATS, TIMELINE } from '../data/content';
import { IMAGES } from '../data/images';
import { Sparkles, ArrowUpRight, Award, ShieldCheck, Compass, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-xs text-amber-300 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>ESTABLISHED IN AMBALA SINCE 2000</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-white leading-tight">
            Twenty-five years of <br />
            <span className="italic font-normal text-amber-300">architectural excellence.</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed font-light">
            Founded with an unwavering commitment to spatial purity, emotional resonance, and artisanal precision, AAKRITI has evolved from a boutique Ambala practice into one of the country&apos;s most respected architecture and luxury interior ateliers.
          </p>
        </div>

        {/* Studio Hero Image & Philosophy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-24 items-center">
          <div className="lg:col-span-7 rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative">
            <img
              src={IMAGES.warmLiving}
              alt="AAKRITI Architecture Atelier Studio"
              className="w-full h-[460px] sm:h-[540px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
            <div className="absolute bottom-6 left-6 right-6 glass-panel-gold p-4 rounded-2xl border border-amber-500/30">
              <span className="text-[10px] uppercase font-mono tracking-wider text-amber-300">Our Studio Philosophy</span>
              <p className="text-sm font-serif italic text-white mt-1">
                &ldquo;Architecture is not merely enclosing space; it is orchestrating light, acoustic comfort, and human emotion into everyday life.&rdquo;
              </p>
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <Compass className="w-5 h-5" />
                <h4 className="text-base font-serif font-semibold text-white">Spatial Integrity</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                Every line drawn in our studio responds to contextual solar angles, natural breezes, and proportional harmony. We eliminate visual clutter in favor of monumental calmness.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <Award className="w-5 h-5" />
                <h4 className="text-base font-serif font-semibold text-white">Artisanal Mastery</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                We maintain direct relationships with master stonemasons, metal smiths, and textile weavers. Custom boiserie and bookmatched marbles are executed with millimeter precision.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-3xl border border-white/10">
              <div className="flex items-center gap-3 text-amber-400 mb-2">
                <ShieldCheck className="w-5 h-5" />
                <h4 className="text-base font-serif font-semibold text-white">Single-Point Accountability</h4>
              </div>
              <p className="text-xs text-neutral-400 leading-relaxed">
                By managing both architectural blueprints and turnkey site realization, we guarantee structural warranties, zero budget inflation, and punctuality.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {STATS.map((stat) => (
            <div key={stat.label} className="glass-panel p-6 rounded-3xl border border-white/10 text-center">
              <div className="text-3xl sm:text-5xl font-serif font-bold text-amber-300 mb-1">{stat.value}</div>
              <div className="text-xs font-semibold text-white uppercase tracking-wider">{stat.label}</div>
              <p className="text-[11px] text-neutral-400 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* 25-Year Studio Timeline */}
        <div className="mb-24 pt-12 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-16">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-mono">
              THE CHRONICLE
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white mt-2">
              Our 25-Year Milestone Journey
            </h2>
          </div>

          <div className="relative border-l border-amber-500/30 ml-4 md:ml-32 pl-6 md:pl-12 space-y-12">
            {TIMELINE.map((item, idx) => (
              <div key={item.year} className="relative group">
                {/* Marker Dot */}
                <div className="absolute -left-[31px] md:-left-[55px] top-1.5 w-4 h-4 rounded-full bg-neutral-950 border-2 border-amber-400 group-hover:scale-125 transition-transform" />

                <div className="glass-panel p-6 rounded-2xl border border-white/10 hover:border-amber-400/40 transition-all max-w-2xl">
                  <span className="text-sm font-mono font-bold text-amber-300">{item.year}</span>
                  <h3 className="text-xl font-serif font-medium text-white mt-1 mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center glass-panel-gold p-10 rounded-3xl border border-amber-500/30">
          <h3 className="text-2xl sm:text-3xl font-serif text-white mb-3">Begin your architectural narrative with us</h3>
          <p className="text-xs sm:text-sm text-neutral-300 max-w-md mx-auto mb-6">
            We welcome inquiries for new residential commissions, turnkey estates, and luxury commercial transformations.
          </p>
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-amber-400 text-neutral-950 font-semibold text-xs tracking-wide hover:bg-amber-300 transition-all shadow-xl shadow-amber-400/20"
          >
            <span>Book Architectural Consultation</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}

