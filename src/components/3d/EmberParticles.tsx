import React, { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface EmberParticlesProps {
  count?: number;
}

export const EmberParticles: React.FC<EmberParticlesProps> = ({ count = 60 }) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  // Generate particle initial states
  const particles = useMemo(() => {
    const temp = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 8;
      const y = (Math.random() - 0.5) * 6;
      const z = (Math.random() - 0.5) * 6;
      const speed = 0.008 + Math.random() * 0.015;
      const rotSpeed = (Math.random() - 0.5) * 0.03;
      const scale = 0.03 + Math.random() * 0.07;
      const color = Math.random() > 0.4 
        ? new THREE.Color('#FF5500') 
        : Math.random() > 0.5 
          ? new THREE.Color('#FFB800') 
          : new THREE.Color('#FF1E56');
      temp.push({ x, y, z, speed, rotSpeed, scale, color });
    }
    return temp;
  }, [count]);

  useFrame(() => {
    if (!meshRef.current) return;

    particles.forEach((particle, i) => {
      particle.y += particle.speed;
      particle.x += Math.sin(particle.y * 2 + i) * 0.004;

      // Reset when particle flies too high
      if (particle.y > 4) {
        particle.y = -3.5;
        particle.x = (Math.random() - 0.5) * 8;
        particle.z = (Math.random() - 0.5) * 6;
      }

      dummy.position.set(particle.x, particle.y, particle.z);
      dummy.rotation.x += particle.rotSpeed;
      dummy.rotation.y += particle.rotSpeed * 1.2;
      dummy.scale.set(particle.scale, particle.scale, particle.scale);
      dummy.updateMatrix();

      meshRef.current!.setMatrixAt(i, dummy.matrix);
      meshRef.current!.setColorAt(i, particle.color);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
    if (meshRef.current.instanceColor) {
      meshRef.current.instanceColor.needsUpdate = true;
    }
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <dodecahedronGeometry args={[1, 0]} />
      <meshBasicMaterial 
        transparent 
        opacity={0.85} 
        blending={THREE.AdditiveBlending} 
      />
    </instancedMesh>
  );
};
