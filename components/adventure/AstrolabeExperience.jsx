"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Sparkles } from "@react-three/drei";
import { useRef } from "react";

function Astrolabe({ active }) {
  const root = useRef(null);
  const needle = useRef(null);
  const orbital = useRef(null);
  useFrame((state, delta) => {
    if (!root.current || !needle.current || !orbital.current) return;
    const targetY = state.pointer.x * .42;
    const targetX = state.pointer.y * -.28;
    root.current.rotation.y += (targetY - root.current.rotation.y) * .045 + delta * (active ? .08 : .025);
    root.current.rotation.x += (targetX - root.current.rotation.x) * .045;
    needle.current.rotation.z += ((active ? -1.08 : 0.34) - needle.current.rotation.z) * 0.045;
    orbital.current.rotation.x += delta * (active ? .22 : .06);
    orbital.current.rotation.y -= delta * (active ? .17 : .045);
  });
  return (
    <Float speed={1.35} rotationIntensity={0.18} floatIntensity={0.42}>
      <group ref={root} rotation={[0.08, -0.2, -0.12]} scale={.92}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <cylinderGeometry args={[1.31, 1.31, 0.075, 96]} />
          <meshPhysicalMaterial color="#5d3b22" metalness={0.86} roughness={0.3} clearcoat={0.42} clearcoatRoughness={0.22} />
        </mesh>
        <mesh><torusGeometry args={[1.36, 0.13, 18, 120]} /><meshStandardMaterial color="#8a5a2f" metalness={0.95} roughness={0.24} /></mesh>
        <mesh position={[0,0,.055]}><torusGeometry args={[1.08, 0.035, 12, 96]} /><meshStandardMaterial color="#c19458" metalness={.95} roughness={.2} /></mesh>
        <mesh position={[0,0,.07]}><torusGeometry args={[.72, 0.025, 12, 80]} /><meshStandardMaterial color="#b27a42" metalness={.94} roughness={.23} /></mesh>
        <group ref={orbital} rotation={[.65, .18, .2]}>
          <mesh><torusGeometry args={[1.58,.035,14,128]} /><meshPhysicalMaterial color="#d09a62" metalness={1} roughness={.16} clearcoat={.7} emissive="#6700a3" emissiveIntensity={active ? .34 : .08} /></mesh>
          <mesh rotation={[Math.PI / 2,0,0]}><torusGeometry args={[1.47,.026,12,128]} /><meshStandardMaterial color="#8c5d38" metalness={.98} roughness={.2} emissive="#e02f75" emissiveIntensity={active ? .28 : .05} /></mesh>
          <mesh rotation={[0,Math.PI / 2,0]}><torusGeometry args={[1.28,.022,12,112]} /><meshStandardMaterial color="#c48a54" metalness={.98} roughness={.18} /></mesh>
        </group>
        {Array.from({ length: 8 }, (_, index) => {
          const angle = (index / 8) * Math.PI * 2;
          return (
            <mesh key={`spoke-${angle}`} rotation={[0, 0, angle]} position={[Math.cos(angle) * .49, Math.sin(angle) * .49, .09]}>
              <boxGeometry args={[.025, .98, .026]} />
              <meshStandardMaterial color="#8d5d31" metalness={.94} roughness={.2} />
            </mesh>
          );
        })}
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index / 12) * Math.PI * 2;
          return <mesh key={angle} position={[Math.cos(angle) * 1.25, Math.sin(angle) * 1.25, 0]} rotation={[0, 0, angle]}><boxGeometry args={[0.025, 0.22, 0.035]} /><meshStandardMaterial color={index % 3 ? "#c18a55" : "#ff5a57"} emissive={index % 3 ? "#000" : "#e02f75"} emissiveIntensity={0.8} /></mesh>;
        })}
        {Array.from({ length: 12 }, (_, index) => {
          const angle = (index / 12) * Math.PI * 2;
          return <mesh key={`star-${angle}`} position={[Math.cos(angle) * .88, Math.sin(angle) * .88, .13]} rotation={[0,0,-angle]}><coneGeometry args={[.06,.18,5]} /><meshStandardMaterial color={index % 3 === 0 ? "#e1b477" : "#8d5d31"} metalness={.96} roughness={.18} /></mesh>;
        })}
        <group ref={needle} position={[0, 0, 0.17]}>
          <mesh rotation={[0,0,.18]}><boxGeometry args={[.055,2.2,.045]} /><meshStandardMaterial color="#d0a064" metalness={.97} roughness={.18} /></mesh>
          <mesh position={[0,1.06,0]} rotation={[0,0,.18]}><coneGeometry args={[.1,.28,3]} /><meshStandardMaterial color="#e1b477" metalness={.96} roughness={.15} /></mesh>
        </group>
        <mesh position={[0, 0, 0.2]}><sphereGeometry args={[0.15, 28, 28]} /><meshStandardMaterial color="#f3d4ac" metalness={0.92} roughness={0.12} /></mesh>
        <mesh position={[0, 0, .1]}>
          <ringGeometry args={[.34, .58, 64]} />
          <meshStandardMaterial color="#9b6b3b" emissive="#6700a3" emissiveIntensity={active ? .16 : .01} transparent opacity={.9} side={2} metalness={.94} roughness={.22} />
        </mesh>
        {Array.from({ length: 5 }, (_, index) => {
          const angle = (index / 5) * Math.PI * 2;
          return (
            <group key={`gear-${index}`} position={[Math.cos(angle) * .72, Math.sin(angle) * .72, .18]} scale={index === 0 ? .82 : .58}>
              <mesh><cylinderGeometry args={[.18,.18,.08,12]} /><meshStandardMaterial color="#5f3b24" metalness={.96} roughness={.24} /></mesh>
              <mesh position={[0,0,.055]}><torusGeometry args={[.15,.026,10,32]} /><meshStandardMaterial color={index % 2 ? "#ff5a57" : "#d2a26d"} emissive={index % 2 ? "#e02f75" : "#6700a3"} emissiveIntensity={active ? .55 : .12} metalness={.92} roughness={.2} /></mesh>
            </group>
          );
        })}
      </group>
    </Float>
  );
}

export default function AstrolabeExperience({ active }) {
  return (
    <Canvas dpr={[1, 1.3]} camera={{ position: [0, 0, 5.3], fov: 44 }} gl={{ alpha: true, antialias: true, powerPreference: "low-power" }} performance={{ min: 0.5 }}>
      <ambientLight intensity={0.48} />
      <directionalLight position={[3, 5, 5]} intensity={4.2} color="#ffd19a" />
      <pointLight position={[-3, -2, 3]} intensity={active ? 8 : 4.8} color="#6700a3" />
      <pointLight position={[3, 1, 2]} intensity={active ? 6.5 : 3.6} color="#ff5a57" />
      <pointLight position={[0, 3, 2]} intensity={active ? 3.8 : 1.4} color="#fccbf0" />
      <Astrolabe active={active} />
      <Sparkles count={active ? 18 : 5} scale={4.2} size={.8} speed={0.12} color="#fccbf0" />
    </Canvas>
  );
}
