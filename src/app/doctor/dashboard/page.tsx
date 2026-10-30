'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Users,
  Calendar,
  HeartPulse,
  Clock,
  FileText,
  Activity,
  ArrowRight,
  Stethoscope,
  Video,
  CheckCircle2,
  AlertTriangle,
  Play
} from 'lucide-react';
import { mockAppointments, mockPatients, mockOperatingTheatres } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function DoctorDashboardPage() {
  const todayAppointments = mockAppointments.slice(0, 4);
  const admittedPatients = mockPatients.filter((p) => p.status === 'Admitted').slice(0, 3);
  const activeOT = mockOperatingTheatres.find((ot) => ot.status === 'In Use');

  return (
    <DashboardLayout
      role="doctor"
      title="Physician Clinical Command"
      subtitle="Dr. Sarah Jenkins, MD • Chief of Interventional Cardiology"
    >
      <div className="space-y-6">
        {/* Physician Metric Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Scheduled Today</span>
              <Calendar className="w-4 h-4 text-[#1769E0]" />
            </div>
            <div className="text-3xl font-extrabold text-[#0B1F3A]">12 Patients</div>
            <div className="mt-2 text-xs text-emerald-600 font-semibold">4 Consultations Completed</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Inpatient Ward Rounds</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">8 Inpatients</div>
            <div className="mt-2 text-xs text-slate-500 font-medium">All vitals stable in CCU</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">OT Surgical Schedule</span>
              <HeartPulse className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-3xl font-extrabold text-rose-600">1 Surgery</div>
            <div className="mt-2 text-xs text-rose-600 font-semibold">Angioplasty at 14:00 (OT-1)</div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
              <span className="font-bold uppercase tracking-wider">Pending Diagnostics</span>
              <FileText className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-3xl font-extrabold text-amber-500">3 Reports</div>
            <div className="mt-2 text-xs text-slate-500 font-medium">2 Blood labs, 1 Echo awaiting review</div>
          </div>
        </div>

        {/* 2-Column Clinical Working View */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left: Patient Queue (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5] mb-4">
                <div className="flex items-center gap-2">
                  <Clock className="w-5 h-5 text-[#1769E0]" />
                  <h3 className="font-bold text-base text-[#10233F]">Today's Outpatient Consultation Queue</h3>
                </div>
                <Link href="/doctor/appointments" className="text-xs font-semibold text-[#1769E0] hover:underline">
                  View Full Schedule →
                </Link>
              </div>

              <div className="space-y-3">
                {todayAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#DCE8F5]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#1769E0]/40 transition-all"
                  >
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#10233F]">{apt.patientName}</span>
                        <span className="text-[10px] text-slate-400 font-mono">({apt.patientId})</span>
                        <Badge variant={apt.type === 'Telehealth' ? 'secondary' : 'neutral'} className="text-[10px]">
                          {apt.type}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-500 mt-1">
                        Reason: <span className="font-medium text-slate-700">{apt.reason}</span>
                      </div>
                      <div className="text-xs text-[#1769E0] font-semibold mt-1 flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" /> {apt.date} • {apt.time}
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Link href={`/doctor/medical-records?patient=${apt.patientId}`}>
                        <Button size="sm" className="text-xs">
                          <Play className="w-3 h-3 mr-1" /> Open Encounter
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Operating Theatre & Ward Alerts (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Live OT Broadcast Widget */}
            <div className="p-6 rounded-3xl bg-[#0B1F3A] text-white shadow-xl relative overflow-hidden">
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 mb-3">
                <div className="flex items-center gap-2">
                  <HeartPulse className="w-5 h-5 text-rose-400 animate-pulse" />
                  <h4 className="font-bold text-sm text-white">Live Theatre Telemetry</h4>
                </div>
                <span className="text-[10px] bg-red-500/20 text-red-400 px-2.5 py-0.5 rounded-full font-bold border border-red-500/30">
                  OT-1 ACTIVE
                </span>
              </div>

              <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                Coronary angioplasty in progress. Arterial pressure and cardiac waveform streaming live to telemetry desk.
              </p>

              <div className="grid grid-cols-2 gap-2 mb-4 p-3 rounded-xl bg-slate-900/80 border border-slate-800 text-xs">
                <div>
                  <div className="text-slate-400 text-[10px]">Heart Rate</div>
                  <div className="text-lg font-mono font-bold text-rose-400">76 BPM</div>
                </div>
                <div>
                  <div className="text-slate-400 text-[10px]">Blood Pressure</div>
                  <div className="text-lg font-mono font-bold text-[#2587FF]">124/82</div>
                </div>
              </div>

              <Link href="/hospital/live-ot" className="block">
                <Button size="sm" className="w-full bg-[#1769E0] text-white text-xs">
                  Launch Surgical Telemetry Console →
                </Button>
              </Link>
            </div>

            {/* Admitted Inpatients */}
            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <div className="flex items-center justify-between pb-3 border-b border-[#DCE8F5] mb-3">
                <h4 className="font-bold text-sm text-[#10233F]">Inpatients on Ward</h4>
                <Link href="/doctor/patients" className="text-xs font-semibold text-[#1769E0] hover:underline">
                  All Patients
                </Link>
              </div>

              <div className="space-y-2.5">
                {admittedPatients.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5]/60 text-xs flex justify-between items-center">
                    <div>
                      <div className="font-bold text-[#10233F]">{p.name}</div>
                      <div className="text-[11px] text-slate-500">
                        Bed {p.bedNumber} • Room {p.roomNumber}
                      </div>
                    </div>
                    <Badge variant="success" className="text-[10px]">
                      {p.condition}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
