'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Navbar } from '@/components/navbar/Navbar';
import { Footer } from '@/components/footer/Footer';
import { EmergencyFloatingButton } from '@/components/common/EmergencyFloatingButton';
import { mockDepartments } from '@/data/mockData';
import {
  Building2,
  Search,
  Bed,
  UserCheck,
  Calendar,
  Box,
  ArrowRight,
  Filter,
  Layers
} from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function DepartmentsPage() {
  const [search, setSearch] = useState('');
  const [selectedFloor, setSelectedFloor] = useState<string>('all');

  const filteredDepts = mockDepartments.filter((d) => {
    const matchesSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.description.toLowerCase().includes(search.toLowerCase()) ||
      d.code.toLowerCase().includes(search.toLowerCase());
    const matchesFloor = selectedFloor === 'all' || d.floor.toString() === selectedFloor;
    return matchesSearch && matchesFloor;
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F9FF]">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-6 border-b border-[#DCE8F5]">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF3FF] text-[#1769E0] text-xs font-bold mb-2 border border-[#DCE8F5]">
              <Building2 className="w-3.5 h-3.5" />
              <span>CLINICAL DEPARTMENTS DIRECTORY</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0B1F3A] tracking-tight">
              Hospital Departments & Specialized Wards
            </h1>
            <p className="text-slate-600 text-sm mt-1">
              Explore our complete clinical directory, staffing, and bed capacities across 19 departments.
            </p>
          </div>

          <Link href="/hospital/3d">
            <Button size="sm">
              <Box className="w-4 h-4 mr-1.5" />
              Campus 3D View
            </Button>
          </Link>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 bg-white p-4 rounded-2xl border border-[#DCE8F5] shadow-xs">
          <div className="relative w-full sm:w-80">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by department name or code..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl text-xs text-[#10233F] placeholder-slate-400 outline-none focus:border-[#1769E0]"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
            <span className="text-xs font-bold text-slate-400 px-2 shrink-0">Floor:</span>
            {(['all', '1', '2', '3', '4'] as const).map((fl) => (
              <button
                key={fl}
                onClick={() => setSelectedFloor(fl)}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold shrink-0 transition-all ${
                  selectedFloor === fl
                    ? 'bg-[#1769E0] text-white shadow-xs'
                    : 'text-slate-600 hover:bg-slate-100'
                }`}
              >
                {fl === 'all' ? 'All Floors' : `Floor ${fl}`}
              </button>
            ))}
          </div>
        </div>

        {/* Departments Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDepts.map((dept) => {
            const occupancyRate = Math.round(
              ((dept.totalBeds - dept.availableBeds) / dept.totalBeds) * 100
            );

            return (
              <div
                key={dept.id}
                id={dept.id}
                className="bg-white rounded-2xl border border-[#DCE8F5] p-6 shadow-xs hover:shadow-md transition-all flex flex-col justify-between group"
              >
                <div>
                  <div className="flex items-start justify-between mb-4">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center font-bold text-base shadow-xs"
                      style={{ backgroundColor: `${dept.color}15`, color: dept.color }}
                    >
                      <Building2 className="w-6 h-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-slate-400">Floor {dept.floor}</span>
                      <Badge variant={dept.status === 'Active' ? 'success' : 'warning'}>
                        {dept.status}
                      </Badge>
                    </div>
                  </div>

                  <h3 className="text-lg font-bold text-[#10233F] group-hover:text-[#1769E0] transition-colors">
                    {dept.name}
                  </h3>
                  <div className="text-[11px] font-semibold text-slate-400 mb-2">Code: {dept.code}</div>
                  <p className="text-xs text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {dept.description}
                  </p>

                  {/* Bed Occupancy Bar */}
                  <div className="bg-[#F5F9FF] border border-[#DCE8F5] rounded-xl p-3 mb-4">
                    <div className="flex justify-between items-center text-xs mb-1.5">
                      <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                        <Bed className="w-3.5 h-3.5 text-[#1769E0]" /> Beds
                      </span>
                      <span className="font-bold text-[#10233F]">
                        {dept.availableBeds} / {dept.totalBeds} Free
                      </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          occupancyRate > 90 ? 'bg-rose-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${occupancyRate}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-slate-600 mb-4 px-1">
                    <span className="flex items-center gap-1">
                      <UserCheck className="w-3.5 h-3.5 text-emerald-600" />
                      <span>{dept.activeDoctors} Specialists</span>
                    </span>
                    <span className="font-semibold text-slate-700">
                      Head: {dept.headDoctor ? dept.headDoctor.split(' ')[1] : 'Specialist'}
                    </span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 border-t border-slate-100">
                  <Link
                    href={`/patient/appointments?department=${encodeURIComponent(dept.code)}`}
                    className="flex-1"
                  >
                    <Button size="sm" className="w-full text-xs">
                      Book Consult
                    </Button>
                  </Link>
                  <Link href={`/hospital/3d`} title="Locate in 3D Campus">
                    <Button variant="outline" size="sm" className="text-xs px-2.5">
                      <Box className="w-4 h-4 text-[#1769E0]" />
                    </Button>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <EmergencyFloatingButton />
      <Footer />
    </div>
  );
}
