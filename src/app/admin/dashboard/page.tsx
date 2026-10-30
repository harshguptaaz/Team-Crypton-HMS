'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  DollarSign,
  Users,
  Bed,
  Building2,
  Stethoscope,
  Activity,
  HeartPulse,
  Box,
  TrendingUp,
  ShieldCheck,
  ArrowRight,
  Clock
} from 'lucide-react';
import { mockDepartments, mockHospitalStatus, mockBills, mockDoctors } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AdminDashboardPage() {
  const totalRevenue = mockBills.reduce((acc, b) => acc + b.total, 0);

  return (
    <DashboardLayout
      role="admin"
      title="Hospital Executive Command & Operations"
      subtitle="Campus-wide governance, financial throughput, clinical workforce, and digital twin monitoring"
    >
      <div className="space-y-6">
        {/* Executive KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Gross Clinical Revenue</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#0B1F3A]">
              ${(totalRevenue * 12).toLocaleString()}
            </div>
            <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5" /> +14.2% vs last quarter
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Campus Inpatient Census</span>
              <Bed className="w-4 h-4 text-[#1769E0]" />
            </div>
            <div className="text-3xl font-extrabold text-[#1769E0]">
              {mockHospitalStatus.totalBeds - mockHospitalStatus.availableBeds} <span className="text-sm text-slate-500 font-normal">/ {mockHospitalStatus.totalBeds} Beds</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 font-medium">
              {mockHospitalStatus.availableBeds} beds available hospital-wide
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Physicians On Duty</span>
              <Stethoscope className="w-4 h-4 text-indigo-600" />
            </div>
            <div className="text-3xl font-extrabold text-indigo-600">
              {mockDoctors.length} Active
            </div>
            <div className="mt-2 text-xs text-slate-500 font-medium">
              Across 19 clinical faculties
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Emergency Readiness</span>
              <HeartPulse className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">Level-1 Normal</div>
            <div className="mt-2 text-xs text-slate-500 font-medium">
              {mockHospitalStatus.emergencyWaitTimeMinutes}m avg triage wait
            </div>
          </div>
        </div>

        {/* 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Department Capacities (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5] mb-4">
                <div className="flex items-center gap-2">
                  <Building2 className="w-5 h-5 text-[#1769E0]" />
                  <h3 className="font-bold text-base text-[#10233F]">Department Capacity Allocation</h3>
                </div>
                <Link href="/admin/departments" className="text-xs font-semibold text-[#1769E0] hover:underline">
                  Manage Wings →
                </Link>
              </div>

              <div className="space-y-4">
                {mockDepartments.slice(0, 6).map((dept) => {
                  const occ = Math.round(((dept.totalBeds - dept.availableBeds) / dept.totalBeds) * 100);
                  return (
                    <div key={dept.id} className="space-y-1">
                      <div className="flex justify-between items-center text-xs">
                        <span className="font-bold text-[#10233F] flex items-center gap-2">
                          <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: dept.color }} />
                          {dept.name}
                        </span>
                        <span className="text-slate-500">
                          {dept.totalBeds - dept.availableBeds} / {dept.totalBeds} Beds ({occ}%)
                        </span>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                        <div
                          className={`h-full rounded-full ${
                            occ > 85 ? 'bg-rose-500' : occ > 70 ? 'bg-amber-500' : 'bg-[#1769E0]'
                          }`}
                          style={{ width: `${occ}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Column: 3D Twin & Admin Actions (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* 3D Campus Quick Link Card */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#1769E0] text-white shadow-xl">
              <div className="flex items-center gap-2 mb-2 text-sky-200 text-xs font-bold uppercase">
                <Box className="w-4 h-4" />
                <span>Spatial Digital Campus Twin</span>
              </div>
              <h4 className="font-bold text-lg mb-2">Interactive 3D Hospital Control</h4>
              <p className="text-xs text-slate-200 mb-4 leading-relaxed">
                Inspect live spatial occupancy, helicopter landings, and ambulance ingress points in the interactive 3D model.
              </p>
              <Link href="/hospital/3d" className="block">
                <Button size="sm" className="w-full bg-white text-[#0B1F3A] hover:bg-slate-100 font-bold text-xs">
                  Launch 3D Campus Control Center
                </Button>
              </Link>
            </div>

            {/* Quick Admin Actions */}
            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <h4 className="font-bold text-sm text-[#10233F] mb-3">Governance Portals</h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Link href="/admin/doctors" className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] hover:border-[#1769E0] transition-colors block">
                  <div className="font-bold text-slate-800">Physicians</div>
                  <div className="text-[10px] text-slate-500">Manage doctors & schedules</div>
                </Link>
                <Link href="/admin/billing" className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] hover:border-[#1769E0] transition-colors block">
                  <div className="font-bold text-slate-800">Billing</div>
                  <div className="text-[10px] text-slate-500">Invoices & revenue streams</div>
                </Link>
                <Link href="/admin/staff" className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] hover:border-[#1769E0] transition-colors block">
                  <div className="font-bold text-slate-800">Staff</div>
                  <div className="text-[10px] text-slate-500">Duty nursing & technicians</div>
                </Link>
                <Link href="/admin/reports" className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] hover:border-[#1769E0] transition-colors block">
                  <div className="font-bold text-slate-800">Analytics</div>
                  <div className="text-[10px] text-slate-500">Clinical outcome reports</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
