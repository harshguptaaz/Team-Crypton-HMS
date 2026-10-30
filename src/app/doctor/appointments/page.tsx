'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Calendar,
  Clock,
  User,
  CheckCircle2,
  Video,
  FileEdit,
  Filter,
  Search
} from 'lucide-react';
import { mockAppointments } from '@/data/mockData';
import { Appointment } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import Link from 'next/link';

export default function DoctorAppointmentsPage() {
  const [appointments, setAppointments] = useState<Appointment[]>(mockAppointments);
  const [filter, setFilter] = useState('All');

  const handleMarkComplete = (id: string) => {
    setAppointments(
      appointments.map((a) => (a.id === id ? { ...a, status: 'Completed' } : a))
    );
  };

  const filtered = appointments.filter((a) => {
    if (filter === 'All') return true;
    return a.status === filter;
  });

  return (
    <DashboardLayout
      role="doctor"
      title="Outpatient Appointment Queue"
      subtitle="Review scheduled patient visits, start telemedicine sessions, and update encounter status"
    >
      <div className="space-y-6">
        {/* Filter bar */}
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="flex items-center gap-2">
            {['All', 'Scheduled', 'Completed'].map((st) => (
              <button
                key={st}
                onClick={() => setFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all ${
                  filter === st
                    ? 'bg-[#1769E0] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-[#F5F9FF]'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          <span className="text-xs text-slate-400 font-semibold">
            {filtered.length} Appointments Listed
          </span>
        </div>

        {/* Appointments List */}
        <div className="space-y-3">
          {filtered.map((apt) => (
            <div
              key={apt.id}
              className="bg-white rounded-2xl border border-[#DCE8F5] p-5 shadow-xs hover:border-[#1769E0]/40 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center font-bold text-xs shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-sm text-[#10233F]">{apt.patientName}</h4>
                    <span className="text-xs text-slate-400 font-mono">({apt.patientId})</span>
                    <Badge variant={apt.status === 'Scheduled' ? 'primary' : 'success'}>
                      {apt.status}
                    </Badge>
                    <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-semibold">
                      {apt.type}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 mt-1">
                    Chief Complaint: <span className="font-semibold text-slate-700">{apt.reason}</span>
                  </div>
                  <div className="text-xs text-[#1769E0] font-semibold mt-1 flex items-center gap-3">
                    <span>{apt.date}</span>
                    <span>•</span>
                    <span>{apt.time}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-center">
                {apt.status === 'Scheduled' && (
                  <>
                    {apt.type === 'Telehealth' ? (
                      <Button size="sm">
                        <Video className="w-3.5 h-3.5 mr-1" /> Connect Video
                      </Button>
                    ) : null}
                    <Link href={`/doctor/prescriptions?patient=${apt.patientId}&name=${encodeURIComponent(apt.patientName)}`}>
                      <Button size="sm" variant="outline">
                        <FileEdit className="w-3.5 h-3.5 mr-1" /> Prescribe Rx
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant="secondary"
                      onClick={() => handleMarkComplete(apt.id)}
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 mr-1 text-emerald-600" /> Complete
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
