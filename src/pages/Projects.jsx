import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { IMAGES } from '../data/images';
import Lightbox from '../components/Lightbox';
import BeforeAfter from '../components/BeforeAfter';
import { MapPin, Filter } from 'lucide-react';

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);

  const categories = ['All', 'Residential', 'Commercial', 'Living', 'Bedroom', 'Kitchen'];

  const filteredProjects = activeFilter === 'All'
    ? IMAGES.projects
    : IMAGES.projects.filter(p => p.category.toLowerCase() === activeFilter.toLowerCase());

  return (
    <div className="min-h-screen bg-[#F4EEE4] text-[#1C140D] pt-28 pb-20 px-4 sm:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FAF6EF] border border-[rgba(60,45,30,0.16)] text-[10px] text-[#8A5620] font-mono uppercase tracking-[0.2em] mb-3 font-semibold shadow-2xs">
            <span>Portfolio of Built Works</span>
          </div>
          <h1 className="text-4xl sm:text-5xl font-serif font-light text-[#1C140D] leading-tight">
            Curated residences. <br />
            <span className="italic font-normal text-[#8A5620]">Enduring craftsmanship.</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#574839] mt-3 leading-relaxed">
            A selection of private residences, family villas, and commercial interiors designed and executed across Ambala, Chandigarh, Delhi NCR, and Punjab.
          </p>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 mb-10 pb-4 border-b border-[rgba(60,45,30,0.12)]">
          <div className="flex items-center gap-2 mr-3 text-xs text-[#574839]">
            <Filter className="w-3.5 h-3.5 text-[#8A5620]" strokeWidth={1.5} />
            <span className="font-medium">Filter:</span>
          </div>
          {categories.map((cat) => {
            const isActive = activeFilter === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveFilter(cat)}
                className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#1C140D] text-[#FAF6EF] shadow-sm'
                    : 'bg-[#FAF6EF] text-[#574839] border border-[rgba(60,45,30,0.15)] hover:border-[#8A5620] hover:text-[#1C140D]'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
          <AnimatePresence>
            {filteredProjects.map((proj) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                key={proj.id}
                onClick={() => setSelectedProject(proj)}
                className="group relative h-[380px] rounded-2xl overflow-hidden bg-[#FAF6EF] border border-[rgba(60,45,30,0.12)] hover:border-[#A9814A] cursor-pointer shadow-sm transition-all"
                data-cursor="view"
              >
                <img
                  src={proj.image}
                  alt={proj.title}
                  className="w-full h-full object-cover group-hover:scale-104 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B2118]/85 via-transparent to-transparent opacity-85 group-hover:opacity-95 transition-opacity" />

                {/* Top badges */}
                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="bg-[#FAF6EF]/90 backdrop-blur-md px-3 py-0.5 rounded-full text-[10px] font-medium text-[#2B2118] border border-[rgba(60,45,30,0.1)]">
                    {proj.category}
                  </span>
                  <span className="bg-[#FAF6EF]/90 backdrop-blur-md px-2.5 py-0.5 rounded-full text-[10px] font-mono text-[#6F6254] border border-[rgba(60,45,30,0.1)]">
                    {proj.year}
                  </span>
                </div>

                {/* Bottom Details */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-col gap-1 text-white">
                  <h3 className="text-xl font-serif font-medium group-hover:text-[#EAE1D3] transition-colors">
                    {proj.title}
                  </h3>
                  <div className="flex items-center justify-between text-xs text-[#D8CCBD]">
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
                      {proj.location}
                    </span>
                    <span className="font-mono">{proj.area}</span>
                  </div>

                  <p className="text-xs text-[#D8CCBD] line-clamp-2 mt-1 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">
                    {proj.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Before / After Case Study */}
        <div className="pt-12 border-t border-[rgba(60,45,30,0.1)]">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#A9814A] font-mono">
              Structural Transformation
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif text-[#2B2118] mt-1">
              On-Site Before and After Study
            </h2>
            <p className="text-xs text-[#6F6254] mt-1.5">
              Drag the center divider to inspect the architectural realization against initial site conditions.
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
