import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Float } from '@react-three/drei';
import * as THREE from 'three';

function FloatingModel({ modelPath, scale = 1.8, rotationSpeed = 0.5 }) {
  const { scene } = useGLTF(modelPath);
  const clonedScene = React.useMemo(() => scene.clone(true), [scene]);
  const groupRef = useRef();

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.4) * 0.35;
      groupRef.current.rotation.x = Math.cos(state.clock.elapsedTime * 0.3) * 0.08;
    }
  });

  return (
    <group ref={groupRef} scale={scale} position={[0, -0.4, 0]}>
      <primitive object={clonedScene} />
    </group>
  );
}

export default function Floating3DObject({ 
  modelPath = '/models/armchair.glb', 
  scale = 1.6, 
  className = "w-64 h-64 md:w-80 md:h-80" 
}) {
  return (
    <div className={`relative pointer-events-none select-none ${className}`}>
      <Canvas
        camera={{ position: [0, 0.5, 3.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={1.2} />
        <directionalLight position={[4, 5, 4]} intensity={2.0} color="#fff2db" />
        <directionalLight position={[-3, 2, -3]} intensity={0.8} color="#C9A46A" />

        <Suspense fallback={null}>
          <Float
            speed={2.2} 
            rotationIntensity={0.6} 
            floatIntensity={1.2} 
            floatingRange={[-0.1, 0.1]}
          >
            <FloatingModel modelPath={modelPath} scale={scale} />
          </Float>
        </Suspense>
      </Canvas>
    </div>
  );
}

