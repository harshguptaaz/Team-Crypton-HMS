'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  CreditCard,
  CheckCircle2,
  Clock,
  Download,
  ShieldCheck,
  DollarSign,
  AlertCircle
} from 'lucide-react';
import { mockBills } from '@/data/mockData';
import { Bill } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export default function PatientPaymentsPage() {
  const [bills, setBills] = useState<Bill[]>(mockBills);
  const [payingBill, setPayingBill] = useState<Bill | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handlePay = () => {
    if (!payingBill) return;
    setBills(
      bills.map((b) => (b.id === payingBill.id ? { ...b, status: 'Paid' } : b))
    );
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
      setPayingBill(null);
    }, 2000);
  };

  const totalOutstanding = bills
    .filter((b) => b.status === 'Pending')
    .reduce((acc, b) => acc + (b.total - (b.insuranceCovered || 0)), 0);

  return (
    <DashboardLayout
      role="patient"
      title="Invoices & Insurance Billing"
      subtitle="Track consultation fees, laboratory invoices, and insurance coverage claims"
    >
      <div className="space-y-6">
        {/* Billing Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
              Outstanding Patient Balance
            </div>
            <div className="text-3xl font-extrabold text-[#0B1F3A]">
              ${totalOutstanding.toFixed(2)}
            </div>
            <span className="text-[11px] text-amber-600 font-medium">Due within 30 days</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
              Insurance Co-Pay Status
            </div>
            <div className="text-3xl font-extrabold text-emerald-600">80% Covered</div>
            <span className="text-[11px] text-slate-500">BlueCross Silver PPO Connected</span>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs">
            <div className="text-xs text-slate-500 font-semibold uppercase tracking-wider mb-1">
              Payment Method on File
            </div>
            <div className="text-xl font-bold text-[#10233F] mt-1 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-[#1769E0]" />
              <span>•••• 4242</span>
            </div>
            <span className="text-[11px] text-slate-400">Expires 09/28</span>
          </div>
        </div>

        {/* Invoices List */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5] mb-4">
            <h3 className="font-bold text-base text-[#10233F]">Statement Invoices</h3>
            <span className="text-xs text-slate-400 font-semibold">Account: #PT-1002</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Invoice ID</th>
                  <th className="py-3 px-4">Services Rendered</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Total Amount</th>
                  <th className="py-3 px-4">Insurance Paid</th>
                  <th className="py-3 px-4">Patient Balance</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {bills.map((bill) => {
                  const patientShare = bill.total - (bill.insuranceCovered || 0);
                  return (
                    <tr key={bill.id} className="hover:bg-[#F5F9FF]/60 transition-colors">
                      <td className="py-3.5 px-4 font-mono font-bold text-[#10233F]">{bill.id}</td>
                      <td className="py-3.5 px-4 font-medium">{bill.department} Consultation</td>
                      <td className="py-3.5 px-4 text-slate-500">{bill.date}</td>
                      <td className="py-3.5 px-4 font-semibold">${bill.total.toFixed(2)}</td>
                      <td className="py-3.5 px-4 text-emerald-600 font-semibold">
                        -${(bill.insuranceCovered || 0).toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4 font-bold text-[#10233F]">
                        ${patientShare.toFixed(2)}
                      </td>
                      <td className="py-3.5 px-4">
                        <Badge variant={bill.status === 'Paid' ? 'success' : 'warning'}>
                          {bill.status}
                        </Badge>
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        {bill.status === 'Pending' ? (
                          <Button size="sm" onClick={() => setPayingBill(bill)} className="text-xs">
                            Pay ${patientShare.toFixed(2)}
                          </Button>
                        ) : (
                          <Button size="sm" variant="outline" className="text-xs">
                            <Download className="w-3.5 h-3.5 mr-1" /> Receipt
                          </Button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Pay Modal */}
      {payingBill && (
        <Modal
          isOpen={!!payingBill}
          onClose={() => setPayingBill(null)}
          title="Settle Patient Balance"
          size="sm"
        >
          <div className="space-y-4 text-xs">
            {isSuccess ? (
              <div className="text-center py-6">
                <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto mb-2 animate-bounce" />
                <h4 className="font-bold text-base text-slate-800">Payment Processed!</h4>
                <p className="text-slate-500 mt-1">Receipt emailed to john.doe@example.com</p>
              </div>
            ) : (
              <>
                <div className="p-4 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] space-y-2">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Invoice:</span>
                    <span className="font-bold text-slate-800">{payingBill.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Gross Fee:</span>
                    <span>${payingBill.total.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-emerald-600">
                    <span>Insurance Paid:</span>
                    <span>-${(payingBill.insuranceCovered || 0).toFixed(2)}</span>
                  </div>
                  <div className="border-t border-slate-200 pt-2 flex justify-between font-bold text-sm text-[#10233F]">
                    <span>Amount Due:</span>
                    <span>${(payingBill.total - (payingBill.insuranceCovered || 0)).toFixed(2)}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-slate-50 border border-slate-200 rounded-xl">
                  <CreditCard className="w-5 h-5 text-[#1769E0]" />
                  <span className="font-semibold text-slate-700">Visa ending in 4242</span>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <Button variant="outline" onClick={() => setPayingBill(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handlePay}>Confirm & Pay Now</Button>
                </div>
              </>
            )}
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
