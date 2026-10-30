'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Bed,
  CheckCircle2,
  AlertTriangle,
  Wrench,
  Search,
  Filter,
  User,
  ShieldCheck
} from 'lucide-react';
import { mockBeds } from '@/data/mockData';
import { Bed as BedType } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function StaffBedsPage() {
  const [beds, setBeds] = useState<BedType[]>(mockBeds);
  const [filterStatus, setFilterStatus] = useState('All');
  const [filterDept, setFilterDept] = useState('All');

  const handleStatusChange = (id: string, newStatus: 'Available' | 'Occupied' | 'Maintenance') => {
    setBeds(
      beds.map((b) =>
        b.id === id
          ? {
              ...b,
              status: newStatus,
              patientId: newStatus === 'Available' ? undefined : b.patientId,
              patientName: newStatus === 'Available' ? undefined : b.patientName,
            }
          : b
      )
    );
  };

  const filtered = beds.filter((b) => {
    const matchesStatus = filterStatus === 'All' || b.status === filterStatus;
    const matchesDept = filterDept === 'All' || b.department === filterDept;
    return matchesStatus && matchesDept;
  });

  const availableCount = beds.filter((b) => b.status === 'Available').length;
  const occupiedCount = beds.filter((b) => b.status === 'Occupied').length;
  const maintenanceCount = beds.filter((b) => b.status === 'Maintenance').length;

  return (
    <DashboardLayout
      role="staff"
      title="Hospital Bed Matrix & Ward Occupancy"
      subtitle="Real-time inpatient bed tracking, sanitary turnaround, and department allocations"
    >
      <div className="space-y-6">
        {/* Census Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Total Beds
            </div>
            <div className="text-3xl font-extrabold text-[#0B1F3A]">{beds.length}</div>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Available & Clean
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">{availableCount}</div>
            <span className="text-[11px] text-emerald-600 font-medium">Ready for admissions</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Occupied Inpatients
            </div>
            <div className="text-3xl font-extrabold text-[#1769E0]">{occupiedCount}</div>
            <span className="text-[11px] text-slate-500">
              {Math.round((occupiedCount / beds.length) * 100)}% Occupancy
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Sanitation / Maintenance
            </div>
            <div className="text-3xl font-extrabold text-amber-500">{maintenanceCount}</div>
            <span className="text-[11px] text-slate-500">Sterilization in progress</span>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="flex items-center gap-2">
            {['All', 'Available', 'Occupied', 'Maintenance'].map((st) => (
              <button
                key={st}
                onClick={() => setFilterStatus(st)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filterStatus === st
                    ? 'bg-[#1769E0] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-[#F5F9FF]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-400">Department:</span>
            <select
              className="px-3 py-1.5 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs font-semibold text-[#10233F] outline-none"
              value={filterDept}
              onChange={(e) => setFilterDept(e.target.value)}
            >
              <option value="All">All Departments</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Emergency">Emergency</option>
              <option value="Intensive Care Unit (ICU)">Intensive Care (ICU)</option>
              <option value="Orthopedics">Orthopedics</option>
            </select>
          </div>
        </div>

        {/* Beds Matrix Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((b) => (
            <div
              key={b.id}
              className={`p-5 rounded-2xl border transition-all flex flex-col justify-between ${
                b.status === 'Available'
                  ? 'bg-white border-emerald-200 hover:border-emerald-400 shadow-xs'
                  : b.status === 'Maintenance'
                  ? 'bg-amber-50/40 border-amber-200'
                  : 'bg-white border-[#DCE8F5] shadow-xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-[#1769E0]" />
                    <span className="font-bold text-base text-[#10233F]">{b.bedNumber}</span>
                  </div>
                  <Badge
                    variant={
                      b.status === 'Available'
                        ? 'success'
                        : b.status === 'Occupied'
                        ? 'primary'
                        : 'warning'
                    }
                  >
                    {b.status}
                  </Badge>
                </div>

                <div className="text-xs text-slate-500 space-y-1 mb-4">
                  <div>Department: <span className="font-semibold text-slate-800">{b.department}</span></div>
                  <div>Room: <span className="font-semibold text-slate-800">{b.roomNumber}</span> (Floor {b.floor})</div>
                  {b.patientName && (
                    <div className="pt-2 border-t border-slate-100 font-bold text-[#10233F] flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-[#1769E0]" />
                      <span>{b.patientName}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status Action Buttons */}
              <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-1 text-[11px]">
                {b.status !== 'Available' && (
                  <button
                    onClick={() => handleStatusChange(b.id, 'Available')}
                    className="px-2 py-1 bg-emerald-50 hover:bg-emerald-100 text-emerald-700 rounded-lg font-bold transition-colors"
                  >
                    Mark Clean
                  </button>
                )}
                {b.status !== 'Maintenance' && (
                  <button
                    onClick={() => handleStatusChange(b.id, 'Maintenance')}
                    className="px-2 py-1 bg-amber-50 hover:bg-amber-100 text-amber-700 rounded-lg font-bold transition-colors"
                  >
                    Maintenance
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
