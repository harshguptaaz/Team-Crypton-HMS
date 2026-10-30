'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Download,
  TrendingUp
} from 'lucide-react';
import { mockBills } from '@/data/mockData';
import { Bill } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

export default function AdminBillingPage() {
  const [bills] = useState<Bill[]>(mockBills);
  const [filter, setFilter] = useState('All');

  const totalCollected = bills
    .filter((b) => b.status === 'Paid')
    .reduce((acc, b) => acc + b.total, 0);

  const totalPending = bills
    .filter((b) => b.status === 'Pending')
    .reduce((acc, b) => acc + b.total, 0);

  const filtered = bills.filter((b) => {
    if (filter === 'All') return true;
    return b.status === filter;
  });

  return (
    <DashboardLayout
      role="admin"
      title="Revenue Management & Billing Ledger"
      subtitle="Financial accounts receivable, claims processing, and clinical department billing"
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Total Invoiced Revenue
            </div>
            <div className="text-3xl font-extrabold text-[#0B1F3A]">
              ${(totalCollected + totalPending).toFixed(2)}
            </div>
            <span className="text-[11px] text-emerald-600 font-semibold flex items-center gap-1 mt-1">
              <TrendingUp className="w-3.5 h-3.5" /> +12.4% MoM
            </span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Collected / Settled
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">
              ${totalCollected.toFixed(2)}
            </div>
            <span className="text-[11px] text-slate-500">Payments cleared to bank</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-bold uppercase tracking-wider mb-1">
              Pending Claims & Invoices
            </div>
            <div className="text-3xl font-extrabold text-amber-500">
              ${totalPending.toFixed(2)}
            </div>
            <span className="text-[11px] text-slate-500">Awaiting payer clearance</span>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs overflow-hidden">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-4 border-b border-[#DCE8F5] mb-4">
            <h3 className="font-bold text-base text-[#10233F]">Hospital Invoices Ledger</h3>

            <div className="flex items-center gap-2">
              {['All', 'Paid', 'Pending'].map((st) => (
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
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Invoice ID</th>
                  <th className="py-3 px-4">Patient Name</th>
                  <th className="py-3 px-4">Gross Total</th>
                  <th className="py-3 px-4">Insurance Paid</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-[#F5F9FF]/60 transition-colors">
                    <td className="py-3.5 px-4 font-mono font-bold text-[#10233F]">{b.id}</td>
                    <td className="py-3.5 px-4 font-medium">{b.patientName}</td>
                    <td className="py-3.5 px-4 font-bold text-[#10233F]">${b.total.toFixed(2)}</td>
                    <td className="py-3.5 px-4 text-emerald-600 font-semibold">
                      -${(b.insuranceCovered || 0).toFixed(2)}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{b.date}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={b.status === 'Paid' ? 'success' : 'warning'}>
                        {b.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <Button size="sm" variant="outline" className="text-xs">
                        <Download className="w-3.5 h-3.5 mr-1" /> PDF
                      </Button>
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
