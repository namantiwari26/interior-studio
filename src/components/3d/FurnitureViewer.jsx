import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Stage, Float, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FURNITURE_MODELS } from '../../data/models';
import { 
  ChevronLeft, ChevronRight, Palette, Sparkles, 
  Layers, Info, Check, ShieldCheck, Clock, Award 
} from 'lucide-react';

// Single GLTF Model loader with live color/material swatch tinting
function ModelInstance({ modelData, activeColor, activeSwatchName }) {
  const { scene } = useGLTF(modelData.file);
  const clonedScene = React.useMemo(() => scene.clone(true), [scene]);
  const [annotationOpen, setAnnotationOpen] = useState(true);

  // Apply swatch color to mesh materials
  useEffect(() => {
    if (!clonedScene || !activeColor) return;

    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        // Clone material so changes don't bleed across instances
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material;
          child.material = child.material.clone();
        }

        const matName = (child.material.name || '').toLowerCase();
        // Target main upholstery/fabric/body materials
        const isFabricOrBody = 
          matName.includes('fabric') || 
          matName.includes('velvet') || 
          matName.includes('cushion') || 
          matName.includes('seat') || 
          matName.includes('sheen') || 
          matName.includes('cloth') || 
          matName.includes('upholstery') ||
          matName.includes('cover') ||
          matName.includes('main') ||
          matName.includes('glass') ||
          matName.includes('vase') ||
          matName.includes('damask') ||
          // fallback for unlabelled single mesh
          (!matName.includes('metal') && !matName.includes('wood') && !matName.includes('leg'));

        if (isFabricOrBody) {
          child.material.color = new THREE.Color(activeColor);
          child.material.roughness = 0.55;
          child.material.metalness = 0.05;
          child.material.needsUpdate = true;
        }
      }
    });
  }, [clonedScene, activeColor]);

  return (
    <group position={modelData.position} rotation={modelData.rotation} scale={modelData.scale}>
      <primitive object={clonedScene} />

      {/* 3D Hotspot Annotation */}
      {modelData.annotation && (
        <group position={modelData.annotation.position}>
          <Html center distanceFactor={4}>
            <div className="relative group select-none">
              <button 
                onClick={() => setAnnotationOpen(!annotationOpen)}
                className="w-7 h-7 rounded-full bg-amber-400 text-neutral-950 flex items-center justify-center font-bold text-xs shadow-lg shadow-amber-400/40 border-2 border-white cursor-pointer hover:scale-110 transition-transform"
                title="View Specification"
              >
                +
              </button>

              {annotationOpen && (
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-56 glass-panel-gold p-3 rounded-xl shadow-2xl backdrop-blur-xl border border-amber-500/30 text-left pointer-events-auto z-30">
                  <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-amber-400 tracking-wider">
                    <Sparkles className="w-3 h-3" />
                    <span>Material Craft</span>
                  </div>
                  <h5 className="text-xs font-semibold text-white mt-0.5">{modelData.annotation.label}</h5>
                  <p className="text-[11px] text-neutral-300 leading-snug mt-1">
                    {modelData.annotation.desc}
                  </p>
                  <div className="mt-2 pt-1.5 border-t border-white/10 flex items-center justify-between text-[10px] text-amber-300/80">
                    <span>Selected Swatch:</span>
                    <span className="font-semibold text-white">{activeSwatchName}</span>
                  </div>
                </div>
              )}
            </div>
          </Html>
        </group>
      )}
    </group>
  );
}

// Fallback skeleton loader
function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-3 glass-panel px-6 py-4 rounded-2xl border border-white/10 text-center">
        <div className="w-8 h-8 rounded-full border-2 border-amber-400 border-t-transparent animate-spin" />
        <span className="text-xs font-medium text-amber-300 tracking-wider uppercase">Loading 3D Atelier Piece...</span>
      </div>
    </Html>
  );
}

