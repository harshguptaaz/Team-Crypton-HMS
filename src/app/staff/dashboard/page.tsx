'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Users,
  Bed,
  Pill,
  FlaskConical,
  AlertTriangle
} from 'lucide-react';
import { mockBeds, mockPrescriptions, mockLabTests } from '@/data/mockData';
import { Button } from '@/components/ui/Button';

export default function StaffDashboardPage() {
  const availableBeds = mockBeds.filter((b) => b.status === 'Available');
  const occupiedBeds = mockBeds.filter((b) => b.status === 'Occupied');
  const pendingLabs = mockLabTests.filter((t) => t.status === 'Pending' || t.status === 'In Progress');
  const activeRx = mockPrescriptions.filter((p) => p.status === 'Active').slice(0, 3);

  return (
    <DashboardLayout
      role="staff"
      title="Nursing & Ward Command Station"
      subtitle="Maria Santos, RN • Charge Nurse • Cardiology & Acute Inpatient Wing"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Ward Inpatients</span>
              <Users className="w-4 h-4 text-[#1769E0]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0B1F3A]">{occupiedBeds.length} Patients</div>
            <div className="mt-2 text-xs text-slate-500">Cardiology & Step-Down Unit</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Available Beds</span>
              <Bed className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">{availableBeds.length} Ready</div>
            <div className="mt-2 text-xs text-emerald-600 font-semibold">Ready for Admissions</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Pending Diagnostics</span>
              <FlaskConical className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-amber-500">{pendingLabs.length} Orders</div>
            <div className="mt-2 text-xs text-slate-500">Specimens in processing</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Medication Dispensary</span>
              <Pill className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-3xl font-extrabold text-rose-500">8 Due</div>
            <div className="mt-2 text-xs text-slate-500 font-semibold">14:00 Medication Round</div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5] mb-4">
                <div className="flex items-center gap-2">
                  <Bed className="w-5 h-5 text-[#1769E0]" />
                  <h3 className="font-bold text-base text-[#10233F]">Active Ward Bed Allocation</h3>
                </div>
                <Link href="/staff/beds">
                  <Button size="sm" variant="outline">
                    Manage Beds →
                  </Button>
                </Link>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {mockBeds.slice(0, 9).map((b) => (
                  <div
                    key={b.id}
                    className={`p-3.5 rounded-2xl border transition-all ${
                      b.status === 'Available'
                        ? 'bg-emerald-50/50 border-emerald-200'
                        : b.status === 'Maintenance'
                        ? 'bg-amber-50/50 border-amber-200'
                        : 'bg-white border-[#DCE8F5]'
                    }`}
                  >
                    <div className="flex justify-between items-center mb-1">
                      <span className="font-bold text-sm text-[#10233F]">{b.bedNumber}</span>
                      <span
                        className={`w-2 h-2 rounded-full ${
                          b.status === 'Available'
                            ? 'bg-emerald-500'
                            : b.status === 'Maintenance'
                            ? 'bg-amber-500'
                            : 'bg-[#1769E0]'
                        }`}
                      />
                    </div>
                    <div className="text-xs text-slate-500 font-medium">Ward {b.ward}</div>
                    <div className="text-[11px] text-slate-700 font-semibold truncate mt-1">
                      {b.patientName || 'Vacant / Ready'}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <h4 className="font-bold text-sm text-[#10233F] mb-3">Staff Quick Workflows</h4>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <Link href="/staff/patients" className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] text-center hover:border-[#1769E0] transition-colors block">
                  <Users className="w-5 h-5 text-[#1769E0] mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-slate-800">Inpatients</span>
                </Link>
                <Link href="/staff/beds" className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] text-center hover:border-[#1769E0] transition-colors block">
                  <Bed className="w-5 h-5 text-emerald-600 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-slate-800">Assign Bed</span>
                </Link>
                <Link href="/staff/pharmacy" className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] text-center hover:border-[#1769E0] transition-colors block">
                  <Pill className="w-5 h-5 text-amber-500 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-slate-800">Dispensary</span>
                </Link>
                <Link href="/staff/laboratory" className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] text-center hover:border-[#1769E0] transition-colors block">
                  <FlaskConical className="w-5 h-5 text-purple-600 mx-auto mb-1.5" />
                  <span className="text-xs font-bold text-slate-800">Lab Orders</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5] mb-3">
                <h4 className="font-bold text-sm text-[#10233F]">Active Patient Medications</h4>
                <Link href="/staff/pharmacy" className="text-xs font-semibold text-[#1769E0] hover:underline">
                  Dispensary
                </Link>
              </div>

              <div className="space-y-3">
                {activeRx.map((rx) => (
                  <div key={rx.id} className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5]/60 text-xs">
                    <div className="flex justify-between items-start">
                      <span className="font-bold text-slate-800">
                        {rx.medicines?.[0]?.name || 'Cardiovascular Rx'}
                      </span>
                      <span className="text-[10px] bg-blue-100 text-[#1769E0] font-bold px-2 py-0.5 rounded-full">
                        {rx.medicines?.[0]?.dosage || 'Oral'}
                      </span>
                    </div>
                    <div className="text-[11px] text-slate-500 mt-1">Patient: {rx.patientName}</div>
                    <div className="text-[10px] text-slate-400 mt-0.5">{rx.medicines?.[0]?.frequency || 'Daily'}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-5 rounded-2xl bg-red-50 border border-red-200 text-xs text-red-900 space-y-2">
              <div className="flex items-center gap-2 font-bold text-red-700">
                <AlertTriangle className="w-4 h-4 text-red-600" />
                <span>Rapid Response Team Standby</span>
              </div>
              <p className="text-red-700 text-[11px] leading-relaxed">
                Emergency Trauma Bay 3 is currently active. Ensure Floor 1 corridors are cleared for immediate trolley transit.
              </p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
