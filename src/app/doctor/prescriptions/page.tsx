'use client';

import React, { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Pill,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  User,
  AlertCircle
} from 'lucide-react';
import { mockPrescriptions, mockPatients } from '@/data/mockData';
import { Prescription } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

function DoctorPrescriptionsContent() {
  const searchParams = useSearchParams();
  const initialPatientId = searchParams.get('patient') || mockPatients[0].id;
  const initialPatientName = searchParams.get('name') || mockPatients[0].name;

  const [prescriptions, setPrescriptions] = useState<Prescription[]>(mockPrescriptions);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Prescription State
  const [patientId, setPatientId] = useState(initialPatientId);
  const [medication, setMedication] = useState('');
  const [dosage, setDosage] = useState('');
  const [frequency, setFrequency] = useState('Once daily');
  const [duration, setDuration] = useState('30 days');
  const [instructions, setInstructions] = useState('');

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const patient = mockPatients.find((p) => p.id === patientId);

    const newRx: Prescription = {
      id: `rx-${Date.now()}`,
      patientId,
      patientName: patient?.name || 'Selected Patient',
      doctorId: 'd-1',
      doctorName: 'Dr. Sarah Jenkins',
      medication,
      dosage,
      frequency,
      duration,
      instructions,
      issuedDate: new Date().toISOString().split('T')[0],
      status: 'Active',
    };

    setPrescriptions([newRx, ...prescriptions]);
    setIsModalOpen(false);
    setMedication('');
    setDosage('');
    setInstructions('');
  };

  return (
    <DashboardLayout
      role="doctor"
      title="Electronic Prescriptions & Dispensary Orders"
      subtitle="Issue e-prescriptions with automatic drug-interaction checking and pharmacy routing"
    >
      <div className="space-y-6">
        <div className="flex items-center justify-between bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div>
            <h3 className="font-bold text-sm text-[#10233F]">Issued Prescription Records</h3>
            <p className="text-xs text-slate-500">Total {prescriptions.length} prescriptions issued this month</p>
          </div>
          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Issue New Prescription
          </Button>
        </div>

        {/* Prescription Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {prescriptions.map((rx) => (
            <div
              key={rx.id}
              className="bg-white rounded-2xl border border-[#DCE8F5] p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1769E0] flex items-center justify-center">
                    <Pill className="w-5 h-5" />
                  </div>
                  <Badge variant={rx.status === 'Active' ? 'success' : 'neutral'}>
                    {rx.status}
                  </Badge>
                </div>

                <h3 className="font-bold text-base text-[#10233F]">{rx.medication}</h3>
                <div className="text-xs font-semibold text-[#1769E0] mt-0.5">{rx.dosage}</div>

                <div className="mt-4 p-3 rounded-xl bg-[#F5F9FF] border border-[#DCE8F5]/60 text-xs space-y-1.5">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Patient:</span>
                    <span className="font-bold text-slate-800">{rx.patientName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Frequency:</span>
                    <span className="font-bold text-slate-800">{rx.frequency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Duration:</span>
                    <span className="font-bold text-slate-800">{rx.duration}</span>
                  </div>
                </div>

                {rx.instructions && (
                  <p className="text-xs text-slate-500 mt-3 italic">
                    "{rx.instructions}"
                  </p>
                )}
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                <span>Rx ID: {rx.id}</span>
                <span>{rx.issuedDate}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Rx Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Issue Electronic Prescription"
        size="md"
      >
        <form onSubmit={handleCreate} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Select Patient</label>
            <select
              className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none focus:border-[#1769E0]"
              value={patientId}
              onChange={(e) => setPatientId(e.target.value)}
            >
              {mockPatients.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} ({p.id}) — {p.diagnosis}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Medication Name</label>
              <Input
                type="text"
                required
                placeholder="e.g. Atorvastatin"
                value={medication}
                onChange={(e) => setMedication(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Dosage</label>
              <Input
                type="text"
                required
                placeholder="e.g. 20mg Oral Tablet"
                value={dosage}
                onChange={(e) => setDosage(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Frequency</label>
              <select
                className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none focus:border-[#1769E0]"
                value={frequency}
                onChange={(e) => setFrequency(e.target.value)}
              >
                <option value="Once daily">Once daily (OD)</option>
                <option value="Twice daily">Twice daily (BID)</option>
                <option value="Three times daily">Three times daily (TID)</option>
                <option value="As needed for pain">As needed (PRN)</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Course Duration</label>
              <Input
                type="text"
                required
                placeholder="e.g. 30 days"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Clinical Instructions</label>
            <Input
              type="text"
              placeholder="e.g. Take at night after meals. Monitor lipid profile after 6 weeks."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Sign & Send to Pharmacy</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}

export default function DoctorPrescriptionsPage() {
  return (
    <Suspense
      fallback={
        <DashboardLayout role="doctor" title="Digital Prescriptions & RX">
          <div className="flex items-center justify-center p-12">
            <div className="w-8 h-8 border-4 border-[#1769E0] border-t-transparent rounded-full animate-spin" />
          </div>
        </DashboardLayout>
      }
    >
      <DoctorPrescriptionsContent />
    </Suspense>
  );
}
