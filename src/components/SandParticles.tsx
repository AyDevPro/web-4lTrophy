"use client";
import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useAppStore } from "@/lib/store";

export default function SandParticles() {
  const count = 40000;
  const mouse = useAppStore((s) => s.mouse);
  const mat = useRef<THREE.ShaderMaterial>(null!);
  const geom = useMemo(() => {
    const g = new THREE.BufferGeometry();
    const positions = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      positions[i * 3 + 0] = (Math.random() - 0.5) * 10.0;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 6.0;
      positions[i * 3 + 2] = 0;
      seeds[i] = Math.random() * 1000;
    }
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("aSeed", new THREE.BufferAttribute(seeds, 1));
    return g;
  }, []);

  useFrame((_, dt) => {
    if (!mat.current) return;
    mat.current.uniforms.uTime.value += dt;
    mat.current.uniforms.uMouse.value.set(mouse.x * 2.0 - 1.0, mouse.y * 2.0 - 1.0);
  });

  return (
    <points geometry={geom}>
      <shaderMaterial
        ref={mat}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={{
          uTime: { value: 0 },
          uMouse: { value: new THREE.Vector2(0, 0) },
        }}
        vertexShader={`
          attribute float aSeed;
          uniform float uTime;
          uniform vec2 uMouse;
          varying float vAlpha;

          float rand(float n){return fract(sin(n)*43758.5453123);}
          void main(){
            vec3 pos = position;
            vec2 wind = vec2(0.5, 0.0);
            vec2 mouse = uMouse * vec2(5.0, 3.0);
            vec2 dir = (mouse - pos.xy);
            float dist = max(length(dir), 0.001);
            vec2 force = normalize(dir) * clamp(2.0 / (dist*dist), 0.0, 2.5);

            float jitter = rand(aSeed + uTime) - 0.5;

            pos.xy += (wind + force) * 0.02;
            pos.y += sin(aSeed + uTime*2.0) * 0.003 + jitter*0.003;

            if (pos.x > 5.0) pos.x = -5.0;
            if (pos.x < -5.0) pos.x = 5.0;
            if (pos.y > 3.0) pos.y = -3.0;
            if (pos.y < -3.0) pos.y = 3.0;

            vAlpha = clamp(0.3 + 1.0/dist, 0.2, 1.0);
            gl_Position = projectionMatrix * modelViewMatrix * vec4(pos,1.0);
            gl_PointSize = 1.5;
          }
        `}
        fragmentShader={`
          precision mediump float;
          varying float vAlpha;
          void main(){
            float d = length(gl_PointCoord - 0.5);
            float a = smoothstep(0.5, 0.0, d) * vAlpha;
            vec3 col = vec3(0.78,0.71,0.54);
            gl_FragColor = vec4(col, a);
          }
        `}
      />
    </points>
  );
}
