'use client';

import React from 'react';
import * as THREE from 'three';

export const HospitalCampusGrounds: React.FC = () => {
  const treePositions: [number, number, number][] = [
    [-24, 0, -22], [-20, 0, -25], [-16, 0, -23], [-25, 0, -15],
    [24, 0, -22], [20, 0, -26], [16, 0, -24], [25, 0, -14],
    [-24, 0, 20], [-20, 0, 24], [-15, 0, 22],
    [24, 0, 18], [22, 0, 23], [17, 0, 21],
    [-6, 0, -24], [6, 0, -24], [-10, 0, 25], [10, 0, 25],
    [-26, 0, 2], [-26, 0, 8], [26, 0, 2], [26, 0, -6]
  ];

  const lampPositions: [number, number, number][] = [
    [-18, 0, -8], [-18, 0, 8], [18, 0, -8], [18, 0, 8],
    [0, 0, -18], [0, 0, 18], [-8, 0, -18], [8, 0, -18]
  ];

  const carPositions: { pos: [number, number, number]; color: string; rot?: number }[] = [
    { pos: [16, 0.4, 14], color: '#FFFFFF', rot: 0 },
    { pos: [19, 0.4, 14], color: '#2587FF', rot: 0 },
    { pos: [22, 0.4, 14], color: '#64748B', rot: 0 },
    { pos: [16, 0.4, 17], color: '#EF4444', rot: Math.PI },
    { pos: [19, 0.4, 17], color: '#FFFFFF', rot: Math.PI },
  ];

  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[90, 80]} />
        <meshStandardMaterial color="#EBF2FA" roughness={0.9} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <planeGeometry args={[65, 55]} />
        <meshStandardMaterial color="#F4F8FD" roughness={0.7} />
      </mesh>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-20, 0.01, 0]} receiveShadow>
        <planeGeometry args={[5, 60]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[20, 0.01, 0]} receiveShadow>
        <planeGeometry args={[5, 60]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -20]} receiveShadow>
        <planeGeometry args={[45, 5]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 20]} receiveShadow>
        <planeGeometry args={[45, 5]} />
        <meshStandardMaterial color="#334155" roughness={0.6} />
      </mesh>

      {[-16, -8, 0, 8, 16].map((z, idx) => (
        <group key={`dash-${idx}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-20, 0.02, z]}>
            <planeGeometry args={[0.3, 4]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[20, 0.02, z]}>
            <planeGeometry args={[0.3, 4]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}

      {[-2, -1, 0, 1, 2].map((offset, i) => (
        <group key={`zebra-${i}`}>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-20, 0.03, 10 + offset * 0.8]}>
            <planeGeometry args={[4, 0.4]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
          <mesh rotation={[-Math.PI / 2, 0, 0]} position={[offset * 0.8, 0.03, 20]}>
            <planeGeometry args={[0.4, 4]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        </group>
      ))}

      <group position={[0, 0.05, 0]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <circleGeometry args={[5.5, 32]} />
          <meshStandardMaterial color="#E2E8F0" roughness={0.4} />
        </mesh>
        <mesh position={[0, 0.25, 0]}>
          <cylinderGeometry args={[3.2, 3.4, 0.5, 32]} />
          <meshStandardMaterial color="#94A3B8" roughness={0.3} />
        </mesh>
        <mesh position={[0, 0.45, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <circleGeometry args={[3, 32]} />
          <meshStandardMaterial
            color="#2587FF"
            roughness={0.1}
            metalness={0.8}
            transparent
            opacity={0.85}
          />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <cylinderGeometry args={[0.15, 0.2, 0.9, 12]} />
          <meshBasicMaterial color="#E0F2FE" transparent opacity={0.8} />
        </mesh>
      </group>

      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-11, 0.02, -11]} receiveShadow>
        <planeGeometry args={[11, 11]} />
        <meshStandardMaterial color="#86EFAC" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[11, 0.02, -11]} receiveShadow>
        <planeGeometry args={[11, 11]} />
        <meshStandardMaterial color="#86EFAC" roughness={0.85} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-11, 0.02, 11]} receiveShadow>
        <planeGeometry args={[11, 11]} />
        <meshStandardMaterial color="#86EFAC" roughness={0.85} />
      </mesh>

      <group position={[19, 0.02, 15.5]}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[11, 9]} />
          <meshStandardMaterial color="#475569" roughness={0.7} />
        </mesh>
        {[-3.5, -0.5, 2.5].map((xOffset, i) => (
          <mesh key={`p-line-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[xOffset, 0.02, 0]}>
            <planeGeometry args={[0.15, 7.5]} />
            <meshBasicMaterial color="#FFFFFF" />
          </mesh>
        ))}
      </group>

      {carPositions.map((car, idx) => (
        <group key={`car-${idx}`} position={car.pos} rotation={[0, car.rot || 0, 0]}>
          <mesh castShadow position={[0, 0.2, 0]}>
            <boxGeometry args={[1.6, 0.45, 2.8]} />
            <meshStandardMaterial color={car.color} roughness={0.3} metalness={0.2} />
          </mesh>
          <mesh castShadow position={[0, 0.55, -0.2]}>
            <boxGeometry args={[1.3, 0.4, 1.5]} />
            <meshStandardMaterial color="#1E293B" roughness={0.1} />
          </mesh>
          {[-0.85, 0.85].map((wx, wi) =>
            [-0.8, 0.8].map((wz, wzi) => (
              <mesh key={`cw-${wi}-${wzi}`} position={[wx, 0.05, wz]} rotation={[0, 0, Math.PI / 2]}>
                <cylinderGeometry args={[0.2, 0.2, 0.15, 12]} />
                <meshStandardMaterial color="#0F172A" roughness={0.8} />
              </mesh>
            ))
          )}
        </group>
      ))}

      {treePositions.map((pos, idx) => (
        <group key={`tree-${idx}`} position={pos}>
          <mesh position={[0, 1.1, 0]} castShadow>
            <cylinderGeometry args={[0.25, 0.35, 2.2, 8]} />
            <meshStandardMaterial color="#854D0E" roughness={0.9} />
          </mesh>
          <mesh position={[0, 2.6, 0]} castShadow>
            <coneGeometry args={[1.4, 2.2, 8]} />
            <meshStandardMaterial color="#15803D" roughness={0.7} />
          </mesh>
          <mesh position={[0, 3.8, 0]} castShadow>
            <coneGeometry args={[1.0, 1.8, 8]} />
            <meshStandardMaterial color="#22C55E" roughness={0.7} />
          </mesh>
        </group>
      ))}

      {lampPositions.map((pos, idx) => (
        <group key={`lamp-${idx}`} position={pos}>
          <mesh position={[0, 2.5, 0]} castShadow>
            <cylinderGeometry args={[0.07, 0.1, 5, 8]} />
            <meshStandardMaterial color="#334155" metalness={0.7} roughness={0.3} />
          </mesh>
          <mesh position={[0.4, 4.9, 0]} rotation={[0, 0, -Math.PI / 4]}>
            <cylinderGeometry args={[0.05, 0.05, 0.9, 8]} />
            <meshStandardMaterial color="#334155" />
          </mesh>
          <mesh position={[0.7, 4.7, 0]}>
            <sphereGeometry args={[0.2, 12, 12]} />
            <meshBasicMaterial color="#FEF08A" />
          </mesh>
        </group>
      ))}
    </group>
  );
};
