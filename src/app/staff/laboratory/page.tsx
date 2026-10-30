'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  FlaskConical,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { mockLabTests } from '@/data/mockData';
import { LabTest } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';

export default function StaffLaboratoryPage() {
  const [tests, setTests] = useState<LabTest[]>(mockLabTests);
  const [selectedTest, setSelectedTest] = useState<LabTest | null>(null);
  const [resultInput, setResultInput] = useState('');

  const handleCompleteTest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTest) return;

    setTests(
      tests.map((t) =>
        t.id === selectedTest.id
          ? {
              ...t,
              status: 'Completed',
              result: resultInput,
              completedDate: new Date().toISOString().split('T')[0],
            }
          : t
      )
    );
    setSelectedTest(null);
    setResultInput('');
  };

  return (
    <DashboardLayout
      role="staff"
      title="Pathology & Diagnostic Laboratory Desk"
      subtitle="Specimen intake, biochemistry processing, and diagnostic result validation"
    >
      <div className="space-y-6">
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-[#DCE8F5] mb-4">
            <div>
              <h3 className="font-bold text-base text-[#10233F]">Diagnostic Orders Queue</h3>
              <p className="text-xs text-slate-500">Hematology, Molecular Pathology, and Cardiac Panels</p>
            </div>
            <span className="text-xs font-semibold text-slate-400">
              {tests.length} Total Laboratory Requisitions
            </span>
          </div>

          <div className="divide-y divide-slate-100">
            {tests.map((t) => (
              <div
                key={t.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-[#F5F9FF]/60 px-3 rounded-xl transition-colors"
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
                    <FlaskConical className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm text-[#10233F]">{t.testName}</span>
                      <span className="text-xs font-semibold text-purple-600">({t.category})</span>
                      <Badge variant={t.status === 'Completed' ? 'success' : 'warning'}>
                        {t.status}
                      </Badge>
                    </div>
                    <div className="text-xs text-slate-500 mt-0.5">
                      Patient: <span className="font-semibold text-slate-800">{t.patientName}</span> ({t.patientId}) • Ordered by {t.doctorName}
                    </div>
                    {t.result ? (
                      <div className="text-xs font-semibold text-emerald-700 mt-1">
                        Result: {t.result} (Verified on {t.completedDate || t.orderedDate})
                      </div>
                    ) : (
                      <div className="text-[11px] text-amber-600 font-medium mt-1">
                        Requisitioned: {t.orderedDate} • Pending Analysis
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  {t.status !== 'Completed' ? (
                    <Button
                      size="sm"
                      onClick={() => {
                        setSelectedTest(t);
                        setResultInput('');
                      }}
                      className="text-xs"
                    >
                      <FileCheck className="w-3.5 h-3.5 mr-1" /> Enter Lab Findings
                    </Button>
                  ) : (
                    <span className="text-xs text-emerald-600 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-4 h-4" /> Finalized
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedTest && (
        <Modal
          isOpen={!!selectedTest}
          onClose={() => setSelectedTest(null)}
          title={`Record Findings: ${selectedTest.testName}`}
          size="md"
        >
          <form onSubmit={handleCompleteTest} className="space-y-4 text-xs">
            <div className="p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5] space-y-1">
              <div><span className="text-slate-500">Patient:</span> <span className="font-bold text-[#10233F]">{selectedTest.patientName}</span></div>
              <div><span className="text-slate-500">Requisition:</span> <span className="font-mono text-slate-700">{selectedTest.id}</span></div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Quantitative / Qualitative Diagnostic Findings
              </label>
              <textarea
                rows={3}
                required
                className="w-full p-3 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none focus:border-[#1769E0] text-xs text-[#10233F]"
                placeholder="e.g. Troponin-I: 0.02 ng/mL (Normal < 0.04 ng/mL). CK-MB: 2.1 ng/mL. No acute ischemic marker elevation."
                value={resultInput}
                onChange={(e) => setResultInput(e.target.value)}
              />
            </div>

            <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
              <Button type="button" variant="outline" onClick={() => setSelectedTest(null)}>
                Cancel
              </Button>
              <Button type="submit">Verify & Publish Result</Button>
            </div>
          </form>
        </Modal>
      )}
    </DashboardLayout>
  );
}
