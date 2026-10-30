'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Search,
  Star,
  Calendar,
  Clock,
  Award,
  Stethoscope,
  Filter
} from 'lucide-react';
import { mockDoctors, mockDepartments } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function PatientDoctorsPage() {
  const [search, setSearch] = useState('');
  const [deptFilter, setDeptFilter] = useState('All');

  const filtered = mockDoctors.filter((doc) => {
    const matchesSearch =
      doc.name.toLowerCase().includes(search.toLowerCase()) ||
      (doc.specialization || doc.specialty || '').toLowerCase().includes(search.toLowerCase());
    const matchesDept = deptFilter === 'All' || doc.department === deptFilter || doc.departmentName === deptFilter;
    return matchesSearch && matchesDept;
  });

  return (
    <DashboardLayout
      role="patient"
      title="Medical Staff & Specialist Directory"
      subtitle="Browse hospital physicians, view credentials, and schedule consultations"
    >
      <div className="space-y-6">
        {/* Search & Filter Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by doctor name or specialty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs text-[#10233F] outline-none"
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 px-2 shrink-0">Specialty:</span>
            {['All', 'Cardiology', 'Neurology', 'Orthopedics', 'Emergency', 'Pediatrics'].map((dept) => (
              <button
                key={dept}
                onClick={() => setDeptFilter(dept)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  deptFilter === dept
                    ? 'bg-[#1769E0] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-[#F5F9FF]'
                }`}
              >
                {dept}
              </button>
            ))}
          </div>
        </div>

        {/* Doctor Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((doc) => (
            <div
              key={doc.id}
              className="bg-white rounded-2xl border border-[#DCE8F5] overflow-hidden shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-44 bg-slate-100">
                  <img
                    src={doc.image}
                    alt={doc.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-md px-2 py-0.5 rounded-full flex items-center gap-1 text-xs font-bold text-amber-600 shadow-xs">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span>{doc.rating}</span>
                  </div>
                  <div className="absolute bottom-3 left-3 bg-[#0B1F3A]/90 backdrop-blur-md px-2.5 py-0.5 rounded-md text-[10px] font-semibold text-white">
                    {doc.department}
                  </div>
                </div>

                <div className="p-4 space-y-2">
                  <h3 className="font-bold text-base text-[#10233F]">{doc.name}</h3>
                  <div className="text-xs text-[#1769E0] font-semibold">{doc.specialization}</div>
                  <p className="text-[11px] text-slate-500">
                    {doc.qualifications} • {doc.experienceYears} years practice
                  </p>

                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs text-slate-600">
                    <span className="text-emerald-600 font-semibold flex items-center gap-1 text-[11px]">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      Next Free: Today
                    </span>
                    <span className="font-bold text-[#10233F]">${doc.consultationFee}</span>
                  </div>
                </div>
              </div>

              <div className="p-4 pt-0">
                <Link href={`/patient/appointments?doctor=${encodeURIComponent(doc.id)}`}>
                  <Button size="sm" className="w-full text-xs">
                    <Calendar className="w-3.5 h-3.5 mr-1.5" /> Book Appointment
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
