'use client';

import React, { useState } from 'react';
import { DashboardLayout } from '@/components/dashboard/DashboardLayout';
import {
  Building2,
  Plus,
  Bed,
  UserCheck,
  Search,
  Filter,
  Edit,
  Trash2
} from 'lucide-react';
import { mockDepartments } from '@/data/mockData';
import { Department } from '@/types';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { Input } from '@/components/ui/Input';

export default function AdminDepartmentsPage() {
  const [departments, setDepartments] = useState<Department[]>(mockDepartments);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // New Department Form
  const [name, setName] = useState('');
  const [code, setCode] = useState('');
  const [floor, setFloor] = useState('2');
  const [totalBeds, setTotalBeds] = useState('30');
  const [headDoctor, setHeadDoctor] = useState('');

  const handleAddDept = (e: React.FormEvent) => {
    e.preventDefault();
    const newDept: Department = {
      id: `dept-${Date.now()}`,
      name,
      code: code.toUpperCase(),
      floor: parseInt(floor),
      totalBeds: parseInt(totalBeds),
      availableBeds: parseInt(totalBeds),
      activeDoctors: 4,
      headDoctor: headDoctor || 'Dr. Specialist',
      color: '#1769E0',
      coordinates3D: [0, 4, 0],
      status: 'Active',
      description: `Comprehensive diagnostic and inpatient surgical facility for ${name}.`,
    };

    setDepartments([newDept, ...departments]);
    setIsModalOpen(false);
    setName('');
    setCode('');
  };

  const filtered = departments.filter(
    (d) =>
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout
      role="admin"
      title="Department & Ward Management"
      subtitle="Configure clinical faculties, assign floor wings, and adjust inpatient bed allocations"
    >
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search departments by name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs text-[#10233F] outline-none"
            />
          </div>

          <Button onClick={() => setIsModalOpen(true)} size="sm">
            <Plus className="w-4 h-4 mr-1.5" /> Establish Department Wing
          </Button>
        </div>

        {/* Departments Table */}
        <div className="bg-white rounded-3xl border border-[#DCE8F5] p-6 shadow-xs overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] font-bold uppercase tracking-wider text-slate-400">
                  <th className="py-3 px-4">Department (Code)</th>
                  <th className="py-3 px-4">Campus Floor</th>
                  <th className="py-3 px-4">Head Physician</th>
                  <th className="py-3 px-4">Total Beds</th>
                  <th className="py-3 px-4">Available</th>
                  <th className="py-3 px-4">Specialists</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs text-slate-700">
                {filtered.map((d) => (
                  <tr key={d.id} className="hover:bg-[#F5F9FF]/60 transition-colors">
                    <td className="py-3.5 px-4 font-bold text-[#10233F] flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: d.color }} />
                      <span>{d.name}</span>
                      <span className="text-[10px] text-slate-400 font-normal">({d.code})</span>
                    </td>
                    <td className="py-3.5 px-4 font-medium">Floor {d.floor}</td>
                    <td className="py-3.5 px-4">{d.headDoctor || 'Dr. Specialist'}</td>
                    <td className="py-3.5 px-4 font-semibold">{d.totalBeds}</td>
                    <td className="py-3.5 px-4 font-bold text-emerald-600">{d.availableBeds}</td>
                    <td className="py-3.5 px-4">{d.activeDoctors} Active</td>
                    <td className="py-3.5 px-4">
                      <Badge variant={d.status === 'Active' ? 'success' : 'warning'}>
                        {d.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Department Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Establish Clinical Department Wing"
        size="md"
      >
        <form onSubmit={handleAddDept} className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-bold text-slate-700 mb-1">Department Name</label>
            <Input
              type="text"
              required
              placeholder="e.g. Cardiothoracic Surgery"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Department Code</label>
              <Input
                type="text"
                required
                placeholder="e.g. CTS"
                value={code}
                onChange={(e) => setCode(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Floor Location</label>
              <select
                className="w-full px-3 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl outline-none"
                value={floor}
                onChange={(e) => setFloor(e.target.value)}
              >
                <option value="1">Floor 1 (Ground / Emergency)</option>
                <option value="2">Floor 2 (Cardiology & Surgery)</option>
                <option value="3">Floor 3 (Specialty Wards)</option>
                <option value="4">Floor 4 (Critical Care / ICU)</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Total Inpatient Beds</label>
              <Input
                type="number"
                required
                value={totalBeds}
                onChange={(e) => setTotalBeds(e.target.value)}
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Head of Department</label>
              <Input
                type="text"
                placeholder="e.g. Dr. Arthur Conan, MD"
                value={headDoctor}
                onChange={(e) => setHeadDoctor(e.target.value)}
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
            <Button type="button" variant="outline" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Deploy Department Wing</Button>
          </div>
        </form>
      </Modal>
    </DashboardLayout>
  );
}
