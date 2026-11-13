import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin } from 'lucide-react';

export default function Lightbox({ project, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-[#2B2118]/60 backdrop-blur-md"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.96, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative max-w-4xl w-full max-h-[90vh] bg-[#FAF6EF] rounded-2xl overflow-hidden border border-[rgba(60,45,30,0.18)] flex flex-col md:flex-row shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FAF6EF]/90 border border-[rgba(60,45,30,0.15)] text-[#2B2118] hover:text-[#A9814A] transition-colors cursor-pointer"
            title="Close Lightbox"
          >
            <X className="w-4 h-4" strokeWidth={1.4} />
          </button>

          {/* Left Large Photo */}
          <div className="md:w-3/5 h-[300px] md:h-auto relative bg-[#EAE1D3]">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 bg-[#FAF6EF]/95 px-3 py-1 rounded-full text-[11px] font-medium text-[#2B2118] border border-[rgba(60,45,30,0.12)]">
              {project.category}
            </div>
          </div>

          {/* Right Architectural Dossier */}
          <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-[#FAF6EF]">
            <div>
              <span className="text-[10px] uppercase tracking-[0.18em] text-[#A9814A] font-mono font-semibold">
                Project Dossier
              </span>
              <h3 className="text-2xl font-serif text-[#2B2118] mt-1">
                {project.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-[#6F6254] mt-2 mb-6 font-mono">
                <MapPin className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
                <span>{project.location}</span>
                <span>/</span>
                <span>{project.area}</span>
              </div>

              <div className="space-y-4 text-xs text-[#6F6254] leading-relaxed">
                <p>{project.description}</p>
                {project.challenge && (
                  <div className="p-3.5 rounded-xl bg-[#EAE1D3]/50 border border-[rgba(60,45,30,0.08)]">
                    <span className="text-[10px] font-semibold text-[#2B2118] uppercase block mb-1">Spatial Challenge</span>
                    <p>{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-3.5 rounded-xl bg-[#F0E8DC]/80 border border-[rgba(169,129,74,0.2)]">
                    <span className="text-[10px] font-semibold text-[#A9814A] uppercase block mb-1">Architectural Resolution</span>
                    <p className="text-[#2B2118]">{project.solution}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-[rgba(60,45,30,0.1)] flex items-center justify-between text-xs">
              <span className="text-[#6F6254] font-mono">Completed: {project.year}</span>
              <a
                href="/contact"
                className="text-[#A9814A] hover:text-[#8C6A3B] font-medium"
              >
                Inquire about this residence
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
