'use client';

import React from 'react';
import {
  Users,
  Bed,
  Stethoscope,
  HeartPulse,
  Timer
} from 'lucide-react';
import { mockHospitalStatus } from '@/data/mockData';

export const HospitalStatsSection: React.FC = () => {
  const stats = [
    {
      label: 'Specialist Physicians',
      value: '250+',
      detail: 'Across 19 clinical faculties',
      icon: <Stethoscope className="w-5 h-5 text-[#1769E0]" />,
    },
    {
      label: 'Campus Inpatient Beds',
      value: `${mockHospitalStatus.totalBeds}`,
      detail: `${mockHospitalStatus.availableBeds} beds currently available`,
      icon: <Bed className="w-5 h-5 text-emerald-600" />,
    },
    {
      label: 'Surgeries This Year',
      value: '3,800+',
      detail: '99.4% successful outcome rate',
      icon: <HeartPulse className="w-5 h-5 text-rose-500" />,
    },
    {
      label: 'Emergency Response',
      value: '< 4 min',
      detail: 'Average campus triage dispatch',
      icon: <Timer className="w-5 h-5 text-amber-500" />,
    },
  ];

  return (
    <section className="py-12 bg-white border-y border-[#DCE8F5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-[#F5F9FF] border border-[#DCE8F5]/80 hover:border-[#1769E0]/40 transition-all hover:shadow-sm group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                  {stat.label}
                </span>
                <div className="p-2 rounded-xl bg-white shadow-xs group-hover:scale-110 transition-transform">
                  {stat.icon}
                </div>
              </div>
              <div className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
                {stat.value}
              </div>
              <p className="text-xs text-slate-500 mt-1 font-medium">{stat.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HospitalStatsSection;
