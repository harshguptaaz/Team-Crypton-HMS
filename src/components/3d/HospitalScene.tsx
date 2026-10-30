'use client';

import React from 'react';
import { Department } from '@/types';
import { SceneLighting } from './SceneLighting';
import { HospitalCampusGrounds } from './HospitalCampusGrounds';
import { DepartmentBuilding } from './DepartmentBuilding';
import { Helipad } from './Helipad';
import { Ambulance } from './Ambulance';
import { CameraController } from './CameraController';

interface HospitalSceneProps {
  departments: Department[];
  selectedDepartment: Department | null;
  onSelectDepartment: (dept: Department | null) => void;
  autoRotate: boolean;
  isNight: boolean;
  selectedFloor: number | 'all';
}

export const HospitalScene: React.FC<HospitalSceneProps> = ({
  departments,
  selectedDepartment,
  onSelectDepartment,
  autoRotate,
  isNight,
  selectedFloor,
}) => {
  const visibleDepartments = departments.filter((dept) => {
    if (selectedFloor === 'all') return true;
    return dept.floor === selectedFloor;
  });

  return (
    <>
      <color attach="background" args={[isNight ? '#071326' : '#F0F6FF']} />
      <fog attach="fog" args={[isNight ? '#071326' : '#F0F6FF', 40, 130]} />

      <SceneLighting isNight={isNight} />
      <HospitalCampusGrounds />

      <group position={[0, 4.5, 0]}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[10, 9, 10]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} metalness={0.1} />
        </mesh>
        <mesh position={[0, 0, 5.05]}>
          <planeGeometry args={[8.5, 7.5]} />
          <meshStandardMaterial color="#1769E0" roughness={0.1} metalness={0.8} transparent opacity={0.8} />
        </mesh>
        <group position={[0, 4.7, 0]} rotation={[-Math.PI / 2, 0, 0]}>
          <mesh>
            <boxGeometry args={[3, 1, 0.3]} />
            <meshStandardMaterial color="#EF4444" roughness={0.3} emissive="#EF4444" emissiveIntensity={0.4} />
          </mesh>
          <mesh>
            <boxGeometry args={[1, 3, 0.3]} />
            <meshStandardMaterial color="#EF4444" roughness={0.3} emissive="#EF4444" emissiveIntensity={0.4} />
          </mesh>
        </group>
      </group>

      <mesh position={[0, 4, -9.5]} castShadow>
        <boxGeometry args={[3.2, 2.4, 9]} />
        <meshStandardMaterial color="#2587FF" transparent opacity={0.65} roughness={0.1} metalness={0.6} />
      </mesh>
      <mesh position={[0, 4, 9.5]} castShadow>
        <boxGeometry args={[3.2, 2.4, 9]} />
        <meshStandardMaterial color="#2587FF" transparent opacity={0.65} roughness={0.1} metalness={0.6} />
      </mesh>
      <mesh position={[-9.5, 4, 0]} castShadow>
        <boxGeometry args={[9, 2.4, 3.2]} />
        <meshStandardMaterial color="#2587FF" transparent opacity={0.65} roughness={0.1} metalness={0.6} />
      </mesh>
      <mesh position={[9.5, 4, 0]} castShadow>
        <boxGeometry args={[9, 2.4, 3.2]} />
        <meshStandardMaterial color="#2587FF" transparent opacity={0.65} roughness={0.1} metalness={0.6} />
      </mesh>

      {visibleDepartments.map((dept) => (
        <DepartmentBuilding
          key={dept.id}
          department={dept}
          isSelected={selectedDepartment?.id === dept.id}
          onSelect={onSelectDepartment}
        />
      ))}

      <Helipad position={[17, 0.05, -14]} />
      <Ambulance position={[-18, 0, 8]} rotation={[0, Math.PI / 2, 0]} hasEmergencyLights={true} />
      <Ambulance position={[-18, 0, 14]} rotation={[0, Math.PI / 2, 0]} hasEmergencyLights={false} />

      <CameraController
        selectedDepartment={selectedDepartment}
        autoRotate={autoRotate}
        isNight={isNight}
      />
    </>
  );
};
