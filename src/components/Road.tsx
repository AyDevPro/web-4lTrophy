"use client";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/lib/store";

export default function Road() {
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const scroll = useAppStore((s) => s.scroll);

  useFrame((_, dt) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value += dt;
    mat.current.uniforms.uScroll.value = THREE.MathUtils.damp(
      mat.current.uniforms.uScroll.value,
      scroll * 0.002,
      4,
      dt
    );
  });

  return (
    <mesh position={[0, 0, 0]}>
      <planeGeometry args={[10, 14, 1, 1]} />
      <shaderMaterial
        ref={mat}
        uniforms={{
          uTime: { value: 0 },
          uScroll: { value: 0 },
          uNoiseAmp: { value: 0.02 },
        }}
        vertexShader={`
          varying vec2 vUv;
          void main(){
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
          }
        `}
        fragmentShader={`
          precision highp float;
          varying vec2 vUv;
          uniform float uTime;
          uniform float uScroll;
          uniform float uNoiseAmp;

          float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1,311.7)))*43758.5453123); }
          float noise(in vec2 p){
            vec2 i=floor(p), f=fract(p);
            float a=hash(i), b=hash(i+vec2(1.0,0.0));
            float c=hash(i+vec2(0.0,1.0)), d=hash(i+vec2(1.0,1.0));
            vec2 u=f*f*(3.0-2.0*f);
            return mix(a,b,u.x)+ (c-a)*u.y*(1.0-u.x) + (d-b)*u.x*u.y;
          }

          void main(){
            float t = vUv.y * 20.0 + uTime*2.0 + uScroll*30.0;
            float center = abs(vUv.x - 0.5);
            float asphalt = mix(0.12, 0.16, noise(vec2(t * 0.05, 0.0)));
            float lines = (1.0-step(0.02, center)) * step(fract(t*0.2), 0.1);

            float shimmer = noise(vec2(vUv.x*10.0, vUv.y*40.0 + uTime*0.5)) * uNoiseAmp;
            vec3 col = vec3(asphalt) + vec3(lines);
            col += vec3(0.02 + shimmer);
            gl_FragColor = vec4(col, 1.0);
          }
        `}
      />
    </mesh>
  );
}
