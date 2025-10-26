"use client";

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// Convert lat/lng to 3D coordinates on a sphere
function latLngToVector3(lat: number, lng: number, radius: number) {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);

  return new THREE.Vector3(
    -(radius * Math.sin(phi) * Math.cos(theta)),
    radius * Math.cos(phi),
    radius * Math.sin(phi) * Math.sin(theta)
  );
}

function RouteMarker({ lat, lng, color, size = 0.05, label }: { lat: number; lng: number; color: string; size?: number; label?: string }) {
  const position = latLngToVector3(lat, lng, 2.15);
  const ref = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(state.clock.elapsedTime * 2) * 0.3);
    }
  });

  return (
    <group>
      <mesh ref={ref} position={position}>
        <sphereGeometry args={[size, 16, 16]} />
        <meshStandardMaterial color={color} emissive={color} emissiveIntensity={1.5} />
      </mesh>
      {/* Halo effect */}
      <mesh position={position}>
        <sphereGeometry args={[size * 1.8, 16, 16]} />
        <meshBasicMaterial color={color} transparent opacity={0.4} />
      </mesh>
    </group>
  );
}

function RoutePath({ start, end, color }: { start: [number, number]; end: [number, number]; color: string }) {
  const points = useMemo(() => {
    const startVec = latLngToVector3(start[0], start[1], 2.1);
    const endVec = latLngToVector3(end[0], end[1], 2.1);

    const midPoint = new THREE.Vector3()
      .addVectors(startVec, endVec)
      .multiplyScalar(0.5)
      .normalize()
      .multiplyScalar(2.5);

    const curve = new THREE.QuadraticBezierCurve3(
      startVec,
      midPoint,
      endVec
    );

    return curve.getPoints(50);
  }, [start, end]);

  const lineRef = useRef<any>();

  useFrame((state) => {
    if (lineRef.current) {
      lineRef.current.material.opacity = 0.7 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
    }
  });

  return (
    <Line
      ref={lineRef}
      points={points}
      color={color}
      lineWidth={6}
      transparent
      opacity={0.9}
    />
  );
}

function EarthGlobe() {
  const globeRef = useRef<THREE.Group>(null);

  // Load textures
  const earthTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg');
  const bumpTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_normal_2048.jpg');
  const specularTexture = useTexture('https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_specular_2048.jpg');

  useFrame((state, delta) => {
    if (globeRef.current) {
      globeRef.current.rotation.y += delta * 0.1;
    }
  });

  // Cities
  const cities = [
    { lat: 43.5, lng: -1.5, color: '#10b981', size: 0.08, label: 'Biarritz' },
    { lat: 36.1, lng: -5.3, color: '#fbbf24', size: 0.07, label: 'Algeciras' },
    { lat: 31.0, lng: -4.0, color: '#fb923c', size: 0.07, label: 'Merzouga' },
    { lat: 31.6, lng: -8.0, color: '#ef4444', size: 0.08, label: 'Marrakech' },
  ];

  // Routes
  const routes = [
    { start: [43.5, -1.5] as [number, number], end: [36.1, -5.3] as [number, number], color: '#fbbf24' },
    { start: [36.1, -5.3] as [number, number], end: [31.0, -4.0] as [number, number], color: '#fb923c' },
    { start: [31.0, -4.0] as [number, number], end: [31.6, -8.0] as [number, number], color: '#ef4444' },
  ];

  return (
    <group ref={globeRef} rotation={[0, -0.5, 0]}>
      {/* Earth with real texture */}
      <Sphere args={[2, 64, 64]}>
        <meshPhongMaterial
          map={earthTexture}
          bumpMap={bumpTexture}
          bumpScale={0.05}
          specularMap={specularTexture}
          specular={new THREE.Color('#333333')}
          shininess={10}
        />
      </Sphere>

      {/* Atmosphere glow */}
      <Sphere args={[2.15, 64, 64]}>
        <meshBasicMaterial
          color="#88ccff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Outer glow */}
      <Sphere args={[2.3, 64, 64]}>
        <meshBasicMaterial
          color="#4da6ff"
          transparent
          opacity={0.08}
          side={THREE.BackSide}
        />
      </Sphere>

      {/* Routes */}
      {routes.map((route, i) => (
        <RoutePath key={i} {...route} />
      ))}

      {/* City markers */}
      {cities.map((city, i) => (
        <RouteMarker key={i} {...city} />
      ))}
    </group>
  );
}

interface RouteGlobeProps {
  className?: string;
}

export default function RouteGlobe({ className = '' }: RouteGlobeProps) {
  return (
    <div className={`${className} relative`} style={{ width: '100%', height: '100%' }}>
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 55 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent', display: 'block', width: '100%', height: '100%' }}
      >
        {/* Lighting - beaucoup plus lumineux */}
        <ambientLight intensity={1.2} />
        <directionalLight
          position={[5, 3, 5]}
          intensity={3.5}
          color="#ffffff"
        />
        <directionalLight
          position={[-3, 2, -2]}
          intensity={2}
          color="#ffffff"
        />
        <pointLight
          position={[0, 5, 3]}
          intensity={1.5}
          color="#ffffff"
        />
        <pointLight
          position={[0, -3, -3]}
          intensity={0.8}
          color="#60a5fa"
        />

        <EarthGlobe />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.3}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI - Math.PI / 6}
        />

        {/* Stars */}
        <Stars />
      </Canvas>
    </div>
  );
}

function Stars() {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 20 + Math.random() * 15;

      pos[i * 3] = radius * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = radius * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        color="#ffffff"
        transparent
        opacity={0.8}
        sizeAttenuation
      />
    </points>
  );
}
