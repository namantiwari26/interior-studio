import React, { useRef, useState, useEffect, Suspense, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { PANORAMAS } from '../../data/models';
import { 
  Maximize2, Minimize2, RotateCcw, 
  Eye, Navigation, Smartphone, Plus, Minus
} from 'lucide-react';

const textureCache = new Map();

function loadPanoramaTexture(url, onLoaded, onError) {
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
      tex.needsUpdate = true;
      textureCache.set(url, tex);
      onLoaded(tex);
    },
    undefined,
    (err) => {
      console.warn('Panorama texture load warning for:', url, err);
      onError?.(err);
    }
  );
}

function PanoramaSphere({ currentRoom, isTransitioning, onHotspotClick, onTextureReady }) {
  const [texture, setTexture] = useState(() => textureCache.get(currentRoom.file) || null);
  const materialRef = useRef();

  useEffect(() => {
    let isMounted = true;
    loadPanoramaTexture(
      currentRoom.file,
      (loadedTex) => {
        if (isMounted) {
          setTexture(loadedTex);
          if (materialRef.current) {
            materialRef.current.needsUpdate = true;
          }
          onTextureReady?.();
        }
      },
      () => {
        if (isMounted) onTextureReady?.();
      }
    );

    return () => {
      isMounted = false;
    };
  }, [currentRoom.file, onTextureReady]);

  return (
    <group>
      <mesh scale={[-500, 500, 500]} position={[0, 0, 0]}>
        <sphereGeometry args={[1, 60, 40]} />
        <meshBasicMaterial 
          ref={materialRef}
          key={`${currentRoom.id}-${texture ? 'tex' : 'notex'}`}
          map={texture || null} 
          side={THREE.DoubleSide}
          toneMapped={false}
          color={texture ? '#ffffff' : '#1A120B'}
          transparent={isTransitioning}
          opacity={isTransitioning ? 0.35 : 1.0}
        />
      </mesh>

      {/* Interactive Teleport Hotspots */}
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
              <span className="relative flex h-8 w-8 items-center justify-center pointer-events-auto">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#8A5620]/50 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-7 w-7 bg-[#8A5620] border-2 border-[#FAF6EF] items-center justify-center shadow-lg group-hover:scale-115 transition-transform">
                  <Navigation className="w-3.5 h-3.5 text-[#FAF6EF] fill-current rotate-45" strokeWidth={1.5} />
                </span>
              </span>

              <div className="hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap bg-[#1A120B]/95 backdrop-blur-md border border-[rgba(255,255,255,0.18)] px-3.5 py-1.5 rounded-full text-xs text-[#FAF6EF] shadow-xl">
                <span className="font-medium">{spot.label}</span>
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
  setFov,
  isTransitioning, 
  targetTransitionFov,
  gyroEnabled 
}) {
  const { camera, gl } = useThree();
  const isDragging = useRef(false);
  const prevPos = useRef({ x: 0, y: 0 });
  const prevPinchDist = useRef(null);
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

  // Touch and pointer interaction listeners
  useEffect(() => {
    const dom = gl.domElement;

    // Mouse / Pointer handlers
    const onPointerDown = (e) => {
      isDragging.current = true;
      setIsInteracting(true);
      prevPos.current = { x: e.clientX, y: e.clientY };
      lastActiveTime.current = Date.now();
    };

    const onPointerMove = (e) => {
      if (!isDragging.current) return;
      const deltaX = e.clientX - prevPos.current.x;
      const deltaY = e.clientY - prevPos.current.y;
      prevPos.current = { x: e.clientX, y: e.clientY };

      targetLon.current -= deltaX * 0.18;
      targetLat.current += deltaY * 0.18;
      targetLat.current = Math.max(-85, Math.min(85, targetLat.current));
      lastActiveTime.current = Date.now();
    };

    const onPointerUp = () => {
      isDragging.current = false;
      setTimeout(() => setIsInteracting(false), 800);
    };

    // Mobile Touch handlers (single finger pan, two-finger pinch zoom)
    const onTouchStart = (e) => {
      if (e.touches.length === 1) {
        isDragging.current = true;
        setIsInteracting(true);
        prevPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
      } else if (e.touches.length === 2) {
        isDragging.current = false;
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        prevPinchDist.current = Math.hypot(dx, dy);
      }
      lastActiveTime.current = Date.now();
    };

    const onTouchMove = (e) => {
      e.preventDefault(); // Prevent page scroll during 360 tour interaction
      if (e.touches.length === 1 && isDragging.current) {
        const deltaX = e.touches[0].clientX - prevPos.current.x;
        const deltaY = e.touches[0].clientY - prevPos.current.y;
        prevPos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

        targetLon.current -= deltaX * 0.22;
        targetLat.current += deltaY * 0.22;
        targetLat.current = Math.max(-85, Math.min(85, targetLat.current));
      } else if (e.touches.length === 2 && prevPinchDist.current !== null) {
        const dx = e.touches[0].clientX - e.touches[1].clientX;
        const dy = e.touches[0].clientY - e.touches[1].clientY;
        const dist = Math.hypot(dx, dy);
        const diff = dist - prevPinchDist.current;
        prevPinchDist.current = dist;

        setFov((prev) => Math.min(85, Math.max(35, prev - diff * 0.12)));
      }
      lastActiveTime.current = Date.now();
    };

    const onTouchEnd = () => {
      isDragging.current = false;
      prevPinchDist.current = null;
      setTimeout(() => setIsInteracting(false), 800);
    };

    const onWheel = (e) => {
      e.preventDefault();
      setFov((prev) => Math.min(85, Math.max(35, prev + e.deltaY * 0.05)));
      lastActiveTime.current = Date.now();
    };

    dom.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    dom.addEventListener('touchstart', onTouchStart, { passive: false });
    window.addEventListener('touchmove', onTouchMove, { passive: false });
    window.addEventListener('touchend', onTouchEnd);
    window.addEventListener('touchcancel', onTouchEnd);
    dom.addEventListener('wheel', onWheel, { passive: false });

    return () => {
      dom.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      dom.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);
      window.removeEventListener('touchcancel', onTouchEnd);
      dom.removeEventListener('wheel', onWheel);
    };
  }, [gl, setIsInteracting, setFov]);

  // Mobile Gyroscope Device Orientation Listener
  useEffect(() => {
    if (!gyroEnabled) return;

    const handleOrientation = (e) => {
      if (e.alpha !== null && e.beta !== null) {
        targetLon.current = -e.alpha;
        targetLat.current = THREE.MathUtils.clamp(e.beta - 90, -85, 85);
      }
    };

    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, [gyroEnabled]);

  useFrame((_, delta) => {
    if (isAutoRotate && !isDragging.current && !gyroEnabled && Date.now() - lastActiveTime.current > 2500) {
      targetLon.current += delta * 4.0;
    }

    lon.current += (targetLon.current - lon.current) * 0.09;
    lat.current += (targetLat.current - lat.current) * 0.09;

    if (isTransitioning) {
      camera.fov = THREE.MathUtils.lerp(camera.fov, targetTransitionFov, 0.12);
    } else {
      camera.fov = THREE.MathUtils.lerp(camera.fov, fov, 0.09);
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
  const [gyroEnabled, setGyroEnabled] = useState(false);
  const [isTextureLoading, setIsTextureLoading] = useState(true);
  const [isInViewport, setIsInViewport] = useState(true);

  const containerRef = useRef(null);
  const currentRoom = PANORAMAS.find(r => r.id === currentRoomId) || PANORAMAS[0];

  // Pause render loop when scrolled offscreen to prevent laptop & phone lag
  useEffect(() => {
    if (!containerRef.current || !embedded) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInViewport(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [embedded]);

  const handleRoomChange = (newRoomId) => {
    if (newRoomId === currentRoomId) return;
    setIsTransitioning(true);
    setIsTextureLoading(true);

    setTimeout(() => {
      setCurrentRoomId(newRoomId);
      setTimeout(() => {
        setIsTransitioning(false);
      }, 350);
    }, 350);
  };

  const handleTextureLoaded = useCallback(() => {
    setIsTextureLoading(false);
  }, []);

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

  const toggleGyroscope = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
      try {
        const response = await DeviceOrientationEvent.requestPermission();
        if (response === 'granted') {
          setGyroEnabled(!gyroEnabled);
        }
      } catch (e) {
        console.warn('Gyroscope permission error:', e);
      }
    } else {
      setGyroEnabled(!gyroEnabled);
    }
  };

  return (
    <div 
      ref={containerRef}
      style={{ touchAction: 'none' }}
      className={`relative w-full overflow-hidden select-none bg-[#1A120B] ${
        embedded 
          ? 'h-[460px] sm:h-[540px] md:h-[620px] rounded-2xl sm:rounded-3xl border border-[rgba(60,45,30,0.18)] shadow-xl' 
          : 'h-[100dvh] w-screen'
      }`}
    >
      <Canvas
        camera={{ position: [0, 0, 0], fov: 65, near: 0.1, far: 1500 }}
        dpr={[1, 1.35]}
        frameloop={isInViewport ? 'always' : 'never'}
        gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        style={{ touchAction: 'none' }}
      >
        <color attach="background" args={["#1A120B"]} />
        <Suspense fallback={null}>
          <PanoramaSphere 
            currentRoom={currentRoom} 
            isTransitioning={isTransitioning}
            onHotspotClick={handleRoomChange}
            onTextureReady={handleTextureLoaded}
          />
          <CameraController 
            isInteracting={isInteracting} 
            setIsInteracting={setIsInteracting} 
            isAutoRotate={isAutoRotate}
            fov={fov}
            setFov={setFov}
            isTransitioning={isTransitioning}
            targetTransitionFov={35}
            gyroEnabled={gyroEnabled}
          />
        </Suspense>
      </Canvas>

      {/* Top Ambient Bar */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none z-20">
        <div className="bg-[#1A120B]/90 backdrop-blur-md px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full flex items-center gap-2.5 pointer-events-auto border border-white/15 shadow-md">
          <span className="w-2 h-2 rounded-full bg-[#8A5620]" />
          <div>
            <span className="text-[9px] font-semibold uppercase tracking-[0.18em] text-[#C9A46A] font-mono block">360 Spatial Study</span>
            <h4 className="text-xs sm:text-sm font-serif font-medium text-white">{currentRoom.name}</h4>
          </div>
        </div>

        {/* Right Tools: Gyroscope, AutoRotate, Fullscreen */}
        <div className="flex items-center gap-1.5 pointer-events-auto">
          {/* Gyroscope toggle for mobile phones */}
          <button
            onClick={toggleGyroscope}
            className={`p-2 sm:p-2.5 rounded-full border transition-all ${
              gyroEnabled ? 'text-[#FAF6EF] border-[#8A5620] bg-[#8A5620]' : 'text-neutral-300 border-white/15 bg-[#1A120B]/80 hover:text-white'
            }`}
            title="Toggle Phone Motion / Gyroscope"
          >
            <Smartphone className="w-3.5 h-3.5" strokeWidth={1.4} />
          </button>

          <button
            onClick={() => setIsAutoRotate(!isAutoRotate)}
            className={`p-2 sm:p-2.5 rounded-full border transition-all ${
              isAutoRotate ? 'text-[#FAF6EF] border-[#8A5620] bg-[#8A5620]/30' : 'text-neutral-400 border-white/15 bg-[#1A120B]/80 hover:text-white'
            }`}
            title={isAutoRotate ? 'Pause Rotation' : 'Resume Rotation'}
          >
            <RotateCcw className={`w-3.5 h-3.5 ${isAutoRotate ? 'animate-spin' : ''}`} style={{ animationDuration: '12s' }} strokeWidth={1.4} />
          </button>

          <button
            onClick={toggleFullscreen}
            className="p-2 sm:p-2.5 rounded-full border border-white/15 text-neutral-300 hover:text-white hover:border-[#8A5620] transition-all bg-[#1A120B]/80"
            title="Toggle Fullscreen"
          >
            {isFullscreen ? <Minimize2 className="w-3.5 h-3.5" strokeWidth={1.4} /> : <Maximize2 className="w-3.5 h-3.5" strokeWidth={1.4} />}
          </button>
        </div>
      </div>

      {/* Drag & Pinch Guide Cue */}
      <div 
        className={`absolute inset-0 pointer-events-none flex items-center justify-center transition-opacity duration-500 ${
          isInteracting ? 'opacity-0' : 'opacity-85'
        }`}
      >
        <div className="bg-[#1A120B]/90 backdrop-blur-md px-4 py-2 rounded-full text-[11px] text-neutral-200 flex items-center gap-2 border border-white/15 shadow-xl">
          <Eye className="w-3.5 h-3.5 text-[#C9A46A]" strokeWidth={1.4} />
          <span>Swipe or drag to look • Pinch to zoom</span>
        </div>
      </div>

      {/* Zoom Controls */}
      <div className="absolute right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2 z-20">
        <button
          onClick={() => handleZoom(-10)}
          className="w-8 h-8 rounded-full bg-[#1A120B]/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:border-[#8A5620] hover:text-[#C9A46A] transition-all text-xs cursor-pointer shadow-md"
          title="Zoom In"
        >
          <Plus className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
        <button
          onClick={() => handleZoom(10)}
          className="w-8 h-8 rounded-full bg-[#1A120B]/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:border-[#8A5620] hover:text-[#C9A46A] transition-all text-xs cursor-pointer shadow-md"
          title="Zoom Out"
        >
          <Minus className="w-3.5 h-3.5" strokeWidth={1.5} />
        </button>
      </div>

      {/* Bottom Minimap / Room Selector */}
      <div className="absolute bottom-4 left-4 right-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pointer-events-none z-20">
        <div className="bg-[#1A120B]/95 backdrop-blur-md p-1.5 rounded-xl flex items-center gap-1.5 pointer-events-auto max-w-full overflow-x-auto border border-white/15 shadow-2xl">
          {PANORAMAS.map((room) => {
            const isActive = room.id === currentRoomId;
            return (
              <button
                key={room.id}
                onClick={() => handleRoomChange(room.id)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap cursor-pointer ${
                  isActive 
                    ? 'bg-[#8A5620] text-[#FAF6EF] font-semibold shadow-sm' 
                    : 'text-neutral-300 hover:text-white hover:bg-white/10'
                }`}
              >
                <div 
                  className="w-5 h-5 rounded bg-cover bg-center border border-white/20 shrink-0"
                  style={{ backgroundImage: `url(${room.thumb})` }}
                />
                <span>{room.name.split(' ')[0]} {room.name.split(' ')[1] || ''}</span>
              </button>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-2 bg-[#1A120B]/90 backdrop-blur-md px-3.5 py-1.5 rounded-lg text-[11px] text-[#D8CCBD] border border-white/15 pointer-events-auto font-mono shadow-md">
          <span className="text-[#C9A46A]">Atmosphere:</span>
          <span>{currentRoom.subtitle}</span>
        </div>
      </div>

      {/* Transition Fade & Initial Texture Loading Indicator */}
      <div 
        className={`absolute inset-0 bg-[#1A120B] pointer-events-none transition-opacity duration-300 z-30 flex flex-col items-center justify-center gap-3 ${
          isTransitioning || isTextureLoading ? 'opacity-90' : 'opacity-0'
        }`}
      >
        <div className="w-7 h-7 rounded-full border-2 border-[#8A5620] border-t-transparent animate-spin" />
        <span className="text-[11px] font-mono tracking-widest text-[#D8CCBD] uppercase">
          {currentRoom.name}
        </span>
      </div>
    </div>
  );
}
