import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface BurgerModelProps {
  exploded?: boolean;
  wireframe?: boolean;
  scale?: number;
  interactive?: boolean;
  assembleOnMount?: boolean;
}

// Custom spring ease-out with organic overshoot
function springProgress(t: number): number {
  const c4 = (2 * Math.PI) / 3;
  if (t <= 0) return 0;
  if (t >= 1) return 1;
  return Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
}

export const BurgerModel: React.FC<BurgerModelProps> = ({
  exploded = false,
  wireframe = false,
  scale = 1,
  interactive = true,
  assembleOnMount = true,
}) => {
  const rootRef = useRef<THREE.Group>(null);

  // Layer refs for individual piece assembly
  const topBunRef = useRef<THREE.Group>(null);
  const tomatoesRef = useRef<THREE.Group>(null);
  const cheeseRef = useRef<THREE.Group>(null);
  const pattyRef = useRef<THREE.Group>(null);
  const sauceRef = useRef<THREE.Group>(null);
  const onionsRef = useRef<THREE.Group>(null);
  const lettuceRef = useRef<THREE.Group>(null);
  const bottomBunRef = useRef<THREE.Group>(null);

  const startTimeRef = useRef<number | null>(null);

  // 48 Individually distributed Sesame Seeds with subtle random tilts
  const sesameSeeds = useMemo(() => {
    const seeds: { pos: [number, number, number]; rot: [number, number, number]; scale: number }[] = [];
    const count = 48;
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 0.74 + 0.26); // Top dome hemisphere
      const r = 1.055;
      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.cos(phi) * 0.58 + 0.06;
      const z = r * Math.sin(phi) * Math.sin(theta);
      seeds.push({
        pos: [x, y, z],
        rot: [phi + (Math.random() - 0.5) * 0.2, theta + (Math.random() - 0.5) * 0.2, Math.random() * 0.6],
        scale: 0.85 + Math.random() * 0.3,
      });
    }
    return seeds;
  }, []);

  // Crisp Ruffled Lettuce with multi-frequency organic perimeter waves
  const lettuceGeometry = useMemo(() => {
    const geom = new THREE.CylinderGeometry(1.24, 1.32, 0.065, 40);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const y = pos.getY(i);
      const angle = Math.atan2(pos.getZ(i), pos.getX(i));
      const wave =
        Math.sin(angle * 7) * 0.09 +
        Math.cos(angle * 13) * 0.05 +
        Math.sin(angle * 21) * 0.025;
      pos.setY(i, y + wave);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  // Molten Wisconsin Cheddar Blanket with 4 drooping extruded corners
  const cheeseGeometry = useMemo(() => {
    const shape = new THREE.Shape();
    const size = 1.12;
    shape.moveTo(-size, -size);
    shape.lineTo(size, -size);
    shape.lineTo(size, size);
    shape.lineTo(-size, size);
    shape.closePath();

    const extrudeSettings = {
      depth: 0.048,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.035,
      bevelThickness: 0.03,
    };
    return new THREE.ExtrudeGeometry(shape, extrudeSettings);
  }, []);

  // Precise layer target heights
  const layerTargets = {
    topBun: 0.68,
    tomatoes: 0.40,
    cheese: 0.22,
    patty: 0.05,
    sauce: -0.06,
    onions: -0.14,
    lettuce: -0.24,
    bottomBun: -0.44,
  };

  const layerStarts = {
    topBun: 3.4,
    tomatoes: 2.8,
    cheese: 2.2,
    patty: 1.7,
    sauce: 1.1,
    onions: -1.3,
    lettuce: -1.7,
    bottomBun: -2.3,
  };

  // Assembly and Idle Motion
  useFrame((state, delta) => {
    if (!rootRef.current) return;
    const now = state.clock.getElapsedTime();

    if (startTimeRef.current === null) {
      startTimeRef.current = now;
    }

    const elapsed = now - startTimeRef.current;

    // Sequential spring assembly on load
    if (assembleOnMount && elapsed < 2.6 && !exploded) {
      const animatePiece = (
        ref: React.RefObject<THREE.Group>,
        start: number,
        target: number,
        delay: number,
        duration: number = 0.85
      ) => {
        if (!ref.current) return;
        const progress = Math.max(0, Math.min(1, (elapsed - delay) / duration));
        const eased = springProgress(progress);
        ref.current.position.y = THREE.MathUtils.lerp(start, target, eased);
      };

      animatePiece(bottomBunRef, layerStarts.bottomBun, layerTargets.bottomBun, 0.0);
      animatePiece(lettuceRef, layerStarts.lettuce, layerTargets.lettuce, 0.12);
      animatePiece(onionsRef, layerStarts.onions, layerTargets.onions, 0.24);
      animatePiece(sauceRef, layerStarts.sauce, layerTargets.sauce, 0.34);
      animatePiece(pattyRef, layerStarts.patty, layerTargets.patty, 0.44);
      animatePiece(cheeseRef, layerStarts.cheese, layerTargets.cheese, 0.58);
      animatePiece(tomatoesRef, layerStarts.tomatoes, layerTargets.tomatoes, 0.72);
      animatePiece(topBunRef, layerStarts.topBun, layerTargets.topBun, 0.86);
    } else {
      const yOffset = exploded ? 2.5 : 1;
      if (topBunRef.current) topBunRef.current.position.y = layerTargets.topBun * yOffset;
      if (tomatoesRef.current) tomatoesRef.current.position.y = layerTargets.tomatoes * yOffset;
      if (cheeseRef.current) cheeseRef.current.position.y = layerTargets.cheese * yOffset;
      if (pattyRef.current) pattyRef.current.position.y = layerTargets.patty * yOffset;
      if (sauceRef.current) sauceRef.current.position.y = layerTargets.sauce * yOffset;
      if (onionsRef.current) onionsRef.current.position.y = layerTargets.onions * yOffset;
      if (lettuceRef.current) lettuceRef.current.position.y = layerTargets.lettuce * yOffset;
      if (bottomBunRef.current) bottomBunRef.current.position.y = layerTargets.bottomBun * yOffset;
    }

    // Continuous slow rotation & subtle floating bobbing
    if (interactive) {
      rootRef.current.rotation.y += delta * 0.32;
      rootRef.current.position.y = Math.sin(now * 1.5) * 0.065;
    }
  });

  return (
    <group ref={rootRef} scale={[scale, scale, scale]} position={[0, 0, 0]}>
      {/* 1. TOP BRIOCHE CROWN BUN (Egg-wash baked sheen) */}
      <group ref={topBunRef} position={[0, layerTargets.topBun, 0]}>
        <mesh castShadow receiveShadow>
          <sphereGeometry args={[1.06, 40, 32, 0, Math.PI * 2, 0, Math.PI * 0.52]} />
          <meshPhysicalMaterial
            color="#C6761A"
            roughness={0.38}
            clearcoat={0.4}
            clearcoatRoughness={0.25}
            reflectivity={0.65}
            sheen={0.3}
            sheenColor="#E59838"
            wireframe={wireframe}
          />
        </mesh>
        
        {/* Inner toasted golden crumb face */}
        <mesh position={[0, -0.01, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[1.05, 36]} />
          <meshPhysicalMaterial color="#A3540C" roughness={0.7} wireframe={wireframe} />
        </mesh>

        {/* 48 Ivory Toasted Sesame Seeds */}
        {!wireframe &&
          sesameSeeds.map((seed, idx) => (
            <mesh key={idx} position={seed.pos} rotation={seed.rot} scale={seed.scale} castShadow>
              <capsuleGeometry args={[0.022, 0.056, 4, 8]} />
              <meshPhysicalMaterial
                color="#FFFBEB"
                roughness={0.28}
                clearcoat={0.3}
                clearcoatRoughness={0.2}
              />
            </mesh>
          ))}
      </group>

      {/* 2. TWIN RIPE HEIRLOOM TOMATO SLICES (Glossy juicy cut surfaces) */}
      <group ref={tomatoesRef} position={[0, layerTargets.tomatoes, 0]}>
        <mesh position={[-0.32, 0, 0.12]} rotation={[0.08, 0.28, -0.06]} castShadow>
          <cylinderGeometry args={[0.57, 0.57, 0.09, 32]} />
          <meshPhysicalMaterial
            color="#DC2626"
            roughness={0.12}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            transmission={0.12}
            thickness={0.4}
            wireframe={wireframe}
          />
        </mesh>
        <mesh position={[0.32, 0.025, -0.1]} rotation={[-0.06, -0.36, 0.08]} castShadow>
          <cylinderGeometry args={[0.57, 0.57, 0.09, 32]} />
          <meshPhysicalMaterial
            color="#B91C1C"
            roughness={0.12}
            clearcoat={1.0}
            clearcoatRoughness={0.06}
            transmission={0.12}
            thickness={0.4}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* 3. MOLTEN AGED CHEDDAR CHEESE (Glossy droop corners & subsurface glow) */}
      <group
        ref={cheeseRef}
        position={[0, layerTargets.cheese, 0]}
        rotation={[Math.PI / 2, 0, Math.PI / 4]}
      >
        <mesh geometry={cheeseGeometry} position={[0, 0, -0.024]} castShadow>
          <meshPhysicalMaterial
            color="#F59E0B"
            roughness={0.15}
            clearcoat={1.0}
            clearcoatRoughness={0.05}
            metalness={0.02}
            transmission={0.08}
            thickness={0.3}
            emissive="#D97706"
            emissiveIntensity={0.15}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* 4. SMASHED DOUBLE WAGYU BEEF PATTY (Caramelized Maillard crust & seared edges) */}
      <group ref={pattyRef} position={[0, layerTargets.patty, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.10, 1.07, 0.26, 40]} />
          <meshPhysicalMaterial
            color="#221107"
            roughness={0.85}
            clearcoat={0.45}
            clearcoatRoughness={0.35}
            wireframe={wireframe}
          />
        </mesh>
        {/* Irregular crunchy caramelized outer rim */}
        <mesh rotation={[0, 0, 0]}>
          <torusGeometry args={[1.05, 0.07, 16, 40]} />
          <meshPhysicalMaterial
            color="#140803"
            roughness={0.95}
            metalness={0.05}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* 5. SMOKED EMBER SECRET SAUCE DRIPS */}
      <group ref={sauceRef} position={[0, layerTargets.sauce, 0]}>
        <mesh position={[0.7, 0, 0.4]} rotation={[0.2, 0.1, 0]}>
          <sphereGeometry args={[0.07, 12, 12]} />
          <meshPhysicalMaterial color="#EA580C" clearcoat={1.0} roughness={0.05} />
        </mesh>
        <mesh position={[-0.65, -0.02, 0.5]} rotation={[0, 0, 0.3]}>
          <sphereGeometry args={[0.06, 12, 12]} />
          <meshPhysicalMaterial color="#EA580C" clearcoat={1.0} roughness={0.05} />
        </mesh>
      </group>

      {/* 6. CARAMELIZED BALSAMIC ONIONS & SMOKE RUB */}
      <group ref={onionsRef} position={[0, layerTargets.onions, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.74, 0.07, 10, 32]} />
          <meshPhysicalMaterial
            color="#6B2A08"
            roughness={0.25}
            clearcoat={0.8}
            clearcoatRoughness={0.15}
            wireframe={wireframe}
          />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0.88]}>
          <torusGeometry args={[0.50, 0.06, 10, 28]} />
          <meshPhysicalMaterial
            color="#85360A"
            roughness={0.22}
            clearcoat={0.8}
            clearcoatRoughness={0.15}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* 7. CRISP RUFFLED LETTUCE (Subsurface green leaf radiance) */}
      <group ref={lettuceRef} position={[0, layerTargets.lettuce, 0]}>
        <mesh geometry={lettuceGeometry} castShadow>
          <meshPhysicalMaterial
            color="#15803D"
            roughness={0.35}
            clearcoat={0.25}
            clearcoatRoughness={0.2}
            emissive="#064E3B"
            emissiveIntensity={0.22}
            wireframe={wireframe}
          />
        </mesh>
      </group>

      {/* 8. BOTTOM TOASTED BRIOCHE HEEL BUN */}
      <group ref={bottomBunRef} position={[0, layerTargets.bottomBun, 0]}>
        <mesh castShadow receiveShadow>
          <cylinderGeometry args={[1.04, 0.94, 0.25, 40]} />
          <meshPhysicalMaterial
            color="#C6761A"
            roughness={0.42}
            clearcoat={0.3}
            clearcoatRoughness={0.3}
            reflectivity={0.5}
            wireframe={wireframe}
          />
        </mesh>
      </group>
    </group>
  );
};