export default function FurnitureViewer() {
  const [modelIndex, setModelIndex] = useState(0);
  const currentModel = FURNITURE_MODELS[modelIndex];
  const [activeColor, setActiveColor] = useState(currentModel.swatches[0].hex);
  const [activeSwatchName, setActiveSwatchName] = useState(currentModel.swatches[0].name);

  // Reset swatch when model changes
  useEffect(() => {
    setActiveColor(currentModel.swatches[0].hex);
    setActiveSwatchName(currentModel.swatches[0].name);
  }, [modelIndex, currentModel]);

  const handlePrev = () => {
    setModelIndex((prev) => (prev > 0 ? prev - 1 : FURNITURE_MODELS.length - 1));
  };

  const handleNext = () => {
    setModelIndex((prev) => (prev < FURNITURE_MODELS.length - 1 ? prev + 1 : 0));
  };

  return (
    <div className="relative w-full rounded-3xl overflow-hidden glass-panel border border-white/10 bg-neutral-950/70 p-4 sm:p-8">
      {/* Background radial gold glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header & Carousel Controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-amber-400 font-semibold mb-1">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
            <span>Interactive 3D Bespoke Studio</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif font-medium text-white">
            {currentModel.name}
          </h3>
          <p className="text-xs sm:text-sm text-neutral-400 mt-1 max-w-xl">
            {currentModel.subtitle}
          </p>
        </div>

        {/* Carousel Prev / Next */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-neutral-400">
            0{modelIndex + 1} / 0{FURNITURE_MODELS.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full glass-pill border border-white/10 text-neutral-300 hover:text-white hover:border-amber-400/50 transition-all cursor-pointer"
              title="Previous Model"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={handleNext}
              className="p-3 rounded-full glass-pill border border-white/10 text-neutral-300 hover:text-white hover:border-amber-400/50 transition-all cursor-pointer"
              title="Next Model"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Area */}
      <div className="relative h-[420px] sm:h-[500px] w-full my-4 rounded-2xl overflow-hidden bg-gradient-to-b from-neutral-900/60 to-neutral-950/80">
        <Canvas
          shadows
          camera={{ position: [0, 1.2, 3.2], fov: 45 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={0.9} />
          <directionalLight position={[5, 8, 5]} intensity={1.5} castShadow shadow-mapSize={1024} />
          <directionalLight position={[-5, 4, -5]} intensity={0.6} color="#ffd494" />
          <pointLight position={[0, -2, 2]} intensity={0.4} color="#C9A46A" />

          <Suspense fallback={<ModelLoader />}>
            <ModelInstance 
              key={currentModel.id} 
              modelData={currentModel} 
              activeColor={activeColor}
              activeSwatchName={activeSwatchName}
            />
            <ContactShadows 
              position={[0, -0.65, 0]} 
              opacity={0.75} 
              scale={10} 
              blur={2.2} 
              far={4.5} 
            />
          </Suspense>

          <OrbitControls
            enablePan={false}
            enableZoom={true}
            minDistance={1.8}
            maxDistance={5.2}
            minPolarAngle={Math.PI / 6}
            maxPolarAngle={Math.PI / 2.05}
            autoRotate
            autoRotateSpeed={0.8}
          />
        </Canvas>

        {/* Orbit hint pill */}
        <div className="absolute top-4 left-4 glass-pill px-3 py-1.5 rounded-full text-[11px] text-neutral-400 border border-white/10 pointer-events-none flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          <span>Rotate 360° • Zoom • Tap Hotspots</span>
        </div>

        {/* Price & Lead Time Badge */}
        <div className="absolute top-4 right-4 glass-panel-gold px-4 py-2 rounded-2xl border border-amber-500/20 text-right pointer-events-none">
          <div className="text-[10px] uppercase tracking-wider text-amber-300">Custom Order</div>
          <div className="text-base font-semibold text-white font-serif">{currentModel.price}</div>
        </div>
      </div>

      {/* Bottom Customization & Specifications Bar */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-4 items-center">
        {/* Fabric Swatch Picker */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-amber-400 mb-2.5">
            <Palette className="w-3.5 h-3.5" />
            <span>Select Upholstery Swatch & Finish</span>
            <span className="text-neutral-400 font-normal">({activeSwatchName})</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {currentModel.swatches.map((swatch) => {
              const isSelected = activeColor === swatch.hex;
              return (
                <button
                  key={swatch.name}
                  onClick={() => {
                    setActiveColor(swatch.hex);
                    setActiveSwatchName(swatch.name);
                  }}
                  className={`group relative flex items-center gap-2.5 px-3 py-2 rounded-xl border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-amber-400 bg-amber-500/10 text-white shadow-lg shadow-amber-500/10' 
                      : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white hover:border-white/30'
                  }`}
                >
                  <span 
                    className="w-4 h-4 rounded-full border border-white/40 shadow-inner group-hover:scale-110 transition-transform" 
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="text-xs font-medium">{swatch.name}</span>
                  {isSelected && <Check className="w-3.5 h-3.5 text-amber-400 ml-0.5" />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Specs */}
        <div className="glass-pill p-4 rounded-2xl border border-white/10 flex flex-col gap-2 text-xs">
          <div className="flex items-center justify-between text-neutral-300">
            <span className="text-neutral-400">Dimensions:</span>
            <span className="font-mono text-white">{currentModel.dimensions}</span>
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span className="text-neutral-400">Craftsmanship:</span>
            <span className="text-amber-300">{currentModel.designer}</span>
          </div>
          <div className="flex items-center justify-between text-neutral-300">
            <span className="text-neutral-400">Production Time:</span>
            <span className="text-white">{currentModel.leadTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Preload models for instantaneous switching
FURNITURE_MODELS.forEach((m) => {
  useGLTF.preload(m.file);
});

