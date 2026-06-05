"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, Icosahedron, Torus, Sparkles } from "@react-three/drei";
import * as THREE from "three";

/**
 * Leichtgewichtige Szene für die Unterseiten-Header (kein Postprocessing).
 * Drahtgitter-Körper + Ring + Partikel, sanfte Maus-Parallaxe. Tönbar per `accent`.
 */
export function PageHeroScene({ accent = "#1A8C94" }: { accent?: string }) {
  const group = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame((state, delta) => {
    const { pointer } = state;
    if (group.current) {
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.4 + delta * 0, 0.05);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.3, 0.05);
    }
    if (ring.current) {
      ring.current.rotation.x += delta * 0.2;
      ring.current.rotation.z += delta * 0.12;
    }
  });

  return (
    <>
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 3, 4]} intensity={25} color={accent} distance={20} />
      <pointLight position={[-4, -2, 2]} intensity={20} color="#E55340" distance={20} />

      <group ref={group}>
        <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1}>
          <Icosahedron args={[1.5, 1]}>
            <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.25} wireframe />
          </Icosahedron>
        </Float>
        <Torus ref={ring} args={[2.3, 0.015, 16, 90]} rotation={[Math.PI / 3, 0, 0]}>
          <meshStandardMaterial color="#3DA1A8" emissive="#3DA1A8" emissiveIntensity={0.6} />
        </Torus>
      </group>

      <Sparkles count={50} scale={[12, 6, 5]} size={2} speed={0.25} color="#CFE7E8" opacity={0.6} />
    </>
  );
}
