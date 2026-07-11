"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import { useRef } from "react";

function Compass({ awakened }) {
  const group = useRef(null);
  const needle = useRef(null);

  useFrame((state, delta) => {
    if (!group.current || !needle.current) return;
    const targetY = state.pointer.x * .38;
    const targetX = -.86 + state.pointer.y * -.22;
    group.current.rotation.y += (targetY - group.current.rotation.y) * .05 + delta * .018;
    group.current.rotation.x += (targetX - group.current.rotation.x) * .05;
    needle.current.rotation.z += (awakened ? -0.72 : 0.18 - needle.current.rotation.z) * 0.035;
  });

  return (
    <Float speed={1.25} rotationIntensity={0.12} floatIntensity={0.32}>
      <group ref={group} rotation={[-0.72, 0, 0]} scale={.78}>
        <mesh position={[0,0,-.22]}>
          <boxGeometry args={[3.7,3.05,.32,4,4,2]} />
          <meshStandardMaterial color="#3c2417" metalness={.25} roughness={.68} />
        </mesh>
        <mesh position={[0,2.55,-.5]} rotation={[.32,0,0]}>
          <boxGeometry args={[3.7,2.15,.22,4,4,2]} />
          <meshStandardMaterial color="#4b2c19" metalness={.22} roughness={.64} />
        </mesh>
        <mesh position={[0,2.53,-.34]} rotation={[.32,0,0]}>
          <planeGeometry args={[3.25,1.72]} />
          <meshStandardMaterial color="#1b1714" metalness={.16} roughness={.58} />
        </mesh>
        {[[-1.65,-1.32],[1.65,-1.32],[-1.65,1.32],[1.65,1.32]].map(([x,y]) => (
          <mesh key={`${x}-${y}`} position={[x,y,.02]} rotation={[Math.PI / 2,0,0]}>
            <cylinderGeometry args={[.09,.09,.06,20]} />
            <meshStandardMaterial color="#a97840" metalness={.95} roughness={.22} />
          </mesh>
        ))}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.48, 1.48, .11, 96]} />
          <meshPhysicalMaterial color="#17130f" metalness={.78} roughness={.28} clearcoat={.45} clearcoatRoughness={.22} transparent opacity={.9} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.52, 0.09, 18, 120]} />
          <meshStandardMaterial color="#6d421f" metalness={0.92} roughness={0.22} />
        </mesh>
        <mesh>
          <torusGeometry args={[1.16, 0.028, 12, 100]} />
          <meshStandardMaterial color="#b78b55" emissive="#6700a3" emissiveIntensity={.12} metalness={0.94} roughness={.2} />
        </mesh>
        {Array.from({ length: 16 }, (_, index) => {
          const angle = (index / 16) * Math.PI * 2;
          return (
            <mesh key={angle} position={[Math.cos(angle) * 1.33, Math.sin(angle) * 1.33, 0]} rotation={[0, 0, angle]}>
              <boxGeometry args={[0.028, index % 4 === 0 ? 0.22 : 0.12, 0.035]} />
              <meshStandardMaterial color={index % 4 === 0 ? "#d1a36b" : "#84613f"} metalness={.9} roughness={.22} />
            </mesh>
          );
        })}
        {Array.from({ length: 4 }, (_, index) => {
          const angle = (index / 4) * Math.PI * 2;
          return (
            <mesh key={`cardinal-${angle}`} position={[Math.cos(angle) * .92, Math.sin(angle) * .92, .09]} rotation={[0, 0, angle]}>
              <octahedronGeometry args={[index === 0 ? .15 : .1, 0]} />
              <meshStandardMaterial color={index === 0 ? "#c46a55" : "#9a7449"} emissive={index === 0 ? "#5b162a" : "#000"} emissiveIntensity={.18} metalness={.9} roughness={.22} />
            </mesh>
          );
        })}
        <group ref={needle}>
          <mesh position={[0, 0.56, 0.08]}>
            <coneGeometry args={[0.16, 1.12, 3]} />
            <meshStandardMaterial color="#b8423d" emissive="#54142c" emissiveIntensity={.22} metalness={.55} roughness={.28} />
          </mesh>
          <mesh position={[0, -0.45, 0.08]} rotation={[0, 0, Math.PI]}>
            <coneGeometry args={[0.12, 0.9, 3]} />
            <meshStandardMaterial color="#24345b" emissive="#101838" emissiveIntensity={.18} metalness={.55} roughness={.28} />
          </mesh>
        </group>
        <mesh position={[0, 0, 0.14]}>
          <sphereGeometry args={[0.13, 28, 28]} />
          <meshStandardMaterial color="#f2cfaa" metalness={0.9} roughness={0.15} />
        </mesh>
        <mesh position={[0,0,.22]} scale={[1.32,1.32,.16]}>
          <sphereGeometry args={[1,64,24]} />
          <meshPhysicalMaterial color="#b9c4cd" transparent opacity={.09} roughness={.08} metalness={0} clearcoat={1} clearcoatRoughness={.04} />
        </mesh>
      </group>
    </Float>
  );
}

export default function CompassExperience({ awakened = false }) {
  return (
    <Canvas dpr={[1, 1.25]} camera={{ position: [0, 0.65, 6.7], fov: 42 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} performance={{ min: 0.5 }}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 4, 5]} intensity={3.1} color="#ffd3a5" />
      <pointLight position={[-3, -1, 2]} intensity={7} color="#6700a3" />
      <pointLight position={[3, 1, 1]} intensity={5} color="#ff5a57" />
      <Compass awakened={awakened} />
    </Canvas>
  );
}
