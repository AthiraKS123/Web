import React, { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, ContactShadows } from '@react-three/drei';
import { RotateCw, Layers, Eye, Sparkles } from 'lucide-react';
import { BurgerModel } from './BurgerModel';
import { PizzaModel } from './PizzaModel';
import { FriesModel } from './FriesModel';
import { EmberParticles } from './EmberParticles';

interface FoodViewer3DProps {
  modelType: 'burger' | 'pizza' | 'fries';
  name: string;
}

export const FoodViewer3D: React.FC<FoodViewer3DProps> = ({ modelType, name }) => {
  const [autoRotate, setAutoRotate] = useState(true);
  const [exploded, setExploded] = useState(false);
  const [wireframe, setWireframe] = useState(false);

  return (
    <div className="relative w-full h-[360px] sm:h-[420px] rounded-2xl overflow-hidden bg-charcoal-900 border border-white/10 shadow-inner">
      {/* 3D Canvas */}
      <Canvas
        shadows
        camera={{ position: [0, 1.2, 3.8], fov: 45 }}
        gl={{ antialias: true }}
      >
        <ambientLight intensity={0.9} />
        <directionalLight position={[4, 5, 4]} intensity={1.6} color="#FFF8E7" castShadow />
        <pointLight position={[-3, 2, -2]} intensity={2.5} color="#FF5500" />
        <pointLight position={[2, -2, 2]} intensity={1.2} color="#FF1E56" />

        <EmberParticles count={30} />

        <Suspense fallback={null}>
          <group position={[0, -0.1, 0]}>
            {modelType === 'burger' && (
              <BurgerModel
                scale={1.3}
                exploded={exploded}
                wireframe={wireframe}
                interactive={!autoRotate}
              />
            )}
            {modelType === 'pizza' && (
              <PizzaModel
                scale={1.25}
                wireframe={wireframe}
                interactive={!autoRotate}
              />
            )}
            {modelType === 'fries' && (
              <FriesModel
                scale={1.3}
                wireframe={wireframe}
                interactive={!autoRotate}
              />
            )}
          </group>

          <ContactShadows
            position={[0, -1.4, 0]}
            opacity={0.6}
            scale={5}
            blur={2}
            far={3}
            color="#000000"
          />
        </Suspense>

        <OrbitControls
          enablePan={false}
          minDistance={2}
          maxDistance={5.5}
          autoRotate={autoRotate}
          autoRotateSpeed={2}
          maxPolarAngle={Math.PI / 2 + 0.1}
        />
      </Canvas>

      {/* Interactive Controls Overlay */}
      <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
        <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider text-ember-400 bg-black/60 backdrop-blur-md rounded-full border border-ember-500/30 flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3 h-3 animate-spin-slow" />
          Interactive 3D View
        </span>

        <span className="text-[11px] text-stone-400 bg-black/50 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/5">
          Drag to rotate • Scroll to zoom
        </span>
      </div>

      {/* Control Buttons Bar */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-charcoal-950/80 backdrop-blur-md p-1.5 rounded-xl border border-white/10 shadow-2xl">
        <button
          onClick={() => setAutoRotate(!autoRotate)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            autoRotate
              ? 'bg-ember-500 text-white shadow-glow-ember'
              : 'text-stone-300 hover:text-white hover:bg-white/5'
          }`}
          title="Toggle Auto Rotation"
        >
          <RotateCw className={`w-3.5 h-3.5 ${autoRotate ? 'animate-spin' : ''}`} />
          <span>Spin</span>
        </button>

        {modelType === 'burger' && (
          <button
            onClick={() => setExploded(!exploded)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              exploded
                ? 'bg-amber-500 text-black font-bold shadow-glow-gold'
                : 'text-stone-300 hover:text-white hover:bg-white/5'
            }`}
            title="Inspect Burger Layers"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>{exploded ? 'Assembled' : 'Layers'}</span>
          </button>
        )}

        <button
          onClick={() => setWireframe(!wireframe)}
          className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
            wireframe
              ? 'bg-crimson-500 text-white shadow-glow-crimson'
              : 'text-stone-300 hover:text-white hover:bg-white/5'
          }`}
          title="Toggle Wireframe Mesh"
        >
          <Eye className="w-3.5 h-3.5" />
          <span>{wireframe ? 'Shaded' : 'Wireframe'}</span>
        </button>
      </div>
    </div>
  );
};
