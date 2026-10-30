'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  FileText,
  Plus,
  Search,
  CheckCircle2,
  Calendar,
  User,
  Activity,
  Stethoscope
} from 'lucide-react';
import { mockMedicalRecords, mockPatients } from '@/data/mockData';
import { MedicalRecord } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

function DoctorMedicalRecordsContent() {
  const searchParams = useSearchParams();
  const initialPatientId = searchParams.get('patient') || mockPatients[0].id;

  const [records, setRecords] = useState<MedicalRecord[]>(mockMedicalRecords);
  const [selectedPatientId, setSelectedPatientId] = useState(initialPatientId);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Note State
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentPlan, setTreatmentPlan] = useState('');
  const [notes, setNotes] = useState('');

  const currentPatient = mockPatients.find((p) => p.id === selectedPatientId) || mockPatients[0];

  const handleAddEncounter = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecord: MedicalRecord = {
      id: `mr-${Date.now()}`,
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      doctorId: 'd-1',
      doctorName: 'Dr. Sarah Jenkins',
      department: 'Cardiology',
      date: new Date().toISOString().split('T')[0],
      diagnosis,
      treatmentPlan,
      notes,
    };

    setRecords([newRecord, ...records]);
    setIsModalOpen(false);
    setDiagnosis('');
    setTreatmentPlan('');
    setNotes('');
  };

  const patientRecords = records.filter((r) => r.patientId === currentPatient.id);

  return (
    <DashboardLayout
      role="doctor"
      title="Clinical Notes & SOAP Encounters"
      subtitle="Document patient encounters, clinical diagnoses, and order diagnostic regimens"
    >
      <div className="space-y-6">
        {/* Patient Selector Strip */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-slate-500 shrink-0">Selected Patient:</span>
            <select
              className="px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs font-bold text-[#10233F] outline-none"
              value={selectedPatientId}
              onChange={(e) => setSelectedPatientId(e.target.value)}
            >
              {mockPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — {p.diagnosis}
                </option>
              ))}
            </select>
          </div>

          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Log Clinical Encounter
          </Button>
        </div>

        {/* Patient Medical Banner */}
        <div className="p-5 rounded-2xl bg-white border border-[#DCE8F5] shadow-xs flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center font-bold text-sm">
              {currentPatient.name.charAt(0)}
            </div>
            <div>
              <h3 className="font-bold text-base text-[#10233F]">{currentPatient.name}</h3>
              <div className="text-xs text-slate-500">
                MRN: {currentPatient.id} • {currentPatient.age} yrs • {currentPatient.gender} • Blood Group: <span className="font-bold text-rose-600">{currentPatient.bloodGroup}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <div className="px-3 py-1.5 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl">
              <span className="text-slate-400 font-semibold">Primary Diagnosis: </span>
              <span className="font-bold text-[#10233F]">{currentPatient.diagnosis}</span>
            </div>
            <Badge variant={currentPatient.status === 'Admitted' ? 'primary' : 'neutral'}>
              {currentPatient.status}
            </Badge>
          </div>
        </div>

        {/* Existing Encounter Notes */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs space-y-4">
          <h4 className="font-bold text-base text-[#10233F] pb-3 border-b border-[#DCE8F5]">
            Past Clinical Encounters & Progress Notes
          </h4>

          {patientRecords.length === 0 ? (
            <div className="text-center py-8 text-slate-400 text-xs">
              No historical encounters found for this patient. Click "Log Clinical Encounter" to create one.
            </div>
          ) : (
            <div className="space-y-4">
              {patientRecords.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-[#F5F9FF] border border-[#DCE8F5]/80 space-y-2 text-xs">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-sm text-[#10233F] flex items-center gap-2">
                      <Stethoscope className="w-4 h-4 text-[#1769E0]" />
                      {r.diagnosis}
                    </span>
                    <span className="text-slate-400 font-mono text-[11px]">{r.date}</span>
                  </div>

                  <div className="text-slate-600">
                    <span className="font-bold text-slate-700">Attending: </span>
                    {r.doctorName} ({r.department})
                  </div>

                  <div className="text-slate-600">
                    <span className="font-bold text-slate-700">Treatment Plan: </span>
                    {r.treatmentPlan}
                  </div>

                  {r.notes && (
                    <div className="p-3 bg-white rounded-xl border border-slate-200 mt-2 text-slate-700 leading-relaxed italic">
                      "{r.notes}"
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Add Encounter Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Document Clinical Encounter"
        size="md"
      >
        <form onSubmit={handleAddEncounter} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Assessment / Diagnosis
            </label>
            <Input
              type="text"
              required
              placeholder="e.g. Coronary Artery Disease with stable angina"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              Treatment Plan / Orders
            </label>
            <Input
              type="text"
              required
              placeholder="e.g. Schedule coronary angiography, titrate beta-blocker"
              value={treatmentPlan}
              onChange={(e) => setTreatmentPlan(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">
              SOAP Progress Notes (Subjective, Objective, Clinical Remarks)
            </label>
            <textarea
              rows={4}
              required
              className="w-full p-3 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none focus:border-[#1769E0] text-xs text-[#10233F]"
              placeholder="Patient reports no chest pain at rest. BP 120/78, heart sounds normal S1/S2..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Sign & Save Note</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

export default function DoctorMedicalRecordsPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout role="doctor" title="Electronic Medical Records">
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-4 border-[#1769E0] border-t-transparent rounded-full animate-spin" />
          </div>
        </DashboardLayout>
      }
    >
      <DoctorMedicalRecordsContent />
    </Suspense>
  );
}
