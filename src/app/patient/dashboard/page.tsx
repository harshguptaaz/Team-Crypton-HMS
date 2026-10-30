'use client';

import React from 'react';
import Link from 'next/link';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Calendar,
  HeartPulse,
  Activity,
  FileText,
  Pill,
  CreditCard,
  Plus,
  ArrowRight,
  Clock,
  CheckCircle2,
  Stethoscope,
  Video
} from 'lucide-react';
import { mockAppointments, mockPrescriptions, mockLabTests } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function PatientDashboardPage() {
  const upcomingAppointments = mockAppointments.filter((a) => a.status === 'Scheduled').slice(0, 2);
  const activePrescriptions = mockPrescriptions.filter((p) => p.status === 'Active').slice(0, 3);
  const recentTests = mockLabTests.slice(0, 2);

  return (
    <DashboardLayout
      role="patient"
      title="Patient Health Portal"
      subtitle="Welcome back, John Doe • MRN: #PT-1002"
    >
      <div className="space-y-6">
        {/* Vitals Summary Strip */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Resting Heart Rate</span>
              <HeartPulse className="w-4 h-4 text-rose-500" />
            </div>
            <div className="text-2xl font-bold text-[#10233F]">
              72 <span className="text-xs font-normal text-slate-400">BPM</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">● Normal Range</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Blood Pressure</span>
              <Activity className="w-4 h-4 text-[#1769E0]" />
            </div>
            <div className="text-2xl font-bold text-[#10233F]">
              118/78 <span className="text-xs font-normal text-slate-400">mmHg</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">● Optimal</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Blood Glucose</span>
              <Activity className="w-4 h-4 text-amber-500" />
            </div>
            <div className="text-2xl font-bold text-[#10233F]">
              94 <span className="text-xs font-normal text-slate-400">mg/dL</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">● Fasting Normal</span>
          </div>

          <div className="p-4 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Body Mass Index</span>
              <Activity className="w-4 h-4 text-emerald-500" />
            </div>
            <div className="text-2xl font-bold text-[#10233F]">
              22.4 <span className="text-xs font-normal text-slate-400">kg/m²</span>
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold">● Healthy Weight</span>
          </div>
        </div>

        {/* Main 2-Column Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Appointments & Quick Actions (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Upcoming Appointments Card */}
            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5] mb-4">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-[#1769E0]" />
                  <h3 className="font-bold text-base text-[#10233F]">Upcoming Consultations</h3>
                </div>
                <Link href="/patient/appointments">
                  <Button size="sm" variant="outline">
                    <Plus className="w-3.5 h-3.5 mr-1" /> Book New
                  </Button>
                </Link>
              </div>

              <div className="space-y-3">
                {upcomingAppointments.map((apt) => (
                  <div
                    key={apt.id}
                    className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#DCE8F5]/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:border-[#1769E0]/40 transition-all"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-100 text-[#1769E0] flex items-center justify-center font-bold text-xs shrink-0">
                        <Stethoscope className="w-5 h-5" />
                      </div>
                      <div>
                        <h4 className="font-bold text-sm text-[#10233F]">{apt.doctorName}</h4>
                        <div className="text-xs text-slate-500 font-medium">
                          {apt.department} • {apt.type}
                        </div>
                        <div className="text-xs text-[#1769E0] font-semibold mt-1 flex items-center gap-1.5">
                          <Clock className="w-3.5 h-3.5" />
                          <span>{apt.date} at {apt.time}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 self-end sm:self-center">
                      <Button size="sm" className="text-xs">
                        <Video className="w-3.5 h-3.5 mr-1" /> Join Telehealth
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Diagnostic Reports */}
            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5] mb-4">
                <div className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-bold text-base text-[#10233F]">Diagnostic & Lab Reports</h3>
                </div>
                <Link href="/patient/medical-records" className="text-xs font-semibold text-[#1769E0] hover:underline">
                  View All
                </Link>
              </div>

              <div className="space-y-2">
                {recentTests.map((t) => (
                  <div
                    key={t.id}
                    className="p-3 rounded-xl border border-slate-100 hover:border-[#DCE8F5] hover:bg-[#F5F9FF] transition-all flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-[#10233F]">{t.testName}</div>
                      <div className="text-[11px] text-slate-500">
                        {t.category} • Completed on {t.completedDate || t.requestedDate}
                      </div>
                    </div>
                    <Badge variant={t.status === 'Completed' ? 'success' : 'warning'}>
                      {t.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Prescriptions & Billing Summary (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Active Prescriptions */}
            <div className="p-6 rounded-3xl bg-white border border-[#DCE8F5] shadow-xs">
              <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5] mb-4">
                <div className="flex items-center gap-2">
                  <Pill className="w-5 h-5 text-amber-500" />
                  <h3 className="font-bold text-base text-[#10233F]">Active Medications</h3>
                </div>
                <Link href="/patient/prescriptions" className="text-xs font-semibold text-[#1769E0] hover:underline">
                  View Regimen
                </Link>
              </div>

              <div className="space-y-3">
                {activePrescriptions.map((p) => (
                  <div key={p.id} className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5]/60 text-xs">
                    <div className="font-bold text-slate-800">{p.medication}</div>
                    <div className="text-[11px] text-slate-500 mt-0.5">
                      {p.dosage} • {p.frequency} ({p.duration})
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1">Prescribed by {p.doctorName}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-[#0B1F3A] to-[#1769E0] text-white shadow-xl">
              <h4 className="font-bold text-base mb-1">Need Immediate Assistance?</h4>
              <p className="text-xs text-slate-300 mb-4">
                Consult with our 24/7 tele-triage nurse or explore hospital facilities in 3D.
              </p>
              <div className="space-y-2">
                <Link href="/hospital/3d" className="block">
                  <Button variant="secondary" size="sm" className="w-full bg-white/10 hover:bg-white/20 text-white border-white/20 text-xs">
                    Inspect Hospital Campus in 3D
                  </Button>
                </Link>
                <Link href="/patient/appointments" className="block">
                  <Button size="sm" className="w-full bg-[#2587FF] text-white text-xs">
                    Book In-Person Consultation
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
