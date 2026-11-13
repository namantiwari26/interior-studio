import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Architectural interior study room
function InteriorRoomScene({ progress }) {
  useFrame((state) => {
    const p = Math.min(Math.max(progress.current, 0), 1);

    const startPos = new THREE.Vector3(0, 2.4, 7.0);
    const midPos = new THREE.Vector3(1.2, 1.2, 3.8);
    const endPos = new THREE.Vector3(-1.5, 0.9, 2.0);

    let targetP;
    if (p < 0.5) {
      targetP = startPos.clone().lerp(midPos, p * 2);
    } else {
      targetP = midPos.clone().lerp(endPos, (p - 0.5) * 2);
    }

    state.camera.position.lerp(targetP, 0.08);

    const startLook = new THREE.Vector3(0, 0.5, 0);
    const endLook = new THREE.Vector3(-0.4, 0.6, 0);
    const currentLook = startLook.clone().lerp(endLook, p);
    state.camera.lookAt(currentLook);
  });

  return (
    <group>
      {/* Warm ambient and key lighting */}
      <ambientLight intensity={0.9} color="#FFF9F2" />
      <pointLight position={[0, 4, 0]} intensity={1.2} color="#FFF2E0" distance={12} />
      <pointLight position={[-4, 2, 2]} intensity={0.8} color="#D4AF7A" distance={8} />
      <pointLight position={[3, 1, -2]} intensity={0.6} color="#E8D5B7" distance={6} />

      {/* Floor - Travertine & Honed Limestone */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#EAE1D3" roughness={0.4} metalness={0.05} />
      </mesh>

      {/* Back Wall - Warm Ivory Plaster */}
      <mesh position={[0, 3, -6]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#FAF6EF" roughness={0.9} />
      </mesh>

      {/* Left Wall - Deep Olive Accent */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#2F4A3F" roughness={0.7} />
      </mesh>

      {/* Ceiling */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#FAF6EF" roughness={0.9} />
      </mesh>

      {/* Architectural Plinth Table */}
      <group position={[0, -0.6, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.25, 32]} />
          <meshStandardMaterial color="#FAF6EF" roughness={0.3} metalness={0.1} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#A9814A" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Architectural Columns */}
      <mesh position={[-4, 2, -2]}>
        <boxGeometry args={[0.8, 6, 0.8]} />
        <meshStandardMaterial color="#EAE1D3" roughness={0.6} />
      </mesh>
      <mesh position={[4, 2, -2]}>
        <boxGeometry args={[0.8, 6, 0.8]} />
        <meshStandardMaterial color="#EAE1D3" roughness={0.6} />
      </mesh>
    </group>
  );
}

export default function ScrollRoomCanvas({ scrollProgress }) {
  const progressRef = useRef(0);

  useEffect(() => {
    progressRef.current = scrollProgress;
  }, [scrollProgress]);

  return (
    <div className="w-full h-full">
      <Canvas
        camera={{ position: [0, 2.4, 7.0], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false }}
      >
        <color attach="background" args={["#F4EEE4"]} />
        <Suspense fallback={null}>
          <InteriorRoomScene progress={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}
