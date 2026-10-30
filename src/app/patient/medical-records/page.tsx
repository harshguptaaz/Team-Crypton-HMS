'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  FileText,
  Download,
  Eye,
  Filter,
  Search,
  CheckCircle2,
  Calendar,
  User,
  Activity,
  FileCheck
} from 'lucide-react';
import { mockMedicalRecords, mockLabTests } from '@/data/mockData';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export default function PatientMedicalRecordsPage() {
  const [selectedRecord, setSelectedRecord] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'all' | 'consultations' | 'labs'>('all');

  return (
    <DashboardLayout
      role="patient"
      title="Electronic Medical Records (EMR)"
      subtitle="Access verified consultation notes, pathology tests, and imaging diagnostics"
    >
      <div className="space-y-6">
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 bg-white p-2 rounded-2xl border border-[#DCE8F5] shadow-xs max-w-fit">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'all'
                ? 'bg-[#1769E0] text-white shadow-xs'
                : 'text-slate-600 hover:bg-[#F5F9FF]'
            }`}
          >
            All Health Records
          </button>
          <button
            onClick={() => setActiveTab('consultations')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'consultations'
                ? 'bg-[#1769E0] text-white shadow-xs'
                : 'text-slate-600 hover:bg-[#F5F9FF]'
            }`}
          >
            Consultation Summaries
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeTab === 'labs'
                ? 'bg-[#1769E0] text-white shadow-xs'
                : 'text-slate-600 hover:bg-[#F5F9FF]'
            }`}
          >
            Diagnostic Lab Tests
          </button>
        </div>

        {/* Records Listing */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5]">
            <h3 className="font-bold text-base text-[#10233F]">Verified Health History</h3>
            <span className="text-xs text-slate-400 font-semibold">
              Patient MRN: PT-1002 (John Doe)
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {/* Consultation Records */}
            {(activeTab === 'all' || activeTab === 'consultations') &&
              mockMedicalRecords.map((rec) => (
                <div
                  key={rec.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F5F9FF]/60 px-3 rounded-xl transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center shrink-0">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#10233F]">{rec.diagnosis}</span>
                        <Badge variant="primary" className="text-[10px]">
                          Consultation
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Attending: {rec.doctorName} • Department: {rec.department}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Treatment: {rec.treatmentPlan}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs text-slate-400 mr-2">{rec.date}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => setSelectedRecord(rec)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> View Note
                    </Button>
                  </div>
                </div>
              ))}

            {/* Diagnostic Lab Tests */}
            {(activeTab === 'all' || activeTab === 'labs') &&
              mockLabTests.map((t) => (
                <div
                  key={t.id}
                  className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F5F9FF]/60 px-3 rounded-xl transition-colors"
                >
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                      <FileCheck className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-[#10233F]">{t.testName}</span>
                        <Badge variant={t.status === 'Completed' ? 'success' : 'warning'}>
                          {t.status}
                        </Badge>
                      </div>
                      <div className="text-xs text-slate-500 mt-0.5">
                        Category: {t.category} • Ordered by {t.orderedBy}
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">
                        Result: <span className="font-semibold text-emerald-700">{t.result || 'Pending evaluation'}</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 self-end sm:self-center">
                    <span className="text-xs text-slate-400 mr-2">{t.requestedDate}</span>
                    <Button
                      size="sm"
                      variant="outline"
                      className="text-xs"
                      onClick={() => setSelectedRecord(t)}
                    >
                      <Eye className="w-3.5 h-3.5 mr-1" /> View Lab Result
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>

      {/* Record Inspection Modal */}
      {selectedRecord && (
        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title="Clinical Documentation Record"
          size="md"
        >
          <div className="space-y-4 text-xs">
            <div className="bg-[#F5F9FF] p-4 rounded-xl border border-[#DCE8F5] space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500">Record ID:</span>
                <span className="font-mono font-bold text-slate-800">{selectedRecord.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Patient:</span>
                <span className="font-bold text-slate-800">John Doe (PT-1002)</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">Date Logged:</span>
                <span className="font-bold text-slate-800">
                  {selectedRecord.date || selectedRecord.requestedDate}
                </span>
              </div>
            </div>

            <div>
              <div className="font-bold text-slate-700 mb-1">Clinical Findings & Diagnosis</div>
              <p className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-slate-700 leading-relaxed">
                {selectedRecord.notes || selectedRecord.treatmentPlan || selectedRecord.result || 'No additional comments.'}
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button variant="outline" onClick={() => setSelectedRecord(null)}>
                Close
              </Button>
              <Button onClick={() => alert('Medical document downloaded')}>
                <Download className="w-3.5 h-3.5 mr-1" /> Download PDF
              </Button>
            </div>
          </div>
        </Modal>
      )}
    </DashboardLayout>
  );
}
