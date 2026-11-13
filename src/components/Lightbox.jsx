import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, MapPin, Maximize2, Sparkles, Layers } from 'lucide-react';

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
        className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-neutral-950/90 backdrop-blur-2xl"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative max-w-5xl w-full max-h-[90vh] glass-panel-gold rounded-3xl overflow-hidden border border-amber-500/30 flex flex-col md:flex-row shadow-2xl"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2.5 rounded-full bg-neutral-900/80 border border-white/20 text-white hover:bg-amber-400 hover:text-neutral-950 transition-all cursor-pointer"
            title="Close Lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Left Large Image */}
          <div className="md:w-3/5 h-[320px] md:h-auto relative bg-neutral-950">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4 glass-pill px-3 py-1 rounded-full text-xs font-semibold text-amber-300 border border-white/10">
              {project.category}
            </div>
          </div>

          {/* Right Architectural Dossier */}
          <div className="md:w-2/5 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto bg-neutral-950/70">
            <div>
              <div className="flex items-center gap-1.5 text-xs uppercase tracking-widest text-amber-400 font-mono font-semibold mb-1">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Atelier Portfolio</span>
              </div>
              <h3 className="text-2xl sm:text-3xl font-serif font-light text-white">
                {project.title}
              </h3>

              <div className="flex items-center gap-2 text-xs text-neutral-400 mt-2 mb-6">
                <MapPin className="w-3.5 h-3.5 text-amber-400" />
                <span>{project.location}</span>
                <span>•</span>
                <span className="font-mono">{project.area}</span>
              </div>

              <div className="space-y-4 text-xs sm:text-sm text-neutral-300">
                <p className="leading-relaxed">{project.description}</p>
                {project.challenge && (
                  <div className="p-3 rounded-xl bg-white/5 border border-white/5">
                    <span className="text-[11px] font-semibold text-amber-300 uppercase block mb-1">The Spatial Challenge</span>
                    <p className="text-neutral-400 text-xs">{project.challenge}</p>
                  </div>
                )}
                {project.solution && (
                  <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20">
                    <span className="text-[11px] font-semibold text-amber-400 uppercase block mb-1">Our Architectural Solution</span>
                    <p className="text-neutral-300 text-xs">{project.solution}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="pt-6 mt-6 border-t border-white/10 flex items-center justify-between">
              <span className="text-xs text-neutral-500 font-mono">Commission Year: {project.year}</span>
              <a
                href="/contact"
                className="text-xs font-semibold text-amber-400 hover:text-amber-300 underline underline-offset-4"
              >
                Inquire about similar estate →
              </a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

