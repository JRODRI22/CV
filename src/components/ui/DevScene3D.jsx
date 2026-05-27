import { useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Stars, MeshDistortMaterial } from '@react-three/drei';

function TechOrb() {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.elapsedTime * 0.18;
    }
  });
  return (
    <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.5}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[1.8, 10]} />
        <MeshDistortMaterial
          color="#4F46E5"
          distort={0.38}
          speed={2.2}
          roughness={0.05}
          metalness={0.85}
        />
      </mesh>
    </Float>
  );
}

function Ring({ radius, rotX, rotY, rotZ, color, speed }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) ref.current.rotation.z = state.clock.elapsedTime * speed;
  });
  return (
    <mesh ref={ref} rotation={[rotX, rotY, rotZ]}>
      <torusGeometry args={[radius, 0.012, 16, 100]} />
      <meshStandardMaterial color={color} transparent opacity={0.4} />
    </mesh>
  );
}

function OrbitingSphere({ offset, color, orbitRadius = 2.9, orbitSpeed = 0.7, size = 0.13 }) {
  const ref = useRef();
  useFrame((state) => {
    if (ref.current) {
      const t = state.clock.elapsedTime * orbitSpeed + offset;
      ref.current.position.x = Math.cos(t) * orbitRadius;
      ref.current.position.z = Math.sin(t) * orbitRadius;
      ref.current.position.y = Math.sin(t * 0.6) * 0.5;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 8, 8]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
    </mesh>
  );
}

function Scene() {
  return (
    <>
      <ambientLight intensity={0.1} />
      <pointLight position={[4, 4, 4]} intensity={12} color="#4F46E5" />
      <pointLight position={[-4, -3, 3]} intensity={7} color="#06B6D4" />
      <pointLight position={[2, -4, 2]} intensity={4} color="#8B5CF6" />

      <Stars radius={70} depth={50} count={2500} factor={2.2} saturation={0.2} fade speed={0.8} />

      <TechOrb />

      <Ring radius={3.0} rotX={Math.PI / 2} rotY={0} rotZ={0} color="#4F46E5" speed={0.22} />
      <Ring radius={3.6} rotX={Math.PI / 3} rotY={Math.PI / 6} rotZ={0} color="#06B6D4" speed={-0.16} />
      <Ring radius={4.2} rotX={Math.PI / 6} rotY={Math.PI / 3} rotZ={0.4} color="#8B5CF6" speed={0.12} />

      <OrbitingSphere offset={0} color="#4F46E5" orbitRadius={2.9} orbitSpeed={0.6} size={0.16} />
      <OrbitingSphere offset={Math.PI} color="#06B6D4" orbitRadius={2.9} orbitSpeed={0.6} size={0.12} />
      <OrbitingSphere offset={Math.PI / 2} color="#A78BFA" orbitRadius={3.5} orbitSpeed={0.4} size={0.1} />
    </>
  );
}

export default function DevScene3D() {
  return (
    <div className="w-full h-[520px]">
      <Canvas
        camera={{ position: [0, 0, 7], fov: 45 }}
        style={{ background: 'transparent' }}
        gl={{ alpha: true, antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </div>
  );
}
