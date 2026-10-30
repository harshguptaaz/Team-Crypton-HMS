'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { EmergencyFloatingButton } from '@/components/common/EmergencyFloatingButton';
import { mockDepartments, mockHospitalStatus } from '@/data/mockData';
import { Department } from '@/types';
import {
  Box,
  Layers,
  HeartPulse,
  Bed,
  Stethoscope,
  Activity,
  Compass,
  ArrowRight,
  Filter
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

// Dynamic import of HospitalCanvas with SSR disabled
const HospitalCanvas = dynamic(
  () => import('@/components/3d/HospitalCanvas').then((mod) => mod.HospitalCanvas),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[700px] bg-[#EAF3FF] rounded-3xl animate-pulse flex flex-col items-center justify-center text-slate-400 border border-[#DCE8F5]">
        <HeartPulse className="w-12 h-12 text-[#1769E0] animate-bounce" />
        <span className="text-base font-semibold mt-4 text-[#10233F]">
          Loading 3D Digital Hospital Twin & Campus Geometry...
        </span>
      </div>
    ),
  }
);

export default function Hospital3DPage() {
  const [selectedDeptId, setSelectedDeptId] = useState<string | undefined>(undefined);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FF]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#1769E0] text-xs font-bold mb-2 border border-[#DCE8F5]">
              <Box className="w-3.5 h-3.5" />
              <span>SPATIAL DIGITAL TWIN</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Interactive 3D Hospital Ecosystem
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Explore hospital architecture, inspect active bed capacity, and locate medical departments in real-time 3D.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            <span className="text-xs bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full font-bold border border-emerald-200 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Telemetry Linked
            </span>
          </div>
        </div>

        {/* 3D Campus Viewer & Department Quick Selector */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main 3D Canvas */}
          <div className="lg:col-span-8 xl:col-span-9">
            <HospitalCanvas
              height="h-[620px] lg:h-[720px]"
              initialDepartmentId={selectedDeptId}
            />
          </div>

          {/* Right Sidebar: Department Directory */}
          <div className="lg:col-span-4 xl:col-span-3 bg-white rounded-3xl border border-[#DCE8F5] p-5 shadow-sm space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5]">
              <div className="flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1769E0]" />
                <h3 className="font-bold text-sm text-[#10233F]">Campus Departments</h3>
              </div>
              <span className="text-xs text-slate-400 font-semibold">{mockDepartments.length} Wings</span>
            </div>

            <p className="text-xs text-slate-500">
              Select a department below to focus the 3D camera and view real-time bed availability:
            </p>

            <div className="max-h-[580px] overflow-y-auto space-y-2 pr-1">
              {mockDepartments.map((dept) => (
                <button
                  key={dept.id}
                  onClick={() => setSelectedDeptId(dept.id)}
                  className={`w-full text-left p-3 rounded-xl border transition-all flex items-center justify-between group ${
                    selectedDeptId === dept.id
                      ? 'bg-[#EAF3FF] border-[#1769E0] shadow-xs'
                      : 'border-slate-100 hover:border-[#DCE8F5] hover:bg-[#F5F9FF]'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span
                      className="w-3 h-3 rounded-full shrink-0"
                      style={{ backgroundColor: dept.color }}
                    />
                    <div>
                      <div className="text-xs font-bold text-[#10233F] group-hover:text-[#1769E0] transition-colors">
                        {dept.name}
                      </div>
                      <div className="text-[10px] text-slate-500">
                        Floor {dept.floor} • {dept.availableBeds} beds free
                      </div>
                    </div>
                  </div>
                  <Badge variant={dept.status === 'Active' ? 'success' : 'warning'} className="text-[10px] px-1.5 py-0.5">
                    {dept.status}
                  </Badge>
                </button>
              ))}
            </div>
          </div>
        </div>
      </main>

      <EmergencyFloatingButton />
      <Footer />
    </div>
  );
}
