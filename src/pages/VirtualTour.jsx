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
    <div className="relative w-screen h-screen overflow-hidden bg-[#1F1812] text-[#FAF6EF] select-none">
      {/* 360 Panorama Canvas */}
      <Suspense fallback={
        <div className="w-full h-full flex flex-col items-center justify-center bg-[#1F1812] text-[#A9814A] gap-3">
          <div className="w-8 h-8 rounded-full border-2 border-[#A9814A] border-t-transparent animate-spin" />
          <span className="font-serif text-sm tracking-widest uppercase">Loading 360 Spatial Environment</span>
        </div>
      }>
        <PanoramaCanvas embedded={false} initialRoomId="living" />
      </Suspense>

      {/* Floating Top Navigation Pill */}
      <div className="absolute top-6 left-6 z-30 pointer-events-auto">
        <Link
          to="/"
          className="bg-[#1F1812]/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-white hover:text-[#A9814A] border border-white/15 transition-all shadow-md"
        >
          <ArrowLeft className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
          <span>Exit to Studio</span>
        </Link>
      </div>

      {/* Share Link Top Right */}
      <div className="absolute top-6 right-6 z-30 pointer-events-auto flex items-center gap-2">
        <button
          onClick={handleShare}
          className="bg-[#1F1812]/80 backdrop-blur-md px-3.5 py-2 rounded-full flex items-center gap-2 text-xs font-medium text-white border border-white/15 hover:border-[#A9814A] transition-all cursor-pointer"
          title="Share Tour Link"
        >
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" strokeWidth={1.4} /> : <Share2 className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />}
          <span>{copied ? 'Link Copied' : 'Share View'}</span>
        </button>
      </div>

      {/* Floating Info Overlay (Bottom Left on desktop) */}
      <div className="absolute top-20 left-6 hidden lg:block z-20 pointer-events-none max-w-xs">
        <div className="bg-[#1F1812]/85 backdrop-blur-md p-4 rounded-xl border border-white/10 text-xs text-[#D8CCBD] pointer-events-auto shadow-xl space-y-1.5">
          <span className="text-[10px] text-[#A9814A] font-semibold uppercase tracking-wider block font-mono">
            Navigation Guide
          </span>
          <p className="text-[11px] text-[#A8A39A] leading-relaxed">
            Drag to pan 360-degrees. Scroll or pinch to zoom. Tap the brass navigation pins inside rooms to teleport between salons.
          </p>
        </div>
      </div>
    </div>
  );
}
