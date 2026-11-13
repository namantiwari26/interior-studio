import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PANORAMAS } from '../../data/models';
import { 
  Compass, Maximize2, Minimize2, RotateCcw, 
  Eye, Navigation, Layers
} from 'lucide-react';

// Texture cache to prevent reloading and avoid premature disposal in React StrictMode
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

// Preload all 4 room textures in background
PANORAMAS.forEach(room => {
  getOrCreateTexture(room.file, () => {});
});

// Sphere rendering the 360 equirectangular texture
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
      {/* 360 Inside-Out Panoramic Sphere */}
      <mesh scale={[-500, 500, 500]} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 60, 40]} />
        <meshBasicMaterial 
          map={texture || null} 
          side={THREE.DoubleSide}
          toneMapped={false}
          color={texture ? '#ffffff' : '#141b18'}
          transparent={isTransitioning}
          opacity={isTransitioning ? 0.3 : 1.0}
        />
      </mesh>

      {/* Interactive Glowing Teleport Hotspots */}
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
              {/* Pulsing Ripple */}
              <span className="relative flex h-8 w-8 items-center justify-center pointer-events-auto">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400/40 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-7 w-7 bg-amber-500/90 border-2 border-white items-center justify-center shadow-lg shadow-amber-500/60 group-hover:scale-125 transition-transform">
                  <Navigation className="w-3.5 h-3.5 text-neutral-950 fill-current rotate-45" />
                </span>
              </span>

              {/* Tooltip Card */}
              <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none whitespace-nowrap bg-neutral-950/90 backdrop-blur-md border border-amber-500/40 px-3.5 py-1.5 rounded-full text-xs text-amber-200 shadow-2xl">
                <span className="font-semibold text-white">{spot.label}</span>
              </div>
            </button>
          </Html>
        </group>
      ))}
    </group>
  );
}

// Camera controller with drag look, inertial damping, zoom limits, and auto-rotation
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

  // Pointer drag events on canvas
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

  // Render loop for smooth damping
  useFrame((_, delta) => {
    // Gentle auto-rotate if idle for 2.5 seconds
    if (isAutoRotate && !isDragging.current && Date.now() - lastActiveTime.current > 2500) {
      targetLon.current += delta * 4.5;
    }

    // Smooth inertia lerp
    lon.current += (targetLon.current - lon.current) * 0.08;
    lat.current += (targetLat.current - lat.current) * 0.08;

    // Transition zoom effect
    if (isTransitioning) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetTransitionFov, 0.1);
    } else {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.08);
    }
    camera.updateProjectionMatrix();

    // Convert spherical coordinates to cartesian target
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
      className={`relative w-full overflow-hidden select-none bg-[#0E0E0F] ${
        embedded ? 'h-[580px] md:h-[680px] rounded-2xl border border-white/10 shadow-2xl' : 'h-screen w-screen'
      }`}
    >
      {/* 3D Canvas */}
      <Canvas
        camera={{ position: [0, 0, 0], fov: 65, near: 0.1, far: 1500 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
      >
        <color attach="background" args={["#0E0E0F"]} />
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
        <div className="glass-pill px-4 py-2 rounded-full flex items-center gap-3 pointer-events-auto border border-white/10 shadow-xl">
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
          <div>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-amber-300 block">360° Virtual Walkthrough</span>
            <h4 className="text-sm font-medium text-white font-serif">{currentRoom.name}</h4>
          </div>
        </div>

        {/* Right Tools */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-2.5 rounded-full glass-pill border transition-all ${
              isAutoRotate ? 'text-amber-400 border-amber-500/40 bg-amber-500/10' : 'text-neutral-400 border-white/10 hover:text-white'
            }`}
            title={isAutoRotate ? 'Pause Auto-Rotation' : 'Resume Auto-Rotation'}
          >
            <RotateCcw className={`w-4 h-4 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '10s' }} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2.5 rounded-full glass-pill border border-white/10 text-neutral-300 hover:text-white hover:border-amber-400/40 transition-all"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Center Drag Guide Cue */}
      <div 
        className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-700 ${
          isInteracting ? 'opacity-0' : 'opacity-80'
        }`}
      >
        <div className="glass-pill px-5 py-2.5 rounded-full text-xs text-neutral-300 flex items-center gap-2 border border-white/10 shadow-2xl backdrop-blur-md">
          <Eye className="w-4 h-4 text-amber-400 animate-bounce" />
          <span>Click & Drag to explore 360° | Scroll to Zoom</span>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        <button
          onClick={() => handleZoom(-10)}
          className="w-9 h-9 rounded-full glass-pill border border-white/10 flex items-center justify-center text-white hover:border-amber-400/50 hover:text-amber-400 transition-all"
          title="Zoom In"
        >
          +
        </button>
        <button
          onClick={() => handleZoom(10)}
          className="w-9 h-9 rounded-full glass-pill border border-white/10 flex items-center justify-center text-white hover:border-amber-400/50 hover:text-amber-400 transition-all"
          title="Zoom Out"
        >
          -
        </button>
      </div>

      {/* Bottom Minimap / Room Selector Strip */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-end sm:items-center justify-between gap-3 pointer-events-none z-20">
        <div className="glass-panel-gold p-1.5 rounded-2xl flex items-center gap-1.5 pointer-events-auto max-w-full overflow-x-auto shadow-2xl">
          {PANORAMAS.map((room) => {
            const isActive = room.id === currentRoomId;
            return (
              <button
                key={room.id}
                onClick={() => handleRoomChange(room.id)}
                className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-amber-500 text-neutral-950 font-semibold shadow-lg shadow-amber-500/20' 
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div 
                  className="w-6 h-6 rounded-md bg-cover bg-center border border-white/20"
                  style={{ backgroundImage: `url(${room.thumb})` }}
                />
                <span>{room.name.split(' ')[0]} {room.name.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-3 glass-pill px-4 py-2 rounded-xl text-xs text-neutral-300 border border-white/10 pointer-events-auto">
          <span className="text-amber-400 font-serif">Spatial Specs:</span>
          <span>{currentRoom.subtitle}</span>
        </div>
      </div>

      {/* Black Fade Transition Overlay */}
      <div 
        className={`absolute inset-0 bg-[#0E0E0F] pointer-events-none transition-opacity duration-300 z-30 ${
          isTransitioning ? 'opacity-80' : 'opacity-0'
        }`}
      />
    </div>
  );
}
