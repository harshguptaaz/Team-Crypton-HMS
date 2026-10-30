'use client';

import React from 'react';

interface SceneLightingProps {
  isNight?: boolean;
}

export const SceneLighting: React.FC<SceneLightingProps> = ({ isNight = false }) => {
  return (
    <>
      <ambientLight intensity={isNight ? 0.25 : 0.65} color={isNight ? '#4A72B2' : '#EAF3FF'} />
      <directionalLight
        position={[25, 45, 20]}
        intensity={isNight ? 0.35 : 1.2}
        color={isNight ? '#85B6FF' : '#FFFFFF'}
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-camera-far={120}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
        shadow-bias={-0.0005}
      />
      <directionalLight position={[-20, 25, -20]} intensity={isNight ? 0.2 : 0.4} color="#85B6FF" />
      <pointLight position={[0, 15, 0]} intensity={isNight ? 1.5 : 0.8} color="#2587FF" distance={35} />
      <pointLight position={[-12, 5, 8]} intensity={isNight ? 1.4 : 0.9} color="#EF4444" distance={15} />
      <pointLight position={[12, 10, -5]} intensity={isNight ? 1.2 : 0.7} color="#06B6D4" distance={25} />
    </>
  );
};
