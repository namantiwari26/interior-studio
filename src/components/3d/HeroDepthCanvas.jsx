import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating subtle warm dust particles
function DustParticles({ count = 75 }) {
  const pointsRef = useRef();

  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 18;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 12;

      sca[i] = Math.random() * 2.0 + 0.5;
      spd[i] = Math.random() * 0.15 + 0.04;
    }

    return [pos, sca, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      array[i * 3 + 1] += speeds[i] * delta * 0.7;
      array[i * 3 + 0] += Math.sin(state.clock.elapsedTime + i) * 0.002;

      if (array[i * 3 + 1] > 5) {
        array[i * 3 + 1] = -5;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.10}
        color="#D6B885"
        transparent
        opacity={0.5}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

function ParallaxRig() {
  useFrame((state) => {
    const { pointer, camera } = state;
    const targetX = pointer.x * 0.45;
    const targetY = pointer.y * 0.3;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.04);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.04);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

export default function HeroDepthCanvas() {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  if (!isDesktop) return null;

  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden hidden md:block">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={1}
        gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <DustParticles count={25} />
          <ParallaxRig />
        </Suspense>
      </Canvas>
    </div>
  );
}
