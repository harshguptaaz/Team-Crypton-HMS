'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Pill,
  CheckCircle2,
  PackageCheck
} from 'lucide-react';
import { mockPrescriptions, mockMedicines } from '@/data/mockData';
import { Prescription } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function StaffPharmacyPage() {
  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);

  const handleDispense = (id: string) => {
    setPrescriptions(
      prescriptions.map((p) => (p.id === id ? { ...p, status: 'Completed' } : p))
    );
  };

  return (
    <DashboardLayout
      role="staff"
      title="Hospital Pharmacy & Drug Dispensary"
      subtitle="Fulfill clinical prescription orders, check drug interactions, and monitor pharmaceutical stock"
    >
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs">
          <h3 className="font-bold text-base text-[#10233F] mb-4">Critical Pharmaceutical Inventory</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {mockMedicines.slice(0, 5).map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5]/70 text-xs">
                <div className="font-bold text-slate-800 truncate">{item.name}</div>
                <div className="text-xl font-bold text-[#10233F] mt-1">
                  {item.stock} <span className="text-[10px] font-normal text-slate-500">{item.unit}</span>
                </div>
                <Badge
                  variant={item.stock < item.minStock ? 'warning' : 'success'}
                  className="mt-2 text-[10px]"
                >
                  {item.stock < item.minStock ? 'Low Stock' : 'In Stock'}
                </Badge>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5] mb-4">
            <h3 className="font-bold text-base text-[#10233F]">Prescription Dispensing Queue</h3>
            <span className="text-xs text-slate-400 font-semibold">
              {prescriptions.filter((p) => p.status === 'Active').length} Orders Awaiting Dispensing
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {prescriptions.map((rx) => (
              <div
                key={rx.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F5F9FF]/60 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center shrink-0">
                    <Pill className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#10233F]">
                        {rx.medicines?.[0]?.name || 'Cardiovascular Rx'}
                      </span>
                      <span className="text-xs font-semibold text-[#1769E0]">
                        {rx.medicines?.[0]?.dosage || 'Oral'}
                      </span>
                      <Badge variant={rx.status === 'Active' ? 'warning' : 'success'}>
                        {rx.status === 'Active' ? 'Awaiting Dispensing' : 'Dispensed'}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Patient: <span className="font-semibold text-slate-800">{rx.patientName}</span> ({rx.patientId}) • Prescribed by {rx.doctorName}
                    </div>
                    <div className="text-[11px] text-slate-400 mt-0.5">
                      {rx.medicines?.[0]?.frequency || 'Daily'} • Course: {rx.medicines?.[0]?.duration || '30 days'}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {rx.status === 'Active' ? (
                    <Button size="sm" onClick={() => handleDispense(rx.id)} className="text-xs">
                      <PackageCheck className="w-3.5 h-3.5 mr-1" /> Dispense Medication
                    </Button>
                  ) : (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Fulfilled
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
