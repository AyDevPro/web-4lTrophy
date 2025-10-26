"use client";
import { Canvas } from "@react-three/fiber";
import { OrthographicCamera } from "@react-three/drei";
import SandParticles from "./SandParticles";

export default function HeroScene() {
  return (
    <Canvas className="w-full h-full" dpr={[1, 2]}>
      <OrthographicCamera makeDefault position={[0, 0, 10]} zoom={100} />
      <ambientLight intensity={1} />
      <SandParticles />
    </Canvas>
  );
}
