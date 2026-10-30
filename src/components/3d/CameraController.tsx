'use client';

import React, { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { Department } from '@/types';

interface CameraControllerProps {
  selectedDepartment: Department | null;
  autoRotate?: boolean;
  isNight?: boolean;
  onResetView?: () => void;
}

export const CameraController: React.FC<CameraControllerProps> = ({
  selectedDepartment,
  autoRotate = false,
}) => {
  const controlsRef = useRef<any>(null);
  const { camera } = useThree();

  const targetLookAt = useRef(new THREE.Vector3(0, 2, 0));
  const targetCamPos = useRef(new THREE.Vector3(42, 34, 42));
  const isTransitioning = useRef(false);

  useEffect(() => {
    if (selectedDepartment) {
      const [x, y, z] = selectedDepartment.coordinates3D;
      targetLookAt.current.set(x, y + 1.5, z);
      targetCamPos.current.set(x + 14, y + 16, z + 16);
      isTransitioning.current = true;
    } else {
      targetLookAt.current.set(0, 2, 0);
      targetCamPos.current.set(42, 34, 42);
      isTransitioning.current = true;
    }
  }, [selectedDepartment]);

  useFrame((_, delta) => {
    if (isTransitioning.current && controlsRef.current) {
      const step = Math.min(delta * 2.8, 1);
      camera.position.lerp(targetCamPos.current, step);
      controlsRef.current.target.lerp(targetLookAt.current, step);
      controlsRef.current.update();

      if (
        camera.position.distanceTo(targetCamPos.current) < 0.1 &&
        controlsRef.current.target.distanceTo(targetLookAt.current) < 0.1
      ) {
        isTransitioning.current = false;
      }
    }
  });

  return (
    <OrbitControls
      ref={controlsRef}
      enableDamping
      dampingFactor={0.06}
      maxPolarAngle={Math.PI / 2.05}
      minDistance={12}
      maxDistance={110}
      autoRotate={autoRotate}
      autoRotateSpeed={0.8}
    />
  );
};
