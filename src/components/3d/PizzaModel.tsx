import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface PizzaModelProps {
  wireframe?: boolean;
  scale?: number;
  interactive?: boolean;
}

export const PizzaModel: React.FC<PizzaModelProps> = ({
  wireframe = false,
  scale = 1.1,
  interactive = true,
}) => {
  const groupRef = useRef<THREE.Group>(null);

  // Pizza slice triangular base shape
  const sliceGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, 0); // Point of the slice
    shape.lineTo(-1.2, 2.2);
    // Slight curve along the outer crust
    shape.quadraticCurveTo(0, 2.5, 1.2, 2.2);
    shape.lineTo(0, 0);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.12,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 2,
      bevelSize: 0.05,
      bevelThickness: 0.04,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Outer puffy wood-fired crust
  const crustGeometry = useMemo(() => {
    const curve = new THREE.QuadraticBezierCurve3(
      new THREE.Vector3(-1.25, 2.15, 0.08),
      new THREE.Vector3(0, 2.55, 0.08),
      new THREE.Vector3(1.25, 2.15, 0.08)
    );
    return new THREE.TubeGeometry(curve, 20, 0.18, 12, false);
  }, []);

  // Pepperoni placements
  const pepperonis = useMemo(() => {
    return [
      { pos: [0, 1.4, 0.18] as [number, number, number], scale: 0.32, rot: 0.1 },
      { pos: [-0.45, 1.75, 0.18] as [number, number, number], scale: 0.28, rot: -0.2 },
      { pos: [0.45, 1.68, 0.18] as [number, number, number], scale: 0.3, rot: 0.3 },
      { pos: [-0.2, 0.85, 0.18] as [number, number, number], scale: 0.26, rot: 0.15 },
      { pos: [0.25, 0.75, 0.18] as [number, number, number], scale: 0.28, rot: -0.1 },
    ];
  }, []);

  // Basil leaves
  const basilLeaves = useMemo(() => {
    return [
      { pos: [0.05, 1.05, 0.2] as [number, number, number], rot: [0.2, 0.4, 0.6] as [number, number, number] },
      { pos: [-0.25, 1.45, 0.2] as [number, number, number], rot: [-0.1, -0.3, -0.8] as [number, number, number] },
      { pos: [0.15, 1.95, 0.2] as [number, number, number], rot: [0.1, 0.2, 1.2] as [number, number, number] },
    ];
  }, []);

  useFrame((state) => {
    if (!groupRef.current || !interactive) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.position.y = Math.sin(t * 1.5) * 0.08;
    groupRef.current.rotation.y = t * 0.35;
    groupRef.current.rotation.x = -0.3 + Math.cos(t * 1.2) * 0.05;
  });

  return (
    <group ref={groupRef} scale={[scale, scale, scale]} position={[0, -0.4, 0]}>
      {/* 1. PIZZA SLICE DOUGH & SAUCE BASE */}
      <mesh geometry={sliceGeometry} rotation={[-Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <meshStandardMaterial
          color="#E59866"
          roughness={0.6}
          metalness={0.05}
          wireframe={wireframe}
        />
      </mesh>

      {/* 2. MELTED CHEESE TOPPING */}
      <mesh
        geometry={sliceGeometry}
        rotation={[-Math.PI / 2, 0, 0]}
        position={[0, 0.02, 0]}
        scale={[0.92, 0.92, 0.8]}
      >
        <meshStandardMaterial
          color="#FDE047"
          roughness={0.3}
          metalness={0.1}
          wireframe={wireframe}
        />
      </mesh>

      {/* 3. PUFFY WOOD-FIRED CRUST RIDGE */}
      <mesh geometry={crustGeometry} rotation={[-Math.PI / 2, 0, 0]} castShadow>
        <meshStandardMaterial
          color="#B45309"
          roughness={0.7}
          metalness={0.05}
          wireframe={wireframe}
        />
      </mesh>

      {/* 4. CRISPY PEPPERONI SLICES */}
      {!wireframe &&
        pepperonis.map((pep, i) => (
          <mesh
            key={i}
            position={[pep.pos[0], pep.pos[2], -pep.pos[1] + 1.2]}
            rotation={[Math.PI / 2 + 0.05, 0, pep.rot]}
            castShadow
          >
            <cylinderGeometry args={[pep.scale, pep.scale, 0.03, 24]} />
            <meshStandardMaterial color="#B91C1C" roughness={0.4} metalness={0.2} />
          </mesh>
        ))}

      {/* 5. FRESH BASIL LEAVES */}
      {!wireframe &&
        basilLeaves.map((basil, i) => (
          <mesh
            key={i}
            position={[basil.pos[0], basil.pos[2], -basil.pos[1] + 1.2]}
            rotation={basil.rot}
            scale={[1, 0.15, 1.8]}
          >
            <sphereGeometry args={[0.16, 12, 8]} />
            <meshStandardMaterial color="#16A34A" roughness={0.3} />
          </mesh>
        ))}
    </group>
  );
};
