"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import {
  Float,
  MeshDistortMaterial,
  Sparkles,
  Icosahedron,
  Torus,
} from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/**
 * Inhalt der Hero-3D-Szene: ein langsam morphender „Kristall" (Icosaeder mit
 * Distort-Material), ein zweiter Drahtgitter-Körper, ein umlaufender Ring,
 * Partikel und farbiges Licht. Reagiert sanft auf die Maus.
 */
export function HeroScene() {
  const group = useRef<THREE.Group>(null);
  const inner = useRef<THREE.Mesh>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const { pointer } = state;
    if (group.current) {
      // Sanfte Maus-Parallaxe
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        pointer.x * 0.5,
        0.04
      );
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        -pointer.y * 0.35,
        0.04
      );
    }
    if (inner.current) inner.current.rotation.y += delta * 0.25;
    if (ring.current) {
      ring.current.rotation.x += delta * 0.15;
      ring.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <>
      <ambientLight intensity={0.4} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} color="#8eb6ff" />
      <pointLight position={[-5, -2, 2]} intensity={40} color="#7c4dff" distance={20} />
      <pointLight position={[5, 3, -2]} intensity={30} color="#3563f6" distance={20} />

      <group ref={group}>
        <Float speed={1.4} rotationIntensity={0.6} floatIntensity={1.1}>
          {/* Hauptkörper: morphender Kristall */}
          <Icosahedron args={[1.45, 24]}>
            <MeshDistortMaterial
              color="#3b5bf0"
              emissive="#4f1bbc"
              emissiveIntensity={0.35}
              roughness={0.12}
              metalness={0.85}
              distort={0.38}
              speed={1.6}
            />
          </Icosahedron>

          {/* Drahtgitter-Hülle für Tiefe */}
          <Icosahedron ref={inner} args={[1.85, 2]}>
            <meshBasicMaterial color="#9478ff" wireframe transparent opacity={0.18} />
          </Icosahedron>
        </Float>

        {/* Umlaufender Ring */}
        <Torus ref={ring} args={[2.6, 0.02, 16, 100]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial
            color="#7c4dff"
            emissive="#7c4dff"
            emissiveIntensity={1.4}
            roughness={0.3}
          />
        </Torus>
      </group>

      <Sparkles count={70} scale={[12, 8, 6]} size={2.2} speed={0.3} color="#bcd3ff" opacity={0.7} />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.5} luminanceSmoothing={0.3} intensity={0.9} />
      </EffectComposer>
    </>
  );
}
