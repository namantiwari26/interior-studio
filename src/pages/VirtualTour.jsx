import React, { useState, Suspense, lazy } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Share2, Check } from 'lucide-react';

const PanoramaCanvas = lazy(() => import('../components/3d/PanoramaCanvas'));

export default function VirtualTour() {
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div 
      style={{ touchAction: 'none' }}
      className="fixed inset-0 w-full h-[100dvh] min-h-[100vh] overflow-hidden bg-[#1A120B] text-[#FAF6EF] select-none z-50"
    >
      {/* 360 Panorama Canvas */}
      <Suspense fallback={
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#1A120B] text-[#C9A46A] gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#8A5620] border-t-transparent animate-spin" />
          <span className="font-serif text-sm tracking-widest uppercase">Loading 360 Spatial Environment</span>
        </div>
      }>
        <PanoramaCanvas embedded={false} initialRoomId="living" />
      </Suspense>

      {/* Floating Top Navigation Pill */}
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-40 pointer-events-auto">
        <Link
          to="/"
          className="bg-[#1A120B]/90 backdrop-blur-md px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-white hover:text-[#C9A46A] border border-white/20 transition-all shadow-lg"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#C9A46A]" strokeWidth={1.5} />
          <span>Exit to Studio</span>
        </Link>
      </div>

      {/* Share Link Top Right */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-40 pointer-events-auto flex items-center gap-2">
        <button
          onClick={handleShare}
          className="bg-[#1A120B]/90 backdrop-blur-md px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-white border border-white/20 hover:border-[#8A5620] transition-all cursor-pointer shadow-lg"
          title="Share Tour Link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.5} /> : <Share2 className="w-3.5 h-3.5 text-[#C9A46A]" strokeWidth={1.5} />}
          <span>{copied ? 'Link Copied' : 'Share View'}</span>
        </button>
      </div>

      {/* Floating Info Overlay (Desktop Guide) */}
      <div className="absolute top-20 left-6 hidden lg:block z-30 pointer-events-none max-w-xs">
        <div className="bg-[#1A120B]/90 backdrop-blur-md p-4 rounded-xl border border-white/15 text-xs text-[#D8CCBD] pointer-events-auto shadow-xl space-y-1.5">
          <span className="text-[10px] text-[#C9A46A] font-semibold uppercase tracking-wider block font-mono">
            Navigation Controls
          </span>
          <p className="text-[11px] text-[#A8A39A] leading-relaxed">
            Drag with finger or mouse to pan 360 degrees. Pinch or scroll to zoom. Tap the glowing bronze navigation pins to teleport between architectural salons.
          </p>
        </div>
      </div>
    </div>
  );
}
