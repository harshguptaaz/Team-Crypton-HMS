'use client';

import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

interface AmbulanceProps {
  position: [number, number, number];
  rotation?: [number, number, number];
  hasEmergencyLights?: boolean;
}

export const Ambulance: React.FC<AmbulanceProps> = ({
  position,
  rotation = [0, 0, 0],
  hasEmergencyLights = false,
}) => {
  const redLightRef = useRef<THREE.PointLight>(null);
  const blueLightRef = useRef<THREE.PointLight>(null);
  const redMeshRef = useRef<THREE.Mesh>(null);
  const blueMeshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!hasEmergencyLights) {
      if (redLightRef.current) redLightRef.current.intensity = 0;
      if (blueLightRef.current) blueLightRef.current.intensity = 0;
      return;
    }
    const t = state.clock.getElapsedTime() * 8;
    const isRed = Math.sin(t) > 0;

    if (redLightRef.current) redLightRef.current.intensity = isRed ? 2.5 : 0.2;
    if (blueLightRef.current) blueLightRef.current.intensity = !isRed ? 2.5 : 0.2;

    if (redMeshRef.current) {
      const mat = redMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = isRed ? 2.0 : 0.2;
    }
    if (blueMeshRef.current) {
      const mat = blueMeshRef.current.material as THREE.MeshStandardMaterial;
      if (mat) mat.emissiveIntensity = !isRed ? 2.0 : 0.2;
    }
  });

  return (
    <group position={position} rotation={rotation}>
      <mesh position={[0, 0.7, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.5, 1.1, 3.2]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0.55, 1.3]} castShadow>
        <boxGeometry args={[1.48, 0.8, 0.8]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.3} metalness={0.1} />
      </mesh>

      <mesh position={[0, 0.85, 1.32]} rotation={[0.3, 0, 0]}>
        <planeGeometry args={[1.3, 0.5]} />
        <meshStandardMaterial color="#0B1F3A" roughness={0.1} metalness={0.9} />
      </mesh>

      <mesh position={[0.76, 0.65, 0]}>
        <planeGeometry args={[3.1, 0.25]} />
        <meshStandardMaterial color="#EF4444" />
      </mesh>
      <mesh position={[-0.76, 0.65, 0]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[3.1, 0.25]} />
        <meshStandardMaterial color="#EF4444" />
      </mesh>

      <mesh position={[0.77, 0.9, -0.4]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial color="#EF4444" />
      </mesh>
      <mesh position={[-0.77, 0.9, -0.4]} rotation={[0, Math.PI, 0]}>
        <planeGeometry args={[0.4, 0.4]} />
        <meshBasicMaterial color="#EF4444" />
      </mesh>

      {[
        [-0.8, 0.25, 0.9],
        [0.8, 0.25, 0.9],
        [-0.8, 0.25, -0.9],
        [0.8, 0.25, -0.9],
      ].map((wheelPos, i) => (
        <mesh key={i} position={wheelPos as [number, number, number]} rotation={[0, 0, Math.PI / 2]} castShadow>
          <cylinderGeometry args={[0.26, 0.26, 0.16, 16]} />
          <meshStandardMaterial color="#1E293B" roughness={0.8} />
        </mesh>
      ))}

      <group position={[0, 1.32, 0.4]}>
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[0.9, 0.08, 0.2]} />
          <meshStandardMaterial color="#334155" />
        </mesh>

        <mesh ref={redMeshRef} position={[-0.32, 0.1, 0]}>
          <boxGeometry args={[0.24, 0.14, 0.18]} />
          <meshStandardMaterial color="#EF4444" emissive="#EF4444" emissiveIntensity={1} />
        </mesh>
        <pointLight ref={redLightRef} position={[-0.32, 0.2, 0]} color="#EF4444" intensity={2} distance={8} />

        <mesh ref={blueMeshRef} position={[0.32, 0.1, 0]}>
          <boxGeometry args={[0.24, 0.14, 0.18]} />
          <meshStandardMaterial color="#2587FF" emissive="#2587FF" emissiveIntensity={1} />
        </mesh>
        <pointLight ref={blueLightRef} position={[0.32, 0.2, 0]} color="#2587FF" intensity={2} distance={8} />
      </group>
    </group>
  );
};
