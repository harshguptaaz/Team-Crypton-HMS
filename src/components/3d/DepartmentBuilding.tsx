'use client';

import React, { useState, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import * as THREE from 'three';
import { Department } from '@/types';

interface DepartmentBuildingProps {
  department: Department;
  isSelected: boolean;
  onSelect: (dept: Department) => void;
}

export const DepartmentBuilding: React.FC<DepartmentBuildingProps> = ({
  department,
  isSelected,
  onSelect,
}) => {
  const [hovered, setHovered] = useState(false);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  const coords = department.coordinates3D;
  const dims = department.dimensions3D || [5, 3.5, 4.5];

  useFrame((state) => {
    if (glowRef.current && (hovered || isSelected)) {
      const t = state.clock.getElapsedTime();
      const scale = 1 + Math.sin(t * 4) * 0.02;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group position={coords}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        onClick={(e) => {
          e.stopPropagation();
          onSelect(department);
        }}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
          document.body.style.cursor = 'auto';
        }}
      >
        <boxGeometry args={dims} />
        <meshStandardMaterial
          color={isSelected ? '#FFFFFF' : hovered ? '#F0F6FF' : '#FFFFFF'}
          roughness={0.2}
          metalness={0.1}
          emissive={isSelected ? department.color : hovered ? '#2587FF' : '#0B1F3A'}
          emissiveIntensity={isSelected ? 0.35 : hovered ? 0.2 : 0.02}
        />
      </mesh>

      <mesh position={[0, 0, dims[2] / 2 + 0.02]}>
        <planeGeometry args={[dims[0] * 0.85, dims[1] * 0.7]} />
        <meshStandardMaterial
          color="#2587FF"
          roughness={0.1}
          metalness={0.8}
          transparent
          opacity={0.85}
        />
      </mesh>

      {(isSelected || hovered) && (
        <mesh ref={glowRef}>
          <boxGeometry args={[dims[0] + 0.2, dims[1] + 0.2, dims[2] + 0.2]} />
          <meshBasicMaterial
            color={isSelected ? '#2587FF' : '#38B6FF'}
            wireframe
            transparent
            opacity={isSelected ? 0.75 : 0.4}
          />
        </mesh>
      )}

      <Html
        position={[0, dims[1] / 2 + 0.7, 0]}
        center
        distanceFactor={28}
        zIndexRange={[100, 0]}
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            onSelect(department);
          }}
          className={`cursor-pointer select-none transition-all duration-200 flex items-center gap-1.5 px-2.5 py-1 rounded-full shadow-lg backdrop-blur-md border ${
            isSelected
              ? 'bg-primary text-white border-white scale-110 shadow-glow ring-2 ring-primary/40'
              : hovered
              ? 'bg-white text-primary border-primary scale-105 shadow-md'
              : 'bg-white/90 text-navy border-surface-border text-xs'
          }`}
        >
          <span
            className="w-2 h-2 rounded-full shrink-0"
            style={{ backgroundColor: department.color }}
          />
          <span className="font-bold text-[11px] whitespace-nowrap tracking-tight">
            {department.name}
          </span>
          <span className="text-[10px] opacity-75 font-semibold">
            ({department.availableBeds} beds)
          </span>
        </div>
      </Html>
    </group>
  );
};
