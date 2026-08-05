import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface FriesModelProps {
  wireframe?: boolean;
  scale?: number;
  interactive?: boolean;
}

export const FriesModel: React.FC<FriesModelProps> = ({
  wireframe = false,
  scale = 1.1,
  interactive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Generate a cluster of French Fries
  const fries = useMemo(() => {
    const arr: {
      pos: [number, number, number];
      rot: [number, number, number];
      size: [number, number, number];
    }[] = [];

    const count = 28;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + Math.random() * 0.2;
      const radius = Math.random() * 0.45;
      const x = Math.cos(angle) * radius;
      const z = Math.sin(angle) * radius * 0.7;
      const y = 0.5 + Math.random() * 0.35;
      const height = 0.8 + Math.random() * 0.6;
      const rotX = (Math.random() - 0.5) * 0.35;
      const rotY = (Math.random() - 0.5) * 0.5;
      const rotZ = (Math.random() - 0.5) * 0.35;

      arr.push({
        pos: [x, y, z],
        rot: [rotX, rotY, rotZ],
        size: [0.11, height, 0.11],
      });
    }
    return arr;
  }, []);

  // Dripping cheese sauce blob
  const cheeseSauceGeom = useMemo(() => {
    const geom = new THREE.SphereGeometry(0.55, 16, 16);
    geom.scale(1.2, 0.4, 0.9);
    return geom;
  }, []);

  // Bacon bits
  const baconBits = useMemo(() => {
    return Array.from({ length: 14 }).map(() => ({
      pos: [
        (Math.random() - 0.5) * 0.8,
        0.7 + Math.random() * 0.4,
        (Math.random() - 0.5) * 0.6,
      ] as [number, number, number],
      rot: [Math.random(), Math.random(), Math.random()] as [number, number, number],
      scale: 0.05 + Math.random() * 0.04,
    }));
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !interactive) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    groupRef.current.rotation.y = t * 0.38;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.3, 0]}>
      {/* 1. CRAFT BLACK CARTOON BOX */}
      <group position={[0, -0.2, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[0.7, 0.5, 1.1, 4]} />
          <meshStandardMaterial
            color="#121216"
            roughness={0.8}
            metalness={0.2}
            wireframe={wireframe}
          />
        </mesh>
        {/* Flame Logo Badge on Carton */}
        <mesh position={[0, 0.05, 0.43]} rotation={[0, 0, 0]}>
          <planeGeometry args={[0.35, 0.35]} />
          <meshStandardMaterial
            color="#FF5500"
            emissive="#FF5500"
            emissiveIntensity={0.6}
            roughness={0.2}
          />
        </mesh>
      </group>

      {/* 2. GOLDEN CRISPY FRIES */}
      {fries.map((fry, i) => (
        <mesh
          key={i}
          position={fry.pos}
          rotation={fry.rot}
          castShadow
          receiveShadow
        >
          <boxGeometry args={fry.size} />
          <meshStandardMaterial
            color={i % 3 === 0 ? '#EAB308' : '#FACC15'}
            roughness={0.4}
            metalness={0.05}
            wireframe={wireframe}
          />
        </mesh>
      ))}

      {/* 3. MOLTEN CHEDDAR CHEESE DRIP */}
      <group position={[0, 0.6, 0]}>
        <mesh geometry={cheeseSauceGeom}>
          <meshStandardMaterial
            color="#F59E0B"
            roughness={0.2}
            metalness={0.2}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* 4. CRISP BACON BITS */}
      {!wireframe &&
        baconBits.map((bacon, i) => (
          <mesh key={i} position={bacon.pos} rotation={bacon.rot}>
            <boxGeometry args={[bacon.scale, bacon.scale * 0.6, bacon.scale]} />
            <meshStandardMaterial color="#881337" roughness={0.6} />
          </mesh>
        ))}
    </group>
  );
};
