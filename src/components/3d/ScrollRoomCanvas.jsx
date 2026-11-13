import React, { useRef, Suspense, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

// 3D Stylized architectural room interior
function InteriorRoomScene({ progress }) {
  const cameraTarget = useRef(new THREE.Vector3(0, 0, 0));
  const cameraPosition = useRef(new THREE.Vector3(0, 2, 7));

  // Keyframe camera positions along the tour path
  // Progress 0: Wide establishing view
  // Progress 0.5: Dolly in towards center salon
  // Progress 1.0: Close architectural detail angle
  useFrame((state) => {
    const p = Math.min(Math.max(progress.current, 0), 1);

    // Spline interpolation for camera path
    const startPos = new THREE.Vector3(0, 2.5, 7.5);
    const midPos = new THREE.Vector3(1.5, 1.2, 4.0);
    const endPos = new THREE.Vector3(-1.8, 0.9, 2.2);

    let targetP;
    if (p < 0.5) {
      targetP = startPos.clone().lerp(midPos, p * 2);
    } else {
      targetP = midPos.clone().lerp(endPos, (p - 0.5) * 2);
    }

    state.camera.position.lerp(targetP, 0.08);

    // Dynamic lookAt point
    const startLook = new THREE.Vector3(0, 0.5, 0);
    const endLook = new THREE.Vector3(-0.5, 0.6, 0);
    const currentLook = startLook.clone().lerp(endLook, p);
    state.camera.lookAt(currentLook);
  });

  return (
    <group>
      {/* Warm architectural lighting */}
      <ambientLight intensity={0.65} />
      <pointLight position={[0, 4, 0]} intensity={1.5} color="#FFE6C2" distance={12} />
      <pointLight position={[-4, 2, 2]} intensity={0.9} color="#C9A46A" distance={8} />
      <pointLight position={[3, 1, -2]} intensity={0.8} color="#FFD180" distance={6} />

      {/* Floor - Warm Parquet / Polished Travertine */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#1a1816" roughness={0.3} metalness={0.2} />
      </mesh>

      {/* Back Architectural Wall with fluted paneling simulation */}
      <mesh position={[0, 3, -6]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#141416" roughness={0.8} />
      </mesh>

      {/* Side Wall Left */}
      <mesh position={[-6, 3, 0]} rotation={[0, Math.PI / 2, 0]}>
        <planeGeometry args={[20, 10]} />
        <meshStandardMaterial color="#0F2A24" roughness={0.7} />
      </mesh>

      {/* Ceiling with recessed cove light */}
      <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 5, 0]}>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial color="#111112" roughness={0.9} />
      </mesh>

      {/* Sculptural Wall Art Panel (From Reference 2 style) */}
      <group position={[0, 2, -5.9]}>
        <mesh>
          <planeGeometry args={[4.5, 2.8]} />
          <meshStandardMaterial color="#1d1d20" roughness={0.5} />
        </mesh>
        {/* Glowing halo behind panel */}
        <mesh position={[0, 0, -0.05]}>
          <planeGeometry args={[4.8, 3.1]} />
          <meshBasicMaterial color="#C9A46A" transparent opacity={0.35} />
        </mesh>
      </group>

      {/* Minimalist Coffee Table & Marble Plinths */}
      <group position={[0, -0.6, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.2, 1.2, 0.25, 32]} />
          <meshStandardMaterial color="#2c2c30" roughness={0.2} metalness={0.3} />
        </mesh>
        <mesh position={[0, -0.2, 0]}>
          <cylinderGeometry args={[0.5, 0.5, 0.2, 32]} />
          <meshStandardMaterial color="#C9A46A" metalness={0.8} roughness={0.3} />
        </mesh>
      </group>

      {/* Architectural Column Pillars */}
      <mesh position={[-4, 2, -2]}>
        <boxGeometry args={[0.8, 6, 0.8]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.6} />
      </mesh>
      <mesh position={[4, 2, -2]}>
        <boxGeometry args={[0.8, 6, 0.8]} />
        <meshStandardMaterial color="#1a1a1c" roughness={0.6} />
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
        camera={{ position: [0, 2, 7.5], fov: 50 }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <InteriorRoomScene progress={progressRef} />
        </Suspense>
      </Canvas>
    </div>
  );
}

