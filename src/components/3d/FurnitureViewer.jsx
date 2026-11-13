import React, { useState, useEffect, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { useGLTF, OrbitControls, ContactShadows, Html } from '@react-three/drei';
import * as THREE from 'three';
import { FURNITURE_MODELS } from '../../data/models';
import { ChevronLeft, ChevronRight, Check } from 'lucide-react';

function ModelInstance({ modelData, activeColor, activeSwatchName }) {
  const { scene } = useGLTF(modelData.file);
  const clonedScene = React.useMemo(() => scene.clone(true), [scene]);
  const [annotationOpen, setAnnotationOpen] = useState(true);

  useEffect(() => {
    if (!clonedScene || !activeColor) return;

    clonedScene.traverse((child) => {
      if (child.isMesh && child.material) {
        if (!child.userData.originalMaterial) {
          child.userData.originalMaterial = child.material;
          child.material = child.material.clone();
        }

        const matName = (child.material.name || '').toLowerCase();
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

      {/* 3D Hotspot Specification Pin */}
      {modelData.annotation && (
        <group position={modelData.annotation.position}>
          <Html center distanceFactor={4}>
            <div className="relative select-none pointer-events-auto">
              <button 
                onClick={() => setAnnotationOpen(!annotationOpen)}
                className="w-6 h-6 rounded-full bg-[#FAF6EF] text-[#2B2118] border border-[#A9814A] flex items-center justify-center font-serif text-xs font-semibold shadow-sm hover:scale-105 transition-transform cursor-pointer"
                title="Specification Note"
              >
                +
              </button>

              {annotationOpen && (
                <div className="absolute left-8 top-1/2 -translate-y-1/2 w-52 bg-[#FAF6EF] p-3 rounded-xl shadow-lg border border-[rgba(60,45,30,0.14)] text-left z-30">
                  <span className="text-[9px] uppercase font-mono tracking-wider text-[#A9814A] font-semibold block">
                    Material Craft
                  </span>
                  <h5 className="text-xs font-serif font-medium text-[#2B2118] mt-0.5">{modelData.annotation.label}</h5>
                  <p className="text-[11px] text-[#6F6254] leading-snug mt-1">
                    {modelData.annotation.desc}
                  </p>
                  <div className="mt-2 pt-1.5 border-t border-[rgba(60,45,30,0.08)] flex items-center justify-between text-[10px] text-[#6F6254]">
                    <span>Finish:</span>
                    <span className="font-medium text-[#2B2118]">{activeSwatchName}</span>
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

function ModelLoader() {
  return (
    <Html center>
      <div className="flex flex-col items-center gap-2 bg-[#FAF6EF] px-5 py-3 rounded-xl border border-[rgba(60,45,30,0.12)] text-center shadow-sm">
        <div className="w-6 h-6 rounded-full border-2 border-[#A9814A] border-t-transparent animate-spin" />
        <span className="text-[11px] font-mono text-[#6F6254] tracking-wide uppercase">Loading Piece</span>
      </div>
    </Html>
  );
}

export default function FurnitureViewer() {
  const [modelIndex, setModelIndex] = useState(0);
  const currentModel = FURNITURE_MODELS[modelIndex];
  const [activeColor, setActiveColor] = useState(currentModel.swatches[0].hex);
  const [activeSwatchName, setActiveSwatchName] = useState(currentModel.swatches[0].name);

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
    <div className="relative w-full rounded-2xl bg-[#FAF6EF] border border-[rgba(60,45,30,0.12)] p-5 sm:p-8 shadow-sm">
      {/* Top Header & Carousel Controls */}
      <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[rgba(60,45,30,0.1)]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.2em] text-[#A9814A] font-mono font-semibold block mb-1">
            Bespoke Joinery Atelier
          </span>
          <h3 className="text-2xl sm:text-3xl font-serif text-[#2B2118]">
            {currentModel.name}
          </h3>
          <p className="text-xs sm:text-sm text-[#6F6254] mt-1 max-w-xl">
            {currentModel.subtitle}
          </p>
        </div>

        {/* Carousel Prev / Next */}
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-[#6F6254]">
            0{modelIndex + 1} / 0{FURNITURE_MODELS.length}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="p-2.5 rounded-full border border-[rgba(60,45,30,0.15)] bg-[#FAF6EF] text-[#2B2118] hover:border-[#A9814A] hover:text-[#A9814A] transition-all cursor-pointer"
              title="Previous Model"
            >
              <ChevronLeft className="w-4 h-4" strokeWidth={1.4} />
            </button>
            <button
              onClick={handleNext}
              className="p-2.5 rounded-full border border-[rgba(60,45,30,0.15)] bg-[#FAF6EF] text-[#2B2118] hover:border-[#A9814A] hover:text-[#A9814A] transition-all cursor-pointer"
              title="Next Model"
            >
              <ChevronRight className="w-4 h-4" strokeWidth={1.4} />
            </button>
          </div>
        </div>
      </div>

      {/* Main 3D Canvas Area (Soft Sand Background) */}
      <div className="relative h-[400px] sm:h-[460px] w-full my-5 rounded-xl overflow-hidden bg-gradient-to-b from-[#FAF6EF] to-[#EAE1D3]/80 border border-[rgba(60,45,30,0.08)]">
        <Canvas
          shadows
          camera={{ position: [0, 1.2, 3.2], fov: 45 }}
          dpr={[1, 1.75]}
          gl={{ antialias: true, alpha: true }}
          className="w-full h-full cursor-grab active:cursor-grabbing"
        >
          <ambientLight intensity={1.1} color="#FFFBF5" />
          <directionalLight position={[5, 8, 5]} intensity={1.3} color="#FFF8EE" castShadow shadow-mapSize={1024} />
          <directionalLight position={[-4, 3, -4]} intensity={0.5} color="#E8D8C0" />

          <Suspense fallback={<ModelLoader />}>
            <ModelInstance 
              key={currentModel.id} 
              modelData={currentModel} 
              activeColor={activeColor}
              activeSwatchName={activeSwatchName}
            />
            {/* Soft Warm Contact Shadows */}
            <ContactShadows 
              position={[0, -0.65, 0]} 
              opacity={0.35} 
              scale={9} 
              blur={2.2} 
              far={4} 
              color="#423428"
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
            autoRotateSpeed={0.6}
          />
        </Canvas>

        {/* Orbit hint pill */}
        <div className="absolute top-4 left-4 bg-[#FAF6EF]/90 backdrop-blur-md px-3 py-1.5 rounded-full text-[10px] text-[#6F6254] border border-[rgba(60,45,30,0.12)] pointer-events-none flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#A9814A]" />
          <span>Rotate 360° • Zoom • Tap Hotspots</span>
        </div>

        {/* Price & Lead Time Badge */}
        <div className="absolute top-4 right-4 bg-[#FAF6EF]/95 backdrop-blur-md px-4 py-2 rounded-xl border border-[rgba(60,45,30,0.12)] text-right pointer-events-none">
          <span className="text-[9px] uppercase tracking-wider text-[#A9814A] font-mono block">Custom Commission</span>
          <span className="text-sm font-serif font-semibold text-[#2B2118]">{currentModel.price}</span>
        </div>
      </div>

      {/* Bottom Swatch Picker & Specifications */}
      <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6 pt-2 items-center">
        {/* Fabric Swatch Picker */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-2 text-xs font-medium text-[#2B2118] mb-2.5">
            <span>Upholstery Swatches</span>
            <span className="text-[#6F6254]">({activeSwatchName})</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {currentModel.swatches.map((swatch) => {
              const isSelected = activeColor === swatch.hex;
              return (
                <button
                  key={swatch.name}
                  onClick={() => {
                    setActiveColor(swatch.hex);
                    setActiveSwatchName(swatch.name);
                  }}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                    isSelected 
                      ? 'border-[#A9814A] bg-[#FAF6EF] text-[#2B2118] shadow-sm' 
                      : 'border-[rgba(60,45,30,0.12)] bg-[#FAF6EF]/60 text-[#6F6254] hover:text-[#2B2118] hover:border-[rgba(60,45,30,0.25)]'
                  }`}
                >
                  <span 
                    className="w-3.5 h-3.5 rounded-full border border-black/10 shadow-inner" 
                    style={{ backgroundColor: swatch.hex }}
                  />
                  <span className="text-xs">{swatch.name}</span>
                  {isSelected && <Check className="w-3 h-3 text-[#A9814A]" strokeWidth={1.5} />}
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick Specs */}
        <div className="bg-[#FAF6EF] p-4 rounded-xl border border-[rgba(60,45,30,0.12)] flex flex-col gap-1.5 text-xs">
          <div className="flex items-center justify-between text-[#6F6254]">
            <span>Dimensions</span>
            <span className="font-mono text-[#2B2118]">{currentModel.dimensions}</span>
          </div>
          <div className="flex items-center justify-between text-[#6F6254]">
            <span>Crafting</span>
            <span className="text-[#2B2118]">{currentModel.designer}</span>
          </div>
          <div className="flex items-center justify-between text-[#6F6254]">
            <span>Lead Time</span>
            <span className="text-[#A9814A] font-medium">{currentModel.leadTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

FURNITURE_MODELS.forEach((m) => {
  useGLTF.preload(m.file);
});
