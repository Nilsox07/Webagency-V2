"use client";

import { useRef, type ReactNode } from "react";
import { useFrame } from "@react-three/fiber";
import { Float, RoundedBox, Sparkles } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import * as THREE from "three";

/** Ein stilisiertes „Browserfenster" mit angedeutetem Website-Layout. */
function BrowserCard({
  position,
  rotation = [0, 0, 0],
  scale = 1,
  accent,
}: {
  position: [number, number, number];
  rotation?: [number, number, number];
  scale?: number;
  accent: string;
}) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      {/* Rahmen */}
      <RoundedBox args={[2, 1.35, 0.08]} radius={0.06} smoothness={3}>
        <meshStandardMaterial color="#0d1330" metalness={0.55} roughness={0.35} />
      </RoundedBox>
      {/* Bildschirm */}
      <mesh position={[0, -0.08, 0.045]}>
        <planeGeometry args={[1.86, 1.04]} />
        <meshStandardMaterial color="#0a0f24" metalness={0.2} roughness={0.6} />
      </mesh>
      {/* Topbar-Punkte */}
      {[-0.82, -0.72, -0.62].map((x, i) => (
        <mesh key={i} position={[x, 0.52, 0.06]}>
          <circleGeometry args={[0.025, 16]} />
          <meshStandardMaterial
            color={i === 0 ? "#ff6b6b" : i === 1 ? "#ffd166" : "#06d6a0"}
            emissive={i === 0 ? "#ff6b6b" : i === 1 ? "#ffd166" : "#06d6a0"}
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>
      ))}
      {/* Hero-Block (leuchtend) */}
      <mesh position={[-0.35, 0.12, 0.06]}>
        <planeGeometry args={[1, 0.42]} />
        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.9} toneMapped={false} />
      </mesh>
      {/* Textzeilen */}
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[0.62, 0.26 - i * 0.16, 0.06]}>
          <planeGeometry args={[0.55, 0.06]} />
          <meshStandardMaterial color="#5b6aa8" emissive="#5b6aa8" emissiveIntensity={0.4} toneMapped={false} />
        </mesh>
      ))}
      {/* Button */}
      <mesh position={[-0.55, -0.36, 0.06]}>
        <planeGeometry args={[0.4, 0.13]} />
        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.6} toneMapped={false} />
      </mesh>
      {/* Inhaltskacheln */}
      {[0, 1, 2].map((i) => (
        <mesh key={`t${i}`} position={[-0.55 + i * 0.4, -0.58, 0.06]}>
          <planeGeometry args={[0.32, 0.18]} />
          <meshStandardMaterial color="#243056" emissive="#243056" emissiveIntensity={0.3} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export function FloatingScreens() {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    const { pointer } = state;
    if (!group.current) return;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, pointer.x * 0.35, 0.04);
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, -pointer.y * 0.25, 0.04);
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <directionalLight position={[5, 6, 5]} intensity={1.1} color="#bcd3ff" />
      <pointLight position={[-6, -2, 3]} intensity={45} color="#7c4dff" distance={25} />
      <pointLight position={[6, 4, -2]} intensity={35} color="#3563f6" distance={25} />

      <group ref={group}>
        <Float speed={1.3} rotationIntensity={0.25} floatIntensity={0.8}>
          <BrowserCard position={[0, 0, 0]} accent="#3563f6" scale={1.05} />
        </Float>
        <Float speed={1.6} rotationIntensity={0.4} floatIntensity={1.1}>
          <BrowserCard position={[-2.7, 1.1, -1.6]} rotation={[0.1, 0.5, 0.05]} scale={0.78} accent="#7c4dff" />
        </Float>
        <Float speed={1.1} rotationIntensity={0.4} floatIntensity={1.2}>
          <BrowserCard position={[2.8, -1.0, -1.4]} rotation={[-0.1, -0.5, -0.06]} scale={0.72} accent="#598cff" />
        </Float>

        {/* Digitaler Raster-Boden */}
        <gridHelper args={[40, 40, "#3563f6", "#1a2150"]} position={[0, -2.6, 0]} />
      </group>

      <Sparkles count={80} scale={[14, 9, 7]} size={2.4} speed={0.3} color="#bcd3ff" opacity={0.7} />

      <EffectComposer>
        <Bloom mipmapBlur luminanceThreshold={0.55} luminanceSmoothing={0.3} intensity={0.85} />
      </EffectComposer>
    </>
  );
}
