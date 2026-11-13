import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PANORAMAS } from '../../data/models';
import { 
  Maximize2, Minimize2, RotateCcw, 
  Eye, Navigation
} from 'lucide-react';

const textureCache = new Map();

function getOrCreateTexture(url, onLoaded) {
  if (textureCache.has(url)) {
    const cached = textureCache.get(url);
    onLoaded(cached);
    return;
  }

  const loader = new THREE.TextureLoader();
  loader.load(
    url,
    (tex) => {
      tex.colorSpace = THREE.SRGBColorSpace;
      tex.mapping = THREE.EquirectangularReflectionMapping;
      tex.minFilter = THREE.LinearFilter;
      tex.magFilter = THREE.LinearFilter;
      tex.generateMipmaps = false;
      textureCache.set(url, tex);
      onLoaded(tex);
    },
    undefined,
    (err) => {
      console.warn('Error loading panorama:', url, err);
    }
  );
}

PANORAMAS.forEach(room => {
  getOrCreateTexture(room.file, () => {});
});

function PanoramaSphere({ currentRoom, isTransitioning, onHotspotClick }) {
  const [texture, setTexture] = useState(() => textureCache.get(currentRoom.file) || null);

  useEffect(() => {
    let isMounted = true;
    getOrCreateTexture(currentRoom.file, (loadedTex) => {
      if (isMounted) {
        setTexture(loadedTex);
      }
    });

    return () => {
      isMounted = false;
    };
  }, [currentRoom.file]);

  return (
    <group>
      <mesh scale={[-500, 500, 500]} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 60, 40]} />
        <meshBasicMaterial 
          map={texture || null} 
          side={THREE.DoubleSide}
          toneMapped={false}
          color={texture ? '#ffffff' : '#1F1812'}
          transparent={isTransitioning}
          opacity={isTransitioning ? 0.3 : 1.0}
        />
      </mesh>

      {/* Teleport Hotspots */}
      {texture && currentRoom.hotspots?.map((spot) => (
        <group key={spot.id} position={spot.position}>
          <Html center distanceFactor={25} zIndexRange={[100, 0]}>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onHotspotClick(spot.targetRoom);
              }}
              className="group relative flex items-center gap-2 cursor-pointer focus:outline-none select-none"
              title={spot.label}
            >
              <span className="relative flex h-7 w-7 items-center justify-center pointer-events-auto">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#A9814A]/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-6 w-6 bg-[#A9814A] border-2 border-[#FAF6EF] items-center justify-center shadow-lg group-hover:scale-115 transition-transform">
                  <Navigation className="w-3 h-3 text-[#1F1812] fill-current rotate-45" strokeWidth={1.5} />
                </span>
              </span>

              <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#1F1812]/95 backdrop-blur-md border border-[rgba(255,255,255,0.12)] px-3 py-1 rounded-full text-[11px] text-[#FAF6EF] shadow-xl">
                <span>{spot.label}</span>
              </div>
            </button>
          </Html>
        </group>
      ))}
    </group>
  );
}

function CameraController({ 
  isInteracting, 
  setIsInteracting, 
  isAutoRotate, 
  fov, 
  isTransitioning, 
  targetTransitionFov 
}) {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const prevMouse = useRef({ x: 0, y: 0 });
  const lon = useRef(0);
  const lat = useRef(0);
  const targetLon = useRef(0);
  const targetLat = useRef(0);
  const lastActiveTime = useRef(Date.now());

  useEffect(() => {
    camera.position.set(0, 0, 0);
    camera.fov = fov;
    camera.updateProjectionMatrix();
  }, [fov, camera]);

  useEffect(() => {
    const dom = gl.domElement;

    const onPointerDown = (e) => {
      isDragging.current = true;
      setIsInteracting(true);
      prevMouse.current = { x: e.clientX, y: e.clientY };
      lastActiveTime.current = Date.now();
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - prevMouse.current.x;
      const deltaY = e.clientY - prevMouse.current.y;
      prevMouse.current = { x: e.clientX, y: e.clientY };

      targetLon.current -= deltaX * 0.18;
      targetLat.current += deltaY * 0.18;
      targetLat.current = Math.max(-85, Math.min(85, targetLat.current));
      lastActiveTime.current = Date.now();
    };

    const onPointerUp = () => {
      isDragging.current = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const onWheel = (e) => {
      e.preventDefault();
      lastActiveTime.current = Date.now();
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('wheel', onWheel);
    };
  }, [gl, setIsInteracting]);

  useFrame((_, delta) => {
    if (isAutoRotate && !isDragging.current && Date.now() - lastActiveTime.current > 2500) {
      targetLon.current += delta * 4.0;
    }

    lon.current += (targetLon.current - lon.current) * 0.08;
    lat.current += (targetLat.current - lat.current) * 0.08;

    if (isTransitioning) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetTransitionFov, 0.1);
    } else {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.08);
    }
    camera.updateProjectionMatrix();

    const phi = THREE.MathUtils.degToRad(90 - lat.current);
    const theta = THREE.MathUtils.degToRad(lon.current);

    const x = 500 * Math.sin(phi) * Math.cos(theta);
    const y = 500 * Math.cos(phi);
    const z = 500 * Math.sin(phi) * Math.sin(theta);

    camera.lookAt(x, y, z);
  });

  return null;
}

