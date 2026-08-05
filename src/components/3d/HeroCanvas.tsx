import React, { Suspense, useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { ContactShadows, Environment } from '@react-three/drei';
import * as THREE from 'three';
import { BurgerModel } from './BurgerModel';
import { PizzaModel } from './PizzaModel';
import { FriesModel } from './FriesModel';
import { EmberParticles } from './EmberParticles';

interface HeroSceneProps {
  activeFood: 'burger' | 'pizza' | 'fries';
  mousePos: { x: number; y: number };
  scrollY: number;
}

const InteractiveStage: React.FC<HeroSceneProps> = ({ activeFood, mousePos, scrollY }) => {
  const stageRef = useRef<THREE.Group>(null);
  const shadowRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (!stageRef.current) return;

    // Smooth lerp parallax tilt based on mouse position
    const targetRotX = mousePos.y * 0.38;
    const targetRotY = mousePos.x * 0.48;

    // Scroll reaction: rotate and scale down gracefully as user scrolls
    const scrollFactor = Math.min(1.2, scrollY / 600);
    const scrollRotX = scrollFactor * 0.35;
    const scrollScale = Math.max(0.68, 1 - scrollFactor * 0.32);

    stageRef.current.rotation.x = THREE.MathUtils.lerp(
      stageRef.current.rotation.x,
      targetRotX + scrollRotX,
      0.065
    );
    stageRef.current.rotation.y = THREE.MathUtils.lerp(
      stageRef.current.rotation.y,
      targetRotY,
      0.065
    );
    stageRef.current.rotation.z = THREE.MathUtils.lerp(
      stageRef.current.rotation.z,
      -mousePos.x * 0.12,
      0.065
    );

    stageRef.current.scale.setScalar(scrollScale);

    if (shadowRef.current) {
      shadowRef.current.scale.setScalar(scrollScale);
    }
  });

  return (
    <group>
      <group ref={stageRef} position={[0, -0.05, 0]}>
        {activeFood === 'burger' && <BurgerModel scale={1.52} assembleOnMount={true} />}
        {activeFood === 'pizza' && <PizzaModel scale={1.42} />}
        {activeFood === 'fries' && <FriesModel scale={1.46} />}
      </group>

      {/* Photorealistic Soft Contact Ground Shadow */}
      <group ref={shadowRef} position={[0, -1.65, 0]}>
        <ContactShadows
          opacity={0.9}
          scale={7.5}
          blur={2.8}
          far={4.8}
          color="#000000"
        />
        {/* Subtle warm amber ground bounce reflection */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]}>
          <planeGeometry args={[4.2, 4.2]} />
          <meshBasicMaterial
            color="#FF5500"
            transparent
            opacity={0.06}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      </group>
    </group>
  );
};

interface HeroCanvasProps {
  activeFood: 'burger' | 'pizza' | 'fries';
  mousePos: { x: number; y: number };
}

export const HeroCanvas: React.FC<HeroCanvasProps> = ({ activeFood, mousePos }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        shadows
        camera={{ position: [0, -0.05, 4.8], fov: 36 }}
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.18,
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        {/* Studio HDRI Environment Reflections */}
        <Environment preset="studio" environmentIntensity={0.85} />

        {/* Ambient Fill Light */}
        <ambientLight intensity={0.65} color="#FFF8F0" />

        {/* 1. Warm Key Light (Front-Upper-Left 3200K Studio Softbox) */}
        <directionalLight
          position={[4.5, 6.5, 5]}
          intensity={2.6}
          color="#FFEADB"
          castShadow
          shadow-mapSize={1024}
          shadow-bias={-0.0001}
        />

        {/* 2. Sizzling Flame Rim Light (Back-Left Edge) */}
        <spotLight
          position={[-5.5, 3.5, -3.5]}
          intensity={5.2}
          color="#FF5500"
          angle={0.85}
          penumbra={0.7}
        />

        {/* 3. Cool Ambient Fill Light (Right Side) */}
        <pointLight position={[4, 2, 2.5]} intensity={1.1} color="#C7D2FE" />

        {/* 4. Under-Patty Radiance */}
        <pointLight position={[0, -2.2, 1.2]} intensity={1.6} color="#FF1E56" />

        {/* Rising 3D Floating Embers */}
        <EmberParticles count={42} />

        <Suspense fallback={null}>
          <InteractiveStage
            activeFood={activeFood}
            mousePos={mousePos}
            scrollY={scrollY}
          />
        </Suspense>
      </Canvas>
    </div>
  );
};
