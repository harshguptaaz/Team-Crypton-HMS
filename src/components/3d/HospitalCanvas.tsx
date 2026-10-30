'use client';

import React, { useState, Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Department } from '@/types';
import { mockDepartments } from '@/data/mockData';
import { HospitalScene } from './HospitalScene';
import { ControlsOverlay } from './ControlsOverlay';
import { DepartmentInfoPanel } from './DepartmentInfoPanel';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';

interface HospitalCanvasProps {
  className?: string;
  initialDepartmentId?: string;
  departments?: Department[];
  height?: string;
}

export const HospitalCanvas: React.FC<HospitalCanvasProps> = ({
  className = '',
  initialDepartmentId,
  departments = mockDepartments,
  height = 'h-[620px]',
}) => {
  const initialDept = departments.find((d) => d.id === initialDepartmentId) || null;
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(initialDept);
  const [autoRotate, setAutoRotate] = useState<boolean>(true);
  const [isNight, setIsNight] = useState<boolean>(false);
  const [selectedFloor, setSelectedFloor] = useState<number | 'all'>('all');

  const handleReset = () => {
    setSelectedDepartment(null);
    setSelectedFloor('all');
  };

  return (
    <div className={`relative w-full ${height} bg-[#F0F6FF] rounded-3xl overflow-hidden border border-[#DCE8F5] shadow-xl ${className}`}>
      <ControlsOverlay
        departments={departments}
        selectedDepartment={selectedDepartment}
        onSelectDepartment={(dept) => {
          setSelectedDepartment(dept);
          if (dept) setAutoRotate(false);
        }}
        autoRotate={autoRotate}
        onToggleAutoRotate={() => setAutoRotate(!autoRotate)}
        isNight={isNight}
        onToggleNight={() => setIsNight(!isNight)}
        onResetView={handleReset}
        selectedFloor={selectedFloor}
        onSelectFloor={setSelectedFloor}
      />

      <DepartmentInfoPanel
        department={selectedDepartment}
        onClose={() => setSelectedDepartment(null)}
      />

      <Suspense
        fallback={
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#F5F9FF] z-10">
            <LoadingSpinner size="lg" />
            <p className="mt-4 text-sm font-semibold text-slate-600 animate-pulse">
              Initializing 3D Digital Hospital Twin...
            </p>
          </div>
        }
      >
        <Canvas
          shadows
          camera={{ position: [42, 34, 42], fov: 45 }}
          onPointerMissed={() => setSelectedDepartment(null)}
          gl={{ antialias: true, alpha: false }}
        >
          <HospitalScene
            departments={departments}
            selectedDepartment={selectedDepartment}
            onSelectDepartment={(dept) => {
              setSelectedDepartment(dept);
              if (dept) setAutoRotate(false);
            }}
            autoRotate={autoRotate}
            isNight={isNight}
            selectedFloor={selectedFloor}
          />
        </Canvas>
      </Suspense>
    </div>
  );
};

export default HospitalCanvas;
