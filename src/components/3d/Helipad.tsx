'use client';

import React from 'react';

interface HelipadProps {
  position: [number, number, number];
}

export const Helipad: React.FC<HelipadProps> = ({ position }) => {
  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0.05, 0]}>
        <cylinderGeometry args={[3.2, 3.4, 0.2, 32]} />
        <meshStandardMaterial color="#223046" roughness={0.7} metalness={0.2} />
      </mesh>

      <mesh position={[0, 0.16, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[2.7, 2.9, 32]} />
        <meshBasicMaterial color="#F59E0B" />
      </mesh>

      <mesh position={[0, 0.17, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.05, 32]} />
        <meshBasicMaterial color="#FFFFFF" />
      </mesh>

      <group position={[0, 0.18, 0]}>
        <mesh position={[-0.7, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 1.8]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0.7, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[0.3, 1.8]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <planeGeometry args={[1.2, 0.3]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
      </group>

      {[0, Math.PI / 2, Math.PI, (3 * Math.PI) / 2].map((angle, i) => (
        <mesh
          key={i}
          position={[Math.cos(angle) * 3.0, 0.2, Math.sin(angle) * 3.0]}
        >
          <sphereGeometry args={[0.08, 8, 8]} />
          <meshStandardMaterial
            color="#22C55E"
            emissive="#22C55E"
            emissiveIntensity={2}
          />
        </mesh>
      ))}
    </group>
  );
};
