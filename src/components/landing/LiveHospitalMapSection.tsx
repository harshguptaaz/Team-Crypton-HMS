'use client';

import React from 'react';
import Link from 'next/link';
import {
  Compass,
  ArrowRight,
  Layers,
  Box
} from 'lucide-react';
import { Button } from '@/components/ui/Button';

export const LiveHospitalMapSection: React.FC = () => {
  const zones = [
    {
      title: 'North Wing: Acute Trauma & Emergency',
      code: 'Zone A',
      desc: 'Ground-level ambulance bay, triage assessment suites, and rapid resuscitation bays.',
      floor: 'Floor 1',
      link: '/hospital/3d',
    },
    {
      title: 'Central Atrium: Cardiovascular & Inpatient',
      code: 'Zone B',
      desc: 'Cath labs, cardiac intensive care (CICU), telemetry beds, and executive patient suites.',
      floor: 'Floor 2-4',
      link: '/hospital/3d',
    },
    {
      title: 'East Pavilion: Surgical Suites & Rooftop Helipad',
      code: 'Zone C',
      desc: 'Robotic operating theatres, post-anesthesia care, and air-ambulance intake pad.',
      floor: 'Floor 3 & Roof',
      link: '/hospital/3d',
    },
    {
      title: 'West Diagnostic Pavilion: Imaging & Pathology',
      code: 'Zone D',
      desc: '3T MRI, 256-slice CT, automated molecular diagnostics, and inpatient pharmacy.',
      floor: 'Basement & Floor 1',
      link: '/hospital/3d',
    },
  ];

  return (
    <section className="py-20 bg-[#F5F9FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-[#1769E0] text-xs font-bold">
              <Compass className="w-4 h-4 text-[#1769E0]" />
              <span>WAYFINDING & CAMPUS NAVIGATOR</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Intuitive Digital Wayfinding Across the Entire Campus
            </h2>

            <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
              Navigate seamlessly between hospital wings, locate specialized clinics, inspect bed availability, and plan your hospital visit with spatial clarity.
            </p>

            <div className="space-y-3 pt-2">
              {zones.map((zone, idx) => (
                <Link
                  key={idx}
                  href={zone.link}
                  className="block p-4 rounded-xl bg-white border border-[#DCE8F5] hover:border-[#1769E0] hover:shadow-md transition-all group"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-[#1769E0] uppercase tracking-wide">
                      {zone.code} • {zone.floor}
                    </span>
                    <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1769E0] group-hover:translate-x-1 transition-all" />
                  </div>
                  <h4 className="font-bold text-sm text-[#10233F] group-hover:text-[#1769E0] transition-colors">
                    {zone.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">{zone.desc}</p>
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <Link href="/hospital/3d">
                <Button size="lg">
                  <Box className="w-4 h-4 mr-2" />
                  Launch Fullscreen 3D Twin
                </Button>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5]">
                <div className="flex items-center gap-2">
                  <Layers className="w-5 h-5 text-[#1769E0]" />
                  <span className="font-bold text-sm text-[#10233F]">Campus Spatial Directory</span>
                </div>
                <span className="text-xs bg-emerald-50 text-emerald-700 px-2.5 py-0.5 rounded-full font-semibold border border-emerald-200">
                  All Wings Online
                </span>
              </div>

              <div className="my-6 relative rounded-2xl bg-[#0B1F3A] p-6 text-white min-h-[320px] flex flex-col justify-between overflow-hidden">
                <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#2587FF_1px,transparent_1px)] [background-size:20px_20px]" />

                <div className="relative z-10 flex justify-between items-start">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-[#2587FF] tracking-wider">
                      Architectural Blueprint
                    </span>
                    <h4 className="text-lg font-bold">Main Medical Complex</h4>
                  </div>
                  <div className="text-xs text-slate-400">Total Area: 480,000 sq ft</div>
                </div>

                <div className="relative z-10 grid grid-cols-2 gap-3 my-4">
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <div className="text-[11px] font-bold text-[#2587FF]">Floor 4 • CCU / ICU</div>
                    <div className="text-xs text-slate-300 mt-1">12 Isolation Suites</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <div className="text-[11px] font-bold text-emerald-400">Floor 3 • Surgical OTs</div>
                    <div className="text-xs text-slate-300 mt-1">4 Robotic Theatres</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <div className="text-[11px] font-bold text-amber-400">Floor 2 • Cardiology & Inpatient</div>
                    <div className="text-xs text-slate-300 mt-1">24 Recovery Beds</div>
                  </div>
                  <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
                    <div className="text-[11px] font-bold text-red-400">Floor 1 • Emergency & Triage</div>
                    <div className="text-xs text-slate-300 mt-1">24/7 Level-1 Intake</div>
                  </div>
                </div>

                <div className="relative z-10 flex items-center justify-between text-xs text-slate-400 border-t border-slate-700/60 pt-3">
                  <span>GPS: 34.0522° N, 118.2437° W</span>
                  <Link href="/hospital/3d" className="text-[#2587FF] font-bold hover:underline flex items-center gap-1">
                    Explore 3D Walkthrough <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-2 text-center text-xs text-slate-600">
                <div className="p-2 rounded-lg bg-[#F5F9FF] border border-[#DCE8F5]">
                  <span className="font-bold text-[#10233F]">Helipad:</span> Rooftop Active
                </div>
                <div className="p-2 rounded-lg bg-[#F5F9FF] border border-[#DCE8F5]">
                  <span className="font-bold text-[#10233F]">Ambulance:</span> 4 Ready
                </div>
                <div className="p-2 rounded-lg bg-[#F5F9FF] border border-[#DCE8F5]">
                  <span className="font-bold text-[#10233F]">Parking:</span> 350 Spaces
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveHospitalMapSection;
