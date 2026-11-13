import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Floating warm dust particles / golden bokeh motes
function DustParticles({ count = 120 }) {
  const pointsRef = useRef();

  const [positions, scales, speeds] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const sca = new Float32Array(count);
    const spd = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      pos[i * 3 + 0] = (Math.random() - 0.5) * 20;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 12;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 15;

      sca[i] = Math.random() * 2.5 + 0.5;
      spd[i] = Math.random() * 0.2 + 0.05;
    }

    return [pos, sca, spd];
  }, [count]);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const array = pointsRef.current.geometry.attributes.position.array;

    for (let i = 0; i < count; i++) {
      // Gentle floating upwards and swaying
      array[i * 3 + 1] += speeds[i] * delta * 0.8;
      array[i * 3 + 0] += Math.sin(state.clock.elapsedTime + i) * 0.003;

      // Wrap around bounds
      if (array[i * 3 + 1] > 6) {
        array[i * 3 + 1] = -6;
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
        size={0.12}
        color="#F3C98B"
        transparent
        opacity={0.65}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Parallax 3D camera controller based on pointer
function ParallaxRig() {
  useFrame((state) => {
    const { pointer, camera } = state;
    // Smooth lerp camera rotation based on pointer
    const targetX = pointer.x * 0.6;
    const targetY = pointer.y * 0.4;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// Warm volumetric light ring
function AmbientLightRays() {
  const meshRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.z = state.clock.elapsedTime * 0.04;
    }
  });

  return (
    <group ref={meshRef} position={[0, 0, -2]}>
      <mesh>
        <ringGeometry args={[3, 9, 32]} />
        <meshBasicMaterial
          color="#C9A46A"
          transparent
          opacity={0.04}
          side={THREE.DoubleSide}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
    </group>
  );
}

export default function HeroDepthCanvas() {
  return (
    <div className="absolute inset-0 pointer-events-none z-10 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <ambientLight intensity={0.5} />
          <DustParticles count={90} />
          <AmbientLightRays />
          <ParallaxRig />
        </Suspense>
      </Canvas>
    </div>
  );
}

