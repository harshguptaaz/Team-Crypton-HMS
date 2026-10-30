'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Users,
  Search,
  Bed,
  Plus,
  UserPlus
} from 'lucide-react';
import { mockPatients } from '@/data/mockData';
import { Patient } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function StaffPatientsPage() {
  const [patients, setPatients] = useState<Patient[]>(mockPatients);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [name, setName] = useState('');
  const [age, setAge] = useState('45');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [diagnosis, setDiagnosis] = useState('');
  const [bedNumber, setBedNumber] = useState('BED-105');

  const handleAdmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newPatient: Patient = {
      id: `PT-${Date.now().toString().slice(-4)}`,
      name,
      age: parseInt(age),
      gender,
      bloodGroup,
      phone: '(555) 234-5678',
      email: `${name.toLowerCase().replace(' ', '.')}@example.com`,
      address: '742 Evergreen Terrace',
      status: 'Admitted',
      bedNumber,
      roomNumber: '105',
      diagnosis,
      admittedDate: new Date().toISOString().split('T')[0],
      assignedDoctorId: 'd-1',
      assignedDoctorName: 'Dr. Sarah Jenkins',
      condition: 'Stable',
    };

    setPatients([newPatient, ...patients]);
    setIsModalOpen(false);
    setName('');
    setDiagnosis('');
  };

  const handleDischarge = (id: string) => {
    setPatients(
      patients.map((p) =>
        p.id === id ? { ...p, status: 'Discharged', bedNumber: undefined, roomNumber: undefined } : p
      )
    );
  };

  const filtered = patients.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase()) ||
      p.diagnosis.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      role="staff"
      title="Inpatient Admissions & Ward Census"
      subtitle="Register new hospital admissions, assign beds, and record discharge statuses"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by patient name, MRN, or diagnosis..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs text-[#10233F] outline-none"
            />
          </div>

          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <UserPlus className="w-4 h-4 mr-1.5" /> Admit New Inpatient
          </Button>
        </div>

        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Patient MRN</th>
                  <th className="py-3 px-4">Demographics</th>
                  <th className="py-3 px-4">Diagnosis</th>
                  <th className="py-3 px-4">Bed Location</th>
                  <th className="py-3 px-4">Admitted Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filtered.map((p) => (
                  <tr key={p.id} className="hover:bg-[#F5F9FF]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#10233F]">
                      <div>{p.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono">{p.id}</div>
                    </td>
                    <td className="py-3.5 px-4">
                      {p.age} yrs • {p.gender} • <span className="font-bold text-rose-600">{p.bloodGroup}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{p.diagnosis}</td>
                    <td className="py-3.5 px-4">
                      {p.bedNumber ? (
                        <span className="font-semibold text-[#1769E0] flex items-center gap-1">
                          <Bed className="w-3.5 h-3.5" /> {p.bedNumber} (Rm {p.roomNumber})
                        </span>
                      ) : (
                        <span className="text-slate-400 italic">Discharged</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-500">{p.admittedDate || 'Today'}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={p.status === 'Admitted' ? 'primary' : 'neutral'}>
                        {p.status}
                      </Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      {p.status === 'Admitted' ? (
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs"
                          onClick={() => handleDischarge(p.id)}
                        >
                          Process Discharge
                        </Button>
                      ) : (
                        <span className="text-xs text-slate-400">Completed</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Inpatient Ward Admission"
        size="md"
      >
        <form onSubmit={handleAdmit} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Patient Full Name</label>
            <Input
              type="text"
              required
              placeholder="e.g. Thomas Wayne"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Age</label>
              <Input
                type="number"
                required
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Gender</label>
              <select
                className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none"
                value={gender}
                onChange={(e: any) => setGender(e.target.value)}
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Blood Group</label>
              <select
                className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none"
                value={bloodGroup}
                onChange={(e) => setBloodGroup(e.target.value)}
              >
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Admission Diagnosis</label>
            <Input
              type="text"
              required
              placeholder="e.g. Acute Coronary Syndrome"
              value={diagnosis}
              onChange={(e) => setDiagnosis(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Assign Bed</label>
            <select
              className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none"
              value={bedNumber}
              onChange={(e) => setBedNumber(e.target.value)}
            >
              <option value="BED-105">BED-105 (Room 105 - Cardiology Ward)</option>
              <option value="BED-106">BED-106 (Room 106 - Step Down)</option>
              <option value="BED-201">BED-201 (Room 201 - Private Suite)</option>
              <option value="BED-ICU-3">BED-ICU-3 (Intensive Care Unit)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Complete Admission</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
