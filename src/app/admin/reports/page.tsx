'use client';

import React from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  CheckCircle2,
  HeartPulse,
  Activity,
  Award
} from 'lucide-react';
import { mockDepartments } from '@/data/mockData';
import { Button } from '@/components/ui/Button';

export default function AdminReportsPage() {
  const metrics = [
    { label: 'Patient Satisfaction Score', value: '98.6%', change: '+1.2%', positive: true },
    { label: 'Average Length of Stay (ALOS)', value: '3.4 days', change: '-0.3 days', positive: true },
    { label: '30-Day Readmission Rate', value: '2.1%', change: '-0.8%', positive: true },
    { label: 'Surgical Success Index', value: '99.4%', change: '+0.2%', positive: true },
  ];

  return (
    <DashboardLayout
      role="admin"
      title="Clinical Performance & Operational Analytics"
      subtitle="Executive intelligence reports, patient outcome benchmarks, and resource utilization"
    >
      <div className="space-y-6">
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {metrics.map((m, idx) => (
            <div key={idx} className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
              <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
                {m.label}
              </div>
              <div className="text-3xl font-extrabold text-[#0B1F3A]">{m.value}</div>
              <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
                <TrendingUp className="w-3.5 h-3.5" /> {m.change} this quarter
              </div>
            </div>
          ))}
        </div>

        {/* Department Operational Efficiency */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5]">
            <div>
              <h3 className="font-bold text-base text-[#10233F]">
                Department Clinical Output & Inpatient Occupancy
              </h3>
              <p className="text-xs text-slate-500">Utilization index across major campus wings</p>
            </div>
            <Button size="sm" variant="outline">
              <Download className="w-3.5 h-3.5 mr-1.5" /> Export Analytics CSV
            </Button>
          </div>

          <div className="space-y-4">
            {mockDepartments.slice(0, 8).map((dept) => {
              const occRate = Math.round(((dept.totalBeds - dept.availableBeds) / dept.totalBeds) * 100);
              return (
                <div key={dept.id} className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#DCE8F5]/80 space-y-2">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-[#10233F] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
                      {dept.name} ({dept.code})
                    </span>
                    <span className="font-bold text-slate-700">
                      {occRate}% Occupancy ({dept.totalBeds - dept.availableBeds}/{dept.totalBeds} Beds)
                    </span>
                  </div>

                  <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        occRate > 85 ? 'bg-rose-500' : occRate > 70 ? 'bg-amber-500' : 'bg-[#1769E0]'
                      }`}
                      style={{ width: `${occRate}%` }}
                    />
                  </div>

                  <div className="flex justify-between text-[11px] text-slate-500">
                    <span>Floor {dept.floor} • Head: {dept.headDoctor}</span>
                    <span className="text-emerald-600 font-semibold">{dept.activeDoctors} Specialists Active</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
