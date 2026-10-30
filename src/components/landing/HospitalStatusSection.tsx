'use client';

import React from 'react';
import Link from 'next/link';
import {
  Activity,
  Bed,
  HeartPulse,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Droplet,
  Wind
} from 'lucide-react';
import { mockHospitalStatus } from '@/data/mockData';
import { Button } from '@/components/ui/Button';

export const HospitalStatusSection: React.FC = () => {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#0B1F3A] rounded-3xl p-8 lg:p-12 text-white relative overflow-hidden shadow-2xl">
          <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#2587FF_1px,transparent_1px)] [background-size:16px_16px] pointer-events-none" />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10 mb-10 pb-8 border-b border-slate-800">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/20 text-[#2587FF] text-xs font-bold mb-3 border border-blue-500/30">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>LIVE TELEMETRY STREAM</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                Hospital Command & Readiness Console
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Real-time simulated biometrics, bed availability, and emergency department queue.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Link href="/hospital/live-status">
                <Button variant="primary" size="md">
                  <Activity className="w-4 h-4 mr-2" />
                  Open Live Console
                </Button>
              </Link>
              <Link href="/hospital/live-ot">
                <Button variant="secondary" size="md" className="bg-slate-800 text-white hover:bg-slate-700 border-slate-700">
                  <HeartPulse className="w-4 h-4 mr-2 text-red-400" />
                  Live OT
                </Button>
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
            <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Emergency Triage Wait</span>
                <Clock className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {mockHospitalStatus.emergencyWaitTimeMinutes} <span className="text-sm font-semibold text-slate-400">mins</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                <CheckCircle2 className="w-3.5 h-3.5" /> Fast track intake active
              </div>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Bed Occupancy</span>
                <Bed className="w-4 h-4 text-[#2587FF]" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                {Math.round(((mockHospitalStatus.totalBeds - mockHospitalStatus.availableBeds) / mockHospitalStatus.totalBeds) * 100)}%
              </div>
              <div className="w-full bg-slate-700 rounded-full h-1.5 mt-3 overflow-hidden">
                <div className="bg-[#2587FF] h-full rounded-full w-[74%]" />
              </div>
              <div className="mt-2 text-[11px] text-slate-400">
                {mockHospitalStatus.availableBeds} beds available
              </div>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Operating Theatres</span>
                <HeartPulse className="w-4 h-4 text-rose-400" />
              </div>
              <div className="text-3xl font-extrabold text-white">
                4 <span className="text-sm font-semibold text-slate-400">/ 12 Active In Surgery</span>
              </div>
              <div className="mt-3 flex items-center gap-1.5 text-xs text-amber-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                OT-01 & OT-02 in active surgery
              </div>
            </div>

            <div className="bg-slate-800/60 rounded-2xl p-5 border border-slate-700/60 backdrop-blur-sm">
              <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                <span>Critical Infrastructure</span>
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-3xl font-extrabold text-emerald-400">
                100% <span className="text-sm font-semibold text-slate-400">Nominal</span>
              </div>
              <div className="mt-3 flex items-center gap-3 text-[11px] text-slate-300">
                <span className="flex items-center gap-1"><Wind className="w-3 h-3 text-[#2587FF]" /> O₂ 99.8%</span>
                <span className="flex items-center gap-1"><Droplet className="w-3 h-3 text-red-400" /> Blood: Optimal</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HospitalStatusSection;
