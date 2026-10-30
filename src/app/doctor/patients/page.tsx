'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Users,
  Search,
  Bed,
  HeartPulse,
  FileText,
  Calendar,
  Eye,
  Filter
} from 'lucide-react';
import { mockPatients } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export default function DoctorPatientsPage() {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const filtered = mockPatients.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      (p.diagnosis || '').toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || p.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout
      role="doctor"
      title="Assigned Patients & Inpatient Census"
      subtitle="Comprehensive clinical records, active bed locations, and treatment history"
    >
      <div className="space-y-6">
        {/* Search & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by patient name, MRN, diagnosis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs text-[#10233F] outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {['All', 'Admitted', 'Discharged'].map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  statusFilter === st
                    ? 'bg-[#1769E0] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-[#F5F9FF]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Patient (MRN)</th>
                  <th className="py-3 px-4">Demographics</th>
                  <th className="py-3 px-4">Diagnosis</th>
                  <th className="py-3 px-4">Ward Location</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Condition</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F5F9FF]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#10233F]">
                      <div>{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.age} yrs • {p.gender} • <span className="font-bold text-rose-600">{p.bloodGroup}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{p.diagnosis}</td>
                    <td className="py-3.5 px-4">
                      {p.roomNumber ? (
                        <span className="flex items-center gap-1 font-medium text-slate-700">
                          <Bed className="w-3.5 h-3.5 text-[#1769E0]" />
                          Room {p.roomNumber} ({p.bedNumber})
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Outpatient</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4">
                      <Badge variant={p.status === 'Admitted' ? 'primary' : 'neutral'}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-emerald-600">
                      {p.condition}
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link href={`/doctor/medical-records?patient=${p.id}`}>
                          <Button size="sm" variant="outline" className="text-xs">
                            <FileText className="w-3.5 h-3.5 mr-1" /> Chart
                          </Button>
                        </Link>
                        <Link href={`/doctor/prescriptions?patient=${p.id}&name=${encodeURIComponent(p.name)}`}>
                          <Button size="sm" className="text-xs">
                            Prescribe
                          </Button>
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
