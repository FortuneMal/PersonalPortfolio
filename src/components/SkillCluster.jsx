import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

const SkillIcon = ({ icon, name, position }) => {
  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={1} position={position}>
      <mesh>
        {/* Translucent sphere behind the HTML logo to give it a physical presence */}
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial color="#1e40af" transparent opacity={0.2} roughness={0.1} metalness={0.8} />
        
        <Html center transform distanceFactor={8} zIndexRange={[100, 0]}>
          <div className="flex flex-col items-center gap-2 group cursor-pointer pointer-events-auto">
            <div className="w-16 h-16 rounded-full bg-background/80 backdrop-blur-md border border-primary/30 flex items-center justify-center p-3 shadow-[0_0_15px_rgba(59,130,246,0.3)] group-hover:scale-110 transition-transform group-hover:border-primary/80 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.6)]">
              <img src={icon} alt={name} className="w-full h-full object-contain drop-shadow-[0_0_5px_rgba(255,255,255,0.5)]" />
            </div>
            <span className="text-sm font-bold text-foreground opacity-0 group-hover:opacity-100 transition-opacity bg-background/90 px-3 py-1 rounded-md border border-primary/50 shadow-lg pointer-events-none whitespace-nowrap">
              {name}
            </span>
          </div>
        </Html>
      </mesh>
    </Float>
  );
};

const Cluster = ({ skills }) => {
  const groupRef = useRef();

  return (
    <group ref={groupRef}>
      {skills.map((skill, i) => (
        <SkillIcon key={i} {...skill} />
      ))}
    </group>
  );
};

const SkillCluster = ({ skillsList }) => {
  // Generate spherical positions for each skill to form a balanced cluster
  const distributedSkills = useMemo(() => {
    return skillsList.map((skill, index) => {
      // Golden spiral distribution for even spacing on a sphere
      const phi = Math.acos(-1 + (2 * index) / skillsList.length);
      const theta = Math.sqrt(skillsList.length * Math.PI) * phi;
      
      const radius = 5; // radius of the cluster
      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      return {
        ...skill,
        position: [x, y, z],
      };
    });
  }, [skillsList]);

  return (
    <div className="w-full h-[500px] md:h-[600px] rounded-2xl border border-border/50 bg-secondary/10 backdrop-blur-sm overflow-hidden relative shadow-[0_0_40px_rgba(0,0,0,0.3)] mb-12">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/5 to-background/40 z-10 pointer-events-none" />
      <div className="absolute top-4 left-4 sm:top-6 sm:left-6 z-20 pointer-events-none">
        <p className="text-xs sm:text-sm font-mono text-primary flex items-center gap-2 bg-background/60 px-3 py-1.5 rounded-full border border-primary/20 backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Drag to Interact
        </p>
      </div>
      <Canvas camera={{ position: [0, 0, 14], fov: 45 }}>
        <ambientLight intensity={0.8} />
        <directionalLight position={[10, 10, 5]} intensity={1.5} />
        <pointLight position={[-10, -10, -10]} intensity={1} color="#3b82f6" />
        
        <Cluster skills={distributedSkills} />
        
        <OrbitControls 
          enableZoom={true} 
          enablePan={false} 
          autoRotate 
          autoRotateSpeed={1.5} 
          minDistance={8}
          maxDistance={25}
        />
      </Canvas>
    </div>
  );
};

export default SkillCluster;
