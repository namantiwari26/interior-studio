import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../data/images';
import Lightbox from '../components/Lightbox';
import BeforeAfter from '../components/BeforeAfter';
import { Sparkles, MapPin, ArrowUpRight, Filter } from 'lucide-react';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Residential', 'Commercial', 'Living', 'Bedroom', 'Kitchen'];

  const filteredProjects = activeFilter === 'All'
    ? IMAGES.projects
    : IMAGES.projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-neutral-950 text-white pt-28 pb-24 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-3xl mb-12">
          <div className="inline-flex items-center gap-2 glass-pill px-3.5 py-1.5 rounded-full text-xs text-amber-300 border border-amber-500/30 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>PORTFOLIO OF ARCHITECTURAL WORKS</span>
          </div>
          <h1 className="text-4xl sm:text-6xl font-serif font-light text-white leading-tight">
            Curated spaces. <br />
            <span className="italic font-normal text-amber-300">Enduring legacies.</span>
          </h1>
          <p className="text-xs sm:text-sm text-neutral-400 mt-4 leading-relaxed font-light">
            Explore our curated retrospective of private residences, cantilevered contemporary villas, sky penthouses, and commercial spaces designed and built across Northern India and beyond.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-12 pb-4 border-b border-white/10">
          <div className="flex items-center gap-2 mr-3 text-xs text-neutral-400">
            <Filter className="w-3.5 h-3.5 text-amber-400" />
            <span>Filter By:</span>
          </div>
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-amber-400 text-neutral-950 font-semibold shadow-lg shadow-amber-400/20'
                    : 'glass-pill text-neutral-400 hover:text-white hover:border-white/30'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-24">
          <AnimatePresence>
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group relative h-[420px] rounded-3xl overflow-hidden glass-panel border border-white/10 hover:border-amber-400/40 cursor-pointer shadow-xl transition-all"
                data-cursor="view"
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/20 to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="glass-pill px-3 py-1 rounded-full text-[11px] font-semibold text-amber-300 border border-white/10">
                    {proj.category}
                  </span>
                  <span className="glass-pill px-3 py-1 rounded-full text-[10px] font-mono text-neutral-400 border border-white/10">
                    {proj.year}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-2">
                  <h3 className="text-2xl font-serif font-medium text-white group-hover:text-amber-300 transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-neutral-400">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-amber-400" />
                      {proj.location}
                    </span>
                    <span className="font-mono text-amber-300">{proj.area}</span>
                  </div>

                  <p className="text-xs text-neutral-300 line-clamp-2 mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                    {proj.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Featured Case Study with Before/After Slider */}
        <div className="pt-16 border-t border-white/10">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400 font-mono">
              TRANSFORMATION SPOTLIGHT
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif text-white mt-2">
              Before & After Renovation
            </h2>
            <p className="text-xs sm:text-sm text-neutral-400 mt-2">
              Drag the interactive slider to reveal how our structural engineering and interior styling revitalized this residence.
            </p>
          </div>

          <BeforeAfter />
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedProject && (
        <Lightbox project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </div>
  );
}

