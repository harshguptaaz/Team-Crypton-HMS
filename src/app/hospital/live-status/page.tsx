'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { EmergencyFloatingButton } from '@/components/common/EmergencyFloatingButton';
import { mockHospitalStatus, mockDepartments } from '@/data/mockData';
import {
  Activity,
  Bed,
  Clock,
  HeartPulse,
  Droplet,
  Wind,
  ShieldCheck,
  Truck,
  Building2,
  AlertCircle,
  Box,
  CheckCircle2,
  RefreshCw
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function LiveStatusPage() {
  const [filterFloor, setFilterFloor] = useState<string>('all');

  const filteredDepts = mockDepartments.filter((d) => {
    if (filterFloor === 'all') return true;
    return d.floor.toString() === filterFloor;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FF]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#DCE8F5]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#1769E0] text-xs font-bold mb-2 border border-[#DCE8F5]">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>LIVE HOSPITAL OPERATIONS COMMAND</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Hospital Vitals & Capacity Status
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Synchronized real-time operational telemetry across bed allocations, emergency intake, and clinical supply reserves.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <Link href="/hospital/3d">
              <Button variant="outline" size="sm">
                <Box className="w-4 h-4 mr-1.5 text-[#1769E0]" />
                Inspect in 3D Campus
              </Button>
            </Link>
          </div>
        </div>

        {/* Global Key Readiness Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Emergency Wait Time</span>
              <Clock className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-[#0B1F3A]">
              {mockHospitalStatus.emergencyWaitTimeMinutes} <span className="text-sm font-normal text-slate-500">mins</span>
            </div>
            <div className="mt-2 text-xs text-emerald-600 font-semibold flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Fast-Track Triage Nominal
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Campus Inpatient Beds</span>
              <Bed className="w-4 h-4 text-[#1769E0]" />
            </div>
            <div className="text-3xl font-extrabold text-[#1769E0]">
              {mockHospitalStatus.availableBeds} <span className="text-sm font-normal text-slate-500">/ {mockHospitalStatus.totalBeds} Available</span>
            </div>
            <div className="w-full bg-slate-100 rounded-full h-1.5 mt-2.5 overflow-hidden">
              <div
                className="bg-[#1769E0] h-full rounded-full"
                style={{
                  width: `${((mockHospitalStatus.totalBeds - mockHospitalStatus.availableBeds) / mockHospitalStatus.totalBeds) * 100}%`,
                }}
              />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Operating Theatres</span>
              <HeartPulse className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-3xl font-extrabold text-rose-600">
              3 <span className="text-sm font-normal text-slate-500">/ 4 Active In Surgery</span>
            </div>
            <div className="mt-2 text-xs text-amber-600 font-semibold flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Next OT Available in ~45m
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Critical Infrastructure</span>
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">
              99.8% <span className="text-sm font-normal text-slate-500">Nominal</span>
            </div>
            <div className="mt-2 text-xs text-slate-500 flex items-center gap-3">
              <span>O₂: 99.8%</span>
              <span>Blood Reserves: Adequate</span>
            </div>
          </div>
        </div>

        {/* Department Bed Allocations Table */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-sm mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#DCE8F5]">
            <div>
              <h3 className="text-lg font-bold text-[#10233F]">
                Department Capacity & Bed Availability
              </h3>
              <p className="text-xs text-slate-500">
                Live census across all surgical, medical, and intensive care units
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold text-slate-500">Floor:</span>
              {(['all', '1', '2', '3', '4'] as const).map((fl) => (
                <button
                  key={fl}
                  onClick={() => setFilterFloor(fl)}
                  className={`px-3 py-1 rounded-xl text-xs font-semibold transition-all ${
                    filterFloor === fl
                      ? 'bg-[#1769E0] text-white shadow-xs'
                      : 'bg-[#F5F9FF] text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {fl === 'all' ? 'All Floors' : `Floor ${fl}`}
                </button>
              ))}
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto mt-4">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Location</th>
                  <th className="py-3 px-4">Head Doctor</th>
                  <th className="py-3 px-4">Total Beds</th>
                  <th className="py-3 px-4">Available</th>
                  <th className="py-3 px-4">Occupancy</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filteredDepts.map((d) => {
                  const rate = Math.round(((d.totalBeds - d.availableBeds) / d.totalBeds) * 100);
                  return (
                    <tr key={d.id} className="hover:bg-[#F5F9FF]/60 transition-colors">
                      <td className="py-3.5 px-4 font-bold text-[#10233F] flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                        <span>{d.name}</span>
                        <span className="text-[10px] text-slate-400 font-normal">({d.code})</span>
                      </td>
                      <td className="py-3.5 px-4">Floor {d.floor}</td>
                      <td className="py-3.5 px-4">{d.headDoctor || 'Dr. Specialist'}</td>
                      <td className="py-3.5 px-4 font-semibold">{d.totalBeds}</td>
                      <td className="py-3.5 px-4 font-bold text-emerald-600">{d.availableBeds} Free</td>
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-2">
                          <div className="w-20 bg-slate-100 rounded-full h-1.5 overflow-hidden">
                            <div
                              className={`h-full rounded-full ${
                                rate > 90 ? 'bg-rose-500' : rate > 75 ? 'bg-amber-500' : 'bg-emerald-500'
                              }`}
                              style={{ width: `${rate}%` }}
                            />
                          </div>
                          <span className="font-semibold text-[11px]">{rate}%</span>
                        </div>
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={d.status === 'Active' ? 'success' : 'warning'}>
                          {d.status}
                        </Badge>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <EmergencyFloatingButton />
      <Footer />
    </div>
  );
}
