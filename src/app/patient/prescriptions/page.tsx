'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Pill,
  Clock,
  User,
  RotateCw,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Sparkles
} from 'lucide-react';
import { mockPrescriptions } from '@/data/mockData';
import { Prescription } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function PatientPrescriptionsPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [refillSuccess, setRefillSuccess] = useState<string | null>(null);

  const handleRefillRequest = (id: string, name: string) => {
    setRefillSuccess(`Refill request for ${name} dispatched to the hospital dispensary.`);
    setTimeout(() => setRefillSuccess(null), 4000);
  };

  return (
    <DashboardLayout
      role="patient"
      title="My Prescriptions & Medications"
      subtitle="Active pharmaceutical regimens, dosage schedules, and dispensary refill requests"
    >
      <div className="space-y-6">
        {refillSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
            <span>{refillSuccess}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prescriptions.map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl border border-[#DCE8F5] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center">
                    <Pill className="w-5 h-5" />
                  </div>
                  <Badge variant={p.status === 'Active' ? 'success' : 'neutral'}>
                    {p.status}
                  </Badge>
                </div>

                <h3 className="font-bold text-base text-[#10233F]">{p.medication}</h3>
                <div className="text-xs font-semibold text-[#1769E0] mt-0.5">{p.dosage}</div>

                <div className="mt-4 p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5]/60 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Frequency:</span>
                    <span className="font-bold text-slate-800">{p.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-bold text-slate-800">{p.duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Prescribing Doctor:</span>
                    <span className="font-bold text-slate-800">{p.doctorName}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-500 mt-3 italic">
                  "{p.instructions || 'Take with water after meals.'}"
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="text-[11px] text-slate-400">Issued: {p.issuedDate}</span>
                {p.status === 'Active' && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-xs"
                    onClick={() => handleRefillRequest(p.id, p.medication)}
                  >
                    <RotateCw className="w-3.5 h-3.5 mr-1" /> Request Refill
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
}