export default function PanoramaTour({ initialRoomId = 'living', embedded = false }) {
  const [currentRoomId, setCurrentRoomId] = useState(initialRoomId);
  const [isInteracting, setIsInteracting] = useState(false);
  const [isAutoRotate, setIsAutoRotate] = useState(true);
  const [fov, setFov] = useState(65);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const containerRef = useRef(null);

  const currentRoom = PANORAMAS.find(r => r.id === currentRoomId) || PANORAMAS[0];

  const handleRoomChange = (newRoomId) => {
    if (newRoomId === currentRoomId) return;
    setIsTransitioning(true);

    setTimeout(() => {
      setCurrentRoomId(newRoomId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }, 400);
  };

  const toggleFullscreen = () => {
    if (!containerRef.current) return;
    if (!document.fullscreenElement) {
      containerRef.current.requestFullscreen?.();
      setIsFullscreen(true);
    } else {
      document.exitFullscreen?.();
      setIsFullscreen(false);
    }
  };

  const handleZoom = (delta) => {
    setFov((prev) => Math.min(85, Math.max(35, prev + delta)));
  };

  return (
    <div 
      ref={containerRef}
      className={`relative w-full overflow-hidden select-none bg-[#1F1812] ${
        embedded ? 'h-[540px] md:h-[620px] rounded-2xl border border-[rgba(60,45,30,0.18)] shadow-lg' : 'h-screen w-screen'
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 0], fov: 65, near: 0.1, far: 1500 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={["#1F1812"]} />
        <Suspense fallback={null}>
          <PanoramaSphere 
            currentRoom={currentRoom} 
            isTransitioning={isTransitioning}
            onHotspotClick={handleRoomChange}
          />
          <CameraController 
            isInteracting={isInteracting} 
            setIsInteracting={setIsInteracting} 
            isAutoRotate={isAutoRotate}
            fov={fov}
            isTransitioning={isTransitioning}
            targetTransitionFov={35}
          />
        </Suspense>
      </Canvas>

      {/* Top Ambient Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="bg-[#1F1812]/80 backdrop-blur-md px-4 py-2 rounded-full flex items-center gap-2.5 pointer-events-auto border border-white/10 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#A9814A]" />
          <div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#A9814A] font-mono block">360 Virtual Study</span>
            <h4 className="text-xs font-serif font-medium text-white">{currentRoom.name}</h4>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-2.5 rounded-full border transition-all ${
              isAutoRotate ? 'text-[#A9814A] border-[#A9814A]/60 bg-[#A9814A]/10' : 'text-neutral-400 border-white/10 hover:text-white'
            }`}
            title={isAutoRotate ? 'Pause Rotation' : 'Resume Rotation'}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} strokeWidth={1.4} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-full border border-white/10 text-neutral-300 hover:text-white hover:border-[#A9814A] transition-all bg-[#1F1812]/70"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" strokeWidth={1.4} /> : <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.4} />}
          </button>
        </div>
      </div>

      {/* Drag Guide Cue */}
      <div 
        className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500 ${
          isInteracting ? 'opacity-0' : 'opacity-85'
        }`}
      >
        <div className="bg-[#1F1812]/85 backdrop-blur-md px-4 py-2 rounded-full text-[11px] text-neutral-300 flex items-center gap-2 border border-white/10 shadow-lg">
          <Eye className="w-3.5 h-3.5 text-[#A9814A]" strokeWidth={1.4} />
          <span>Click and drag to pan / Scroll to zoom</span>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-1.5 z-20">
        <button
          onClick={() => handleZoom(-10)}
          className="w-8 h-8 rounded-full bg-[#1F1812]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:border-[#A9814A] hover:text-[#A9814A] transition-all text-xs font-mono"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => handleZoom(10)}
          className="w-8 h-8 rounded-full bg-[#1F1812]/80 backdrop-blur-md border border-white/15 flex items-center justify-center text-white hover:border-[#A9814A] hover:text-[#A9814A] transition-all text-xs font-mono"
          title="Zoom Out"
        >
          -
        </button>
      </div>

      {/* Bottom Minimap / Room Selector */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3 pointer-events-none z-20">
        <div className="bg-[#1F1812]/90 backdrop-blur-md p-1.5 rounded-xl flex items-center gap-1.5 pointer-events-auto max-w-full overflow-x-auto border border-white/10 shadow-xl">
          {PANORAMAS.map((room) => {
            const isActive = room.id === currentRoomId;
            return (
              <button
                key={room.id}
                onClick={() => handleRoomChange(room.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-[#A9814A] text-[#1F1812] font-semibold' 
                    : 'text-neutral-300 hover:text-white hover:bg-white/5'
                }`}
              >
                <div 
                  className="w-5 h-5 rounded bg-cover bg-center border border-white/15"
                  style={{ backgroundImage: `url(${room.thumb})` }}
                />
                <span>{room.name.split(' ')[0]} {room.name.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-[#1F1812]/80 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[11px] text-[#A8A39A] border border-white/10 pointer-events-auto font-mono">
          <span className="text-[#A9814A]">Specs:</span>
          <span>{currentRoom.subtitle}</span>
        </div>
      </div>

      <div 
        className={`absolute inset-0 bg-[#1F1812] pointer-events-none transition-opacity duration-300 z-30 ${
          isTransitioning ? 'opacity-80' : 'opacity-0'
        }`}
      />
    </div>
  );
}
