'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Users,
  Search,
  Plus,
  ShieldCheck,
  Building,
  Mail,
  Phone
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  shift: string;
  status: 'On Duty' | 'Off Duty';
  contact: string;
}

const initialStaff: StaffMember[] = [
  { id: 'st-1', name: 'Maria Santos, RN', role: 'Charge Nurse', department: 'Cardiology Ward', shift: 'Day Shift (07:00 - 15:30)', status: 'On Duty', contact: '(555) 234-1101' },
  { id: 'st-2', name: 'James Wilson, BSN', role: 'ICU Staff Nurse', department: 'Intensive Care Unit (ICU)', shift: 'Day Shift (07:00 - 15:30)', status: 'On Duty', contact: '(555) 234-1102' },
  { id: 'st-3', name: 'Elena Rostova, PharmD', role: 'Clinical Pharmacist', department: 'Pharmacy Dispensary', shift: 'Evening Shift (15:00 - 23:00)', status: 'Off Duty', contact: '(555) 234-1103' },
  { id: 'st-4', name: 'David Kim, MLS', role: 'Senior Lab Technologist', department: 'Pathology Laboratory', shift: 'Day Shift (08:00 - 16:30)', status: 'On Duty', contact: '(555) 234-1104' },
  { id: 'st-5', name: 'Rachel Green, RN', role: 'Triage Nurse', department: 'Emergency & Trauma', shift: 'Night Shift (23:00 - 07:00)', status: 'Off Duty', contact: '(555) 234-1105' },
];

export default function AdminStaffPage() {
  const [staff, setStaff] = useState<StaffMember[]>(initialStaff);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New staff state
  const [name, setName] = useState('');
  const [role, setRole] = useState('Staff Nurse');
  const [department, setDepartment] = useState('Cardiology Ward');
  const [shift, setShift] = useState('Day Shift (07:00 - 15:30)');

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    const newMember: StaffMember = {
      id: `st-${Date.now()}`,
      name,
      role,
      department,
      shift,
      status: 'On Duty',
      contact: '(555) 234-9999',
    };
    setStaff([...staff, newMember]);
    setIsModalOpen(false);
    setName('');
  };

  const filtered = staff.filter(
    (s) =>
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase()) ||
      s.role.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      role="admin"
      title="Nursing & Operational Staff Directory"
      subtitle="Shift scheduling, clinical stations, and staff allocations across hospital wards"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search staff members by name, role, ward..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs text-[#10233F] outline-none"
            />
          </div>

          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Register Staff Member
          </Button>
        </div>

        {/* Staff Table */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Staff Member</th>
                  <th className="py-3 px-4">Clinical Station</th>
                  <th className="py-3 px-4">Role Designation</th>
                  <th className="py-3 px-4">Scheduled Shift</th>
                  <th className="py-3 px-4">Contact Extension</th>
                  <th className="py-3 px-4">Duty Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filtered.map((s) => (
                  <tr key={s.id} className="hover:bg-[#F5F9FF]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#10233F]">{s.name}</td>
                    <td className="py-3.5 px-4 font-medium text-slate-800">{s.department}</td>
                    <td className="py-3.5 px-4">{s.role}</td>
                    <td className="py-3.5 px-4 text-slate-500">{s.shift}</td>
                    <td className="py-3.5 px-4 font-mono">{s.contact}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={s.status === 'On Duty' ? 'success' : 'neutral'}>
                        {s.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Staff Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Register Nursing / Operational Staff"
        size="md"
      >
        <form onSubmit={handleAdd} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Staff Member Name</label>
            <Input
              type="text"
              required
              placeholder="e.g. Katherine Pierce, RN"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Role Designation</label>
              <select
                className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none"
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value="Staff Nurse">Staff Nurse</option>
                <option value="Charge Nurse">Charge Nurse</option>
                <option value="Clinical Pharmacist">Clinical Pharmacist</option>
                <option value="Medical Lab Technologist">Medical Lab Technologist</option>
                <option value="Radiology Technician">Radiology Technician</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
              <select
                className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Cardiology Ward">Cardiology Ward</option>
                <option value="Emergency & Trauma">Emergency & Trauma</option>
                <option value="Intensive Care Unit (ICU)">Intensive Care Unit (ICU)</option>
                <option value="Pharmacy Dispensary">Pharmacy Dispensary</option>
                <option value="Pathology Laboratory">Pathology Laboratory</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Shift Schedule</label>
            <select
              className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none"
              value={shift}
              onChange={(e) => setShift(e.target.value)}
            >
              <option value="Day Shift (07:00 - 15:30)">Day Shift (07:00 - 15:30)</option>
              <option value="Evening Shift (15:00 - 23:00)">Evening Shift (15:00 - 23:00)</option>
              <option value="Night Shift (23:00 - 07:00)">Night Shift (23:00 - 07:00)</option>
            </select>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Complete Staff Registration</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
