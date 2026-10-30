'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Stethoscope,
  Search,
  Plus,
  Star,
  CheckCircle2,
  Trash2,
  Edit
} from 'lucide-react';
import { mockDoctors } from '@/data/mockData';
import { Doctor } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function AdminDoctorsPage() {
  const [doctors, setDoctors] = useState<Doctor[]>(mockDoctors);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Doctor Form State
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [department, setDepartment] = useState('Cardiology');
  const [fee, setFee] = useState('180');

  const handleAddDoctor = (e: React.FormEvent) => {
    e.preventDefault();
    const newDoc: Doctor = {
      id: `doc-${Date.now()}`,
      name: name.startsWith('Dr.') ? name : `Dr. ${name}`,
      specialization,
      department,
      qualifications: 'MD, Board Certified',
      experienceYears: 10,
      rating: 5.0,
      consultationFee: parseInt(fee),
      availableDays: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      availableHours: '09:00 - 17:00',
      image: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400',
      status: 'Active',
    };

    setDoctors([newDoc, ...doctors]);
    setIsModalOpen(false);
    setName('');
    setSpecialization('');
  };

  const handleDelete = (id: string) => {
    setDoctors(doctors.filter((d) => d.id !== id));
  };

  const filtered = doctors.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      (d.specialization || d.specialty || '').toLowerCase().includes(search.toLowerCase()) ||
      (d.department || d.departmentName || '').toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      role="admin"
      title="Physician & Clinical Faculty Directory"
      subtitle="Credentialing, department affiliations, consulting fees, and roster assignments"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search physicians by name, specialty, faculty..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs text-[#10233F] outline-none"
            />
          </div>

          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Credential New Physician
          </Button>
        </div>

        {/* Doctors Table */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Physician Name</th>
                  <th className="py-3 px-4">Department</th>
                  <th className="py-3 px-4">Experience</th>
                  <th className="py-3 px-4">Rating</th>
                  <th className="py-3 px-4">Consult Fee</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filtered.map((doc) => (
                  <tr key={doc.id} className="hover:bg-[#F5F9FF]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#10233F] flex items-center gap-3">
                      <img
                        src={doc.image}
                        alt={doc.name}
                        className="w-8 h-8 rounded-full object-cover border border-slate-200"
                      />
                      <div>
                        <div>{doc.name}</div>
                        <div className="text-[10px] text-slate-400 font-normal">{doc.specialization}</div>
                      </div>
                    </td>
                    <td className="py-3.5 px-4 font-semibold text-slate-800">{doc.department}</td>
                    <td className="py-3.5 px-4">{doc.experienceYears} yrs</td>
                    <td className="py-3.5 px-4 font-bold text-amber-600 flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                      <span>{doc.rating}</span>
                    </td>
                    <td className="py-3.5 px-4 font-semibold">${doc.consultationFee}</td>
                    <td className="py-3.5 px-4">
                      <Badge variant="success">Active</Badge>
                    </td>
                    <td className="py-3.5 px-4 text-right">
                      <button
                        onClick={() => handleDelete(doc.id)}
                        className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete Doctor"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Credential Doctor Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Credential New Physician"
        size="md"
      >
        <form onSubmit={handleAddDoctor} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Doctor Name</label>
            <Input
              type="text"
              required
              placeholder="e.g. Dr. Alex Mercer, MD"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Specialization</label>
              <Input
                type="text"
                required
                placeholder="e.g. Pediatric Neurosurgeon"
                value={specialization}
                onChange={(e) => setSpecialization(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department</label>
              <select
                className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
              >
                <option value="Cardiology">Cardiology</option>
                <option value="Neurology">Neurology</option>
                <option value="Pediatrics">Pediatrics</option>
                <option value="Orthopedics">Orthopedics</option>
                <option value="Emergency">Emergency</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Standard Consult Fee ($)</label>
            <Input
              type="number"
              required
              value={fee}
              onChange={(e) => setFee(e.target.value)}
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Verify & Register Credential</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
