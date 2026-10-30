'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Users,
  Search,
  Bed,
  FileText,
  Mail,
  Phone,
  ShieldCheck
} from 'lucide-react';
import { mockPatients } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AdminPatientsPage() {
  const [search, setSearch] = useState('');

  const filtered = mockPatients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      (p.diagnosis || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      role="admin"
      title="Master Patient Index (MPI)"
      subtitle="Centralized patient identity records, admission states, and healthcare coverage"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search patients by name, MRN, diagnosis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs text-[#10233F] outline-none"
            />
          </div>

          <span className="text-xs text-slate-400 font-semibold">
            {filtered.length} Patients in Database
          </span>
        </div>

        {/* Patient Table */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Patient (MRN)</th>
                  <th className="py-3 px-4">Demographics</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Primary Diagnosis</th>
                  <th className="py-3 px-4">Inpatient Location</th>
                  <th className="py-3 px-4">Census State</th>
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
                    <td className="py-3.5 px-4 text-slate-500">
                      <div>{p.phone}</div>
                      <div className="text-[10px] text-slate-400">{p.email}</div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{p.diagnosis}</td>
                    <td className="py-3.5 px-4">
                      {p.bedNumber ? (
                        <span className="font-semibold text-[#1769E0]">
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
