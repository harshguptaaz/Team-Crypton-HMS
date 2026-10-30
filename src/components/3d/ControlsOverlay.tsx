'use client';

import React from 'react';
import {
  RotateCcw,
  Play,
  Pause,
  Sun,
  Moon,
  Layers,
  HelpCircle,
  Compass
} from 'lucide-react';
import { Department } from '@/types';

interface ControlsOverlayProps {
  departments: Department[];
  selectedDepartment: Department | null;
  onSelectDepartment: (dept: Department | null) => void;
  autoRotate: boolean;
  onToggleAutoRotate: () => void;
  isNight: boolean;
  onToggleNight: () => void;
  onResetView: () => void;
  selectedFloor: number | 'all';
  onSelectFloor: (floor: number | 'all') => void;
}

export const ControlsOverlay: React.FC<ControlsOverlayProps> = ({
  departments,
  selectedDepartment,
  onSelectDepartment,
  autoRotate,
  onToggleAutoRotate,
  isNight,
  onToggleNight,
  onResetView,
  selectedFloor,
  onSelectFloor,
}) => {
  return (
    <div className="absolute inset-x-0 top-0 pointer-events-none p-4 flex flex-col justify-between h-full z-20">
      <div className="flex flex-wrap items-center justify-between gap-3 pointer-events-auto">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-xl p-1.5 shadow-md">
          <span className="text-xs font-bold text-slate-500 pl-2">Dept:</span>
          <select
            value={selectedDepartment?.id || ''}
            onChange={(e) => {
              const found = departments.find((d) => d.id === e.target.value);
              onSelectDepartment(found || null);
            }}
            className="bg-transparent text-xs font-semibold text-[#10233F] outline-none cursor-pointer pr-3 py-1"
          >
            <option value="">All Hospital Campus</option>
            {departments.map((dept) => (
              <option key={dept.id} value={dept.id}>
                {dept.name} (Fl. {dept.floor})
              </option>
            ))}
          </select>
        </div>

        <div className="hidden sm:flex items-center gap-1 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-xl p-1 shadow-md">
          <span className="text-[11px] font-bold text-slate-500 px-2 flex items-center gap-1">
            <Layers className="w-3.5 h-3.5 text-[#1769E0]" /> Floor:
          </span>
          {(['all', 1, 2, 3, 4] as const).map((floor) => (
            <button
              key={floor}
              onClick={() => onSelectFloor(floor)}
              className={`px-2.5 py-1 text-xs rounded-lg font-medium transition-all ${
                selectedFloor === floor
                  ? 'bg-[#1769E0] text-white shadow-sm font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              {floor === 'all' ? 'All' : `L${floor}`}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-md border border-[#DCE8F5] rounded-xl p-1.5 shadow-md">
          <button
            onClick={onToggleAutoRotate}
            title={autoRotate ? 'Pause Auto-Rotation' : 'Start Auto-Rotation'}
            className={`p-1.5 rounded-lg text-xs flex items-center gap-1 transition-colors ${
              autoRotate ? 'bg-[#EAF3FF] text-[#1769E0] font-semibold' : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            {autoRotate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            <span className="hidden md:inline text-[11px]">Orbit</span>
          </button>

          <button
            onClick={onToggleNight}
            title={isNight ? 'Switch to Daytime' : 'Switch to Night Mode'}
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors"
          >
            {isNight ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-slate-700" />}
          </button>

          <button
            onClick={onResetView}
            title="Reset Camera Angle"
            className="p-1.5 rounded-lg text-slate-600 hover:bg-slate-100 transition-colors flex items-center gap-1"
          >
            <Compass className="w-4 h-4 text-[#1769E0]" />
            <span className="hidden md:inline text-[11px] font-medium">Reset</span>
          </button>
        </div>
      </div>

      <div className="pointer-events-auto flex items-center justify-between text-[11px] text-slate-500 bg-white/80 backdrop-blur-sm border border-[#DCE8F5] rounded-lg px-3 py-1.5 max-w-fit shadow-sm">
        <span className="flex items-center gap-1.5">
          <HelpCircle className="w-3.5 h-3.5 text-[#1769E0]" />
          <span>Left-click + Drag to rotate • Scroll to zoom • Right-click to pan • Click building to inspect</span>
        </span>
      </div>
    </div>
  );
};
