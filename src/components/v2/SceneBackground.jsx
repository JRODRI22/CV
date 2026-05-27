import { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Module-level mouse state — updated by SceneBackground, read by three.js components
const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };

function ParticleSphere() {
  const groupRef = useRef();

  // Fibonacci lattice for even sphere distribution
  const geometry = useMemo(() => {
    const count = 3800;
    const positions = new Float32Array(count * 3);
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));
    const R = 2.3;

    for (let i = 0; i < count; i++) {
      const t = i / count;
      const y = 1 - t * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = goldenAngle * i;
      positions[i * 3]     = Math.cos(theta) * r * R;
      positions[i * 3 + 1] = y * R;
      positions[i * 3 + 2] = Math.sin(theta) * r * R;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    return geo;
  }, []);

  // Inner sphere hides particles on the back side — gives depth
  const innerGeo = useMemo(() => new THREE.SphereGeometry(2.18, 40, 40), []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    // Smooth lerp toward mouse
    mouse.targetX += (mouse.x * 0.35 - mouse.targetX) * 0.04;
    mouse.targetY += (mouse.y * 0.25 - mouse.targetY) * 0.04;

    groupRef.current.rotation.y = clock.elapsedTime * 0.1 + mouse.targetX;
    groupRef.current.rotation.x = Math.sin(clock.elapsedTime * 0.045) * 0.12 + mouse.targetY;
  });

  return (
    <group ref={groupRef} position={[2.6, -0.1, 0]}>
      {/* Occlude back-facing particles */}
      <mesh geometry={innerGeo}>
        <meshBasicMaterial color="#080808" transparent opacity={0.92} depthWrite={false} />
      </mesh>

      {/* Particle cloud */}
      <points geometry={geometry}>
        <pointsMaterial
          size={0.019}
          color="#818cf8"
          transparent
          opacity={0.88}
          sizeAttenuation
        />
      </points>
    </group>
  );
}

function OrbitRings() {
  const r1 = useRef();
  const r2 = useRef();
  const r3 = useRef();

  const makeRing = (radius) => {
    const pts = [];
    for (let i = 0; i <= 256; i++) {
      const a = (i / 256) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(a) * radius, Math.sin(a) * radius, 0));
    }
    return new THREE.BufferGeometry().setFromPoints(pts);
  };

  const g1 = useMemo(() => makeRing(2.6), []);
  const g2 = useMemo(() => makeRing(2.78), []);
  const g3 = useMemo(() => makeRing(3.0), []);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    if (r1.current) r1.current.rotation.z = t * 0.14;
    if (r2.current) r2.current.rotation.z = -t * 0.1;
    if (r3.current) r3.current.rotation.z = t * 0.07;
  });

  return (
    <group position={[2.6, -0.1, 0]}>
      <line ref={r1} geometry={g1} rotation={[Math.PI * 0.28, 0, 0]}>
        <lineBasicMaterial color="#6366f1" transparent opacity={0.22} />
      </line>
      <line ref={r2} geometry={g2} rotation={[Math.PI * 0.5, 0.45, 0]}>
        <lineBasicMaterial color="#06b6d4" transparent opacity={0.16} />
      </line>
      <line ref={r3} geometry={g3} rotation={[Math.PI * 0.12, 0.9, 0]}>
        <lineBasicMaterial color="#a78bfa" transparent opacity={0.13} />
      </line>
    </group>
  );
}

export default function SceneBackground() {
  useEffect(() => {
    const onMove = (e) => {
      mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  return (
    <Canvas
      camera={{ position: [0, 0, 6.5], fov: 48 }}
      gl={{ alpha: true, antialias: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
      dpr={[1, 1.5]}
    >
      <ambientLight intensity={0.4} color="#6366f1" />
      <ParticleSphere />
      <OrbitRings />
    </Canvas>
  );
}
